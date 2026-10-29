// The picture shown when a Curengo link is shared (Open Graph + Twitter), 1200x630, built at deploy time.
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Curengo: Digitizing the Continuum of Care. Rehabilitation Management Information System.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  // the brand font, Figtree (SIL Open Font License), from assets/fonts
  const [figtree500, figtree600] = await Promise.all([readFile(join(process.cwd(), "assets/fonts/Figtree-500.woff")), readFile(join(process.cwd(), "assets/fonts/Figtree-600.woff"))]);
  const logo = await readFile(join(process.cwd(), "public/brand/curengo-logo-reverse.png"));
  const src = `data:image/png;base64,${logo.toString("base64")}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          color: "#fff",
          fontFamily: "Figtree",
          background: "linear-gradient(140deg, #17133d 0%, #2f1f66 55%, #5a3f94 100%)",
        }}
      >
        <img src={src} width={290} height={100} alt="" />
        <div style={{ marginTop: 56, fontSize: 64, fontWeight: 600, lineHeight: 1.1, letterSpacing: -1.5 }}>Digitizing the Continuum of Care.</div>
        <div style={{ marginTop: 24, fontSize: 34, fontWeight: 500, color: "#d8d2f0" }}>Rehabilitation Management Information System</div>
        <div style={{ position: "absolute", left: 96, right: 96, bottom: 72, height: 6, borderRadius: 3, background: "linear-gradient(90deg, #c3b2f3, #5db8d7)" }} />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Figtree", data: figtree500, weight: 500, style: "normal" },
        { name: "Figtree", data: figtree600, weight: 600, style: "normal" },
      ],
    },
  );
}
