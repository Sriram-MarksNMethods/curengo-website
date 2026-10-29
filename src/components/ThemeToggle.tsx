"use client";

// Light / dark switch. The choice is remembered (localStorage) and applied before paint by the script in layout.tsx.
export default function ThemeToggle({ className = "", onDark = false }: { className?: string; onDark?: boolean }) {
  const flip = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("curengo-theme", next);
    } catch {
      /* private mode: the switch still works for this visit */
    }
  };
  return (
    <button
      type="button"
      onClick={flip}
      data-on-dark={onDark || undefined}
      aria-label="Switch colour theme"
      className={`cta-soft inline-grid size-8 place-items-center rounded-lg transition-colors pointer-coarse:size-11 ${onDark ? "text-[#d8d2f0] max-[1000px]:hover:bg-white/10 hover:text-white" : "text-muted max-[1000px]:hover:bg-hover hover:text-heading"} ${className}`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-4 dark:hidden">
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="hidden size-4 dark:block">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
    </button>
  );
}
