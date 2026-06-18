export const CART_STORAGE_KEY = "ringroad:cart";
export const CART_ID_KEY = "ringroad:cart-id";
export const RECENTLY_VIEWED_KEY = "ringroad:recently-viewed";
export const ANNOUNCEMENT_DISMISSED_KEY = "ringroad:announcement-dismissed";
export const AUTH_TOKEN_KEY = "ringroad:auth-token";

export const PRODUCTS_PER_PAGE = 24;
export const SEARCH_DEBOUNCE_MS = 300;
export const PREDICTIVE_SEARCH_LIMIT = 5;
export const RELATED_PRODUCTS_LIMIT = 4;
export const DEFAULT_CURRENCY = "USD";
export const DEFAULT_LOCALE = "en-US";
export const SIMULATED_LATENCY_MS = 80;

export const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "best-selling", label: "Best Selling" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
  { value: "title-asc", label: "A-Z" },
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number]["value"];
