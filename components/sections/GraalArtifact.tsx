export function GraalArtifact() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-6 bottom-6 top-6 overflow-hidden rounded-[calc(var(--radius-card)+8px)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(201,168,76,0.22),transparent_42%)]" />
      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--color-gold-300)] opacity-60" />
      <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[32px] border border-[var(--color-gold-500)] opacity-50" />
      <svg
        className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 text-[var(--color-gold-500)]"
        fill="none"
        viewBox="0 0 240 240"
      >
        <path
          d="M70 82h100c0 38-20 65-50 65S70 120 70 82Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
        />
        <path
          d="M92 162h56M120 147v33M82 180h76"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="3"
        />
        <path
          d="M84 96c18 10 54 10 72 0"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
          opacity="0.55"
        />
      </svg>
    </div>
  );
}
