import { Pool } from "pg";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const pool = new Pool({ connectionString: process.env.DATABASE_URL! });

const HOURS = [9, 10, 11, 12, 14, 15, 16, 17];
const WEEKS_AHEAD = 8;

function getNextMonday(): Date {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const day = today.getDay();
  const daysToMon = day === 0 ? 1 : day === 1 ? 0 : 8 - day;
  today.setDate(today.getDate() + daysToMon);
  return today;
}

async function setup() {
  const client = await pool.connect();
  try {
    // Create tables
    await client.query(`
      CREATE TABLE IF NOT EXISTS agendamentos (
        id SERIAL PRIMARY KEY,
        nome TEXT NOT NULL,
        email TEXT NOT NULL,
        telefone TEXT NOT NULL,
        nivel TEXT NOT NULL,
        disciplina TEXT NOT NULL,
        slot TEXT NOT NULL,
        tipo TEXT NOT NULL,
        notas TEXT DEFAULT '',
        confirmado BOOLEAN DEFAULT FALSE,
        criado_em TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);
    console.log("✓ Tabela agendamentos criada");

    await client.query(`
      CREATE TABLE IF NOT EXISTS horarios (
        id SERIAL PRIMARY KEY,
        slot TEXT NOT NULL,
        disponivel BOOLEAN NOT NULL DEFAULT TRUE,
        agendamento_id INTEGER
      )
    `);
    console.log("✓ Tabela horarios criada");

    // Seed slots
    const monday = getNextMonday();
    const values: string[] = [];
    const params: string[] = [];
    let idx = 1;

    for (let week = 0; week < WEEKS_AHEAD; week++) {
      for (let dayOffset = 0; dayOffset < 6; dayOffset++) {
        const date = new Date(monday);
        date.setDate(monday.getDate() + week * 7 + dayOffset);

        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const dd = String(date.getDate()).padStart(2, "0");

        for (const hour of HOURS) {
          const hh = String(hour).padStart(2, "0");
          values.push(`($${idx++})`);
          params.push(`${yyyy}-${mm}-${dd}T${hh}:00`);
        }
      }
    }

    await client.query(
      `INSERT INTO horarios (slot) VALUES ${values.join(", ")}`,
      params
    );
    console.log(`✓ ${params.length} slots inseridos`);
    console.log("Setup completo!");
  } finally {
    client.release();
    await pool.end();
  }
}

setup().catch((err) => {
  console.error("Erro:", err.message);
  process.exit(1);
});
