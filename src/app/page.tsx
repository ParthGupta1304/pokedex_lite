"use client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getPokemonIndex } from "@/lib/api";
import PokemonGrid from "@/components/PokemonGrid";

export default function Home() {
  const router = useRouter();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["pokemon-index"],
    queryFn: getPokemonIndex,
  });

  if (isPending)
    return (
      <main className="p-6">
        <p>Loading Pokémon...</p>
      </main>
    );
  if (isError)
    return (
      <main className="p-6">
        <p className="text-red-500">Error: {error.message}</p>
      </main>
    );

  return (
    <main className="p-6">
      <h1 className="mb-6 text-3xl text-center font-bold">Pokédex Lite</h1>
      <PokemonGrid
        pokemon={data.results.slice(0, 20)}
        onCardClick={(name) => router.push(`/pokemon/${name}`)}
      />
    </main>
  );
}
