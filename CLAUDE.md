# Portfolio — project notes for Claude Code

Personal portfolio for Rahul Tiwari. Next.js 16 (App Router), React 19, Tailwind CSS 4, pnpm. Deployed on Vercel from `main`; every branch gets a preview.

## Commands

- `pnpm dev` — local dev server
- `pnpm build` — production build (run before pushing; Vercel runs the same)

Node 20.9+ is required (`engines` in package.json overrides the Vercel project's old Node 18 setting).

## Where things live

- `lib/data.ts` — **all copy**: nav links, impact numbers, projects, experience timeline, skills, certifications, contact links. Edit content here, not in components.
- `app/page.tsx` — section order: Intro, About, Impact, Projects, Skills (+ certifications), Experience, Contact.
- `components/` — one file per section, in the original portfolio template style.
- `actions/sendEmail.ts` — contact form server action (Resend). Needs `RESEND_API_KEY`.
- `context/` — active-section and theme state. `lib/hooks.ts` — `useSectionInView` keeps the nav pill in sync.
- `public/aiPrReviewer.png` — project image, a render of an illustrative AI PR Reviewer finding (invented code, not from any employer).

## Positioning and content rules

- Positioning: "AI-native backend engineer". AI leads the wording; Java / Spring Boot is the proof. Python is not a primary skill — don't feature it.
- Every number on the site must match the resume and LinkedIn exactly. Don't invent or round metrics.
- Don't add revenue figures for any project, name any bank other than Citi, or list awards.
- The Citi work is presented as "Software Engineer, Aug 2024 – present" (promoted from Associate Software Engineer in July 2026), with the earlier enterprise-learning-platform role Sep 2023 – Jul 2024.

## Design rules

- Keep the original template look: centered layout, pink/purple blurred background blobs, round photo with 👋, floating pill nav, gray project cards with tilting screenshots, white bordered pills for skills, vertical timeline, theme button bottom-right. The owner prefers this style; don't redesign it.
- Font: Inter, self-hosted via @fontsource (Google Fonts isn't reachable in some build environments).
- Animations use framer-motion (page-load entrance, `layoutId` nav pill, scroll-linked project cards, staggered pills, count-up impact numbers) plus react-vertical-timeline-component.
- Tailwind 4: use slash opacity syntax (`bg-white/80`), not `bg-opacity-*`. Dark mode is the `.dark` class on `<html>`.

## Open items

- [ ] Add `public/Rahul_Tiwari_Resume.pdf` (phone number removed). The "Download resume" button points there.
- [ ] Confirm `RESEND_API_KEY` is set in Vercel.
- [ ] Check the four Claude certification names against the actual badges.
- [ ] Replace `public/IMG_20220318_231444.jpg` with the new profile photo once it's ready.
- [ ] Merge PR #1 (`redesign-2026` → `main`).
