"use client";
import { useQuery } from "@tanstack/react-query";
import { getPokemonIndex } from "@/lib/api";
export default function Home() {
  const {data, isPending, isError, error} =useQuery({
    queryKey: ["pokemon"],
    queryFn: getPokemonIndex,
  });

  if(isPending) {
    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold">Pokédex Lite</h1>
        <p className="mt-4">Loading Pokémon...</p>
      </main>
    );
  }
  if (isError) {
    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold">Pokédex Lite</h1>
        <p className="mt-4 text-red-500">Error: {error.message}</p>
      </main>
    );
  }
  return (
    <main className="p-6">
      <h1 className="mb-6 text-3xl font-bold">Pokédex Lite</h1>
      <ul className="space-y-2">
        {data.results.map((pokemon) => (
          <li
            key={pokemon.name}
            className="rounded border p-3 hover:bg-gray-100"
          >
            {pokemon.name}
          </li>
        ))}
      </ul>
    </main>
  );
}
