import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://atweblab.com"),
  title: "AT WebLab | Création de Sites Web au Maroc",
  description: "AT WebLab crée des sites vitrines, sites web sur mesure et boutiques Shopify modernes pour entreprises et entrepreneurs au Maroc.",
  openGraph: {
    title: "AT WebLab | Création de Sites Web au Maroc",
    description: "Des sites modernes, rapides et pensés pour transformer vos visiteurs en clients.",
    url: "https://atweblab.com",
    siteName: "AT WebLab",
    locale: "fr_MA",
    type: "website"
  },
  icons: { icon: "/logo.png" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${geist.variable} bg-ink text-paper antialiased`}>{children}</body>
    </html>
  );
}
