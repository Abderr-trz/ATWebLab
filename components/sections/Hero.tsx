"use client";
import {useEffect,useState} from "react";
import {ArrowUpRight,ArrowDownRight} from "lucide-react";
import "./HeroV3.css";
export function Hero(){
 const [language,setLanguage]=useState<"EN"|"FR">("EN");
 useEffect(()=>{try{const v=localStorage.getItem("atweblab-language");if(v==="EN"||v==="FR")setLanguage(v);}catch{}const handler=(e:Event)=>{const v=(e as CustomEvent<string>).detail;if(v==="EN"||v==="FR")setLanguage(v);};window.addEventListener("atweblab-language-change",handler);return()=>window.removeEventListener("atweblab-language-change",handler);},[]);
 const fr=language==="FR";
 return <section id="accueil" className="v3-hero" aria-labelledby="v3-hero-title">
  <div className="v3-hero__inner">
   <div className="v3-hero__copy">
    <p className="v3-hero__eyebrow"><span className="v3-hero__signal"/>{fr?"STUDIO WEB CRÉATIF · MAROC":"INDEPENDENT CREATIVE WEB STUDIO · MOROCCO"}</p>
    <h1 id="v3-hero-title">{fr?<>Votre travail mérite<br/>un site qui <em>se démarque.</em></>:<>Your work deserves<br/>a website that <em>stands out.</em></>}</h1>
    <p className="v3-hero__description">{fr?"Nous créons des sites web élégants, intuitifs et pensés pour valoriser votre activité, renforcer votre crédibilité et donner envie de vous contacter.":"We create thoughtful, easy-to-use websites that showcase your work, build trust and help the right clients find you."}</p>
    <div className="v3-hero__actions"><a className="v3-hero__primary" href="#contact">{fr?"Discutons de votre projet":"Start a project"} <ArrowUpRight size={18}/></a><a className="v3-hero__secondary" href="#realisations">{fr?"Découvrir nos projets":"Explore our work"} <ArrowUpRight size={16}/></a></div>
    <div className="v3-hero__micro"><span>{fr?"DESIGN SUR MESURE":"CUSTOM DESIGN"}</span><span>{fr?"DÉVELOPPEMENT WEB":"WEB DEVELOPMENT"}</span><span>{fr?"EXPÉRIENCES DIGITALES":"DIGITAL EXPERIENCES"}</span></div>
   </div>
   <div className="v3-hero__visual" aria-label={fr?"Aperçu de nos projets":"Selected project previews"}>
    <a href="https://architecturewebsite-omega.vercel.app/" target="_blank" rel="noopener noreferrer" className="v3-hero__showcase v3-hero__showcase--architecture"><span className="v3-hero__showcase-top">01 / {fr?"ARCHITECTURE":"ARCHITECTURE"} <ArrowUpRight size={16}/></span><strong>Kenza Rachadi</strong><span>{fr?"Portfolio d'architecture":"Architecture portfolio"}</span></a>
    <a href="https://studio-difaf.vercel.app/" target="_blank" rel="noopener noreferrer" className="v3-hero__showcase v3-hero__showcase--studio"><span className="v3-hero__showcase-top">02 / {fr?"PHOTO & VIDÉO":"PHOTO & FILM"} <ArrowUpRight size={16}/></span><strong>Studio DIFAF</strong><span>{fr?"Studio créatif":"Creative studio"}</span></a>
    <div className="v3-hero__visual-label"><span>{fr?"QUELQUES PROJETS, UNE MÊME EXIGENCE":"DIFFERENT PROJECTS, SAME ATTENTION TO DETAIL"}</span><ArrowDownRight size={17}/></div>
   </div>
  </div>
 </section>;
}