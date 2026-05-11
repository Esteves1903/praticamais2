import { NextRequest, NextResponse } from "next/server";
import { gerarOtp } from "@/lib/auth";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

// In-memory rate limiter: works per warm serverless instance.
// Limits: 3 sends per email per 10 min, 10 sends per IP per 10 min.
const rl = new Map<string, { count: number; resetAt: number }>();

function allow(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = rl.get(key);
  if (!entry || now > entry.resetAt) {
    rl.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= max) return false;
  entry.count++;
  return true;
}

function getIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email obrigatório" }, { status: 400 });
    }

    const ip = getIp(req);
    const TEN_MIN = 10 * 60 * 1000;

    if (!allow(`email:${email.toLowerCase()}`, 3, TEN_MIN)) {
      return NextResponse.json(
        { error: "Demasiadas tentativas. Aguarda 10 minutos antes de pedir outro código." },
        { status: 429 }
      );
    }
    if (!allow(`ip:${ip}`, 10, TEN_MIN)) {
      return NextResponse.json(
        { error: "Demasiadas tentativas. Aguarda 10 minutos." },
        { status: 429 }
      );
    }

    const code = gerarOtp(email);
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Pratica+ <noreply@praticamais.pt>",
      to: email,
      subject: `${code} é o teu código de verificação – Pratica+`,
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;background:#fff">
          <div style="margin-bottom:24px">
            <span style="font-size:22px;font-weight:800;color:#1e293b">Pratica<span style="color:#2563eb">+</span></span>
          </div>
          <h2 style="color:#1e293b;margin:0 0 8px;font-size:20px">Código de verificação</h2>
          <p style="color:#64748b;margin:0 0 24px;line-height:1.6">Usa o código abaixo para confirmar o teu email no formulário de agendamento.</p>
          <div style="background:#f1f5f9;border-radius:12px;padding:28px;text-align:center;letter-spacing:10px;font-size:40px;font-weight:800;color:#2563eb;border:2px solid #e2e8f0">${code}</div>
          <p style="color:#94a3b8;font-size:13px;margin-top:20px;line-height:1.5">O código expira em <strong>5 minutos</strong>. Se não pediste este código, podes ignorar este email.</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Erro ao enviar OTP:", err);
    return NextResponse.json({ error: "Erro ao enviar email de verificação." }, { status: 500 });
  }
}
