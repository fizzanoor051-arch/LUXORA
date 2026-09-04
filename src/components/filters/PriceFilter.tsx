"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function PriceFilter() {
  const [isOpen, setIsOpen] = useState(true);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className="flex w-full items-center justify-between"
      >
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#21152b]">
          Price
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
        <div className="mt-5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="min-price"
                className="mb-1.5 block text-[10px] uppercase tracking-[0.1em] text-[#21152b]/40"
              >
                Min
              </label>

              <div className="flex items-center rounded-xl border border-black/[0.08] px-3">
                <span className="text-sm text-[#21152b]/40">$</span>

                <input
                  id="min-price"
                  type="number"
                  min={0}
                  value={minPrice}
                  onChange={(e) =>
                    setMinPrice(Number(e.target.value))
                  }
                  className="w-full bg-transparent px-2 py-3 text-sm text-[#21152b] outline-none"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="max-price"
                className="mb-1.5 block text-[10px] uppercase tracking-[0.1em] text-[#21152b]/40"
              >
                Max
              </label>

              <div className="flex items-center rounded-xl border border-black/[0.08] px-3">
                <span className="text-sm text-[#21152b]/40">$</span>

                <input
                  id="max-price"
                  type="number"
                  min={0}
                  value={maxPrice}
                  onChange={(e) =>
                    setMaxPrice(Number(e.target.value))
                  }
                  className="w-full bg-transparent px-2 py-3 text-sm text-[#21152b] outline-none"
                />
              </div>
            </div>
          </div>

          <div className="mt-5">
            <div className="relative h-1 rounded-full bg-[#eadfea]">
              <div className="absolute left-0 right-0 h-1 rounded-full bg-[#8d5c91]" />
            </div>

            <div className="mt-2 flex justify-between text-[10px] text-[#21152b]/35">
              <span>$0</span>
              <span>$500+</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}