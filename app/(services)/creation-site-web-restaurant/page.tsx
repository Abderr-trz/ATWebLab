import type { Metadata } from "next";
import { ServiceLandingPage } from "@/components/services/ServiceLandingPage";
import { site } from "@/lib/site";

const path = "/creation-site-web-restaurant";
const title = "Création site web restaurant Maroc | AT WebLab";
const description = "Création de sites web pour restaurants, snacks et cafés au Maroc : menu numérique, horaires, galerie, localisation et contact. Demandez un devis.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${site.url}${path}` },
  openGraph: {
    title,
    description,
    url: `${site.url}${path}`,
    siteName: site.name,
    locale: site.locale,
    type: "website",
    images: [{ url: site.logo, width: 264, height: 260, alt: "Logo AT WebLab" }],
  },
  twitter: { card: "summary", title, description, images: [site.logo] },
};

const faqs = [
  {
    question: "Le menu du restaurant peut-il être consulté sur téléphone ?",
    answer: "Oui. Le menu peut être présenté dans une page responsive, organisée par catégories et facile à consulter depuis un smartphone.",
  },
  {
    question: "Peut-on afficher les horaires et la localisation ?",
    answer: "Oui. Le site peut présenter les horaires confirmés, l’adresse de l’établissement et un lien vers son emplacement sur un service de cartographie.",
  },
  {
    question: "Le site peut-il recevoir des réservations ?",
    answer: "Selon le besoin, le site peut proposer un formulaire de contact ou un lien vers un outil de réservation existant. La solution exacte est définie avant le développement.",
  },
  {
    question: "Pouvez-vous intégrer les photos des plats et du lieu ?",
    answer: "Oui. Les photos fournies par l’établissement peuvent être organisées dans une galerie adaptée aux écrans mobiles et optimisée pour le web.",
  },
  {
    question: "Smash Burger est-il un restaurant client d’AT WebLab ?",
    answer: "Non. Smash Burger est présenté ici comme un projet de démonstration interactif destiné à illustrer une direction possible pour un site de restaurant.",
  },
];

function SmashBurgerDemo() {
  return (
    <div className="restaurant-demo">
      <div className="restaurant-demo-bar"><span /><span /><span /><small>Aperçu interactif</small></div>
      <iframe
        className="restaurant-demo-frame"
        src="https://smash-burger-joint.vercel.app/"
        title="Aperçu interactif du projet Smash Burger"
        loading="lazy"
        sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}

export default function CreationSiteWebRestaurantPage() {
  return (
    <ServiceLandingPage
      path={path}
      breadcrumb="Site web pour restaurant"
      eyebrow="Restaurants, snacks & cafés · Maroc"
      title="Un site web qui donne envie de découvrir votre établissement."
      intro="Présentez votre menu, vos horaires, votre univers et les informations utiles dans une expérience rapide à consulter depuis un téléphone."
      trustPoints={["Menu lisible", "Mobile-first", "Contact accessible"]}
      overviewTitle="Vos clients cherchent d’abord les informations essentielles."
      overviewParagraphs={[
        "Avant de se déplacer, un client veut souvent consulter le menu, connaître les horaires, voir l’ambiance du lieu et trouver rapidement un moyen de contact.",
        "Un site dédié permet de regrouper ces informations dans un espace maîtrisé, cohérent avec l’identité du restaurant et indépendant des publications temporaires sur les réseaux sociaux.",
      ]}
      benefitsTitle="Une vitrine digitale adaptée à la restauration."
      benefitsIntro="L’essentiel de votre établissement, organisé pour une consultation rapide."
      benefits={[
        { title: "Présenter votre carte", description: "Des catégories claires pour afficher les plats, formules et prix communiqués par l’établissement." },
        { title: "Faciliter la visite", description: "Les horaires, l’adresse et le lien de localisation restent faciles à trouver sur chaque écran." },
        { title: "Montrer votre univers", description: "Une galerie peut mettre en valeur les plats, l’équipe et l’ambiance à partir de vos visuels réels." },
        { title: "Simplifier le contact", description: "WhatsApp, téléphone, formulaire ou outil externe peuvent être intégrés selon le parcours retenu." },
      ]}
      featuresTitle="Des fonctionnalités choisies selon votre fonctionnement."
      featuresIntro="Aucune promesse automatique : chaque intégration est confirmée dans le périmètre du projet."
      features={[
        { title: "Menu numérique", description: "Une carte web responsive, plus simple à consulter qu’un document non adapté au mobile." },
        { title: "Horaires et adresse", description: "Des informations pratiques visibles avec un accès direct à la localisation." },
        { title: "Galerie photos", description: "Une sélection d’images optimisées pour présenter les plats et le lieu sans ralentir inutilement la page." },
        { title: "Contact direct", description: "Des boutons vers le téléphone ou WhatsApp pour réduire les étapes avant la prise de contact." },
        { title: "Réservation selon le projet", description: "Un formulaire ou un lien vers un service existant peut être prévu lorsque le besoin est confirmé." },
        { title: "Mises à jour organisées", description: "La méthode de mise à jour du menu et des informations est définie selon la fréquence de vos changements." },
      ]}
      showcase={{
        eyebrow: "Projet de démonstration · Aperçu interactif",
        title: "Smash Burger",
        description: "Explorez directement ce projet de démonstration conçu pour illustrer une direction visuelle possible pour un restaurant de burgers. Il ne représente pas un client ni un établissement réel.",
        tags: ["Démonstration", "Restaurant", "Mobile-first"],
        visual: <SmashBurgerDemo />,
        href: "https://smash-burger-joint.vercel.app/",
        linkLabel: "Ouvrir le projet",
      }}
      processTitle="De votre carte à un site prêt à être consulté."
      processIntro="Le contenu réel de l’établissement guide chaque étape du projet."
      steps={[
        { title: "Cadrage", description: "Nous identifions les informations, les contenus et les actions utiles aux clients." },
        { title: "Organisation", description: "Le menu, les horaires, les photos et les contacts sont structurés clairement." },
        { title: "Création", description: "L’interface est conçue pour refléter l’identité de l’établissement." },
        { title: "Vérification", description: "Les contenus et le parcours mobile sont contrôlés avant publication." },
        { title: "Publication", description: "Le site validé est relié à son domaine et mis en ligne." },
      ]}
      faqs={faqs}
      relatedPages={[
        { href: "/creation-site-web-maroc", label: "Création de sites web", description: "Sites vitrines et solutions sur mesure pour les entreprises au Maroc." },
        { href: "/creation-site-web-photographe", label: "Sites web pour photographes", description: "Des portfolios professionnels pensés pour les métiers de l’image." },
      ]}
      serviceType="Création de sites web pour restaurants au Maroc"
      schemaDescription="Création de sites web pour restaurants, snacks et cafés au Maroc, avec menu numérique, informations pratiques, galerie et moyens de contact selon le projet."
    />
  );
}
