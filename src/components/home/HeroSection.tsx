"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Star } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="luxora-hero relative min-h-[760px] overflow-hidden">
      {/* Background Orbs */}
      <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-[#e7c3d0]/45 blur-[100px]" />

      <div className="pointer-events-none absolute right-[-120px] top-[-80px] h-[520px] w-[520px] rounded-full bg-[#cbb7d4]/45 blur-[120px]" />

      <div className="pointer-events-none absolute bottom-[-180px] left-[35%] h-[420px] w-[420px] rounded-full bg-[#d8bd8f]/20 blur-[110px]" />

      {/* Decorative Lines */}
      <div className="pointer-events-none absolute left-[8%] top-[18%] h-px w-32 rotate-[-35deg] bg-gradient-to-r from-transparent via-[#c9a56a]/40 to-transparent" />

      <div className="pointer-events-none absolute right-[8%] bottom-[18%] h-px w-40 rotate-[35deg] bg-gradient-to-r from-transparent via-[#c9a56a]/35 to-transparent" />

      <div className="relative mx-auto grid min-h-[760px] max-w-7xl items-center gap-12 px-5 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
        {/* CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-xl"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#21152b]/10 bg-white/55 px-4 py-2 shadow-sm backdrop-blur-xl"
          >
            <Sparkles
              size={14}
              strokeWidth={1.5}
              className="text-[#8d5c91]"
            />

            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#21152b]/65">
              The New Season Edit
            </span>
          </motion.div>

          {/* Heading */}
          <h1 className="font-serif text-[3.3rem] leading-[0.98] tracking-[-0.045em] text-[#21152b] sm:text-6xl lg:text-[5.3rem]">
            Everything you love,
            <span className="mt-2 block bg-gradient-to-r from-[#8d5c91] via-[#a66d91] to-[#b28a63] bg-clip-text italic text-transparent">
              beautifully curated.
            </span>
          </h1>

          {/* Gold Line */}
          <div className="my-7 flex items-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-[#c9a56a] to-transparent" />
            <div className="h-1 w-1 rounded-full bg-[#c9a56a]" />
          </div>

          <p className="max-w-lg text-sm leading-7 text-[#21152b]/60 sm:text-base">
            Discover fashion, beauty, jewelry, accessories, gifts and
            everyday essentials — all in one beautifully designed marketplace.
          </p>

          {/* Buttons */}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/products"
              className="group inline-flex h-13 items-center justify-center gap-3 rounded-xl bg-[#21152b] px-7 text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-[0_15px_40px_rgba(33,21,43,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#8d5c91] hover:shadow-[0_20px_45px_rgba(141,92,145,0.25)]"
            >
              Shop Collection

              <ArrowRight
                size={16}
                strokeWidth={1.6}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/products"
              className="inline-flex h-13 items-center justify-center rounded-xl border border-[#21152b]/12 bg-white/55 px-7 text-xs font-semibold uppercase tracking-[0.14em] text-[#21152b] shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#8d5c91]/25 hover:bg-white/80"
            >
              Explore Collection
            </Link>
          </div>

          {/* Trust Points */}
          <div className="mt-11 grid max-w-lg grid-cols-3 border-t border-[#21152b]/10 pt-6">
            <div>
              <p className="font-serif text-lg text-[#21152b]">75+</p>
              <p className="mt-1 text-[9px] uppercase tracking-[0.12em] text-[#21152b]/40">
                Free Shipping
              </p>
            </div>

            <div className="border-l border-[#21152b]/10 pl-5">
              <p className="font-serif text-lg text-[#21152b]">14</p>
              <p className="mt-1 text-[9px] uppercase tracking-[0.12em] text-[#21152b]/40">
                Day Returns
              </p>
            </div>

            <div className="border-l border-[#21152b]/10 pl-5">
              <p className="font-serif text-lg text-[#21152b]">100%</p>
              <p className="mt-1 text-[9px] uppercase tracking-[0.12em] text-[#21152b]/40">
                Secure
              </p>
            </div>
          </div>
        </motion.div>

        {/* VISUAL */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-xl"
        >
          {/* Outer Glow */}
          <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-[#e5c2cf]/30 via-[#cbb7d4]/20 to-[#d8bd8f]/20 blur-3xl" />

          {/* Image Frame */}
          <div className="relative overflow-hidden rounded-[2.3rem] border border-white/70 bg-[#e8dce9]/70 p-2 shadow-[0_35px_90px_rgba(53,32,60,0.16)]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.8rem]">
              <img
                src="/images/hero/hero.jpg"
                alt="LUXORA Beauty, Fashion and Lifestyle"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[2s] hover:scale-105"
              />

              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#21152b]/25 via-transparent to-white/10" />

              {/* Top Label */}
              <div className="absolute right-5 top-5 rounded-full border border-white/40 bg-white/65 px-4 py-2 backdrop-blur-xl">
                <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#21152b]/70">
                  LUXORA 2026
                </span>
              </div>

              {/* Floating Card */}
              <motion.div
                animate={{ y: [0, -9, 0] }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-5 left-5 rounded-2xl border border-white/50 bg-white/80 p-4 shadow-xl backdrop-blur-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f0e3ef]">
                    <Star
                      size={15}
                      fill="currentColor"
                      className="text-[#b28a63]"
                    />
                  </div>

                  <div>
                    <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-[#21152b]/40">
                      Curated for you
                    </p>

                    <p className="mt-0.5 font-serif text-base text-[#21152b]">
                      New Season
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Decorative Circle */}
          <div className="absolute -right-7 -top-7 -z-10 h-28 w-28 rounded-full border border-[#c9a56a]/25" />
          <div className="absolute -bottom-8 -left-8 -z-10 h-20 w-20 rounded-full border border-[#8d5c91]/20" />
        </motion.div>
      </div>
    </section>
  );
}