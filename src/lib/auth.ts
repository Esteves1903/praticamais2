import { createHmac } from "crypto";

const SECRET = process.env.ADMIN_SECRET ?? "praticamais-secret";

export function generateSessionToken(): string {
  return createHmac("sha256", SECRET).update("admin-session").digest("hex");
}

export function verifyPassword(password: string): boolean {
  return password === (process.env.ADMIN_PASSWORD ?? "");
}

export function isValidToken(token: string | undefined): boolean {
  if (!token) return false;
  return token === generateSessionToken();
}
