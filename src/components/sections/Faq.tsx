"use client";

// Questions accordion: one open at a time, the answer's height animates open.
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { btnLight, sectionTitle } from "../ui";

const QA: { q: string; a: ReactNode }[] = [
  { q: "Is setup included?", a: <>Yes. We set up your beds, packages and users, and train each team on the screens they use. <span className="ph">[confirm]</span></> },
  { q: "Can we bring our existing patient records?", a: <>We can import patient lists and active admissions. Paper records can be scanned and attached to the patient file. <span className="ph">[confirm]</span></> },
  { q: "Do we need to install anything?", a: "No. Curengo runs in the browser on any computer or tablet, so there is nothing to install or maintain on site." },
  { q: "How long does it take to go live?", a: <span className="ph">[Typical go-live time to confirm with Curengo.]</span> },
  { q: "Where is our data stored?", a: <span className="ph">[Hosting location and backup policy to confirm with Curengo.]</span> },
  { q: "Is there a contract?", a: <span className="ph">[Billing term and notice period to confirm.]</span> },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="sec-tight bg-sunken">
      <div className="wrap grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] items-start gap-[clamp(2rem,5vw,5rem)] max-[860px]:grid-cols-1">
        <div data-reveal className="sticky top-[calc(var(--topbar)+1.5rem)] max-[860px]:static">
          <h2 className={sectionTitle}>Questions, answered</h2>
          <p className="mt-4 leading-[1.7] text-muted">Everything centres usually ask before they switch from paper. Can’t find yours?</p>
          <div className="navy mt-7 rounded-2xl p-6">
            <b className="mb-1.5 block text-[1.0625rem] text-heading">Talk to our team</b>
            <p className="mb-5 text-[0.9375rem] text-muted">We’ll answer pricing, setup and ABDM questions on a short call.</p>
            <Link href="/book-a-demo#contact" className={btnLight}>Contact us</Link>
          </div>
        </div>
        <div className="grid gap-2.5">
          {QA.map(({ q, a }, i) => {
            const isOpen = open === i;
            return (
              <div key={q} data-reveal className={`rounded-[0.875rem] border bg-surface transition-[border-color,box-shadow] duration-300 ${isOpen ? "border-accent-line shadow-ui" : "border-line"}`}>
                <button
                  type="button"
                  id={`faqq-${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="cta-soft flex w-full cursor-pointer items-center gap-4 rounded-[0.875rem] px-5 py-[1.125rem] text-left text-heading focus-visible:rounded-[0.875rem] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
                >
                  <em className="shrink-0 text-[0.8125rem] font-semibold text-faint not-italic tabular-nums">{String(i + 1).padStart(2, "0")}</em>
                  <b className="flex-1 text-[1.0625rem] font-semibold">{q}</b>
                  <i aria-hidden="true" className={`relative size-8 shrink-0 rounded-full transition-[background-color,transform,translate] duration-350 ease-out-soft ${isOpen ? "rotate-180 bg-accent" : "bg-accent-soft"}`}>
                    <span className={`absolute top-1/2 left-1/2 -mt-px -ml-1.5 h-0.5 w-3 rounded-sm ${isOpen ? "bg-accent-contrast" : "bg-accent"}`} />
                    <span className={`absolute top-1/2 left-1/2 -mt-px -ml-1.5 h-0.5 w-3 rounded-sm transition-transform duration-350 ${isOpen ? "rotate-0 bg-accent-contrast" : "rotate-90 bg-accent"}`} />
                  </i>
                </button>
                <div id={`faq-${i}`} role="region" aria-labelledby={`faqq-${i}`} className={`grid transition-[grid-template-rows] duration-400 ease-out-soft ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 pl-[3.375rem] leading-[1.7] text-muted max-[860px]:pl-5">{a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
