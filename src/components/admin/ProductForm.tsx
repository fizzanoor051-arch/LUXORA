"use client";

import { ImagePlus, Save, X } from "lucide-react";
import { useState } from "react";

interface ProductFormData {
  name: string;
  category: string;
  description: string;
  price: string;
  oldPrice: string;
  stock: string;
  brand: string;
  sku: string;
  status: string;
}

const initialForm: ProductFormData = {
  name: "",
  category: "",
  description: "",
  price: "",
  oldPrice: "",
  stock: "",
  brand: "",
  sku: "",
  status: "Active",
};

export default function ProductForm() {
  const [form, setForm] = useState<ProductFormData>(initialForm);
  const [imageName, setImageName] = useState("");

  const updateField = (
    field: keyof ProductFormData,
    value: string
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Product data:", {
      ...form,
      image: imageName,
    });

    alert("Product saved successfully!");
  };

  const handleReset = () => {
    setForm(initialForm);
    setImageName("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-[#eadfee] bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="mb-6">
        <h2 className="font-serif text-2xl font-semibold text-[#21152b]">
          Add New Product
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Create a new product for the LUXORA marketplace.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#21152b]">
              Product Name
            </label>

            <input
              type="text"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="e.g. Luxury Rose Beauty Set"
              required
              className="w-full rounded-xl border border-[#dfd2e2] px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#8d5c91] focus:ring-2 focus:ring-[#8d5c91]/10"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#21152b]">
                Category
              </label>

              <select
                value={form.category}
                onChange={(e) => updateField("category", e.target.value)}
                required
                className="w-full rounded-xl border border-[#dfd2e2] bg-white px-4 py-3 text-sm outline-none focus:border-[#8d5c91] focus:ring-2 focus:ring-[#8d5c91]/10"
              >
                <option value="">Select category</option>
                <option value="Makeup">Makeup</option>
                <option value="Jewelry">Jewelry</option>
                <option value="Clothing">Clothing</option>
                <option value="Shoes">Shoes</option>
                <option value="Toys">Toys</option>
                <option value="Bags">Bags</option>
                <option value="Watches">Watches</option>
                <option value="Gifts">Gifts</option>
                <option value="Lifestyle">Lifestyle</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#21152b]">
                Brand
              </label>

              <input
                type="text"
                value={form.brand}
                onChange={(e) => updateField("brand", e.target.value)}
                placeholder="Brand name"
                className="w-full rounded-xl border border-[#dfd2e2] px-4 py-3 text-sm outline-none focus:border-[#8d5c91] focus:ring-2 focus:ring-[#8d5c91]/10"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#21152b]">
              Description
            </label>

            <textarea
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Write a detailed product description..."
              rows={5}
              className="w-full resize-none rounded-xl border border-[#dfd2e2] px-4 py-3 text-sm outline-none placeholder:text-gray-400 focus:border-[#8d5c91] focus:ring-2 focus:ring-[#8d5c91]/10"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#21152b]">
                Price ($)
              </label>

              <input
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={(e) => updateField("price", e.target.value)}
                placeholder="49.99"
                required
                className="w-full rounded-xl border border-[#dfd2e2] px-4 py-3 text-sm outline-none focus:border-[#8d5c91] focus:ring-2 focus:ring-[#8d5c91]/10"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#21152b]">
                Old Price ($)
              </label>

              <input
                type="number"
                min="0"
                step="0.01"
                value={form.oldPrice}
                onChange={(e) => updateField("oldPrice", e.target.value)}
                placeholder="69.99"
                className="w-full rounded-xl border border-[#dfd2e2] px-4 py-3 text-sm outline-none focus:border-[#8d5c91] focus:ring-2 focus:ring-[#8d5c91]/10"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#21152b]">
                Stock
              </label>

              <input
                type="number"
                min="0"
                value={form.stock}
                onChange={(e) => updateField("stock", e.target.value)}
                placeholder="100"
                required
                className="w-full rounded-xl border border-[#dfd2e2] px-4 py-3 text-sm outline-none focus:border-[#8d5c91] focus:ring-2 focus:ring-[#8d5c91]/10"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#21152b]">
                SKU
              </label>

              <input
                type="text"
                value={form.sku}
                onChange={(e) => updateField("sku", e.target.value)}
                placeholder="LUX-BEAUTY-001"
                className="w-full rounded-xl border border-[#dfd2e2] px-4 py-3 text-sm outline-none focus:border-[#8d5c91] focus:ring-2 focus:ring-[#8d5c91]/10"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#21152b]">
                Status
              </label>

              <select
                value={form.status}
                onChange={(e) => updateField("status", e.target.value)}
                className="w-full rounded-xl border border-[#dfd2e2] bg-white px-4 py-3 text-sm outline-none focus:border-[#8d5c91] focus:ring-2 focus:ring-[#8d5c91]/10"
              >
                <option value="Active">Active</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[#21152b]">
            Product Image
          </label>

          <label className="flex min-h-[260px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#d9c9dd] bg-[#faf7fb] p-6 text-center transition hover:border-[#8d5c91] hover:bg-[#f7f1f8]">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#eee4f0] text-[#8d5c91]">
              <ImagePlus size={25} />
            </div>

            <p className="text-sm font-semibold text-[#21152b]">
              Upload product image
            </p>

            <p className="mt-1 text-xs text-gray-500">
              PNG, JPG or WEBP
            </p>

            {imageName && (
              <p className="mt-4 max-w-full truncate text-xs font-medium text-[#8d5c91]">
                {imageName}
              </p>
            )}

            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={(e) =>
                setImageName(e.target.files?.[0]?.name || "")
              }
            />
          </label>
        </div>
      </div>

      <div className="mt-7 flex flex-col-reverse gap-3 border-t border-[#eadfee] pt-5 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#dfd2e2] px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-[#faf7fb]"
        >
          <X size={17} />
          Reset
        </button>

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#21152b] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#35203f]"
        >
          <Save size={17} />
          Save Product
        </button>
      </div>
    </form>
  );
}