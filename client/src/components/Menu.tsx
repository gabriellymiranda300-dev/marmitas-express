/*
 * Menu — Panela Velha
 * Design: cardápio por dias da semana com imagens, bebidas e adicionais
 */
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { useState } from "react";

const DAILY_MENU = [
  {
    day: "Segunda-Feira",
    dish: "Costela Suína BBQ",
    description: "Acompanha arroz, salada e batata frita",
    price: 28.9,
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663658405775/kQVQpftc3b77nEataXztAL/prato-segunda-costela-c23AWFbSHzUb4FYwKaEh8A.webp",
  },
  {
    day: "Terça-Feira",
    dish: "Stroganoff de Frango",
    description: "Acompanha arroz, batata frita ou batata palha e salada",
    price: 24.9,
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663658405775/kQVQpftc3b77nEataXztAL/prato-terca-frango-jhzmuTzgxcSzfcUzVKGgu4.webp",
  },
  {
    day: "Quarta-Feira",
    dish: "Feijoada Completa",
    description: "Acompanha arroz, couve, farofa e laranja",
    price: 26.9,
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663658405775/kQVQpftc3b77nEataXztAL/prato-quarta-feijoada-bz6vdkkJF88zeovBHPcg8o.webp",
  },
  {
    day: "Quinta-Feira",
    dish: "Filé à Parmegiana",
    description: "Acompanha arroz, batata frita e salada",
    price: 32.9,
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663658405775/kQVQpftc3b77nEataXztAL/prato-quinta-fileparmegiana-42CCEjvA7M3MJUHbsieZb9.webp",
  },
  {
    day: "Sexta-Feira",
    dish: "Tilápia ao Camarão",
    description: "Acompanha arroz colorido e purê de batata ou mandioquinha",
    price: 34.9,
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663658405775/kQVQpftc3b77nEataXztAL/prato-sexta-tilapia-WSpWH9iG7ZmKvtctouUPro.webp",
  },
];

const BEVERAGES = [
  { id: "coca-zero", name: "Coca-Cola Zero", size: "500ml (lata)", price: 5.0 },
  { id: "coca-normal", name: "Coca-Cola Normal", size: "500ml (lata)", price: 5.0 },
  { id: "sprite", name: "Sprite Lemon Fresh", size: "500ml", price: 5.0 },
  { id: "fanta", name: "Fanta Uva", size: "500ml (lata)", price: 5.0 },
  { id: "guarana", name: "Guaraná", size: "500ml (lata)", price: 5.0 },
  { id: "suco-maracuja", name: "Suco Natural Maracujá", size: "500ml", price: 6.0 },
  { id: "suco-laranja", name: "Suco Natural Laranja", size: "500ml", price: 6.0 },
  { id: "agua-com-gas", name: "Água com Gás", size: "500ml", price: 3.0 },
  { id: "agua-sem-gas", name: "Água sem Gás", size: "500ml", price: 2.5 },
];

export default function Menu() {
  const { addItem } = useCart();
  const [expandedDay, setExpandedDay] = useState<string | null>("Segunda-Feira");

  const handleAdd = (name: string, price: number) => {
    addItem({ name, price });
    toast.success(`${name} adicionado!`, {
      description: `R$ ${price.toFixed(2).replace(".", ",")}`,
      duration: 2000,
    });
  };

  return (
    <section id="cardapio" className="bg-[#FAFAF7] py-16">
      <div className="container">
        <h2
          className="section-title text-2xl font-bold text-[#2C1810] mb-10"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Cardápio da Semana
        </h2>

        {/* Daily Menu */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {DAILY_MENU.map((item) => (
            <div
              key={item.day}
              className="product-card bg-white rounded-2xl overflow-hidden shadow-sm border border-[#EDE8E2] fade-in-up"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.dish}
                className="w-full h-64 object-cover"
                loading="lazy"
              />

              {/* Content */}
              <div className="p-5">
                <p className="text-xs font-bold text-[#E8521A] uppercase tracking-widest mb-1">
                  {item.day}
                </p>
                <h3
                  className="text-lg font-bold text-[#2C1810] mb-1"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.dish}
                </h3>
                <p className="text-sm text-[#7A6555] mb-4 leading-relaxed">
                  {item.description}
                </p>

                <div className="flex items-center justify-between">
                  <span
                    className="text-2xl font-bold text-[#E8521A]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    R$ {item.price.toFixed(2).replace(".", ",")}
                  </span>
                  <button
                    onClick={() => handleAdd(item.dish, item.price)}
                    className="flex items-center gap-2 bg-[#E8521A] hover:bg-[#C94415] active:scale-95 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all duration-150"
                  >
                    <ShoppingCart size={15} />
                    Adicionar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Beverages Section */}
        <div className="mt-12">
          <h3
            className="section-title text-xl font-bold text-[#2C1810] mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Bebidas
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BEVERAGES.map((beverage) => (
              <div
                key={beverage.id}
                className="bg-white rounded-xl border border-[#EDE8E2] p-4 flex items-center justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <p className="text-sm font-semibold text-[#2C1810]">
                    {beverage.name}
                  </p>
                  {beverage.size && (
                    <p className="text-xs text-[#7A6555] mt-0.5">
                      {beverage.size}
                    </p>
                  )}
                  <p className="text-xs text-[#E8521A] font-bold mt-1">
                    R$ {beverage.price.toFixed(2).replace(".", ",")}
                  </p>
                </div>
                <button
                  onClick={() => handleAdd(beverage.name, beverage.price)}
                  className="flex items-center gap-1 bg-[#E8521A] hover:bg-[#C94415] active:scale-95 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-all duration-150"
                >
                  <ShoppingCart size={13} />
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
