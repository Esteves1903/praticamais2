"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Slot = { id: number; slot: string; disponivel: boolean; agendamento_id: number | null };
type Agendamento = {
  id: number; nome: string; email: string; telefone: string;
  nivel: string; disciplina: string; slot: string; tipo: string;
  notas: string; confirmado: boolean; criado_em: string; ano_escolar: string;
};

const DAYS_PT = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MONTHS_PT = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
const HOURS = Array.from({ length: 14 }, (_, i) => String(i + 8).padStart(2, "0")); // 08–21

function fmtSlot(s: string) {
  const d = new Date(s);
  return `${DAYS_PT[d.getDay()]}, ${d.getDate()} ${MONTHS_PT[d.getMonth()]} às ${String(d.getHours()).padStart(2,"0")}:00`;
}

function getWeekDates(offset: number): Date[] {
  const today = new Date();
  today.setHours(0,0,0,0);
  const dow = today.getDay();
  const daysToMon = (dow + 6) % 7;
  const mon = new Date(today);
  mon.setDate(today.getDate() - daysToMon + offset * 7);
  return Array.from({ length: 6 }, (_, i) => {
    const d = new Date(mon);
    d.setDate(mon.getDate() + i);
    return d;
  });
}

function dateToStr(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}

export default function ProfDashboard() {
  const router = useRouter();
  const [profName, setProfName] = useState("");
  const [tab, setTab] = useState<"horarios" | "agendamentos">("horarios");
  const [slots, setSlots] = useState<Slot[]>([]);
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [weekOffset, setWeekOffset] = useState(0);
  const [addDate, setAddDate] = useState("");
  const [addHour, setAddHour] = useState("09");
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState("");

  async function loadData() {
    const [sRes, aRes] = await Promise.all([
      fetch("/api/professor/slots"),
      fetch("/api/professor/agendamentos"),
    ]);
    if (sRes.status === 401) { router.push("/professor/login"); return; }
    const sData = await sRes.json();
    const aData = aRes.ok ? await aRes.json() : [];

    // Extract prof name from first slot or from a me endpoint
    // We'll get it from cookie-decoded info via a simple check endpoint
    setSlots(sData);
    setAgendamentos(aData);
  }

  async function loadProfName() {
    const res = await fetch("/api/professor/me");
    if (res.ok) {
      const d = await res.json();
      setProfName(d.name);
    }
  }

  useEffect(() => {
    Promise.all([loadData(), loadProfName()]).finally(() => setLoading(false));
  }, []);

  async function logout() {
    await fetch("/api/professor/logout", { method: "POST" });
    router.push("/professor/login");
  }

  async function addSlot() {
    setAddError("");
    if (!addDate) { setAddError("Escolhe uma data"); return; }
    const slot = `${addDate}T${addHour}:00`;
    setAdding(true);
    const res = await fetch("/api/professor/slots", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slot }),
    });
    setAdding(false);
    if (res.ok) {
      const data = await res.json();
      setSlots(prev => [...prev, data].sort((a, b) => a.slot.localeCompare(b.slot)));
      setAddDate("");
    } else {
      const d = await res.json();
      setAddError(d.error || "Erro ao adicionar");
    }
  }

  async function removeSlot(id: number) {
    const res = await fetch(`/api/professor/slots/${id}`, { method: "DELETE" });
    if (res.ok) {
      setSlots(prev => prev.filter(s => s.id !== id));
    } else {
      const d = await res.json();
      alert(d.error || "Não foi possível remover");
    }
  }

  const weekDates = getWeekDates(weekOffset);
  const weekStart = weekDates[0];
  const weekEnd = weekDates[weekDates.length - 1];
  const weekLabel = `${weekStart.getDate()} ${MONTHS_PT[weekStart.getMonth()]} – ${weekEnd.getDate()} ${MONTHS_PT[weekEnd.getMonth()]}`;

  const weekSlots = slots.filter(s => {
    const d = new Date(s.slot);
    return d >= weekDates[0] && d <= new Date(weekDates[5].getTime() + 86399999);
  });

  const slotsByDay: Record<string, Slot[]> = {};
  weekDates.forEach(d => { slotsByDay[dateToStr(d)] = []; });
  weekSlots.forEach(s => {
    const key = s.slot.split("T")[0];
    if (slotsByDay[key]) slotsByDay[key].push(s);
  });

  const s: Record<string, React.CSSProperties> = {
    page: { minHeight: "100vh", background: "#f8fafc", fontFamily: "'Inter', sans-serif" },
    nav: {
      background: "white", borderBottom: "1px solid #e2e8f0", padding: "0 5%",
      height: 64, display: "flex", alignItems: "center", justifyContent: "space-between",
      position: "sticky" as const, top: 0, zIndex: 100,
    },
    logo: { fontWeight: 900, fontSize: "1.3rem", color: "#1e40af" },
    inner: { maxWidth: 1100, margin: "0 auto", padding: "32px 5%" },
    card: { background: "white", borderRadius: 20, border: "1px solid #e2e8f0", padding: 28 },
    tab: (active: boolean): React.CSSProperties => ({
      padding: "8px 20px", borderRadius: 50, border: "none", cursor: "pointer", fontWeight: 700,
      fontSize: "0.9rem",
      background: active ? "#1e40af" : "transparent",
      color: active ? "white" : "#64748b",
      transition: "all 0.2s",
    }),
    dayCol: {
      background: "#f8fafc", borderRadius: 14, padding: 14, minHeight: 80,
    },
    slotPill: (booked: boolean): React.CSSProperties => ({
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: booked ? "#fef3c7" : "#eff6ff",
      border: `1px solid ${booked ? "#fcd34d" : "#bfdbfe"}`,
      borderRadius: 8, padding: "6px 10px", fontSize: "0.82rem", fontWeight: 600,
      color: booked ? "#92400e" : "#1e40af", marginBottom: 6,
    }),
    btn: (color: string): React.CSSProperties => ({
      padding: "6px 14px", borderRadius: 8, border: "none", cursor: "pointer",
      fontWeight: 700, fontSize: "0.78rem", background: color, color: "white",
    }),
  };

  if (loading) return (
    <div style={{ ...s.page, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: "#64748b" }}>A carregar...</p>
    </div>
  );

  return (
    <div style={s.page}>
      {/* Nav */}
      <nav style={s.nav}>
        <span style={s.logo}>Pratica<span style={{ color: "#f97316" }}>+</span> · Professores</span>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {profName && (
            <span style={{ fontSize: "0.9rem", color: "#475569", fontWeight: 600 }}>
              👋 {profName}
            </span>
          )}
          <button onClick={logout} style={{
            padding: "7px 16px", borderRadius: 8, border: "1px solid #e2e8f0",
            background: "white", cursor: "pointer", fontSize: "0.85rem", fontWeight: 600, color: "#64748b",
          }}>Sair</button>
        </div>
      </nav>

      <div style={s.inner}>
        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 28, background: "#f1f5f9", borderRadius: 50, padding: 4, width: "fit-content" }}>
          <button style={s.tab(tab === "horarios")} onClick={() => setTab("horarios")}>📅 Horários</button>
          <button style={s.tab(tab === "agendamentos")} onClick={() => setTab("agendamentos")}>
            📋 Marcações {agendamentos.filter(a => !a.confirmado).length > 0 && (
              <span style={{ background: "#ef4444", color: "white", borderRadius: 50, padding: "1px 7px", fontSize: "0.75rem", marginLeft: 6 }}>
                {agendamentos.filter(a => !a.confirmado).length}
              </span>
            )}
          </button>
        </div>

        {/* ── HORÁRIOS ── */}
        {tab === "horarios" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Add slot */}
            <div style={s.card}>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", marginBottom: 20 }}>
                Adicionar Horário
              </h2>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "flex-end" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#64748b", marginBottom: 6 }}>Data</label>
                  <input
                    type="date"
                    value={addDate}
                    onChange={e => setAddDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    style={{ padding: "10px 14px", borderRadius: 10, border: "1.5px solid #e2e8f0", fontSize: "0.9rem" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#64748b", marginBottom: 6 }}>Hora</label>
                  <select
                    value={addHour}
                    onChange={e => setAddHour(e.target.value)}
                    style={{ padding: "10px 14px", borderRadius: 10, border: "1.5px solid #e2e8f0", fontSize: "0.9rem" }}
                  >
                    {HOURS.map(h => <option key={h} value={h}>{h}:00</option>)}
                  </select>
                </div>
                <button
                  onClick={addSlot}
                  disabled={adding}
                  style={{ ...s.btn("#1e40af"), padding: "11px 22px", borderRadius: 10, fontSize: "0.9rem" }}
                >
                  {adding ? "A adicionar..." : "+ Adicionar"}
                </button>
              </div>
              {addError && (
                <p style={{ color: "#dc2626", fontSize: "0.83rem", marginTop: 10 }}>{addError}</p>
              )}
            </div>

            {/* Week view */}
            <div style={s.card}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a" }}>
                  Semana · {weekLabel}
                </h2>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={() => setWeekOffset(o => o - 1)}
                    disabled={weekOffset <= 0}
                    style={{ ...s.btn("#475569"), opacity: weekOffset <= 0 ? 0.4 : 1 }}
                  >← Anterior</button>
                  <button onClick={() => setWeekOffset(o => o + 1)} style={s.btn("#1e40af")}>
                    Próxima →
                  </button>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10 }}>
                {weekDates.map(date => {
                  const key = dateToStr(date);
                  const daySlots = slotsByDay[key] || [];
                  const isPast = date < new Date(new Date().setHours(0,0,0,0));
                  return (
                    <div key={key} style={{ ...s.dayCol, opacity: isPast ? 0.6 : 1 }}>
                      <div style={{ fontWeight: 700, fontSize: "0.82rem", color: "#475569", marginBottom: 10 }}>
                        {DAYS_PT[date.getDay()]} {date.getDate()}
                      </div>
                      {daySlots.length === 0 && (
                        <div style={{ fontSize: "0.75rem", color: "#94a3b8", textAlign: "center", paddingTop: 8 }}>
                          —
                        </div>
                      )}
                      {daySlots.map(slot => (
                        <div key={slot.id} style={s.slotPill(!!slot.agendamento_id)}>
                          <span>{slot.slot.split("T")[1].slice(0,5)}</span>
                          {slot.agendamento_id ? (
                            <span style={{ fontSize: "0.7rem" }}>📌</span>
                          ) : (
                            <button
                              onClick={() => removeSlot(slot.id)}
                              style={{ background: "none", border: "none", cursor: "pointer", color: "#dc2626", fontSize: "0.9rem", padding: 0, lineHeight: 1 }}
                              title="Remover"
                            >×</button>
                          )}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>

              <div style={{ marginTop: 16, display: "flex", gap: 20, fontSize: "0.78rem", color: "#64748b" }}>
                <span><span style={{ color: "#1e40af" }}>■</span> Disponível</span>
                <span><span style={{ color: "#92400e" }}>■</span> Reservado (📌)</span>
              </div>
            </div>
          </div>
        )}

        {/* ── MARCAÇÕES ── */}
        {tab === "agendamentos" && (
          <div style={s.card}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", marginBottom: 20 }}>
              As Tuas Marcações ({agendamentos.length})
            </h2>
            {agendamentos.length === 0 ? (
              <p style={{ color: "#94a3b8", textAlign: "center", padding: "32px 0" }}>
                Ainda não tens marcações.
              </p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {agendamentos.map(a => (
                  <div key={a.id} style={{
                    border: `1.5px solid ${a.confirmado ? "#bbf7d0" : "#e2e8f0"}`,
                    borderRadius: 14, padding: "16px 20px",
                    background: a.confirmado ? "#f0fdf4" : "white",
                    display: "flex", gap: 20, flexWrap: "wrap", alignItems: "flex-start",
                  }}>
                    <div style={{ flex: 1, minWidth: 200 }}>
                      <div style={{ fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>
                        {a.nome}
                        <span style={{
                          marginLeft: 10, fontSize: "0.72rem", fontWeight: 700,
                          background: a.confirmado ? "#dcfce7" : "#fef9c3",
                          color: a.confirmado ? "#15803d" : "#854d0e",
                          padding: "2px 8px", borderRadius: 50,
                        }}>
                          {a.confirmado ? "✓ Confirmado" : "⏳ Pendente"}
                        </span>
                      </div>
                      <div style={{ fontSize: "0.83rem", color: "#64748b" }}>
                        📅 {fmtSlot(a.slot)} · {a.ano_escolar} · {a.disciplina}
                      </div>
                      <div style={{ fontSize: "0.83rem", color: "#64748b", marginTop: 2 }}>
                        📱 {a.telefone} · ✉️ {a.email}
                      </div>
                      {a.notas && (
                        <div style={{ fontSize: "0.8rem", color: "#475569", marginTop: 6, fontStyle: "italic" }}>
                          "{a.notas}"
                        </div>
                      )}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#94a3b8", whiteSpace: "nowrap" }}>
                      {new Date(a.criado_em).toLocaleDateString("pt-PT")}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
