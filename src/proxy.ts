import { NextRequest, NextResponse } from "next/server";

// Edge Runtime does not support Node.js crypto, so full HMAC verification is
// done in each API route via isValidToken(). Here we do a lightweight format
// check (nonce:expires:sig) and expiry check as a first defence layer.
function isTokenFormatValid(token: string | undefined): boolean {
  if (!token) return false;
  const parts = token.split(":");
  if (parts.length !== 3) return false;
  const expires = parseInt(parts[1], 10);
  return !isNaN(expires) && Date.now() <= expires;
}

export function proxy(req: NextRequest) {
  const token = req.cookies.get("admin-token")?.value;

  if (!isTokenFormatValid(token)) {
    if (req.nextUrl.pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/((?!login).*)", "/api/admin/((?!login).*)"],
};
