"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Package,
  AlertTriangle,
  XCircle,
  CheckCircle2,
  Plus,
  Minus,
  MoreHorizontal,
  ArrowUpDown,
  Warehouse,
  TrendingDown,
} from "lucide-react";
import { motion } from "framer-motion";

interface InventoryProduct {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  price: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
}

const initialProducts: InventoryProduct[] = [
  {
    id: "1",
    name: "Luxury Rose Beauty Set",
    sku: "LUX-BEA-001",
    category: "Makeup",
    stock: 25,
    price: 49,
    status: "In Stock",
  },
  {
    id: "2",
    name: "Elegant Gold Necklace",
    sku: "LUX-JEW-002",
    category: "Jewelry",
    stock: 18,
    price: 79,
    status: "In Stock",
  },
  {
    id: "3",
    name: "Classic Women's Handbag",
    sku: "LUX-BAG-003",
    category: "Bags",
    stock: 7,
    price: 89,
    status: "Low Stock",
  },
  {
    id: "4",
    name: "Premium Classic Watch",
    sku: "LUX-WAT-004",
    category: "Watches",
    stock: 11,
    price: 129,
    status: "In Stock",
  },
  {
    id: "5",
    name: "Silk Evening Dress",
    sku: "LUX-FAS-005",
    category: "Fashion",
    stock: 4,
    price: 119,
    status: "Low Stock",
  },
  {
    id: "6",
    name: "Luxury Women's Heels",
    sku: "LUX-SHO-006",
    category: "Shoes",
    stock: 0,
    price: 99,
    status: "Out of Stock",
  },
  {
    id: "7",
    name: "Premium Gift Box",
    sku: "LUX-GIF-007",
    category: "Gifts",
    stock: 30,
    price: 59,
    status: "In Stock",
  },
  {
    id: "8",
    name: "Minimalist Leather Wallet",
    sku: "LUX-LIF-008",
    category: "Lifestyle",
    stock: 35,
    price: 39,
    status: "In Stock",
  },
  {
    id: "9",
    name: "Luxury Lip Collection",
    sku: "LUX-BEA-009",
    category: "Makeup",
    stock: 6,
    price: 35,
    status: "Low Stock",
  },
  {
    id: "10",
    name: "Pearl Drop Earrings",
    sku: "LUX-JEW-010",
    category: "Jewelry",
    stock: 22,
    price: 55,
    status: "In Stock",
  },
];

export default function InventoryPage() {
  const [products, setProducts] =
    useState<InventoryProduct[]>(initialProducts);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.sku.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" || product.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [products, search, filter]);

  const totalStock = products.reduce(
    (sum, product) => sum + product.stock,
    0
  );

  const inventoryValue = products.reduce(
    (sum, product) => sum + product.stock * product.price,
    0
  );

  const lowStock = products.filter(
    (product) => product.status === "Low Stock"
  ).length;

  const outOfStock = products.filter(
    (product) => product.status === "Out of Stock"
  ).length;

  const updateStock = (id: string, amount: number) => {
    setProducts((current) =>
      current.map((product) => {
        if (product.id !== id) return product;

        const newStock = Math.max(0, product.stock + amount);

        let status: InventoryProduct["status"] = "In Stock";

        if (newStock === 0) {
          status = "Out of Stock";
        } else if (newStock <= 7) {
          status = "Low Stock";
        }

        return {
          ...product,
          stock: newStock,
          status,
        };
      })
    );
  };

  return (
    <div className="min-h-screen bg-[#f8f5f8] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1500px]">

        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8d5c91]">
              LUXORA Inventory
            </p>

            <h1 className="font-serif text-3xl text-[#21152b] sm:text-4xl">
              Inventory Management
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-[#21152b]/45">
              Monitor stock levels, product availability and inventory
              value from one elegant workspace.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#21152b] px-5 py-3 text-xs font-semibold text-white transition hover:bg-[#8d5c91]"
          >
            <Plus size={15} />
            Add Stock
          </button>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <StatCard
            icon={<Package size={18} />}
            label="Total Units"
            value={totalStock.toString()}
            description="Units currently available"
          />

          <StatCard
            icon={<Warehouse size={18} />}
            label="Inventory Value"
            value={`$${inventoryValue.toLocaleString()}`}
            description="Current stock valuation"
          />

          <StatCard
            icon={<AlertTriangle size={18} />}
            label="Low Stock"
            value={lowStock.toString()}
            description="Products need attention"
          />

          <StatCard
            icon={<XCircle size={18} />}
            label="Out of Stock"
            value={outOfStock.toString()}
            description="Products unavailable"
          />

        </div>

        {/* Main Card */}
        <div className="overflow-hidden rounded-3xl border border-black/[0.06] bg-white shadow-[0_20px_60px_rgba(33,21,43,0.05)]">

          {/* Toolbar */}
          <div className="border-b border-black/[0.06] p-5">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

              <div className="relative w-full xl:max-w-md">
                <Search
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#21152b]/35"
                />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products, SKU or category..."
                  className="h-11 w-full rounded-full border border-black/[0.08] bg-[#faf8fa] pl-11 pr-4 text-sm text-[#21152b] outline-none transition focus:border-[#8d5c91]/40"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {["All", "In Stock", "Low Stock", "Out of Stock"].map(
                  (item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setFilter(item)}
                      className={`rounded-full px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.08em] transition ${
                        filter === item
                          ? "bg-[#21152b] text-white"
                          : "bg-[#f5f1f6] text-[#21152b]/55 hover:bg-[#eee7ef]"
                      }`}
                    >
                      {item}
                    </button>
                  )
                )}
              </div>

            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-black/[0.06] bg-[#faf8fa]">
                  <th className="px-6 py-4 text-left text-[9px] font-semibold uppercase tracking-[0.14em] text-[#21152b]/40">
                    Product
                  </th>

                  <th className="px-6 py-4 text-left text-[9px] font-semibold uppercase tracking-[0.14em] text-[#21152b]/40">
                    SKU
                  </th>

                  <th className="px-6 py-4 text-left text-[9px] font-semibold uppercase tracking-[0.14em] text-[#21152b]/40">
                    Category
                  </th>

                  <th className="px-6 py-4 text-left text-[9px] font-semibold uppercase tracking-[0.14em] text-[#21152b]/40">
                    Stock
                  </th>

                  <th className="px-6 py-4 text-left text-[9px] font-semibold uppercase tracking-[0.14em] text-[#21152b]/40">
                    Value
                  </th>

                  <th className="px-6 py-4 text-left text-[9px] font-semibold uppercase tracking-[0.14em] text-[#21152b]/40">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right text-[9px] font-semibold uppercase tracking-[0.14em] text-[#21152b]/40">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredProducts.map((product, index) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                    className="border-b border-black/[0.05] transition hover:bg-[#fcfafc]"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f1e9f2] text-[#8d5c91]">
                          <Package size={18} />
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-[#21152b]">
                            {product.name}
                          </p>

                          <p className="mt-1 text-[10px] text-[#21152b]/35">
                            Product #{product.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-xs font-medium text-[#21152b]/60">
                      {product.sku}
                    </td>

                    <td className="px-6 py-5 text-xs text-[#21152b]/55">
                      {product.category}
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateStock(product.id, -1)}
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-black/[0.08] text-[#21152b]/50 transition hover:bg-[#21152b] hover:text-white"
                        >
                          <Minus size={12} />
                        </button>

                        <span className="min-w-[32px] text-center text-sm font-semibold text-[#21152b]">
                          {product.stock}
                        </span>

                        <button
                          type="button"
                          onClick={() => updateStock(product.id, 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-black/[0.08] text-[#21152b]/50 transition hover:bg-[#21152b] hover:text-white"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-sm font-semibold text-[#21152b]">
                      ${(product.stock * product.price).toLocaleString()}
                    </td>

                    <td className="px-6 py-5">
                      <StatusBadge status={product.status} />
                    </td>

                    <td className="px-6 py-5 text-right">
                      <button
                        type="button"
                        className="rounded-full p-2 text-[#21152b]/40 transition hover:bg-[#f1e9f2] hover:text-[#21152b]"
                      >
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="divide-y divide-black/[0.05] lg:hidden">
            {filteredProducts.map((product) => (
              <div key={product.id} className="p-5">

                <div className="flex items-start justify-between gap-3">

                  <div className="flex gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f1e9f2] text-[#8d5c91]">
                      <Package size={18} />
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-[#21152b]">
                        {product.name}
                      </h3>

                      <p className="mt-1 text-[10px] text-[#21152b]/35">
                        {product.sku}
                      </p>

                      <p className="mt-1 text-[10px] text-[#8d5c91]">
                        {product.category}
                      </p>
                    </div>
                  </div>

                  <StatusBadge status={product.status} />

                </div>

                <div className="mt-5 flex items-center justify-between">

                  <div>
                    <p className="text-[10px] uppercase tracking-[0.1em] text-[#21152b]/35">
                      Stock
                    </p>

                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateStock(product.id, -1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-black/[0.08]"
                      >
                        <Minus size={13} />
                      </button>

                      <span className="min-w-[30px] text-center text-sm font-semibold">
                        {product.stock}
                      </span>

                      <button
                        type="button"
                        onClick={() => updateStock(product.id, 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-black/[0.08]"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-[0.1em] text-[#21152b]/35">
                      Value
                    </p>

                    <p className="mt-2 text-sm font-semibold text-[#21152b]">
                      ${(product.stock * product.price).toLocaleString()}
                    </p>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="px-6 py-20 text-center">
              <TrendingDown
                size={28}
                className="mx-auto text-[#8d5c91]/40"
              />

              <h3 className="mt-4 font-serif text-xl text-[#21152b]">
                No products found
              </h3>

              <p className="mt-2 text-sm text-[#21152b]/40">
                Try changing your search or inventory filter.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  description,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-black/[0.06] bg-white p-5 shadow-[0_15px_45px_rgba(33,21,43,0.04)]"
    >
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#f1e9f2] text-[#8d5c91]">
          {icon}
        </div>

        <ArrowUpDown size={15} className="text-[#21152b]/20" />
      </div>

      <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#21152b]/40">
        {label}
      </p>

      <p className="mt-2 font-serif text-2xl text-[#21152b]">
        {value}
      </p>

      <p className="mt-1 text-xs text-[#21152b]/35">
        {description}
      </p>
    </motion.div>
  );
}

function StatusBadge({
  status,
}: {
  status: InventoryProduct["status"];
}) {
  const config = {
    "In Stock": {
      icon: <CheckCircle2 size={12} />,
      className: "bg-[#edf7f0] text-[#3e7751]",
    },
    "Low Stock": {
      icon: <AlertTriangle size={12} />,
      className: "bg-[#fff6e8] text-[#9b6b22]",
    },
    "Out of Stock": {
      icon: <XCircle size={12} />,
      className: "bg-[#fceeee] text-[#a84d4d]",
    },
  };

  const item = config[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.08em] ${item.className}`}
    >
      {item.icon}
      {status}
    </span>
  );
}