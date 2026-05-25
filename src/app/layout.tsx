import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const SITE_URL = "https://praticamais.pt";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    /* ── Organização principal ── */
    {
      "@type": ["EducationalOrganization", "LocalBusiness"],
      "@id": `${SITE_URL}/#organization`,
      "name": "Pratica+",
      "alternateName": ["Pratica Mais", "PraticaMais", "Pratica+ Explicações"],
      "url": SITE_URL,
      "logo": `${SITE_URL}/icon.png`,
      "image": `${SITE_URL}/hero.png`,
      "description": "Explicações online de Matemática, Física, MACS, Economia e Inglês para alunos do 5º ao 12º ano. Professores do ISEP e da FEP. Primeira sessão com 50% desconto.",
      "telephone": "+351919761389",
      "email": "pratica.mais.26@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Porto",
        "addressRegion": "Porto",
        "addressCountry": "PT",
        "postalCode": "4000",
      },
      "geo": { "@type": "GeoCoordinates", "latitude": "41.1579", "longitude": "-8.6291" },
      "areaServed": [
        { "@type": "Country", "name": "Portugal" },
        { "@type": "City", "name": "Porto" },
      ],
      "priceRange": "€€",
      "currenciesAccepted": "EUR",
      "paymentAccepted": "MBway",
      "openingHoursSpecification": [
        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "09:00", "closes": "22:00" },
        { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "09:00", "closes": "18:00" },
      ],
      "sameAs": ["https://wa.me/351919761389"],
    },

    /* ── Cursos individuais ── */
    {
      "@type": "Course",
      "@id": `${SITE_URL}/#course-matematica`,
      "name": "Explicações Online de Matemática",
      "description": "Explicações de Matemática online para alunos do 5º ao 12º ano. Inclui Matemática A, Matemática B e preparação completa para exames nacionais.",
      "provider": { "@id": `${SITE_URL}/#organization` },
      "educationalLevel": "5º ao 12º ano",
      "inLanguage": "pt-PT",
      "courseMode": "online",
      "url": SITE_URL,
      "teaches": ["Matemática A", "Matemática B", "Geometria", "Álgebra", "Funções", "Probabilidades"],
      "offers": { "@type": "Offer", "price": "10", "priceCurrency": "EUR", "availability": "https://schema.org/InStock", "url": SITE_URL },
    },
    {
      "@type": "Course",
      "@id": `${SITE_URL}/#course-fisica`,
      "name": "Explicações Online de Física",
      "description": "Explicações de Física online para alunos do 10º ao 12º ano. Preparação para o exame nacional de Física e Química A.",
      "provider": { "@id": `${SITE_URL}/#organization` },
      "educationalLevel": "10º ao 12º ano",
      "inLanguage": "pt-PT",
      "courseMode": "online",
      "url": SITE_URL,
      "offers": { "@type": "Offer", "price": "15", "priceCurrency": "EUR", "availability": "https://schema.org/InStock", "url": SITE_URL },
    },
    {
      "@type": "Course",
      "@id": `${SITE_URL}/#course-fq`,
      "name": "Explicações Online de Física e Química",
      "description": "Explicações de Física e Química online para alunos do 7º ao 9º ano.",
      "provider": { "@id": `${SITE_URL}/#organization` },
      "educationalLevel": "7º ao 9º ano",
      "inLanguage": "pt-PT",
      "courseMode": "online",
      "url": SITE_URL,
      "offers": { "@type": "Offer", "price": "10", "priceCurrency": "EUR", "availability": "https://schema.org/InStock", "url": SITE_URL },
    },
    {
      "@type": "Course",
      "@id": `${SITE_URL}/#course-macs`,
      "name": "Explicações Online de MACS",
      "description": "Explicações de MACS (Matemática Aplicada às Ciências Sociais) online para alunos do 10º ao 12º ano.",
      "provider": { "@id": `${SITE_URL}/#organization` },
      "educationalLevel": "10º ao 12º ano",
      "inLanguage": "pt-PT",
      "courseMode": "online",
      "url": SITE_URL,
      "offers": { "@type": "Offer", "price": "15", "priceCurrency": "EUR", "availability": "https://schema.org/InStock", "url": SITE_URL },
    },
    {
      "@type": "Course",
      "@id": `${SITE_URL}/#course-economia`,
      "name": "Explicações Online de Economia",
      "description": "Explicações de Economia online para alunos do 10º ao 12º ano.",
      "provider": { "@id": `${SITE_URL}/#organization` },
      "educationalLevel": "10º ao 12º ano",
      "inLanguage": "pt-PT",
      "courseMode": "online",
      "url": SITE_URL,
      "offers": { "@type": "Offer", "price": "15", "priceCurrency": "EUR", "availability": "https://schema.org/InStock", "url": SITE_URL },
    },
    {
      "@type": "Course",
      "@id": `${SITE_URL}/#course-ingles`,
      "name": "Explicações Online de Inglês",
      "description": "Explicações de Inglês online para alunos do 5º ao 12º ano.",
      "provider": { "@id": `${SITE_URL}/#organization` },
      "educationalLevel": "5º ao 12º ano",
      "inLanguage": "pt-PT",
      "courseMode": "online",
      "url": SITE_URL,
      "offers": { "@type": "Offer", "price": "10", "priceCurrency": "EUR", "availability": "https://schema.org/InStock", "url": SITE_URL },
    },

    /* ── FAQ (keyword-targeted) ── */
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Como funcionam as explicações online da Pratica+?",
          "acceptedAnswer": { "@type": "Answer", "text": "As explicações online são feitas através de Zoom ou Google Meet, em sessões individuais e ao vivo. O aluno partilha o ecrã, o professor explica e resolve exercícios em tempo real. Basta ter computador e internet." },
        },
        {
          "@type": "Question",
          "name": "Qual o preço das explicações online de Matemática?",
          "acceptedAnswer": { "@type": "Answer", "text": "Explicações de Matemática online: 10€/hora no ensino básico (5º ao 9º ano) e 15€/hora no ensino secundário (10º ao 12º ano). A primeira sessão tem 50% de desconto. Pack mensal a partir de 45€ com 4 aulas + apoio contínuo." },
        },
        {
          "@type": "Question",
          "name": "Posso ter explicações online se não for de Porto?",
          "acceptedAnswer": { "@type": "Answer", "text": "Sim. As aulas são 100% online, pelo que aceitamos alunos de todo o Portugal — Lisboa, Braga, Aveiro, Coimbra, Faro e qualquer outro local. Basta ter ligação à internet." },
        },
        {
          "@type": "Question",
          "name": "Quais as disciplinas disponíveis para explicações online?",
          "acceptedAnswer": { "@type": "Answer", "text": "Oferecemos explicações online de Matemática (5º ao 12º), Física e Química (7º ao 9º), Física (10º ao 12º), MACS, Economia e Inglês. Todos os professores são estudantes do ISEP ou da FEP." },
        },
        {
          "@type": "Question",
          "name": "Como agendar uma explicação online?",
          "acceptedAnswer": { "@type": "Answer", "text": "Clica em 'Agendar Sessão', escolhe o professor e disciplina, seleciona um horário disponível no calendário e submete o formulário. Recebes confirmação por email. O pagamento é feito via MBway após confirmação." },
        },
        {
          "@type": "Question",
          "name": "O que inclui o Pack Mensal de explicações?",
          "acceptedAnswer": { "@type": "Answer", "text": "O Pack Mensal inclui 4 aulas individuais online (1 por semana) mais acompanhamento contínuo por WhatsApp ao longo do mês. Preço: 45€ no básico ou 65€ no secundário." },
        },
      ],
    },

    /* ── WebSite com SearchAction ── */
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      "url": SITE_URL,
      "name": "Pratica+ — Explicações Online",
      "description": "Explicações online de Matemática, Física, MACS, Economia e Inglês do 5º ao 12º ano",
      "inLanguage": "pt-PT",
      "publisher": { "@id": `${SITE_URL}/#organization` },
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${SITE_URL}/?s={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },

    /* ── BreadcrumbList ── */
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}/#breadcrumb`,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Início", "item": SITE_URL },
        { "@type": "ListItem", "position": 2, "name": "Exames Nacionais", "item": `${SITE_URL}/exames` },
      ],
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Explicações Online de Matemática, Física e MACS | Pratica+",
    template: "%s | Pratica+ Explicações Online",
  },
  description:
    "Explicações online de Matemática, Física, MACS, Economia e Inglês para alunos do 5º ao 12º ano. Professores do ISEP e FEP. 1ª sessão com 50% desconto. Agenda já em praticamais.pt!",
  keywords: [
    "explicações online",
    "explicações online matemática",
    "explicações online física",
    "explicações online portugal",
    "explicações online porto",
    "explicações matemática online",
    "professor matemática online",
    "aulas particulares online",
    "apoio escolar online",
    "explicações MACS online",
    "explicações física e química online",
    "explicações economia online",
    "explicações inglês online",
    "explicações 12 ano online",
    "exame nacional matemática",
    "preparação exames nacionais online",
    "explicadores online portugal",
    "aulas online 5 ao 12 ano",
    "explicações online baratas",
    "explicações particulares portugal",
    "professor online matemática portugal",
    "explicações porto",
    "centro de estudos online",
    "pratica mais explicações",
  ],
  authors: [{ name: "Pratica+" }],
  creator: "Pratica+",
  publisher: "Pratica+",
  category: "education",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  alternates: {
    canonical: SITE_URL,
    languages: { "pt-PT": SITE_URL },
  },
  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: SITE_URL,
    siteName: "Pratica+",
    title: "Explicações Online de Matemática, Física e MACS | Pratica+",
    description:
      "Explicações online de Matemática, Física, MACS e Inglês para o 5º ao 12º ano. Professores do ISEP e FEP. 1ª sessão com 50% desconto. Todo o Portugal.",
    images: [
      {
        url: `${SITE_URL}/hero.png`,
        width: 1200,
        height: 630,
        alt: "Pratica+ — Explicações Online de Matemática, Física e MACS em Portugal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Explicações Online de Matemática, Física e MACS | Pratica+",
    description:
      "Explicações online do 5º ao 12º ano com professores do ISEP e FEP. 1ª sessão com 50% desconto.",
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
        <link rel="preload" as="image" href="/hero.png" />
        <meta name="geo.region" content="PT-13" />
        <meta name="geo.placename" content="Porto, Portugal" />
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
