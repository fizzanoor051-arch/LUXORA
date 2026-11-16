"use client";

import { CheckCircle2, AlertCircle, Info, X, XCircle } from "lucide-react";
import { ReactNode } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "warning" | "info";
  onClose?: () => void;
  icon?: ReactNode;
}

export default function Toast({
  message,
  type = "success",
  onClose,
  icon,
}: ToastProps) {
  const styles = {
    success: {
      container: "border-green-200 bg-green-50",
      icon: "text-green-600",
      text: "text-green-800",
      defaultIcon: <CheckCircle2 className="h-5 w-5" />,
    },
    error: {
      container: "border-red-200 bg-red-50",
      icon: "text-red-600",
      text: "text-red-800",
      defaultIcon: <XCircle className="h-5 w-5" />,
    },
    warning: {
      container: "border-yellow-200 bg-yellow-50",
      icon: "text-yellow-600",
      text: "text-yellow-800",
      defaultIcon: <AlertCircle className="h-5 w-5" />,
    },
    info: {
      container: "border-blue-200 bg-blue-50",
      icon: "text-blue-600",
      text: "text-blue-800",
      defaultIcon: <Info className="h-5 w-5" />,
    },
  };

  const currentStyle = styles[type];

  return (
    <div
      className={`flex w-full max-w-sm items-center gap-3 rounded-xl border px-4 py-3 shadow-lg ${currentStyle.container}`}
      role="alert"
    >
      <div className={currentStyle.icon}>
        {icon || currentStyle.defaultIcon}
      </div>

      <p className={`flex-1 text-sm font-medium ${currentStyle.text}`}>
        {message}
      </p>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className={`rounded-md p-1 transition hover:bg-black/5 ${currentStyle.text}`}
          aria-label="Close notification"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}