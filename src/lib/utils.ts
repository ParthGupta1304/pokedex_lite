export function extractPokemonId(url: string): string {
  return url.split("/").filter(Boolean).pop() || "";
}
export function getPokemonImageUrl(id: string): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export function NameCapitalise(name: string): string{

    if(!name || ""){
        return "";

    }
    return name.charAt(0).toUpperCase()+ name.slice(1);
}
export function formatPokemonNumber(id: number): string {
  return id.toString().padStart(3, "0");
}
