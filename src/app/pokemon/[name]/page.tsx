import { getPokemonDetail } from "@/lib/api";
import { NameCapitalise } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";


interface Props {
  params: Promise<{ name: string }>;
}
export default async function PokemonDetailPage({ params }: Props) {
  const { name }= await params;
  const pokemon =await getPokemonDetail(name);
  return (
    <main className="p-6 max-w-xl mx-auto">
      <Link
        href="/"
        className="text-blue-500 hover:underline mb-4 inline-block">
        ← Back to list
      </Link>
      <h1 className="text-3xl font-bold mb-2">
        {NameCapitalise(pokemon.name)}
      </h1>
      <p className="text-gray-400 mb-4">
        #{String(pokemon.id).padStart(3, "0")}
      </p>

      <Image
        src={pokemon.sprites.other["official-artwork"].front_default ?? ""}
        alt={pokemon.name}
        width={256}
        height={256}
        unoptimized
        className="mx-auto"
      />
      <div className="flex gap-2 mt-4">
        {pokemon.types.map((t) => (
          <span
            key={t.type.name}
            className="rounded-full bg-gray-800 px-3 py-1 text-sm"
          >
            {NameCapitalise(t.type.name)}
          </span>
        ))}
      </div>

      <ul className="mt-6 space-y-2">
        {pokemon.stats.map((s) => (
          <li key={s.stat.name} className="flex justify-between">
            <span className="capitalize text-gray-300">{s.stat.name}</span>
            <span className="font-semibold">{s.base_stat}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <p className="text-white mb-1">Abilities</p>
        <div className="flex gap-2 flex-wrap">
          {pokemon.abilities.map((a) => (
            <span
              key={a.ability.name}
              className="rounded-full bg-gray-800 px-3 py-1 text-sm"
            >
              {NameCapitalise(a.ability.name)}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-6 flex gap-8">
        <div>
          <p className="text-gray-500 text-sm">Height</p>
          <p className="font-semibold">{pokemon.height / 10} m</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Weight</p>
          <p className="font-semibold">{pokemon.weight / 10} kg</p>
        </div>
      </div>
    </main>
  );
}
