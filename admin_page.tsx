import Link from "next/link";
import { Users, Pencil } from "lucide-react";
import { getGroups, getRoundLocks, getProfiles, getMatches, getTeams } from "@/lib/data";
import { isLocked, formatDeadline } from "@/lib/deadlines";
import { ROUND_LABELS } from "@/lib/scoring";
import { AdminTools } from "@/components/admin/AdminTools";
import { LockToggle } from "@/components/admin/LockToggle";
import { MatchLockToggle } from "@/components/admin/MatchLockToggle";
import { PageHeader } from "@/components/PageHeader";
import type { RoundCode } from "@/lib/types";

export const dynamic = "force-dynamic";

const KO_ROUNDS: Exclude<RoundCode, "group">[] = [
  "r32", "r16", "qf", "sf", "third", "final",
];

export default async function AdminPage() {
  const [groups, locks, profiles, matches, teams] = await Promise.all([
    getGroups(),
    getRoundLocks(),
    getProfiles(),
    getMatches(),
    getTeams(),
  ]);

  const active = profiles.filter((p) => p.is_active);
  const paid = active.filter((p) => p.is_paid);
  const teamMap = new Map(teams.map((t) => [t.id, t]));
  const now = new Date();

  const koMatches = matches.filter((m) => m.round !== "group");
  const byRound = new Map<RoundCode, typeof koMatches>();
  for (const m of koMatches) {
    byRound.set(m.round, [...(byRound.get(m.round) ?? []), m]);
  }

  return (
    <div className="space-y-5">
      <PageHeader title="Administração" />

      <div className="grid grid-cols-3 gap-3">
        <Stat label="Participantes" value={active.length} />
        <Stat label="Pagos" value={paid.length} />
        <Stat label="Pendentes" value={active.length - paid.length} />
      </div>

      <AdminTools />

      <div className="grid gap-3 sm:grid-cols-2">
        <Link href="/admin/participantes" className="card p-4 hover:bg-white/10">
          <h2 className="flex items-center gap-2 font-bold text-white">
            <Users size={18} strokeWidth={1.8} className="text-copa-gold" />
            Participantes
          </h2>
          <p className="mt-1 text-sm text-white/60">Pagamento, convites e remoção.</p>
        </Link>
        <Link href="/admin/resultados" className="card p-4 hover:bg-white/10">
          <h2 className="flex items-center gap-2 font-bold text-white">
            <Pencil size={18} strokeWidth={1.8} className="text-copa-gold" />
            Corrigir resultados
          </h2>
          <p className="mt-1 text-sm text-white/60">Ajuste manual (fallback da API).</p>
        </Link>
      </div>

      {/* Travas de grupos */}
      <div className="card p-4">
        <h2 className="mb-3 font-bold text-white">Travas — Fase de Grupos</h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {groups.map((g) => (
            <LockToggle
              key={g.letter}
              kind="group"
              id={g.letter}
              locked={isLocked(g.deadline, g.is_locked)}
              label={`Grupo ${g.letter}`}
            />
          ))}
        </div>
        <p className="mt-2 text-xs text-white/40">
          Grupos fecham automaticamente no horário do 1º jogo. Use os botões para fechar/abrir manualmente.
        </p>
      </div>

      {/* Travas individuais por jogo — Mata-mata */}
      <div className="card p-4">
        <h2 className="mb-1 font-bold text-white">Travas — Mata-mata (por jogo)</h2>
        <p className="mb-3 text-xs text-white/40">
          Cada jogo fecha automaticamente quando começa. Use os botões para fechar/abrir antes disso.
        </p>

        <div className="space-y-4">
          {KO_ROUNDS.map((round) => {
            const ms = (byRound.get(round) ?? []).sort((a, b) =>
              (a.kickoff ?? "").localeCompare(b.kickoff ?? ""),
            );
            if (ms.length === 0) return null;

            const roundLock = locks.find((l) => l.round === round);
            const roundAdminLocked = roundLock?.is_locked ?? false;

            return (
              <div key={round}>
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-sm font-semibold text-white/70">{ROUND_LABELS[round]}</p>
                  {/* Fechar/abrir rodada inteira */}
                  <LockToggle
                    kind="round"
                    id={round}
                    locked={roundAdminLocked}
                    label="Fechar tudo"
                  />
                </div>
                <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                  {ms.map((m, i) => {
                    const home = m.home_team_id ? teamMap.get(m.home_team_id) : null;
                    const away = m.away_team_id ? teamMap.get(m.away_team_id) : null;
                    const kickoffPassed = m.kickoff ? new Date(m.kickoff) <= now : false;
                    const label = home && away
                      ? `${home.name} × ${away.name}`
                      : `Jogo ${i + 1}${m.kickoff ? ` — ${new Date(m.kickoff).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo", day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}` : ""}`;

                    return (
                      <MatchLockToggle
                        key={m.id}
                        matchId={m.id}
                        label={label}
                        isLocked={m.is_locked || roundAdminLocked}
                        kickoffPassed={kickoffPassed}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="card-accent p-3 text-center">
      <div className="font-display text-3xl font-extrabold text-copa-gold">{value}</div>
      <div className="text-xs text-white/50">{label}</div>
    </div>
  );
}
