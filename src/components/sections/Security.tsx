import type { CSSProperties } from "react";
import SectionHead from "../SectionHead";
import { Icon } from "../icons";

// Every claim here still has to be confirmed by Curengo before launch.
const SAFEGUARDS = [
  { title: "Role-based access", text: "Each user sees only the patients and screens their role needs.", icon: <><circle cx="9" cy="7" r="4" /><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" /><path d="M16 11l2 2 4-4" /></> },
  { title: "Audit trail", text: "Every change to a record is logged with who made it and when.", icon: <><rect x="8" y="2" width="8" height="4" rx="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="M12 11h4M12 16h4M8 11h.01M8 16h.01" /></> },
  { title: "Encryption", text: "Data encrypted in transit and at rest.", icon: <><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></> },
  { title: "Patient consent", text: "Records shared with family or other providers only when the patient agrees.", icon: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></> },
];

export default function Security() {
  return (
    <section id="security" className="sec-tight bg-sunken">
      <div className="wrap">
        <SectionHead
          title="Patient data, handled with care"
          lede={<>Health records are sensitive. These are the safeguards built into Curengo. <span className="ph">[each claim to confirm before launch]</span></>}
        />
        <div className="grid grid-cols-4 gap-8 max-[900px]:grid-cols-2 max-[520px]:grid-cols-1">
          {SAFEGUARDS.map((s, i) => (
            <div key={s.title} data-reveal className="border-t border-line pt-5">
              {/* the icons draw themselves over and over, one after another (globals.css .draw-loop); no hover effect */}
              <Icon draw className="draw-loop size-6 text-accent" style={{ "--loop": i } as CSSProperties}>{s.icon}</Icon>
              <h3 className="mt-3.5 mb-1.5 text-[1.0625rem] font-semibold text-heading">{s.title}</h3>
              <p className="text-[0.9375rem] leading-relaxed text-muted">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
