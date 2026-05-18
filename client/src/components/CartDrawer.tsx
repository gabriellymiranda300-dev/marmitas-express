/*
 * CartDrawer — Panela Velha
 * Design: painel lateral deslizante, dados do cliente, pagamento cartão/PIX, aba de confirmação
 */
import { X, Trash2, Tag, ShoppingBag, MessageCircle, User, Phone, MapPin } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import { toast } from "sonner";
import { sendOrderToAPI, sendOrderViaWhatsApp, type OrderData } from "@/lib/api";

interface CartDrawerProps {
  customerData: {
    nome: string;
    telefone: string;
    rua: string;
    numero: string;
    complemento: string;
    cep: string;
    cidade: string;
    estado: string;
  };
  onCustomerChange: (field: string, value: string | number) => void;
  paymentMethod: string;
}

type DrawerTab = "dados" | "cart" | "payment" | "confirmation";

export default function CartDrawer({ customerData, onCustomerChange, paymentMethod }: CartDrawerProps) {
  const {
    items,
    removeItem,
    isOpen,
    closeCart,
    extras,
    potatoSize,
    discount,
    setDiscount,
    couponCode,
    setCouponCode,
    shipping,
    total,
    subtotal,
    clearCart,
    changeValue,
    calculateShipping,
  } = useCart();

  const [tab, setTab] = useState<DrawerTab>("dados");
  const [couponInput, setCouponInput] = useState("");

  const applyCoupon = () => {
    if (couponInput.trim().toUpperCase() === "DESCONTO10") {
      setDiscount(10);
      setCouponCode(couponInput.trim().toUpperCase());
      toast.success("Cupom aplicado! R$ 10,00 de desconto.");
    } else {
      toast.error("Cupom inválido.");
    }
  };

  const finishOrder = async () => {
    if (!customerData.nome || !customerData.telefone) {
      toast.error("Preencha seu nome e telefone.");
      return;
    }

    const orderData: OrderData = {
      clientName: customerData.nome,
      clientPhone: customerData.telefone,
      clientAddress: {
        rua: customerData.rua,
        numero: customerData.numero,
        complemento: customerData.complemento,
        cep: customerData.cep,
        cidade: customerData.cidade,
        estado: customerData.estado,
      },
      items: items.map((item) => ({
        menuItemId: item.menuItemId,
        name: item.name,
        price: item.price,
        quantity: 1,
      })),
      extras: {
        utensil: extras.utensil,
        extraSalad: extras.extraSalad,
        potatoSize: potatoSize || undefined,
      },
      paymentMethod,
      changeValue: paymentMethod === "Dinheiro" ? changeValue : undefined,
      discount,
      shipping,
      subtotal,
      total,
    };

    const success = await sendOrderToAPI(orderData);
    
    // Independente do sucesso da API, abre o WhatsApp como garantia
    setTimeout(() => {
      sendOrderViaWhatsApp(orderData);
    }, 500);

    clearCart();
    closeCart();
    setTab("dados");
  };

  if (!isOpen) return null;

  const buildAddressString = () => [
    customerData.rua, customerData.numero, customerData.complemento, 
    customerData.cep, customerData.cidade, customerData.estado
  ].filter(Boolean).join(", ");

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50 overlay-in" onClick={closeCart} />
      <div className="fixed right-0 top-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col drawer-open">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#EDE8E2]">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-[#E8521A]" />
            <h2 className="text-lg font-bold text-[#2C1810]" style={{ fontFamily: "var(--font-display)" }}>Seu Pedido</h2>
            {items.length > 0 && <span className="bg-[#E8521A] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">{items.length}</span>}
          </div>
          <button onClick={closeCart} className="text-[#7A6555] p-1 rounded-lg hover:bg-[#F0EDE8]"><X size={20} /></button>
        </div>

        <div className="flex border-b border-[#EDE8E2]">
          {(["dados", "cart", "payment", "confirmation"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`flex-1 py-2 text-[10px] font-bold uppercase ${tab === t ? "text-[#E8521A] border-b-2 border-[#E8521A]" : "text-[#7A6555]"}`}>
              {t === "dados" ? "Dados" : t === "cart" ? "Itens" : t === "payment" ? "Paga" : "Fim"}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {tab === "dados" && (
            <div className="flex flex-col gap-4">
              <input type="text" placeholder="Nome" value={customerData.nome} onChange={(e) => onCustomerChange("nome", e.target.value)} className="w-full px-3 py-2 border rounded-xl" />
              <input type="tel" placeholder="WhatsApp" value={customerData.telefone} onChange={(e) => onCustomerChange("telefone", e.target.value)} className="w-full px-3 py-2 border rounded-xl" />
              <div className="border-t pt-4 space-y-3">
                <input type="text" placeholder="Rua" value={customerData.rua} onChange={(e) => onCustomerChange("rua", e.target.value)} className="w-full px-3 py-2 border rounded-xl" />
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder="Nº" value={customerData.numero} onChange={(e) => onCustomerChange("numero", e.target.value)} className="w-full px-3 py-2 border rounded-xl" />
                  <input type="text" placeholder="CEP" value={customerData.cep} onChange={(e) => onCustomerChange("cep", e.target.value)} className="w-full px-3 py-2 border rounded-xl" />
                </div>
                <input type="text" placeholder="Cidade" value={customerData.cidade} onChange={(e) => { onCustomerChange("cidade", e.target.value); calculateShipping(e.target.value, customerData.estado); }} className="w-full px-3 py-2 border rounded-xl" />
              </div>
            </div>
          )}

          {tab === "cart" && (
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center bg-[#FAFAF7] p-3 border rounded-xl">
                  <div><p className="text-sm font-bold">{item.name}</p><p className="text-xs text-[#E8521A]">R$ {item.price.toFixed(2)}</p></div>
                  <button onClick={() => removeItem(item.id)} className="text-red-400"><Trash2 size={16} /></button>
                </div>
              ))}
              <div className="flex gap-2 pt-4">
                <input type="text" placeholder="Cupom" value={couponInput} onChange={(e) => setCouponInput(e.target.value)} className="flex-1 px-3 py-2 border rounded-xl text-sm" />
                <button onClick={applyCoupon} className="bg-[#2C1810] text-white px-4 rounded-xl text-xs font-bold">Aplicar</button>
              </div>
            </div>
          )}

          {tab === "payment" && (
            <div className="text-center py-10">
              <p className="text-sm font-bold text-[#2C1810]">Forma selecionada:</p>
              <p className="text-xl font-black text-[#E8521A] mt-2">{paymentMethod}</p>
              <p className="text-xs text-[#7A6555] mt-4">Altere a forma de pagamento na tela principal se necessário.</p>
            </div>
          )}

          {tab === "confirmation" && (
            <div className="space-y-4 text-sm">
              <div className="bg-[#FAFAF7] p-4 rounded-xl border">
                <p className="font-bold mb-2">Resumo da Entrega</p>
                <p><b>Nome:</b> {customerData.nome}</p>
                <p><b>Endereço:</b> {buildAddressString()}</p>
              </div>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t px-5 py-4 space-y-4">
            <div className="space-y-1 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>R$ {subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Frete</span><span>R$ {shipping.toFixed(2)}</span></div>
              <div className="flex justify-between font-bold text-lg border-t pt-2"><span>Total</span><span className="text-[#E8521A]">R$ {total.toFixed(2)}</span></div>
            </div>
            <button
              onClick={() => {
                if(tab === "dados") setTab("cart");
                else if(tab === "cart") setTab("payment");
                else if(tab === "payment") setTab("confirmation");
                else finishOrder();
              }}
              className={`w-full py-4 rounded-xl font-bold text-white transition-all ${tab === "confirmation" ? "bg-[#25D366]" : "bg-[#E8521A]"}`}
            >
              {tab === "confirmation" ? "Finalizar Pedido" : "Próximo Passo"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}

