"use client";

import { useState } from "react";
import ScreenWindow from "./ScreenWindow";

type Bed = { n: string; state: "occ" | "out" | "free"; who: string };
const BEDS: Bed[] = [
  { n: "01", state: "occ", who: "Ravi S. · stroke rehab · day 9" },
  { n: "02", state: "occ", who: "Meena K. · hip replacement · day 4" },
  { n: "03", state: "out", who: "Joseph D. · knee replacement · going home today" },
  { n: "04", state: "occ", who: "Lakshmi P. · post-ICU care · day 12" },
  { n: "05", state: "free", who: "Free bed" },
  { n: "06", state: "occ", who: "Arjun N. · spinal injury · day 21" },
  { n: "07", state: "occ", who: "Fatima B. · stroke rehab · day 2" },
  { n: "08", state: "occ", who: "Suresh R. · cardiac rehab · day 6" },
  { n: "09", state: "occ", who: "Anita M. · fracture care · day 10" },
  { n: "10", state: "free", who: "Free bed" },
  { n: "11", state: "occ", who: "Kiran V. · post-surgery · day 3" },
  { n: "12", state: "out", who: "Gopal T. · stroke rehab · going home today" },
  { n: "13", state: "occ", who: "Priya L. · Parkinson's care · day 15" },
  { n: "14", state: "occ", who: "Rahul J. · spinal injury · day 30" },
  { n: "15", state: "free", who: "Free bed" },
  { n: "16", state: "occ", who: "Sita D. · post-ICU care · day 8" },
];
const COLOURS = {
  occ: "bg-accent text-accent-contrast",
  out: "bg-[color-mix(in_srgb,var(--warn)_22%,var(--surface))] text-warn",
  free: "bg-fill text-faint",
};

export default function BedsScreen() {
  const [picked, setPicked] = useState<Bed | null>(null);
  return (
    <ScreenWindow title="Curengo · Bed board" label="Illustrative screen: the bed board" active={2} grow>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <b className="text-base text-heading">Ward A · 16 beds</b>
        <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.6875rem] text-muted">
          <span className="inline-flex items-center gap-1"><i className={`size-2.5 rounded-sm ${COLOURS.occ}`} />Occupied</span>
          <span className="inline-flex items-center gap-1"><i className={`size-2.5 rounded-sm ${COLOURS.out}`} />Going home today</span>
          <span className="inline-flex items-center gap-1"><i className={`size-2.5 rounded-sm ${COLOURS.free}`} />Free</span>
        </span>
      </div>
      <div className="grid grid-cols-8 gap-1.5 max-[560px]:grid-cols-4">
        {BEDS.map((b) => (
          <button
            key={b.n}
            type="button"
            aria-label={`Bed ${b.n}: ${b.who}`}
            onPointerEnter={() => setPicked(b)}
            onFocus={() => setPicked(b)}
            onClick={() => setPicked(b)}
            className={`cta-soft grid aspect-square cursor-pointer place-items-center rounded-md text-[0.6875rem] font-bold transition-[transform,translate,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-[0_0_0_2px_var(--accent)] focus-visible:-translate-y-0.5 focus-visible:shadow-[0_0_0_2px_var(--accent)] focus-visible:outline-none ${COLOURS[b.state]} ${picked === b ? "-translate-y-0.5 shadow-[0_0_0_2px_var(--accent)]" : ""}`}
          >
            {b.n}
          </button>
        ))}
      </div>
      <p className="my-3 min-h-5 text-[0.8125rem] font-medium text-heading" aria-live="polite">
        {picked ? `Bed ${picked.n} · ${picked.who}` : "Hover or tap a bed"}
      </p>
      <div className="grid grid-cols-3 gap-2">
        {[["Occupancy", "81%"], ["Admissions today", "2"], ["Going home", "2"]].map(([k, v], i) => (
          <div key={k} className="rounded-lg border border-line bg-page px-3 py-2.5" style={{ ["--n" as string]: i }}>
            <small className="block text-[0.6875rem] text-faint">{k}</small>
            <b data-count className="text-lg font-semibold text-heading tabular-nums">{v}</b>
          </div>
        ))}
      </div>
    </ScreenWindow>
  );
}
