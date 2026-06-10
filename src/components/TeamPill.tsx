import type { Team } from "@/lib/types";

// Componente de exibição de uma seleção (bandeira + nome). Sem estado.
export function TeamPill({
  team,
  size = "md",
  className = "",
}: {
  team: Team | undefined | null;
  size?: "sm" | "md";
  className?: string;
}) {
  const flagClass = size === "sm" ? "h-4 w-6" : "h-5 w-7";
  if (!team) {
    return <span className={`text-white/40 ${className}`}>a definir</span>;
  }
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      {team.flag_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={team.flag_url}
          alt={team.name}
          className={`${flagClass} rounded-sm object-cover`}
        />
      ) : null}
      <span className={size === "sm" ? "text-sm" : ""}>{team.name}</span>
    </span>
  );
}
