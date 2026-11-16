"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Bot,
  MessageCircle,
  Sparkles,
  X,
} from "lucide-react";
import { useState } from "react";
import ChatWindow from "./ChatWindow";

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            key="chat-window"
            initial={{
              opacity: 0,
              y: 30,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.96,
            }}
            transition={{
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <ChatWindow onClose={() => setIsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 20 }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed bottom-5 right-5 z-[70] sm:bottom-7 sm:right-7"
          >
            {/* Ambient Glow */}
            <div className="absolute inset-0 -z-10 rounded-full bg-[#8d5c91]/30 blur-2xl" />

            {/* Outer Ring */}
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
                opacity: [0.35, 0.12, 0.35],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -inset-2 rounded-full border border-[#c9a56a]/30"
            />

            <div className="group relative">
              {/* Tooltip */}
              <motion.div
                initial={{ opacity: 0, x: 8 }}
                whileHover={{ opacity: 1, x: 0 }}
                className="pointer-events-none absolute bottom-1/2 right-[calc(100%+12px)] hidden translate-y-1/2 whitespace-nowrap rounded-full border border-white/10 bg-[#21152b] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white shadow-xl sm:block"
              >
                Ask LUXORA AI
              </motion.div>

              <motion.button
                type="button"
                onClick={() => setIsOpen(true)}
                aria-label="Open LUXORA AI Shopping Assistant"
                whileHover={{
                  scale: 1.06,
                  y: -2,
                }}
                whileTap={{
                  scale: 0.94,
                }}
                className="relative flex h-[62px] w-[62px] items-center justify-center overflow-hidden rounded-full border border-white/20 bg-gradient-to-br from-[#21152b] via-[#35203f] to-[#8d5c91] text-white shadow-[0_20px_60px_rgba(33,21,43,0.28)]"
              >
                {/* Shine */}
                <motion.span
                  animate={{
                    x: ["-120%", "140%"],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-y-0 w-8 rotate-12 bg-white/15 blur-md"
                />

                <div className="relative flex flex-col items-center justify-center">
                  <MessageCircle
                    size={25}
                    strokeWidth={1.6}
                  />

                  <span className="absolute -right-3 -top-3 flex h-6 w-6 items-center justify-center rounded-full border border-[#21152b] bg-[#c9a56a] text-[#21152b] shadow-md">
                    <Sparkles size={11} strokeWidth={2} />
                  </span>
                </div>

                {/* Online indicator */}
                <span className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full border-2 border-[#21152b] bg-emerald-400" />
              </motion.button>
            </div>

            {/* Small label below */}
            <motion.div
              animate={{ y: [0, -2, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="pointer-events-none absolute right-0 top-[calc(100%+8px)] hidden whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.18em] text-[#21152b]/45 sm:block"
            >
              Personal Shopper
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}