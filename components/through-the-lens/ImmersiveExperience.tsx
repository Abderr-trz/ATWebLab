"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Volume2, VolumeX } from "lucide-react";

type Phase="intro"|"transition"|"gallery"|"project";
type Work={id:string,title:string,category:string,year:string,subtitle:string,description:string,images:string[]};
const photo=(id:string,w=1200)=>`https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=82`;
const works:Work[]=[
 {id:"01",title:"HUMAN / FORM",category:"PORTRAIT",year:"2026",subtitle:"The beauty of being human.",description:"Une étude photographique fictive sur la présence, la silhouette et la lumière. Une direction artistique conçue pour montrer comment un portfolio peut raconter une histoire.",images:[photo("photo-1534528741775-53994a69daeb"),photo("photo-1524504388940-b1c1722653e1"),photo("photo-1506794778202-cad84cf45f1d")]},
 {id:"02",title:"THE / EDITION",category:"FASHION EDITORIAL",year:"2026",subtitle:"A new perspective on style.",description:"Un concept éditorial mêlant mode, architecture et lumière naturelle. Chaque série est présentée comme un chapitre, avec son identité et son rythme.",images:[photo("photo-1539109136881-3be0616acf4b"),photo("photo-1483985988355-763728e1935b"),photo("photo-1529139574466-a303027c1d8b")]},
 {id:"03",title:"AFTER / LIGHT",category:"CINEMATIC STORIES",year:"2026",subtitle:"Where the light becomes a story.",description:"Un univers de paysages et de narration visuelle, pensé pour un vidéaste ou un réalisateur souhaitant présenter ses films dans une expérience immersive.",images:[photo("photo-1470770841072-f978cf4d019e"),photo("photo-1500534623283-312aade485b7"),photo("photo-1464822759023-fed622ff2c3b")]}
];

function useReducedMotion(){const [reduced,setReduced]=useState(false);useEffect(()=>{const m=window.matchMedia("(prefers-reduced-motion: reduce)");const cb=()=>setReduced(m.matches);cb();m.addEventListener("change",cb);return()=>m.removeEventListener("change",cb)},[]);return reduced}

function CinematicScene({phase,focus,active,onEntered}:{phase:Phase;focus:number;active:number;onEntered:()=>void}){
 const canvas=useRef<HTMLCanvasElement>(null);
 const data=useRef({phase,focus,active,onEntered});data.current={phase,focus,active,onEntered};
 useEffect(()=>{
  const el=canvas.current;if(!el)return;
  let disposed=false,raf=0;let renderer:THREE.WebGLRenderer;
  const scene=new THREE.Scene();scene.background=new THREE.Color("#08090d");scene.fog=new THREE.FogExp2("#08090d",.027);
  const camera=new THREE.PerspectiveCamera(45,1,.1,200);camera.position.set(0,0,11);
  const lens=new THREE.Group();scene.add(lens);
  const gallery=new THREE.Group();gallery.position.z=-24;scene.add(gallery);
  const geometries:THREE.BufferGeometry[]=[];const materials:THREE.Material[]=[];const textures:THREE.Texture[]=[];
  const trackG=(g:THREE.BufferGeometry)=>{geometries.push(g);return g};
  const trackM=<T extends THREE.Material>(m:T)=>{materials.push(m);return m};
  const metal=trackM(new THREE.MeshStandardMaterial({color:0x171a1f,metalness:.92,roughness:.22}));
  const trim=trackM(new THREE.MeshStandardMaterial({color:0x9a8273,metalness:.82,roughness:.19}));
  const black=trackM(new THREE.MeshStandardMaterial({color:0x050709,metalness:.5,roughness:.12,side:THREE.DoubleSide}));
  const glass=trackM(new THREE.MeshPhysicalMaterial({color:0x1a3949,metalness:.2,roughness:.08,clearcoat:1,clearcoatRoughness:.04,transparent:true,opacity:.84,side:THREE.DoubleSide}));
  const warm=trackM(new THREE.MeshBasicMaterial({color:0xe3b295,transparent:true,opacity:.25}));
  const mesh=(parent:THREE.Group,g:THREE.BufferGeometry,m:THREE.Material,x=0,y=0,z=0)=>{const o=new THREE.Mesh(trackG(g),m);o.position.set(x,y,z);parent.add(o);return o};
  // A detailed mechanical lens barrel with distinct metallic, knurled and optical layers.
  const barrel=mesh(lens,new THREE.CylinderGeometry(2.25,2.05,1.85,96,1,true),metal);barrel.rotation.x=Math.PI/2;
  for(const [radius,tube,z,mat] of [[2.28,.12,.96,trim],[2.15,.11,1.05,metal],[1.99,.065,1.12,trim],[1.87,.085,1.18,metal],[1.65,.05,1.27,trim],[1.42,.018,1.37,warm]] as const){mesh(lens,new THREE.TorusGeometry(radius,tube,12,112),mat,0,0,z)}
  for(let i=0;i<56;i++){const a=i*Math.PI*2/56;const bar=mesh(lens,new THREE.BoxGeometry(.035,.17,.025),trim,Math.sin(a)*2.22,Math.cos(a)*2.22,.79);bar.rotation.z=-a}
  mesh(lens,new THREE.CircleGeometry(1.84,96),glass,0,0,1.2);
  mesh(lens,new THREE.CircleGeometry(1.55,96),black,0,0,1.29);
  const iris=new THREE.Group();iris.position.z=1.32;lens.add(iris);
  const blade=trackM(new THREE.MeshStandardMaterial({color:0x0b1017,metalness:.75,roughness:.25,side:THREE.DoubleSide}));
  for(let i=0;i<8;i++){const shape=new THREE.Shape();shape.moveTo(-.12,-.15);shape.lineTo(1.75,-.65);shape.lineTo(1.72,.42);shape.lineTo(.03,.4);shape.closePath();const b=mesh(iris,new THREE.ShapeGeometry(shape),blade);b.rotation.z=i*Math.PI/4}
  const optical=mesh(lens,new THREE.CircleGeometry(1.02,96),glass,0,0,1.38);
  const flare=mesh(lens,new THREE.TorusGeometry(.92,.008,8,96),warm,0,0,1.41);flare.scale.y=.72;
  const lightA=new THREE.PointLight(0xffad83,110,28);lightA.position.set(-5,4,7);scene.add(lightA);
  const lightB=new THREE.PointLight(0x7cbbde,95,26);lightB.position.set(5,-3,6);scene.add(lightB);
  scene.add(new THREE.AmbientLight(0xffffff,.9));
  // The visitor travels into a spatial exhibition with actual photographic panels.
  const frameMat=trackM(new THREE.MeshStandardMaterial({color:0x9a7b6a,metalness:.7,roughness:.32}));
  const panelGeo=trackG(new THREE.PlaneGeometry(4.1,5.2));
  const borderGeo=trackG(new THREE.BoxGeometry(4.28,5.38,.12));
  const panels:THREE.Mesh[]=[];
  const loader=new THREE.TextureLoader();
  works.forEach((work,i)=>{
    const holder=new THREE.Group();holder.position.set((i-1)*5.4,0,-i*.4);gallery.add(holder);
    const frame=new THREE.Mesh(borderGeo,frameMat);frame.position.z=-.08;holder.add(frame);
    const imageMaterial=trackM(new THREE.MeshBasicMaterial({color:0x2b2a2b,side:THREE.DoubleSide}));
    const plane=new THREE.Mesh(panelGeo,imageMaterial);holder.add(plane);panels.push(plane);
    loader.load(work.images[0],tex=>{if(disposed){tex.dispose();return}tex.colorSpace=THREE.SRGBColorSpace;tex.anisotropy=4;textures.push(tex);imageMaterial.map=tex;imageMaterial.color.set("#ffffff");imageMaterial.needsUpdate=true},undefined,()=>{});
    const pedestal=mesh(holder,new THREE.BoxGeometry(4.5,.04,2),metal,0,-3.4,-.3);pedestal.rotation.x=.05;
  });
  // Architectural light beams and floor lines for depth.
  const lineMaterial=trackM(new THREE.LineBasicMaterial({color:0x775b50,transparent:true,opacity:.3}));
  for(let i=-7;i<=7;i++){const pts=[new THREE.Vector3(i*1.6,-3.3,2),new THREE.Vector3(i*1.6,-3.3,-70)];const g=trackG(new THREE.BufferGeometry().setFromPoints(pts));gallery.add(new THREE.Line(g,lineMaterial))}
  let px=0,py=0,drag=false,lastX=0,velocity=0,entered=false;
  const move=(e:PointerEvent)=>{const rect=el.getBoundingClientRect();px=((e.clientX-rect.left)/rect.width-.5)*2;py=((e.clientY-rect.top)/rect.height-.5)*2;if(drag)velocity+=(e.clientX-lastX)*.006;lastX=e.clientX};
  const down=(e:PointerEvent)=>{drag=true;lastX=e.clientX;el.setPointerCapture?.(e.pointerId)};
  const up=()=>{drag=false};
  el.addEventListener("pointermove",move);el.addEventListener("pointerdown",down);el.addEventListener("pointerup",up);el.addEventListener("pointercancel",up);
  const resize=()=>{if(!renderer)return;const w=Math.max(1,el.clientWidth),h=Math.max(1,el.clientHeight);renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix()};
  const init=()=>{try{renderer=new THREE.WebGLRenderer({canvas:el,antialias:true,alpha:false,powerPreference:"high-performance"});renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.7));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.25;resize()}catch{el.style.display="none";return false}return true};
  if(!init())return;
  const observer=new ResizeObserver(resize);observer.observe(el);
  const clock=new THREE.Clock();let camZ=11,camX=0;
  const tick=()=>{
    if(disposed)return;
    const delta=Math.min(clock.getDelta(),.05);const t=clock.elapsedTime;const state=data.current;
    const inGallery=state.phase==="gallery"||state.phase==="project";
    const transitioning=state.phase==="transition";
    lens.visible=!inGallery;
    lens.rotation.y+=(px*.2+velocity-lens.rotation.y)*.045;
    lens.rotation.x+=(-py*.12-lens.rotation.x)*.045;
    lens.rotation.z=Math.sin(t*.4)*.015;
    iris.scale.setScalar(Math.max(.08,1-state.focus/120));
    iris.rotation.z=t*.025;
    optical.material=glass;
    flare.material=warm;warm.opacity=.15+state.focus/450+Math.sin(t*2)*.04;
    const targetZ=inGallery?-15:transitioning?-13:11;
    camZ+=(targetZ-camZ)*Math.min(1,delta*(transitioning?2.5:4));
    const targetX=inGallery?(state.active-1)*5.4:0;
    camX+=(targetX-camX)*Math.min(1,delta*2.5);
    camera.position.set(camX+(inGallery?px*.22:0),inGallery?py*.14:0,camZ);
    camera.lookAt(camX*.92,0,inGallery?-24:0);
    gallery.visible=inGallery||transitioning;
    gallery.children.forEach((child,i)=>{if(child instanceof THREE.Group)child.rotation.y=Math.sin(t*.45+i)*.015});
    if(transitioning&&!entered&&camZ< -10){entered=true;data.current.onEntered()}
    if(!transitioning)entered=false;
    renderer.render(scene,camera);velocity*=.92;raf=requestAnimationFrame(tick)
  };tick();
  return()=>{disposed=true;cancelAnimationFrame(raf);observer.disconnect();el.removeEventListener("pointermove",move);el.removeEventListener("pointerdown",down);el.removeEventListener("pointerup",up);el.removeEventListener("pointercancel",up);textures.forEach(x=>x.dispose());geometries.forEach(x=>x.dispose());materials.forEach(x=>x.dispose());renderer.dispose()};
 },[]);
 return <canvas ref={canvas} className="ttl2-canvas" aria-label="Scène interactive en trois dimensions avec objectif photographique et galerie d'art" role="img"/>;
}

export default function ThroughTheLens(){
 const [phase,setPhase]=useState<Phase>("intro");
 const [focus,setFocus]=useState(12);
 const [active,setActive]=useState(1);
 const [reduced,setReduced]=useState(false);
 const [sound,setSound]=useState(false);
 const [webgl,setWebgl]=useState(true);
 const done=useCallback(()=>setPhase("gallery"),[]);
 useEffect(()=>{setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);try{const c=document.createElement("canvas");setWebgl(!!(c.getContext("webgl2")||c.getContext("webgl")))}catch{setWebgl(false)}},[]);
 const enter=()=>setPhase(reduced||!webgl?"gallery":"transition");
 const next=(n:number)=>setActive((n+works.length)%works.length);
 const gallery=phase==="gallery"||phase==="project";
 return <main className="ttl2">
   <header className="ttl2-nav"><Link href="/#realisations"><ArrowLeft size={15}/> AT WEBLAB®</Link><span>EXPERIMENT 001 / THROUGH THE LENS</span><Link href="/#contact">LET'S CREATE <ArrowUpRight size={15}/></Link></header>
   {webgl&&<CinematicScene phase={phase} focus={focus} active={active} onEntered={done}/>}
   {!webgl&&<div className="ttl2-fallback" style={{backgroundImage:`linear-gradient(#09090cb3,#09090cbd),url(${works[active].images[0]})`}}/>}
   <div className="ttl2-vignette" aria-hidden="true"/>
   {(phase==="intro"||phase==="transition")&&<section className={`ttl2-hero ${phase==="transition"?"ttl2-fade":""}`}>
     <div className="ttl2-hero-title"><span className="ttl2-eyebrow">AT WEBLAB PRESENTS / A CREATIVE EXPERIMENT</span><h1>THROUGH<br/>THE <em>LENS.</em></h1><p>Don't just see the work.<br/>Step inside it.</p></div>
     <div className="ttl2-focus"><div className="ttl2-focus-heading"><label htmlFor="ttl2-range">FIND YOUR PERSPECTIVE</label><span>{focus}%</span></div><input id="ttl2-range" type="range" min="0" max="100" value={focus} onChange={e=>setFocus(+e.target.value)}/><div className="ttl2-focus-actions"><button onClick={enter} disabled={focus<78||phase==="transition"}>ENTER THE EXPERIENCE <ArrowRight size={17}/></button><button onClick={done}>SKIP INTRO ↗</button></div></div>
     <span className="ttl2-edge">SCROLL INTO A DIFFERENT PERSPECTIVE</span>
   </section>}
   {gallery&&<section className="ttl2-gallery">
     <div className="ttl2-gallery-top"><span className="ttl2-eyebrow">CURATED STORIES / CONCEPT PORTFOLIO</span><button onClick={()=>{setPhase("intro");setFocus(12)}}>REPLAY EXPERIENCE ↗</button></div>
     {phase==="gallery"?<div className="ttl2-gallery-interface">
       <div className="ttl2-project-index"><span>SELECTED WORK / 0{active+1}—03</span><div className="ttl2-project-tabs">{works.map((w,i)=><button key={w.id} className={active===i?"is-active":""} onClick={()=>next(i)}>0{i+1} / {w.category}</button>)}</div></div>
       <div className="ttl2-project-copy"><span>{works[active].year} / CONCEPT PROJECT</span><h1>{works[active].title.split(" / ")[0]}<br/><em>{works[active].title.split(" / ")[1]}.</em></h1><p>{works[active].subtitle}</p><button onClick={()=>setPhase("project")}>EXPLORE THIS STORY <ArrowUpRight size={20}/></button></div>
       <div className="ttl2-arrows"><button aria-label="Projet précédent" onClick={()=>next(active-1)}><ArrowLeft/></button><button aria-label="Projet suivant" onClick={()=>next(active+1)}><ArrowRight/></button></div>
     </div>:<div className="ttl2-detail"><button className="ttl2-back" onClick={()=>setPhase("gallery")}><ArrowLeft size={18}/> BACK TO THE GALLERY</button><div className="ttl2-detail-heading"><span>0{active+1} / {works[active].category} / FICTIONAL CONCEPT</span><h1>{works[active].title}</h1><p>{works[active].description}</p></div><div className="ttl2-editorial">{works[active].images.map((src,i)=><figure key={src}><img src={src} alt={`Photographie d'illustration ${i+1} du concept ${works[active].title}`} loading={i===0?"eager":"lazy"}/><figcaption>FRAME 0{i+1} / VISUAL STUDY</figcaption></figure>)}</div><button className="ttl2-next" onClick={()=>{next(active+1);setPhase("gallery")}}>NEXT COLLECTION <ArrowRight/></button></div>}
     <footer className="ttl2-footer"><span>AT WEBLAB / CREATIVE DEMONSTRATION — FICTIONAL PROJECTS, EDITORIAL STOCK PHOTOGRAPHY</span><h2>YOUR WORK DESERVES<br/><em>AN EXPERIENCE.</em></h2><Link href="/#contact">BUILD YOUR PORTFOLIO WITH AT WEBLAB <ArrowUpRight/></Link></footer>
   </section>}
 </main>
}
