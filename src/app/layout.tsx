import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const SITE_URL = "https://praticamais.pt";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Pratica+ | Explicações Online Porto — 5º ao 12º Ano",
    template: "%s | Pratica+",
  },
  description:
    "Explicações online personalizadas do 5º ao 12º ano em Porto. Matemática, Física, Economia, MACS e Inglês com explicadores do ISEP e da FEP. Primeira sessão com 50% desconto. Agenda já!",
  keywords: [
    "explicações porto",
    "explicadores porto",
    "apoio escolar porto",
    "explicações matemática porto",
    "explicações online portugal",
    "explicações física porto",
    "explicações economia porto",
    "explicadores isep",
    "explicadores fep",
    "apoio escolar 12 ano",
    "preparação exames nacionais",
    "explicações inglês porto",
    "explicações MACS",
    "centro de estudos porto",
    "explicações 5 ao 12 ano",
    "aulas online portugal",
    "pratica mais explicações",
  ],
  authors: [{ name: "Pratica+" }],
  creator: "Pratica+",
  publisher: "Pratica+",
  category: "education",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: SITE_URL,
    siteName: "Pratica+",
    title: "Pratica+ | Explicações Online Porto — 5º ao 12º Ano",
    description:
      "Explicações online personalizadas do 5º ao 12º ano. Matemática, Física, Economia, MACS e Inglês com explicadores do ISEP e da FEP. 1ª sessão com 50% desconto.",
    images: [
      {
        url: `${SITE_URL}/hero.png`,
        width: 1200,
        height: 630,
        alt: "Pratica+ — Explicações Online Personalizadas Porto",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pratica+ | Explicações Online Porto — 5º ao 12º Ano",
    description:
      "Explicações online do 5º ao 12º ano com explicadores do ISEP e da FEP. 1ª sessão com 50% desconto.",
    images: [`${SITE_URL}/hero.png`],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-PT">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <meta name="geo.region" content="PT-13" />
        <meta name="geo.placename" content="Porto" />
        <meta name="geo.position" content="41.1579;-8.6291" />
        <meta name="ICBM" content="41.1579, -8.6291" />
      </head>
      <body suppressHydrationWarning style={{ margin: 0, fontFamily: "'Inter', sans-serif", background: "#f8fafc" }}>
        {children}
      </body>
    </html>
  );
}
