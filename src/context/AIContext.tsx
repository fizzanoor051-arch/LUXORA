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

    // Demo AI response.
    // Later this will connect to the real AI API.

    setTimeout(() => {
      const assistantMessage: AIMessage = {
        id: `${Date.now()}-assistant`,
        role: "assistant",
        content:
          "I'd be happy to help you find the perfect product on LUXORA. Tell me what you're looking for.",
      };

      setMessages((current) => [
        ...current,
        assistantMessage,
      ]);

      setIsLoading(false);
    }, 800);
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