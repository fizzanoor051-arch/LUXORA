"use client";

import {
  Eye,
  MoreHorizontal,
  Search,
} from "lucide-react";
import { useState } from "react";

interface AdminOrder {
  id: string;
  customer: string;
  product: string;
  amount: number;
  payment: "Paid" | "Pending" | "Refunded";
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  date: string;
}

const orders: AdminOrder[] = [
  {
    id: "#LX-1048",
    customer: "Ayesha Khan",
    product: "Luxury Rose Beauty Set",
    amount: 49,
    payment: "Paid",
    status: "Processing",
    date: "Sep 02, 2026",
  },
  {
    id: "#LX-1047",
    customer: "Sara Ahmed",
    product: "Elegant Gold Necklace",
    amount: 79,
    payment: "Paid",
    status: "Shipped",
    date: "Sep 01, 2026",
  },
  {
    id: "#LX-1046",
    customer: "Hina Malik",
    product: "Premium Leather Bag",
    amount: 125,
    payment: "Paid",
    status: "Delivered",
    date: "Aug 31, 2026",
  },
  {
    id: "#LX-1045",
    customer: "Maham Ali",
    product: "Classic Women's Watch",
    amount: 99,
    payment: "Pending",
    status: "Processing",
    date: "Aug 30, 2026",
  },
  {
    id: "#LX-1044",
    customer: "Zoya Hassan",
    product: "Kids Gift Collection",
    amount: 65,
    payment: "Refunded",
    status: "Cancelled",
    date: "Aug 29, 2026",
  },
];

const statusStyles = {
  Processing: "bg-amber-50 text-amber-700",
  Shipped: "bg-blue-50 text-blue-700",
  Delivered: "bg-emerald-50 text-emerald-700",
  Cancelled: "bg-red-50 text-red-700",
};

const paymentStyles = {
  Paid: "bg-emerald-50 text-emerald-700",
  Pending: "bg-amber-50 text-amber-700",
  Refunded: "bg-purple-50 text-purple-700",
};

export default function OrderTable() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredOrders = orders.filter((order) => {
    const query = search.toLowerCase();

    const matchesSearch =
      order.id.toLowerCase().includes(query) ||
      order.customer.toLowerCase().includes(query) ||
      order.product.toLowerCase().includes(query);

    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="rounded-2xl border border-[#eadfee] bg-white shadow-sm">
      <div className="border-b border-[#eadfee] p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-serif text-xl font-semibold text-[#21152b]">
              All Orders
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              View and manage all customer orders.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search orders..."
                className="w-full rounded-xl border border-[#dfd2e2] py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#8d5c91] focus:ring-2 focus:ring-[#8d5c91]/10 sm:w-64"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-[#dfd2e2] bg-white px-4 py-2.5 text-sm outline-none focus:border-[#8d5c91]"
            >
              <option value="All">All Status</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="border-b border-[#eadfee] bg-[#faf7fb] text-left">
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Order ID
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
                Payment
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Status
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Date
              </th>

              <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-[#f0eaf2] last:border-0 hover:bg-[#fcfafd]"
              >
                <td className="px-5 py-4 font-semibold text-[#21152b]">
                  {order.id}
                </td>

                <td className="px-5 py-4 text-sm font-medium text-gray-700">
                  {order.customer}
                </td>

                <td className="max-w-[220px] truncate px-5 py-4 text-sm text-gray-600">
                  {order.product}
                </td>

                <td className="px-5 py-4 font-semibold text-[#21152b]">
                  ${order.amount.toFixed(2)}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold ${paymentStyles[order.payment]}`}
                  >
                    {order.payment}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyles[order.status]}`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="px-5 py-4 text-sm text-gray-600">
                  {order.date}
                </td>

                <td className="px-5 py-4 text-right">
                  <button
                    className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[#8d5c91] transition hover:bg-[#f4edf6]"
                    title="View order"
                  >
                    <Eye size={16} />
                    View
                  </button>

                  <button
                    className="ml-1 rounded-lg p-2 text-gray-500 hover:bg-[#f4edf6] hover:text-[#21152b]"
                    title="More options"
                  >
                    <MoreHorizontal size={17} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredOrders.length === 0 && (
        <div className="p-10 text-center text-sm text-gray-500">
          No orders found.
        </div>
      )}
    </div>
  );
}