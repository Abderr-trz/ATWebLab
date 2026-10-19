import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowDownRight, ArrowUpRight } from "lucide-react";

const entries = {
 "atelier-noir": {name:"ATELIER NOIR",eyebrow:"PORTFOLIO PHOTOGRAPHIQUE — CONCEPT",title:"L'ART DU",accent:"REGARD.",lead:"La photographie ne se résume pas à une image. C'est une intention, une atmosphère, une histoire.",labels:["ÉDITORIAL","CAMPAGNES","PORTRAITS"],theme:"fashion"},
 "frame-motion": {name:"FRAME / MOTION",eyebrow:"STUDIO DE PRODUCTION — CONCEPT",title:"MAKE IT",accent:"MOVE.",lead:"Chaque seconde compte. Des films qui donnent du rythme aux idées et de l'émotion aux marques.",labels:["BRAND FILMS","MUSIC VISUALS","STORYTELLING"],theme:"film"}
} as const;
type Slug=keyof typeof entries;
export function generateStaticParams(){return Object.keys(entries).map(slug=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
 const {slug}=await params;const item=entries[slug as Slug];return {title:item?`${item.name} — Concept AT WebLab`:"Concept AT WebLab",robots:{index:false,follow:false}};
}
export default async function Demo({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const item=entries[slug as Slug];
 if(!item)return <main style={{padding:"120px 8%"}}><h1>Concept introuvable</h1><Link href="/">Retour à AT WebLab</Link></main>;
 return <main className={`concept-demo-page concept-demo-${item.theme}`}>
  <nav className="demo-nav"><Link href="/#realisations"><ArrowLeft size={16}/> AT WEBLAB</Link><span>{item.name}</span><Link href="/#contact">PARLER DE MON PROJET <ArrowUpRight size={15}/></Link></nav>
  <section className="demo-hero"><div className="demo-orbit" aria-hidden="true"/><div className="demo-hero-content"><p className="demo-kicker">{item.eyebrow}</p><h1>{item.title}<br/><em>{item.accent}</em></h1><p className="demo-lead">{item.lead}</p><a href="#demo-work" className="demo-scroll">EXPLORER LES PROJETS <ArrowDownRight size={21}/></a></div><div className="demo-vertical">UN CONCEPT ORIGINAL PAR AT WEBLAB</div></section>
  <section className="demo-intro" id="demo-work"><div><span>01 / SÉLECTION</span><h2>{item.theme==="fashion"?"DES IMAGES QUI PARLENT.":"DES HISTOIRES EN MOUVEMENT."}</h2></div><p>{item.theme==="fashion"?"Une galerie pensée pour donner de l'espace à chaque série et guider les visiteurs vers les projets qui les intéressent.":"Une sélection de films présentée par univers pour faciliter la découverte du travail d'un studio."}</p></section>
  <section className="demo-gallery">{item.labels.map((label,i)=><article key={label} className={`demo-tile demo-tile-${i}`}><div className="demo-tile-art" aria-hidden="true"><span>{String(i+1).padStart(2,"0")}</span></div><div className="demo-tile-caption"><h3>{label}</h3><span>CONCEPT VISUEL / 0{i+1}</span></div></article>)}</section>
  <section className="demo-about"><span>02 / APPROCHE</span><h2>{item.theme==="fashion"?"UN UNIVERS. UNE SIGNATURE.":"UNE VISION. UN IMPACT."}</h2><p>Cette démonstration présente une direction artistique fictive. Elle illustre comment un portfolio peut structurer les projets, expliquer les prestations et faciliter une prise de contact professionnelle.</p></section>
  <section className="demo-contact"><p>CECI EST UN CONCEPT AT WEBLAB, PAS UN STUDIO CLIENT RÉEL.</p><h2>IMAGINONS<br/><em>LE VÔTRE.</em></h2><Link href="/#contact">DISCUTER DE VOTRE PORTFOLIO <ArrowUpRight size={20}/></Link></section>
  <footer className="demo-footer"><span>© AT WEBLAB — DÉMONSTRATION CRÉATIVE</span><Link href="/#realisations">RETOUR AUX RÉALISATIONS ↑</Link></footer>
 </main>;
}
