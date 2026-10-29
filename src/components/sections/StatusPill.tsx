// Small status label: Live / In progress / Planned
const TONES = {
  live: "text-ok bg-[color-mix(in_srgb,var(--ok)_9%,transparent)] border-[color-mix(in_srgb,var(--ok)_30%,transparent)]",
  progress: "text-warn bg-[color-mix(in_srgb,var(--warn)_9%,transparent)] border-[color-mix(in_srgb,var(--warn)_30%,transparent)]",
  planned: "text-muted border-line",
};

export default function StatusPill({ tone, children }: { tone: keyof typeof TONES; children: React.ReactNode }) {
  return (
    <span className={`inline-flex h-6.5 shrink-0 items-center gap-1.5 rounded-full border px-2.5 text-xs font-semibold whitespace-nowrap before:size-1.5 before:rounded-full before:bg-current ${TONES[tone]}`}>
      {children}
    </span>
  );
}
