"use client";

import { useState } from "react";
import { ChevronDown, Check, Star } from "lucide-react";

const ratings = [5, 4, 3, 2];

export default function RatingFilter() {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedRating, setSelectedRating] = useState<number | null>(
    null
  );

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className="flex w-full items-center justify-between"
      >
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#21152b]">
          Rating
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
          {ratings.map((rating) => {
            const selected = selectedRating === rating;

            return (
              <button
                key={rating}
                type="button"
                onClick={() =>
                  setSelectedRating(selected ? null : rating)
                }
                className="flex w-full items-center gap-3 text-left"
              >
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded border transition ${
                    selected
                      ? "border-[#21152b] bg-[#21152b] text-white"
                      : "border-black/15"
                  }`}
                >
                  {selected && (
                    <Check size={11} strokeWidth={2} />
                  )}
                </span>

                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      size={13}
                      strokeWidth={1.3}
                      fill={
                        index < rating ? "currentColor" : "none"
                      }
                      className={
                        index < rating
                          ? "text-[#c49b63]"
                          : "text-[#c49b63]/25"
                      }
                    />
                  ))}
                </div>

                <span className="text-xs text-[#21152b]/45">
                  & Up
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}