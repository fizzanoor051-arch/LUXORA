"use client";

import { Banknote, CreditCard, Wallet } from "lucide-react";

interface PaymentMethodProps {
  value: string;
  onChange: (value: string) => void;
}

const methods = [
  {
    id: "cod",
    title: "Cash on Delivery",
    description: "Pay when your order arrives.",
    icon: Banknote,
  },
  {
    id: "card",
    title: "Credit / Debit Card",
    description: "Secure online card payment.",
    icon: CreditCard,
  },
  {
    id: "wallet",
    title: "Digital Wallet",
    description: "Pay using your preferred wallet.",
    icon: Wallet,
  },
];

export default function PaymentMethod({
  value,
  onChange,
}: PaymentMethodProps) {
  return (
    <section className="rounded-2xl border border-black/[0.06] bg-white p-6 md:p-8">
      <div className="mb-6">
        <h2 className="font-serif text-2xl font-semibold text-[#21152b]">
          Payment Method
        </h2>

        <p className="mt-1 text-xs text-[#817783]">
          Choose how you would like to pay.
        </p>
      </div>

      <div className="space-y-3">
        {methods.map((method) => {
          const Icon = method.icon;
          const selected = value === method.id;

          return (
            <button
              key={method.id}
              type="button"
              onClick={() => onChange(method.id)}
              className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${
                selected
                  ? "border-[#8d5c91] bg-[#f8f2f9]"
                  : "border-black/[0.07] bg-white hover:border-[#8d5c91]/40"
              }`}
            >
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                  selected
                    ? "bg-[#21152b] text-white"
                    : "bg-[#f4f0f5] text-[#6d6370]"
                }`}
              >
                <Icon size={19} strokeWidth={1.6} />
              </div>

              <div className="flex-1">
                <p className="text-sm font-medium text-[#302536]">
                  {method.title}
                </p>

                <p className="mt-1 text-xs text-[#817783]">
                  {method.description}
                </p>
              </div>

              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                  selected
                    ? "border-[#8d5c91]"
                    : "border-black/20"
                }`}
              >
                {selected && (
                  <span className="h-2.5 w-2.5 rounded-full bg-[#8d5c91]" />
                )}
              </span>
            </button>
          );
        })}
      </div>

      {value === "card" && (
        <div className="mt-5 rounded-xl bg-[#faf8fb] p-4 text-xs leading-5 text-[#716775]">
          Card payment integration can be connected here later
          using your payment provider and backend API.
        </div>
      )}

      {value === "wallet" && (
        <div className="mt-5 rounded-xl bg-[#faf8fb] p-4 text-xs leading-5 text-[#716775]">
          Digital wallet options can be connected here when
          the payment API is integrated.
        </div>
      )}
    </section>
  );
}