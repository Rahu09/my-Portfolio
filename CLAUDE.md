# Portfolio — project notes for Claude Code

Personal portfolio for Rahul Tiwari. Next.js 16 (App Router), React 19, Tailwind CSS 4, pnpm. Deployed on Vercel from `main`; every branch gets a preview.

## Commands

- `pnpm dev` — local dev server
- `pnpm build` — production build (run before pushing; Vercel runs the same)

Node 20.9+ is required (`engines` in package.json overrides the Vercel project's old Node 18 setting).

## Where things live

- `lib/content.ts` — **all copy**: impact numbers, projects, experience, skills, certifications. Edit content here, not in components.
- `app/page.tsx` — page layout and sections.
- `app/globals.css` — color tokens (light and dark), fonts, and all animations.
- `app/actions.ts` + `components/contact-form.tsx` — contact form (server action, Resend). Needs `RESEND_API_KEY`.
- `components/review-diff.tsx` — hero code-review diff (illustrative code, not from any employer).
- `components/section-nav.tsx`, `count-up.tsx`, `in-view.tsx` — scroll-driven animations.

## Positioning and content rules

- Positioning: "AI-native backend engineer". AI leads the wording; Java / Spring Boot is the proof. Python is not a primary skill — don't feature it.
- Every number on the site must match the resume and LinkedIn exactly. Don't invent or round metrics.
- Don't add revenue figures for any project, name any bank other than Citi, or list awards.
- The Citi work is presented as "Software Engineer, Aug 2024 – present" (promoted from Associate Software Engineer in July 2026), with the earlier enterprise-learning-platform role Sep 2023 – Jul 2024.

## Design rules

- Palette: cool slate paper `#EDF0F4`, white, navy ink `#14213D`, muted `#5B6577`, one accent — highlighter yellow `#FFD84D`. Diff green/red only inside code.
- Type: IBM Plex Sans Condensed (display), IBM Plex Sans (body), JetBrains Mono only for real code. Fonts are self-hosted via @fontsource (Google Fonts isn't reachable in some build environments).
- Left-aligned layout; grouped rows rather than card grids. No all-caps eyebrow labels.
- Animations: CSS + IntersectionObserver, no animation library. Gate scroll animations on the `.js` class on `<html>` so content shows without JavaScript, and disable them under `prefers-reduced-motion`.

## Open items

- [ ] Add `public/Rahul_Tiwari_Resume.pdf` (phone number removed). The "Download resume" button points there.
- [ ] Confirm `RESEND_API_KEY` is set in Vercel.
- [ ] Check the four Claude certification names against the actual badges.
- [ ] Add a new profile photo once it's ready (hero has no photo for now).
- [ ] Merge PR #1 (`redesign-2026` → `main`).
