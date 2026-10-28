# We Can Organization Website Constitution

## Core Principles

### I. Accurate, Approved Content (NON-NEGOTIABLE)

- Every statement about the organization, its people and its work MUST come from content the
  organization supplied or approved. No invented statistics, programs, partners, testimonials,
  locations or claims.
- Names, titles and credentials MUST match the approved source exactly (for example,
  "Broccoli Not for Profit Organization").
- Information that does not exist yet (phone/WhatsApp, social media, contact form) MUST appear
  only as clearly labelled "coming soon" placeholders that are non-interactive and never imply
  they work.
- Arabic translations drafted by the project team MAY go live with the English version before
  the organization reviews them, but only once the organization has confirmed its registered
  Arabic name and the founders' names. The draft status MUST be tracked in the project files
  (never shown to visitors), and corrections MUST be applied once the review is done.

Rationale: a newly registered NGO's credibility depends on everything on its website being true.

### II. Bilingual Parity with Native Right-to-Left

- The site MUST offer English and Arabic with equivalent content: every section, heading,
  label, link text, image description and metadata item exists in both languages.
- Arabic pages MUST be fully right-to-left (`lang="ar" dir="rtl"`) with mirrored layout and
  navigation. Photographs and the logo MUST NOT be mirrored.
- Each language version MUST have its own stable URL, link to its counterpart, and be declared
  to search engines with `hreflang` alternates.
- The language switch MUST be visible on every page and in the mobile menu.

Rationale: the organization serves Arabic-speaking women and youth in Jordan as well as
English-speaking partners and funders.

### III. Accessible to Everyone (WCAG 2.2 AA)

- Pages MUST meet WCAG 2.2 Level AA: semantic landmarks and heading order, text contrast of at
  least 4.5:1 (3:1 for large text), visible focus indicators, full keyboard operation (including
  the mobile menu with focus containment and Escape to close), meaningful alternative text, and
  touch targets of at least 44×44 px.
- Motion MUST respect `prefers-reduced-motion`, and no content or control may depend on hover
  alone.

Rationale: visitors include people of all ages, abilities, connection speeds and devices.

### IV. Responsive and Mobile-First

- Layouts MUST be built mobile-first and work without horizontal scrolling from 320 px phones
  to large desktop monitors.
- Below 1024 px the navigation MUST collapse into a menu button that opens a menu panel; at
  1024 px and wider the full navigation is shown.
- Every release MUST be verified at the four approved design widths (390, 768, 1280 and
  1440+ px) in both languages.

Rationale: most visitors in Jordan browse on phones, and the header must stay uncluttered on
small screens.

### V. Fast, Findable and Shareable

- The site MUST be static HTML, CSS and minimal vanilla JavaScript served by GitHub Pages; all
  core content MUST remain readable with JavaScript disabled.
- Images MUST be served from web-sized, modern-format copies with explicit dimensions, and
  lazy-loaded below the first screen. Original image files MUST be kept unmodified.
- Every page MUST ship complete search and sharing metadata: unique title and description,
  canonical URL, `hreflang` alternates, Open Graph and Twitter Card tags, schema.org structured
  data for the organization, favicon and touch icons, plus site-wide `robots.txt` and
  `sitemap.xml`.
- Targets on mobile: Lighthouse Performance, Accessibility, Best Practices and SEO scores of at
  least 90; no single image larger than 300 KB; first-load page weight of at most 1.5 MB.

Rationale: speed and discoverability are how a new NGO gets found, shared and trusted.

### VI. Brand Fidelity

- Visual design MUST follow `DESIGN.md` and the approved Stitch designs: the logo palette
  (Leaf Green `#597E52`, Deep Grove `#2F4A35`, Sage `#A0AD87`, Sandstone Cream `#E7DCB8`, Paper
  White `#FAF8F2`), EB Garamond and Manrope for English, Amiri and IBM Plex Sans Arabic for
  Arabic.
- The logo MUST be displayed prominently and MUST NOT be distorted or recoloured. The complete
  logo, exactly as supplied, MUST appear on the site (in the footer). The only approved crop is
  the header variant: the logo's "WC" mark on its own (trimmed from the supplied artwork, without
  its built-in text) beside the organization's name set in the heading typeface. Any other crop
  or variant requires a constitution amendment.
- Any intentional departure from `DESIGN.md` MUST be made in `DESIGN.md` first.

Rationale: a consistent identity builds recognition and trust.

### VII. Simple and Maintainable

- Editing or publishing the site MUST NOT require a build step, framework or package install.
  Every third-party asset (such as web fonts) MUST be justified in the plan.
- Content and placeholder values MUST live in clearly marked, documented places so a
  non-developer can update them safely.
- Prefer fewer files and plain conventions over abstraction; build only what the spec requires.

Rationale: the organization's own team must be able to keep the site current.

## Technology & Hosting Constraints

- Hosting: GitHub Pages from the `main` branch of `bilalsh001/wecanjo-org`, served at
  `https://www.wecan-jo.org` (the `CNAME` file MUST be preserved).
- Stack: HTML5, CSS with custom properties, and vanilla JavaScript; no runtime dependencies.
  Google Fonts is permitted for the brand typefaces.
- Repository hygiene: specification and design artifacts (`specs/`, `.specify/`, `.claude/`,
  `DESIGN.md` and similar) MUST NOT be published as public pages.
- Privacy: no tracking, cookies or third-party analytics without the organization's explicit
  approval, and no personal data collection until a contact form is approved.
- Browser support: the latest two versions of Chrome, Edge, Firefox and Safari on desktop and
  mobile.

## Development Workflow & Quality Gates

- All work happens on a numbered feature branch; `main` reflects only what is live.
- Every change is previewed locally in English and Arabic at all four design widths before
  review.
- Nothing is merged or pushed to `main` (and therefore published) without the organization's
  explicit approval after reviewing the preview.
- Release gates: HTML validation, link checks, an automated accessibility audit and Lighthouse
  checks pass, and user acceptance testing (UAT) for the agreed user roles (currently: General
  public) is executed with documented results.
- Original image assets are never overwritten; web copies are regenerated from the originals.

## Governance

- This constitution supersedes other practices for this repository. Every plan MUST include a
  Constitution Check, and `/speckit-analyze` treats any conflict with a MUST rule as CRITICAL.
- Amendments are proposed through `/speckit-constitution` with a written rationale, approved by
  the organization, and versioned semantically: MAJOR for removing or redefining a principle,
  MINOR for adding a principle or section or materially expanding guidance, PATCH for wording
  and clarifications.
- Compliance is reviewed at three points: the plan's Constitution Check, `/speckit-analyze`
  before implementation, and UAT sign-off before release.
- Visual guidance lives in `DESIGN.md`; technical guidance for active work lives in the current
  feature's `plan.md`.

**Version**: 1.1.0 | **Ratified**: 2026-10-28 | **Last Amended**: 2026-10-28
