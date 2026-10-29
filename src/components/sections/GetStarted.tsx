import Link from "next/link";
import SectionHead from "../SectionHead";
import { btnLight, btnOutlineLight } from "../ui";

/** Closing call to action, at the bottom of every page */
export default function GetStarted() {
  return (
    <section id="get-started" className="navy navy-glow sec-tight">
      <div className="wrap">
        <SectionHead title="Get started with Curengo" />
        <div className="grid grid-cols-2 gap-6 max-[760px]:grid-cols-1">
          <div data-reveal className="flex flex-col items-start gap-4 rounded-2xl border border-[rgba(195,178,243,0.45)] bg-linear-135 from-[rgba(195,178,243,0.22)] to-[rgba(34,184,212,0.12)] p-8">
            <h3 className="text-[1.375rem] font-semibold text-heading">Book a demo</h3>
            <p className="leading-[1.65] text-muted">
              See Curengo with your own workflow. A <span className="ph">[30-minute]</span> walkthrough with our team.
            </p>
            <Link href="/book-a-demo" className={`${btnLight} mt-auto`}>Book a Demo</Link>
          </div>
          <div data-reveal className="flex flex-col items-start gap-4 rounded-2xl border border-line bg-surface p-8">
            <h3 className="text-[1.375rem] font-semibold text-heading">Talk to our team</h3>
            <p className="leading-[1.65] text-muted">
              Questions about pricing, setup or ABDM? Call <span className="ph">[phone]</span> or write to <span className="ph">[email]</span>.
            </p>
            <Link href="/book-a-demo#contact" className={`${btnOutlineLight} mt-auto`}>Talk to Our Team</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
