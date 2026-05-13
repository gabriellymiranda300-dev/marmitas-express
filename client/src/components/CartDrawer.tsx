/*
 * CartDrawer — Marmitas Express
 * Design: painel lateral deslizante da direita, overlay escuro, resumo do pedido
 */
import { X, Trash2, Tag, ShoppingBag, MessageCircle } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import { toast } from "sonner";

interface CartDrawerProps {
  customerData: { nome: string; telefone: string; endereco: string };
  paymentMethod: string;
}

export default function CartDrawer({ customerData, paymentMethod }: CartDrawerProps) {
  const {
    items,
    removeItem,
    isOpen,
    closeCart,
    extras,
    discount,
    setDiscount,
    couponCode,
    setCouponCode,
    shipping,
    total,
    subtotal,
  } = useCart();

  const [couponInput, setCouponInput] = useState("");

  const applyCoupon = () => {
    if (couponInput.trim().toUpperCase() === "DESCONTO10") {
      setDiscount(10);
      setCouponCode(couponInput.trim().toUpperCase());
      toast.success("Cupom aplicado! R$ 10,00 de desconto.");
    } else {
      toast.error("Cupom inválido. Tente DESCONTO10.");
    }
  };

  const finishOrder = () => {
    if (!customerData.nome || !customerData.telefone) {
      toast.error("Preencha seu nome e telefone antes de finalizar.");
      closeCart();
      document.getElementById("dados")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (items.length === 0) {
      toast.error("Adicione pelo menos um item ao carrinho.");
      return;
    }

    const extrasList = [];
    if (extras.utensil) extrasList.push("• Talher - R$ 2,00");
    if (extras.extraSalad) extrasList.push("• Salada Extra - R$ 5,00");

    const itensList = items.map((i) => `• ${i.name} - R$ ${i.price.toFixed(2)}`).join("\n");

    const mensagem = `🍱 NOVO PEDIDO

👤 Cliente: ${customerData.nome}
📞 Telefone: ${customerData.telefone}
📍 Endereço: ${customerData.endereco || "Retirada no local"}

🛒 Itens:
${itensList}${extrasList.length ? "\n\n➕ Adicionais:\n" + extrasList.join("\n") : ""}

💳 Pagamento: ${paymentMethod}
🚚 Frete: R$ ${shipping.toFixed(2)}${discount > 0 ? `\n🏷️ Desconto: - R$ ${discount.toFixed(2)}` : ""}

💰 Total: R$ ${total.toFixed(2)}

⏰ Prazo estimado: 40 minutos`;

    const numero = "5511999999999";
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank");
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50 overlay-in"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col drawer-open">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#EDE8E2]">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-[#E8521A]" />
            <h2
              className="text-lg font-bold text-[#2C1810]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Seu Pedido
            </h2>
            {items.length > 0 && (
              <span className="bg-[#E8521A] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {items.length}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="text-[#7A6555] hover:text-[#2C1810] p-1 rounded-lg hover:bg-[#F0EDE8] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
              <ShoppingBag size={48} className="text-[#DDD5CC]" />
              <p className="text-[#B0A090] font-medium">Seu carrinho está vazio</p>
              <p className="text-sm text-[#B0A090]">Adicione itens do cardápio</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-[#FAFAF7] rounded-xl px-4 py-3 border border-[#EDE8E2]"
                >
                  <div>
                    <p className="text-sm font-semibold text-[#2C1810]">{item.name}</p>
                    <p className="text-xs text-[#E8521A] font-bold mt-0.5">
                      R$ {item.price.toFixed(2).replace(".", ",")}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}

              {/* Extras summary */}
              {(extras.utensil || extras.extraSalad) && (
                <div className="border-t border-[#EDE8E2] pt-3 mt-1">
                  <p className="text-xs font-semibold text-[#7A6555] mb-2 uppercase tracking-wide">Adicionais</p>
                  {extras.utensil && (
                    <div className="flex justify-between text-sm text-[#2C1810]">
                      <span>Talher</span>
                      <span className="font-semibold">+ R$ 2,00</span>
                    </div>
                  )}
                  {extras.extraSalad && (
                    <div className="flex justify-between text-sm text-[#2C1810]">
                      <span>Salada Extra</span>
                      <span className="font-semibold">+ R$ 5,00</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#EDE8E2] px-5 py-4 flex flex-col gap-4">
            {/* Coupon */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B0A090]" />
                <input
                  type="text"
                  placeholder="Cupom de desconto"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
                  className="w-full pl-9 pr-3 py-2.5 text-sm border border-[#DDD5CC] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E8521A]/40 focus:border-[#E8521A] bg-[#FAFAF7]"
                />
              </div>
              <button
                onClick={applyCoupon}
                className="bg-[#2C1810] hover:bg-[#3D2218] active:scale-95 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all duration-150"
              >
                Aplicar
              </button>
            </div>

            {/* Summary */}
            <div className="flex flex-col gap-1.5 text-sm">
              <div className="flex justify-between text-[#7A6555]">
                <span>Subtotal</span>
                <span>R$ {subtotal.toFixed(2).replace(".", ",")}</span>
              </div>
              <div className="flex justify-between text-[#7A6555]">
                <span>Frete</span>
                <span>R$ {shipping.toFixed(2).replace(".", ",")}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600 font-medium">
                  <span>Desconto ({couponCode})</span>
                  <span>- R$ {discount.toFixed(2).replace(".", ",")}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-[#2C1810] text-base border-t border-[#EDE8E2] pt-2 mt-1">
                <span style={{ fontFamily: "var(--font-display)" }}>Total</span>
                <span className="text-[#E8521A]" style={{ fontFamily: "var(--font-display)" }}>
                  R$ {total.toFixed(2).replace(".", ",")}
                </span>
              </div>
            </div>

            {/* Finish button */}
            <button
              onClick={finishOrder}
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5a] active:scale-95 text-white font-bold py-3.5 rounded-xl transition-all duration-150 shadow-md shadow-green-900/20"
            >
              <MessageCircle size={18} />
              Finalizar via WhatsApp
            </button>
          </div>
        )}
      </div>
    </>
  );
}
