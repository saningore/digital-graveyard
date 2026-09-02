# Digital Graveyard

Archive abandoned software projects with their stories, lessons, and revival status. Built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## Run locally

1. Copy `.env.example` to `.env.local` and add the URL and anonymous key from your Supabase project.
2. Apply `supabase/migrations/20260902120000_initial_schema.sql` in the Supabase SQL editor (or via the Supabase CLI).
3. Run `npm install` then `npm run dev`.

Without Supabase environment variables, the archive renders two sample memorials so the UI can be evaluated; publishing is intentionally disabled.

## Quality checks

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Supabase notes

Enable Email auth in Supabase Authentication. The migration creates the `graves` table, RLS access controls, and the public `grave-screenshots` storage bucket.
