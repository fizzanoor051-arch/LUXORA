"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clock, Zap, Sparkles } from "lucide-react";

const saleProducts = [
  {
    name: "Radiant Glow Set",
    category: "Beauty",
    price: "$39",
    oldPrice: "$55",
    discount: "29% OFF",
    image: "/images/prouducts/radiant-glow-set.jpg",
  },
  {
    name: "Pearl Elegance Set",
    category: "Jewelry",
    price: "$49",
    oldPrice: "$70",
    discount: "30% OFF",
    image: "/images/prouducts/pearl-elegance-set.jpg",
  },
  {
    name: "Classic Mini Tote",
    category: "Bags",
    price: "$59",
    oldPrice: "$82",
    discount: "28% OFF",
    image: "/images/prouducts/classic-mini-tote.jpg",
  },
];

export default function FlashSale() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#f7eef5] via-[#fbf6f1] to-[#f2eaf4] py-20 sm:py-24">
      {/* Background Glows */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-[#e5c1cf]/25 blur-[120px]" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-[450px] w-[450px] rounded-full bg-[#cbb7d4]/25 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="relative overflow-hidden rounded-[1.9rem] border border-white/10 bg-[#21152b] p-7 text-white shadow-[0_25px_70px_rgba(33,21,43,0.16)] sm:p-10 lg:flex lg:items-center lg:justify-between">
          {/* Header Glows */}
          <div className="pointer-events-none absolute -left-24 top-[-100px] h-72 w-72 rounded-full bg-[#8d5c91]/25 blur-[80px]" />

          <div className="pointer-events-none absolute right-[-80px] bottom-[-130px] h-80 w-80 rounded-full bg-[#c9a56a]/10 blur-[90px]" />

          <div className="relative">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 backdrop-blur-xl">
              <Zap
                size={13}
                strokeWidth={1.6}
                className="text-[#dfc38e]"
              />

              <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/65">
                Limited Time
              </span>
            </div>

            <h2 className="font-serif text-4xl tracking-[-0.025em] sm:text-5xl">
              Flash sale
            </h2>

            <p className="mt-3 max-w-lg text-sm leading-6 text-white/45">
              Your favorite LUXORA pieces, now at special prices. Shop before
              the offer ends.
            </p>
          </div>

          {/* Timer */}
          <div className="relative mt-7 flex items-center gap-3 lg:mt-0">
            <Clock
              size={18}
              strokeWidth={1.5}
              className="text-[#c9a56a]/70"
            />

            <div className="flex items-center gap-2">
              {[
                ["08", "HRS"],
                ["24", "MIN"],
                ["36", "SEC"],
              ].map(([value, label]) => (
                <div key={label} className="text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.07] font-serif text-lg shadow-inner sm:h-14 sm:w-14">
                    {value}
                  </div>

                  <span className="mt-1 block text-[7px] tracking-[0.16em] text-white/35">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {saleProducts.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
            >
              <Link
                href="/products"
                className="group block overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/55 p-1.5 shadow-[0_18px_55px_rgba(53,32,60,0.07)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_28px_70px_rgba(53,32,60,0.13)]"
              >
                {/* Image */}
                <div className="relative aspect-[5/4] overflow-hidden rounded-[1.15rem] bg-[#e6d9e7]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#21152b]/15 to-transparent" />

                  {/* Discount */}
                  <span className="absolute left-3 top-3 rounded-full bg-[#21152b] px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.12em] text-white shadow-lg">
                    {product.discount}
                  </span>

                  {/* Sale Label */}
                  <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-white/75 backdrop-blur-xl">
                    <Sparkles
                      size={13}
                      className="text-[#8d5c91]"
                    />
                  </span>
                </div>

                {/* Info */}
                <div className="p-5">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#8d5c91]">
                    {product.category}
                  </p>

                  <h3 className="mt-1.5 font-serif text-xl text-[#21152b]">
                    {product.name}
                  </h3>

                  <div className="mt-3 flex items-center gap-2">
                    <span className="font-semibold text-[#21152b]">
                      {product.price}
                    </span>

                    <span className="text-xs text-[#21152b]/30 line-through">
                      {product.oldPrice}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-9 text-center">
          <Link
            href="/products?sale=true"
            className="group inline-flex items-center gap-3 rounded-xl bg-[#21152b] px-7 py-3.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#8d5c91]"
          >
            Shop the sale

            <ArrowRight
              size={15}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}