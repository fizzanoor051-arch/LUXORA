import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Clock3,
  MapPin,
  Package,
  Truck,
} from "lucide-react";

interface OrderProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  variant?: string;
}

interface OrderDetailsProps {
  orderId: string;
  status: "Processing" | "Shipped" | "Delivered";
  date: string;
  items: OrderProduct[];
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    country: string;
  };
  subtotal: number;
  shipping: number;
  tax: number;
}

export default function OrderDetails({
  orderId,
  status,
  date,
  items,
  shippingAddress,
  subtotal,
  shipping,
  tax,
}: OrderDetailsProps) {
  const total = subtotal + shipping + tax;

  const steps = [
    {
      label: "Order Placed",
      icon: Check,
      active: true,
    },
    {
      label: "Processing",
      icon: Clock3,
      active:
        status === "Processing" ||
        status === "Shipped" ||
        status === "Delivered",
    },
    {
      label: "Shipped",
      icon: Truck,
      active:
        status === "Shipped" ||
        status === "Delivered",
    },
    {
      label: "Delivered",
      icon: Package,
      active: status === "Delivered",
    },
  ];

  return (
    <div className="space-y-6">
      <Link
        href="/account/orders"
        className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.08em] text-[#8d5c91] transition hover:text-[#21152b]"
      >
        <ArrowLeft size={15} />
        Back to Orders
      </Link>

      <section className="rounded-2xl border border-black/[0.06] bg-white p-6 md:p-8">
        <div className="flex flex-col gap-4 border-b border-black/[0.06] pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-[#958c99]">
              Order Details
            </p>

            <h1 className="mt-2 font-serif text-3xl font-semibold text-[#21152b]">
              #{orderId}
            </h1>

            <p className="mt-2 text-xs text-[#817783]">
              Placed on {date}
            </p>
          </div>

          <span className="w-fit rounded-full bg-[#f3eaf4] px-4 py-2 text-[10px] font-medium uppercase tracking-[0.1em] text-[#8d5c91]">
            {status}
          </span>
        </div>

        <div className="mt-8 grid grid-cols-4 gap-2">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.label}
                className="relative text-center"
              >
                {index < steps.length - 1 && (
                  <div
                    className={`absolute left-[55%] top-5 h-px w-[90%] ${
                      steps[index + 1].active
                        ? "bg-[#8d5c91]"
                        : "bg-black/10"
                    }`}
                  />
                )}

                <div
                  className={`relative mx-auto flex h-10 w-10 items-center justify-center rounded-full ${
                    step.active
                      ? "bg-[#21152b] text-white"
                      : "bg-[#f2eef3] text-[#aaa1ad]"
                  }`}
                >
                  <Icon size={17} strokeWidth={1.7} />
                </div>

                <p
                  className={`mt-2 text-[9px] uppercase tracking-[0.05em] sm:text-[10px] ${
                    step.active
                      ? "font-medium text-[#302536]"
                      : "text-[#aaa1ad]"
                  }`}
                >
                  {step.label}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-2xl border border-black/[0.06] bg-white p-6 md:p-8">
        <h2 className="font-serif text-2xl font-semibold text-[#21152b]">
          Ordered Items
        </h2>

        <div className="mt-6 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border-b border-black/[0.06] pb-4 last:border-0 last:pb-0"
            >
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#f4edf5] font-serif text-lg text-[#8d5c91]">
                L
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-medium text-[#302536]">
                  {item.name}
                </h3>

                {item.variant && (
                  <p className="mt-1 text-xs text-[#817783]">
                    {item.variant}
                  </p>
                )}

                <p className="mt-1 text-xs text-[#817783]">
                  Qty: {item.quantity}
                </p>
              </div>

              <p className="text-sm font-medium text-[#302536]">
                $
                {(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-black/[0.06] bg-white p-6">
          <div className="flex items-center gap-3">
            <MapPin
              size={19}
              className="text-[#8d5c91]"
              strokeWidth={1.6}
            />

            <h2 className="font-serif text-xl font-semibold text-[#21152b]">
              Shipping Address
            </h2>
          </div>

          <div className="mt-5 text-sm leading-6 text-[#716775]">
            <p className="font-medium text-[#302536]">
              {shippingAddress.name}
            </p>
            <p>{shippingAddress.address}</p>
            <p>
              {shippingAddress.city},{" "}
              {shippingAddress.country}
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-black/[0.06] bg-white p-6">
          <h2 className="font-serif text-xl font-semibold text-[#21152b]">
            Payment Summary
          </h2>

          <div className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between text-[#716775]">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-[#716775]">
              <span>Shipping</span>
              <span>
                {shipping === 0
                  ? "FREE"
                  : `$${shipping.toFixed(2)}`}
              </span>
            </div>

            <div className="flex justify-between text-[#716775]">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            <div className="my-4 border-t border-black/[0.06]" />

            <div className="flex justify-between">
              <span className="font-medium text-[#302536]">
                Total
              </span>

              <span className="font-serif text-2xl font-semibold text-[#21152b]">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}