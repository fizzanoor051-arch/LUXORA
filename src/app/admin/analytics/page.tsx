"use client";

import {
  BarChart3,
  TrendingUp,
  ShoppingBag,
  Users,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  CalendarDays,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

const salesData = [
  { month: "Jan", sales: 4200 },
  { month: "Feb", sales: 5800 },
  { month: "Mar", sales: 5100 },
  { month: "Apr", sales: 7300 },
  { month: "May", sales: 6800 },
  { month: "Jun", sales: 9200 },
  { month: "Jul", sales: 8700 },
  { month: "Aug", sales: 10400 },
  { month: "Sep", sales: 11800 },
  { month: "Oct", sales: 13200 },
  { month: "Nov", sales: 14900 },
  { month: "Dec", sales: 16100 },
];

const topProducts = [
  {
    name: "Elegant Gold Necklace",
    category: "Jewelry",
    sales: 184,
    revenue: 14536,
  },
  {
    name: "Premium Classic Watch",
    category: "Watches",
    sales: 142,
    revenue: 18318,
  },
  {
    name: "Luxury Rose Beauty Set",
    category: "Makeup",
    sales: 127,
    revenue: 6223,
  },
  {
    name: "Classic Women's Handbag",
    category: "Bags",
    sales: 98,
    revenue: 8722,
  },
  {
    name: "Silk Evening Dress",
    category: "Fashion",
    sales: 83,
    revenue: 9877,
  },
];

const categoryData = [
  { name: "Jewelry", value: 31 },
  { name: "Fashion", value: 24 },
  { name: "Beauty", value: 19 },
  { name: "Watches", value: 14 },
  { name: "Bags", value: 8 },
  { name: "Other", value: 4 },
];

export default function AnalyticsPage() {
  const maxSales = Math.max(...salesData.map((item) => item.sales));

  return (
    <div className="min-h-screen bg-[#f8f5f8] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1500px]">

        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">

          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8d5c91]">
              LUXORA Intelligence
            </p>

            <h1 className="font-serif text-3xl text-[#21152b] sm:text-4xl">
              Analytics & Insights
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-[#21152b]/45">
              Understand sales performance, customer behavior and product
              growth with a clear view of your store data.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-black/[0.08] bg-white px-5 py-3 text-xs font-semibold text-[#21152b] shadow-sm transition hover:bg-[#f4eef5]"
          >
            <CalendarDays size={15} />
            Last 12 Months
          </button>

        </div>

        {/* KPI */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <MetricCard
            icon={<DollarSign size={18} />}
            label="Total Revenue"
            value="$118,420"
            growth="+18.6%"
            positive
          />

          <MetricCard
            icon={<ShoppingBag size={18} />}
            label="Total Orders"
            value="2,846"
            growth="+12.4%"
            positive
          />

          <MetricCard
            icon={<Users size={18} />}
            label="Customers"
            value="1,928"
            growth="+9.8%"
            positive
          />

          <MetricCard
            icon={<TrendingUp size={18} />}
            label="Conversion Rate"
            value="4.82%"
            growth="-1.2%"
            positive={false}
          />

        </div>

        {/* Sales Chart */}
        <div className="mb-8 grid gap-6 xl:grid-cols-[1.7fr_1fr]">

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-black/[0.06] bg-white p-5 shadow-[0_20px_60px_rgba(33,21,43,0.04)] sm:p-7"
          >
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8d5c91]">
                  Revenue Overview
                </p>

                <h2 className="mt-2 font-serif text-2xl text-[#21152b]">
                  Sales Performance
                </h2>
              </div>

              <div className="flex items-center gap-2 rounded-full bg-[#f4eef5] px-3 py-2 text-[10px] text-[#8d5c91]">
                <BarChart3 size={13} />
                Monthly Revenue
              </div>

            </div>

            <div className="mt-10 flex h-[310px] items-end gap-2 sm:gap-4">

              {salesData.map((item, index) => {
                const height = (item.sales / maxSales) * 100;

                return (
                  <div
                    key={item.month}
                    className="flex h-full flex-1 flex-col justify-end"
                  >
                    <div className="group relative flex h-full items-end">

                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{
                          duration: 0.7,
                          delay: index * 0.04,
                        }}
                        className="relative w-full rounded-t-xl bg-gradient-to-t from-[#21152b] to-[#8d5c91]"
                      >
                        <div className="absolute -top-9 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-[#21152b] px-2 py-1 text-[9px] text-white group-hover:block">
                          ${(item.sales / 1000).toFixed(1)}k
                        </div>
                      </motion.div>

                    </div>

                    <p className="mt-3 text-center text-[9px] font-medium text-[#21152b]/35">
                      {item.month}
                    </p>
                  </div>
                );
              })}

            </div>

          </motion.div>

          {/* Category Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl border border-black/[0.06] bg-white p-5 shadow-[0_20px_60px_rgba(33,21,43,0.04)] sm:p-7"
          >

            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8d5c91]">
              Product Mix
            </p>

            <h2 className="mt-2 font-serif text-2xl text-[#21152b]">
              Sales by Category
            </h2>

            <div className="mt-8 space-y-5">

              {categoryData.map((category, index) => (
                <div key={category.name}>

                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-medium text-[#21152b]">
                      {category.name}
                    </span>

                    <span className="text-[10px] text-[#21152b]/40">
                      {category.value}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-[#f0ebf1]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${category.value}%` }}
                      transition={{
                        duration: 0.7,
                        delay: index * 0.08,
                      }}
                      className="h-full rounded-full bg-[#8d5c91]"
                    />
                  </div>

                </div>
              ))}

            </div>

            <div className="mt-8 rounded-2xl bg-[#f7f2f7] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#8d5c91]">
                  <Sparkles size={16} />
                </div>

                <div>
                  <p className="text-xs font-semibold text-[#21152b]">
                    Strongest Category
                  </p>

                  <p className="mt-1 text-[10px] text-[#21152b]/40">
                    Jewelry currently leads your sales mix.
                  </p>
                </div>
              </div>
            </div>

          </motion.div>

        </div>

        {/* Bottom Analytics */}
        <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">

          {/* Top Products */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-black/[0.06] bg-white p-5 shadow-[0_20px_60px_rgba(33,21,43,0.04)] sm:p-7"
          >

            <div className="flex items-center justify-between">

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8d5c91]">
                  Best Performers
                </p>

                <h2 className="mt-2 font-serif text-2xl text-[#21152b]">
                  Top Products
                </h2>
              </div>

              <TrendingUp
                size={20}
                className="text-[#8d5c91]"
              />

            </div>

            <div className="mt-7 space-y-3">

              {topProducts.map((product, index) => (
                <div
                  key={product.name}
                  className="flex items-center gap-4 rounded-2xl border border-black/[0.05] p-4 transition hover:bg-[#fcfafc]"
                >

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f1e9f2] font-serif text-sm text-[#8d5c91]">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="min-w-0 flex-1">

                    <p className="truncate text-sm font-semibold text-[#21152b]">
                      {product.name}
                    </p>

                    <p className="mt-1 text-[10px] text-[#21152b]/35">
                      {product.category} · {product.sales} sales
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="text-sm font-semibold text-[#21152b]">
                      ${product.revenue.toLocaleString()}
                    </p>

                    <p className="mt-1 text-[9px] uppercase tracking-[0.08em] text-[#8d5c91]">
                      Revenue
                    </p>

                  </div>

                </div>
              ))}

            </div>

          </motion.div>

          {/* Growth Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative overflow-hidden rounded-3xl bg-[#21152b] p-7 text-white shadow-[0_20px_60px_rgba(33,21,43,0.15)]"
          >

            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#8d5c91]/30 blur-3xl" />

            <div className="relative">

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                <TrendingUp size={20} />
              </div>

              <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45">
                Store Growth
              </p>

              <h2 className="mt-2 font-serif text-4xl">
                +18.6%
              </h2>

              <p className="mt-4 text-sm leading-6 text-white/55">
                Your revenue is growing compared with the previous
                12-month period. Keep focusing on your strongest
                product categories.
              </p>

              <div className="mt-8 flex items-center gap-2 text-xs text-white/75">
                <ArrowUpRight size={15} />
                Positive growth trajectory
              </div>

              <div className="mt-8 h-px bg-white/10" />

              <div className="mt-6 flex items-center justify-between">

                <div>
                  <p className="text-[9px] uppercase tracking-[0.12em] text-white/35">
                    Avg. Order Value
                  </p>

                  <p className="mt-2 font-serif text-xl">
                    $41.62
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-[9px] uppercase tracking-[0.12em] text-white/35">
                    Repeat Customers
                  </p>

                  <p className="mt-2 font-serif text-xl">
                    38.4%
                  </p>
                </div>

              </div>

            </div>

          </motion.div>

        </div>

      </div>
    </div>
  );
}

function MetricCard({
  icon,
  label,
  value,
  growth,
  positive,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  growth: string;
  positive: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-black/[0.06] bg-white p-5 shadow-[0_15px_45px_rgba(33,21,43,0.04)]"
    >

      <div className="flex items-start justify-between">

        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#f1e9f2] text-[#8d5c91]">
          {icon}
        </div>

        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[9px] font-semibold ${
            positive
              ? "bg-[#edf7f0] text-[#3e7751]"
              : "bg-[#fceeee] text-[#a84d4d]"
          }`}
        >
          {positive ? (
            <ArrowUpRight size={11} />
          ) : (
            <ArrowDownRight size={11} />
          )}

          {growth}
        </span>

      </div>

      <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#21152b]/40">
        {label}
      </p>

      <p className="mt-2 font-serif text-2xl text-[#21152b]">
        {value}
      </p>

    </motion.div>
  );
}