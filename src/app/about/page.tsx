import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHead from "@/components/SectionHead";
import Clients from "@/components/sections/Clients";
import GetStarted from "@/components/sections/GetStarted";
import { Icon } from "@/components/icons";
import { btnLight, btnOutlineLight, btnPrimary, sectionTitle } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description: "Curengo builds software for rehabilitation centres, so care teams spend less time on paper and more time on patients.",
};

// What is live and what is next (from the client meeting, 27 Oct 2026)
const TIMELINE = [
  { tone: "live", status: "Live", title: "Web app for rehab centres", text: "Rehab EMR, clinical workflow, beds, pharmacy and billing, with voice orders and drafted discharge summaries." },
  { tone: "progress", status: "In progress", title: "ABDM integration", text: "ABHA linking and consented record sharing, so records arrive with the patient." },
  { tone: "progress", status: "In development", title: "Patient and partner doctor apps", text: "Home exercise plans for patients, and referral tracking for the doctors who send them." },
  { tone: "planned", status: "[Planned]", title: "HR, CRM and maintenance", text: "Running the rest of the centre on the same platform. [confirm]" },
] as const;

const BELIEFS = [
  { title: "Clinical first", text: "The patient record is the core of the product. Billing and operations are built around it, not the other way round.", icon: <><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /><path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" /></> },
  { title: "Simple enough for a busy shift", text: "Nurses and doctors put patients first. If a screen slows them down, we change the screen.", icon: <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></> },
  { title: "Honest about what’s live", text: "We only list features and integrations that work today, and we label the rest clearly, like the timeline above.", icon: <><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></> },
];

const FACTS = [
  { k: "Built for", v: "Rehab and transitional care centres" },
  { k: "Runs on", v: "Any browser, no installation" },
  { k: "ABDM", v: "ABDM integration", status: "In progress" }, // was "Integration" under an "ABDM" label (labels removed)
  { k: "Next", v: "Patient and partner doctor apps", status: "In development" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="We’re digitizing rehabilitation care"
        lede="Curengo builds software for rehabilitation centres, so the people who look after patients spend less time on paper and more time on care."
        actions={
          <>
            <Link href="/book-a-demo" className={btnLight}>Book a Demo</Link>
            <Link href="#story" className={btnOutlineLight}>Our story</Link>
          </>
        }
        visual={
          <div className="grid grid-cols-2 gap-3">
            {FACTS.map((f) => (
              <div key={f.k} className="rounded-[0.875rem] border border-white/12 bg-white/4 p-5">
                <b className="text-[1.0625rem] font-semibold text-white">{f.v}</b>
                {f.status && <span className="sr-only"> ({f.status})</span>}
              </div>
            ))}
          </div>
        }
      />

      <section id="story" className="sec">
        <div className="wrap">
          <p data-reveal className="max-w-[62rem] text-[clamp(1.75rem,1rem+2.6vw,3.25rem)] leading-[1.2] font-medium tracking-[-0.025em] text-balance text-heading">
            Rehab centres should spend their time on <em className="text-accent not-italic">patients</em>, not on paperwork. So we built one record the whole care team can work from.
          </p>
          <p data-reveal className="mt-6 max-w-[44rem] text-[1.0625rem] leading-[1.75] text-muted">
            Most centres already bill on a computer, but the clinical work is still on paper: notes in separate files, progress described in words, records kept in storage rooms for years. Curengo started with the clinical record and is building out from there.{" "}
            <span className="ph">[founding story, year and founders to add]</span>
          </p>
        </div>
      </section>

      <section id="progress" className="navy navy-glow sec-tight">
        <div className="wrap">
          <SectionHead title="Where we are today" lede="What’s live, and what we’re building next." />
          <ol className="relative grid grid-cols-4 gap-5 before:absolute before:inset-x-0 before:top-[1.375rem] before:h-0.5 before:bg-linear-90 before:from-accent before:via-accent-line before:via-40% before:to-line max-[900px]:grid-cols-2 max-[900px]:before:hidden max-[520px]:grid-cols-1">
            {TIMELINE.map((t) => (
              <li key={t.title} data-reveal className="relative pt-13">
                <span
                  aria-hidden="true"
                  className={`absolute top-3 left-0 size-[1.375rem] rounded-full border-2 ${
                    t.tone === "live" ? "border-accent bg-accent shadow-[0_0_0_5px_var(--accent-soft)]" : t.tone === "progress" ? "animate-[now-pulse_1.8s_ease-in-out_infinite] border-accent bg-surface" : "border-accent-line bg-surface"
                  }`}
                />
                <h3 className="mb-1.5 text-lg font-semibold text-heading">
                  <span className="sr-only">{t.status}: </span>
                  {t.title}
                </h3>
                <p className="text-[0.9375rem] leading-relaxed text-muted">{t.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="beliefs" className="teal teal-glow sec">
        <div className="wrap">
          <SectionHead title="How we work" />
          <div className="grid grid-cols-3 gap-5 max-[860px]:grid-cols-1">
            {BELIEFS.map((b) => (
              <div key={b.title} data-reveal data-draw-host className="rounded-2xl border border-line bg-surface p-7 transition-[transform,translate,box-shadow,border-color] duration-300 hover:-translate-y-[3px] hover:border-accent-line hover:shadow-ui">
                <Icon draw className="size-9 text-accent">{b.icon}</Icon>
                <h3 className="mt-5 mb-2 text-[1.1875rem] font-semibold text-heading">{b.title}</h3>
                <p className="leading-[1.65] text-muted">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="team" className="sec-tight bg-sunken">
        <div className="wrap">
          <SectionHead title="The team" lede={<span className="ph">[Team photos, names and roles from Curengo]</span>} />
          <div className="grid grid-cols-4 gap-5 max-[900px]:grid-cols-2">
            {["Founder", "Clinical lead", "Product", "Customer success"].map((role, i) => (
              <div key={role} data-reveal className="rounded-2xl border border-line bg-surface p-6 text-center">
                <i className="mx-auto mb-4 grid size-22 place-items-center rounded-full bg-linear-135 from-accent-soft to-[rgba(34,184,212,0.15)] text-[1.375rem] font-semibold text-accent not-italic">[{"ABCD"[i]}]</i>
                <b className="ph block">[Name]</b>
                <span className="text-sm text-muted">[{role}]</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Clients />

      <section id="office" className="sec-tight">
        <div className="wrap">
          <div data-reveal className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] overflow-hidden rounded-[1.25rem] border border-line bg-surface max-[820px]:grid-cols-1">
            <div className="flex flex-col gap-4 p-[clamp(1.75rem,3vw,2.75rem)]">
              <h2 className={sectionTitle}>Visit us</h2>
              <address className="leading-[1.8] not-italic">
                <span className="ph">[Office address]</span>
                <br />
                <span className="ph">[Phone]</span>
                <br />
                <span className="ph">[Email]</span>
              </address>
              <div>
                <Link href="/book-a-demo" className={btnPrimary}>Book a Demo</Link>
              </div>
            </div>
            {/* TODO: Google Maps embed once the office address is confirmed */}
            <div className="grid min-h-72 place-items-center bg-sunken bg-[radial-gradient(circle_at_60%_45%,var(--accent-soft),transparent_55%)] p-4 text-center text-sm text-faint">
              <div>
                <div className="mx-auto mb-3 size-11 -rotate-45 rounded-[50%_50%_50%_0] bg-accent shadow-[0_10px_20px_-8px_rgba(77,42,141,0.6)]" aria-hidden="true" />
                [Google map of the office, once the address is confirmed]
              </div>
            </div>
          </div>
        </div>
      </section>

      <GetStarted />
    </>
  );
}
