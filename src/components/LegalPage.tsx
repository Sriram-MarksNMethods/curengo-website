import type { ReactNode } from "react";
import PageHero from "./PageHero";

export type LegalSection = { id: string; title: string; body: ReactNode };

/** Privacy Policy / Terms layout: a sticky list of sections beside the text */
export default function LegalPage({ title, kind, sections }: { title: string; kind: string; sections: LegalSection[] }) {
  return (
    <>
      <PageHero tone={kind === "policy" ? "purple" : "teal"} title={title} lede={<>Last updated <span className="ph">[date]</span></>} />
      <section className="sec-tight">
        <div className="wrap grid grid-cols-[15rem_minmax(0,1fr)] items-start gap-[clamp(2rem,5vw,5rem)] max-[860px]:grid-cols-1">
          <nav aria-label="On this page" className="sticky top-[calc(var(--topbar)+1.5rem)] grid gap-0.5 text-sm max-[860px]:static">
            <b className="mb-2 text-xs tracking-[0.06em] text-faint uppercase">On this page</b>
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="border-l-2 border-line px-3 py-1.5 text-muted no-underline hover:border-accent hover:text-accent">
                {s.title}
              </a>
            ))}
          </nav>
          <article className="max-w-[46rem] [&_li]:leading-[1.75] [&_p]:leading-[1.75] [&_p+p]:mt-3.5 [&_ul]:mt-3 [&_ul]:grid [&_ul]:list-disc [&_ul]:gap-1.5 [&_ul]:pl-5">
            {/* TODO: remove this banner once Curengo's legal advisor has reviewed the text */}
            <p className="mb-8 rounded-xl border border-[color-mix(in_srgb,var(--warn)_35%,transparent)] bg-[color-mix(in_srgb,var(--warn)_8%,transparent)] px-5 py-4 text-[0.9375rem] leading-relaxed">
              <b>Draft for review.</b> This {kind} is a starting structure. It must be reviewed and completed by Curengo’s legal advisor before the site goes live.
            </p>
            {sections.map((s) => (
              <div key={s.id}>
                <h2 id={s.id} className="mt-10 mb-3 scroll-mt-[calc(var(--topbar)+1rem)] text-[1.375rem] font-semibold tracking-[-0.01em] text-heading first:mt-0">
                  {s.title}
                </h2>
                {s.body}
              </div>
            ))}
          </article>
        </div>
      </section>
    </>
  );
}
