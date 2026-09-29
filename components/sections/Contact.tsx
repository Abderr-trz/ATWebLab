"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, Instagram, Mail, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";
import { NetworkField } from "@/components/ui/NetworkField";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok) throw new Error(result.error || "L’envoi a échoué.");
      form.reset();
      setStatus("sent");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "L’envoi a échoué.");
      setStatus("error");
    }
  }
  return (
    <section id="contact" className="section contact">
      <NetworkField variant="right" />
      <div className="container contact-grid">
        <Reveal className="contact-intro">
          <p className="section-number">07</p><h2>Parlons de votre projet.</h2><p>Décrivez-nous votre besoin. Nous reviendrons vers vous avec des prochaines étapes claires.</p>
          <div className="contact-links">
            <a href={site.whatsapp} target="_blank" rel="noreferrer"><MessageCircle /><span><small>Réponse rapide</small>WhatsApp</span><ArrowUpRight /></a>
            <a href={`mailto:${site.email}`}><Mail /><span><small>Email</small>{site.email}</span><ArrowUpRight /></a>
            <a href={site.instagram} target="_blank" rel="noreferrer"><Instagram /><span><small>Suivez-nous</small>Instagram</span><ArrowUpRight /></a>
          </div>
        </Reveal>
        <Reveal className="form-wrap" delay={.1}>
          {status === "sent" ? <div className="form-success" role="status"><span>✓</span><h3>Demande bien reçue.</h3><p>Merci. Nous vous répondrons dans les meilleurs délais.</p><button className="button button-outline" onClick={() => setStatus("idle")}>Envoyer une autre demande</button></div> :
          <form onSubmit={submit}>
            <label className="contact-honeypot" aria-hidden="true">Site web<input name="website" tabIndex={-1} autoComplete="off" /></label>
            <div className="form-row"><label>Nom<input name="name" required minLength={2} maxLength={80} placeholder="Votre nom" /></label><label>Entreprise<input name="company" maxLength={120} placeholder="Nom de l’entreprise" /></label></div>
            <div className="form-row"><label>Téléphone<input name="phone" type="tel" required minLength={6} maxLength={30} placeholder="+212 6 00 00 00 00" /></label><label>Email<input name="email" type="email" required maxLength={160} placeholder="vous@entreprise.com" /></label></div>
            <div className="form-row"><label>Type de projet<select name="project" required defaultValue=""><option value="" disabled>Sélectionner</option><option>Site vitrine</option><option>Site web sur mesure</option><option>Boutique Shopify</option><option>Refonte</option><option>Autre</option></select></label><label>Budget<select name="budget" required defaultValue=""><option value="" disabled>Sélectionner</option><option>Moins de 1 500 DH</option><option>1 500 – 3 000 DH</option><option>3 000 – 5 000 DH</option><option>5 000+ DH</option><option>À discuter</option></select></label></div>
            <label>Message<textarea name="message" required minLength={10} maxLength={3000} rows={5} placeholder="Parlez-nous de votre activité et de ce que vous souhaitez créer…" /></label>
            <button className="button button-light submit" type="submit" disabled={status === "sending"}>{status === "sending" ? "Envoi en cours…" : "Envoyer ma demande"} {status !== "sending" && <ArrowUpRight size={18} />}</button>
            {status === "error" && <p className="form-error" role="alert">{errorMessage}</p>}
            <p className="form-note">En envoyant ce formulaire, vous acceptez d’être recontacté au sujet de votre projet.</p>
          </form>}
        </Reveal>
      </div>
    </section>
  );
}
