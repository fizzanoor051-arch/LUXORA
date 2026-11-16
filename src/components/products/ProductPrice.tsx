interface ProductPriceProps {
  price: number;
  oldPrice?: number;
  size?: "sm" | "md" | "lg";
}

export default function ProductPrice({
  price,
  oldPrice,
  size = "md",
}: ProductPriceProps) {
  const discount =
    oldPrice && oldPrice > price
      ? Math.round(((oldPrice - price) / oldPrice) * 100)
      : 0;

  const sizes = {
    sm: {
      current: "text-sm",
      old: "text-xs",
      badge: "text-[9px] px-2 py-1",
    },
    md: {
      current: "text-xl",
      old: "text-sm",
      badge: "text-[9px] px-2.5 py-1.5",
    },
    lg: {
      current: "text-3xl",
      old: "text-base",
      badge: "text-[10px] px-3 py-1.5",
    },
  };

  const currentSize = sizes[size];

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span
        className={`font-semibold text-[#21152b] ${currentSize.current}`}
      >
        ${price.toFixed(2)}
      </span>

      {oldPrice && oldPrice > price && (
        <>
          <span
            className={`text-[#21152b]/35 line-through ${currentSize.old}`}
          >
            ${oldPrice.toFixed(2)}
          </span>

          <span
            className={`rounded-full bg-[#f3eaf4] font-semibold text-[#8d5c91] ${currentSize.badge}`}
          >
            {discount}% OFF
          </span>
        </>
      )}
    </div>
  );
}