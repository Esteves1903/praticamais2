"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const PROFS = [
  { key: "jm", name: "José Mário" },
  { key: "dm", name: "Diogo Magalhães" },
  { key: "ms", name: "Manuel Silva" },
];

export default function ProfessorLogin() {
  const router = useRouter();
  const [profKey, setProfKey] = useState("jm");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await fetch("/api/professor/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profKey, password }),
    });
    setLoading(false);
    if (res.ok) {
      router.push("/professor/dashboard");
    } else {
      const d = await res.json();
      setError(d.error || "Erro ao entrar");
    }
  }

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(135deg, #0f172a 0%, #1e40af 100%)",
    }}>
      <div style={{
        background: "white", borderRadius: 24, padding: "48px 40px", width: "100%", maxWidth: 420,
        boxShadow: "0 24px 64px rgba(0,0,0,0.25)",
      }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 56, height: 56, borderRadius: 16, background: "#eff6ff",
            fontSize: 24, marginBottom: 16,
          }}>👨‍🏫</div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 900, color: "#0f172a", margin: 0 }}>
            Pratica<span style={{ color: "#f97316" }}>+</span> Professores
          </h1>
          <p style={{ color: "#64748b", fontSize: "0.9rem", marginTop: 6 }}>
            Acede ao teu painel de horários
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#374151", marginBottom: 6 }}>
              Professor
            </label>
            <select
              value={profKey}
              onChange={e => setProfKey(e.target.value)}
              style={{
                width: "100%", padding: "12px 14px", borderRadius: 12,
                border: "1.5px solid #e2e8f0", fontSize: "0.95rem",
                background: "#f8fafc", color: "#0f172a", outline: "none",
              }}
            >
              {PROFS.map(p => (
                <option key={p.key} value={p.key}>{p.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#374151", marginBottom: 6 }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{
                width: "100%", padding: "12px 14px", borderRadius: 12,
                border: "1.5px solid #e2e8f0", fontSize: "0.95rem",
                background: "#f8fafc", color: "#0f172a", outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          {error && (
            <div style={{
              background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10,
              padding: "10px 14px", color: "#dc2626", fontSize: "0.85rem",
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "14px", borderRadius: 12, border: "none", cursor: "pointer",
              background: "linear-gradient(135deg, #1e40af, #3b82f6)",
              color: "white", fontWeight: 700, fontSize: "1rem",
              opacity: loading ? 0.7 : 1, marginTop: 4,
            }}
          >
            {loading ? "A entrar..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
