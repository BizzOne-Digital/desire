"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export type CartItem = {
  id: string;
  title: string;
  slug: string;
  price: number;
  image: string;
  quantity: number;
  variant?: string;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
  count: number;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const storageKey = "only_collection_cart";

function itemKey(item: Pick<CartItem, "id" | "variant">) {
  return `${item.id}:${item.variant ?? "default"}`;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey);
    if (stored) {
      setItems(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartContextValue>(() => {
    const addItem: CartContextValue["addItem"] = (item, quantity = 1) => {
      setItems((current) => {
        const key = itemKey(item);
        const existing = current.find((cartItem) => itemKey(cartItem) === key);
        if (existing) {
          return current.map((cartItem) =>
            itemKey(cartItem) === key
              ? { ...cartItem, quantity: cartItem.quantity + quantity }
              : cartItem
          );
        }
        return [...current, { ...item, quantity }];
      });
      toast.success(`${item.title} added to cart`);
    };

    const removeItem: CartContextValue["removeItem"] = (key) => {
      setItems((current) => current.filter((item) => itemKey(item) !== key));
    };

    const updateQuantity: CartContextValue["updateQuantity"] = (key, quantity) => {
      if (quantity <= 0) {
        removeItem(key);
        return;
      }
      setItems((current) =>
        current.map((item) => (itemKey(item) === key ? { ...item, quantity } : item))
      );
    };

    const clearCart = () => setItems([]);
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return { items, addItem, removeItem, updateQuantity, clearCart, count, subtotal };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}

export { itemKey };
