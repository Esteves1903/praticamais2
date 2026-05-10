"use client";

export default function Home() {
  return (
    <>
      {/* ─── NAVBAR ─── */}
      <nav className="navbar">
        <a href="#" className="logo">
          <span className="logo-text">Pratica<span className="logo-plus">+</span></span>
        </a>
        <div className="nav-links">
          <a href="#sobre">Sobre</a>
          <a href="#disciplinas">Disciplinas</a>
          <a href="#precos">Preços</a>
          <a href="#equipa">Equipa</a>
          <a href="#faq">FAQ</a>
          <a href="#" className="btn-nav" onClick={(e) => { e.preventDefault(); }} id="nav-agendar">📅 Agendar</a>
        </div>
        <button className="hamburger" id="hamburger" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </nav>

      {/* Mobile Nav */}
      <div className="mobile-nav" id="mobileNav">
        <a href="#sobre">Sobre</a>
        <a href="#disciplinas">Disciplinas</a>
        <a href="#precos">Preços</a>
        <a href="#equipa">Equipa</a>
        <a href="#faq">FAQ</a>
        <a href="#" className="btn-nav-mobile">📅 Agendar Explicação</a>
      </div>

      {/* ─── HERO ─── */}
      <section className="hero">
        <div className="hero-badge"> 5º ao 12º ano</div>
        <h1>Domina as notas,<br />conquista o teu futuro.</h1>
        <p>Apoio escolar personalizado com estudantes do ISEP e da FEP. Aulas online adaptadas ao teu ritmo.</p>
        <div className="hero-ctas">
          <a href="#" className="btn-primary" id="hero-agendar">📅 Agendar Sessão </a>
          <a href="#sobre" className="btn-secondary">Saber Mais →</a>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number">50%</span>
            <span className="stat-label">Desconto na 1ª sessão</span>
          </div>
          <div className="stat">
            <span className="stat-number">5+</span>
            <span className="stat-label">Disciplinas disponíveis</span>
          </div>
          <div className="stat">
            <span className="stat-number">100%</span>
            <span className="stat-label">Online & Flexível</span>
          </div>
          <div className="stat">
            <span className="stat-number">ISEP+FEP</span>
            <span className="stat-label">Professores qualificados</span>
          </div>
        </div>
      </section>

      {/* ─── SOBRE ─── */}
      <section id="sobre" style={{ background: "white" }}>
        <div className="section-header">
          <span className="section-label">A Nossa Identidade</span>
          <h2 className="section-title">Quem Somos, Missão e Valores</h2>
          <p className="section-sub">Mais do que explicadores — somos mentores que falam a mesma língua dos alunos.</p>
        </div>
        <div className="sobre-grid">
          <div className="sobre-card fade-in">
            
            <h3>Quem Somos</h3>
            <p>O Pratica+ é formado por estudantes do ISEP e da FEP que acreditam que a educação deve ser clara, direta e acessível. Mais do que explicadores, somos mentores que falam a mesma língua dos alunos.</p>
          </div>
          <div className="sobre-card fade-in">
            
            <h3>Missão</h3>
            <p>A nossa missão é atingir o sucesso escolar, oferecendo um acompanhamento de alta qualidade que transforma dificuldades em confiança e resultados nos exames nacionais.</p>
          </div>
          <div className="sobre-card fade-in">
            
            <h3>Valores</h3>
            <p>Baseamo-nos no rigor científico, na empatia com o aluno e na prática constante. Acreditamos que não há alunos maus, apenas métodos que precisam de ser ajustados.</p>
          </div>
        </div>
      </section>

      {/* ─── DISCIPLINAS ─── */}
      <section id="disciplinas" style={{ background: "#f8fafc" }}>
        <div className="section-header">
          <span className="section-label">O Que Ensinamos</span>
          <h2 className="section-title">Disciplinas Disponíveis</h2>
          <p className="section-sub">Cobertura completa das disciplinas mais exigidas do ensino básico e secundário.</p>
        </div>
        <div className="disciplinas-grid">
          <div className="disciplina-card fade-in">
            <div className="disc-icon">📐</div>
            <div className="disc-name">Matemática</div>
            <div className="disc-anos">5º ao 12º ano</div>
            <span className="disc-badge mat">Matemática A/B</span>
          </div>
          <div className="disciplina-card fade-in">
            <div className="disc-icon">⚛️</div>
            <div className="disc-name">Física e Química</div>
            <div className="disc-anos">7º ao 9º ano</div>
            <span className="disc-badge fis">FQ</span>
          </div>
          <div className="disciplina-card fade-in">
            <div className="disc-icon">🔬</div>
            <div className="disc-name">Física</div>
            <div className="disc-anos">12º ano</div>
            <span className="disc-badge fis">F</span>
          </div>

          <div className="disciplina-card fade-in">
            <div className="disc-icon">📊</div>
            <div className="disc-name">Economia</div>
            <div className="disc-anos">10º ao 12º ano</div>
            <span className="disc-badge eco">ECO</span>
          </div>
          <div className="disciplina-card fade-in">
            <div className="disc-icon">🌍</div>
            <div className="disc-name">Inglês</div>
            <div className="disc-anos">5º ao 12º ano</div>
            <span className="disc-badge ing">ENG</span>
          </div>
          <div className="disciplina-card fade-in">
            <div className="disc-icon">📈</div>
            <div className="disc-name">MACS</div>
            <div className="disc-anos">10º ao 12º ano</div>
            <span className="disc-badge mac">MACS</span>
          </div>
        </div>
      </section>

      {/* ─── PREÇOS ─── */}
      <section id="precos" style={{ background: "white" }}>
        <div className="section-header">
          <span className="section-label">Preços Transparentes</span>
          <h2 className="section-title">Tabela de Preços</h2>
          <p className="section-sub">Sem surpresas. Preços claros para o ensino básico e secundário.</p>
        </div>

        {/* Toggle */}
        <div className="nivel-toggle" style={{ marginBottom: "40px", display: "flex", justifyContent: "center" }}>
          <button className="nivel-btn active" id="btn-basico">🏫 Ensino Básico</button>
          <button className="nivel-btn" id="btn-secundario">📚 Ensino Secundário</button>
        </div>

        {/* Básico */}
        <div id="panel-basico" className="preco-panel active" style={{ maxWidth: "560px", margin: "0 auto" }}>
          <div className="preco-card">
            <div className="preco-header">
              <div className="preco-nivel">ENSINO BÁSICO</div>
              <div className="preco-title">5º ao 9º Ano</div>
              <div className="preco-sub">Apoio personalizado e prático</div>
            </div>
            <table className="preco-table">
              <tbody>
                <tr>
                  <td><span className="preco-tipo"><span className="preco-tipo-icon">🎁</span> Sessão Experimental <span className="badge-promo">50% OFF</span></span></td>
                  <td className="preco-valor"><span className="preco-original">10€</span><span className="preco-promo">5€</span></td>
                </tr>
                <tr>
                  <td><span className="preco-tipo"><span className="preco-tipo-icon">👤</span> Hora Individual</span></td>
                  <td className="preco-valor">10€/h</td>
                </tr>
                <tr>
                  <td><span className="preco-tipo"><span className="preco-tipo-icon">👥</span> Grupo (2 pessoas)</span></td>
                  <td className="preco-valor">15€/h</td>
                </tr>
                <tr>
                  <td><span className="preco-tipo"><span className="preco-tipo-icon">📦</span> Pack Mensal (4 aulas)</span></td>
                  <td className="preco-valor">45€</td>
                </tr>
              </tbody>
            </table>
            <div className="preco-cta">
              <button className="btn-agendar" data-nivel="basico" id="agendar-basico">
                📅 Agendar Agora
              </button>
            </div>
          </div>
        </div>

        {/* Secundário */}
        <div id="panel-secundario" className="preco-panel" style={{ maxWidth: "560px", margin: "0 auto" }}>
          <div className="preco-card">
            <div className="preco-header sec">
              <div className="preco-nivel">ENSINO SECUNDÁRIO</div>
              <div className="preco-title">10º ao 12º Ano</div>
              <div className="preco-sub">Preparação para exames nacionais</div>
            </div>
            <table className="preco-table">
              <tbody>
                <tr>
                  <td><span className="preco-tipo"><span className="preco-tipo-icon">🎁</span> Sessão Experimental <span className="badge-promo">50% OFF</span></span></td>
                  <td className="preco-valor"><span className="preco-original">15€</span><span className="preco-promo">7.50€</span></td>
                </tr>
                <tr>
                  <td><span className="preco-tipo"><span className="preco-tipo-icon">👤</span> Hora Individual</span></td>
                  <td className="preco-valor">15€/h</td>
                </tr>
                <tr>
                  <td><span className="preco-tipo"><span className="preco-tipo-icon">👥</span> Grupo (2 pessoas)</span></td>
                  <td className="preco-valor">20€/h</td>
                </tr>
                <tr>
                  <td><span className="preco-tipo"><span className="preco-tipo-icon">📦</span> Pack Mensal (4 aulas)</span></td>
                  <td className="preco-valor">65€</td>
                </tr>
              </tbody>
            </table>
            <div className="preco-cta">
              <button className="btn-agendar sec" data-nivel="secundario" id="agendar-secundario">
                📅 Agendar Agora
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── EQUIPA ─── */}
      <section id="equipa" style={{ background: "#f8fafc" }}>
        <div className="section-header">
          <span className="section-label">A Nossa Equipa</span>
          <h2 className="section-title">Os Teus Explicadores</h2>
          <p className="section-sub">Estudantes universitários dedicados a ajudar-te a alcançar os teus objetivos.</p>
        </div>
        <div className="team-grid">
          <div className="member-card fade-in">
            <div className="member-photo-wrap">
              <img
                src="https://raw.githubusercontent.com/Esteves1903/Pratica-site/main/imagens/ze.png"
                alt="Zé"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = '<div class="member-initials">ZE</div>';
                  }
                }}
              />
            </div>
            <span className="member-tag tag-isep">ISEP</span>
            <div className="member-name">José Mário</div>
            <div className="member-role">Engenharia · Explicador</div>
            <div className="member-discs">
              <span className="member-disc">📐 Matemática</span>
              <span className="member-disc">⚛️ Física</span>
              <span className="member-disc">⚛️ FQ</span>
            </div>
          </div>

          <div className="member-card fade-in">
            <div className="member-photo-wrap">
              <img
                src="https://raw.githubusercontent.com/Esteves1903/Pratica-site/main/imagens/diogo.jpeg"
                alt="Diogo"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = '<div class="member-initials">DG</div>';
                  }
                }}
              />
            </div>
            <span className="member-tag tag-isep">ISEP</span>
            <div className="member-name">Diogo Magalhães</div>
            <div className="member-role">Engenharia · Explicador</div>
            <div className="member-discs">
              <span className="member-disc">📐 Matemática</span>
              <span className="member-disc">⚛️ Física</span>
              <span className="member-disc">⚛️ FQ</span>

            </div>
          </div>

          <div className="member-card fade-in">
            <div className="member-photo-wrap">
              <img
                src="https://raw.githubusercontent.com/Esteves1903/Pratica-site/main/imagens/manu.jpg"
                alt="Manu"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = '<div class="member-initials">MN</div>';
                  }
                }}
              />
            </div>
            <span className="member-tag tag-fep">FEP</span>
            <div className="member-name">Manuel Silva</div>
            <div className="member-role">Economia · Explicador</div>
            <div className="member-discs">
              <span className="member-disc">📊 Economia</span>
              <span className="member-disc">📈 MACS</span>
              <span className="member-disc">🌍 Inglês</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" style={{ background: "white" }}>
        <div className="section-header">
          <span className="section-label">FAQ</span>
          <h2 className="section-title">Perguntas Frequentes</h2>
          <p className="section-sub">Tudo o que precisas de saber antes de agendar a tua primeira sessão.</p>
        </div>
        <div className="faq-list">
          {[
            { q: "O que é o Pratica+?", a: "O Pratica+ é um projeto de apoio escolar focado em resultados, criado por estudantes do ISEP e da FEP para ajudar alunos do 5º ao 12º ano a superar dificuldades e subir as notas." },
            { q: "Como funciona o agendamento?", a: "Basta clicar no botão 'Agendar' e escolher um horário disponível no nosso calendário. Após a reserva, receberás uma confirmação. Os horários são retirados automaticamente assim que forem reservados, para que nunca haja sobreposições." },
            { q: "As aulas são presenciais ou online?", a: "As aulas são online e focadas na resolução de exercícios práticos e esclarecimento de dúvidas específicas da matéria dada na escola. Usamos plataformas como Zoom ou Google Meet." },
            { q: "Quanto custam as aulas?", a: "Temos preços a partir de 5€ para a sessão experimental (50% OFF). Aulas individuais a 10€/h no básico e 15€/h no secundário. Consulta a tabela de preços para mais detalhes." },
            { q: "Como é feito o pagamento?", a: "O pagamento é feito através do MBway após a confirmação da marcação da aula com o professor." },
            { q: "O que inclui o Pack Mensal?", a: "O Pack Mensal inclui 4 aulas individuais mais acompanhamento online sempre que surjam dúvidas ao longo do mês. É a opção mais económica para quem quer apoio regular." },
          ].map((item, i) => (
            <div className="faq-item" key={i}>
              <button className="faq-btn" data-faq={i}>
                {item.q}
                <div className="faq-icon">▾</div>
              </button>
              <div className="faq-answer">
                <div className="faq-answer-inner">{item.a}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA BAND ─── */}
      <section style={{ background: "linear-gradient(135deg, #1e40af, #3b82f6)", padding: "80px 5%", textAlign: "center" }}>
        <h2 style={{ color: "white", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 900, marginBottom: "16px" }}>
          Pronto para melhorar as tuas notas?
        </h2>
        <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.05rem", marginBottom: "32px" }}>
          A tua primeira sessão tem 50% de desconto. Sem compromisso.
        </p>
        <button className="btn-primary" style={{ background: "white", color: "#1e40af", boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }} id="cta-agendar">
          📅 Agendar Sessão Experimental
        </button>
      </section>

      {/* ─── FOOTER ─── */}
      <footer>
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo-text">Pratica<span className="logo-plus">+</span></div>
            <p className="footer-desc">Apoio escolar personalizado do 5º ao 12º ano no Porto. Estamos aqui para ajudar-te a conquistar os teus objetivos académicos.</p>
            <div className="footer-social">
              <a href="https://wa.me/351919761389" className="social-link" target="_blank" rel="noopener">💬</a>
              <a href="#" className="social-link">📷</a>
              <a href="#" className="social-link">💼</a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Navegação</h4>
            <a href="#sobre">Sobre Nós</a>
            <a href="#disciplinas">Disciplinas</a>
            <a href="#precos">Preços</a>
            <a href="#equipa">Equipa</a>
            <a href="#faq">FAQ</a>
          </div>
          <div className="footer-col">
            <h4>Contacto</h4>
            <a href="https://wa.me/351919761389" target="_blank" rel="noopener">WhatsApp</a>
            <a href="mailto:praticamais@gmail.com">Email</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Porto, Portugal</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Pratica+. Todos os direitos reservados.</p>
          <p style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" as const }}>
            <a href="/privacidade" style={{ color: "#94a3b8", textDecoration: "none" }}>Política de Privacidade</a>
            <a href="/termos" style={{ color: "#94a3b8", textDecoration: "none" }}>Termos e Condições</a>
          </p>
        </div>
      </footer>

      {/* ─── FLOATING BUTTONS ─── */}
      <a href="https://wa.me/351919761389" className="whatsapp-float" target="_blank" rel="noopener" title="Fala connosco no WhatsApp">💬</a>
      <button id="backToTop" aria-label="Voltar ao topo">↑</button>

      {/* ─── BOOKING MODAL ─── */}
      <div className="modal-overlay" id="modalOverlay">
        <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div className="modal-header">
            <div>
              <div className="modal-title" id="modal-title">📅 Agendar Explicação</div>
              <div className="modal-sub">Escolhe o teu horário — disponível em tempo real</div>
            </div>
            <button className="modal-close" id="modalClose" aria-label="Fechar">✕</button>
          </div>
          <div className="modal-body">
            {/* Step indicator */}
            <div className="steps">
              <div className="step active" id="step1">
                <div className="step-num">1</div>
                <span>Dados</span>
              </div>
              <div className="step-line" id="line1"></div>
              <div className="step active" id="step2">
                <div className="step-num">2</div>
                <span>Horário</span>
              </div>
              <div className="step-line" id="line2"></div>
              <div className="step" id="step3">
                <div className="step-num">3</div>
                <span>Confirmar</span>
              </div>
            </div>

            {/* Form */}
            <form id="agendamentoForm">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Nome completo <span>*</span></label>
                  <input type="text" className="form-input" id="f-nome" placeholder="Ex: João Silva" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Email <span>*</span></label>
                  <input type="email" className="form-input" id="f-email" placeholder="email@exemplo.com" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Telefone <span>*</span></label>
                  <input type="tel" className="form-input" id="f-telefone" placeholder="+351 9XX XXX XXX" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Nível de ensino <span>*</span></label>
                  <select className="form-select" id="f-nivel" required>
                    <option value="">-- Seleciona --</option>
                    <option value="basico">Ensino Básico (5º-9º)</option>
                    <option value="secundario">Ensino Secundário (10º-12º)</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Ano escolar <span>*</span></label>
                  <select className="form-select" id="f-ano" required>
                    <option value="">-- Seleciona --</option>
                    <option value="5º ano">5º ano</option>
                    <option value="6º ano">6º ano</option>
                    <option value="7º ano">7º ano</option>
                    <option value="8º ano">8º ano</option>
                    <option value="9º ano">9º ano</option>
                    <option value="10º ano">10º ano</option>
                    <option value="11º ano">11º ano</option>
                    <option value="12º ano">12º ano</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Professor <span>*</span></label>
                  <select className="form-select" id="f-professor" required>
                    <option value="">-- Seleciona --</option>
                    <option value="José Mário">José Mário (Matemática, Física, FQ)</option>
                    <option value="Diogo Magalhães">Diogo Magalhães (Matemática, Física, FQ)</option>
                    <option value="Manuel Silva">Manuel Silva (Economia, MACS, Inglês)</option>
                    <option value="Sem preferência">Sem preferência</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Disciplina <span>*</span></label>
                  <select className="form-select" id="f-disciplina" required>
                    <option value="">-- Seleciona --</option>
                    <option value="Matemática">📐 Matemática</option>
                    <option value="Física e Química">⚛️ Física e Química</option>
                    <option value="Física">🔬 Física (12º ano)</option>
                    <option value="Economia">📊 Economia</option>
                    <option value="Inglês">🌍 Inglês</option>
                    <option value="MACS">📈 MACS</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Tipo de aula <span>*</span></label>
                  <select className="form-select" id="f-tipo" required>
                    <option value="">-- Seleciona --</option>
                    <option value="experimental">🎁 Sessão Experimental (50% OFF)</option>
                    <option value="individual">👤 Hora Individual</option>
                    <option value="grupo">👥 Aula em Grupo</option>
                    <option value="mensal">📦 Pack Mensal</option>
                  </select>
                </div>
              </div>

              {/* Calendar */}
              <div className="form-group">
                <label className="form-label">Horário disponível <span>*</span></label>
                <div className="calendar-section" id="calendarSection">
                  <div className="week-nav">
                    <button type="button" className="week-btn" id="prevWeek">←</button>
                    <span className="week-label" id="weekLabel">A carregar...</span>
                    <button type="button" className="week-btn" id="nextWeek">→</button>
                  </div>
                  <div className="days-row" id="daysRow">
                    {/* Days rendered by JS */}
                  </div>
                  <div id="slotsContainer">
                    <div className="slots-loading">🔄 A carregar horários disponíveis...</div>
                  </div>
                </div>
                <div className="selected-slot-display" id="selectedSlotDisplay" style={{ display: "none" }}>
                  ✅ <strong id="selectedSlotText"></strong>
                  <span style={{ marginLeft: "auto" }}>
                    <button type="button" style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b", fontSize: "0.85rem" }} id="clearSlot">Alterar</button>
                  </span>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Notas adicionais</label>
                <textarea className="form-textarea" id="f-notas" placeholder="Ex: Tenho dificuldades em equações do 2º grau..."></textarea>
              </div>

              <div className="form-error" id="formError"></div>

              <button type="submit" className="btn-submit" id="submitBtn">
                <span id="submitText">✅ Confirmar Agendamento</span>
              </button>
            </form>

            {/* Success */}
            <div className="success-view" id="successView">
              <div className="success-icon">📩</div>
              <div className="success-title">Pedido Recebido!</div>
              <p className="success-text">O teu pedido de sessão foi registado para:</p>
              <p className="success-text success-slot" id="successSlot"></p>
              <p className="success-text" style={{ marginTop: "16px" }}>Um professor irá confirmar em breve e receberás um email de confirmação. Qualquer dúvida contacta-nos via WhatsApp.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── CLIENT SCRIPTS ─── */}
      <script dangerouslySetInnerHTML={{ __html: `
        (function() {
          // ── State
          let allSlots = [];
          let selectedSlot = null;
          let currentWeekOffset = 0;
          let selectedDayIndex = null;
          const DAYS_PT = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
          const MONTHS_PT = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];

          // ── Util: parse "2025-07-15T10:00" → Date object
          function parseSlot(s) {
            const [date, time] = s.split('T');
            const [y,m,d] = date.split('-').map(Number);
            const [h,min] = time.split(':').map(Number);
            return new Date(y, m-1, d, h, min);
          }

          function formatSlotNice(s) {
            const dt = parseSlot(s);
            const day = DAYS_PT[dt.getDay()];
            const num = dt.getDate();
            const mon = MONTHS_PT[dt.getMonth()];
            const h = dt.getHours().toString().padStart(2,'0');
            return day + ', ' + num + ' ' + mon + ' às ' + h + ':00';
          }

          // ── Load slots from API
          async function loadSlots() {
            try {
              const res = await fetch('/api/horarios');
              allSlots = await res.json();
              if (!Array.isArray(allSlots)) allSlots = [];
            } catch(e) {
              allSlots = [];
            }
            renderWeek();
          }

          // ── Get week dates (Mon-Sat)
          function getWeekDates(offset) {
            const now = new Date();
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            // Find next Monday (or today if Monday)
            const dayOfWeek = today.getDay(); // 0=Sun
            const daysToMon = dayOfWeek === 0 ? 1 : (8 - dayOfWeek) % 7 || 7;
            const baseMonday = new Date(today);
            if (dayOfWeek !== 1) {
              baseMonday.setDate(today.getDate() + (dayOfWeek === 0 ? 1 : 8 - dayOfWeek));
            }
            baseMonday.setDate(baseMonday.getDate() + offset * 7);
            const dates = [];
            for (let i = 0; i < 6; i++) {
              const d = new Date(baseMonday);
              d.setDate(baseMonday.getDate() + i);
              dates.push(d);
            }
            return dates;
          }

          function renderWeek() {
            const dates = getWeekDates(currentWeekOffset);
            const daysRow = document.getElementById('daysRow');
            const weekLabel = document.getElementById('weekLabel');
            const prevBtn = document.getElementById('prevWeek');

            prevBtn.disabled = currentWeekOffset <= 0;

            const first = dates[0];
            const last = dates[dates.length-1];
            weekLabel.textContent = first.getDate() + ' ' + MONTHS_PT[first.getMonth()] + ' – ' + last.getDate() + ' ' + MONTHS_PT[last.getMonth()];

            daysRow.innerHTML = '';
            dates.forEach((date, i) => {
              const dateStr = date.getFullYear() + '-' +
                String(date.getMonth()+1).padStart(2,'0') + '-' +
                String(date.getDate()).padStart(2,'0');
              const daySlots = allSlots.filter(s => s.slot.startsWith(dateStr));
              const count = daySlots.length;

              const btn = document.createElement('button');
              btn.type = 'button';
              btn.className = 'day-btn' + (selectedDayIndex === i && currentWeekOffset === selectedDayIndex?.week ? ' selected' : '');
              btn.innerHTML =
                '<div class="day-name">' + DAYS_PT[date.getDay()] + '</div>' +
                '<div class="day-num">' + date.getDate() + '</div>' +
                '<div class="day-slots ' + (count===0?'zero':'') + '">' +
                  (count === 0 ? 'Esgotado' : count + ' livre' + (count===1?'':'s')) +
                '</div>';

              if (count > 0) {
                btn.addEventListener('click', () => selectDay(i, dateStr, dates));
              } else {
                btn.style.opacity = '0.5';
                btn.style.cursor = 'default';
              }

              daysRow.appendChild(btn);
            });

            // Render slots for selected day if any
            if (selectedDayIndex !== null) {
              const dates2 = getWeekDates(currentWeekOffset);
              if (selectedDayIndex < dates2.length) {
                const d = dates2[selectedDayIndex];
                const dateStr = d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
                renderSlots(dateStr);
              }
            } else {
              document.getElementById('slotsContainer').innerHTML =
                '<div class="no-slots" style="padding:16px;color:#94a3b8;text-align:center;">👆 Seleciona um dia para ver os horários disponíveis</div>';
            }
          }

          function selectDay(idx, dateStr, dates) {
            selectedDayIndex = idx;
            selectedSlot = null;
            document.getElementById('selectedSlotDisplay').style.display = 'none';
            // Highlight selected
            document.querySelectorAll('.day-btn').forEach((b,i) => {
              b.classList.toggle('selected', i === idx);
            });
            renderSlots(dateStr);
          }

          function renderSlots(dateStr) {
            const container = document.getElementById('slotsContainer');
            const daySlots = allSlots.filter(s => s.slot.startsWith(dateStr));

            if (daySlots.length === 0) {
              container.innerHTML = '<div class="no-slots">Sem horários disponíveis neste dia.</div>';
              return;
            }

            const grid = document.createElement('div');
            grid.className = 'slots-grid';
            daySlots.forEach(s => {
              const time = s.slot.split('T')[1];
              const btn = document.createElement('button');
              btn.type = 'button';
              btn.className = 'slot-btn' + (selectedSlot === s.slot ? ' selected' : '');
              btn.textContent = time;
              btn.addEventListener('click', () => pickSlot(s.slot, btn));
              grid.appendChild(btn);
            });
            container.innerHTML = '';
            container.appendChild(grid);
          }

          function pickSlot(slot, btn) {
            selectedSlot = slot;
            document.querySelectorAll('.slot-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            const display = document.getElementById('selectedSlotDisplay');
            document.getElementById('selectedSlotText').textContent = formatSlotNice(slot);
            display.style.display = 'flex';
          }

          // ── Week navigation
          document.getElementById('prevWeek').addEventListener('click', () => {
            if (currentWeekOffset > 0) {
              currentWeekOffset--;
              selectedDayIndex = null;
              renderWeek();
            }
          });
          document.getElementById('nextWeek').addEventListener('click', () => {
            if (currentWeekOffset < 3) {
              currentWeekOffset++;
              selectedDayIndex = null;
              renderWeek();
            }
          });

          document.getElementById('clearSlot').addEventListener('click', () => {
            selectedSlot = null;
            document.getElementById('selectedSlotDisplay').style.display = 'none';
            document.querySelectorAll('.slot-btn').forEach(b => b.classList.remove('selected'));
          });

          // ── Filter ano options based on nivel
          function updateAnoOptions(nivel) {
            const anoSelect = document.getElementById('f-ano');
            const prev = anoSelect.value;
            const basicoYears = ['5º ano','6º ano','7º ano','8º ano','9º ano'];
            const secundarioYears = ['10º ano','11º ano','12º ano'];
            Array.from(anoSelect.options).forEach(opt => {
              if (!opt.value) return; // keep placeholder
              if (nivel === 'basico') opt.hidden = !basicoYears.includes(opt.value);
              else if (nivel === 'secundario') opt.hidden = !secundarioYears.includes(opt.value);
              else opt.hidden = false;
            });
            // reset if current value is now hidden
            if (prev && anoSelect.options[anoSelect.selectedIndex]?.hidden) anoSelect.value = '';
          }

          document.getElementById('f-nivel').addEventListener('change', (e) => {
            updateAnoOptions(e.target.value);
          });

          // ── Modal
          function openModal(nivel) {
            const overlay = document.getElementById('modalOverlay');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            if (nivel) {
              document.getElementById('f-nivel').value = nivel;
              updateAnoOptions(nivel);
            }
            loadSlots();
            // reset form & success
            document.getElementById('agendamentoForm').style.display = '';
            document.getElementById('successView').classList.remove('visible');
            document.getElementById('formError').classList.remove('visible');
            document.getElementById('formError').textContent = '';
          }

          function closeModal() {
            document.getElementById('modalOverlay').classList.remove('active');
            document.body.style.overflow = '';
          }

          document.getElementById('modalClose').addEventListener('click', closeModal);
          document.getElementById('modalOverlay').addEventListener('click', (e) => {
            if (e.target === document.getElementById('modalOverlay')) closeModal();
          });
          document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

          // Trigger buttons
          ['nav-agendar','hero-agendar','cta-agendar','agendar-basico','agendar-secundario'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.addEventListener('click', (e) => {
              e.preventDefault();
              const nivel = el.dataset.nivel || '';
              openModal(nivel);
            });
          });

          // ── Form submit
          document.getElementById('agendamentoForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const errorEl = document.getElementById('formError');
            errorEl.classList.remove('visible');

            const nome = document.getElementById('f-nome').value.trim();
            const email = document.getElementById('f-email').value.trim();
            const telefone = document.getElementById('f-telefone').value.trim();
            const nivel = document.getElementById('f-nivel').value;
            const ano_escolar = document.getElementById('f-ano').value;
            const professor = document.getElementById('f-professor').value;
            const disciplina = document.getElementById('f-disciplina').value;
            const tipo = document.getElementById('f-tipo').value;
            const notas = document.getElementById('f-notas').value.trim();

            if (!nome || !email || !telefone || !nivel || !ano_escolar || !disciplina || !tipo) {
              errorEl.textContent = '⚠️ Por favor preenche todos os campos obrigatórios.';
              errorEl.classList.add('visible');
              return;
            }

            if (!selectedSlot) {
              errorEl.textContent = '⚠️ Por favor seleciona um horário disponível.';
              errorEl.classList.add('visible');
              return;
            }

            const submitBtn = document.getElementById('submitBtn');
            const submitText = document.getElementById('submitText');
            submitBtn.disabled = true;
            submitText.textContent = '⏳ A confirmar...';

            try {
              const res = await fetch('/api/agendar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome, email, telefone, nivel, disciplina, slot: selectedSlot, tipo, notas, professor, ano_escolar })
              });

              const data = await res.json();

              if (!res.ok) {
                errorEl.textContent = '❌ ' + (data.error || 'Erro ao agendar. Tenta novamente.');
                errorEl.classList.add('visible');
                // Refresh slots in case it was a conflict
                if (res.status === 409) {
                  selectedSlot = null;
                  document.getElementById('selectedSlotDisplay').style.display = 'none';
                  await loadSlots();
                }
              } else {
                // Success
                document.getElementById('agendamentoForm').style.display = 'none';
                const sv = document.getElementById('successView');
                sv.classList.add('visible');
                document.getElementById('successSlot').textContent = formatSlotNice(selectedSlot);
              }
            } catch (err) {
              errorEl.textContent = '❌ Erro de ligação. Verifica a tua internet e tenta novamente.';
              errorEl.classList.add('visible');
            } finally {
              submitBtn.disabled = false;
              submitText.textContent = '✅ Confirmar Agendamento';
            }
          });

          // ── Preços toggle
          document.getElementById('btn-basico').addEventListener('click', () => {
            document.getElementById('btn-basico').classList.add('active');
            document.getElementById('btn-secundario').classList.remove('active');
            document.getElementById('panel-basico').classList.add('active');
            document.getElementById('panel-secundario').classList.remove('active');
          });
          document.getElementById('btn-secundario').addEventListener('click', () => {
            document.getElementById('btn-secundario').classList.add('active');
            document.getElementById('btn-basico').classList.remove('active');
            document.getElementById('panel-secundario').classList.add('active');
            document.getElementById('panel-basico').classList.remove('active');
          });

          // ── FAQ Accordion
          document.querySelectorAll('.faq-btn').forEach(btn => {
            btn.addEventListener('click', () => {
              const item = btn.parentElement;
              const answer = btn.nextElementSibling;
              const isOpen = item.classList.contains('open');
              // Close all
              document.querySelectorAll('.faq-item').forEach(el => {
                el.classList.remove('open');
                el.querySelector('.faq-answer').style.maxHeight = '0';
              });
              if (!isOpen) {
                item.classList.add('open');
                answer.style.maxHeight = answer.scrollHeight + 'px';
              }
            });
          });

          // ── Back to top
          window.addEventListener('scroll', () => {
            const btn = document.getElementById('backToTop');
            if (window.scrollY > 400) btn.classList.add('visible');
            else btn.classList.remove('visible');
          });
          document.getElementById('backToTop').addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          });

          // ── Hamburger menu
          document.getElementById('hamburger').addEventListener('click', () => {
            document.getElementById('mobileNav').classList.toggle('open');
          });
          document.querySelectorAll('.mobile-nav a').forEach(a => {
            a.addEventListener('click', () => {
              document.getElementById('mobileNav').classList.remove('open');
              if (a.classList.contains('btn-nav-mobile')) {
                openModal('');
              }
            });
          });

          // ── Scroll animations
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.classList.add('visible');
              }
            });
          }, { threshold: 0.1 });
          document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
        })();
      `}} />
    </>
  );
}
