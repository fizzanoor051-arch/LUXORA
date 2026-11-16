"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Tags,
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
  Package,
  X,
  Save,
} from "lucide-react";
import { motion } from "framer-motion";

interface Category {
  id: string;
  name: string;
  slug: string;
  products: number;
  status: "Active" | "Hidden";
  description: string;
}

const initialCategories: Category[] = [
  {
    id: "cat-1",
    name: "Makeup",
    slug: "makeup",
    products: 42,
    status: "Active",
    description: "Beauty essentials, cosmetics and makeup collections.",
  },
  {
    id: "cat-2",
    name: "Jewelry",
    slug: "jewelry",
    products: 36,
    status: "Active",
    description: "Elegant jewelry pieces designed for every occasion.",
  },
  {
    id: "cat-3",
    name: "Fashion",
    slug: "fashion",
    products: 58,
    status: "Active",
    description: "Premium fashion pieces and timeless wardrobe essentials.",
  },
  {
    id: "cat-4",
    name: "Bags",
    slug: "bags",
    products: 31,
    status: "Active",
    description: "Luxury handbags, purses and everyday carry pieces.",
  },
  {
    id: "cat-5",
    name: "Shoes",
    slug: "shoes",
    products: 28,
    status: "Active",
    description: "Refined footwear for elegant everyday styling.",
  },
  {
    id: "cat-6",
    name: "Watches",
    slug: "watches",
    products: 21,
    status: "Active",
    description: "Classic and contemporary watches with premium details.",
  },
  {
    id: "cat-7",
    name: "Gifts",
    slug: "gifts",
    products: 18,
    status: "Active",
    description: "Curated gifts for birthdays, celebrations and special moments.",
  },
  {
    id: "cat-8",
    name: "Lifestyle",
    slug: "lifestyle",
    products: 14,
    status: "Active",
    description: "Beautiful lifestyle essentials for modern living.",
  },
  {
    id: "cat-9",
    name: "Toys",
    slug: "toys",
    products: 0,
    status: "Hidden",
    description: "Playful and thoughtful products for younger shoppers.",
  },
];

export default function AdminCategoriesPage() {
  const [categories, setCategories] =
    useState<Category[]>(initialCategories);

  const [search, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const filteredCategories = useMemo(() => {
    const value = search.toLowerCase();

    return categories.filter(
      (category) =>
        category.name.toLowerCase().includes(value) ||
        category.slug.toLowerCase().includes(value) ||
        category.description.toLowerCase().includes(value)
    );
  }, [categories, search]);

  const totalProducts = categories.reduce(
    (total, category) => total + category.products,
    0
  );

  const activeCategories = categories.filter(
    (category) => category.status === "Active"
  ).length;

  const addCategory = (event: React.FormEvent) => {
    event.preventDefault();

    if (!newName.trim()) return;

    const slug = newName
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-");

    const newCategory: Category = {
      id: `cat-${Date.now()}`,
      name: newName.trim(),
      slug,
      products: 0,
      status: "Active",
      description:
        newDescription.trim() ||
        "A new LUXORA product category.",
    };

    setCategories((current) => [...current, newCategory]);

    setNewName("");
    setNewDescription("");
    setShowModal(false);
  };

  const deleteCategory = (id: string) => {
    setCategories((current) =>
      current.filter((category) => category.id !== id)
    );

    setOpenMenu(null);
  };

  return (
    <div className="mx-auto max-w-[1500px]">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8d5c91]">
            Catalog Structure
          </p>

          <h1 className="mt-2 font-serif text-4xl text-[#21152b]">
            Categories
          </h1>

          <p className="mt-2 text-sm text-[#21152b]/45">
            Organize your store into clear and elegant shopping collections.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#21152b] px-5 py-3 text-xs font-semibold text-white shadow-lg shadow-[#21152b]/10 transition hover:bg-[#34213e]"
        >
          <Plus size={15} />
          Add Category
        </button>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#21152b]/[0.07] bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5edf5] text-[#8d5c91]">
              <Tags size={18} />
            </div>

            <div>
              <p className="text-[10px] text-[#21152b]/35">
                Total Categories
              </p>

              <p className="mt-1 font-serif text-2xl text-[#21152b]">
                {categories.length}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#21152b]/[0.07] bg-white p-5">
          <p className="text-[10px] text-[#21152b]/35">
            Active Categories
          </p>

          <p className="mt-1 font-serif text-2xl text-[#21152b]">
            {activeCategories}
          </p>

          <p className="mt-1 text-[9px] text-emerald-600">
            Visible in store
          </p>
        </div>

        <div className="rounded-2xl border border-[#21152b]/[0.07] bg-white p-5">
          <p className="text-[10px] text-[#21152b]/35">
            Products Organized
          </p>

          <p className="mt-1 font-serif text-2xl text-[#21152b]">
            {totalProducts}
          </p>

          <p className="mt-1 text-[9px] text-[#8d5c91]">
            Across all categories
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-5 rounded-2xl border border-[#21152b]/[0.07] bg-white p-4">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#21152b]/30"
          />

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search categories..."
            className="h-11 w-full rounded-xl border border-[#21152b]/10 bg-[#faf8f6] pl-11 pr-4 text-xs outline-none placeholder:text-[#21152b]/30 focus:border-[#8d5c91]/40"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filteredCategories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
            className="relative rounded-2xl border border-[#21152b]/[0.07] bg-white p-5 shadow-[0_10px_40px_rgba(33,21,43,0.025)]"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f5edf5] text-[#8d5c91]">
                <Tags size={19} strokeWidth={1.6} />
              </div>

              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setOpenMenu(
                      openMenu === category.id
                        ? null
                        : category.id
                    )
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-[#21152b]/30 transition hover:bg-[#f5edf5] hover:text-[#8d5c91]"
                >
                  <MoreHorizontal size={18} />
                </button>

                {openMenu === category.id && (
                  <div className="absolute right-0 top-10 z-20 w-40 rounded-xl border border-[#21152b]/10 bg-white p-1.5 shadow-xl">
                    <button
                      type="button"
                      onClick={() => setOpenMenu(null)}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-[10px] text-[#21152b]/65 hover:bg-[#faf8f6]"
                    >
                      <Eye size={14} />
                      View Category
                    </button>

                    <button
                      type="button"
                      onClick={() => setOpenMenu(null)}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-[10px] text-[#21152b]/65 hover:bg-[#faf8f6]"
                    >
                      <Pencil size={14} />
                      Edit Category
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteCategory(category.id)}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-[10px] text-red-500 hover:bg-red-50"
                    >
                      <Trash2 size={14} />
                      Delete Category
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-serif text-2xl text-[#21152b]">
                  {category.name}
                </h2>

                <span
                  className={`rounded-full px-2.5 py-1.5 text-[9px] font-semibold ${
                    category.status === "Active"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {category.status}
                </span>
              </div>

              <p className="mt-1 text-[9px] font-medium uppercase tracking-[0.12em] text-[#8d5c91]">
                /{category.slug}
              </p>

              <p className="mt-4 min-h-[42px] text-xs leading-5 text-[#21152b]/40">
                {category.description}
              </p>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-[#21152b]/[0.07] pt-4">
              <div className="flex items-center gap-2">
                <Package
                  size={15}
                  className="text-[#21152b]/30"
                />

                <span className="text-[10px] text-[#21152b]/45">
                  Products
                </span>
              </div>

              <span className="font-serif text-lg text-[#21152b]">
                {category.products}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <div className="rounded-2xl border border-[#21152b]/[0.07] bg-white px-6 py-20 text-center">
          <Tags
            size={30}
            className="mx-auto text-[#21152b]/20"
          />

          <h3 className="mt-4 font-serif text-xl text-[#21152b]">
            No categories found
          </h3>

          <p className="mt-2 text-xs text-[#21152b]/40">
            Try another search term or create a new category.
          </p>
        </div>
      )}

      {/* Add Category Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#21152b]/40 p-5 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-lg rounded-2xl border border-[#21152b]/10 bg-[#fffdfb] p-6 shadow-2xl"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#8d5c91]">
                  Catalog
                </p>

                <h2 className="mt-2 font-serif text-2xl text-[#21152b]">
                  Create Category
                </h2>

                <p className="mt-1 text-xs text-[#21152b]/40">
                  Add a new collection to your LUXORA store.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#21152b]/35 hover:bg-[#f5edf5] hover:text-[#21152b]"
              >
                <X size={17} />
              </button>
            </div>

            <form onSubmit={addCategory} className="mt-7 space-y-5">
              <div>
                <label className="mb-2 block text-[10px] font-semibold text-[#21152b]/60">
                  Category Name
                </label>

                <input
                  required
                  value={newName}
                  onChange={(event) =>
                    setNewName(event.target.value)
                  }
                  placeholder="e.g. Accessories"
                  className="h-12 w-full rounded-xl border border-[#21152b]/10 bg-white px-4 text-sm outline-none placeholder:text-[#21152b]/25 focus:border-[#8d5c91]/40"
                />
              </div>

              <div>
                <label className="mb-2 block text-[10px] font-semibold text-[#21152b]/60">
                  Description
                </label>

                <textarea
                  value={newDescription}
                  onChange={(event) =>
                    setNewDescription(event.target.value)
                  }
                  rows={4}
                  placeholder="Describe this collection..."
                  className="w-full resize-none rounded-xl border border-[#21152b]/10 bg-white px-4 py-3 text-sm leading-6 outline-none placeholder:text-[#21152b]/25 focus:border-[#8d5c91]/40"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 rounded-xl border border-[#21152b]/10 bg-white py-3.5 text-xs font-semibold text-[#21152b]/55 transition hover:bg-[#faf8f6]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#21152b] py-3.5 text-xs font-semibold text-white transition hover:bg-[#34213e]"
                >
                  <Save size={14} />
                  Create Category
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}