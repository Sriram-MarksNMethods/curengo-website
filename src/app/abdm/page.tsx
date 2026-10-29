import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import AbdmIntegrations from "@/components/sections/AbdmIntegrations";
import GetStarted from "@/components/sections/GetStarted";
import Security from "@/components/sections/Security";
import AbhaScreen from "@/components/screens/AbhaScreen";
import SectionHead from "@/components/SectionHead";
import { btnLight, btnOutlineLight } from "@/components/ui";

export const metadata: Metadata = {
  title: "ABDM & Integrations",
  description: "How Curengo works with ABDM and ABHA, and the current status of every integration.",
};

const HOW = [
  ["The patient shares their ABHA", "At admission, the front desk links the patient’s ABHA to their Curengo record."],
  ["Records arrive with consent", "With the patient’s consent, hospital records reach the care team before the first round."],
  ["The summary goes back", "At discharge, the signed summary is added to the patient’s health record for their next doctor."],
];

export default function AbdmPage() {
  return (
    <>
      <PageHero
        title="ABDM and integrations"
        lede="Curengo is being connected to the Ayushman Bharat Digital Mission, so patients can share their records with your centre using their ABHA. This page shows where every integration stands today."
        actions={
          <>
            <Link href="/book-a-demo" className={btnLight}>Book a Demo</Link>
            <Link href="#abdm" className={btnOutlineLight}>See integration status</Link>
          </>
        }
        visual={<AbhaScreen />}
      />
      <AbdmIntegrations withHead={false} />
      <section id="how-sharing" className="navy navy-glow sec-tight">
        <div className="wrap">
          <SectionHead title="How record sharing will work" lede={<>Once the integration is live, sharing follows the ABDM consent flow. <span className="ph">[flow to confirm with Curengo]</span></>} />
          <ol className="grid grid-cols-3 gap-8 max-[820px]:grid-cols-1">
            {HOW.map(([title, text], i) => (
              <li key={title} data-reveal className="border-t-2 border-accent pt-5">
                <span className="mb-3 block text-[0.8125rem] font-semibold text-accent tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mb-2 text-lg font-semibold text-heading">{title}</h3>
                <p className="leading-[1.65] text-muted">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <Security />
      <GetStarted />
    </>
  );
}
