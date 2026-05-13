/*
 * CustomerForm — Marmitas Express
 * Design: fundo cinza-quente, grid 3 colunas, inputs com borda suave
 */
import { User, Phone, MapPin } from "lucide-react";

interface CustomerFormProps {
  nome: string;
  telefone: string;
  endereco: string;
  onChange: (field: string, value: string) => void;
}

export default function CustomerForm({ nome, telefone, endereco, onChange }: CustomerFormProps) {
  const fields = [
    { id: "nome", label: "Nome completo", icon: User, placeholder: "Seu nome", value: nome, type: "text" },
    { id: "telefone", label: "Telefone / WhatsApp", icon: Phone, placeholder: "(11) 99999-9999", value: telefone, type: "tel" },
    { id: "endereco", label: "Endereço de entrega", icon: MapPin, placeholder: "Rua, número, bairro", value: endereco, type: "text" },
  ];

  return (
    <section className="bg-[#F0EDE8] py-14">
      <div className="container">
        <h2
          className="section-title text-2xl font-bold text-[#2C1810] mb-8"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Seus Dados
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {fields.map(({ id, label, icon: Icon, placeholder, value, type }) => (
            <div key={id} className="flex flex-col gap-1.5">
              <label
                htmlFor={id}
                className="text-sm font-semibold text-[#2C1810] flex items-center gap-1.5"
              >
                <Icon size={14} className="text-[#E8521A]" />
                {label}
              </label>
              <input
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(id, e.target.value)}
                className="bg-white border border-[#DDD5CC] rounded-xl px-4 py-3 text-sm text-[#2C1810] placeholder:text-[#B0A090] focus:outline-none focus:ring-2 focus:ring-[#E8521A]/40 focus:border-[#E8521A] transition-all"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
