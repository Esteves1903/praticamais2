import { NextRequest, NextResponse } from "next/server";
import { gerarOtp } from "@/lib/auth";

export const dynamic = "force-dynamic";

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
