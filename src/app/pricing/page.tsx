import JsonLd from "@/components/JsonLd";
import { breadcrumbLd, pageMeta } from "@/lib/site";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Faq from "@/components/sections/Faq";
import GetStarted from "@/components/sections/GetStarted";
import Plans from "@/components/sections/Plans";
import SectionHead from "@/components/SectionHead";

export const metadata: Metadata = pageMeta("/pricing", "Pricing", "Curengo plans for physiotherapy clinics, rehab centres and groups of centres.");

// which plan includes what [plan contents to confirm with Curengo]
const ROWS: [string, boolean, boolean, boolean][] = [
  ["Assessment scales and session notes", true, true, true],
  ["OP billing and packages", true, true, true],
  ["Rehab EMR for every discipline", false, true, true],
  ["Beds, admissions and IP billing", false, true, true],
  ["Pharmacy and inventory", false, true, true],
  ["Voice orders and discharge summaries", false, true, true],
  ["Management dashboards", false, true, true],
  ["Reports across centres", false, false, true],
];

export default function PricingPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd("Pricing", "/pricing")} />
      <PageHero
        tone="teal"
        title="Simple pricing for every size of centre"
        lede={<>A monthly subscription per centre, with everything you need to go paperless. <span className="ph">[All plan names, prices and limits are placeholders until Curengo confirms them.]</span></>}
      />
      <Plans />
      <section id="compare" className="sec-tight border-t border-line">
        <div className="wrap">
          <SectionHead title="Compare plans" />
          <div data-reveal className="relative overflow-x-auto">
            <table className="w-full min-w-xl border-collapse text-[0.9375rem]">
              <thead>
                <tr>
                  {["Feature", "Clinic", "Centre", "Group"].map((h, i) => (
                    <th key={h} className={`border-b border-line py-3.5 font-semibold text-heading ${i ? "px-4 text-center" : "pr-4 text-left"}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map(([feature, ...has]) => (
                  <tr key={feature}>
                    <td className="border-b border-line py-3.5 pr-4">{feature}</td>
                    {has.map((yes, i) => (
                      <td key={i} className={`border-b border-line px-4 py-3.5 text-center ${yes ? "font-bold text-accent" : "text-faint"}`}>
                        {yes ? <><span aria-hidden="true">✓</span><span className="sr-only">Included</span></> : <><span aria-hidden="true">—</span><span className="sr-only">Not included</span></>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="ph mt-4 text-[0.8125rem]">[Plan contents to confirm with Curengo.]</p>
        </div>
      </section>
      <Faq />
      <GetStarted />
    </>
  );
}
