import type { ReactNode } from "react";
import { sectionLede, sectionTitle } from "./ui";

/** Section heading + intro line, with an optional link on the right */
export default function SectionHead({ title, lede, action }: { title: ReactNode; lede?: ReactNode; action?: ReactNode }) {
  return (
    <div data-reveal className="mb-[clamp(1.5rem,1rem+1vw,2.25rem)] flex flex-wrap items-end justify-between gap-x-12 gap-y-4">
      <div className="max-w-3xl">
        <h2 className={sectionTitle}>{title}</h2>
        {lede && <p className={sectionLede}>{lede}</p>}
      </div>
      {action}
    </div>
  );
}
