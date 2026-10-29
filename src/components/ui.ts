// Shared class strings for buttons, so every button on the site looks the same.
// "cta-fx" gives every button the hover fill + click flood on desktop (globals.css + components/ButtonFx.tsx).
export const btn =
  "cta-fx inline-flex h-11 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg border px-5 text-[0.9375rem] font-semibold no-underline transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
export const btnPrimary = `${btn} border-transparent bg-accent text-accent-contrast hover:bg-accent-hover`;
export const btnGhost = `${btn} border-line bg-surface text-heading hover:border-accent-line hover:text-accent`;
/** White button for dark (navy) backgrounds */
export const btnLight = `${btn} border-transparent bg-white text-[#2c1a5c] hover:bg-[#ece6fb]`;
/** Outline button for dark (navy) backgrounds */
export const btnOutlineLight = `${btn} border-white/30 bg-transparent text-white hover:border-white`;

export const sectionTitle =
  "m-0 text-[clamp(1.875rem,1.1rem+2.2vw,3.25rem)] font-medium leading-[1.15] tracking-[-0.02em] text-balance text-heading";
export const sectionLede = "mt-4 text-[1.0625rem] leading-[1.7] text-muted";
