import { useState, useEffect } from "react";

const STORAGE_KEY ="pokedex-favorites";

export function useFavorites() {
  const [favorites, setFavorites]= useState<string[]>([]);
  useEffect(() => {
    try{
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setFavorites(JSON.parse(stored));
    } catch {
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);
  function toggleFavorite(name: string) {
    setFavorites((prev)=>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name],
    );
  }
  function isFavorite(name: string): boolean {
    return favorites.includes(name);
  }
  return { favorites, toggleFavorite, isFavorite };
}
