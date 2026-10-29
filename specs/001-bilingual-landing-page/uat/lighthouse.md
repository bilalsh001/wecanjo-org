# Lighthouse results (T062)

Target (constitution, Principle V; SC-006): Performance, Accessibility, Best Practices and SEO each
at least 90 on mobile, in both languages.

## Scores

| Page | Performance | Accessibility | Best Practices | SEO | Run by, date |
|------|-------------|---------------|----------------|-----|--------------|
| English `/` | **94** (94 in all five runs) | 100 | 100 | 100 | Project team, 2026-10-29 |
| Arabic `/ar/` | **91** (91 in all five runs) | 100 | 100 | 100 | Project team, 2026-10-29 |

Median of five runs per page with the Lighthouse 13.6.0 command-line tool in its standard mobile
configuration (Moto G Power screen, simulated slow 4G, processor slowed 4×), driving Microsoft
Edge 156 against the local preview (`node tools/preview-server.js`, which compresses HTML, CSS and
JavaScript the way GitHub Pages does). The tool was downloaded to a temporary folder with the
organization's OK and removed afterwards.

Timings in Lighthouse's estimate for a mid-range phone on slow 4G (median runs):

| Measure | English | Arabic | Target |
|---------|---------|--------|--------|
| First Contentful Paint: the hero headline is visible | 0.9 s | 0.9 s | at most 2.5 s (SC-005) |
| Largest Contentful Paint: the hero photo | 3.1 s | 3.5 s | at most 2.5 s (plan goal, not met, see below) |
| Total Blocking Time: how long taps could be held up while loading | 10 ms | 10 ms | at most 200 ms (SC-005) |
| Longest single task after the first paint | 50–230 ms | 50–220 ms | |
| Cumulative Layout Shift | 0 | 0.009 | at most 0.1 |
| Speed Index | 0.9 s | 0.9 s | |

**Largest Contentful Paint stays above the plan's 2.5 s goal.** In Lighthouse's simulation the
hero photo counts as painted only once the brand fonts, and the photos that start loading before
the first paint, have come through the slow connection. The spec's own targets are met (headline
visible within 2.5 s, scores at least 90). Closing the gap would mean lighter brand fonts on the
Arabic page (Amiri alone is 106 KB) or lighter photos just below the first screen on phones, which
is a design decision for the organization.

## What changed to reach 90

The first runs scored 80–81 (English) and 76–78 (Arabic) for Performance; the other three
categories were already 100.

| Change | Effect |
|--------|--------|
| The preview server compresses HTML, CSS and JavaScript | GitHub Pages already does this, so the test now matches the live site |
| `script.js` loads with `async`, the inline `no-js` script follows the stylesheet, and current-section tracking no longer measures the header (research R5) | The browser lays the page out once, styled, without tying that work to the script; this removed nearly all of the blocking time |
| Arabic headings use Amiri Regular only (DESIGN.md) | The Amiri Bold file (98 KB) is no longer downloaded |
| Each page downloads only its own language's fonts (DESIGN.md) | 45 KB less on English (IBM Plex Sans Arabic SemiBold for the one Arabic word), 39 KB less on Arabic (IBM Plex Sans Arabic's Latin files) |
| Phone hero copy 800 px wide instead of 720 px | Lighthouse's phone (412 px at 1.75×) needs 721 px, so it took the 1080 px copy |
| Phone hero and Amman band compressed harder; both sit under a solid 82% overlay on phones (research R6) | The phone hero went from 61 to 35 KB |
| Phones get the 640 px Amman band copy | 48 KB instead of 167 KB before the first paint |

## About the numbers

- Lighthouse estimates phone timings by simulation: it loads the page at full speed, records what
  happened, then replays it over a modelled slow 4G connection with a processor four times slower
  than the test computer's.
- The test computer is a Surface Pro 7 with a 15 W processor that slows down as it heats up.
  Lighthouse's own processor benchmark for it ranged from 365 to 2,445 during this work, and in
  back-to-back runs Lighthouse warned that the computer was slower than it expects, which lowers
  the Performance score. With a 45-second pause between runs the benchmark stayed between 2,238
  and 2,391 and no warning appeared; the scores above come from those runs.
- On a phone the women, Amman and youth photos sit within the distance at which the browser starts
  loading lazy images, so they load before the first paint and share the slow connection with the
  hero photo in the simulation. That is why the phone copies of the band and hero matter.
- The live site is served by GitHub Pages over HTTP/2, so its scores will differ somewhat. After
  launch, run both pages through PageSpeed Insights (pagespeed.web.dev), which runs the same
  Lighthouse on Google's computers, and add the results below.

## After launch: PageSpeed Insights

| Page | Performance | Accessibility | Best Practices | SEO | Date |
|------|-------------|---------------|----------------|-----|------|
| English `https://www.wecan-jo.org/` | | | | | |
| Arabic `https://www.wecan-jo.org/ar/` | | | | | |

## How to run it again

1. Start the local preview (`node tools/preview-server.js . 5500`) or, after launch, use the live
   site (or simply PageSpeed Insights).
2. Open the page in Microsoft Edge, press F12, choose the Lighthouse tab (under the `»` menu if it
   is hidden).
3. Mode "Navigation", Device "Mobile", all four categories ticked; select "Analyze page load".
4. Compare with the scores above. Run it a few times with a pause in between: a laptop that is
   busy or warm scores lower. Anything consistently below 90 goes back to the project team with the
   Lighthouse report.

## Page weight and checks (final runs)

| Measure | English `/` | Arabic `/ar/` |
|---------|-------------|---------------|
| Requests on first load (phone) | 13 | 13 |
| Data transferred on first load (phone, compressed) | 396 KB | 475 KB |
| Fonts downloaded | 114 KB (3 files) | 193 KB (3 files) |
| Hosts contacted | the site only | the site only |
| Render-blocking files | `styles.css` | `styles.css` |
| Accessibility scan (axe-core, WCAG 2.2 AA) at 390 and 1280 px | 0 violations | 0 violations |
| `node tools/check-site.mjs` (all groups, including budgets) | pass | pass |

Every photo and logo is served as WebP (JPEG/PNG fallback); the hero photo is preloaded per screen
size and every other photo is lazy-loaded with width and height; fonts are self-hosted with
`font-display: swap` and the heading font preloaded; there is one stylesheet and one small
asynchronous script, and nothing from other sites.
