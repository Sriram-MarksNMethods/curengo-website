// Site-wide SEO settings: the address, the name, and whether search engines may list the site.
import type { Metadata } from "next";

export const SITE_URL = "https://curengo.ai";
export const SITE_NAME = "Curengo";
export const SITE_TAGLINE = "Rehabilitation Management Information System";

// ⚠️ REMINDER BEFORE LAUNCH: set this to true when the site goes live on curengo.ai.
// While false, every page says "noindex, nofollow" and robots.txt blocks all crawlers, so the preview
// (curengo-website.vercel.app) stays out of Google. Also listed in README.md under "Before launch".
export const SEARCH_VISIBLE = false;

const SHARE_ALT = "Curengo: Digitizing the Continuum of Care. Rehabilitation Management Information System.";

/**
 * Metadata for one page: title, description, its canonical address, and the matching
 * Open Graph / Twitter text and share picture (drawn by app/opengraph-image.tsx).
 */
export function pageMeta(path: string, title: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    // a page's openGraph/twitter replace the site-wide ones, so the share picture is named here too
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_IN",
      url: path,
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: SHARE_ALT, type: "image/png" }],
    },
    twitter: { card: "summary_large_image", title: `${title} | ${SITE_NAME}`, description, images: [{ url: "/twitter-image", alt: SHARE_ALT }] },
  };
}

// Structured data (schema.org JSON-LD). Only facts that are true today: no ratings, prices, address or
// social profiles until Curengo confirms them.
export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/brand/curengo-logo.png`,
  description: "Curengo builds software for rehabilitation centres: one patient record for the whole care team.",
  // TODO: add "sameAs": [LinkedIn, Instagram, YouTube URLs] and "address" once Curengo sends them
};

export const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  inLanguage: "en-IN",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export const softwareLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/#software`,
  name: `${SITE_NAME} RMIS`,
  alternateName: `${SITE_NAME} ${SITE_TAGLINE}`,
  applicationCategory: "HealthApplication",
  applicationSubCategory: SITE_TAGLINE,
  operatingSystem: "Web browser",
  url: SITE_URL,
  description:
    "Rehab EMR, clinical workflow, operations, billing, assessment scales, voice orders and drafted discharge summaries on one patient record for inpatient rehabilitation and post-hospitalization care.",
  featureList: [
    "Rehab EMR for every discipline",
    "Care plans, orders and nurse task lists",
    "Bed management, admissions and pharmacy",
    "OP and IP billing with packages",
    "Objective assessment scales",
    "Voice order entry",
    "Drafted discharge summaries",
  ],
  publisher: { "@id": `${SITE_URL}/#organization` },
  // TODO: add "offers" once real pricing is confirmed (needed for Google's software rich result)
};

/** Breadcrumb trail for an inner page: Home > page */
export function breadcrumbLd(name: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name, item: `${SITE_URL}${path}` },
    ],
  };
}
