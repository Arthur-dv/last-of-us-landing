import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import GameSummary from "@/components/game-summary";
import GameRatings from "@/components/game-ratings";
import CharacterCarousel from "@/components/character-carousel";
import EnemiesSection from "@/components/enemies-section";
import VideoBackground from "@/components/video-background";
import { SpotlightCursor } from "@/components/ui/spotlight-cursor";

export default function Home() {
  return (
    <>
      <SpotlightCursor />
      <VideoBackground />
      <Navbar />
      <main>
        <HeroSection />
        <GameSummary ratingsSlot={<GameRatings />} />
        <CharacterCarousel />
        <EnemiesSection />
        <footer className="relative py-12 border-t border-border bg-background">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p
              className="text-lg tracking-widest text-primary uppercase"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              The Last of Us
            </p>
            <p className="text-xs text-muted">
              Fan-made tribute · Naughty Dog © 2013–2025
            </p>
            <p className="text-xs text-muted">
              &quot;Quando estiver perdido na escuridão, procure a luz.&quot;
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
