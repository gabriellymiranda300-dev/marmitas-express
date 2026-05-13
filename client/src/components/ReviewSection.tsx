/*
 * ReviewSection — Marmitas Express
 * Design: fundo creme, estrelas interativas, textarea estilizada
 */
import { useState } from "react";
import { Star, Send } from "lucide-react";
import { toast } from "sonner";

export default function ReviewSection() {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (rating === 0) {
      toast.error("Selecione uma avaliação de 1 a 5 estrelas.");
      return;
    }
    if (text.trim().length < 5) {
      toast.error("Escreva um comentário com pelo menos 5 caracteres.");
      return;
    }
    toast.success("Obrigado pela sua avaliação! 🙏", {
      description: "Seu feedback é muito importante para nós.",
    });
    setRating(0);
    setText("");
  };

  return (
    <section className="bg-[#FAFAF7] py-16">
      <div className="container">
        <div className="max-w-xl">
          <h2
            className="section-title text-2xl font-bold text-[#2C1810] mb-8"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Avalie Nossa Comida
          </h2>

          {/* Stars */}
          <div className="flex gap-2 mb-5">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHovered(star)}
                onMouseLeave={() => setHovered(0)}
                className="transition-transform duration-100 active:scale-90"
              >
                <Star
                  size={32}
                  className={`transition-colors duration-100 ${
                    star <= (hovered || rating)
                      ? "fill-[#E8521A] text-[#E8521A]"
                      : "text-[#DDD5CC]"
                  }`}
                />
              </button>
            ))}
            {rating > 0 && (
              <span className="ml-2 text-sm font-medium text-[#7A6555] self-center">
                {["", "Ruim", "Regular", "Bom", "Ótimo", "Excelente!"][rating]}
              </span>
            )}
          </div>

          {/* Textarea */}
          <textarea
            placeholder="Conte-nos o que achou da sua marmita..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            className="w-full bg-white border border-[#DDD5CC] rounded-xl px-4 py-3 text-sm text-[#2C1810] placeholder:text-[#B0A090] focus:outline-none focus:ring-2 focus:ring-[#E8521A]/40 focus:border-[#E8521A] transition-all resize-none mb-4"
          />

          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 bg-[#E8521A] hover:bg-[#C94415] active:scale-95 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-150"
          >
            <Send size={16} />
            Enviar Avaliação
          </button>
        </div>
      </div>
    </section>
  );
}
