import { randomUUID } from "crypto";
import { transaction } from "@/lib/server/db";
import { fail, getUser, json, ok, str } from "@/lib/server/http";

// Only customers who actually ordered the product (not cancelled) can review it.
export async function POST(req: Request) {
  const user = await getUser();
  if (!user) return fail("Please sign in to review", 401);
  const body = await json<{ productId?: string; rating?: number; comment?: string }>(req);
  const productId = str(body?.productId, 80);
  const rating = Math.round(Number(body?.rating));
  const comment = str(body?.comment, 1000);
  if (!productId || !(rating >= 1 && rating <= 5)) return fail("Rating must be 1-5");
  if (comment.length < 5) return fail("Please write a short review");
  try {
    const review = await transaction((db) => {
      const bought = db.orders.some(
        (o) => o.userId === user.id && o.status !== "cancelled" && o.items.some((i) => i.productId === productId)
      );
      if (!bought) throw new Error("Only verified buyers can review this product");
      if (db.reviews.some((r) => r.productId === productId && r.userId === user.id)) {
        throw new Error("You already reviewed this product");
      }
      const prod = db.products.find((p) => p.id === productId);
      if (!prod) throw new Error("Product not found");
      const r = { id: randomUUID(), productId, userId: user.id, userName: user.name, rating, comment, createdAt: new Date().toISOString() };
      db.reviews.push(r);
      const all = db.reviews.filter((x) => x.productId === productId);
      prod.rating = Math.round((all.reduce((s, x) => s + x.rating, 0) / all.length) * 10) / 10;
      prod.reviews = all.length;
      return r;
    });
    return ok({ review }, 201);
  } catch (e) {
    return fail(e instanceof Error ? e.message : "Could not save review", 400);
  }
}
