import type { Product, FilterState } from "../types";
import { mockProducts } from "../mock/products";
import { simulateRequest } from "./client";
import type { SortOption } from "../../utils/constants";

export async function getProduct(
  handle: string
): Promise<Product | null> {
  await simulateRequest(null);
  return mockProducts.find((p) => p.handle === handle) ?? null;
}

export interface ProductListOptions {
  collection?: string;
  sort?: SortOption;
  filters?: FilterState;
  limit?: number;
  offset?: number;
}

export async function getProducts(
  options: ProductListOptions = {}
): Promise<{ products: Product[]; total: number }> {
  await simulateRequest(null);
  let products = [...mockProducts];

  // Filter by collection
  if (options.collection) {
    const { mockCollections } = await import("../mock/products");
    const collection = mockCollections.find(
      (c) => c.handle === options.collection
    );
    if (collection) {
      const productIds = new Set(collection.products.map((p) => p.id));
      products = products.filter((p) => productIds.has(p.id));
    }
  }

  // Apply tag filters
  if (options.filters?.tags && options.filters.tags.length > 0) {
    products = products.filter((p) =>
      options.filters!.tags!.some((tag) => p.tags.includes(tag))
    );
  }

  // Apply availability filter
  if (options.filters?.available !== undefined) {
    products = products.filter((p) => p.available === options.filters!.available);
  }

  // Apply price range filter
  if (options.filters?.priceMin !== undefined) {
    products = products.filter(
      (p) => p.priceRange.min >= (options.filters!.priceMin ?? 0)
    );
  }
  if (options.filters?.priceMax !== undefined) {
    products = products.filter(
      (p) => p.priceRange.max <= (options.filters!.priceMax ?? Infinity)
    );
  }

  // Sort
  const sort = options.sort ?? "featured";
  switch (sort) {
    case "price-asc":
      products.sort((a, b) => a.priceRange.min - b.priceRange.min);
      break;
    case "price-desc":
      products.sort((a, b) => b.priceRange.min - a.priceRange.min);
      break;
    case "newest":
      products.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      break;
    case "title-asc":
      products.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "best-selling":
      // Simulate: use review count as proxy for popularity
      products.sort(
        (a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0)
      );
      break;
    case "featured":
    default:
      // Keep default order (roughly curated)
      break;
  }

  const total = products.length;
  const offset = options.offset ?? 0;
  const limit = options.limit ?? total;
  products = products.slice(offset, offset + limit);

  return { products, total };
}

export async function getAllProductHandles(): Promise<string[]> {
  await simulateRequest(null);
  return mockProducts.map((p) => p.handle);
}

export async function getProductRecommendations(
  productId: string,
  limit: number = 4
): Promise<Product[]> {
  await simulateRequest(null);
  const product = mockProducts.find((p) => p.id === productId);
  if (!product) return mockProducts.slice(0, limit);

  // Find products with similar tags, excluding the current product
  const scored = mockProducts
    .filter((p) => p.id !== productId)
    .map((p) => ({
      product: p,
      score: p.tags.filter((t) => product.tags.includes(t)).length,
    }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.product);

  return scored.length >= limit ? scored : mockProducts.filter(p => p.id !== productId).slice(0, limit);
}

export async function getNewArrivals(
  limit: number = 8
): Promise<Product[]> {
  await simulateRequest(null);
  return [...mockProducts]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, limit);
}

export async function getBestSellers(
  limit: number = 8
): Promise<Product[]> {
  await simulateRequest(null);
  return [...mockProducts]
    .filter((p) => p.tags.includes("bestseller") || (p.reviewCount ?? 0) > 0)
    .sort((a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0))
    .slice(0, limit);
}
