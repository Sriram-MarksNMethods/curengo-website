import ScreenWindow, { Bar, Card, Chip, PatientLine } from "./ScreenWindow";

export default function EmrScreen() {
  return (
    <ScreenWindow title="Curengo · Patient record" label="Illustrative screen: a patient's rehab record" active={0} grow>
      <PatientLine initials="RS" name="Ravi Shankar" detail="64 · M · Bed 12 · Day 9 of stay" chip={<Chip tone="accent">Stroke rehab</Chip>} />
      <div className="my-4 flex gap-5 overflow-hidden border-b border-line text-[0.8125rem] text-muted">
        <span className="pb-2 font-semibold whitespace-nowrap text-accent shadow-[inset_0_-2px_0_var(--accent)]">Summary</span>
        {["Notes", "Orders", "Scales", "Diet"].map((t) => (
          <span key={t} className="pb-2 whitespace-nowrap">{t}</span>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 max-[560px]:grid-cols-1">
        <Card title="Vitals · 08:00">
          <div className="grid grid-cols-4 gap-2 max-[560px]:grid-cols-2">
            {[["BP", "128/82"], ["Pulse", "76"], ["SpO₂", "97%"], ["Temp", "98.4°"]].map(([k, v]) => (
              <div key={k}>
                <small className="block text-[0.6875rem] text-faint">{k}</small>
                <b className="text-[0.9375rem] text-heading tabular-nums">{v}</b>
              </div>
            ))}
          </div>
        </Card>
        <Card title="Barthel Index">
          <div className="flex items-baseline gap-1">
            <b data-count className="text-[1.625rem] leading-none font-semibold text-heading">70</b>
            <span className="text-faint">/100</span>
            <em className="ml-auto text-xs font-semibold text-ok not-italic">+25 since admission</em>
          </div>
          <Bar value={0.7} className="mt-2.5 h-1.5" />
        </Card>
        <Card title="Today's plan" wide>
          <ul className="grid gap-2">
            {[["10:00", "Physiotherapy · gait training", "Physio"], ["12:30", "Speech therapy", "Therapist"], ["15:00", "Diet review · protein 70 g", "Dietitian"]].map(([t, what, who]) => (
              <li key={t} className="flex items-center gap-3">
                <time className="w-11 shrink-0 text-xs font-semibold text-faint tabular-nums">{t}</time>
                {what}
                <span className="ml-auto"><Chip>{who}</Chip></span>
              </li>
            ))}
          </ul>
        </Card>
        <Card title="Latest note" wide>
          <p className="text-[0.8125rem] leading-snug">
            <b className="mb-0.5 block text-heading">Dr. A. Mehta</b>
            Sitting balance improved, walking 20 m with a frame. Continue plan, review in 3 days.
          </p>
        </Card>
      </div>
    </ScreenWindow>
  );
}
