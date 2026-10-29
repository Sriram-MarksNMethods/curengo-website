import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CareSettings from "@/components/sections/CareSettings";
import GetStarted from "@/components/sections/GetStarted";
import Journey from "@/components/sections/Journey";
import { Tick } from "@/components/icons";
import BedsScreen from "@/components/screens/BedsScreen";
import EmrScreen from "@/components/screens/EmrScreen";
import Phones from "@/components/screens/Phones";
import { btnLight, btnOutlineLight } from "@/components/ui";

export const metadata: Metadata = {
  title: "Solutions",
  description: "Curengo for inpatient rehabilitation and post-hospitalization care, plus OP physiotherapy, assisted living and home care.",
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        tone="teal"
        title="Built for care between the hospital and home"
        lede="Curengo is made first for inpatient rehabilitation and post-hospitalization care, where many disciplines look after one patient over weeks."
        actions={
          <>
            <Link href="/book-a-demo" className={btnLight}>Book a Demo</Link>
            <Link href="#journey" className={btnOutlineLight}>Follow a patient’s stay</Link>
          </>
        }
        visual={<BedsScreen />}
      />
      <CareSettings />

      {/* the two main settings in detail */}
      <section id="settings-detail" className="navy navy-glow sec-tight">
        <div className="wrap">
          <div className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] items-center gap-[clamp(2.5rem,5vw,6rem)] max-[860px]:grid-cols-1 max-[860px]:gap-8">
            <div data-reveal>
              <h3 className="text-2xl leading-tight font-semibold text-heading">Inpatient rehabilitation</h3>
              <p className="mt-3.5 leading-[1.7] text-muted">
                Stroke, spinal, orthopaedic and cardiac rehab stays need the doctor, nurses, physios, dietitians and therapists working from the same plan. Curengo gives them one record and one view of progress.{" "}
                <span className="ph">[patient groups to confirm]</span>
              </p>
              <ul className="mt-6 grid gap-2.5">
                <Tick>Admission with bed, package and hospital records</Tick>
                <Tick>Shared care plan across disciplines</Tick>
                <Tick>Assessment scores tracked through the stay</Tick>
                <Tick>Discharge summary drafted from the record</Tick>
              </ul>
            </div>
            <EmrScreen />
          </div>
          <div className="mt-[clamp(2rem,1.25rem+2.2vw,3.25rem)] grid grid-cols-[minmax(0,1.3fr)_minmax(0,0.9fr)] items-center gap-[clamp(2.5rem,5vw,6rem)] max-[860px]:grid-cols-1 max-[860px]:gap-8">
            <Phones />
            <div data-reveal className="max-[860px]:-order-1">
              <h3 className="text-2xl leading-tight font-semibold text-heading">Post-hospitalization care</h3>
              <p className="mt-3.5 leading-[1.7] text-muted">
                Patients who leave hospital still needing nursing, therapy and monitoring are referred by their hospital doctor. That doctor can follow progress, and the summary goes back to them at discharge.
              </p>
              <ul className="mt-6 grid gap-2.5">
                <Tick>Referral from the partner doctor</Tick>
                <Tick>Nursing tasks, vitals and medicines</Tick>
                <Tick>Progress shared with the referring doctor</Tick>
                <Tick>Follow-up through the patient app <span className="ph">[coming soon]</span></Tick>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Journey />
      <GetStarted />
    </>
  );
}
