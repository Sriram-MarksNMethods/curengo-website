import type { MetadataRoute } from "next";

const SITE = "https://curengo.ai";
const PAGES: [string, number][] = [
  ["", 1],
  ["/platform", 0.9],
  ["/solutions", 0.9],
  ["/abdm", 0.8],
  ["/pricing", 0.8],
  ["/about", 0.7],
  ["/book-a-demo", 0.9],
  ["/privacy-policy", 0.3],
  ["/terms-and-conditions", 0.3],
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map(([path, priority]) => ({ url: `${SITE}${path}`, changeFrequency: "monthly", priority }));
}
