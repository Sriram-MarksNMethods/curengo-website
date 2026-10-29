"use client";

// Home hero: the care network around the headline (engine in ../hero/network.js).
// Hovering a goal card re-arranges the network to show that route; clicking it opens the matching page.
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { startNetwork } from "../hero/network";

const GOALS = [
  { intent: "RMIS", text: "I want to digitise my rehabilitation centre", short: "RMIS", href: "/platform" },
  { intent: "PARTNER", text: "I want to refer patients and follow their recovery", short: "PARTNER APP", href: "/platform#apps" },
  { intent: "PATIENT", text: "I want to continue my recovery at home", short: "PATIENT APP", href: "/platform#apps" },
];

export default function Hero() {
  useEffect(() => startNetwork(), []);

  return (
    <div id="curtain" aria-label="Curengo" className="relative flex min-h-svh flex-col overflow-hidden bg-page bg-(image:--hero-wash) pt-(--topbar)">
      <section
        id="hero"
        className="relative transition-opacity duration-500 [.js_&:not([data-ready])]:max-[900px]:opacity-0 [.js_&:not([data-ready])]:max-[900px]:animate-[hero-show_0.5s_2.5s_forwards] flex flex-[1_0_auto] flex-col items-center justify-center px-[max(1.5rem,env(safe-area-inset-right,0px))] pt-[clamp(1rem,4vh,3rem)] pb-[clamp(1.5rem,6vh,4rem)] max-[900px]:justify-start max-[900px]:pt-2 max-[900px]:pb-14"
      >
        <div className="web" id="web">
          <canvas id="cv" aria-hidden="true" />
          <nav id="nodes" aria-label="Who takes part in care" />
        </div>

        {/* narrow screens: the network fills the first screen on this stage (capped at 1.6x the width on tall phones),
            with the board, headline and description in its middle (laid out by network.js) */}
        <div id="webStage" aria-hidden="true" className="relative z-0 hidden h-[min(calc(100svh_-_var(--topbar)_-_1rem),160vw)] w-full max-w-md shrink-0 max-[900px]:block" />

        <div
          id="copy"
          className="relative z-1 flex max-w-208 flex-col items-center gap-5 text-center max-[900px]:w-full max-[900px]:gap-4 min-[901px]:[@media(max-height:720px)]:gap-3.5 min-[901px]:[@media(max-height:620px)]:gap-2.5"
        >
          <p className="flex flex-col items-center gap-[1.125rem] max-[900px]:gap-3">
            <Image
              src="/brand/curengo-logo.png"
              alt="Curengo"
              width={720}
              height={267}
              loading="eager"
              className="block h-[clamp(2.75rem,1.9rem+3.4vw,4rem)] w-auto dark:hidden max-[900px]:hidden! min-[901px]:[@media(max-height:620px)]:h-9"
            />
            <Image
              src="/brand/curengo-logo-reverse.png"
              alt=""
              width={360}
              height={124}
              loading="eager"
              className="hidden h-[clamp(2.75rem,1.9rem+3.4vw,4rem)] w-auto dark:block max-[900px]:hidden! min-[901px]:[@media(max-height:620px)]:h-9"
            />
            <span className="flap inline-flex items-center">
              <span className="flap__row inline-flex gap-px" id="flapRow" aria-hidden="true" />
              <span className="flap__label sr-only">
                Curengo RMIS
              </span>
            </span>
          </p>
          {/* phones: one line, nearly edge to edge, same size; only phones too narrow for that wrap it onto two balanced lines */}
          <h1 className="m-0 text-[clamp(1.5rem,0.9rem+2.4vw,2.25rem)] leading-[1.15] font-medium tracking-[-0.02em] text-heading max-[900px]:-mx-4 max-[900px]:text-balance max-[400px]:text-[1.3125rem]">
            <span className="block max-[900px]:inline">Digitizing the</span> <span className="block max-[900px]:inline">Continuum of Care.</span>
          </h1>
          {/* phones: nearly full width, and the size shrinks just enough that the first line always fits (so it is 3 lines) */}
          <p className="max-w-152 text-[1.0625rem] leading-[1.7] text-muted max-[900px]:-mx-3 max-[900px]:max-w-none max-[900px]:text-[min(1.0625rem,calc((100vw-1.5rem)/21.8))] max-[400px]:text-[min(0.9375rem,calc((100vw-1.5rem)/21.8))] min-[901px]:[@media(max-height:620px)]:hidden">
            Rehabilitation Management Information System
            <br />
            Connecting care teams. Streamlining operations. Empowering recovery.
          </p>
          <div className="mt-11 flex flex-col items-center gap-3 max-[900px]:mt-6 max-[900px]:w-full max-[900px]:max-w-lg max-[900px]:self-center max-[900px]:items-stretch min-[901px]:[@media(max-height:620px)]:mt-[1.125rem]">
            <p className="mb-1 text-base font-semibold tracking-[0.01em] text-accent">What do you want to solve today?</p>
            <nav aria-label="What you need" className="flex flex-wrap items-stretch justify-center gap-4 max-[900px]:flex-col max-[900px]:gap-2.5">
              {GOALS.map((g) => (
                <Link
                  key={g.intent}
                  href={g.href}
                  data-intent={g.intent}
                  className="goal cta-soft group relative flex w-56 flex-col items-center gap-2.5 rounded-xl border border-line bg-surface px-5 py-[1.125rem] text-center no-underline transition-[color,border-color,background-color,transform,translate] duration-150 hover:-translate-y-0.5 hover:border-accent-line max-[1000px]:hover:bg-accent-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent max-[900px]:w-auto max-[900px]:flex-row max-[900px]:justify-between max-[900px]:gap-4 max-[900px]:px-4 max-[900px]:py-3.5 max-[900px]:text-left"
                >
                  <span className="text-[0.9375rem] leading-[1.4] font-medium text-body group-hover:text-accent">{g.text}</span>
                  <span className="shrink-0 text-xs font-semibold tracking-[0.02em] text-muted group-hover:text-accent">{g.short}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <p
          id="disclaimer"
          aria-hidden="true"
          className="pointer-events-none absolute bottom-2 left-1/2 z-1 m-0 w-[calc(100%-3rem)] -translate-x-1/2 text-center text-[0.625rem] leading-normal tracking-[0.06em] text-faint uppercase opacity-0 transition-opacity duration-400 data-on:opacity-100"
        >
          Illustrative representation only. Actual workflows, care teams and participants may vary by centre.
        </p>
      </section>
    </div>
  );
}
