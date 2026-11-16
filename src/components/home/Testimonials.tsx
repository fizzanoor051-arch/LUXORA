"use client";

import { motion } from "framer-motion";
import { Quote, Star, Sparkles } from "lucide-react";

const testimonials = [
  {
    name: "Sophia Williams",
    role: "Verified Customer",
    text: "LUXORA makes online shopping feel completely different. Everything feels beautifully curated and the experience is so smooth.",
    rating: 5,
  },
  {
    name: "Amelia Carter",
    role: "Verified Customer",
    text: "I discovered so many beautiful pieces here. The design is elegant, the products are easy to explore, and checkout was effortless.",
    rating: 5,
  },
  {
    name: "Olivia Bennett",
    role: "Verified Customer",
    text: "Absolutely love the selection. LUXORA has quickly become one of my favorite places to discover fashion and lifestyle products.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#fbf7f3] via-[#f8eff6] to-[#f5edf5] py-20 sm:py-24">
      {/* Background Glows */}
      <div className="pointer-events-none absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-[#e6c1cf]/25 blur-[120px]" />

      <div className="pointer-events-none absolute -right-40 bottom-[-100px] h-[450px] w-[450px] rounded-full bg-[#cbb7d4]/30 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#8d5c91]/10 bg-white/55 px-4 py-2 shadow-sm backdrop-blur-xl">
            <Sparkles
              size={12}
              strokeWidth={1.5}
              className="text-[#c9a56a]"
            />

            <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#8d5c91]">
              Customer love
            </p>
          </div>

          <h2 className="font-serif text-4xl tracking-[-0.025em] text-[#21152b] sm:text-5xl">
            Loved by our community
          </h2>

          <div className="mx-auto mt-4 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#c9a56a]/60" />

            <p className="text-sm leading-6 text-[#21152b]/50">
              Real experiences from people who shop, discover, and fall in
              love with LUXORA.
            </p>

            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#c9a56a]/60" />
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.55,
                delay: index * 0.1,
              }}
              className="group relative overflow-hidden rounded-[1.7rem] border border-white/80 bg-white/55 p-7 shadow-[0_20px_60px_rgba(53,32,60,0.07)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:bg-white/70 hover:shadow-[0_30px_75px_rgba(53,32,60,0.12)]"
            >
              {/* Decorative Glow */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#d8bfd9]/20 blur-2xl transition group-hover:bg-[#d8bfd9]/35" />

              {/* Quote */}
              <div className="relative flex items-start justify-between">
                <Quote
                  size={28}
                  strokeWidth={1.1}
                  className="text-[#8d5c91]/55"
                />

                <span className="font-serif text-3xl text-[#21152b]/[0.05]">
                  “”
                </span>
              </div>

              {/* Stars */}
              <div className="relative mt-5 flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={13}
                    fill="currentColor"
                    strokeWidth={1.2}
                    className="text-[#c49b63]"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="relative mt-5 text-sm leading-7 text-[#21152b]/60">
                “{testimonial.text}”
              </p>

              {/* Customer */}
              <div className="relative mt-7 flex items-center gap-3 border-t border-[#21152b]/[0.07] pt-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/80 bg-gradient-to-br from-[#ead5df] to-[#d9c9df] font-serif text-sm text-[#21152b]/65 shadow-sm">
                  {testimonial.name.charAt(0)}
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-[#21152b]">
                    {testimonial.name}
                  </h3>

                  <div className="mt-1 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#8d5c91]" />

                    <p className="text-[9px] uppercase tracking-[0.14em] text-[#21152b]/35">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 flex items-center justify-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#c9a56a]/25" />

          <span className="font-serif text-xs italic text-[#8d5c91]/55">
            Your experience matters
          </span>

          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#c9a56a]/25" />
        </div>
      </div>
    </section>
  );
}