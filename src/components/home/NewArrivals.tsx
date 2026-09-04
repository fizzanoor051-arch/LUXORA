"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

const newProducts = [
  {
    id: 1,
    name: "Soft Glow Blush",
    category: "Makeup",
    price: "$28",
    image: "/images/prouducts/soft-glow-blush.jpg",
  },
  {
    id: 2,
    name: "Gold Pearl Earrings",
    category: "Jewelry",
    price: "$54",
    image: "/images/prouducts/gold-pearl-earrings.jpg",
  },
  {
    id: 3,
    name: "Everyday Mini Bag",
    category: "Bags",
    price: "$64",
    image: "/images/prouducts/everyday-mini-bag.jpg",
  },
];

export default function NewArrivals() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#fbf6f2] via-[#f7eef6] to-[#f8f3ed] py-20 sm:py-24">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-[#e8c6d2]/30 blur-[120px]" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-[430px] w-[430px] rounded-full bg-[#cbb7d4]/30 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#8d5c91]/10 bg-white/55 px-4 py-2 shadow-sm backdrop-blur-xl"
          >
            <Sparkles
              size={13}
              strokeWidth={1.5}
              className="text-[#8d5c91]"
            />

            <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8d5c91]">
              Just Arrived
            </span>
          </motion.div>

          <h2 className="font-serif text-4xl tracking-[-0.025em] text-[#21152b] sm:text-5xl">
            New arrivals
          </h2>

          <div className="mx-auto mt-5 flex max-w-xl items-center justify-center gap-3">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#c9a56a]/60" />

            <p className="text-sm leading-6 text-[#21152b]/50">
              Fresh finds, new favorites, and pieces we think you’ll love.
            </p>

            <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#c9a56a]/60" />
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-5 md:grid-cols-3">
          {newProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.55,
                delay: index * 0.1,
              }}
            >
              <Link
                href={`/products/${product.id}`}
                className="group relative block overflow-hidden rounded-[1.7rem] border border-white/70 bg-white/40 p-1.5 shadow-[0_20px_60px_rgba(53,32,60,0.08)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_75px_rgba(53,32,60,0.14)]"
              >
                {/* Image */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.35rem] bg-[#eee5ef]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />

                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#21152b]/80 via-[#21152b]/10 to-transparent opacity-80" />

                  {/* Top Label */}
                  <div className="absolute left-4 top-4 rounded-full border border-white/40 bg-white/70 px-3 py-1.5 backdrop-blur-xl">
                    <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[#21152b]/70">
                      New Season
                    </span>
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-6 pt-24">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/60">
                          {product.category}
                        </p>

                        <h3 className="font-serif text-xl text-white">
                          {product.name}
                        </h3>

                        <p className="mt-1 text-sm font-medium text-white/80">
                          {product.price}
                        </p>
                      </div>

                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#21152b] shadow-lg transition-all duration-500 group-hover:rotate-45 group-hover:scale-110">
                        <ArrowUpRight
                          size={16}
                          strokeWidth={1.5}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-11 text-center">
          <Link
            href="/products?sort=newest"
            className="group inline-flex items-center gap-3 rounded-full border border-[#21152b]/12 bg-white/45 px-7 py-3.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#21152b] shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#8d5c91]/25 hover:bg-[#21152b] hover:text-white"
          >
            Discover all new arrivals

            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}