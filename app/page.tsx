import { Header } from "@/components/site/Header";
import { Hero, PracticePaths } from "@/components/site/Hero";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { Reviews } from "@/components/site/Reviews";
import { site } from "@/lib/site-content";
import { siteUrl } from "@/lib/site-url";
import {
  About,
  Prevention,
  Litigation,
  Differentials,
  Professionals,
  Contact,
  Practice,
} from "@/components/site/Sections";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: site.fullName,
    alternateName: site.name,
    description: site.description,
    foundingDate: "2006",
    telephone: "+5548999424925",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address,
      addressLocality: "Florianópolis",
      addressRegion: "SC",
      postalCode: site.postalCode,
      addressCountry: "BR",
    },
    sameAs: [site.instagramHref],
    ...(siteUrl
      ? { url: siteUrl, image: `${siteUrl}/opengraph-image.png` }
      : {}),
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <Header />
      <main id="conteudo" tabIndex={-1}>
        <Hero />
        <PracticePaths />
        <About />
        <Practice />
        <Prevention />
        <Litigation />
        <Differentials />
        <Professionals />
        <Contact />
        <Reviews />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <ScrollReveal />
    </>
  );
}
