import { NextResponse } from "next/server";

export interface GameData {
  name: string;
  metacritic: number | null;
  rating: number;
  rating_top: number;
  playtime: number;
  platforms: string[];
  genres: string[];
}

export async function GET() {
  const key = process.env.RAWG_API_KEY;

  if (!key) {
    return NextResponse.json(
      { error: "RAWG_API_KEY não configurada" },
      { status: 500 }
    );
  }

  const res = await fetch(
    `https://api.rawg.io/api/games/the-last-of-us?key=${key}`,
    { next: { revalidate: 3600 } } // cache por 1 hora
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Erro ao buscar dados da RAWG" },
      { status: res.status }
    );
  }

  const raw = await res.json();

  const data: GameData = {
    name: raw.name,
    metacritic: raw.metacritic ?? null,
    rating: raw.rating,
    rating_top: raw.rating_top,
    playtime: raw.playtime,
    platforms: raw.platforms?.map((p: { platform: { name: string } }) => p.platform.name) ?? [],
    genres: raw.genres?.map((g: { name: string }) => g.name) ?? [],
  };

  return NextResponse.json(data);
}
