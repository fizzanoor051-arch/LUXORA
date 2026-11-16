import { read } from "@/lib/server/db";
import { fail, getUser, ok, rateLimit } from "@/lib/server/http";

// Order tracking: order number + the email used at checkout (or logged-in owner / admin).
export async function GET(req: Request, ctx: { params: Promise<{ number: string }> }) {
  if (!rateLimit(req, "track", 20)) return fail("Too many requests", 429);
  const { number } = await ctx.params;
  const email = (new URL(req.url).searchParams.get("email") || "").toLowerCase().trim();
  const user = await getUser();
  const order = await read((db) => db.orders.find((o) => o.number.toLowerCase() === number.toLowerCase()) ?? null);
  const allowed =
    order && (user?.role === "admin" || (user && order.userId === user.id) || (email && order.email === email));
  if (!order || !allowed) return fail("Order not found", 404);
  return ok({ order });
}
