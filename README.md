# Rahul Tiwari — portfolio

Personal site built with Next.js 16, React 19 and Tailwind CSS 4.

## Run locally

```bash
pnpm install
pnpm dev
```

## Editing content

All copy (impact numbers, projects, experience, skills, certifications) lives in `lib/content.ts`.

## Contact form

The form sends email through [Resend](https://resend.com). Set `RESEND_API_KEY` in `.env.local` locally and in the Vercel project's environment variables. Without it, the form shows a message pointing visitors to the email address instead.

## Resume

The "Download resume" button serves `public/Rahul_Tiwari_Resume.pdf`.
