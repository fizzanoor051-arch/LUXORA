"use client";

import Link from "next/link";

import { products } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";
import { useWishlist } from "@/hooks/useWishlist";

export default function WishlistPage() {
  const { ids } = useWishlist();
  const saved = products.filter((p) => ids.includes(p.id));

  return (
    <main className="min-h-screen bg-[#faf9f7] text-[#181818]">
      <section className="border-b border-black/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
          <p className="text-xs uppercase tracking-[0.3em] text-[#9b7b58]">LUXORA</p>
          <h1 className="mt-3 font-serif text-5xl">Your Wishlist</h1>
          <p className="mt-3 text-sm text-gray-500">{saved.length} saved {saved.length === 1 ? "piece" : "pieces"}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        {saved.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-serif text-3xl">Nothing saved yet</p>
            <p className="mt-3 text-sm text-gray-500">Tap the heart on any product to save it here.</p>
            <Link href="/products" className="mt-8 inline-block bg-black px-8 py-4 text-xs uppercase tracking-widest text-white hover:bg-[#9b7b58]">Discover the Collection</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
            {saved.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>
    </main>
  );
}
