"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Crown,
  ArrowRight,
  Star,
  Sparkles,
} from "lucide-react";

const bestSellers = [
  {
    id: 1,
    rank: "01",
    name: "Luminous Skin Tint",
    category: "Beauty",
    price: "$36",
    rating: "4.9",
    image: "/images/prouducts/luminous-skin-tint.jpg",
  },
  {
    id: 2,
    rank: "02",
    name: "Classic Pearl Set",
    category: "Jewelry",
    price: "$72",
    rating: "4.9",
    image: "/images/prouducts/classic-pearl-set.jpg",
  },
  {
    id: 3,
    rank: "03",
    name: "Signature Everyday Tote",
    category: "Bags",
    price: "$84",
    rating: "4.8",
    image: "/images/prouducts/signature-everyday-tote.jpg",
  },
  {
    id: 4,
    rank: "04",
    name: "Elegant Rose Timepiece",
    category: "Watches",
    price: "$96",
    rating: "4.8",
    image: "/images/prouducts/elegant-rose-timepiece.jpg",
  },
];

export default function BestSellers() {
  return (
    <section className="relative overflow-hidden bg-[#21152b] py-20 text-white sm:py-24">
      {/* Ambient Glow */}
      <div className="pointer-events-none absolute -left-40 top-[-100px] h-[500px] w-[500px] rounded-full bg-[#8d5c91]/20 blur-[130px]" />

      <div className="pointer-events-none absolute -right-40 bottom-[-150px] h-[520px] w-[520px] rounded-full bg-[#c9a56a]/10 blur-[140px]" />

      {/* Decorative Ring */}
      <div className="pointer-events-none absolute right-[8%] top-[12%] h-40 w-40 rounded-full border border-white/[0.06]" />

      <div className="pointer-events-none absolute right-[10%] top-[15%] h-28 w-28 rounded-full border border-[#c9a56a]/10" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 backdrop-blur-xl">
              <Crown
                size={13}
                strokeWidth={1.5}
                className="text-[#d8b8da]"
              />

              <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/55">
                Customer Favorites
              </span>
            </div>

            <h2 className="font-serif text-4xl tracking-[-0.025em] sm:text-5xl">
              Best sellers
            </h2>

            <div className="mt-4 flex items-center gap-3">
              <div className="h-px w-12 bg-[#c9a56a]/60" />

              <p className="max-w-md text-sm leading-6 text-white/45">
                The pieces our customers keep coming back for.
              </p>
            </div>
          </div>

          <Link
            href="/products?sort=popular"
            className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/70 transition hover:text-white"
          >
            Shop best sellers

            <ArrowRight
              size={15}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Products */}
        <div className="mt-12 overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.025] backdrop-blur-sm">
          {bestSellers.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              className="border-b border-white/[0.08] last:border-b-0"
            >
              <Link
                href={`/products/${product.id}`}
                className="group flex items-center gap-4 px-4 py-5 transition-all duration-300 hover:bg-white/[0.04] sm:gap-7 sm:px-7 sm:py-6"
              >
                {/* Rank */}
                <span className="w-7 shrink-0 font-serif text-lg text-white/20 sm:w-12 sm:text-xl">
                  {product.rank}
                </span>

                {/* Product Image */}
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#382b40] sm:h-24 sm:w-24">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#21152b]/20 to-transparent" />
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#c9a56a]/70">
                    {product.category}
                  </p>

                  <h3 className="mt-1 truncate font-serif text-lg text-white transition-colors group-hover:text-[#e2cfe2] sm:text-xl">
                    {product.name}
                  </h3>

                  <div className="mt-2 flex items-center gap-2">
                    <Star
                      size={12}
                      fill="currentColor"
                      strokeWidth={1.2}
                      className="text-[#d8b8da]"
                    />

                    <span className="text-[11px] text-white/40">
                      {product.rating}
                    </span>

                    <span className="hidden text-[9px] uppercase tracking-[0.12em] text-white/20 sm:inline">
                      Customer rating
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="hidden text-right sm:block">
                  <p className="text-sm font-medium text-white">
                    {product.price}
                  </p>

                  <p className="mt-1 text-[9px] uppercase tracking-[0.14em] text-white/25">
                    View product
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 transition-all duration-300 group-hover:border-[#c9a56a]/40 group-hover:bg-white group-hover:text-[#21152b]">
                  <ArrowRight
                    size={15}
                    strokeWidth={1.5}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom Statement */}
        <div className="mt-12 flex items-center justify-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />

          <div className="flex items-center gap-2">
            <Sparkles
              size={11}
              className="text-[#c9a56a]"
            />

            <span className="text-[9px] uppercase tracking-[0.22em] text-white/30">
              Loved by LUXORA customers
            </span>
          </div>

          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
        </div>
      </div>
    </section>
  );
}