"use client";

import { useTransition } from "react";
import { lockGroup, lockRound } from "@/lib/actions/admin";
import type { RoundCode } from "@/lib/types";

export function LockToggle({
  kind,
  id,
  locked,
  label,
}: {
  kind: "group" | "round";
  id: string;
  locked: boolean;
  label: string;
}) {
  const [pending, startTransition] = useTransition();

  function toggle() {
    startTransition(async () => {
      if (kind === "group") await lockGroup(id, !locked);
      else await lockRound(id as RoundCode, !locked);
    });
  }

  return (
    <button
      onClick={toggle}
      disabled={pending}
      className={`flex items-center justify-between rounded-lg border px-3 py-2 text-sm transition ${
        locked
          ? "border-red-400/30 bg-red-500/10 text-red-200"
          : "border-emerald-400/30 bg-emerald-500/10 text-emerald-200"
      }`}
    >
      <span>{label}</span>
      <span className="font-semibold">{locked ? "🔒 Fechado" : "🔓 Aberto"}</span>
    </button>
  );
}
