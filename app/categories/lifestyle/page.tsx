"use client";

import Link from "next/link";
import { Heart, ShoppingBag, Star, ArrowRight } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Luxury Scented Candle",
    price: "$35",
    oldPrice: "$45",
    rating: "4.9",
    image: "/images/prouducts/lifestyle/candle.jpg",
  },
  {
    id: 2,
    name: "Elegant Home Diffuser",
    price: "$49",
    oldPrice: "$62",
    rating: "4.8",
    image: "/images/prouducts/lifestyle/diffuser.jpg",
  },
  {
    id: 3,
    name: "Premium Silk Sleep Mask",
    price: "$29",
    oldPrice: "$39",
    rating: "4.7",
    image: "/images/prouducts/lifestyle/sleep-mask.jpg",
  },
  {
    id: 4,
    name: "Luxe Self-Care Set",
    price: "$65",
    oldPrice: "$79",
    rating: "4.9",
    image: "/images/prouducts/lifestyle/self-care-set.jpg",
  },
];

export default function LifestylePage() {
  return (
    <main className="min-h-screen bg-[#08060b] text-white">

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(236,72,153,0.18),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.16),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">

          <p className="text-sm uppercase tracking-[0.3em] text-pink-300">
            LUXORA LIFESTYLE
          </p>

          <h1 className="mt-4 max-w-4xl text-5xl font-light tracking-tight sm:text-6xl lg:text-7xl">
            Elevate Your
            <span className="block bg-gradient-to-r from-pink-300 via-fuchsia-400 to-purple-400 bg-clip-text font-medium text-transparent">
              Everyday Life
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-white/55 sm:text-lg">
            Discover beautiful lifestyle essentials designed to bring comfort,
            elegance and a little luxury into your everyday moments.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">

            <a
              href="#collection"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition hover:bg-pink-100"
            >
              Explore Collection
              <ArrowRight size={17} />
            </a>

            <Link
              href="/products"
              className="rounded-full border border-white/15 px-6 py-3.5 text-sm text-white/70 transition hover:border-pink-400/40 hover:bg-white/5"
            >
              View All Products
            </Link>

          </div>
        </div>
      </section>

      {/* COLLECTION */}
      <section
        id="collection"
        className="mx-auto max-w-7xl px-6 py-20 lg:px-8"
      >

        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.25em] text-pink-300">
            Curated Lifestyle
          </p>

          <h2 className="mt-2 text-3xl font-light sm:text-4xl">
            Everyday Luxury
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-6 text-white/50">
            Small details can make everyday life feel extraordinary. Explore
            our selection of elegant lifestyle essentials.
          </p>
        </div>

        {/* PRODUCTS */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {products.map((product) => (
            <div
              key={product.id}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition duration-300 hover:-translate-y-1 hover:border-pink-400/30"
            >

              {/* IMAGE */}
              <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-black">

                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                {/* WISHLIST */}
                <button
                  type="button"
                  aria-label={`Add ${product.name} to wishlist`}
                  className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/50 backdrop-blur-md transition hover:bg-pink-500/20"
                >
                  <Heart size={17} />
                </button>

                {/* BADGE */}
                <span className="absolute left-3 top-3 rounded-full bg-pink-500 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider">
                  Featured
                </span>

              </div>

              {/* INFO */}
              <div className="p-5">

                <p className="text-[11px] uppercase tracking-wider text-pink-300">
                  Lifestyle
                </p>

                <h3 className="mt-2 line-clamp-1 text-sm font-medium">
                  {product.name}
                </h3>

                {/* RATING */}
                <div className="mt-2 flex items-center gap-1 text-xs text-white/50">
                  <Star
                    size={13}
                    fill="currentColor"
                    className="text-yellow-400"
                  />
                  {product.rating}
                </div>

                {/* PRICE */}
                <div className="mt-4 flex items-center justify-between">

                  <div className="flex items-center gap-2">
                    <span className="text-base font-medium">
                      {product.price}
                    </span>

                    <span className="text-xs text-white/30 line-through">
                      {product.oldPrice}
                    </span>
                  </div>

                  {/* CART */}
                  <button
                    type="button"
                    aria-label={`Add ${product.name} to cart`}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black transition hover:bg-pink-200"
                  >
                    <ShoppingBag size={15} />
                  </button>

                </div>
              </div>

            </div>
          ))}

        </div>
      </section>

      {/* LIFESTYLE BANNER */}
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">

        <div className="relative overflow-hidden rounded-3xl border border-pink-400/20 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-transparent p-8 sm:p-12">

          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-pink-500/10 blur-3xl" />

          <div className="relative max-w-2xl">

            <p className="text-sm uppercase tracking-[0.25em] text-pink-300">
              LUXORA EDIT
            </p>

            <h2 className="mt-4 text-3xl font-light sm:text-4xl">
              Make your everyday
              <span className="font-medium"> extraordinary.</span>
            </h2>

            <p className="mt-4 text-sm leading-7 text-white/50">
              From relaxing evenings to peaceful mornings, discover carefully
              selected pieces that make your personal space feel special.
            </p>

            <Link
              href="/categories/gifts"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-pink-100"
            >
              Discover More
              <ArrowRight size={16} />
            </Link>

          </div>
        </div>

      </section>

    </main>
  );
}