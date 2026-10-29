"use client";

// One header for every page: transparent at the top, frosted once the page scrolls.
// Over the dark page heroes (every page except home) its text and logo are white until it turns frosted.
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

// TODO: real social profile URLs from Curengo (same placeholders as the footer)
const SOCIAL = [
  { label: "LinkedIn", href: "#", icon: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></> },
  { label: "Instagram", href: "#", icon: <><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></> },
  { label: "YouTube", href: "#", icon: <><path d="M2.5 17a24 24 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.6 49.6 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24 24 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.6 49.6 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><path d="m10 15 5-3-5-3z" /></> },
];

const NAV = [
  { href: "/platform", label: "Platform" },
  { href: "/solutions", label: "Solutions" },
  { href: "/abdm", label: "ABDM" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/book-a-demo", label: "Contact", mobileOnly: true }, // phones/tablets menu only
];

export default function Header() {
  const pathname = usePathname();
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  // close the mobile menu after navigating (adjusting state during render, as React recommends)
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // phones/tablets: the open menu covers the page, so the page underneath must not scroll
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  // the open menu is a purple panel: the logo and buttons turn white once it has slid under them (and back as it leaves)
  const [overPanel, setOverPanel] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setOverPanel(open), open ? 200 : 260);
    return () => clearTimeout(t);
  }, [open]);

  const solid = stuck || open;
  const onDark = overPanel || (pathname !== "/" && !solid);

  return (
    <header
      id="siteBar"
      className={`sticky top-0 z-50 -mb-(--topbar) h-(--topbar) border-b pt-[env(safe-area-inset-top,0px)] transition-[background-color,border-color] duration-300 ${
        open ? "border-line bg-page" : stuck ? "border-line bg-page/85 backdrop-blur-md backdrop-saturate-150" : "border-transparent"
      }`}
    >
      <div className="wrap flex h-full items-center gap-8">
        <Link href="/" data-home aria-label="Curengo home" className="flex shrink-0 items-center no-underline">
          <Image
            src="/brand/curengo-logo.png"
            alt=""
            width={720}
            height={267}
            loading="eager"
            className={`h-9 w-auto max-[420px]:h-[1.875rem] dark:hidden ${onDark ? "hidden" : ""}`}
          />
          <Image
            src="/brand/curengo-logo-reverse.png"
            alt=""
            width={360}
            height={124}
            loading="eager"
            className={`h-9 w-auto max-[420px]:h-[1.875rem] ${onDark ? "block" : "hidden dark:block"}`}
          />
        </Link>

        <nav
          id="siteNav"
          aria-label="Main"
          className={`ml-auto flex items-center gap-7 max-[1000px]:fixed max-[1000px]:inset-0 max-[1000px]:-z-10 max-[1000px]:m-0 max-[1000px]:h-dvh max-[1000px]:flex-col max-[1000px]:items-stretch max-[1000px]:gap-0 max-[1000px]:overflow-y-auto max-[1000px]:bg-[#211b50] max-[1000px]:bg-[linear-gradient(150deg,#17133d_0%,#2f1f66_55%,#5a3f94_100%)] max-[1000px]:shadow-[24px_0_60px_-24px_rgba(23,19,61,0.7)] max-[1000px]:px-[max(clamp(1.5rem,5vw,6rem),env(safe-area-inset-left,0px))] max-[1000px]:pt-[calc(var(--topbar)+env(safe-area-inset-top,0px)+1.5rem)] max-[1000px]:pb-10 max-[1000px]:transition-[translate,visibility] max-[1000px]:duration-500 max-[1000px]:ease-[cubic-bezier(0.65,0,0.35,1)] ${
            open ? "max-[1000px]:visible max-[1000px]:translate-x-0" : "max-[1000px]:invisible max-[1000px]:-translate-x-full"
          }`}
        >
          {/* phones/tablets: spacer so the links sit in the middle of the panel */}
          <span aria-hidden="true" className="hidden max-[1000px]:block max-[1000px]:flex-1" />
          {NAV.map((item, i) => {
            const current = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current ? "page" : undefined}
                style={{ transitionDelay: open ? `${180 + i * 60}ms` : "0ms" }}
                className={`${"mobileOnly" in item ? "min-[1001px]:hidden" : ""} relative text-[0.9375rem] font-medium no-underline transition-[color,translate,opacity] max-[1000px]:border-white/15 max-[1000px]:py-5 max-[1000px]:text-center max-[1000px]:[@media(max-height:700px)]:py-3 max-[1000px]:[@media(max-height:700px)]:text-2xl max-[1000px]:text-[1.75rem] max-[1000px]:font-semibold max-[1000px]:tracking-[-0.01em] max-[1000px]:text-white max-[1000px]:duration-500 ${i < NAV.length - 1 ? "max-[1000px]:border-b" : ""} ${
                  open ? "" : "max-[1000px]:-translate-x-6 max-[1000px]:opacity-0"
                } ${
                  onDark ? "text-[#d8d2f0] hover:text-white" : "text-muted hover:text-accent"
                } ${current ? (onDark ? "text-white" : "text-accent") : ""} ${
                  current ? "min-[1001px]:after:absolute min-[1001px]:after:inset-x-0 min-[1001px]:after:-bottom-2 min-[1001px]:after:h-0.5 min-[1001px]:after:rounded-sm min-[1001px]:after:bg-current" : ""
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          {/* phones/tablets: social links at the bottom of the panel */}
          <div
            style={{ transitionDelay: open ? `${180 + NAV.length * 60}ms` : "0ms" }}
            className={`hidden max-[1000px]:flex max-[1000px]:flex-1 max-[1000px]:items-end max-[1000px]:justify-center max-[1000px]:gap-4 max-[1000px]:pt-8 max-[1000px]:[@media(max-height:700px)]:pt-5 max-[1000px]:transition-[translate,opacity] max-[1000px]:duration-500 ${
              open ? "" : "max-[1000px]:translate-y-3 max-[1000px]:opacity-0"
            }`}
          >
            {SOCIAL.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="cta-soft grid size-12 place-items-center rounded-full border border-white/25 text-white no-underline"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-5">
                  {s.icon}
                </svg>
              </a>
            ))}
          </div>
        </nav>

        <div className="flex items-center gap-3 max-[1000px]:ml-auto max-[420px]:gap-2">
          <ThemeToggle onDark={onDark} />
          <Link
            href="/book-a-demo"
            data-on-dark={onDark || undefined}
            className={`cta-fx inline-flex h-10 shrink-0 items-center whitespace-nowrap rounded-lg px-[1.125rem] text-[0.9375rem] font-semibold no-underline transition-colors max-[1000px]:hidden ${
              onDark ? "bg-white text-[#2c1a5c] hover:bg-[#ece6fb]" : "bg-accent text-accent-contrast hover:bg-accent-hover"
            }`}
          >
            Book a Demo
          </Link>
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="siteNav"
            onClick={() => setOpen((o) => !o)}
            className={`cta-soft hidden size-10 place-items-center rounded-lg border max-[1000px]:grid ${
              onDark ? "border-white/30 bg-transparent text-white" : "border-line bg-surface text-heading"
            }`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className="size-5">
              <path d="M4 8h16" className={`origin-[12px_12px] transition-transform duration-300 ${open ? "translate-y-1 rotate-45" : ""}`} />
              <path d="M4 16h16" className={`origin-[12px_12px] transition-transform duration-300 ${open ? "-translate-y-1 -rotate-45" : ""}`} />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
