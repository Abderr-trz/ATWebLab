import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { NetworkField } from "@/components/ui/NetworkField";

const steps = [
  ["Découverte", "Nous échangeons sur votre activité, vos objectifs et vos besoins."],
  ["Proposition", "Nous définissons la structure, le design et les fonctionnalités."],
  ["Création", "Nous concevons et développons votre site."],
  ["Validation", "Vous consultez le résultat et nous appliquons les ajustements convenus."],
  ["Mise en ligne", "Votre site est connecté à votre domaine et publié."]
];

export function Process() {
  return (
    <section id="process" className="section process">
      <NetworkField variant="left" />
      <div className="container">
        <Reveal><SectionHeading number="04" title="Comment ça marche ?" intro="Un processus simple. Vous savez toujours où en est votre projet." /></Reveal>
        <div className="timeline">
          {steps.map(([title, desc], i) => <Reveal className="timeline-step" key={title} delay={i * 0.07}><div className="timeline-marker">{String(i + 1).padStart(2, "0")}</div><h3>{title}</h3><p>{desc}</p></Reveal>)}
        </div>
      </div>
    </section>
  );
}
