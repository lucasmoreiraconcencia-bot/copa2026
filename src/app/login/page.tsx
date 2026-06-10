import { redirect } from "next/navigation";
import { getProfile } from "@/lib/auth";
import { LoginButton } from "@/components/LoginButton";
import { HeroPlayers } from "@/components/HeroPlayers";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { removido?: string; erro?: string };
}) {
  const profile = await getProfile();
  if (profile) redirect("/ranking");

  return (
    <main className="relative min-h-dvh flex flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div className="card-classic relative z-10 w-full max-w-md p-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-26.png"
          alt="FIFA World Cup 2026"
          className="mx-auto mb-4 h-44 w-auto drop-shadow-[0_4px_18px_rgba(242,193,78,0.3)]"
        />

        <p className="divider-gold text-[11px] font-semibold uppercase tracking-[0.35em]">
          Copa do Mundo
        </p>
        <h1 className="mt-1 font-display text-4xl font-extrabold text-copa-cream">
          Bolão Copa 2026
        </h1>
        <p className="mt-1 text-[11px] uppercase tracking-[0.3em] text-copa-gold/70">
          ★ Canadá · Estados Unidos · México ★
        </p>

        <p className="mt-5 text-white/60">
          Entre com sua conta Google para palpitar e disputar com a galera.
        </p>

        {searchParams.removido && (
          <p className="mt-4 rounded-lg bg-red-500/15 border border-red-400/30 px-3 py-2 text-sm text-red-200">
            Seu acesso foi removido pelo administrador.
          </p>
        )}
        {searchParams.erro && (
          <p className="mt-4 rounded-lg bg-red-500/15 border border-red-400/30 px-3 py-2 text-sm text-red-200">
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

      {/* lances clássicos: a bicicleta, a taça e o drible */}
      <HeroPlayers className="pointer-events-none absolute inset-x-0 bottom-4 z-0 mx-auto w-full max-w-2xl text-copa-gold/35" />
    </main>
  );
}
