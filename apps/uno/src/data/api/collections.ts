import type { Collection } from "../types";
import { mockCollections } from "../mock/products";
import { simulateRequest } from "./client";

export async function getCollection(
  handle: string
): Promise<Collection | null> {
  await simulateRequest(null);
  return mockCollections.find((c) => c.handle === handle) ?? null;
}

export async function getCollections(): Promise<Collection[]> {
  await simulateRequest(null);
  return mockCollections;
}

export async function getAllCollectionHandles(): Promise<string[]> {
  await simulateRequest(null);
  return mockCollections.map((c) => c.handle);
}
