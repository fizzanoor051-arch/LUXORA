"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const brands = [
  "LUMIÈRE",
  "VELORA",
  "AURELIA",
  "MAISON",
  "ELARA",
  "NOVELLE",
];

export default function BrandShowcase() {
  return (
    <section className="border-y border-[#21152b]/[0.07] bg-[#faf8fa] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        <div className="text-center">
          <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#21152b]/40">
            Featured brands
          </p>

          <h2 className="mt-3 font-serif text-3xl text-[#21152b] sm:text-4xl">
            Names you can trust
          </h2>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#21152b]/45">
            Discover thoughtfully selected brands bringing quality,
            creativity, and style to LUXORA.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 overflow-hidden rounded-2xl border border-[#21152b]/[0.07] bg-white sm:grid-cols-3 lg:grid-cols-6">
          {brands.map((brand, index) => (
            <motion.div
              key={brand}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
              }}
            >
              <Link
                href="/products"
                className="flex h-28 items-center justify-center border-b border-r border-[#21152b]/[0.06] px-4 transition hover:bg-[#f8f2f9]"
              >
                <span className="font-serif text-sm tracking-[0.18em] text-[#21152b]/45 transition group-hover:text-[#21152b]">
                  {brand}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}