import { api } from "./api";

export interface AdminProduct {
  id?: string;
  name: string;
  category: string;
  brand?: string;
  description?: string;
  price: number;
  oldPrice?: number;
  stock: number;
  sku?: string;
  status?: "Active" | "Draft" | "Out of Stock";
  image?: string;
}

export interface AdminStats {
  revenue: number;
  orders: number;
  customers: number;
  products: number;
}

export const adminService = {
  async getStats(): Promise<AdminStats> {
    return api.get<AdminStats>("/admin/stats");
  },

  async getProducts(): Promise<AdminProduct[]> {
    return api.get<AdminProduct[]>(
      "/admin/products"
    );
  },

  async createProduct(
    data: AdminProduct
  ): Promise<AdminProduct> {
    return api.post<AdminProduct>(
      "/admin/products",
      data
    );
  },

  async updateProduct(
    id: string,
    data: Partial<AdminProduct>
  ): Promise<AdminProduct> {
    return api.put<AdminProduct>(
      `/admin/products/${id}`,
      data
    );
  },

  async deleteProduct(
    id: string
  ): Promise<{ message: string }> {
    return api.delete<{ message: string }>(
      `/admin/products/${id}`
    );
  },

  async getCustomers(): Promise<unknown[]> {
    return api.get<unknown[]>(
      "/admin/customers"
    );
  },

  async getOrders(): Promise<unknown[]> {
    return api.get<unknown[]>(
      "/admin/orders"
    );
  },

  async getAnalytics(): Promise<unknown> {
    return api.get<unknown>(
      "/admin/analytics"
    );
  },
};