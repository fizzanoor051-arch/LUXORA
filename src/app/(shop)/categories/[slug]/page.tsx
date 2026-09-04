"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Heart,
  Search,
  ShoppingBag,
  Star,
} from "lucide-react";

import { products } from "@/data/products";

export default function CategoryPage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const categoryName = slug
    ? slug.charAt(0).toUpperCase() + slug.slice(1)
    : "Collection";

  const categoryProducts = products.filter(
    (product) => product.category.toLowerCase() === slug?.toLowerCase()
  );

  return (
    <main className="min-h-screen bg-[#fbf7f3] text-[#21152b]">
      {/* Category hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute left-[-120px] top-0 h-96 w-96 rounded-full bg-[#ead0d8]/50 blur-3xl" />
        <div className="pointer-events-none absolute right-[-120px] top-20 h-96 w-96 rounded-full bg-[#cbb7d4]/40 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 pb-14 pt-14 sm:px-8 lg:px-8 lg:pb-20 lg:pt-20">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#8d5c91]"
          >
            <ArrowRight size={14} className="rotate-180" />
            Back to Shop
          </Link>

          <div className="mt-8 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8d5c91]">
              LUXORA COLLECTION
            </p>

            <h1 className="mt-4 font-serif text-5xl font-semibold sm:text-6xl">
              {categoryName}
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#21152b]/60 sm:text-base">
              Discover carefully selected {categoryName.toLowerCase()} pieces
              designed to bring effortless elegance and modern luxury to your
              collection.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:px-8">
        {categoryProducts.length > 0 ? (
          <>
            <div className="flex items-center justify-between border-b border-[#21152b]/[0.07] pb-5">
              <p className="text-sm text-[#21152b]/50">
                <span className="font-semibold text-[#21152b]">
                  {categoryProducts.length}
                </span>{" "}
                pieces in this collection
              </p>

              <Link
                href="/products"
                className="hidden items-center gap-2 text-xs font-semibold text-[#8d5c91] sm:flex"
              >
                View all products
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
              {categoryProducts.map((product, index) => (
                <motion.article
                  key={product.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.05, 0.3) }}
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

                      <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#21152b]/60 backdrop-blur transition group-hover:text-[#8d5c91]">
                        <Heart size={16} />
                      </span>

                      <div className="absolute inset-x-3 bottom-3 flex translate-y-3 items-center justify-center gap-2 rounded-xl bg-[#21152b]/95 py-3 text-xs font-semibold text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <ShoppingBag size={14} />
                        View Product
                      </div>
                    </div>

                    <div className="pt-4">
                      <h2 className="line-clamp-2 text-sm font-semibold">
                        {product.name}
                      </h2>

                      <div className="mt-2 flex items-center justify-between">
                        <div>
                          <span className="text-sm font-bold">
                            ${product.price}
                          </span>

                          {product.oldPrice && (
                            <span className="ml-2 text-xs text-[#21152b]/30 line-through">
                              ${product.oldPrice}
                            </span>
                          )}
                        </div>

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
          </>
        ) : (
          <div className="rounded-[2rem] border border-[#21152b]/[0.07] bg-white p-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f5edf6] text-[#8d5c91]">
              <Search size={24} />
            </div>

            <h2 className="mt-5 font-serif text-3xl font-semibold">
              Collection coming soon
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#21152b]/50">
              We couldn't find products in this collection yet. Explore the
              complete LUXORA catalog instead.
            </p>

            <Link
              href="/products"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#21152b] px-5 py-3 text-xs font-semibold text-white"
            >
              Explore Shop
              <ArrowRight size={15} />
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}