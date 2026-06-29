"use client";

import { useState, useTransition } from "react";
import { Lock, LockOpen } from "lucide-react";
import { overrideMatchWinner, lockMatch } from "@/lib/actions/admin";
import type { Team } from "@/lib/types";

export function MatchWinnerRow({
  matchId,
  label,
  home,
  away,
  currentWinner,
  isLocked,
  kickoff,
}: {
  matchId: string;
  label: string;
  home: Team | null;
  away: Team | null;
  currentWinner: string | null;
  isLocked: boolean;
  kickoff?: string | null;
}) {
  const [winner, setWinner] = useState(currentWinner ?? "");
  const [locked, setLocked] = useState(isLocked);
  const [saved, setSaved] = useState(false);
  const [pendingWinner, startWinner] = useTransition();
  const [pendingLock, startLock] = useTransition();

  function save() {
    setSaved(false);
    startWinner(async () => {
      await overrideMatchWinner(matchId, winner || null);
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    });
  }

  function toggleLock() {
    startLock(async () => {
      await lockMatch(matchId, !locked);
      setLocked((v) => !v);
    });
  }

  const kickoffPassed = kickoff ? new Date(kickoff) <= new Date() : false;
  const autoLocked = kickoffPassed && !locked;

  return (
    <div className="card p-3 text-sm space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <span className="min-w-0 flex-1 truncate text-white/70">
          <span className="text-white/40">{label}:</span>{" "}
          {home?.name ?? "?"} × {away?.name ?? "?"}
          {kickoff && (
            <span className="ml-2 text-xs text-white/30">
              {new Date(kickoff).toLocaleString("pt-BR", {
                timeZone: "America/Sao_Paulo",
                day: "2-digit",
                month: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          )}
        </span>

        {/* Botão fechar/abrir palpites */}
        <button
          onClick={toggleLock}
          disabled={pendingLock}
          className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
            locked
              ? "bg-red-400/15 text-red-400"
              : autoLocked
              ? "bg-orange-400/15 text-orange-400"
              : "bg-emerald-400/15 text-emerald-400"
          }`}
        >
          {locked ? <Lock size={11} /> : <LockOpen size={11} />}
          {locked ? "Fechado (manual)" : autoLocked ? "Fechado (iniciou)" : "Aberto"}
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <select
          className="input max-w-[170px]"
          value={winner}
          onChange={(e) => setWinner(e.target.value)}
        >
          <option value="">Quem avançou…</option>
          {home && <option value={home.id}>{home.name}</option>}
          {away && <option value={away.id}>{away.name}</option>}
        </select>
        <button onClick={save} disabled={pendingWinner} className="btn-primary px-3 py-2">
          {pendingWinner ? "…" : saved ? "✓" : "Salvar resultado"}
        </button>
      </div>
    </div>
  );
}
