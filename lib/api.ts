import type { ProductDetails, ProductsResponse } from "@/types/product";

export const API_URL = "https://dummyjson.com/products";
export const PAGE_LIMIT = 15;

// Pede só os campos da listagem: resposta menor e mais rápida
const LIST_FIELDS = "id,title,thumbnail,category,price,rating,stock";

/** Lista inicial (query vazia) ou busca por texto. Sempre no máximo 15. */
export async function fetchProducts(
  query = "",
  signal?: AbortSignal,
): Promise<ProductsResponse> {
  const q = query.trim();
  const url = q
    ? `${API_URL}/search?q=${encodeURIComponent(q)}&limit=${PAGE_LIMIT}&select=${LIST_FIELDS}`
    : `${API_URL}?limit=${PAGE_LIMIT}&select=${LIST_FIELDS}`;

  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`Erro ${res.status} ao buscar produtos`);
  return res.json();
}

/** Produto completo. Retorna null se o id não existir. */
export async function fetchProductById(id: string): Promise<ProductDetails | null> {
  const res = await fetch(`${API_URL}/${encodeURIComponent(id)}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Erro ${res.status} ao buscar o produto`);
  return res.json();
}

export const formatPrice = (value: number) =>
  value.toLocaleString("en-US", { style: "currency", currency: "USD" });
