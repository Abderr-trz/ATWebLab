"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const links = [
  ["Réalisations", "#realisations"],
  ["Solutions", "#services"],
  ["Méthode", "#process"],
  ["Contact", "#contact"],
] as const;

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sectionHref = (href: string) => pathname === "/" ? href : `/${href}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className={`ce-nav ${scrolled ? "ce-nav-scrolled" : ""}`}>
      <div className="ce-nav-inner">
        <a className="ce-nav-brand" href={pathname === "/" ? "#accueil" : "/"} aria-label="AT WebLab, accueil">
          <Image src="/logo.png" alt="" width={44} height={44} priority />
          <span>AT<span className="ce-brand-light">WEBLAB</span><small>CREATIVE DIGITAL STUDIO</small></span>
        </a>
        <nav className="ce-nav-links" aria-label="Navigation principale">
          {links.map(([label, href]) => <a key={href} href={sectionHref(href)}>{label}</a>)}
        </nav>
        <div className="ce-nav-actions">
          <a className="ce-nav-project" href={sectionHref("#contact")}>Parlons de votre projet <ArrowUpRight size={17} /></a>
          <button type="button" className="ce-nav-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="ce-mobile-nav" aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}>{open ? <X size={25}/> : <Menu size={25}/>}</button>
        </div>
      </div>
      <nav id="ce-mobile-nav" className={`ce-mobile-nav ${open ? "ce-mobile-open" : ""}`} aria-label="Navigation mobile" aria-hidden={!open}>
        {links.map(([label, href], index) => <a key={href} tabIndex={open ? 0 : -1} href={sectionHref(href)} onClick={() => setOpen(false)}><span>0{index+1}</span>{label}<ArrowUpRight size={19}/></a>)}
        <p>AT WEBLAB · CRÉATION DIGITALE POUR LES CRÉATEURS VISUELS</p>
      </nav>
    </header>
  );
}
