"use client";

import Link from "next/link";
import { ArrowRight, Heart, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

export default function EmptyCart() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center px-5 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-md text-center"
      >
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#f7f1f8]">
          <ShoppingBag
            size={34}
            strokeWidth={1.2}
            className="text-[#8d5c91]"
          />
        </div>

        <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8d5c91]">
          Your shopping bag
        </p>

        <h1 className="mt-3 font-serif text-4xl text-[#21152b] sm:text-5xl">
          Your bag is empty
        </h1>

        <p className="mt-4 text-sm leading-7 text-[#21152b]/45">
          Looks like you haven't added anything yet. Explore
          our curated collection and find something you'll love.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#21152b] px-7 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#8d5c91]"
          >
            Start Shopping
            <ArrowRight size={15} strokeWidth={1.5} />
          </Link>

          <Link
            href="/wishlist"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-black/[0.09] px-7 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#21152b] transition hover:border-[#8d5c91] hover:bg-[#f7f1f8] hover:text-[#8d5c91]"
          >
            <Heart size={15} strokeWidth={1.5} />
            View Wishlist
          </Link>
        </div>

        <div className="mt-10 border-t border-black/[0.06] pt-6">
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#21152b]/30">
            Free shipping on orders over $75
          </p>
        </div>
      </motion.div>
    </section>
  );
}