"use client";

import {
  Bot,
  ChevronDown,
  RotateCcw,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ChatMessage from "./ChatMessage";

interface ChatWindowProps {
  onClose: () => void;
}

interface Message {
  id: number;
  role: "user" | "assistant";
  message: string;
}

const quickSuggestions = [
  "Find makeup",
  "Jewelry ideas",
  "Gift ideas",
  "Find a bag",
];

export default function ChatWindow({
  onClose,
}: ChatWindowProps) {
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      message:
        "Welcome to LUXORA ✨ I'm your personal shopping assistant. Tell me what you're looking for and I'll help you discover something beautiful.",
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  const getResponse = (text: string) => {
    const message = text.toLowerCase();

    if (
      message.includes("makeup") ||
      message.includes("beauty") ||
      message.includes("cosmetic")
    ) {
      return "Absolutely 💄 Let's explore beauty. LUXORA has elegant makeup and beauty essentials that can fit both everyday and special occasions.";
    }

    if (
      message.includes("jewelry") ||
      message.includes("necklace") ||
      message.includes("earring") ||
      message.includes("ring")
    ) {
      return "Something timeless? ✨ Our jewelry pieces are perfect when you want an elegant finishing touch. I'd recommend starting with our curated jewelry collection.";
    }

    if (
      message.includes("bag") ||
      message.includes("handbag") ||
      message.includes("purse")
    ) {
      return "A beautiful bag can instantly elevate your look. 👜 Let me guide you through some of LUXORA's most stylish options.";
    }

    if (
      message.includes("gift") ||
      message.includes("present") ||
      message.includes("birthday")
    ) {
      return "I'd love to help you find a thoughtful gift 🎁. Tell me who you're shopping for and your approximate budget, and we can narrow it down.";
    }

    if (
      message.includes("shoe") ||
      message.includes("heels") ||
      message.includes("footwear")
    ) {
      return "Let's find the perfect pair 👠. I can help you choose something elegant for everyday wear, parties, weddings, or special occasions.";
    }

    if (
      message.includes("dress") ||
      message.includes("fashion") ||
      message.includes("outfit")
    ) {
      return "Let's create the look ✨. Tell me the occasion, your preferred style, and your budget and I'll help you explore suitable pieces.";
    }

    if (
      message.includes("watch") ||
      message.includes("watches")
    ) {
      return "A classic timepiece is always a beautiful choice ⌚. Explore LUXORA's watch collection for elegant everyday and occasion-ready styles.";
    }

    if (
      message.includes("toy") ||
      message.includes("toys")
    ) {
      return "Looking for something fun? 🧸 I can help you explore LUXORA's toy collection and find something suitable for the occasion.";
    }

    if (
      message.includes("price") ||
      message.includes("budget") ||
      message.includes("affordable")
    ) {
      return "Of course. 💫 Tell me your approximate budget — for example $50, $100, or $150 — and I'll help you narrow down your choices.";
    }

    return "I'd be happy to help. ✨ You can ask me about makeup, jewelry, fashion, bags, shoes, watches, toys, gifts, or tell me your budget and occasion.";
  };

  const sendMessage = (messageText?: string) => {
    const trimmedMessage = (
      messageText ?? input
    ).trim();

    if (!trimmedMessage || isTyping) return;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      message: trimmedMessage,
    };

    setMessages((current) => [
      ...current,
      userMessage,
    ]);

    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        message: getResponse(trimmedMessage),
      };

      setMessages((current) => [
        ...current,
        assistantMessage,
      ]);

      setIsTyping(false);
    }, 700);
  };

  const resetChat = () => {
    setMessages([
      {
        id: Date.now(),
        role: "assistant",
        message:
          "Fresh start ✨ What are you shopping for today?",
      },
    ]);

    setInput("");
    setIsTyping(false);
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    sendMessage();
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
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
      className="fixed bottom-4 right-4 z-[70] flex h-[min(680px,calc(100vh-32px))] w-[calc(100vw-32px)] max-w-[410px] flex-col overflow-hidden rounded-[2rem] border border-white/30 bg-[#faf7fb]/95 shadow-[0_30px_100px_rgba(33,21,43,0.25)] backdrop-blur-2xl sm:bottom-6 sm:right-6"
    >
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#21152b] via-[#2d1b36] to-[#523657] px-5 py-5 text-white">
        {/* Decorative glow */}
        <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-[#8d5c91]/30 blur-3xl" />

        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* AI Avatar */}
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 0 rgba(201,165,106,0)",
                  "0 0 28px rgba(201,165,106,0.20)",
                  "0 0 0 rgba(201,165,106,0)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-[#8d5c91] to-[#6c4671]"
            >
              <Bot
                size={21}
                strokeWidth={1.5}
              />

              <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-[#21152b] bg-emerald-400" />
            </motion.div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg">
                  LUXORA AI
                </h3>

                <Sparkles
                  size={13}
                  className="text-[#d8b4dc]"
                />
              </div>

              <div className="mt-0.5 flex items-center gap-1.5">
                <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/50">
                  Personal Shopper
                </span>

                <span className="text-white/20">
                  •
                </span>

                <span className="text-[9px] text-emerald-300">
                  Online
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={resetChat}
              aria-label="Start new conversation"
              title="New conversation"
              className="rounded-xl p-2 text-white/55 transition hover:bg-white/10 hover:text-white"
            >
              <RotateCcw size={15} />
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close LUXORA AI"
              title="Close"
              className="rounded-xl p-2 text-white/55 transition hover:bg-white/10 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Conversation */}
      <div className="relative flex-1 overflow-y-auto bg-gradient-to-b from-[#faf7fb] to-[#f7f1f8] px-4 py-5">
        {/* Background glow */}
        <div className="pointer-events-none absolute -right-20 top-10 h-40 w-40 rounded-full bg-[#cbb7d4]/15 blur-3xl" />

        <div className="relative space-y-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              role={message.role}
              message={message.message}
            />
          ))}

          {/* Typing */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -5,
                }}
                className="flex items-end gap-2.5"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#21152b] to-[#8d5c91] text-white">
                  <Bot size={15} />
                </div>

                <div className="rounded-2xl rounded-bl-md border border-[#21152b]/5 bg-white px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-1.5">
                    {[0, 1, 2].map((dot) => (
                      <motion.span
                        key={dot}
                        animate={{
                          y: [0, -4, 0],
                          opacity: [
                            0.3,
                            1,
                            0.3,
                          ],
                        }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          delay: dot * 0.12,
                        }}
                        className="h-1.5 w-1.5 rounded-full bg-[#8d5c91]"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Suggestions + Input */}
      <div className="border-t border-[#21152b]/8 bg-white/90 px-4 pb-4 pt-3 backdrop-blur-xl">
        {/* Quick suggestions */}
        <div className="mb-3 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {quickSuggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => sendMessage(suggestion)}
              disabled={isTyping}
              className="shrink-0 rounded-full border border-[#21152b]/10 bg-[#faf7fb] px-3 py-2 text-[9px] font-semibold text-[#6e5272] transition hover:border-[#8d5c91]/30 hover:bg-[#f3eaf5] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {suggestion}
            </button>
          ))}
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 rounded-2xl border border-[#21152b]/10 bg-white p-2 shadow-[0_5px_25px_rgba(33,21,43,0.06)] transition focus-within:border-[#8d5c91]/35"
        >
          <input
            type="text"
            value={input}
            onChange={(event) =>
              setInput(event.target.value)
            }
            disabled={isTyping}
            placeholder="Ask about products..."
            className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-[#21152b] outline-none placeholder:text-[#21152b]/30 disabled:opacity-50"
          />

          <motion.button
            type="submit"
            disabled={
              !input.trim() || isTyping
            }
            whileHover={{
              scale: 1.04,
            }}
            whileTap={{
              scale: 0.94,
            }}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#21152b] text-white transition hover:bg-[#8d5c91] disabled:cursor-not-allowed disabled:opacity-30"
          >
            <Send
              size={15}
              strokeWidth={1.7}
            />
          </motion.button>
        </form>

        <div className="mt-2 flex items-center justify-between px-1">
          <span className="text-[8px] uppercase tracking-[0.12em] text-[#21152b]/25">
            Powered by LUXORA Intelligence
          </span>

          <ChevronDown
            size={11}
            className="rotate-180 text-[#21152b]/20"
          />
        </div>
      </div>
    </motion.div>
  );
}