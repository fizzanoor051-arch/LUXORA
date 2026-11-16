"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  Gem,
  Shirt,
  Footprints,
  ShoppingBag,
  Gift,
  Watch,
  Baby,
  ArrowUpRight,
} from "lucide-react";

const categories = [
  {
    name: "Makeup",
    slug: "makeup",
    icon: Sparkles,
    description: "Beauty essentials",
    image: "/images/categories/makeup.jpg",
  },
  {
    name: "Jewelry",
    slug: "jewelry",
    icon: Gem,
    description: "Timeless pieces",
    image: "/images/categories/jewelry.jpg",
  },
  {
    name: "Fashion",
    slug: "fashion",
    icon: Shirt,
    description: "Modern styles",
  },
  {
    name: "Shoes",
    slug: "shoes",
    icon: Footprints,
    description: "Step in style",
  },
  {
    name: "Bags",
    slug: "bags",
    icon: ShoppingBag,
    description: "Everyday luxury",
  },
  {
    name: "Gifts",
    slug: "gifts",
    icon: Gift,
    description: "Made to delight",
  },
  {
    name: "Watches",
    slug: "watches",
    icon: Watch,
    description: "Classic timepieces",
  },
  {
    name: "Toys",
    slug: "toys",
    icon: Baby,
    description: "Fun for everyone",
  },
];

export default function CategoryShowcase() {
  return (
    <section className="luxora-section-lavender relative overflow-hidden py-20 sm:py-24">
      {/* Decorative Glow */}
      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#e5c2cf]/30 blur-[100px]" />

      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#cbb7d4]/35 blur-[110px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="luxora-eyebrow mb-3">Explore LUXORA</p>

            <h2 className="luxora-heading text-4xl sm:text-5xl">
              Shop by category
            </h2>

            <div className="mt-4 flex items-center gap-3">
              <div className="h-px w-12 bg-[#c9a56a]/60" />

              <p className="max-w-md text-sm leading-6 text-[#21152b]/50">
                Explore our carefully selected collections designed for every
                style, mood, and moment.
              </p>
            </div>
          </div>

          <Link
            href="/products"
            className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#21152b]"
          >
            View all

            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-5">
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.06,
                }}
              >
                <Link
                  href={`/categories/${category.slug}`}
                  className="group relative block min-h-[205px] overflow-hidden rounded-[1.35rem] border border-white/70 bg-white/45 p-5 shadow-[0_15px_50px_rgba(53,32,60,0.06)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-white hover:bg-white/65 hover:shadow-[0_25px_65px_rgba(53,32,60,0.12)] sm:p-6"
                >
                  {/* Background Image */}
                  {category.image && (
                    <img
                      src={category.image}
                      alt={category.name}
                      className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-700 group-hover:scale-105 group-hover:opacity-15"
                    />
                  )}

                  {/* Glow */}
                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#d9c2dc]/20 blur-3xl transition-all duration-500 group-hover:bg-[#d9c2dc]/40" />

                  {/* Icon */}
                  <div className="relative mb-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/80 bg-white/70 shadow-sm backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:bg-white">
                    <Icon
                      size={20}
                      strokeWidth={1.4}
                      className="text-[#8d5c91] transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Text */}
                  <div className="relative">
                    <p className="mb-1 text-[8px] font-semibold uppercase tracking-[0.18em] text-[#c9a56a]">
                      Collection
                    </p>

                    <h3 className="font-serif text-xl text-[#21152b]">
                      {category.name}
                    </h3>

                    <p className="mt-1 text-xs text-[#21152b]/45">
                      {category.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  <span className="absolute bottom-5 right-5 flex h-8 w-8 items-center justify-center rounded-full border border-[#21152b]/8 bg-white/50 text-[#21152b]/30 transition-all duration-300 group-hover:border-[#8d5c91]/20 group-hover:bg-[#21152b] group-hover:text-white">
                    <ArrowUpRight size={14} />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}