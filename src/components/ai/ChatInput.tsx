"use client";

import {
  ArrowUp,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

interface ChatInputProps {
  onSend?: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function ChatInput({
  onSend,
  placeholder = "Ask LUXORA AI anything...",
  disabled = false,
}: ChatInputProps) {
  const [message, setMessage] = useState("");

  const maxLength = 500;

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage || disabled) return;

    onSend?.(trimmedMessage);
    setMessage("");
  };

  const hasMessage = message.trim().length > 0;

  return (
    <div className="relative">
      {/* Focus Glow */}
      <div className="pointer-events-none absolute -inset-px rounded-[1.35rem] bg-gradient-to-r from-[#8d5c91]/20 via-[#c9a56a]/10 to-[#8d5c91]/20 opacity-0 blur transition-opacity duration-300 focus-within:opacity-100" />

      <form
        onSubmit={handleSubmit}
        className="relative overflow-hidden rounded-[1.35rem] border border-[#21152b]/10 bg-white/90 p-2 shadow-[0_10px_35px_rgba(33,21,43,0.06)] backdrop-blur-xl transition-all duration-300 focus-within:border-[#8d5c91]/35 focus-within:shadow-[0_15px_45px_rgba(141,92,145,0.10)]"
      >
        <div className="flex items-center gap-2">
          {/* AI Icon */}
          <motion.div
            animate={
              disabled
                ? {}
                : {
                    rotate: [0, 3, -3, 0],
                  }
            }
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#f4eaf5] to-[#ead9ec] text-[#8d5c91] sm:flex"
          >
            <Sparkles size={17} strokeWidth={1.7} />
          </motion.div>

          {/* Input */}
          <div className="min-w-0 flex-1">
            <input
              type="text"
              value={message}
              maxLength={maxLength}
              onChange={(event) =>
                setMessage(event.target.value)
              }
              placeholder={placeholder}
              disabled={disabled}
              aria-label="Ask LUXORA AI"
              className="w-full bg-transparent px-2 py-2.5 text-sm text-[#21152b] outline-none placeholder:text-[#21152b]/35 disabled:cursor-not-allowed disabled:opacity-50"
            />

            {/* Character Counter */}
            {message.length > 0 && (
              <div className="px-2 pb-0.5 text-[9px] font-medium tracking-wide text-[#21152b]/30">
                {message.length}/{maxLength}
              </div>
            )}
          </div>

          {/* Send */}
          <motion.button
            type="submit"
            disabled={!hasMessage || disabled}
            whileHover={
              hasMessage && !disabled
                ? {
                    scale: 1.04,
                  }
                : {}
            }
            whileTap={
              hasMessage && !disabled
                ? {
                    scale: 0.94,
                  }
                : {}
            }
            aria-label="Send message"
            className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#21152b] text-white shadow-md transition-all duration-300 hover:bg-[#8d5c91] disabled:cursor-not-allowed disabled:opacity-35"
          >
            {hasMessage && !disabled && (
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#8d5c91] to-[#21152b]"
              />
            )}

            <ArrowUp
              size={17}
              strokeWidth={1.8}
              className="relative z-10"
            />
          </motion.button>
        </div>
      </form>

      {/* Bottom Hint */}
      <div className="mt-2 flex items-center justify-between px-2">
        <span className="text-[9px] tracking-wide text-[#21152b]/30">
          LUXORA AI • Personal Shopping Assistant
        </span>

        <span className="hidden text-[9px] text-[#21152b]/25 sm:block">
          Press Enter ↵
        </span>
      </div>
    </div>
  );
}