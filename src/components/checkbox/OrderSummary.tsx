import Image from "next/image";
import { ShoppingBag, Truck } from "lucide-react";
import type { CheckoutItem } from "./CheckoutForm";

interface OrderSummaryProps {
  items: CheckoutItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export default function OrderSummary({
  items,
  subtotal,
  shipping,
  tax,
  total,
}: OrderSummaryProps) {
  return (
    <aside className="sticky top-24 rounded-2xl border border-black/[0.06] bg-white p-6">
      <div className="mb-6 flex items-center gap-3">
        <ShoppingBag
          size={19}
          strokeWidth={1.6}
          className="text-[#8d5c91]"
        />

        <h2 className="font-serif text-2xl font-semibold text-[#21152b]">
          Your Order
        </h2>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex gap-3 border-b border-black/[0.06] pb-4"
          >
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#f3edf4]">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              ) : (
                <div className="flex h-full items-center justify-center font-serif text-lg text-[#8d5c91]">
                  L
                </div>
              )}

              <span className="absolute right-1 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#21152b] px-1 text-[10px] text-white">
                {item.quantity}
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <p className="line-clamp-2 text-sm font-medium text-[#302536]">
                {item.name}
              </p>

              {item.variant && (
                <p className="mt-1 text-xs text-[#817783]">
                  {item.variant}
                </p>
              )}
            </div>

            <p className="text-sm font-medium text-[#302536]">
              ${(
                item.price * item.quantity
              ).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-3 text-sm">
        <div className="flex justify-between text-[#6f6673]">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-[#6f6673]">
          <span className="flex items-center gap-2">
            <Truck size={15} />
            Shipping
          </span>

          <span>
            {shipping === 0
              ? "FREE"
              : `$${shipping.toFixed(2)}`}
          </span>
        </div>

        <div className="flex justify-between text-[#6f6673]">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
      </div>

      {shipping === 0 && (
        <div className="mt-5 rounded-xl bg-[#f5eef6] px-4 py-3 text-xs text-[#76527b]">
          🎉 You unlocked free shipping!
        </div>
      )}

      <div className="my-6 border-t border-black/[0.07]" />

      <div className="flex items-end justify-between">
        <span className="text-sm font-medium text-[#302536]">
          Total
        </span>

        <span className="font-serif text-3xl font-semibold text-[#21152b]">
          ${total.toFixed(2)}
        </span>
      </div>

      <p className="mt-4 text-center text-[11px] leading-5 text-[#968d99]">
        Taxes and shipping are calculated based on your
        order details.
      </p>
    </aside>
  );
}