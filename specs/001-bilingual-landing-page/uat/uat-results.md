# UAT Results: General public role

**Build**: branch `001-bilingual-landing-page`, commit `29e0522` · **Run on**: 2026-10-29 ·
**Environment**: local preview (`http://localhost:5500`) in the Claude desktop app's built-in
browser (Chromium), pane visible, at 390 × 844, 768 × 1024, 1280 × 800 and 1440 × 900 px.

**How it was run**: each page was opened fresh at each width. `tools/uat-harness.js` read the page
as a visitor sees it (`checkPage()`), then performed the scripted clicks and scrolling
(`interact()`). Keyboard steps used real key presses (Tab, Shift+Tab, Enter, Escape) with a focus
log. The language switch was followed for real, from Founders to the other page and back.

## Results

| Script | EN 390 | EN 768 | EN 1280 | EN 1440 | AR 390 | AR 768 | AR 1280 | AR 1440 |
|--------|--------|--------|---------|---------|--------|--------|---------|---------|
| UAT-01 First screen | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass |
| UAT-02 Learn about the organization | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass |
| UAT-03 Photo descriptions | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass |
| UAT-04 Founders | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass |
| UAT-05 Email and location | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass |
| UAT-06 Channels that are coming soon | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass |
| UAT-07 Switch language at a section | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass |
| UAT-08 Page integrity | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass |
| UAT-09 Reach any section | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass |
| UAT-10 Header and current section | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass |
| UAT-11 Keyboard-only visit | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass |
| UAT-12 Scripts switched off | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass |
| UAT-13 Layout at this width | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass |
| UAT-14 Search and sharing information | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass |
| UAT-15 Privacy and download size | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass |

## Evidence: English

| Measure | 390 px | 768 px | 1280 px | 1440 px |
|---------|--------|--------|---------|---------|
| Logo mark height (UAT-01) | 44 px | 52 px | 64 px | 64 px |
| Hero actions fully on the first screen (UAT-01) | bottom at 636 of 844 px | 577 of 1024 px | 574 of 800 px | 642 of 900 px |
| Founder cards per row (UAT-04) | 1 | 2 | 2 | 4 |
| Contact cards per row (UAT-13) | 1 / 1 / 1 | 1 / 2 | 3 | 3 |
| Horizontal overflow (UAT-13) | 0 px | 0 px | 0 px | 0 px |
| Header height, share of screen (UAT-10) | 65 px, 7.7% | 73 px, 7.1% | 89 px, 11.1% | 89 px, 9.9% |
| Marked section while scrolling (UAT-10) | none at the top, then About, Vision, Mission, Founders, Contact in turn (all widths) | | | |
| Header (UAT-09) | logo, name, menu button | logo, name, menu button | logo, 5 links, EN \| عربي | logo, 5 links, EN \| عربي |

- **UAT-02**: "Learn about us" lands on "Who we are" with the heading just below the header; the
  badge, the vision quote and the three mission paragraphs match the approved text exactly.
  A full word-for-word comparison of all 156 contract texts against both pages also passed (T064).
- **UAT-03**: all four photos carry the approved descriptions, the header mark's description is
  empty, the footer logo is "We Can Organization logo", and every image is a web copy with width
  and height.
- **UAT-04**: four cards in order with the exact names, credentials and roles; badges ID, MO, AD, ES.
- **UAT-05**: "Contact us" lands on "Get in touch"; the email card links to
  `mailto:info@wecan-jo.org`; "Amman, Jordan" is shown. The built-in browser cannot open an email
  app, so the app opening on real phones and computers is in the organization's device check
  (uat-summary.md).
- **UAT-06**: the three placeholders read "Coming soon"; clicking the cards and the form fields does
  nothing (address and focus unchanged); every form control is disabled; Tab goes from the email link
  straight to the footer.
- **UAT-07**: at Founders the switch points to `/ar/#founders`; following it opens the Arabic page at
  Founders (right to left, Founders marked), and the Arabic switch brings the visitor back to
  `/#founders`. Below 1024 px the switch was used from inside the menu. The switch reads "EN عربي"
  and is announced as "العربية".
- **UAT-08**: left to right, logo on the left, six sections in order, six images, nothing mirrored.
- **UAT-09**: from 1024 px each header link reached its section in one click. Below 1024 px: the
  header shows only the logo, name and menu button; the menu opens with focus on the close button
  and shows the five links, the switch and the email; 8 Tab presses wrap back to the close button
  and Shift+Tab goes to the email; Escape, a tap on the backdrop and the close button each close it
  and return focus to the menu button; choosing Founders closes the menu and lands on Founders
  (2 taps).
- **UAT-11**: the first Tab shows "Skip to content" on screen; Enter jumps to the main content and
  the next Tab lands on "Learn about us". Tab order below 1024 px: skip link, logo, menu button,
  Learn about us, Contact us, email, five footer links. From 1024 px: skip link, logo, five header
  links, العربية, Learn about us, Contact us, email, five footer links. Every stop showed the 3 px
  focus ring.
- **UAT-12**: with scripts off, every section shows, the links and language switch are reachable
  (as a wrapped list below 1024 px) and the menu button is hidden.
- **UAT-14**: title, description, canonical and both language alternates, Open Graph (1200 × 630
  image), the NGO structured data (name, logo, email, Amman) and the icon and manifest links are
  present and correct.
- **UAT-15**: every request went to the site itself; no cookies; nothing stored in the browser;
  first load at most about 1.1 MB on wide screens and 0.95 MB on phones (under 1.5 MB), no image
  over 300 KB.

## Evidence: Arabic

| Measure | 390 px | 768 px | 1280 px | 1440 px |
|---------|--------|--------|---------|---------|
| Logo mark height (UAT-01) | 44 px | 52 px | 64 px | 64 px |
| Hero actions fully on the first screen (UAT-01) | bottom at 593 of 844 px | 558 of 1024 px | 584 of 800 px | 652 of 900 px |
| Founder cards per row (UAT-04) | 1 | 2 | 2 | 4 |
| Contact cards per row (UAT-13) | 1 / 1 / 1 | 1 / 2 | 3 | 3 |
| Horizontal overflow (UAT-13) | 0 px | 0 px | 0 px | 0 px |
| Header height, share of screen (UAT-10) | 65 px, 7.7% | 73 px, 7.1% | 89 px, 11.1% | 89 px, 9.9% |
| Marked section while scrolling (UAT-10) | none at the top, then عن الجمعية، رؤيتنا، رسالتنا، المؤسسون، تواصل معنا in turn (all widths) | | | |
| Header (UAT-09) | logo and name on the right, menu button on the left | same | logo on the right, 5 links, عربي \| EN on the left | same |

- **UAT-01 to UAT-06**: the Arabic headline, sentence and actions (تعرّف علينا، تواصل معنا), the
  photo descriptions, the badge, the vision quote and the three mission paragraphs match the Arabic
  text in content.md exactly; the founders show the confirmed names with the draft credentials and
  roles and the badges إ د، م ع، ع د، ع ش as separate letters; the email reads left to right;
  "عمّان، الأردن" is shown; the placeholders read "قريبًا", ignore clicks and are skipped by Tab.
- **UAT-07**: at المؤسسون the switch points to `/#founders` and is announced as "English";
  following it opens the English page at Founders, and the English switch returns to
  `/ar/#founders`. The switch reads "عربي EN" (Arabic highlighted).
- **UAT-08**: right to left throughout; logo and name on the right; "جمعية نحن نستطيع" in the page
  title, header and footer; six sections in the same order as English; six images, none mirrored.
  The footer reads "© 2026 جمعية نحن نستطيع" in the correct order (checked on screen, T039).
- **UAT-09 and UAT-11**: the menu slides in from the left with the same behaviour as in English (focus
  kept inside, Escape, backdrop and close button return focus, Founders in 2 taps). Tab order:
  تخطَّ إلى المحتوى، the logo, فتح القائمة (or the five header links and "English" from 1024 px),
  تعرّف علينا، تواصل معنا، the email, five footer links, each with the focus ring.
- **UAT-12 to UAT-15**: same results as English (scripts off, layout, search and sharing tags in
  Arabic, site-only requests, no cookies or storage). First load about 1.2 MB on wide screens because
  of the Arabic fonts, under 1.5 MB.

## Defect log

No defects were found during UAT in either language, so no fixes or retests were needed (T069).
Two issues found earlier, in the release checks, were fixed before UAT started:

| ID | Found in | Language, width | Severity | Expected / actual | Status |
|----|----------|-----------------|----------|-------------------|--------|
| D-01 | T063 narrow-screen check | en, 320 px | Major | Header at most about 15% of the screen (FR-024) / the long name pushed the menu button onto a second row, 117 px of 640 px (18%) | Fixed in `29e0522` (67 px, 10.5%); retested in UAT at 390 px |
| D-02 | T043 / T039 visual check | both, all widths | Minor | Vision label centred / it sat off-centre because paragraphs are capped at 70 characters | Fixed in `c86698a` |
| D-03 | `/speckit-converge` after UAT | both, all widths | Major | Every link and button at least 44 × 44 px (Constitution III) / the language switch was 38 px tall, and on `/ar/` the links "رؤيتنا" and "رسالتنا" were 32–43 px wide | Fixed in T071; re-measured at 390 and 1280 px (menu open and closed), axe 0 violations, UAT page checks pass |

## Changes after UAT

| Change | Why | Regression check |
|--------|-----|------------------|
| T071: every link and button at least 44 × 44 px | Constitution III (found by `/speckit-converge`, D-03) | Targets re-measured at 390 and 1280 px, menu open and closed; axe 0 violations; `checkPage()` passes in both languages |
| T072: every photo and logo served as WebP with the JPEG/PNG copy as fallback; hero preloads switched to WebP | Constitution V (modern-format copies), chosen by the organization | Both pages show only WebP and download no JPEG/PNG; layout, header mark and footer logo unchanged (CLS 0, vision photo still fills its band); `checkPage()` and `interact()` pass; axe 0 violations; `check-site` passes, including a new rule that every photo and logo has a matching WebP source |

## Covered elsewhere

| Item | Where | Status |
|------|-------|--------|
| SC-001 hallway test (5 first-time visitors) | uat-summary.md, for the organization | To do by the organization |
| Email app opens on real devices (SC-009) | uat-summary.md device spot check | To do by the organization |
| Lighthouse scores (SC-005, SC-006) | T062, uat/lighthouse.md | Waiting for a run in Edge |
| W3C HTML check | T061 | Waiting for the organization's OK |
| Link previews in a checker, WhatsApp and Facebook (SC-008) | uat-summary.md post-launch checks | After launch |
