import {
  PokemonIndexResponse,
  PokemonDetail,
  PokemonTypeListResponse,
  PokemonByTypeResponse,
} from "./types";

const BASE_URL = "https://pokeapi.co/api/v2";

export async function getPokemonIndex(): Promise<PokemonIndexResponse> {
  const res = await fetch(`${BASE_URL}/pokemon?limit=5000&offset=0`);
  if (!res.ok) {
    throw new Error("Failed to fetch Pokemon index");
  }
  return res.json();
}
export async function getPokemonDetail(name: string): Promise<PokemonDetail> {
  const res = await fetch(`${BASE_URL}/pokemon/${name}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch${name}`);
  }
  return res.json();
}
export async function getTypeList(): Promise<PokemonTypeListResponse> {
  const res = await fetch(`${BASE_URL}/type`);
  if (!res.ok) {
    throw new Error("Failed to fetch types");
  }
  return res.json();
}
export async function getPokemonByType(
  type: string,
): Promise<PokemonByTypeResponse> {
  const res= await fetch(`${BASE_URL}/type/${type}`);

  if(!res.ok) {
    throw new Error(`Failed to fetch type: ${type}`);
  }
  return res.json();
}

