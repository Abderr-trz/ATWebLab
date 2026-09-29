"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { NetworkField } from "@/components/ui/NetworkField";

const faqs = [
  ["Combien de temps faut-il pour créer un site ?", "Un site vitrine prend généralement 1 à 3 semaines. Un projet sur mesure demande plus de temps selon ses fonctionnalités."],
  ["Le nom de domaine est-il inclus ?", "Oui, il peut être inclus selon l’offre choisie. Nous vous aidons aussi à le choisir et à le configurer."],
  ["Mon site sera-t-il adapté aux smartphones ?", "Oui. Chaque site est pensé mobile-first et testé sur les principaux formats d’écran."],
  ["Puis-je demander des modifications ?", "Oui. Une phase de validation et les ajustements convenus sont prévus avant la mise en ligne."],
  ["Est-ce que je pourrai modifier mon site après livraison ?", "Oui, lorsque le projet prévoit une interface de gestion. Nous vous expliquons comment l’utiliser."],
  ["Comment se passe le paiement ?", "Le paiement se fait par étapes, définies clairement dans le devis avant le début du projet."],
  ["Travaillez-vous uniquement avec des entreprises au Maroc ?", "Non. Nous travaillons à distance avec des clients au Maroc comme à l’international."],
  ["Pouvez-vous refaire un site existant ?", "Oui. Nous pouvons auditer votre site et proposer une refonte adaptée à vos objectifs actuels."]
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="section faq">
      <NetworkField variant="left" />
      <div className="container faq-layout">
        <Reveal><SectionHeading number="06" title="Questions fréquentes" intro="L’essentiel avant de lancer votre projet." /></Reveal>
        <div className="accordion">
          {faqs.map(([q, a], i) => <div className={`faq-item ${open === i ? "open" : ""}`} key={q}><button type="button" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}><span>{q}</span><Plus size={20} /></button><div className="faq-answer" aria-hidden={open !== i}><p>{a}</p></div></div>)}
        </div>
      </div>
    </section>
  );
}
