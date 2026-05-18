/*
 * Menu — Panela Velha
 * Integração com API do painel administrativo
 */
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { useState, useEffect } from "react";

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

  const [menuItems, setMenuItems] = useState<any[]>([]);

  useEffect(() => {
    carregarCardapio();
  }, []);

  async function carregarCardapio() {
    try {
      const response = await fetch(
        "https://panelavelha-2cnz98kw.manus.space/api/integration/menu"
      );

      const data = await response.json();

      if (data.success) {
        const items = data.data.flatMap(
          (category: any) => category.items
        );

        setMenuItems(items);
      }
    } catch (error) {
      console.error("Erro ao carregar cardápio:", error);
    }
  }

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

        {/* Menu vindo da API */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="product-card bg-white rounded-2xl overflow-hidden shadow-sm border border-[#EDE8E2] fade-in-up"
            >
              <img
                src={
                  item.image ||
                  "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1200&auto=format&fit=crop"
                }
                alt={item.name}
                className="w-full h-64 object-cover"
                loading="lazy"
              />

              <div className="p-5">
                <p className="text-xs font-bold text-[#E8521A] uppercase tracking-widest mb-1">
                  Marmita do Dia
                </p>

                <h3
                  className="text-lg font-bold text-[#2C1810] mb-1"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.name}
                </h3>

                <p className="text-sm text-[#7A6555] mb-4 leading-relaxed">
                  {item.description}
                </p>

                <div className="flex items-center justify-between">
                  <span
                    className="text-2xl font-bold text-[#E8521A]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    R$ {Number(item.price).toFixed(2).replace(".", ",")}
                  </span>

                  <button
                    onClick={() =>
                      handleAdd(item.name, Number(item.price))
                    }
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

        {/* Bebidas */}
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
                  onClick={() =>
                    handleAdd(beverage.name, beverage.price)
                  }
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
