"use client";

import Link from "next/link";
import { Heart, ShoppingBag, Star, ArrowRight } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Luxe Mini Shoulder Bag",
    price: "$89",
    oldPrice: "$109",
    rating: "4.9",
    image: "/images/prouducts/bags/shoulder-bag.jpg",
  },
  {
    id: 2,
    name: "Elegant Leather Tote",
    price: "$129",
    oldPrice: "$159",
    rating: "4.8",
    image: "/images/prouducts/bags/tote-bag.jpg",
  },
  {
    id: 3,
    name: "Classic Evening Clutch",
    price: "$69",
    oldPrice: "$85",
    rating: "4.7",
    image: "/images/prouducts/bags/clutch.jpg",
  },
  {
    id: 4,
    name: "Premium Chain Bag",
    price: "$99",
    oldPrice: "$125",
    rating: "4.9",
    image: "/images/prouducts/bags/chain-bag.jpg",
  },
];

export default function BagsPage() {
  return (
    <main className="min-h-screen bg-[#08060b] text-white">

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(236,72,153,0.18),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.16),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-pink-300">
            LUXORA BAGS
          </p>

          <h1 className="max-w-3xl text-5xl font-light tracking-tight sm:text-6xl">
            Carry Your
            <span className="block bg-gradient-to-r from-pink-300 via-fuchsia-400 to-purple-400 bg-clip-text font-medium text-transparent">
              Signature Style
            </span>
          </h1>

          <p className="mt-6 max-w-2xl leading-7 text-white/55">
            Discover elegant bags designed to complement every outfit,
            occasion and personality.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#products"
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-pink-100"
            >
              Shop Bags
            </Link>

            <Link
              href="/products"
              className="rounded-full border border-white/15 px-6 py-3 text-sm text-white/70 transition hover:bg-white/5"
            >
              All Collections
            </Link>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.25em] text-pink-300">
            Curated Collection
          </p>

          <h2 className="mt-2 text-3xl font-light sm:text-4xl">
            Luxury Bags
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-pink-500/10 to-purple-500/10">

                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <button
                  type="button"
                  className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/50 backdrop-blur-md"
                >
                  <Heart size={17} />
                </button>

                <span className="absolute left-3 top-3 rounded-full bg-pink-500 px-3 py-1 text-[10px] font-semibold uppercase">
                  New
                </span>
              </div>

              <div className="p-5">
                <p className="text-xs uppercase tracking-wider text-pink-300">
                  Bags
                </p>

                <h3 className="mt-2 font-medium">{product.name}</h3>

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
                    <span>{product.price}</span>
                    <span className="text-xs text-white/30 line-through">
                      {product.oldPrice}
                    </span>
                  </div>

                  <button
                    type="button"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black hover:bg-pink-200"
                  >
                    <ShoppingBag size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white"
          >
            Explore all products
            <ArrowRight size={15} />
          </Link>
        </div>

      </section>
    </main>
  );
}