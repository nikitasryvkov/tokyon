import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/content";
import "./globals.css";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.domain;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "TOKYON TECH / TEKYON - разработка сайтов, backend и поддержка",
    template: "%s | TOKYON TECH"
  },
  description:
    "TOKYON TECH разрабатывает сайты, web-приложения, backend, API, интеграции с PostgreSQL, админки и техническую поддержку для бизнеса.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: baseUrl,
    siteName: "TOKYON TECH",
    title: "TOKYON TECH / TEKYON - IT-разработка для бизнеса",
    description:
      "Современные сайты, web-приложения, backend, API, базы данных, админки и сопровождение."
  },
  twitter: {
    card: "summary_large_image",
    title: "TOKYON TECH / TEKYON",
    description: "Разработка сайтов, backend, API и техническая поддержка."
  },
  robots: {
    index: true,
    follow: true
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f8fb" },
    { media: "(prefers-color-scheme: dark)", color: "#0f141b" }
  ]
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    name: site.name,
    alternateName: site.altName,
    url: baseUrl,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address,
      addressCountry: "RU"
    },
    taxID: site.inn,
    identifier: site.ogrnip,
    sameAs: [site.telegramHref]
  };

  return (
    <html lang="ru" suppressHydrationWarning>
      <body>
        <JsonLd data={organizationJsonLd} />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
