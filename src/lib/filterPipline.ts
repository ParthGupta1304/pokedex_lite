import { PokemonListItem } from "./types";

interface FilterOptions {
  index: PokemonListItem[];
  selectedType: string;
  typeNameSet: Set<string>;
  searchTerm: string;
  page: number;
  pageSize: number;
}

interface FilterResult {
  pageItems: PokemonListItem[];
  total: number;
}

export function getVisiblePokemon(options: FilterOptions): FilterResult {
  const { index, selectedType, typeNameSet, searchTerm, page, pageSize } =
    options;

  let list = index;

  if (selectedType) {
    list = list.filter((p) => typeNameSet.has(p.name));
  }

  if (searchTerm) {
    list = list.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }

  const total = list.length;
  const start = page * pageSize;

  return {
    pageItems: list.slice(start, start + pageSize),
    total,
  };
}
