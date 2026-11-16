"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  Save,
  ImagePlus,
  X,
  Plus,
  Package,
} from "lucide-react";

const categories = [
  "Makeup",
  "Jewelry",
  "Bags",
  "Watches",
  "Fashion",
  "Shoes",
  "Gifts",
  "Lifestyle",
  "Toys",
];

export default function NewProductPage() {
  const [images, setImages] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    name: "",
    category: "Makeup",
    brand: "",
    price: "",
    oldPrice: "",
    stock: "",
    sku: "",
    description: "",
    badge: "",
  });

  const updateField = (field: string, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const addImage = () => {
    if (images.length >= 4) return;

    setImages((current) => [
      ...current,
      `placeholder-${current.length + 1}`,
    ]);
  };

  const removeImage = (index: number) => {
    setImages((current) => current.filter((_, i) => i !== index));
  };

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <div className="mx-auto max-w-[1200px]">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link
            href="/admin/products"
            className="mb-4 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#8d5c91] hover:underline"
          >
            <ArrowLeft size={13} />
            Back to Products
          </Link>

          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8d5c91]">
            Catalog
          </p>

          <h1 className="mt-2 font-serif text-4xl text-[#21152b]">
            Add New Product
          </h1>

          <p className="mt-2 text-sm text-[#21152b]/45">
            Create a new product for the LUXORA store.
          </p>
        </div>

        <button
          type="submit"
          form="product-form"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#21152b] px-6 py-3 text-xs font-semibold text-white shadow-lg shadow-[#21152b]/10 transition hover:bg-[#34213e]"
        >
          <Save size={15} />
          Save Product
        </button>
      </div>

      {saved && (
        <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-medium text-emerald-700">
          Product information saved successfully.
        </div>
      )}

      <form
        id="product-form"
        onSubmit={handleSave}
        className="grid gap-6 lg:grid-cols-[1fr_330px]"
      >
        {/* Main */}
        <div className="space-y-6">
          {/* Basic Information */}
          <section className="rounded-2xl border border-[#21152b]/[0.07] bg-white p-6">
            <div className="mb-6">
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#8d5c91]">
                Product Details
              </p>

              <h2 className="mt-2 font-serif text-2xl text-[#21152b]">
                Basic Information
              </h2>
            </div>

            <div className="grid gap-5">
              <div>
                <label className="mb-2 block text-[10px] font-semibold text-[#21152b]/60">
                  Product Name
                </label>

                <input
                  required
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="e.g. Luxury Rose Beauty Set"
                  className="h-12 w-full rounded-xl border border-[#21152b]/10 bg-[#faf8f6] px-4 text-sm outline-none transition placeholder:text-[#21152b]/25 focus:border-[#8d5c91]/40 focus:ring-2 focus:ring-[#8d5c91]/10"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[10px] font-semibold text-[#21152b]/60">
                    Category
                  </label>

                  <select
                    value={form.category}
                    onChange={(e) =>
                      updateField("category", e.target.value)
                    }
                    className="h-12 w-full rounded-xl border border-[#21152b]/10 bg-[#faf8f6] px-4 text-xs outline-none focus:border-[#8d5c91]/40"
                  >
                    {categories.map((category) => (
                      <option key={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-[10px] font-semibold text-[#21152b]/60">
                    Brand
                  </label>

                  <input
                    value={form.brand}
                    onChange={(e) =>
                      updateField("brand", e.target.value)
                    }
                    placeholder="e.g. LUXORA"
                    className="h-12 w-full rounded-xl border border-[#21152b]/10 bg-[#faf8f6] px-4 text-sm outline-none placeholder:text-[#21152b]/25 focus:border-[#8d5c91]/40"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-[10px] font-semibold text-[#21152b]/60">
                  Description
                </label>

                <textarea
                  rows={6}
                  value={form.description}
                  onChange={(e) =>
                    updateField("description", e.target.value)
                  }
                  placeholder="Write a beautiful description for your product..."
                  className="w-full resize-none rounded-xl border border-[#21152b]/10 bg-[#faf8f6] px-4 py-3 text-sm leading-6 outline-none placeholder:text-[#21152b]/25 focus:border-[#8d5c91]/40"
                />
              </div>
            </div>
          </section>

          {/* Pricing */}
          <section className="rounded-2xl border border-[#21152b]/[0.07] bg-white p-6">
            <div className="mb-6">
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#8d5c91]">
                Commercial
              </p>

              <h2 className="mt-2 font-serif text-2xl text-[#21152b]">
                Pricing & Inventory
              </h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                <label className="mb-2 block text-[10px] font-semibold text-[#21152b]/60">
                  Sale Price
                </label>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-[#21152b]/30">
                    $
                  </span>

                  <input
                    required
                    type="number"
                    min="0"
                    value={form.price}
                    onChange={(e) =>
                      updateField("price", e.target.value)
                    }
                    placeholder="49"
                    className="h-12 w-full rounded-xl border border-[#21152b]/10 bg-[#faf8f6] pl-8 pr-4 text-sm outline-none focus:border-[#8d5c91]/40"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-[10px] font-semibold text-[#21152b]/60">
                  Old Price
                </label>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-[#21152b]/30">
                    $
                  </span>

                  <input
                    type="number"
                    min="0"
                    value={form.oldPrice}
                    onChange={(e) =>
                      updateField("oldPrice", e.target.value)
                    }
                    placeholder="65"
                    className="h-12 w-full rounded-xl border border-[#21152b]/10 bg-[#faf8f6] pl-8 pr-4 text-sm outline-none focus:border-[#8d5c91]/40"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-[10px] font-semibold text-[#21152b]/60">
                  Stock
                </label>

                <input
                  required
                  type="number"
                  min="0"
                  value={form.stock}
                  onChange={(e) =>
                    updateField("stock", e.target.value)
                  }
                  placeholder="25"
                  className="h-12 w-full rounded-xl border border-[#21152b]/10 bg-[#faf8f6] px-4 text-sm outline-none focus:border-[#8d5c91]/40"
                />
              </div>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-[10px] font-semibold text-[#21152b]/60">
                  SKU
                </label>

                <input
                  value={form.sku}
                  onChange={(e) => updateField("sku", e.target.value)}
                  placeholder="LUX-BEAUTY-001"
                  className="h-12 w-full rounded-xl border border-[#21152b]/10 bg-[#faf8f6] px-4 text-sm outline-none placeholder:text-[#21152b]/25 focus:border-[#8d5c91]/40"
                />
              </div>

              <div>
                <label className="mb-2 block text-[10px] font-semibold text-[#21152b]/60">
                  Badge
                </label>

                <input
                  value={form.badge}
                  onChange={(e) =>
                    updateField("badge", e.target.value)
                  }
                  placeholder="BEST SELLER"
                  className="h-12 w-full rounded-xl border border-[#21152b]/10 bg-[#faf8f6] px-4 text-sm outline-none placeholder:text-[#21152b]/25 focus:border-[#8d5c91]/40"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Images */}
          <section className="rounded-2xl border border-[#21152b]/[0.07] bg-white p-5">
            <div className="mb-5">
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#8d5c91]">
                Visuals
              </p>

              <h2 className="mt-2 font-serif text-xl text-[#21152b]">
                Product Images
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {images.map((image, index) => (
                <div
                  key={image}
                  className="relative flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-[#f5edf5]"
                >
                  <Package
                    size={25}
                    className="text-[#8d5c91]/30"
                  />

                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#21152b]/50 shadow-sm hover:text-red-500"
                  >
                    <X size={13} />
                  </button>
                </div>
              ))}

              {images.length < 4 && (
                <button
                  type="button"
                  onClick={addImage}
                  className="flex aspect-square flex-col items-center justify-center rounded-xl border border-dashed border-[#21152b]/15 bg-[#faf8f6] text-[#21152b]/35 transition hover:border-[#8d5c91]/40 hover:text-[#8d5c91]"
                >
                  <ImagePlus size={21} />

                  <span className="mt-2 text-[9px] font-semibold">
                    Add Image
                  </span>
                </button>
              )}
            </div>

            <p className="mt-4 text-[9px] leading-4 text-[#21152b]/30">
              Add up to 4 product images. Recommended format: square or
              4:5 ratio.
            </p>
          </section>

          {/* Publish */}
          <section className="rounded-2xl border border-[#21152b]/[0.07] bg-white p-5">
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#8d5c91]">
              Publishing
            </p>

            <h2 className="mt-2 font-serif text-xl text-[#21152b]">
              Store Visibility
            </h2>

            <div className="mt-5 flex items-center justify-between rounded-xl bg-[#faf8f6] p-4">
              <div>
                <p className="text-xs font-semibold text-[#21152b]">
                  Active
                </p>

                <p className="mt-1 text-[9px] text-[#21152b]/35">
                  Visible in store
                </p>
              </div>

              <div className="h-5 w-9 rounded-full bg-[#21152b] p-0.5">
                <div className="ml-auto h-4 w-4 rounded-full bg-white shadow-sm" />
              </div>
            </div>
          </section>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#21152b] py-4 text-xs font-semibold text-white shadow-lg shadow-[#21152b]/10 transition hover:bg-[#34213e]"
          >
            <Plus size={15} />
            Create Product
          </button>
        </div>
      </form>
    </div>
  );
}