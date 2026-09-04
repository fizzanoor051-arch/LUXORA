import type { Product } from "./product";

export interface CartItem {
  id: string;
  productId: string;

  product?: Product;

  name: string;
  price: number;
  quantity: number;

  image?: string;
  variant?: string;
}

export interface Cart {
  id?: string;
  userId?: string;

  items: CartItem[];

  subtotal: number;
  shipping: number;
  tax: number;
  total: number;

  totalItems: number;

  updatedAt?: string;
}