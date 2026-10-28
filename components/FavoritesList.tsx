"use client";

import Link from "next/link";
import { useFavorites } from "@/hooks/useFavorites";
import ProductGrid from "./ProductGrid";
import { EmptyState } from "./States";

export default function FavoritesList() {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <EmptyState message="Você ainda não favoritou nenhum produto.">
        <Link href="/products" className="mt-3 inline-block text-sm text-brand-dark underline">
          Ver produtos
        </Link>
      </EmptyState>
    );
  }

  return <ProductGrid products={favorites} />;
}
