"use client";

import { useFavorites } from "@/hooks/useFavorites";
import type { Product } from "@/types/product";

interface Props {
  product: Product;
  variant?: "icon" | "full";
}

export default function FavoriteButton({ product, variant = "icon" }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(product.id);
  const label = active ? "Remover dos favoritos" : "Adicionar aos favoritos";

  if (variant === "full") {
    return (
      <button
        onClick={() => toggleFavorite(product)}
        aria-pressed={active}
        className={`w-full rounded-lg px-4 py-3 font-semibold transition sm:w-auto ${
          active
            ? "bg-red-50 text-red-600 ring-1 ring-red-200 hover:bg-red-100"
            : "bg-brand text-white hover:bg-brand-dark"
        }`}
      >
        {active ? "♥ Favoritado" : "♡ Favoritar"}
      </button>
    );
  }

  return (
    <button
      onClick={(e) => {
        e.preventDefault(); // o card é um link: não navegar ao clicar no coração
        toggleFavorite(product);
      }}
      aria-pressed={active}
      aria-label={label}
      title={label}
      className={`flex h-9 w-9 items-center justify-center rounded-full text-lg shadow transition ${
        active ? "bg-red-500 text-white" : "bg-white text-slate-400 hover:text-red-500"
      }`}
    >
      {active ? "♥" : "♡"}
    </button>
  );
}
