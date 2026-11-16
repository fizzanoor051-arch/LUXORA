import { read } from "@/lib/server/db";
import { ok, requireAdmin } from "@/lib/server/http";

export const dynamic = "force-dynamic";

export async function GET() {
  const admin = await requireAdmin();
  if (admin instanceof Response) return admin;
  const stats = await read((db) => {
    const live = db.orders.filter((o) => o.status !== "cancelled");
    const revenue = live.reduce((s, o) => s + o.total, 0);
    const sold = new Map<string, { name: string; qty: number; revenue: number }>();
    for (const o of live) for (const i of o.items) {
      const cur = sold.get(i.productId) ?? { name: i.name, qty: 0, revenue: 0 };
      cur.qty += i.quantity; cur.revenue += i.quantity * i.unitPrice;
      sold.set(i.productId, cur);
    }
    const days: Record<string, number> = {};
    for (let d = 13; d >= 0; d--) {
      days[new Date(Date.now() - d * 86400000).toISOString().slice(0, 10)] = 0;
    }
    for (const o of live) { const k = o.createdAt.slice(0, 10); if (k in days) days[k] += o.total; }
    return {
      totalOrders: db.orders.length,
      revenue: Math.round(revenue * 100) / 100,
      averageOrderValue: live.length ? Math.round((revenue / live.length) * 100) / 100 : 0,
      customers: db.users.filter((u) => u.role === "customer").length,
      subscribers: db.newsletter.length,
      lowStock: db.products.filter((p) => p.stock <= 5).map((p) => ({ id: p.id, name: p.name, stock: p.stock })),
      bestSellers: [...sold.values()].sort((a, b) => b.qty - a.qty).slice(0, 5),
      salesByDay: Object.entries(days).map(([date, total]) => ({ date, total: Math.round(total * 100) / 100 })),
      recentOrders: [...db.orders].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 8)
        .map((o) => ({ number: o.number, email: o.email, total: o.total, status: o.status, createdAt: o.createdAt })),
    };
  });
  return ok(stats);
}
