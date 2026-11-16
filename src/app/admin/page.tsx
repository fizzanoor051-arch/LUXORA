"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  ArrowDownRight,
  Package,
  ShoppingBag,
  Users,
  DollarSign,
  Plus,
  MoreHorizontal,
  TrendingUp,
  Clock3,
  CheckCircle2,
  Truck,
  AlertCircle,
} from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  {
    title: "Total Revenue",
    value: "$24,680",
    change: "+18.4%",
    positive: true,
    icon: DollarSign,
  },
  {
    title: "Total Orders",
    value: "1,284",
    change: "+12.8%",
    positive: true,
    icon: ShoppingBag,
  },
  {
    title: "Products",
    value: "248",
    change: "+6.2%",
    positive: true,
    icon: Package,
  },
  {
    title: "Customers",
    value: "8,642",
    change: "-2.4%",
    positive: false,
    icon: Users,
  },
];

const recentOrders = [
  {
    id: "#LX-10482",
    customer: "Sophia Williams",
    product: "Luxury Rose Beauty Set",
    amount: "$49.00",
    status: "Delivered",
    date: "Sep 03, 2026",
  },
  {
    id: "#LX-10481",
    customer: "Emma Carter",
    product: "Elegant Gold Necklace",
    amount: "$79.00",
    status: "Processing",
    date: "Sep 03, 2026",
  },
  {
    id: "#LX-10480",
    customer: "Olivia Martin",
    product: "Classic Women's Handbag",
    amount: "$89.00",
    status: "Shipped",
    date: "Sep 02, 2026",
  },
  {
    id: "#LX-10479",
    customer: "Amelia Brown",
    product: "Premium Classic Watch",
    amount: "$129.00",
    status: "Delivered",
    date: "Sep 02, 2026",
  },
  {
    id: "#LX-10478",
    customer: "Isabella Davis",
    product: "Silk Evening Dress",
    amount: "$119.00",
    status: "Processing",
    date: "Sep 01, 2026",
  },
];

const topProducts = [
  {
    name: "Luxury Rose Beauty Set",
    category: "Makeup",
    sales: 184,
    revenue: "$9,016",
  },
  {
    name: "Elegant Gold Necklace",
    category: "Jewelry",
    sales: 142,
    revenue: "$11,218",
  },
  {
    name: "Classic Women's Handbag",
    category: "Bags",
    sales: 126,
    revenue: "$11,214",
  },
  {
    name: "Premium Classic Watch",
    category: "Watches",
    sales: 98,
    revenue: "$12,642",
  },
];

function statusStyle(status: string) {
  if (status === "Delivered") {
    return "bg-emerald-50 text-emerald-600";
  }

  if (status === "Shipped") {
    return "bg-blue-50 text-blue-600";
  }

  return "bg-amber-50 text-amber-600";
}

function StatusIcon({ status }: { status: string }) {
  if (status === "Delivered") {
    return <CheckCircle2 size={13} />;
  }

  if (status === "Shipped") {
    return <Truck size={13} />;
  }

  return <Clock3 size={13} />;
}

export default function AdminDashboard() {
  return (
    <div className="mx-auto max-w-[1600px]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end"
      >
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8d5c91]">
            Thursday, September 03, 2026
          </p>

          <h1 className="mt-2 font-serif text-4xl tracking-tight text-[#21152b] sm:text-5xl">
            Good morning, Admin.
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-[#21152b]/45">
            Here's what's happening across your LUXORA store today.
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/admin/products/new"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#21152b] px-5 py-3 text-xs font-semibold text-white shadow-lg shadow-[#21152b]/10 transition hover:-translate-y-0.5 hover:bg-[#34213e]"
          >
            <Plus size={15} />
            Add Product
          </Link>

          <Link
            href="/admin/analytics"
            className="hidden items-center gap-2 rounded-full border border-[#21152b]/10 bg-white px-5 py-3 text-xs font-semibold text-[#21152b]/70 transition hover:border-[#8d5c91]/30 hover:text-[#8d5c91] sm:inline-flex"
          >
            View Analytics
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="rounded-2xl border border-[#21152b]/[0.07] bg-white p-5 shadow-[0_10px_40px_rgba(33,21,43,0.025)]"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5edf5] text-[#8d5c91]">
                  <Icon size={18} strokeWidth={1.6} />
                </div>

                <div
                  className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[9px] font-semibold ${
                    stat.positive
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-red-50 text-red-500"
                  }`}
                >
                  {stat.positive ? (
                    <ArrowUpRight size={11} />
                  ) : (
                    <ArrowDownRight size={11} />
                  )}
                  {stat.change}
                </div>
              </div>

              <p className="mt-5 text-xs text-[#21152b]/40">{stat.title}</p>

              <p className="mt-1 font-serif text-3xl text-[#21152b]">
                {stat.value}
              </p>

              <p className="mt-1 text-[10px] text-[#21152b]/30">
                Compared with last month
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Main Grid */}
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        {/* Sales Overview */}
        <section className="rounded-2xl border border-[#21152b]/[0.07] bg-white p-6 shadow-[0_10px_40px_rgba(33,21,43,0.025)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#8d5c91]">
                Performance
              </p>

              <h2 className="mt-2 font-serif text-2xl text-[#21152b]">
                Sales Overview
              </h2>
            </div>

            <select className="rounded-lg border border-[#21152b]/10 bg-[#faf8f6] px-3 py-2 text-[10px] text-[#21152b]/60 outline-none">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>

          <div className="mt-8 flex items-end justify-between">
            <div>
              <p className="font-serif text-4xl text-[#21152b]">$8,426</p>

              <p className="mt-1 flex items-center gap-1 text-[10px] text-emerald-600">
                <TrendingUp size={12} />
                14.8% increase
              </p>
            </div>

            <p className="text-[10px] text-[#21152b]/30">
              Weekly revenue
            </p>
          </div>

          {/* Chart */}
          <div className="mt-8 flex h-52 items-end gap-2 border-b border-[#21152b]/[0.06] px-1">
            {[42, 58, 46, 72, 64, 86, 96].map((height, index) => (
              <div
                key={index}
                className="group relative flex h-full flex-1 items-end"
              >
                <div
                  style={{ height: `${height}%` }}
                  className="w-full rounded-t-xl bg-[#eadfea] transition-all duration-300 group-hover:bg-[#8d5c91]"
                />

                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] text-[#21152b]/30">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="rounded-2xl border border-[#21152b]/[0.07] bg-[#21152b] p-6 text-white shadow-[0_15px_50px_rgba(33,21,43,0.12)]">
          <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#d8b58c]">
            Quick Actions
          </p>

          <h2 className="mt-2 font-serif text-2xl">
            Manage your store
          </h2>

          <p className="mt-2 text-xs leading-5 text-white/45">
            Keep your catalog, orders and inventory organized from one place.
          </p>

          <div className="mt-7 space-y-2.5">
            <Link
              href="/admin/products/new"
              className="flex items-center justify-between rounded-xl bg-white/[0.08] px-4 py-3.5 transition hover:bg-white/[0.13]"
            >
              <span className="flex items-center gap-3 text-xs">
                <Package size={16} className="text-[#d8b58c]" />
                Add New Product
              </span>
              <ArrowUpRight size={14} className="text-white/40" />
            </Link>

            <Link
              href="/admin/orders"
              className="flex items-center justify-between rounded-xl bg-white/[0.08] px-4 py-3.5 transition hover:bg-white/[0.13]"
            >
              <span className="flex items-center gap-3 text-xs">
                <ShoppingBag size={16} className="text-[#d8b58c]" />
                View Orders
              </span>
              <ArrowUpRight size={14} className="text-white/40" />
            </Link>

            <Link
              href="/admin/inventory"
              className="flex items-center justify-between rounded-xl bg-white/[0.08] px-4 py-3.5 transition hover:bg-white/[0.13]"
            >
              <span className="flex items-center gap-3 text-xs">
                <Package size={16} className="text-[#d8b58c]" />
                Check Inventory
              </span>
              <ArrowUpRight size={14} className="text-white/40" />
            </Link>
          </div>

          <div className="mt-7 flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.04] p-3">
            <AlertCircle size={17} className="text-[#d8b58c]" />

            <div>
              <p className="text-[10px] font-semibold">
                7 products need attention
              </p>
              <p className="mt-0.5 text-[9px] text-white/35">
                Low stock items detected
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Recent Orders + Top Products */}
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        {/* Orders */}
        <section className="overflow-hidden rounded-2xl border border-[#21152b]/[0.07] bg-white shadow-[0_10px_40px_rgba(33,21,43,0.025)]">
          <div className="flex items-center justify-between border-b border-[#21152b]/[0.07] p-6">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#8d5c91]">
                Latest activity
              </p>

              <h2 className="mt-2 font-serif text-2xl text-[#21152b]">
                Recent Orders
              </h2>
            </div>

            <Link
              href="/admin/orders"
              className="text-[10px] font-semibold text-[#8d5c91] hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-[#21152b]/[0.05] text-left">
                  <th className="px-6 py-4 text-[9px] font-semibold uppercase tracking-wider text-[#21152b]/30">
                    Order
                  </th>
                  <th className="px-6 py-4 text-[9px] font-semibold uppercase tracking-wider text-[#21152b]/30">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-[9px] font-semibold uppercase tracking-wider text-[#21152b]/30">
                    Product
                  </th>
                  <th className="px-6 py-4 text-[9px] font-semibold uppercase tracking-wider text-[#21152b]/30">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-[9px] font-semibold uppercase tracking-wider text-[#21152b]/30">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-[#21152b]/[0.05] last:border-0"
                  >
                    <td className="px-6 py-4">
                      <p className="text-xs font-semibold text-[#21152b]">
                        {order.id}
                      </p>
                      <p className="mt-0.5 text-[9px] text-[#21152b]/30">
                        {order.date}
                      </p>
                    </td>

                    <td className="px-6 py-4 text-xs text-[#21152b]/65">
                      {order.customer}
                    </td>

                    <td className="px-6 py-4 text-xs text-[#21152b]/55">
                      {order.product}
                    </td>

                    <td className="px-6 py-4 text-xs font-semibold text-[#21152b]">
                      {order.amount}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[9px] font-semibold ${statusStyle(
                          order.status
                        )}`}
                      >
                        <StatusIcon status={order.status} />
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Top Products */}
        <section className="rounded-2xl border border-[#21152b]/[0.07] bg-white p-6 shadow-[0_10px_40px_rgba(33,21,43,0.025)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#8d5c91]">
                Best performers
              </p>

              <h2 className="mt-2 font-serif text-2xl text-[#21152b]">
                Top Products
              </h2>
            </div>

            <Link
              href="/admin/products"
              className="text-[10px] font-semibold text-[#8d5c91] hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="mt-7 space-y-5">
            {topProducts.map((product, index) => (
              <div key={product.name} className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f5edf5] font-serif text-sm text-[#8d5c91]">
                  0{index + 1}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-[#21152b]">
                    {product.name}
                  </p>

                  <p className="mt-1 text-[9px] text-[#21152b]/35">
                    {product.category} · {product.sales} sales
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs font-semibold text-[#21152b]">
                    {product.revenue}
                  </p>

                  <p className="mt-1 text-[9px] text-emerald-600">
                    Revenue
                  </p>
                </div>

                <button
                  type="button"
                  className="text-[#21152b]/25 transition hover:text-[#21152b]"
                  aria-label={`More options for ${product.name}`}
                >
                  <MoreHorizontal size={17} />
                </button>
              </div>
            ))}
          </div>

          <Link
            href="/admin/products"
            className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl border border-[#21152b]/10 py-3 text-[10px] font-semibold text-[#21152b]/60 transition hover:border-[#8d5c91]/30 hover:text-[#8d5c91]"
          >
            Manage Products
            <ArrowUpRight size={13} />
          </Link>
        </section>
      </div>
    </div>
  );
}