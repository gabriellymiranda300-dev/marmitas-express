# Ideias de Design — Marmitas Express

## Abordagem 1 — Cantina Artesanal Moderna
<response>
<text>
**Design Movement:** Craft Food / Artisan Warmth
**Core Principles:**
- Calor e aconchego de cozinha caseira com acabamento contemporâneo
- Tipografia expressiva com serifas para títulos e sans-serif para corpo
- Fotografia de comida como protagonista visual
- Paleta terrosa com acento vibrante laranja-tijolo

**Color Philosophy:** Tons de creme, areia e marrom escuro evocam madeira, cerâmica e especiarias. O laranja-tijolo (#D4522A) funciona como acento de ação, remetendo ao calor do fogão.

**Layout Paradigm:** Layout assimétrico com seções alternando full-bleed de imagem e conteúdo em colunas. Hero com sobreposição de texto à esquerda, imagem à direita.

**Signature Elements:**
- Divisores ondulados entre seções (SVG orgânico)
- Badges circulares com informações de destaque (tempo de entrega, avaliação)
- Cards de produto com imagem grande e preço em destaque tipográfico

**Interaction Philosophy:** Micro-animações suaves ao adicionar ao carrinho; contador do carrinho com bounce; botões com feedback tátil (scale down no active).

**Animation:** Fade-in + slide-up de 300ms para cards ao entrar na viewport; carrinho com shake animation ao adicionar item; hero com parallax sutil.

**Typography System:** Títulos em Playfair Display (serif bold), corpo em DM Sans (clean, legível). Hierarquia clara: 48px hero, 32px seções, 20px cards, 16px corpo.
</text>
<probability>0.08</probability>
</response>

## Abordagem 2 — Street Food Urbano
<response>
<text>
**Design Movement:** Urban Street Food / Bold Graphic
**Core Principles:**
- Energia e dinamismo de food truck urbano
- Contraste alto com fundo escuro e acentos neon-laranja
- Tipografia condensada e impactante
- Grid irregular com elementos sobrepostos

**Color Philosophy:** Fundo quase-preto (#1A1A1A), laranja elétrico (#FF5722) e branco puro criam contraste máximo. Detalhes em amarelo-mostarda como acento secundário.

**Layout Paradigm:** Layout de revista com colunas de larguras variadas. Cards de produto em grid masonry. Header fixo translúcido com blur.

**Signature Elements:**
- Números grandes em background como decoração tipográfica
- Tags de preço em formato de etiqueta/sticker
- Linha divisória diagonal entre seções

**Interaction Philosophy:** Hover effects agressivos com cor de fundo que inverte; transições rápidas (150ms); efeito de "stamp" ao adicionar ao carrinho.

**Animation:** Entrada de cards com stagger de 60ms; preço com counter animation; botão de finalizar com pulse.

**Typography System:** Títulos em Bebas Neue (condensed display), subtítulos em Barlow Condensed, corpo em Inter. Contraste extremo de tamanhos.
</text>
<probability>0.07</probability>
</response>

## Abordagem 3 — Bistrô Contemporâneo Limpo (ESCOLHIDA)
<response>
<text>
**Design Movement:** Contemporary Brazilian Bistro / Clean Editorial
**Core Principles:**
- Elegância acessível: premium sem ser intimidador
- Hierarquia visual clara com muito espaço em branco
- Laranja quente como cor primária de ação, cremes como base
- Fotografia de comida em destaque com molduras generosas

**Color Philosophy:** Fundo creme (#FAFAF7), laranja-coral (#E8521A) como primário, marrom-escuro (#2C1810) para textos, cinza-quente (#F0EDE8) para fundos de seção alternados. Paleta que remete a uma cozinha brasileira bem cuidada.

**Layout Paradigm:** Layout editorial com seções bem definidas. Hero com texto centralizado sobre imagem com overlay gradiente. Cardápio em grid de 3 colunas. Seções com fundo alternado para criar ritmo visual.

**Signature Elements:**
- Linha decorativa laranja sob títulos de seção
- Cards com sombra suave e hover que eleva o card
- Carrinho como painel lateral deslizante (drawer)

**Interaction Philosophy:** Animações suaves e funcionais; feedback imediato ao adicionar ao carrinho; formulário com validação inline elegante.

**Animation:** Cards com fade-in ao scroll; drawer do carrinho com slide da direita; botões com scale(0.97) no active; contador do carrinho com bounce.

**Typography System:** Títulos em Fraunces (serif expressiva), corpo em Plus Jakarta Sans (moderna, legível). Hero em 52px bold, seções em 30px, cards em 18px.
</text>
<probability>0.09</probability>
</response>

---

## Design Escolhido: Bistrô Contemporâneo Limpo
Paleta: creme (#FAFAF7), laranja-coral (#E8521A), marrom-escuro (#2C1810), cinza-quente (#F0EDE8)
Fontes: Fraunces (títulos) + Plus Jakarta Sans (corpo)
