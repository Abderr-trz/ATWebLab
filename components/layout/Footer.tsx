import Image from "next/image";
import Link from "next/link";
import { Instagram, MessageCircle } from "lucide-react";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link href="/" className="brand"><Image className="brand-logo brand-logo-footer" src="/logo.png" alt="" width={54} height={54} /><span>AT WebLab</span></Link>
          <p>Création de sites web modernes pour entreprises et entrepreneurs.</p>
        </div>
        <nav aria-label="Pied de page">
          <Link href="/#services">Services</Link>
          <Link href="/creation-site-web-maroc">Création de sites web</Link>
          <Link href="/creation-site-web-restaurant">Sites pour restaurants</Link>
          <Link href="/creation-site-web-photographe">Sites pour photographes</Link>
          <Link href="/#realisations">Réalisations</Link><Link href="/#tarifs">Tarifs</Link><Link href="/#faq">FAQ</Link><Link href="/#contact">Contact</Link>
        </nav>
        <div className="footer-social">
          <a href={site.instagram} target="_blank" rel="noreferrer"><Instagram size={18} /> Instagram</a>
          <a href={site.whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={18} /> WhatsApp</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© 2026 AT WebLab. Tous droits réservés.</p>
        <Link href="/mentions-legales">Mentions légales</Link>
      </div>
    </footer>
  );
}
