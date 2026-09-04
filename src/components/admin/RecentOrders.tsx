"use client";

import Link from "next/link";
import { ArrowUpRight, Clock3 } from "lucide-react";

interface RecentOrder {
  id: string;
  customer: string;
  email: string;
  product: string;
  amount: number;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
}

const orders: RecentOrder[] = [
  {
    id: "#LX-1048",
    customer: "Ayesha Khan",
    email: "ayesha@example.com",
    product: "Luxury Rose Beauty Set",
    amount: 49,
    status: "Processing",
  },
  {
    id: "#LX-1047",
    customer: "Sara Ahmed",
    email: "sara@example.com",
    product: "Elegant Gold Necklace",
    amount: 79,
    status: "Shipped",
  },
  {
    id: "#LX-1046",
    customer: "Hina Malik",
    email: "hina@example.com",
    product: "Premium Leather Bag",
    amount: 125,
    status: "Delivered",
  },
  {
    id: "#LX-1045",
    customer: "Maham Ali",
    email: "maham@example.com",
    product: "Classic Women's Watch",
    amount: 99,
    status: "Delivered",
  },
  {
    id: "#LX-1044",
    customer: "Zoya Hassan",
    email: "zoya@example.com",
    product: "Kids Gift Collection",
    amount: 65,
    status: "Cancelled",
  },
];

const statusStyles: Record<RecentOrder["status"], string> = {
  Processing: "bg-amber-50 text-amber-700",
  Shipped: "bg-blue-50 text-blue-700",
  Delivered: "bg-emerald-50 text-emerald-700",
  Cancelled: "bg-red-50 text-red-700",
};

export default function RecentOrders() {
  return (
    <div className="rounded-2xl border border-[#eadfee] bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-[#eadfee] p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Clock3 size={18} className="text-[#8d5c91]" />
            <h2 className="font-serif text-xl font-semibold text-[#21152b]">
              Recent Orders
            </h2>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            Latest customer orders and their status.
          </p>
        </div>

        <Link
          href="/admin/orders"
          className="inline-flex items-center gap-1 text-sm font-semibold text-[#8d5c91] transition hover:text-[#21152b]"
        >
          View all
          <ArrowUpRight size={16} />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-[#eadfee] bg-[#faf7fb] text-left">
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Order
              </th>
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Customer
              </th>
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Product
              </th>
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Amount
              </th>
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-[#f0eaf2] last:border-0 hover:bg-[#fcfafd]"
              >
                <td className="px-5 py-4">
                  <span className="font-semibold text-[#21152b]">
                    {order.id}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <p className="font-medium text-[#21152b]">
                    {order.customer}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">{order.email}</p>
                </td>

                <td className="px-5 py-4 text-sm text-gray-600">
                  {order.product}
                </td>

                <td className="px-5 py-4 font-semibold text-[#21152b]">
                  ${order.amount.toFixed(2)}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyles[order.status]}`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}