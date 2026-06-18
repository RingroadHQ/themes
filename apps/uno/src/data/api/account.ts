import type {
  Customer,
  LoginData,
  RegisterData,
  Order,
} from "../types";
import { simulateRequest } from "./client";
import { generateId } from "../../utils/format";

// In-memory store for mock accounts
const accounts = new Map<string, { customer: Customer; password: string }>();
const tokens = new Map<string, string>(); // token -> customerId

export async function login(
  data: LoginData
): Promise<{ customer: Customer; token: string } | { error: string }> {
  await simulateRequest(null);

  const entry = accounts.get(data.email);
  if (!entry || entry.password !== data.password) {
    return { error: "Invalid email or password." };
  }

  const token = `token-${generateId()}`;
  tokens.set(token, entry.customer.id);

  return { customer: entry.customer, token };
}

export async function register(
  data: RegisterData
): Promise<{ customer: Customer; token: string } | { error: string }> {
  await simulateRequest(null);

  if (accounts.has(data.email)) {
    return { error: "An account with this email already exists." };
  }

  const customer: Customer = {
    id: `cust-${generateId()}`,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: "",
    defaultAddress: null,
    addresses: [],
    orders: [],
  };

  accounts.set(data.email, { customer, password: data.password });
  const token = `token-${generateId()}`;
  tokens.set(token, customer.id);

  return { customer, token };
}

export async function getCustomer(token: string): Promise<Customer | null> {
  await simulateRequest(null);
  const customerId = tokens.get(token);
  if (!customerId) return null;

  for (const entry of accounts.values()) {
    if (entry.customer.id === customerId) {
      return entry.customer;
    }
  }
  return null;
}

export async function getCustomerOrders(
  _token: string
): Promise<Order[]> {
  await simulateRequest(null);
  // Return empty orders for now — mock orders would be created at checkout
  return [];
}
