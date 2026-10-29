"use client";

// Smooth scrolling (Lenis) for the whole site.
//  - every page change starts at the top (or at #section when the link has one)
//  - in-page links (#platform ...) glide to their section, just below the sticky header
//  - the Curengo logo glides back to the top when you are already on the home page
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = reduce ? null : new Lenis({ lerp: 0.075, smoothWheel: true });
    lenisRef.current = lenis;
    let raf = 0;
    const loop = (t: number) => {
      lenis?.raf(t);
      raf = requestAnimationFrame(loop);
    };
    if (lenis) raf = requestAnimationFrame(loop);

    const headerHeight = () => document.getElementById("siteBar")?.offsetHeight ?? 0;
    const glideTo = (y: number) => (lenis ? lenis.scrollTo(y, { duration: 1.2 }) : window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" }));

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a");
      if (!a || e.metaKey || e.ctrlKey || e.shiftKey || a.target === "_blank") return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname) return;
      if (a.hasAttribute("data-home") || (!url.hash && url.pathname === "/")) {
        e.preventDefault();
        glideTo(0);
        return;
      }
      if (!url.hash) return;
      const el = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!el) return;
      e.preventDefault();
      glideTo(Math.round(el.getBoundingClientRect().top + window.scrollY - headerHeight()));
      history.replaceState(null, "", url.hash);
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, []);

  // new page: start at the top, or at the #section the link pointed to
  useEffect(() => {
    const lenis = lenisRef.current;
    const land = () => {
      const id = location.hash.slice(1);
      const el = id ? document.getElementById(decodeURIComponent(id)) : null;
      const top = el ? Math.round(el.getBoundingClientRect().top + window.scrollY - (document.getElementById("siteBar")?.offsetHeight ?? 0)) : 0;
      if (lenis) lenis.scrollTo(top, { immediate: true, force: true });
      else window.scrollTo(0, top);
    };
    land();
    const late = window.setTimeout(land, 80); // after images and fonts settle
    return () => clearTimeout(late);
  }, [pathname]);

  return null;
}
