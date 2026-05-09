import { NextResponse } from "next/server";
import { db } from "@/db";
import { horarios } from "@/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const slots = await db
      .select()
      .from(horarios)
      .where(eq(horarios.disponivel, true))
      .orderBy(horarios.slot);

    return NextResponse.json(slots);
  } catch (error) {
    console.error("Erro ao buscar horários:", error);
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: "Erro interno", detail: msg }, { status: 500 });
  }
}
