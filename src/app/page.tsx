"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Gem,
  Sparkles,
  Shirt,
  WandSparkles,
  ArrowRight,
} from "lucide-react";

const categories = [
  {
    name: "Shop",
    description: "Explore our complete luxury collection",
    href: "/products",
    icon: ShoppingBag,
  },
  {
    name: "Jewelry",
    description: "Elegant pieces designed to shine",
    href: "/categories/jewelry",
    icon: Gem,
  },
  {
    name: "Toys",
    description: "Premium picks for every little moment",
    href: "/categories/toys",
    icon: Sparkles,
  },
  {
    name: "Fashion",
    description: "Timeless styles with a modern touch",
    href: "/categories/fashion",
    icon: Shirt,
  },
  {
    name: "Makeup",
    description: "Beauty essentials for your signature look",
    href: "/categories/makeup",
    icon: WandSparkles,
  },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-[#fbf8f5] px-5 py-16 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#8d5c91]">
            LUXORA COLLECTION
          </p>

          <h1 className="font-serif text-4xl text-[#21152b] md:text-6xl">
            Discover Your Style
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#21152b]/55 md:text-base">
            Explore carefully selected fashion, beauty, jewelry and lifestyle
            collections designed to bring luxury into every moment.
          </p>
        </motion.div>

        {/* Category Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.1,
                }}
              >
                <Link href={category.href} className="group block">
                  <div className="relative h-full min-h-[300px] overflow-hidden rounded-[28px] border border-[#21152b]/8 bg-white p-7 shadow-[0_15px_50px_rgba(33,21,43,0.06)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_70px_rgba(33,21,43,0.12)]">
                    {/* Glow */}
                    <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-[#d9bfdc]/30 blur-3xl transition-all duration-500 group-hover:scale-150" />

                    <div className="relative flex h-full flex-col">
                      {/* Icon */}
                      <div className="mb-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f4eef5] text-[#8d5c91] transition-all duration-500 group-hover:bg-[#21152b] group-hover:text-white">
                        <Icon size={24} strokeWidth={1.5} />
                      </div>

                      {/* Text */}
                      <div className="mt-auto">
                        <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#8d5c91]">
                          Collection
                        </p>

                        <h2 className="font-serif text-2xl text-[#21152b]">
                          {category.name}
                        </h2>

                        <p className="mt-3 text-xs leading-6 text-[#21152b]/50">
                          {category.description}
                        </p>

                        {/* Link */}
                        <div className="mt-7 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#21152b]">
                          Explore
                          <ArrowRight
                            size={15}
                            className="transition-transform duration-300 group-hover:translate-x-2"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Luxury Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-8 overflow-hidden rounded-[30px] bg-[#21152b] px-7 py-10 text-center md:px-12"
        >
          <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#d9bfdc]">
            LUXORA
          </p>

          <h2 className="mt-3 font-serif text-3xl text-white md:text-4xl">
            Luxury Begins With You
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/55">
            Discover pieces that match your personality, elevate your style,
            and make every day feel a little more special.
          </p>

          <Link
            href="/products"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#21152b] transition-all duration-300 hover:bg-[#d9bfdc]"
          >
            Shop Collection
            <ArrowRight size={15} />
          </Link>
        </motion.div>
      </div>
    </main>
  );
}