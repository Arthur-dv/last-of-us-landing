"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { ReactNode } from "react";

const stats = [
  { value: "20+", label: "Anos Após o Surto" },
  { value: "2013", label: "Lançamento Original" },
  { value: "200M+", label: "Cópias Vendidas" },
  { value: "250+", label: "Prêmios Jogo do Ano" },
];

const paragraphs = [
  "Em 2013, uma cepa mutante do fungo Cordyceps — conhecido por controlar insetos — transpôs a barreira entre espécies e infectou humanos. Em poucos meses, a civilização entrou em colapso. Infectados tornaram-se agressivos, espalhando o fungo por mordidas e esporos transportados pelo ar.",
  "Vinte anos depois, os Estados Unidos são uma sombra do que foram. As Zonas de Quarentena controladas pela FEDRA oferecem segurança ao custo da liberdade. Além dos muros, sobreviventes esculpem sua existência em um mundo perigoso e selvagem, retomado pela natureza.",
  "Joel, um contrabandista implacável marcado por perdas pessoais, recebe a missão de escoltar Ellie — uma adolescente com um segredo extraordinário — pelo país até os Vagalumes, uma milícia rebelde que acredita que sua imunidade pode desvendar a cura para toda a humanidade.",
];

export default function GameSummary({ ratingsSlot }: { ratingsSlot?: ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="story" className="relative py-24 bg-background overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="h-px w-12 bg-primary/40" />
            <span className="text-xs tracking-[0.3em] text-primary uppercase">
              Sobre o Jogo
            </span>
          </div>
          <h2
            className="text-4xl md:text-6xl text-foreground"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            O MUNDO
            <br />
            <span className="text-primary">DEPOIS</span>
          </h2>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Text column */}
          <div className="flex flex-col gap-6">
            {paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.15 }}
                className="text-muted text-sm md:text-base leading-relaxed"
              >
                {p}
              </motion.p>
            ))}
          </div>

          {/* Stats + visual column */}
          <div className="flex flex-col gap-8">
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <p
                    className="text-3xl text-primary leading-none"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {s.value}
                  </p>
                  <p className="mt-1 text-xs text-muted tracking-wide">{s.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Card de avaliações ao vivo — RAWG API */}
            {ratingsSlot && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.75 }}
              >
                {ratingsSlot}
              </motion.div>
            )}

            {/* Cordyceps info card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="rounded-xl border border-danger/30 bg-danger/5 p-6"
            >
              <p
                className="text-xs tracking-[0.2em] text-danger uppercase mb-3"
              >
                Classificação da Infecção
              </p>
              <div className="flex flex-col gap-2">
                {[
                  ["Estágio 1", "Corredor — 2 dias pós-infecção"],
                  ["Estágio 2", "Espreitador — 2 semanas pós-infecção"],
                  ["Estágio 3", "Clicker — 1 ano pós-infecção"],
                  ["Estágio 4", "Inchaço — vários anos pós-infecção"],
                ].map(([stage, desc]) => (
                  <div key={stage} className="flex items-baseline gap-3">
                    <span className="text-xs text-danger/70 font-semibold w-16 shrink-0">
                      {stage}
                    </span>
                    <span className="text-xs text-muted">{desc}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
