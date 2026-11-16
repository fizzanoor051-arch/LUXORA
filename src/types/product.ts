export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  categoryId?: string;
  brand?: string;
  description?: string;

  price: number;
  oldPrice?: number;

  stock: number;
  sku?: string;

  image?: string;
  images?: string[];

  rating?: number;
  reviews?: number;

  badge?: string;

  colors?: string[];
  sizes?: string[];

  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;

  createdAt?: string;
  updatedAt?: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  value: string;
  price?: number;
  stock?: number;
}

export interface ProductReview {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}