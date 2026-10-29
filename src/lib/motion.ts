// Scroll-in motion for every page, started by <Motion /> after each navigation.
//  - [data-reveal] elements rise in once they scroll into view
//  - svg.draw line icons draw themselves (each stroke gets pathLength = 1), and redraw on hover
//  - .grow screens: graphs grow in (bars rise, progress fills, chart line sweeps, numbers count up)

const reduce = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// numbers like "81%", "18 d", "+31", "1,350" count up from 0 to their value
function countUp(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
    const raw = el.dataset.raw ?? (el.dataset.raw = el.textContent ?? "");
    const m = raw.match(/^([^\d]*)([\d,]+(?:\.\d+)?)(.*)$/);
    if (!m || reduce()) {
      el.textContent = raw;
      return;
    }
    const target = parseFloat(m[2].replace(/,/g, ""));
    const decimals = (m[2].split(".")[1] || "").length;
    const start = performance.now();
    const tick = (now: number) => {
      const k = Math.min(1, (now - start) / 1100);
      const eased = 1 - Math.pow(1 - k, 3);
      el.textContent = m[1] + (target * eased).toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + m[3];
      if (k < 1) requestAnimationFrame(tick);
      else el.textContent = raw;
    };
    requestAnimationFrame(tick);
  });
}

/** Replays the grow-in of one screen. Called when a screen is shown (journey step, role picker, scale switch). */
export function grow(el: HTMLElement | null) {
  if (!el || !el.classList.contains("grow")) return;
  el.classList.remove("is-grown");
  void el.offsetWidth; // restart the transitions
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      el.classList.add("is-grown");
      countUp(el);
    }),
  );
}

/** Replays everything inside a panel that has just been un-hidden. */
export function showPanel(panel: HTMLElement | null) {
  if (!panel) return;
  panel.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("in"));
  panel.querySelectorAll<HTMLElement>(".grow").forEach(grow);
}

export function startMotion(): () => void {
  const cleanups: Array<() => void> = [];

  // line icons
  // (pathLength and the --d order are rendered by <Icon draw>, so nothing here edits the markup)
  document.querySelectorAll<SVGSVGElement>("svg.draw").forEach((svg) => {
    const host = svg.closest<HTMLElement>("[data-draw-host]") ?? svg;
    const redraw = () => {
      svg.classList.add("redraw");
      svg.getBoundingClientRect();
      requestAnimationFrame(() => svg.classList.remove("redraw"));
    };
    host.addEventListener("pointerenter", redraw);
    cleanups.push(() => host.removeEventListener("pointerenter", redraw));
  });

  // (siblings are staggered in CSS: [data-reveal]:nth-child -> --i, see globals.css)

  const isHidden = (el: Element) => !!el.closest("[hidden]");

  if (reduce()) {
    document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("in"));
    document.querySelectorAll(".grow").forEach((el) => el.classList.add("is-grown"));
    return () => cleanups.forEach((off) => off());
  }

  const reveal = (el: Element) => {
    if (el.classList.contains("in")) return;
    el.classList.add("in");
    io.unobserve(el);
    if (el.classList.contains("grow") && !isHidden(el)) grow(el as HTMLElement);
    if (!isHidden(el)) el.dispatchEvent(new CustomEvent("revealed"));
  };
  const io = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && reveal(e.target)), {
    rootMargin: "0px 0px -8% 0px",
    threshold: 0,
  });
  document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

  // safety net: a fast flick (iOS momentum) can pass a section between observer checks,
  // so when scrolling settles, show everything that is on screen or above it
  let settle = 0;
  const sweep = () =>
    document.querySelectorAll("[data-reveal]:not(.in)").forEach((el) => {
      if (!isHidden(el) && el.getBoundingClientRect().top < window.innerHeight) reveal(el);
    });
  const onScroll = () => {
    clearTimeout(settle);
    settle = window.setTimeout(sweep, 140);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  const first = window.setTimeout(sweep, 400);

  return () => {
    io.disconnect();
    clearTimeout(settle);
    clearTimeout(first);
    window.removeEventListener("scroll", onScroll);
    cleanups.forEach((off) => off());
  };
}
