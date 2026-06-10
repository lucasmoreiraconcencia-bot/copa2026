"use client";

import { useState } from "react";

export interface RankRow {
  userId: string;
  name: string;
  avatar: string | null;
  points: number;
  isPaid?: boolean;
}

export interface RankTab {
  key: string;
  label: string;
  rows: RankRow[];
}

// cores de pódio para os 3 primeiros
const PODIUM = ["text-copa-gold", "text-zinc-300", "text-amber-600"];

export function RankingTabs({ tabs }: { tabs: RankTab[] }) {
  const [active, setActive] = useState(tabs[0]?.key ?? "geral");
  const current = tabs.find((t) => t.key === active) ?? tabs[0];

  return (
    <div>
      <div className="no-scrollbar mb-4 flex gap-2 overflow-x-auto pb-1">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            className={`whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-semibold transition ${
              active === t.key
                ? "bg-copa-gold text-copa-ink"
                : "bg-white/5 text-white/60 hover:bg-white/10"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <RankList rows={current?.rows ?? []} />
    </div>
  );
}

function RankList({ rows }: { rows: RankRow[] }) {
  if (rows.length === 0) {
    return (
      <p className="card p-6 text-center text-white/50">
        Sem pontos por aqui ainda. Volte quando os jogos começarem.
      </p>
    );
  }

  // Ranking de competição (empate compartilha posição: 1,2,2,4...)
  let lastPoints: number | null = null;
  let lastRank = 0;

  return (
    <ol className="space-y-2">
      {rows.map((r, i) => {
        const rank = lastPoints === r.points ? lastRank : i + 1;
        lastPoints = r.points;
        lastRank = rank;
        const podium = rank <= 3 ? PODIUM[rank - 1] : "text-white/50";

        return (
          <li
            key={r.userId}
            className={`card flex items-center gap-3 p-3 ${
              rank === 1 ? "ring-1 ring-copa-gold/50" : ""
            }`}
          >
            <span className={`w-8 text-center text-base font-extrabold ${podium}`}>
              {rank}
            </span>
            {r.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={r.avatar}
                alt={r.name}
                className="h-9 w-9 rounded-full border border-white/15"
              />
            ) : (
              <div className="grid h-9 w-9 place-items-center rounded-full bg-copa-green font-bold">
                {r.name.charAt(0)}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold text-white">{r.name}</p>
              {r.isPaid === false && (
                <span className="badge bg-amber-400/15 text-amber-400">
                  pagamento pendente
                </span>
              )}
            </div>
            <span className="text-lg font-extrabold text-copa-gold">
              {r.points}
              <span className="ml-1 text-xs font-medium text-white/40">pts</span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}
