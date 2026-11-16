"use client";

import { useMemo, useState } from "react";
import { useAdminFetch } from "@/components/admin/useAdminFetch";

interface C { id: string; name: string; email: string; joined: string; orders: number; spent: number; lastOrder: string | null; segment: string }

export default function AdminCustomers() {
  const { data, error, loading } = useAdminFetch<{ customers: C[] }>("/api/admin/customers");
  const [q, setQ] = useState("");
  const [seg, setSeg] = useState("");
  const rows = useMemo(() => (data?.customers ?? []).filter((c) => (!seg || c.segment === seg) && `${c.name} ${c.email}`.toLowerCase().includes(q.toLowerCase())), [data, q, seg]);
  const count = (s: string) => data?.customers.filter((c) => c.segment === s).length ?? 0;
  const field = "rounded-xl border border-[#21152b]/15 bg-white px-4 py-2.5 text-sm";
  return (
    <div className="space-y-6">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8d5c91]">Customers</p>
        <h1 className="mt-1 font-serif text-4xl">Customer Management</h1>
        <p className="mt-1 text-sm text-[#21152b]/50">VIP = $300+ spent · Repeat = 2+ orders · New buyer = 1 order</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name or email" className={`${field} w-64`} aria-label="Search customers" />
        <select value={seg} onChange={(e) => setSeg(e.target.value)} className={field} aria-label="Segment">
          <option value="">All segments</option>
          {["VIP", "Repeat", "New buyer", "No orders"].map((s) => <option key={s} value={s}>{s} ({count(s)})</option>)}
        </select>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {loading && !data && <p className="text-sm text-[#21152b]/50">Loading…</p>}
      <div className="overflow-x-auto rounded-2xl border border-[#21152b]/[0.08] bg-white">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase tracking-widest text-[#21152b]/40"><tr><th className="p-4">Customer</th><th>Segment</th><th>Orders</th><th>Spent</th><th>Last order</th><th>Joined</th></tr></thead>
          <tbody className="divide-y divide-[#21152b]/10">
            {rows.map((c) => (
              <tr key={c.id}><td className="p-4"><span className="font-medium">{c.name}</span><span className="block text-xs text-[#21152b]/40">{c.email}</span></td><td>{c.segment}</td><td>{c.orders}</td><td>${c.spent.toFixed(2)}</td><td>{c.lastOrder?.slice(0, 10) ?? "-"}</td><td>{c.joined.slice(0, 10)}</td></tr>
            ))}
            {rows.length === 0 && data && <tr><td colSpan={6} className="p-8 text-center text-[#21152b]/50">No customers match.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
