import JsonLd from "@/components/JsonLd";
import { breadcrumbLd, pageMeta } from "@/lib/site";
import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = pageMeta("/privacy-policy", "Privacy Policy", "How Curengo handles personal data on this website.");

const SECTIONS: LegalSection[] = [
  { id: "who", title: "Who we are", body: <p>This policy explains how <span className="ph">[Curengo legal entity name]</span> (“Curengo”, “we”) handles personal data when you visit this website, book a demo or contact us. Our registered office is at <span className="ph">[address]</span>.</p> },
  {
    id: "collect",
    title: "What we collect",
    body: (
      <>
        <p>When you book a demo or contact us, we collect the details you give us:</p>
        <ul>
          <li>Your name, role and the name of your centre</li>
          <li>Your work email and phone number</li>
          <li>The city, type of centre and number of beds, if you share them</li>
          <li>Anything you write in the message box</li>
        </ul>
        <p>We also collect basic technical data, such as browser type and pages visited, to keep the site working. <span className="ph">[List any analytics or cookies used.]</span></p>
      </>
    ),
  },
  {
    id: "use",
    title: "How we use it",
    body: (
      <>
        <ul>
          <li>To contact you about the demo you asked for</li>
          <li>To answer your questions about Curengo</li>
          <li>To keep records of our conversations with you</li>
        </ul>
        <p>We do not sell your personal data.</p>
      </>
    ),
  },
  { id: "patient", title: "Patient data in the Curengo platform", body: <p>This policy covers the website only. Patient health records held in the Curengo platform are processed on behalf of the centres that use it, under a separate agreement with each centre. <span className="ph">[Reference the platform data processing terms.]</span></p> },
  { id: "share", title: "Who we share it with", body: <p>We share data only with service providers who help us run this website and our sales process, such as hosting and email providers, under contracts that protect your data. <span className="ph">[List providers or categories.]</span></p> },
  { id: "keep", title: "How long we keep it", body: <p>We keep enquiry data for <span className="ph">[period]</span>, or longer if we enter into a contract with your centre.</p> },
  { id: "rights", title: "Your rights", body: <p>Under the Digital Personal Data Protection Act, 2023, you can ask to see, correct or delete your personal data, and withdraw consent. Write to <span className="ph">[privacy email]</span> and we will respond within <span className="ph">[period]</span>.</p> },
  { id: "grievance", title: "Grievance officer", body: <p><span className="ph">[Name, designation, email and address of the grievance officer.]</span></p> },
  { id: "changes", title: "Changes to this policy", body: <p>We will post any changes on this page and update the date at the top.</p> },
];

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd("Privacy Policy", "/privacy-policy")} />
      <LegalPage title="Privacy Policy" kind="policy" sections={SECTIONS} />
    </>
  );
}
