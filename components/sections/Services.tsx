import { ArrowUpRight, Check } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { NetworkField } from "@/components/ui/NetworkField";

const services = [
  { title: "Site vitrine", desc: "Un site professionnel pour présenter votre activité, vos services et permettre à vos clients de vous contacter facilement.", items: ["Design moderne", "Responsive mobile", "Formulaire & WhatsApp", "Nom de domaine", "Mise en ligne"] },
  { title: "Site web sur mesure", desc: "Une solution complète avec des fonctionnalités adaptées aux besoins spécifiques de votre activité.", items: ["Frontend & backend", "Base de données", "Fonctionnalités personnalisées", "APIs", "Dashboard si nécessaire"] },
  { title: "Boutique Shopify", desc: "Création ou refonte d’une boutique professionnelle pensée pour présenter et vendre vos produits efficacement.", items: ["Configuration Shopify", "Design & pages essentielles", "Produits & collections", "Responsive", "Paiement & livraison"] }
];

export function Services() {
  return (
    <section id="services" className="section services">
      <NetworkField variant="right" />
      <div className="container">
        <Reveal><SectionHeading number="01" title="Des solutions web adaptées à votre business." intro="Un cadre solide, puis uniquement ce dont votre activité a réellement besoin." /></Reveal>
        <div className="service-list">
          {services.map((service, i) => (
            <Reveal className="service-row" key={service.title} delay={i * 0.07}>
              <div className="service-index">0{i + 1}</div>
              <div className="service-main"><h3>{service.title}</h3><p>{service.desc}</p></div>
              <ul>{service.items.map(item => <li key={item}><Check size={15} />{item}</li>)}</ul>
              <a href="#contact" aria-label={`Demander un devis pour ${service.title}`}>Demander un devis <ArrowUpRight size={17} /></a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
