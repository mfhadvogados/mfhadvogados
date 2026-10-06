import { Header } from "@/components/site/Header";
import { Hero, PracticePaths } from "@/components/site/Hero";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { Reviews } from "@/components/site/Reviews";
import { StructuredData } from "@/components/site/StructuredData";
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
  return (
    <>
      <StructuredData />
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
