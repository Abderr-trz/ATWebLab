import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ClientRail } from "@/components/sections/ClientRail";
import { ExpertiseRailV3 } from "@/components/sections/ExpertiseRailV3";
import { Services } from "@/components/sections/Services";
import { WhyUs } from "@/components/sections/WhyUs";
import { Portfolio } from "@/components/sections/Portfolio";
import { Process } from "@/components/sections/Process";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Contact } from "@/components/sections/Contact";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { site } from "@/lib/site";

const title = "Création de sites web au Maroc | AT WebLab";
const description = "AT WebLab crée des sites vitrines, sites sur mesure et boutiques Shopify pour les entreprises au Maroc. Découvrez nos réalisations et demandez un devis.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${site.url}/` },
  openGraph: {
    title,
    description,
    url: `${site.url}/`,
    siteName: site.name,
    locale: site.locale,
    type: "website",
    images: [{ url: site.logo, width: 264, height: 260, alt: "Logo AT WebLab" }],
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: [site.logo],
  },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ExpertiseRailV3 />
        <ClientRail />
        <Services />
        <WhyUs />
        <Portfolio />
        <Process />
        <Pricing />
        <FAQ />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
