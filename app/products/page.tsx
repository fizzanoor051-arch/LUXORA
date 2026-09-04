"use client";

import Link from "next/link";
import { ArrowRight, Heart, ShoppingBag, Star } from "lucide-react";

const categories = [
  {
    name: "Makeup",
    description: "Beauty essentials for your everyday glow.",
    href: "/categories/makeup",
    icon: "💄",
  },
  {
    name: "Jewelry",
    description: "Elegant pieces that complete your look.",
    href: "/categories/jewelry",
    icon: "💎",
  },
  {
    name: "Fashion",
    description: "Modern styles made for every occasion.",
    href: "/categories/fashion",
    icon: "👗",
  },
  {
    name: "Shoes",
    description: "Step into luxury and comfort.",
    href: "/categories/shoes",
    icon: "👠",
  },
  {
    name: "Bags",
    description: "Statement bags for your signature style.",
    href: "/categories/bags",
    icon: "👜",
  },
  {
    name: "Watches",
    description: "Timeless watches with premium design.",
    href: "/categories/watches",
    icon: "⌚",
  },
  {
    name: "Gifts",
    description: "Beautiful gifts for every special moment.",
    href: "/categories/gifts",
    icon: "🎁",
  },
  {
    name: "Toys",
    description: "Fun and delightful picks for little ones.",
    href: "/categories/toys",
    icon: "🧸",
  },
];

const featuredProducts = [
  {
    id: 1,
    name: "Silk Glow Foundation",
    category: "Makeup",
    price: "$42",
    oldPrice: "$49",
    rating: "4.9",
    image: "/images/prouducts/makeup/foundation.jpg",
  },
  {
    id: 2,
    name: "Aurora Pearl Necklace",
    category: "Jewelry",
    price: "$89",
    oldPrice: "$110",
    rating: "4.8",
    image: "/images/prouducts/jewelry/pearl-necklace.jpg",
  },
  {
    id: 3,
    name: "Signature Evening Dress",
    category: "Fashion",
    price: "$129",
    oldPrice: "$159",
    rating: "4.9",
    image: "/images/prouducts/fashion/dress.jpg",
  },
  {
    id: 4,
    name: "Luxe Classic Heels",
    category: "Shoes",
    price: "$79",
    oldPrice: "$99",
    rating: "4.7",
    image: "/images/prouducts/shoes/heels.jpg",
  },
];

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[#08060b] text-white">

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(236,72,153,0.16),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.14),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="max-w-3xl">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-pink-400/20 bg-pink-500/10 px-4 py-2 text-sm text-pink-200">
              <span className="h-2 w-2 rounded-full bg-pink-400" />
              LUXORA COLLECTION
            </div>

            <h1 className="text-5xl font-light tracking-tight sm:text-6xl lg:text-7xl">
              Discover Your
              <span className="block bg-gradient-to-r from-pink-300 via-fuchsia-400 to-purple-400 bg-clip-text font-medium text-transparent">
                Signature Style
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-white/60 sm:text-lg">
              Explore our carefully selected collection of beauty, fashion,
              jewelry and lifestyle essentials — designed for those who love
              timeless luxury.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#featured"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition hover:bg-pink-100"
              >
                Explore Collection
                <ArrowRight size={17} />
              </a>

              <Link
                href="/categories/makeup"
                className="rounded-full border border-white/15 px-6 py-3.5 text-sm text-white/80 transition hover:border-pink-400/40 hover:bg-white/5"
              >
                Shop Makeup
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mb-10 flex items-end justify-between gap-5">
          <div>
            <p className="mb-2 text-sm uppercase tracking-[0.25em] text-pink-300">
              Explore
            </p>

            <h2 className="text-3xl font-light sm:text-4xl">
              Shop by Category
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-white/50">
              Find exactly what you're looking for across our curated luxury
              collections.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition duration-300 hover:-translate-y-1 hover:border-pink-400/30 hover:bg-white/[0.06]"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500/15 to-purple-500/15 text-2xl">
                {category.icon}
              </div>

              <h3 className="text-lg font-medium">
                {category.name}
              </h3>

              <p className="mt-2 text-xs leading-5 text-white/45">
                {category.description}
              </p>

              <div className="mt-5 flex items-center gap-1 text-xs text-pink-300 opacity-70 transition group-hover:opacity-100">
                Shop now
                <ArrowRight
                  size={13}
                  className="transition group-hover:translate-x-1"
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section
        id="featured"
        className="border-y border-white/10 bg-white/[0.015]"
      >
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="mb-2 text-sm uppercase tracking-[0.25em] text-pink-300">
                Curated for you
              </p>

              <h2 className="text-3xl font-light sm:text-4xl">
                Featured Pieces
              </h2>
            </div>

            <Link
              href="/categories/makeup"
              className="hidden items-center gap-2 text-sm text-white/60 transition hover:text-white sm:flex"
            >
              View collection
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-[#0d0a12]"
              >
                {/* IMAGE */}
                <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-black">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  {/* Wishlist */}
                  <button
                    type="button"
                    aria-label={`Add ${product.name} to wishlist`}
                    className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/50 backdrop-blur-md transition hover:bg-pink-500/20"
                  >
                    <Heart size={17} />
                  </button>

                  {/* Sale */}
                  <span className="absolute left-3 top-3 rounded-full bg-pink-500 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider">
                    New
                  </span>
                </div>

                {/* INFO */}
                <div className="p-5">

                  <p className="text-[11px] uppercase tracking-wider text-pink-300/80">
                    {product.category}
                  </p>

                  <h3 className="mt-2 line-clamp-1 text-sm font-medium">
                    {product.name}
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
                    <div className="flex items-center gap-2">
                      <span className="text-base font-medium">
                        {product.price}
                      </span>

                      <span className="text-xs text-white/30 line-through">
                        {product.oldPrice}
                      </span>
                    </div>

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
        </div>
      </section>

      {/* PROMO */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-pink-400/20 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-transparent p-8 sm:p-12">

          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-pink-500/10 blur-3xl" />

          <div className="relative max-w-2xl">
            <p className="text-sm uppercase tracking-[0.25em] text-pink-300">
              LUXORA
            </p>

            <h2 className="mt-4 text-3xl font-light sm:text-4xl">
              Luxury made
              <span className="font-medium"> effortless.</span>
            </h2>

            <p className="mt-4 text-sm leading-7 text-white/50">
              From everyday essentials to statement pieces, discover products
              selected to bring elegance into every part of your life.
            </p>

            <Link
              href="/categories/jewelry"
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