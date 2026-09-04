export const SITE_NAME = "LUXORA";

export const SITE_DESCRIPTION =
  "Discover beauty, fashion, jewelry, lifestyle and more at LUXORA.";

export const CURRENCY = "USD";

export const FREE_SHIPPING_THRESHOLD = 75;

export const SHIPPING_FEE = 10;

export const TAX_RATE = 0.05;

export const CATEGORIES = [
  "Makeup",
  "Jewelry",
  "Clothing",
  "Shoes",
  "Toys",
  "Bags",
  "Watches",
  "Gifts",
  "Lifestyle",
];

export const ORDER_STATUSES = [
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
] as const;

export const PAYMENT_METHODS = [
  {
    value: "cod",
    label: "Cash on Delivery",
  },
  {
    value: "card",
    label: "Credit / Debit Card",
  },
  {
    value: "wallet",
    label: "Digital Wallet",
  },
];

export const NAV_LINKS = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Shop",
    href: "/products",
  },
  {
    label: "Makeup",
    href: "/categories/makeup",
  },
  {
    label: "Jewelry",
    href: "/categories/jewelry",
  },
  {
    label: "Fashion",
    href: "/categories/clothing",
  },
];

export const ADMIN_NAV_LINKS = [
  {
    label: "Dashboard",
    href: "/admin",
  },
  {
    label: "Products",
    href: "/admin/products",
  },
  {
    label: "Orders",
    href: "/admin/orders",
  },
  {
    label: "Customers",
    href: "/admin/customers",
  },
  {
    label: "Categories",
    href: "/admin/categories",
  },
  {
    label: "Inventory",
    href: "/admin/inventory",
  },
  {
    label: "Analytics",
    href: "/admin/analytics",
  },
  {
    label: "Settings",
    href: "/admin/settings",
  },
];