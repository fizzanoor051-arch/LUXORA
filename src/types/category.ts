export interface Category {
  id: string;
  name: string;
  slug: string;

  description?: string;
  image?: string;
  icon?: string;

  productCount?: number;

  isFeatured?: boolean;

  createdAt?: string;
  updatedAt?: string;
}

export interface CategoryWithProducts
  extends Category {
  products: string[];
}