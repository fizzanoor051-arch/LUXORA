import { read } from "@/lib/server/db";
import { ok, requireAdmin } from "@/lib/server/http";

export const dynamic = "force-dynamic";

export async function GET() {
  const a = await requireAdmin();
  if (a instanceof Response) return a;
  return ok({ mails: await read((db) => [...db.outbox].reverse().slice(0, 50)), alerts: await read((db) => db.alerts.length) });
}
