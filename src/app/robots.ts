import type { MetadataRoute } from "next";
import { SEARCH_VISIBLE, SITE_URL } from "@/lib/site";

// While SEARCH_VISIBLE is false (preview, before launch) every crawler is kept out of the whole site.
export default function robots(): MetadataRoute.Robots {
  if (!SEARCH_VISIBLE) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/thank-you"] }, sitemap: `${SITE_URL}/sitemap.xml`, host: SITE_URL };
}
