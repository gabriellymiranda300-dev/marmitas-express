/*
 * Footer — Panela Velha
 * Design: fundo marrom-escuro, texto creme, informações de contato
 */
import { Clock, Phone, MapPin } from "lucide-react";

const LOGO =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663658405775/kQVQpftc3b77nEataXztAL/logo-panela-velha-NcFZC3CNY46bK2c3BwivHm.webp";

export default function Footer() {
  return (
    <footer className="bg-[#2C1810] text-[#F5E8D8] py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img src={LOGO} alt="Panela Velha" className="h-10 w-auto" />
              <span
                className="text-lg font-bold text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Panela Velha
              </span>
            </div>
            <p className="text-sm text-[#C4A882] leading-relaxed">
              Comida caseira com sabor de lar, feita com carinho e pontualidade.
            </p>
          </div>

          {/* Horários */}
          <div>
            <h3
              className="text-base font-bold text-white mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Horário de Funcionamento
            </h3>
            <div className="flex flex-col gap-2 text-sm text-[#C4A882]">
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-[#E8521A]" />
                <span>Segunda a Sexta: 10h às 14h</span>
              </div>
            </div>
          </div>

          {/* Contato */}
          <div>
            <h3
              className="text-base font-bold text-white mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Contato
            </h3>
            <div className="flex flex-col gap-2 text-sm text-[#C4A882]">
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[#E8521A]" />
                <span>(11) 94146-2504</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-[#E8521A]" />
                <span>Avenida dos Estados, número 549, Jardim São Paulo, São Paulo/SP, CEP: 04.123-000</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 text-center text-xs text-[#8A6A50]">
          © {new Date().getFullYear()} Panela Velha. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
