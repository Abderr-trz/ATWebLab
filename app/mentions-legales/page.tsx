import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

export default function MentionsLegales() {
  return (
    <div className="legal-page">
      <header className="legal-header">
        <div className="container legal-header-inner">
          <Link href="/" className="brand" aria-label="AT WebLab, accueil">
            <Image className="brand-logo" src="/logo.png" alt="" width={46} height={46} priority />
            <span>AT WebLab</span>
          </Link>
          <Link className="legal-back" href="/">Retour au site</Link>
        </div>
      </header>

      <main className="container legal-main">
        <div className="legal-title">
          <h1>Mentions l&eacute;gales</h1>
          <p>Cette page rassemble les informations confirm&eacute;es concernant le site AT WebLab et le traitement des demandes envoy&eacute;es par son formulaire de contact.</p>
        </div>

        <section className="legal-section" aria-labelledby="editeur">
          <h2 id="editeur">&Eacute;diteur du site</h2>
          <div className="legal-content">
            <p><strong>Nom utilis&eacute; :</strong> AT WebLab<br /><strong>Site :</strong> <a href={site.url}>{site.url}</a><br /><strong>Contact :</strong> <a href={`mailto:${site.email}`}>{site.email}</a></p>
            <p>La raison sociale compl&egrave;te, le statut juridique, l&rsquo;adresse du si&egrave;ge et le num&eacute;ro d&rsquo;immatriculation ne sont pas encore renseign&eacute;s dans le projet. Ces informations devront &ecirc;tre ajout&eacute;es lorsqu&rsquo;elles auront &eacute;t&eacute; confirm&eacute;es.</p>
          </div>
        </section>

        <section className="legal-section" id="donnees-formulaire" aria-labelledby="titre-donnees">
          <h2 id="titre-donnees">Donn&eacute;es du formulaire</h2>
          <div className="legal-content">
            <p>Le formulaire sert &agrave; recevoir et traiter les demandes de contact et de devis adress&eacute;es &agrave; AT WebLab.</p>
            <p>Les champs collect&eacute;s sont le nom, l&rsquo;entreprise (facultatif), le t&eacute;l&eacute;phone, l&rsquo;adresse e-mail, le type de projet, le budget et le message. Un champ technique invisible est aussi utilis&eacute; pour limiter les envois automatis&eacute;s.</p>
            <p>Les informations sont transmises par le service d&rsquo;envoi Resend &agrave; AT WebLab, &agrave; l&rsquo;adresse <a href={`mailto:${site.email}`}>{site.email}</a>. Le code du site ne les enregistre pas dans une base de donn&eacute;es, un CRM ou Google Sheets.</p>
            <p>Pour toute question concernant les informations envoy&eacute;es, vous pouvez contacter AT WebLab &agrave; cette m&ecirc;me adresse.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
