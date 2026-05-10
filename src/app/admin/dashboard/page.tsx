"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Agendamento = {
  id: number; nome: string; email: string; telefone: string;
  nivel: string; disciplina: string; slot: string; tipo: string;
  notas: string; confirmado: boolean; criado_em: string;
};
type Slot = { id: number; slot: string; disponivel: boolean; agendamento_id: number | null };

const DISCIPLINAS: Record<string, string> = { matematica: "Matemática", portugues: "Português", fisica: "Física", quimica: "Química", ingles: "Inglês" };
const TIPOS: Record<string, string> = { experimental: "🎁 Experimental (50%OFF)", individual: "👤 Individual", grupo: "👥 Grupo" };

function formatSlot(s: string) {
  const d = new Date(s);
  return d.toLocaleDateString("pt-PT", { weekday: "short", day: "numeric", month: "short" }) + " às " + String(d.getHours()).padStart(2, "0") + ":00";
}

export default function Dashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<"agendamentos" | "slots">("agendamentos");
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"todos" | "pendentes" | "confirmados">("todos");
  const [newDate, setNewDate] = useState("");
  const [newHour, setNewHour] = useState("09");
  const [addingSlot, setAddingSlot] = useState(false);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  async function loadAgendamentos() {
    const res = await fetch("/api/admin/agendamentos");
    if (res.status === 401) { router.push("/admin/login"); return; }
    setAgendamentos(await res.json());
  }

  async function loadSlots() {
    const res = await fetch("/api/admin/slots");
    if (res.status === 401) { router.push("/admin/login"); return; }
    setSlots(await res.json());
  }

  useEffect(() => {
    Promise.all([loadAgendamentos(), loadSlots()]).finally(() => setLoading(false));
  }, []);

  async function confirmar(id: number) {
    await fetch(`/api/admin/agendamentos/${id}/confirmar`, { method: "POST" });
    setAgendamentos(prev => prev.map(a => a.id === id ? { ...a, confirmado: true } : a));
  }

  async function cancelar(id: number) {
    if (!confirm("Tens a certeza que queres cancelar este agendamento?")) return;
    await fetch(`/api/admin/agendamentos/${id}/cancelar`, { method: "POST" });
    setAgendamentos(prev => prev.filter(a => a.id !== id));
    await loadSlots();
  }

  async function deleteSlot(id: number) {
    if (!confirm("Remover este horário?")) return;
    await fetch(`/api/admin/slots/${id}`, { method: "DELETE" });
    setSlots(prev => prev.filter(s => s.id !== id));
  }

  async function addSlot(e: React.FormEvent) {
    e.preventDefault();
    if (!newDate) return;
    setAddingSlot(true);
    const slot = `${newDate}T${newHour}:00`;
    const res = await fetch("/api/admin/slots", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slot }),
    });
    if (res.ok) {
      await loadSlots();
      setNewDate("");
    }
    setAddingSlot(false);
  }

  const filteredAg = agendamentos.filter(a =>
    filter === "todos" ? true : filter === "pendentes" ? !a.confirmado : a.confirmado
  );

  const pendentes = agendamentos.filter(a => !a.confirmado).length;
  const confirmados = agendamentos.filter(a => a.confirmado).length;
  const livres = slots.filter(s => s.disponivel).length;

  const styles = {
    page: { minHeight: "100vh", background: "#f1f5f9", fontFamily: "system-ui, sans-serif" } as React.CSSProperties,
    nav: { background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 } as React.CSSProperties,
    logo: { fontSize: 20, fontWeight: 700, color: "#1e293b" } as React.CSSProperties,
    main: { maxWidth: 1100, margin: "0 auto", padding: "24px 16px" } as React.CSSProperties,
    card: { background: "#fff", borderRadius: 12, padding: "20px 24px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" } as React.CSSProperties,
    statsGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 } as React.CSSProperties,
    statCard: { background: "#fff", borderRadius: 12, padding: "20px 24px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", textAlign: "center" } as React.CSSProperties,
    statNum: { fontSize: 32, fontWeight: 700, color: "#2563eb" } as React.CSSProperties,
    statLabel: { fontSize: 13, color: "#64748b", marginTop: 4 } as React.CSSProperties,
    tabs: { display: "flex", gap: 4, marginBottom: 20 } as React.CSSProperties,
    tab: (active: boolean) => ({ padding: "8px 20px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 14, background: active ? "#2563eb" : "#e2e8f0", color: active ? "#fff" : "#64748b" }) as React.CSSProperties,
    table: { width: "100%", borderCollapse: "collapse" as const },
    th: { textAlign: "left" as const, padding: "10px 12px", fontSize: 12, fontWeight: 600, color: "#64748b", borderBottom: "1px solid #e2e8f0", textTransform: "uppercase" as const },
    td: { padding: "12px", fontSize: 14, color: "#1e293b", borderBottom: "1px solid #f1f5f9", verticalAlign: "top" as const },
    badge: (ok: boolean) => ({ display: "inline-block", padding: "2px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: ok ? "#dcfce7" : "#fef3c7", color: ok ? "#16a34a" : "#92400e" }),
    btnConfirm: { padding: "5px 12px", background: "#dcfce7", color: "#16a34a", border: "none", borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: "pointer", marginRight: 6 } as React.CSSProperties,
    btnCancel: { padding: "5px 12px", background: "#fee2e2", color: "#dc2626", border: "none", borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: "pointer" } as React.CSSProperties,
    btnDelete: { padding: "5px 10px", background: "#fee2e2", color: "#dc2626", border: "none", borderRadius: 6, fontSize: 13, cursor: "pointer" } as React.CSSProperties,
    filter: (active: boolean) => ({ padding: "6px 14px", borderRadius: 6, border: "1.5px solid " + (active ? "#2563eb" : "#e2e8f0"), background: active ? "#eff6ff" : "#fff", color: active ? "#2563eb" : "#64748b", fontSize: 13, fontWeight: 600, cursor: "pointer" }) as React.CSSProperties,
  };

  if (loading) return <div style={{ ...styles.page, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: "#64748b" }}>A carregar...</div>;

  return (
    <div style={styles.page}>
      <nav style={styles.nav}>
        <div style={styles.logo}>Pratica<span style={{ color: "#2563eb" }}>+</span> <span style={{ fontSize: 13, fontWeight: 400, color: "#64748b" }}>Admin</span></div>
        <button onClick={logout} style={{ padding: "6px 16px", background: "#f1f5f9", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 14, color: "#64748b", fontWeight: 600 }}>Sair</button>
      </nav>

      <div style={styles.main}>
        {/* Stats */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}><div style={styles.statNum}>{agendamentos.length}</div><div style={styles.statLabel}>Total agendamentos</div></div>
          <div style={styles.statCard}><div style={{ ...styles.statNum, color: "#f59e0b" }}>{pendentes}</div><div style={styles.statLabel}>Pendentes</div></div>
          <div style={styles.statCard}><div style={{ ...styles.statNum, color: "#16a34a" }}>{confirmados}</div><div style={styles.statLabel}>Confirmados</div></div>
        </div>

        {/* Tabs */}
        <div style={styles.tabs}>
          <button style={styles.tab(tab === "agendamentos")} onClick={() => setTab("agendamentos")}>📋 Agendamentos</button>
          <button style={styles.tab(tab === "slots")} onClick={() => setTab("slots")}>🗓️ Horários ({livres} livres)</button>
        </div>

        {tab === "agendamentos" && (
          <div style={styles.card}>
            {/* Filters */}
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              {(["todos", "pendentes", "confirmados"] as const).map(f => (
                <button key={f} style={styles.filter(filter === f)} onClick={() => setFilter(f)}>
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>

            {filteredAg.length === 0 ? (
              <div style={{ textAlign: "center", color: "#94a3b8", padding: "40px 0" }}>Sem agendamentos.</div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      {["Aluno", "Contacto", "Sessão", "Horário", "Estado", "Ações"].map(h => (
                        <th key={h} style={styles.th}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAg.map(a => (
                      <tr key={a.id}>
                        <td style={styles.td}>
                          <div style={{ fontWeight: 600 }}>{a.nome}</div>
                          <div style={{ fontSize: 12, color: "#64748b" }}>{a.nivel}</div>
                          {a.notas && <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>"{a.notas}"</div>}
                        </td>
                        <td style={styles.td}>
                          <div>{a.email}</div>
                          <div style={{ fontSize: 12, color: "#64748b" }}>{a.telefone}</div>
                        </td>
                        <td style={styles.td}>
                          <div>{DISCIPLINAS[a.disciplina] ?? a.disciplina}</div>
                          <div style={{ fontSize: 12, color: "#64748b" }}>{TIPOS[a.tipo] ?? a.tipo}</div>
                        </td>
                        <td style={styles.td}>{formatSlot(a.slot)}</td>
                        <td style={styles.td}><span style={styles.badge(a.confirmado)}>{a.confirmado ? "✓ Confirmado" : "⏳ Pendente"}</span></td>
                        <td style={styles.td}>
                          {!a.confirmado && <button style={styles.btnConfirm} onClick={() => confirmar(a.id)}>✓ Confirmar</button>}
                          <button style={styles.btnCancel} onClick={() => cancelar(a.id)}>✕ Cancelar</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {tab === "slots" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>
            {/* Slots list */}
            <div style={styles.card}>
              <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700, color: "#1e293b" }}>Todos os horários</h3>
              <div style={{ maxHeight: 520, overflowY: "auto" }}>
                {slots.length === 0 ? (
                  <div style={{ color: "#94a3b8", textAlign: "center", padding: "40px 0" }}>Sem horários.</div>
                ) : slots.map(s => (
                  <div key={s.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f1f5f9" }}>
                    <div>
                      <span style={{ fontSize: 14, fontWeight: 500, color: "#1e293b" }}>{formatSlot(s.slot)}</span>
                      <span style={{ ...styles.badge(s.disponivel), marginLeft: 10 }}>{s.disponivel ? "Livre" : "Reservado"}</span>
                    </div>
                    {s.disponivel && <button style={styles.btnDelete} onClick={() => deleteSlot(s.id)}>✕</button>}
                  </div>
                ))}
              </div>
            </div>

            {/* Add slot */}
            <div style={styles.card}>
              <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700, color: "#1e293b" }}>Adicionar horário</h3>
              <form onSubmit={addSlot}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Data</label>
                <input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} required
                  style={{ width: "100%", padding: "8px 12px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, marginBottom: 16, boxSizing: "border-box" as const }} />
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Hora</label>
                <select value={newHour} onChange={e => setNewHour(e.target.value)}
                  style={{ width: "100%", padding: "8px 12px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, marginBottom: 20, boxSizing: "border-box" as const }}>
                  {[9, 10, 11, 12, 14, 15, 16, 17].map(h => (
                    <option key={h} value={String(h).padStart(2, "0")}>{String(h).padStart(2, "0")}:00</option>
                  ))}
                </select>
                <button type="submit" disabled={addingSlot}
                  style={{ width: "100%", padding: "10px", background: "#2563eb", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                  {addingSlot ? "A adicionar..." : "+ Adicionar horário"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
