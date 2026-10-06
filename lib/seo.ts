import type { Metadata } from "next";
import { assets } from "./site-assets";
import { site, practiceAreas, professionals } from "./site-content";
import { absoluteUrl } from "./site-url";
import { servicePages, type ServicePageKey } from "./service-pages";

export const homeSeo = {
  path: "/",
  name: site.name,
  title: "Advocacia empresarial em Florianópolis | MFH Advogados",
  description: site.description,
} as const;

type PageSeo = {
  path: string;
  name: string;
  title: string;
  description: string;
};

export function pageMetadata(page: PageSeo): Metadata {
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: absoluteUrl(page.path) },
    openGraph: {
      title: page.title,
      description: page.description,
      url: absoluteUrl(page.path),
      siteName: site.name,
      locale: "pt_BR",
      type: "website",
      images: [
        {
          url: absoluteUrl("/opengraph-image.png"),
          width: 1200,
          height: 630,
          alt: site.fullName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [absoluteUrl("/opengraph-image.png")],
    },
  };
}

// Relaciona entidades comprováveis; não declara notas, preços, horários ou fundadores.
export function structuredData(serviceKey?: ServicePageKey) {
  const page = serviceKey ? servicePages[serviceKey] : homeSeo;
  const organizationId = absoluteUrl("/#escritorio");
  const websiteId = absoluteUrl("/#website");
  const state = { "@type": "State", name: "Santa Catarina" };
  const logo = absoluteUrl("/marca/mfh-advogados-logo-preta.png");
  const serviceEntities = (
    serviceKey ? [servicePages[serviceKey]] : Object.values(servicePages)
  ).map((service) => ({
    "@type": "Service",
    "@id": absoluteUrl(`${service.path}#service`),
    name: service.name,
    description: service.description,
    url: absoluteUrl(service.path),
    areaServed: state,
    provider: { "@id": organizationId },
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LegalService",
        "@id": organizationId,
        name: site.fullName,
        alternateName: site.name,
        description: site.description,
        url: absoluteUrl("/"),
        logo,
        image: absoluteUrl(assets.team.src),
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
        areaServed: state,
        hasMap: site.mapsHref,
        sameAs: [site.instagramHref],
        member: professionals.map(({ id }) => ({
          "@id": absoluteUrl(`/#professional-${id}`),
        })),
        ...(serviceKey !== "litigation"
          ? {
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Áreas de atuação",
                itemListElement: practiceAreas.map((area) => ({
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: area.title,
                    description: area.description,
                    url: absoluteUrl(
                      `${servicePages.business.path}#atuacao-${area.id}`,
                    ),
                    provider: { "@id": organizationId },
                    areaServed: state,
                  },
                })),
              },
            }
          : {}),
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: absoluteUrl("/"),
        name: site.name,
        alternateName: site.fullName,
        inLanguage: "pt-BR",
        publisher: { "@id": organizationId },
      },
      ...(!serviceKey
        ? professionals.map((professional) => ({
            "@type": "Person",
            "@id": absoluteUrl(`/#professional-${professional.id}`),
            name: professional.name,
            jobTitle: professional.role,
            description: professional.biography.join("\n\n"),
            identifier: professional.registration,
            knowsAbout: professional.areas,
            image: absoluteUrl(assets.portraits[professional.id].src),
            worksFor: { "@id": organizationId },
            url: absoluteUrl(`/#professional-${professional.id}`),
          }))
        : []),
      ...serviceEntities,
      {
        "@type": "WebPage",
        "@id": absoluteUrl(`${page.path}#webpage`),
        url: absoluteUrl(page.path),
        name: page.title,
        description: page.description,
        inLanguage: "pt-BR",
        isPartOf: { "@id": websiteId },
        about: { "@id": organizationId },
        mainEntity: {
          "@id": serviceKey
            ? absoluteUrl(`${page.path}#service`)
            : organizationId,
        },
        ...(serviceKey
          ? { breadcrumb: { "@id": absoluteUrl(`${page.path}#breadcrumb`) } }
          : {}),
      },
      ...(serviceKey
        ? [
            {
              "@type": "BreadcrumbList",
              "@id": absoluteUrl(`${page.path}#breadcrumb`),
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: site.name,
                  item: absoluteUrl("/"),
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: page.name,
                  item: absoluteUrl(page.path),
                },
              ],
            },
          ]
        : []),
    ],
  };
}
