import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const benefits = [
  ["Design professionnel", "Une identité moderne conçue autour de votre activité."],
  ["Mobile first", "Une expérience impeccable sur smartphone, tablette et ordinateur."],
  ["Performance", "Des pages rapides et optimisées pour une meilleure expérience."],
  ["Accompagnement", "Un suivi clair, de la première idée jusqu’à la mise en ligne."],
  ["Solution adaptée", "Pas de template imposé : le site répond à vos vrais besoins."],
  ["Contact direct", "Une communication simple et rapide pendant tout le projet."]
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
