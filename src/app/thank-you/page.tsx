import type { Metadata } from "next";
import ThankYou from "@/components/ThankYou";

export const metadata: Metadata = {
  title: "Thank you",
  description: "Your demo request has reached the Curengo team.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return <ThankYou />;
}
