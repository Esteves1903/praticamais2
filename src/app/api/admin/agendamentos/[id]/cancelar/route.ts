import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { isValidToken } from "@/lib/auth";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isValidToken(req.cookies.get("admin-token")?.value)) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }
  const { id } = await params;
  const agendamentoId = parseInt(id);

  const { data: ag } = await supabase
    .from("agendamentos")
    .select("slot")
    .eq("id", agendamentoId)
    .single();

  if (ag) {
    await supabase
      .from("horarios")
      .update({ disponivel: true, agendamento_id: null })
      .eq("slot", ag.slot);
  }

  const { error } = await supabase.from("agendamentos").delete().eq("id", agendamentoId);
  if (error) {
    console.error("Erro ao cancelar agendamento:", error.message);
    return NextResponse.json({ error: "Erro interno do servidor." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
