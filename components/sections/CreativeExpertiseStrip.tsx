"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Clapperboard, Code2, Compass, Palette } from "lucide-react";
import "./CreativeExpertiseStrip.css";

const expertise = [
  { title: "Creative Design", fr: "Design créatif", detail: "Distinctive identities and expressive digital experiences.", detailFr: "Des identités singulières et des expériences digitales expressives.", Icon: Palette },
  { title: "Development", fr: "Développement", detail: "Fast, responsive websites built with precision.", detailFr: "Des sites rapides, responsive et développés avec précision.", Icon: Code2 },
  { title: "Motion & 3D", fr: "Motion & 3D", detail: "Purposeful movement and cinematic storytelling.", detailFr: "Des mouvements maîtrisés et un storytelling cinématique.", Icon: Clapperboard },
  { title: "Digital Strategy", fr: "Stratégie digitale", detail: "Design decisions connected to real business goals.", detailFr: "Des choix créatifs au service de vrais objectifs business.", Icon: Compass },
];

export function CreativeExpertiseStrip() {
  const [active, setActive] = useState(0);
  const [language, setLanguage] = useState<"EN" | "FR">("EN");
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = root.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      section.classList.add("ces-visible");
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { section.classList.add("ces-visible"); observer.disconnect(); }
    }, { threshold: 0.15 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={root} className="ces-section" aria-label="AT WebLab creative expertise">
      <div className="ces-inner">
        <div className="ces-header">
          <div>
            <p className="ces-eyebrow"><span className="ces-light" /> AT WEBLAB / WHAT WE DO</p>
            <h2>{language === "FR" ? "Créativité. Avec intention." : "Creative by nature."}<br /><em>{language === "FR" ? "Construit pour durer." : "Built with purpose."}</em></h2>
          </div>
          <div className="ces-language" aria-label="Language">
            <button type="button" aria-pressed={language === "EN"} onClick={() => setLanguage("EN")}>EN</button>
            <span>/</span>
            <button type="button" aria-pressed={language === "FR"} onClick={() => setLanguage("FR")}>FR</button>
          </div>
        </div>
        <div className="ces-list" role="tablist" aria-label="Our expertise">
          {expertise.map(({ title, fr, Icon }, index) => (
            <button key={title} type="button" role="tab" id={"ces-tab-" + index}
              aria-selected={active === index} aria-controls="ces-panel"
              className={"ces-item" + (active === index ? " ces-active" : "")}
              onClick={() => setActive(index)}
              onMouseEnter={() => { if (window.matchMedia("(hover: hover)").matches) setActive(index); }}>
              <Icon size={25} strokeWidth={1.6} aria-hidden="true" />
              <span>{language === "FR" ? fr : title}</span>
              <ArrowUpRight size={16} className="ces-arrow" aria-hidden="true" />
            </button>
          ))}
        </div>
        <div className="ces-description" role="tabpanel" id="ces-panel" aria-labelledby={"ces-tab-" + active}>
          <span>0{active + 1} / 04</span>
          <p key={active + language}>{language === "FR" ? expertise[active].detailFr : expertise[active].detail}</p>
          <a href="#services">{language === "FR" ? "Découvrir nos services" : "Explore our services"} <ArrowUpRight size={17} /></a>
        </div>
      </div>
    </section>
  );
}
