import { api } from "./api";

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  variant?: string;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  totalItems: number;
}

export const cartService = {
  async getCart(): Promise<Cart> {
    return api.get<Cart>("/cart");
  },

  async addToCart(
    productId: string,
    quantity = 1,
    variant?: string
  ): Promise<Cart> {
    return api.post<Cart>("/cart/items", {
      productId,
      quantity,
      variant,
    });
  },

  async updateQuantity(
    productId: string,
    quantity: number
  ): Promise<Cart> {
    return api.put<Cart>(
      `/cart/items/${productId}`,
      {
        quantity,
      }
    );
  },

  async removeFromCart(
    productId: string
  ): Promise<Cart> {
    return api.delete<Cart>(
      `/cart/items/${productId}`
    );
  },

  async clearCart(): Promise<Cart> {
    return api.delete<Cart>("/cart");
  },
};