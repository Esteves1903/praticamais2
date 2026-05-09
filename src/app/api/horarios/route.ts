import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("horarios")
      .select("*")
      .eq("disponivel", true)
      .order("slot");

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: "Erro interno", detail: msg }, { status: 500 });
  }
}
