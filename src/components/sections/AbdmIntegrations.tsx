import SectionHead from "../SectionHead";
import StatusPill from "./StatusPill";

// Only ABDM's status is known ("in progress"). The rest are placeholders until Curengo confirms them.
const INTEGRATIONS = [
  { name: "ABDM / ABHA", what: "Share records with the patient’s consent", tone: "progress", status: "In progress" },
  { name: "Pharmacy", what: "Stock and dispensing systems", tone: "live", status: "[Available]" },
  { name: "Accounting", what: "Invoices and collections to your books", tone: "progress", status: "[In progress]" },
  { name: "Devices and wearables", what: "Vitals from monitors and wearables", tone: "planned", status: "[Planned]" },
] as const;

export default function AbdmIntegrations({ withHead = true }: { withHead?: boolean }) {
  return (
    <section id="abdm" className="sec-tight">
      <div className="wrap">
        {withHead && (
          <SectionHead
            title="ABDM and integrations"
            lede="Curengo is being connected to the Ayushman Bharat Digital Mission, so patients can share their records with your centre using their ABHA."
          />
        )}
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] items-start gap-16 max-[900px]:grid-cols-1 max-[900px]:gap-10">
          <div data-reveal>
            <h3 className="text-xl font-semibold text-heading">What ABDM means for your centre</h3>
            <p className="mt-3 leading-[1.7] text-muted">
              With an ABHA (Ayushman Bharat Health Account), patients control their own health records and choose who sees them. For a rehab centre, that means hospital records that arrive with the patient, and a discharge summary they can take to their next doctor.
            </p>
            <div className="mt-6 flex gap-3 rounded-xl border border-accent-line bg-accent-wash px-[1.125rem] py-4 text-[0.9375rem] leading-[1.55] text-body">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-[0.15em] size-[1.125rem] shrink-0 text-accent">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 11v5M12 8h.01" />
              </svg>
              <span>
                Curengo’s ABDM integration is in progress. This page will be updated when it is complete. <span className="ph">[wording to confirm]</span>
              </span>
            </div>
          </div>
          <div data-reveal className="overflow-hidden rounded-2xl border border-line bg-surface">
            <div className="flex justify-between gap-4 border-b border-line px-5 py-4 text-[0.8125rem] font-semibold text-faint">
              <span>Integration</span>
              <span>Status</span>
            </div>
            <ul>
              {INTEGRATIONS.map((i) => (
                <li key={i.name} className="flex items-center justify-between gap-4 border-b border-line px-5 py-4 last:border-b-0">
                  <div>
                    <b className="block font-semibold text-heading">{i.name}</b>
                    <span className="text-sm text-muted">{i.what}</span>
                  </div>
                  <StatusPill tone={i.tone}>{i.status}</StatusPill>
                </li>
              ))}
            </ul>
            <div className="border-t border-line bg-sunken px-5 py-3.5 text-[0.8125rem] text-faint">Statuses in [brackets] are placeholders until Curengo confirms them.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
