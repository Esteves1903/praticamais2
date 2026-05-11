import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { gerarOtp } from "@/lib/auth";

export const dynamic = "force-dynamic";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const { email, otpCode } = await req.json();

    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Email inválido." }, { status: 400 });
    }

    const otpValido =
      typeof otpCode === "string" &&
      (gerarOtp(email, 0) === otpCode || gerarOtp(email, 1) === otpCode);

    if (!otpValido) {
      return NextResponse.json({ error: "OTP inválido." }, { status: 403 });
    }

    const { data, error } = await supabase
      .from("agendamentos")
      .select("id")
      .eq("email", email.toLowerCase())
      .eq("tipo", "experimental")
      .limit(1);

    if (error) throw error;

    return NextResponse.json({ jaUsou: data !== null && data.length > 0 });
  } catch (error) {
    console.error("Erro ao verificar experimental:", error);
    return NextResponse.json({ error: "Erro interno do servidor." }, { status: 500 });
  }
}
