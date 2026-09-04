"use client";

import { Bot, UserRound } from "lucide-react";
import { motion } from "framer-motion";

interface ChatMessageProps {
  role: "user" | "assistant";
  message: string;
}

export default function ChatMessage({
  role,
  message,
}: ChatMessageProps) {
  const isAssistant = role === "assistant";

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
        scale: 0.98,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.28,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`flex items-end gap-2.5 ${
        isAssistant ? "justify-start" : "justify-end"
      }`}
    >
      {isAssistant && (
        <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#21152b] to-[#8d5c91] text-white shadow-sm">
          <Bot size={15} strokeWidth={1.6} />

          <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#faf7fb] bg-emerald-400" />
        </div>
      )}

      <div
        className={`relative max-w-[82%] px-4 py-3 text-[13px] leading-6 ${
          isAssistant
            ? "rounded-2xl rounded-bl-md border border-[#21152b]/5 bg-white text-[#21152b] shadow-[0_5px_20px_rgba(33,21,43,0.05)]"
            : "rounded-2xl rounded-br-md bg-gradient-to-br from-[#21152b] to-[#3d2747] text-white shadow-[0_8px_25px_rgba(33,21,43,0.15)]"
        }`}
      >
        {isAssistant && (
          <div className="mb-1.5 flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-[0.15em] text-[#8d5c91]">
            <span className="h-1 w-1 rounded-full bg-[#c9a56a]" />
            LUXORA AI
          </div>
        )}

        <p>{message}</p>
      </div>

      {!isAssistant && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-[#8d5c91]/10 bg-[#f0e7f2] text-[#8d5c91]">
          <UserRound size={15} strokeWidth={1.6} />
        </div>
      )}
    </motion.div>
  );
}