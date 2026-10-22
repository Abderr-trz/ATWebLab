"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import "./ProcessV3.css";
const stages=[
 {en:"Discover",fr:"Découvrir",desc:"We learn about your work, audience and goals. No generic templates, just the right questions.",frDesc:"Nous découvrons votre activité, votre audience et vos objectifs. Chaque projet commence par les bonnes questions.",deliver:"Your vision, clarified.",frDeliver:"Votre vision, clarifiée."},
 {en:"Shape",fr:"Imaginer",desc:"We define the structure, visual direction and user journey. You see the concept before development begins.",frDesc:"Nous définissons la structure, la direction artistique et le parcours utilisateur. Vous découvrez le concept avant le développement.",deliver:"A direction you can approve.",frDeliver:"Une direction à valider."},
 {en:"Build",fr:"Créer",desc:"We bring the approved design to life with responsive development, considered motion and attention to detail.",frDesc:"Nous donnons vie au design validé avec un développement responsive, des animations soignées et le sens du détail.",deliver:"A website made for your work.",frDeliver:"Un site pensé pour votre travail."},
 {en:"Launch & evolve",fr:"Lancer et évoluer",desc:"We test, refine and launch your website, then guide you through the handover and agreed follow-up.",frDesc:"Nous testons, affinons et publions votre site, puis nous vous accompagnons lors de la prise en main et du suivi convenu.",deliver:"Ready for the world.",frDeliver:"Prêt à être découvert."}
];
export function Process(){
 const section=useRef<HTMLElement>(null);
 const [progress,setProgress]=useState(0);
 const [language,setLanguage]=useState<"EN"|"FR">("EN");
 useEffect(()=>{
  try{const stored=localStorage.getItem("atweblab-language");if(stored==="EN"||stored==="FR")setLanguage(stored);}catch{}
  const change=(event:Event)=>{const value=(event as CustomEvent<string>).detail;if(value==="EN"||value==="FR")setLanguage(value);};
  window.addEventListener("atweblab-language-change",change);
  return ()=>window.removeEventListener("atweblab-language-change",change);
 },[]);
 useEffect(()=>{
  let raf=0;
  const update=()=>{
   raf=0;
   if(!section.current)return;
   const rect=section.current.getBoundingClientRect();
   const travel=Math.max(1,rect.height-window.innerHeight);
   setProgress(Math.max(0,Math.min(1,-rect.top/travel)));
  };
  const schedule=()=>{if(!raf)raf=requestAnimationFrame(update);};
  update();
  window.addEventListener("scroll",schedule,{passive:true});
  window.addEventListener("resize",schedule);
  return ()=>{window.removeEventListener("scroll",schedule);window.removeEventListener("resize",schedule);if(raf)cancelAnimationFrame(raf);};
 },[]);
 const fr=language==="FR";
 const active=Math.min(stages.length-1,Math.floor(progress*stages.length));
 return <section ref={section} className="v3-process" id="process" aria-labelledby="v3-process-heading">
  <div className="v3-process__sticky">
   <div className="v3-process__inner">
    <div className="v3-process__top"><span className="v3-process__eyebrow"><span className="v3-process__dot"/> {fr?"NOTRE MÉTHODE":"OUR APPROACH"} / 05</span><span className="v3-process__counter">0{active+1} <span>/ 04</span></span></div>
    <div className="v3-process__layout">
     <div className="v3-process__intro"><h2 id="v3-process-heading">{fr?"De votre idée":"From your idea"}<br/><em>{fr?"à sa réalisation.":"to something real."}</em></h2><p>{fr?"Une méthode claire et collaborative, pour avancer avec confiance à chaque étape.":"A clear, collaborative process. No guesswork. No unnecessary complexity."}</p><a href="#contact">{fr?"Parlons de votre projet":"Start a conversation"} <ArrowUpRight size={18}/></a></div>
     <div className="v3-process__steps" aria-label={fr?"Étapes du projet":"Project steps"}>
      {stages.map((stage,index)=><div key={stage.en} className={"v3-process__step"+(index===active?" is-active":"")+(index<active?" is-done":"")}>
       <span className="v3-process__step-index">{index<active?<CheckCircle2 size={20}/>:String(index+1).padStart(2,"0")}</span>
       <div className="v3-process__step-copy"><h3>{fr?stage.fr:stage.en}</h3><div className="v3-process__step-description"><p>{fr?stage.frDesc:stage.desc}</p><strong>{fr?stage.frDeliver:stage.deliver}</strong></div></div>
       <span className="v3-process__step-line"/>
      </div>)}
     </div>
    </div>
    <div className="v3-process__bottom"><span>{fr?"UNE COLLABORATION, DU PREMIER ÉCHANGE À LA MISE EN LIGNE":"ONE PARTNERSHIP, FROM FIRST CONVERSATION TO LAUNCH"}</span><div className="v3-process__track"><span style={{transform:`scaleX(${progress})`}}/></div></div>
   </div>
  </div>
 </section>;
}
