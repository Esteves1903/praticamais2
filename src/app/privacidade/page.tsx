export default function Privacidade() {
  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "48px 24px" }}>
        <a href="/" style={{ color: "#2563eb", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>← Voltar ao início</a>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: "#1e293b", margin: "24px 0 8px" }}>Política de Privacidade</h1>
        <p style={{ color: "#64748b", marginBottom: 40 }}>Última actualização: 10 de maio de 2026</p>

        {[
          {
            titulo: "1. Quem Somos",
            texto: `A Pratica+ é um serviço de apoio escolar online operado por estudantes do ISEP e da FEP, com sede em Portugal. Para qualquer questão relacionada com a privacidade, pode contactar-nos através de: pratica.mais.26@gmail.com`
          },
          {
            titulo: "2. Dados que Recolhemos",
            texto: `Ao efectuar um agendamento, recolhemos os seguintes dados pessoais:\n• Nome completo\n• Endereço de email\n• Número de telefone\n• Nível de ensino e disciplina\n• Data e hora da sessão escolhida\n• Notas adicionais (opcional)\n\nNão recolhemos dados de pagamento directamente — os pagamentos são tratados via MBway entre o aluno e o professor.`
          },
          {
            titulo: "3. Como Utilizamos os Dados",
            texto: `Os dados recolhidos são utilizados exclusivamente para:\n• Confirmar e gerir o agendamento da sessão\n• Enviar confirmação por email\n• Contactar o aluno via WhatsApp para envio do link da sessão\n• Emissão de comprovativo de pagamento se solicitado\n\nNão partilhamos os seus dados com terceiros para fins comerciais.`
          },
          {
            titulo: "4. Base Legal",
            texto: `O tratamento de dados baseia-se no consentimento do titular (ao submeter o formulário de agendamento) e na execução de um contrato de prestação de serviços educativos, nos termos do RGPD (Regulamento Geral sobre a Proteção de Dados — Regulamento UE 2016/679).`
          },
          {
            titulo: "5. Retenção de Dados",
            texto: `Os dados são conservados pelo período necessário à prestação do serviço e por um máximo de 12 meses após a última sessão, salvo obrigação legal que imponha prazo diferente.`
          },
          {
            titulo: "6. Os Seus Direitos",
            texto: `Nos termos do RGPD, tem direito a:\n• Aceder aos seus dados pessoais\n• Rectificar dados incorrectos\n• Solicitar o apagamento dos seus dados\n• Opor-se ao tratamento\n• Apresentar reclamação à CNPD (Comissão Nacional de Proteção de Dados)\n\nPara exercer qualquer um destes direitos, contacte-nos em pratica.mais.26@gmail.com`
          },
          {
            titulo: "7. Segurança",
            texto: `Os dados são armazenados em servidores seguros (Supabase, com infraestrutura na UE) e o acesso é restrito aos membros da equipa Pratica+. Utilizamos HTTPS em todas as comunicações.`
          },
          {
            titulo: "8. Cookies",
            texto: `O nosso site utiliza apenas cookies técnicos essenciais ao funcionamento. Não utilizamos cookies de rastreamento ou publicidade.`
          },
        ].map(({ titulo, texto }) => (
          <div key={titulo} style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1e293b", marginBottom: 12 }}>{titulo}</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, whiteSpace: "pre-line" }}>{texto}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
