import type { Address } from "./user";

export type OrderStatus =
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

export type PaymentStatus =
  | "Pending"
  | "Paid"
  | "Failed"
  | "Refunded";

export interface OrderItem {
  id: string;
  productId: string;

  name: string;
  price: number;
  quantity: number;

  image?: string;
  variant?: string;
}

export interface Order {
  id: string;
  userId: string;

  items: OrderItem[];

  subtotal: number;
  shipping: number;
  tax: number;
  total: number;

  status: OrderStatus;

  paymentMethod: string;
  paymentStatus: PaymentStatus;

  shippingAddress: Address;

  createdAt: string;
  updatedAt?: string;
}

export interface CreateOrderData {
  items: OrderItem[];

  shippingAddress: Address;

  paymentMethod: string;
}