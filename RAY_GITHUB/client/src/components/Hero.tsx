/*
 * Hero — Panela Velha
 * Design: imagem full-bleed com overlay gradiente escuro, texto branco, CTA laranja
 */

const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663658405775/kQVQpftc3b77nEataXztAL/prato-segunda-costela-c23AWFbSHzUb4FYwKaEh8A.webp";

export default function Hero() {
  const scrollToMenu = () => {
    document.getElementById("cardapio")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative h-[520px] md:h-[600px] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${HERO_IMG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay gradiente */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto fade-in-up">
        <h1
          className="text-white text-4xl md:text-6xl font-bold leading-tight mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Panela Velha
        </h1>
        <p className="text-[#F5C99A] text-xl md:text-2xl font-semibold italic mb-4">
          Simples, caseiro e delicioso
        </p>
        <p className="text-white/80 text-lg mb-8">
          Comida feita com amor, como na vovó fazia. Peça agora e receba fresquinho.
        </p>
        <button
          onClick={scrollToMenu}
          className="bg-[#E8521A] hover:bg-[#C94415] active:scale-95 text-white font-bold px-8 py-3.5 rounded-full text-base transition-all duration-150 shadow-lg shadow-orange-900/30"
        >
          Ver Cardápio
        </button>

        {/* Badges */}
        <div className="flex items-center justify-center gap-6 mt-8">
          {[
            { icon: "🏠", label: "Caseiro" },
            { icon: "⭐", label: "4.9/5" },
            { icon: "❤️", label: "Feito com amor" },
          ].map(({ icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span className="text-xl">{icon}</span>
              <span className="text-white/70 text-xs font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
