/*
 * Header — Panela Velha
 * Design: sticky, fundo creme com sombra sutil, logo Panela Velha, botão carrinho laranja
 */
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useEffect, useRef, useState } from "react";

const LOGO =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663658405775/kQVQpftc3b77nEataXztAL/logo-panela-velha-NcFZC3CNY46bK2c3BwivHm.webp";

export default function Header() {
  const { items, toggleCart } = useCart();
  const count = items.length;
  const prevCount = useRef(count);
  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    if (count > prevCount.current) {
      setBounce(true);
      const t = setTimeout(() => setBounce(false), 400);
      prevCount.current = count;
      return () => clearTimeout(t);
    }
    prevCount.current = count;
  }, [count]);

  return (
    <header className="sticky top-0 z-50 bg-[#FAFAF7]/95 backdrop-blur-sm border-b border-[#E8DDD5] shadow-sm">
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src={LOGO} alt="Panela Velha" className="h-12 w-auto" />
          <span
            className="text-lg font-bold text-[#2C1810] hidden sm:inline"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Panela Velha
          </span>
        </div>

        {/* Cart button */}
        <button
          onClick={toggleCart}
          className="relative flex items-center gap-2 bg-[#E8521A] hover:bg-[#C94415] active:scale-95 text-white px-4 py-2 rounded-full font-semibold text-sm transition-all duration-150"
          aria-label="Abrir carrinho"
        >
          <ShoppingBag size={18} />
          <span>Carrinho</span>
          {count > 0 && (
            <span
              className={`absolute -top-2 -right-2 bg-[#2C1810] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center ${bounce ? "cart-bounce" : ""}`}
            >
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
