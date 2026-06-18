import type { ThemeConfig } from "../data/types";

export const defaultTheme: ThemeConfig = {
  id: "default-elora",
  name: "elora",
  description: "Premium leather wallets and accessories",
  storeName: "elora",
  domain: "localhost:4321",
  logo: null,
  favicon: "/favicon.svg",
  colors: {
    primary: "#0f0f0f",
    primaryContent: "#ffffff",
    secondary: "#8b6f4e",
    secondaryContent: "#ffffff",
    accent: "#3a4a3a",
    accentContent: "#ffffff",
    base100: "#fafaf9",
    base200: "#f2f0ed",
    base300: "#6b6360",
    baseContent: "#171717",
    success: "#3b5e3b",
    warning: "#b07d2e",
    error: "#9b2c2c",
  },
  typography: {
    headingFont: "'Old Standard TT', ui-serif, Georgia, serif",
    bodyFont: "'Google Sans Flex', 'Google Sans', ui-sans-serif, system-ui, sans-serif",
    baseSize: "16px",
    headingWeight: "400",
  },
  navigation: {
    main: [
      {
        title: "Shop",
        url: "/products",
        children: [
          { title: "All Wallets", url: "/products" },
          { title: "Leather Wallets", url: "/collections/leather-wallets" },
          { title: "Minimalist", url: "/collections/minimalist" },
          { title: "Travel Wallets", url: "/collections/travel-wallets" },
          { title: "RFID Safe", url: "/collections/rfid-safe" },
          { title: "Gifts", url: "/collections/gifts" },
        ],
      },
      { title: "New Arrivals", url: "/collections/new-arrivals" },
      { title: "Best Sellers", url: "/collections/best-sellers" },
      { title: "Our Story", url: "/pages/about" },
      { title: "Blog", url: "/blog" },
    ],
    footer: [
      {
        title: "Shop",
        url: "",
        children: [
          { title: "All Wallets", url: "/products" },
          { title: "Leather Wallets", url: "/collections/leather-wallets" },
          { title: "Minimalist", url: "/collections/minimalist" },
          { title: "New Arrivals", url: "/collections/new-arrivals" },
        ],
      },
      {
        title: "Support",
        url: "",
        children: [
          { title: "Contact Us", url: "/pages/contact" },
          { title: "Shipping Policy", url: "/pages/shipping-policy" },
          { title: "Returns & Exchanges", url: "/pages/returns" },
          { title: "FAQ", url: "/pages/faq" },
        ],
      },
      {
        title: "Company",
        url: "",
        children: [
          { title: "About Us", url: "/pages/about" },
          { title: "Blog", url: "/blog" },
          { title: "Privacy Policy", url: "/pages/privacy-policy" },
          { title: "Terms of Service", url: "/pages/terms-of-service" },
        ],
      },
    ],
  },
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    pinterest: "https://pinterest.com",
  },
  features: {
    reviews: true,
    wishlist: false,
    newsletter: true,
    search: true,
  },
  announcement: {
    enabled: true,
    text: "Free shipping on orders over $75 — Handcrafted with care",
    link: "/products",
  },
  footer: {
    newsletter: true,
    paymentIcons: true,
    copyright: `© ${new Date().getFullYear()} elora. All rights reserved.`,
  },
};
