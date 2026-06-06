"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Eye, EyeOff, Ear, Flame } from "lucide-react";

const enemies = [
  {
    id: "runner",
    name: "Corredor",
    stage: "Estágio 1",
    timeframe: "2 dias pós-infecção",
    description:
      "O estágio mais inicial da infecção. Ainda conservando grande parte da aparência humana, os Corredores são rápidos e imprevisíveis. Sua agressividade suprime qualquer razão — eles atacam tudo que avistam.",
    traits: ["Alta velocidade", "Pode usar armas", "Vocaliza — grita e berra", "Fraco ao fogo"],
    icon: Flame,
    threat: 2,
    image: "/images/runner.png",
    gradient: "from-amber-900/20 to-transparent",
    accentColor: "#D4A853",
  },
  {
    id: "stalker",
    name: "Espreitador",
    stage: "Estágio 2",
    timeframe: "2 semanas pós-infecção",
    description:
      "Entre o Corredor e o Clicker, os Espreitadores são os infectados mais imprevisíveis. Conservam inteligência limitada — escondem-se nas sombras, aguardando para emboscar suas presas pelas costas.",
    traits: ["Táticas de emboscada", "Esconde-se e espera", "Ainda tem alguma visão", "Movimentos erráticos"],
    icon: EyeOff,
    threat: 3,
    image: "/images/stalker.jpg",
    gradient: "from-orange-900/20 to-transparent",
    accentColor: "#C2773A",
  },
  {
    id: "clicker",
    name: "Clicker",
    stage: "Estágio 3",
    timeframe: "1 ano pós-infecção",
    description:
      "Completamente cego — o crescimento fúngico destruiu seus olhos. Os Clickers se orientam por ecolocalização, emitindo cliques distintivos. Quase impossível de eliminar em silêncio. Uma única mordida é fatal.",
    traits: ["Completamente cego", "Ecolocalização", "Placas fúngicas blindadas", "Mata instantaneamente ao agarrar"],
    icon: Ear,
    threat: 4,
    image: "/images/clicker.png",
    gradient: "from-red-950/40 to-transparent",
    accentColor: "#8B1A1A",
  },
  {
    id: "bloater",
    name: "Inchaço",
    stage: "Estágio 4",
    timeframe: "Vários anos pós-infecção",
    description:
      "A forma mais avançada e aterrorizante. Uma armadura fúngica massiva os torna quase imunes a armas convencionais. Arremessam cápsulas de micotoxina que explodem em nuvens tóxicas.",
    traits: ["Armadura quase invulnerável", "Cápsulas de esporos tóxicos", "Força descomunal", "Raro e letal"],
    icon: Eye,
    threat: 5,
    image: "/images/bloater.png",
    gradient: "from-green-950/30 to-transparent",
    accentColor: "#3D6B32",
  },
];

function ThreatBar({ level }: { level: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="h-1.5 flex-1 rounded-full"
          style={{
            background: i < level ? "#8B1A1A" : "rgba(107,99,88,0.3)",
          }}
        />
      ))}
    </div>
  );
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function EnemiesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="enemies" className="relative py-24 bg-surface overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="h-px w-12 bg-danger/60" />
            <span className="text-xs tracking-[0.3em] text-danger uppercase">
              Análise de Ameaças
            </span>
          </div>
          <h2
            className="text-4xl md:text-6xl text-foreground"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            INFECTADOS
          </h2>
          <p className="mt-4 max-w-lg text-muted text-sm leading-relaxed">
            A infecção cerebral por Cordyceps transforma humanos em criaturas agressivas ao longo de quatro estágios. Cada estágio mais perigoso que o anterior.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {enemies.map((enemy) => {
            const Icon = enemy.icon;
            return (
              <motion.div
                key={enemy.id}
                variants={cardVariants}
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ duration: 0.2 }}
                className="relative rounded-2xl border overflow-hidden cursor-default group"
                style={{ borderColor: `${enemy.accentColor}33` }}
              >
                {/* Background */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, ${enemy.accentColor}0a 0%, transparent 60%)`,
                  }}
                />

                {/* Clicker — real image */}
                {enemy.image && (
                  <div className="absolute right-0 top-0 bottom-0 w-48 overflow-hidden opacity-40 group-hover:opacity-60 transition-opacity duration-500">
                    <Image
                      src={enemy.image}
                      alt={enemy.name}
                      fill
                      className="object-cover object-top"
                      sizes="192px"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(to right, #111108 0%, transparent 100%)",
                      }}
                    />
                  </div>
                )}

                {/* Content */}
                <div className="relative z-10 p-6 flex flex-col gap-4">
                  {/* Top row */}
                  <div className="flex items-start justify-between">
                    <div>
                      <p
                        className="text-xs tracking-[0.2em] uppercase mb-1"
                        style={{ color: enemy.accentColor }}
                      >
                        {enemy.stage} · {enemy.timeframe}
                      </p>
                      <h3
                        className="text-3xl md:text-4xl text-foreground"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {enemy.name}
                      </h3>
                    </div>
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{
                        background: `${enemy.accentColor}22`,
                        border: `1px solid ${enemy.accentColor}44`,
                      }}
                    >
                      <Icon size={18} style={{ color: enemy.accentColor }} />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted text-xs leading-relaxed max-w-xs">
                    {enemy.description}
                  </p>

                  {/* Traits */}
                  <div className="flex flex-wrap gap-2">
                    {enemy.traits.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-2 py-1 rounded-full tracking-wide"
                        style={{
                          background: `${enemy.accentColor}18`,
                          color: enemy.accentColor,
                          border: `1px solid ${enemy.accentColor}33`,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Threat level */}
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-muted tracking-wider uppercase">
                      Nível de Ameaça
                    </span>
                    <div className="flex-1">
                      <ThreatBar level={enemy.threat} />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
