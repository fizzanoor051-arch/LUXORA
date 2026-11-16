"use client";

import { FormEvent, useState } from "react";
import { adminSend } from "@/components/admin/useAdminFetch";
import { useAdminFetch } from "@/components/admin/useAdminFetch";
import type { Product } from "@/types/product";

const CATS = ["Makeup", "Jewelry", "Fashion", "Shoes", "Bags", "Watches", "Gifts", "Toys", "Lifestyle"];

export default function AdminProducts() {
  const { data, error, loading, reload } = useAdminFetch<{ items: Product[]; total: number }>("/api/products?limit=60&sort=newest");
  const [msg, setMsg] = useState("");
  const [open, setOpen] = useState(false);

  async function patch(id: string, body: object) {
    const r = await adminSend(`/api/admin/products/${id}`, "PATCH", body);
    setMsg(r.ok ? "Saved" : r.error || "Failed");
    reload();
  }
  async function remove(p: Product) {
    if (!confirm(`Delete "${p.name}"?`)) return;
    const r = await adminSend(`/api/admin/products/${p.id}`, "DELETE");
    setMsg(r.ok ? "Deleted" : r.error || "Failed");
    reload();
  }
  async function create(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const r = await adminSend("/api/admin/products", "POST", {
      name: f.get("name"), category: f.get("category"), price: Number(f.get("price")),
      oldPrice: Number(f.get("oldPrice") || 0) || undefined, stock: Number(f.get("stock") || 0),
      image: f.get("image"), description: f.get("description"),
    });
    setMsg(r.ok ? "Product created" : r.error || "Failed");
    if (r.ok) { form.reset(); setOpen(false); reload(); }
  }

  const field = "rounded-xl border border-[#21152b]/15 bg-white px-4 py-3 text-sm";

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8d5c91]">Catalog</p>
          <h1 className="mt-1 font-serif text-4xl">Products</h1>
          <p className="mt-1 text-sm text-[#21152b]/50">{data ? `${data.total} products` : ""} · edit price and stock inline</p>
        </div>
        <button onClick={() => setOpen(!open)} className="rounded-xl bg-[#21152b] px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white">{open ? "Close" : "Add product"}</button>
      </div>

      {open && (
        <form onSubmit={create} className="grid gap-3 rounded-2xl border border-[#21152b]/[0.08] bg-white p-6 sm:grid-cols-2">
          <input name="name" required placeholder="Product name" className={field} />
          <select name="category" className={field}>{CATS.map((c) => <option key={c}>{c}</option>)}</select>
          <input name="price" type="number" step="0.01" required placeholder="Price $" className={field} />
          <input name="oldPrice" type="number" step="0.01" placeholder="Old price $ (optional)" className={field} />
          <input name="stock" type="number" required placeholder="Stock" className={field} />
          <input name="image" placeholder="Image path, e.g. /images/prouducts/bags/tote-bag.jpg" className={field} />
          <textarea name="description" placeholder="Description" rows={3} className={`${field} sm:col-span-2`} />
          <button className="rounded-xl bg-[#8d5c91] px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white sm:col-span-2">Create product</button>
        </form>
      )}

      {msg && <p role="status" className="text-sm text-[#21152b]/70">{msg}</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
      {loading && !data && <p className="text-sm text-[#21152b]/50">Loading…</p>}

      <div className="overflow-x-auto rounded-2xl border border-[#21152b]/[0.08] bg-white">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase tracking-widest text-[#21152b]/40">
            <tr><th className="p-4">Product</th><th>Category</th><th>Price $</th><th>Stock</th><th /></tr>
          </thead>
          <tbody className="divide-y divide-[#21152b]/10">
            {data?.items.map((p) => (
              <tr key={p.id}>
                <td className="p-4"><span className="font-medium">{p.name}</span><span className="block text-xs text-[#21152b]/40">{p.sku}</span></td>
                <td>{p.category}</td>
                <td><Inline value={p.price} onSave={(v) => patch(p.id, { price: v })} label={`Price of ${p.name}`} /></td>
                <td><Inline value={p.stock} onSave={(v) => patch(p.id, { stock: v })} label={`Stock of ${p.name}`} low={p.stock <= 5} /></td>
                <td className="pr-4 text-right"><button onClick={() => remove(p)} className="text-xs uppercase tracking-widest text-red-600 hover:underline">Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Inline({ value, onSave, label, low }: { value: number; onSave: (v: number) => void; label: string; low?: boolean }) {
  const [v, setV] = useState(String(value));
  return (
    <input
      aria-label={label}
      value={v}
      onChange={(e) => setV(e.target.value)}
      onBlur={() => Number(v) !== value && Number(v) >= 0 && onSave(Number(v))}
      onKeyDown={(e) => e.key === "Enter" && (e.target as HTMLInputElement).blur()}
      className={`w-24 rounded-lg border px-3 py-2 ${low ? "border-red-300 text-red-600" : "border-[#21152b]/15"}`}
    />
  );
}
