"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";

import type { Product } from "@/types/product";
import ProductCard from "@/components/products/ProductCard";
import { track } from "@/lib/track";

const CATEGORIES = ["Makeup", "Jewelry", "Fashion", "Shoes", "Bags", "Watches", "Gifts", "Toys", "Lifestyle"];
const SORTS: [string, string][] = [
  ["featured", "Featured"],
  ["newest", "Newest"],
  ["price-asc", "Price: Low to High"],
  ["price-desc", "Price: High to Low"],
  ["rating", "Top Rated"],
  ["popular", "Most Popular"],
];
const PAGE = 12;

export default function ShopBrowser({
  initialQuery = "",
  initialCategory = "",
  initialSort = "featured",
  initialSale = false,
  title = "The Collection",
}: {
  initialQuery?: string;
  initialCategory?: string;
  initialSort?: string;
  initialSale?: boolean;
  title?: string;
}) {
  const [q, setQ] = useState(initialQuery);
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState(initialSort);
  const [sale, setSale] = useState(initialSale);
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [inStock, setInStock] = useState(false);
  const [rating, setRating] = useState(0);
  const [limit, setLimit] = useState(PAGE);
  const [items, setItems] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // debounce the typed query
  useEffect(() => {
    const t = setTimeout(() => setQuery(q), 250);
    return () => clearTimeout(t);
  }, [q]);

  useEffect(() => {
    if (query.trim().length >= 2) track("search", { q: query });
  }, [query]);

  useEffect(() => {
    const ctrl = new AbortController();
    const sp = new URLSearchParams({ sort, limit: String(limit) });
    if (query) sp.set("q", query);
    if (category) sp.set("category", category);
    if (min) sp.set("min", min);
    if (max) sp.set("max", max);
    if (rating) sp.set("rating", String(rating));
    if (inStock) sp.set("inStock", "1");
    if (sale) sp.set("sale", "1");
    setLoading(true);
    fetch(`/api/products?${sp}`, { signal: ctrl.signal })
      .then((r) => r.json())
      .then((d) => {
        setItems(d.items ?? []);
        setTotal(d.total ?? 0);
        setLoading(false);
      })
      .catch((e) => {
        if (e.name !== "AbortError") setLoading(false);
      });
    return () => ctrl.abort();
  }, [query, category, sort, min, max, rating, inStock, sale, limit]);

  const chips: { label: string; clear: () => void }[] = [];
  if (query) chips.push({ label: `“${query}”`, clear: () => { setQ(""); setQuery(""); } });
  if (category) chips.push({ label: category, clear: () => setCategory("") });
  if (min) chips.push({ label: `From $${min}`, clear: () => setMin("") });
  if (max) chips.push({ label: `Up to $${max}`, clear: () => setMax("") });
  if (rating) chips.push({ label: `${rating}★ & up`, clear: () => setRating(0) });
  if (inStock) chips.push({ label: "In stock", clear: () => setInStock(false) });
  if (sale) chips.push({ label: "On sale", clear: () => setSale(false) });
  const clearAll = () => {
    setQ(""); setQuery(""); setCategory(""); setMin(""); setMax(""); setRating(0); setInStock(false); setSale(false);
  };

  const field = "border border-black/15 bg-white px-3 py-2.5 text-sm outline-none focus:border-black";

  return (
    <main className="min-h-screen bg-[#faf9f7] text-[#181818]">
      <section className="border-b border-black/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
          <p className="text-xs uppercase tracking-[0.3em] text-[#9b7b58]">LUXORA</p>
          <h1 className="mt-3 font-serif text-5xl">{title}</h1>
          <label className="relative mt-8 block max-w-xl">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products, categories..."
              aria-label="Search products"
              className="h-12 w-full border border-black/15 bg-white pl-11 pr-4 text-sm outline-none focus:border-black"
            />
          </label>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="flex flex-wrap items-center gap-2">
          <button onClick={() => setCategory("")} className={`px-4 py-2 text-xs uppercase tracking-widest ${!category ? "bg-black text-white" : "border border-black/15 hover:border-black"}`}>All</button>
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => setCategory(c)} className={`px-4 py-2 text-xs uppercase tracking-widest ${category === c ? "bg-black text-white" : "border border-black/15 hover:border-black"}`}>{c}</button>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-end gap-3">
          <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort" className={field}>
            {SORTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
          <input value={min} onChange={(e) => setMin(e.target.value.replace(/\D/g, ""))} placeholder="Min $" aria-label="Minimum price" className={`${field} w-24`} />
          <input value={max} onChange={(e) => setMax(e.target.value.replace(/\D/g, ""))} placeholder="Max $" aria-label="Maximum price" className={`${field} w-24`} />
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))} aria-label="Minimum rating" className={field}>
            <option value={0}>Any rating</option>
            <option value={4}>4★ & up</option>
            <option value={4.5}>4.5★ & up</option>
          </select>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} /> In stock only
          </label>
          <p className="ml-auto text-sm text-gray-500">{loading ? "Loading…" : `${total} products`}</p>
        </div>

        {chips.length > 0 && (
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {chips.map((c) => (
              <button key={c.label} onClick={c.clear} className="flex items-center gap-2 bg-black/5 px-3 py-1.5 text-xs hover:bg-black/10">
                {c.label} <X size={12} />
              </button>
            ))}
            <button onClick={clearAll} className="ml-2 text-xs uppercase tracking-widest underline">Clear all</button>
          </div>
        )}

        {!loading && items.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-serif text-3xl">No products found</p>
            <p className="mt-3 text-sm text-gray-500">Try a different search or clear your filters.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {["Bags", "Jewelry", "Watches"].map((c) => (
                <Link key={c} href={`/categories/${c.toLowerCase()}`} className="border border-black/20 px-5 py-2 text-xs uppercase tracking-widest hover:bg-black hover:text-white">{c}</Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
            {loading && items.length === 0
              ? Array.from({ length: 8 }).map((_, i) => <div key={i} className="aspect-[4/5] animate-pulse rounded-2xl bg-black/5" />)
              : items.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}

        {items.length < total && (
          <div className="mt-12 text-center">
            <button onClick={() => setLimit((l) => l + PAGE)} className="border border-black px-10 py-4 text-xs uppercase tracking-widest hover:bg-black hover:text-white">Load more</button>
          </div>
        )}
      </section>
    </main>
  );
}
