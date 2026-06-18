// ============================================================================
// Product Types
// ============================================================================

export interface ProductImage {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  position: number;
}

export interface ProductVariant {
  id: string;
  title: string;
  option1: string;
  option2: string | null;
  option3: string | null;
  sku: string;
  price: number;
  compareAtPrice: number | null;
  available: boolean;
  imageId: string | null;
}

export interface ProductOption {
  name: string;
  position: number;
  values: string[];
}

export interface ProductReview {
  id: string;
  rating: number;
  title: string;
  body: string;
  author: string;
  createdAt: string;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  vendor: string;
  type: string;
  tags: string[];
  images: ProductImage[];
  variants: ProductVariant[];
  options: ProductOption[];
  priceRange: { min: number; max: number };
  compareAtPriceRange: { min: number; max: number } | null;
  available: boolean;
  createdAt: string;
  updatedAt: string;
  reviews?: ProductReview[];
  averageRating?: number;
  reviewCount?: number;
  seo: SEOData;
}

// ============================================================================
// Collection Types
// ============================================================================

export interface Collection {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  image: ProductImage | null;
  products: Product[];
  seo: SEOData;
}

// ============================================================================
// Cart Types
// ============================================================================

export interface CartItem {
  id: string;
  variantId: string;
  productId: string;
  handle: string;
  title: string;
  variantTitle: string;
  image: ProductImage;
  price: number;
  quantity: number;
  maxQuantity: number;
}

export interface Cart {
  id: string;
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  currency: string;
}

// ============================================================================
// Checkout Types
// ============================================================================

export interface Address {
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  province: string;
  zip: string;
  country: string;
  phone: string;
}

export interface ShippingRate {
  id: string;
  title: string;
  price: number;
  estimatedDays: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: Address;
  billingAddress: Address;
  status: "confirmed" | "processing" | "shipped" | "delivered";
  createdAt: string;
}

// ============================================================================
// Customer Types
// ============================================================================

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  defaultAddress: Address | null;
  addresses: Address[];
  orders: Order[];
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

// ============================================================================
// Navigation Types
// ============================================================================

export interface NavLink {
  title: string;
  url: string;
  children?: NavLink[];
}

export interface Navigation {
  main: NavLink[];
  footer: NavLink[];
}

// ============================================================================
// SEO Types
// ============================================================================

export interface SEOData {
  title: string;
  description: string;
  image?: string;
}

// ============================================================================
// Search Types
// ============================================================================

export interface SearchResult {
  products: Product[];
  collections: Collection[];
  pages: { title: string; url: string }[];
  totalResults: number;
}

// ============================================================================
// Filter Types
// ============================================================================

export interface FilterOption {
  label: string;
  value: string;
  count: number;
}

export interface FilterGroup {
  name: string;
  key: string;
  options: FilterOption[];
}

export interface FilterState {
  priceMin?: number;
  priceMax?: number;
  available?: boolean;
  tags?: string[];
  options?: Record<string, string[]>;
}

// ============================================================================
// Theme Types
// ============================================================================

export interface ThemeColors {
  primary: string;
  primaryContent: string;
  secondary: string;
  secondaryContent: string;
  accent: string;
  accentContent: string;
  base100: string;
  base200: string;
  base300: string;
  baseContent: string;
  success: string;
  warning: string;
  error: string;
}

export interface ThemeTypography {
  headingFont: string;
  bodyFont: string;
  baseSize: string;
  headingWeight: string;
}

export interface ThemeConfig {
  id: string;
  name: string;
  description: string;
  storeName: string;
  domain: string;
  logo: string | null;
  favicon: string;
  colors: ThemeColors;
  typography: ThemeTypography;
  navigation: Navigation;
  social: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    tiktok?: string;
    pinterest?: string;
  };
  features: {
    reviews: boolean;
    wishlist: boolean;
    newsletter: boolean;
    search: boolean;
  };
  announcement: {
    enabled: boolean;
    text: string;
    link: string | null;
  };
  footer: {
    newsletter: boolean;
    paymentIcons: boolean;
    copyright: string;
  };
}

// ============================================================================
// Section Types (for homepage)
// ============================================================================

export interface HeroSection {
  type: "hero";
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  ctaText: string;
  ctaUrl: string;
  alignment: "left" | "center";
  height: "sm" | "md" | "lg";
}

export interface FeaturedCollectionSection {
  type: "featured-collection";
  title: string;
  description?: string;
  collectionHandle: string;
  limit: number;
  ctaText?: string;
}

export interface ImageWithTextSection {
  type: "image-with-text";
  image: string;
  imageAlt: string;
  title: string;
  body: string;
  ctaText?: string;
  ctaUrl?: string;
  imagePosition: "left" | "right";
}

export interface TestimonialsSection {
  type: "testimonials";
  title: string;
  testimonials: {
    name: string;
    text: string;
    rating: number;
  }[];
}

export interface RichTextSection {
  type: "rich-text";
  content: string;
  alignment: "left" | "center";
  maxWidth: "sm" | "md" | "lg";
}

export type HomepageSection =
  | HeroSection
  | FeaturedCollectionSection
  | ImageWithTextSection
  | TestimonialsSection
  | RichTextSection;
