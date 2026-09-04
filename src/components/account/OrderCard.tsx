import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Package,
} from "lucide-react";

export interface OrderData {
  id: string;
  date: string;
  status:
    | "Processing"
    | "Shipped"
    | "Delivered"
    | "Cancelled";
  total: number;
  items: number;
}

interface OrderCardProps {
  order: OrderData;
}

const statusStyles = {
  Processing: "bg-[#fff7e8] text-[#9a7028]",
  Shipped: "bg-[#eef5ff] text-[#5575a0]",
  Delivered: "bg-[#edf8ef] text-[#5c825f]",
  Cancelled: "bg-[#fff0f0] text-[#9a5b5b]",
};

export default function OrderCard({
  order,
}: OrderCardProps) {
  return (
    <div className="rounded-2xl border border-black/[0.06] bg-white p-5 transition hover:border-[#8d5c91]/20 hover:shadow-sm">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f4edf5]">
            <Package
              size={20}
              strokeWidth={1.6}
              className="text-[#8d5c91]"
            />
          </div>

          <div>
            <p className="text-sm font-medium text-[#302536]">
              Order #{order.id}
            </p>

            <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-[#8b828f]">
              <span className="flex items-center gap-1.5">
                <CalendarDays size={13} />
                {order.date}
              </span>

              <span>•</span>

              <span>
                {order.items}{" "}
                {order.items === 1 ? "item" : "items"}
              </span>
            </div>
          </div>
        </div>

        <span
          className={`w-fit rounded-full px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.08em] ${
            statusStyles[order.status]
          }`}
        >
          {order.status}
        </span>
      </div>

      <div className="mt-5 flex flex-col gap-4 border-t border-black/[0.06] pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.08em] text-[#958c99]">
            Total
          </p>

          <p className="mt-1 font-serif text-xl font-semibold text-[#21152b]">
            ${order.total.toFixed(2)}
          </p>
        </div>

        <Link
          href={`/account/orders/${order.id}`}
          className="flex items-center justify-center gap-2 rounded-xl border border-black/[0.08] px-5 py-3 text-xs font-medium uppercase tracking-[0.08em] text-[#302536] transition hover:border-[#8d5c91] hover:text-[#8d5c91]"
        >
          View Details
          <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}