import ScreenWindow, { Chip } from "./ScreenWindow";

const MONTHS = [0.55, 0.62, 0.58, 0.7, 0.74, 0.69, 0.78, 0.81, 0.77, 0.85, 0.83, 0.81];

export default function DashScreen() {
  return (
    <ScreenWindow title="Curengo · Management" label="Illustrative screen: the management dashboard" active={4} grow>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <b className="text-base text-heading">This month</b>
        <Chip>October</Chip>
      </div>
      <div className="grid grid-cols-4 gap-2 max-[560px]:grid-cols-2">
        {[["Occupancy", "81%"], ["Avg. stay", "18 d"], ["Discharges", "23"], ["Barthel gain", "+31"]].map(([k, v]) => (
          <div key={k} className="rounded-lg border border-line bg-page px-3 py-2.5">
            <small className="block text-[0.6875rem] text-faint">{k}</small>
            <b data-count className="text-lg font-semibold text-heading tabular-nums">{v}</b>
          </div>
        ))}
      </div>
      <div className="mt-4 flex h-30 items-end gap-1.5 border-b border-line pt-2" aria-hidden="true">
        {MONTHS.map((h, i) => (
          <i
            key={i}
            className={`grow-col flex-1 rounded-t ${i === MONTHS.length - 1 ? "bg-accent" : "bg-linear-to-b from-accent to-accent/55"}`}
            style={{ ["--h" as string]: h, ["--n" as string]: i }}
          />
        ))}
      </div>
      <div className="mt-1.5 flex justify-between text-[0.6875rem] text-faint">
        <span>Nov</span><span>Feb</span><span>May</span><span>Aug</span><span>Oct</span>
      </div>
    </ScreenWindow>
  );
}
