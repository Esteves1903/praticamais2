import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { isValidToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!isValidToken(req.cookies.get("admin-token")?.value)) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }
  const { data, error } = await supabase
    .from("agendamentos")
    .select("*")
    .order("criado_em", { ascending: false });

  if (error) {
    console.error("Erro ao obter agendamentos:", error.message);
    return NextResponse.json({ error: "Erro interno do servidor." }, { status: 500 });
  }
  return NextResponse.json(data);
}
