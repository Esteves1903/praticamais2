import { NextRequest, NextResponse } from "next/server";
import { verifyProfessorToken } from "@/lib/professors";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { valid, profName } = verifyProfessorToken(req.cookies.get("prof-token")?.value);
  if (!valid) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  return NextResponse.json({ name: profName });
}
