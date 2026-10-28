import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-3xl">🛍️</p>
        <h1 className="mt-2 text-2xl font-bold">Entrar</h1>
        <p className="mb-6 text-sm text-slate-500">Acesse para ver os produtos e seus favoritos.</p>
        <LoginForm />
      </div>
    </main>
  );
}
