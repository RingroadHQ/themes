import type { SearchResult } from "../types";
import { mockProducts, mockCollections } from "../mock/products";
import { simulateRequest } from "./client";

export async function search(query: string): Promise<SearchResult> {
  await simulateRequest(null);
  const q = query.toLowerCase().trim();

  if (!q) {
    return {
      products: [],
      collections: [],
      pages: [],
      totalResults: 0,
    };
  }

  const products = mockProducts.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)) ||
      p.vendor.toLowerCase().includes(q) ||
      p.type.toLowerCase().includes(q)
  );

  const collections = mockCollections.filter(
    (c) =>
      c.title.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q)
  );

  const pageTitles = [
    { title: "About Us", url: "/pages/about" },
    { title: "Contact Us", url: "/pages/contact" },
    { title: "Shipping Policy", url: "/pages/shipping-policy" },
    { title: "Returns & Exchanges", url: "/pages/returns" },
    { title: "FAQ", url: "/pages/faq" },
  ];

  const pages = pageTitles.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.url.toLowerCase().includes(q)
  );

  return {
    products,
    collections,
    pages,
    totalResults: products.length + collections.length + pages.length,
  };
}

export async function predictiveSearch(
  query: string
): Promise<Pick<SearchResult, "products">> {
  await simulateRequest(null);
  const q = query.toLowerCase().trim();

  if (!q) {
    return { products: [] };
  }

  const products = mockProducts
    .filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.type.toLowerCase().includes(q)
    )
    .slice(0, 5);

  return { products };
}
