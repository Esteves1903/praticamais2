import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "crypto";

export const dynamic = "force-dynamic";

function gerarOtp(email: string, offsetJanela = 0): string {
  const janela = Math.floor(Date.now() / (5 * 60 * 1000)) - offsetJanela;
  const hash = createHmac("sha256", process.env.ADMIN_SECRET ?? "praticamais-secret")
    .update(`${email.toLowerCase()}:${janela}`)
    .digest("hex");
  return String(parseInt(hash.slice(0, 8), 16) % 1000000).padStart(6, "0");
}

export async function POST(req: NextRequest) {
  try {
    const { email, code } = await req.json();
    if (!email || !code) return NextResponse.json({ valid: false });

    // Accept current 5-min window and the previous one (in case user was slow)
    const valid = gerarOtp(email, 0) === code || gerarOtp(email, 1) === code;
    return NextResponse.json({ valid });
  } catch {
    return NextResponse.json({ valid: false });
  }
}
