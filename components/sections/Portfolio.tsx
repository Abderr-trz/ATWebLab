"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, MoveRight, MousePointer2 } from "lucide-react";
import "./PortfolioV3.css";

const projects=[
 {name:"Prodyous",domain:"prodyous.co",url:"https://prodyous.co/",kind:"prodyous",enType:"Creative portfolio",frType:"Portfolio créatif",enDesc:"A distinctive digital presence built around visual storytelling.",frDesc:"Une présence digitale singulière centrée sur la narration visuelle."},
 {name:"Kenza Rachadi",domain:"architecturewebsite-omega.vercel.app",url:"https://architecturewebsite-omega.vercel.app/",kind:"kenza",enType:"Architecture portfolio",frType:"Portfolio d'architecture",enDesc:"An editorial experience shaped around architecture, space and detail.",frDesc:"Une expérience éditoriale dédiée à l'architecture, à l'espace et au détail."},
 {name:"Studio DIFAF",domain:"studio-difaf.vercel.app",url:"https://studio-difaf.vercel.app/",kind:"difaf",enType:"Photography & film",frType:"Photographie & vidéo",enDesc:"A cinematic showcase designed to put photography and film first.",frDesc:"Une vitrine cinématique qui met la photographie et la vidéo au premier plan."}
];

function WebsitePreview({kind}:{kind:string}){
 const files:Record<string,string>={prodyous:"/projects/prodyous-home.png",kenza:"/projects/kenza-home.png",difaf:"/projects/difaf-home.png"};
 const names:Record<string,string>={prodyous:"Prodyous — Vision Executed",kenza:"Kenza Rachadi — L'art d'habiter",difaf:"Studio DIFAF — Vos moments, notre regard"};
 return <div className={"v3-projects__website v3-projects__website--"+kind}>
  <img src={files[kind]} alt={names[kind]} loading="lazy" onError={event=>{event.currentTarget.style.display="none";event.currentTarget.parentElement?.classList.add("v3-projects__image-missing");}}/>
  <span className="v3-projects__missing-label">{names[kind]}</span>
 </div>;
}

export function Portfolio(){
 const root=useRef<HTMLElement>(null);
 const [progress,setProgress]=useState(0);
 const [selected,setSelected]=useState<number|null>(null);
 const [language,setLanguage]=useState<"EN"|"FR">("EN");
 useEffect(()=>{
  try{const stored=localStorage.getItem("atweblab-language");if(stored==="EN"||stored==="FR")setLanguage(stored);}catch{}
  const onLanguage=(e:Event)=>{const value=(e as CustomEvent<string>).detail;if(value==="EN"||value==="FR")setLanguage(value);};
  window.addEventListener("atweblab-language-change",onLanguage);
  return ()=>window.removeEventListener("atweblab-language-change",onLanguage);
 },[]);
 useEffect(()=>{
  let frame=0;
  const update=()=>{
   frame=0;if(!root.current)return;
   const bounds=root.current.getBoundingClientRect();
   const distance=Math.max(1,bounds.height-window.innerHeight);
   setProgress(Math.min(1,Math.max(0,-bounds.top/distance)));
  };
  const onScroll=()=>{if(!frame)frame=requestAnimationFrame(update);};
  update();window.addEventListener("scroll",onScroll,{passive:true});window.addEventListener("resize",onScroll);
  return ()=>{window.removeEventListener("scroll",onScroll);window.removeEventListener("resize",onScroll);if(frame)cancelAnimationFrame(frame);};
 },[]);
 const active=selected??Math.min(2,Math.floor(progress*3));
 const fr=language==="FR";
 return <section className="v3-projects" id="realisations" ref={root} aria-labelledby="v3-projects-title">
  <div className="v3-projects__sticky">
   <div className="v3-projects__header">
    <div><span className="v3-projects__eyebrow">04 / {fr?"PROJETS SÉLECTIONNÉS":"SELECTED PROJECTS"}</span><h2 id="v3-projects-title">{fr?"Explorez nos":"Explore the"} <em>{fr?"réalisations.":"work."}</em></h2></div>
    <p>{fr?"Chaque projet, une identité. Faites défiler pour explorer nos expériences digitales.":"Different projects. Distinct experiences. Scroll to explore the interfaces."}</p>
   </div>
   <div className="v3-projects__scene" aria-label={fr?"Galerie de projets":"Project gallery"}>
    <div className="v3-projects__ambient" aria-hidden="true"/>
    {projects.map((project,index)=>{
     const offset=index-(selected??progress*2);
     const isActive=index===active;
     return <a key={project.kind} href={project.url} target="_blank" rel="noopener noreferrer" className={"v3-projects__panel"+(isActive?" is-active":"")} style={{"--offset":offset,"--depth":Math.abs(offset),"--layer":10-index} as React.CSSProperties} aria-label={`${fr?"Ouvrir":"Open"} ${project.name}: ${project.domain}`} tabIndex={isActive?0:-1}>
      <div className="v3-projects__browser"><div className="v3-projects__browserbar"><div className="v3-projects__dots"><i/><i/><i/></div><span>{project.domain}</span><ArrowUpRight size={14}/></div><WebsitePreview kind={project.kind}/></div>
      <div className="v3-projects__panel-cta"><span>{fr?"VOIR LE PROJET":"VIEW LIVE PROJECT"}</span><ArrowUpRight size={17}/></div>
     </a>;
    })}
   </div>
   <div className="v3-projects__bottom">
    <div className="v3-projects__details" key={active+"-"+language}><span>0{active+1} / 0{projects.length} &nbsp;·&nbsp; {fr?projects[active].frType:projects[active].enType}</span><h3>{projects[active].name}</h3><p>{fr?projects[active].frDesc:projects[active].enDesc}</p><a href={projects[active].url} target="_blank" rel="noopener noreferrer">{fr?"Visiter le site":"Visit website"} <ArrowUpRight size={16}/></a></div>
    <div className="v3-projects__controls"><div className="v3-projects__pagination">{projects.map((project,index)=><button key={project.kind} type="button" className={index===active?"is-active":""} onClick={()=>setSelected(index)} aria-label={`Show ${project.name}`} aria-pressed={index===active}><span/></button>)}</div><button className="v3-projects__resume" type="button" onClick={()=>setSelected(null)}><MousePointer2 size={14}/>{fr?"Suivre le défilement":"Follow scroll"}</button><span className="v3-projects__scroll-label">{fr?"DÉFILER POUR EXPLORER":"SCROLL TO EXPLORE"} <MoveRight size={15}/></span></div>
   </div>
  </div>
 </section>;
}
