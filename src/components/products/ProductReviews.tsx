"use client";

import { useState } from "react";
import { Star } from "lucide-react";

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

interface ProductReviewsProps {
  reviews: Review[];
}

export default function ProductReviews({
  reviews,
}: ProductReviewsProps) {
  const [showAll, setShowAll] = useState(false);

  const visibleReviews = showAll ? reviews : reviews.slice(0, 3);

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) /
        reviews.length
      : 0;

  return (
    <section className="border-t border-black/[0.07] pt-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8d5c91]">
            Customer feedback
          </p>

          <h2 className="mt-2 font-serif text-3xl text-[#21152b]">
            Product Reviews
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Star
              size={18}
              fill="currentColor"
              className="text-[#c49b63]"
            />
            <span className="font-semibold text-[#21152b]">
              {averageRating.toFixed(1)}
            </span>
          </div>

          <span className="text-sm text-[#21152b]/45">
            {reviews.length} reviews
          </span>
        </div>
      </div>

      <div className="mt-8 space-y-5">
        {visibleReviews.length > 0 ? (
          visibleReviews.map((review) => (
            <article
              key={review.id}
              className="rounded-2xl border border-black/[0.06] bg-[#faf8fa] p-5 sm:p-6"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-[#21152b]">
                    {review.name}
                  </h3>

                  <div className="mt-1 flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        size={12}
                        fill={
                          index < review.rating
                            ? "currentColor"
                            : "none"
                        }
                        className="text-[#c49b63]"
                      />
                    ))}
                  </div>
                </div>

                <span className="text-[11px] text-[#21152b]/35">
                  {review.date}
                </span>
              </div>

              <p className="mt-4 text-sm leading-7 text-[#21152b]/60">
                {review.comment}
              </p>
            </article>
          ))
        ) : (
          <div className="rounded-2xl bg-[#faf8fa] px-6 py-12 text-center">
            <p className="text-sm text-[#21152b]/45">
              No reviews yet. Be the first to review this product.
            </p>
          </div>
        )}
      </div>

      {reviews.length > 3 && (
        <button
          type="button"
          onClick={() => setShowAll((value) => !value)}
          className="mt-7 rounded-full border border-[#21152b]/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#21152b] transition hover:border-[#8d5c91] hover:bg-[#f7f1f8] hover:text-[#8d5c91]"
        >
          {showAll ? "Show Less" : "View All Reviews"}
        </button>
      )}
    </section>
  );
}