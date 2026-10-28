import Link from "next/link";
import LogoutButton from "./LogoutButton";
import NavLinks from "./NavLinks";

export default function Header({ user }: { user: string | null }) {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/products" className="text-lg font-bold">
          🛍️ <span className="hidden sm:inline">Loja</span>
        </Link>
        <NavLinks />
        <div className="flex items-center gap-3">
          {user && <span className="hidden text-sm text-slate-500 sm:inline">Olá, {user}</span>}
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
