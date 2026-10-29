"use client";

// "Follow one patient through Curengo": seven steps of a stay, each with its own screen in a same-size frame.
// The steps move on by themselves every few seconds (a bar fills under the current step); picking a step jumps
// there and the timer starts again. Paused while the mouse is over it or the section is off screen.
import { useEffect, useRef, useState } from "react";
import Frame from "../Frame";
import SectionHead from "../SectionHead";
import BedsScreen from "../screens/BedsScreen";
import BillScreen from "../screens/BillScreen";
import EmrScreen from "../screens/EmrScreen";
import Phones from "../screens/Phones";
import ScalesScreen from "../screens/ScalesScreen";
import SummaryDemo from "../screens/SummaryDemo";
import TasksScreen from "../screens/TasksScreen";

// steps from the client's brief
const STEPS = [
  { t: "Admission", who: ["Front desk", "Doctor", "Billing"], text: "Bed assigned, hospital records attached and the service package set up on arrival.", screen: <BedsScreen /> },
  { t: "Assessment", who: ["Doctor", "Physio", "Nurse"], text: "Standard scales record where the patient starts, so every later score has a baseline.", screen: <ScalesScreen /> },
  { t: "Multidisciplinary care", who: ["Doctor", "Nurse", "Physio", "Dietitian", "Therapists"], text: "One care plan shared by the whole team, with each discipline writing to the same record.", screen: <EmrScreen /> },
  { t: "Medication & therapy", who: ["Nurse", "Pharmacy", "Physio"], text: "Orders by voice, medication rounds on the nurse task list, therapy sessions logged as they happen.", screen: <TasksScreen /> },
  { t: "Billing", who: ["Billing", "Management"], text: "Package and à-la-carte charges add up as care is given, so the final bill holds no surprises.", screen: <BillScreen /> },
  { t: "Discharge", who: ["Doctor", "Nurse"], text: "The discharge summary is drafted from the record, then reviewed and signed by the doctor.", screen: <SummaryDemo inFrame /> },
  { t: "Follow-up", who: ["Patient", "Family", "Partner doctor"], text: "Exercises and reports in the patient app; the referring doctor follows progress in the partner app.", screen: <Phones inFrame /> },
];

const STEP_MS = 5000;

export default function Journey({ navy = false }: { navy?: boolean }) {
  const [cur, setCur] = useState(0);
  const [hover, setHover] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const [round, setRound] = useState(0); // bumps when someone picks a step, so the timer restarts
  const section = useRef<HTMLElement>(null);
  const list = useRef<HTMLOListElement>(null);
  const running = onScreen && !hover;

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!running || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setCur((c) => (c + 1) % STEPS.length), STEP_MS);
    return () => clearTimeout(t);
  }, [cur, running, round]);

  // phones: the steps row scrolls sideways so the current step stays in view (the page itself never moves)
  useEffect(() => {
    const ol = list.current, li = ol?.children[cur] as HTMLElement | undefined;
    if (!ol || !li || ol.scrollWidth <= ol.clientWidth) return;
    ol.scrollTo({ left: li.offsetLeft - ol.offsetLeft - 24, behavior: "smooth" });
  }, [cur]);
  const go = (i: number) => {
    setCur((i + STEPS.length) % STEPS.length);
    setRound((r) => r + 1);
  };
  const s = STEPS[cur];

  return (
    <section
      ref={section}
      id="journey"
      onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setHover(false)}
      className={`sec-tight ${navy ? "navy navy-glow" : "border-t border-line"}`}>
      <div className="wrap">
        <SectionHead title="Follow one patient through Curengo" lede="From the day they arrive to the weeks after they go home, every step is recorded in one place." />
        <ol ref={list} role="tablist" aria-label="Patient journey" data-reveal className="mb-8 grid grid-cols-7 gap-2 max-[900px]:flex max-[900px]:gap-4 max-[900px]:overflow-x-auto max-[900px]:[scrollbar-width:none]">
          {STEPS.map((step, i) => (
            <li key={step.t} className="max-[900px]:flex-[0_0_7.5rem]">
              <button
                type="button"
                role="tab"
                aria-selected={i === cur}
                tabIndex={i === cur ? 0 : -1}
                onClick={() => go(i)}
                data-gleam={i <= cur || undefined}
                className="tab-fx flex w-full cursor-pointer flex-col items-start gap-3 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {/* hover (globals.css "Tab hover"): a line sweeps the bar, the number rolls, the title underlines */}
                <span className={`relative block h-0.5 w-full rounded-sm transition-colors duration-200 ${i < cur ? "bg-accent" : "bg-line"}`}>
                  {/* the current step's bar fills up while it waits for the next step */}
                  {i === cur && (
                    <span
                      key={`${cur}-${round}`}
                      aria-hidden="true"
                      className={`absolute inset-0 origin-left rounded-sm bg-accent ${running ? "animate-[role-timer_5s_linear_forwards]" : ""}`}
                      style={running ? undefined : { transform: "scaleX(1)" }}
                    />
                  )}
                  <i className="tab-fx__sweep" aria-hidden="true" />
                </span>
                <span className={`tab-fx__roll text-xs leading-[1.4] font-semibold tabular-nums ${i === cur ? "text-accent" : "text-faint"}`}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                </span>
                <span className={`tab-fx__line text-[0.9375rem] leading-[1.3] font-semibold ${i === cur ? "text-accent" : "text-body"}`}>{step.t}</span>
              </button>
            </li>
          ))}
        </ol>
        <div data-reveal className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] items-center gap-[clamp(2rem,4vw,4rem)] max-[900px]:grid-cols-1 max-[900px]:gap-6">
          <div aria-live={running ? "off" : "polite"}>
            <h3 className="text-2xl font-semibold text-heading">{s.t}</h3>
            <p className="mt-3 min-h-[5.1em] leading-[1.7] text-muted">{s.text}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {s.who.map((w) => (
                <span key={w} className="rounded-full bg-accent-soft px-2.5 py-1 text-[0.8125rem] font-medium text-accent">{w}</span>
              ))}
            </div>
          </div>
          <Frame panes={STEPS.map((step) => step.screen)} current={cur} />
        </div>
      </div>
    </section>
  );
}
