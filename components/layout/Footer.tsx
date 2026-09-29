import Image from "next/image";
import { Instagram, MessageCircle } from "lucide-react";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <a href="#accueil" className="brand"><Image className="brand-logo brand-logo-footer" src="/logo.png" alt="" width={54} height={54} /><span>AT WebLab</span></a>
          <p>Création de sites web modernes pour entreprises et entrepreneurs.</p>
        </div>
        <nav aria-label="Pied de page">
          <a href="#services">Services</a><a href="#realisations">Réalisations</a><a href="#tarifs">Tarifs</a><a href="#faq">FAQ</a><a href="#contact">Contact</a>
        </nav>
        <div className="footer-social">
          <a href={site.instagram} target="_blank" rel="noreferrer"><Instagram size={18} /> Instagram</a>
          <a href={site.whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={18} /> WhatsApp</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© 2026 AT WebLab. Tous droits réservés.</p>
        <a href="#">Mentions légales</a>
      </div>
    </footer>
  );
}
