import type { ReactNode } from "react";

/** Hero band at the top of every page except home. Pass `visual` for a split layout; without it the hero is centred.
 *  `tone` picks the background: pages alternate purple / teal (see globals.css .hero-purple / .hero-teal). */
export default function PageHero({ title, lede, actions, visual, tone = "purple" }: { title: ReactNode; lede: ReactNode; actions?: ReactNode; visual?: ReactNode; tone?: "purple" | "teal" }) {
  const centred = !visual;
  const teal = tone === "teal";
  return (
    <section className={`navy navy-glow ${teal ? "hero-teal" : "hero-purple"} pt-[calc(var(--topbar)+clamp(2rem,1.25rem+2.4vw,3.5rem))] pb-[clamp(2.5rem,1.75rem+2.4vw,4rem)]`}>
      <div className={`wrap ${visual ? "grid grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] items-center gap-[clamp(2.5rem,5vw,6rem)] max-[960px]:grid-cols-1" : "text-center"}`}>
        <div data-reveal>
          <h1 className={`m-0 max-w-3xl text-[clamp(2.25rem,1.6rem+2.4vw,3.5rem)] leading-[1.08] font-medium tracking-[-0.025em] text-balance text-white ${centred ? "mx-auto" : ""}`}>{title}</h1>
          <p className={`mt-5 max-w-2xl text-lg leading-[1.7] ${teal ? "text-white/90" : "text-[#c6bfe6]"} ${centred ? "mx-auto" : ""}`}>{lede}</p>
          {actions && <div className={`mt-8 flex flex-wrap gap-3 ${centred ? "justify-center" : ""}`}>{actions}</div>}
        </div>
        {visual && <div data-reveal>{visual}</div>}
      </div>
    </section>
  );
}
