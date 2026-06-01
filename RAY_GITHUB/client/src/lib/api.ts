import { createClient } from '@supabase/supabase-js';
import { toast } from 'sonner';

// Configuração do Supabase
const SUPABASE_URL = 'https://diiyswuntzrayuciwtvg.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_jzIK5Nl6mTULuaBCcEGT0A_xMQot3gJ';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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
    potatoSize?: 'P' | 'M' | 'G';
  };
  paymentMethod: string;
  changeValue?: number;
  discount: number;
  shipping: number;
  subtotal: number;
  total: number;
}

/**
 * Envia pedido para o Supabase
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

    // Preparar dados para enviar ao Supabase
    const apiOrder = {
      id: `web-${Date.now()}`,
      client_name: orderData.clientName,
      client_phone: orderData.clientPhone,
      client_address: orderData.fullAddress,
      items: orderData.items, // Será armazenado como JSON
      total: orderData.total,
      status: "pending",
      payment_method: orderData.paymentMethod,
      created_at: new Date(),
    };

    console.log("Enviando pedido para o Supabase...", apiOrder);

    // Inserção no Supabase
    const { error } = await supabase.from('orders').insert([apiOrder]);

    if (error) {
      throw error;
    }

    console.log("Pedido enviado com sucesso!");
    toast.success("Pedido recebido!", {
      description: "Seu pedido foi salvo no sistema. Acompanhe o status.",
    });
    return true;
  } catch (error) {
    console.error("Erro ao enviar pedido:", error);
    toast.error("Erro ao enviar pedido", {
      description: "Tente novamente em alguns momentos.",
    });
    return false;
  }
}
