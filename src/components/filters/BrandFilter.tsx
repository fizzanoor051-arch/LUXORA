"use client";

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";

const brands = [
  "LUMIÈRE",
  "VELORA",
  "AURELIA",
  "MAISON",
  "ELARA",
  "NOVELLE",
];

export default function BrandFilter() {
  const [isOpen, setIsOpen] = useState(true);
  const [selected, setSelected] = useState<string[]>([]);

  const toggleBrand = (brand: string) => {
    setSelected((current) =>
      current.includes(brand)
        ? current.filter((item) => item !== brand)
        : [...current, brand]
    );
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className="flex w-full items-center justify-between"
      >
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#21152b]">
          Brand
        </span>

        <ChevronDown
          size={16}
          strokeWidth={1.5}
          className={`text-[#21152b]/50 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="mt-4 space-y-3">
          {brands.map((brand) => {
            const checked = selected.includes(brand);

            return (
              <button
                key={brand}
                type="button"
                onClick={() => toggleBrand(brand)}
                className="flex w-full items-center gap-3 text-left"
              >
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded border transition ${
                    checked
                      ? "border-[#21152b] bg-[#21152b] text-white"
                      : "border-black/15"
                  }`}
                >
                  {checked && <Check size={11} strokeWidth={2} />}
                </span>

                <span
                  className={`text-sm ${
                    checked
                      ? "font-medium text-[#21152b]"
                      : "text-[#21152b]/55"
                  }`}
                >
                  {brand}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}