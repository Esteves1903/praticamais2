import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const g = globalThis as typeof globalThis & {
  _pgPool?: Pool;
  _db?: ReturnType<typeof drizzle>;
};

function createPool(url: string): Pool {
  const parsed = new URL(url);
  return new Pool({
    host: parsed.hostname,
    port: parsed.port ? parseInt(parsed.port) : 5432,
    database: parsed.pathname.slice(1),
    user: decodeURIComponent(parsed.username),
    password: decodeURIComponent(parsed.password),
    ssl: { rejectUnauthorized: false },
  });
}

function getDb(): ReturnType<typeof drizzle> {
  if (!g._db) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL is required");
    if (!g._pgPool) {
      g._pgPool = createPool(url);
    }
    g._db = drizzle(g._pgPool);
  }
  return g._db;
}

export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(_, prop: string) {
    return (getDb() as any)[prop];
  },
});
