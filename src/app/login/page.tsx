import { redirect } from "next/navigation";
import { getProfile } from "@/lib/auth";
import { LoginButton } from "@/components/LoginButton";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { removido?: string; erro?: string };
}) {
  const profile = await getProfile();
  if (profile) redirect("/ranking");

  return (
    <main className="min-h-dvh flex flex-col items-center justify-center px-6 text-center">
      <div className="card w-full max-w-md p-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-26.png"
          alt="FIFA World Cup 2026"
          className="mx-auto mb-6 h-44 w-auto"
        />

        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          Bolão Copa 2026
        </h1>
        <p className="mt-1 text-xs font-medium uppercase tracking-[0.25em] text-white/40">
          Canadá · Estados Unidos · México
        </p>

        <p className="mt-5 text-sm text-white/60">
          Entre com sua conta Google para palpitar e disputar com a galera.
        </p>

        {searchParams.removido && (
          <p className="mt-4 rounded-xl bg-red-400/15 px-3 py-2 text-sm text-red-400">
            Seu acesso foi removido pelo administrador.
          </p>
        )}
        {searchParams.erro && (
          <p className="mt-4 rounded-xl bg-red-400/15 px-3 py-2 text-sm text-red-400">
            Não foi possível entrar. Tente novamente.
          </p>
        )}

        <div className="mt-6">
          <LoginButton />
        </div>

        <p className="mt-6 text-xs text-white/40">
          Acesso restrito aos participantes convidados.
        </p>
      </div>
    </main>
  );
}
