import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, ChevronRight, MessageCircle } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { JsonLd } from "@/components/seo/JsonLd";
import { NetworkField } from "@/components/ui/NetworkField";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { site } from "@/lib/site";

type Item = {
  title: string;
  description: string;
};

type Step = {
  title: string;
  description: string;
};

type Faq = {
  question: string;
  answer: string;
};

type RelatedPage = {
  href: string;
  label: string;
  description: string;
};

type Price = {
  name: string;
  amount: string;
  description: string;
};

type Showcase = {
  eyebrow: string;
  title: string;
  description: string;
  tags: string[];
  visual: ReactNode;
  href?: string;
  linkLabel?: string;
};

export type ServiceLandingPageProps = {
  path: string;
  breadcrumb: string;
  eyebrow: string;
  title: string;
  intro: string;
  trustPoints: string[];
  overviewTitle: string;
  overviewParagraphs: string[];
  benefitsTitle: string;
  benefitsIntro: string;
  benefits: Item[];
  featuresTitle: string;
  featuresIntro: string;
  features: Item[];
  processTitle: string;
  processIntro: string;
  steps: Step[];
  faqs: Faq[];
  relatedPages: RelatedPage[];
  serviceType: string;
  schemaDescription: string;
  showcase?: Showcase;
  prices?: Price[];
};

export function ServiceLandingPage(props: ServiceLandingPageProps) {
  const pageUrl = `${site.url}${props.path}`;
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: props.serviceType,
        serviceType: props.serviceType,
        description: props.schemaDescription,
        url: pageUrl,
        areaServed: { "@type": "Country", name: "Morocco" },
        provider: { "@id": `${site.url}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Accueil",
            item: `${site.url}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: props.breadcrumb,
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: props.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <Navbar />
      <main className="service-page-main">
        <section id="accueil" className="service-hero">
          <NetworkField variant="right" />
          <div className="hero-grid" aria-hidden="true" />
          <div className="container service-hero-inner">
            <nav className="service-breadcrumb" aria-label="Fil d’Ariane">
              <Link href="/">Accueil</Link>
              <ChevronRight size={13} aria-hidden="true" />
              <span aria-current="page">{props.breadcrumb}</span>
            </nav>
            <p className="service-hero-kicker">{props.eyebrow}</p>
            <h1>{props.title}</h1>
            <p className="service-hero-lead">{props.intro}</p>
            <div className="service-hero-actions">
              <a className="button button-light" href={site.whatsapp} target="_blank" rel="noreferrer">
                <MessageCircle size={18} aria-hidden="true" /> Discuter sur WhatsApp
              </a>
              <Link className="button button-ghost" href="/#contact">
                Demander un devis <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
            <p className="service-trust-line">
              {props.trustPoints.map((point) => <span key={point}>{point}</span>)}
            </p>
          </div>
        </section>

        <section className="section service-overview">
          <div className="container service-overview-grid">
            <Reveal className="service-section-label">
              <span className="section-number">01</span>
              <p>Une présence digitale conçue autour de votre activité.</p>
            </Reveal>
            <Reveal className="service-overview-copy" delay={0.06}>
              <h2>{props.overviewTitle}</h2>
              {props.overviewParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </Reveal>
          </div>
        </section>

        <section className="section service-detail-section">
          <NetworkField variant="left" />
          <div className="container">
            <Reveal className="service-page-heading">
              <span className="section-number">02</span>
              <div><h2>{props.benefitsTitle}</h2><p>{props.benefitsIntro}</p></div>
            </Reveal>
            <div className="service-detail-list">
              {props.benefits.map((item, index) => (
                <Reveal className="service-detail-row" key={item.title} delay={index * 0.04}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section service-features">
          <div className="container service-features-grid">
            <Reveal className="service-page-heading service-page-heading-sticky">
              <span className="section-number">03</span>
              <div><h2>{props.featuresTitle}</h2><p>{props.featuresIntro}</p></div>
            </Reveal>
            <div className="service-feature-list">
              {props.features.map((feature, index) => (
                <Reveal className="service-feature" key={feature.title} delay={index * 0.04}>
                  <Check size={17} aria-hidden="true" />
                  <div><h3>{feature.title}</h3><p>{feature.description}</p></div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {props.showcase && (
          <section className="section service-showcase">
            <NetworkField variant="wide" />
            <div className="container service-showcase-grid">
              <Reveal className="service-showcase-visual">{props.showcase.visual}</Reveal>
              <Reveal className="service-showcase-copy" delay={0.08}>
                <p className="service-showcase-eyebrow">{props.showcase.eyebrow}</p>
                <h2>{props.showcase.title}</h2>
                <p>{props.showcase.description}</p>
                <div className="project-tags">
                  {props.showcase.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                {props.showcase.href && (
                  <a className="service-showcase-link" href={props.showcase.href} target="_blank" rel="noreferrer">
                    {props.showcase.linkLabel ?? "Voir le projet"} <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                )}
              </Reveal>
            </div>
          </section>
        )}

        {props.prices && (
          <section className="section service-prices">
            <div className="container">
              <Reveal className="service-page-heading">
                <span className="section-number">04</span>
                <div><h2>Des bases tarifaires claires.</h2><p>Le prix final dépend du contenu, des fonctionnalités et du périmètre convenu.</p></div>
              </Reveal>
              <div className="service-price-grid">
                {props.prices.map((price, index) => (
                  <Reveal className="service-price-card" key={price.name} delay={index * 0.05}>
                    <p>{price.name}</p><strong>{price.amount}</strong><span>{price.description}</span>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="section service-process">
          <div className="container">
            <Reveal className="service-page-heading">
              <span className="section-number">{props.prices ? "05" : "04"}</span>
              <div><h2>{props.processTitle}</h2><p>{props.processIntro}</p></div>
            </Reveal>
            <div className="service-process-grid">
              {props.steps.map((step, index) => (
                <Reveal className="service-process-step" key={step.title} delay={index * 0.05}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="section service-page-faq">
          <NetworkField variant="right" />
          <div className="container service-faq-grid">
            <Reveal className="service-page-heading service-page-heading-sticky">
              <span className="section-number">{props.prices ? "06" : "05"}</span>
              <div><h2>Questions fréquentes</h2><p>Les réponses essentielles avant de démarrer votre projet.</p></div>
            </Reveal>
            <div className="service-faq-list">
              {props.faqs.map((faq) => (
                <details key={faq.question}>
                  <summary><h3>{faq.question}</h3><span aria-hidden="true">+</span></summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section service-related">
          <div className="container">
            <Reveal className="service-page-heading">
              <span className="section-number">{props.prices ? "07" : "06"}</span>
              <div><h2>Explorer les autres solutions.</h2><p>Chaque métier mérite une structure et un parcours adaptés à ses clients.</p></div>
            </Reveal>
            <div className="service-related-grid">
              {props.relatedPages.map((page) => (
                <Link className="service-related-link" href={page.href} key={page.href}>
                  <div><h3>{page.label}</h3><p>{page.description}</p></div>
                  <ArrowUpRight size={20} aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section service-final-cta">
          <div className="cta-orbit" aria-hidden="true"><span /><span /></div>
          <div className="container">
            <Reveal className="service-final-cta-inner">
              <h2>Un projet à construire&nbsp;?</h2>
              <p>Présentez-nous votre activité et vos objectifs. Nous vous répondrons avec des prochaines étapes claires.</p>
              <div>
                <a className="button button-dark" href={site.whatsapp} target="_blank" rel="noreferrer">
                  <MessageCircle size={18} aria-hidden="true" /> WhatsApp
                </a>
                <Link className="button button-clear" href="/#contact">Demander un devis <ArrowUpRight size={18} aria-hidden="true" /></Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
