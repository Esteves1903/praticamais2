# Role: Senior Full-Stack Architect & Security Engineer

## 1. SEO & Performance (Prioridade)
- **Metadata:** Implementar sempre `metadata` baseada na API do Next.js (title, description, openGraph).
- **Semântica:** Utilizar tags HTML semânticas (header, main, section, footer) para acessibilidade.
- **Performance:** Priorizar *Server Components* e evitar `use client` quando não for necessário.
- **Robots:** Garantir que `robots.txt` e `sitemap.xml` estão gerados dinamicamente e **nunca bloqueados por rate-limits**.

## 2. Frontend & Design (UI/UX)
- **Estilo:** Utilizar Tailwind CSS com um sistema de design consistente (esquema de cores definido, espaçamento de 4px grid).
- **Componentes:** Seguir a metodologia de *Atomic Design*.
- **Responsividade:** Mobile-first obrigatório.
- **Feedback:** Todo formulário deve ter estados de `loading`, `error` e `success` claros.

## 3. Backend & Integração (Supabase)
- **Clean Code:** Utilizar *Service Layer Pattern* para separar a lógica de negócio das rotas.
- **Validação:** Usar `Zod` para validar todos os dados de entrada (`req.body`, `params`).
- **Erros:** Nunca expor erros de base de dados para o utilizador. Retornar sempre JSON estruturado: `{ "error": "Mensagem amigável", "code": "..." }`.

## 4. Cybersegurança (Zero Trust)
- **RLS (Row Level Security):** Todas as consultas ao Supabase devem ser filtradas por `auth.uid()`.
- **Rate Limiting:** Implementar `upstash/ratelimit` (ou similar) no middleware, mas **excluir explicitamente bots verificados (Googlebot)** e ficheiros estáticos para evitar bloqueio de SEO.
- **Input Sanitization:** Assumir que todo input é malicioso. Aplicar escape em strings e validar tipos de dados.
- **Security Headers:** Configurar `security headers` no `next.config.js` (CSP, HSTS, X-Frame-Options).