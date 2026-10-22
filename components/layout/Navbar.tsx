"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { en: "Work", fr: "Projets", href: "#realisations" },
  { en: "Services", fr: "Services", href: "#services" },
  { en: "Why Us", fr: "Pourquoi nous", href: "#pourquoi-nous" },
  { en: "Process", fr: "Processus", href: "#process" },
  { en: "FAQs", fr: "FAQs", href: "#faq" }
];
export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [language, setLanguage] = useState<"EN" | "FR">("EN");
  const href = (anchor: string) => pathname === "/" ? anchor : "/" + anchor;
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    try { const saved = localStorage.getItem("atweblab-language"); if (saved === "EN" || saved === "FR") setLanguage(saved); } catch {}
    const onChange = (event: Event) => { const value = (event as CustomEvent<string>).detail; if (value === "EN" || value === "FR") setLanguage(value); };
    window.addEventListener("atweblab-language-change", onChange);
    return () => window.removeEventListener("atweblab-language-change", onChange);
  }, []);
  function changeLanguage(next: "EN" | "FR") {
    setLanguage(next);
    try { localStorage.setItem("atweblab-language", next); } catch {}
    window.dispatchEvent(new CustomEvent("atweblab-language-change", { detail: next }));
  }
  return (
    <header className={"v3-nav" + (scrolled ? " v3-nav--scrolled" : "")}>
      <div className="v3-nav__inner">
        <a href={href("#accueil")} className="v3-nav__brand" aria-label="AT WebLab home">
          <Image src="/logo.png" alt="" width={43} height={43} priority />
          <span>AT WebLab</span>
        </a>
        <nav className="v3-nav__links" aria-label="Main navigation">
          {links.map(item => <a href={href(item.href)} key={item.href}>{language === "FR" ? item.fr : item.en}</a>)}
        </nav>
        <div className="v3-nav__actions">
          <div className="v3-nav__language" aria-label="Language">
            <button type="button" aria-pressed={language === "EN"} onClick={() => changeLanguage("EN")}>EN</button><span>/</span>
            <button type="button" aria-pressed={language === "FR"} onClick={() => changeLanguage("FR")}>FR</button>
          </div>
          <a href={href("#contact")} className="v3-nav__cta">{language === "FR" ? "Contact" : "Contact"}</a>
          <button type="button" className="v3-nav__toggle" onClick={() => setOpen(v => !v)} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"}>{open ? <X size={23}/> : <Menu size={23}/>}</button>
        </div>
      </div>
      {open && <nav className="v3-nav__mobile" aria-label="Mobile navigation">
        {links.map(item => <a href={href(item.href)} key={item.href} onClick={() => setOpen(false)}>{language === "FR" ? item.fr : item.en}</a>)}
        <a href={href("#contact")} onClick={() => setOpen(false)}>Contact</a>
      </nav>}
    </header>
  );
}
