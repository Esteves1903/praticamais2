import { NextRequest, NextResponse } from "next/server";
import { verifyProfessorPassword, generateProfessorToken, PROFESSORS } from "@/lib/professors";

export async function POST(req: NextRequest) {
  const { profKey, password } = await req.json();
  if (!profKey || !PROFESSORS[profKey]) {
    return NextResponse.json({ error: "Professor inválido" }, { status: 400 });
  }
  if (!verifyProfessorPassword(profKey, password)) {
    return NextResponse.json({ error: "Password incorrecta" }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true, name: PROFESSORS[profKey].name });
  res.cookies.set("prof-token", generateProfessorToken(profKey), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  return res;
}
