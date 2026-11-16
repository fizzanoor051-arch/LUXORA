"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Package,
  ShoppingBag,
} from "lucide-react";

const orders = [
  {
    id: "LX-2026-00124",
    date: "September 01, 2026",
    status: "Delivered",
    total: 128,
    items: 2,
  },
  {
    id: "LX-2026-00098",
    date: "August 24, 2026",
    status: "In Transit",
    total: 179,
    items: 3,
  },
  {
    id: "LX-2026-00061",
    date: "August 11, 2026",
    status: "Delivered",
    total: 89,
    items: 1,
  },
];

export default function OrdersPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fbf7f3] text-[#21152b]">
      <div className="pointer-events-none absolute left-[-100px] top-20 h-80 w-80 rounded-full bg-[#ead0d8]/50 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:py-16">
        <Link
          href="/account"
          className="mb-8 inline-flex items-center gap-2 text-xs font-semibold text-[#21152b]/45 transition hover:text-[#8d5c91]"
        >
          <ArrowLeft size={14} />
          Back to account
        </Link>

        <div className="mb-10">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#8d5c91]">
            Your purchases
          </p>

          <h1 className="mt-3 font-serif text-4xl sm:text-5xl">
            Order history
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-[#21152b]/50">
            Review your recent LUXORA purchases and delivery status.
          </p>
        </div>

        <div className="space-y-4">
          {orders.map((order, index) => (
            <motion.article
              key={order.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="rounded-2xl border border-[#21152b]/8 bg-white p-6 shadow-sm transition hover:shadow-lg sm:p-7"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f6edf4] text-[#8d5c91]">
                    <Package size={20} />
                  </div>

                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#8d5c91]">
                      Order
                    </p>

                    <h2 className="mt-1 font-serif text-xl">
                      {order.id}
                    </h2>

                    <div className="mt-2 flex flex-wrap gap-4 text-xs text-[#21152b]/40">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays size={13} />
                        {order.date}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <ShoppingBag size={13} />
                        {order.items}{" "}
                        {order.items === 1 ? "item" : "items"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-5 lg:justify-end">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.15em] text-[#21152b]/35">
                      Total
                    </p>

                    <p className="mt-1 font-semibold">
                      ${order.total.toFixed(2)}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] ${
                      order.status === "Delivered"
                        ? "bg-[#edf7ef] text-[#4f8a62]"
                        : "bg-[#f7f0e7] text-[#a47d43]"
                    }`}
                  >
                    {order.status}
                  </span>

                  <button
                    type="button"
                    className="inline-flex h-10 items-center gap-2 rounded-xl border border-[#21152b]/10 px-4 text-xs font-semibold transition hover:border-[#8d5c91]/40 hover:text-[#8d5c91]"
                  >
                    View order
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-dashed border-[#21152b]/12 bg-white/50 p-8 text-center">
          <p className="font-serif text-2xl">Looking for something new?</p>

          <p className="mt-2 text-sm text-[#21152b]/45">
            Discover the latest pieces curated by LUXORA.
          </p>

          <Link
            href="/products"
            className="mt-5 inline-flex h-11 items-center gap-2 rounded-xl bg-[#21152b] px-5 text-xs font-semibold text-white transition hover:bg-[#8d5c91]"
          >
            Continue shopping
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </main>
  );
}