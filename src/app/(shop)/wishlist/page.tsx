"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Heart,
  ShoppingBag,
  Star,
  Trash2,
} from "lucide-react";

import { products } from "@/data/products";

export default function WishlistPage() {
  const [items, setItems] = useState(products.slice(0, 4));

  const removeItem = (id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  return (
    <main className="min-h-screen bg-[#fbf7f3] text-[#21152b]">
      <section className="relative overflow-hidden border-b border-[#21152b]/[0.06]">
        <div className="pointer-events-none absolute left-[-100px] top-10 h-80 w-80 rounded-full bg-[#ead0d8]/50 blur-3xl" />
        <div className="pointer-events-none absolute right-[-100px] top-0 h-80 w-80 rounded-full bg-[#cbb7d4]/40 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-8 lg:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8d5c91]">
            YOUR COLLECTION
          </p>

          <div className="mt-4 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <h1 className="font-serif text-4xl font-semibold sm:text-5xl">
                Wishlist
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-7 text-[#21152b]/55">
                Keep the pieces you love close. Save your favorites and come
                back whenever you're ready.
              </p>
            </div>

            <Link
              href="/products"
              className="inline-flex w-fit items-center gap-2 rounded-xl bg-[#21152b] px-5 py-3 text-xs font-semibold text-white"
            >
              Continue Shopping
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-8 lg:py-14">
        {items.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {items.map((product, index) => (
              <motion.article
                key={product.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#f1e9eb]">
                  <Link href={`/products/${product.slug}`}>
                    {product.image && (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    )}
                  </Link>

                  <button
                    type="button"
                    onClick={() => removeItem(product.id)}
                    aria-label={`Remove ${product.name}`}
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#21152b]/55 backdrop-blur transition hover:text-red-500"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>

                <div className="pt-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#8d5c91]">
                    {product.category}
                  </p>

                  <Link href={`/products/${product.slug}`}>
                    <h2 className="mt-1 line-clamp-2 text-sm font-semibold">
                      {product.name}
                    </h2>
                  </Link>

                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm font-bold">${product.price}</span>

                    {product.rating && (
                      <span className="flex items-center gap-1 text-[10px] text-[#21152b]/50">
                        <Star
                          size={11}
                          className="fill-[#c9a56a] text-[#c9a56a]"
                        />
                        {product.rating}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-[#21152b]/10 bg-white py-3 text-xs font-semibold transition hover:border-[#8d5c91]/30 hover:text-[#8d5c91]"
                  >
                    <ShoppingBag size={14} />
                    Add to Bag
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] bg-white px-6 py-16 text-center shadow-[0_20px_60px_rgba(33,21,43,0.05)]">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f5edf6] text-[#8d5c91]">
              <Heart size={26} />
            </div>

            <h2 className="mt-6 font-serif text-3xl font-semibold">
              Your wishlist is empty
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#21152b]/50">
              Save products you love and they'll appear here.
            </p>

            <Link
              href="/products"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#21152b] px-5 py-3 text-xs font-semibold text-white"
            >
              Discover Products
              <ArrowRight size={15} />
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}