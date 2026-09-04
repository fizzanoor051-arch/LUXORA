"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck } from "lucide-react";

interface CartSummaryProps {
  subtotal: number;
  shipping?: number;
  discount?: number;
  tax?: number;
}

export default function CartSummary({
  subtotal,
  shipping = 0,
  discount = 0,
  tax = 0,
}: CartSummaryProps) {
  const finalShipping = subtotal >= 75 ? 0 : shipping;
  const total = subtotal + finalShipping + tax - discount;

  return (
    <aside className="rounded-2xl bg-[#faf7fa] p-6 sm:p-7">
      <h2 className="font-serif text-2xl text-[#21152b]">
        Order Summary
      </h2>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#21152b]/50">Subtotal</span>
          <span className="font-medium text-[#21152b]">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-[#21152b]/50">Shipping</span>

          {finalShipping === 0 ? (
            <span className="font-medium text-[#8d5c91]">
              FREE
            </span>
          ) : (
            <span className="font-medium text-[#21152b]">
              ${finalShipping.toFixed(2)}
            </span>
          )}
        </div>

        {discount > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#21152b]/50">Discount</span>
            <span className="font-medium text-green-600">
              -${discount.toFixed(2)}
            </span>
          </div>
        )}

        {tax > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#21152b]/50">Estimated Tax</span>
            <span className="font-medium text-[#21152b]">
              ${tax.toFixed(2)}
            </span>
          </div>
        )}
      </div>

      <div className="my-6 h-px bg-black/[0.07]" />

      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold uppercase tracking-[0.08em] text-[#21152b]">
          Total
        </span>

        <span className="font-serif text-2xl font-semibold text-[#21152b]">
          ${total.toFixed(2)}
        </span>
      </div>

      <Link
        href="/checkout"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#21152b] px-6 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#8d5c91]"
      >
        Proceed to Checkout
        <ArrowRight size={16} strokeWidth={1.5} />
      </Link>

      <div className="mt-5 space-y-3 border-t border-black/[0.06] pt-5">
        <div className="flex items-center gap-3">
          <Truck
            size={17}
            strokeWidth={1.4}
            className="text-[#8d5c91]"
          />
          <span className="text-xs text-[#21152b]/50">
            Free shipping on orders over $75
          </span>
        </div>

        <div className="flex items-center gap-3">
          <ShieldCheck
            size={17}
            strokeWidth={1.4}
            className="text-[#8d5c91]"
          />
          <span className="text-xs text-[#21152b]/50">
            Secure and protected checkout
          </span>
        </div>
      </div>
    </aside>
  );
}