import type { MetadataRoute } from "next";
import { BRAND, SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} | ${SITE_TAGLINE}`,
    short_name: SITE_NAME,
    description: "One patient record for the whole rehabilitation care team.",
    start_url: "/",
    display: "standalone",
    background_color: "#fcfcfc",
    theme_color: BRAND.purple,
    icons: [{ src: "/icon.png", sizes: "any", type: "image/png" }],
  };
}
