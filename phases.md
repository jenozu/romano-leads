# Romano Leads — Pool Lead Generation System

## Project Goal

Build a lean, trackable lead-generation system for Blue Horizon Pools that turns homeowner traffic into qualified pool-service opportunities, routes strong leads to Romano quickly, and tracks each lead through quote, booking, completion, and revenue.

The initial MVP is intentionally narrow. Start with pool services only and prove the workflow before adding more services, channels, or automation.

## Core Funnel

**Traffic → Lead Form → Qualification → Photo Upload → Lead Score → Romano → Quote → Booked Job → Revenue Tracking**

## Source of Truth

This file is the implementation checklist and project source of truth. Complete phases in order unless a dependency requires otherwise. Do not expand scope until the current MVP is working end-to-end.

---

# Phase 1 — Define the MVP and Buyer Profile

**Status:** ⬜ Not started

## Objective

Define exactly what Romano wants, what counts as a qualified lead, what areas he serves, what jobs he wants, and what information he needs before a lead is sent to him.

## Initial MVP Services

- Pool closing
- Pool maintenance
- Pool repair / service call

Pool opening can be added later as a seasonal expansion.

## Buyer Profile Questions

- [ ] Confirm cities Romano definitely wants leads from
- [ ] Confirm cities to exclude
- [ ] Confirm maximum distance before a travel surcharge applies
- [ ] Confirm which pool services he most wants more customers for
- [ ] Confirm services he does not want leads for
- [ ] Confirm minimum job value worth travelling for
- [ ] Confirm weekly new-job capacity
- [ ] Confirm required information before estimating a pool closing
- [ ] Confirm exact customer photos needed
- [ ] Confirm job rejection criteria
- [ ] Confirm which pool/equipment repair problems he handles
- [ ] Confirm which repair problems he does not handle
- [ ] Confirm normal lead-response time
- [ ] Confirm working days/hours
- [ ] Confirm whether same-day/emergency jobs are wanted
- [ ] Confirm approved pricing language before Romano has reviewed photos

## Known Requirements

- Romano commonly needs a photo of the pool to determine the correct closing category.
- Pool closing packages vary by pool/cover type and size.
- Service calls start at $145 for the first hour, then $65/hour afterward.
- Emergency work may carry an additional charge.
- Maintenance includes basic and full-service options.

## Completion Criteria

- [ ] Buyer profile documented
- [ ] Service-area rules documented
- [ ] Accepted and rejected service types documented
- [ ] Required lead fields documented
- [ ] Romano approves the qualification criteria

---

# Phase 2 — Build the Customer Intake Form

**Status:** ⬜ Not started

## Objective

Create one responsive intake form that gathers enough information to qualify and route a lead without forcing Romano to chase basic details.

## Shared Contact Fields

- [ ] Full name
- [ ] Phone
- [ ] Email
- [ ] City
- [ ] Postal code
- [ ] Service requested
- [ ] Preferred contact method
- [ ] Consent to be contacted

## Service Selector

Options:

- [ ] Pool Closing
- [ ] Pool Maintenance
- [ ] Pool Repair / Service
- [ ] Not Sure

The form should display conditional questions based on the selected service.

## Pool Closing Fields

- [ ] Desired closing timing: ASAP / within 7 days / 1–2 weeks / 2–4 weeks / researching
- [ ] Pool type: in-ground / above-ground / unsure
- [ ] Cover type: safety / tarp-winter cover / other / unsure
- [ ] Approximate pool size if known
- [ ] Upload 2–4 pool photos
- [ ] Request photo showing the full pool
- [ ] Request photo showing the cover if applicable
- [ ] Request photo showing the equipment area
- [ ] Notes / special circumstances

## Pool Maintenance Fields

- [ ] Currently self-maintained?
- [ ] Existing pool company?
- [ ] Desired frequency: weekly / every two weeks / one-time / unsure
- [ ] Cleaning needed?
- [ ] Filter/backwash service needed?
- [ ] Equipment inspection needed?
- [ ] Water-level adjustment needed?
- [ ] Salt-cell inspection/cleaning needed?
- [ ] Other notes

## Pool Repair / Service Fields

- [ ] Problem category: pump / filter / heater / leak / water issue / unusual noise / circulation / other
- [ ] Free-text problem description
- [ ] When the issue started
- [ ] Urgency / same-day need
- [ ] Photo upload
- [ ] Optional video upload if supported later

## Validation Requirements

- [ ] Required fields enforced
- [ ] Valid phone/email format checks
- [ ] File type and size validation
- [ ] Clear privacy/consent wording
- [ ] Form works on mobile

## Completion Criteria

- [ ] All three service flows work
- [ ] Conditional questions work
- [ ] Photos can be submitted successfully
- [ ] Test submissions persist correctly
- [ ] Romano confirms the intake captures enough information

---

# Phase 3 — Implement Lead Scoring and Qualification

**Status:** ⬜ Not started

## Objective

Automatically classify incoming leads so Romano only gets interrupted for useful opportunities.

## Lead Grades

### HOT

A HOT lead should generally meet all of the following:

- Inside accepted service area
- Requests a service Romano performs
- Valid contact details
- Required photos supplied
- Wants service ASAP or within 7 days
- Explicitly wants contact / quote

HOT leads should be routed immediately.

### A — Qualified

- Real homeowner/customer
- Valid service
- In territory
- Required details/photos supplied
- Timeline generally within 1–3 weeks

### B — Nurture

- Legitimate prospect
- Relevant service
- Timing further out or uncertain
- Worth following up later

### C — Low Intent

- Researching only
- No clear timeline
- Missing supporting information
- Not yet requesting direct contact

### REJECTED

- Outside service area
- Fake or unusable contact information
- Requests unsupported service
- Duplicate/spam
- Otherwise fails Romano's buyer rules

## Rules Engine

- [ ] Geography validation
- [ ] Service validation
- [ ] Timeline weighting
- [ ] Photo-completeness check
- [ ] Contact-detail validation
- [ ] Consent check
- [ ] Duplicate detection
- [ ] Human override for lead score
- [ ] Store score rationale

## Completion Criteria

- [ ] Test cases exist for each grade
- [ ] HOT/A/B/C/REJECTED classification is deterministic
- [ ] Manual score override works
- [ ] Score rationale is visible in the CRM

---

# Phase 4 — Build the CRM / Lead Database

**Status:** ⬜ Not started

## Objective

Store every lead and its complete lifecycle in one place.

## Minimum Lead Fields

- [ ] Lead ID, e.g. `BH-0001`
- [ ] Created date/time
- [ ] Name
- [ ] Phone
- [ ] Email
- [ ] City
- [ ] Postal code
- [ ] Requested service
- [ ] Timeline
- [ ] Pool type
- [ ] Cover type
- [ ] Uploaded photos
- [ ] Customer notes
- [ ] Lead source
- [ ] Campaign/ad identifier
- [ ] Lead score
- [ ] Score rationale
- [ ] Sent to Romano status/date
- [ ] Contacted status/date
- [ ] Quote status/date
- [ ] Quote amount
- [ ] Booking status/date
- [ ] Completed status/date
- [ ] Final revenue
- [ ] Lost reason

## Lead Lifecycle

**NEW → CONTACTED → QUALIFIED → PHOTOS RECEIVED → SENT TO ROMANO → QUOTED → BOOKED → COMPLETED**

Alternate terminal states:

- LOST
- REJECTED
- NURTURE

## Completion Criteria

- [ ] Lead records can be created/read/updated
- [ ] Photos remain associated with the correct lead
- [ ] Lead-status history is preserved
- [ ] Filters exist for HOT/A/B/C leads
- [ ] Filters exist for service, city, source, and outcome

---

# Phase 5 — Build Romano Lead Delivery

**Status:** ⬜ Not started

## Objective

Send Romano a concise, useful lead card as soon as a qualified or urgent lead is ready.

## Lead Card Format

Example:

```text
🔥 NEW POOL LEAD — BH-0014

Customer: Sarah M.
Phone: 647-XXX-XXXX
City: Oakville
Service: Pool Closing
Timing: Within 7 days
Pool: In-ground
Cover: Safety cover
Photos: 3 attached
Customer note: Looking to close before vacation next Thursday.
Lead Grade: HOT
Requested: Quote / callback
```

## Delivery Requirements

- [ ] HOT leads notify Romano immediately
- [ ] A leads are delivered promptly
- [ ] B leads remain in nurture unless manually sent
- [ ] Rejected/C leads do not interrupt Romano
- [ ] Include lead ID on every notification
- [ ] Include direct contact info
- [ ] Include service/timeline/score
- [ ] Include photos or secure photo links
- [ ] Log delivery timestamp
- [ ] Prevent accidental duplicate delivery

## Initial Delivery Method

Keep the MVP simple. Start with one reliable notification method. Add multiple channels later only if needed.

## Completion Criteria

- [ ] Test HOT lead reaches Romano correctly
- [ ] Test A lead reaches Romano correctly
- [ ] Notification includes all required information
- [ ] Delivery event is recorded in CRM

---

# Phase 6 — Add Follow-Up and Nurture Automation

**Status:** ⬜ Not started

## Objective

Recover leads that are not immediately ready and reduce wasted ad spend.

## Immediate Confirmation

After submission, send a confirmation similar to:

> Thanks! We've received your pool-service request. A member of the Blue Horizon Pools team will review your information and contact you shortly.

## Follow-Up Cases

- [ ] Romano cannot reach the customer
- [ ] Customer requested service several weeks in the future
- [ ] Customer started but did not finish required information
- [ ] Missing photos
- [ ] Customer is researching and should be contacted closer to the season/date

## Nurture Rules

- [ ] Store next follow-up date
- [ ] Allow automatic reminder scheduling
- [ ] Allow manual pause/cancel
- [ ] Stop nurture when booked/rejected/lost
- [ ] Prevent duplicate messages

## Completion Criteria

- [ ] Confirmation works
- [ ] At least one scheduled follow-up workflow works
- [ ] Nurture stops correctly when status changes
- [ ] Follow-up activity is visible in CRM

---

# Phase 7 — Build Romano Feedback / Outcome Tracking

**Status:** ⬜ Not started

## Objective

Make it extremely easy for Romano to report what happened so the system can measure real business results rather than vanity lead counts.

## Required Outcomes

- [ ] CONTACTED
- [ ] NO ANSWER
- [ ] QUOTED
- [ ] BOOKED
- [ ] COMPLETED
- [ ] LOST

## Lost Reasons

- [ ] Price
- [ ] Timing
- [ ] Competitor
- [ ] Outside service area
- [ ] Bad/unqualified lead
- [ ] Customer changed mind
- [ ] Unable to reach
- [ ] Other

## Revenue Fields

When quoted/booked/completed:

- [ ] Quote amount
- [ ] Final booked amount
- [ ] Final completed revenue

## UX Requirement

Romano should be able to update the outcome in seconds. Avoid forcing him to use a complicated CRM interface if a simpler workflow can update the same database.

## Completion Criteria

- [ ] Romano can update lead outcome quickly
- [ ] Outcome is tied to lead ID
- [ ] Lost reason is captured
- [ ] Quote/booked/completed revenue can be recorded

---

# Phase 8 — Analytics Dashboard

**Status:** ⬜ Not started

## Objective

Measure whether the lead-generation system produces profitable jobs.

## Marketing Metrics

- [ ] Ad spend
- [ ] Total inquiries
- [ ] Cost per inquiry

## Qualification Metrics

- [ ] Qualified leads
- [ ] Qualification rate
- [ ] Cost per qualified lead

## Sales Metrics

- [ ] Leads contacted
- [ ] Quotes issued
- [ ] Bookings
- [ ] Quote rate
- [ ] Booking/close rate

## Financial Metrics

- [ ] Quoted revenue
- [ ] Booked revenue
- [ ] Completed revenue
- [ ] Customer acquisition cost
- [ ] Revenue / ad spend
- [ ] Revenue per qualified lead

## Breakdown Dimensions

- [ ] Service type
- [ ] City
- [ ] Lead source
- [ ] Campaign
- [ ] Ad / creative
- [ ] Lead grade
- [ ] Date range

## Completion Criteria

- [ ] Dashboard values reconcile with CRM records
- [ ] Cost-per-lead calculations work
- [ ] Booking and revenue metrics work
- [ ] Campaign/source breakdown works

---

# Phase 9 — Launch the First Paid Acquisition Campaign

**Status:** ⬜ Not started

## Objective

Launch one narrow acquisition campaign only after the entire lead workflow works manually and end-to-end.

## Initial Campaign

**Pool Closing**

Suggested offer direction:

> Need Your Pool Closed for Winter?
>
> Professional winterization. Protect your pool and equipment from freeze damage. Upload photos for a quote and book before seasonal availability fills.

Primary CTA:

**Get My Pool Closing Quote**

## Pre-Launch Requirements

- [ ] Landing page live
- [ ] Form tested on mobile and desktop
- [ ] Photo upload tested
- [ ] Lead scoring tested
- [ ] CRM tested
- [ ] Romano notification tested
- [ ] Feedback/outcome workflow tested
- [ ] Analytics tracking tested
- [ ] Privacy/contact consent present
- [ ] Romano has agreed to respond promptly to HOT leads

## Campaign Discipline

Start with one offer, a controlled geography, and a small test budget. Do not expand territory or launch multiple service campaigns until there is enough data to evaluate performance.

## Completion Criteria

- [ ] First paid traffic reaches landing page
- [ ] First real lead enters CRM
- [ ] First qualified lead reaches Romano
- [ ] First quote outcome is recorded
- [ ] First booked job/revenue is attributable to its source

---

# Phase 10 — Optimize and Expand

**Status:** ⬜ Not started

## Objective

Use real conversion and revenue data to improve the system before adding complexity.

## Optimization Work

- [ ] Review lead quality by source
- [ ] Review qualification rate
- [ ] Review cost per qualified lead
- [ ] Review Romano response speed
- [ ] Review quote rate
- [ ] Review close rate
- [ ] Review lost reasons
- [ ] Review revenue by city/service/campaign
- [ ] Improve form questions based on bad leads
- [ ] Improve scoring rules based on actual outcomes
- [ ] Improve ads based on booked revenue, not clicks alone

## Expansion Order

After pool closing is proven:

1. Pool repair / service
2. Pool maintenance
3. Spring pool opening
4. Retargeting
5. Seasonal customer reactivation

## Long-Term Lifecycle

A customer acquired for a pool closing can later be marketed:

**Closing → Spring Opening → Maintenance → Repair/Service → Next Closing**

The long-term goal is to build a repeatable customer-acquisition asset rather than repeatedly starting from zero each season.

## Completion Criteria

- [ ] Pool-closing campaign has enough real outcome data to evaluate
- [ ] Changes are driven by booked/completed revenue data
- [ ] Expansion only begins after the initial funnel is stable

---

# MVP Definition of Done

The first MVP is complete when a real homeowner can:

1. Reach the landing page
2. Submit a pool-closing request
3. Upload required photos
4. Be automatically qualified/scored
5. Be stored in the CRM
6. Trigger a useful lead notification to Romano
7. Be contacted and quoted by Romano
8. Have the quote/booking outcome recorded
9. Have booked/completed revenue attributed back to the original lead source

At that point, the system is ready for controlled paid-traffic testing and optimization.

---

# Build Principle

**Do not overbuild.**

The MVP does not need AI agents, a native mobile app, a large website, or dozens of automations. Build the smallest reliable system that proves:

> Traffic can become qualified pool leads, qualified pool leads can become booked jobs, and booked jobs can be traced back to acquisition cost and source.
