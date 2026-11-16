"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
  Package,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";
import { motion } from "framer-motion";

import { products } from "../../../data/products";

export default function AdminProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const categories = [
    "All",
    ...Array.from(new Set(products.map((product) => product.category))),
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.brand?.toLowerCase().includes(search.toLowerCase()) ||
        product.sku?.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <div className="mx-auto max-w-[1600px]">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8d5c91]">
            Catalog Management
          </p>

          <h1 className="mt-2 font-serif text-4xl text-[#21152b]">
            Products
          </h1>

          <p className="mt-2 text-sm text-[#21152b]/45">
            Manage your LUXORA product catalog and inventory.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#21152b] px-5 py-3 text-xs font-semibold text-white shadow-lg shadow-[#21152b]/10 transition hover:-translate-y-0.5 hover:bg-[#34213e]"
        >
          <Plus size={15} />
          Add Product
        </Link>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#21152b]/[0.07] bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5edf5] text-[#8d5c91]">
              <Package size={18} />
            </div>

            <div>
              <p className="text-[10px] text-[#21152b]/35">
                Total Products
              </p>
              <p className="mt-1 font-serif text-2xl text-[#21152b]">
                {products.length}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#21152b]/[0.07] bg-white p-5">
          <p className="text-[10px] text-[#21152b]/35">In Stock</p>

          <p className="mt-1 font-serif text-2xl text-[#21152b]">
            {products.filter((product) => product.stock > 0).length}
          </p>

          <p className="mt-1 text-[9px] text-emerald-600">
            Available for sale
          </p>
        </div>

        <div className="rounded-2xl border border-[#21152b]/[0.07] bg-white p-5">
          <p className="text-[10px] text-[#21152b]/35">Low Stock</p>

          <p className="mt-1 font-serif text-2xl text-[#21152b]">
            {products.filter((product) => product.stock <= 15).length}
          </p>

          <p className="mt-1 text-[9px] text-amber-600">
            Requires attention
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
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products, brands or SKU..."
              className="h-11 w-full rounded-xl border border-[#21152b]/10 bg-[#faf8f6] pl-11 pr-4 text-xs text-[#21152b] outline-none transition placeholder:text-[#21152b]/30 focus:border-[#8d5c91]/40 focus:ring-2 focus:ring-[#8d5c91]/10"
            />
          </div>

          <div className="relative">
            <Filter
              size={14}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#21152b]/30"
            />

            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="h-11 min-w-[190px] appearance-none rounded-xl border border-[#21152b]/10 bg-[#faf8f6] pl-10 pr-9 text-xs text-[#21152b]/65 outline-none focus:border-[#8d5c91]/40"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item === "All" ? "All Categories" : item}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Product Table */}
      <div className="overflow-hidden rounded-2xl border border-[#21152b]/[0.07] bg-white shadow-[0_10px_40px_rgba(33,21,43,0.025)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-[#21152b]/[0.07] bg-[#faf8f6]/70">
                <th className="px-6 py-4 text-left text-[9px] font-semibold uppercase tracking-[0.15em] text-[#21152b]/30">
                  Product
                </th>

                <th className="px-4 py-4 text-left text-[9px] font-semibold uppercase tracking-[0.15em] text-[#21152b]/30">
                  Category
                </th>

                <th className="px-4 py-4 text-left text-[9px] font-semibold uppercase tracking-[0.15em] text-[#21152b]/30">
                  Price
                </th>

                <th className="px-4 py-4 text-left text-[9px] font-semibold uppercase tracking-[0.15em] text-[#21152b]/30">
                  Stock
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
              {filteredProducts.map((product, index) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03 }}
                  className="border-b border-[#21152b]/[0.05] transition hover:bg-[#faf8f6]/60"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-14 w-12 shrink-0 overflow-hidden rounded-lg bg-[#f3ebf4]">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <Package
                              size={16}
                              className="text-[#8d5c91]/40"
                            />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-xs font-semibold text-[#21152b]">
                          {product.name}
                        </p>

                        <p className="mt-1 text-[9px] text-[#21152b]/35">
                          {product.brand || "LUXORA"} · SKU{" "}
                          {product.sku || product.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <span className="rounded-full bg-[#f5edf5] px-2.5 py-1.5 text-[9px] font-medium text-[#8d5c91]">
                      {product.category}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <p className="text-xs font-semibold text-[#21152b]">
                      ${product.price.toFixed(2)}
                    </p>

                    {product.oldPrice && (
                      <p className="mt-1 text-[9px] text-[#21152b]/30 line-through">
                        ${product.oldPrice.toFixed(2)}
                      </p>
                    )}
                  </td>

                  <td className="px-4 py-4">
                    <p
                      className={`text-xs font-semibold ${
                        product.stock <= 15
                          ? "text-amber-600"
                          : "text-[#21152b]"
                      }`}
                    >
                      {product.stock}
                    </p>

                    <p className="mt-1 text-[9px] text-[#21152b]/30">
                      units
                    </p>
                  </td>

                  <td className="px-4 py-4">
                    {product.stock > 0 ? (
                      <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1.5 text-[9px] font-semibold text-emerald-600">
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex rounded-full bg-red-50 px-2.5 py-1.5 text-[9px] font-semibold text-red-500">
                        Out of Stock
                      </span>
                    )}
                  </td>

                  <td className="relative px-4 py-4 text-right">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenMenu(
                          openMenu === product.id ? null : product.id
                        )
                      }
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[#21152b]/35 transition hover:bg-[#f5edf5] hover:text-[#8d5c91]"
                      aria-label={`Actions for ${product.name}`}
                    >
                      <MoreHorizontal size={18} />
                    </button>

                    {openMenu === product.id && (
                      <div className="absolute right-4 top-14 z-20 w-40 rounded-xl border border-[#21152b]/10 bg-white p-1.5 text-left shadow-xl">
                        <Link
                          href={`/products/${product.slug}`}
                          className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-[10px] text-[#21152b]/65 hover:bg-[#faf8f6]"
                        >
                          <Eye size={14} />
                          View
                        </Link>

                        <Link
                          href={`/admin/products/${product.id}`}
                          className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-[10px] text-[#21152b]/65 hover:bg-[#faf8f6]"
                        >
                          <Pencil size={14} />
                          Edit
                        </Link>

                        <button
                          type="button"
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-[10px] text-red-500 hover:bg-red-50"
                          onClick={() => setOpenMenu(null)}
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="px-6 py-20 text-center">
            <Package
              size={30}
              className="mx-auto text-[#21152b]/20"
            />

            <h3 className="mt-4 font-serif text-xl text-[#21152b]">
              No products found
            </h3>

            <p className="mt-2 text-xs text-[#21152b]/40">
              Try changing your search or category filter.
            </p>
          </div>
        )}

        {/* Pagination UI */}
        <div className="flex items-center justify-between border-t border-[#21152b]/[0.07] px-6 py-4">
          <p className="text-[10px] text-[#21152b]/35">
            Showing{" "}
            <span className="font-semibold text-[#21152b]/60">
              {filteredProducts.length}
            </span>{" "}
            of {products.length} products
          </p>

          <div className="flex items-center gap-1">
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#21152b]/10 text-[#21152b]/30"
            >
              <ChevronLeft size={14} />
            </button>

            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#21152b] text-[10px] font-semibold text-white"
            >
              1
            </button>

            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#21152b]/10 text-[#21152b]/50 hover:bg-[#faf8f6]"
            >
              2
            </button>

            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#21152b]/10 text-[#21152b]/50 hover:bg-[#faf8f6]"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}