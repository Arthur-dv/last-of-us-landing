"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const characters = [
  {
    name: "ELLIE",
    role: "Protagonista Principal",
    age: "19 anos",
    image: "/images/ellie.png",
    bio: "Imune à infecção Cordyceps, Ellie carrega o peso da última esperança da humanidade. Resiliente, de língua afiada e ferozmente leal, ela navega por um mundo brutal movida pelo amor, pela perda e pela vingança.",
    quote: "\"Você sempre encontra algo pelo que lutar.\"",
    accent: "#3D6B32",
    accentLight: "rgba(61,107,50,0.12)",
  },
  {
    name: "JOEL",
    role: "Contrabandista & Protetor",
    age: "~55 anos",
    image: "/images/joel.png",
    bio: "Endurecido pela tragédia e décadas de sobrevivência em um mundo sem regras, Joel é um homem de poucas palavras, mas de vontade inabalável. Contrabandista tornado protetor, seu vínculo com Ellie torna-se tanto sua salvação quanto sua perdição.",
    quote: "\"Eu lutei por muito tempo apenas para sobreviver.\"",
    accent: "#8B4513",
    accentLight: "rgba(139,69,19,0.12)",
  },
  {
    name: "DINA",
    role: "Companheira de Ellie",
    age: "~19 anos",
    image: "/images/dina.png",
    bio: "Uma lutadora habilidosa da comunidade de Jackson, Dina é perspicaz, corajosa e profundamente carinhosa. Seu relacionamento com Ellie torna-se a âncora emocional da brutal jornada da sequência.",
    quote: "\"Eu iria com você a qualquer lugar.\"",
    accent: "#4A6E8A",
    accentLight: "rgba(74,110,138,0.12)",
  },
  {
    name: "ABBY",
    role: "Soldada da WLF",
    age: "~25 anos",
    image: "/images/abby.png",
    bio: "Treinada como soldada dos Lobos da Frente de Libertação de Washington, Abby é forte, determinada e movida por um passado que a assombra. Sua jornada revela uma perspectiva que desafia tudo que o jogador conhecia.",
    quote: "\"Eu farei o que for preciso para proteger as pessoas que amo.\"",
    accent: "#5A6E3A",
    accentLight: "rgba(90,110,58,0.12)",
  },
];

const textVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({
    x: dir > 0 ? -80 : 80,
    opacity: 0,
  }),
};

const imageVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 50 : -50,
    opacity: 0,
    scale: 1.08,
    filter: "blur(4px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -40 : 40,
    opacity: 0,
    scale: 1.04,
    filter: "blur(2px)",
  }),
};

export default function CharacterCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const go = useCallback((dir: number) => {
    setDirection(dir);
    setIndex((i) => (i + dir + characters.length) % characters.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => go(1), 4500);
    return () => clearInterval(t);
  }, [paused, go]);

  const char = characters[index];

  return (
    <section
      id="characters"
      className="relative py-24 bg-background"
      style={{ overflowX: "hidden", overflowY: "visible" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4"
        >
          <span className="h-px w-12 bg-primary/40" />
          <span className="text-xs tracking-[0.3em] text-primary uppercase">
            Sobreviventes
          </span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 text-4xl md:text-6xl text-foreground"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          OS PERSONAGENS
        </motion.h2>
      </div>

      {/* Carousel — 3D pop-out layout */}
      <div className="max-w-7xl mx-auto px-6">
        {/*
          Outer wrapper has paddingTop to give the character image space
          to "float" above the card boundary (3D break-out effect).
          The image container starts at top-0 (above the card).
        */}
        <div className="relative" style={{ paddingTop: "80px" }}>

          {/* ── Character image — floats ABOVE the card ── */}
          <div
            className="absolute left-0 top-0 bottom-0 w-full md:w-[48%] z-20"
            style={{ pointerEvents: "none" }}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={char.name + "-img"}
                custom={direction}
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute inset-0"
                style={{
                  // 3D perspective lean toward viewer
                  perspective: "900px",
                  filter:
                    "drop-shadow(-8px 0 40px rgba(0,0,0,0.5)) drop-shadow(0 40px 80px rgba(0,0,0,0.9))",
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    transform: "perspective(900px) rotateY(4deg) rotateX(-1deg)",
                    transformOrigin: "center bottom",
                  }}
                >
                  <Image
                    src={char.image}
                    alt={char.name}
                    fill
                    className="object-contain object-bottom"
                    sizes="(max-width: 768px) 100vw, 48vw"
                    priority
                  />
                  {/* Blend gradients — right edge blend into card + very subtle bottom fade */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to right, transparent 50%, #0A0A08 92%), linear-gradient(to bottom, transparent 92%, #0A0A08 100%)",
                    }}
                  />
                  {/* Ambient color leak matching character accent */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse 60% 40% at 40% 100%, ${char.accentLight} 0%, transparent 70%)`,
                    }}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Card body — background + text ── */}
          <div
            className="relative rounded-2xl border border-border overflow-hidden min-h-[580px] grid grid-cols-1 md:grid-cols-2"
          >
            {/* Animated bg glow */}
            <AnimatePresence>
              <motion.div
                key={char.name + "-bg"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse 55% 80% at 20% 60%, ${char.accentLight} 0%, transparent 65%)`,
                }}
              />
            </AnimatePresence>

            {/* Left panel — empty surface (image lives above this via z-index) */}
            <div className="bg-surface relative min-h-[360px] md:min-h-0" />

            {/* Right panel — text content */}
            <div className="relative z-10 flex flex-col justify-center px-8 md:px-12 py-10 bg-surface/60 backdrop-blur-sm">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={char.name + "-text"}
                  custom={direction}
                  variants={textVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="flex flex-col gap-5"
                >
                  {/* Role tag */}
                  <span
                    className="text-xs tracking-[0.25em] uppercase"
                    style={{ color: char.accent }}
                  >
                    {char.role} · {char.age}
                  </span>

                  {/* Name */}
                  <h3
                    className="text-5xl md:text-7xl text-foreground leading-none"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {char.name}
                  </h3>

                  {/* Divider */}
                  <div className="h-px w-16" style={{ background: char.accent }} />

                  {/* Bio */}
                  <p className="text-muted text-sm leading-relaxed max-w-sm">
                    {char.bio}
                  </p>

                  {/* Quote */}
                  <p
                    className="text-xs italic leading-relaxed"
                    style={{ color: char.accent }}
                  >
                    {char.quote}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="mt-10 flex items-center gap-4">
                <button
                  onClick={() => go(-1)}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted hover:text-primary hover:border-primary/50 transition-all duration-200 cursor-pointer"
                  aria-label="Personagem anterior"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => go(1)}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted hover:text-primary hover:border-primary/50 transition-all duration-200 cursor-pointer"
                  aria-label="Próximo personagem"
                >
                  <ChevronRight size={16} />
                </button>

                {/* Dot indicators */}
                <div className="flex gap-2 ml-2">
                  {characters.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setDirection(i > index ? 1 : -1);
                        setIndex(i);
                      }}
                      className="transition-all duration-300 rounded-full cursor-pointer"
                      style={{
                        width: i === index ? 24 : 6,
                        height: 6,
                        background:
                          i === index ? char.accent : "rgba(107,99,88,0.4)",
                      }}
                      aria-label={`Ir para ${characters[i].name}`}
                    />
                  ))}
                </div>

                <span className="ml-auto text-xs text-muted tabular-nums">
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(characters.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
