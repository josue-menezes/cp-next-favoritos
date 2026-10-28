import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-16 text-center">
      <p className="text-4xl">🔍</p>
      <h1 className="mt-2 text-xl font-bold">Produto não encontrado</h1>
      <Link href="/products" className="mt-4 inline-block text-brand-dark underline">
        Voltar para produtos
      </Link>
    </div>
  );
}
