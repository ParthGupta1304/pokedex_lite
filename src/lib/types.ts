export interface PokemonListItem {
  name: string;
  url: string;
}
export interface PokemonIndexResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}
export interface PokemonType {
  slot: number;
  type:{
    name: string;
    url: string;
};
}
export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
    url: string;
};
}
export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
};
  is_hidden: boolean;
}
export interface PokemonSprites{
  front_default: string | null;

  other: {
    "official-artwork":{
      front_default: string | null;
};
  };
}
export interface PokemonDetail {
  id: number;
  name: string;

  height: number;
  weight: number;

  sprites: PokemonSprites;

  types: PokemonType[];

  stats: PokemonStat[];

  abilities: PokemonAbility[];
}
export interface PokemonTypeListResponse {
  results:{
    name: string;
    url: string;
  }[];
}

export interface PokemonByTypeResponse {
  pokemon: {
    pokemon:{
      name: string;
      url: string;
    };
}[];
}
export type Favorites = string[];
