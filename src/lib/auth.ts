import { createHmac, randomBytes, timingSafeEqual } from "crypto";

export function getSecret(): string {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) throw new Error("ADMIN_SECRET environment variable is required");
  return secret;
}

// TOTP-style OTP generation (5-minute windows)
export function gerarOtp(email: string, offsetJanela = 0): string {
  const janela = Math.floor(Date.now() / (5 * 60 * 1000)) - offsetJanela;
  const hash = createHmac("sha256", getSecret())
    .update(`${email.toLowerCase()}:${janela}`)
    .digest("hex");
  return String(parseInt(hash.slice(0, 8), 16) % 1_000_000).padStart(6, "0");
}

// Token format: `<nonce>:<expires_ms>:<hmac_sig>`
export function generateSessionToken(): string {
  const nonce = randomBytes(32).toString("hex");
  const expires = Date.now() + 7 * 24 * 60 * 60 * 1000;
  const payload = `${nonce}:${expires}`;
  const sig = createHmac("sha256", getSecret()).update(payload).digest("hex");
  return `${payload}:${sig}`;
}

export function verifyPassword(password: string): boolean {
  const secret = getSecret();
  const a = createHmac("sha256", secret).update(password).digest();
  const b = createHmac("sha256", secret)
    .update(process.env.ADMIN_PASSWORD ?? "")
    .digest();
  return timingSafeEqual(a, b);
}

export function isValidToken(token: string | undefined): boolean {
  if (!token) return false;
  const parts = token.split(":");
  if (parts.length !== 3) return false;
  const [nonce, expiresStr, sig] = parts;
  const expires = parseInt(expiresStr, 10);
  if (isNaN(expires) || Date.now() > expires) return false;
  const payload = `${nonce}:${expiresStr}`;
  const expected = createHmac("sha256", getSecret()).update(payload).digest("hex");
  if (sig.length !== 64 || expected.length !== 64) return false;
  return timingSafeEqual(Buffer.from(sig, "utf8"), Buffer.from(expected, "utf8"));
}
