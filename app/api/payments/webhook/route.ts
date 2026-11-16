import { createHmac, timingSafeEqual } from "crypto";
import { transaction } from "@/lib/server/db";
import { fail, ok } from "@/lib/server/http";

/**
 * Payment provider webhook. An order is NEVER marked paid from the browser -
 * only here, after verifying an HMAC-SHA256 signature of the raw body.
 * Adapt the signature header/format to your provider (Stripe, etc.).
 * Body: { "orderNumber": "LX-1001", "status": "paid" | "failed" }
 */
export async function POST(req: Request) {
  const secret = process.env.PAYMENT_WEBHOOK_SECRET;
  if (!secret) return fail("Webhook not configured", 503);
  const raw = await req.text();
  const sig = req.headers.get("x-luxora-signature") || "";
  const expected = createHmac("sha256", secret).update(raw).digest("hex");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return fail("Invalid signature", 401);

  let data: { orderNumber?: string; status?: string };
  try { data = JSON.parse(raw); } catch { return fail("Bad payload"); }
  const status = data.status === "paid" ? "paid" : data.status === "failed" ? "failed" : null;
  if (!data.orderNumber || !status) return fail("Bad payload");

  const found = await transaction((db) => {
    const o = db.orders.find((x) => x.number === data.orderNumber);
    if (!o) return false;
    o.paymentStatus = status;
    if (status === "paid" && o.status === "placed") {
      o.status = "confirmed";
      o.history.push({ status: "confirmed", at: new Date().toISOString() });
    }
    return true;
  });
  return found ? ok({ ok: true }) : fail("Order not found", 404);
}
