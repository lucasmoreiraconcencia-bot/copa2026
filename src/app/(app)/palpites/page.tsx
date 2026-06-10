import Link from "next/link";
import { Crown, ListOrdered, GitFork, ChevronRight } from "lucide-react";
import { getSettings, getGroups, getRoundLocks } from "@/lib/data";
import { isLocked, formatDeadline } from "@/lib/deadlines";

export const dynamic = "force-dynamic";

export default async function PalpitesHub() {
  const [settings, groups, locks] = await Promise.all([
    getSettings(),
    getGroups(),
    getRoundLocks(),
  ]);

  const championOpen = !isLocked(settings?.champion_deadline ?? null, false);
  const groupsOpen = groups.filter((g) => !isLocked(g.deadline, g.is_locked)).length;
  const roundsOpen = locks.filter((l) => !isLocked(l.deadline, l.is_locked)).length;

  const cards = [
    {
      href: "/palpites/campeao",
      Icon: Crown,
      title: "Palpite de Campeão",
      desc: "Vale 40 pontos. Só até o 1º jogo da Copa.",
      status: championOpen ? "Aberto" : "Fechado",
      open: championOpen,
      extra: `Prazo: ${formatDeadline(settings?.champion_deadline ?? null)}`,
    },
    {
      href: "/palpites/grupos",
      Icon: ListOrdered,
      title: "Fase de Grupos",
      desc: "Ordene 1º a 4º de cada grupo (5/3/2/0 pts).",
      status: `${groupsOpen}/${groups.length || 12} abertos`,
      open: groupsOpen > 0,
      extra: "Cada grupo fecha no seu 1º jogo.",
    },
    {
      href: "/palpites/mata-mata",
      Icon: GitFork,
      title: "Mata-mata",
      desc: "Quem avança em cada fase até a final.",
      status: `${roundsOpen} rodada(s) aberta(s)`,
      open: roundsOpen > 0,
      extra: "Cada rodada fecha no seu 1º jogo.",
    },
  ];

  return (
    <div>
      <h1 className="mb-1 text-2xl font-extrabold text-white">Seus palpites</h1>
      <p className="mb-4 text-sm text-white/50">
        Palpite não enviado a tempo = 0 ponto.
      </p>

      <div className="space-y-3">
        {cards.map(({ Icon, ...c }) => (
          <Link key={c.href} href={c.href} className="card block p-4 hover:bg-white/10">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/5">
                <Icon size={22} strokeWidth={1.8} className="text-copa-gold" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="font-bold text-white">{c.title}</h2>
                  <span className={c.open ? "badge-open" : "badge-closed"}>
                    {c.status}
                  </span>
                </div>
                <p className="text-sm text-white/60">{c.desc}</p>
                <p className="mt-1 text-xs text-white/40">{c.extra}</p>
              </div>
              <ChevronRight size={18} className="shrink-0 text-white/30" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
