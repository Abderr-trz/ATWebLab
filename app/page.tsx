import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ClientRail } from "@/components/sections/ClientRail";
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

const title = "Sites web pour photographes et vidéastes au Maroc | AT WebLab";
const description = "AT WebLab crée des portfolios cinématiques et des sites web sur mesure pour photographes, vidéastes et studios créatifs au Maroc. Découvrez nos réalisations.";

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
