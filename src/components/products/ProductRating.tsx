"use client";

import { Star } from "lucide-react";

interface ProductRatingProps {
  rating: number;
  reviews?: number;
  showNumber?: boolean;
}

export default function ProductRating({
  rating,
  reviews,
  showNumber = true,
}: ProductRatingProps) {
  const roundedRating = Math.round(rating);

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            size={14}
            strokeWidth={1.4}
            fill={index < roundedRating ? "currentColor" : "none"}
            className={
              index < roundedRating
                ? "text-[#c49b63]"
                : "text-[#c49b63]/30"
            }
          />
        ))}
      </div>

      {showNumber && (
        <span className="text-xs text-[#21152b]/55">
          {rating.toFixed(1)}
          {reviews !== undefined && ` (${reviews})`}
        </span>
      )}
    </div>
  );
}