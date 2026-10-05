import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/lib/site-content";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";
import "@/components/site/chrome.css";

// Montserrat Light, Regular, Medium, SemiBold e Bold identificadas nos PDFs.
// O arquivo variável já instalado cobre todos esses pesos, servido localmente.
const montserrat = localFont({
  src: "../node_modules/@fontsource-variable/montserrat/files/montserrat-latin-wght-normal.woff2",
  variable: "--font-mfh",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.name} | Assessoria empresarial e contencioso`,
  description: site.description,
  applicationName: site.name,
  ...(siteUrl
    ? { metadataBase: new URL(siteUrl), alternates: { canonical: "/" } }
    : {}),
  openGraph: {
    title: `${site.name} | Inteligência jurídica. Visão empresarial.`,
    description: site.description,
    siteName: site.name,
    locale: "pt_BR",
    type: "website",
    ...(siteUrl ? { url: siteUrl } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Assessoria empresarial e contencioso`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={montserrat.variable}>
      <body>{children}</body>
    </html>
  );
}
