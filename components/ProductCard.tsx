import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/api";
import type { Product } from "@/types/product";
import FavoriteButton from "./FavoriteButton";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:shadow-md"
    >
      <div className="absolute right-3 top-3 z-10">
        <FavoriteButton product={product} />
      </div>

      <div className="relative aspect-square bg-slate-50">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-contain p-4 transition group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <span className="text-xs uppercase tracking-wide text-slate-500">{product.category}</span>
        <h2 className="line-clamp-2 font-semibold leading-snug">{product.title}</h2>
        <p className="mt-auto pt-2 text-lg font-bold">{formatPrice(product.price)}</p>
        <div className="flex justify-between text-sm text-slate-600">
          <span>⭐ {product.rating.toFixed(1)}</span>
          <span className={product.stock < 10 ? "text-red-600" : ""}>Estoque: {product.stock}</span>
        </div>
      </div>
    </Link>
  );
}
