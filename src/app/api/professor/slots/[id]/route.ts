import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifyProfessorToken } from "@/lib/professors";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { valid, profName } = verifyProfessorToken(req.cookies.get("prof-token")?.value);
  if (!valid) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const { id } = await params;

  const { data: slot } = await supabase
    .from("horarios")
    .select("professor, agendamento_id")
    .eq("id", id)
    .maybeSingle();

  if (!slot || slot.professor !== profName)
    return NextResponse.json({ error: "Acesso negado" }, { status: 403 });

  if (slot.agendamento_id)
    return NextResponse.json({ error: "Slot já reservado — não podes eliminar" }, { status: 409 });

  await supabase.from("horarios").delete().eq("id", id);
  return NextResponse.json({ ok: true });
}
