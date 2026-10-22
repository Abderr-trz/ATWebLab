"use client";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, Asterisk } from "lucide-react";
import "./HeroV3.css";

export function Hero() {
  const [language, setLanguage] = useState<"EN" | "FR">("EN");
  useEffect(() => {
    try { const stored = localStorage.getItem("atweblab-language"); if (stored === "EN" || stored === "FR") setLanguage(stored); } catch {}
    const onChange = (event: Event) => {
      const next = (event as CustomEvent<string>).detail;
      if (next === "EN" || next === "FR") setLanguage(next);
    };
    window.addEventListener("atweblab-language-change", onChange);
    return () => window.removeEventListener("atweblab-language-change", onChange);
  }, []);
  const fr = language === "FR";
  return (
    <section id="accueil" className="v3-hero">
      <div className="v3-hero__grid" aria-hidden="true"/>
      <div className="v3-hero__glow" aria-hidden="true"/>
      <div className="v3-hero__container">
        <div className="v3-hero__topline">
          <span><span className="v3-hero__dot"/> {fr ? "STUDIO DIGITAL CRÉATIF — MAROC" : "INDEPENDENT CREATIVE DIGITAL STUDIO — MOROCCO"}</span>
          <span>DESIGN / DEVELOPMENT / MOTION</span>
        </div>
        <div className="v3-hero__body">
          <p className="v3-hero__eyebrow"><Asterisk size={19} strokeWidth={1.6}/> AT WEBLAB — EST. 2026</p>
          <h1>{fr ? <>VOTRE TRAVAIL.<br/><em>INCONTOURNABLE.</em></> : <>YOUR WORK.<br/><em>UNMISSABLE.</em></>}</h1>
          <div className="v3-hero__bottom">
            <p>{fr ? "Nous concevons des expériences digitales audacieuses qui mettent votre travail en valeur et transforment l'attention en opportunités." : "We craft bold digital experiences that make your work impossible to overlook — and turn attention into opportunity."}</p>
            <div className="v3-hero__actions">
              <a className="v3-hero__primary" href="#realisations">{fr ? "Découvrir nos projets" : "Explore our work"} <ArrowUpRight size={19}/></a>
              <a className="v3-hero__secondary" href="#contact">{fr ? "Démarrer un projet" : "Start a project"} <ArrowUpRight size={17}/></a>
            </div>
          </div>
        </div>
        <div className="v3-hero__footer"><span>01 / 05 — AT WEBLAB</span><a href="#services">{fr ? "DÉFILER POUR EXPLORER" : "SCROLL TO EXPLORE"} <ArrowDown size={16}/></a><span>CASABLANCA · WORLDWIDE</span></div>
      </div>
    </section>
  );
}
