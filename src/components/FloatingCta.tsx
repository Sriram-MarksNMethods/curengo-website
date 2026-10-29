"use client";

// Phones and tablets: a round "Book a Demo" button floating at the bottom right (the header one is hidden there),
// with a small speech bubble beside it that slides in shortly after the page opens (on the home page only once the
// visitor has scrolled past most of the first screen, so it never covers the hero network). The bubble can be closed;
// it comes back 30 seconds later (on any page). Not shown on the demo and thank-you pages.
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const KEY = "curengo-cta-bubble"; // when it was last closed (ms)
const COME_BACK = 30_000;

export default function FloatingCta() {
  const pathname = usePathname();
  const [bubble, setBubble] = useState(false);

  // hide it again on every page change (it re-appears by that page's rule), adjusting state during render
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setBubble(false);
  }

  useEffect(() => {
    let waited = false;
    const closedFor = () => {
      try {
        const at = Number(sessionStorage.getItem(KEY) || 0);
        return Number.isFinite(at) ? Date.now() - at : Infinity; // (an old non-number value counts as "show it")
      } catch {
        return Infinity; // private mode: just show it
      }
    };
    const show = () => {
      const pastHero = pathname !== "/" || window.scrollY > window.innerHeight * 0.6;
      if (waited && pastHero && closedFor() >= COME_BACK) setBubble(true);
    };
    const t = setTimeout(() => {
      waited = true;
      show();
    }, 1500);
    // closed a moment ago: check again until its 30 seconds are up
    const back = setInterval(show, 5000);
    window.addEventListener("scroll", show, { passive: true });
    return () => {
      clearTimeout(t);
      clearInterval(back);
      window.removeEventListener("scroll", show);
    };
  }, [pathname]);

  const close = () => {
    setBubble(false);
    try {
      sessionStorage.setItem(KEY, String(Date.now()));
    } catch {
      /* private mode: it just closes */
    }
  };

  if (pathname === "/book-a-demo" || pathname === "/thank-you") return null;
  return (
    <>
      <div
        role="status"
        className={`fixed right-[calc(max(1.25rem,env(safe-area-inset-right,0px))+4.5rem)] bottom-[calc(max(1.25rem,env(safe-area-inset-bottom,0px))+0.5rem)] z-40 hidden items-center gap-1 rounded-full border border-line bg-surface py-1.5 pr-1.5 pl-4 text-heading shadow-[0_12px_28px_-10px_rgba(23,19,61,0.45)] transition-[opacity,translate] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] max-[1000px]:flex ${
          bubble ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-3 opacity-0"
        }`}
      >
        <Link href="/book-a-demo" tabIndex={bubble ? 0 : -1} className="text-[0.9375rem] font-semibold whitespace-nowrap no-underline">
          Book a demo
        </Link>
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          tabIndex={bubble ? 0 : -1}
          className="grid size-7 shrink-0 cursor-pointer place-items-center rounded-full text-muted transition-colors hover:bg-hover hover:text-heading"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true" className="size-3.5">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        {/* the bubble's tail, pointing at the button */}
        <span aria-hidden="true" className="absolute top-1/2 -right-[5px] size-2.5 -translate-y-1/2 rotate-45 border-t border-r border-line bg-surface" />
      </div>
      <Link
        href="/book-a-demo"
        aria-label="Book a Demo"
        className="cta-fx fab fixed right-[max(1.25rem,env(safe-area-inset-right,0px))] bottom-[max(1.25rem,env(safe-area-inset-bottom,0px))] z-40 hidden size-15 place-items-center rounded-full no-underline shadow-[0_12px_28px_-8px_rgba(23,19,61,0.55)] max-[1000px]:grid"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-6">
          {/* a screen with a play button: "see a demo" */}
          <rect x="2.5" y="3.5" width="19" height="13" rx="2.5" />
          <path d="M8 21h8M12 16.5V21" />
          <path d="M10.25 7.5v5l4.25-2.5z" fill="currentColor" />
        </svg>
      </Link>
    </>
  );
}
