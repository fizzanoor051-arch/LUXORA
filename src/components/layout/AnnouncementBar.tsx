"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";
import { useState } from "react";

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="relative z-50 bg-[#17111f] px-4 py-2.5 text-center text-[11px] tracking-[0.18em] text-white sm:text-xs"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 pr-6">
        <span className="hidden sm:inline">✨</span>

        <p>
          <span className="font-medium">WELCOME TO LUXORA</span>
          <span className="mx-2 hidden text-white/40 sm:inline">•</span>
          <span className="hidden sm:inline">
            Free shipping on orders over $75
          </span>
          <span className="sm:hidden">Free shipping over $75</span>
        </p>

        <Link
          href="/products"
          className="ml-1 font-semibold underline underline-offset-4 transition-opacity hover:opacity-70"
        >
          Shop Now
        </Link>
      </div>

      <button
        type="button"
        aria-label="Close announcement"
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-white/60 transition hover:bg-white/10 hover:text-white sm:right-5"
      >
        <X size={14} strokeWidth={1.8} />
      </button>
    </motion.div>
  );
}