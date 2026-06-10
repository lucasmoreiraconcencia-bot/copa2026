"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Trophy, Target, CalendarDays, Settings } from "lucide-react";
import { LogoutButton } from "./LogoutButton";

const LINKS = [
  { href: "/ranking", label: "Ranking", Icon: Trophy },
  { href: "/palpites", label: "Palpites", Icon: Target },
  { href: "/jogos", label: "Jogos", Icon: CalendarDays },
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
    ? [...LINKS, { href: "/admin", label: "Admin", Icon: Settings }]
    : LINKS;

  return (
    <>
      {/* Topo */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#121212]/85 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <Link href="/ranking" className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-26.png" alt="" className="h-9 w-auto" />
            <span className="text-base font-extrabold tracking-tight text-white">
              Bolão Copa 2026
            </span>
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
      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-white/10 bg-[#121212]/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-stretch justify-around">
          {links.map(({ href, label, Icon }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={`flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition ${
                  active ? "text-copa-gold" : "text-white/45 hover:text-white/80"
                }`}
              >
                <Icon
                  size={22}
                  strokeWidth={active ? 2.4 : 1.8}
                  className={active ? "fill-copa-gold/25" : "fill-transparent"}
                />
                {label}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
