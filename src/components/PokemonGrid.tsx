import { PokemonListItem } from "@/lib/types";
import PokemonCard from "./PokemonCard";
import { useFavorites } from "@/hooks/useFavourites";
interface PokemonGridProps {
  pokemon: PokemonListItem[];
  onCardClick: (name: string) => void;
  isFavorite: (name: string) => boolean;
  onToggleFavorite: (name: string) => void;
}

export default function PokemonGrid({
  pokemon,
  onCardClick,
  isFavorite,
  onToggleFavorite,
}: PokemonGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {pokemon.map((p) => (
        <PokemonCard
          key={p.name}
          pokemon={p}
          onClick={onCardClick}
          isFavorite={isFavorite(p.name)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}
