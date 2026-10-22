"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, MoveDownRight } from "lucide-react";
import "./SelectedProjects.css";

const projects = [
  { title: "Prodyous", category: "Creative portfolio", categoryFr: "Portfolio créatif", url: "https://prodyous.co/", tone: "prodyous", year: "2026" },
  { title: "Studio DIFAF", category: "Photography & film studio", categoryFr: "Studio photo & vidéo", url: "https://studio-difaf.vercel.app/", tone: "difaf", year: "2026" },
  { title: "Architecture", category: "Architecture & spatial design", categoryFr: "Architecture & design", url: "https://architecturewebsite-omega.vercel.app/", tone: "architecture", year: "2026" }
];

function ProjectCard({ project, index, french }: { project: typeof projects[number]; index: number; french: boolean }) {
  const [activated, setActivated] = useState(false);
  const card = useRef<HTMLElement>(null);
  return (
    <article ref={card} className={"sp-card sp-card--" + project.tone} style={{ ["--sp-order" as string]: index }}>
      <div className="sp-stage">
        <div className="sp-art" aria-hidden="true">
          <span className="sp-art-index">AT WEBLAB / {String(index + 1).padStart(2, "0")}</span>
          <strong>{project.title}</strong>
          <span className="sp-art-footer">DIGITAL EXPERIENCE <MoveDownRight size={19}/></span>
        </div>
        {activated && <iframe title={"Live preview of " + project.title} className="sp-live" src={project.url} loading="lazy" referrerPolicy="no-referrer" />}
        <div className="sp-overlay">
          <span className="sp-number">{String(index + 1).padStart(2, "0")} / 03</span>
          <div className="sp-actions">
            <button type="button" onClick={() => setActivated(v => !v)} aria-label={activated ? "Close preview" : "Load live preview"}>{activated ? (french ? "Fermer l’aperçu" : "Close preview") : (french ? "Aperçu interactif" : "Interactive preview")}</button>
            <a href={project.url} target="_blank" rel="noopener noreferrer" aria-label={"Open " + project.title + " website"}><ArrowUpRight size={19}/></a>
          </div>
        </div>
      </div>
      <div className="sp-meta">
        <div><h3>{project.title}</h3><p>{french ? project.categoryFr : project.category}</p></div>
        <span>{project.year} <ArrowUpRight size={16}/></span>
      </div>
    </article>
  );
}

export function Portfolio() {
  const [french, setFrench] = useState(false);
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const section = root.current;
    if (!section) return;
    const items = section.querySelectorAll(".sp-card");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      items.forEach(item => item.classList.add("sp-visible"));
      return;
    }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("sp-visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
    items.forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, []);
  return (
    <section ref={root} id="realisations" className="sp-section" aria-labelledby="sp-heading">
      <div className="sp-container">
        <div className="sp-intro">
          <div className="sp-eyebrow"><span className="sp-dot"/> AT WEBLAB / WORK / 03</div>
          <div className="sp-heading-line">
            <h2 id="sp-heading">{french ? "Projets sélectionnés" : "Selected Projects"}<span className="sp-period">.</span></h2>
            <div className="sp-lang" aria-label="Portfolio language"><button className={!french ? "active" : ""} onClick={() => setFrench(false)} aria-pressed={!french}>EN</button><span>/</span><button className={french ? "active" : ""} onClick={() => setFrench(true)} aria-pressed={french}>FR</button></div>
          </div>
          <p>{french ? "Des expériences digitales conçues pour révéler le caractère unique de chaque projet." : "A curated collection of distinctive digital experiences. Built to make creative work impossible to ignore."}</p>
        </div>
        <div className="sp-grid">{projects.map((project, index) => <ProjectCard key={project.title} project={project} index={index} french={french}/>)}</div>
        <div className="sp-bottom"><span>{french ? "Chaque projet a sa propre histoire." : "Every project has its own story."}</span><a href="#contact">{french ? "Parlons de votre projet" : "Have a project in mind?"} <ArrowUpRight size={19}/></a></div>
      </div>
    </section>
  );
}
