"use client";

// Voice order demo: press the mic, a spoken order is "typed out", then turns into structured orders
// that go to the nurse task list, pharmacy and bill. Plays once by itself when it first scrolls into view.
import { useCallback, useEffect, useRef, useState } from "react";

const SAID = "Start paracetamol 650 twice a day after food for three days, and a CBC tomorrow morning.";
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function VoiceDemo() {
  const root = useRef<HTMLDivElement>(null);
  const running = useRef(false);
  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);
  const [hint, setHint] = useState("Press the mic");
  const [step, setStep] = useState(0); // how many result rows are shown

  const play = useCallback(async () => {
    if (running.current) return;
    running.current = true;
    const fast = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pause = (ms: number) => wait(fast ? 0 : ms);
    setStep(0);
    setText("");
    setListening(true);
    setHint("Listening…");
    let said = "";
    for (const word of SAID.split(" ")) {
      said += (said ? " " : "") + word;
      setText(said);
      await pause(140);
    }
    await pause(350);
    setListening(false);
    setHint("Structuring…");
    for (let i = 1; i <= 3; i++) {
      await pause(550);
      setStep(i);
    }
    setHint("Play again");
    running.current = false;
  }, []);

  useEffect(() => {
    const el = root.current;
    const auto = () => setTimeout(play, 500);
    el?.addEventListener("revealed", auto, { once: true });
    return () => el?.removeEventListener("revealed", auto);
  }, [play]);

  return (
    <div ref={root} data-reveal className="screen-dark relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface text-sm shadow-ui">
      <div className="flex h-9 items-center gap-1.5 border-b border-line bg-sunken px-3.5" aria-hidden="true">
        <i className="size-[0.5625rem] rounded-full bg-fill" />
        <i className="size-[0.5625rem] rounded-full bg-fill" />
        <i className="size-[0.5625rem] rounded-full bg-fill" />
        <span className="ml-2.5 text-xs font-medium text-faint">Curengo · Orders · Bed 12</span>
      </div>
      <div className="grid gap-5 p-6">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={play}
            aria-label="Play the voice order demo"
            className={`cta-soft relative grid size-14 shrink-0 cursor-pointer place-items-center rounded-full bg-white text-[#4d2a8d] [--soft-fill:rgba(77,42,141,0.16)] transition-transform hover:scale-105 after:absolute after:-inset-1.5 after:rounded-full after:border-2 after:border-white/50 after:opacity-0 ${listening ? "after:animate-[mic-pulse_1.2s_ease-out_infinite]" : ""}`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-[1.375rem]">
              <rect x="9" y="2" width="6" height="12" rx="3" />
              <path d="M5 10a7 7 0 0 0 14 0M12 17v5" />
            </svg>
          </button>
          <div className="flex h-10 flex-1 items-center gap-[3px]" aria-hidden="true">
            {Array.from({ length: 20 }, (_, i) => (
              <i
                key={i}
                className={`h-[15%] max-w-[5px] flex-1 rounded-full bg-accent ${listening ? "animate-[wave_0.9s_ease-in-out_infinite_alternate] opacity-100" : "opacity-50"}`}
                style={{ animationDelay: `${-(i % 3) * 0.3}s`, animationDuration: `${0.7 + (i % 5) * 0.1}s` }}
              />
            ))}
          </div>
          <span className="text-xs font-semibold whitespace-nowrap text-faint">{hint}</span>
        </div>
        <p className="min-h-13 text-[1.0625rem] leading-normal text-heading" aria-live="polite">
          {text}
          <i className={`ml-0.5 inline-block h-[1.1em] w-0.5 bg-accent align-[-0.2em] ${listening ? "animate-[blink_0.8s_steps(2)_infinite]" : "opacity-0"}`} aria-hidden="true" />
        </p>
        <div className="grid grid-cols-2 gap-3 max-[560px]:grid-cols-1">
          {[
            ["Medicine", "Tab. Paracetamol 650 mg", "1-0-1 · after food · 3 days"],
            ["Lab test", "CBC", "Tomorrow · 07:00"],
          ].map(([kind, what, when], i) => (
            <div key={kind} data-step className={`rounded-xl border border-line bg-page px-4 py-3.5 ${step > i ? "on" : ""}`}>
              <span className="mb-1.5 block text-[0.6875rem] font-bold tracking-[0.06em] text-accent uppercase">{kind}</span>
              <b className="block text-[0.9375rem] text-heading">{what}</b>
              <small className="text-xs text-muted">{when}</small>
            </div>
          ))}
        </div>
        <div data-step className={`flex flex-wrap items-center gap-2 text-xs text-faint ${step > 2 ? "on" : ""}`}>
          <span>Sent to</span>
          {["Nurse task list", "Pharmacy", "Bill"].map((t) => (
            <em key={t} className="rounded-full bg-accent-soft px-2.5 py-1.5 font-semibold text-heading not-italic">
              <span className="text-[#7ee2b0]">✓</span> {t}
            </em>
          ))}
        </div>
      </div>
    </div>
  );
}
