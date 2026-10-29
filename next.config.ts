import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  // the share-picture routes read these files at request time; make sure Vercel ships them
  outputFileTracingIncludes: {
    "/opengraph-image": ["./assets/fonts/*", "./public/brand/curengo-logo-reverse.png"],
    "/twitter-image": ["./assets/fonts/*", "./public/brand/curengo-logo-reverse.png"],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
