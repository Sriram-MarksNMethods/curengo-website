import type { Metadata, Viewport } from "next";
import { Figtree } from "next/font/google";
import ButtonFx from "@/components/ButtonFx";
import FloatingCta from "@/components/FloatingCta";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Motion from "@/components/Motion";
import SmoothScroll from "@/components/SmoothScroll";
import JsonLd from "@/components/JsonLd";
import { organizationLd, SEARCH_VISIBLE, SITE_NAME, SITE_TAGLINE, SITE_URL, websiteLd } from "@/lib/site";
import "./globals.css";

// Curengo's brand font (the same one curengo.ai uses)
const figtree = Figtree({ variable: "--font-figtree", subsets: ["latin"], weight: ["400", "500", "600", "700"] });

const DESCRIPTION =
  "Curengo digitizes inpatient rehabilitation and post-hospitalization care: one patient record for the whole care team, from admission to follow-up.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: ["rehabilitation management information system", "RMIS", "rehab EMR", "inpatient rehabilitation software", "transitional care software", "physiotherapy software", "ABDM", "ABHA"],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: SITE_NAME, locale: "en_IN", url: "/", title: `${SITE_NAME} | ${SITE_TAGLINE}`, description: DESCRIPTION },
  twitter: { card: "summary_large_image", title: `${SITE_NAME} | ${SITE_TAGLINE}`, description: DESCRIPTION },
  // hidden from search until launch: see SEARCH_VISIBLE in src/lib/site.ts
  robots: SEARCH_VISIBLE
    ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } }
    : { index: false, follow: false, googleBot: { index: false, follow: false } },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fcfcfc" },
    { media: "(prefers-color-scheme: dark)", color: "#121212" },
  ],
};

// Runs before the first paint: picks the saved theme (or the system one) and marks that JS is on,
// so the scroll-in animations can start hidden without hiding anything when JS is off.
const beforePaint = `try{var t=localStorage.getItem('curengo-theme');if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='light'}document.documentElement.classList.add('js')`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={figtree.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: beforePaint }} />
      </head>
      <body className="font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-contrast"
        >
          Skip to content
        </a>
        <JsonLd data={[organizationLd, websiteLd]} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <FloatingCta />
        <SmoothScroll />
        <Motion />
        <ButtonFx />
      </body>
    </html>
  );
}
