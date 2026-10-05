import { ArrowUp, Phone } from "lucide-react";
import { navigation, practiceAreas, site } from "@/lib/site-content";
import { ContactLink } from "./ContactChannels";
import { Brand } from "./Brand";
import { InstagramIcon, WhatsAppIcon } from "./SocialIcons";

export function Footer() {
  const year = new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    timeZone: "America/Sao_Paulo",
  }).format(new Date());

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <a
            className="site-footer__brand"
            href="#inicio"
            aria-label={`${site.name}, início`}
          >
            <Brand variant="monogram" tone="light" decorative />
            <span>
              {site.fullName.replace(/ Advogados Associados$/, "")}
              <small>Advogados Associados</small>
            </span>
          </a>
          <a className="site-footer__back" href="#inicio">
            <span>Voltar ao início</span>
            <ArrowUp size={19} strokeWidth={1.3} aria-hidden="true" />
          </a>
        </div>
        <div className="site-footer__grid">
          <div className="site-footer__positioning">
            <p>
              Assessoria jurídica empresarial.
              <br />
              Contencioso estratégico e de massa.
            </p>
            <span>Desde 2006 em Florianópolis, Santa Catarina.</span>
          </div>
          <nav className="site-footer__column" aria-label="Navegação do rodapé">
            <h2>O escritório</h2>
            <ul>
              {navigation.map(({ label, href }) => (
                <li key={href}>
                  <a href={href}>{label}</a>
                </li>
              ))}
              {!navigation.some(({ href }) => String(href) === "#contato") && (
                <li>
                  <a href="#contato">Contato</a>
                </li>
              )}
            </ul>
          </nav>
          <nav
            className="site-footer__column site-footer__practice"
            aria-label="Áreas de atuação"
          >
            <h2>Atuação</h2>
            <ul>
              {practiceAreas.map(({ id, title }) => (
                <li key={id}>
                  <a href={`#atuacao-${id}`}>{title}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="site-footer__column site-footer__contact">
            <h2>Contato</h2>
            <address>
              {site.address}
              <br />
              {site.location}
              <br />
              CEP {site.postalCode}
            </address>
            <ul className="site-footer__channels">
              <li>
                <ContactLink channel="whatsapp">
                  <WhatsAppIcon size={18} />
                  <span>WhatsApp</span>
                </ContactLink>
              </li>
              <li>
                <ContactLink channel="phone">
                  <Phone size={17} strokeWidth={1.5} aria-hidden="true" />
                  <span>{site.phone}</span>
                </ContactLink>
              </li>
              <li>
                <ContactLink channel="instagram">
                  <InstagramIcon size={18} />
                  <span>{site.instagramHandle}</span>
                </ContactLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="site-footer__legal">
          <p>
            © {year} {site.fullName}. Todos os direitos reservados.
          </p>
          <p>Conteúdo institucional de caráter informativo.</p>
        </div>
      </div>
    </footer>
  );
}
