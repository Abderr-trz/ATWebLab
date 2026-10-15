import { ArrowDown, ArrowUpRight } from "lucide-react";
import { WebDevCube } from "@/components/ui/WebDevCube";
import { NetworkField } from "@/components/ui/NetworkField";

export function Hero() {
  return (
    <section id="accueil" className="hero">
      <NetworkField variant="right" />
      <div className="hero-grid" aria-hidden="true" />
      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="hero-kicker hero-animate hero-delay-1">Création de sites web · Maroc</p>
          <h1 className="hero-animate hero-delay-2">
            Votre business mérite mieux qu’une simple présence en ligne.
          </h1>
          <p className="hero-lead hero-animate hero-delay-3">
            AT WebLab conçoit des sites modernes, rapides et pensés pour transformer vos visiteurs en clients.
          </p>
          <div className="hero-actions hero-animate hero-delay-4">
            <a className="button button-light" href="#contact">Créer mon site <ArrowUpRight size={18} /></a>
            <a className="button button-ghost" href="#realisations">Voir nos réalisations</a>
          </div>
          <p className="trust-line hero-animate hero-delay-5"><span>Sites professionnels</span><span>Responsive</span><span>Livraison rapide</span></p>
        </div>
        <WebDevCube />
        <a className="hero-scroll" href="#services"><ArrowDown size={17} /> Découvrir</a>
      </div>
    </section>
  );
}
