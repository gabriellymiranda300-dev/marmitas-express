/*
 * Home — Panela Velha
 * Design: Bistrô Contemporâneo Limpo
 * Orquestra todos os componentes da página principal
 */
import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CustomerForm from "@/components/CustomerForm";
import Menu from "@/components/Menu";
import ExtrasPayment from "@/components/ExtrasPayment";
import CartDrawer from "@/components/CartDrawer";
import ReviewSection from "@/components/ReviewSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [customerData, setCustomerData] = useState({
    nome: "",
    telefone: "",
    endereco: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("Pix");

  const handleCustomerChange = (field: string, value: string) => {
    setCustomerData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <section id="dados">
          <CustomerForm
            nome={customerData.nome}
            telefone={customerData.telefone}
            endereco={customerData.endereco}
            onChange={handleCustomerChange}
          />
        </section>
        <Menu />
        <ExtrasPayment
          paymentMethod={paymentMethod}
          onPaymentChange={setPaymentMethod}
        />
        <ReviewSection />
      </main>
      <Footer />
      <CartDrawer customerData={customerData} paymentMethod={paymentMethod} />
    </div>
  );
}
