# UAT Plan: General public role

**Feature**: 001-bilingual-landing-page · **Build under test**: branch `001-bilingual-landing-page`,
commit `29e0522` and later fixes · **Date**: 2026-10-29

## Purpose

Confirm, before the organization signs off, that members of the general public can use both
language versions of the site for what they come for: understanding who We Can is, checking who is
behind it, getting in touch, reading in Arabic, moving around on any device, and finding or
sharing the site. UAT passes when no critical or major defect is open in either language (SC-010).

## Role and personas

The General public is the only user role in this release (spec, User Scenarios). Four personas
cover what its members come for:

| Persona | Who | Typical device and language | Comes to |
|---------|-----|-----------------------------|----------|
| P1 Opportunity seeker | A young woman in Irbid looking for programmes and support | Phone (390 px), Arabic first | Understand what We Can offers and how to reach it |
| P2 Partner or funder | A programme officer at a foundation or embassy | Laptop or large monitor (1280 / 1440 px), English | Check credibility: registration, founders, mission; find the email |
| P3 Journalist | A reporter preparing a story on women's organizations | Tablet (768 px), both languages | Get exact names, titles and the Arabic name; quote the vision; contact |
| P4 Visitor from search or a shared link | Someone who searched for the organization or opened a link in WhatsApp | Any device, either language | Recognise the result or preview, land on the right page or section, switch language |

Keyboard-only use, screen readers, scripts switched off and browser zoom are checked inside the
scripts for every persona, because members of the public may rely on them.

## Scope

**In scope**: all six user stories in both languages, and the requirements a visitor can observe
(FR-001 to FR-033), including SC-002 (any section within 2 taps), SC-003 (both languages complete),
SC-004 (no horizontal scrolling), SC-007 (download size) and SC-009 (email link).

**Covered elsewhere** (listed in the summary for the organization):

- SC-001 hallway test with at least 5 first-time visitors (the organization runs it).
- SC-005 and SC-006 Lighthouse scores (T062) and the W3C HTML check (T061).
- SC-008 link previews in a public checker, WhatsApp and Facebook (possible only after launch).
- Real-device spot checks (iPhone Safari, Android Chrome, Firefox), including the email app
  opening (SC-009 on devices).

## Environment

| Item | Value |
|------|-------|
| Site | Local preview of the feature branch: `http://localhost:5500/` and `http://localhost:5500/ar/` |
| Browser | Claude desktop app's built-in browser (Chromium), shown on screen while testing |
| Widths | 390 × 844 (phone), 768 × 1024 (tablet), 1280 × 800 (small laptop), 1440 × 900 (large desktop) |
| Languages | English and Arabic, every script at every width |
| Helpers | `tools/uat-harness.js` (reads the page and reports what a visitor would see), real mouse and keyboard input for clicks, Tab, Shift+Tab and Escape |

## Entry criteria

- Tasks T001 to T064 are complete, except T061 and T062, which wait for the organization.
- `node tools/check-site.mjs` reports "All checks passed".
- The preview server serves both pages without errors in the browser console.

## Exit criteria

- Every script in [uat-scripts.md](uat-scripts.md) has been run in both languages at all four
  widths, with the result and evidence recorded in [uat-results.md](uat-results.md).
- No critical or major defect is open; minor defects are listed with an owner.
- [uat-summary.md](uat-summary.md) is written for the organization's sign-off.

## Severity levels

| Severity | Meaning | Examples |
|----------|---------|----------|
| Critical | A persona cannot reach their goal, or the site states something wrong about the organization or its founders | Wrong founder title; Arabic page missing a section; email link broken |
| Major | The goal is reachable only with real difficulty, or a WCAG 2.2 AA failure, or broken layout at a tested width | Menu traps focus; text unreadable over a photo; horizontal scrolling |
| Minor | Cosmetic or wording issue that does not block anyone | Uneven spacing; awkward but correct Arabic phrasing (draft text) |
| Suggestion | An improvement idea outside the approved scope | A new section for programmes |

## Defect log format

Defects are logged in [uat-results.md](uat-results.md) with these fields:

| Field | Content |
|-------|---------|
| ID | `D-01`, `D-02`, … |
| Script and step | For example `UAT-09 step 3` |
| Language and width | For example `ar, 390 px` |
| Severity | Critical, Major, Minor or Suggestion |
| Expected / actual | What the script expects and what happened |
| Evidence | Measured values, element, or screenshot description |
| Status | Open, Fixed (with commit), Retested, or Deferred (with reason and owner) |

## Responsibilities

| Who | Does |
|-----|------|
| Project team (Claude) | Runs every script, logs and fixes defects, retests, writes the results and summary |
| Organization's site coordinator | Reviews the results, runs the hallway test and device spot checks, signs off |
