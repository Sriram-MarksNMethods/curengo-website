import ScreenWindow, { Chip } from "./ScreenWindow";

const LINES = [
  ["Stroke rehab package · 14 days", "Package", "₹1,26,000", false],
  ["Speech therapy · 6 sessions", "À la carte", "₹9,000", false],
  ["Tab. Paracetamol 650 mg × 6", "Pharmacy", "₹42", true],
  ["CBC", "Lab", "₹350", true],
  ["Advance received", "Receipt", "− ₹50,000", false],
] as const;

export default function BillScreen() {
  return (
    <ScreenWindow title="Curengo · Billing" label="Illustrative screen: an inpatient bill" active={3}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <b className="text-base text-heading">IP bill · Ravi Shankar</b>
        <Chip tone="ok">Auto-updated</Chip>
      </div>
      <table className="w-full border-collapse text-[0.8125rem]">
        <tbody>
          {LINES.map(([what, kind, amount, isNew]) => (
            <tr key={what}>
              <td className="border-b border-line py-2">
                {what}
                {isNew && <span className="ml-2 rounded-full bg-accent-soft px-1.5 py-px text-[0.625rem] font-bold text-accent">new</span>}
              </td>
              <td className="border-b border-line px-3 py-2 text-xs text-faint">{kind}</td>
              <td className="border-b border-line py-2 text-right whitespace-nowrap text-heading tabular-nums">{amount}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2} className="pt-3 text-[0.9375rem] font-bold text-heading">Balance</td>
            <td className="pt-3 text-right text-[0.9375rem] font-bold text-heading tabular-nums">₹85,392</td>
          </tr>
        </tfoot>
      </table>
      <p className="mt-3 text-xs text-faint">New charges arrive from orders as care is given.</p>
    </ScreenWindow>
  );
}
