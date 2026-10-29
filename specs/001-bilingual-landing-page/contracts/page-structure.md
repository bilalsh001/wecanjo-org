# Page Structure Contract

Both pages (`/` and `/ar/`) follow this structure. Only the language attributes, the text
(see [content.md](content.md)) and the head metadata (see [seo-and-sharing.md](seo-and-sharing.md))
differ.

## Document outline

```text
<html lang="en|ar" dir="ltr|rtl" class="no-js">
  head: metadata, preload of this page's heading font and the hero image, styles.css (includes
        the self-hosted @font-face rules), then the inline script that swaps "no-js" for "js"
        (after the stylesheet on purpose: the browser then reads the rest of the page once the
        styles are in and lays it out once, research R5)
  body
    a.skip-link → #main
    header.site-header (sticky)
      a.brand → #top        header mark image (alt="") + organization name
      button.menu-toggle     shown only with scripts, below 1024 px
      div#site-menu          the navigation; becomes the menu panel below 1024 px
        button.menu-close    inside the panel only
        nav[aria-label=Main] ul: About, Vision, Mission, Founders, Contact (#about … #contact)
        a.lang-switch        link to the other language
        a.menu-email         mailto link, shown in the panel only
    main#main
      section#top.hero       picture/img (hero), eyebrow, h1, sentence, two action links
      section#about          eyebrow, h2, body, badge, image
      section#vision         background image (img with alt), eyebrow, h2 (visually hidden), quote
      section#mission        image, eyebrow, h2, paragraph, emphasized sentence, paragraph
      section#founders       eyebrow, h2, ul of 4 founder cards (badge, h3 name, credential, role)
      section#contact        eyebrow, h2, ul of channel cards (email, then phone and social placeholders), form placeholder
    footer.site-footer       complete logo, summary, nav[aria-label=Footer], registration, ©
    script /script.js async
```

- Exactly one `h1` (the hero headline); every section heading is `h2`; founder names and contact
  card titles are `h3`.
- Each section has `aria-labelledby` pointing to its heading.
- Asset paths are root-relative (`/styles.css`, `/images/web/…`) so both pages share them.

## Header and navigation by width

| Width | Header shows | Navigation |
|-------|--------------|------------|
| 1024 px and up | Mark (56–64 px tall), name, links, language switch | Inline row; the current section is underlined (`aria-current="true"`) |
| Below 1024 px, scripts on | Mark (44–52 px tall), name, menu button | Hidden until the menu button opens the panel |
| Below 1024 px, scripts off | Mark, name, then the links and language switch as a wrapped list | Always visible; no menu button |

## Menu panel (scripts on, below 1024 px)

- The button has `aria-controls="site-menu"`, `aria-expanded` and an accessible name that changes
  between "Open menu" and "Close menu" (Arabic: "فتح القائمة" / "إغلاق القائمة").
- When open, `#site-menu` has `role="dialog"`, `aria-modal="true"` and the label "Menu" / "القائمة".
  It slides in from the inline-end edge (right in English, left in Arabic) over a dimmed backdrop
  and is about 85% of the screen width (at most 384 px, as in the approved design).
- Focus moves to the close button when it opens, Tab and Shift+Tab stay inside the panel, and
  focus returns to the menu button when it closes. The one exception is choosing a section link:
  focus then moves to that section, so the next Tab continues from there (WAI-ARIA dialog pattern).
- It closes on Escape, the close button, a backdrop tap or choosing a link (which then moves to the
  section). The page behind does not scroll while it is open.
- If the screen becomes 1024 px or wider while it is open (resize or rotation), it closes and the
  full navigation shows. Desktop zoom levels that produce the narrow layout get the same menu.
- Without `prefers-reduced-motion`, the slide takes about 250 ms; with it, the panel appears
  without movement.

## Section behavior

- The current section is the one covering the middle of the screen; no section is marked while the
  hero is in view.
- The header is at most about 15% of the screen height; on screens shorter than 500 px it is not
  sticky.
- Navigating to a section leaves its heading fully visible below the sticky header
  (`scroll-margin-top`).
- Smooth scrolling happens only under `prefers-reduced-motion: no-preference`.
- With scripts, the language switch link's address ends with the current section (for example
  `/ar/#founders`); with no current section, or without scripts, it points to the top of the other
  page.
- The switch link carries `lang` and `hreflang` of the target language, and its accessible name is
  "العربية" (on the English page) or "English" (on the Arabic page).

## Layout by width

| Section | Below 640 px | 640–1023 px | 1024–1439 px | 1440 px and up |
|---------|--------------|-------------|--------------|----------------|
| Hero | Portrait photo, actions stacked full width | Landscape photo, actions side by side | Same; text block on the inline-start side | Taller, headline about 64 px |
| About / Mission | Photo above text | Photo above text | Text and photo side by side (Mission mirrored) | Same, wider gutters |
| Vision | Full-bleed band, quote about 26 px | Quote about 30 px | Quote about 34 px | Same |
| Founders | 1 card per row | 2 per row | 2 per row | 4 in one row |
| Contact | Cards stacked | Email full width, then 2 placeholders side by side, form full width | Email and 2 placeholders in one row, form below | Same |

The content column is at most 1200 px wide and centered; side gutters are 20, 32, 48 and 64 px from
the narrowest band to the widest. There is no horizontal scrolling from 320 px to 2560 px.

## Right-to-left (Arabic)

- `dir="rtl"` on `<html>` mirrors the layout through logical CSS properties: logo and name on the
  right, links running right to left, text right-aligned, and the menu panel sliding in from the
  left.
- Arrow icons are flipped; photos and the logo are not.
- The email address and other Latin-script runs are wrapped with `dir="ltr"` (or `<bdi>`).

## Accessibility requirements

- Skip link is the first focusable element and becomes visible on focus. Focus order follows the
  visual order on every screen size: skip link, logo, navigation (or menu button), language
  switch, then the page content.
- Placeholder text keeps at least 4.5:1 contrast even in its muted style; text over photos keeps
  at least 4.5:1 at every crop and width.
- When reduced motion is requested, all movement is removed: menu slide, smooth scrolling and
  transitions.
- If the header mark fails to load, the name stays visible and the header keeps its layout; long
  names and words wrap instead of overflowing.
- Every interactive element has a visible focus ring (3 px Leaf Green with a 2 px white offset) and
  a target of at least 44×44 px.
- Text contrast is at least 4.5:1, including text over photos (overlay ensures this).
- Placeholders expose their status as text ("Coming soon", plus visually hidden "not available
  yet") and contain nothing focusable.
