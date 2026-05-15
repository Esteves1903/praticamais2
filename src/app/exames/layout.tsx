import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Exames Nacionais — Enunciados e Critérios",
  description:
    "Consulta os enunciados e critérios de correção dos exames nacionais de Matemática, Física, Economia, MACS e Inglês. Recursos gratuitos para preparação aos exames do secundário.",
  keywords: [
    "exames nacionais portugal",
    "enunciados exames nacionais",
    "critérios correção exames",
    "exames matemática 12 ano",
    "exames física 12 ano",
    "preparação exames nacionais",
    "exames iave",
    "enunciados matematica a",
  ],
  alternates: {
    canonical: "https://praticamais.pt/exames",
  },
  openGraph: {
    title: "Exames Nacionais — Enunciados e Critérios | Pratica+",
    description:
      "Enunciados e critérios de correção dos exames nacionais. Recursos gratuitos para Matemática, Física, Economia, MACS e Inglês.",
    url: "https://praticamais.pt/exames",
  },
};

export default function ExamesLayout({ children }: { children: ReactNode }) {
  return children;
}
