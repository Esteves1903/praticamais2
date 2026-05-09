import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { agendamentos, horarios } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nome, email, telefone, nivel, disciplina, slot, tipo, notas } = body;

    if (!nome || !email || !telefone || !nivel || !disciplina || !slot || !tipo) {
      return NextResponse.json({ error: "Todos os campos obrigatórios devem ser preenchidos." }, { status: 400 });
    }

    // Check if slot is still available
    const slotRows = await db
      .select()
      .from(horarios)
      .where(and(eq(horarios.slot, slot), eq(horarios.disponivel, true)));

    if (slotRows.length === 0) {
      return NextResponse.json({ error: "Este horário já foi reservado. Por favor escolhe outro." }, { status: 409 });
    }

    // Create the booking
    const [newAgendamento] = await db
      .insert(agendamentos)
      .values({ nome, email, telefone, nivel, disciplina, slot, tipo, notas: notas || "" })
      .returning();

    // Mark slot as unavailable
    await db
      .update(horarios)
      .set({ disponivel: false, agendamentoId: newAgendamento.id })
      .where(eq(horarios.slot, slot));

    return NextResponse.json({ success: true, agendamento: newAgendamento }, { status: 201 });
  } catch (error) {
    console.error("Erro ao agendar:", error);
    return NextResponse.json({ error: "Erro interno do servidor." }, { status: 500 });
  }
}
