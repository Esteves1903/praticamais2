import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { horarios } from "./schema";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const pool = new Pool({ connectionString: process.env.DATABASE_URL! });
const db = drizzle(pool);

const HOURS = [9, 10, 11, 12, 14, 15, 16, 17];
const WEEKS_AHEAD = 8;

function getNextMonday(): Date {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const day = today.getDay(); // 0=Sun, 1=Mon
  const daysToMon = day === 0 ? 1 : day === 1 ? 0 : 8 - day;
  today.setDate(today.getDate() + daysToMon);
  return today;
}

async function seed() {
  const slots: { slot: string; disponivel: boolean }[] = [];
  const monday = getNextMonday();

  for (let week = 0; week < WEEKS_AHEAD; week++) {
    for (let dayOffset = 0; dayOffset < 6; dayOffset++) { // Mon-Sat
      const date = new Date(monday);
      date.setDate(monday.getDate() + week * 7 + dayOffset);

      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const dd = String(date.getDate()).padStart(2, "0");

      for (const hour of HOURS) {
        const hh = String(hour).padStart(2, "0");
        slots.push({ slot: `${yyyy}-${mm}-${dd}T${hh}:00`, disponivel: true });
      }
    }
  }

  console.log(`A inserir ${slots.length} slots...`);
  await db.insert(horarios).values(slots);
  console.log("Seed completo!");
  await pool.end();
}

seed().catch((err) => {
  console.error("Erro no seed:", err);
  process.exit(1);
});
