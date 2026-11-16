"use client";

import {
  Bot,
  Check,
  RotateCcw,
  Send,
  Sparkles,
  UserRound,
  WandSparkles,
  ShoppingBag,
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProductRecommendation from "./ProductRecommendation";

interface Message {
  id: number;
  role: "user" | "assistant";
  text: string;
}

const suggestions = [
  {
    label: "Find a gift",
    icon: GiftIcon,
  },
  {
    label: "Show makeup",
    icon: Sparkles,
  },
  {
    label: "Find jewelry",
    icon: GemIcon,
  },
  {
    label: "Find a bag",
    icon: ShoppingBag,
  },
];

function GiftIcon({
  size = 14,
}: {
  size?: number;
}) {
  return <span style={{ fontSize: size }}>🎁</span>;
}

function GemIcon({
  size = 14,
}: {
  size?: number;
}) {
  return <span style={{ fontSize: size }}>✦</span>;
}

export default function AIProductAssistant() {
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      text:
        "Welcome to LUXORA. ✨ Tell me what you're looking for, and I'll help you discover pieces that match your style, occasion, and budget.",
    },
  ]);

  const [showRecommendations, setShowRecommendations] =
    useState(false);

  const [isThinking, setIsThinking] = useState(false);

  const getAIResponse = (message: string) => {
    const lowerMessage = message.toLowerCase();

    if (
      lowerMessage.includes("makeup") ||
      lowerMessage.includes("beauty") ||
      lowerMessage.includes("cosmetic")
    ) {
      return "Beautiful choice. 💄 I've focused on LUXORA's beauty collection and selected options that could complement your style.";
    }

    if (
      lowerMessage.includes("jewelry") ||
      lowerMessage.includes("necklace") ||
      lowerMessage.includes("earring") ||
      lowerMessage.includes("ring")
    ) {
      return "Something elegant? ✨ Our jewelry collection has timeless pieces for both everyday styling and special occasions.";
    }

    if (
      lowerMessage.includes("bag") ||
      lowerMessage.includes("handbag") ||
      lowerMessage.includes("purse")
    ) {
      return "A beautiful bag can transform an entire look. 👜 I've selected some LUXORA options worth exploring.";
    }

    if (
      lowerMessage.includes("gift") ||
      lowerMessage.includes("present") ||
      lowerMessage.includes("birthday")
    ) {
      return "I'd love to help you find the perfect gift. 🎁 I've prepared some versatile LUXORA picks that are easy to gift.";
    }

    if (
      lowerMessage.includes("shoe") ||
      lowerMessage.includes("heels")
    ) {
      return "Let's find something stylish for your steps. 👠 LUXORA has elegant footwear options for different occasions.";
    }

    if (
      lowerMessage.includes("dress") ||
      lowerMessage.includes("fashion") ||
      lowerMessage.includes("outfit")
    ) {
      return "Let's build the look. ✨ I can help you explore fashion pieces and find something that fits your occasion.";
    }

    if (
      lowerMessage.includes("budget") ||
      lowerMessage.includes("cheap") ||
      lowerMessage.includes("affordable")
    ) {
      return "Absolutely. Tell me your approximate budget and I'll help narrow the collection down to options that make sense for you.";
    }

    return "I can help you discover products by category, style, occasion, or budget. Tell me a little more about what you're looking for and I'll narrow it down for you.";
  };

  const sendMessage = (text?: string) => {
    const message = (text ?? input).trim();

    if (!message || isThinking) return;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      text: message,
    };

    setMessages((current) => [
      ...current,
      userMessage,
    ]);

    setInput("");
    setIsThinking(true);

    setTimeout(() => {
      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        text: getAIResponse(message),
      };

      setMessages((current) => [
        ...current,
        assistantMessage,
      ]);

      setIsThinking(false);
      setShowRecommendations(true);
    }, 650);
  };

  const resetAssistant = () => {
    setMessages([
      {
        id: Date.now(),
        role: "assistant",
        text:
          "Let's start fresh. ✨ What would you like to discover today?",
      },
    ]);

    setShowRecommendations(false);
    setInput("");
    setIsThinking(false);
  };

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-[#21152b]/10 bg-gradient-to-br from-[#fffdfb] via-[#fbf5f9] to-[#f5eef8] shadow-[0_30px_100px_rgba(33,21,43,0.10)]">
      {/* Decorative Glow */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-72 w-72 rounded-full bg-[#ead0d8]/40 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-[#cbb7d4]/35 blur-3xl" />

      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#21152b] via-[#2c1b35] to-[#4b3150] px-5 py-6 text-white sm:px-8">
        {/* Header glow */}
        <div className="pointer-events-none absolute -right-20 -top-28 h-64 w-64 rounded-full bg-[#8d5c91]/30 blur-3xl" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            {/* AI Avatar */}
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 0 rgba(201,165,106,0)",
                  "0 0 35px rgba(201,165,106,0.20)",
                  "0 0 0 rgba(201,165,106,0)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-[#8d5c91] to-[#6f4774]"
            >
              <Sparkles
                size={24}
                strokeWidth={1.5}
              />

              <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-[#21152b] bg-emerald-400" />
            </motion.div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#d8bfdc]">
                  LUXORA Intelligence
                </p>

                <span className="rounded-full border border-[#c9a56a]/30 bg-[#c9a56a]/10 px-2 py-1 text-[8px] font-semibold uppercase tracking-[0.14em] text-[#e6cc9b]">
                  Beta
                </span>
              </div>

              <h2 className="mt-1 font-serif text-xl sm:text-2xl">
                AI Personal Shopper
              </h2>

              <p className="mt-1 text-xs text-white/55">
                Your private guide to the LUXORA collection.
              </p>
            </div>
          </div>

          {/* Header actions */}
          <button
            type="button"
            onClick={resetAssistant}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/65 transition hover:bg-white/10 hover:text-white"
          >
            <RotateCcw size={12} />
            New Search
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="relative grid lg:grid-cols-[0.95fr_1.05fr]">
        {/* Chat Panel */}
        <div className="border-b border-[#21152b]/10 p-5 sm:p-7 lg:border-b-0 lg:border-r">
          {/* Online status */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>

              <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#21152b]/45">
                AI Online
              </span>
            </div>

            <span className="text-[9px] text-[#21152b]/25">
              {messages.length} messages
            </span>
          </div>

          {/* Messages */}
          <div className="mb-6 max-h-[390px] min-h-[250px] space-y-4 overflow-y-auto pr-1">
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{
                    opacity: 0,
                    y: 12,
                    scale: 0.98,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className={`flex items-end gap-2 ${
                    message.role === "assistant"
                      ? "justify-start"
                      : "justify-end"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#21152b] text-white shadow-sm">
                      <Bot size={15} strokeWidth={1.6} />
                    </div>
                  )}

                  <div
                    className={`max-w-[84%] rounded-2xl px-4 py-3.5 text-[13px] leading-6 shadow-sm ${
                      message.role === "assistant"
                        ? "rounded-bl-md border border-[#21152b]/5 bg-white/80 text-[#21152b]"
                        : "rounded-br-md bg-[#21152b] text-white shadow-[0_10px_25px_rgba(33,21,43,0.15)]"
                    }`}
                  >
                    {message.text}
                  </div>

                  {message.role === "user" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#eadfeb] text-[#8d5c91]">
                      <UserRound
                        size={15}
                        strokeWidth={1.6}
                      />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Thinking */}
            <AnimatePresence>
              {isThinking && (
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
                  className="flex items-end gap-2"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#21152b] text-white">
                    <Bot size={15} />
                  </div>

                  <div className="rounded-2xl rounded-bl-md border border-[#21152b]/5 bg-white/80 px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      {[0, 1, 2].map((dot) => (
                        <motion.span
                          key={dot}
                          animate={{
                            y: [0, -4, 0],
                            opacity: [0.35, 1, 0.35],
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
          </div>

          {/* Suggestions */}
          <div className="mb-5">
            <div className="mb-2.5 flex items-center gap-2">
              <WandSparkles
                size={12}
                className="text-[#c9a56a]"
              />

              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#21152b]/35">
                Try asking
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {suggestions.map(
                ({ label, icon: Icon }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => sendMessage(label)}
                    disabled={isThinking}
                    className="group inline-flex items-center gap-2 rounded-full border border-[#21152b]/10 bg-white/70 px-3.5 py-2.5 text-[10px] font-semibold text-[#6e5272] shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-[#8d5c91]/30 hover:bg-white hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#f2e8f3] text-[#8d5c91]">
                      <Icon size={11} />
                    </span>

                    {label}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Input */}
          <form
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage();
            }}
            className="relative"
          >
            <div className="flex items-center gap-2 rounded-2xl border border-[#21152b]/10 bg-white/90 p-2 shadow-sm transition focus-within:border-[#8d5c91]/30 focus-within:shadow-md">
              <input
                type="text"
                value={input}
                onChange={(event) =>
                  setInput(event.target.value)
                }
                disabled={isThinking}
                placeholder="Tell me what you're looking for..."
                className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-[#21152b] outline-none placeholder:text-[#21152b]/30 disabled:opacity-50"
              />

              <motion.button
                type="submit"
                disabled={
                  !input.trim() || isThinking
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
            </div>
          </form>
        </div>

        {/* Recommendations */}
        <div className="relative overflow-hidden bg-white/35 p-5 sm:p-7">
          {/* Decorative glow */}
          <div className="pointer-events-none absolute right-0 top-0 h-52 w-52 rounded-full bg-[#ead0d8]/25 blur-3xl" />

          {showRecommendations ? (
            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.45,
              }}
              className="relative"
            >
              <div className="mb-6 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eee4f0] text-[#8d5c91]">
                    <Sparkles
                      size={18}
                      strokeWidth={1.6}
                    />
                  </div>

                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#8d5c91]">
                      Personalized Selection
                    </p>

                    <h3 className="font-serif text-xl text-[#21152b]">
                      Picked For You
                    </h3>
                  </div>
                </div>

                <div className="hidden items-center gap-1.5 rounded-full border border-[#c9a56a]/20 bg-[#c9a56a]/5 px-3 py-1.5 sm:flex">
                  <Sparkles
                    size={10}
                    className="text-[#c9a56a]"
                  />

                  <span className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#8d5c91]">
                    AI Match
                  </span>
                </div>
              </div>

              <ProductRecommendation title="Picked For You" />

              <div className="mt-5 flex items-center gap-2 rounded-xl border border-[#21152b]/5 bg-white/55 px-4 py-3">
                <Check
                  size={14}
                  className="text-emerald-500"
                />

                <p className="text-[10px] leading-5 text-[#21152b]/45">
                  Recommendations are based on your current
                  shopping request.
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="relative flex min-h-[460px] flex-col items-center justify-center px-4 text-center">
              {/* AI Orb */}
              <div className="relative">
                <motion.div
                  animate={{
                    scale: [1, 1.04, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -inset-5 rounded-full bg-[#cbb7d4]/20 blur-2xl"
                />

                <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-[#8d5c91]/10 bg-gradient-to-br from-[#f7edf8] to-[#eadfeb] text-[#8d5c91] shadow-[0_20px_50px_rgba(141,92,145,0.12)]">
                  <Bot
                    size={38}
                    strokeWidth={1.3}
                  />

                  <span className="absolute right-1 top-1 flex h-7 w-7 items-center justify-center rounded-full border-4 border-[#f7edf8] bg-[#c9a56a] text-[#21152b]">
                    <Sparkles size={11} />
                  </span>
                </div>
              </div>

              <p className="mt-8 text-[9px] font-bold uppercase tracking-[0.22em] text-[#8d5c91]">
                Your Personal Curator
              </p>

              <h3 className="mt-2 max-w-md font-serif text-2xl text-[#21152b] sm:text-3xl">
                Let AI find something
                <span className="italic text-[#8d5c91]">
                  {" "}
                  beautiful.
                </span>
              </h3>

              <p className="mt-4 max-w-md text-sm leading-6 text-[#21152b]/45">
                Tell me your style, budget, occasion, or
                simply describe what you have in mind. I'll
                help you explore the LUXORA collection.
              </p>

              {/* Feature pills */}
              <div className="mt-7 flex flex-wrap justify-center gap-2">
                {[
                  "Smart Discovery",
                  "Style Matching",
                  "Gift Ideas",
                  "Budget Friendly",
                ].map((feature) => (
                  <span
                    key={feature}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#21152b]/7 bg-white/65 px-3 py-2 text-[9px] font-semibold text-[#6e5272] shadow-sm"
                  >
                    <Check
                      size={11}
                      className="text-[#8d5c91]"
                    />

                    {feature}
                  </span>
                ))}
              </div>

              {/* Bottom mini note */}
              <div className="mt-8 flex items-center gap-2 text-[9px] uppercase tracking-[0.14em] text-[#21152b]/25">
                <ShoppingBag size={11} />
                Curated shopping experience
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}