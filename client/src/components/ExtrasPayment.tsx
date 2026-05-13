/*
 * ExtrasPayment — Marmitas Express
 * Design: fundo cinza-quente, checkboxes customizados, select estilizado
 */
import { useCart } from "@/contexts/CartContext";
import { CreditCard, Utensils, Salad } from "lucide-react";

interface ExtrasPaymentProps {
  paymentMethod: string;
  onPaymentChange: (v: string) => void;
}

export default function ExtrasPayment({ paymentMethod, onPaymentChange }: ExtrasPaymentProps) {
  const { extras, setExtras } = useCart();

  const toggleExtra = (key: "utensil" | "extraSalad") => {
    setExtras({ ...extras, [key]: !extras[key] });
  };

  const extraOptions = [
    { key: "utensil" as const, label: "Talher descartável", price: 2, icon: Utensils },
    { key: "extraSalad" as const, label: "Salada Extra", price: 5, icon: Salad },
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
            <div className="flex flex-col gap-3">
              {extraOptions.map(({ key, label, price, icon: Icon }) => (
                <label
                  key={key}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-150 ${
                    extras[key]
                      ? "border-[#E8521A] bg-[#FFF4EF]"
                      : "border-[#DDD5CC] bg-white hover:border-[#E8521A]/40"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={extras[key]}
                    onChange={() => toggleExtra(key)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      extras[key] ? "bg-[#E8521A] border-[#E8521A]" : "border-[#B0A090]"
                    }`}
                  >
                    {extras[key] && (
                      <svg viewBox="0 0 10 8" fill="none" className="w-3 h-3">
                        <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <Icon size={18} className={extras[key] ? "text-[#E8521A]" : "text-[#7A6555]"} />
                  <span className="text-sm font-medium text-[#2C1810] flex-1">{label}</span>
                  <span className="text-sm font-bold text-[#E8521A]">+ R$ {price.toFixed(2).replace(".", ",")}</span>
                </label>
              ))}
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
