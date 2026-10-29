"use client";

// Pricing plans with a Monthly / Annually switch.
// TODO: every price, plan name and limit is a placeholder until Curengo confirms them.
import Link from "next/link";
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { Icon, Tick } from "../icons";
import { btnGhost, btnLight } from "../ui";

type Billing = "monthly" | "annual";
const PLANS: { name: string; text: string; icon: ReactNode; price: Record<Billing, string>; unit: Record<Billing, string>; points: ReactNode[]; cta: [string, string]; featured?: boolean }[] = [
  {
    name: "Clinic",
    text: "For outpatient physiotherapy clinics.",
    icon: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
    price: { monthly: "[₹ —]", annual: "[₹ —]" },
    unit: { monthly: "per month", annual: "per month, billed yearly" },
    points: ["Assessments and session notes", "Packages and OP billing", <>Up to <span className="ph">[5]</span> staff logins</>],
    cta: ["Book a Demo", "/book-a-demo"],
  },
  {
    name: "Centre",
    text: "For inpatient rehab and transitional care centres.",
    icon: <><path d="M2 4v16" /><path d="M2 8h18a2 2 0 0 1 2 2v10" /><path d="M2 17h20" /><path d="M6 8v9" /></>,
    price: { monthly: "[₹ —]", annual: "[₹ —]" },
    unit: { monthly: "per month", annual: "per month, billed yearly" },
    points: ["Everything in Clinic", "Rehab EMR for every discipline", "Beds, admissions, pharmacy and IP billing", "Voice orders and discharge summaries"],
    cta: ["Book a Demo", "/book-a-demo"],
    featured: true,
  },
  {
    name: "Group",
    text: "For chains with several centres.",
    icon: <><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M9 22v-4h6v4" /><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01" /></>,
    price: { monthly: "[Custom]", annual: "[Custom]" },
    unit: { monthly: "", annual: "" },
    points: ["Everything in Centre", "Reports across all centres", "Dedicated onboarding"],
    cta: ["Talk to Our Team", "/book-a-demo#contact"],
  },
];

export default function Plans() {
  const [billing, setBilling] = useState<Billing>("monthly");
  const [swapping, setSwapping] = useState(false);
  const buttons = useRef<Record<Billing, HTMLButtonElement | null>>({ monthly: null, annual: null });
  const [thumb, setThumb] = useState({ x: 0, w: 0 });

  // slide the highlight under the chosen option
  useLayoutEffect(() => {
    const place = () => {
      const b = buttons.current[billing], first = buttons.current.monthly;
      if (b && first) setThumb({ x: b.offsetLeft - first.offsetLeft, w: b.offsetWidth });
    };
    place();
    window.addEventListener("resize", place);
    document.fonts?.ready.then(place);
    return () => window.removeEventListener("resize", place);
  }, [billing]);

  const choose = (b: Billing) => {
    if (b === billing) return;
    setSwapping(true);
    setTimeout(() => {
      setBilling(b);
      setSwapping(false);
    }, 180);
  };

  return (
    <section id="plans" className="sec-tight">
      <div className="wrap">
        <div className="mb-[clamp(1.75rem,1.25rem+1.2vw,2.5rem)] flex justify-center">
          <div role="group" aria-label="Billing period" className="relative inline-flex rounded-full border border-line bg-surface p-[0.3125rem] shadow-ui">
            <span aria-hidden="true" className="absolute top-[0.3125rem] bottom-[0.3125rem] left-[0.3125rem] rounded-full bg-accent transition-[transform,translate,width] duration-450 ease-out-soft" style={{ width: thumb.w, transform: `translateX(${thumb.x}px)` }} />
            {(["monthly", "annual"] as const).map((b) => (
              <button
                key={b}
                ref={(el) => {
                  buttons.current[b] = el;
                }}
                type="button"
                aria-pressed={billing === b}
                onClick={() => choose(b)}
                className={`cta-soft relative z-1 inline-flex h-10 cursor-pointer items-center gap-2 rounded-full px-5 text-[0.9375rem] font-semibold transition-colors duration-300 ${billing === b ? "text-accent-contrast" : "text-muted"}`}
              >
                {b === "monthly" ? "Monthly" : "Annually"}
                {b === "annual" && (
                  <em className={`rounded-full px-2 py-0.5 text-[0.6875rem] font-bold not-italic ${billing === b ? "bg-white/20" : "bg-[color-mix(in_srgb,var(--ok)_14%,transparent)] text-ok"}`}>
                    Save <span className="ph">[x]</span>%
                  </em>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 items-stretch gap-5 max-[960px]:mx-auto max-[960px]:max-w-lg max-[960px]:grid-cols-1">
          {PLANS.map((p) => (
            <article
              key={p.name}
              data-reveal
              data-draw-host
              className={`group/plan relative flex flex-col overflow-hidden rounded-[1.25rem] border p-[clamp(1.5rem,1.2rem+0.8vw,2rem)] transition-[transform,translate,box-shadow,border-color] duration-300 ${
                p.featured
                  ? "navy border-transparent shadow-[0_30px_60px_-28px_rgba(23,19,61,0.6)] min-[961px]:-translate-y-3 min-[961px]:hover:-translate-y-5"
                  : "border-line bg-surface hover:-translate-y-1 hover:border-accent-line hover:shadow-ui"
              }`}
            >
              {p.featured && <span aria-hidden="true" className="pointer-events-none absolute -top-[30%] -right-[30%] aspect-square w-[90%] bg-[radial-gradient(closest-side,rgba(105,80,155,0.55),transparent)]" />}
              <div className="relative flex items-center justify-between gap-3">
                <span className="grid size-11 place-items-center rounded-xl bg-accent-soft text-accent">
                  <Icon draw className="size-6">{p.icon}</Icon>
                </span>
                {p.featured && <span className="rounded-full bg-linear-90 from-[#c3b2f3] to-[#7fd9ea] px-3 py-1.5 text-xs font-bold text-navy">Most centres</span>}
              </div>
              <h3 className="relative mt-5 mb-1.5 text-[1.375rem] font-semibold text-heading">{p.name}</h3>
              <p className="relative min-h-[3em] leading-[1.55] text-muted">{p.text}</p>
              <div className="relative my-5 flex flex-wrap items-baseline gap-x-2 gap-y-1 border-y border-line py-5">
                <b className={`ph text-[clamp(2rem,1.6rem+1vw,2.5rem)] leading-none font-semibold tracking-[-0.03em] transition-opacity duration-200 ${swapping ? "opacity-0" : ""}`}>{p.price[billing]}</b>
                <span className={`text-sm text-muted transition-opacity duration-200 ${swapping ? "opacity-0" : ""}`}>{p.unit[billing]}</span>
              </div>
              <ul className="relative mb-7 grid gap-3">{p.points.map((pt, i) => <Tick key={i}>{pt}</Tick>)}</ul>
              <Link href={p.cta[1]} className={`${p.featured ? btnLight : btnGhost} relative mt-auto w-full`}>
                {p.cta[0]}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
