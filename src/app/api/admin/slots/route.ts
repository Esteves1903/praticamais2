import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { isValidToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!isValidToken(req.cookies.get("admin-token")?.value)) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }
  const { data, error } = await supabase
    .from("horarios")
    .select("*")
    .order("slot");

  if (error) {
    console.error("Erro ao obter slots:", error.message);
    return NextResponse.json({ error: "Erro interno do servidor." }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  if (!isValidToken(req.cookies.get("admin-token")?.value)) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }
  const { slot } = await req.json();
  if (!slot) return NextResponse.json({ error: "Slot inválido" }, { status: 400 });

  const { data, error } = await supabase
    .from("horarios")
    .insert({ slot, disponivel: true })
    .select()
    .single();

  if (error) {
    console.error("Erro ao criar slot:", error.message);
    return NextResponse.json({ error: "Erro interno do servidor." }, { status: 500 });
  }
  return NextResponse.json(data, { status: 201 });
}
