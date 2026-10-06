import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/lib/site-content";
import { siteUrl } from "@/lib/site-url";
import { homeSeo, pageMetadata } from "@/lib/seo";
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
  ...pageMetadata(homeSeo),
  metadataBase: new URL(siteUrl),
  applicationName: site.name,
  robots: { index: true, follow: true },
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
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
