"use client";

import Link from "next/link";
import { Heart, ShoppingBag, Star, ArrowRight } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Luxury Teddy Bear",
    price: "$39",
    oldPrice: "$49",
    rating: "4.9",
    image: "/images/prouducts/toys/teddy.jpg",
  },
  {
    id: 2,
    name: "Dreamy Doll Collection",
    price: "$45",
    oldPrice: "$59",
    rating: "4.8",
    image: "/images/prouducts/toys/doll.jpg",
  },
  {
    id: 3,
    name: "Mini Wooden Play Set",
    price: "$55",
    oldPrice: "$69",
    rating: "4.7",
    image: "/images/prouducts/toys/wooden-set.jpg",
  },
  {
    id: 4,
    name: "Cute Kids Gift Box",
    price: "$49",
    oldPrice: "$65",
    rating: "4.9",
    image: "/images/prouducts/toys/gift-box.jpg",
  },
];

export default function ToysPage() {
  return (
    <main className="min-h-screen bg-[#08060b] text-white">

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(236,72,153,0.18),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.15),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8">

          <p className="text-sm uppercase tracking-[0.3em] text-pink-300">
            LUXORA TOYS
          </p>

          <h1 className="mt-4 max-w-3xl text-5xl font-light sm:text-6xl">
            Little Things,
            <span className="block bg-gradient-to-r from-pink-300 via-fuchsia-400 to-purple-400 bg-clip-text font-medium text-transparent">
              Big Smiles
            </span>
          </h1>

          <p className="mt-6 max-w-2xl leading-7 text-white/55">
            Discover playful, beautiful and thoughtfully selected toys made
            for little moments of joy.
          </p>

          <Link
            href="#toys"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black hover:bg-pink-100"
          >
            Explore Toys
            <ArrowRight size={16} />
          </Link>

        </div>
      </section>

      {/* PRODUCTS */}
      <section id="toys" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.25em] text-pink-300">
            Playful Collection
          </p>

          <h2 className="mt-2 text-3xl font-light sm:text-4xl">
            Favorites for Little Ones
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
                  className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/50"
                >
                  <Heart size={17} />
                </button>

                <span className="absolute left-3 top-3 rounded-full bg-pink-500 px-3 py-1 text-[10px] font-semibold uppercase">
                  Popular
                </span>
              </div>

              <div className="p-5">
                <p className="text-xs uppercase tracking-wider text-pink-300">
                  Toys
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

      </section>
    </main>
  );
}