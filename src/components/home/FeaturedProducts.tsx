"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Star, ArrowRight } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Silk Glow Foundation",
    category: "Beauty",
    price: "$42",
    oldPrice: "$49",
    rating: "4.9",
    badge: "Bestseller",
    image: "/images/prouducts/silk-glow-foundation.jpg",
  },
  {
    id: 2,
    name: "Pearl Signature Necklace",
    category: "Jewelry",
    price: "$68",
    oldPrice: "$82",
    rating: "4.8",
    badge: "New",
    image: "/images/prouducts/pearl-signature-necklace.jpg",
  },
  {
    id: 3,
    name: "Minimal Leather Tote",
    category: "Bags",
    price: "$79",
    oldPrice: "$95",
    rating: "4.9",
    badge: "Popular",
    image: "/images/prouducts/minimal-leather-tote.jpg",
  },
  {
    id: 4,
    name: "Classic Rose Watch",
    category: "Watches",
    price: "$89",
    oldPrice: "$110",
    rating: "4.7",
    badge: "Limited",
    image: "/images/prouducts/classic-rose-watch.jpg",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="luxora-section-champagne relative overflow-hidden px-6 py-20 md:px-10 lg:px-16">
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-[-150px] top-20 h-96 w-96 rounded-full bg-[#e7c3d0]/25 blur-[110px]" />

      <div className="pointer-events-none absolute right-[-150px] bottom-[-100px] h-[420px] w-[420px] rounded-full bg-[#cbb7d4]/25 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="luxora-eyebrow mb-3">Curated for you</p>

            <h2 className="luxora-heading text-3xl md:text-4xl lg:text-5xl">
              Featured Pieces
            </h2>

            <div className="mt-4 flex items-center gap-3">
              <div className="h-px w-14 bg-[#c9a56a]/60" />

              <p className="max-w-xl text-sm leading-7 text-[#6f6275]">
                Discover our most-loved pieces, carefully selected to bring
                elegance and style to your everyday life.
              </p>
            </div>
          </div>

          <Link
            href="/products"
            className="group flex w-fit items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#21152b]"
          >
            View All Products

            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <motion.article
              key={product.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              className="group"
            >
              {/* IMAGE */}
              <div className="relative overflow-hidden rounded-[1.35rem] border border-white/70 bg-white/50 p-1.5 shadow-[0_18px_55px_rgba(53,32,60,0.08)] backdrop-blur-xl transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_28px_70px_rgba(53,32,60,0.14)]">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1rem] bg-[#e7dce8]">
                  <Link href={`/products/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </Link>

                  {/* Image Overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#21152b]/10 via-transparent to-white/10" />

                  {/* Badge */}
                  <span className="absolute left-3 top-3 rounded-full border border-white/50 bg-white/85 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#21152b] shadow-sm backdrop-blur">
                    {product.badge}
                  </span>

                  {/* Wishlist */}
                  <button
                    type="button"
                    aria-label={`Add ${product.name} to wishlist`}
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/50 bg-white/85 text-[#21152b] shadow-sm backdrop-blur transition-all duration-300 hover:scale-105 hover:bg-[#21152b] hover:text-white"
                  >
                    <Heart size={15} strokeWidth={1.5} />
                  </button>

                  {/* Quick Add */}
                  <div className="absolute bottom-3 left-3 right-3 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <button
                      type="button"
                      className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#21152b]/95 text-[10px] font-semibold uppercase tracking-[0.14em] text-white shadow-xl backdrop-blur transition hover:bg-[#8d5c91]"
                    >
                      <ShoppingBag size={14} strokeWidth={1.5} />
                      Quick Add
                    </button>
                  </div>
                </div>
              </div>

              {/* PRODUCT INFO */}
              <div className="px-1 pt-5">
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#8d5c91]">
                  {product.category}
                </p>

                <Link href={`/products/${product.id}`}>
                  <h3 className="mt-2 font-serif text-base text-[#21152b] transition-colors hover:text-[#8d5c91]">
                    {product.name}
                  </h3>
                </Link>

                {/* Rating */}
                <div className="mt-2 flex items-center gap-1">
                  <Star
                    size={12}
                    fill="currentColor"
                    className="text-[#c89b63]"
                  />

                  <span className="text-xs text-[#6f6275]">
                    {product.rating}
                  </span>

                  <span className="ml-1 text-[9px] uppercase tracking-wider text-[#21152b]/25">
                    Rated
                  </span>
                </div>

                {/* Price */}
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-sm font-semibold text-[#21152b]">
                    {product.price}
                  </span>

                  <span className="text-xs text-[#a49aa7] line-through">
                    {product.oldPrice}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom Luxury Line */}
        <div className="mt-16 flex items-center justify-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#c9a56a]/35" />

          <span className="font-serif text-xs italic text-[#8d5c91]/60">
            Curated with intention
          </span>

          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#c9a56a]/35" />
        </div>
      </div>
    </section>
  );
}