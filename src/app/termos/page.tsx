export default function Termos() {
  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "48px 24px" }}>
        <a href="/" style={{ color: "#2563eb", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>← Voltar ao início</a>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: "#1e293b", margin: "24px 0 8px" }}>Termos e Condições</h1>
        <p style={{ color: "#64748b", marginBottom: 40 }}>Última actualização: 10 de maio de 2026</p>

        {[
          {
            titulo: "1. Identificação",
            texto: `A Pratica+ é um serviço de apoio escolar online prestado por estudantes do ISEP (Instituto Superior de Engenharia do Porto) e da FEP (Faculdade de Economia do Porto). Contacto: pratica.mais.26@gmail.com`
          },
          {
            titulo: "2. Aceitação dos Termos",
            texto: `Ao efectuar um agendamento através do nosso site, o utilizador declara ter lido e aceite os presentes Termos e Condições, bem como a nossa Política de Privacidade.`
          },
          {
            titulo: "3. Serviços Prestados",
            texto: `A Pratica+ oferece sessões de apoio escolar online nas seguintes modalidades:\n• Sessão Experimental (50% desconto na 1ª sessão)\n• Aula Individual\n• Aula de Grupo\n\nAs sessões são realizadas online através de plataformas como Zoom ou Google Meet, por professores devidamente identificados.`
          },
          {
            titulo: "4. Agendamento e Confirmação",
            texto: `O agendamento efectuado no site constitui um pedido de reserva. A sessão só é confirmada após validação por um membro da equipa Pratica+, que enviará uma confirmação por email e o link da sessão via WhatsApp.\n\nO utilizador deve verificar a disponibilidade do horário escolhido e garantir que o email fornecido está correcto para receber a confirmação.`
          },
          {
            titulo: "5. Pagamento",
            texto: `O pagamento é efectuado via MBway directamente ao professor, após confirmação da sessão. Os preços praticados são:\n\nEnsino Básico (5º-9º ano):\n• Sessão Experimental: 5€ (50% OFF de 10€)\n• Aula Individual: 10€/hora\n• Aula de Grupo: 6€/hora por aluno\n\nEnsino Secundário (10º-12º ano):\n• Sessão Experimental: 7,50€ (50% OFF de 15€)\n• Aula Individual: 15€/hora\n• Aula de Grupo: 9€/hora por aluno\n\nOs preços incluem IVA quando aplicável.`
          },
          {
            titulo: "6. Cancelamento e Reagendamento",
            texto: `• Cancelamentos com mais de 24 horas de antecedência: sem qualquer custo\n• Cancelamentos com menos de 24 horas: poderá ser cobrada uma taxa de 50% do valor da sessão\n• Faltas sem aviso: será cobrado o valor integral da sessão\n\nPara cancelar ou reagendar, contacte-nos via WhatsApp (+351 919 761 389) ou email.`
          },
          {
            titulo: "7. Responsabilidades",
            texto: `A Pratica+ compromete-se a:\n• Prestar o serviço com qualidade e pontualidade\n• Garantir professores qualificados para cada disciplina\n• Manter a confidencialidade dos dados do aluno\n\nO aluno/encarregado de educação compromete-se a:\n• Comparecer pontualmente às sessões agendadas\n• Efectuar o pagamento conforme acordado\n• Utilizar o serviço de forma respeitosa`
          },
          {
            titulo: "8. Propriedade Intelectual",
            texto: `Todo o conteúdo do site Pratica+ (textos, imagens, design) é propriedade da Pratica+ e não pode ser reproduzido sem autorização prévia por escrito.`
          },
          {
            titulo: "9. Lei Aplicável",
            texto: `Os presentes Termos e Condições regem-se pela lei portuguesa. Qualquer litígio será submetido aos tribunais da comarca do Porto, com expressa renúncia a qualquer outro foro.`
          },
          {
            titulo: "10. Alterações",
            texto: `A Pratica+ reserva-se o direito de alterar os presentes Termos a qualquer momento. As alterações entram em vigor na data da sua publicação no site. Recomendamos a consulta periódica desta página.`
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
