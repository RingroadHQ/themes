import { atom } from "nanostores";

// UI State
export const isCartOpen = atom(false);
export const isMobileMenuOpen = atom(false);
export const isSearchOpen = atom(false);
export const activeModal = atom<string | null>(null);

// Cart Drawer
export function openCart(): void {
  isCartOpen.set(true);
  document.body.style.overflow = "hidden";
}

export function closeCart(): void {
  isCartOpen.set(false);
  document.body.style.overflow = "";
}

export function toggleCart(): void {
  isCartOpen.get() ? closeCart() : openCart();
}

// Mobile Menu
export function openMobileMenu(): void {
  isMobileMenuOpen.set(true);
  document.body.style.overflow = "hidden";
}

export function closeMobileMenu(): void {
  isMobileMenuOpen.set(false);
  document.body.style.overflow = "";
}

export function toggleMobileMenu(): void {
  isMobileMenuOpen.get() ? closeMobileMenu() : openMobileMenu();
}

// Search
export function openSearch(): void {
  isSearchOpen.set(true);
}

export function closeSearch(): void {
  isSearchOpen.set(false);
}

// Modal
export function openModal(id: string): void {
  activeModal.set(id);
}

export function closeModal(): void {
  activeModal.set(null);
}
