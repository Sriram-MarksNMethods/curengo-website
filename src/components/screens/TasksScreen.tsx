"use client";

import { useState } from "react";
import ScreenWindow, { Chip } from "./ScreenWindow";

const TASKS = [
  { time: "07:30", what: "Vitals · Bed 12", kind: "Vitals" },
  { time: "08:00", what: "Tab. Metformin 500 mg · Bed 7", kind: "Medicine" },
  { time: "08:30", what: "Positioning · Bed 3", kind: "Care" },
  { time: "09:00", what: "Tab. Paracetamol 650 mg · Bed 12", kind: "Voice order", accent: true },
  { time: "09:30", what: "Blood sugar · Bed 7", kind: "Vitals" },
  { time: "10:00", what: "Walk to physio · Bed 12", kind: "Escort" },
  { time: "11:00", what: "Dressing change · Bed 3", kind: "Care" },
];

export default function TasksScreen() {
  // the first three are already done; tap a box to tick a task off
  const [done, setDone] = useState<boolean[]>(TASKS.map((_, i) => i < 3));
  const doneCount = done.filter(Boolean).length;

  return (
    <ScreenWindow title="Curengo · Nursing · Morning shift" label="Illustrative screen: the nurse's task list" active={1} caption="Tap a task to tick it off · sample data">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <b className="text-base text-heading">My tasks</b>
        <span className="text-xs text-muted">
          <em className="font-bold text-heading not-italic">{TASKS.length - doneCount}</em> pending · <em className="font-bold text-heading not-italic">{doneCount}</em> done
        </span>
      </div>
      <ul className="grid gap-1.5">
        {TASKS.map((t, i) => (
          <li key={t.time} className={`flex items-center gap-3 rounded-lg border border-line bg-page px-2.5 py-2 transition-opacity ${done[i] ? "opacity-55" : ""}`}>
            <button
              type="button"
              aria-pressed={done[i]}
              aria-label={`Mark done: ${t.what}`}
              onClick={() => setDone((d) => d.map((v, k) => (k === i ? !v : v)))}
              className={`cta-soft grid size-[1.125rem] shrink-0 cursor-pointer place-items-center rounded-[0.3rem] border-[1.5px] transition-colors ${done[i] ? "border-accent bg-accent text-accent-contrast" : "border-faint"}`}
            >
              {done[i] && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="size-[70%]" aria-hidden="true">
                  <path d="M5 12l5 5 9-10" />
                </svg>
              )}
            </button>
            <time className="text-xs font-semibold text-faint tabular-nums">{t.time}</time>
            <span className={`min-w-0 flex-1 truncate ${done[i] ? "line-through decoration-faint" : ""}`}>{t.what}</span>
            <Chip tone={t.accent ? "accent" : "plain"}>{t.kind}</Chip>
          </li>
        ))}
      </ul>
    </ScreenWindow>
  );
}
