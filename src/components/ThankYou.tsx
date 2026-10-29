"use client";

// Thank-you page after "Book a demo". The form's navy flood is still covering the screen when this
// page opens: fade it away, then the ring and check draw in and the next steps rise one by one.
// The first name comes from sessionStorage (set by DemoForm), never from the URL.
import Link from "next/link";
import { useEffect, useSyncExternalStore } from "react";
import { Tick } from "./icons";
import { btnLight, btnOutlineLight } from "./ui";

const NEXT = [
  <>We call you within <span className="ph">[one working day]</span> to pick a time</>,
  <>A walkthrough using your centre’s workflow</>,
  <>Pricing for your number of beds</>,
];

const readName = () => {
  try {
    return sessionStorage.getItem("curengo-demo-name") ?? "";
  } catch {
    return ""; // private mode: plain "Thank you"
  }
};

export default function ThankYou() {
  // read on the client only (the static page is built with the plain "Thank you")
  const name = useSyncExternalStore(() => () => {}, readName, () => "");

  useEffect(() => {
    const floods = document.querySelectorAll<HTMLElement>(".cta-flood");
    const fade = setTimeout(() => {
      floods.forEach((f) => {
        f.style.opacity = "0";
        setTimeout(() => f.remove(), 500);
      });
    }, 150);
    return () => clearTimeout(fade);
  }, []);

  return (
    <section className="navy navy-glow hero-purple flex min-h-svh items-center pt-(--topbar) pb-16">
      <div className="wrap flex flex-col items-center text-center">
        <div className="relative mt-10 mb-9 grid size-24 place-items-center" aria-hidden="true">
          <span className="ty-pulse absolute inset-0 rounded-full border-2 border-white/40" />
          <span className="ty-pulse absolute inset-0 rounded-full border-2 border-white/40" />
          <svg viewBox="0 0 96 96" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" className="ty-mark relative size-24">
            <circle cx="48" cy="48" r="45" strokeWidth="3" pathLength="1" transform="rotate(-90 48 48)" />
            <path d="M30 49l12 12 24-26" strokeWidth="5" pathLength="1" />
          </svg>
        </div>
        <h1 className="ty-in m-0 text-[clamp(2.25rem,1.6rem+2.4vw,3.5rem)] leading-[1.08] font-medium tracking-[-0.025em] text-white [animation-delay:1.2s]">
          {name ? `Thank you, ${name}.` : "Thank you."}
        </h1>
        <p className="ty-in mt-5 max-w-xl text-lg leading-[1.7] text-[#c6bfe6] [animation-delay:1.35s]">
          We’ll call you within <span className="ph">[one working day]</span> to set up your demo.
        </p>

        <div className="ty-in mt-10 w-full max-w-md rounded-2xl border border-line bg-surface p-7 text-left [animation-delay:1.5s]">
          <h2 className="mb-4 text-lg font-semibold text-heading">What happens next</h2>
          <ul className="grid gap-2.5">
            {NEXT.map((item, i) => (
              <Tick key={i} className="ty-in" style={{ animationDelay: `${1.65 + i * 0.12}s` }}>{item}</Tick>
            ))}
          </ul>
        </div>

        <div className="ty-in mt-9 flex flex-wrap justify-center gap-3 [animation-delay:2.05s]">
          <Link href="/" className={btnLight}>Go to the home page</Link>
          <Link href="/platform" className={btnOutlineLight}>Explore the Platform</Link>
        </div>
      </div>
    </section>
  );
}
