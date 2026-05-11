import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { gerarOtp } from "@/lib/auth";

export const dynamic = "force-dynamic";

const NIVEIS_VALIDOS = new Set(["basico", "secundario"]);
const NIVEL_DISCIPLINAS: Record<string, string[]> = {
  basico:     ["Matemática", "Física e Química", "Inglês"],
  secundario: ["Matemática", "Física", "Economia", "MACS", "Inglês"],
};
const TIPOS_VALIDOS = new Set(["experimental", "individual", "grupo", "mensal"]);
const PROFESSOR_DISCIPLINAS: Record<string, string[]> = {
  "José Mário":       ["Matemática", "MACS", "Física e Química", "Física"],
  "Diogo Magalhães":  ["Matemática", "MACS", "Física e Química", "Física"],
  "Manuel Silva":     ["Economia", "MACS", "Inglês"],
  "Sem preferência":  ["Matemática", "Física e Química", "Física", "Economia", "MACS", "Inglês"],
};
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nome, email, telefone, nivel, disciplina, slot, tipo, notas, professor, ano_escolar, otpCode } = body;

    const requiresSlot = tipo !== "mensal";
    if (!nome || !email || !telefone || !nivel || !disciplina || !tipo || !ano_escolar || (requiresSlot && !slot)) {
      return NextResponse.json({ error: "Todos os campos obrigatórios devem ser preenchidos." }, { status: 400 });
    }

    // Server-side input validation
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Email inválido." }, { status: 400 });
    }
    if (!NIVEIS_VALIDOS.has(nivel)) {
      return NextResponse.json({ error: "Nível inválido." }, { status: 400 });
    }
    if (!NIVEL_DISCIPLINAS[nivel]?.includes(disciplina)) {
      return NextResponse.json({ error: "Disciplina não disponível para o nível selecionado." }, { status: 400 });
    }
    if (!TIPOS_VALIDOS.has(tipo)) {
      return NextResponse.json({ error: "Tipo de aula inválido." }, { status: 400 });
    }
    if (typeof nome !== "string" || nome.length > 120) {
      return NextResponse.json({ error: "Nome inválido." }, { status: 400 });
    }
    if (typeof notas === "string" && notas.length > 1000) {
      return NextResponse.json({ error: "Notas demasiado longas." }, { status: 400 });
    }
    if (professor && professor !== "Sem preferência") {
      const allowed = PROFESSOR_DISCIPLINAS[professor];
      if (!allowed || !allowed.includes(disciplina)) {
        return NextResponse.json({ error: "Este professor não leciona esta disciplina." }, { status: 400 });
      }
    }

    // Server-side OTP email verification
    const otpValido =
      typeof otpCode === "string" &&
      (gerarOtp(email, 0) === otpCode || gerarOtp(email, 1) === otpCode);

    if (!otpValido) {
      return NextResponse.json({ error: "Email não verificado. Por favor verifica o teu email antes de submeter." }, { status: 403 });
    }

    // Prevent duplicate experimental bookings
    if (tipo === "experimental") {
      const { data: existingExp, error: expError } = await supabase
        .from("agendamentos")
        .select("id")
        .eq("email", email.toLowerCase())
        .eq("tipo", "experimental")
        .limit(1);

      if (expError) throw expError;

      if (existingExp && existingExp.length > 0) {
        return NextResponse.json(
          { error: "Já tens uma sessão experimental registada. Cada aluno só pode ter uma sessão experimental." },
          { status: 409 }
        );
      }
    }

    if (requiresSlot) {
      // Reject slots in the past
      const slotDate = new Date(slot);
      if (isNaN(slotDate.getTime()) || slotDate <= new Date()) {
        return NextResponse.json({ error: "Este horário já passou." }, { status: 400 });
      }

      // Check if slot is still available
      const { data: slotRows, error: slotError } = await supabase
        .from("horarios")
        .select("*")
        .eq("slot", slot)
        .eq("disponivel", true);

      if (slotError) throw slotError;

      if (!slotRows || slotRows.length === 0) {
        return NextResponse.json({ error: "Este horário já foi reservado. Por favor escolhe outro." }, { status: 409 });
      }
    }

    // Create the booking
    const { data: newAgendamento, error: insertError } = await supabase
      .from("agendamentos")
      .insert({
        nome,
        email,
        telefone,
        nivel,
        disciplina,
        slot: requiresSlot ? slot : null,
        tipo,
        notas: typeof notas === "string" ? notas : "",
        professor: typeof professor === "string" ? professor : "",
        ano_escolar,
      })
      .select()
      .single();

    if (insertError) throw insertError;

    if (requiresSlot) {
      // Mark slot as unavailable
      const { error: updateError } = await supabase
        .from("horarios")
        .update({ disponivel: false, agendamento_id: newAgendamento.id })
        .eq("slot", slot);

      if (updateError) throw updateError;
    }

    return NextResponse.json({ success: true, agendamento: newAgendamento }, { status: 201 });
  } catch (error) {
    console.error("Erro ao agendar:", error);
    return NextResponse.json({ error: "Erro interno do servidor." }, { status: 500 });
  }
}
