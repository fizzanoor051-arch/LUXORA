"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Newest", value: "newest" },
  { label: "Best Selling", value: "best-selling" },
  { label: "Price: Low to High", value: "price-low" },
  { label: "Price: High to Low", value: "price-high" },
  { label: "Highest Rated", value: "rating" },
];

interface SortDropdownProps {
  value?: string;
  onChange?: (value: string) => void;
}

export default function SortDropdown({
  value = "featured",
  onChange,
}: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption =
    sortOptions.find((option) => option.value === value) ||
    sortOptions[0];

  const handleSelect = (newValue: string) => {
    onChange?.(newValue);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="flex min-w-[190px] items-center justify-between gap-5 rounded-full border border-black/[0.08] bg-white px-5 py-3 text-left transition hover:border-[#8d5c91]"
      >
        <div>
          <span className="block text-[9px] uppercase tracking-[0.12em] text-[#21152b]/35">
            Sort by
          </span>

          <span className="mt-0.5 block text-xs font-medium text-[#21152b]">
            {selectedOption.label}
          </span>
        </div>

        <ChevronDown
          size={15}
          strokeWidth={1.5}
          className={`shrink-0 text-[#21152b]/50 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <>
          <button
            type="button"
            aria-label="Close sort menu"
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-10 cursor-default"
          />

          <div className="absolute right-0 top-[calc(100%+8px)] z-20 min-w-[220px] overflow-hidden rounded-2xl border border-black/[0.06] bg-white p-2 shadow-xl">
            {sortOptions.map((option) => {
              const selected = option.value === value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={`flex w-full items-center rounded-xl px-4 py-3 text-left text-xs transition ${
                    selected
                      ? "bg-[#f7f1f8] font-semibold text-[#8d5c91]"
                      : "text-[#21152b]/60 hover:bg-[#faf7fa] hover:text-[#21152b]"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}