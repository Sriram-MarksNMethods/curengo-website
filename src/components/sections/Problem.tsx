import SectionHead from "../SectionHead";
import { Icon } from "../icons";

const TODAY = [
  "Notes handwritten in a separate file for each discipline",
  "Progress described as “better” or “same”, open to interpretation",
  "One order copied by hand to nursing, pharmacy and billing",
  "Discharge summaries typed up from scratch",
  "Patient files kept for years, filling whole rooms",
];
const WITH_CURENGO = [
  "Every discipline writes to one digital record",
  "Assessment scales give a score you can compare week on week",
  "An order given once reaches nursing, pharmacy and the bill",
  "Summary drafted from the record, then reviewed and signed by the doctor",
  "Records stored online and searchable, no storage room needed",
];

export default function Problem() {
  return (
    <section id="problem" className="sec">
      <div className="wrap">
        <SectionHead title="Rehab centres still run on paper" lede="Most centres already bill on a computer. The clinical side, where most of the work happens, is still on paper." />
        <div data-reveal className="grid grid-cols-2 overflow-hidden rounded-2xl border border-line bg-surface max-[760px]:grid-cols-1">
          <div className="p-8 max-[760px]:p-6">
            <h3 className="mb-5 text-base font-semibold text-muted">Today</h3>
            <ul className="grid gap-4">
              {TODAY.map((t) => (
                <li key={t} className="grid grid-cols-[1.25rem_1fr] gap-2.5 leading-[1.55]">
                  <Icon draw className="mt-[0.15em] size-[1.125rem] text-faint" strokeWidth={2}><path d="M18 6L6 18M6 6l12 12" /></Icon>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-l border-line bg-accent-wash p-8 max-[760px]:border-t max-[760px]:border-l-0 max-[760px]:p-6">
            <h3 className="mb-5 text-base font-semibold text-accent">With Curengo</h3>
            <ul className="grid gap-4">
              {WITH_CURENGO.map((t) => (
                <li key={t} className="grid grid-cols-[1.25rem_1fr] gap-2.5 leading-[1.55]">
                  <Icon draw className="mt-[0.15em] size-[1.125rem] text-accent" strokeWidth={2}><path d="M5 12l5 5 9-10" /></Icon>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
