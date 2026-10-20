import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LiveProjectPreview } from "@/components/ui/LiveProjectPreview";
import { LiveDifafPreview } from "@/components/ui/LiveDifafPreview";
import { NetworkField } from "@/components/ui/NetworkField";

const projects = [
  { name: "Prodyous", url: "https://prodyous.co/", desc: "Un univers digital éditorial pour mettre en scène la photographie, la vidéo et la direction créative.", tags: ["Portfolio", "Direction créative", "Expérience immersive"], theme: "prodyous", status: "Projet publié" },
  { name: "Studio DIFAF", url: "https://studio-difaf.vercel.app/", desc: "Prototype de portfolio cinématique pour présenter des galeries photo et vidéo, des prestations et un parcours de demande de disponibilité.", tags: ["Prototype", "Photographie", "Cinématique"], theme: "difaf", status: "Prototype de démonstration" }
];

function BrowserPreview({ theme, name }: { theme: string; name: string }) {
  return (
    <div className={`browser ${theme}`} aria-label={`Aperçu du projet ${name}`}>
      <div className="browser-bar"><div><i /><i /><i /></div><span>{theme === "prodyous" ? "prodyous.co" : "studio-difaf.vercel.app"}</span></div>
      {theme === "prodyous" ? <LiveProjectPreview /> : <LiveDifafPreview />}
    </div>
  );
}

export function Portfolio() {
  return (
    <section id="realisations" className="section portfolio">
      <NetworkField variant="wide" />
      <div className="container">
        <Reveal><SectionHeading number="03" title="Expériences sélectionnées" intro="Des univers créatifs conçus pour mettre le travail visuel au premier plan." /></Reveal>
        <div className="projects">
          {projects.map((project, i) => (
            <article className="project" key={project.name}>
              <Reveal className="project-preview"><BrowserPreview theme={project.theme} name={project.name} /></Reveal>
              <Reveal className="project-copy" delay={0.1}>
                <p className="project-count">Projet {String(i + 1).padStart(2, "0")} · {project.status}</p>
                <h3>{project.name}</h3><p>{project.desc}</p>
                <div className="project-tags">{project.tags.map(t => <span key={t}>{t}</span>)}</div>
                <a href={project.url} target="_blank" rel="noopener noreferrer">Explorer le projet <ArrowUpRight size={18} /></a>
              </Reveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
