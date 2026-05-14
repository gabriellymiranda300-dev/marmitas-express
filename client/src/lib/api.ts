/*
 * API Integration - Panela Velha
 * Envia pedidos do site para o painel de administração via API REST
 */

import { toast } from "sonner";

// Configuração da URL da API do painel
const PAINEL_API_URL = "https://panelavelha-bbdz2awd.manus.space/api/orders";

export interface OrderItem {
  name: string;
  price: number;
  quantity?: number;
}

export interface OrderData {
  clientName: string;
  clientPhone: string;
  clientAddress: {
    rua: string;
    numero: string;
    complemento: string;
    cep: string;
    cidade: string;
    estado: string;
  };
  items: OrderItem[];
  extras: {
    utensil: boolean;
    extraSalad: boolean;
    potatoSize?: "P" | "M" | "G";
  };
  paymentMethod: string;
  changeValue?: number;
  discount: number;
  shipping: number;
  subtotal: number;
  total: number;
}

/**
 * Envia pedido para a API do painel
 */
export async function sendOrderToAPI(orderData: OrderData): Promise<boolean> {
  try {
    // Validar dados do pedido
    if (
      !orderData.clientName ||
      !orderData.clientPhone ||
      !orderData.items ||
      orderData.total <= 0
    ) {
      console.error("Dados do pedido incompletos");
      toast.error("Erro", {
        description: "Por favor, preencha todos os dados do pedido.",
      });
      return false;
    }

    // Preparar dados para enviar à API (formato simplificado)
    const apiOrder = {
      id: `web-${Date.now()}`,
      client: orderData.clientName,
      phone: orderData.clientPhone,
      address: `${orderData.clientAddress.rua}, ${orderData.clientAddress.numero}${orderData.clientAddress.complemento ? " - " + orderData.clientAddress.complemento : ""} - ${orderData.clientAddress.cep} - ${orderData.clientAddress.cidade}/${orderData.clientAddress.estado}`,
      items: orderData.items.map((item) => `${item.name} (1x)`).join(", "),
      total: orderData.total,
      paymentMethod: orderData.paymentMethod || "Não especificado",
      status: "pending",
      source: "website",
    };

    console.log("Enviando pedido para o painel...", apiOrder);

    // Requisição POST para a API
    const response = await fetch(PAINEL_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiOrder),
    });

    // Verificar resposta da API
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.success || response.ok) {
      console.log("Pedido enviado com sucesso!", result);
      toast.success("Pedido recebido!", {
        description:
          "Seu pedido foi enviado para o painel. Acompanhe o status no WhatsApp.",
      });
      return true;
    } else {
      throw new Error(result.error || "Erro desconhecido");
    }
  } catch (error) {
    console.error("Erro ao enviar pedido:", error);
    toast.error("Erro ao enviar pedido", {
      description: "Tente novamente em alguns momentos.",
    });
    return false;
  }
}

/**
 * Envia pedido via WhatsApp (fallback se API falhar)
 */
export function sendOrderViaWhatsApp(orderData: OrderData): void {
  const phoneNumber = "5511941462504"; // Número do restaurante
  const address = `${orderData.clientAddress.rua}, ${orderData.clientAddress.numero}${orderData.clientAddress.complemento ? " - " + orderData.clientAddress.complemento : ""} - ${orderData.clientAddress.cep} - ${orderData.clientAddress.cidade}/${orderData.clientAddress.estado}`;

  const itemsList = orderData.items
    .map((item) => {
      const qty = item.quantity || 1;
      return `• ${item.name} (${qty}x) - R$ ${(item.price * qty).toFixed(2).replace(".", ",")}`;
    })
    .join("\n");

  const extrasList = [
    orderData.extras.utensil ? "✓ Talher" : null,
    orderData.extras.extraSalad ? "✓ Salada Extra" : null,
    orderData.extras.potatoSize ? `✓ Batata Frita - ${orderData.extras.potatoSize}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const message = `
*NOVO PEDIDO - PANELA VELHA*

*Cliente:* ${orderData.clientName}
*Telefone:* ${orderData.clientPhone}
*Endereço:* ${address}

*Itens:*
${itemsList}

${extrasList ? `*Adicionais:*\n${extrasList}\n` : ""}
*Subtotal:* R$ ${orderData.subtotal.toFixed(2).replace(".", ",")}
*Desconto:* R$ ${orderData.discount.toFixed(2).replace(".", ",")}
*Frete:* R$ ${orderData.shipping.toFixed(2).replace(".", ",")}
*TOTAL:* R$ ${orderData.total.toFixed(2).replace(".", ",")}

*Forma de Pagamento:* ${orderData.paymentMethod}
${orderData.changeValue ? `*Troco para:* R$ ${orderData.changeValue.toFixed(2).replace(".", ",")}` : ""}
  `.trim();

  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  window.open(whatsappURL, "_blank");
}
