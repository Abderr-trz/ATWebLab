"use client";
import Image from "next/image";
import {usePathname} from "next/navigation";
import {useEffect,useState} from "react";
import {ArrowUpRight,Menu,X} from "lucide-react";
const links=[{en:"About",fr:"À propos",href:"#about"},{en:"Services",fr:"Services",href:"#services"},{en:"Our work",fr:"Projets",href:"#realisations"},{en:"Process",fr:"Méthode",href:"#process"}];
export function Navbar(){
 const pathname=usePathname();const [open,setOpen]=useState(false);const [scrolled,setScrolled]=useState(false);const [language,setLanguage]=useState<"EN"|"FR">("EN");
 const href=(anchor:string)=>pathname==="/"?anchor:"/"+anchor;
 useEffect(()=>{const scroll=()=>setScrolled(window.scrollY>18);scroll();window.addEventListener("scroll",scroll,{passive:true});return()=>window.removeEventListener("scroll",scroll);},[]);
 useEffect(()=>{try{const v=localStorage.getItem("atweblab-language");if(v==="EN"||v==="FR")setLanguage(v);}catch{}const change=(e:Event)=>{const v=(e as CustomEvent<string>).detail;if(v==="EN"||v==="FR")setLanguage(v);};window.addEventListener("atweblab-language-change",change);return()=>window.removeEventListener("atweblab-language-change",change);},[]);
 const changeLanguage=(v:"EN"|"FR")=>{setLanguage(v);try{localStorage.setItem("atweblab-language",v);}catch{}window.dispatchEvent(new CustomEvent("atweblab-language-change",{detail:v}));};
 return <header className={"v3-nav v3-nav--editorial"+(scrolled?" v3-nav--scrolled":"")}>
  <div className="v3-nav__inner">
   <a href={href("#accueil")} className="v3-nav__brand" aria-label="AT WebLab home"><Image src="/logo.png" alt="" width={37} height={37} priority/><span>AT WebLab<span className="v3-nav__brand-dot">.</span></span></a>
   <nav className="v3-nav__links" aria-label="Main navigation">{links.map(item=><a key={item.href} href={href(item.href)}>{language==="FR"?item.fr:item.en}</a>)}</nav>
   <div className="v3-nav__actions"><div className="v3-nav__language" aria-label="Language"><button type="button" aria-pressed={language==="EN"} onClick={()=>changeLanguage("EN")}>EN</button><span>/</span><button type="button" aria-pressed={language==="FR"} onClick={()=>changeLanguage("FR")}>FR</button></div><a className="v3-nav__cta" href={href("#contact")}>{language==="FR"?"Parlons-en":"Let's talk"} <ArrowUpRight size={15}/></a><button type="button" className="v3-nav__toggle" onClick={()=>setOpen(v=>!v)} aria-expanded={open} aria-label={open?"Close menu":"Open menu"}>{open?<X size={22}/>:<Menu size={22}/>}</button></div>
  </div>
  {open&&<nav className="v3-nav__mobile" aria-label="Mobile navigation">{links.map(item=><a key={item.href} href={href(item.href)} onClick={()=>setOpen(false)}>{language==="FR"?item.fr:item.en}</a>)}<a href={href("#contact")} onClick={()=>setOpen(false)}>{language==="FR"?"Contactez-nous":"Contact us"}</a></nav>}
 </header>;
}