import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifyProfessorToken } from "@/lib/professors";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { valid, profName } = verifyProfessorToken(req.cookies.get("prof-token")?.value);
  if (!valid) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const { data, error } = await supabase
    .from("agendamentos")
    .select("*")
    .eq("professor", profName)
    .order("criado_em", { ascending: false });

  if (error) return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  return NextResponse.json(data ?? []);
}
