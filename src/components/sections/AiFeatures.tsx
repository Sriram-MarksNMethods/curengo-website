import SectionHead from "../SectionHead";
import { Tick } from "../icons";
import SummaryDemo from "../screens/SummaryDemo";
import VoiceDemo from "../screens/VoiceDemo";

export default function AiFeatures() {
  return (
    <section id="ai" className="navy navy-glow sec-tight">
      <div className="wrap">
        <SectionHead
          title="AI that takes paperwork off the doctor’s desk"
          lede="Two features for the tasks that take the most time on a rehab ward. Press the mic, or draft a summary, to see how they work."
        />
        <div className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] items-center gap-[clamp(2.5rem,5vw,6rem)] max-[860px]:grid-cols-1 max-[860px]:gap-8">
          <div data-reveal>
            <h3 className="text-2xl leading-tight font-semibold text-heading">Voice order entry</h3>
            <p className="mt-3.5 leading-[1.7] text-muted">
              The doctor says the order out loud. Curengo transcribes it into a structured order for medicines or tests, already linked to the patient, the nurse’s task list and the bill.
            </p>
            <ul className="mt-6 grid gap-2.5">
              <Tick>Medicine and test orders by voice</Tick>
              <Tick>The doctor confirms the order before it goes out</Tick>
              <Tick>Fewer copying errors between ward, pharmacy and billing</Tick>
            </ul>
          </div>
          <VoiceDemo />
        </div>
        <div className="mt-[clamp(2rem,1.25rem+2.2vw,3.25rem)] grid grid-cols-[minmax(0,1.3fr)_minmax(0,0.9fr)] items-center gap-[clamp(2.5rem,5vw,6rem)] max-[860px]:grid-cols-1 max-[860px]:gap-8">
          <SummaryDemo />
          <div data-reveal className="max-[860px]:-order-1">
            <h3 className="text-2xl leading-tight font-semibold text-heading">Discharge summary, drafted for you</h3>
            <p className="mt-3.5 leading-[1.7] text-muted">
              When a patient is ready to go home, Curengo pulls the stay together from the record: diagnosis, treatment, scores at admission and discharge, medicines and advice. The doctor reviews, edits and signs.
            </p>
            <ul className="mt-6 grid gap-2.5">
              <Tick>Built from notes already in the record</Tick>
              <Tick>Admission and discharge scores side by side</Tick>
              <Tick>Every summary is reviewed and signed by a doctor</Tick>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
