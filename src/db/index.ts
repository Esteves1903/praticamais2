import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const g = globalThis as typeof globalThis & {
  _pgPool?: Pool;
  _db?: ReturnType<typeof drizzle>;
};

function getDb(): ReturnType<typeof drizzle> {
  if (!g._db) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL is required");
    if (!g._pgPool) {
      g._pgPool = new Pool({ connectionString: url, ssl: { rejectUnauthorized: false } });
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
