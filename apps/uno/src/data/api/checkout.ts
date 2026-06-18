import type { Address, Order, ShippingRate, CartItem } from "../types";
import { simulateRequest } from "./client";
import { generateId } from "../../utils/format";

export async function getShippingRates(
  _address: Address,
  cartItems: CartItem[]
): Promise<ShippingRate[]> {
  await simulateRequest(null);
  const subtotal = cartItems.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  return [
    {
      id: "rate-standard",
      title: "Standard Shipping",
      price: subtotal >= 75 ? 0 : 5.99,
      estimatedDays: "5-7 business days",
    },
    {
      id: "rate-express",
      title: "Express Shipping",
      price: 14.99,
      estimatedDays: "2-3 business days",
    },
    {
      id: "rate-overnight",
      title: "Overnight Shipping",
      price: 29.99,
      estimatedDays: "Next business day",
    },
  ];
}

export async function createOrder(
  cartItems: CartItem[],
  shippingAddress: Address,
  billingAddress: Address,
  shippingRate: ShippingRate
): Promise<Order> {
  await simulateRequest(null);

  const subtotal = cartItems.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );
  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const total = Math.round((subtotal + shippingRate.price + tax) * 100) / 100;

  const order: Order = {
    id: `order-${generateId()}`,
    orderNumber: `ELR-${Date.now().toString(36).toUpperCase()}`,
    items: cartItems,
    subtotal,
    shipping: shippingRate.price,
    tax,
    total,
    shippingAddress,
    billingAddress,
    status: "confirmed",
    createdAt: new Date().toISOString(),
  };

  return order;
}
