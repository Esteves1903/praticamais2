import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nome, email, telefone, nivel, disciplina, slot, tipo, notas, professor, ano_escolar } = body;

    if (!nome || !email || !telefone || !nivel || !disciplina || !slot || !tipo || !ano_escolar) {
      return NextResponse.json({ error: "Todos os campos obrigatórios devem ser preenchidos." }, { status: 400 });
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

    // Create the booking
    const { data: newAgendamento, error: insertError } = await supabase
      .from("agendamentos")
      .insert({ nome, email, telefone, nivel, disciplina, slot, tipo, notas: notas || "", professor: professor || "", ano_escolar: ano_escolar || "" })
      .select()
      .single();

    if (insertError) throw insertError;

    // Mark slot as unavailable
    const { error: updateError } = await supabase
      .from("horarios")
      .update({ disponivel: false, agendamento_id: newAgendamento.id })
      .eq("slot", slot);

    if (updateError) throw updateError;

    return NextResponse.json({ success: true, agendamento: newAgendamento }, { status: 201 });
  } catch (error) {
    console.error("Erro ao agendar:", error);
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: "Erro interno do servidor.", detail: msg }, { status: 500 });
  }
}
