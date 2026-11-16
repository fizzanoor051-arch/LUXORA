"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Icon from "@/components/ui/CategoryIcons";

// 3D scene is a separate chunk, loaded after first paint (ssr: false)
const HeroScene3D = dynamic(() => import("@/components/fx/HeroScene3D"), { ssr: false });

const MARQUEE = ["Makeup", "Jewelry", "Fashion", "Shoes", "Bags", "Watches", "Gifts", "Lifestyle"];

/**
 * Cinematic 3D hero. Text uses pure-CSS entrances (visible in the server HTML, no JS needed),
 * the image is preloaded, and the WebGL scene arrives lazily. Reduced-motion safe.
 */
export default function HeroSection() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 80]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -40]);
  const [shipping, setShipping] = useState("Free shipping over $75");

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((d) => d.freeShippingThreshold && setShipping(`Free shipping over $${d.freeShippingThreshold}`))
      .catch(() => undefined);
  }, []);

  const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

  return (
    <section ref={ref} data-no-reveal className="relative overflow-hidden bg-[#fbf7f3]">
      <div className="pointer-events-none absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-[#e7c3d0]/45 blur-[90px]" />
      <div className="pointer-events-none absolute -right-32 -top-20 h-[460px] w-[460px] rounded-full bg-[#cbb7d4]/45 blur-[100px]" />

      {/* WebGL 3D layer */}
      <HeroScene3D className="inset-y-0 right-0 z-[1] w-full lg:w-[62%]" />

      <div className="relative z-[2] mx-auto grid min-h-[760px] max-w-7xl items-center gap-12 px-5 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <motion.div style={{ y: textY }} className="relative max-w-xl">
          <p style={d(0)} className="hero-rise mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8d5c91]">
            <span className="h-px w-10 bg-[#c9a56a]" /> The New Season Edit
          </p>

          <h1 className="font-serif text-[3.4rem] leading-[0.95] tracking-[-0.045em] text-[#21152b] sm:text-7xl lg:text-[5.6rem]">
            {["Everything", "you", "love,"].map((w, i) => (
              <span key={w} style={d(80 + i * 90)} className="hero-rise mr-[0.25em] inline-block">{w}</span>
            ))}
            <span style={d(400)} className="hero-rise text-shimmer mt-2 block italic">beautifully curated.</span>
          </h1>

          <p style={d(560)} className="hero-rise mt-7 max-w-md text-base leading-8 text-[#21152b]/60">
            Beauty, jewelry, fashion, bags and gifts, chosen with care and delivered to your door. Discover pieces you will keep for years.
          </p>

          <div style={d(680)} className="hero-rise mt-9 flex flex-wrap items-center gap-4">
            <Link href="/products" className="group inline-flex items-center gap-3 rounded-full bg-[#21152b] px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-xl shadow-[#21152b]/20 transition duration-300 hover:-translate-y-0.5 hover:bg-[#8d5c91]">
              Shop Collection
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </Link>
            <Link href="/categories" className="rounded-full border border-[#21152b]/15 px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#21152b] transition hover:border-[#21152b] hover:bg-white">
              Explore Categories
            </Link>
          </div>

          <div style={d(800)} className="hero-rise mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-[#21152b]/60">
            <span className="flex items-center gap-2"><Icon name="star" size={16} className="text-[#c9a56a]" /> 4.9 average rating</span>
            <span className="flex items-center gap-2"><Icon name="truck" size={16} className="text-[#8d5c91]" /> {shipping}</span>
            <span className="flex items-center gap-2"><Icon name="shield" size={16} className="text-[#8d5c91]" /> Secure checkout</span>
          </div>
        </motion.div>

        {/* Image with 3D tilt */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="absolute -inset-4 rounded-t-[999px] rounded-b-[2rem] border border-[#c9a56a]/40" aria-hidden />
          <motion.div style={{ y: imgY }}>
            <div data-tilt="7" className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-[#ebe0e6] shadow-2xl shadow-[#21152b]/20">
              <Image src="/images/hero/hero.jpg" alt="LUXORA Beauty, Fashion and Lifestyle" fill priority fetchPriority="high" sizes="(max-width: 1024px) 90vw, 520px" className="object-cover" />
            </div>
          </motion.div>
          <div style={d(900)} className="hero-rise float-slow absolute -left-4 bottom-20 hidden rounded-2xl border border-white/60 bg-white/80 px-5 py-4 shadow-xl backdrop-blur-xl sm:block">
            <p className="font-serif text-2xl text-[#21152b]">57+</p>
            <p className="text-[11px] uppercase tracking-widest text-[#21152b]/55">Curated pieces</p>
          </div>
          <div style={d(1000)} className="hero-rise float-slow absolute -right-3 top-16 hidden rounded-2xl border border-white/60 bg-[#21152b]/90 px-5 py-4 text-white shadow-xl backdrop-blur-xl [animation-delay:-3s] sm:block">
            <p className="font-serif text-2xl text-[#e9d3a6]">New</p>
            <p className="text-[11px] uppercase tracking-widest text-white/60">Season edit</p>
          </div>
        </div>
      </div>

      <div className="relative z-[2] border-y border-[#21152b]/10 bg-white/70 py-4 backdrop-blur">
        <div className="flex w-max animate-[luxoraMarquee_32s_linear_infinite] gap-12 whitespace-nowrap px-6">
          {[...MARQUEE, ...MARQUEE, ...MARQUEE].map((m, i) => (
            <Link key={i} href={`/categories/${m.toLowerCase()}`} className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#21152b]/45 transition hover:text-[#8d5c91]">
              <Icon name={m.toLowerCase()} size={16} /> {m} <span className="ml-9 text-[#c9a56a]">✦</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
