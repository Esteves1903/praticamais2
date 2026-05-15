import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const SITE_URL = "https://praticamais.pt";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["EducationalOrganization", "LocalBusiness"],
      "@id": `${SITE_URL}/#organization`,
      "name": "Pratica+",
      "alternateName": "Pratica Mais",
      "url": SITE_URL,
      "logo": `${SITE_URL}/icon.png`,
      "image": `${SITE_URL}/hero.png`,
      "description": "Explicações online personalizadas do 5º ao 12º ano em Porto. Matemática, Física, Economia, MACS e Inglês com explicadores do ISEP e da FEP.",
      "telephone": "+351919761389",
      "email": "pratica.mais.26@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Porto",
        "addressRegion": "Porto",
        "addressCountry": "PT",
      },
      "geo": { "@type": "GeoCoordinates", "latitude": "41.1579", "longitude": "-8.6291" },
      "areaServed": { "@type": "Country", "name": "Portugal" },
      "priceRange": "€€",
      "currenciesAccepted": "EUR",
      "paymentAccepted": "MBway",
      "openingHoursSpecification": [
        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "09:00", "closes": "22:00" },
        { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "09:00", "closes": "18:00" },
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Explicações Online",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Course", "name": "Explicações de Matemática", "description": "Apoio em Matemática do 5º ao 12º ano, incluindo Matemática A e B para exame nacional." } },
          { "@type": "Offer", "itemOffered": { "@type": "Course", "name": "Explicações de Física e Química", "description": "Apoio em Física e Química do 7º ao 9º ano." } },
          { "@type": "Offer", "itemOffered": { "@type": "Course", "name": "Explicações de Física", "description": "Preparação para o exame nacional de Física do 12º ano." } },
          { "@type": "Offer", "itemOffered": { "@type": "Course", "name": "Explicações de Economia", "description": "Apoio em Economia do 10º ao 12º ano." } },
          { "@type": "Offer", "itemOffered": { "@type": "Course", "name": "Explicações de Inglês", "description": "Apoio em Inglês do 5º ao 12º ano." } },
          { "@type": "Offer", "itemOffered": { "@type": "Course", "name": "Explicações de MACS", "description": "Apoio em Matemática Aplicada às Ciências Sociais do 10º ao 12º ano." } },
        ],
      },
      "sameAs": ["https://wa.me/351919761389"],
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      "mainEntity": [
        { "@type": "Question", "name": "O que é o Pratica+?", "acceptedAnswer": { "@type": "Answer", "text": "O Pratica+ é um projeto de apoio escolar focado em resultados, criado por estudantes do ISEP e da FEP para ajudar alunos do 5º ao 12º ano a superar dificuldades e subir as notas." } },
        { "@type": "Question", "name": "Como funciona o agendamento de explicações?", "acceptedAnswer": { "@type": "Answer", "text": "Basta clicar no botão 'Agendar' e escolher um horário disponível no calendário online. Após a reserva, receberás uma confirmação. Os horários são retirados automaticamente assim que forem reservados." } },
        { "@type": "Question", "name": "As aulas são presenciais ou online?", "acceptedAnswer": { "@type": "Answer", "text": "As aulas são online e focadas na resolução de exercícios práticos e esclarecimento de dúvidas. Usamos plataformas como Zoom ou Google Meet." } },
        { "@type": "Question", "name": "Quanto custam as explicações?", "acceptedAnswer": { "@type": "Answer", "text": "A sessão experimental tem 50% desconto (5€ no básico, 7.50€ no secundário). Aulas individuais a 10€/h no ensino básico e 15€/h no ensino secundário. Pack mensal a 45€ (básico) ou 65€ (secundário)." } },
        { "@type": "Question", "name": "Como é feito o pagamento das explicações?", "acceptedAnswer": { "@type": "Answer", "text": "O pagamento é feito através do MBway após confirmação da marcação da aula com o professor." } },
        { "@type": "Question", "name": "O que inclui o Pack Mensal?", "acceptedAnswer": { "@type": "Answer", "text": "O Pack Mensal inclui 4 aulas individuais mais acompanhamento online sempre que surjam dúvidas ao longo do mês." } },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      "url": SITE_URL,
      "name": "Pratica+",
      "description": "Explicações online personalizadas do 5º ao 12º ano em Porto",
      "inLanguage": "pt-PT",
      "publisher": { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning style={{ margin: 0, fontFamily: "'Inter', sans-serif", background: "#f8fafc" }}>
        {children}
      </body>
    </html>
  );
}
