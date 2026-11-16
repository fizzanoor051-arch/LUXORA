"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Gift } from "lucide-react";

export default function PromoBanner() {
  return (
    <section className="relative overflow-hidden bg-[#f5edf4] py-20 sm:py-24">
      {/* Ambient Glows */}
      <div className="pointer-events-none absolute -left-40 top-[-100px] h-[450px] w-[450px] rounded-full bg-[#8d5c91]/15 blur-[120px]" />

      <div className="pointer-events-none absolute -right-40 bottom-[-140px] h-[500px] w-[500px] rounded-full bg-[#c9a56a]/10 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-[#21152b] shadow-[0_35px_90px_rgba(33,21,43,0.18)]"
        >
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#21152b] via-[#4a354f] to-[#876b87]" />

          {/* Glows */}
          <div className="absolute -left-24 bottom-[-150px] h-[400px] w-[400px] rounded-full bg-[#8d5c91]/30 blur-[100px]" />

          <div className="absolute right-[-80px] top-[-100px] h-[400px] w-[400px] rounded-full bg-[#c9a56a]/15 blur-[100px]" />

          {/* Decorative Rings */}
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full border border-white/10" />

          <div className="absolute -right-4 top-[-4px] h-64 w-64 rounded-full border border-white/[0.06]" />

          <div className="absolute bottom-[-180px] right-[18%] h-96 w-96 rounded-full border border-white/[0.05]" />

          <div className="relative grid min-h-[460px] items-center lg:grid-cols-2">
            {/* Content */}
            <div className="relative z-10 p-8 sm:p-12 lg:p-16">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-xl">
                <Sparkles
                  size={13}
                  strokeWidth={1.5}
                  className="text-[#dfc38e]"
                />

                <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/65">
                  LUXORA Exclusive
                </span>
              </div>

              <h2 className="max-w-lg font-serif text-4xl leading-[1.02] tracking-[-0.025em] text-white sm:text-5xl lg:text-6xl">
                Little luxuries,
                <span className="block italic text-white/60">
                  big moments.
                </span>
              </h2>

              <div className="mt-6 flex items-center gap-3">
                <div className="h-px w-14 bg-[#c9a56a]/70" />
                <div className="h-1 w-1 rounded-full bg-[#c9a56a]" />
              </div>

              <p className="mt-5 max-w-md text-sm leading-7 text-white/55">
                Find thoughtful gifts, beautiful accessories, and everyday
                essentials curated to make every moment feel special.
              </p>

              <Link
                href="/categories/gifts"
                className="group mt-8 inline-flex items-center gap-3 rounded-xl bg-white px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#21152b] shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-[#f7edf7]"
              >
                Explore gifts

                <ArrowRight
                  size={15}
                  strokeWidth={1.5}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>

            {/* Visual */}
            <div className="relative hidden h-full min-h-[460px] lg:block">
              <div className="flex h-full items-center justify-center">
                {/* Main Circle */}
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{
                    duration: 35,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="relative h-80 w-80 rounded-full border border-white/15"
                >
                  <div className="absolute inset-8 rounded-full border border-white/10" />

                  <div className="absolute inset-16 rounded-full border border-[#c9a56a]/15" />

                  <div className="absolute inset-24 flex items-center justify-center rounded-full bg-white/[0.08] backdrop-blur-md">
                    <Gift
                      size={30}
                      strokeWidth={1}
                      className="text-[#d9c0da]"
                    />
                  </div>
                </motion.div>

                {/* Center Label */}
                <div className="absolute flex flex-col items-center">
                  <span className="font-serif text-3xl italic text-white/25">
                    LUXORA
                  </span>

                  <span className="mt-2 text-[8px] uppercase tracking-[0.25em] text-white/30">
                    Gift beautifully
                  </span>
                </div>

                {/* Floating Dot */}
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute right-[18%] top-[24%] h-3 w-3 rounded-full bg-[#c9a56a]/70 shadow-[0_0_25px_rgba(201,165,106,0.5)]"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}