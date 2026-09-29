import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LiveProjectPreview } from "@/components/ui/LiveProjectPreview";
import { LiveDoumiPreview } from "@/components/ui/LiveDoumiPreview";
import { NetworkField } from "@/components/ui/NetworkField";

const projects = [
  { name: "Prodyous", url: "https://prodyous.co/", desc: "Une présence digitale structurée et contemporaine, conçue pour présenter une offre avec clarté et guider naturellement vers la prise de contact.", tags: ["Web design", "Développement", "Responsive"], theme: "prodyous" },
  { name: "Doumi Physio", url: "https://doumi-phisio.vercel.app/", desc: "Un site rassurant et accessible pour un cabinet de physiothérapie, pensé pour rendre l’information médicale simple et la prise de rendez-vous évidente.", tags: ["Santé", "UX/UI", "Site vitrine"], theme: "doumi" }
];

function BrowserPreview({ theme, name }: { theme: string; name: string }) {
  return (
    <div className={`browser ${theme}`} aria-label={`Aperçu du projet ${name}`}>
      <div className="browser-bar"><div><i /><i /><i /></div><span>{theme === "prodyous" ? "prodyous.co" : "doumi-phisio.vercel.app"}</span></div>
      {theme === "prodyous" ? <LiveProjectPreview /> : theme === "doumi" ? <LiveDoumiPreview /> : <div className="browser-page">
        <div className="mock-nav"><b>{name}</b><span /><span /><span /></div>
        <div className="mock-hero">
          <div><small>{theme === "prodyous" ? "PRODYous" : "VOTRE BIEN-ÊTRE"}</small><strong>{theme === "prodyous" ? "Transformez votre vision en impact." : "Retrouvez votre mobilité, naturellement."}</strong><em /></div>
          <div className="mock-visual"><span /></div>
        </div>
        <div className="mock-cards"><span /><span /><span /></div>
      </div>}
    </div>
  );
}

export function Portfolio() {
  return (
    <section id="realisations" className="section portfolio">
      <NetworkField variant="wide" />
      <div className="container">
        <Reveal><SectionHeading number="03" title="Nos réalisations" intro="Deux univers différents, une même exigence de clarté et de finition." /></Reveal>
        <div className="projects">
          {projects.map((project, i) => (
            <article className="project" key={project.name}>
              <Reveal className="project-preview"><BrowserPreview theme={project.theme} name={project.name} /></Reveal>
              <Reveal className="project-copy" delay={0.1}>
                <p className="project-count">Projet {String(i + 1).padStart(2, "0")}</p>
                <h3>{project.name}</h3><p>{project.desc}</p>
                <div className="project-tags">{project.tags.map(t => <span key={t}>{t}</span>)}</div>
                <a href={project.url} target="_blank" rel="noreferrer">Voir le projet <ArrowUpRight size={18} /></a>
              </Reveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
