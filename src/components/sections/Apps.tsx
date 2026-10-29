import SectionHead from "../SectionHead";
import { Tick } from "../icons";
import { PartnerPhone, PatientPhone } from "../screens/Phones";

const APPS = [
  { name: "Patient app", text: "Home exercises, diet plan and reports on the patient’s phone, with family access when the patient agrees.", points: ["Home exercise plan from the physio", "Meal plan with daily targets", "Reports and discharge summary"], phone: <PatientPhone className="aspect-[9/15] w-full rounded-b-none border-b-0 shadow-none" /> },
  { name: "Partner doctor app", text: "Doctors who refer patients to your centre can follow their recovery without phoning the ward.", points: ["Refer a patient in a few steps", "Weekly progress and scores", "Discharge summary sent back"], phone: <PartnerPhone className="aspect-[9/15] w-full rounded-b-none border-b-0 shadow-none" /> },
];

export default function Apps() {
  return (
    <section id="apps" className="teal teal-glow sec-tight">
      <div className="wrap">
        <SectionHead title="Apps for patients and referring doctors" lede="Care doesn’t stop at discharge. Two mobile apps keep the patient and the doctor who referred them in the loop." />
        <div className="grid grid-cols-2 gap-6 max-[1000px]:grid-cols-1">
          {APPS.map((a) => (
            <article key={a.name} data-reveal className="grid grid-cols-[minmax(0,1fr)_13rem] items-end gap-8 overflow-hidden rounded-2xl border border-line bg-surface px-8 pt-8 max-[520px]:grid-cols-1 max-[520px]:px-6 max-[520px]:pt-6">
              <div className="self-start pb-8 max-[520px]:pb-0">
                {/* TODO: change once the apps are live */}
                <span className="inline-flex h-6.5 items-center gap-1.5 rounded-full border border-[color-mix(in_srgb,var(--warn)_30%,transparent)] bg-[color-mix(in_srgb,var(--warn)_9%,transparent)] px-2.5 text-xs font-semibold text-warn before:size-1.5 before:rounded-full before:bg-current">
                  Coming soon
                </span>
                <span className="ml-1.5 text-xs text-faint">[status to confirm]</span>
                <h3 className="mt-4 text-xl font-semibold text-heading">{a.name}</h3>
                <p className="mt-3 leading-[1.65] text-muted">{a.text}</p>
                <ul className="mt-5 grid gap-2.5">{a.points.map((p) => <Tick key={p}>{p}</Tick>)}</ul>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["[App Store]", "[Google Play]"].map((s) => (
                    <span key={s} className="inline-flex h-9 items-center rounded-lg border border-line px-3.5 text-[0.8125rem] text-faint">{s}</span>
                  ))}
                </div>
              </div>
              <div className="max-[520px]:mx-auto max-[520px]:w-52">{a.phone}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
