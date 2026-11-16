"use client";

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";

const colors = [
  { name: "Black", value: "#171419" },
  { name: "White", value: "#ffffff" },
  { name: "Rose", value: "#d9a6ad" },
  { name: "Lavender", value: "#bba6c7" },
  { name: "Beige", value: "#d9c6a5" },
  { name: "Gold", value: "#c49b63" },
  { name: "Silver", value: "#b8bcc3" },
  { name: "Pink", value: "#e8b8c4" },
];

export default function ColorFilter() {
  const [isOpen, setIsOpen] = useState(true);
  const [selected, setSelected] = useState<string[]>([]);

  const toggleColor = (color: string) => {
    setSelected((current) =>
      current.includes(color)
        ? current.filter((item) => item !== color)
        : [...current, color]
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
          Color
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
        <div className="mt-5 grid grid-cols-4 gap-4">
          {colors.map((color) => {
            const selectedColor = selected.includes(color.name);

            return (
              <button
                key={color.name}
                type="button"
                onClick={() => toggleColor(color.name)}
                title={color.name}
                aria-label={`Select ${color.name}`}
                className="group flex flex-col items-center gap-2"
              >
                <span
                  className={`relative flex h-8 w-8 items-center justify-center rounded-full border-2 transition ${
                    selectedColor
                      ? "border-[#8d5c91] p-0.5"
                      : "border-transparent"
                  }`}
                >
                  <span
                    className="h-full w-full rounded-full border border-black/10"
                    style={{ backgroundColor: color.value }}
                  />

                  {selectedColor && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <Check
                        size={14}
                        strokeWidth={2}
                        className={
                          color.name === "White" ||
                          color.name === "Beige"
                            ? "text-[#21152b]"
                            : "text-white"
                        }
                      />
                    </span>
                  )}
                </span>

                <span className="text-[9px] text-[#21152b]/45">
                  {color.name}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}