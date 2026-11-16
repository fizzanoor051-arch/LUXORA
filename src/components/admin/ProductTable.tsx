"use client";

import { Edit3, MoreHorizontal, Package, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

interface AdminProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "Active" | "Draft" | "Out of Stock";
}

const initialProducts: AdminProduct[] = [
  {
    id: "1",
    name: "Luxury Rose Beauty Set",
    category: "Makeup",
    price: 49,
    stock: 24,
    status: "Active",
  },
  {
    id: "2",
    name: "Elegant Gold Necklace",
    category: "Jewelry",
    price: 79,
    stock: 12,
    status: "Active",
  },
  {
    id: "3",
    name: "Premium Leather Bag",
    category: "Bags",
    price: 125,
    stock: 8,
    status: "Active",
  },
  {
    id: "4",
    name: "Classic Women's Watch",
    category: "Watches",
    price: 99,
    stock: 0,
    status: "Out of Stock",
  },
  {
    id: "5",
    name: "Kids Gift Collection",
    category: "Gifts",
    price: 65,
    stock: 18,
    status: "Draft",
  },
];

const statusStyles = {
  Active: "bg-emerald-50 text-emerald-700",
  Draft: "bg-gray-100 text-gray-600",
  "Out of Stock": "bg-red-50 text-red-700",
};

export default function ProductTable() {
  const [products, setProducts] = useState(initialProducts);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const deleteProduct = (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    setProducts((current) => current.filter((product) => product.id !== id));
  };

  return (
    <div className="rounded-2xl border border-[#eadfee] bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-[#eadfee] p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-serif text-xl font-semibold text-[#21152b]">
            Products
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Manage your LUXORA product catalog.
          </p>
        </div>

        <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#21152b] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#35203f]">
          <Plus size={17} />
          Add Product
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px]">
          <thead>
            <tr className="border-b border-[#eadfee] bg-[#faf7fb] text-left">
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Product
              </th>
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Category
              </th>
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Price
              </th>
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Stock
              </th>
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Status
              </th>
              <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b border-[#f0eaf2] last:border-0 hover:bg-[#fcfafd]"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f4edf6] text-[#8d5c91]">
                      <Package size={20} />
                    </div>

                    <div>
                      <p className="font-semibold text-[#21152b]">
                        {product.name}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        ID: {product.id}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4 text-sm text-gray-600">
                  {product.category}
                </td>

                <td className="px-5 py-4 font-semibold text-[#21152b]">
                  ${product.price.toFixed(2)}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={
                      product.stock === 0
                        ? "font-semibold text-red-600"
                        : product.stock <= 10
                          ? "font-semibold text-amber-600"
                          : "text-gray-600"
                    }
                  >
                    {product.stock}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyles[product.status]}`}
                  >
                    {product.status}
                  </span>
                </td>

                <td className="relative px-5 py-4 text-right">
                  <button
                    onClick={() =>
                      setOpenMenu(openMenu === product.id ? null : product.id)
                    }
                    className="rounded-lg p-2 text-gray-500 transition hover:bg-[#f4edf6] hover:text-[#21152b]"
                  >
                    <MoreHorizontal size={18} />
                  </button>

                  {openMenu === product.id && (
                    <div className="absolute right-5 top-14 z-20 w-36 rounded-xl border border-[#eadfee] bg-white p-1.5 text-left shadow-xl">
                      <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-[#f8f3f9]">
                        <Edit3 size={15} />
                        Edit
                      </button>

                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={15} />
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {products.length === 0 && (
        <div className="p-10 text-center text-sm text-gray-500">
          No products available.
        </div>
      )}
    </div>
  );
}