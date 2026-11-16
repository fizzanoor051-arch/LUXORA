import { read } from "@/lib/server/db";
import { ok, requireAdmin } from "@/lib/server/http";

export const dynamic = "force-dynamic";

const r2 = (n: number) => Math.round(n * 100) / 100;

export async function GET(req: Request) {
  const a = await requireAdmin();
  if (a instanceof Response) return a;
  const days = Math.min(90, Math.max(7, Number(new URL(req.url).searchParams.get("days") || 30)));
  const since = new Date(Date.now() - days * 86400000).toISOString();

  const data = await read((db) => {
    const orders = db.orders.filter((o) => o.createdAt >= since && o.status !== "cancelled");
    const events = db.events.filter((e) => e.at >= since);

    const byDay: Record<string, { revenue: number; orders: number; visitors: Set<string> }> = {};
    for (let d = days - 1; d >= 0; d--) byDay[new Date(Date.now() - d * 86400000).toISOString().slice(0, 10)] = { revenue: 0, orders: 0, visitors: new Set() };
    for (const o of orders) { const k = o.createdAt.slice(0, 10); if (byDay[k]) { byDay[k].revenue += o.total; byDay[k].orders += 1; } }
    for (const e of events) { const k = e.at.slice(0, 10); if (byDay[k]) byDay[k].visitors.add(e.sid); }

    const catRev: Record<string, number> = {};
    const catOf = new Map(db.products.map((p) => [p.id, p.category]));
    for (const o of orders) for (const i of o.items) {
      const c = catOf.get(i.productId) ?? "Other";
      catRev[c] = (catRev[c] ?? 0) + i.unitPrice * i.quantity;
    }

    const sessions = (t: string) => new Set(events.filter((e) => e.type === t).map((e) => e.sid));
    const visitors = new Set(events.map((e) => e.sid));
    const funnel = [
      { step: "Visitors", count: visitors.size },
      { step: "Viewed a product", count: sessions("product_view").size },
      { step: "Added to bag", count: sessions("add_to_cart").size },
      { step: "Started checkout", count: sessions("begin_checkout").size },
      { step: "Placed order", count: orders.length },
    ];

    const tally = (list: (string | undefined)[], n = 8) => {
      const m = new Map<string, number>();
      for (const v of list) if (v) m.set(v, (m.get(v) ?? 0) + 1);
      return [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, n);
    };
    const nameOf = new Map(db.products.map((p) => [p.id, p.name]));
    const coupons = tally(orders.map((o) => o.couponCode));
    const revenue = orders.reduce((s, o) => s + o.total, 0);
    const buyers = new Map<string, number>();
    for (const o of db.orders.filter((o) => o.status !== "cancelled")) buyers.set(o.email, (buyers.get(o.email) ?? 0) + 1);

    return {
      days, revenue: r2(revenue), orders: orders.length, aov: orders.length ? r2(revenue / orders.length) : 0,
      visitors: visitors.size,
      conversionRate: visitors.size ? r2((orders.length / visitors.size) * 100) : 0,
      repeatCustomerRate: buyers.size ? r2(([...buyers.values()].filter((n) => n > 1).length / buyers.size) * 100) : 0,
      byDay: Object.entries(byDay).map(([date, v]) => ({ date, revenue: r2(v.revenue), orders: v.orders, visitors: v.visitors.size })),
      categories: Object.entries(catRev).map(([name, value]) => ({ name, value: r2(value) })).sort((a, b) => b.value - a.value),
      funnel,
      topPages: tally(events.filter((e) => e.type === "page_view").map((e) => e.path)),
      topProducts: tally(events.filter((e) => e.type === "product_view").map((e) => e.productId)).map(([id, n]) => ({ name: nameOf.get(id) ?? id, views: n })),
      topSearches: tally(events.filter((e) => e.type === "search").map((e) => e.q)),
      coupons: coupons.map(([code, n]) => ({ code, uses: n })),
      paymentMix: tally(orders.map((o) => o.paymentMethod)),
      hasTrafficData: events.length > 0,
    };
  });
  return ok(data);
}
