import { create } from 'zustand';
import type { CartItem, Product } from '@/types/product';

type CartState = {
  items: CartItem[];
  addItem: (product: Product, size: string, quantity?: number) => void;
  removeItem: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: () => number;
  total: () => number;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem(product, size, quantity = 1) {
    set((state) => {
      const existing = state.items.find(
        (i) => i.product.id === product.id && i.size === size
      );
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === product.id && i.size === size
              ? { ...i, quantity: i.quantity + quantity }
              : i
          ),
        };
      }
      return {
        items: [...state.items, { product, size, quantity }],
      };
    });
  },

  removeItem(productId, size) {
    set((state) => ({
      items: state.items.filter(
        (i) => !(i.product.id === productId && i.size === size)
      ),
    }));
  },

  updateQuantity(productId, size, quantity) {
    if (quantity <= 0) {
      get().removeItem(productId, size);
      return;
    }
    set((state) => ({
      items: state.items.map((i) =>
        i.product.id === productId && i.size === size ? { ...i, quantity } : i
      ),
    }));
  },

  clearCart: () => set({ items: [] }),

  itemCount: () => get().items.reduce((acc, i) => acc + i.quantity, 0),

  total: () =>
    get().items.reduce((acc, i) => acc + i.product.price * i.quantity, 0),
}));
