import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const benefits = [
  ["Design professionnel", "Un design soigné qui reflète votre activité et met vos services en valeur."],
  ["Adapté à tous les écrans", "Une navigation claire et confortable sur smartphone, tablette et ordinateur."],
  ["Rapidité et simplicité", "Des pages rapides, des informations faciles à trouver et des boutons de contact accessibles."],
  ["Accompagnement de A à Z", "Nous vous guidons dans les choix du contenu, du design et des fonctionnalités jusqu’à la mise en ligne."],
  ["Suivi après livraison", "Après la mise en ligne, nous restons disponibles pour vous aider à prendre en main votre site et répondre à vos questions, selon le suivi convenu."],
  ["Échange direct et cadre clair", "Un interlocuteur unique, un devis détaillé et des étapes définies pour avancer sereinement."]
];

export function WhyUs() {
  return (
    <section className="section why-us">
      <div className="container why-layout">
        <Reveal><SectionHeading number="02" title="Pourquoi choisir AT WebLab ?" intro="La crédibilité ne vient pas de promesses abstraites. Elle vient d’un travail clair, soigné et adapté." /></Reveal>
        <div className="benefit-list">
          {benefits.map(([title, desc], i) => <Reveal className="benefit" key={title} delay={i * 0.04}><span>{String(i + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{desc}</p></div></Reveal>)}
        </div>
      </div>
    </section>
  );
}
