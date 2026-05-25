import { createHmac, randomBytes, timingSafeEqual } from "crypto";
import { getSecret } from "./auth";

export const PROFESSORS: Record<string, { name: string; envKey: string }> = {
  jm: { name: "José Mário",      envKey: "PROF_JM_PASSWORD" },
  dm: { name: "Diogo Magalhães", envKey: "PROF_DM_PASSWORD" },
  ms: { name: "Manuel Silva",    envKey: "PROF_MS_PASSWORD" },
};

export function verifyProfessorPassword(profKey: string, password: string): boolean {
  const prof = PROFESSORS[profKey];
  if (!prof) return false;
  const envPass = process.env[prof.envKey] ?? "";
  if (!envPass) return false;
  const secret = getSecret();
  const a = createHmac("sha256", secret).update(password).digest();
  const b = createHmac("sha256", secret).update(envPass).digest();
  try { return timingSafeEqual(a, b); } catch { return false; }
}

export function generateProfessorToken(profKey: string): string {
  const nonce = randomBytes(32).toString("hex");
  const expires = Date.now() + 7 * 24 * 60 * 60 * 1000;
  const payload = `${nonce}:${expires}:${profKey}`;
  const sig = createHmac("sha256", getSecret()).update(payload).digest("hex");
  return `${payload}:${sig}`;
}

export function verifyProfessorToken(token: string | undefined): {
  valid: boolean; profKey: string | null; profName: string | null;
} {
  if (!token) return { valid: false, profKey: null, profName: null };
  const parts = token.split(":");
  if (parts.length !== 4) return { valid: false, profKey: null, profName: null };
  const [nonce, expiresStr, profKey, sig] = parts;
  if (!PROFESSORS[profKey]) return { valid: false, profKey: null, profName: null };
  const expires = parseInt(expiresStr, 10);
  if (isNaN(expires) || Date.now() > expires) return { valid: false, profKey: null, profName: null };
  const payload = `${nonce}:${expiresStr}:${profKey}`;
  const expected = createHmac("sha256", getSecret()).update(payload).digest("hex");
  try {
    const valid = timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
    return { valid, profKey: valid ? profKey : null, profName: valid ? PROFESSORS[profKey].name : null };
  } catch {
    return { valid: false, profKey: null, profName: null };
  }
}
