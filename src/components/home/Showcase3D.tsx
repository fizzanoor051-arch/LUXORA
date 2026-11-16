"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { products } from "@/data/products";

const PICKS = products.filter((p) => p.isBestSeller && p.image).slice(0, 10);

/** Rotating 3D ring of best-sellers (pure CSS 3D, pauses on hover, cards link to products). */
export default function Showcase3D() {
  const n = PICKS.length;
  const [R, setR] = useState(380);
  useEffect(() => {
    const fit = () => setR(window.innerWidth < 640 ? 230 : window.innerWidth < 1024 ? 310 : 400);
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#17111f] py-24 text-white">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8d5c91]/25 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-6 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#c9a56a]">In the spotlight</p>
        <h2 className="mt-3 font-serif text-4xl sm:text-6xl">Our best-sellers, <span className="text-shimmer italic">in motion</span></h2>
        <p className="mx-auto mt-4 max-w-md text-sm text-white/55">Hover to pause. Tap any piece to explore it.</p>
      </div>

      <div className="ring-scene relative mx-auto mt-14 flex h-[430px] items-center justify-center sm:h-[480px]" style={{ perspective: "1400px" }}>
        <div className="ring-track relative h-[330px] w-[210px] sm:h-[380px] sm:w-[240px]" style={{ transformStyle: "preserve-3d" }}>
          {PICKS.map((p, i) => (
            <Link
              key={p.id}
              href={`/products/${p.slug}`}
              className="absolute inset-0 block overflow-hidden rounded-2xl border border-white/15 bg-white/5 shadow-2xl backdrop-blur transition-transform duration-500 hover:scale-[1.04]"
              style={{ transform: `rotateY(${(360 / n) * i}deg) translateZ(${R}px)`, backfaceVisibility: "hidden" }}
              aria-label={`${p.name}, $${p.price}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt={p.name} loading="lazy" decoding="async" className="h-[78%] w-full object-cover" />
              <div className="flex h-[22%] items-center justify-between gap-2 bg-[#17111f]/80 px-4">
                <span className="truncate text-sm">{p.name}</span>
                <span className="shrink-0 text-sm font-semibold text-[#e9d3a6]">${p.price}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
