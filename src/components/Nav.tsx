"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutButton } from "./LogoutButton";

const LINKS = [
  { href: "/ranking", label: "Ranking", icon: "🏆" },
  { href: "/palpites", label: "Palpites", icon: "🎯" },
  { href: "/jogos", label: "Jogos", icon: "⚽" },
];

export function Nav({
  name,
  avatar,
  isAdmin,
}: {
  name: string | null;
  avatar: string | null;
  isAdmin: boolean;
}) {
  const pathname = usePathname();
  const links = isAdmin
    ? [...LINKS, { href: "/admin", label: "Admin", icon: "⚙️" }]
    : LINKS;

  return (
    <>
      {/* Topo */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-copa-ink/70 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <Link href="/ranking" className="flex items-center gap-2 font-extrabold">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-26.png" alt="" className="h-9 w-auto" />
            <span className="font-display text-white">Bolão Copa 2026</span>
          </Link>
          <div className="flex items-center gap-3">
            {avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={avatar}
                alt={name ?? "Você"}
                className="h-8 w-8 rounded-full border border-white/20"
              />
            ) : (
              <div className="grid h-8 w-8 place-items-center rounded-full bg-copa-green text-sm font-bold">
                {(name ?? "?").charAt(0)}
              </div>
            )}
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Navegação inferior (mobile-first) */}
      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-white/10 bg-copa-ink/90 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-stretch justify-around">
          {links.map((l) => {
            const active =
              pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`flex flex-1 flex-col items-center gap-0.5 py-2.5 text-xs font-semibold transition ${
                  active ? "text-copa-gold" : "text-white/55 hover:text-white"
                }`}
              >
                <span className="text-lg">{l.icon}</span>
                {l.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
