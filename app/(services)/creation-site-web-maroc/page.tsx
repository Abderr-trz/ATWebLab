import type { Metadata } from "next";
import { ServiceLandingPage } from "@/components/services/ServiceLandingPage";
import { site } from "@/lib/site";

const path = "/creation-site-web-maroc";
const title = "Création de site web au Maroc | AT WebLab";
const description = "AT WebLab crée des sites vitrines et sites sur mesure rapides, responsives et adaptés aux entreprises au Maroc. Échangez sur votre projet web.";

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
    question: "Combien coûte la création d’un site web au Maroc ?",
    answer: "Un site vitrine commence à 1 500 DH et un site web complet à 3 500 DH. Le tarif final dépend du nombre de pages, du contenu et des fonctionnalités définies dans le devis.",
  },
  {
    question: "Combien de temps faut-il pour créer un site ?",
    answer: "Un site vitrine prend généralement entre une et trois semaines. Un projet sur mesure nécessite un délai adapté à ses fonctionnalités et à la disponibilité des contenus.",
  },
  {
    question: "Le site fonctionnera-t-il sur téléphone ?",
    answer: "Oui. Chaque interface est conçue pour être lisible et simple à utiliser sur smartphone, tablette et ordinateur.",
  },
  {
    question: "Le nom de domaine et la mise en ligne sont-ils inclus ?",
    answer: "Le nom de domaine et la mise en ligne peuvent être inclus selon l’offre retenue. Leur périmètre est indiqué clairement dans le devis.",
  },
  {
    question: "Pouvez-vous refaire un site existant ?",
    answer: "Oui. AT WebLab peut analyser un site existant et proposer une refonte de sa structure, de son interface et de ses fonctionnalités selon les besoins confirmés.",
  },
];

export default function CreationSiteWebMarocPage() {
  return (
    <ServiceLandingPage
      path={path}
      breadcrumb="Création de site web au Maroc"
      eyebrow="Création de sites web · Maroc"
      title="Un site web professionnel pensé pour votre activité au Maroc."
      intro="AT WebLab conçoit des sites vitrines et des solutions sur mesure qui présentent clairement votre offre et facilitent la prise de contact avec vos futurs clients."
      trustPoints={["Design professionnel", "Responsive mobile", "Accompagnement clair"]}
      overviewTitle="Votre site doit expliquer, rassurer et guider."
      overviewParagraphs={[
        "Un site professionnel ne se limite pas à une présence en ligne. Il doit permettre à un prospect de comprendre rapidement votre activité, de découvrir vos services et de savoir comment vous contacter.",
        "Nous construisons chaque projet autour de vos objectifs réels : présenter une entreprise, générer des demandes de devis, mettre en valeur une expertise ou développer une fonctionnalité spécifique.",
      ]}
      benefitsTitle="Une base solide pour développer votre présence en ligne."
      benefitsIntro="Une structure claire, un design crédible et les fonctionnalités utiles à votre activité."
      benefits={[
        { title: "Une image professionnelle", description: "Une interface cohérente avec votre activité, conçue pour inspirer confiance dès les premières secondes." },
        { title: "Un parcours simple", description: "Des informations organisées pour aider le visiteur à comprendre votre offre et passer naturellement à l’action." },
        { title: "Une expérience mobile", description: "Une navigation adaptée aux usages sur smartphone, avec des contenus lisibles et des contacts accessibles." },
        { title: "Une solution évolutive", description: "Une structure qui peut accueillir de nouvelles pages ou fonctionnalités lorsque votre activité se développe." },
      ]}
      featuresTitle="Ce que votre projet peut inclure."
      featuresIntro="Le périmètre est défini selon vos besoins, sans ajouter de fonctions inutiles."
      features={[
        { title: "Site vitrine", description: "Des pages essentielles pour présenter votre entreprise, vos prestations et vos moyens de contact." },
        { title: "Développement sur mesure", description: "Des fonctionnalités personnalisées, une base de données, des API ou un tableau de bord lorsque le projet le nécessite." },
        { title: "Formulaire et WhatsApp", description: "Des points de contact visibles pour simplifier les demandes de renseignement ou de devis." },
        { title: "Responsive mobile", description: "Une mise en page adaptée aux téléphones, tablettes et écrans de bureau." },
        { title: "Référencement technique", description: "Des balises, des contenus structurés et une base technique conçue pour être comprise par les moteurs de recherche." },
        { title: "Domaine et mise en ligne", description: "Une aide à la configuration du domaine et à la publication, selon le périmètre retenu." },
      ]}
      prices={[
        { name: "Site vitrine", amount: "À partir de 1 500 DH", description: "Pour présenter une activité, des services et des moyens de contact." },
        { name: "Site web complet", amount: "À partir de 3 500 DH", description: "Pour un projet avec des fonctionnalités plus avancées." },
      ]}
      processTitle="Un processus lisible du premier échange à la mise en ligne."
      processIntro="Vous savez ce qui est prévu et à quelle étape se trouve votre projet."
      steps={[
        { title: "Découverte", description: "Nous échangeons sur votre activité, vos clients et les objectifs du site." },
        { title: "Structure", description: "Nous définissons les pages, les contenus et les fonctionnalités nécessaires." },
        { title: "Conception", description: "Le design et le développement sont réalisés dans le cadre convenu." },
        { title: "Validation", description: "Vous consultez le résultat et nous appliquons les ajustements prévus." },
        { title: "Mise en ligne", description: "Le site est connecté à son domaine et publié après validation." },
      ]}
      faqs={faqs}
      relatedPages={[
        { href: "/creation-site-web-restaurant", label: "Sites web pour restaurants", description: "Une présence claire pour présenter un établissement, son menu et ses informations pratiques." },
        { href: "/creation-site-web-photographe", label: "Sites web pour photographes", description: "Un portfolio professionnel conçu pour mettre les images et les prestations au premier plan." },
      ]}
      serviceType="Création de sites web au Maroc"
      schemaDescription="Création de sites vitrines et de sites web sur mesure pour les entreprises et entrepreneurs au Maroc."
    />
  );
}
