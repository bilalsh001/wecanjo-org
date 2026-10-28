# Implementation Plan: Bilingual Landing Page for We Can Organization

**Branch**: `001-bilingual-landing-page` | **Date**: 2026-10-28 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/001-bilingual-landing-page/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

Replace the current single English page with an elegant, bilingual (English and Arabic)
single-page site for We Can Organization that follows the approved Stitch designs and `DESIGN.md`:
hero, Who we are, Our vision, Our mission, Founders and Contact (email live; phone/WhatsApp, social
and form as "coming soon" placeholders), a prominent logo (WC mark beside the typeset name in the
header, complete logo in the footer), a menu button below 1024 px, and complete search and sharing
metadata.

Technical approach: two hand-written static HTML pages (`/` and `/ar/`) sharing one mobile-first
stylesheet built on logical CSS properties (so Arabic mirrors automatically) and one small
progressive-enhancement script; web-sized photo and logo copies generated once by a PowerShell
script using built-in Windows imaging; everything published as-is by GitHub Pages with no build
step. See [research.md](research.md) for the decisions behind each choice.

## Technical Context

**Language/Version**: HTML5, CSS (custom properties, logical properties), JavaScript ES2020 with no
transpiling; Windows PowerShell 5.1 for the image script; Node.js 22 for local tooling only

**Primary Dependencies**: None at runtime except Google Fonts (EB Garamond, Manrope, Amiri, IBM Plex
Sans Arabic). Tooling uses only built-in modules (Node) and System.Drawing (PowerShell)

**Storage**: N/A (static files in the repository)

**Testing**: `tools/check-site.mjs` (structure, metadata, parity, links, budgets, placeholders),
axe-core 4.x in the in-app browser, W3C Nu HTML Checker, Lighthouse in Microsoft Edge DevTools,
viewport checks at 390/768/1280/1440 px in both languages, and UAT scripts for the General public
role

**Target Platform**: GitHub Pages at `https://www.wecan-jo.org` (custom domain via `CNAME`); the
latest two versions of Chrome, Edge, Firefox and Safari on desktop and mobile

**Project Type**: Static bilingual website (one landing page per language)

**Performance Goals**: Largest Contentful Paint at most 2.5 s on Lighthouse mobile; Lighthouse
Performance, Accessibility, Best Practices and SEO at least 90 on both pages

**Constraints**: No build step or package installs to edit or publish; all content usable without
scripts; WCAG 2.2 AA; no tracking or cookies; each image at most 300 KB; first load at most 1.5 MB;
original photos never modified

**Scale/Scope**: 2 pages × 6 sections, 4 founders, 4 photos plus the logo; low traffic

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Checked against constitution **v1.1.0**.

| Principle / rule | How the plan complies | Pre-design | Post-design |
|------------------|-----------------------|------------|-------------|
| I. Accurate, Approved Content | Every visible string comes from [contracts/content.md](contracts/content.md) (approved English; Arabic draft except the confirmed name and founders); Stitch's invented helper copy is excluded; placeholders are non-interactive; Arabic draft status is tracked in `README.md` | PASS | PASS |
| II. Bilingual Parity with Native RTL | Two pages with identical section IDs; `lang`/`dir` set; `hreflang` alternates; language switch in header and menu; photos and logo not mirrored | PASS | PASS |
| III. Accessible to Everyone (WCAG 2.2 AA) | Landmarks, one `h1`, skip link, focus rings, 44 px targets, dialog-style menu with focus containment and Escape, reduced motion respected; axe must report zero violations | PASS | PASS |
| IV. Responsive and Mobile-First | Mobile-first CSS with breakpoints at 640/1024/1440 px; menu button below 1024 px; verified at the four design widths in both languages | PASS | PASS |
| V. Fast, Findable and Shareable | Static pages readable without scripts; generated web copies at most 300 KB with `srcset`, dimensions and lazy loading; full metadata, JSON-LD, sitemap, robots and icons; Lighthouse at least 90 | PASS | PASS |
| VI. Brand Fidelity | `DESIGN.md` tokens drive the CSS; the header WC mark is the one approved crop; the complete logo is in the footer; no recoloring or distortion | PASS | PASS |
| VII. Simple and Maintainable | No framework, build step or npm package; Google Fonts justified in R4; tools use built-ins only; placeholders and Arabic status documented in `README.md` | PASS | PASS |
| Technology & Hosting Constraints | GitHub Pages from `main` with `CNAME` kept; `_config.yml` excludes project files; no tracking or cookies; browser support as listed | PASS | PASS |
| Development Workflow & Quality Gates | Work on the feature branch; local preview; release gates and UAT in [quickstart.md](quickstart.md); merge to `main` only with approval; originals never overwritten | PASS | PASS |

No violations, so Complexity Tracking is empty.

## Project Structure

### Documentation (this feature)

```text
specs/001-bilingual-landing-page/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
│   ├── content.md           # every English and Arabic string and image description
│   ├── page-structure.md    # outline, navigation, menu, layout by width, RTL, accessibility
│   ├── seo-and-sharing.md   # head metadata, JSON-LD, sitemap, robots, manifest, _config.yml
│   ├── assets.md            # generated images, logo variants, icons, budgets
│   └── placeholders.md      # "coming soon" markup and activation steps
├── design/              # approved Stitch exports (reference only)
├── checklists/
│   └── requirements.md  # spec quality checklist (/speckit-specify)
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)

The repository root is the published site: GitHub Pages serves `main` as-is.

```text
index.html               # English page (rewritten)
ar/
└── index.html           # Arabic page (new, right-to-left)
styles.css               # shared stylesheet (rewritten)
script.js                # progressive enhancement: menu, active section, language hash (rewritten)
images/                  # originals (unchanged): hero, women, community, youth, logo
├── web/                 # generated photo copies, logo mark, complete logo, og-image.jpg
└── icons/               # icon-192.png, icon-512.png
favicon.ico
apple-touch-icon.png
site.webmanifest
robots.txt
sitemap.xml
CNAME                    # unchanged (www.wecan-jo.org)
_config.yml              # keeps specs/, tools/, DESIGN.md, README.md off the site
README.md                # maintainer guide: preview, placeholders, Arabic status (not published)
tools/
├── make-web-images.ps1  # generates images/web, icons and the share image from the originals
├── check-site.mjs       # automated structure, metadata, budget and placeholder checks
└── preview-server.js    # local preview on port 5500
```

**Structure Decision**: A flat static site at the repository root, because GitHub Pages publishes
`main` directly and the constitution forbids a build step. Shared assets use root-relative paths
so the Arabic page in `ar/` reuses them. Tooling lives in `tools/` and documentation in `README.md`
and `specs/`, all excluded from publishing by `_config.yml`.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations; nothing to justify.
