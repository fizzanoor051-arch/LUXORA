"use client";

import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";

const categories = [
  "Makeup",
  "Jewelry",
  "Fashion",
  "Shoes",
  "Bags",
  "Watches",
  "Toys",
  "Gifts",
  "Lifestyle",
];

export default function CategoryFilter() {
  const [isOpen, setIsOpen] = useState(true);
  const [selected, setSelected] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    setSelected((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category]
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
          Category
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
        <div className="mt-4 space-y-2.5">
          {categories.map((category) => {
            const checked = selected.includes(category);

            return (
              <button
                key={category}
                type="button"
                onClick={() => toggleCategory(category)}
                className="flex w-full items-center gap-3 text-left"
              >
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded border transition ${
                    checked
                      ? "border-[#21152b] bg-[#21152b] text-white"
                      : "border-black/15 bg-white"
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
                  {category}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}