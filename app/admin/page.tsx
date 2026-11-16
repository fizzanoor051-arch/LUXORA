"use client";

import Link from "next/link";
import { useAdminFetch } from "@/components/admin/useAdminFetch";

interface Stats {
  totalOrders: number;
  revenue: number;
  averageOrderValue: number;
  customers: number;
  subscribers: number;
  lowStock: { id: string; name: string; stock: number }[];
  bestSellers: { name: string; qty: number; revenue: number }[];
  salesByDay: { date: string; total: number }[];
  recentOrders: { number: string; email: string; total: number; status: string; createdAt: string }[];
}

const card = "rounded-2xl border border-[#21152b]/[0.08] bg-white p-6";

export default function AdminOverview() {
  const { data, error, loading } = useAdminFetch<Stats>("/api/admin/stats");
  if (loading && !data) return <p className="text-sm text-[#21152b]/50">Loading dashboard…</p>;
  if (error || !data) return <p className="text-sm text-red-600">{error || "No data"}</p>;

  const max = Math.max(1, ...data.salesByDay.map((d) => d.total));
  const tiles: [string, string][] = [
    ["Total Revenue", `$${data.revenue.toFixed(2)}`],
    ["Total Orders", String(data.totalOrders)],
    ["Average Order Value", `$${data.averageOrderValue.toFixed(2)}`],
    ["Customers", String(data.customers)],
    ["Newsletter Subscribers", String(data.subscribers)],
  ];

  return (
    <div className="space-y-8">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8d5c91]">Overview</p>
        <h1 className="mt-1 font-serif text-4xl">Store Dashboard</h1>
        <p className="mt-1 text-sm text-[#21152b]/50">Live numbers from your database. Nothing here is sample data.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {tiles.map(([label, value]) => (
          <div key={label} className={card}>
            <p className="text-xs text-[#21152b]/50">{label}</p>
            <p className="mt-2 font-serif text-3xl">{value}</p>
          </div>
        ))}
      </div>

      <div className={card}>
        <h2 className="font-serif text-xl">Sales – last 14 days</h2>
        <div className="mt-6 flex h-40 items-end gap-2" role="img" aria-label="Sales by day">
          {data.salesByDay.map((d) => (
            <div key={d.date} className="flex flex-1 flex-col items-center gap-2">
              <div className="w-full rounded-t bg-[#8d5c91]" style={{ height: `${(d.total / max) * 100}%`, minHeight: d.total ? 4 : 1 }} title={`${d.date}: $${d.total}`} />
              <span className="text-[9px] text-[#21152b]/40">{d.date.slice(8)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className={card}>
          <h2 className="font-serif text-xl">Best sellers</h2>
          {data.bestSellers.length === 0 ? <p className="mt-4 text-sm text-[#21152b]/50">No sales yet.</p> : (
            <ul className="mt-4 divide-y divide-[#21152b]/10 text-sm">
              {data.bestSellers.map((b) => (
                <li key={b.name} className="flex justify-between py-3"><span>{b.name}</span><span>{b.qty} sold · ${b.revenue.toFixed(2)}</span></li>
              ))}
            </ul>
          )}
        </div>
        <div className={card}>
          <h2 className="font-serif text-xl">Low stock (5 or fewer)</h2>
          {data.lowStock.length === 0 ? <p className="mt-4 text-sm text-[#21152b]/50">All products are well stocked.</p> : (
            <ul className="mt-4 divide-y divide-[#21152b]/10 text-sm">
              {data.lowStock.map((p) => (
                <li key={p.id} className="flex justify-between py-3"><span>{p.name}</span><span className="text-red-600">{p.stock} left</span></li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className={card}>
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl">Recent orders</h2>
          <Link href="/admin/orders" className="text-xs font-semibold uppercase tracking-widest text-[#8d5c91]">View all</Link>
        </div>
        {data.recentOrders.length === 0 ? <p className="mt-4 text-sm text-[#21152b]/50">No orders yet.</p> : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-[#21152b]/10">
                {data.recentOrders.map((o) => (
                  <tr key={o.number}><td className="py-3 font-medium">{o.number}</td><td>{o.email}</td><td>${o.total.toFixed(2)}</td><td className="capitalize">{o.status}</td><td className="text-[#21152b]/50">{o.createdAt.slice(0, 10)}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
