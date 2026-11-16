import { randomUUID } from "crypto";
import { transaction, read, type OrderRec } from "@/lib/server/db";
import { priceCart } from "@/lib/server/pricing";
import { orderConfirmationText, sendMail } from "@/lib/server/mail";
import { fail, getUser, isEmail, json, ok, rateLimit, str } from "@/lib/server/http";

type Body = {
  items?: { productId: string; quantity: number }[];
  email?: string;
  shipping?: { name?: string; phone?: string; address?: string; city?: string; postalCode?: string };
  paymentMethod?: string;
  couponCode?: string;
  idempotencyKey?: string;
};

export async function POST(req: Request) {
  if (!rateLimit(req, "order", 12)) return fail("Too many requests", 429);
  const body = await json<Body>(req);
  if (!body) return fail("Invalid request");

  const user = await getUser();
  const email = (user?.email ?? str(body.email, 254)).toLowerCase();
  if (!isEmail(email)) return fail("Please enter a valid email address");

  const s = body.shipping ?? {};
  const shipping = {
    name: str(s.name, 100),
    phone: str(s.phone, 30),
    address: str(s.address, 200),
    city: str(s.city, 80),
    postalCode: str(s.postalCode, 20),
  };
  if (shipping.name.length < 2) return fail("Please enter your full name");
  if (shipping.address.length < 5) return fail("Please enter your address");
  if (shipping.city.length < 2) return fail("Please enter your city");
  if (!/^[+\d][\d\s-]{6,}$/.test(shipping.phone)) return fail("Please enter a valid phone number");

  // Card payments need a verified provider (webhook). COD works immediately.
  const paymentMethod = body.paymentMethod === "card" ? "card" : "cod";
  if (paymentMethod === "card" && !process.env.PAYMENT_WEBHOOK_SECRET) {
    return fail("Online card payment is not enabled yet. Please choose Cash on Delivery.", 400);
  }
  const key = str(body.idempotencyKey, 80) || undefined;

  let created = false;
  try {
    const order = await transaction((db): OrderRec => {
      if (key) {
        const dup = db.orders.find((o) => o.idempotencyKey === key);
        if (dup) return dup; // duplicate submit -> return the same order
      }
      const priced = priceCart(db, body.items ?? [], str(body.couponCode, 40));
      if (!priced.ok) throw new Error(priced.error);
      const p = priced.pricing;

      // stock check + deduction (inside the serialized transaction)
      for (const line of p.lines) {
        const prod = db.products.find((x) => x.id === line.productId)!;
        if (prod.stock < line.quantity) throw new Error(`Only ${prod.stock} left of "${prod.name}"`);
      }
      for (const line of p.lines) {
        db.products.find((x) => x.id === line.productId)!.stock -= line.quantity;
      }
      if (p.couponCode) {
        const c = db.coupons.find((x) => x.code === p.couponCode);
        if (c) c.used += 1;
      }
      db.counters.order += 1;
      const now = new Date().toISOString();
      const rec: OrderRec = {
        id: randomUUID(),
        number: `LX-${db.counters.order}`,
        userId: user?.id ?? null,
        email,
        items: p.lines.map((l) => ({
          productId: l.productId, name: l.name, image: l.image, unitPrice: l.unitPrice, quantity: l.quantity,
        })),
        shipping,
        subtotal: p.subtotal,
        discount: p.discount,
        shippingFee: p.shipping,
        tax: p.tax,
        total: p.total,
        couponCode: p.couponCode,
        paymentMethod,
        paymentStatus: "pending",
        status: "placed",
        history: [{ status: "placed", at: now }],
        idempotencyKey: key,
        createdAt: now,
      };
      db.orders.push(rec);
      created = true;
      return rec;
    });
    if (created) {
      // fire-and-forget; never block or fail the order because of email
      sendMail(order.email, `Your LUXORA order ${order.number}`, orderConfirmationText(order)).catch(() => undefined);
    }
    return ok({ order: { number: order.number, total: order.total, status: order.status, paymentStatus: order.paymentStatus, email: order.email } }, 201);
  } catch (e) {
    return fail(e instanceof Error ? e.message : "Could not place order", 400);
  }
}

// My orders (logged-in customers)
export async function GET() {
  const user = await getUser();
  if (!user) return fail("Not authenticated", 401);
  const orders = await read((db) =>
    db.orders.filter((o) => o.userId === user.id).sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  );
  return ok({ orders });
}
