"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

export interface AIMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface AIContextType {
  messages: AIMessage[];
  isLoading: boolean;
  sendMessage: (message: string) => void;
  clearMessages: () => void;
}

const AIContext = createContext<
  AIContextType | undefined
>(undefined);

interface AIProviderProps {
  children: ReactNode;
}

export function AIProvider({ children }: AIProviderProps) {
  const [messages, setMessages] = useState<AIMessage[]>(
    []
  );

  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = (message: string) => {
    if (!message.trim()) return;

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      role: "user",
      content: message,
    };

    setMessages((current) => [
      ...current,
      userMessage,
    ]);

    setIsLoading(true);

    // Real product matching from the live catalog (see /api/ai/assistant).
    fetch("/api/ai/assistant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    })
      .then((r) => r.json())
      .then((d) => {
        const list: { name: string; price: number; slug: string }[] = d.products ?? [];
        const lines = list.map((p) => `• ${p.name} - $${p.price} → /products/${p.slug}`);
        return d.reply
          ? [d.reply, ...lines].join("\n")
          : d.error || "Sorry, I could not search right now.";
      })
      .catch(() => "Sorry, I could not search right now. Please try again.")
      .then((content) => {
        setMessages((current) => [
          ...current,
          { id: `${Date.now()}-assistant`, role: "assistant", content },
        ]);
        setIsLoading(false);
      });
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <AIContext.Provider
      value={{
        messages,
        isLoading,
        sendMessage,
        clearMessages,
      }}
    >
      {children}
    </AIContext.Provider>
  );
}

export function useAIContext() {
  const context = useContext(AIContext);

  if (!context) {
    throw new Error(
      "useAIContext must be used inside AIProvider"
    );
  }

  return context;
}