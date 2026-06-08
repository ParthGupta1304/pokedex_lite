import Image from "next/image";
import{
  extractPokemonId,
  getPokemonImageUrl,
  NameCapitalise,
} from "@/lib/utils";
import { PokemonListItem } from "@/lib/types";
interface PokemonCardProps {
  pokemon: PokemonListItem;
  onClick: (name: string) => void;
}
export default function PokemonCard({ pokemon, onClick }: PokemonCardProps) {
  const id= extractPokemonId(pokemon.url);
  const imageUrl =getPokemonImageUrl(id);
  return (
    <button
      onClick={() => onClick(pokemon.name)}
      className="flex flex-col items-center rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md w-full">
      <Image
        src={imageUrl}
        alt={pokemon.name}
        width={96}
        height={96}
        unoptimized
        className="h-24 w-24 object-contain"/>
      <p className="mt-2 text-s text-gray-600">#{id.padStart(3, "0")}</p>
      <p className="font-semibold text-black text-2xl">{NameCapitalise(pokemon.name)}</p>
    </button>
  );
}
