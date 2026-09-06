# Build Status

## Current checkpoint

- Build 1 — Astro Foundation & Project Structure: **COMPLETE**
- Build 2 — Static Landing Page UI: **COMPLETE**
- Build 3 — Quote Form & Photo Upload UX: **COMPLETE**
- Build 4 — Database, Storage & Real Lead Submission: **IN PROGRESS / EXTERNAL SETUP REQUIRED**
- Build 5 — Lead Scoring, Romano Notification & Outcome Tracking: **NOT STARTED**
- Build 6 — Analytics, Deployment, End-to-End Certification & Launch Readiness: **NOT STARTED**

## Certified checkpoints

### Build 1

Astro foundation, TypeScript, shared layout/styles/config, tests, README, and CI established.

### Build 2

Mobile-first Blue Horizon Pools pool-closing landing page completed with centralized business content and no unapproved testimonials/certification claims.

### Build 3

Pool-closing qualification form completed with mobile photo selection, previews/removal, validation, contact consent, thank-you page, privacy draft, spam honeypot, and recoverable form state.

Final Build 3 checkpoint: `a64d867f596a7b5b4eb7854f26e9ef6de52c65f6`

CI: tests and production Astro build passed.

## Build 4 work already completed

The following is implemented and committed:

- Astro server output using the Node adapter.
- Server-only Supabase environment-variable contract.
- Supabase SQL migration for `leads`, private photo storage, RLS, indexes, and `BH-######` lead numbering.
- Shared server-side lead validation.
- `/api/leads` multipart submission endpoint.
- Private photo upload paths generated server-side.
- Cleanup of uploaded photos if persistence fails.
- UTM/referrer/landing-path capture from the browser.
- Real form submission to `/api/leads` with recoverable errors.
- Unit/schema tests.
- Opt-in Supabase integration test.
- Exact setup instructions in `docs/SUPABASE_SETUP.md`.
- CI updated to Node 22.19.0.

Latest locally-provable Build 4 checkpoint: `90de8d6136554a8a376495e9764ec39519da561e`

CI: tests and production Astro build passed. The managed Supabase integration test is intentionally skipped until credentials are supplied in the runtime environment.

## External action required before Build 4 can be certified

A project owner must create/select the Supabase project and run `supabase/migrations/0001_lead_ingestion.sql`, then securely provide the runtime environment with:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_STORAGE_BUCKET=lead-photos`

Do not commit these values.

After the environment is configured, run the opt-in integration test and one real browser submission. Build 4 can then be marked complete and Build 5 may begin.
