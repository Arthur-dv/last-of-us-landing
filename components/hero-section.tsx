"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { SparklesCore } from "@/components/ui/sparkles";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-background overflow-hidden">
      {/* Gradiente atmosférico de fundo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(61,107,50,0.15) 0%, transparent 60%)",
        }}
      />

      <ContainerScroll
        titleComponent={
          <div className="flex flex-col items-center gap-6 pt-24 pb-8">
            {/* Tag acima do título */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center gap-3"
            >
              <span className="h-px w-12 bg-primary/60" />
              <span className="text-xs tracking-[0.3em] text-primary uppercase">
                Naughty Dog · 2013
              </span>
              <span className="h-px w-12 bg-primary/60" />
            </motion.div>

            {/* Título principal com efeito sparkles */}
            <div className="relative flex flex-col items-center">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.8, ease: "easeOut" }}
                className="text-6xl md:text-[8rem] leading-none tracking-tight text-foreground relative z-10"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                THE LAST
                <br />
                <span className="text-primary">OF US</span>
              </motion.h1>

              {/* Sparkles emanando do título */}
              <div className="w-full max-w-2xl h-24 relative -mt-3">
                {/* Linha brilhante no topo — cria a "borda" do título */}
                <div className="absolute left-1/2 -translate-x-1/2 top-0 w-3/4 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
                <div className="absolute left-1/2 -translate-x-1/2 top-0 w-3/4 h-[3px] blur-sm bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

                <SparklesCore
                  id="hero-sparkles"
                  background="transparent"
                  minSize={0.3}
                  maxSize={1.2}
                  particleDensity={300}
                  className="w-full h-full"
                  particleColor="#D4A853"
                  speed={1.5}
                />

                {/* Máscara: faz os sparkles fadearem para baixo */}
                <div
                  className="absolute inset-0 bg-background"
                  style={{
                    maskImage:
                      "radial-gradient(420px 160px at top, transparent 20%, white 85%)",
                    WebkitMaskImage:
                      "radial-gradient(420px 160px at top, transparent 20%, white 85%)",
                  }}
                />
              </div>
            </div>

            {/* Subtítulo */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="max-w-lg text-center text-base text-muted leading-relaxed tracking-wide"
            >
              Vinte anos após uma praga fúngica reformular a civilização,
              um contrabandista endurecido escolta uma adolescente imune pelas ruínas da América.
            </motion.p>

            {/* Botões */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.6 }}
              className="flex items-center gap-4"
            >
              <a
                href="#story"
                className="px-6 py-3 rounded-lg bg-primary text-background text-sm font-semibold tracking-wider uppercase hover:bg-primary-dark transition-colors duration-200 cursor-pointer"
              >
                Explorar a História
              </a>
              <a
                href="#characters"
                className="px-6 py-3 rounded-lg border border-border text-muted text-sm tracking-wider uppercase hover:border-primary/50 hover:text-primary transition-all duration-200 cursor-pointer"
              >
                Ver Personagens
              </a>
            </motion.div>
          </div>
        }
      >
        {/* Conteúdo do card 3D — imagem da Ellie */}
        <div className="relative w-full h-full bg-[#0A0A08] overflow-hidden rounded-xl">
          {/* Vídeo de fundo — atmosfera por trás da Ellie */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: 1.0 }}
          >
            <source src="/videos/background.mp4" type="video/mp4" />
          </video>
          <Image
            src="/images/ellie.png"
            alt="Ellie — The Last of Us"
            fill
            className="object-contain object-center"
            priority
            sizes="(max-width: 768px) 100vw, 80vw"
          />
          {/* Gradiente inferior */}
          <div
            className="absolute inset-x-0 bottom-0 h-1/3"
            style={{
              background: "linear-gradient(to top, #0A0A08 0%, transparent 100%)",
            }}
          />
          {/* Texto sobreposto */}
          <div className="absolute bottom-6 left-6 right-6">
            <p className="text-xs tracking-[0.2em] text-primary/80 uppercase mb-1">
              Ellie — Protagonista Principal
            </p>
            <p className="text-foreground/60 text-xs leading-relaxed max-w-xs">
              Imune à infecção Cordyceps. A última esperança do mundo.
            </p>
          </div>
        </div>
      </ContainerScroll>

      {/* Indicador de rolagem */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted"
      >
        <span className="text-xs tracking-[0.2em] uppercase">Rolar</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
