"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  PackageCheck,
} from "lucide-react";

interface OrderSuccessProps {
  orderNumber: string;
  email: string;
}

export default function OrderSuccess({
  orderNumber,
  email,
}: OrderSuccessProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#faf8fb] px-5 py-16">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl rounded-3xl border border-black/[0.06] bg-white p-8 text-center shadow-sm md:p-14"
      >
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: 0.15,
            duration: 0.45,
          }}
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#f1e7f3]"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#21152b] text-white">
            <Check size={25} strokeWidth={2} />
          </div>
        </motion.div>

        <p className="mt-8 text-xs font-medium uppercase tracking-[0.25em] text-[#8d5c91]">
          ORDER CONFIRMED
        </p>

        <h1 className="mt-3 font-serif text-4xl font-semibold text-[#21152b] md:text-5xl">
          Thank You!
        </h1>

        <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-[#716775]">
          Your order has been successfully placed. We are
          preparing your items with care.
        </p>

        <div className="mx-auto mt-8 max-w-md rounded-2xl bg-[#faf8fb] p-5">
          <div className="flex items-center justify-center gap-3">
            <PackageCheck
              size={20}
              strokeWidth={1.6}
              className="text-[#8d5c91]"
            />

            <span className="text-sm font-medium text-[#302536]">
              Order #{orderNumber}
            </span>
          </div>

          {email && (
            <p className="mt-3 text-xs text-[#817783]">
              Confirmation details will be sent to{" "}
              <span className="font-medium text-[#302536]">
                {email}
              </span>
            </p>
          )}
        </div>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/products"
            className="flex items-center justify-center gap-2 rounded-xl bg-[#21152b] px-7 py-3.5 text-xs font-medium uppercase tracking-[0.12em] text-white transition hover:bg-[#8d5c91]"
          >
            Continue Shopping
            <ArrowRight size={16} />
          </Link>

          <Link
            href="/account/orders"
            className="flex items-center justify-center rounded-xl border border-black/[0.08] px-7 py-3.5 text-xs font-medium uppercase tracking-[0.12em] text-[#302536] transition hover:border-[#8d5c91] hover:text-[#8d5c91]"
          >
            View Order
          </Link>
        </div>

        <p className="mt-8 text-[11px] text-[#a098a3]">
          Thank you for shopping with LUXORA.
        </p>
      </motion.div>
    </main>
  );
}