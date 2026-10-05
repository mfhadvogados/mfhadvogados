import { site } from "@/lib/site-content";
import { WhatsAppIcon } from "./SocialIcons";

export function FloatingWhatsApp() {
  return (
    <a
      className="floating-whatsapp"
      href={site.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com o escritório pelo WhatsApp (abre em nova aba)"
    >
      <WhatsAppIcon size={26} />
    </a>
  );
}
