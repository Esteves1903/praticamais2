import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { isValidToken } from "@/lib/auth";
import { Resend } from "resend";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

function formatSlot(s: string) {
  const d = new Date(s);
  const dias = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
  const meses = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
  return `${dias[d.getDay()]}, ${d.getDate()} de ${meses[d.getMonth()]} às ${String(d.getHours()).padStart(2, "0")}:00`;
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isValidToken(req.cookies.get("admin-token")?.value)) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }
  const { id } = await params;
  const agendamentoId = parseInt(id);

  const { data: ag, error: fetchError } = await supabase
    .from("agendamentos")
    .select("*")
    .eq("id", agendamentoId)
    .single();

  if (fetchError || !ag) {
    return NextResponse.json({ error: "Agendamento não encontrado" }, { status: 404 });
  }

  const { error } = await supabase
    .from("agendamentos")
    .update({ confirmado: true })
    .eq("id", agendamentoId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Send confirmation email
  try {
    await getResend().emails.send({
      from: "Pratica+ <noreply@praticamais2.vercel.app>",
      to: ag.email,
      subject: "✅ Sessão Confirmada — Pratica+",
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;background:#f8fafc">
          <div style="background:#fff;border-radius:16px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.06)">
            <div style="font-size:24px;font-weight:700;color:#1e293b;margin-bottom:4px">
              Pratica<span style="color:#2563eb">+</span>
            </div>
            <hr style="border:none;border-top:1px solid #e2e8f0;margin:16px 0"/>
            <div style="font-size:32px;margin-bottom:8px">✅</div>
            <h1 style="font-size:22px;color:#1e293b;margin:0 0 8px">Sessão Confirmada!</h1>
            <p style="color:#64748b;margin:0 0 24px">Olá <strong>${ag.nome}</strong>, a tua sessão foi confirmada.</p>
            <div style="background:#eff6ff;border-radius:12px;padding:20px;margin-bottom:24px">
              <div style="font-size:13px;color:#64748b;margin-bottom:4px">HORÁRIO</div>
              <div style="font-size:18px;font-weight:700;color:#1e293b">${formatSlot(ag.slot)}</div>
              <div style="font-size:14px;color:#64748b;margin-top:8px">${ag.disciplina} · ${ag.tipo === "experimental" ? "Sessão Experimental (50% OFF)" : ag.tipo === "individual" ? "Aula Individual" : "Aula de Grupo"}</div>
            </div>
            <p style="color:#64748b;font-size:14px">Vais receber o link da sessão online (Zoom/Meet) via WhatsApp antes da aula.</p>
            <p style="color:#94a3b8;font-size:13px;margin-top:24px">Qualquer dúvida, contacta-nos pelo WhatsApp: <a href="https://wa.me/351919761389" style="color:#2563eb">+351 919 761 389</a></p>
          </div>
        </div>
      `,
    });
  } catch (emailErr) {
    console.error("Erro ao enviar email:", emailErr);
    // Don't fail the confirmation if email fails
  }

  return NextResponse.json({ ok: true });
}
