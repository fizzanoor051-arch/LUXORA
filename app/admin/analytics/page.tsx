"use client";

import { useState } from "react";
import Bars from "@/components/admin/Bars";
import { useAdminFetch } from "@/components/admin/useAdminFetch";

interface A {
  days: number; revenue: number; orders: number; aov: number; visitors: number; conversionRate: number; repeatCustomerRate: number;
  byDay: { date: string; revenue: number; orders: number; visitors: number }[];
  categories: { name: string; value: number }[];
  funnel: { step: string; count: number }[];
  topPages: [string, number][]; topProducts: { name: string; views: number }[]; topSearches: [string, number][];
  coupons: { code: string; uses: number }[]; paymentMix: [string, number][]; hasTrafficData: boolean;
}
const card = "rounded-2xl border border-[#21152b]/[0.08] bg-white p-6";

export default function AdminAnalytics() {
  const [days, setDays] = useState(30);
  const { data, error, loading } = useAdminFetch<A>(`/api/admin/analytics?days=${days}`);
  if (error) return <p className="text-sm text-red-600">{error}</p>;
  if (!data) return <p className="text-sm text-[#21152b]/50">{loading ? "Loading analytics…" : ""}</p>;
  const top = Math.max(1, data.funnel[0]?.count || 1);
  const tiles: [string, string][] = [
    ["Revenue", `$${data.revenue.toFixed(2)}`], ["Orders", String(data.orders)], ["Avg. order value", `$${data.aov.toFixed(2)}`],
    ["Visitors", String(data.visitors)], ["Conversion rate", `${data.conversionRate}%`], ["Repeat customers", `${data.repeatCustomerRate}%`],
  ];
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8d5c91]">Analytics</p>
          <h1 className="mt-1 font-serif text-4xl">Store Analytics</h1>
          <p className="mt-1 text-sm text-[#21152b]/50">Live from your orders and first-party visitor events. No sample data.</p>
        </div>
        <select value={days} onChange={(e) => setDays(Number(e.target.value))} aria-label="Date range" className="rounded-xl border border-[#21152b]/15 bg-white px-4 py-2 text-sm">
          {[7, 14, 30, 60, 90].map((d) => <option key={d} value={d}>Last {d} days</option>)}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
        {tiles.map(([l, v]) => <div key={l} className={card}><p className="text-xs text-[#21152b]/50">{l}</p><p className="mt-2 font-serif text-3xl">{v}</p></div>)}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className={card}><h2 className="font-serif text-xl">Revenue per day</h2><div className="mt-5"><Bars money label="Revenue per day" data={data.byDay.map((d) => ({ key: d.date, value: d.revenue }))} /></div></div>
        <div className={card}><h2 className="font-serif text-xl">Visitors per day</h2><div className="mt-5"><Bars color="#c9a56a" label="Visitors per day" data={data.byDay.map((d) => ({ key: d.date, value: d.visitors }))} /></div></div>
      </div>

      <div className={card}>
        <h2 className="font-serif text-xl">Conversion funnel</h2>
        {!data.hasTrafficData && <p className="mt-2 text-sm text-[#21152b]/50">Visitor data appears as soon as people browse the store.</p>}
        <ul className="mt-5 space-y-3">
          {data.funnel.map((f) => (
            <li key={f.step}>
              <div className="flex justify-between text-sm"><span>{f.step}</span><span>{f.count}</span></div>
              <div className="mt-1 h-2 rounded bg-[#21152b]/10"><div className="h-2 rounded bg-[#8d5c91]" style={{ width: `${Math.min(100, (f.count / top) * 100)}%` }} /></div>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <List title="Sales by category" rows={data.categories.map((c) => [c.name, `$${c.value.toFixed(2)}`])} />
        <List title="Most viewed products" rows={data.topProducts.map((p) => [p.name, `${p.views} views`])} />
        <List title="Top pages" rows={data.topPages.map(([p, n]) => [p, String(n)])} />
        <List title="Top searches" rows={data.topSearches.map(([q, n]) => [q, String(n)])} />
        <List title="Coupon usage" rows={data.coupons.map((c) => [c.code, `${c.uses} orders`])} />
        <List title="Payment methods" rows={data.paymentMix.map(([m, n]) => [m.toUpperCase(), String(n)])} />
      </div>
    </div>
  );
}

function List({ title, rows }: { title: string; rows: string[][] }) {
  return (
    <div className={card}>
      <h2 className="font-serif text-xl">{title}</h2>
      {rows.length === 0 ? <p className="mt-4 text-sm text-[#21152b]/50">No data yet.</p> : (
        <ul className="mt-4 divide-y divide-[#21152b]/10 text-sm">
          {rows.map(([a, b]) => <li key={a} className="flex justify-between gap-3 py-2.5"><span className="truncate">{a}</span><span className="shrink-0 text-[#21152b]/60">{b}</span></li>)}
        </ul>
      )}
    </div>
  );
}
