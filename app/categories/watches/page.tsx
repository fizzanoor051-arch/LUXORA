"use client";

import Link from "next/link";
import { products as catalog } from "@/data/products";
import { useCart } from "@/components/chart/CartProvider";
import { Heart, ShoppingBag, Star, Clock } from "lucide-react";

const products = catalog.filter((p) => p.category.toLowerCase() === "watches");

export default function WatchesPage() {
  const { addToCart } = useCart();
  return (
    <main className="min-h-screen bg-[#08060b] text-white">

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,rgba(236,72,153,0.15),transparent_35%),radial-gradient(circle_at_75%_30%,rgba(168,85,247,0.15),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8">

          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-pink-400/20 bg-pink-500/10">
            <Clock className="text-pink-300" size={25} />
          </div>

          <p className="text-sm uppercase tracking-[0.3em] text-pink-300">
            LUXORA WATCHES
          </p>

          <h1 className="mt-4 max-w-3xl text-5xl font-light sm:text-6xl">
            Time Looks Better
            <span className="block bg-gradient-to-r from-pink-300 via-fuchsia-400 to-purple-400 bg-clip-text font-medium text-transparent">
              In Luxury
            </span>
          </h1>

          <p className="mt-6 max-w-2xl leading-7 text-white/55">
            Discover refined watches that combine timeless elegance with
            modern sophistication.
          </p>

          <Link
            href="#watches"
            className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-black hover:bg-pink-100"
          >
            Shop Watches
          </Link>

        </div>
      </section>

      {/* PRODUCTS */}
      <section id="watches" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.25em] text-pink-300">
            Timeless Collection
          </p>

          <h2 className="mt-2 text-3xl font-light sm:text-4xl">
            Signature Watches
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              data-tilt="7"
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-pink-500/10 to-purple-500/10">

                <img loading="lazy" decoding="async"
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <button
                  type="button"
                  className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/50"
                >
                  <Heart size={17} />
                </button>

                <span className="absolute left-3 top-3 rounded-full bg-pink-500 px-3 py-1 text-[10px] font-semibold uppercase">
                  Premium
                </span>
              </div>

              <div className="p-5">
                <p className="text-xs uppercase tracking-wider text-pink-300">
                  Watches
                </p>

                <h3 className="mt-2 font-medium">
                  <Link href={`/products/${product.slug}`} className="hover:underline">
                    {product.name}
                  </Link>
                </h3>

                <div className="mt-2 flex items-center gap-1 text-xs text-white/50">
                  <Star
                    size={13}
                    fill="currentColor"
                    className="text-yellow-400"
                  />
                  {product.rating}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex gap-2">
                    <span>${product.price}</span>
                    <span className="text-xs text-white/30 line-through">
                      {product.oldPrice ? `$${product.oldPrice}` : null}
                    </span>
                  </div>

                  <button
                    type="button"
                    aria-label="Add to bag"
                    onClick={() =>
                      addToCart({
                        id: product.id,
                        name: product.name,
                        category: product.category,
                        price: product.price,
                        image: product.image,
                      })
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black hover:bg-pink-200"
                  >
                    <ShoppingBag size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>
    </main>
  );
}