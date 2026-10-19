import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { LiveProjectPreview } from "@/components/ui/LiveProjectPreview";

const projects = [
  {
    name: "Prodyous",
    url: "https://portfolio.prodyous.co/",
    category: "Portfolio créatif",
    description: "Une expérience digitale dédiée à la présentation de projets et à l'identité visuelle.",
    kind: "prodyous" as const,
    label: "Réalisation"
  },
  {
    name: "Smash Brothers Joint",
    url: "https://smash-burger-joint.vercel.app/",
    category: "Expérience de marque · Restaurant",
    description: "Une démonstration de site immersif pour une enseigne de restauration, avec une approche visuelle expressive.",
    kind: "demo" as const,
    label: "Démonstration"
  }
];

export function Portfolio() {
  return (
    <section id="realisations" className="section portfolio cx-portfolio" aria-labelledby="portfolio-title">
      <div className="container">
        <Reveal>
          <div className="cx-portfolio-heading">
            <p className="cx-portfolio-eyebrow">02 / Sélection de projets</p>
            <h2 id="portfolio-title">Des idées qui prennent <em>forme.</em></h2>
            <p>Des univers différents, une même ambition : une présence digitale soignée, claire et mémorable.</p>
          </div>
        </Reveal>
        <div className="cx-portfolio-grid">
          {projects.map((project, index) => (
            <Reveal className="cx-portfolio-card" key={project.name} delay={index * 0.1}>
              <a className="cx-portfolio-visual" href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Découvrir ${project.name}`}>
                {project.kind === "prodyous" ? (
                  <div className="browser prodyous">
                    <div className="browser-bar"><div><i /><i /><i /></div><span>portfolio.prodyous.co</span></div>
                    <LiveProjectPreview />
                  </div>
                ) : (
                  <div className="cx-portfolio-demo" aria-hidden="true">
                    <span className="cx-demo-brand">SMASH / BROTHERS</span>
                    <span className="cx-demo-center">SMASH<br /><em>THE ORDINARY.</em></span>
                    <span className="cx-demo-bottom">BRAND EXPERIENCE — CONCEPT WEBSITE</span>
                  </div>
                )}
                <span className="cx-portfolio-open" aria-hidden="true"><ArrowUpRight size={24}/></span>
              </a>
              <div className="cx-portfolio-details">
                <div><span className="cx-portfolio-type">{project.label} · {project.category}</span><h3>{project.name}</h3><p>{project.description}</p></div>
                <a href={project.url} target="_blank" rel="noopener noreferrer">Explorer <ArrowUpRight size={18}/></a>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="cx-portfolio-footer"><p>Votre projet pourrait être le prochain.</p><a href="#contact">Parlons-en <ArrowUpRight size={18}/></a></div>
      </div>
    </section>
  );
}
