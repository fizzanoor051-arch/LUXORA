
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const posts = [
  {
    id: 1,
    label: "Beauty Edit",
    image: "/images/instagram/1.jpg",
  },
  {
    id: 2,
    label: "Jewelry Story",
    image: "/images/instagram/2.jpg",
  },
  {
    id: 3,
    label: "Everyday Style",
    image: "/images/instagram/3.jpg",
  },
  {
    id: 4,
    label: "New Season",
    image: "/images/instagram/4.jpg",
  },
  {
    id: 5,
    label: "Gift Inspiration",
    image: "/images/instagram/5.jpg",
  },
  {
    id: 6,
    label: "LUXORA Life",
    image: "/images/instagram/6.jpg",
  },
];

export default function InstagramShowcase() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#f7f1f8] px-4 py-2">
              <span className="text-sm font-semibold text-[#8d5c91]">
                IG
              </span>

              <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8d5c91]">
                Follow the story
              </span>
            </div>

            <h2 className="font-serif text-4xl tracking-tight text-[#21152b] sm:text-5xl">
              LUXORA on Instagram
            </h2>

            <p className="mt-3 max-w-md text-sm leading-6 text-[#21152b]/50">
              Style inspiration, new arrivals, beauty moments, and a closer
              look at the world of LUXORA.
            </p>
          </div>

          <Link
            href="#"
            className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#21152b]"
          >
            @luxora

            <ArrowUpRight
              size={15}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {posts.map((post, index) => (
            <motion.a
              key={post.id}
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.45,
                delay: index * 0.05,
              }}
              className="group relative aspect-square overflow-hidden rounded-xl bg-[#e8dce9]"
            >
              {/* Instagram Image */}
              <img
                src={post.image}
                alt={`LUXORA ${post.label}`}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#21152b]/65 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">

                <span className="text-sm font-semibold text-white">
                  IG
                </span>

                <span className="mt-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/80">
                  {post.label}
                </span>

              </div>
            </motion.a>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 text-center">
          <p className="text-xs text-[#21152b]/35">
            Join our growing community for daily inspiration.
          </p>
        </div>

      </div>
    </section>
  );
}
