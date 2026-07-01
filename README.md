# PlumbingCraft

Ultra-premium single-page marketing site for PlumbingCraft, a heating & sanitary
installation specialist in Wrocław.

## Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + Framer Motion
- Resend for the contact form
- Single source of truth: `src/lib/siteData.json` (all copy, services, contact, image paths)

## Editing content
Everything editable lives in `src/lib/siteData.json`. Drop portfolio photos into
`public/realizacje/` using the filenames referenced there. Any missing file renders
as a clearly-marked slate placeholder (no stock photos).

## Dev
```bash
npm install
npm run dev
```

## Notes
- Remaining placeholder values (trust stats and the three testimonial slots) are flagged
  in `siteData.json` and should be confirmed with the client before launch.
- See `.env.local` for the Resend domain-swap TODO.
