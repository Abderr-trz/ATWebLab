"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const navigation = [
  { en: "Work", fr: "Projets", href: "#realisations" },
  { en: "Expertise", fr: "Expertises", href: "#services" },
  { en: "Approach", fr: "Méthode", href: "#process" },
  { en: "Contact", fr: "Contact", href: "#contact" }
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [language, setLanguage] = useState<"EN" | "FR">("EN");
  const href = (anchor: string) => pathname === "/" ? anchor : "/" + anchor;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 28);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    try { const saved = window.localStorage.getItem("atweblab-language"); if (saved === "EN" || saved === "FR") setLanguage(saved); } catch {}
  }, []);

  function switchLanguage(next: "EN" | "FR") {
    setLanguage(next);
    try { window.localStorage.setItem("atweblab-language", next); } catch {}
    window.dispatchEvent(new CustomEvent("atweblab-language-change", { detail: next }));
  }

  return (
    <header className={"v3-nav" + (scrolled ? " v3-nav--scrolled" : "")}>
      <div className="v3-nav__inner">
        <a href={href("#accueil")} className="v3-nav__brand" aria-label="AT WebLab home">
          <Image src="/logo.png" alt="AT WebLab" width={45} height={45} priority />
          <span>AT <strong>WEBLAB</strong><small>CREATIVE DIGITAL STUDIO</small></span>
        </a>
        <nav className="v3-nav__links" aria-label="Main navigation">
          {navigation.map(link => <a key={link.href} href={href(link.href)}>{language === "FR" ? link.fr : link.en}</a>)}
        </nav>
        <div className="v3-nav__actions">
          <div className="v3-nav__language" aria-label="Choose language">
            <button type="button" aria-pressed={language === "EN"} onClick={() => switchLanguage("EN")}>EN</button>
            <span>/</span>
            <button type="button" aria-pressed={language === "FR"} onClick={() => switchLanguage("FR")}>FR</button>
          </div>
          <a className="v3-nav__cta" href={href("#contact")}>{language === "FR" ? "Parlons de votre projet" : "Let's talk"} <ArrowUpRight size={17}/></a>
          <button type="button" className="v3-nav__toggle" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(v => !v)}>{open ? <X size={23}/> : <Menu size={23}/>}</button>
        </div>
      </div>
      {open && <nav className="v3-nav__mobile" aria-label="Mobile navigation">
        {navigation.map(link => <a key={link.href} href={href(link.href)} onClick={() => setOpen(false)}>{language === "FR" ? link.fr : link.en}<ArrowUpRight size={19}/></a>)}
        <a href={href("#contact")} onClick={() => setOpen(false)}>{language === "FR" ? "Démarrer un projet" : "Start a project"} <ArrowUpRight size={19}/></a>
      </nav>}
    </header>
  );
}
