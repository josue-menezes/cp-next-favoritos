import ProductSearch from "@/components/ProductSearch";
import { fetchProducts } from "@/lib/api";
import type { Product } from "@/types/product";

export default async function ProductsPage() {
  // Lista inicial buscada no servidor (GET na DummyJSON, limit=15)
  let initialProducts: Product[] = [];
  let initialError = false;

  try {
    const data = await fetchProducts();
    initialProducts = data.products;
  } catch (error) {
    console.error(error);
    initialError = true;
  }

  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">Produtos</h1>
      <ProductSearch initialProducts={initialProducts} initialError={initialError} />
    </>
  );
}
