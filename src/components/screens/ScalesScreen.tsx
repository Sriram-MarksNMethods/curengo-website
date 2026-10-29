"use client";

import { useRef, useState } from "react";
import { grow } from "@/lib/motion";
import ScreenWindow, { Bar } from "./ScreenWindow";

// sample scores across a stay, per scale
const SCALES = {
  barthel: { label: "Barthel", max: 100, points: [35, 45, 60, 70, 80], items: [["Feeding", 10, 10], ["Transfers", 10, 15], ["Mobility", 10, 15], ["Stairs", 5, 10], ["Dressing", 10, 10], ["Bathing", 0, 5]] },
  berg: { label: "Berg", max: 56, points: [18, 24, 31, 37, 41], items: [["Sitting", 4, 4], ["Standing", 3, 4], ["Transfers", 3, 4], ["Reaching", 2, 4], ["Turning", 2, 4], ["One leg", 1, 4]] },
} as const;
type ScaleKey = keyof typeof SCALES;

export default function ScalesScreen() {
  const [scale, setScale] = useState<ScaleKey>("barthel");
  const box = useRef<HTMLDivElement>(null);
  const s = SCALES[scale];
  const xy = s.points.map((v, i) => [i * 80, 140 - (v / s.max) * 120] as const);
  const line = xy.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y.toFixed(1)}`).join(" ");

  const pick = (k: ScaleKey) => {
    setScale(k);
    grow(box.current?.closest<HTMLElement>(".grow") ?? null);
  };

  return (
    <ScreenWindow title="Curengo · Assessment scales" label="Illustrative screen: assessment scores over a stay" active={1} caption="Switch scales · sample data" grow>
      <div ref={box}>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <b className="text-base text-heading">Ravi Shankar · progress</b>
          <span role="group" aria-label="Scale" className="inline-flex rounded-lg bg-fill p-[0.1875rem]">
            {(Object.keys(SCALES) as ScaleKey[]).map((k) => (
              <button
                key={k}
                type="button"
                aria-pressed={scale === k}
                onClick={() => pick(k)}
                className={`cta-soft h-7 cursor-pointer rounded-md px-3 text-xs font-semibold ${scale === k ? "bg-surface text-accent shadow-[0_1px_2px_rgba(0,0,0,0.08)]" : "text-muted"}`}
              >
                {SCALES[k].label}
              </button>
            ))}
          </span>
        </div>
        <svg viewBox="0 0 320 140" preserveAspectRatio="none" aria-hidden="true" className="grow-sweep block h-36 w-full overflow-visible">
          {[20, 60, 100, 140].map((y) => (
            <line key={y} x1="0" y1={y} x2="320" y2={y} stroke="var(--line)" vectorEffect="non-scaling-stroke" />
          ))}
          <path className="grow-fade" d={`${line} L320 140 L0 140 Z`} fill="var(--accent-soft)" />
          <path d={line} fill="none" stroke="var(--accent)" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
          {xy.map(([x, y]) => (
            <circle key={x} cx={x} cy={y} r="3.5" fill="var(--surface)" stroke="var(--accent)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          ))}
        </svg>
        <div className="mt-1.5 flex justify-between text-[0.6875rem] text-faint">
          <span>Adm.</span><span>Wk 1</span><span>Wk 2</span><span>Wk 3</span><span>Wk 4</span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-2">
          {s.items.map(([name, v, max], i) => (
            <div key={name} className="text-xs text-muted">
              {name}
              <span className="float-right font-semibold text-heading tabular-nums">{v}/{max}</span>
              <Bar value={v / max} index={i} />
            </div>
          ))}
        </div>
      </div>
    </ScreenWindow>
  );
}
