"use client";
import { useEffect, useState } from "react";
import { ArrowUpRight, MoveUpRight } from "lucide-react";
import "./PortfolioV3.css";

const projects=[
 {number:"01",name:"Prodyous",type:"Creative portfolio",frType:"Portfolio créatif",description:"A confident digital home for visual storytelling.",frDescription:"Un univers digital affirmé pour raconter des histoires visuelles.",url:"https://prodyous.co/",domain:"prodyous.co",theme:"prodyous",tag:"CREATIVE / PORTFOLIO"},
 {number:"02",name:"Studio DIFAF",type:"Photography & film studio",frType:"Studio photo & vidéo",description:"An elegant showcase built around the work, not the noise.",frDescription:"Une vitrine élégante qui laisse toute la place aux réalisations.",url:"https://studio-difaf.vercel.app/",domain:"studio-difaf.vercel.app",theme:"difaf",tag:"PHOTOGRAPHY / FILM"},
 {number:"03",name:"Kenza Rachadi",type:"Architecture portfolio",frType:"Portfolio architecture",description:"A considered editorial space for architecture and form.",frDescription:"Un espace éditorial soigné pour l'architecture et les formes.",url:"https://architecturewebsite-omega.vercel.app/",domain:"architecturewebsite-omega.vercel.app",theme:"architecture",tag:"ARCHITECTURE / EDITORIAL"}
];
export function Portfolio(){
 const [language,setLanguage]=useState<"EN"|"FR">("EN");
 useEffect(()=>{
  try{const saved=localStorage.getItem("atweblab-language");if(saved==="EN"||saved==="FR")setLanguage(saved);}catch{}
  const listener=(e:Event)=>{const next=(e as CustomEvent<string>).detail;if(next==="EN"||next==="FR")setLanguage(next);};
  window.addEventListener("atweblab-language-change",listener);
  return ()=>window.removeEventListener("atweblab-language-change",listener);
 },[]);
 const fr=language==="FR";
 return <section id="realisations" className="v3-work" aria-labelledby="v3-work-heading">
  <div className="v3-work__inner">
   <div className="v3-work__heading"><div><span className="v3-work__eyebrow"><i/> {fr?"PROJETS SÉLECTIONNÉS":"SELECTED PROJECTS"} / 2026</span><h2 id="v3-work-heading">{fr?"Notre travail.":"Work that"}<br/><em>{fr?"Notre signature.":"speaks for itself."}</em></h2></div><p>{fr?"Des expériences digitales créées pour donner à chaque projet une présence singulière.":"Digital experiences crafted to give every project its own unmistakable presence."}</p></div>
   <div className="v3-work__grid">{projects.map((project,index)=><a className={"v3-work__card v3-work__card--"+project.theme} key={project.name} href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.name} website`}>
    <div className="v3-work__art"><div className="v3-work__art-top"><span>{project.tag}</span><span>{project.number} / 03</span></div><div className="v3-work__art-center"><span className="v3-work__art-kicker">{project.type}</span><strong>{project.name}</strong><span className="v3-work__art-line"/></div><span className="v3-work__art-domain">{project.domain}</span><span className="v3-work__visit"><MoveUpRight size={23}/></span></div>
    <div className="v3-work__card-footer"><div><h3>{project.name}</h3><p>{fr?project.frDescription:project.description}</p></div><ArrowUpRight size={21}/></div>
   </a>)}</div>
   <div className="v3-work__closing"><span>AT WEBLAB / PROJECT INDEX</span><a href="#contact">{fr?"Votre projet pourrait être le prochain.":"Your project could be next."} <ArrowUpRight size={18}/></a></div>
  </div>
 </section>;
}
