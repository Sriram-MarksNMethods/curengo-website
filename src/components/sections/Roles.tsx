"use client";

// "A screen for everyone on the team": pick a role to see that person's screen.
// Wide screens: role cards beside one screen; moves to the next role every 6 seconds until someone picks one,
// paused while the mouse is over it. Phones/tablets (<=960px): an accordion, the picked role opens in place
// with its description and screen (no auto-cycling there).
import { useEffect, useRef, useState, useSyncExternalStore, type KeyboardEvent, type PointerEvent } from "react";
import Frame from "../Frame";
import SectionHead from "../SectionHead";
import { Icon } from "../icons";
import BedsScreen from "../screens/BedsScreen";
import BillScreen from "../screens/BillScreen";
import DashScreen from "../screens/DashScreen";
import DietScreen from "../screens/DietScreen";
import EmrScreen from "../screens/EmrScreen";
import ScalesScreen from "../screens/ScalesScreen";
import TasksScreen from "../screens/TasksScreen";

const CYCLE = 6000;
const ROLES = [
  { id: "doctor", name: "Doctor", text: "EMR summary, orders by voice and discharge summaries ready to review.", screen: <EmrScreen />, icon: <><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 12 0V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" /><path d="M8 15v1a6 6 0 0 0 12 0v-4" /><circle cx="20" cy="10" r="2" /></> },
  { id: "nurse", name: "Nurse", text: "Pending and completed tasks for each patient, shift by shift. Vitals and medicines in a few taps.", screen: <TasksScreen />, icon: <><rect x="8" y="2" width="8" height="4" rx="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="m9 14 2 2 4-4" /></> },
  { id: "physio", name: "Physiotherapist", text: "Digital assessment scales with an objective score, session notes and home exercise plans.", screen: <ScalesScreen />, icon: <path d="M22 12h-4l-3 9L9 3l-3 9H2" /> },
  { id: "diet", name: "Dietitian", text: "Calorie and protein plans for each patient, visible to the nursing team.", screen: <DietScreen />, icon: <><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" /><path d="M10 2c1 .5 2 2 2 5" /></> },
  { id: "therapists", name: "Therapists", text: "Respiratory, speech and psychology notes on the same record as everyone else.", screen: <EmrScreen />, icon: <><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /><path d="M8 10h8M8 14h5" /></> },
  { id: "desk", name: "Front desk", text: "Admissions, bed allocation and service packages set up on arrival.", screen: <BedsScreen />, icon: <><path d="M2 4v16" /><path d="M2 8h18a2 2 0 0 1 2 2v10" /><path d="M2 17h20" /><path d="M6 8v9" /></> },
  { id: "billing", name: "Billing & pharmacy", text: "Charges added as care is given. Orders reach the pharmacy without a phone call.", screen: <BillScreen />, icon: <><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" /><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" /><path d="M12 17.5v-11" /></> },
  { id: "mgmt", name: "Management", text: "Occupancy, revenue and clinical KPIs on one dashboard.", screen: <DashScreen />, icon: <><path d="M3 3v18h18" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" /></> },
];

// hover (desktop, globals.css "Role card hover"): the card tilts toward the cursor and a spotlight on its border follows it
const tilt = (e: PointerEvent<HTMLButtonElement>) => {
  if (e.pointerType !== "mouse") return;
  const el = e.currentTarget, r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
  el.style.setProperty("--mx", `${x * 100}%`);
  el.style.setProperty("--my", `${y * 100}%`);
  el.style.setProperty("--rx", `${(0.5 - y) * 8}deg`);
  el.style.setProperty("--ry", `${(x - 0.5) * 10}deg`);
};
const untilt = (e: PointerEvent<HTMLButtonElement>) => {
  e.currentTarget.style.setProperty("--rx", "0deg");
  e.currentTarget.style.setProperty("--ry", "0deg");
};

const NARROW = "(max-width: 960px)";
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(NARROW);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

export default function Roles({ navy = false }: { navy?: boolean }) {
  const narrow = useSyncExternalStore(subscribe, () => window.matchMedia(NARROW).matches, () => false);
  const [open, setOpen] = useState<number | null>(0); // phones: the open accordion item
  const [opened, setOpened] = useState<number[]>([0]); // items opened at least once keep their screen, so closing animates
  const [current, setCurrent] = useState(0);
  const [manual, setManual] = useState(false); // someone picked a role: stop cycling
  const [paused, setPaused] = useState(false); // mouse is over the section
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (narrow || manual || paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setCurrent((c) => (c + 1) % ROLES.length), CYCLE);
    return () => clearTimeout(t);
  }, [current, manual, paused, narrow]);

  const pick = (i: number, focus = false) => {
    setManual(true);
    const next = (i + ROLES.length) % ROLES.length;
    setCurrent(next);
    if (focus) tabs.current[next]?.focus();
  };
  const onKey = (e: KeyboardEvent, i: number) => {
    const step = { ArrowRight: 1, ArrowDown: 2, ArrowLeft: -1, ArrowUp: -2 }[e.key];
    if (!step) return;
    e.preventDefault();
    pick(i + step, true);
  };

  return (
    <section id="roles" className={`sec-tight ${navy ? "navy navy-glow" : "bg-sunken"}`}>
      <div className="wrap">
        <SectionHead
          title="A screen for everyone on the team"
          lede="Each person sees what their job needs and nothing more, so the system stays simple on a busy shift. Pick a role to see their screen."
        />
        {narrow ? (
          <div className="grid gap-2.5">
            {ROLES.map((r, i) => {
              const isOpen = open === i;
              return (
                <div key={r.id} className={`in overflow-hidden rounded-[0.875rem] border transition-colors duration-200 ${isOpen ? "border-accent bg-accent-wash" : "border-line bg-surface"}`}>
                  <button
                    type="button"
                    id={`role-${r.id}`}
                    aria-expanded={isOpen}
                    aria-controls={`rp-${r.id}`}
                    onClick={() => {
                      setOpen(isOpen ? null : i);
                      if (!opened.includes(i)) setOpened([...opened, i]);
                    }}
                    className="cta-soft flex w-full cursor-pointer items-center gap-3.5 px-[1.125rem] py-4 text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
                  >
                    <Icon draw className="size-[1.625rem] shrink-0 text-accent">{r.icon}</Icon>
                    <b className="flex-1 text-base font-semibold text-heading">{r.name}</b>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`size-5 shrink-0 text-muted transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                  {/* the panel opens by animating its row height from 0 to its content */}
                  <div id={`rp-${r.id}`} role="region" aria-labelledby={`role-${r.id}`} className={`grid transition-[grid-template-rows] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="min-h-0 overflow-hidden" inert={!isOpen}>
                      <div className="px-[1.125rem] pb-5">
                        <p className="mb-4 text-[0.9375rem] leading-relaxed text-muted">{r.text}</p>
                        {opened.includes(i) && <Frame panes={[r.screen]} current={0} />}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
        <div
          className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] items-start gap-[clamp(1.5rem,3vw,3rem)] max-[960px]:grid-cols-1"
          onPointerEnter={(e) => e.pointerType === "mouse" && setPaused(true)}
          onPointerLeave={(e) => e.pointerType === "mouse" && setPaused(false)}
        >
          <div role="tablist" aria-label="Roles" className="grid grid-cols-2 gap-2.5 max-[520px]:grid-cols-1">
            {ROLES.map((r, i) => {
              const on = current === i;
              return (
                <button
                  key={r.id}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`role-${r.id}`}
                  aria-controls={`rp-${r.id}`}
                  aria-selected={on}
                  tabIndex={on ? 0 : -1}
                  onClick={() => pick(i)}
                  onKeyDown={(e) => onKey(e, i)}
                  onPointerMove={tilt}
                  onPointerLeave={untilt}
                  data-draw-host
                  className={`role-card in relative grid cursor-pointer grid-cols-[auto_1fr] items-start gap-x-3.5 gap-y-1 rounded-[0.875rem] border px-[1.125rem] py-4 text-left transition-[border-color,box-shadow,transform,translate,background-color] duration-200 hover:-translate-y-0.5 hover:border-accent-line focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent max-[520px]:items-center ${
                    on ? "border-accent bg-accent-wash shadow-[0_0_0_1px_var(--accent)]" : "border-line bg-surface"
                  }`}
                >
                  <Icon draw className="row-span-2 mt-0.5 size-[1.625rem] text-accent max-[520px]:row-span-1">{r.icon}</Icon>
                  <b className="text-base font-semibold text-heading">{r.name}</b>
                  <span className="text-[0.8125rem] leading-normal text-muted max-[520px]:hidden">{r.text}</span>
                  {on && !manual && !paused && (
                    <span key={current} className="absolute inset-x-[1.125rem] -bottom-px h-0.5 origin-left animate-[role-timer_6s_linear_forwards] rounded-sm bg-accent" aria-hidden="true" />
                  )}
                </button>
              );
            })}
          </div>
          <div className="sticky top-[calc(var(--topbar)+1.5rem)] max-[960px]:static max-[960px]:-order-1">
            <Frame panes={ROLES.map((r) => r.screen)} current={current} ids={ROLES.map((r) => `rp-${r.id}`)} labelledBy={ROLES.map((r) => `role-${r.id}`)} />
            <p className="mt-3 text-center text-sm font-semibold text-accent" aria-live="polite">
              {ROLES[current].name}’s view
            </p>
          </div>
        </div>
        )}
      </div>
    </section>
  );
}
