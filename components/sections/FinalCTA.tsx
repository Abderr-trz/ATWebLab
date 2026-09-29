import { ArrowUpRight, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

export function FinalCTA() {
  return (
    <section className="section final-cta">
      <div className="cta-orbit" aria-hidden="true"><span /><span /></div>
      <div className="container">
        <Reveal className="final-cta-inner">
          <h2>Vous avez un projet en tête ?</h2>
          <p>Parlons de votre activité et voyons comment AT WebLab peut vous aider à construire une présence en ligne professionnelle.</p>
          <div><a className="button button-dark" href={site.whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={18} /> Discuter sur WhatsApp</a><a className="button button-clear" href="#contact">Demander un devis <ArrowUpRight size={18} /></a></div>
        </Reveal>
      </div>
    </section>
  );
}
