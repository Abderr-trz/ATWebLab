import type { Metadata } from "next";
import { ServiceLandingPage } from "@/components/services/ServiceLandingPage";
import { LiveProjectPreview } from "@/components/ui/LiveProjectPreview";
import { site } from "@/lib/site";

const path = "/creation-site-web-photographe";
const title = "Site web photographe au Maroc | AT WebLab";
const description = "Création de portfolios et sites web pour photographes au Maroc : galeries photo et vidéo, prestations, expérience mobile et formulaire de contact.";

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
    question: "Combien de galeries peut contenir le portfolio ?",
    answer: "La structure dépend du volume d’images et des catégories utiles à votre activité. Elle est définie avant la conception pour garder une navigation claire.",
  },
  {
    question: "Peut-on présenter des photos et des vidéos ?",
    answer: "Oui. Le projet peut combiner galeries photo, extraits vidéo ou liens vers des plateformes externes, selon les contenus disponibles et les performances attendues.",
  },
  {
    question: "Les images seront-elles optimisées pour le web ?",
    answer: "Les visuels intégrés au site sont dimensionnés et chargés de manière adaptée afin de préserver leur présentation tout en limitant le poids des pages.",
  },
  {
    question: "Puis-je présenter plusieurs types de prestations ?",
    answer: "Oui. Mariage, portrait, événement, production vidéo ou contenu de marque peuvent être organisés séparément lorsque ces prestations correspondent réellement à votre activité.",
  },
  {
    question: "Le portfolio peut-il recevoir des demandes de devis ?",
    answer: "Oui. Un formulaire de contact et des accès directs à l’e-mail ou à WhatsApp peuvent guider les visiteurs vers une demande détaillée.",
  },
];

function ProdyousShowcase() {
  return (
    <div className="browser prodyous" aria-label="Aperçu du site Prodyous">
      <div className="browser-bar"><div><i /><i /><i /></div><span>prodyous.co</span></div>
      <LiveProjectPreview />
    </div>
  );
}

export default function CreationSiteWebPhotographePage() {
  return (
    <ServiceLandingPage
      path={path}
      breadcrumb="Site web pour photographe"
      eyebrow="Photographes & studios créatifs · Maroc"
      title="Un portfolio web qui laisse votre travail prendre toute sa place."
      intro="AT WebLab crée des sites pour photographes et studios visuels, avec des galeries soignées, une présentation claire des prestations et une expérience adaptée aux mobiles."
      trustPoints={["Galeries optimisées", "Design éditorial", "Responsive mobile"]}
      overviewTitle="Votre portfolio doit valoriser les images sans perdre le visiteur."
      overviewParagraphs={[
        "Un prospect doit pouvoir comprendre votre univers, parcourir vos projets et identifier vos prestations sans chercher l’information dans plusieurs plateformes.",
        "Le site organise vos contenus autour d’un parcours simple : découvrir votre style, consulter une sélection de travaux, comprendre votre offre puis vous contacter.",
      ]}
      benefitsTitle="Un espace professionnel pour présenter votre regard."
      benefitsIntro="Une structure qui met le contenu visuel au premier plan tout en restant rapide et lisible."
      benefits={[
        { title: "Une sélection mieux organisée", description: "Vos projets peuvent être regroupés par type de prestation, série ou univers visuel." },
        { title: "Une identité maîtrisée", description: "La typographie, le rythme et la présentation accompagnent vos images sans les concurrencer." },
        { title: "Une consultation mobile", description: "Les galeries et informations importantes restent confortables à parcourir depuis un téléphone." },
        { title: "Un contact plus qualifié", description: "Le visiteur découvre vos prestations et peut transmettre une demande plus précise depuis le site." },
      ]}
      featuresTitle="Les éléments utiles à un portfolio professionnel."
      featuresIntro="La structure finale s’adapte à vos contenus réels et à votre manière de travailler."
      features={[
        { title: "Galeries photo", description: "Des collections structurées pour présenter une sélection de projets sans surcharger la navigation." },
        { title: "Contenus vidéo", description: "Des vidéos ou intégrations externes peuvent compléter les galeries lorsque le projet le demande." },
        { title: "Pages de prestations", description: "Chaque spécialité peut disposer d’une présentation claire, avec son contexte et son moyen de contact." },
        { title: "À propos et démarche", description: "Un espace pour expliquer votre approche et aider le prospect à comprendre votre manière de travailler." },
        { title: "Formulaire de contact", description: "Un formulaire peut recueillir les informations utiles à une première prise de contact." },
        { title: "Optimisation des médias", description: "Les dimensions, formats et règles de chargement sont adaptés pour limiter le coût des galeries." },
      ]}
      showcase={{
        eyebrow: "Projet réalisé · Studio créatif",
        title: "Prodyous",
        description: "Prodyous est un studio spécialisé en production vidéo, direction créative, photographie, vidéographie et montage. AT WebLab présente ici le site publié, sans reprendre de statistiques ni de résultats commerciaux non vérifiés.",
        tags: ["Production vidéo", "Photographie", "Portfolio"],
        visual: <ProdyousShowcase />,
      }}
      processTitle="Une construction guidée par vos meilleurs contenus."
      processIntro="Le tri et l’organisation des médias précèdent la conception de l’interface."
      steps={[
        { title: "Sélection", description: "Nous identifions les projets et prestations à mettre en avant." },
        { title: "Architecture", description: "Les galeries, catégories et pages sont organisées selon votre activité." },
        { title: "Direction visuelle", description: "Le design est ajusté à votre univers et à la place accordée aux médias." },
        { title: "Intégration", description: "Les contenus sont préparés et intégrés dans une interface responsive." },
        { title: "Validation", description: "Le portfolio est vérifié sur différents écrans avant sa publication." },
      ]}
      faqs={faqs}
      relatedPages={[
        { href: "/creation-site-web-maroc", label: "Création de sites web", description: "Sites vitrines et solutions sur mesure pour les entreprises au Maroc." },
        { href: "/creation-site-web-restaurant", label: "Sites web pour restaurants", description: "Menus, informations pratiques et contact dans une expérience mobile claire." },
      ]}
      serviceType="Création de sites web pour photographes au Maroc"
      schemaDescription="Création de portfolios et sites web pour photographes et studios visuels au Maroc, avec galeries, présentation des prestations et formulaire de contact."
    />
  );
}
