import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartLine = {
  id: string;
  kind: "cut" | "merch";
  slug: string;
  name: string;
  variant: string;
  price: number;
  qty: number;
  image: string;
};

type CartState = {
  lines: CartLine[];
  open: boolean;
  setOpen: (open: boolean) => void;
  add: (line: Omit<CartLine, "qty">, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      open: false,
      setOpen: (open) => set({ open }),
      add: (line, qty = 1) => {
        const existing = get().lines.find((item) => item.id === line.id);
        if (existing) {
          set({
            lines: get().lines.map((item) =>
              item.id === line.id ? { ...item, qty: item.qty + qty } : item,
            ),
            open: true,
          });
          return;
        }
        set({ lines: [...get().lines, { ...line, qty }], open: true });
      },
      setQty: (id, qty) => {
        if (qty < 1) {
          set({ lines: get().lines.filter((item) => item.id !== id) });
          return;
        }
        set({
          lines: get().lines.map((item) => (item.id === id ? { ...item, qty } : item)),
        });
      },
      remove: (id) => set({ lines: get().lines.filter((item) => item.id !== id) }),
      clear: () => set({ lines: [] }),
    }),
    {
      name: "rope-cart",
      partialize: (state) => ({ lines: state.lines }),
    },
  ),
);

export function cartCount(lines: CartLine[]) {
  return lines.reduce((n, line) => n + line.qty, 0);
}

export function cartSubtotal(lines: CartLine[]) {
  return lines.reduce((n, line) => n + line.price * line.qty, 0);
}

export function hasCannabis(lines: CartLine[]) {
  return lines.some((line) => line.kind === "cut");
}

export const TAX_RATE = 0.1025;
export const SHIP_FLAT = 1400;
export const SHIP_FREE_AT = 20000;

export function cartShipping(lines: CartLine[]) {
  if (lines.length === 0) return 0;
  const sub = cartSubtotal(lines);
  if (sub >= SHIP_FREE_AT) return 0;
  return SHIP_FLAT;
}

export function cartTax(lines: CartLine[]) {
  return Math.round(cartSubtotal(lines) * TAX_RATE);
}

export function cartTotal(lines: CartLine[]) {
  return cartSubtotal(lines) + cartShipping(lines) + cartTax(lines);
}
