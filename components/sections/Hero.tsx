"use client";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import "./HeroV3.css";

export function Hero() {
  const [language, setLanguage] = useState<"EN" | "FR">("EN");
  useEffect(() => {
    try { const saved = localStorage.getItem("atweblab-language"); if (saved === "EN" || saved === "FR") setLanguage(saved); } catch {}
    const onLanguage = (event: Event) => { const next = (event as CustomEvent<string>).detail; if (next === "EN" || next === "FR") setLanguage(next); };
    window.addEventListener("atweblab-language-change", onLanguage);
    return () => window.removeEventListener("atweblab-language-change", onLanguage);
  }, []);
  const fr = language === "FR";
  return (
    <section id="accueil" className="v3-hero v3-hero--minimal">
      <div className="v3-hero__grid" aria-hidden="true" />
      <div className="v3-hero__glow" aria-hidden="true" />
      <div className="v3-hero__container">
        <div className="v3-hero__body">
          <p className="v3-hero__eyebrow">{fr ? "AT WEBLAB · STUDIO DIGITAL CRÉATIF" : "AT WEBLAB · CREATIVE DIGITAL STUDIO"}</p>
          <h1>{fr ? <>Nous créons des <em>sites web premium.</em></> : <>We build <em>premium websites.</em></>}</h1>
          <p className="v3-hero__description">{fr ? "Design, développement et expériences digitales pour faire rayonner votre activité." : "Design, development and digital experiences that make your business stand out."}</p>
          <div className="v3-hero__actions">
            <a className="v3-hero__primary" href="#contact">{fr ? "Parlons de votre projet" : "Let's work together"} <span className="v3-hero__button-icon"><ArrowUpRight size={21}/></span></a>
            <a className="v3-hero__secondary" href="#realisations">{fr ? "Voir nos projets" : "See our projects"}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
