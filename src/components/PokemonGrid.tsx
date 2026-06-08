import { PokemonListItem } from "@/lib/types";
import PokemonCard from "./PokemonCard";

interface PokemonGridProps {
  pokemon: PokemonListItem[];
  onCardClick: (name: string) => void;
}

export default function PokemonGrid({
  pokemon,
  onCardClick,
}: PokemonGridProps) {
  return (
    
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {pokemon.map((p) => (
        <PokemonCard key={p.name} pokemon={p} onClick={onCardClick} />
      ))}
    </div>
  );
}
