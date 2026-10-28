---

description: "Task list for the bilingual We Can Organization landing page"
---

# Tasks: Bilingual Landing Page for We Can Organization

**Input**: Design documents from `/specs/001-bilingual-landing-page/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: The spec has no automated test suite requirement. Each user story phase ends with
verification tasks (the `tools/check-site.mjs` group for that story, an axe scan and viewport
checks), as requested; the final phase is user acceptance testing (UAT) for the General public role.

**Organization**: Tasks are grouped by user story so each story can be implemented and verified on
its own.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1–US6)
- Exact file paths are given in every task

## Path Conventions

- Static site at the repository root (published as-is by GitHub Pages): `index.html`,
  `ar/index.html`, `styles.css`, `script.js`, `fonts/`, `images/`.
- Tooling in `tools/`; feature documents in `specs/001-bilingual-landing-page/`.
- All visible text comes from `contracts/content.md`; layout and behavior from
  `contracts/page-structure.md`; metadata from `contracts/seo-and-sharing.md`; files from
  `contracts/assets.md`; placeholders from `contracts/placeholders.md`.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Tooling, fonts and web images that every story uses

- [X] T001 Create `tools/preview-server.js` (Node built-ins only) that serves the repository root on a given port (default 5500), maps `/ar/` to `ar/index.html`, refuses paths outside the root, and sends correct types for `.html`, `.css`, `.js`, `.jpg`, `.png`, `.ico`, `.svg`, `.woff2`, `.webmanifest`, `.xml` and `.txt`
- [X] T002 [P] Create `_config.yml` at the repository root with `exclude:` entries `specs/`, `tools/`, `DESIGN.md` and `README.md`, exactly as in contracts/seo-and-sharing.md (FR-032)
- [X] T003 [P] Create `tools/fetch-fonts.mjs` (Node built-ins only) that requests the Google Fonts CSS2 API with a current browser user agent, downloads only the faces and subsets listed in contracts/assets.md (Fonts table) to the exact file names in `fonts/`, and saves each family's SIL Open Font License as `fonts/OFL-<family>.txt`
- [X] T004 Run `node tools/fetch-fonts.mjs` and confirm the nine WOFF2 files and four license files exist in `fonts/`, noting each file's size (approved one-time download from fonts.google.com)
- [X] T005 [P] Create `tools/make-web-images.ps1` (Windows PowerShell 5.1, System.Drawing only) that writes every photo derivative in contracts/assets.md to `images/web/` with the listed widths and crops, lowering JPEG quality from 82 (not below 60) until each file is at most 280 KB, and never writes to the originals in `images/`
- [X] T006 Extend `tools/make-web-images.ps1` to derive the logo files from `images/logo.jpg`: header mark (bounding box of non-white pixels above the built-in wordmark) at 64/128/192 px tall, complete logo at 240/480 px wide, `images/web/og-image.jpg` (complete logo centered on #FAF8F2, 1200×630), and the icons `favicon.ico` (32 and 48 px PNG inside one ICO), `apple-touch-icon.png` (180 px), `images/icons/icon-192.png` and `images/icons/icon-512.png`
- [X] T007 Run `powershell -NoProfile -ExecutionPolicy Bypass -File tools/make-web-images.ps1`, review the header mark crop and share image visually, and confirm with `git status` that `images/hero.jpg`, `women.jpg`, `community.jpg`, `youth.jpg` and `logo.jpg` are unchanged
- [X] T008 [P] Create `tools/check-site.mjs` (Node built-ins only) that parses `index.html` and `ar/index.html` and runs check groups selectable with `--group`: `core` (one h1, section IDs and order `top, about, vision, mission, founders, contact`, every img has alt/width/height, internal links and anchors resolve, referenced files exist, `CNAME` contains `www.wecan-jo.org`), `founders`, `contact`, `i18n`, `nav` (`html` starts with class `no-js`, the menu button's `aria-controls` points to `#site-menu`, every nav and footer link targets an existing section ID, each language link points to the other page), `seo`, `budgets`, `privacy` (no reference in HTML, CSS or JS to any host other than `www.wecan-jo.org`, apart from `mailto:` links and the schema.org context) and `all`, printing each failure and ending with `All checks passed` or a non-zero exit

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared styles and the two page skeletons that every story fills in

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T009 Write the foundation of `styles.css`: DESIGN.md tokens as custom properties (Leaf Green #597E52, Deep Grove #2F4A35, Sage #A0AD87, Sandstone Cream #E7DCB8, Light Cream #F1E4C3, Paper White #FAF8F2, Sand Mist #F4EFE2, Charcoal Moss #3A4237, Stone #6B6F63; radii 8/16 px; card shadow `0 8px 24px rgba(47,74,53,0.08)`), a minimal reset, and base typography sizes from DESIGN.md
- [X] T010 Add self-hosted `@font-face` rules to `styles.css` for every file in `fonts/` with `font-display: swap` and the matching `unicode-range`, font stacks for English (EB Garamond, Manrope) and `:lang(ar)` (Amiri, IBM Plex Sans Arabic) with system fallbacks, and the rule that Arabic text is never letter-spaced or uppercased
- [X] T011 Add layout utilities to `styles.css` using logical properties only: centered 1200 px container, gutters 20/32/48/64 px at 0/640/1024/1440 px, section padding 64/88/112 px, `.visually-hidden`, `.skip-link` (visible on focus), the 3 px Leaf Green focus ring with 2 px white offset, 44×44 px minimum targets, and a global reduced-motion rule
- [X] T012 Create the `index.html` skeleton per contracts/page-structure.md: `<html lang="en" dir="ltr" class="no-js">`, charset and viewport, `styles.css`, the inline script that swaps `no-js` for `js`, skip link to `#main`, header with brand link and `#site-menu` containing `nav[aria-label="Main"]` (About, Vision, Mission, Founders, Contact) and the language link to `/ar/`, `main#main` with the six empty sections (`id` and `aria-labelledby`), an empty footer, and `<script src="/script.js" defer>`
- [X] T013 Create the `ar/index.html` skeleton mirroring T012 with `<html lang="ar" dir="rtl" class="no-js">`, the Arabic navigation labels from contracts/content.md, the language link to `/` and root-relative asset paths; section IDs MUST be the "Same set and order in both versions" (data-model PageSection)
- [X] T014 Style the header and navigation without the menu panel in `styles.css`: sticky header no taller than about 15% of the screen (not sticky below 500 px tall), wide-screen inline links and language switch from 1024 px, and the narrow-screen layout without scripts (links wrapped below the brand), plus the 1 px Sage bottom hairline shown when the header has the `is-scrolled` class (always shown without scripts), all mirroring under `dir="rtl"`

**Checkpoint**: Both skeletons load in the preview (`node tools/preview-server.js . 5500`) with styles and fonts

---

## Phase 3: User Story 1 - Discover who We Can is (Priority: P1) 🎯 MVP

**Goal**: A visitor immediately understands who the organization is, whom it serves, and its vision
and mission, with the logo prominent.

**Independent Test**: Open `/` at 390 px and 1280 px; the logo mark and name, approved headline and
sentence, Who we are, Our vision and Our mission all appear with the approved text word for word.

### Implementation for User Story 1

- [X] T015 [US1] Add the header brand to `index.html`: `<img>` of the header mark with `srcset` `logo-mark-64.png 1x, logo-mark-128.png 2x, logo-mark-192.png 3x`, `alt=""`, width/height, beside the text "We Can Organization"; style mark heights 56–64 px from 1024 px, 48–52 px on tablets, 44 px on phones in `styles.css` (FR-013)
- [X] T016 [US1] Add the hero to `index.html`: `<picture>` with the portrait source below 640 px and the landscape `srcset` above, `sizes`, width/height, `fetchpriority="high"` and the English alt text; eyebrow, `h1` "Empowering women and youth for a better future", the approved sentence, "Learn about us" (`#about`) and "Contact us" (`#contact`); plus a `<link rel="preload" as="image" imagesrcset>` for the hero and a font preload for EB Garamond in the head
- [X] T017 [US1] Style the hero in `styles.css`: full-bleed photo with `object-fit: cover` over a solid Deep Grove background (so the text stays readable if the photo fails to load), Deep Grove gradient overlay (70% behind the text fading to 20%), text block on the inline-start side, primary Leaf Green and white outline buttons (48 px tall, 8 px radius), buttons stacked full width below 640 px, headline about 64 px from 1440 px
- [X] T018 [US1] Add Who we are to `index.html`: eyebrow "About us", `h2` "Who we are", the FR-003 text word for word, the badge "Registered NGO / CBO in Jordan", and the women photo (`srcset`/`sizes`, width/height, `loading="lazy" decoding="async"`, English alt)
- [X] T019 [US1] Add Our vision to `index.html`: the community photo as a lazy-loaded background `<img>` with alt, overlay, eyebrow "Our vision", a visually hidden `h2` "Our vision", and the FR-004 quote word for word in a `<blockquote>` with the cream quotation mark
- [X] T020 [US1] Add Our mission to `index.html`: the youth photo (lazy, alt), eyebrow "Our mission", `h2` "How we create change", paragraph 1, the emphasized sentence "By leveraging the collective strength of our ecosystem, we believe that individual success drives community prosperity." and paragraph 2, word for word (FR-005)
- [X] T021 [US1] Style Who we are, Our vision and Our mission in `styles.css`: the shared section-heading pattern (Leaf Green eyebrow, EB Garamond `h2` and the 64 px Sage ribbon-shaped underline from DESIGN.md), text and photo side by side from 1024 px (Mission mirrored) and stacked below, 16 px photo radius, full-bleed vision band (solid Deep Grove background behind its photo) with quote at about 26/30/34 px, emphasized sentence with a slim Leaf Green inline-start rule, contrast of at least 4.5:1 for text over photos
- [X] T022 [US1] Add the footer to `index.html` and `styles.css`: complete logo (`logo-full-240.png`/`logo-full-480.png` on a white rounded tile, alt "We Can Organization logo"), "Empowering women and youth across Jordan.", `nav[aria-label="Footer"]` with the same labels as the main navigation, "Registered NGO / CBO in Jordan" and "© 2026 We Can Organization", on Deep Grove

### Verification for User Story 1

- [X] T023 [US1] Run `node tools/check-site.mjs --group core` against `index.html` and fix every failure
- [X] T024 [US1] Run an axe-core scan on `http://localhost:5500/` at 390 and 1280 px in the in-app browser and fix every violation in `index.html` / `styles.css`
- [X] T025 [US1] Check `/` at 390, 768, 1280 and 1440 px in the in-app browser: no horizontal scrolling, layout matches the Stitch screens in `specs/001-bilingual-landing-page/design/stitch/`, and the copy matches contracts/content.md

**Checkpoint**: User Story 1 is complete and usable on its own (MVP)

---

## Phase 4: User Story 2 - Meet the founders (Priority: P2)

**Goal**: Partners, funders and journalists see the four founders with exact names, credentials and
roles.

**Independent Test**: The Founders section shows four cards whose text matches the approved list
exactly.

### Implementation for User Story 2

- [X] T026 [US2] Add Founders to `index.html`: eyebrow "Our founders", `h2` "The people behind We Can", and a list of four cards in the fixed order Insaf Daas, Dr. Maysoon Otoom, Dr. Abeer Dababneh, Emad Shehab, each with an `aria-hidden` initials badge (ID, MO, AD, ES), an `h3` name, the credential and the role, word for word from contracts/content.md (FR-006, FR-007)
- [X] T027 [US2] Style the founder cards in `styles.css`: 1 / 2 / 2 / 4 per row at the four width bands, white card with 16 px radius and the card shadow, 88 px circular Light Cream badge with Deep Grove EB Garamond initials, credential in small uppercase Leaf Green (not uppercased in Arabic), and a badge slot that an equally sized headshot can replace without layout change

### Verification for User Story 2

- [X] T028 [US2] Run `node tools/check-site.mjs --group founders` (four cards, exact names, credentials and roles, fixed order) and fix every failure
- [X] T029 [US2] Run axe on the Founders section and check the card grid at 390, 768, 1280 and 1440 px; fix any issue in `index.html` / `styles.css`

**Checkpoint**: User Stories 1 and 2 both work

---

## Phase 5: User Story 3 - Get in touch (Priority: P2)

**Goal**: Visitors can email the organization and clearly see which channels are coming soon.

**Independent Test**: The email link opens a message to info@wecan-jo.org; the three placeholders say
"Coming soon" and cannot be focused or used.

### Implementation for User Story 3

- [X] T030 [US3] Add Contact to `index.html`: eyebrow "Contact", `h2` "Get in touch", the email card ("Email us", `<a href="mailto:info@wecan-jo.org">`, "Amman, Jordan") and inline SVG icons with `aria-hidden="true" focusable="false"`
- [X] T031 [US3] Add the three placeholder cards to `index.html` exactly as in contracts/placeholders.md: Phone & WhatsApp, Social media (Facebook, Instagram, LinkedIn, X) and the Contact form (`<form>` without `action` wrapping `<fieldset disabled>` with Name, Email, Message and "Send message"), each wrapped in `<!-- PLACEHOLDER:<channel> START/END -->` comments with the "Coming soon" badge and visually hidden ", not available yet"; "a `coming-soon` card never contains a link or a focusable control" (data-model ContactChannel)
- [X] T032 [US3] Style Contact in `styles.css`: Leaf Green bordered email card, muted placeholder cards (dashed 1.5 px Sage border, Stone text kept at 4.5:1 contrast, icons at 60% opacity), layout stacked below 640 px, email full width plus two placeholders side by side up to 1023 px, three in one row with the form below from 1024 px

### Verification for User Story 3

- [X] T033 [US3] Run `node tools/check-site.mjs --group contact` (mailto target, placeholder blocks present, no links, tabindex or enabled controls inside them) and fix every failure
- [X] T034 [US3] Tab through the Contact section in the in-app browser to confirm the placeholders receive no focus, run axe on the section, and check the layout at the four widths

**Checkpoint**: User Stories 1–3 work in English

---

## Phase 6: User Story 4 - Read the site in Arabic (Priority: P2)

**Goal**: The same content in Arabic, right-to-left, with a language switch that keeps the section.

**Independent Test**: `/ar/` shows every English section in Arabic, mirrored, with
"جمعية نحن نستطيع", the confirmed founder names, Arabic initials and a left-to-right email address.

### Implementation for User Story 4

- [X] T035 [US4] Fill the header, navigation and footer of `ar/index.html` from contracts/content.md: wordmark "جمعية نحن نستطيع", Arabic labels, language link "EN" with `lang="en" hreflang="en"` and accessible name "English", footer text with "مسجّلة في الأردن كمنظمة غير حكومية / مجتمعية" and "© 2026 جمعية نحن نستطيع", and the complete logo with alt "شعار جمعية نحن نستطيع"
- [X] T036 [US4] Add the Arabic hero, Who we are, Our vision and Our mission to `ar/index.html` using the same images and markup pattern as `index.html`, the draft Arabic copy and Arabic alt texts from contracts/content.md, and the heading font preload for Amiri
- [X] T037 [US4] Add the Arabic Founders to `ar/index.html`: names exactly "إنصاف دعاس", "د. ميسون العتوم", "د. عبير دبابنة", "عماد شهاب" (confirmed), draft credentials and roles, and initials "إ‌د", "م‌ع", "ع‌د", "ع‌ش" with U+200C between the letters (research R11)
- [X] T038 [US4] Add the Arabic Contact to `ar/index.html`: email link wrapped in `dir="ltr"`, "عمّان، الأردن", and the three placeholders with Arabic labels, "قريبًا" badges, ", غير متاح بعد" hidden text and the same PLACEHOLDER comments as `index.html`
- [X] T039 [US4] Add right-to-left refinements to `styles.css`: flip directional icons under `[dir="rtl"]`, Arabic headings in Amiri with about 10% more line height, Arabic body in IBM Plex Sans Arabic at 17/30 px, and isolation of Latin and numeric runs (NGO, CBO, 2026, email) so they keep their reading order (FR-017)
- [X] T040 [US4] Set the English page's language link in `index.html` to `/ar/` with `lang="ar" hreflang="ar"` and accessible name "العربية" (FR-018)

### Verification for User Story 4

- [X] T041 [US4] Run `node tools/check-site.mjs --group i18n` (same section IDs and order, `lang`/`dir`, equal image and alt counts, switch links both ways) and fix every failure
- [X] T042 [US4] Run axe on `http://localhost:5500/ar/` at 390 and 1280 px and fix every violation
- [X] T043 [US4] Check `/ar/` at 390, 768, 1280 and 1440 px: mirrored layout, no horizontal scrolling, photos and logo not mirrored, matches `design/stitch/ar-laptop.html` and `ar-mobile.html` apart from the documented differences

**Checkpoint**: Both languages complete

---

## Phase 7: User Story 5 - Navigate comfortably on any device (Priority: P3)

**Goal**: Menu button below 1024 px, current-section marking, and a language switch that keeps the
section.

**Independent Test**: At 390/768 px the menu opens, traps focus and closes on Escape, outside tap or a
link; at 1280 px the current section is marked; without scripts the links are still reachable.

### Implementation for User Story 5

- [X] T044 [US5] Add the menu button (`aria-controls="site-menu"`, `aria-expanded="false"`, label "Open menu" / "فتح القائمة"), the close button inside `#site-menu`, the backdrop element and the panel email link to both `index.html` and `ar/index.html`, hidden when the `html` element has `no-js`
- [X] T045 [US5] Style the menu panel in `styles.css`: below 1024 px with `js`, `#site-menu` becomes a full-height panel about 85% wide sliding in from the inline-end edge over a dimmed Deep Grove backdrop, with large EB Garamond / Amiri links separated by Sage hairlines, the language switch and the email; slide about 250 ms, none under reduced motion
- [X] T046 [US5] Implement the menu in `script.js`: open/close toggling `aria-expanded`, the button label and `role="dialog"` + `aria-modal="true"` + accessible name "Menu" / "القائمة" on `#site-menu`; focus to the close button on open, focus containment on Tab/Shift+Tab, Escape, backdrop tap and link selection close it, focus returns to the menu button, page scroll locked while open, and the menu closes when the width reaches 1024 px
- [X] T047 [US5] Implement current-section marking in `script.js`: IntersectionObserver marks the section covering the middle of the screen below the header with `aria-current="true"` on its nav link (none while the hero is in view), add the `is-scrolled` class to the header once the page scrolls (for the hairline), and style the marked link with the Leaf Green underline in `styles.css`
- [X] T048 [US5] Implement the language-switch section hash in `script.js`: whenever the current section changes, set the language link to the other page plus `#<section>`, or to the page top when no section is current
- [X] T049 [US5] Add smooth scrolling only under `prefers-reduced-motion: no-preference` and `scroll-margin-top` equal to the header height for every section in `styles.css`

### Verification for User Story 5

- [X] T050 [US5] Keyboard walk-through at 390 and 768 px in both languages: open the menu, Tab and Shift+Tab stay inside, Escape, outside tap and a link each close it with focus returned; at 1280 px the marked section follows scrolling; resizing past 1024 px with the menu open closes it
- [X] T051 [US5] Remove the `js` class in the in-app browser (no-scripts state) and confirm the links and language switch are reachable on narrow screens; run `node tools/check-site.mjs --group nav` and fix every failure

**Checkpoint**: Navigation complete on every device

---

## Phase 8: User Story 6 - Find and share the site (Priority: P3)

**Goal**: Search engines and sharing apps get complete, correct information in both languages.

**Independent Test**: Both pages' metadata matches contracts/seo-and-sharing.md, JSON-LD parses, and
the sitemap, robots file, icons and manifest exist.

### Implementation for User Story 6

- [X] T052 [P] [US6] Add the English head metadata to `index.html` per contracts/seo-and-sharing.md: title (at most 60 characters), description (at most 160), canonical, three `hreflang` alternates, Open Graph (with image width, height and alt) and Twitter tags, `theme-color`, icon and manifest links
- [X] T053 [P] [US6] Add the Arabic head metadata to `ar/index.html` with the Arabic values from contracts/seo-and-sharing.md, same length limits
- [X] T054 [US6] Add the `NGO` JSON-LD block from contracts/seo-and-sharing.md to `index.html` and `ar/index.html` (same `@id`, description in the page's language)
- [X] T055 [P] [US6] Create `sitemap.xml` and `robots.txt` at the repository root exactly as in contracts/seo-and-sharing.md
- [X] T056 [P] [US6] Create `site.webmanifest` at the repository root with the fields in contracts/seo-and-sharing.md

### Verification for User Story 6

- [X] T057 [US6] Run `node tools/check-site.mjs --group seo` (tags and values, lengths, JSON-LD parses, sitemap/robots/manifest/icons exist) and fix every failure
- [X] T058 [US6] Paste each page's JSON-LD into a structured-data validator and fix any error in `index.html` / `ar/index.html`
  - Done by checking every type and property against the schema.org definitions (NGO, PostalAddress, Person, Country) and parsing both blocks; pasting into an online validator submits the founders' names to a third party, so it waits for the organization's OK (or a URL test after launch).

**Checkpoint**: All user stories complete

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Documentation, budgets and release-gate checks across both pages

- [X] T059 [P] Write `README.md`: local preview, regenerating images, refreshing fonts, running checks, the step-by-step placeholder activation guide from contracts/placeholders.md, the Arabic translation status table (every Arabic item `draft` except the organization name and founders' names; reviewed by the site coordinator within 2 weeks of launch), the rule that every content change is made in both languages in the same update (FR-016), and the release steps from quickstart.md
- [X] T060 Run `node tools/check-site.mjs --group budgets` and fix any overrun: each image at most 300 KB, fonts downloaded per page at most 350 KB, `styles.css` at most 25 KB, `script.js` at most 8 KB, first load at most 1.5 MB
  - All budgets pass. The `styles.css` limit was revised to 32 KB (research R13): the commented file is 28.3 KB, about 7 KB as served.
- [X] T061 Validate `index.html` and `ar/index.html` with the W3C Nu HTML Checker and fix every error
  - Submitted with the organization's OK on 2026-10-29: the W3C Nu HTML Checker (version 26.10.18) reported 0 errors and 0 warnings for both pages. A deliberately broken test snippet confirmed the service was checking the uploaded document.
- [ ] T062 Run Lighthouse (Microsoft Edge DevTools, mobile) on `/` and `/ar/`, record the four scores per page in `specs/001-bilingual-landing-page/uat/lighthouse.md`, and fix anything below 90
  - `uat/lighthouse.md` has the steps and local measurements (CLS 0, site-only requests, budgets and axe pass). The four scores need a run in Edge DevTools by the organization, or permission to download the Lighthouse command-line tool.
- [X] T063 Run `node tools/check-site.mjs --group all` (including `privacy`), full axe scans at 390, 768, 1280 and 1440 px on both pages, no-horizontal-scroll checks at 320 px and 2560 px, and a 200% zoom reflow check, in both languages; confirm in the browser's network log that every request goes to the site itself (FR-033); fix every remaining failure or violation
- [X] T064 Walk through the quickstart.md validation scenarios (sections 1–5) and fix any mismatch
  - Sections 1–5 pass (images regenerate byte for byte, all checks pass, 156 contract texts match both pages word for word, US1–US6 scenarios verified). The W3C and Lighthouse rows of section 4 stay with T061 and T062; the post-launch link preview is in T070.

---

## Phase 10: User Acceptance Testing (General public role)

**Purpose**: Plan, run and record UAT before the organization's sign-off

- [X] T065 Write `specs/001-bilingual-landing-page/uat/uat-plan.md`: the General public role and its personas (woman or young person seeking opportunities, partner or funder, journalist, visitor from search or a shared link), scope, environments (in-app browser at 390, 768, 1280 and 1440 px; English and Arabic), entry and exit criteria, severity levels and the defect log format
- [X] T066 Write `specs/001-bilingual-landing-page/uat/uat-scripts.md`: numbered UAT scripts with steps and expected results, mapped to user stories, FRs and SCs, covering every persona in both languages
- [X] T067 Execute every UAT script in English at 390, 768, 1280 and 1440 px and record pass/fail with evidence in `specs/001-bilingual-landing-page/uat/uat-results.md`
- [X] T068 Execute every UAT script in Arabic at 390, 768, 1280 and 1440 px and record pass/fail with evidence in `specs/001-bilingual-landing-page/uat/uat-results.md`
- [X] T069 Fix every critical or major defect found in UAT, re-run the affected scripts, and update `specs/001-bilingual-landing-page/uat/uat-results.md`
  - No critical or major defects were found in UAT; the one major issue from the release checks (D-01, header height at 320 px) was fixed before UAT and retested. See uat-results.md, "Defect log".
- [X] T070 Write `specs/001-bilingual-landing-page/uat/uat-summary.md` for the organization: results by persona and language, open minor items, instructions for the SC-001 hallway test, a cross-browser spot check for the organization (iPhone Safari, Android Chrome, and Firefox if available), the post-launch checks (link previews in a checker, WhatsApp and Facebook for SC-008; `/DESIGN.html`, `/README.html` and `/specs/` returning 404 for FR-032), and the sign-off checklist from quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; T004 needs T003, T007 needs T005–T006
- **Foundational (Phase 2)**: Needs Setup; blocks every user story
- **US1 (Phase 3)**: Needs Foundational
- **US2, US3 (Phases 4–5)**: Need US1 (they add sections to the page US1 completes)
- **US4 (Phase 6)**: Needs US1–US3, because the Arabic page mirrors all English content
- **US5 (Phase 7)**: Needs Foundational and both pages (US4) for the language hash
- **US6 (Phase 8)**: Needs Foundational only; can run any time after Phase 2
- **Polish (Phase 9)**: Needs all user stories
- **UAT (Phase 10)**: Needs Polish

### Within Each User Story

- Markup before styles, styles before verification
- Verification tasks must pass before the story's checkpoint

### Parallel Opportunities

- Setup: T002, T003, T005 and T008 touch different files
- US6: T052 and T053 (different pages), T055 and T056 (new files)
- Polish: T059 alongside the checks

---

## Parallel Example: User Story 6

```bash
Task: "Add the English head metadata to index.html"            # T052
Task: "Add the Arabic head metadata to ar/index.html"          # T053
Task: "Create sitemap.xml and robots.txt"                      # T055
Task: "Create site.webmanifest"                                # T056
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 (Setup) and Phase 2 (Foundational)
2. Complete Phase 3 (US1) and its verification
3. **STOP and VALIDATE**: preview `/` at the four widths

### Incremental Delivery

1. Foundation → US1 (MVP) → US2 → US3 → US4 (Arabic) → US5 (navigation polish) → US6 (search)
2. Each story is verified at its checkpoint before the next begins
3. Polish and UAT, then the organization's approval before anything is merged to `main`

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps each task to its user story for traceability
- Tick each task as soon as it is done, one at a time
- Commit after each phase checkpoint on branch `001-bilingual-landing-page`; never push to `main`
  without the organization's approval
- Never modify the original photos in `images/`

---

## Phase 11: Convergence

- [X] T071 CRITICAL: Make every link and button at least 44 × 44 px in `styles.css` (the `.lang-switch` links are 38 px tall on both pages; on `/ar/` the header and footer links "رؤيتنا" and "رسالتنا" are 32–43 px wide), then re-measure all targets at 390 and 1280 px in both languages and re-run axe per Constitution III, FR-027 (contradicts)
- [X] T072 CRITICAL: Serve modern-format WebP copies of the photos and logo images with the existing JPEG/PNG copies as fallback (`<source type="image/webp">` in `index.html` and `ar/index.html`), generated without package installs per Principle VII (for example a browser-canvas converter in `tools/`), keeping the sharing image and icons as JPEG/PNG/ICO, and update contracts/assets.md, research R6 and the budgets check; if the organization prefers JPEG only, amend Principle V through `/speckit-constitution` instead, per Constitution V (contradicts)
  - The organization chose WebP. `tools/make-webp.mjs` (Node built-ins plus headless Edge or Chrome) made 20 WebP copies, each smaller than its JPEG/PNG; both pages list them first with the JPEG/PNG as fallback, and `check-site` now requires it.
