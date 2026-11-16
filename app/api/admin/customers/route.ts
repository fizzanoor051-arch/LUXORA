import { read } from "@/lib/server/db";
import { ok, requireAdmin } from "@/lib/server/http";

export const dynamic = "force-dynamic";

export async function GET() {
  const a = await requireAdmin();
  if (a instanceof Response) return a;
  const customers = await read((db) =>
    db.users.filter((u) => u.role === "customer").map((u) => {
      const mine = db.orders.filter((o) => o.userId === u.id && o.status !== "cancelled");
      const spent = mine.reduce((s, o) => s + o.total, 0);
      const segment = spent >= 300 ? "VIP" : mine.length >= 2 ? "Repeat" : mine.length === 1 ? "New buyer" : "No orders";
      return {
        id: u.id, name: u.name, email: u.email, joined: u.createdAt, orders: mine.length,
        spent: Math.round(spent * 100) / 100, lastOrder: mine.map((o) => o.createdAt).sort().pop() ?? null, segment,
      };
    }).sort((a, b) => b.spent - a.spent)
  );
  return ok({ customers });
}
