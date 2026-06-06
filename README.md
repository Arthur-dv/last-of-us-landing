# The Last of Us — Fan Landing Page

> _"Quando estiver perdido na escuridão, procure a luz."_

![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=flat-square&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-v12-ff0055?style=flat-square&logo=framer&logoColor=white)
![RAWG API](https://img.shields.io/badge/RAWG%20API-live%20data-d4a853?style=flat-square)

Página de fã imersiva e cinematográfica do jogo **The Last of Us** (Naughty Dog, 2013), construída como projeto de portfólio com foco em animações avançadas, design system temático e consumo de API externa em tempo real.

---

## ✨ Funcionalidades

- **Hero 3D** com efeito ContainerScroll (Aceternity UI), sparkles âmbar animados no título e vídeo atmosférico no card
- **Carrossel de personagens** — Ellie, Joel, Dina e Abby com imagens PNG 3D pop-out, transições com `AnimatePresence` e auto-avanço
- **Dados ao vivo via RAWG API** — Metacritic score, rating dos usuários e plataformas exibidos na seção de história
- **OS INFECTADOS** — cards dos 4 estágios de infecção com stagger reveal on scroll
- **Navbar flutuante** com backdrop blur e hide-on-scroll inteligente
- **Vídeo background** atmosférico (fixed, low opacity)
- **Spotlight cursor** — luz âmbar seguindo o mouse via Canvas API
- **Design system TLOU** — paleta âmbar/floresta/perigo, tipografia Russo One + Chakra Petch
- Totalmente em **Português Brasil**
- TypeScript strict, zero erros de compilação

---

## 🛠 Stack

| Camada      | Tecnologia                                            |
| ----------- | ----------------------------------------------------- |
| Framework   | Next.js 16.2 (App Router)                             |
| Linguagem   | TypeScript 5                                          |
| Estilização | Tailwind CSS v4 (config 100% CSS via `@theme inline`) |
| Animações   | Framer Motion v12                                     |
| Partículas  | tsParticles — SparklesCore                            |
| Fontes      | Google Fonts — Russo One + Chakra Petch               |
| API externa | RAWG Video Games Database                             |
| Imagens     | Next.js `<Image>` com otimização automática           |

---

## 🎮 API — RAWG Video Games Database

Este projeto consome a [RAWG API](https://rawg.io/apidocs) para exibir **dados reais do jogo** diretamente na página.

**Dados exibidos em tempo real:**

- 🏆 Metacritic Score oficial
- ⭐ Rating dos usuários RAWG (0–5)
- 🎮 Plataformas disponíveis
- ⏱ Tempo médio de gameplay

A integração usa **Next.js Server Components** com `fetch` cacheado (`revalidate: 3600`) — os dados são buscados no servidor a cada hora, sem expor a API key ao cliente.

```
app/api/game/route.ts  →  GET /api/game  →  RAWG API
                                ↓
                    components/game-summary.tsx
                    (Server Component — fetch direto)
```

## 🚀 Instalação

```bash
# Clone o repositório
git clone https://github.com/SEU_USUARIO/last-of-us-landing.git
cd last-of-us-landing

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local
# Edite .env.local e adicione sua chave RAWG

# Inicie o servidor de desenvolvimento
npm run dev
```

---

---

## 🗂 Estrutura do Projeto

```
last-of-us-landing/
├── app/
│   ├── api/
│   │   └── game/route.ts          # Proxy para RAWG API
│   ├── layout.tsx                 # Fontes, metadata, lang="pt-BR"
│   ├── page.tsx                   # Composição de todas as seções
│   └── globals.css                # Design system TLOU via @theme inline
├── components/
│   ├── ui/
│   │   ├── container-scroll-animation.tsx  # Efeito 3D scroll (Aceternity)
│   │   ├── sparkles.tsx                    # Partículas tsParticles
│   │   ├── spotlight-cursor.tsx            # Luz do cursor (Canvas API)
│   │   └── mouse-responsive-background.tsx # Parallax mouse
│   ├── hero-section.tsx           # Hero com ContainerScroll + sparkles
│   ├── navbar.tsx                 # Navbar flutuante com hide-on-scroll
│   ├── game-summary.tsx           # História + dados ao vivo da RAWG
│   ├── character-carousel.tsx     # Carrossel 3D pop-out (4 personagens)
│   ├── enemies-section.tsx        # 4 estágios de infecção Cordyceps
│   └── video-background.tsx       # Vídeo fixed background
├── lib/
│   └── utils.ts                   # cn() — clsx + tailwind-merge
└── public/
    ├── images/                    # PNGs dos personagens e infectados
    └── videos/                    # background.mp4 (não versionado)
```

---

## 🎨 Design System

Todas as cores e tokens vivem em `app/globals.css` via `@theme inline {}` (Tailwind CSS v4 — sem `tailwind.config.ts`):

| Token                | Hex       | Uso                                      |
| -------------------- | --------- | ---------------------------------------- |
| `--color-background` | `#0A0A08` | Base da página                           |
| `--color-surface`    | `#111108` | Cards e seções alternadas                |
| `--color-primary`    | `#D4A853` | Âmbar — CTAs, destaques, sparkles        |
| `--color-forest`     | `#3D6B32` | Verde floresta — acentos                 |
| `--color-danger`     | `#8B1A1A` | Vermelho — infectados                    |
| `--color-foreground` | `#E8DCC8` | Texto principal (pergaminho envelhecido) |
| `--color-muted`      | `#6B6358` | Texto secundário                         |

---

## 📜 Licença

Projeto de fã sem fins comerciais. Todos os direitos de The Last of Us pertencem à **Naughty Dog / Sony Interactive Entertainment**.

---

<p align="center">
  <sub>Fan-made tribute · Construído com Next.js · Naughty Dog © 2013–2025</sub>
</p>
