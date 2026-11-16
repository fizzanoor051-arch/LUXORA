"use client";

import { useState } from "react";
import { adminSend, useAdminFetch } from "@/components/admin/useAdminFetch";

const STATUSES = ["placed", "confirmed", "processing", "shipped", "delivered", "cancelled"];

interface Order {
  id: string;
  number: string;
  email: string;
  total: number;
  status: string;
  paymentMethod: string;
  paymentStatus: string;
  createdAt: string;
  shipping: { name: string; phone: string; address: string; city: string };
  items: { name: string; quantity: number }[];
}

export default function AdminOrders() {
  const { data, error, loading, reload } = useAdminFetch<{ orders: Order[] }>("/api/admin/orders");
  const [msg, setMsg] = useState("");

  async function update(id: string, body: object) {
    setMsg("");
    const r = await adminSend(`/api/admin/orders/${id}`, "PATCH", body);
    if (!r.ok) setMsg(r.error || "Update failed");
    reload();
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8d5c91]">Orders</p>
        <h1 className="mt-1 font-serif text-4xl">Order Management</h1>
      </div>
      {msg && <p className="text-sm text-red-600">{msg}</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
      {loading && !data && <p className="text-sm text-[#21152b]/50">Loading…</p>}
      {data && data.orders.length === 0 && <p className="rounded-2xl border border-[#21152b]/10 bg-white p-8 text-sm text-[#21152b]/60">No orders yet. They appear here as soon as customers check out.</p>}

      <div className="space-y-4">
        {data?.orders.map((o) => (
          <article key={o.id} className="rounded-2xl border border-[#21152b]/[0.08] bg-white p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-serif text-2xl">{o.number}</p>
                <p className="text-xs text-[#21152b]/50">{o.createdAt.replace("T", " ").slice(0, 16)} · {o.email}</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-lg font-medium">${o.total.toFixed(2)}</span>
                <select value={o.status} onChange={(e) => update(o.id, { status: e.target.value })} aria-label={`Status of ${o.number}`} className="rounded-xl border border-[#21152b]/15 bg-white px-3 py-2 text-sm capitalize">
                  {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#21152b]/40">Ship to</p>
                <p className="mt-1">{o.shipping.name}, {o.shipping.address}, {o.shipping.city}</p>
                <p className="text-[#21152b]/60">{o.shipping.phone}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-[#21152b]/40">Items</p>
                <p className="mt-1">{o.items.map((i) => `${i.name} ×${i.quantity}`).join(", ")}</p>
                <p className="mt-1 text-[#21152b]/60">
                  {o.paymentMethod.toUpperCase()} · {o.paymentStatus}
                  {o.paymentMethod === "cod" && o.paymentStatus !== "paid" && (
                    <button onClick={() => update(o.id, { paymentStatus: "paid" })} className="ml-3 underline">Mark cash received</button>
                  )}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
