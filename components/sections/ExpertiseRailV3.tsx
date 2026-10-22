"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Clapperboard, Code2, Layers3, Compass } from "lucide-react";
import "./ExpertiseRailV3.css";

const expertise = [
 { en:"Creative Design", fr:"Design créatif", Icon:Layers3,
   enHeadline:"Design that makes an impression.", frHeadline:"Un design qui marque les esprits.",
   enBody:"We shape distinctive visual identities and intuitive interfaces so your work is instantly recognizable, memorable and worth exploring.",
   frBody:"Nous créons des identités visuelles singulières et des interfaces intuitives pour rendre votre travail reconnaissable et mémorable.",
   enValue:"Stand out from the first second.", frValue:"Faites la différence dès la première seconde." },
 { en:"Web Development", fr:"Développement web", Icon:Code2,
   enHeadline:"Beautiful. Fast. Built to perform.", frHeadline:"Beau. Rapide. Pensé pour performer.",
   enBody:"From a seamless mobile experience to polished interactions, we build reliable websites that turn curiosity into meaningful enquiries.",
   frBody:"Du mobile aux interactions soignées, nous développons des sites fiables qui transforment l'intérêt des visiteurs en demandes concrètes.",
   enValue:"Turn visitors into opportunities.", frValue:"Transformez les visites en opportunités." },
 { en:"Motion & 3D", fr:"Motion & 3D", Icon:Clapperboard,
   enHeadline:"Bring your story to life.", frHeadline:"Donnez vie à votre histoire.",
   enBody:"Purposeful animation, immersive 3D and cinematic transitions add depth to your brand without distracting from what matters.",
   frBody:"Des animations maîtrisées, de la 3D immersive et des transitions cinématiques donnent du relief à votre marque sans distraire.",
   enValue:"Make every interaction memorable.", frValue:"Rendez chaque interaction mémorable." },
 { en:"Digital Strategy", fr:"Stratégie digitale", Icon:Compass,
   enHeadline:"Creativity with a clear direction.", frHeadline:"La créativité avec une vraie direction.",
   enBody:"We connect your positioning, storytelling and user journey to help the right audience understand your value and take action.",
   frBody:"Nous relions votre positionnement, votre message et le parcours utilisateur pour aider votre audience à comprendre votre valeur et agir.",
   enValue:"Designed for real business goals.", frValue:"Pensé pour vos objectifs business." }
];
export function ExpertiseRailV3(){
 const root=useRef<HTMLElement>(null);
 const [progress,setProgress]=useState(0);
 const [selected,setSelected]=useState<number|null>(null);
 const [language,setLanguage]=useState<"EN"|"FR">("EN");
 useEffect(()=>{
  try {const saved=localStorage.getItem("atweblab-language");if(saved==="EN"||saved==="FR")setLanguage(saved);}catch{}
  const onLanguage=(e:Event)=>{const value=(e as CustomEvent<string>).detail;if(value==="EN"||value==="FR")setLanguage(value);};
  window.addEventListener("atweblab-language-change",onLanguage);
  return ()=>window.removeEventListener("atweblab-language-change",onLanguage);
 },[]);
 useEffect(()=>{
  const section=root.current;if(!section)return;
  section.classList.add("v3-expertise--visible");
  if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  let frame=0;
  const update=()=>{
   frame=0;
   const bounds=section.getBoundingClientRect();
   const distance=Math.max(1,bounds.height-window.innerHeight);
   setProgress(Math.min(1,Math.max(0,-bounds.top/distance)));
  };
  const onScroll=()=>{if(!frame)frame=requestAnimationFrame(update);};
  update();window.addEventListener("scroll",onScroll,{passive:true});window.addEventListener("resize",onScroll);
  return ()=>{window.removeEventListener("scroll",onScroll);window.removeEventListener("resize",onScroll);if(frame)cancelAnimationFrame(frame);};
 },[]);
 const active=selected??Math.min(3,Math.floor(progress*4));
 const item=expertise[active],fr=language==="FR";
 return <section ref={root} className="v3-expertise" id="expertise" aria-labelledby="v3-expertise-heading">
  <div className="v3-expertise__wrap">
   <div className="v3-expertise__progress" aria-hidden="true"><span style={{transform:`scaleX(${progress})`}}/></div>
   <div className="v3-expertise__heading">
    <p className="v3-expertise__eyebrow"><span aria-hidden="true"/>{fr?"NOTRE EXPERTISE":"WHAT WE DO"}</p>
    <h2 id="v3-expertise-heading">{fr?"Des idées aux expériences.":"Ideas into experiences."}</h2>
    <p className="v3-expertise__intro">{fr?"Quatre expertises, une seule ambition : valoriser votre travail.":"Four disciplines. One purpose: make your work stand out."}</p>
   </div>
   <div className="v3-expertise__cards" aria-label={fr?"Nos expertises":"Our expertise"}>
    {expertise.map(({en,fr:frName,Icon},index)=><button key={en} type="button" className={"v3-expertise__card"+(active===index?" is-active":"")} aria-pressed={active===index} onClick={()=>setSelected(index)} onMouseEnter={()=>{if(window.matchMedia("(hover: hover)").matches)setSelected(index);}}>
      <span className="v3-expertise__cardnumber">0{index+1}</span>
      <Icon size={28} strokeWidth={1.5} aria-hidden="true"/>
      <span className="v3-expertise__cardtitle">{fr?frName:en}</span>
      <ArrowUpRight size={18} className="v3-expertise__arrow" aria-hidden="true"/>
    </button>)}
   </div>
   <div className="v3-expertise__detail" aria-live="polite">
    <div className="v3-expertise__detail-index">0{active+1} <span>/ 04</span></div>
    <div className="v3-expertise__detail-copy" key={active+"-"+language}>
      <h3>{fr?item.frHeadline:item.enHeadline}</h3>
      <p>{fr?item.frBody:item.enBody}</p>
      <strong>{fr?item.frValue:item.enValue}</strong>
    </div>
    <a href="#contact">{fr?"Parlons de votre projet":"Let's discuss your project"} <ArrowUpRight size={17}/></a>
   </div>
   <div className="v3-expertise__foot"><span>{fr?"DÉFILEZ POUR DÉCOUVRIR":"SCROLL TO EXPLORE"}</span><button type="button" onClick={()=>setSelected(null)}>{fr?"Reprendre le défilement":"Follow scroll"} ↗</button></div>
  </div>
 </section>;
}
