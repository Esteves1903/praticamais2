import { Pool } from "pg";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const pool = new Pool({ connectionString: process.env.DATABASE_URL! });

async function applySecurity() {
  const client = await pool.connect();
  try {
    // Enable RLS on both tables
    await client.query(`ALTER TABLE horarios ENABLE ROW LEVEL SECURITY`);
    await client.query(`ALTER TABLE agendamentos ENABLE ROW LEVEL SECURITY`);
    console.log("✓ RLS activado nas duas tabelas");

    // horarios: qualquer um pode ler slots disponíveis (necessário para o calendário)
    await client.query(`
      DROP POLICY IF EXISTS "horarios_select" ON horarios;
      CREATE POLICY "horarios_select" ON horarios
        FOR SELECT USING (disponivel = true)
    `);
    console.log("✓ horarios: leitura pública apenas de slots disponíveis");

    // horarios: apenas o service role pode escrever (INSERT/UPDATE/DELETE)
    await client.query(`
      DROP POLICY IF EXISTS "horarios_write" ON horarios;
      CREATE POLICY "horarios_write" ON horarios
        FOR ALL USING (auth.role() = 'service_role')
    `);
    console.log("✓ horarios: escrita apenas via service role");

    // agendamentos: sem acesso público — só service role
    await client.query(`
      DROP POLICY IF EXISTS "agendamentos_all" ON agendamentos;
      CREATE POLICY "agendamentos_all" ON agendamentos
        FOR ALL USING (auth.role() = 'service_role')
    `);
    console.log("✓ agendamentos: acesso apenas via service role");

    console.log("\nSegurança aplicada com sucesso!");
    console.log("Nota: a app continua a funcionar porque usa conexão directa como postgres (bypassa RLS).");
  } finally {
    client.release();
    await pool.end();
  }
}

applySecurity().catch((err) => {
  console.error("Erro:", err.message);
  process.exit(1);
});
