# Blue Horizon Pools Lead System — Master Build List

## Purpose

This document is the execution plan for building the Blue Horizon Pools lead-generation MVP in `jenozu/romano-leads`.

The intended workflow is:

**Astro landing page → qualification form → photo upload → lead storage → lead scoring → Romano notification → outcome tracking**

The build should be completed as autonomously as possible by an LLM/development agent. Human intervention should be requested only when a task genuinely requires business judgment, credentials, account ownership, domain/DNS access, external consent, or subjective final approval.

`MASTER_BUILD_LIST.md` is the source of truth for website/tool implementation. `phases.md` remains the broader business/lead-generation roadmap.

---

# Execution Rules for the LLM

Before doing implementation work:

- [ ] Fetch latest `main`.
- [ ] Confirm the worktree is clean.
- [ ] Read `MASTER_BUILD_LIST.md` and `phases.md`.
- [ ] Inspect existing repository files before creating or replacing anything.
- [ ] Do not redo completed work unless a regression or missing requirement is found.
- [ ] Work through the six build phases in order.
- [ ] Do not begin a later phase while a required acceptance criterion in the current phase is failing.
- [ ] Keep the MVP lean. Do not add features simply because they may be useful later.
- [ ] Prefer Astro-native/static solutions and minimal client-side JavaScript.
- [ ] Do not introduce React/Vue/Svelte unless a concrete requirement cannot reasonably be met without it.
- [ ] Never commit credentials, API keys, SMTP passwords, database service-role keys, private URLs, or production secrets.
- [ ] Add environment-variable names to `.env.example`, never values.
- [ ] Add or update tests whenever logic is introduced.
- [ ] Run relevant tests before each phase is marked complete.
- [ ] Run the full available test suite before final certification.
- [ ] Commit completed, tested work in logical checkpoints.
- [ ] Update this checklist as tasks are proven complete.
- [ ] Record external/manual blockers clearly instead of inventing placeholders or silently skipping them.

## Human Intervention Marker

Tasks marked **[HUMAN]** require or may require the owner or Romano.

The LLM should complete everything surrounding the task first, then stop only when the human action is genuinely necessary. The request should include exact steps, exactly what information is needed, and what the LLM will do afterward.

## Definition of MVP

The MVP is complete when a real homeowner can:

1. Open a fast, mobile-friendly pool-closing landing page.
2. Submit contact and pool information.
3. Upload pool photos.
4. Receive validation and a confirmation page.
5. Have the lead stored with its original marketing attribution.
6. Have the lead automatically scored.
7. Trigger a clear notification to Romano for qualified leads.
8. Allow the lead outcome and booked revenue to be recorded.
9. Complete the full workflow without manual copying of customer data between systems.

---

# BUILD 1 — Astro Foundation & Project Structure

## Goal

Create a clean, maintainable Astro project that can support the landing page, lead form, backend integration, tests, analytics, and deployment without unnecessary framework complexity.

## 1.1 Repository Audit

- [ ] Fetch latest `main`.
- [ ] Confirm repository/default branch.
- [ ] Confirm clean worktree.
- [ ] Inventory existing files.
- [ ] Read `phases.md`.
- [ ] Read this file.
- [ ] Preserve any existing useful content.
- [ ] Confirm there are no secrets already committed.

## 1.2 Initialize Astro

- [ ] Initialize Astro in the existing repository without destroying planning docs.
- [ ] Enable TypeScript.
- [ ] Use a current supported Astro release.
- [ ] Keep dependency count minimal.
- [ ] Verify `npm install` succeeds.
- [ ] Verify the local development server launches.
- [ ] Verify a production build succeeds.

## 1.3 Required Project Structure

Create or normalize the project around:

```text
src/
  assets/
  components/
  layouts/
  pages/
  styles/
public/
tests/
astro.config.mjs
package.json
tsconfig.json
.env.example
.gitignore
phases.md
MASTER_BUILD_LIST.md
```

Additional folders should be added only when a real requirement appears.

## 1.4 Baseline Configuration

- [ ] Add standard npm scripts for dev/build/preview/test as appropriate.
- [ ] Add a safe `.gitignore`.
- [ ] Add `.env.example`.
- [ ] Confirm `.env` is ignored.
- [ ] Set site metadata/config in one predictable place where practical.
- [ ] Add a reusable base layout.
- [ ] Add global styles or design tokens.
- [ ] Ensure no default Astro demo content remains.

## 1.5 Quality Baseline

- [ ] Add formatting/linting only if it meaningfully helps maintainability.
- [ ] Add a minimal automated test setup appropriate for the project.
- [ ] Add at least one smoke test proving the app/build is healthy.
- [ ] Verify `npm run build` passes.
- [ ] Verify all tests pass.

## 1.6 Documentation

- [ ] Add/update README with local development instructions.
- [ ] Document required Node version if applicable.
- [ ] Document environment-variable setup.
- [ ] Document that no production credentials belong in git.

## Build 1 Acceptance Criteria

- [ ] Astro app runs locally.
- [ ] Production build passes.
- [ ] Tests pass.
- [ ] No demo content remains.
- [ ] No secrets are committed.
- [ ] Repo structure is ready for UI development.
- [ ] Changes are committed to version control.

## Human Intervention

None expected.

---

# BUILD 2 — Static Landing Page UI

## Goal

Build the complete mobile-first pool-closing landing page in Astro before wiring it to a backend.

The primary conversion goal is:

**Get My Pool Closing Quote**

## 2.1 Business Content Inputs

Use known information where already available. Do not invent unsupported service promises, credentials, warranties, review counts, or pricing.

Required business facts:

- Business name: Blue Horizon Pools
- Phone: 647-640-8253
- Primary campaign: Pool Closing / Winterization
- Current known closing prices:
  - SC-1: $324.99
  - SC-2: $374.99
  - SC-3: $399.99
- Opening + Closing package pricing exists but is not the primary MVP offer.
- Romano determines package fit after seeing the pool/cover.

### [HUMAN] Confirm Before Production Publication

- [ ] Exact business email.
- [ ] Final logo asset.
- [ ] Approved pool photographs.
- [ ] Exact preferred service-area cities.
- [ ] Whether public pricing should show exact values, `starting at`, or no pricing.
- [ ] Whether testimonials/reviews may be used and their approved wording.
- [ ] Exact wording of what is included in a closing.
- [ ] Whether any licensing/insurance claims may be shown publicly.

The LLM should build the page with clearly centralized editable content so these facts can be inserted quickly once confirmed.

## 2.2 Page Architecture

Implement the following sections:

- [ ] Compact/sticky header.
- [ ] Hero.
- [ ] Primary CTA.
- [ ] Trust/value section.
- [ ] What is included in a pool closing.
- [ ] How it works.
- [ ] Pricing/package explanation.
- [ ] Service-area section.
- [ ] Quote-form section placeholder or working front-end form.
- [ ] FAQ.
- [ ] Final CTA.
- [ ] Footer.

## 2.3 Header

- [ ] Blue Horizon Pools branding.
- [ ] Click-to-call phone number.
- [ ] `Get a Quote` anchor/button.
- [ ] Mobile-friendly behavior.
- [ ] Avoid unnecessary navigation clutter.

## 2.4 Hero

- [ ] Clear H1 stating pool closing/winterization service.
- [ ] GTA/local service framing without overstating exact geography.
- [ ] Benefit-driven supporting copy.
- [ ] Strong primary CTA.
- [ ] Click-to-call secondary CTA.
- [ ] Seasonal urgency copy that is truthful and non-deceptive.
- [ ] Optimized hero imagery.

## 2.5 Benefits / Trust

Build 3–4 concise trust/benefit items such as:

- [ ] Professional winterization process.
- [ ] Convenient online quote request.
- [ ] Photo-based review before package confirmation.
- [ ] Local pool service.

Do not fabricate certifications or guarantees.

## 2.6 What Is Included

Build an editable section based on Romano's approved actual service scope. Candidate items from supplied material include:

- pool/equipment preparation;
- water chemistry preparation;
- plumbing-line winterization;
- cover setup;
- system inspection.

- [ ] Keep wording configurable.
- [ ] Do not state work is included unless Romano confirms it.

## 2.7 How It Works

Implement four clear steps:

1. Tell us about the pool.
2. Upload photos.
3. Blue Horizon reviews the setup and confirms the suitable package.
4. Customer is contacted to arrange service.

- [ ] Explain why photos are requested.
- [ ] Make the flow understandable on mobile in seconds.

## 2.8 Pricing / Packages

- [ ] Do not ask customers to self-identify SC-1/SC-2/SC-3.
- [ ] Explain that pool/cover characteristics affect pricing.
- [ ] Show only approved public pricing.
- [ ] Encourage photo submission for package confirmation.

## 2.9 Service Area

- [ ] Build service-area copy/component so cities are data-driven and easy to edit.
- [ ] Add wording for customers outside the primary area.
- [ ] Mention potential travel charges only if Romano approves public disclosure.

## 2.10 FAQ

Candidate questions:

- [ ] How much does pool closing cost?
- [ ] Why do you need photos?
- [ ] How soon should I book?
- [ ] What type of pool covers do you handle?
- [ ] What areas do you service?
- [ ] What happens after I request a quote?

Answers must remain grounded in confirmed business facts.

## 2.11 Responsive Design

- [ ] Mobile-first layout.
- [ ] Good tablet layout.
- [ ] Good desktop layout.
- [ ] Large tap targets.
- [ ] Click-to-call works.
- [ ] Sticky elements do not obscure content.
- [ ] No horizontal overflow.
- [ ] Typography remains readable on small screens.

## 2.12 Accessibility

- [ ] Semantic heading hierarchy.
- [ ] Proper buttons/links.
- [ ] Keyboard navigation.
- [ ] Visible focus states.
- [ ] Sufficient contrast.
- [ ] Meaningful alt text.
- [ ] No critical information only embedded in images.

## 2.13 Performance

- [ ] Prefer Astro/static HTML.
- [ ] Minimize client-side JavaScript.
- [ ] Optimize images.
- [ ] Lazy-load non-critical imagery.
- [ ] Avoid large animation/UI libraries.
- [ ] Target Lighthouse mobile performance >90 where realistic.

## 2.14 Static UI Tests

- [ ] Page renders successfully.
- [ ] All primary links work.
- [ ] Phone link uses correct number.
- [ ] CTA reaches quote form.
- [ ] No broken images.
- [ ] Mobile viewport sanity tests pass.
- [ ] Build succeeds.

## Build 2 Acceptance Criteria

- [ ] Landing page is visually complete.
- [ ] Page is mobile-first and responsive.
- [ ] Primary CTA is obvious.
- [ ] No fabricated claims are present.
- [ ] Accessibility baseline passes.
- [ ] Production build passes.
- [ ] Relevant tests pass.
- [ ] Work is committed.

## Human Intervention

Only the business-content approvals listed in 2.1. The LLM should complete the implementation with centralized placeholders/configuration before stopping for those final facts.

---

# BUILD 3 — Quote Form & Photo Upload UX

## Goal

Create a polished qualification form that gathers enough information for Romano to evaluate a pool-closing lead without overwhelming the homeowner.

The form can initially operate against a mock/local submission handler if the production backend is not yet configured.

## 3.1 Contact Fields

- [ ] Full name.
- [ ] Phone number.
- [ ] Email address.
- [ ] City.
- [ ] Postal code.

## 3.2 Pool Closing Fields

- [ ] Service requested (default/locked to pool closing for this campaign where appropriate).
- [ ] Desired timing.
- [ ] Pool type: in-ground / above-ground / unsure.
- [ ] Cover type: safety / tarp-winter cover / other / unsure.
- [ ] Approximate pool size (optional unless Romano says required).
- [ ] Additional notes.
- [ ] Preferred contact method if useful.

## 3.3 Timing Options

Support clear intent buckets such as:

- ASAP
- Within 7 days
- 1–2 weeks
- 2–4 weeks
- Just researching

- [ ] Keep values normalized for later scoring.

## 3.4 Photo Upload UX

- [ ] Support mobile camera/photo library.
- [ ] Support multiple photos.
- [ ] Provide instructions to include pool, cover, and equipment area when possible.
- [ ] Preview selected photos.
- [ ] Allow removal/replacement before submit.
- [ ] Restrict acceptable file types.
- [ ] Enforce file-size limits.
- [ ] Display clear errors.
- [ ] Avoid uploading before submission unless intentionally designed that way.

## 3.5 Front-End Validation

- [ ] Name required.
- [ ] Phone required and plausibly valid.
- [ ] Email required and valid format.
- [ ] City required.
- [ ] Canadian postal-code validation that is helpful but not unnecessarily brittle.
- [ ] Timeline required.
- [ ] Pool type required.
- [ ] Cover type required or `unsure` permitted.
- [ ] Minimum photo requirement implemented if Romano confirms it is mandatory.
- [ ] Accessible inline error messages.
- [ ] Focus first invalid field after failed submit.

## 3.6 Consent

- [ ] Add explicit contact consent near submit.
- [ ] Explain that Blue Horizon Pools will use submitted information to respond to the quote request.
- [ ] Link to privacy page.
- [ ] Do not add marketing consent unless it is genuinely needed.

## 3.7 Spam Prevention Baseline

- [ ] Honeypot field.
- [ ] Submission timing/basic bot heuristic if reasonable.
- [ ] Architecture ready for rate limiting server-side.
- [ ] Do not add intrusive CAPTCHA unless spam becomes a real issue.

## 3.8 Form State UX

- [ ] Idle state.
- [ ] Submitting state.
- [ ] Prevent accidental duplicate submits.
- [ ] Success path.
- [ ] Recoverable error state.
- [ ] Preserve entered data when a submission fails where feasible.

## 3.9 Thank-You Page

Create `/thank-you`.

- [ ] Confirm request received.
- [ ] Explain next step.
- [ ] Display click-to-call option for urgent needs.
- [ ] Do not promise a response time Romano has not approved.
- [ ] Prepare page for analytics conversion tracking.

## 3.10 Form Tests

Test at least:

- [ ] Fully valid submission.
- [ ] Missing name.
- [ ] Invalid email.
- [ ] Invalid/short phone.
- [ ] Invalid postal code.
- [ ] Missing required pool details.
- [ ] Missing required photo.
- [ ] Oversized file.
- [ ] Unsupported file type.
- [ ] Multiple photos.
- [ ] Duplicate-click prevention.
- [ ] Keyboard-only completion.
- [ ] Mobile viewport completion.

## Build 3 Acceptance Criteria

- [ ] Form is complete and usable on mobile.
- [ ] Validation is clear and accessible.
- [ ] Photo selection works from phone-oriented browsers.
- [ ] Consent is present.
- [ ] Thank-you page exists.
- [ ] Backend integration points are cleanly defined.
- [ ] Tests pass.
- [ ] Production build passes.
- [ ] Work is committed.

## Human Intervention

### [HUMAN]

- [ ] Confirm whether at least one photo is mandatory or merely strongly recommended.
- [ ] Confirm any specific photo angles Romano requires.
- [ ] Approve consent/privacy wording if desired before production launch.

These decisions should not block construction of the form; implement them as configurable rules where practical.

---

# BUILD 4 — Database, Storage & Real Lead Submission

## Goal

Turn the static form into a functioning lead-ingestion system with secure server-side validation, persistent lead records, photo storage, attribution tracking, and a reliable success/failure flow.

## 4.1 Backend Architecture Decision

Preferred lean MVP architecture:

**Astro server endpoint + managed database/storage (Supabase is a reasonable default).**

Before implementation:

- [ ] Confirm whether repository/deployment adapter needs server rendering/serverless support.
- [ ] Choose the simplest production-compatible architecture.
- [ ] Document the decision in README.
- [ ] Avoid introducing a separate backend service unless needed.

### [HUMAN] External Account Creation / Credentials

If a managed provider such as Supabase is selected:

- [ ] Human creates/authorizes the project if the LLM cannot do so through available tools.
- [ ] Human supplies environment variables securely outside git.
- [ ] LLM must never ask for secrets to be pasted into source files or committed.

The LLM should prepare schema/migrations/configuration first whenever possible.

## 4.2 Lead Data Model

Implement an MVP `leads` model with fields equivalent to:

```text
id
lead_number
created_at
updated_at
name
phone
email
city
postal_code
service_type
timeline
pool_type
cover_type
pool_size
notes
preferred_contact_method
lead_source
utm_source
utm_medium
utm_campaign
utm_content
utm_term
referrer
landing_page
lead_score
score_reason
status
sent_to_romano_at
contacted_at
quoted_at
booked_at
completed_at
quote_amount
booked_revenue
lost_reason
consent_to_contact
```

Do not add unnecessary normalization/tables unless a real requirement demands it.

## 4.3 Lead Numbering

- [ ] Generate stable human-readable IDs such as `BH-000001`.
- [ ] Ensure concurrency cannot create duplicate IDs.
- [ ] Do not rely only on client-side generation.

## 4.4 Photo Storage Model

- [ ] Use private or appropriately protected object storage.
- [ ] Associate uploads with lead ID.
- [ ] Use collision-safe filenames.
- [ ] Validate MIME type server-side.
- [ ] Validate size server-side.
- [ ] Reject executable/unsupported content.
- [ ] Do not expose bucket listing.
- [ ] Define retention/deletion behavior for failed submissions.
- [ ] Store photo references with the lead.

Suggested logical organization:

```text
leads/BH-000001/<unique-file-name>.jpg
```

## 4.5 Server-Side Submission Validation

Server must independently validate all client data.

- [ ] Required contact fields.
- [ ] Phone normalization.
- [ ] Email normalization.
- [ ] Postal code normalization.
- [ ] Enum/allowed-value validation.
- [ ] Notes length limit.
- [ ] Photo count limit.
- [ ] File type limit.
- [ ] File size limit.
- [ ] Honeypot/spam field.
- [ ] Rate limiting or equivalent abuse protection where supported.

## 4.6 Atomic/Recoverable Submission Behavior

Design the workflow so partial failures do not create confusing orphaned records.

- [ ] Define order of lead record vs file upload.
- [ ] Clean up orphaned files when feasible.
- [ ] Return structured safe errors to the client.
- [ ] Log server errors without logging unnecessary personal data.
- [ ] Do not expose internal stack traces to customers.

## 4.7 Attribution Tracking

Capture and persist where available:

- [ ] `utm_source`
- [ ] `utm_medium`
- [ ] `utm_campaign`
- [ ] `utm_content`
- [ ] `utm_term`
- [ ] referrer
- [ ] landing-page path

- [ ] Preserve attribution across form interaction where needed.
- [ ] Never overwrite known campaign values with empty values.

## 4.8 Status Model

Initial statuses should support the funnel:

- NEW
- CONTACTED
- QUALIFIED
- QUOTED
- BOOKED
- COMPLETED
- LOST
- REJECTED

- [ ] Centralize enum/status definitions.
- [ ] Prevent arbitrary invalid values.

## 4.9 Privacy Page

Create `/privacy` with an MVP privacy notice covering:

- data collected;
- purpose of collection;
- quote/service-contact use;
- photo handling;
- who receives lead data;
- retention/deletion/contact route.

### [HUMAN]

- [ ] Business owner reviews final policy before production use.

## 4.10 Integration Tests

Test at least:

- [ ] Valid lead persists.
- [ ] Lead ID generated.
- [ ] Photos persist.
- [ ] Photo references map to correct lead.
- [ ] Invalid input does not persist.
- [ ] Invalid files do not persist.
- [ ] Attribution persists.
- [ ] Consent persists.
- [ ] Repeat requests do not corrupt data.
- [ ] Failure path returns usable UI message.

## Build 4 Acceptance Criteria

- [ ] Real form submission reaches server.
- [ ] Server validates independently.
- [ ] Lead persists.
- [ ] Photos persist securely.
- [ ] UTM/referrer attribution persists.
- [ ] Thank-you flow occurs only after successful submission.
- [ ] Error flow is recoverable.
- [ ] Privacy page exists.
- [ ] Tests pass.
- [ ] Production build passes.
- [ ] Work is committed.

## Human Intervention

Only managed-service account ownership, secret provisioning, and final privacy review should require a person.

---

# BUILD 5 — Lead Scoring, Romano Notification & Outcome Tracking

## Goal

Automatically identify high-value leads, send Romano a clean actionable notification, and provide the minimum mechanism needed to track what happened to each lead.

## 5.1 Lead Scoring Rules

Implement deterministic scoring first. Do not use AI for the MVP.

Suggested lead grades:

### HOT

Candidate conditions:

- valid supported service;
- within approved service area;
- wants service within 7 days or ASAP;
- valid contact details;
- required photos supplied;
- consent to contact.

### A

- qualified supported lead;
- service needed within approximately 8–21 days;
- adequate information/photos supplied.

### B

- legitimate future lead with lower urgency.

### C

- research/low-intent/incomplete but not spam.

### REJECTED

- clearly outside accepted geography;
- unsupported service;
- invalid/fraud/spam;
- insufficient required data after validation rules.

## 5.2 Scoring Implementation

- [ ] Put scoring logic in a testable standalone module.
- [ ] Store `lead_score`.
- [ ] Store human-readable `score_reason`.
- [ ] Keep service-area logic configuration-driven.
- [ ] Keep timing buckets configuration-driven.
- [ ] Avoid hidden magic values.
- [ ] Allow scoring rules to evolve without database migration where practical.

### [HUMAN]

- [ ] Romano/owner confirms exact preferred service-area cities and exclusions.
- [ ] Romano confirms what qualifies as an urgent/hot lead.
- [ ] Romano confirms whether incomplete-photo leads should be held, downgraded, or sent anyway.

The LLM should implement a configuration layer and tests before asking for final values.

## 5.3 Romano Notification Channel

Start with one reliable channel, preferably email unless another existing channel is clearly easier.

Notification should contain:

- lead ID;
- customer name;
- phone;
- email if useful;
- city;
- requested service;
- timing;
- pool type;
- cover type;
- notes;
- lead grade;
- score reason;
- secure way to view photos.

Example subject:

`HOT Pool Closing Lead — BH-000014 — Oakville`

## 5.4 Notification Reliability

- [ ] Send notification only after lead persistence succeeds.
- [ ] Record `sent_to_romano_at` on success.
- [ ] Handle notification failure without deleting the lead.
- [ ] Log failure safely.
- [ ] Add retry/manual-resend mechanism if simple.
- [ ] Do not repeatedly notify on page refresh.
- [ ] Ensure duplicate submissions do not cause accidental notification storms.

### [HUMAN] Email/SMS Account Configuration

If external SMTP/email/SMS credentials or domain verification are required:

- [ ] Human authorizes/provisions account.
- [ ] Human adds secrets securely to deployment environment.
- [ ] LLM verifies delivery afterward.

## 5.5 Outcome Tracking MVP

Do not build a full CRM dashboard unless it is necessary.

Implement the smallest reliable way to record:

- contacted;
- no answer;
- quoted;
- booked;
- completed;
- lost;
- rejected;
- quote amount;
- booked revenue;
- lost reason.

Acceptable MVP approaches, in preference order depending on current architecture:

1. simple protected internal admin page;
2. secure admin endpoint/form;
3. managed database UI used temporarily during pilot.

If a custom admin page can be built cheaply and securely, prefer it. Do not let a dashboard delay launch.

## 5.6 Outcome Fields

- [ ] `status`
- [ ] `contacted_at`
- [ ] `quoted_at`
- [ ] `booked_at`
- [ ] `completed_at`
- [ ] `quote_amount`
- [ ] `booked_revenue`
- [ ] `lost_reason`

## 5.7 Lost Reasons

Normalize common reasons such as:

- price;
- timing;
- competitor;
- customer changed mind;
- no response;
- outside service area;
- unsupported job;
- bad lead;
- other.

## 5.8 Scoring Tests

Test examples including:

- [ ] inside area + ASAP + photos → HOT.
- [ ] inside area + 1–2 weeks + photos → expected A/HOT according to approved rules.
- [ ] inside area + 2–4 weeks → B or approved grade.
- [ ] research-only → C.
- [ ] outside area → rejected/downgraded according to approved rules.
- [ ] missing photo behavior.
- [ ] unknown cover type does not falsely reject a good lead.

## 5.9 Notification Tests

- [ ] Qualified lead triggers expected notification.
- [ ] Lower-grade lead follows configured notification behavior.
- [ ] Rejected lead does not alert Romano unless configured.
- [ ] Notification contains correct lead data.
- [ ] Photo links work and are not publicly enumerable.
- [ ] Failure leaves lead safely stored.

## Build 5 Acceptance Criteria

- [ ] Leads are scored automatically.
- [ ] Score reason is visible/auditable.
- [ ] Qualified leads notify Romano.
- [ ] Romano can view photos.
- [ ] Notification failures do not lose leads.
- [ ] Outcomes can be recorded.
- [ ] Booked revenue can be recorded.
- [ ] Tests pass.
- [ ] Production build passes.
- [ ] Work is committed.

## Human Intervention

Only final qualification preferences, notification-account authorization, and any subjective workflow preference should require a person.

---

# BUILD 6 — Analytics, Deployment, End-to-End Certification & Launch Readiness

## Goal

Deploy the complete system, verify it on real mobile devices/browsers, confirm attribution and notifications, and certify the MVP before paid traffic is sent to it.

## 6.1 Analytics Event Model

Track at minimum:

- [ ] page view;
- [ ] primary CTA click;
- [ ] click-to-call;
- [ ] form start;
- [ ] photo added;
- [ ] form submission success;
- [ ] form submission failure;
- [ ] thank-you page/conversion.

Do not collect sensitive form contents in analytics tools.

## 6.2 Analytics Provider

Choose a lean provider compatible with deployment and future ads.

Potential options include Google Analytics or another privacy-conscious analytics service.

### [HUMAN]

- [ ] Human authorizes/creates analytics property if required.
- [ ] Human provides measurement ID through deployment environment/configuration.

## 6.3 Ad Attribution Readiness

- [ ] UTM values survive from landing to submission.
- [ ] Conversion event fires only on successful submission.
- [ ] `/thank-you` can be used for advertising-platform conversion verification.
- [ ] Avoid duplicate conversion firing on refresh where feasible.
- [ ] Document standard campaign naming convention.

Suggested initial convention:

```text
utm_source=facebook
utm_medium=paid_social
utm_campaign=pool_closing_2026
utm_content=<creative-name>
```

## 6.4 SEO / Social Metadata

- [ ] Production title.
- [ ] Meta description.
- [ ] Canonical URL.
- [ ] Open Graph metadata.
- [ ] Favicon.
- [ ] Sitemap if appropriate.
- [ ] Robots configuration.
- [ ] Local business structured data only when facts are confirmed.
- [ ] No fabricated address/hours/reviews.

## 6.5 Production Deployment

Select the simplest viable deployment for Astro + backend requirements.

Possible paths:

- managed deployment platform;
- existing Hostinger VPS if justified.

Prefer fast, low-maintenance deployment for the pilot.

- [ ] Configure production adapter/runtime.
- [ ] Configure environment variables.
- [ ] Configure build command.
- [ ] Configure production domain or temporary deployment URL.
- [ ] Verify HTTPS.
- [ ] Verify server endpoints in production.
- [ ] Verify storage/database connectivity.
- [ ] Verify logs do not expose secrets.

### [HUMAN] Domain / DNS / External Accounts

Human intervention may be required to:

- [ ] authorize hosting account;
- [ ] connect domain;
- [ ] update DNS;
- [ ] add deployment secrets;
- [ ] approve third-party app permissions.

The LLM should provide exact DNS records or settings when this point is reached.

## 6.6 Production Security Review

- [ ] No secrets in repo/history introduced by this build.
- [ ] Server-side validation active.
- [ ] Rate limiting/abuse mitigation active where practical.
- [ ] File-type/size validation active.
- [ ] Storage is not casually public.
- [ ] Admin/outcome mechanism is protected.
- [ ] Customer-facing errors do not leak stack traces.
- [ ] Privacy page linked.
- [ ] Consent recorded.

## 6.7 Performance Certification

Test production page, especially mobile:

- [ ] Fast initial load.
- [ ] Optimized hero image.
- [ ] Lazy-loading below fold.
- [ ] No excessive JavaScript.
- [ ] No layout shifts that harm usability.
- [ ] Lighthouse/mobile performance target >90 where practical.
- [ ] Accessibility score reviewed.

## 6.8 Browser / Device QA

At minimum test:

- [ ] current Chrome desktop;
- [ ] current Edge desktop;
- [ ] iPhone Safari or closest available real-device test;
- [ ] Android Chrome or closest available real-device test;
- [ ] small mobile viewport;
- [ ] tablet viewport;
- [ ] desktop viewport.

Focus especially on:

- [ ] click-to-call;
- [ ] photo upload from camera/photo library;
- [ ] keyboard interaction;
- [ ] validation messages;
- [ ] submit loading state;
- [ ] thank-you flow.

### [HUMAN]

- [ ] User performs subjective visual review of finished site.
- [ ] User tests at least one real phone submission if the LLM cannot access a physical mobile device.
- [ ] Romano confirms notification is received and understandable.

## 6.9 End-to-End Test Matrix

Run production-like tests for:

### Valid leads

- [ ] HOT/urgent lead.
- [ ] A-grade lead.
- [ ] B/future lead.
- [ ] Research/low-intent lead.

### Invalid/edge leads

- [ ] Invalid email.
- [ ] Invalid phone.
- [ ] Invalid postal code.
- [ ] Missing required field.
- [ ] Missing required photo.
- [ ] Oversized photo.
- [ ] Unsupported upload type.
- [ ] Outside-service-area lead.
- [ ] Duplicate submission attempt.
- [ ] Bot/honeypot submission.

### Workflow

For a successful test lead verify:

- [ ] form accepts it;
- [ ] lead ID assigned;
- [ ] database record created;
- [ ] photos stored;
- [ ] UTM attribution stored;
- [ ] score correct;
- [ ] score reason correct;
- [ ] Romano notification sent;
- [ ] photos accessible to Romano;
- [ ] thank-you page shown;
- [ ] analytics conversion recorded;
- [ ] outcome can be changed to QUOTED;
- [ ] quote amount can be recorded;
- [ ] outcome can be changed to BOOKED;
- [ ] booked revenue can be recorded.

## 6.10 Final Automated Test Run

- [ ] Run lint/format checks if configured.
- [ ] Run unit tests.
- [ ] Run integration tests.
- [ ] Run E2E/browser tests if configured.
- [ ] Run production build.
- [ ] Confirm no failed checks.
- [ ] Confirm worktree clean after final commit.

## 6.11 Launch Readiness Review

Before any paid campaign:

- [ ] Business contact information confirmed.
- [ ] Service-area rules confirmed.
- [ ] Pricing wording approved.
- [ ] Service-scope wording approved.
- [ ] Privacy notice reviewed.
- [ ] Romano receives lead alerts.
- [ ] Romano knows how to report outcomes.
- [ ] Test lead removed/marked as test.
- [ ] Analytics working.
- [ ] Domain/HTTPS working.
- [ ] Real mobile submission completed.

## Build 6 Acceptance Criteria

The system is certified complete only when:

- [ ] Production deployment is reachable over HTTPS.
- [ ] Customer can submit from a mobile device.
- [ ] Photos upload successfully.
- [ ] Lead persists correctly.
- [ ] Attribution persists.
- [ ] Scoring works.
- [ ] Romano receives qualified lead notification.
- [ ] Romano can view photos.
- [ ] Outcome/revenue can be recorded.
- [ ] Analytics conversion works.
- [ ] Full automated test suite passes.
- [ ] Production build passes.
- [ ] User completes final visual/functional acceptance test.
- [ ] Final tested commit is pushed to `main`.

---

# Human Intervention Register

The LLM should not repeatedly ask for information early if work can continue around it. Consolidate human requests at the point they become blocking.

Likely human-only actions are:

1. **Business approval**
   - logo/photos;
   - service-area cities;
   - exact public pricing wording;
   - exact service-scope wording;
   - testimonials/reviews;
   - business email;
   - any licensing/insurance claims.

2. **Romano qualification rules**
   - preferred territory/exclusions;
   - hot-lead criteria;
   - required photo angles;
   - whether photos are mandatory;
   - acceptable response/booking expectations.

3. **External account ownership**
   - database/storage project authorization;
   - email/SMS provider authorization;
   - analytics property authorization;
   - hosting authorization;
   - domain/DNS changes.

4. **Secrets**
   - API keys and credentials must be added by the human to the secure runtime/deployment environment when the LLM cannot do so directly.
   - Secrets must never be committed or pasted into project documentation.

5. **Final acceptance**
   - subjective design approval;
   - real-device test where unavailable to the LLM;
   - Romano confirms notification format and delivery.

---

# Explicitly Out of Scope for This MVP

Do not build these unless this master list is intentionally revised:

- hot-tub lead generation;
- spring pool-opening campaign;
- full maintenance campaign;
- customer login/accounts;
- online payment collection;
- advanced scheduling/calendar booking;
- AI chatbot;
- AI lead qualification;
- complex CRM dashboard;
- multi-contractor lead marketplace;
- native mobile app;
- WordPress;
- broad SEO content/blog system;
- elaborate marketing automation;
- paid-ad campaign management itself.

The architecture may leave room for these later, but they must not delay this MVP.

---

# Final Success Metric

The build is successful when the following can happen with no manual data transcription:

> A homeowner clicks a Blue Horizon Pools pool-closing landing page, completes the quote form on their phone, uploads pool photos, submits successfully, receives confirmation, and the system stores and scores the lead while notifying Romano with everything he needs to follow up. Romano can then record whether the lead was contacted, quoted, booked, completed, or lost, including the revenue generated.

Once this is proven with real submissions, the system is ready for a small pool-closing acquisition pilot.