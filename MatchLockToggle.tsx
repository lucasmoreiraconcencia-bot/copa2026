"use client";

import { useState, useTransition } from "react";
import { Lock, LockOpen } from "lucide-react";
import { lockMatch } from "@/lib/actions/admin";

export function MatchLockToggle({
  matchId,
  label,
  isLocked,
  kickoffPassed,
}: {
  matchId: string;
  label: string;
  isLocked: boolean;
  kickoffPassed: boolean;
}) {
  const [locked, setLocked] = useState(isLocked);
  const [pending, start] = useTransition();

  function toggle() {
    start(async () => {
      await lockMatch(matchId, !locked);
      setLocked((v) => !v);
    });
  }

  const effectiveLocked = locked || kickoffPassed;

  return (
    <button
      onClick={toggle}
      disabled={pending}
      className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition ${
        locked
          ? "bg-red-400/15 text-red-400"
          : kickoffPassed
          ? "bg-orange-400/15 text-orange-300"
          : "bg-emerald-400/15 text-emerald-400"
      }`}
    >
      <span className="truncate text-left">{label}</span>
      <span className="ml-2 flex shrink-0 items-center gap-1 font-semibold">
        {effectiveLocked ? <Lock size={12} /> : <LockOpen size={12} />}
        {locked ? "Fechado" : kickoffPassed ? "Iniciou" : "Aberto"}
      </span>
    </button>
  );
}
