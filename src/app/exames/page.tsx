"use client";
import { useState } from "react";

type Link = { href: string; label: string };
type Fase = { nome: string; enunciado: Link; criterios: Link };
type AnoData = { ano: number; fases: Fase[] };
type Disciplina = {
  nome: string;
  icon: string;
  subtitle: string;
  anos: AnoData[];
};

const FASE_COLORS: Record<string, string> = {
  "1ª Fase": "#2563eb",
  "2ª Fase": "#7c3aed",
  "Época Especial": "#d97706",
};

const BASE = "https://iave.pt/wp-content/uploads";

const SECUNDARIO: Disciplina[] = [
  {
    nome: "Matemática A",
    icon: "∑",
    subtitle: "Código 635",
    anos: [
      {
        ano: 2025,
        fases: [
          {
            nome: "1ª Fase",
            enunciado: { href: `${BASE}/2025/06/EX-MatA635-F1-2025_net-1.pdf`, label: "Enunciado" },
            criterios: { href: `${BASE}/2025/07/EX-MatA635-F1-2025-CC-VD_net.pdf`, label: "Critérios" },
          },
          {
            nome: "2ª Fase",
            enunciado: { href: `${BASE}/2025/07/EX-MatA635-F2-2025_net.pdf`, label: "Enunciado" },
            criterios: { href: `${BASE}/2025/07/EX-MatA635-F2-2025-CC-VD_net.pdf`, label: "Critérios" },
          },
          {
            nome: "Época Especial",
            enunciado: { href: `${BASE}/2025/08/EX-MatA635-EE-2025.pdf`, label: "Enunciado" },
            criterios: { href: `${BASE}/2025/08/EX-MatA635-EE-2025-CC.pdf`, label: "Critérios" },
          },
        ],
      },
      {
        ano: 2024,
        fases: [
          {
            nome: "1ª Fase",
            enunciado: { href: `${BASE}/2024/06/EX-MatA635-F1-2024_net.pdf`, label: "Enunciado" },
            criterios: { href: `${BASE}/2024/07/EX-MatA635-F1-2024-CC-VD_net.pdf`, label: "Critérios" },
          },
          {
            nome: "2ª Fase",
            enunciado: { href: `${BASE}/2024/07/EX-MatA635-F2-2024_net.pdf`, label: "Enunciado" },
            criterios: { href: `${BASE}/2024/07/EX-MatA635-F2-2024-CC-VD_net.pdf`, label: "Critérios" },
          },
          {
            nome: "Época Especial",
            enunciado: { href: `${BASE}/2024/08/EX-MatA635-EE-2024_net.pdf`, label: "Enunciado" },
            criterios: { href: `${BASE}/2024/08/EX-MatA635-EE-2024-CC_net.pdf`, label: "Critérios" },
          },
        ],
      },
      {
        ano: 2023,
        fases: [
          {
            nome: "1ª Fase",
            enunciado: { href: `${BASE}/2023/06/EX-MatA635-F1-2023.pdf`, label: "Enunciado" },
            criterios: { href: `${BASE}/2023/07/EX-MatA635-F1-2023-CC-VD_net.pdf`, label: "Critérios" },
          },
          {
            nome: "2ª Fase",
            enunciado: { href: `${BASE}/2023/07/EX-MatA635-F2-2023_net.pdf`, label: "Enunciado" },
            criterios: { href: `${BASE}/2023/07/EX-MatA635-F2-2023-CC-VD.pdf`, label: "Critérios" },
          },
          {
            nome: "Época Especial",
            enunciado: { href: `${BASE}/2023/08/EX-MatA635-EE-2023_net.pdf`, label: "Enunciado" },
            criterios: { href: `${BASE}/2023/08/EX-MatA635-EE-2023-CC_net.pdf`, label: "Critérios" },
          },
        ],
      },
    ],
  },
  {
    nome: "Física e Química A",
    icon: "⚛️",
    subtitle: "Código 715",
    anos: [
      {
        ano: 2025,
        fases: [
          {
            nome: "1ª Fase",
            enunciado: { href: `${BASE}/2025/06/EX-FQA715-F1-2025-V1_net.pdf`, label: "Enunciado V1" },
            criterios: { href: `${BASE}/2025/07/EX-FQA715-F1-2025-CC-VD_net.pdf`, label: "Critérios" },
          },
          {
            nome: "2ª Fase",
            enunciado: { href: `${BASE}/2025/07/EX-FQA715-F2-2025-V1_net.pdf`, label: "Enunciado V1" },
            criterios: { href: `${BASE}/2025/07/EX-FQA715-F2-2025-CC-VD_net.pdf`, label: "Critérios" },
          },
          {
            nome: "Época Especial",
            enunciado: { href: `${BASE}/2025/08/EX-FQA715-EE-2025.pdf`, label: "Enunciado" },
            criterios: { href: `${BASE}/2025/08/EX-FQA715-EE-2025-CC.pdf`, label: "Critérios" },
          },
        ],
      },
      {
        ano: 2024,
        fases: [
          {
            nome: "1ª Fase",
            enunciado: { href: `${BASE}/2024/06/EX-FQA715-F1-2024-V1_net-3.pdf`, label: "Enunciado V1" },
            criterios: { href: `${BASE}/2024/07/EX-FQA715-F1-2024-CC-VD_net.pdf`, label: "Critérios" },
          },
          {
            nome: "2ª Fase",
            enunciado: { href: `${BASE}/2024/07/EX-FQA715-F2-2024-V1-1.pdf`, label: "Enunciado V1" },
            criterios: { href: `${BASE}/2024/07/EX-FQA715-F2-2024-CC-VD_net.pdf`, label: "Critérios" },
          },
          {
            nome: "Época Especial",
            enunciado: { href: `${BASE}/2024/08/EX-FQA715-EE-2024_net.pdf`, label: "Enunciado" },
            criterios: { href: `${BASE}/2024/08/EX-FQA715-EE-2024-CC_net.pdf`, label: "Critérios" },
          },
        ],
      },
      {
        ano: 2023,
        fases: [
          {
            nome: "1ª Fase",
            enunciado: { href: `${BASE}/2023/06/EX-FQA715-F1-2023-V1_net.pdf`, label: "Enunciado V1" },
            criterios: { href: `${BASE}/2023/07/EX-FQA715-F1-2023-CC-VD_net.pdf`, label: "Critérios" },
          },
          {
            nome: "2ª Fase",
            enunciado: { href: `${BASE}/2023/07/EX-FQA715-F2-2023-V1_net.pdf`, label: "Enunciado V1" },
            criterios: { href: `${BASE}/2023/07/EX-FQA715-F2-2023-CC-VD_net.pdf`, label: "Critérios" },
          },
          {
            nome: "Época Especial",
            enunciado: { href: `${BASE}/2023/08/EX-FQA715-EE-2023.pdf`, label: "Enunciado" },
            criterios: { href: `${BASE}/2023/08/EX-FQA715-EE-2023-CC.pdf`, label: "Critérios" },
          },
        ],
      },
    ],
  },
  {
    nome: "Economia A",
    icon: "📈",
    subtitle: "Código 712",
    anos: [
      {
        ano: 2025,
        fases: [
          {
            nome: "1ª Fase",
            enunciado: { href: `${BASE}/2025/06/EX-EconA712-F1-2025-V1_net.pdf`, label: "Enunciado V1" },
            criterios: { href: `${BASE}/2025/07/EX-EconA712-F1-2025-CC-VD_net.pdf`, label: "Critérios" },
          },
          {
            nome: "2ª Fase",
            enunciado: { href: `${BASE}/2025/07/EX-EconA712-F2-2025-V1_net.pdf`, label: "Enunciado V1" },
            criterios: { href: `${BASE}/2025/07/EX-EconA712-F2-2025-CC-VD_net.pdf`, label: "Critérios" },
          },
          {
            nome: "Época Especial",
            enunciado: { href: `${BASE}/2025/11/EX-EconA712-EE-2025.pdf`, label: "Enunciado" },
            criterios: { href: `${BASE}/2025/11/EX-EconA712-EE-2025-CC.pdf`, label: "Critérios" },
          },
        ],
      },
      {
        ano: 2024,
        fases: [
          {
            nome: "1ª Fase",
            enunciado: { href: `${BASE}/2024/06/EX-EconA712-F1-2024-V1_net.pdf`, label: "Enunciado V1" },
            criterios: { href: `${BASE}/2024/07/EX-EconA712-F1-2024-CC-VD_net.pdf`, label: "Critérios" },
          },
          {
            nome: "2ª Fase",
            enunciado: { href: `${BASE}/2024/07/EX-EconA712-F2-2024-V1_net.pdf`, label: "Enunciado V1" },
            criterios: { href: `${BASE}/2024/07/EX-EconA712-F2-2024-CC-VD_net.pdf`, label: "Critérios" },
          },
          {
            nome: "Época Especial",
            enunciado: { href: `${BASE}/2024/08/EX-EconA712-EE-2024_net.pdf`, label: "Enunciado" },
            criterios: { href: `${BASE}/2024/08/EX-EconA712-EE-2024-CC_net.pdf`, label: "Critérios" },
          },
        ],
      },
      {
        ano: 2023,
        fases: [
          {
            nome: "1ª Fase",
            enunciado: { href: `${BASE}/2023/06/EX-EconA712-F1-2023-V1_net.pdf`, label: "Enunciado V1" },
            criterios: { href: `${BASE}/2023/09/EX-EconA712-F1-2023-CC-VD_net.pdf`, label: "Critérios" },
          },
          {
            nome: "2ª Fase",
            enunciado: { href: `${BASE}/2023/07/EX-EconA712-F2-2023-V1_net.pdf`, label: "Enunciado V1" },
            criterios: { href: `${BASE}/2023/07/EX-EconA712-F2-2023-CC-VD_net.pdf`, label: "Critérios" },
          },
          {
            nome: "Época Especial",
            enunciado: { href: `${BASE}/2023/09/EX-EconA712-EE-2023.pdf`, label: "Enunciado" },
            criterios: { href: `${BASE}/2023/09/EX-EconA712-EE-2023-CC.pdf`, label: "Critérios" },
          },
        ],
      },
    ],
  },
  {
    nome: "MACS",
    icon: "📊",
    subtitle: "Matemática Aplicada às Ciências Sociais · Código 835",
    anos: [
      {
        ano: 2025,
        fases: [
          {
            nome: "1ª Fase",
            enunciado: { href: `${BASE}/2025/06/EX-Macs835-F1-2025_net.pdf`, label: "Enunciado" },
            criterios: { href: `${BASE}/2025/07/EX-Macs835-F1-2025-CC-VD_net.pdf`, label: "Critérios" },
          },
          {
            nome: "2ª Fase",
            enunciado: { href: `${BASE}/2025/07/EX-Macs835-F2-2025_net.pdf`, label: "Enunciado" },
            criterios: { href: `${BASE}/2025/07/EX-Macs835-F2-2025-CC-VD_net.pdf`, label: "Critérios" },
          },
        ],
      },
      {
        ano: 2024,
        fases: [
          {
            nome: "1ª Fase",
            enunciado: { href: `${BASE}/2024/06/EX-Macs835-F1-2024_net.pdf`, label: "Enunciado" },
            criterios: { href: `${BASE}/2024/07/EX-Macs835-F1-2024-CC-VD_net.pdf`, label: "Critérios" },
          },
          {
            nome: "2ª Fase",
            enunciado: { href: `${BASE}/2024/07/EX-Macs835-F2-2024_net.pdf`, label: "Enunciado" },
            criterios: { href: `${BASE}/2024/07/EX-Macs835-F2-2024-CC-VD_net.pdf`, label: "Critérios" },
          },
          {
            nome: "Época Especial",
            enunciado: { href: `${BASE}/2025/10/EX-Macs835-EE-2024_1out_net.pdf`, label: "Enunciado" },
            criterios: { href: `${BASE}/2024/08/EX-Macs835-EE-2024-CC_net-1.pdf`, label: "Critérios" },
          },
        ],
      },
      {
        ano: 2023,
        fases: [
          {
            nome: "1ª Fase",
            enunciado: { href: `${BASE}/2023/06/EX-Macs835-F1-2023_net.pdf`, label: "Enunciado" },
            criterios: { href: `${BASE}/2023/07/EX-Macs835-F1-2023-CC-VD_net.pdf`, label: "Critérios" },
          },
          {
            nome: "2ª Fase",
            enunciado: { href: `${BASE}/2023/07/EX-Macs835-F2-2023.pdf`, label: "Enunciado" },
            criterios: { href: `${BASE}/2023/07/EX-Macs835-F2-2023-CC-VD.pdf`, label: "Critérios" },
          },
        ],
      },
    ],
  },
  {
    nome: "Inglês",
    icon: "🇬🇧",
    subtitle: "Código 550",
    anos: [
      {
        ano: 2025,
        fases: [
          {
            nome: "1ª Fase",
            enunciado: { href: `${BASE}/2025/06/EX-Ing550-F1-2025_net.pdf`, label: "Enunciado" },
            criterios: { href: `${BASE}/2025/06/EX-Ing550-F1-2025-CC-VD_net.pdf`, label: "Critérios" },
          },
          {
            nome: "2ª Fase",
            enunciado: { href: `${BASE}/2025/07/EX-Ing550-F2-2025_net.pdf`, label: "Enunciado" },
            criterios: { href: `${BASE}/2025/07/EX-Ing550-F2-2025-CC-VD_net.pdf`, label: "Critérios" },
          },
          {
            nome: "Época Especial",
            enunciado: { href: `${BASE}/2025/11/EX-Ing550-EE-2025.pdf`, label: "Enunciado" },
            criterios: { href: `${BASE}/2025/11/EX-Ing550-EE-2025-CC.pdf`, label: "Critérios" },
          },
        ],
      },
      {
        ano: 2024,
        fases: [
          {
            nome: "1ª Fase",
            enunciado: { href: `${BASE}/2024/06/EX-Ing550-F1-2024_net.pdf`, label: "Enunciado" },
            criterios: { href: `${BASE}/2024/07/EX-Ing550-F1-2024-CC-VD_net.pdf`, label: "Critérios" },
          },
          {
            nome: "2ª Fase",
            enunciado: { href: `${BASE}/2024/07/EX-Ing550-F2-2024_net.pdf`, label: "Enunciado" },
            criterios: { href: `${BASE}/2024/07/EX-Ing550-F2-2024-CC-VD_net.pdf`, label: "Critérios" },
          },
        ],
      },
      {
        ano: 2023,
        fases: [
          {
            nome: "1ª Fase",
            enunciado: { href: `${BASE}/2023/06/EX-Ing550-F1-2023_net.pdf`, label: "Enunciado" },
            criterios: { href: `${BASE}/2023/07/EX-Ing550-F1-2023-CC-VD_net.pdf`, label: "Critérios" },
          },
          {
            nome: "2ª Fase",
            enunciado: { href: `${BASE}/2023/07/EX-Ing550-F2-2023_net.pdf`, label: "Enunciado" },
            criterios: { href: `${BASE}/2023/07/EX-Ing550-F2-2023-CC-VD_net.pdf`, label: "Critérios" },
          },
        ],
      },
    ],
  },
];

const NONO_ANO: Disciplina[] = [
  {
    nome: "Matemática",
    icon: "∑",
    subtitle: "Prova Final de Ciclo · Código 92",
    anos: [
      {
        ano: 2025,
        fases: [
          {
            nome: "1ª Fase",
            enunciado: { href: `${BASE}/2025/06/PF-Mat92-F1-2025_net.pdf`, label: "Enunciado" },
            criterios: { href: `${BASE}/2025/06/PF-Mat92-F1-2025-CC-VD_net.pdf`, label: "Critérios" },
          },
          {
            nome: "2ª Fase",
            enunciado: { href: `${BASE}/2025/07/PF-Mat92-F2-2025_net.pdf`, label: "Enunciado" },
            criterios: { href: `${BASE}/2025/07/PF-Mat92-F2-2025-CC-VD_net.pdf`, label: "Critérios" },
          },
        ],
      },
      {
        ano: 2024,
        fases: [
          {
            nome: "1ª Fase",
            enunciado: { href: `${BASE}/2024/06/PF-Mat92-F1-2024_net.pdf`, label: "Enunciado" },
            criterios: { href: `${BASE}/2024/06/PF-Mat92-F1-2024-CC-VD_net.pdf`, label: "Critérios" },
          },
          {
            nome: "2ª Fase",
            enunciado: { href: `${BASE}/2024/07/PF-Mat92-F2-2024_net.pdf`, label: "Enunciado" },
            criterios: { href: `${BASE}/2024/07/PF-Mat92-F2-2024-CC-VD_net.pdf`, label: "Critérios" },
          },
        ],
      },
      {
        ano: 2023,
        fases: [
          {
            nome: "1ª Fase",
            enunciado: { href: `${BASE}/2023/06/PF-Mat92-F1-2023_net.pdf`, label: "Enunciado" },
            criterios: { href: `${BASE}/2023/06/PF-Mat92-F1-2023-CC-VD_net.pdf`, label: "Critérios" },
          },
          {
            nome: "2ª Fase",
            enunciado: { href: `${BASE}/2023/07/PF-Mat92-F2-2023_net.pdf`, label: "Enunciado" },
            criterios: { href: `${BASE}/2023/07/PF-Mat92-F2-2023-CC-VD_net.pdf`, label: "Critérios" },
          },
        ],
      },
    ],
  },
];

export default function ExamesPage() {
  const [nivel, setNivel] = useState<"sec" | "9">("sec");
  const [discAtiva, setDiscAtiva] = useState<string | null>(null);

  const disciplinas = nivel === "sec" ? SECUNDARIO : NONO_ANO;
  const visiveis = discAtiva ? disciplinas.filter((d) => d.nome === discAtiva) : disciplinas;

  return (
    <>
      <nav className="ex-nav">
        <a href="/" className="ex-nav-logo">
          Pratica<span>+</span>
        </a>
        <a href="/" className="ex-nav-back">
          &#8592; Voltar ao site
        </a>
      </nav>

      <div className="ex-hero">
        <h1>Exames Nacionais</h1>
        <p>Provas e crit&#233;rios de classifica&#231;&#227;o oficiais do IAVE &#183; 2023&#8211;2025</p>
      </div>

      <div className="ex-body">
        <div className="ex-nivel-tabs">
          <button
            className={`ex-nivel-tab${nivel === "sec" ? " active" : ""}`}
            onClick={() => { setNivel("sec"); setDiscAtiva(null); }}
          >
            Secund&#225;rio
          </button>
          <button
            className={`ex-nivel-tab${nivel === "9" ? " active" : ""}`}
            onClick={() => { setNivel("9"); setDiscAtiva(null); }}
          >
            9.&#186; Ano
          </button>
        </div>

        <div className="ex-disc-filters">
          <button
            className={`ex-disc-filter${discAtiva === null ? " active" : ""}`}
            onClick={() => setDiscAtiva(null)}
          >
            Todas
          </button>
          {disciplinas.map((d) => (
            <button
              key={d.nome}
              className={`ex-disc-filter${discAtiva === d.nome ? " active" : ""}`}
              onClick={() => setDiscAtiva(d.nome === discAtiva ? null : d.nome)}
            >
              {d.nome}
            </button>
          ))}
        </div>

        {visiveis.map((disc) => (
          <div key={disc.nome} className="ex-disc-section">
            <div className="ex-disc-header">
              <span className="ex-disc-icon">{disc.icon}</span>
              <div>
                <p className="ex-disc-title">{disc.nome}</p>
                <p className="ex-disc-subtitle">{disc.subtitle}</p>
              </div>
            </div>
            <div className="ex-anos-grid">
              {disc.anos.map((anoData) => (
                <div key={anoData.ano} className="ex-ano-card">
                  <div className="ex-ano-label">{anoData.ano}</div>
                  <div className="ex-fases-list">
                    {anoData.fases.map((fase) => (
                      <div key={fase.nome} className="ex-fase-row">
                        <span
                          className="ex-fase-badge"
                          style={{ background: FASE_COLORS[fase.nome] ?? "#64748b" }}
                        >
                          {fase.nome}
                        </span>
                        <div className="ex-fase-links">
                          <a
                            href={fase.enunciado.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ex-dl-btn ex-dl-prova"
                          >
                            &#128196; {fase.enunciado.label}
                          </a>
                          <a
                            href={fase.criterios.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ex-dl-btn ex-dl-criterios"
                          >
                            &#10003; {fase.criterios.label}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <p className="ex-iave-note">
          Todos os documentos s&#227;o propriedade do{" "}
          <a href="https://iave.pt" target="_blank" rel="noopener noreferrer">
            IAVE &#8212; Instituto de Avalia&#231;&#227;o Educativa
          </a>
          . A Pratica+ n&#227;o armazena nem redistribui estes ficheiros.
        </p>
      </div>
    </>
  );
}
