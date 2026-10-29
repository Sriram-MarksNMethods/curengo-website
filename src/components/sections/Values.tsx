import Link from "next/link";
import SectionHead from "../SectionHead";
import { ArrowRight } from "../icons";
import { btnGhost } from "../ui";

const VALUES = [
  ["One record for the whole team", "Doctor, nursing, therapy and diet notes live in one patient record, instead of paper files kept for years."],
  ["Less time on paperwork", "Orders by voice, and discharge summaries drafted automatically for the doctor to review and sign."],
  ["Progress you can measure", "Standard assessment scales turn “improving” into numbers the team can track across the whole stay."],
];

export default function Values() {
  return (
    <section id="why" className="teal teal-glow sec">
      <div className="wrap">
        <SectionHead
          title="One connected platform for rehabilitation care"
          lede="An integrated platform for inpatient rehabilitation and post-hospitalization care, bringing together clinical workflows, patient management, billing, care coordination and analytics."
          action={<Link href="/platform" className={btnGhost}>Explore the Platform <ArrowRight /></Link>}
        />
        <div className="grid grid-cols-3 gap-10 max-[820px]:grid-cols-1 max-[820px]:gap-7">
          {VALUES.map(([title, text]) => (
            <div key={title} data-reveal className="border-t border-line pt-5">
              <h3 className="mb-2 text-lg font-semibold text-heading">{title}</h3>
              <p className="leading-[1.65] text-muted">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
