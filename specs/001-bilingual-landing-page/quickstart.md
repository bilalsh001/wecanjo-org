# Quickstart: run and validate the bilingual landing page

How to preview the site locally and prove each user story works. Details live in the contracts;
this guide only says what to run and what to expect.

## Prerequisites

- Windows with Git for Windows (Git Bash) and Windows PowerShell 5.1 (built in).
- Node.js 22 or later (local preview server and `check-site` only; nothing to install from npm).
- Microsoft Edge (for Lighthouse in DevTools).
- A checkout of `bilalsh001/wecanjo-org` on branch `001-bilingual-landing-page`.

## 1. Regenerate web images (only when an original photo or the logo changes)

```bash
powershell -NoProfile -ExecutionPolicy Bypass -File tools/make-web-images.ps1
```

```bash
node tools/make-webp.mjs
```

Expected: the files listed in [contracts/assets.md](contracts/assets.md) exist under `images/web/`,
`images/icons/` and the site root; each JPEG is at most 300 KB; every photo and logo file has a
smaller `.webp` copy (the second command uses Microsoft Edge or Chrome in the background, no
installs); `git status` shows no change to the originals in `images/`.

## 2. Preview locally

```bash
node tools/preview-server.js . 5500
```

Open `http://localhost:5500/` (English) and `http://localhost:5500/ar/` (Arabic).

## 3. Automated checks

```bash
node tools/check-site.mjs
```

Expected: `All checks passed` with zero failures (head tags, hreflang pairs, section parity, image
attributes and budgets, internal links, placeholders, `_config.yml` exclusions, JSON-LD).

## 4. Accessibility, HTML and Lighthouse

| Check | How | Pass when |
|-------|-----|-----------|
| axe-core | In the in-app browser, load axe-core 4.x from cdnjs into the page and run `axe.run()` at 390, 768, 1280 and 1440 px, on both pages | Zero violations |
| HTML validity | Submit each page's HTML to the W3C Nu HTML Checker | Zero errors |
| Lighthouse | Edge DevTools, Lighthouse, Mobile, all categories, on both preview pages | Each category at least 90 |
| Without scripts | Remove the `js` class from `<html>` (or block scripts) and reload | All content visible; navigation links reachable on narrow screens |

## 5. Validation scenarios

| Story | Steps | Expected outcome |
|-------|-------|------------------|
| US1 Discover | Open `/` at 390 px and 1280 px; read the first screen; choose "Learn about us"; scroll | Logo mark and name prominent; approved headline and sentence; page moves to "Who we are"; About, Vision and Mission texts match [content.md](contracts/content.md) word for word |
| US2 Founders | Go to Founders | Four cards with initials badges and the exact names, credentials and roles |
| US3 Contact | Choose "Contact us"; select the email; Tab through the section | New email to info@wecan-jo.org; "Amman, Jordan" shown; the three placeholders show "Coming soon" and receive no keyboard focus |
| US4 Arabic | Select "عربي" while viewing Founders; then select "EN" | Arabic page opens at Founders, right-to-left, with "جمعية نحن نستطيع", Arabic initials and the confirmed founder names; the email reads left-to-right; English returns |
| US5 Navigation | At 390 and 768 px open the menu; press Tab repeatedly, then Escape; open again and tap outside; at 1280 px scroll through sections | Focus stays in the panel; Escape and tapping outside close it and focus returns to the button; at 1280 px the current section is underlined; no horizontal scrolling at any width |
| US6 Search and share | View page source of both pages; validate JSON-LD with a structured-data checker; after launch, test both addresses in a link-preview checker | Titles, descriptions, canonical, alternates and Open Graph values match [seo-and-sharing.md](contracts/seo-and-sharing.md); preview shows name, description and the logo image |

## 6. Release checklist

1. All checks above pass on the feature branch; UAT for the General public role is executed and
   documented with no open critical or major defects, and the organization runs the SC-001
   hallway test (at least 5 people new to the site).
2. The organization approves the preview (English content approved; Arabic reviewed after launch).
3. Merge `001-bilingual-landing-page` into `main` and push (only with the organization's OK).
4. After GitHub Pages finishes building, verify on `https://www.wecan-jo.org`: `/` and `/ar/`
   load; `/sitemap.xml` and `/robots.txt` are served; `/DESIGN.html`, `/README.html` and `/specs/`
   return 404; the link preview shows correctly.
5. Recommend turning on "Enforce HTTPS" in the repository's Pages settings.
6. Within 2 weeks of launch, the organization's site coordinator reviews the Arabic text; apply the
   corrections and mark each item `reviewed` in `README.md`.
