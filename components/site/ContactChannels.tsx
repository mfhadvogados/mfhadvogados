import type { ReactNode } from "react";
import { ArrowUpRight, Phone } from "lucide-react";
import { contacts, site, type ContactChannel } from "@/lib/site-content";
import { InstagramIcon, WhatsAppIcon } from "./SocialIcons";

type ContactLinkProps = {
  channel: ContactChannel;
  children?: ReactNode;
  className?: string;
};

export function ContactLink({
  channel,
  children,
  className,
}: ContactLinkProps) {
  const contact = contacts[channel];
  const isExternal = contact.href.startsWith("https:");

  return (
    <a
      className={className}
      href={contact.href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      {children ?? contact.label}
      {isExternal && <span className="sr-only"> (abre em nova aba)</span>}
    </a>
  );
}

const channelIcons = {
  whatsapp: WhatsAppIcon,
  instagram: InstagramIcon,
  phone: Phone,
};

export function ContactChannels() {
  return (
    <div className="contact-channels">
      {(["whatsapp", "phone", "instagram"] as const).map((channel) => {
        const contact = contacts[channel];
        const Icon = channelIcons[channel];

        return (
          <ContactLink
            channel={channel}
            className="contact-channel"
            key={channel}
          >
            <span className="contact-channel__icon" aria-hidden="true">
              <Icon size={24} />
            </span>
            <span className="contact-channel__details">
              <span className="contact-channel__name">{contact.label}</span>
              <span className="contact-channel__value">
                {channel === "instagram" ? site.instagramHandle : site.phone}
              </span>
            </span>
            <span className="contact-channel__action">
              {channel === "phone"
                ? "Ligar"
                : channel === "instagram"
                  ? "Acompanhar"
                  : contact.action}
              <ArrowUpRight size={19} strokeWidth={1.3} aria-hidden="true" />
            </span>
          </ContactLink>
        );
      })}
    </div>
  );
}
