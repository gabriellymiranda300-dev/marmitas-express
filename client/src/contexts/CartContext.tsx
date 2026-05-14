/*
 * CartContext — Panela Velha
 * Gerencia o estado global do carrinho de compras
 */
import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
}

export interface CustomerAddress {
  rua: string;
  numero: string;
  complemento: string;
  cep: string;
  cidade: string;
  estado: string;
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
  total: number;
  subtotal: number;
  changeValue: number;
  setChangeValue: (v: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const SHIPPING = 8;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [extras, setExtras] = useState({ utensil: false, extraSalad: false });
  const [potatoSize, setPotatoSize] = useState<"P" | "M" | "G" | null>(null);
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [changeValue, setChangeValue] = useState(0);

  const addItem = useCallback((item: Omit<CartItem, "id">) => {
    const id = `${item.name}-${Date.now()}-${Math.random()}`;
    setItems((prev) => [...prev, { ...item, id }]);
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setDiscount(0);
    setCouponCode("");
    setExtras({ utensil: false, extraSalad: false });
    setPotatoSize(null);
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((v) => !v), []);

  const potatoPrices: Record<"P" | "M" | "G", number> = { P: 5, M: 7, G: 10 };
  const potatoPrice = potatoSize ? potatoPrices[potatoSize] : 0;
  const extrasTotal = (extras.extraSalad ? 5 : 0) + potatoPrice;
  const subtotal = items.reduce((sum, i) => sum + i.price, 0) + extrasTotal;
  const total = Math.max(0, subtotal + SHIPPING - discount);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearCart,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        extras,
        setExtras,
        potatoSize,
        setPotatoSize,
        discount,
        setDiscount,
        couponCode,
        setCouponCode,
        shipping: SHIPPING,
        total,
        subtotal,
        changeValue,
        setChangeValue,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
