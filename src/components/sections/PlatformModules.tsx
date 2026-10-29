"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { showPanel } from "@/lib/motion";
import SectionHead from "../SectionHead";
import BedsScreen from "../screens/BedsScreen";
import BillScreen from "../screens/BillScreen";
import DashScreen from "../screens/DashScreen";
import EmrScreen from "../screens/EmrScreen";
import Phones from "../screens/Phones";
import TasksScreen from "../screens/TasksScreen";

const MODULES = [
  { id: "emr", name: "Rehab EMR", short: "Notes for every discipline on one record", screen: <EmrScreen />, points: ["Doctor and nursing notes", "Physiotherapy and assessment scales", "Respiratory, speech and psychology", "Dietetics with calorie and protein plans"] },
  { id: "flow", name: "Clinical workflow", short: "Care plans, orders and tasks", screen: <TasksScreen />, points: ["Care plans and protocols", "Orders, including by voice", "Tasks, medications and vitals", "Progress reports"] },
  { id: "ops", name: "Operations", short: "Beds, admissions and pharmacy", screen: <BedsScreen />, points: ["Bed management", "Admissions and discharge", "Service packages", "Pharmacy and inventory"] },
  { id: "rev", name: "Revenue", short: "OP and IP billing, packages", screen: <BillScreen />, points: ["OP and IP billing", "Package and à-la-carte charges", "Collections and receipts", "Revenue reports"] },
  { id: "conn", name: "Connected care", short: "Patient and partner doctor apps", screen: <Phones />, points: ["Patient app for home exercises and reports", "Partner doctor app to follow referrals", "Notifications", "Consented sharing with family"] },
  { id: "ai", name: "Automation & analytics", short: "Triggers, dashboards and KPIs", screen: <DashScreen />, points: ["Automated triggers and alerts", "Dashboards for every role", "KPIs for management", "AI discharge summaries"] },
];

export default function PlatformModules() {
  const [current, setCurrent] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const panels = useRef<HTMLDivElement>(null);
  const glide = useRef<HTMLSpanElement>(null);

  // hover (desktop, globals.css "Module list hover"): one highlight glides to whichever tab the mouse is on
  const follow = (el: HTMLElement | null) => {
    const g = glide.current;
    if (!g) return;
    if (!el) {
      g.classList.remove("is-on");
      return;
    }
    g.style.transform = `translateY(${el.offsetTop}px)`;
    g.style.height = `${el.offsetHeight}px`;
    g.classList.add("is-on");
  };

  useEffect(() => {
    showPanel(panels.current?.querySelector<HTMLElement>(`#p-${MODULES[current].id}`) ?? null);
  }, [current]);

  const onKey = (e: KeyboardEvent, i: number) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    const next = (i + step + MODULES.length) % MODULES.length;
    setCurrent(next);
    tabs.current[next]?.focus();
  };

  return (
    <section id="platform" className="sec-tight">
      <div className="wrap">
        <SectionHead title="Everything a rehab centre runs on" lede="Six modules, one patient record. Start with what you need and add the rest as you grow." />
        <div data-reveal className="grid grid-cols-[minmax(0,20rem)_minmax(0,1fr)] items-start gap-10 max-[900px]:grid-cols-1 max-[900px]:gap-6">
          <div role="tablist" aria-label="Platform modules" onPointerLeave={() => follow(null)} className="mod-list relative flex flex-col gap-1 max-[900px]:flex-row max-[900px]:gap-2 max-[900px]:overflow-x-auto max-[900px]:pb-1 max-[900px]:[scrollbar-width:none]">
            <span ref={glide} className="mod-glide" aria-hidden="true" />
            {MODULES.map((m, i) => (
              <button
                key={m.id}
                onPointerEnter={(e) => e.pointerType === "mouse" && follow(e.currentTarget)}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`t-${m.id}`}
                aria-controls={`p-${m.id}`}
                aria-selected={current === i}
                tabIndex={current === i ? 0 : -1}
                onClick={() => setCurrent(i)}
                onKeyDown={(e) => onKey(e, i)}
                className={`mod-tab relative flex cursor-pointer flex-col gap-1 rounded-xl border px-4 py-3.5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent max-[900px]:flex-none max-[900px]:rounded-full max-[900px]:border-line max-[900px]:px-3.5 max-[900px]:py-2 ${
                  current === i ? "border-line bg-surface" : "border-transparent max-[1000px]:hover:bg-hover"
                }`}
              >
                <b className={`text-base font-semibold max-[900px]:text-sm max-[900px]:whitespace-nowrap ${current === i ? "text-accent" : "text-heading"}`}>{m.name}</b>
                <span className="text-sm leading-normal text-muted max-[900px]:hidden">{m.short}</span>
              </button>
            ))}
          </div>
          <div ref={panels}>
            {MODULES.map((m, i) => (
              <div key={m.id} role="tabpanel" id={`p-${m.id}`} aria-labelledby={`t-${m.id}`} hidden={current !== i} className="grid gap-6">
                {m.screen}
                <ul className="grid grid-cols-2 gap-x-8 gap-y-3 max-[560px]:grid-cols-1">
                  {m.points.map((p) => (
                    <li key={p} className="relative pl-5 leading-normal before:absolute before:top-[0.6em] before:left-0 before:size-1.5 before:rounded-full before:bg-accent">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
