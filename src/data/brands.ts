export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  description?: string;
}

export const brands: Brand[] = [
  {
    id: "brand-001",
    name: "LUXORA Beauty",
    slug: "luxora-beauty",
    logo: "/images/brands/luxora-beauty.png",
    description: "Premium beauty and makeup essentials.",
  },
  {
    id: "brand-002",
    name: "LUXORA Jewelry",
    slug: "luxora-jewelry",
    logo: "/images/brands/luxora-jewelry.png",
    description: "Elegant jewelry designed for timeless style.",
  },
  {
    id: "brand-003",
    name: "LUXORA Fashion",
    slug: "luxora-fashion",
    logo: "/images/brands/luxora-fashion.png",
    description: "Modern fashion with a premium touch.",
  },
  {
    id: "brand-004",
    name: "LUXORA Bags",
    slug: "luxora-bags",
    logo: "/images/brands/luxora-bags.png",
    description: "Stylish bags for everyday luxury.",
  },
  {
    id: "brand-005",
    name: "LUXORA Shoes",
    slug: "luxora-shoes",
    logo: "/images/brands/luxora-shoes.png",
    description: "Comfortable and sophisticated footwear.",
  },
  {
    id: "brand-006",
    name: "LUXORA Time",
    slug: "luxora-time",
    logo: "/images/brands/luxora-time.png",
    description: "Classic watches for modern lifestyles.",
  },
  {
    id: "brand-007",
    name: "LUXORA Lifestyle",
    slug: "luxora-lifestyle",
    logo: "/images/brands/luxora-lifestyle.png",
    description: "Premium essentials for everyday living.",
  },
];