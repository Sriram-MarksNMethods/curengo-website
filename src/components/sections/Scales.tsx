import { sectionLede, sectionTitle } from "../ui";
import ScalesScreen from "../screens/ScalesScreen";

const EXAMPLES = [
  ["Barthel Index", "Independence in daily activities", "Physio, nursing"],
  ["Berg Balance Scale", "Balance and fall risk", "Physio"],
  ["Modified Ashworth Scale", "Muscle tone", "Physio, doctor"],
  ["Glasgow Coma Scale", "Level of consciousness", "Doctor, nursing"],
  ["Braden Scale", "Pressure injury risk", "Nursing"],
];

export default function Scales({ navy = false }: { navy?: boolean }) {
  return (
    <section id="scales" className={`sec-tight ${navy ? "navy navy-glow" : "bg-sunken"}`}>
      <div className="wrap grid grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] items-center gap-14 max-[860px]:grid-cols-1 max-[860px]:gap-8">
        <div data-reveal>
          <h2 className={sectionTitle}>Objective scores, not impressions</h2>
          <p className={sectionLede}>
            “Better than yesterday” means different things to different people. Curengo records standard assessment scales with a breakdown of every item, so the whole team works from the same number.
          </p>
          <table className="mt-7 w-full border-collapse text-[0.9375rem]">
            <thead>
              <tr>
                {["Scale", "Measures", "Used by"].map((h) => (
                  <th key={h} className="border-b border-line py-2.5 text-left text-[0.8125rem] font-semibold text-faint">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {EXAMPLES.map(([scale, measures, by]) => (
                <tr key={scale}>
                  <td className="border-b border-line py-3 pr-4 align-top font-semibold text-heading">{scale}</td>
                  <td className="border-b border-line py-3 pr-4 align-top">{measures}</td>
                  <td className="border-b border-line py-3 align-top text-muted">{by}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="ph mt-3 text-[0.8125rem]">[Examples only. Final list of scales to confirm with Curengo.]</p>
        </div>
        <ScalesScreen />
      </div>
    </section>
  );
}
