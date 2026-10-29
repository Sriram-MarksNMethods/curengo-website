import ScreenWindow, { Bar, Chip } from "./ScreenWindow";

const ROWS = [
  { name: "Ravi S.", note: "Soft diet · diabetic", protein: ["52 / 70 g", 0.74], kcal: ["1,350 / 1,800", 0.75] },
  { name: "Meena K.", note: "High protein", protein: ["61 / 80 g", 0.76], kcal: ["1,420 / 2,000", 0.71] },
  { name: "Arjun N.", note: "Tube feed · 6 × 250 ml", protein: ["38 / 60 g", 0.63], kcal: ["1,000 / 1,500", 0.67] },
] as const;

export default function DietScreen() {
  return (
    <ScreenWindow title="Curengo · Diet plans" label="Illustrative screen: the dietitian's plan" active={2} grow>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <b className="text-base text-heading">Today’s targets · Ward A</b>
        <Chip tone="accent">Lunch served</Chip>
      </div>
      <div className="grid gap-2.5">
        {ROWS.map((r, i) => (
          <div key={r.name} className="grid grid-cols-[7rem_1fr] gap-x-4 gap-y-0.5 rounded-[0.625rem] border border-line bg-page px-3.5 py-3">
            <b className="text-heading">{r.name}</b>
            <div className="col-start-2 row-span-2 row-start-1 grid gap-1.5">
              {[["Protein", r.protein], ["Calories", r.kcal]].map(([label, [text, v]]) => (
                <span key={label as string} className="text-[0.6875rem] text-muted">
                  {label as string} <em className="float-right font-semibold text-heading not-italic tabular-nums">{text}</em>
                  <Bar value={v as number} index={i} />
                </span>
              ))}
            </div>
            <small className="col-start-1 text-[0.6875rem] text-faint">{r.note}</small>
          </div>
        ))}
      </div>
    </ScreenWindow>
  );
}
