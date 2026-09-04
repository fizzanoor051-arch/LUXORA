import { api } from "./api";

export interface AIMessage {
  role: "user" | "assistant";
  content: string;
}

export interface AIChatResponse {
  message: string;
  products?: string[];
}

export interface AIRecommendationResponse {
  products: string[];
  reason?: string;
}

export const aiService = {
  async chat(
    message: string,
    history: AIMessage[] = []
  ): Promise<AIChatResponse> {
    return api.post<AIChatResponse>(
      "/ai/chat",
      {
        message,
        history,
      }
    );
  },

  async getRecommendations(
    productId?: string,
    preferences?: string
  ): Promise<AIRecommendationResponse> {
    return api.post<AIRecommendationResponse>(
      "/ai/recommendations",
      {
        productId,
        preferences,
      }
    );
  },

  async searchProducts(
    query: string
  ): Promise<AIRecommendationResponse> {
    return api.post<AIRecommendationResponse>(
      "/ai/search",
      {
        query,
      }
    );
  },
};