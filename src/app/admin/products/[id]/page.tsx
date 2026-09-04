"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  Save,
  Trash2,
  Package,
  Star,
  ShoppingBag,
} from "lucide-react";

import { products } from "../../../../data/products";

export default function EditProductPage() {
  const params = useParams();
  const id = String(params.id);

  const product = products.find((item) => item.id === id);

  const [saved, setSaved] = useState(false);

  const [name, setName] = useState(product?.name || "");
  const [price, setPrice] = useState(String(product?.price || ""));
  const [oldPrice, setOldPrice] = useState(
    String(product?.oldPrice || "")
  );
  const [stock, setStock] = useState(String(product?.stock || ""));
  const [description, setDescription] = useState(
    product?.description || ""
  );
  const [category, setCategory] = useState(
    product?.category || "Makeup"
  );

  if (!product) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f5edf5]">
            <Package size={25} className="text-[#8d5c91]" />
          </div>

          <h1 className="mt-5 font-serif text-3xl text-[#21152b]">
            Product Not Found
          </h1>

          <p className="mt-2 text-sm text-[#21152b]/40">
            The product you're trying to edit doesn't exist.
          </p>

          <Link
            href="/admin/products"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#21152b] px-5 py-3 text-xs font-semibold text-white"
          >
            <ArrowLeft size={14} />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

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
      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <Link
            href="/admin/products"
            className="mb-4 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#8d5c91] hover:underline"
          >
            <ArrowLeft size={13} />
            Back to Products
          </Link>

          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8d5c91]">
            Product Management
          </p>

          <h1 className="mt-2 font-serif text-4xl text-[#21152b]">
            Edit Product
          </h1>

          <p className="mt-2 text-sm text-[#21152b]/45">
            Update product information, pricing and inventory.
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href={`/products/${product.slug}`}
            target="_blank"
            className="hidden items-center gap-2 rounded-full border border-[#21152b]/10 bg-white px-5 py-3 text-xs font-semibold text-[#21152b]/65 transition hover:border-[#8d5c91]/30 hover:text-[#8d5c91] sm:inline-flex"
          >
            View Store
          </Link>

          <button
            type="submit"
            form="edit-product-form"
            className="inline-flex items-center gap-2 rounded-full bg-[#21152b] px-5 py-3 text-xs font-semibold text-white shadow-lg"
          >
            <Save size={15} />
            Save Changes
          </button>
        </div>
      </div>

      {saved && (
        <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-medium text-emerald-700">
          Product changes saved successfully.
        </div>
      )}

      <form
        id="edit-product-form"
        onSubmit={handleSave}
        className="grid gap-6 lg:grid-cols-[1fr_330px]"
      >
        {/* Main */}
        <div className="space-y-6">
          <section className="rounded-2xl border border-[#21152b]/[0.07] bg-white p-6">
            <div className="mb-6">
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#8d5c91]">
                Product Details
              </p>

              <h2 className="mt-2 font-serif text-2xl text-[#21152b]">
                Basic Information
              </h2>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-[10px] font-semibold text-[#21152b]/60">
                  Product Name
                </label>

                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12 w-full rounded-xl border border-[#21152b]/10 bg-[#faf8f6] px-4 text-sm outline-none focus:border-[#8d5c91]/40"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[10px] font-semibold text-[#21152b]/60">
                    Category
                  </label>

                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="h-12 w-full rounded-xl border border-[#21152b]/10 bg-[#faf8f6] px-4 text-xs outline-none focus:border-[#8d5c91]/40"
                  >
                    {[
                      "Makeup",
                      "Jewelry",
                      "Bags",
                      "Watches",
                      "Fashion",
                      "Shoes",
                      "Gifts",
                      "Lifestyle",
                      "Toys",
                    ].map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-[10px] font-semibold text-[#21152b]/60">
                    Brand
                  </label>

                  <input
                    value={product.brand || ""}
                    readOnly
                    className="h-12 w-full rounded-xl border border-[#21152b]/10 bg-[#f3efec] px-4 text-sm text-[#21152b]/50 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-[10px] font-semibold text-[#21152b]/60">
                  Description
                </label>

                <textarea
                  rows={7}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full resize-none rounded-xl border border-[#21152b]/10 bg-[#faf8f6] px-4 py-3 text-sm leading-6 outline-none focus:border-[#8d5c91]/40"
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
                Pricing & Stock
              </h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                <label className="mb-2 block text-[10px] font-semibold text-[#21152b]/60">
                  Current Price
                </label>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-[#21152b]/30">
                    $
                  </span>

                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="h-12 w-full rounded-xl border border-[#21152b]/10 bg-[#faf8f6] pl-8 pr-4 text-sm outline-none focus:border-[#8d5c91]/40"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-[10px] font-semibold text-[#21152b]/60">
                  Original Price
                </label>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-[#21152b]/30">
                    $
                  </span>

                  <input
                    type="number"
                    value={oldPrice}
                    onChange={(e) => setOldPrice(e.target.value)}
                    className="h-12 w-full rounded-xl border border-[#21152b]/10 bg-[#faf8f6] pl-8 pr-4 text-sm outline-none focus:border-[#8d5c91]/40"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-[10px] font-semibold text-[#21152b]/60">
                  Available Stock
                </label>

                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="h-12 w-full rounded-xl border border-[#21152b]/10 bg-[#faf8f6] px-4 text-sm outline-none focus:border-[#8d5c91]/40"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Product Preview */}
          <section className="overflow-hidden rounded-2xl border border-[#21152b]/[0.07] bg-white">
            <div className="aspect-[4/5] overflow-hidden bg-[#f4eef5]">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <Package
                    size={35}
                    className="text-[#8d5c91]/30"
                  />
                </div>
              )}
            </div>

            <div className="p-5">
              <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#8d5c91]">
                {product.category}
              </p>

              <h3 className="mt-2 font-serif text-xl text-[#21152b]">
                {name}
              </h3>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm font-semibold text-[#21152b]">
                  ${price || "0.00"}
                </span>

                <div className="flex items-center gap-1 text-[10px] text-[#21152b]/45">
                  <Star
                    size={12}
                    fill="currentColor"
                    className="text-[#c49b63]"
                  />
                  {product.rating || 0}
                </div>
              </div>
            </div>
          </section>

          {/* Product Stats */}
          <section className="rounded-2xl border border-[#21152b]/[0.07] bg-white p-5">
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#8d5c91]">
              Performance
            </p>

            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-[10px] text-[#21152b]/45">
                  <ShoppingBag size={14} />
                  Reviews
                </span>

                <span className="text-xs font-semibold text-[#21152b]">
                  {product.reviews || 0}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-[10px] text-[#21152b]/45">
                  <Package size={14} />
                  Stock
                </span>

                <span className="text-xs font-semibold text-[#21152b]">
                  {stock}
                </span>
              </div>
            </div>
          </section>

          {/* Danger Zone */}
          <section className="rounded-2xl border border-red-200 bg-red-50/40 p-5">
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-red-500">
              Danger Zone
            </p>

            <h3 className="mt-2 font-serif text-xl text-[#21152b]">
              Delete Product
            </h3>

            <p className="mt-2 text-[10px] leading-5 text-[#21152b]/40">
              Permanently remove this product from your catalog.
            </p>

            <button
              type="button"
              className="mt-4 inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-[10px] font-semibold text-red-500 transition hover:bg-red-500 hover:text-white"
            >
              <Trash2 size={14} />
              Delete Product
            </button>
          </section>
        </div>
      </form>
    </div>
  );
}