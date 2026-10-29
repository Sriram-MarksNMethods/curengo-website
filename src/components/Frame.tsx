"use client";

// A fixed-size frame for a set of screens where only one shows at a time (patient journey, role picker).
// Each screen is laid out at one design size (760×500, or 430×560 on narrow widths) and scaled to the
// frame's width, like a screenshot, so every screen is exactly the same size and nothing jumps.
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { showPanel } from "@/lib/motion";

type Props = { panes: ReactNode[]; current: number; label?: string; ids?: string[]; labelledBy?: string[] };

export default function Frame({ panes, current, ids, labelledBy }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState<{ dw: number; dh: number; k: number } | null>(null);

  useLayoutEffect(() => {
    const el = box.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      const dw = w >= 600 ? 760 : 430;
      const dh = dw === 760 ? 500 : 560;
      setFit({ dw, dh, k: w / dw });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // replay the shown screen's reveal + graphs whenever the step changes
  useEffect(() => {
    showPanel(box.current?.querySelector<HTMLElement>(`[data-pane="${current}"]`) ?? null);
  }, [current]);

  return (
    <div ref={box} className="frame relative" style={fit ? { height: Math.round(fit.dh * fit.k) } : { aspectRatio: "16 / 10.5", visibility: "hidden" }}>
      {panes.map((pane, i) => (
        <div
          key={i}
          data-pane={i}
          id={ids?.[i]}
          role={ids ? "tabpanel" : undefined}
          aria-labelledby={labelledBy?.[i]}
          hidden={i !== current}
          className="absolute top-0 left-0 origin-top-left animate-[fade-in_0.4s_ease]"
          style={fit ? { width: fit.dw, height: fit.dh, transform: `scale(${fit.k})` } : { inset: 0 }}
        >
          {pane}
        </div>
      ))}
    </div>
  );
}
