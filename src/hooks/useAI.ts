"use client";

import { useState } from "react";

interface AIMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export function useAI() {
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      role: "user",
      content: message,
    };

    setMessages((current) => [...current, userMessage]);
    setIsLoading(true);

    // Demo AI response.
    // Later this will connect to the real AI API.

    setTimeout(() => {
      const assistantMessage: AIMessage = {
        id: `${Date.now()}-assistant`,
        role: "assistant",
        content:
          "I'd be happy to help you find the perfect product on LUXORA. Tell me what you're looking for.",
      };

      setMessages((current) => [...current, assistantMessage]);
      setIsLoading(false);
    }, 800);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
  };
}