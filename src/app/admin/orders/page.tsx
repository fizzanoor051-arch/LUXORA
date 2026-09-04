"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Search,
  Filter,
  Eye,
  MoreHorizontal,
  ShoppingBag,
  Clock3,
  CheckCircle2,
  Truck,
  XCircle,
  DollarSign,
  ChevronDown,
} from "lucide-react";
import { motion } from "framer-motion";

type OrderStatus =
  | "Delivered"
  | "Processing"
  | "Shipped"
  | "Cancelled";

interface Order {
  id: string;
  customer: string;
  email: string;
  product: string;
  items: number;
  amount: number;
  status: OrderStatus;
  date: string;
  payment: string;
}

const orders: Order[] = [
  {
    id: "#LX-10482",
    customer: "Sophia Williams",
    email: "sophia@example.com",
    product: "Luxury Rose Beauty Set",
    items: 1,
    amount: 49,
    status: "Delivered",
    date: "Sep 03, 2026",
    payment: "Paid",
  },
  {
    id: "#LX-10481",
    customer: "Emma Carter",
    email: "emma@example.com",
    product: "Elegant Gold Necklace",
    items: 2,
    amount: 158,
    status: "Processing",
    date: "Sep 03, 2026",
    payment: "Paid",
  },
  {
    id: "#LX-10480",
    customer: "Olivia Martin",
    email: "olivia@example.com",
    product: "Classic Women's Handbag",
    items: 1,
    amount: 89,
    status: "Shipped",
    date: "Sep 02, 2026",
    payment: "Paid",
  },
  {
    id: "#LX-10479",
    customer: "Amelia Brown",
    email: "amelia@example.com",
    product: "Premium Classic Watch",
    items: 1,
    amount: 129,
    status: "Delivered",
    date: "Sep 02, 2026",
    payment: "Paid",
  },
  {
    id: "#LX-10478",
    customer: "Isabella Davis",
    email: "isabella@example.com",
    product: "Silk Evening Dress",
    items: 2,
    amount: 238,
    status: "Processing",
    date: "Sep 01, 2026",
    payment: "Paid",
  },
  {
    id: "#LX-10477",
    customer: "Mia Wilson",
    email: "mia@example.com",
    product: "Luxury Women's Heels",
    items: 1,
    amount: 99,
    status: "Cancelled",
    date: "Aug 31, 2026",
    payment: "Refunded",
  },
  {
    id: "#LX-10476",
    customer: "Charlotte Moore",
    email: "charlotte@example.com",
    product: "Premium Gift Box",
    items: 3,
    amount: 177,
    status: "Delivered",
    date: "Aug 31, 2026",
    payment: "Paid",
  },
  {
    id: "#LX-10475",
    customer: "Harper Taylor",
    email: "harper@example.com",
    product: "Pearl Drop Earrings",
    items: 1,
    amount: 55,
    status: "Shipped",
    date: "Aug 30, 2026",
    payment: "Paid",
  },
];

const statusOptions = [
  "All",
  "Delivered",
  "Processing",
  "Shipped",
  "Cancelled",
];

function statusClasses(status: OrderStatus) {
  switch (status) {
    case "Delivered":
      return "bg-emerald-50 text-emerald-600";
    case "Shipped":
      return "bg-blue-50 text-blue-600";
    case "Processing":
      return "bg-amber-50 text-amber-600";
    case "Cancelled":
      return "bg-red-50 text-red-500";
  }
}

function StatusIcon({ status }: { status: OrderStatus }) {
  if (status === "Delivered") {
    return <CheckCircle2 size={13} />;
  }

  if (status === "Shipped") {
    return <Truck size={13} />;
  }

  if (status === "Cancelled") {
    return <XCircle size={13} />;
  }

  return <Clock3 size={13} />;
}

export default function AdminOrdersPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        order.id.toLowerCase().includes(searchText) ||
        order.customer.toLowerCase().includes(searchText) ||
        order.email.toLowerCase().includes(searchText) ||
        order.product.toLowerCase().includes(searchText);

      const matchesStatus =
        status === "All" || order.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  const totalRevenue = orders.reduce(
    (total, order) =>
      order.status !== "Cancelled"
        ? total + order.amount
        : total,
    0
  );

  const delivered = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  const processing = orders.filter(
    (order) => order.status === "Processing"
  ).length;

  return (
    <div className="mx-auto max-w-[1600px]">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8d5c91]">
            Sales Management
          </p>

          <h1 className="mt-2 font-serif text-4xl text-[#21152b]">
            Orders
          </h1>

          <p className="mt-2 text-sm text-[#21152b]/45">
            Track, manage and process your customer orders.
          </p>
        </div>

        <Link
          href="/admin"
          className="hidden items-center gap-2 rounded-full border border-[#21152b]/10 bg-white px-5 py-3 text-xs font-semibold text-[#21152b]/60 transition hover:border-[#8d5c91]/30 hover:text-[#8d5c91] sm:inline-flex"
        >
          Dashboard
        </Link>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-[#21152b]/[0.07] bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5edf5] text-[#8d5c91]">
              <ShoppingBag size={18} />
            </div>

            <div>
              <p className="text-[10px] text-[#21152b]/35">
                Total Orders
              </p>
              <p className="mt-1 font-serif text-2xl text-[#21152b]">
                {orders.length}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#21152b]/[0.07] bg-white p-5">
          <p className="text-[10px] text-[#21152b]/35">
            Revenue
          </p>

          <p className="mt-1 font-serif text-2xl text-[#21152b]">
            ${totalRevenue.toLocaleString()}
          </p>

          <p className="mt-1 text-[9px] text-emerald-600">
            Excluding cancelled orders
          </p>
        </div>

        <div className="rounded-2xl border border-[#21152b]/[0.07] bg-white p-5">
          <p className="text-[10px] text-[#21152b]/35">
            Delivered
          </p>

          <p className="mt-1 font-serif text-2xl text-[#21152b]">
            {delivered}
          </p>

          <p className="mt-1 text-[9px] text-emerald-600">
            Successfully completed
          </p>
        </div>

        <div className="rounded-2xl border border-[#21152b]/[0.07] bg-white p-5">
          <p className="text-[10px] text-[#21152b]/35">
            Processing
          </p>

          <p className="mt-1 font-serif text-2xl text-[#21152b]">
            {processing}
          </p>

          <p className="mt-1 text-[9px] text-amber-600">
            Need attention
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="mb-5 rounded-2xl border border-[#21152b]/[0.07] bg-white p-4">
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#21152b]/30"
            />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search order, customer or product..."
              className="h-11 w-full rounded-xl border border-[#21152b]/10 bg-[#faf8f6] pl-11 pr-4 text-xs outline-none placeholder:text-[#21152b]/30 focus:border-[#8d5c91]/40"
            />
          </div>

          <div className="relative">
            <Filter
              size={14}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#21152b]/30"
            />

            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="h-11 min-w-[180px] appearance-none rounded-xl border border-[#21152b]/10 bg-[#faf8f6] pl-10 pr-9 text-xs text-[#21152b]/65 outline-none focus:border-[#8d5c91]/40"
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option === "All"
                    ? "All Order Status"
                    : option}
                </option>
              ))}
            </select>

            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#21152b]/30"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-[#21152b]/[0.07] bg-white shadow-[0_10px_40px_rgba(33,21,43,0.025)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="border-b border-[#21152b]/[0.07] bg-[#faf8f6]/70">
                <th className="px-6 py-4 text-left text-[9px] font-semibold uppercase tracking-[0.15em] text-[#21152b]/30">
                  Order
                </th>

                <th className="px-4 py-4 text-left text-[9px] font-semibold uppercase tracking-[0.15em] text-[#21152b]/30">
                  Customer
                </th>

                <th className="px-4 py-4 text-left text-[9px] font-semibold uppercase tracking-[0.15em] text-[#21152b]/30">
                  Items
                </th>

                <th className="px-4 py-4 text-left text-[9px] font-semibold uppercase tracking-[0.15em] text-[#21152b]/30">
                  Amount
                </th>

                <th className="px-4 py-4 text-left text-[9px] font-semibold uppercase tracking-[0.15em] text-[#21152b]/30">
                  Payment
                </th>

                <th className="px-4 py-4 text-left text-[9px] font-semibold uppercase tracking-[0.15em] text-[#21152b]/30">
                  Status
                </th>

                <th className="px-4 py-4 text-right text-[9px] font-semibold uppercase tracking-[0.15em] text-[#21152b]/30">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order, index) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03 }}
                  className="border-b border-[#21152b]/[0.05] transition hover:bg-[#faf8f6]/60"
                >
                  <td className="px-6 py-5">
                    <p className="text-xs font-semibold text-[#21152b]">
                      {order.id}
                    </p>

                    <p className="mt-1 text-[9px] text-[#21152b]/30">
                      {order.date}
                    </p>
                  </td>

                  <td className="px-4 py-5">
                    <p className="text-xs font-medium text-[#21152b]">
                      {order.customer}
                    </p>

                    <p className="mt-1 text-[9px] text-[#21152b]/30">
                      {order.email}
                    </p>
                  </td>

                  <td className="px-4 py-5">
                    <p className="max-w-[200px] truncate text-xs text-[#21152b]/60">
                      {order.product}
                    </p>

                    <p className="mt-1 text-[9px] text-[#21152b]/30">
                      {order.items}{" "}
                      {order.items === 1 ? "item" : "items"}
                    </p>
                  </td>

                  <td className="px-4 py-5">
                    <p className="text-xs font-semibold text-[#21152b]">
                      ${order.amount.toFixed(2)}
                    </p>
                  </td>

                  <td className="px-4 py-5">
                    <span
                      className={`rounded-full px-2.5 py-1.5 text-[9px] font-semibold ${
                        order.payment === "Paid"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-red-50 text-red-500"
                      }`}
                    >
                      {order.payment}
                    </span>
                  </td>

                  <td className="px-4 py-5">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[9px] font-semibold ${statusClasses(
                        order.status
                      )}`}
                    >
                      <StatusIcon status={order.status} />
                      {order.status}
                    </span>
                  </td>

                  <td className="relative px-4 py-5 text-right">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenMenu(
                          openMenu === order.id ? null : order.id
                        )
                      }
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[#21152b]/35 transition hover:bg-[#f5edf5] hover:text-[#8d5c91]"
                    >
                      <MoreHorizontal size={18} />
                    </button>

                    {openMenu === order.id && (
                      <div className="absolute right-4 top-14 z-20 w-40 rounded-xl border border-[#21152b]/10 bg-white p-1.5 text-left shadow-xl">
                        <button
                          type="button"
                          onClick={() => setOpenMenu(null)}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-[10px] text-[#21152b]/65 hover:bg-[#faf8f6]"
                        >
                          <Eye size={14} />
                          View Order
                        </button>

                        <button
                          type="button"
                          onClick={() => setOpenMenu(null)}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-[10px] text-[#21152b]/65 hover:bg-[#faf8f6]"
                        >
                          <Truck size={14} />
                          Update Status
                        </button>

                        <button
                          type="button"
                          onClick={() => setOpenMenu(null)}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-[10px] text-red-500 hover:bg-red-50"
                        >
                          <XCircle size={14} />
                          Cancel Order
                        </button>
                      </div>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="px-6 py-20 text-center">
            <ShoppingBag
              size={30}
              className="mx-auto text-[#21152b]/20"
            />

            <h3 className="mt-4 font-serif text-xl text-[#21152b]">
              No orders found
            </h3>

            <p className="mt-2 text-xs text-[#21152b]/40">
              Try changing your search or status filter.
            </p>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-[#21152b]/[0.07] px-6 py-4">
          <p className="text-[10px] text-[#21152b]/35">
            Showing{" "}
            <span className="font-semibold text-[#21152b]/60">
              {filteredOrders.length}
            </span>{" "}
            orders
          </p>

          <div className="text-[10px] text-[#21152b]/30">
            Page 1 of 1
          </div>
        </div>
      </div>
    </div>
  );
}