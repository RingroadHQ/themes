import { SIMULATED_LATENCY_MS } from "../../utils/constants";

/**
 * Simulated API fetch wrapper.
 * In production, this would make real HTTP calls to the Ringroad API.
 * For the template, it routes to the appropriate mock handler.
 */
export async function apiFetch<T>(
  _path: string,
  _options?: RequestInit
): Promise<T> {
  // Simulate network latency in development
  if (import.meta.env.DEV) {
    await new Promise((r) => setTimeout(r, SIMULATED_LATENCY_MS));
  }
  // In production: const res = await fetch(path, options); return res.json();
  throw new Error("apiFetch should not be called directly. Use service modules.");
}

/**
 * Simulate an API call with a delay, returning the provided data.
 * Used by mock service modules to simulate network requests.
 */
export async function simulateRequest<T>(data: T): Promise<T> {
  if (import.meta.env.DEV) {
    await new Promise((r) => setTimeout(r, SIMULATED_LATENCY_MS));
  }
  return data;
}
