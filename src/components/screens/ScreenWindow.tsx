// The app-window chrome every illustrative Curengo screen sits in: title bar, icon rail, caption.
// All names and numbers inside the screens are sample data.
import type { ReactNode } from "react";

type Props = {
  title: string;
  label: string;
  /** which icon in the side rail is highlighted (0-4) */
  active?: number;
  caption?: string;
  /** graphs inside should grow in (see src/lib/motion.ts) */
  grow?: boolean;
  className?: string;
  children: ReactNode;
};

export default function ScreenWindow({ title, label, active = 0, caption = "Illustrative screen · sample data", grow = false, className = "", children }: Props) {
  return (
    <figure
      aria-label={label}
      data-reveal
      className={`screen ${grow ? "grow" : ""} relative m-0 flex flex-col overflow-hidden rounded-2xl border border-line bg-surface text-left text-sm text-body shadow-ui ${className}`}
    >
      <div className="flex h-9 shrink-0 items-center gap-1.5 border-b border-line bg-sunken px-3.5" aria-hidden="true">
        <i className="size-[0.5625rem] rounded-full bg-fill" />
        <i className="size-[0.5625rem] rounded-full bg-fill" />
        <i className="size-[0.5625rem] rounded-full bg-fill" />
        <span className="ml-2.5 text-xs font-medium text-faint not-italic">{title}</span>
      </div>
      <div data-body className="grid flex-1 grid-cols-[3rem_minmax(0,1fr)] max-[560px]:grid-cols-1">
        <nav aria-hidden="true" className="flex flex-col items-center gap-3 border-r border-line py-4 max-[560px]:hidden">
          {[0, 1, 2, 3, 4].map((i) => (
            <b key={i} className={`size-5 rounded-md ${i === active ? "bg-accent" : "bg-fill"}`} />
          ))}
        </nav>
        <div className="min-w-0 p-5">{children}</div>
      </div>
      <figcaption className="shrink-0 border-t border-line bg-sunken px-3.5 py-2 text-[0.6875rem] text-faint">{caption}</figcaption>
    </figure>
  );
}

/** Small rounded label used inside screens */
export function Chip({ children, tone = "plain" }: { children: ReactNode; tone?: "plain" | "accent" | "ok" }) {
  const tones = {
    plain: "bg-fill text-muted",
    accent: "bg-accent-soft text-accent",
    ok: "bg-[color-mix(in_srgb,var(--ok)_12%,transparent)] text-ok",
  };
  return <span className={`inline-flex h-[1.375rem] items-center whitespace-nowrap rounded-full px-2 text-[0.6875rem] font-semibold ${tones[tone]}`}>{children}</span>;
}

/** Bordered card inside a screen */
export function Card({ title, wide = false, children }: { title?: string; wide?: boolean; children: ReactNode }) {
  return (
    <div className={`rounded-[0.625rem] border border-line bg-page px-4 py-3.5 ${wide ? "col-span-full" : ""}`}>
      {title && <h5 className="mb-2.5 text-[0.6875rem] font-semibold tracking-[0.04em] text-faint uppercase">{title}</h5>}
      {children}
    </div>
  );
}

/** A progress bar that fills in when its screen grows in */
export function Bar({ value, index = 0, className = "h-[0.3125rem] mt-1" }: { value: number; index?: number; className?: string }) {
  return (
    <i className={`block overflow-hidden rounded-full bg-fill ${className}`}>
      <span className="grow-bar block h-full rounded-[inherit] bg-accent" style={{ ["--v" as string]: value, ["--n" as string]: index }} />
    </i>
  );
}

/** Patient avatar + name line used at the top of several screens */
export function PatientLine({ initials, name, detail, chip }: { initials: string; name: string; detail: string; chip?: ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent-soft text-[0.8125rem] font-bold text-accent">{initials}</span>
      <div>
        <b className="block text-base text-heading">{name}</b>
        <small className="text-xs text-muted">{detail}</small>
      </div>
      {chip && <span className="ml-auto">{chip}</span>}
    </div>
  );
}
