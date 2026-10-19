import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { LiveProjectPreview } from "@/components/ui/LiveProjectPreview";

const concepts = [
 {slug:"atelier-noir",name:"ATELIER NOIR",category:"Concept · Portfolio photographe de mode",desc:"Un portfolio éditorial pour présenter des campagnes, des séries et faciliter les demandes de collaboration.",tone:"fashion"},
 {slug:"frame-motion",name:"FRAME / MOTION",category:"Concept · Studio vidéo",desc:"Un univers cinématographique pour organiser les films, présenter les prestations et recevoir des briefs.",tone:"film"}
];

export function Portfolio() {
 return <section id="realisations" className="section portfolio concept-portfolio">
  <div className="container">
   <Reveal><div className="concept-heading"><span>02 / SÉLECTION DE PROJETS</span><h2>Des univers qui<br/><em>racontent une histoire.</em></h2><p>Une réalisation existante et deux concepts originaux imaginés pour montrer comment un portfolio peut servir les créateurs d'images.</p></div></Reveal>
   <div className="concept-grid">
    <Reveal className="concept-card">
     <a href="https://portfolio.prodyous.co/" target="_blank" rel="noopener noreferrer" className="concept-cover concept-cover-prodyous"><div className="browser prodyous"><div className="browser-bar"><div><i/><i/><i/></div><span>portfolio.prodyous.co</span></div><LiveProjectPreview/></div><span className="concept-open"><ArrowUpRight/></span></a>
     <div className="concept-meta"><span>01 / RÉALISATION · PORTFOLIO CRÉATIF</span><h3>Prodyous</h3><p>Une présence digitale dédiée à la présentation de projets et d'une identité visuelle.</p><a href="https://portfolio.prodyous.co/" target="_blank" rel="noopener noreferrer">Voir le projet <ArrowUpRight size={17}/></a></div>
    </Reveal>
    {concepts.map((p,i)=><Reveal key={p.slug} className="concept-card" delay={(i+1)*.08}>
     <Link href={`/demo/${p.slug}`} className={`concept-cover concept-cover-${p.tone}`} aria-label={`Explorer le concept ${p.name}`}><span className="concept-cover-top">AT WEBLAB / CONCEPT 0{i+1}</span><strong>{p.tone==="fashion" ? <>L'ART<br/><i>DU REGARD.</i></> : <>MAKE<br/><i>IT MOVE.</i></>}</strong><span className="concept-cover-bottom">{p.name} — EXPÉRIENCE INTERACTIVE</span><span className="concept-open"><ArrowUpRight/></span></Link>
     <div className="concept-meta"><span>0{i+2} / {p.category.toUpperCase()}</span><h3>{p.name}</h3><p>{p.desc}</p><Link href={`/demo/${p.slug}`}>Explorer la démo <ArrowUpRight size={17}/></Link></div>
    </Reveal>)}
   </div>
   <div className="concept-end"><p>Votre travail mérite lui aussi une expérience sur mesure.</p><a href="#contact">Parlons de votre projet <ArrowUpRight size={18}/></a></div>
  </div>
 </section>;
}
