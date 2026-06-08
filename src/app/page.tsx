"use client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getPokemonIndex } from "@/lib/api";
import PokemonGrid from "@/components/PokemonGrid";
import { getVisiblePokemon } from "@/lib/filterPipline";

const PAGE_SIZE = 20;
export default function Home() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
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

  const { pageItems, total } = getVisiblePokemon({
    index: data.results,
    selectedType: "",
    typeNameSet: new Set(),
    searchTerm: "",
    page: currentPage,
    pageSize: PAGE_SIZE,
  });

  const totalPages = Math.ceil(total / PAGE_SIZE);
  return(
    <main className="p-6">
      <h1 className="mb-6 text-3xl text-center font-bold">Pokédex Lite</h1>
      <PokemonGrid
        pokemon={pageItems}
        onCardClick={(name) => router.push(`/pokemon/${name}`)}/>
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 0}
          className="rounded px-4 py-2 bg-red-600 disabled:opacity-40">
          Previous
        </button>
        <span>
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage >= totalPages - 1}
          className="rounded px-4 py-2 bg-red-600 disabled:opacity-40">
          Next
        </button>
      </div>
    </main>
  );
}
