"use client";

// Discharge summary demo: press "Draft summary" and the sections fill in one after another.
// Plays once by itself when it first scrolls into view.
import { useCallback, useEffect, useRef, useState } from "react";
import { btnPrimary } from "../ui";

const SECTIONS = [
  ["Diagnosis", "Left MCA ischaemic stroke with right-sided weakness."],
  ["Course in rehab", "Daily physio and speech therapy. Walking 50 m with a frame, independent transfers."],
  ["Scores", null],
  ["Medicines and advice", "Continue current medicines. Home exercise plan in the patient app. Review in 2 weeks."],
] as const;
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function SummaryDemo({ inFrame = false }: { inFrame?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const running = useRef(false);
  const [shown, setShown] = useState(inFrame ? 5 : 0);
  const [drafting, setDrafting] = useState(false);
  const [drafted, setDrafted] = useState(inFrame);

  const play = useCallback(async () => {
    if (running.current) return;
    running.current = true;
    const fast = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setShown(0);
    setDrafting(true);
    for (let i = 1; i <= 5; i++) {
      await wait(fast ? 0 : 650);
      setShown(i);
    }
    setDrafting(false);
    setDrafted(true);
    running.current = false;
  }, []);

  useEffect(() => {
    if (inFrame) return;
    const el = root.current;
    const auto = () => setTimeout(play, 500);
    el?.addEventListener("revealed", auto, { once: true });
    return () => el?.removeEventListener("revealed", auto);
  }, [play, inFrame]);

  const skeleton = "text-transparent bg-[linear-gradient(90deg,var(--fill)_25%,var(--hover)_50%,var(--fill)_75%)] bg-[length:200%_100%] rounded animate-[shimmer_1.2s_linear_infinite]";

  return (
    <div ref={root} data-reveal className="screen flex flex-col overflow-hidden rounded-2xl border border-line bg-surface text-sm text-body shadow-ui">
      <div className="flex h-9 shrink-0 items-center gap-1.5 border-b border-line bg-sunken px-3.5" aria-hidden="true">
        <i className="size-[0.5625rem] rounded-full bg-fill" />
        <i className="size-[0.5625rem] rounded-full bg-fill" />
        <i className="size-[0.5625rem] rounded-full bg-fill" />
        <span className="ml-2.5 text-xs font-medium text-faint">Curengo · Discharge summary</span>
      </div>
      <div data-body className="grid content-start gap-4 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
          <div>
            <b className="block text-base text-heading">Ravi Shankar</b>
            <small className="text-xs text-muted">Admitted 1 Oct · Discharge 15 Oct · Bed 12</small>
          </div>
          <button type="button" onClick={play} disabled={drafting} className={`${btnPrimary} h-9 px-3.5 text-[0.8125rem] disabled:opacity-70`}>
            {drafting ? "Drafting…" : drafted ? "Draft again" : "Draft summary"}
          </button>
        </div>
        {SECTIONS.map(([title, body], i) => (
          <div key={title} data-step className={shown > i ? "on" : ""}>
            <h6 className="mb-1 text-[0.6875rem] font-bold tracking-[0.06em] text-faint uppercase">{title}</h6>
            <p className={`text-sm leading-normal ${drafting && shown <= i ? skeleton : ""}`}>
              {body ?? (
                <span className="flex flex-wrap gap-x-6 gap-y-2">
                  <span>Barthel <b className="text-ok">35 → 80</b></span>
                  <span>Berg <b className="text-ok">18 → 41</b></span>
                </span>
              )}
            </p>
          </div>
        ))}
        <div data-step className={`flex flex-wrap justify-between gap-2 rounded-[0.625rem] bg-accent-soft px-4 py-3 text-[0.8125rem] text-muted ${shown > 4 ? "on" : ""}`}>
          <span>Drafted from the record in seconds</span>
          <b className="text-accent">Awaiting review · Dr. A. Mehta</b>
        </div>
      </div>
    </div>
  );
}
