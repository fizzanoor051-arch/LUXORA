"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, ArrowRight, Star, X } from "lucide-react";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import { products } from "@/data/products";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";

  const [query, setQuery] = useState(initialQuery);

  const results = useMemo(() => {
    if (!query.trim()) return products;

    const normalized = query.toLowerCase();

    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(normalized) ||
        product.category.toLowerCase().includes(normalized) ||
        product.brand?.toLowerCase().includes(normalized) ||
        product.description?.toLowerCase().includes(normalized)
    );
  }, [query]);

  return (
    <main className="min-h-screen bg-[#fbf7f3] text-[#21152b]">
      <section className="border-b border-[#21152b]/[0.06]">
        <div className="mx-auto max-w-5xl px-5 py-14 text-center sm:px-8 lg:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8d5c91]">
            DISCOVER LUXORA
          </p>

          <h1 className="mt-4 font-serif text-4xl font-semibold sm:text-5xl">
            Search our collection
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#21152b]/55">
            Find fashion, beauty, jewelry, accessories and more.
          </p>

          <div className="mx-auto mt-8 flex max-w-2xl items-center gap-3 rounded-2xl border border-[#21152b]/10 bg-white px-5 py-4 shadow-[0_20px_60px_rgba(33,21,43,0.07)]">
            <Search size={20} className="text-[#8d5c91]" />

            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="What are you looking for?"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#21152b]/35"
              autoFocus
            />

            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-[#21152b]/40 hover:text-[#8d5c91]"
              >
                <X size={17} />
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-8">
        <div className="flex items-center justify-between">
          <p className="text-sm text-[#21152b]/50">
            {query ? (
              <>
                <span className="font-semibold text-[#21152b]">
                  {results.length}
                </span>{" "}
                results for{" "}
                <span className="font-semibold text-[#21152b]">
                  "{query}"
                </span>
              </>
            ) : (
              <>
                Showing{" "}
                <span className="font-semibold text-[#21152b]">
                  {results.length}
                </span>{" "}
                products
              </>
            )}
          </p>

          <Link
            href="/products"
            className="hidden items-center gap-2 text-xs font-semibold text-[#8d5c91] sm:flex"
          >
            Browse Shop
            <ArrowRight size={14} />
          </Link>
        </div>

        {results.length > 0 ? (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {results.map((product, index) => (
              <motion.article
                key={product.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.04, 0.3) }}
              >
                <Link href={`/products/${product.slug}`} className="group">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#f1e9eb]">
                    {product.image && (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    )}

                    {product.badge && (
                      <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em] backdrop-blur">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  <div className="pt-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#8d5c91]">
                      {product.category}
                    </p>

                    <h2 className="mt-1 line-clamp-2 text-sm font-semibold">
                      {product.name}
                    </h2>

                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-sm font-bold">
                        ${product.price}
                      </span>

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
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-[2rem] bg-white p-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f5edf6] text-[#8d5c91]">
              <Search size={25} />
            </div>

            <h2 className="mt-5 font-serif text-2xl font-semibold">
              No matches found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#21152b]/50">
              Try a different search term or browse all LUXORA products.
            </p>

            <Link
              href="/products"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#21152b] px-5 py-3 text-xs font-semibold text-white"
            >
              View All Products
              <ArrowRight size={15} />
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}