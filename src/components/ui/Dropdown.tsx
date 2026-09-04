"use client";

import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export default function Dropdown({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  label,
  disabled = false,
  className = "",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(
    (option) => option.value === value
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const handleSelect = (selectedValue: string) => {
    onChange?.(selectedValue);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative w-full ${className}`}>
      {label && (
        <label className="mb-2 block text-sm font-semibold text-[#21152b]">
          {label}
        </label>
      )}

      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((current) => !current)}
        className="flex w-full items-center justify-between rounded-xl border border-[#dfd2e2] bg-white px-4 py-3 text-left text-sm transition hover:border-[#8d5c91] disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span
          className={
            selectedOption
              ? "text-[#21152b]"
              : "text-gray-400"
          }
        >
          {selectedOption?.label || placeholder}
        </span>

        <ChevronDown
          size={17}
          className={`text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-[#eadfee] bg-white p-1.5 shadow-xl">
          {options.length > 0 ? (
            options.map((option) => {
              const isSelected = option.value === value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition ${
                    isSelected
                      ? "bg-[#f4edf6] font-semibold text-[#8d5c91]"
                      : "text-gray-700 hover:bg-[#faf7fb]"
                  }`}
                >
                  {option.label}

                  {isSelected && <Check size={16} />}
                </button>
              );
            })
          ) : (
            <div className="px-3 py-4 text-center text-sm text-gray-500">
              No options available
            </div>
          )}
        </div>
      )}
    </div>
  );
}