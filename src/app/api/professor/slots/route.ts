import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifyProfessorToken } from "@/lib/professors";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { valid, profName } = verifyProfessorToken(req.cookies.get("prof-token")?.value);
  if (!valid) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const { data, error } = await supabase
    .from("horarios")
    .select("*")
    .eq("professor", profName)
    .order("slot");

  if (error) return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const { valid, profName } = verifyProfessorToken(req.cookies.get("prof-token")?.value);
  if (!valid) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const { slot } = await req.json();
  if (!slot) return NextResponse.json({ error: "Slot inválido" }, { status: 400 });

  // Verificar duplicado
  const { data: existing } = await supabase
    .from("horarios")
    .select("id")
    .eq("slot", slot)
    .eq("professor", profName)
    .maybeSingle();

  if (existing) return NextResponse.json({ error: "Horário já existe" }, { status: 409 });

  const { data, error } = await supabase
    .from("horarios")
    .insert({ slot, disponivel: true, professor: profName })
    .select()
    .single();

  if (error) return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
