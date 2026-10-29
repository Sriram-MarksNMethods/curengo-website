"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, type FormEvent } from "react";
import { btnPrimary } from "./ui";

const ROLES = ["Owner or director", "Medical director", "Doctor", "Nursing head", "Physiotherapist", "Administrator", "Other"];
const CENTRE_TYPES = ["Inpatient rehabilitation", "Transitional / subacute care", "Post-hospitalization care", "OP physiotherapy clinic", "Assisted living", "Home care"];

// Motion: labels light up on focus, a tick draws in once a required field is valid, empty/wrong fields
// shake on submit. On send the button shrinks into a spinner, turns into a check, then a navy flood
// grows from it and the thank-you page opens underneath (the flood fades there, see ThankYou.tsx).
const field = "group relative flex flex-col gap-2";
const label = "text-sm font-semibold text-heading transition-colors duration-200 group-focus-within:text-accent";
const input =
  "peer min-h-[2.875rem] w-full rounded-lg border border-line bg-page px-3.5 py-2.5 text-base text-heading transition-[border-color,box-shadow] focus:border-accent focus:shadow-[0_0_0_3px_var(--accent-soft)] focus:outline-none user-invalid:border-[#c0392b]";

/** Tick that draws itself beside a required field once it is filled in correctly */
function Valid({ select = false }: { select?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="var(--ok)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
      className={`field-tick pointer-events-none absolute bottom-[0.875rem] size-4 ${select ? "right-9" : "right-3.5"}`}>
      <path d="M5 12l5 5 9-10" pathLength="1" />
    </svg>
  );
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function DemoForm() {
  const router = useRouter();
  const button = useRef<HTMLButtonElement>(null);
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.querySelectorAll<HTMLElement>(":invalid").forEach((el) => {
        el.classList.remove("field-shake");
        void el.offsetWidth; // restart the animation
        el.classList.add("field-shake");
        el.addEventListener("animationend", () => el.classList.remove("field-shake"), { once: true });
      });
      form.reportValidity();
      return;
    }
    const data = Object.fromEntries(new FormData(form));
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const btn = button.current!;
    btn.style.width = `${btn.offsetWidth}px`; // fixed start width so it can shrink into a circle
    setState("sending");
    try {
      const [res] = await Promise.all([
        fetch("/api/demo", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }),
        wait(reduce ? 0 : 900), // let the spinner be seen even when the server is quick
      ]);
      if (!res.ok) throw new Error(String(res.status));
    } catch {
      btn.style.width = "";
      setState("error");
      return;
    }
    try {
      sessionStorage.setItem("curengo-demo-name", String(data.name).trim().split(" ")[0]);
    } catch {
      /* private mode: the thank-you page falls back to a plain "Thank you" */
    }
    setState("sent");
    if (!reduce) {
      await wait(650); // the check draws in
      const r = btn.getBoundingClientRect();
      const size = Math.hypot(window.innerWidth, window.innerHeight) * 2.1;
      const flood = document.createElement("div");
      flood.className = "cta-flood";
      Object.assign(flood.style, { width: `${size}px`, height: `${size}px`, left: `${r.left + r.width / 2 - size / 2}px`, top: `${r.top + r.height / 2 - size / 2}px` });
      document.body.appendChild(flood);
      requestAnimationFrame(() => requestAnimationFrame(() => (flood.style.transform = "scale(1)")));
      await wait(600);
    }
    router.push("/thank-you");
  };

  return (
    <form noValidate onSubmit={onSubmit} className="grid grid-cols-2 gap-5 rounded-2xl border border-line bg-surface p-8 shadow-ui max-[560px]:grid-cols-1 max-[560px]:p-6">
      <div className={field}>
        <label className={label} htmlFor="f-name">Full name</label>
        <input className={input} id="f-name" name="name" autoComplete="name" required minLength={2} />
        <Valid />
      </div>
      <div className={field}>
        <label className={label} htmlFor="f-role">Your role</label>
        <select className={input} id="f-role" name="role" required defaultValue="">
          <option value="" disabled>Choose one</option>
          {ROLES.map((r) => <option key={r}>{r}</option>)}
        </select>
        <Valid select />
      </div>
      <div className={field}>
        <label className={label} htmlFor="f-centre">Centre name</label>
        <input className={input} id="f-centre" name="centre" autoComplete="organization" required minLength={2} />
        <Valid />
      </div>
      <div className={field}>
        <label className={label} htmlFor="f-type">Type of centre</label>
        <select className={input} id="f-type" name="type" required defaultValue="">
          <option value="" disabled>Choose one</option>
          {CENTRE_TYPES.map((t) => <option key={t}>{t}</option>)}
        </select>
        <Valid select />
      </div>
      <div className={field}>
        <label className={label} htmlFor="f-email">Work email</label>
        <input className={input} id="f-email" name="email" type="email" autoComplete="email" required />
        <Valid />
      </div>
      <div className={field}>
        <label className={label} htmlFor="f-phone">Phone</label>
        <input className={input} id="f-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" required pattern="[\d+\-\s\(\)]{8,}" />
        <Valid />
      </div>
      <div className={field}>
        <label className={label} htmlFor="f-beds">Number of beds <small className="font-normal text-faint">(optional)</small></label>
        <input className={input} id="f-beds" name="beds" type="number" min={0} inputMode="numeric" />
      </div>
      <div className={field}>
        <label className={label} htmlFor="f-city">City</label>
        <input className={input} id="f-city" name="city" autoComplete="address-level2" />
      </div>
      <div className={`${field} col-span-full`}>
        <label className={label} htmlFor="f-msg">What would you like to see? <small className="font-normal text-faint">(optional)</small></label>
        <textarea className={`${input} min-h-28 resize-y`} id="f-msg" name="message" />
      </div>
      {/* honeypot for spam bots: hidden from people and screen readers */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label htmlFor="f-website">Website</label>
        <input id="f-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="col-span-full flex flex-wrap items-center justify-between gap-4">
        <p className="max-w-sm text-[0.8125rem] leading-normal text-faint">
          We’ll only use these details to arrange your demo. <span className="ph">[privacy note to confirm]</span>
        </p>
        <button ref={button} type="submit" disabled={state === "sending" || state === "sent"} data-state={state === "sending" || state === "sent" ? state : undefined} className={`${btnPrimary} submit-morph`}>
          <span className="submit-morph__label">Request a demo</span>
          <span className="submit-morph__spin" aria-hidden="true" />
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="submit-morph__check">
            <path d="M5 12l5 5 9-10" pathLength="1" />
          </svg>
          <span className="sr-only" role="status">{state === "sending" ? "Sending your request" : state === "sent" ? "Request sent" : ""}</span>
        </button>
      </div>
      {state === "error" && (
        <p role="alert" className="col-span-full rounded-lg border border-[color-mix(in_srgb,var(--warn)_35%,transparent)] bg-[color-mix(in_srgb,var(--warn)_8%,transparent)] px-4 py-3 text-[0.9375rem] text-body">
          Sorry, your request didn’t go through. Please try again, or call us on <span className="ph">[phone]</span>.
        </p>
      )}
    </form>
  );
}
