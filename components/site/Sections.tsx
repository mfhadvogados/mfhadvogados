import Image from "next/image";
import {
  ArrowUpRight,
  Check,
  Plus,
  BriefcaseBusiness,
  Workflow,
  MonitorCog,
  MapPin,
  MessagesSquare,
} from "lucide-react";
import { assets } from "@/lib/site-assets";
import {
  differentials,
  litigationServices,
  litigationSteps,
  preventionSteps,
  professionals,
  site,
} from "@/lib/site-content";
import { PracticeAreas } from "./PracticeAreas";
import { StrategyFlow } from "./StrategyFlow";
import { Brand } from "./Brand";
import { ContactChannels } from "./ContactChannels";

export function About() {
  return (
    <section
      id="escritorio"
      className="section about"
      aria-labelledby="about-title"
    >
      <div className="container">
        <div className="about__grid">
          <div className="about__copy">
            <p className="section-label">O escritório</p>
            <h2 id="about-title" data-reveal="rise">
              Próximos do empresário.
              <br /> Parte da sua estratégia.
            </h2>
            <p className="lead">
              Há duas décadas, o MFH reúne experiência técnica, visão
              estratégica e atuação próxima às empresas.
            </p>
            <p>
              Desde 2006, em Florianópolis, acompanhamos as decisões da rotina
              empresarial. Crescer, contratar, negociar e gerir negócios exige
              orientação jurídica alinhada à realidade de cada empresa.
            </p>
            <p>
              Nosso propósito é ser uma extensão jurídica do cliente:
              atendimento próximo, soluções práticas e comunicação transparente,
              tanto na assessoria contínua quanto na gestão do contencioso.
            </p>
            <div className="about__foundation">
              <span>2006</span>
              <p>
                O início de uma história
                <br /> de atuação empresarial.
              </p>
            </div>
          </div>
          <figure className="about__figure" data-reveal="fade">
            <Image
              src={assets.team}
              alt="Equipe do MFH Advogados reunida no escritório em Florianópolis"
              sizes="(max-width: 900px) 90vw, 52vw"
              className="about__image"
            />
            <figcaption>
              Experiência compartilhada. Um olhar próximo para cada negócio.
            </figcaption>
          </figure>
        </div>
        <div className="about__statement">
          <p>
            Uma extensão da sua empresa.
            <br /> Uma parceria com o seu jurídico.
          </p>
          <span>
            Assessoria preventiva e capacidade operacional para demandas de
            média e alta complexidade.
          </span>
        </div>
      </div>
    </section>
  );
}

export function Practice() {
  return (
    <section
      id="atuacao"
      className="section practice"
      aria-labelledby="practice-title"
    >
      <div className="container practice__grid">
        <div className="practice__intro">
          <p className="section-label">Assessoria jurídica empresarial</p>
          <h2 id="practice-title" data-reveal="rise">
            O jurídico presente
            <br /> no dia a dia
            <br /> da sua empresa.
          </h2>
          <p>
            Uma assessoria contínua para as decisões que fazem parte do negócio.
            Do suporte a gestores e RH às relações com clientes, fornecedores e
            sócios.
          </p>
          <p>
            Orientação próxima e estratégica, sem a necessidade de estruturar um
            departamento jurídico interno.
          </p>
          <a className="text-link" href="#contato">
            Converse com o escritório{" "}
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
        <PracticeAreas />
      </div>
    </section>
  );
}

export function Prevention() {
  return (
    <section
      id="prevencao"
      className="section prevention"
      aria-labelledby="prevention-title"
    >
      <div className="container">
        <div className="prevention__heading">
          <p className="section-label">Prevenção e suporte contínuo</p>
          <h2 id="prevention-title" data-reveal="rise">
            Ao lado do empresário.
            <br /> Antes da decisão.
          </h2>
          <p>
            Não atuamos apenas quando surge um problema. Conhecer o negócio e
            orientar suas escolhas é parte essencial do nosso trabalho.
          </p>
        </div>
        <StrategyFlow
          id="prevention"
          label="Caminho da assessoria preventiva"
          steps={preventionSteps}
        />
      </div>
      <Brand
        variant="monogram"
        tone="light"
        decorative
        className="prevention__watermark"
      />
    </section>
  );
}

export function Litigation() {
  return (
    <section
      id="contencioso"
      className="section litigation"
      aria-labelledby="litigation-title"
    >
      <div className="container">
        <div className="litigation__heading">
          <div>
            <p className="section-label">Uma frente dedicada</p>
            <h2 id="litigation-title" data-reveal="rise">
              Contencioso estratégico
              <br /> e de massa.
            </h2>
          </div>
          <p className="litigation__lead">
            Estrutura para atuar como extensão operacional de departamentos
            jurídicos e grandes bancas.
          </p>
        </div>
        <div className="litigation__body">
          <div className="litigation__intro">
            <h3>
              Qualidade técnica.
              <br /> Eficiência operacional.
            </h3>
            <p>
              Atuamos como parceiros de empresas e escritórios de advocacia,
              combinando condução estratégica de demandas e capacidade para
              gerir elevado volume processual.
            </p>
            <p>
              Controle rigoroso de prazos, padronização de peças, atendimento
              dedicado e comunicação direta com departamentos jurídicos.
            </p>
            <a className="button button-dark" href="#contato">
              Vamos construir uma parceria{" "}
              <ArrowUpRight aria-hidden="true" size={18} />
            </a>
          </div>
          <ul
            className="litigation__services"
            aria-label="Serviços de contencioso"
          >
            {litigationServices.map((service) => (
              <li key={service}>
                <Check size={18} aria-hidden="true" />
                <span>{service}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="litigation__flow">
          <h3>Uma operação organizada em cada etapa.</h3>
          <StrategyFlow
            id="litigation"
            label="Fluxo do contencioso"
            steps={litigationSteps}
          />
          <p className="litigation__note">
            Gestão processual com ferramentas digitais e acompanhamento por
            indicadores.
          </p>
        </div>
      </div>
    </section>
  );
}

const differentialIcons = [
  BriefcaseBusiness,
  Workflow,
  MonitorCog,
  MapPin,
  MessagesSquare,
];
export function Differentials() {
  return (
    <section
      id="diferenciais"
      className="section differentials"
      aria-labelledby="differentials-title"
    >
      <div className="container differentials__grid">
        <div className="differentials__intro">
          <p className="section-label">O nosso jeito de atuar</p>
          <h2 id="differentials-title" data-reveal="rise">
            Conhecer o negócio.
            <br /> Enxergar o todo.
          </h2>
          <p>
            Uma visão que conecta técnica jurídica, organização e
            relacionamento. Soluções pensadas para a realidade de cada cliente.
          </p>
          <Brand
            variant="monogram"
            tone="dark"
            decorative
            className="differentials__brand"
          />
        </div>
        <div className="differentials__list">
          {differentials.map((item, index) => {
            const Icon = differentialIcons[index];
            return (
              <article key={item.title}>
                <Icon size={26} strokeWidth={1.25} aria-hidden="true" />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Professionals() {
  return (
    <section
      id="profissionais"
      className="section professionals"
      aria-labelledby="professionals-title"
    >
      <div className="container">
        <div className="professionals__heading">
          <div>
            <p className="section-label">Os sócios</p>
            <h2 id="professionals-title" data-reveal="rise">
              Experiência que se soma.
              <br /> Estratégia que se constrói.
            </h2>
          </div>
          <p>
            Três trajetórias à frente de uma atuação próxima, técnica e
            integrada ao negócio.
          </p>
        </div>
        <div className="professionals__grid">
          {professionals.map((professional) => (
            <article
              className="professional"
              key={professional.id}
              aria-labelledby={`professional-${professional.id}`}
            >
              <div className="professional__portrait">
                <Image
                  src={assets.portraits[professional.id]}
                  alt={professional.name}
                  sizes="(max-width: 600px) 90vw, (max-width: 900px) 44vw, 30vw"
                />
              </div>
              <div className="professional__copy">
                <p className="professional__role">{professional.role}</p>
                <h3 id={`professional-${professional.id}`}>
                  {professional.name}
                </h3>
                <p className="professional__registration">
                  {professional.registration}
                </p>
                <p className="professional__areas">{professional.areas}</p>
                <p className="professional__introduction">
                  {professional.introduction}
                </p>
                <details className="professional__details">
                  <summary>
                    Conhecer trajetória <Plus size={17} aria-hidden="true" />
                  </summary>
                  <div>
                    {professional.biography.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </details>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section
      id="contato"
      className="section contact"
      aria-labelledby="contact-title"
    >
      <div className="container">
        <div className="contact__heading">
          <p className="section-label">Vamos conversar</p>
          <h2 id="contact-title" data-reveal="rise">
            Uma parceria para
            <br /> o seu próximo passo.
          </h2>
          <p>
            Para a rotina da sua empresa ou para a estrutura da sua operação
            jurídica. Conheça de perto a atuação do MFH.
          </p>
        </div>
        <div className="contact__grid">
          <ContactChannels />
          <div className="contact__address">
            <MapPin size={23} strokeWidth={1.25} aria-hidden="true" />
            <div>
              <h3>Encontre o escritório</h3>
              <address>
                {site.address}
                <br /> {site.location}
                <br /> CEP {site.postalCode}
              </address>
              <a
                className="text-link"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.address}, ${site.location}, ${site.postalCode}`)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver localização <ArrowUpRight size={17} aria-hidden="true" />
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
