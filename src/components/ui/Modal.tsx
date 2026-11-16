"use client";

import { X } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  showCloseButton?: boolean;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = "md",
  showCloseButton = true,
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizes = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-[#21152b]/60 backdrop-blur-sm"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        className={`relative z-10 max-h-[90vh] w-full overflow-y-auto rounded-3xl border border-[#eadfee] bg-white shadow-2xl ${sizes[size]}`}
      >
        {(title || description || showCloseButton) && (
          <div className="flex items-start justify-between gap-4 border-b border-[#eadfee] p-5 sm:p-6">
            <div>
              {title && (
                <h2
                  id="modal-title"
                  className="font-serif text-xl font-semibold text-[#21152b]"
                >
                  {title}
                </h2>
              )}

              {description && (
                <p className="mt-1 text-sm leading-6 text-gray-500">
                  {description}
                </p>
              )}
            </div>

            {showCloseButton && (
              <button
                onClick={onClose}
                aria-label="Close"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-gray-500 transition hover:bg-[#f4edf6] hover:text-[#21152b]"
              >
                <X size={18} />
              </button>
            )}
          </div>
        )}

        <div className="p-5 sm:p-6">{children}</div>
      </div>
    </div>
  );
}