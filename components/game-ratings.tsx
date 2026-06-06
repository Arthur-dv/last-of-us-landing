import type { GameData } from "@/app/api/game/route";

async function fetchGameData(): Promise<GameData | null> {
  const key = process.env.RAWG_API_KEY;
  if (!key) return null;

  try {
    const res = await fetch(
      `https://api.rawg.io/api/games/the-last-of-us?key=${key}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;

    const raw = await res.json();
    return {
      name: raw.name,
      metacritic: raw.metacritic ?? null,
      rating: raw.rating,
      rating_top: raw.rating_top,
      playtime: raw.playtime,
      platforms: raw.platforms?.map((p: { platform: { name: string } }) => p.platform.name) ?? [],
      genres: raw.genres?.map((g: { name: string }) => g.name) ?? [],
    };
  } catch {
    return null;
  }
}

export default async function GameRatings() {
  const data = await fetchGameData();

  // Fallback estático quando a API key não está configurada
  const metacritic = data?.metacritic ?? 95;
  const rating = data?.rating ?? 4.6;
  const playtime = data?.playtime ?? 15;
  const platforms = data?.platforms ?? ["PlayStation 3", "PlayStation 4", "PC"];
  const isLive = !!data;

  return (
    <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-4">
      {/* Header com badge de fonte */}
      <div className="flex items-center justify-between">
        <p className="text-xs tracking-[0.2em] text-primary uppercase">
          Avaliações
        </p>
        <span
          className="text-[10px] px-2 py-0.5 rounded-full border tracking-wide"
          style={{
            color: isLive ? "#3D6B32" : "#6B6358",
            borderColor: isLive ? "#3D6B3244" : "#2A2A20",
            background: isLive ? "#3D6B3210" : "transparent",
          }}
        >
          {isLive ? "● RAWG API" : "● dados estáticos"}
        </span>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-3 gap-3">
        {/* Metacritic */}
        <div className="flex flex-col gap-1">
          <p
            className="text-2xl leading-none"
            style={{
              fontFamily: "var(--font-heading)",
              color: metacritic >= 90 ? "#3D6B32" : metacritic >= 75 ? "#D4A853" : "#8B1A1A",
            }}
          >
            {metacritic}
          </p>
          <p className="text-[10px] text-muted tracking-wide">Metacritic</p>
        </div>

        {/* RAWG Rating */}
        <div className="flex flex-col gap-1">
          <p
            className="text-2xl leading-none text-primary"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {rating.toFixed(1)}
            <span className="text-sm text-muted font-sans">/5</span>
          </p>
          <p className="text-[10px] text-muted tracking-wide">Rating</p>
        </div>

        {/* Playtime */}
        <div className="flex flex-col gap-1">
          <p
            className="text-2xl leading-none text-foreground"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {playtime}
            <span className="text-sm text-muted font-sans">h</span>
          </p>
          <p className="text-[10px] text-muted tracking-wide">Gameplay</p>
        </div>
      </div>

      {/* Plataformas */}
      <div className="flex flex-wrap gap-1.5">
        {platforms.slice(0, 4).map((platform) => (
          <span
            key={platform}
            className="text-[10px] px-2 py-0.5 rounded-full border border-border text-muted tracking-wide"
          >
            {platform}
          </span>
        ))}
      </div>
    </div>
  );
}
