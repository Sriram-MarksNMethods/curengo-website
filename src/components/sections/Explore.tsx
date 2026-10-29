import Link from "next/link";
import SectionHead from "../SectionHead";
import { ArrowRight } from "../icons";

const CARDS = [
  ["/platform", "Platform", "Six modules on one patient record, a screen for every role, assessment scales and the mobile apps.", "See the platform"],
  ["/solutions", "Solutions", "Inpatient rehabilitation and post-hospitalization care, plus outpatient physio, assisted living and home care.", "See solutions"],
  ["/abdm", "ABDM & integrations", "How Curengo works with ABHA, and the status of every integration.", "See integrations"],
];

export default function Explore() {
  return (
    <section id="explore" className="sec">
      <div className="wrap">
        <SectionHead title="Explore Curengo" lede="See the full platform, the care settings it is built for, and where it stands with ABDM." />
        <div className="grid grid-cols-3 gap-6 max-[860px]:grid-cols-1">
          {CARDS.map(([href, title, text, cta]) => (
            <Link key={href} href={href} data-reveal className="cta-soft group flex flex-col gap-2.5 rounded-2xl border border-line bg-surface p-7 no-underline transition-[border-color,transform,translate] duration-200 hover:-translate-y-0.5 hover:border-accent-line">
              <h3 className="text-xl font-semibold text-heading">{title}</h3>
              <p className="leading-relaxed text-muted">{text}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-[0.9375rem] font-semibold text-accent">{cta} <ArrowRight /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
