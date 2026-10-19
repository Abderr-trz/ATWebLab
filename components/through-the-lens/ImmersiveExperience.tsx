"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowUpRight, Maximize2, Minimize2 } from "lucide-react";

const image=(id:string,w=1400)=>`https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;
const collections=[
 {index:"01",label:"PORTRAIT STUDIES",title:"HUMAN / FORM",sub:"The art of presence.",description:"Une exploration éditoriale du portrait, de la lumière et des expressions. Projet fictif conçu pour démontrer une expérience de portfolio premium.",photos:[image("photo-1534528741775-53994a69daeb"),image("photo-1524504388940-b1c1722653e1"),image("photo-1506794778202-cad84cf45f1d"),image("photo-1531123897727-8f129e1688ce")]},
 {index:"02",label:"FASHION EDITORIAL",title:"THE / EDITION",sub:"Style is a point of view.",description:"Un récit visuel mêlant silhouettes, textures et attitude. Une direction artistique de démonstration pour photographes de mode et studios créatifs.",photos:[image("photo-1539109136881-3be0616acf4b"),image("photo-1483985988355-763728e1935b"),image("photo-1529139574466-a303027c1d8b"),image("photo-1487222477894-8943e31ef7b2")]},
 {index:"03",label:"CINEMATIC LANDSCAPES",title:"AFTER / LIGHT",sub:"A story beyond the horizon.",description:"Une collection d'atmosphères cinématographiques et de paysages, imaginée pour illustrer le portfolio immersif d'un réalisateur.",photos:[image("photo-1470770841072-f978cf4d019e"),image("photo-1500534623283-312aade485b7"),image("photo-1464822759023-fed622ff2c3b"),image("photo-1441974231531-c6227db76b6e")]}
];
const clamp=(v:number,a=0,b=1)=>Math.max(a,Math.min(b,v));
const smooth=(a:number,b:number,v:number)=>{const t=clamp((v-a)/(b-a));return t*t*(3-2*t)};
function World({progress,reduced}:{progress:React.RefObject<number>;reduced:boolean}){
 const canvas=useRef<HTMLCanvasElement>(null);
 const motion=useRef(reduced);motion.current=reduced;
 useEffect(()=>{
  const el=canvas.current;if(!el)return;
  let renderer:THREE.WebGLRenderer;
  try{renderer=new THREE.WebGLRenderer({canvas:el,antialias:true,powerPreference:"high-performance"});}catch{el.style.display="none";return}
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.6));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.1;
  const scene=new THREE.Scene();scene.background=new THREE.Color("#07090c");scene.fog=new THREE.FogExp2("#07090c",.019);
  const camera=new THREE.PerspectiveCamera(38,1,.1,180);
  const objects:THREE.BufferGeometry[]=[];const mats:THREE.Material[]=[];const texs:THREE.Texture[]=[];
  const geom=<T extends THREE.BufferGeometry>(g:T)=>{objects.push(g);return g};
  const mat=<T extends THREE.Material>(m:T)=>{mats.push(m);return m};
  const black=mat(new THREE.MeshStandardMaterial({color:0x15191e,metalness:.87,roughness:.22,side:THREE.DoubleSide}));
  const metal=mat(new THREE.MeshStandardMaterial({color:0x81796f,metalness:.85,roughness:.23,side:THREE.DoubleSide}));
  const dark=mat(new THREE.MeshBasicMaterial({color:0x020406,side:THREE.DoubleSide}));
  const glass=mat(new THREE.MeshPhysicalMaterial({color:0x1b5262,metalness:.25,roughness:.08,clearcoat:1,transparent:true,opacity:.84,side:THREE.DoubleSide}));
  const ringmat=mat(new THREE.MeshBasicMaterial({color:0xe8aa83,transparent:true,opacity:.45}));
  const lens=new THREE.Group();scene.add(lens);
  function add(g:THREE.BufferGeometry,m:THREE.Material,parent:THREE.Group=lens,z=0){const mesh=new THREE.Mesh(geom(g),m);mesh.position.z=z;parent.add(mesh);return mesh}
  const body=add(new THREE.CylinderGeometry(2.1,1.98,2.4,100,1,true),black);body.rotation.x=Math.PI/2;
  const back=add(new THREE.CylinderGeometry(2.02,2.02,.14,96),black);back.rotation.x=Math.PI/2;back.position.z=-1.14;
  for(const [r,t,z] of [[2.15,.1,1.2],[2.03,.08,1.29],[1.91,.04,1.34],[1.75,.065,1.38],[1.58,.03,1.43],[1.24,.012,1.54]] as const)add(new THREE.TorusGeometry(r,t,12,112),r===1.24?ringmat:metal,lens,z);
  for(let i=0;i<72;i++){const a=i*Math.PI*2/72;const groove=add(new THREE.BoxGeometry(.027,.13,.03),metal,lens,.9);groove.position.x=Math.sin(a)*2.09;groove.position.y=Math.cos(a)*2.09;groove.rotation.z=-a}
  add(new THREE.CircleGeometry(1.72,96),glass,lens,1.42);
  add(new THREE.CircleGeometry(1.52,96),dark,lens,1.48);
  const iris=new THREE.Group();iris.position.z=1.51;lens.add(iris);
  const bladeMat=mat(new THREE.MeshStandardMaterial({color:0x080d12,metalness:.75,roughness:.28,side:THREE.DoubleSide}));
  for(let i=0;i<9;i++){const shape=new THREE.Shape();shape.moveTo(-.12,-.16);shape.lineTo(1.68,-.6);shape.lineTo(1.68,.35);shape.lineTo(.05,.4);shape.closePath();const blade=add(new THREE.ShapeGeometry(shape),bladeMat,iris);blade.rotation.z=i*Math.PI*2/9}
  add(new THREE.CircleGeometry(.7,80),glass,lens,1.55);
  const frontGlow=add(new THREE.TorusGeometry(.79,.009,8,96),ringmat,lens,1.57);frontGlow.scale.y=.88;
  scene.add(new THREE.AmbientLight(0xffffff,.8));
  const key=new THREE.PointLight(0xffb18a,110,30);key.position.set(-4,5,6);scene.add(key);
  const rim=new THREE.PointLight(0x80badc,105,30);rim.position.set(5,-3,5);scene.add(rim);
  // A gallery with nine physical photographic prints, arranged along a curved exhibition path.
  const gallery=new THREE.Group();gallery.position.z=-23;scene.add(gallery);
  const loader=new THREE.TextureLoader();
  const frames:THREE.Group[]=[];
  const planeGeo=geom(new THREE.PlaneGeometry(5.2,6.6));
  const frameGeo=geom(new THREE.BoxGeometry(5.42,6.82,.12));
  const borderMat=mat(new THREE.MeshStandardMaterial({color:0x725e50,metalness:.68,roughness:.33}));
  const matboard=mat(new THREE.MeshBasicMaterial({color:0xe8e1d8,side:THREE.DoubleSide}));
  const insetGeo=geom(new THREE.PlaneGeometry(4.72,6.08));
  const allPhotos=collections.flatMap(c=>c.photos.slice(0,3));
  allPhotos.forEach((url,i)=>{
   const g=new THREE.Group();const section=Math.floor(i/3);const within=i%3;
   g.position.set((within-1)*6.3,0,-section*13);g.rotation.y=(within-1)*-.1;
   const frame=new THREE.Mesh(frameGeo,borderMat);frame.position.z=-.12;g.add(frame);
   const mount=new THREE.Mesh(planeGeo,matboard);mount.position.z=.018;g.add(mount);
   const pm=mat(new THREE.MeshBasicMaterial({color:0x34313a,side:THREE.DoubleSide}));
   const panel=new THREE.Mesh(insetGeo,pm);panel.position.z=.035;g.add(panel);gallery.add(g);frames.push(g);
   loader.load(url,t=>{if(!el.isConnected){t.dispose();return}t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=4;const source=t.image as HTMLImageElement;const aspect=source.width/source.height;const frameAspect=4.72/6.08;if(aspect>frameAspect){t.repeat.set(frameAspect/aspect,1);t.offset.set((1-t.repeat.x)/2,0)}else{t.repeat.set(1,aspect/frameAspect);t.offset.set(0,(1-t.repeat.y)/2)}texs.push(t);pm.map=t;pm.color.set(0xffffff);pm.needsUpdate=true},undefined,()=>{});
  });
  const floorMat=mat(new THREE.MeshStandardMaterial({color:0x0e1013,roughness:.35,metalness:.2}));
  const floor=new THREE.Mesh(geom(new THREE.PlaneGeometry(80,100)),floorMat);floor.rotation.x=-Math.PI/2;floor.position.set(0,-4,-43);gallery.add(floor);
  const pathMat=mat(new THREE.LineBasicMaterial({color:0x8b6c5b,transparent:true,opacity:.25}));
  for(let i=-8;i<=8;i++){const line=new THREE.Line(geom(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(i*1.6,-3.98,5),new THREE.Vector3(i*1.6,-3.98,-90)])),pathMat);gallery.add(line)}
  let frameId=0,disposed=false,previous=0;
  const resize=()=>{const w=Math.max(el.clientWidth,1),h=Math.max(el.clientHeight,1);renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix()};
  resize();const observer=new ResizeObserver(resize);observer.observe(el);
  const clock=new THREE.Clock();
  const draw=()=>{
   if(disposed)return;
   const dt=Math.min(clock.getDelta(),.06);
   const target=motion.current?Math.round(progress.current*4)/4:progress.current;
   previous+=(target-previous)*Math.min(1,dt*(motion.current?15:2.4));
   const p=previous;
   const entering=smooth(.10,.28,p);
   lens.position.z=-entering*7;
   lens.scale.setScalar(1+entering*.7);
   lens.rotation.y=Math.sin(clock.elapsedTime*.25)*.09*(1-entering);
   lens.rotation.x=Math.cos(clock.elapsedTime*.3)*.06*(1-entering);
   iris.scale.setScalar(1-smooth(.06,.21,p)*.87);
   iris.rotation.z=p*1.6;
   lens.visible=p<.31;
   gallery.visible=p>.22;
   const walk=smooth(.25,.91,p);
   const sectionWalk=walk*2;
   camera.position.set(Math.sin(walk*Math.PI*2)*.42,Math.sin(walk*8)*.12,11-entering*23-walk*26);
   camera.lookAt(Math.sin(walk*6)*.15,0,camera.position.z-12);
   frames.forEach((g,i)=>{g.rotation.y=(i%3-1)*-.1+Math.sin(clock.elapsedTime*.32+i)*.013});
   ringmat.opacity=.24+Math.sin(clock.elapsedTime*1.4)*.09;
   renderer.render(scene,camera);
   frameId=requestAnimationFrame(draw)
  };draw();
  return()=>{disposed=true;cancelAnimationFrame(frameId);observer.disconnect();objects.forEach(g=>g.dispose());mats.forEach(m=>m.dispose());texs.forEach(t=>t.dispose());renderer.dispose()};
 },[progress]);
 return <canvas ref={canvas} className="ttl3-canvas" aria-hidden="true"/>;
}
export default function ImmersiveExperience(){
 const root=useRef<HTMLElement>(null);
 const progress=useRef(0);
 const [position,setPosition]=useState(0);
 const [reduced,setReduced]=useState(false);
 const [webgl,setWebgl]=useState(true);
 const [fullscreen,setFullscreen]=useState(false);
 const [fullscreenSupported,setFullscreenSupported]=useState(false);
 useEffect(()=>{const sync=()=>setFullscreen(Boolean(document.fullscreenElement));setFullscreenSupported(typeof document.documentElement.requestFullscreen==="function");document.addEventListener("fullscreenchange",sync);return()=>document.removeEventListener("fullscreenchange",sync)},[]);
 const toggleFullscreen=async()=>{try{if(document.fullscreenElement){await document.exitFullscreen()}else{await document.documentElement.requestFullscreen()}}catch(error){console.warn("Fullscreen mode is unavailable",error)}};
 useEffect(()=>{const media=window.matchMedia("(prefers-reduced-motion: reduce)");const change=()=>setReduced(media.matches);change();media.addEventListener("change",change);try{const c=document.createElement("canvas");setWebgl(Boolean(c.getContext("webgl2")||c.getContext("webgl")))}catch{setWebgl(false)}return()=>media.removeEventListener("change",change)},[]);
 useEffect(()=>{
  let pending=false;
  const update=()=>{pending=false;const el=root.current;if(!el)return;const chapters=el.querySelector(".ttl3-chapters") as HTMLElement|null;const range=Math.max(1,chapters?.offsetHeight||el.offsetHeight);const p=clamp((window.scrollY-el.offsetTop)/range);progress.current=p;setPosition(Math.round(p*100))};
  const onScroll=()=>{if(!pending){pending=true;requestAnimationFrame(update)}};
  update();window.addEventListener("scroll",onScroll,{passive:true});window.addEventListener("resize",onScroll);
  return()=>{window.removeEventListener("scroll",onScroll);window.removeEventListener("resize",onScroll)}
 },[]);
 return <main className="ttl3" ref={root}>
  <header className="ttl3-nav"><Link href="/#realisations"><ArrowLeft size={16}/> AT WEBLAB®</Link><span>THROUGH THE LENS — AN IMMERSIVE STUDY</span><div className="ttl3-nav-actions">{fullscreenSupported&&<button type="button" className="ttl3-fullscreen" onClick={toggleFullscreen} aria-label={fullscreen?"Exit fullscreen":"Enter fullscreen"} title={fullscreen?"Exit fullscreen (Esc)":"Enter fullscreen"} aria-pressed={fullscreen}>{fullscreen?<Minimize2 size={17}/>:<Maximize2 size={17}/>}<span>{fullscreen?"EXIT FULLSCREEN":"FULLSCREEN"}</span></button>}<Link href="/#contact">START A PROJECT <ArrowUpRight size={16}/></Link></div></header>
  <div className="ttl3-viewport" aria-hidden="true">
   {webgl?<World progress={progress} reduced={reduced}/>:<div className="ttl3-no-webgl" style={{backgroundImage:`linear-gradient(#05070c88,#05070cbb),url(${collections[0].photos[0]})`}}/>}
   <div className="ttl3-shade"/>
  </div>
  <div className="ttl3-progress" aria-hidden="true"><span style={{transform:`scaleX(${position/100})`}}/></div>
  <div className="ttl3-chapters">
   <section className="ttl3-chapter ttl3-opening"><div><span className="ttl3-kicker">AT WEBLAB PRESENTS / 001</span><h1>THROUGH<br/>THE <em>LENS.</em></h1><p>Don't just see the work.<br/>Step inside it.</p></div><div className="ttl3-scroll"><ArrowDown size={18}/> SCROLL TO EXPLORE</div></section>
   <section className="ttl3-chapter ttl3-aperture"><div><span className="ttl3-kicker">01 / FIND YOUR PERSPECTIVE</span><h2>EVERY STORY<br/>BEGINS WITH<br/><em>A FOCUS.</em></h2><p>Continue scrolling. Watch the aperture open and move beyond the frame.</p></div></section>
   <section className="ttl3-chapter ttl3-cross"><div><span className="ttl3-kicker">02 / ENTER THE FRAME</span><h2>GO BEYOND<br/><em>THE IMAGE.</em></h2><p>A portfolio should be something you experience, not just something you browse.</p></div></section>
   {collections.map((work,i)=><section className="ttl3-chapter ttl3-collection" key={work.index}><div className={i%2?"ttl3-copy ttl3-copy-right":"ttl3-copy"}><span className="ttl3-kicker">0{i+3} / {work.label} — CONCEPT</span><h2>{work.title.split(" / ")[0]}<br/><em>{work.title.split(" / ")[1]}.</em></h2><p>{work.sub}</p><span className="ttl3-caption">SCROLL TO CONTINUE <ArrowDown size={14}/></span></div></section>)}
   <section className="ttl3-chapter ttl3-final"><div><span className="ttl3-kicker">AT WEBLAB / BEYOND THE FRAME</span><h2>YOUR WORK.<br/><em>YOUR UNIVERSE.</em></h2><p>Imagine a portfolio built around the way you see the world.</p><a href="#ttl3-projects">DISCOVER THE COLLECTIONS <ArrowDown size={17}/></a></div></section>
  </div>
  <section id="ttl3-projects" className="ttl3-editorial"><div className="ttl3-editorial-heading"><span>SELECTED WORK / CREATIVE CONCEPTS</span><h2>STORIES WORTH<br/><em>EXPLORING.</em></h2><p>Photographies d'illustration. Ces projets sont des concepts créatifs AT WebLab et ne représentent pas de véritables commandes clients.</p></div>
   {collections.map(work=><article key={work.index} className="ttl3-story"><div className="ttl3-story-title"><span>{work.index} / {work.label}</span><h3>{work.title}</h3><p>{work.description}</p></div><div className="ttl3-photo-grid">{work.photos.map((src,i)=><figure key={src}><img src={src} style={{objectPosition:i===0?"50% 28%":i===1?"50% 36%":"50% 42%"}} alt={`Photographie de démonstration ${i+1} pour ${work.title}`} loading="lazy"/><figcaption>FRAME 0{i+1} / {work.label}</figcaption></figure>)}</div></article>)}
  </section>
  <footer className="ttl3-outro"><span>AT WEBLAB / IMMERSIVE DIGITAL EXPERIENCES</span><h2>BEYOND<br/><em>THE FRAME.</em></h2><Link href="/#contact">LET'S BUILD YOUR EXPERIENCE <ArrowUpRight size={21}/></Link><p>Portfolio conceptuel · Photographies de démonstration · AT WebLab</p></footer>
 </main>
}
