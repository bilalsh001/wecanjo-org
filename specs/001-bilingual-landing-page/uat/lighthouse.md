# Lighthouse results (T062)

Target (constitution, Principle V; SC-006): Performance, Accessibility, Best Practices and SEO each
at least 90 on mobile, in both languages.

## Scores

Lighthouse runs inside Microsoft Edge DevTools, which the project's automated browser cannot open,
so the scores below are filled in by whoever runs it (about two minutes per page).

| Page | Performance | Accessibility | Best Practices | SEO | Run by, date |
|------|-------------|---------------|----------------|-----|--------------|
| English `/` | _pending_ | _pending_ | _pending_ | _pending_ | |
| Arabic `/ar/` | _pending_ | _pending_ | _pending_ | _pending_ | |

### How to run it

1. Start the local preview (`node tools/preview-server.js . 5500`) or, after launch, use the live
   site.
2. Open the page in Microsoft Edge, press F12, choose the Lighthouse tab (under the `»` menu if it
   is hidden).
3. Mode "Navigation", Device "Mobile", all four categories ticked; select "Analyze page load".
4. Write the four scores in the table above. Anything below 90 goes back to the project team with
   the Lighthouse report.

## Local measurements so far (2026-10-29)

Taken in the project's browser at 390 × 844 px without network throttling, so they show page
structure, not timing on a slow connection.

| Measure | English `/` | Arabic `/ar/` |
|---------|-------------|---------------|
| Requests on first load | 9 | 11 |
| Data for the first screen on a phone (uncompressed) | 325 KB (434 KB before WebP) | 497 KB (606 KB before WebP) |
| Hosts contacted | the site only | the site only |
| Render-blocking files | `styles.css` | `styles.css` |
| Layout shift (CLS) | 0 | 0 |
| Accessibility scan (axe-core, WCAG 2.2 AA) | 0 violations | 0 violations |
| Search checks (`check-site --group seo`) | pass | pass |
| Size budgets (`check-site --group budgets`) | pass | pass |

What supports a good score: every photo and logo is served as WebP (JPEG/PNG fallback); the hero
photo is preloaded per screen size and every other photo is lazy-loaded with width and height;
fonts are self-hosted with `font-display: swap` and the heading font preloaded; there is one
stylesheet and one deferred script, and nothing from other sites.
