// "Store" dos favoritos no localStorage.
// Todos os componentes que usam useFavorites() são avisados quando a lista muda.
import type { Product } from "@/types/product";

export const FAVORITES_KEY = "favorites";
const EVENT = "favorites-change";

export function readFavoritesRaw(): string {
  try {
    return localStorage.getItem(FAVORITES_KEY) ?? "[]";
  } catch {
    return "[]";
  }
}

export function parseFavorites(raw: string): Product[] {
  try {
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function save(list: Product[]) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(list));
  window.dispatchEvent(new Event(EVENT));
}

export function toggleFavorite(product: Product) {
  const list = parseFavorites(readFavoritesRaw());
  const exists = list.some((p) => p.id === product.id);
  // Guarda só os campos da listagem (mesmo vindo da página de detalhes)
  const { id, title, thumbnail, category, price, rating, stock } = product;
  save(exists ? list.filter((p) => p.id !== id) : [...list, { id, title, thumbnail, category, price, rating, stock }]);
}

export function clearFavorites() {
  localStorage.removeItem(FAVORITES_KEY);
  window.dispatchEvent(new Event(EVENT));
}

export function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback); // outra aba alterou
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}
