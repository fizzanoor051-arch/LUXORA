"use client";

import { SlidersHorizontal, X } from "lucide-react";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";
import RatingFilter from "./RatingFilter";

interface FilterSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function FilterSidebar({
  isOpen = true,
  onClose,
}: FilterSidebarProps) {
  if (!isOpen) return null;

  return (
    <aside className="w-full rounded-2xl border border-black/[0.06] bg-white p-5 lg:w-72 lg:shrink-0">
      <div className="mb-6 flex items-center justify-between border-b border-black/[0.06] pb-5">
        <div className="flex items-center gap-2">
          <SlidersHorizontal
            size={17}
            strokeWidth={1.5}
            className="text-[#8d5c91]"
          />

          <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-[#21152b]">
            Filters
          </h2>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f7f1f8] text-[#21152b] lg:hidden"
          >
            <X size={16} strokeWidth={1.5} />
          </button>
        )}
      </div>

      <div className="space-y-7">
        <CategoryFilter />

        <div className="h-px bg-black/[0.06]" />

        <PriceFilter />

        <div className="h-px bg-black/[0.06]" />

        <RatingFilter />
      </div>

      <button
        type="button"
        className="mt-8 w-full rounded-full bg-[#21152b] px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#8d5c91]"
      >
        Apply Filters
      </button>

      <button
        type="button"
        className="mt-2 w-full rounded-full border border-black/[0.08] px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#21152b] transition hover:bg-[#f7f1f8]"
      >
        Clear All
      </button>
    </aside>
  );
}