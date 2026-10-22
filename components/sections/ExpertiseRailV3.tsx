"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Clapperboard, Code2, Layers3, MoveUpRight } from "lucide-react";
import "./ExpertiseRailV3.css";

const items = [
 { en:"Creative Design", fr:"Design créatif", enDesc:"Digital identities and interfaces that stand apart.", frDesc:"Des identités et interfaces digitales qui se démarquent.", Icon:Layers3 },
 { en:"Web Development", fr:"Développement web", enDesc:"Fast, elegant websites engineered to perform.", frDesc:"Des sites élégants, rapides et pensés pour performer.", Icon:Code2 },
 { en:"Motion & 3D", fr:"Motion & 3D", enDesc:"Subtle motion and immersive digital storytelling.", frDesc:"Du mouvement subtil et des expériences immersives.", Icon:Clapperboard },
 { en:"Digital Strategy", fr:"Stratégie digitale", enDesc:"A clear direction from first impression to conversion.", frDesc:"Une direction claire, de la première impression à la conversion.", Icon:MoveUpRight }
];
export function ExpertiseRailV3(){
 const [active,setActive]=useState(0);
 const [language,setLanguage]=useState<"EN"|"FR">("EN");
 const root=useRef<HTMLElement>(null);
 useEffect(()=>{
  try { const saved=localStorage.getItem("atweblab-language"); if(saved==="EN"||saved==="FR") setLanguage(saved); } catch {}
  const onLanguage=(e:Event)=>{const value=(e as CustomEvent<string>).detail;if(value==="EN"||value==="FR")setLanguage(value);};
  window.addEventListener("atweblab-language-change",onLanguage);
  const section=root.current;
  if(section){
   if(!("IntersectionObserver" in window)||window.matchMedia("(prefers-reduced-motion: reduce)").matches)section.classList.add("v3-expertise--visible");
   else {const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){section.classList.add("v3-expertise--visible");observer.disconnect();}},{threshold:.1});observer.observe(section);return ()=>{window.removeEventListener("atweblab-language-change",onLanguage);observer.disconnect();};}
  }
  return ()=>window.removeEventListener("atweblab-language-change",onLanguage);
 },[]);
 const fr=language==="FR";
 return <section ref={root} className="v3-expertise" aria-labelledby="v3-expertise-heading">
  <div className="v3-expertise__wrap">
   <div className="v3-expertise__heading">
    <p className="v3-expertise__eyebrow"><span aria-hidden="true"/> {fr?"CE QUE NOUS FAISONS":"WHAT WE DO"}</p>
    <h2 id="v3-expertise-heading">{fr?"Des idées. Des expériences.":"Ideas into experiences."}</h2>
   </div>
   <div className="v3-expertise__cards" role="tablist" aria-label={fr?"Nos expertises":"Our expertise"}>
    {items.map(({en,fr:frLabel,Icon},index)=><button key={en} type="button" role="tab" id={"v3-expertise-tab-"+index} aria-selected={active===index} aria-controls="v3-expertise-panel" className={"v3-expertise__card"+(active===index?" is-active":"")} onClick={()=>setActive(index)} onMouseEnter={()=>{if(window.matchMedia("(hover: hover)").matches)setActive(index);}}>
     <Icon size={25} strokeWidth={1.5} aria-hidden="true"/><span>{fr?frLabel:en}</span><ArrowUpRight size={17} className="v3-expertise__arrow" aria-hidden="true"/>
    </button>)}
   </div>
   <div className="v3-expertise__detail" id="v3-expertise-panel" role="tabpanel" aria-labelledby={"v3-expertise-tab-"+active}>
    <span>0{active+1} / 04</span><p key={active+"-"+language}>{fr?items[active].frDesc:items[active].enDesc}</p><a href="#services">{fr?"Explorer nos services":"Explore our services"} <ArrowUpRight size={16}/></a>
   </div>
  </div>
 </section>;
}
