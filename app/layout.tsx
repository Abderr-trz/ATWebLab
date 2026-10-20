import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";
import "./globals.css";
import "./cinematic-editorial.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  icons: {
    icon: site.logo,
    shortcut: site.logo,
    apple: site.logo,
  },
};

const globalJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: `${site.url}/`,
      logo: {
        "@type": "ImageObject",
        url: new URL(site.logo, site.url).toString(),
      },
      email: site.email,
      telephone: site.phoneInternational,
      areaServed: { "@type": "Country", name: "Morocco" },
      sameAs: [site.instagram],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: site.phoneInternational,
        email: site.email,
        availableLanguage: ["French"],
        areaServed: "MA",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: `${site.url}/`,
      name: site.name,
      inLanguage: "fr-MA",
      publisher: { "@id": `${site.url}/#organization` },
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${geist.variable} bg-ink text-paper antialiased`}>
        <JsonLd data={globalJsonLd} />
        {children}
      </body>
    </html>
  );
}
