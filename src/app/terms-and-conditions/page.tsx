import JsonLd from "@/components/JsonLd";
import { breadcrumbLd, pageMeta } from "@/lib/site";
import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = pageMeta("/terms-and-conditions", "Terms and Conditions", "Terms for using the Curengo website.");

const SECTIONS: LegalSection[] = [
  { id: "about", title: "About these terms", body: <p>These terms govern your use of this website, operated by <span className="ph">[Curengo legal entity name]</span>. Use of the Curengo platform itself is covered by a separate subscription agreement with each centre.</p> },
  { id: "use", title: "Using this website", body: <p>You may browse the site and request information or a demo. You agree not to misuse the site, attempt to break its security, or copy its content for commercial use without permission.</p> },
  { id: "info", title: "Information on the site", body: <p>We describe Curengo’s features as accurately as we can and label features that are not yet available. Screens shown on the site are illustrations with sample data. Nothing on this site is medical advice.</p> },
  { id: "ip", title: "Intellectual property", body: <p>The Curengo name, logo, text and design of this site belong to <span className="ph">[entity]</span>. Client logos are shown with their permission.</p> },
  { id: "liability", title: "Limitation of liability", body: <p><span className="ph">[Liability clause to be drafted by legal counsel.]</span></p> },
  { id: "law", title: "Governing law", body: <p>These terms are governed by the laws of India, and the courts of <span className="ph">[city]</span> have jurisdiction.</p> },
  { id: "contact", title: "Contact", body: <p>Questions about these terms can be sent to <span className="ph">[email]</span>.</p> },
];

export default function TermsPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd("Terms and Conditions", "/terms-and-conditions")} />
      <LegalPage title="Terms and Conditions" kind="page" sections={SECTIONS} />
    </>
  );
}
