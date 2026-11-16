"use client";

import Link from "next/link";
import { useAdminFetch } from "@/components/admin/useAdminFetch";
import type { Product } from "@/types/product";

export default function AdminCategories() {
  const { data, loading, error } = useAdminFetch<{ items: Product[] }>("/api/products?limit=60");
  const map = new Map<string, { count: number; stock: number; value: number }>();
  for (const p of data?.items ?? []) {
    const c = map.get(p.category) ?? { count: 0, stock: 0, value: 0 };
    c.count += 1; c.stock += p.stock; c.value += p.price * p.stock;
    map.set(p.category, c);
  }
  return (
    <div className="space-y-6">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8d5c91]">Catalog</p>
        <h1 className="mt-1 font-serif text-4xl">Categories</h1>
        <p className="mt-1 text-sm text-[#21152b]/50">Counts are calculated live from your products.</p>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {loading && !data && <p className="text-sm text-[#21152b]/50">Loading…</p>}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {[...map.entries()].map(([name, c]) => (
          <Link key={name} href={`/categories/${name.toLowerCase()}`} className="rounded-2xl border border-[#21152b]/[0.08] bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-md">
            <h2 className="font-serif text-2xl">{name}</h2>
            <p className="mt-3 text-sm text-[#21152b]/60">{c.count} products · {c.stock} units · ${c.value.toFixed(0)} stock value</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
