"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({
  images,
  productName,
}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const safeImages =
    images.length > 0
      ? images
      : [""];

  const nextImage = () => {
    setActiveIndex((current) =>
      current === safeImages.length - 1 ? 0 : current + 1
    );
  };

  const previousImage = () => {
    setActiveIndex((current) =>
      current === 0 ? safeImages.length - 1 : current - 1
    );
  };

  return (
    <div className="grid gap-4 md:grid-cols-[90px_1fr]">
      {/* Thumbnails */}
      <div className="order-2 flex gap-3 overflow-x-auto md:order-1 md:flex-col">
        {safeImages.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition ${
              activeIndex === index
                ? "border-[#8d5c91]"
                : "border-transparent"
            }`}
            aria-label={`View product image ${index + 1}`}
          >
            {image ? (
              <img
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[#eadfea]">
                <span className="font-serif text-xs italic text-[#21152b]/20">
                  LUXORA
                </span>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative order-1 overflow-hidden rounded-2xl bg-[#f3edf4] md:order-2">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="aspect-[4/5]"
        >
          {safeImages[activeIndex] ? (
            <img
              src={safeImages[activeIndex]}
              alt={productName}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#f2e9f3] via-[#dfcde1] to-[#b996bb]">
              <span className="font-serif text-5xl italic text-[#21152b]/15">
                LUXORA
              </span>
            </div>
          )}
        </motion.div>

        {safeImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={previousImage}
              aria-label="Previous product image"
              className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#21152b] shadow-md backdrop-blur transition hover:bg-[#21152b] hover:text-white"
            >
              <ChevronLeft size={19} strokeWidth={1.5} />
            </button>

            <button
              type="button"
              onClick={nextImage}
              aria-label="Next product image"
              className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#21152b] shadow-md backdrop-blur transition hover:bg-[#21152b] hover:text-white"
            >
              <ChevronRight size={19} strokeWidth={1.5} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}