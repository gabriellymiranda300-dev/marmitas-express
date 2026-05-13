/*
 * Menu — Marmitas Express
 * Design: fundo creme, cards brancos com sombra, hover elevation, imagens geradas
 */
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

const PRODUCTS = [
  {
    id: "executiva",
    name: "Marmita Executiva",
    description: "Arroz, feijão, filé de frango grelhado e salada fresca.",
    price: 24.9,
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663658405775/kQVQpftc3b77nEataXztAL/marmita-executiva-RpJjix7Kn9jRDmySSZdiK6.webp",
    badge: "Mais Pedido",
  },
  {
    id: "premium",
    name: "Marmita Premium",
    description: "Contra filé, arroz, feijão tropeiro e batata assada.",
    price: 34.9,
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663658405775/kQVQpftc3b77nEataXztAL/marmita-premium-KvKfZNaxBJpuBCvEdq8rZ5.webp",
    badge: "Premium",
  },
  {
    id: "refri",
    name: "Combo Refrigerante",
    description: "Lata 350ml gelada para acompanhar sua refeição.",
    price: 6.0,
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663658405775/kQVQpftc3b77nEataXztAL/refrigerante-lata-ccK9ZT5mdspzTfBZ9vkpP4.webp",
    badge: null,
  },
];

export default function Menu() {
  const { addItem } = useCart();

  const handleAdd = (product: (typeof PRODUCTS)[0]) => {
    addItem({ name: product.name, price: product.price });
    toast.success(`${product.name} adicionado!`, {
      description: `R$ ${product.price.toFixed(2).replace(".", ",")}`,
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product, i) => (
            <div
              key={product.id}
              className={`product-card bg-white rounded-2xl overflow-hidden shadow-sm border border-[#EDE8E2] fade-in-up stagger-${i + 1}`}
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-52 object-cover"
                  loading="lazy"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-[#E8521A] text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <h3
                  className="text-lg font-bold text-[#2C1810] mb-1"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {product.name}
                </h3>
                <p className="text-sm text-[#7A6555] mb-4 leading-relaxed">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-[#E8521A]" style={{ fontFamily: "var(--font-display)" }}>
                    R$ {product.price.toFixed(2).replace(".", ",")}
                  </span>
                  <button
                    onClick={() => handleAdd(product)}
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
      </div>
    </section>
  );
}
