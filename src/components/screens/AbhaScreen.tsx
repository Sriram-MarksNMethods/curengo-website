import ScreenWindow, { Chip, PatientLine } from "./ScreenWindow";

// ABDM is not live yet: this shows the planned flow and says so in the caption.
export default function AbhaScreen() {
  const steps = [
    ["done", "Consent requested at the front desk"],
    ["done", "Patient approved on their ABHA app"],
    ["now", "Records arriving in the patient file"],
    ["todo", "Care team reads them before the first round"],
  ] as const;
  return (
    <ScreenWindow title="Curengo · ABHA records" label="Illustrative screen: an ABHA consent request (planned flow)" active={1} caption="Planned flow · illustrative, not live yet">
      <PatientLine initials="RS" name="Ravi Shankar" detail="ABHA linked · 91-xxxx-xxxx-4821" chip={<Chip tone="accent">Admission</Chip>} />
      <div className="mt-4 grid gap-3">
        <div className="rounded-[0.625rem] border border-line bg-page px-4 py-3.5">
          <small className="block text-[0.6875rem] text-faint">Records requested from</small>
          <b className="text-heading">City Hospital · discharge summary, MRI report, lab results</b>
        </div>
        <ol className="grid gap-2">
          {steps.map(([state, text]) => (
            <li key={text} className="flex items-center gap-2.5 text-[0.8125rem]">
              <span
                className={`grid size-5 shrink-0 place-items-center rounded-full border-[1.5px] ${
                  state === "done" ? "border-accent bg-accent text-accent-contrast" : state === "now" ? "animate-[now-pulse_1.6s_ease-in-out_infinite] border-accent shadow-[0_0_0_4px_var(--accent-soft)]" : "border-line bg-surface"
                }`}
                aria-hidden="true"
              >
                {state === "done" && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="size-[62%]">
                    <path d="M5 12l5 5 9-10" />
                  </svg>
                )}
              </span>
              {text}
            </li>
          ))}
        </ol>
      </div>
    </ScreenWindow>
  );
}
