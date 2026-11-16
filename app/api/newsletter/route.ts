import { transaction } from "@/lib/server/db";
import { fail, isEmail, json, ok, rateLimit, str } from "@/lib/server/http";

export async function POST(req: Request) {
  if (!rateLimit(req, "newsletter", 5)) return fail("Too many requests", 429);
  const body = await json<{ email?: string }>(req);
  const email = str(body?.email, 254).toLowerCase();
  if (!isEmail(email)) return fail("Please enter a valid email address");
  const already = await transaction((db) => {
    if (db.newsletter.some((n) => n.email === email)) return true;
    db.newsletter.push({ email, createdAt: new Date().toISOString() });
    return false;
  });
  return ok({ ok: true, already });
}
