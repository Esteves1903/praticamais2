import { pgTable, serial, text, timestamp, boolean, integer } from "drizzle-orm/pg-core";

export const agendamentos = pgTable("agendamentos", {
  id: serial("id").primaryKey(),
  nome: text("nome").notNull(),
  email: text("email").notNull(),
  telefone: text("telefone").notNull(),
  nivel: text("nivel").notNull(), // "basico" | "secundario"
  disciplina: text("disciplina").notNull(),
  slot: text("slot").notNull(), // e.g. "2025-07-15T10:00"
  tipo: text("tipo").notNull(), // "experimental" | "individual" | "grupo"
  notas: text("notas").default(""),
  confirmado: boolean("confirmado").default(false),
  criadoEm: timestamp("criado_em").defaultNow().notNull(),
});

export const horarios = pgTable("horarios", {
  id: serial("id").primaryKey(),
  slot: text("slot").notNull(), // ISO datetime string e.g. "2025-07-15T10:00"
  disponivel: boolean("disponivel").default(true).notNull(),
  agendamentoId: integer("agendamento_id"),
});
