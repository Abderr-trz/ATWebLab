"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { WebDevCube } from "@/components/ui/WebDevCube";
import { NetworkField } from "@/components/ui/NetworkField";

export function Hero() {
  const reduce = useReducedMotion();
  return (
    <section id="accueil" className="hero">
      <NetworkField variant="right" />
      <div className="hero-grid" aria-hidden="true" />
      <div className="container hero-inner">
        <motion.div className="hero-copy" initial={reduce ? false : "hidden"} animate="show" variants={{ show: { transition: { staggerChildren: 0.12 } } }}>
          <motion.p className="hero-kicker" variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}>Création de sites web · Maroc</motion.p>
          <motion.h1 variants={{ hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}>
            Votre business mérite mieux qu’une simple présence en ligne.
          </motion.h1>
          <motion.p className="hero-lead" variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}>
            AT WebLab conçoit des sites modernes, rapides et pensés pour transformer vos visiteurs en clients.
          </motion.p>
          <motion.div className="hero-actions" variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}>
            <a className="button button-light" href="#contact">Créer mon site <ArrowUpRight size={18} /></a>
            <a className="button button-ghost" href="#realisations">Voir nos réalisations</a>
          </motion.div>
          <motion.p className="trust-line" variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}><span>Sites professionnels</span><span>Responsive</span><span>Livraison rapide</span></motion.p>
        </motion.div>
        <WebDevCube />
        <a className="hero-scroll" href="#services"><ArrowDown size={17} /> Découvrir</a>
      </div>
    </section>
  );
}
