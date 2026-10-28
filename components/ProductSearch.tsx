"use client";

import { useEffect, useRef, useState } from "react";
import { fetchProducts } from "@/lib/api";
import type { Product } from "@/types/product";
import ProductGrid from "./ProductGrid";
import { EmptyState, ErrorState, GridSkeleton } from "./States";

interface Props {
  initialProducts: Product[];
  initialError: boolean;
}

export default function ProductSearch({ initialProducts, initialError }: Props) {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(initialError);
  const [retry, setRetry] = useState(0); // incrementar = refazer a busca
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Primeira renderização: a lista inicial já veio do servidor, não precisa buscar de novo
    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (!initialError) return;
    }

    const controller = new AbortController(); // cancela a requisição antiga se o usuário continuar digitando

    // Debounce: espera 400ms sem digitar antes de chamar a API
    const timer = setTimeout(async () => {
      setLoading(true);
      setError(false);
      try {
        const data = await fetchProducts(query, controller.signal);
        setProducts(data.products);
      } catch (err) {
        if ((err as Error).name !== "AbortError") setError(true);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 400);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, retry, initialError]);

  function renderContent() {
    if (loading) return <GridSkeleton />;
    if (error)
      return (
        <ErrorState
          message="Não foi possível carregar os produtos. Verifique sua conexão."
          onRetry={() => setRetry((n) => n + 1)}
        />
      );
    if (products.length === 0)
      return (
        <EmptyState message={`Nenhum produto encontrado para "${query}".`}>
          <button onClick={() => setQuery("")} className="mt-3 text-sm text-brand-dark underline">
            Limpar busca
          </button>
        </EmptyState>
      );
    return <ProductGrid products={products} />;
  }

  return (
    <section>
      <div className="relative mb-6">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔎</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar produtos (ex: phone, laptop, perfume)..."
          aria-label="Buscar produtos"
          className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
        />
      </div>
      {renderContent()}
    </section>
  );
}
