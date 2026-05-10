import { Pool } from "pg";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const pool = new Pool({ connectionString: process.env.DATABASE_URL! });

async function migrate() {
  const client = await pool.connect();
  try {
    await client.query(`ALTER TABLE agendamentos ADD COLUMN IF NOT EXISTS professor TEXT DEFAULT ''`);
    await client.query(`ALTER TABLE agendamentos ADD COLUMN IF NOT EXISTS ano_escolar TEXT DEFAULT ''`);
    console.log("✓ Colunas professor e ano_escolar adicionadas");
  } finally {
    client.release();
    await pool.end();
  }
}

migrate().catch(err => { console.error(err.message); process.exit(1); });
