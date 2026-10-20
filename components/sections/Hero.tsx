import { ArrowDownRight, ArrowUpRight, Aperture } from "lucide-react";

export function Hero() {
  return (
    <section id="accueil" className="ce-hero" aria-labelledby="ce-hero-title">
      <div className="ce-hero-atmosphere" aria-hidden="true">
        <div className="ce-hero-frame ce-hero-frame-one" />
        <div className="ce-hero-frame ce-hero-frame-two" />
        <div className="ce-hero-light" />
        <div className="ce-hero-grain" />
      </div>
      <div className="ce-hero-content">
        <div className="ce-hero-eyebrow"><span className="ce-hero-line" /> STUDIO DIGITAL CRÉATIF · MAROC <span className="ce-hero-index">ÉDITION 001 / 2026</span></div>
        <h1 id="ce-hero-title" className="ce-hero-title"><span>AU-DELÀ</span><span className="ce-hero-title-second"><em>DU</em> CADRE<span className="ce-period">.</span></span></h1>
        <div className="ce-hero-bottom">
          <div className="ce-hero-description"><Aperture size={22} strokeWidth={1.25} aria-hidden="true" /><p>Sites web et expériences digitales sur mesure pour <strong>photographes, vidéastes et studios créatifs</strong> au Maroc. Votre univers mérite son propre espace.</p></div>
          <div className="ce-hero-ctas"><a className="ce-cta-primary" href="#contact">Démarrer un projet <ArrowUpRight size={19} /></a><a className="ce-cta-text" href="#realisations">Explorer nos réalisations <ArrowUpRight size={16} /></a></div>
        </div>
      </div>
      <div className="ce-hero-footer"><span>AT WEBLAB / CREATIVE EXPERIENCES</span><a href="#realisations" aria-label="Découvrir les réalisations">DÉFILER POUR EXPLORER <ArrowDownRight size={18}/></a><span>01 — 06</span></div>
    </section>
  );
}
