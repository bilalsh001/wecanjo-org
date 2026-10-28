# UAT Summary for We Can Organization

**What was tested**: the new bilingual website (English and Arabic), before launch, on the project
branch · **When**: 2026-10-29 · **Role**: General public · **Details**: [uat-plan.md](uat-plan.md),
[uat-scripts.md](uat-scripts.md), [uat-results.md](uat-results.md)

## Result

**UAT passed.** All 15 test scripts passed in English and in Arabic at phone, tablet, laptop and
large-desktop sizes (120 runs). No critical or major problem is open (SC-010). Two small issues
found during the earlier checks were fixed before testing began.

## Results by persona and language

| Persona | What they needed | English | Arabic |
|---------|------------------|---------|--------|
| Opportunity seeker (young woman on a phone) | Understand who We Can is, reach it by email, see that phone, WhatsApp and social media are coming soon | Pass | Pass |
| Partner or funder (laptop) | Registration, mission, founders' credentials, email; header links to every section | Pass | Pass |
| Journalist (tablet, both languages) | Exact names and titles, the Arabic name, the vision statement, contact; switching language keeps the section | Pass | Pass |
| Visitor from search or a shared link | Correct page title, description and preview information; lands on the right page; switches language | Pass | Pass |

Accessibility checks were part of every persona: keyboard only (skip link, focus order, visible
focus, menu that keeps focus inside), descriptions for every photo, scripts switched off, and
accessibility scans with no violations.

## Open items

| Item | Who | When |
|------|-----|------|
| Review the Arabic text (everything except the name and the founders' names is a draft) and send corrections | Site coordinator | Within 2 weeks of launch |
| Run Lighthouse in Microsoft Edge on both pages and fill in `uat/lighthouse.md` (T062), or let the project team download the Lighthouse tool | Organization | Before launch |
| Hallway test, device spot check and post-launch checks below | Organization | Before and right after launch |

No minor defects are open from UAT. The W3C HTML checker reported no errors or warnings for either
page (T061, checked on 2026-10-29 with the organization's OK).

## Hallway test (SC-001)

Do this before sign-off, with at least 5 people who have not seen the site (ideally including
Arabic readers on the Arabic page).

1. Hand each person a phone or laptop with the site open at the top of the page. Do not explain
   anything.
2. After 30 seconds, ask: "Who does this organization serve?" and "What does it aim to do?"
3. Note each answer. A correct answer mentions women and young people (or youth) in Jordan, and
   creating opportunities, empowering them or helping them pursue their dreams.
4. The test passes if at least 4 of 5 people answer both questions correctly.

| Person | Language | Who it serves (✓/✗) | What it aims to do (✓/✗) | Notes |
|--------|----------|---------------------|--------------------------|-------|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |
| 4 | | | | |
| 5 | | | | |

## Device spot check

UAT ran in a Chromium browser. Please check these on real devices: iPhone with Safari, an Android
phone with Chrome, and Firefox on a computer if available.

| Check | iPhone Safari | Android Chrome | Firefox |
|-------|---------------|----------------|---------|
| English and Arabic pages open, nothing cut off, no sideways scrolling | | | |
| Menu button opens and closes the menu; links go to the right section | | | |
| "عربي" / "EN" switches language and keeps the section | | | |
| Tapping info@wecan-jo.org opens the email app with a new message to that address (SC-009) | | | |
| Photos and the logo look sharp and are not mirrored in Arabic | | | |

## After launch

Once the site is published at https://www.wecan-jo.org:

1. Open `/` and `/ar/`; both load.
2. Open `/sitemap.xml` and `/robots.txt`; both are shown.
3. Open `/DESIGN.html`, `/README.html` and `/specs/`; each must show "404 Not Found" (FR-032).
4. Paste `https://www.wecan-jo.org/` and `https://www.wecan-jo.org/ar/` into a public link-preview
   checker, such as Facebook's Sharing Debugger: each shows the name, the description in its
   language and the logo image (SC-008).
5. Send both links in WhatsApp and post them on Facebook (privately is fine): the previews look the
   same (SC-008).
6. In the repository's Settings → Pages, turn on "Enforce HTTPS".

## Sign-off checklist

- [ ] All checks pass on the project branch and UAT is documented with no open critical or major
      defects (done, see above).
- [ ] The hallway test passes (at least 4 of 5 people).
- [ ] The device spot check passes.
- [ ] The organization approves the English content for launch.
- [ ] The organization gives its OK to publish: the project branch is merged into `main` and pushed.
- [ ] The after-launch checks above pass.
- [ ] Within 2 weeks of launch, the site coordinator reviews the Arabic text and the corrections are
      applied (statuses updated in `README.md`).
