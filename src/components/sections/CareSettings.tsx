import Link from "next/link";
import SectionHead from "../SectionHead";
import { ArrowRight, linkArrow } from "../icons";

const MAIN = [
  { title: "Inpatient rehabilitation", photo: "[Photo: inpatient rehab ward, client’s own]", text: "Subacute and transitional care centres with multidisciplinary teams, beds and longer stays. Clinical records, care plans, beds and billing in one system.", link: ["See a patient’s stay", "/solutions#journey"] },
  { title: "Post-hospitalization care", photo: "[Photo: nurse with a patient after discharge]", text: "Patients discharged from hospital who still need nursing, therapy and monitoring. The hospital doctor refers the patient and sees their progress.", link: ["Partner doctor app", "/platform#apps"] },
];
const ALSO = [
  ["OP physiotherapy clinics", "Assessments, session notes, packages and billing for outpatient physios."],
  ["Assisted living", "Daily care tasks, vitals and medicines for long-stay residents."],
  ["Home care", "Visits, notes and progress for care given at home."],
];

export default function CareSettings() {
  return (
    <section id="solutions" className="sec">
      <div className="wrap">
        <SectionHead title="Made for inpatient rehab and the weeks after hospital" lede="Curengo is built for centres that look after patients between the hospital and home." />
        <div className="grid grid-cols-2 gap-6 max-[820px]:grid-cols-1">
          {MAIN.map((m) => (
            <article key={m.title} data-reveal className="flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-[transform,translate,box-shadow] duration-300 hover:-translate-y-[3px] hover:shadow-ui">
              {/* TODO: replace with the client's own photo */}
              <div className="grid aspect-[16/8] place-items-center border-b border-line bg-sunken p-4 text-center text-sm text-faint">{m.photo}</div>
              <div className="flex flex-1 flex-col items-start gap-3 p-7">
                <h3 className="text-xl font-semibold text-heading">{m.title}</h3>
                <p className="leading-[1.65] text-muted">{m.text}</p>
                <Link href={m.link[1]} className={`${linkArrow} mt-auto`}>{m.link[0]} <ArrowRight /></Link>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 grid grid-cols-3 gap-6 border-t border-line pt-8 max-[820px]:grid-cols-1">
          <p className="col-span-full -mb-2 text-sm font-semibold text-faint">
            Also suited to <span className="ml-1.5 text-xs font-medium text-faint">[confirm which are live]</span>
          </p>
          {ALSO.map(([title, text]) => (
            <div key={title} data-reveal>
              <h4 className="mb-1.5 text-base font-semibold text-heading">{title}</h4>
              <p className="text-[0.9375rem] leading-relaxed text-muted">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
