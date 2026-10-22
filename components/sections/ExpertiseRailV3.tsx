"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Clapperboard, Code2, Layers3, MoveUpRight } from "lucide-react";
import "./ExpertiseRailV3.css";

const items = [
 { en:"Creative Design",fr:"Design créatif",Icon:Layers3 },
 { en:"Web Development",fr:"Développement web",Icon:Code2 },
 { en:"Motion & 3D",fr:"Motion & 3D",Icon:Clapperboard },
 { en:"Digital Strategy",fr:"Stratégie digitale",Icon:MoveUpRight }
];
const slides = [
 { category:0,number:"01",label:"KENZA RACHADI / CREATIVE DESIGN",title:"Architecture, presented with intention.",frTitle:"L'architecture mise en valeur.",desc:"An editorial digital portfolio where imagery, typography and space tell the story.",frDesc:"Un portfolio éditorial où les images, la typographie et l'espace racontent une histoire.",kind:"architecture",link:"https://architecturewebsite-omega.vercel.app/" },
 { category:0,number:"02",label:"PLANTA / EXPERIENCE DESIGN",title:"A website that works like a building.",frTitle:"Un site pensé comme un bâtiment.",desc:"A blueprint-inspired concept connecting discovery, booking and a member experience.",frDesc:"Un concept inspiré des plans d'architecte, de la découverte à la réservation.",kind:"blueprint",link:"" },
 { category:1,number:"03",label:"PLANTA / WEB DEVELOPMENT",title:"Many screens. One seamless experience.",frTitle:"Plusieurs écrans. Une seule expérience.",desc:"An interface system designed for discovery, memberships, bookings and everyday use.",frDesc:"Un système d'interfaces pensé pour la découverte, les abonnements et les réservations.",kind:"screens",link:"" },
 { category:2,number:"04",label:"MOTION / DIGITAL EXPERIENCES",title:"Made to move.",frTitle:"Des expériences en mouvement.",desc:"Purposeful transitions and micro-interactions that make every moment memorable.",frDesc:"Des transitions et micro-interactions qui donnent du caractère à chaque instant.",kind:"motion",link:"" },
 { category:3,number:"05",label:"STRATEGY / DIRECTION",title:"Designed for impact.",frTitle:"Pensé pour avoir un impact.",desc:"A thoughtful balance of storytelling, usability and clear calls to action.",frDesc:"Un équilibre entre narration, ergonomie et appels à l'action.",kind:"strategy",link:"" }
];
function ScrollMotionVideo({progress}:{progress:number}){
 const videoRef=useRef<HTMLVideoElement>(null);
 const [available,setAvailable]=useState(true);
 useEffect(()=>{
  const video=videoRef.current;
  if(!video||!available)return;
  const seek=()=>{
   if(!Number.isFinite(video.duration)||video.duration<=0)return;
   // Motion scene occupies the fourth of five scroll stages.
   const stageStart=3/5,stageEnd=4/5;
   const local=Math.min(1,Math.max(0,(progress-stageStart)/(stageEnd-stageStart)));
   const next=Math.max(0,Math.min(video.duration-.03,local*video.duration));
   if(Math.abs(video.currentTime-next)>.06){try{video.currentTime=next;}catch{}}
  };
  video.addEventListener("loadedmetadata",seek);
  seek();
  return ()=>video.removeEventListener("loadedmetadata",seek);
 },[progress,available]);
 return <div className="v3-showcase__motion-video">
   {available?<video ref={videoRef} src="/projects/orbit-motion.mp4" muted playsInline preload="metadata" aria-label="ORBIT 3D animation synchronized with scrolling" onError={()=>setAvailable(false)}/>:<div className="v3-showcase__motion-fallback"><span>ORBIT / 3D MOTION</span><p>Motion reel coming soon</p></div>}
   <div className="v3-showcase__motion-caption">ORBIT — SCROLL-DRIVEN MOTION <span>3D / 01</span></div>
 </div>;
}
function Visual({kind,progress}:{kind:string,progress:number}){
 if(kind==="motion")return <ScrollMotionVideo progress={progress}/>;
 if(kind==="architecture")return <div className="v3-showcase__architecture"><div className="v3-showcase__browser v3-showcase__browser--mockup"><div className="v3-showcase__browserbar"><span/><span/><span/><small>KENZA RACHADI — PORTFOLIO MOCKUP</small></div><div className="v3-showcase__mockup-viewport"><img src="/projects/kenza-rachadi-mockup.png" alt="Maquette du portfolio architectural de Kenza Rachadi, capture complète fournie par le studio" loading="lazy" onError={(event)=>{event.currentTarget.style.display="none";event.currentTarget.parentElement?.classList.add("v3-showcase__mockup-missing");}}/><p className="v3-showcase__asset-notice">Kenza Rachadi — Portfolio architectural</p></div></div></div>;
 if(kind==="blueprint")return <div className="v3-showcase__blueprint"><div className="v3-showcase__blueprintcopy"><small>01 — THE BRIEF</small><strong>A website that works like a building.</strong><p>Every page is a room. Every interaction has a purpose.</p></div><div className="v3-showcase__plan" aria-hidden="true"><div className="v3-showcase__room room-a"/><div className="v3-showcase__room room-b"/><div className="v3-showcase__room room-c"/><div className="v3-showcase__room room-d"/><div className="v3-showcase__planlabel label-a">01 / LOBBY</div><div className="v3-showcase__planlabel label-b">02 / BOOKING</div><div className="v3-showcase__planlabel label-c">03 / MEMBERS</div></div><span className="v3-showcase__sheet">PROJECT / PLANTA · CONCEPT DRAWING / 01</span></div>;
 if(kind==="screens")return <div className="v3-showcase__screens"><div className="v3-showcase__screen screen-one"><div className="v3-showcase__screenbar">PLANTA <span>Explore · Locations · Membership</span></div><div className="v3-showcase__screenhero">Your space.<br/>Your pace.</div><div className="v3-showcase__screenbutton">Find a location →</div></div><div className="v3-showcase__screen screen-two"><div className="v3-showcase__screenbar">PLANTA <span>Membership</span></div><h3>One membership.<br/>Every city.</h3><div className="v3-showcase__pricing"><span>Day Pass<br/><b>€25</b></span><span>Flex<br/><b>€190</b></span><span>Unlimited<br/><b>€390</b></span></div></div><div className="v3-showcase__screen screen-three"><div className="v3-showcase__screenbar">PLANTA <span>Book a room</span></div><h3>Find your flow.</h3><div className="v3-showcase__fakeform"><span>Choose location</span><span>Choose a date</span><span>Explore spaces →</span></div></div><div className="v3-showcase__screenscaption">INTERFACE SYSTEM / CONCEPT PRESENTATION</div></div>;
 return <div className={"v3-showcase__abstract "+(kind==="motion"?"v3-showcase__abstract--motion":"v3-showcase__abstract--strategy")}><span className="v3-showcase__orb"/><span className="v3-showcase__orb v3-showcase__orb--second"/><strong>{kind==="motion"?"MOTION IS MEANING.":"CLARITY CREATES IMPACT."}</strong></div>;
}
export function ExpertiseRailV3(){
 const root=useRef<HTMLElement>(null);
 const [progress,setProgress]=useState(0);
 const [manual,setManual]=useState<number|null>(null);
 const [language,setLanguage]=useState<"EN"|"FR">("EN");
 useEffect(()=>{
  try{const saved=localStorage.getItem("atweblab-language");if(saved==="EN"||saved==="FR")setLanguage(saved);}catch{}
  const onLanguage=(e:Event)=>{const value=(e as CustomEvent<string>).detail;if(value==="EN"||value==="FR")setLanguage(value);};
  window.addEventListener("atweblab-language-change",onLanguage);
  return ()=>window.removeEventListener("atweblab-language-change",onLanguage);
 },[]);
 useEffect(()=>{
  const section=root.current;if(!section)return;
  const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  section.classList.add("v3-expertise--visible");
  if(reduced)return;
  let frame=0;
  const update=()=>{
   frame=0;const rect=section.getBoundingClientRect();
   const travel=Math.max(1,rect.height-window.innerHeight);
   setProgress(Math.min(1,Math.max(0,-rect.top/travel)));
  };
  const onScroll=()=>{if(!frame)frame=requestAnimationFrame(update);};
  update();window.addEventListener("scroll",onScroll,{passive:true});window.addEventListener("resize",onScroll);
  return ()=>{window.removeEventListener("scroll",onScroll);window.removeEventListener("resize",onScroll);if(frame)cancelAnimationFrame(frame);};
 },[]);
 const active=manual??Math.min(slides.length-1,Math.floor(progress*slides.length));
 const slide=slides[active];
 const fr=language==="FR";
 const select=(index:number)=>{setManual(index);window.setTimeout(()=>setManual(null),3500);};
 return <section className="v3-expertise v3-showcase" ref={root} aria-labelledby="v3-expertise-heading">
  <div className="v3-expertise__wrap">
   <div className="v3-expertise__progress" aria-hidden="true"><span style={{transform:`scaleX(${progress})`}}/></div>
   <div className="v3-showcase__top"><div><p className="v3-expertise__eyebrow"><span aria-hidden="true"/>{fr?"NOTRE SAVOIR-FAIRE":"WHAT WE DO"}</p><h2 id="v3-expertise-heading">{fr?"Des idées aux expériences.":"Ideas into experiences."}</h2></div><span className="v3-showcase__counter">0{active+1} / 0{slides.length}</span></div>
   <div className="v3-showcase__tabs" aria-label={fr?"Nos expertises":"Our expertise"}>
    {items.map(({en,fr:frLabel,Icon},index)=><button type="button" key={en} className={slide.category===index?"is-active":""} onClick={()=>select(slides.findIndex(s=>s.category===index))} aria-pressed={slide.category===index}><Icon size={17}/>{fr?frLabel:en}</button>)}
   </div>
   <div className="v3-showcase__stage" key={slide.kind}>
    <div className="v3-showcase__visual"><Visual kind={slide.kind} progress={progress}/></div>
    <div className="v3-showcase__info"><span>{slide.label}</span><h3>{fr?slide.frTitle:slide.title}</h3><p>{fr?slide.frDesc:slide.desc}</p>{slide.link&&<a href={slide.link} target="_blank" rel="noopener noreferrer">{fr?"Voir le projet":"View project"} <ArrowUpRight size={16}/></a>}</div>
   </div>
   <div className="v3-showcase__bottom"><span>{fr?"DÉFILEZ POUR EXPLORER":"SCROLL TO EXPLORE"}</span><div>{slides.map((s,i)=><button type="button" aria-label={`Show slide ${i+1}`} aria-current={active===i?"step":undefined} key={s.number} onClick={()=>select(i)} />)}</div><span>{slide.number} / {slide.label.split(" / ")[0]}</span></div>
  </div>
 </section>;
}
