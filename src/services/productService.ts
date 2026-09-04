import { api } from "./api";

export interface Product {
  id: string;
  name: string;
  category: string;
  brand?: string;
  description?: string;
  price: number;
  oldPrice?: number;
  stock?: number;
  rating?: number;
  reviews?: number;
  image?: string;
  images?: string[];
  badge?: string;
  slug?: string;
}

export interface ProductFilters {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  sortBy?: string;
  page?: number;
  limit?: number;
}

export interface ProductResponse {
  products: Product[];
  total: number;
  page?: number;
  pages?: number;
}

export const productService = {
  async getProducts(
    filters?: ProductFilters
  ): Promise<ProductResponse> {
    const params = new URLSearchParams();

    if (filters) {
      Object.entries(filters).forEach(
        ([key, value]) => {
          if (
            value !== undefined &&
            value !== null &&
            value !== ""
          ) {
            params.append(key, String(value));
          }
        }
      );
    }

    const query = params.toString();

    return api.get<ProductResponse>(
      `/products${query ? `?${query}` : ""}`
    );
  },

  async getProductById(
    id: string
  ): Promise<Product> {
    return api.get<Product>(
      `/products/${id}`
    );
  },

  async getProductBySlug(
    slug: string
  ): Promise<Product> {
    return api.get<Product>(
      `/products/slug/${slug}`
    );
  },

  async getFeaturedProducts(): Promise<Product[]> {
    return api.get<Product[]>(
      "/products/featured"
    );
  },

  async getBestSellers(): Promise<Product[]> {
    return api.get<Product[]>(
      "/products/best-sellers"
    );
  },

  async getNewArrivals(): Promise<Product[]> {
    return api.get<Product[]>(
      "/products/new-arrivals"
    );
  },

  async searchProducts(
    query: string
  ): Promise<Product[]> {
    return api.get<Product[]>(
      `/products/search?q=${encodeURIComponent(query)}`
    );
  },

  async getRelatedProducts(
    productId: string
  ): Promise<Product[]> {
    return api.get<Product[]>(
      `/products/${productId}/related`
    );
  },
};