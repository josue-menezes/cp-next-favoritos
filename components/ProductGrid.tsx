import type { Product } from "@/types/product";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {products.map((product) => (
        <li key={product.id} className="flex">
          <div className="w-full">
            <ProductCard product={product} />
          </div>
        </li>
      ))}
    </ul>
  );
}
