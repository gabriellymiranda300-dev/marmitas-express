/*
 * CartContext — Panela Velha
 * Gerencia o estado global do carrinho de compras com cálculo de frete por cidade
 */
import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  menuItemId?: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  extras: { utensil: boolean; extraSalad: boolean };
  setExtras: (extras: { utensil: boolean; extraSalad: boolean }) => void;
  potatoSize: "P" | "M" | "G" | null;
  setPotatoSize: (size: "P" | "M" | "G" | null) => void;
  discount: number;
  setDiscount: (d: number) => void;
  couponCode: string;
  setCouponCode: (c: string) => void;
  shipping: number;
  calculateShipping: (city: string, state: string) => number;
  total: number;
  subtotal: number;
  changeValue: number;
  setChangeValue: (v: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const SHIPPING_BY_CITY: Record<string, number> = {
  "São Paulo/SP": 5.0, "Sao Paulo/SP": 5.0, "Guarulhos/SP": 8.0, "Osasco/SP": 8.0,
  "Santo André/SP": 8.0, "São Bernardo do Campo/SP": 8.0, "São Caetano do Sul/SP": 8.0
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [extras, setExtras] = useState({ utensil: false, extraSalad: false });
  const [potatoSize, setPotatoSize] = useState<"P" | "M" | "G" | null>(null);
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [changeValue, setChangeValue] = useState(0);
  const [shipping, setShipping] = useState(5.0);

  const addItem = useCallback((item: Omit<CartItem, "id">) => {
    const id = `${item.name}-${Date.now()}`;
    setItems((prev) => [...prev, { ...item, id }]);
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id: string) => setItems((prev) => prev.filter((i) => i.id !== id)), []);
  const clearCart = useCallback(() => {
    setItems([]); setDiscount(0); setCouponCode(""); setExtras({ utensil: false, extraSalad: false });
    setPotatoSize(null); setShipping(5.0);
  }, []);

  const calculateShipping = useCallback((city: string, state: string): number => {
    const key = `${city.trim()}/${state.trim().toUpperCase()}`;
    const rate = SHIPPING_BY_CITY[key] || (state.trim().toUpperCase() === "SP" ? 10.0 : 25.0);
    setShipping(rate);
    return rate;
  }, []);

  const potatoPrices = { P: 5, M: 7, G: 10 };
  const subtotal = items.reduce((sum, i) => sum + i.price, 0) + (extras.extraSalad ? 5 : 0) + (potatoSize ? potatoPrices[potatoSize] : 0);
  const total = Math.max(0, subtotal + shipping - discount);

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, clearCart, isOpen, openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false), toggleCart: () => setIsOpen(!isOpen),
      extras, setExtras, potatoSize, setPotatoSize, discount, setDiscount,
      couponCode, setCouponCode, shipping, calculateShipping, total, subtotal,
      changeValue, setChangeValue
    }}>{children}</CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};

