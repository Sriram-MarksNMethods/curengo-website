# Curengo website

Marketing site for Curengo (Rehabilitation Management Information System), built with **Next.js 16** (App Router), **TypeScript** and **Tailwind CSS v4**. Smooth scrolling uses **Lenis**.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (all pages are static, except /api/demo)
npm start
```

Copy `.env.example` to `.env.local` and fill in `LEAD_WEBHOOK_URL` so "Book a demo" leads are delivered.
Without it, the form works in development (leads are only logged) but answers "not configured" in production on purpose, so no lead is silently lost.

## Where things are

| Path | What |
|---|---|
| `src/app/*/page.tsx` | One file per page: `/`, `/platform`, `/solutions`, `/abdm`, `/pricing`, `/about`, `/book-a-demo`, `/privacy-policy`, `/terms-and-conditions` |
| `src/app/layout.tsx` | Header, footer, font (Figtree), theme script, smooth scroll |
| `src/app/globals.css` | Colour tokens (light, dark, and the `navy` section style) and the few effects Tailwind can't express |
| `src/app/api/demo/route.ts` | Receives the demo form, validates it and forwards it to `LEAD_WEBHOOK_URL` |
| `src/components/sections/` | Page sections (Hero, Journey, Roles, Plans, Faq ...) |
| `src/components/screens/` | Illustrative Curengo screens built in HTML, with **sample data** |
| `src/components/hero/network.js` | The care network animation behind the home hero |
| `src/lib/motion.ts` | Scroll-in reveals, self-drawing icons, graphs that grow in |
| `public/llms.txt`, `src/app/sitemap.ts`, `src/app/robots.ts` | SEO files: keep them in step when pages change |

## Design tokens

Colours are CSS variables, used through Tailwind: `bg-page`, `bg-surface`, `bg-sunken`, `text-heading`, `text-body`, `text-muted`, `text-faint`, `border-line`, `bg-accent`, `bg-accent-soft` ...
Dark mode swaps the variables (`data-theme="dark"` on `<html>`). Add the class `navy navy-glow` to a section to give it the dark navy look; product screens inside keep the normal theme.

## Before launch: placeholders to replace

Anything in `[brackets]` (and `TODO:` comments) is waiting on Curengo:

- Client logos (with permission), testimonials, team photos and bios
- Real product screenshots / recordings (the screens on the site are illustrations with sample data)
- Prices, plan names and limits; FAQ answers marked [confirm]
- Office address, phone, email, social links, app store links
- ABDM wording, integration statuses and security claims (only "ABDM: in progress" is confirmed)
- Privacy Policy and Terms are **drafts** and must be reviewed by Curengo's legal advisor

## Browser support

Next.js 16 and Tailwind v4 support Chrome/Edge/Firefox 111+ and **Safari 16.4+** (iOS 16.4+).
Tested on iPhone 13, iPhone SE, iPad (portrait, landscape, Pro 11), Safari desktop, Firefox desktop and mobile, Chrome 1024 / 768 / 360.
