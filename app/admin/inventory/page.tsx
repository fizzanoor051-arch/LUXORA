"use client";

import { useState } from "react";
import { adminSend, useAdminFetch } from "@/components/admin/useAdminFetch";
import type { Product } from "@/types/product";

export default function AdminInventory() {
  const { data, error, loading, reload } = useAdminFetch<{ items: Product[] }>("/api/products?limit=60&sort=newest");
  const [filter, setFilter] = useState<"all" | "low" | "out">("all");
  const [msg, setMsg] = useState("");
  const items = (data?.items ?? []).filter((p) => (filter === "low" ? p.stock > 0 && p.stock <= 5 : filter === "out" ? p.stock === 0 : true));
  const value = (data?.items ?? []).reduce((s, p) => s + p.price * p.stock, 0);
  const units = (data?.items ?? []).reduce((s, p) => s + p.stock, 0);

  async function restock(p: Product, add: number) {
    const r = await adminSend(`/api/admin/products/${p.id}`, "PATCH", { stock: p.stock + add });
    setMsg(r.ok ? `${p.name}: +${add}` : r.error || "Failed");
    reload();
  }
  return (
    <div className="space-y-6">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8d5c91]">Inventory</p>
        <h1 className="mt-1 font-serif text-4xl">Stock Control</h1>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {[["Units in stock", String(units)], ["Stock value (retail)", `$${value.toFixed(0)}`], ["Out of stock", String((data?.items ?? []).filter((p) => p.stock === 0).length)]].map(([l, v]) => (
          <div key={l} className="rounded-2xl border border-[#21152b]/[0.08] bg-white p-6"><p className="text-xs text-[#21152b]/50">{l}</p><p className="mt-2 font-serif text-3xl">{v}</p></div>
        ))}
      </div>
      <div className="flex gap-2">
        {(["all", "low", "out"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`rounded-full px-4 py-2 text-xs uppercase tracking-widest ${filter === f ? "bg-[#21152b] text-white" : "border border-[#21152b]/15"}`}>{f === "all" ? "All" : f === "low" ? "Low (≤5)" : "Out of stock"}</button>
        ))}
      </div>
      {msg && <p role="status" className="text-sm text-[#21152b]/70">{msg}</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
      {loading && !data && <p className="text-sm text-[#21152b]/50">Loading…</p>}
      <div className="overflow-x-auto rounded-2xl border border-[#21152b]/[0.08] bg-white">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase tracking-widest text-[#21152b]/40"><tr><th className="p-4">Product</th><th>SKU</th><th>Stock</th><th>Restock</th></tr></thead>
          <tbody className="divide-y divide-[#21152b]/10">
            {items.map((p) => (
              <tr key={p.id}>
                <td className="p-4 font-medium">{p.name}</td><td className="text-[#21152b]/50">{p.sku}</td>
                <td className={p.stock === 0 ? "font-medium text-red-600" : p.stock <= 5 ? "text-amber-600" : ""}>{p.stock}</td>
                <td className="space-x-2">{[5, 10, 25].map((n) => <button key={n} onClick={() => restock(p, n)} className="rounded-lg border border-[#21152b]/15 px-3 py-1.5 text-xs hover:bg-[#21152b] hover:text-white">+{n}</button>)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
