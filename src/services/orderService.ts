import { api } from "./api";

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  variant?: string;
}

export interface Order {
  id: string;
  date: string;
  status:
    | "Processing"
    | "Shipped"
    | "Delivered"
    | "Cancelled";
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export interface CreateOrderData {
  items: OrderItem[];
  shippingAddress: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
}

export const orderService = {
  async getOrders(): Promise<Order[]> {
    return api.get<Order[]>("/orders");
  },

  async getOrderById(id: string): Promise<Order> {
    return api.get<Order>(`/orders/${id}`);
  },

  async createOrder(
    data: CreateOrderData
  ): Promise<Order> {
    return api.post<Order>("/orders", data);
  },

  async cancelOrder(id: string): Promise<Order> {
    return api.patch<Order>(
      `/orders/${id}/cancel`
    );
  },
};