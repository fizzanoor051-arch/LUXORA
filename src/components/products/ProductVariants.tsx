"use client";

import { useState } from "react";

interface VariantOption {
  label: string;
  value: string;
}

interface ProductVariant {
  name: string;
  options: VariantOption[];
}

interface ProductVariantsProps {
  variants: ProductVariant[];
  onChange?: (
    variantName: string,
    value: string
  ) => void;
}

export default function ProductVariants({
  variants,
  onChange,
}: ProductVariantsProps) {
  const [selected, setSelected] = useState<Record<string, string>>(
    {}
  );

  const handleSelect = (
    variantName: string,
    value: string
  ) => {
    setSelected((current) => ({
      ...current,
      [variantName]: value,
    }));

    onChange?.(variantName, value);
  };

  return (
    <div className="space-y-7">
      {variants.map((variant) => (
        <div key={variant.name}>
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#21152b]">
              {variant.name}
            </span>

            {selected[variant.name] && (
              <span className="text-xs text-[#8d5c91]">
                {selected[variant.name]}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {variant.options.map((option) => {
              const isSelected =
                selected[variant.name] === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() =>
                    handleSelect(variant.name, option.value)
                  }
                  className={`rounded-full border px-5 py-2.5 text-xs transition ${
                    isSelected
                      ? "border-[#21152b] bg-[#21152b] text-white"
                      : "border-black/[0.09] bg-white text-[#21152b] hover:border-[#8d5c91] hover:text-[#8d5c91]"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}