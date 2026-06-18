import type { Cart, CartItem } from "../types";
import { mockProducts } from "../mock/products";
import { simulateRequest } from "./client";
import { generateId } from "../../utils/format";

// In-memory cart store (in production, this would be a server-side session)
// The nanostores cart atom is the client-side mirror of this data
const serverCarts = new Map<string, Cart>();

export async function createCart(): Promise<Cart> {
  await simulateRequest(null);
  const cart: Cart = {
    id: `cart-${generateId()}`,
    items: [],
    itemCount: 0,
    subtotal: 0,
    currency: "USD",
  };
  serverCarts.set(cart.id, cart);
  return cart;
}

export async function getCart(cartId: string): Promise<Cart | null> {
  await simulateRequest(null);
  return serverCarts.get(cartId) ?? null;
}

export async function addToCart(
  cartId: string,
  variantId: string,
  quantity: number = 1
): Promise<Cart> {
  await simulateRequest(null);
  let cart = serverCarts.get(cartId);
  if (!cart) {
    cart = await createCart();
  }

  // Find the product and variant
  const product = mockProducts.find((p) =>
    p.variants.some((v) => v.id === variantId)
  );
  if (!product) throw new Error("Product not found");

  const variant = product.variants.find((v) => v.id === variantId);
  if (!variant) throw new Error("Variant not found");

  const existingItem = cart.items.find((i) => i.variantId === variantId);
  if (existingItem) {
    existingItem.quantity = Math.min(
      existingItem.quantity + quantity,
      existingItem.maxQuantity
    );
  } else {
    const newItem: CartItem = {
      id: `item-${generateId()}`,
      variantId: variant.id,
      productId: product.id,
      handle: product.handle,
      title: product.title,
      variantTitle: variant.title,
      image: product.images[0],
      price: variant.price,
      quantity,
      maxQuantity: 10,
    };
    cart.items.push(newItem);
  }

  recalcCart(cart);
  serverCarts.set(cartId, cart);
  return { ...cart, items: [...cart.items] };
}

export async function updateCartItem(
  cartId: string,
  itemId: string,
  quantity: number
): Promise<Cart> {
  await simulateRequest(null);
  const cart = serverCarts.get(cartId);
  if (!cart) throw new Error("Cart not found");

  if (quantity <= 0) {
    cart.items = cart.items.filter((i) => i.id !== itemId);
  } else {
    const item = cart.items.find((i) => i.id === itemId);
    if (item) {
      item.quantity = Math.min(quantity, item.maxQuantity);
    }
  }

  recalcCart(cart);
  serverCarts.set(cartId, cart);
  return { ...cart, items: [...cart.items] };
}

export async function removeFromCart(
  cartId: string,
  itemId: string
): Promise<Cart> {
  await simulateRequest(null);
  const cart = serverCarts.get(cartId);
  if (!cart) throw new Error("Cart not found");

  cart.items = cart.items.filter((i) => i.id !== itemId);
  recalcCart(cart);
  serverCarts.set(cartId, cart);
  return { ...cart, items: [...cart.items] };
}

function recalcCart(cart: Cart): void {
  cart.itemCount = cart.items.reduce((sum, i) => sum + i.quantity, 0);
  cart.subtotal = cart.items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );
}
