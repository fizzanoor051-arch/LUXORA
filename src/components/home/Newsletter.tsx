"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, Sparkles } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#f8f1f5] via-[#fbf7f2] to-[#f1e9f4] py-20 sm:py-24">
      {/* Background Glows */}
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-[#e5bdcc]/30 blur-[110px]" />

      <div className="pointer-events-none absolute -right-32 bottom-[-100px] h-[430px] w-[430px] rounded-full bg-[#cbb7d4]/35 blur-[120px]" />

      <div className="relative mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65 }}
          className="relative overflow-hidden rounded-[2.3rem] border border-white/80 bg-white/55 p-8 text-center shadow-[0_30px_90px_rgba(53,32,60,0.10)] backdrop-blur-2xl sm:p-12 lg:p-16"
        >
          {/* Inner Glow */}
          <div className="pointer-events-none absolute left-1/2 top-[-100px] h-72 w-72 -translate-x-1/2 rounded-full bg-[#e5c2cf]/25 blur-[80px]" />

          {/* Decorative Rings */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full border border-[#c9a56a]/20" />

          <div className="pointer-events-none absolute -bottom-14 -left-14 h-40 w-40 rounded-full border border-[#8d5c91]/10" />

          <div className="relative">
            {/* Icon */}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/80 bg-gradient-to-br from-[#f5e9f4] to-[#f9eee9] shadow-sm">
              <Mail
                size={22}
                strokeWidth={1.3}
                className="text-[#8d5c91]"
              />
            </div>

            <div className="mt-6 inline-flex items-center gap-2">
              <Sparkles
                size={11}
                className="text-[#c9a56a]"
              />

              <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#8d5c91]">
                Join the LUXORA list
              </p>

              <Sparkles
                size={11}
                className="text-[#c9a56a]"
              />
            </div>

            <h2 className="mt-4 font-serif text-4xl tracking-[-0.025em] text-[#21152b] sm:text-5xl">
              A little luxury,
              <span className="block italic text-[#8d5c91]">
                in your inbox.
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-[#21152b]/50">
              Get first access to new collections, exclusive offers, seasonal
              edits, and inspiration from LUXORA.
            </p>

            {/* Form */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mx-auto mt-9 flex max-w-xl flex-col gap-3 sm:flex-row"
            >
              <div className="relative flex-1">
                <Mail
                  size={15}
                  strokeWidth={1.5}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#21152b]/30"
                />

                <input
                  type="email"
                  placeholder="Your email address"
                  aria-label="Email address"
                  className="h-12 w-full rounded-xl border border-[#21152b]/10 bg-white/65 pl-11 pr-4 text-sm text-[#21152b] outline-none backdrop-blur transition placeholder:text-[#21152b]/30 focus:border-[#8d5c91]/45 focus:bg-white/80"
                />
              </div>

              <button
                type="submit"
                className="group flex h-12 items-center justify-center gap-2 rounded-xl bg-[#21152b] px-7 text-[10px] font-semibold uppercase tracking-[0.14em] text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#8d5c91]"
              >
                Subscribe

                <ArrowRight
                  size={15}
                  strokeWidth={1.5}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </form>

            <p className="mt-4 text-[10px] text-[#21152b]/30">
              By subscribing, you agree to receive emails from LUXORA.
            </p>

            {/* Bottom Gold Line */}
            <div className="mx-auto mt-9 flex max-w-xs items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#c9a56a]/40" />

              <div className="h-1 w-1 rounded-full bg-[#c9a56a]/60" />

              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#c9a56a]/40" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}