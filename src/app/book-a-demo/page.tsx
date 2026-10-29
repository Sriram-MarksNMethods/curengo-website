import type { Metadata } from "next";
import DemoForm from "@/components/DemoForm";
import PageHero from "@/components/PageHero";
import { Tick } from "@/components/icons";

export const metadata: Metadata = {
  title: "Book a Demo",
  description: "Book a walkthrough of Curengo built around how your rehabilitation centre works.",
};

export default function BookDemoPage() {
  return (
    <>
      <PageHero
        tone="teal"
        title="See Curengo with your own workflow"
        lede={<>Tell us a little about your centre and we’ll set up a <span className="ph">[30-minute]</span> walkthrough, built around how your team works.</>}
      />
      <section id="book" className="sec pt-0">
        <div className="wrap relative z-2 -mt-[clamp(2rem,3vw,4rem)] grid grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] items-start gap-16 max-[900px]:grid-cols-1 max-[900px]:gap-12">
          <DemoForm />
          <div className="pt-[clamp(3rem,2rem+3vw,5rem)] max-[900px]:pt-0">
            <h2 className="mb-4 text-lg font-semibold text-heading">What happens next</h2>
            <ul className="grid gap-2.5">
              <Tick>We call you within <span className="ph">[one working day]</span> to pick a time</Tick>
              <Tick>A walkthrough using your centre’s workflow</Tick>
              <Tick>Pricing for your number of beds</Tick>
            </ul>
            <div id="contact" className="mt-10 border-t border-line pt-8">
              <h2 className="mb-4 text-lg font-semibold text-heading">Talk to our team</h2>
              <address className="leading-[1.8] text-muted not-italic">
                <span className="ph">[Phone]</span>
                <br />
                <span className="ph">[Email]</span>
                <br />
                <span className="ph">[Office address]</span>
              </address>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
