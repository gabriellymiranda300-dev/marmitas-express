/*
 * CartContext — Panela Velha
 * Gerencia o estado global do carrinho de compras com cálculo dinâmico de frete
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
  calculateShipping: (cep: string) => number;
  total: number;
  subtotal: number;
  changeValue: number;
  setChangeValue: (v: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Estabelecimento localizado em Vila Guilherme, São Paulo - SP, CEP: 02049-015
const RESTAURANT_CEP = "02049015";
const RESTAURANT_CITY = "São Paulo";
const RESTAURANT_STATE = "SP";

// Tabela de frete baseada em CEP/região
const SHIPPING_RATES: Record<string, number> = {
  // Vila Guilherme e adjacências (02049)
  "02049": 5.0,
  // Zona Norte próxima (02000-02999)
  "020": 8.0,
  // Grande São Paulo (01000-19999)
  "01": 12.0,
  "02": 8.0,
  "03": 10.0,
  "04": 10.0,
  "05": 10.0,
  "06": 10.0,
  "07": 10.0,
  "08": 10.0,
  "09": 10.0,
  "10": 10.0,
  "11": 10.0,
  "12": 10.0,
  "13": 10.0,
  "14": 10.0,
  "15": 10.0,
  "16": 10.0,
  "17": 10.0,
  "18": 10.0,
  "19": 10.0,
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [extras, setExtras] = useState({ utensil: false, extraSalad: false });
  const [potatoSize, setPotatoSize] = useState<"P" | "M" | "G" | null>(null);
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [changeValue, setChangeValue] = useState(0);
  const [shipping, setShipping] = useState(8.0);

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
    setShipping(8.0);
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((v) => !v), []);

  // Calcula frete baseado no CEP de entrega
  const calculateShipping = useCallback((cep: string): number => {
    if (!cep) return 8.0;

    // Remove caracteres não numéricos
    const cleanCep = cep.replace(/\D/g, "");

    // Verifica se está no mesmo CEP (Vila Guilherme)
    if (cleanCep.startsWith("02049")) {
      return 5.0;
    }

    // Verifica prefixos de CEP para determinar a região
    const prefix = cleanCep.substring(0, 5);
    if (SHIPPING_RATES[prefix]) {
      return SHIPPING_RATES[prefix];
    }

    // Verifica prefixo de 4 dígitos
    const prefix4 = cleanCep.substring(0, 4);
    if (SHIPPING_RATES[prefix4]) {
      return SHIPPING_RATES[prefix4];
    }

    // Verifica prefixo de 2 dígitos (região)
    const prefix2 = cleanCep.substring(0, 2);
    if (SHIPPING_RATES[prefix2]) {
      return SHIPPING_RATES[prefix2];
    }

    // Frete padrão para regiões não mapeadas
    return 15.0;
  }, []);

  const potatoPrices: Record<"P" | "M" | "G", number> = { P: 5, M: 7, G: 10 };
  const potatoPrice = potatoSize ? potatoPrices[potatoSize] : 0;
  const extrasTotal = (extras.extraSalad ? 5 : 0) + potatoPrice;
  const subtotal = items.reduce((sum, i) => sum + i.price, 0) + extrasTotal;
  const total = Math.max(0, subtotal + shipping - discount);

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
        shipping,
        calculateShipping,
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
