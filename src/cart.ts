import type { cartData } from './types';

export type CartItem = {
  product: cartData;
  quantity: number;
};

export const cart: CartItem[] = [];

export function addToCart(product: cartData): void {
  const existingItem = cart.find((item) => item.product.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ product, quantity: 1 });
  }
}
