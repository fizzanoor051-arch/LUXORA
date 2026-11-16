import { transaction, type EventRec } from "@/lib/server/db";
import { json, ok, rateLimit, str } from "@/lib/server/http";

const TYPES = ["page_view", "product_view", "add_to_cart", "begin_checkout", "search"] as const;
const MAX_EVENTS = 20000;

// First-party, cookie-less analytics. No personal data: a random per-tab session id only.
export async function POST(req: Request) {
  if (!rateLimit(req, "events", 120)) return ok({ ok: false }, 429);
  const b = await json<{ type?: string; sid?: string; path?: string; productId?: string; q?: string }>(req);
  const type = TYPES.find((t) => t === b?.type);
  const sid = str(b?.sid, 40);
  if (!type || !sid) return ok({ ok: false }, 400);
  const ev: EventRec = {
    type, sid, at: new Date().toISOString(),
    path: str(b?.path, 120) || undefined,
    productId: str(b?.productId, 80) || undefined,
    q: type === "search" ? str(b?.q, 80).toLowerCase() || undefined : undefined,
  };
  await transaction((db) => {
    db.events.push(ev);
    if (db.events.length > MAX_EVENTS) db.events.splice(0, db.events.length - MAX_EVENTS);
  });
  return ok({ ok: true });
}
