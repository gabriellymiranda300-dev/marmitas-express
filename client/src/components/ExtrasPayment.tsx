/*
 * ExtrasPayment — Panela Velha
 * Design: fundo cinza-quente, checkboxes customizados, batata frita P/M/G
 */
import { useCart } from "@/contexts/CartContext";
import { CreditCard, Utensils, Zap } from "lucide-react";
import { useState } from "react";

interface ExtrasPaymentProps {
  paymentMethod: string;
  onPaymentChange: (v: string) => void;
}

interface PotatoSize {
  size: "P" | "M" | "G";
  price: number;
}

export default function ExtrasPayment({ paymentMethod, onPaymentChange }: ExtrasPaymentProps) {
  const { extras, setExtras } = useCart();
  const [potatoSize, setPotatoSize] = useState<"P" | "M" | "G" | null>(null);

  const toggleExtra = (key: "utensil" | "extraSalad") => {
    setExtras({ ...extras, [key]: !extras[key] });
  };

  const potatoOptions: PotatoSize[] = [
    { size: "P", price: 5.0 },
    { size: "M", price: 7.0 },
    { size: "G", price: 10.0 },
  ];

  const paymentOptions = ["Pix", "Cartão de Crédito", "Cartão de Débito", "Dinheiro", "Pagar na Entrega"];

  return (
    <section className="bg-[#F0EDE8] py-14">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Adicionais */}
          <div>
            <h2
              className="section-title text-2xl font-bold text-[#2C1810] mb-8"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Adicionais
            </h2>
            <div className="flex flex-col gap-4">
              {/* Talher */}
              <label
                className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-150 ${
                  extras.utensil
                    ? "border-[#E8521A] bg-[#FFF4EF]"
                    : "border-[#DDD5CC] bg-white hover:border-[#E8521A]/40"
                }`}
              >
                <input
                  type="checkbox"
                  checked={extras.utensil}
                  onChange={() => toggleExtra("utensil")}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                    extras.utensil ? "bg-[#E8521A] border-[#E8521A]" : "border-[#B0A090]"
                  }`}
                >
                  {extras.utensil && (
                    <svg viewBox="0 0 10 8" fill="none" className="w-3 h-3">
                      <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <Utensils size={18} className={extras.utensil ? "text-[#E8521A]" : "text-[#7A6555]"} />
                <span className="text-sm font-medium text-[#2C1810] flex-1">Talher descartável</span>
                <span className="text-xs text-[#7A6555]">Sem cobrança</span>
              </label>

              {/* Batata Frita */}
              <div className="border-t border-[#DDD5CC] pt-4">
                <p className="text-sm font-semibold text-[#2C1810] mb-3 flex items-center gap-2">
                  <Zap size={16} className="text-[#E8521A]" />
                  Batata Frita
                </p>
                <div className="flex gap-3">
                  {potatoOptions.map(({ size, price }) => (
                    <button
                      key={size}
                      onClick={() => setPotatoSize(potatoSize === size ? null : size)}
                      className={`flex-1 py-3 px-4 rounded-lg border-2 font-semibold text-sm transition-all duration-150 ${
                        potatoSize === size
                          ? "border-[#E8521A] bg-[#FFF4EF] text-[#E8521A]"
                          : "border-[#DDD5CC] bg-white text-[#2C1810] hover:border-[#E8521A]/40"
                      }`}
                    >
                      <div>{size}</div>
                      <div className="text-xs mt-1">R$ {price.toFixed(2).replace(".", ",")}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Pagamento */}
          <div>
            <h2
              className="section-title text-2xl font-bold text-[#2C1810] mb-8"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Forma de Pagamento
            </h2>
            <div className="flex flex-col gap-3">
              {paymentOptions.map((option) => (
                <label
                  key={option}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-150 ${
                    paymentMethod === option
                      ? "border-[#E8521A] bg-[#FFF4EF]"
                      : "border-[#DDD5CC] bg-white hover:border-[#E8521A]/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={option}
                    checked={paymentMethod === option}
                    onChange={() => onPaymentChange(option)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      paymentMethod === option ? "border-[#E8521A]" : "border-[#B0A090]"
                    }`}
                  >
                    {paymentMethod === option && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#E8521A]" />
                    )}
                  </div>
                  <CreditCard size={16} className={paymentMethod === option ? "text-[#E8521A]" : "text-[#7A6555]"} />
                  <span className="text-sm font-medium text-[#2C1810]">{option}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
