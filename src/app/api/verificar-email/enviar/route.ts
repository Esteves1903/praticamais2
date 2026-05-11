import { NextRequest, NextResponse } from "next/server";
import { gerarOtp } from "@/lib/auth";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: "Email obrigatório" }, { status: 400 });

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
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Erro ao enviar OTP:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
