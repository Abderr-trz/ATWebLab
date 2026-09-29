"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, MessageCircle, X } from "lucide-react";
import { site } from "@/lib/site";

const links = [
  ["Services", "#services"],
  ["Réalisations", "#realisations"],
  ["Process", "#process"],
  ["Tarifs", "#tarifs"],
  ["FAQ", "#faq"]
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="nav-inner">
        <a href="#accueil" className="brand" aria-label="AT WebLab, accueil">
          <Image className="brand-logo" src="/logo.png" alt="" width={46} height={46} priority />
          <span>AT WebLab</span>
        </a>
        <nav className="nav-desktop" aria-label="Navigation principale">
          {links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <div className="nav-actions">
          <a className="nav-whatsapp" href={site.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle size={19} /></a>
          <a className="button button-light nav-quote" href="#contact">Demander un devis</a>
          <button className="menu-button" type="button" onClick={() => setOpen(!open)} aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={open}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="nav-mobile" aria-label="Navigation mobile">
          {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
          <a className="button button-light" href="#contact" onClick={() => setOpen(false)}>Demander un devis</a>
        </nav>
      )}
    </header>
  );
}
