import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import FavoriteButton from "@/components/FavoriteButton";
import { ErrorState } from "@/components/States";
import { fetchProductById, formatPrice } from "@/lib/api";
import type { ProductDetails } from "@/types/product";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // no Next 15+ params é uma Promise

  let product: ProductDetails | null;
  try {
    product = await fetchProductById(id);
  } catch (error) {
    console.error(error);
    return <ErrorState message="Não foi possível carregar este produto." />;
  }

  if (!product) notFound();

  const finalPrice = product.price * (1 - product.discountPercentage / 100);

  const infos = [
    ["Marca", product.brand ?? "—"],
    ["Categoria", product.category],
    ["Estoque", `${product.stock} un. (${product.availabilityStatus})`],
    ["Garantia", product.warrantyInformation],
    ["Envio", product.shippingInformation],
    ["Devolução", product.returnPolicy],
    ["Pedido mínimo", `${product.minimumOrderQuantity} un.`],
  ];

  return (
    <article>
      <Link href="/products" className="text-sm text-slate-500 hover:text-slate-900">
        ← Voltar para produtos
      </Link>

      <div className="mt-4 grid gap-8 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <Image
            src={product.images[0] ?? product.thumbnail}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain p-6"
            priority
          />
        </div>

        <div>
          <p className="text-sm uppercase tracking-wide text-slate-500">{product.category}</p>
          <h1 className="mt-1 text-3xl font-bold">{product.title}</h1>
          <p className="mt-2 text-sm">⭐ {product.rating.toFixed(1)}</p>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-bold">{formatPrice(finalPrice)}</span>
            {product.discountPercentage > 0 && (
              <>
                <span className="text-slate-400 line-through">{formatPrice(product.price)}</span>
                <span className="rounded bg-green-100 px-2 py-0.5 text-sm font-medium text-green-700">
                  -{product.discountPercentage.toFixed(0)}%
                </span>
              </>
            )}
          </div>

          <p className="mt-4 text-slate-700">{product.description}</p>

          <div className="mt-6">
            <FavoriteButton product={product} variant="full" />
          </div>

          <dl className="mt-6 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
            {infos.map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4 px-4 py-2 text-sm">
                <dt className="text-slate-500">{label}</dt>
                <dd className="text-right font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {product.reviews.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-3 text-xl font-bold">Avaliações</h2>
          <ul className="grid gap-3 sm:grid-cols-3">
            {product.reviews.map((review, i) => (
              <li key={i} className="rounded-xl border border-slate-200 bg-white p-4 text-sm">
                <p className="font-medium">{"⭐".repeat(review.rating)}</p>
                <p className="mt-1">{review.comment}</p>
                <p className="mt-2 text-slate-500">— {review.reviewerName}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
