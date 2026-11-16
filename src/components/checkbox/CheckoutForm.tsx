"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import ShippingForm from "./ShippingForm";
import PaymentMethod from "./PaymentMethod";
import OrderSummary from "./OrderSummary";
import OrderSuccess from "./OrderSuccess";

export interface ShippingData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface CheckoutItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  variant?: string;
}

const demoItems: CheckoutItem[] = [
  {
    id: "1",
    name: "Luxury Rose Beauty Set",
    price: 49,
    quantity: 1,
    variant: "Rose",
  },
  {
    id: "2",
    name: "Elegant Gold Necklace",
    price: 79,
    quantity: 1,
    variant: "Gold",
  },
];

export default function CheckoutForm() {
  const [shipping, setShipping] = useState<ShippingData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "Pakistan",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = demoItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shippingCost = subtotal >= 75 ? 0 : 8;
  const tax = subtotal * 0.05;
  const total = subtotal + shippingCost + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <OrderSuccess
        orderNumber={`LX-${Math.floor(100000 + Math.random() * 900000)}`}
        email={shipping.email}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="min-h-screen bg-[#faf8fb]">
      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-16">
        <div className="mb-10">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-[#8d5c91]">
            LUXORA CHECKOUT
          </p>

          <h1 className="font-serif text-4xl font-semibold text-[#21152b] md:text-5xl">
            Complete Your Order
          </h1>

          <p className="mt-3 text-sm text-[#6f6673]">
            Secure checkout with a smooth and simple shopping experience.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_390px]">
          <div className="space-y-6">
            <ShippingForm
              data={shipping}
              onChange={setShipping}
            />

            <PaymentMethod
              value={paymentMethod}
              onChange={setPaymentMethod}
            />

            <div className="rounded-2xl border border-black/[0.06] bg-white p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3eaf4]">
                  <ShieldCheck
                    size={19}
                    strokeWidth={1.6}
                    className="text-[#8d5c91]"
                  />
                </div>

                <div>
                  <h3 className="font-medium text-[#21152b]">
                    Secure Checkout
                  </h3>

                  <p className="text-xs text-[#817783]">
                    Your information is protected and encrypted.
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#21152b] py-4 text-sm font-medium uppercase tracking-[0.12em] text-white transition hover:bg-[#8d5c91]"
              >
                Place Order
                <ArrowRight size={17} strokeWidth={1.7} />
              </motion.button>
            </div>
          </div>

          <div>
            <OrderSummary
              items={demoItems}
              subtotal={subtotal}
              shipping={shippingCost}
              tax={tax}
              total={total}
            />
          </div>
        </div>
      </div>
    </form>
  );
}