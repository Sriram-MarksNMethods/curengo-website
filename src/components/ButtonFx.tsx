"use client";

// Button effect for every button (class cta-fx for pill buttons, cta-soft for tabs/cards/toggles; styles in globals.css).
// Desktop only, skipped for reduced motion.
//  - hover: a fill circle grows from the point where the cursor came in, and shrinks back toward where it left
//  - phones/tablets (touch): every press gets a ripple from the finger and a short buzz where supported
//  - click/tap on a link to another page (all devices, not only desktop): the fill floods the whole screen in navy, the page changes underneath,
//    then the flood fades away
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function ButtonFx() {
  const pathname = usePathname();
  const router = useRouter();
  const flood = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const desktop = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1001px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => desktop.matches && !reduce.matches;

    // centre the fill on the point where the pointer crossed the edge. Its size is fixed per button
    // (big enough to cover it from any point), so the fill and the light label always match.
    const aim = (el: HTMLElement, e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--x", `${e.clientX - r.left}px`);
      el.style.setProperty("--y", `${e.clientY - r.top}px`);
      el.style.setProperty("--d", `${Math.ceil(Math.hypot(r.width, r.height) * 2 + 4)}px`);
      if (el.classList.contains("cta-fx")) el.dataset.label = el.textContent?.trim() ?? ""; // the light copy of the label (see ::after in globals.css)
    };

    const onOver = (e: PointerEvent) => {
      if (!on() || e.pointerType !== "mouse") return;
      const el = (e.target as HTMLElement).closest<HTMLElement>(".cta-fx, .cta-soft");
      if (!el || el.contains(e.relatedTarget as Node | null) || el.classList.contains("is-hot")) return;
      aim(el, e);
      el.classList.add("is-hot");
    };
    const onOut = (e: PointerEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>(".cta-fx, .cta-soft");
      if (!el || el.contains(e.relatedTarget as Node | null)) return;
      aim(el, e);
      el.classList.remove("is-hot");
    };

    const onClick = (e: MouseEvent) => {
      if (reduce.matches || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      const el = (e.target as HTMLElement).closest<HTMLAnchorElement>("a.cta-fx, a.cta-soft");
      if (!el) return;
      const url = new URL(el.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return; // same page: no flood
      const size = Math.hypot(window.innerWidth, window.innerHeight) * 2.1;
      const div = document.createElement("div");
      div.className = "cta-flood";
      Object.assign(div.style, { width: `${size}px`, height: `${size}px`, left: `${e.clientX - size / 2}px`, top: `${e.clientY - size / 2}px` });
      document.body.appendChild(div);
      flood.current?.remove();
      flood.current = div;
      requestAnimationFrame(() => requestAnimationFrame(() => (div.style.transform = "scale(1)")));
      // hold the page change until the flood has covered the screen
      e.preventDefault();
      e.stopPropagation();
      setTimeout(() => router.push(url.pathname + url.search + url.hash), 560);
    };

    // touch press feel: ripple from the finger + short vibration (Android; iPhones ignore it)
    const TAP = ".cta-fx, .cta-soft, .tab-fx, .mod-tab, .role-card, .goal";
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" || reduce.matches) return;
      const el = (e.target as HTMLElement).closest<HTMLElement>(TAP);
      if (!el) return;
      const r = el.getBoundingClientRect(), size = Math.hypot(r.width, r.height) * 2;
      const box = document.createElement("span");
      box.className = "tap-ripple";
      const dot = document.createElement("i");
      Object.assign(dot.style, { width: `${size}px`, height: `${size}px`, left: `${e.clientX - r.left - size / 2}px`, top: `${e.clientY - r.top - size / 2}px` });
      box.appendChild(dot);
      el.appendChild(box);
      setTimeout(() => box.remove(), 650);
      navigator.vibrate?.(12);
    };
    const noop = () => {}; // lets :active (the press-in) work on iPhone Safari

    document.addEventListener("pointerdown", onDown);
    document.addEventListener("touchstart", noop, { passive: true });
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("touchstart", noop);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      document.removeEventListener("click", onClick, true);
    };
  }, [router]);

  // the new page is in: let the flood finish covering, then fade it away
  useEffect(() => {
    const div = flood.current;
    if (!div) return;
    const fade = setTimeout(() => {
      div.style.opacity = "0";
      setTimeout(() => div.remove(), 500);
      if (flood.current === div) flood.current = null;
    }, 120);
    return () => clearTimeout(fade);
  }, [pathname]);

  return null;
}
