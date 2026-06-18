import { atom, computed } from "nanostores";
import { persistentAtom } from "@nanostores/persistent";
import type { CartItem } from "../data/types";
import { CART_STORAGE_KEY, CART_ID_KEY } from "../utils/constants";
import * as cartApi from "../data/api/cart";

// Persistent atoms - survive page reloads via localStorage
export const cartId = persistentAtom<string | null>(CART_ID_KEY, null);
export const items = persistentAtom<CartItem[]>(CART_STORAGE_KEY, [], {
  encode: JSON.stringify,
  decode: (val) => {
    try {
      return JSON.parse(val);
    } catch {
      return [];
    }
  },
});

// Computed values
export const itemCount = computed(items, (list) =>
  list.reduce((sum, item) => sum + item.quantity, 0),
);

export const subtotal = computed(items, (list) =>
  list.reduce((sum, item) => sum + item.price * item.quantity, 0),
);

export const isEmpty = computed(items, (list) => list.length === 0);

// Actions
export async function addItem(
  variantId: string,
  quantity: number = 1,
  productData?: {
    productId: string;
    handle: string;
    title: string;
    variantTitle: string;
    image: CartItem["image"];
    price: number;
  },
): Promise<void> {
  const currentItems = items.get();
  const existing = currentItems.find((i) => i.variantId === variantId);

  if (existing) {
    items.set(
      currentItems.map((i) =>
        i.variantId === variantId
          ? { ...i, quantity: Math.min(i.quantity + quantity, i.maxQuantity) }
          : i,
      ),
    );
  } else if (productData) {
    const newItem: CartItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      variantId,
      productId: productData.productId,
      handle: productData.handle,
      title: productData.title,
      variantTitle: productData.variantTitle,
      image: productData.image,
      price: productData.price,
      quantity,
      maxQuantity: 10,
    };
    items.set([...currentItems, newItem]);
  }

  // Sync with server in production
  try {
    let cid = cartId.get();
    if (!cid) {
      const cart = await cartApi.createCart();
      cid = cart.id;
      cartId.set(cid);
    }
    await cartApi.addToCart(cid, variantId, quantity);
  } catch {
    // Server sync is best-effort; local state is the source of truth
  }
}

export async function updateItem(
  itemId: string,
  quantity: number,
): Promise<void> {
  if (quantity <= 0) {
    removeItem(itemId);
    return;
  }

  const currentItems = items.get();
  items.set(
    currentItems.map((i) =>
      i.id === itemId
        ? { ...i, quantity: Math.min(quantity, i.maxQuantity) }
        : i,
    ),
  );

  try {
    const cid = cartId.get();
    if (cid) await cartApi.updateCartItem(cid, itemId, quantity);
  } catch {}
}

export async function removeItem(itemId: string): Promise<void> {
  items.set(items.get().filter((i) => i.id !== itemId));

  try {
    const cid = cartId.get();
    if (cid) await cartApi.removeFromCart(cid, itemId);
  } catch {}
}

export function clearCart(): void {
  items.set([]);
}
