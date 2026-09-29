import { Check } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { NetworkField } from "@/components/ui/NetworkField";

const plans = [
  { name: "Site vitrine", price: "1 500", ideal: "Indépendants, petites entreprises et activités locales.", items: ["Site responsive", "Design professionnel", "Pages essentielles", "Contact / WhatsApp", "Nom de domaine", "Mise en ligne"], cta: "Choisir cette offre" },
  { name: "Site web complet", price: "3 500", ideal: "Entreprises ayant besoin de fonctionnalités plus avancées.", items: ["Frontend & backend", "Base de données", "Fonctionnalités personnalisées", "Domaine", "Mise en ligne"], cta: "Discuter du projet", featured: true },
  { name: "Boutique Shopify", price: "2 700", ideal: "Marques et entrepreneurs prêts à vendre en ligne.", items: ["Configuration boutique", "Design", "Pages essentielles", "Produits / collections", "Responsive", "Configuration initiale"], cta: "Créer ma boutique" }
];

export function Pricing() {
  return (
    <section id="tarifs" className="section pricing">
      <NetworkField variant="right" />
      <div className="container">
        <Reveal><SectionHeading number="05" title="Des tarifs simples et transparents." intro="Une base claire pour vous aider à cadrer votre projet dès le départ." /></Reveal>
        <div className="pricing-grid">
          {plans.map((plan, i) => <Reveal className={`price-card ${plan.featured ? "featured" : ""}`} key={plan.name} delay={i * .07}>
            {plan.featured && <span className="fit-label">Pour les projets évolutifs</span>}
            <h3>{plan.name}</h3><p className="ideal">{plan.ideal}</p><p className="from">À partir de</p><p className="price">{plan.price} <span>DH</span></p>
            <ul>{plan.items.map(item => <li key={item}><Check size={16} />{item}</li>)}</ul>
            <a className={`button ${plan.featured ? "button-light" : "button-outline"}`} href="#contact">{plan.cta}</a>
          </Reveal>)}
        </div>
        <p className="pricing-note">Chaque projet est différent. Le tarif final dépend des fonctionnalités et des besoins.</p>
      </div>
    </section>
  );
}
