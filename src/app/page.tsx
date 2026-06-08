"use client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getPokemonIndex } from "@/lib/api";
import PokemonGrid from "@/components/PokemonGrid";
import { getVisiblePokemon } from "@/lib/filterPipline";
import { getTypeList } from "@/lib/api";
import { getPokemonByType } from "@/lib/api";
import { useFavorites } from "@/hooks/useFavourites";

const PAGE_SIZE = 20;
export default function Home() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    setCurrentPage(0);}, [selectedType]
  );
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(0); 
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["pokemon-index"],
    queryFn: getPokemonIndex,
  });

  const { data: typeListData } = useQuery({
    queryKey: ["type-list"],
    queryFn: getTypeList,
  });

  const { data: typeData } = useQuery({
    queryKey: ["type", selectedType],
    queryFn: () => getPokemonByType(selectedType),
    enabled: !!selectedType, // only fetch when a type is chosen
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
    const typeNameSet = new Set(
      typeData?.pokemon.map((p) => p.pokemon.name) ?? [],
    );


  const { pageItems, total } = getVisiblePokemon({
    index: data.results,
    selectedType: selectedType,
    typeNameSet: typeNameSet,
    searchTerm: debouncedSearch,
    page: currentPage,
    pageSize: PAGE_SIZE,
  });

  const totalPages = Math.ceil(total / PAGE_SIZE);
  return (
    <main className="p-6">
      <h1 className="mb-6 text-3xl text-center font-bold">Pokédex Lite</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search Pokémon..."
        className="mb-6 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
        className="mb-6 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">All Types</option>
        {typeListData?.results.map((t) => (
          <option key={t.name} value={t.name}>
            {t.name.charAt(0).toUpperCase() + t.name.slice(1)}
          </option>
        ))}
      </select>

      {pageItems.length === 0 ? (
        <p className="text-center text-gray-200 mt-12">No Pokémon found :(</p>
      ) : (
        <PokemonGrid
          pokemon={pageItems}
          onCardClick={(name) => router.push(`/pokemon/${name}`)}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
        />
      )}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 0}
          className="rounded px-4 py-2 bg-red-600 disabled:opacity-40 "
        >
          Previous
        </button>
        <span>
          Page{currentPage + 1} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage >= totalPages - 1}
          className="rounded px-4 py-2 bg-red-600 disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </main>
  );
}
