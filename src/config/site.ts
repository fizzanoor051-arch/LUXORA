export const siteConfig = {
  name: "LUXORA",

  description:
    "LUXORA is a premium AI-powered multi-category e-commerce marketplace for fashion, beauty, jewelry, lifestyle and more.",

  url: "https://luxora.com",

  email: "hello@luxora.com",

  phone: "+92 300 0000000",

  location: "Pakistan",

  currency: "USD",

  navigation: [
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
      href: "/categories/fashion",
    },
    {
      label: "More",
      href: "#",
      children: [
        {
          label: "Shoes",
          href: "/categories/shoes",
        },
        {
          label: "Bags",
          href: "/categories/bags",
        },
        {
          label: "Watches",
          href: "/categories/watches",
        },
        {
          label: "Toys",
          href: "/categories/toys",
        },
        {
          label: "Gifts",
          href: "/categories/gifts",
        },
        {
          label: "Lifestyle",
          href: "/categories/lifestyle",
        },
      ],
    },
  ],

  social: {
    instagram: "https://instagram.com/luxora",
    facebook: "https://facebook.com/luxora",
    twitter: "https://twitter.com/luxora",
    youtube: "https://youtube.com/@luxora",
  },

  links: {
    products: "/products",
    wishlist: "/wishlist",
    cart: "/cart",
    checkout: "/checkout",

    login: "/auth/login",
    register: "/auth/register",

    account: "/account",
    orders: "/account/orders",
    profile: "/account/profile",
    addresses: "/account/addresses",
    settings: "/account/settings",

    admin: "/admin",
  },

  features: {
    aiAssistant: true,
    aiRecommendations: true,
    wishlist: true,
    reviews: true,
    recentlyViewed: true,
    darkMode: true,
    responsiveDesign: true,
  },

  shipping: {
    freeShippingThreshold: 75,
    standardShippingFee: 10,
  },

  tax: {
    rate: 0.05,
  },

  seo: {
    title: "LUXORA | Premium AI-Powered Shopping",
    keywords: [
      "LUXORA",
      "online shopping",
      "ecommerce",
      "fashion",
      "makeup",
      "jewelry",
      "bags",
      "shoes",
      "watches",
      "gifts",
      "AI shopping",
    ],
  },
};

export type SiteConfig = typeof siteConfig;