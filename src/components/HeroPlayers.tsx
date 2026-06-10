// Silhuetas estilo pictograma clássico de lances históricos da Copa:
// a bicicleta, o erguer da taça e o drible. Desenho autoral (sem fotos
// licenciadas) em homenagem aos grandes jogadores que fizeram a Copa.
export function HeroPlayers({ className }: { className?: string }) {
  const stroke = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 10,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <svg viewBox="0 0 640 210" className={className} aria-hidden="true">
      {/* ── A bicicleta (voleio no ar) ── */}
      <g>
        <circle cx="168" cy="48" r="13" fill="currentColor" />
        <circle cx="52" cy="138" r="13" fill="currentColor" />
        {/* tronco inclinado no ar */}
        <path d="M64,130 L112,106" {...stroke} />
        {/* perna do voleio até a bola */}
        <path d="M112,106 L146,68" {...stroke} />
        {/* perna recolhida */}
        <path d="M112,106 L120,138 L96,152" {...stroke} />
        {/* braços apoiando a queda */}
        <path d="M72,126 L52,168" {...stroke} />
        <path d="M84,120 L106,156" {...stroke} />
      </g>

      {/* ── O erguer da taça ── */}
      <g>
        {/* taça acima da cabeça */}
        <path
          d="M306,18 L334,18 L330,38 C328,46 324,50 320,50 C316,50 312,46 310,38 Z"
          fill="currentColor"
        />
        <rect x="314" y="50" width="12" height="8" fill="currentColor" />
        <rect x="306" y="58" width="28" height="7" rx="3" fill="currentColor" />
        <circle cx="320" cy="88" r="13" fill="currentColor" />
        {/* tronco */}
        <path d="M320,102 L320,148" {...stroke} />
        {/* braços erguidos em V segurando a taça */}
        <path d="M320,108 L300,66" {...stroke} />
        <path d="M320,108 L340,66" {...stroke} />
        {/* pernas em comemoração */}
        <path d="M320,148 L302,192" {...stroke} />
        <path d="M320,148 L338,192" {...stroke} />
      </g>

      {/* ── O drible ── */}
      <g>
        <circle cx="492" cy="78" r="13" fill="currentColor" />
        {/* tronco inclinado para frente */}
        <path d="M500,90 L522,130" {...stroke} />
        {/* perna de trás estendida */}
        <path d="M522,130 L490,178" {...stroke} />
        {/* perna da frente conduzindo a bola */}
        <path d="M522,130 L548,162" {...stroke} />
        {/* braços em balanço */}
        <path d="M504,98 L478,124" {...stroke} />
        <path d="M510,102 L540,90" {...stroke} />
        <circle cx="568" cy="174" r="12" fill="currentColor" />
      </g>
    </svg>
  );
}
