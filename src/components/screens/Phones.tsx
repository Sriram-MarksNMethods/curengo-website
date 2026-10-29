// The two mobile apps (both "coming soon"), as phone screens with sample data.
import { Bar } from "./ScreenWindow";

const phone =
  "screen grow relative overflow-hidden rounded-[2rem] border border-line bg-surface px-4 pt-9 pb-4 text-[0.8125rem] text-body shadow-ui";

function Notch() {
  return <div className="absolute top-2.5 left-1/2 h-[1.125rem] w-18 -translate-x-1/2 rounded-full bg-heading/90" aria-hidden="true" />;
}

export function PatientPhone({ className = "" }: { className?: string }) {
  return (
    <div role="img" aria-label="Illustrative screen: the patient app" data-reveal className={`${phone} ${className}`}>
      <Notch />
      <p className="text-[0.6875rem] font-semibold text-accent">Patient app</p>
      <h6 className="mt-1 mb-4 text-[1.0625rem] font-semibold text-heading">Good morning, Ravi</h6>
      <div className="grow-ring mx-auto mb-4 grid size-26 place-content-center rounded-full text-center" style={{ ["--v" as string]: 0.66 }}>
        <b className="text-[1.375rem] leading-none text-heading">2/3</b>
        <small className="text-[0.6875rem] text-faint">exercises</small>
      </div>
      <ul className="grid gap-1.5">
        <li className="rounded-lg border border-line bg-page px-2.5 py-2 text-faint line-through">Sit to stand × 10</li>
        <li className="rounded-lg border border-line bg-page px-2.5 py-2 text-faint line-through">Ankle pumps × 20</li>
        <li className="rounded-lg border border-line bg-page px-2.5 py-2">Walk 50 m with frame</li>
      </ul>
      <p className="mt-3 rounded-lg bg-accent-soft px-2.5 py-2 text-xs font-semibold text-accent">Lunch · 25 g protein</p>
    </div>
  );
}

export function PartnerPhone({ className = "" }: { className?: string }) {
  return (
    <div role="img" aria-label="Illustrative screen: the partner doctor app" data-reveal className={`${phone} ${className}`}>
      <Notch />
      <p className="text-[0.6875rem] font-semibold text-accent">Partner doctor app</p>
      <h6 className="mt-1 mb-4 text-[1.0625rem] font-semibold text-heading">My referrals</h6>
      <ul className="grid gap-1.5">
        {[["Ravi S.", "Barthel 45 → 70", 0.7], ["Meena K.", "Berg 22 → 38", 0.68], ["Joseph D.", "Going home today", 1]].map(([name, note, v], i) => (
          <li key={name as string} className="rounded-[0.625rem] border border-line bg-page p-2.5">
            <b className="block text-heading">{name}</b>
            <span className="text-xs text-muted">{note}</span>
            <Bar value={v as number} index={i} className="mt-2 h-1" />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Both phones side by side */
export default function Phones({ inFrame = false }: { inFrame?: boolean }) {
  return (
    <div className={`flex justify-center gap-6 ${inFrame ? "h-full items-center" : "items-start py-6"}`}>
      <PatientPhone className={inFrame ? "aspect-[9/18.5] h-[94%]" : "aspect-[9/18.5] w-[min(15rem,46%)]"} />
      <PartnerPhone className={inFrame ? "aspect-[9/18.5] h-[86%] self-end" : "mt-12 aspect-[9/18.5] w-[min(15rem,46%)]"} />
    </div>
  );
}
