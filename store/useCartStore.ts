import { Product } from "@/types/Product";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type ProductInCart = Product & { quantity: number };

type CartState = {
  cart: ProductInCart[];
  addToCart: (item: ProductInCart) => void;
  udateQuantity: (id: string, quantity: number) => void;
  updateCart: (cart: ProductInCart[]) => void;
  removeFromCart: (id: string) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      addToCart: (item: ProductInCart) =>
        set((state) => {
          const exists = state.cart.find((i) => i.id === item.id);
          if (exists) {
            return {
              cart: state.cart.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + item.quantity } // Sumar la cantidad actual al producto existente
                  : i
              ),
            };
          }
          return { cart: [...state.cart, { ...item }] }; // Agregar nuevo producto con la cantidad pasada
        }),
      udateQuantity: (id: string, delta: number) => {
        set((state) => ({
          cart: state.cart.map((i) =>
            i.id === id
              ? {
                  ...i,
                  quantity: i.quantity + delta > 0 ? i.quantity + delta : 1,
                }
              : i
          ),
        }));
      },
      updateCart: (cart: ProductInCart[]) => set({ cart }),
      removeFromCart: (id: string) =>
        set((state) => ({
          cart: state.cart.filter((i) => i.id !== id),
        })),
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({
        cart: state.cart, // Solo persistimos `cart`
      }),
      merge: (persistedState, currentState) => ({
        ...currentState,
        cart: (persistedState as Partial<CartState>).cart || [],
      }),
    }
  )
);
