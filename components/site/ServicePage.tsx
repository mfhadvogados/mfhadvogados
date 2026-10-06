import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  differentials,
  institutionalCopy,
  litigationServices,
  litigationSteps,
  practiceAreas,
  preventionSteps,
  site,
} from "@/lib/site-content";
import { servicePages, type ServicePageKey } from "@/lib/service-pages";
import { ContactLink } from "./ContactChannels";
import { FloatingWhatsApp } from "./FloatingWhatsApp";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { StructuredData } from "./StructuredData";
import "./service-page.css";

// As páginas usam a redação existente. Conteúdo completo entregue no servidor.
export function ServicePage({ service }: { service: ServicePageKey }) {
  const page = servicePages[service];
  const isBusiness = service === "business";
  const otherPage = servicePages[isBusiness ? "litigation" : "business"];
  const steps = isBusiness ? preventionSteps : litigationSteps;

  return (
    <>
      <StructuredData service={service} />
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <Header homePath="/" />
      <main id="conteudo" tabIndex={-1} className="service-page">
        <section
          id="inicio"
          className="service-page__intro"
          aria-labelledby="service-title"
        >
          <div className="container">
            <nav
              className="service-page__breadcrumbs"
              aria-label="Caminho da página"
            >
              <Link href="/">{site.name}</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{page.name}</span>
            </nav>
            <p className="section-label">{site.location}</p>
            <h1 id="service-title">{page.name}</h1>
            <div className="service-page__lead">
              {isBusiness ? (
                institutionalCopy.practice.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))
              ) : (
                <p>{institutionalCopy.litigation.lead}</p>
              )}
            </div>
            <div className="service-page__actions">
              <ContactLink channel="whatsapp" className="button button-dark">
                Falar com o escritório{" "}
                <ArrowUpRight size={18} aria-hidden="true" />
              </ContactLink>
              <Link href="/#profissionais" className="text-link">
                Profissionais <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {isBusiness ? (
          <section
            className="section service-page__areas"
            aria-labelledby="service-areas-title"
          >
            <div className="container">
              <h2 id="service-areas-title">Atuação</h2>
              <div className="service-page__area-list">
                {practiceAreas.map((area) => (
                  <article key={area.id} id={`atuacao-${area.id}`}>
                    <h3>{area.title}</h3>
                    <div>
                      <p>{area.description}</p>
                      <ul>
                        {area.details.map((detail) => (
                          <li key={detail}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : (
          <section
            className="section service-page__operation"
            aria-labelledby="service-operation-title"
          >
            <div className="container service-page__operation-grid">
              <div>
                <h2 id="service-operation-title">
                  Qualidade técnica.
                  <br /> Eficiência operacional.
                </h2>
                {institutionalCopy.litigation.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <ul
                className="service-page__services"
                aria-label="Serviços de contencioso"
              >
                {litigationServices.map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <section
          className="section service-page__steps"
          aria-labelledby="service-steps-title"
        >
          <div className="container">
            <h2 id="service-steps-title">
              {isBusiness
                ? "Prevenção e suporte contínuo"
                : "Uma operação organizada em cada etapa."}
            </h2>
            {isBusiness && (
              <p className="service-page__steps-lead">
                {institutionalCopy.prevention}
              </p>
            )}
            <ol>
              {steps.map((step, index) => (
                <li key={step.title}>
                  <span
                    className="service-page__step-number"
                    aria-hidden="true"
                  >
                    0{index + 1}
                  </span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
            {!isBusiness && (
              <p className="service-page__note">
                {institutionalCopy.litigation.note}
              </p>
            )}
          </div>
        </section>

        {!isBusiness && (
          <section
            className="section service-page__differentials"
            aria-labelledby="service-differentials-title"
          >
            <div className="container">
              <h2 id="service-differentials-title">O nosso jeito de atuar</h2>
              <div className="service-page__area-list">
                {differentials.map((item) => (
                  <article key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        <nav className="service-page__related" aria-label="Frentes de atuação">
          <div className="container">
            <Link href={otherPage.path}>
              {otherPage.name} <ArrowRight size={22} aria-hidden="true" />
            </Link>
          </div>
        </nav>
      </main>
      <Footer homePath="/" />
      <FloatingWhatsApp />
    </>
  );
}
