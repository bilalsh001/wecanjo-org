# Research: Bilingual Landing Page for We Can Organization

Phase 0 output of `/speckit-plan`. Every Technical Context item is resolved; no NEEDS
CLARIFICATION remains.

## R1. Page architecture and addresses

- **Decision**: Two hand-written static HTML documents that share one stylesheet and one script:
  English at `/` (`index.html`) and Arabic at `/ar/` (`ar/index.html`). Both use the same section
  IDs: `top`, `about`, `vision`, `mission`, `founders`, `contact`. English is the `x-default`
  version; there is no automatic language redirect.
- **Rationale**: No build step (Principle VII); all content is readable without scripts
  (Principle V, FR-026); each language gets a clean, permanent address for `canonical` and
  `hreflang` (Principle II, FR-019, FR-028); GitHub Pages serves it as-is.
- **Alternatives considered**: one page with a script-driven language toggle (fails without
  scripts and for search engines); Jekyll templates with shared includes (local preview would need
  Ruby, and adds a build); `?lang=ar` query strings (weak for search); an `ar.` subdomain (extra
  DNS and a separate site).

## R2. Using the Stitch exports

- **Decision**: Treat the exported Stitch HTML as a visual reference and re-implement it in
  semantic HTML with a hand-written stylesheet that mirrors its layout and the `DESIGN.md` tokens.
- **Rationale**: The exports load the Tailwind CDN at runtime (hundreds of KB of script and a flash
  of unstyled content), use Stitch-generated stand-in photos and non-semantic structure; shipping
  them would break Principles V and VII.
- **Alternatives considered**: shipping the exports (rejected); compiling Tailwind (adds a build
  step).

## R3. Styling and right-to-left layout

- **Decision**: One mobile-first `styles.css` with the `DESIGN.md` tokens as CSS custom
  properties. Layout uses logical properties (`margin-inline`, `padding-inline`, `inset-inline`,
  `text-align: start`) so `dir="rtl"` mirrors it automatically; fonts switch with `:lang(ar)`;
  directional icons flip under `[dir="rtl"]`. Breakpoints at 640, 1024 and 1440 px.
- **Rationale**: One stylesheet serves both languages without duplicated right-to-left rules, and
  matches `DESIGN.md`.
- **Alternatives considered**: a separate right-to-left stylesheet (duplication); RTLCSS (build
  step).

## R4. Fonts

- **Decision** (updated after clarify, 2026-10-28): self-host the fonts. WOFF2 files live in
  `fonts/`, downloaded once from Google Fonts (fonts.google.com) together with each family's SIL
  Open Font License text, and are declared with `@font-face` in `styles.css` using
  `font-display: swap` and `unicode-range` subsets: EB Garamond (variable, normal and italic) and
  Manrope (variable) in the Latin subset; Amiri (400) and IBM Plex Sans Arabic (400, 600) in the
  Arabic subset. Each page downloads only its own language's fonts: Latin characters inside
  Arabic text (the email address, "EN", "© 2026") and the "عربي" label on the English page use
  system fonts. Each page preloads its heading font. `tools/fetch-fonts.mjs` documents and repeats
  the download if fonts ever need refreshing. Fallbacks: Georgia/serif and system UI fonts; Tahoma
  for Arabic.
- **Rationale**: FR-033 (no third-party requests while a page loads) and Principle VI (brand
  typefaces). It also saves a connection to another server, which helps Principle V.
- **Revision (2026-10-29)**: the first version also loaded Amiri Bold and the Latin subset of
  IBM Plex Sans Arabic, and the English page loaded IBM Plex Sans Arabic SemiBold for its one
  Arabic word. The Lighthouse runs for T062 showed the fonts were what kept mobile Performance
  under 90, so Arabic headings now use Amiri Regular only and those three faces were dropped
  (recorded in DESIGN.md first, Principle VI).
- **Alternatives considered**: loading from the Google Fonts service (rejected in clarify: every
  visit would contact Google); system fonts only (breaks brand fidelity).

## R5. Navigation, menu and working without scripts

- **Decision**: `<html class="no-js">` becomes `js` through a one-line inline script. Without
  scripts, the navigation shows as a plain stacked list on small screens and the menu button stays
  hidden. With scripts, below 1024 px the menu button (`aria-expanded`, `aria-controls`) opens the
  menu panel, which slides in from the inline-end edge and acts as a modal dialog: focus is kept
  inside, Escape closes it, as do a backdrop tap, choosing a link or the close button, focus returns
  to the button (or, after a section link, moves to that section), and the page behind does not
  scroll. The section in view is marked with
  `aria-current="true"` (IntersectionObserver). Language links get the current section appended
  (for example `/ar/#mission`). Smooth scrolling only applies under
  `prefers-reduced-motion: no-preference`, and `scroll-margin-top` keeps headings clear of the
  sticky header.
- **Rationale**: FR-022 to FR-026, Principles III and IV.
- **Revision (2026-10-29, T062)**: `script.js` now loads with `async` (it comes after all the
  content, so everything it uses is already parsed), and the inline `no-js` script sits just after
  the stylesheet, so the browser reads the rest of the page once the styles are in and lays it out
  once, styled. The current section is watched with a band at the middle of the screen set in
  percentages, so the script never measures the header and needs no ResizeObserver, and the
  header hairline is set only on scroll (a page opened at a section link scrolls there too).
  Before, the deferred script ran in the same task as the browser's first layout, and
  Lighthouse's simulation counted that layout as blocking time.
- **Alternatives considered**: a CSS-only checkbox menu (weak accessibility); a `<details>` menu (no
  focus containment or backdrop); no menu at all (fails FR-023).

## R6. Web image pipeline

- **Decision**: `tools/make-web-images.ps1` (Windows PowerShell 5.1 with the built-in
  System.Drawing library) reads the originals in `images/`, never modifies them, and writes JPEG
  copies to `images/web/<name>-<width>.jpg`. Quality starts at 82 and steps down (not below 60)
  until each file is at most 280 KB, leaving headroom under the 300 KB limit; metadata is dropped.
  The hero uses art direction: a 3:2 landscape crop from 640 px up and a 4:5 portrait crop for
  phones. Widths: hero landscape 960/1440/1920, hero portrait 480/800/1080, women 480/800/1080,
  youth 480/800/1200, community 640/1280/1440 (women and community capped so they fit the
  budget; found when the script first ran). Pages use `<picture>`, `srcset` and `sizes` with explicit
  `width`/`height`; images below the first screen get `loading="lazy" decoding="async"`, and the
  hero gets `fetchpriority="high"` plus a matching `<link rel="preload" as="image" imagesrcset>`.
- **Revision (2026-10-29, T072)**: Principle V asks for modern-format copies, so
  `tools/make-webp.mjs` (Node built-ins) now makes a WebP copy of every photo and logo file: it
  serves a local page to headless Microsoft Edge or Chrome, which encodes each JPEG/PNG web copy
  with the browser's own WebP encoder (quality 0.8 for photos, 0.9 for logos, stepping down until
  the WebP is smaller) and posts it back. Each `<picture>` lists the WebP copies first and keeps the
  JPEG/PNG as the fallback; the hero preloads point at the WebP files with `type="image/webp"`.
  WebP saves 33–47% on most photos, 4–21% on the already heavily compressed women and Amman
  photos, and about 85% on the logos. The sharing image stays JPEG and the icons PNG/ICO.
- **Revision (2026-10-29, T062)**: `make-webp.mjs` now starts the Amman band copies and the phone
  hero copies at quality 0.5 (both photos sit under a solid 82% overlay there, so the softer
  encoding is not visible) and the women photo at 0.7. That saves 12–39% on the women and band
  photos instead of 4–21%, and 58–72% on the phone hero (the 800 px copy went from 61 KB to
  35 KB). Phones get the 640 px band copy (R13).
- **Rationale**: FR-015, Principle V (web-sized, modern-format copies and budgets) with no
  package installs (Principle VII); originals stay untouched.
- **Alternatives considered**: WebP/AVIF through sharp, Squoosh or cwebp (needs a package
  download); encoding from the originals in the browser (would duplicate the crop rules of the
  PowerShell script, so the WebP copies are made from the finished JPEG/PNG copies instead, which
  showed no visible loss); AVIF (Chromium's canvas cannot encode it); image optimization in a
  GitHub Actions workflow (adds a pipeline); a CSS background hero (no description, later
  discovery by the browser).

## R7. Logo assets

- **Decision**: The same script derives: (a) the header mark, cropped from `images/logo.jpg` to the
  bounding box of non-white pixels above the built-in wordmark, as PNG at 64, 128 and 192 px tall;
  (b) the complete logo for the footer at 240 and 480 px wide; (c) icons: `favicon.ico` (32 and
  48 px PNG images inside one ICO file), `apple-touch-icon.png` (180 px) and
  `images/icons/icon-192.png` / `icon-512.png` (mark centered on white with padding); (d) the share
  image `images/web/og-image.jpg` at 1200×630, the complete logo centered on Paper White.
- **Rationale**: Constitution 1.1.0 Principle VI (the header mark is the only approved crop),
  FR-013, FR-029 and FR-031. White backgrounds match the artwork, so no transparency is needed.
- **Alternatives considered**: tracing the logo to SVG (fidelity risk, manual work); cutting out the
  white background (halo artifacts against the cream tones).

## R8. Search, sharing and structured data

- **Decision**: Every page has `<title>`, a meta description, `<link rel="canonical">`, `hreflang`
  alternates (`en`, `ar`, `x-default`), Open Graph tags (`og:type`, `og:site_name`, `og:title`,
  `og:description`, `og:url`, an absolute `og:image` with width, height and alt text, `og:locale`
  with `og:locale:alternate`) and a Twitter `summary_large_image` card. JSON-LD describes one `NGO`
  (`@id` `https://www.wecan-jo.org/#organization`) with name, `alternateName`
  "جمعية نحن نستطيع", url, logo, image, email, address (Amman, JO), `areaServed` Jordan, the four
  founders as `Person` entries with job titles, and a description in the page's language. The site
  also gets `sitemap.xml` (both addresses with `xhtml:link` alternates), `robots.txt` (allow all,
  sitemap link), `site.webmanifest` and `theme-color` `#2F4A35`. Exact values are in
  [contracts/seo-and-sharing.md](contracts/seo-and-sharing.md).
- **Rationale**: FR-028 to FR-031, Principle V, User Story 6.
- **Alternatives considered**: microdata attributes (harder to maintain); external JSON-LD files
  (not read by search engines).

## R9. Keeping project files off the public site

- **Decision**: Keep GitHub Pages' default Jekyll processing and add `_config.yml` with an
  `exclude:` list for `specs/`, `DESIGN.md`, `README.md` and `tools/`. Jekyll already skips dot
  folders (`.specify/`, `.claude/`). After deployment, confirm that `/DESIGN.html`, `/README.html`
  and `/specs/` return 404.
- **Rationale**: FR-032. A `.nojekyll` file would publish the Markdown files as raw text instead.
- **Alternatives considered**: moving the site into `/docs` (changes Pages settings and the repo
  layout); `.nojekyll` (publishes everything).

## R10. Contact placeholders and activation

- **Decision**: Each placeholder is a non-interactive card with a visible "Coming soon" /
  "قريبًا" badge and visually hidden text for screen readers ("not available yet"), with no link and
  no tab stop. The form placeholder is a `<form>` without `action` around a
  `<fieldset disabled>`, so its controls are skipped by the keyboard and nothing can be submitted.
  Every placeholder sits between `<!-- PLACEHOLDER:<channel> START -->` and `END` comments in both
  pages, and `README.md` holds the step-by-step activation guide. The markup patterns are in
  [contracts/placeholders.md](contracts/placeholders.md).
- **Rationale**: FR-009 and FR-010 (as clarified), FR-026, Principle I.
- **Alternatives considered**: a script-driven settings file (rejected in clarify: fails without
  scripts); hiding placeholders (the organization asked to show them).

## R11. Founder initials in Arabic

- **Decision**: Arabic initials are two letters separated by U+200C (zero-width non-joiner) so they
  render as separate letters: إ‌د، م‌ع، ع‌د، ع‌ش. English initials: ID, MO, AD, ES. Badges are
  `aria-hidden="true"` because the name follows as text.
- **Rationale**: FR-007 and User Story 4 scenario 5. Without the non-joiner, letters join and can
  read as words (for example "مع").
- **Alternatives considered**: dotted initials such as "م.ع" (acceptable but busier).

## R12. Verification tooling (no installs)

- **Decision**:
  - `tools/preview-server.js` (Node built-ins only) serves the site locally on port 5500.
  - `tools/check-site.mjs` (Node built-ins only) checks both pages: required head tags, `hreflang`
    pairs, identical section IDs, `alt`/`width`/`height` on every image, internal links and anchors,
    referenced files exist, image budgets (300 KB each), first-load weight (1.5 MB), placeholders
    contain no links or focusable controls, `_config.yml` exclusions, and that JSON-LD parses.
  - Accessibility: axe-core 4.x loaded from cdnjs into the page in the in-app browser, at each width
    and in each language; zero violations required.
  - HTML validation: the W3C Nu HTML Checker web service (pages contain only public content).
  - Lighthouse: Microsoft Edge DevTools (installed) against the local preview with mobile
    emulation. `npx lighthouse` is an alternative only with the organization's OK for the download.
  - Visual checks: the in-app browser at 390, 768, 1280 and 1440 px in both languages; the
    no-scripts state is checked by removing the `js` class.
- **Rationale**: These are the constitution's release gates, and none of them adds a package needed
  to edit or publish the site (Principle VII).
- **Alternatives considered**: Playwright, pa11y or html-validate through npm (downloads; may be
  adopted later).

## R13. Performance budget

- **Decision**: Phone hero image at most 120 KB (800 px), fonts at most 350 KB per page, CSS at
  most 32 KB uncompressed, script at most 8 KB, no other render-blocking requests; Largest
  Contentful Paint at most 2.5 s under Lighthouse mobile throttling.
- **Rationale**: SC-005, SC-006 and SC-007.
- **Revision (2026-10-29)**: the CSS limit was 25 KB. With the menu panel, the contact
  placeholders, the right-to-left rules and the styles for switched-on channels the commented
  stylesheet is about 28 KB (about 7 KB as served compressed), and first loads stay far below the
  1.5 MB target (about 450 KB English, 630 KB Arabic). Stripping the comments would save little and
  make the file harder for the organization to maintain, so the limit moved to 32 KB.
- **Revision (2026-10-29, T062)**: the phone hero copy was 720 px wide. Lighthouse's test phone
  (412 px wide at 1.75x) needs 721 px, so it skipped the 720 px copy and downloaded the 1080 px
  one; the middle copy is now 800 px (35 KB as WebP, R6). Each page also stopped downloading the
  other language's fonts (R4). On a phone the women, Amman and youth photos sit within the
  browser's lazy-loading distance, so they download before the first paint and share the slow
  connection with the hero in Lighthouse's simulation; below 640 px the Amman band therefore uses
  its 640 px copy (48 KB instead of 167 KB as WebP).

## R14. Replacing the current site files

- **Decision**: Rewrite `index.html`, `styles.css` and `script.js` in place, add `ar/index.html`,
  keep `CNAME`, and keep the originals in `images/`.
- **Rationale**: Minimal churn, and the existing addresses stay valid.

## R15. Deployment and HTTPS

- **Decision**: Merge `001-bilingual-landing-page` into `main` only after UAT passes and the
  organization approves, then verify the live site. Canonical addresses use
  `https://www.wecan-jo.org/`; the organization is advised to turn on "Enforce HTTPS" in the
  repository's Pages settings (currently off).
- **Rationale**: The constitution's workflow gates and a consistent canonical scheme.

## R16. Privacy

- **Decision**: No analytics, cookies, local storage, third-party scripts or any other request to a
  third-party server while a page loads; every file, fonts included, comes from
  `www.wecan-jo.org`.
- **Rationale**: FR-033 (as clarified) and the constitution's privacy constraint.
