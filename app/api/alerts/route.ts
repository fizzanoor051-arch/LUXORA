import { randomUUID } from "crypto";
import { transaction } from "@/lib/server/db";
import { fail, isEmail, json, ok, rateLimit, str } from "@/lib/server/http";

// Back-in-stock and price-drop alerts.
export async function POST(req: Request) {
  if (!rateLimit(req, "alerts", 10)) return fail("Too many requests", 429);
  const b = await json<{ email?: string; productId?: string; kind?: string; targetPrice?: number }>(req);
  const email = str(b?.email, 254).toLowerCase();
  const productId = str(b?.productId, 80);
  const kind = b?.kind === "price_drop" ? "price_drop" : "back_in_stock";
  if (!isEmail(email)) return fail("Please enter a valid email address");
  try {
    await transaction((db) => {
      const p = db.products.find((x) => x.id === productId);
      if (!p) throw new Error("Product not found");
      if (kind === "back_in_stock" && p.stock > 0) throw new Error("This product is already in stock");
      if (db.alerts.some((a) => a.email === email && a.productId === productId && a.kind === kind && !a.triggeredAt)) return;
      db.alerts.push({
        id: randomUUID(), email, productId, kind, createdAt: new Date().toISOString(),
        targetPrice: kind === "price_drop" ? Number(b?.targetPrice) || p.price : undefined,
      });
    });
    return ok({ ok: true }, 201);
  } catch (e) {
    return fail(e instanceof Error ? e.message : "Failed", 400);
  }
}
