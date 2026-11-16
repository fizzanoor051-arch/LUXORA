"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

export default function SizeFilter() {
  const [isOpen, setIsOpen] = useState(true);
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSize = (size: string) => {
    setSelected((current) =>
      current.includes(size)
        ? current.filter((item) => item !== size)
        : [...current, size]
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
          Size
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
        <div className="mt-4 grid grid-cols-3 gap-2">
          {sizes.map((size) => {
            const selectedSize = selected.includes(size);

            return (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={`rounded-xl border py-2.5 text-xs font-medium transition ${
                  selectedSize
                    ? "border-[#21152b] bg-[#21152b] text-white"
                    : "border-black/[0.08] bg-white text-[#21152b]/55 hover:border-[#8d5c91] hover:text-[#8d5c91]"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}