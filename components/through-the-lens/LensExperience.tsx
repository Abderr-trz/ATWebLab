"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Aperture, RotateCcw } from "lucide-react";

type Stage = "lens" | "entering" | "gallery" | "detail";
const works=[
 {name:"PORTRAITS / NOCTURNE",category:"PORTRAITS",number:"01",desc:"Une exploration de la lumière et de la présence. Série fictive pensée comme une campagne éditoriale.",tone:"portrait"},
 {name:"EDITORIAL / FORMES",category:"ÉDITORIAL",number:"02",desc:"Matières, silhouettes et espaces : une proposition visuelle où chaque image devient un chapitre.",tone:"editorial"},
 {name:"MOTION / HORIZON",category:"MOTION",number:"03",desc:"Une direction cinématographique imaginée autour du mouvement, de la lumière et du voyage.",tone:"motion"}
];
function LensCanvas({focus,entering}:{focus:number;entering:boolean}){
 const canvas=useRef<HTMLCanvasElement>(null);
 useEffect(()=>{
  let active=true,raf=0,renderer:import("three").WebGLRenderer|undefined;
  let dispose=()=>{};
  const init=async()=>{
   const THREE=await import("three");if(!active||!canvas.current)return;
   try{
    renderer=new THREE.WebGLRenderer({canvas:canvas.current,antialias:true,alpha:true,powerPreference:"high-performance"});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.8));renderer.outputColorSpace=THREE.SRGBColorSpace;
    const scene=new THREE.Scene();const camera=new THREE.PerspectiveCamera(34,1,.1,100);camera.position.z=9;
    const group=new THREE.Group();scene.add(group);
    const metal=new THREE.MeshStandardMaterial({color:0x22242a,metalness:.88,roughness:.25});
    const edge=new THREE.MeshStandardMaterial({color:0x75665f,metalness:.8,roughness:.25});
    const glass=new THREE.MeshPhysicalMaterial({color:0x203943,metalness:.32,roughness:.12,clearcoat:1,clearcoatRoughness:.04,transparent:true,opacity:.95});
    const inner=new THREE.MeshBasicMaterial({color:0x101a24,side:THREE.DoubleSide});
    const geom:import("three").BufferGeometry[]=[];
    function mesh(g:import("three").BufferGeometry,m:import("three").Material,z=0){geom.push(g);const obj=new THREE.Mesh(g,m);obj.position.z=z;group.add(obj);return obj}
    mesh(new THREE.CylinderGeometry(2.25,2.25,1.2,96,1,true),metal).rotation.x=Math.PI/2;
    mesh(new THREE.TorusGeometry(2.22,.15,16,110),edge,.65);
    mesh(new THREE.TorusGeometry(2.02,.10,16,110),metal,.76);
    mesh(new THREE.TorusGeometry(1.82,.07,12,110),edge,.83);
    mesh(new THREE.CircleGeometry(1.77,96),glass,.78);
    mesh(new THREE.CircleGeometry(1.55,96),inner,.85);
    const iris=new THREE.Group();iris.position.z=.89;group.add(iris);
    const bladeMaterial=new THREE.MeshStandardMaterial({color:0x080d13,metalness:.8,roughness:.22,side:THREE.DoubleSide});
    for(let i=0;i<7;i++){const shape=new THREE.Shape();shape.moveTo(-.06,-.12);shape.lineTo(1.65,-.3);shape.lineTo(1.3,1.25);shape.lineTo(.02,.22);shape.closePath();const g=new THREE.ShapeGeometry(shape);geom.push(g);const blade=new THREE.Mesh(g,bladeMaterial);blade.rotation.z=i*Math.PI*2/7;iris.add(blade)}
    mesh(new THREE.TorusGeometry(1.42,.025,8,96),edge,.94);
    const glint=mesh(new THREE.TorusGeometry(1.13,.014,8,96),new THREE.MeshBasicMaterial({color:0x7ea7bb,transparent:true,opacity:.45}),.96);glint.scale.y=.92;
    const light1=new THREE.PointLight(0xffae7b,55);light1.position.set(-3,4,5);scene.add(light1);
    const light2=new THREE.PointLight(0x9abed4,45);light2.position.set(4,-2,5);scene.add(light2);
    scene.add(new THREE.AmbientLight(0xffffff,.7));
    const size=()=>{if(!canvas.current||!renderer)return;const w=canvas.current.clientWidth,h=canvas.current.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix()};
    size();const observer=new ResizeObserver(size);observer.observe(canvas.current);
    let mouseX=0,mouseY=0;const pointer=(e:PointerEvent)=>{const b=canvas.current?.getBoundingClientRect();if(!b)return;mouseX=((e.clientX-b.left)/b.width-.5)*.36;mouseY=((e.clientY-b.top)/b.height-.5)*.3};
    canvas.current.addEventListener("pointermove",pointer);
    const animate=()=>{if(!renderer||!active)return;group.rotation.y+=(mouseX-group.rotation.y)*.04;group.rotation.x+=(-mouseY-group.rotation.x)*.04;group.rotation.z+=.0012;iris.scale.setScalar(Math.max(.08,1-focusRef.current/115));camera.position.z+=( (enteringRef.current?2.2:9)-camera.position.z)*.035;renderer.render(scene,camera);raf=requestAnimationFrame(animate)};
    animate();const el=canvas.current;
    dispose=()=>{cancelAnimationFrame(raf);observer.disconnect();el?.removeEventListener("pointermove",pointer);geom.forEach(g=>g.dispose());[metal,edge,glass,inner,bladeMaterial].forEach(m=>m.dispose());scene.traverse(o=>{if(o instanceof THREE.Mesh){const materials=Array.isArray(o.material)?o.material:[o.material];materials.forEach(m=>m.dispose())}});renderer?.dispose()};
   }catch{if(canvas.current)canvas.current.style.display="none"}
  };init();return()=>{active=false;dispose()};
 },[]);
 return <canvas ref={canvas} className="ttl-lens-canvas" aria-hidden="true"/>;
}
export default function LensExperience(){
 const [stage,setStage]=useState<Stage>("lens");const [focus,setFocus]=useState(15);const [selected,setSelected]=useState(0);const [reduced,setReduced]=useState(false);
 useEffect(()=>{setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches)},[]);
 const enter=()=>{if(reduced){setStage("gallery");return}setStage("entering");window.setTimeout(()=>setStage("gallery"),950)};
 return <main className="ttl">
  <header className="ttl-nav"><Link href="/#realisations"><ArrowLeft size={16}/> AT WEBLAB®</Link><span>THROUGH THE LENS / CONCEPT 003</span><Link href="/#contact">PARLER DE MON PROJET <ArrowUpRight size={15}/></Link></header>
  {(stage==="lens"||stage==="entering")&&<section className={`ttl-intro ${stage==="entering"?"ttl-entering":""}`}>
    <div className="ttl-lens-wrap"><div className="ttl-lens-fallback" aria-hidden="true"><Aperture size={180} strokeWidth={.45}/></div><LensCanvas focus={focus} entering={stage==="entering"}/></div>
    <div className="ttl-intro-copy"><p className="ttl-kicker">AT WEBLAB / EXPÉRIENCE IMMERSIVE</p><h1>THROUGH<br/>THE <em>LENS.</em></h1><p>Votre univers mérite plus qu'une galerie. Trouvez votre perspective, puis entrez dans l'image.</p></div>
    <div className="ttl-controls"><label htmlFor="ttl-focus">RÉGLEZ LA MISE AU POINT <span>{focus}%</span></label><input id="ttl-focus" type="range" min="0" max="100" value={focus} onChange={e=>setFocus(Number(e.target.value))}/><button disabled={focus<80||stage==="entering"} onClick={enter}>ENTRER DANS L'UNIVERS <ArrowRight size={18}/></button><button className="ttl-skip" onClick={()=>setStage("gallery")}>PASSER L'INTRODUCTION ↗</button></div>
    <span className="ttl-vertical">INTERAGISSEZ AVEC L'OBJECTIF</span>
   </section>}
  {(stage==="gallery"||stage==="detail")&&<section className="ttl-content">
   <div className="ttl-content-top"><p className="ttl-kicker">UNE GALERIE IMAGINÉE POUR LES CRÉATEURS D'IMAGES</p><button onClick={()=>{setStage("lens");setFocus(15)}}><RotateCcw size={15}/> REVOIR L'EXPÉRIENCE</button></div>
   {stage==="gallery"?<><h1>LE MONDE<br/><em>À TRAVERS L'OBJECTIF.</em></h1><p className="ttl-gallery-lead">Trois univers à explorer. Chaque projet raconte une intention et révèle une direction artistique.</p><div className="ttl-project-grid">{works.map((w,i)=><button key={w.name} className={`ttl-project ttl-${w.tone}`} onClick={()=>{setSelected(i);setStage("detail")}}><span>0{i+1} / {w.category}</span><div className="ttl-project-art"><span>{w.number}</span></div><strong>{w.name}</strong><span>EXPLORER LE PROJET <ArrowUpRight size={15}/></span></button>)}</div></>:<><button className="ttl-back" onClick={()=>setStage("gallery")}><ArrowLeft size={17}/> TOUS LES PROJETS</button><div className="ttl-detail"><div><p className="ttl-kicker">0{selected+1} / {works[selected].category} — CONCEPT FICTIF</p><h1>{works[selected].name}</h1><p>{works[selected].desc}</p><p>Cette étude de cas illustre la manière dont un portfolio peut présenter l'intention d'un projet, son univers visuel et ses différentes réalisations.</p><button onClick={()=>setSelected((selected+1)%works.length)}>PROJET SUIVANT <ArrowRight size={17}/></button></div><div className={`ttl-detail-art ttl-${works[selected].tone}`}><span>{works[selected].number}</span></div></div></>}
   <footer className="ttl-outro"><p>CONCEPT EXPÉRIMENTAL — AUCUN CLIENT OU PROJET RÉEL REPRÉSENTÉ.</p><h2>ET SI VOTRE TRAVAIL<br/><em>DEVENAIT UNE EXPÉRIENCE ?</em></h2><Link href="/#contact">CRÉER MON PORTFOLIO AVEC AT WEBLAB <ArrowUpRight size={20}/></Link></footer>
  </section>}
 </main>;
}
