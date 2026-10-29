import type { Metadata, Viewport } from "next";
import { Figtree } from "next/font/google";
import ButtonFx from "@/components/ButtonFx";
import FloatingCta from "@/components/FloatingCta";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Motion from "@/components/Motion";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

// Curengo's brand font (the same one curengo.ai uses)
const figtree = Figtree({ variable: "--font-figtree", subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://curengo.ai"),
  title: {
    default: "Curengo | Rehabilitation Management Information System",
    template: "%s | Curengo",
  },
  description:
    "Curengo digitizes inpatient rehabilitation and post-hospitalization care: one patient record for the whole care team, from admission to follow-up.",
  openGraph: { siteName: "Curengo", type: "website", locale: "en_IN" },
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
