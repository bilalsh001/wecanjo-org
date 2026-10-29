---
name: We Can Organization
colors:
  surface: '#FAF8F2'
  surface-dim: '#dadad4'
  surface-bright: '#FAF8F2'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#F4EFE2'
  surface-container: '#eeeee8'
  surface-container-high: '#e8e9e2'
  surface-container-highest: '#e2e3dd'
  on-surface: '#1a1c19'
  on-surface-variant: '#42483f'
  inverse-surface: '#2f312d'
  inverse-on-surface: '#f1f1eb'
  outline: '#73796f'
  outline-variant: '#c2c8bd'
  surface-tint: '#43673d'
  primary: '#41653b'
  on-primary: '#ffffff'
  primary-container: '#597e52'
  on-primary-container: '#f9fff1'
  inverse-primary: '#a9d19e'
  secondary: '#49654e'
  on-secondary: '#ffffff'
  secondary-container: '#cbebce'
  on-secondary-container: '#4f6b54'
  tertiary: '#645c40'
  on-tertiary: '#ffffff'
  tertiary-container: '#7d7557'
  on-tertiary-container: '#fffcff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c4eeb9'
  primary-fixed-dim: '#a9d19e'
  on-primary-fixed: '#002202'
  on-primary-fixed-variant: '#2c4f28'
  secondary-fixed: '#cbebce'
  secondary-fixed-dim: '#afceb3'
  on-secondary-fixed: '#06200f'
  on-secondary-fixed-variant: '#324d38'
  tertiary-fixed: '#ede2be'
  tertiary-fixed-dim: '#d1c6a3'
  on-tertiary-fixed: '#201b05'
  on-tertiary-fixed-variant: '#4d472c'
  background: '#FAF8F2'
  on-background: '#1a1c19'
  surface-variant: '#e2e3dd'
  paper-white: '#FAF8F2'
  pure-white: '#FFFFFF'
  sand-mist: '#F4EFE2'
  leaf-green: '#597E52'
  leaf-green-text: '#4B6E45'
  deep-grove: '#2F4A35'
  sage: '#A0AD87'
  sandstone-cream: '#E7DCB8'
  light-cream: '#F1E4C3'
  charcoal-moss: '#3A4237'
  stone: '#6B6F63'
  clay-red: '#B3261E'
typography:
  headline-display:
    fontFamily: EB Garamond
    fontSize: 56px
    fontWeight: '500'
    lineHeight: 64px
  headline-display-mobile:
    fontFamily: EB Garamond
    fontSize: 40px
    fontWeight: '500'
    lineHeight: 48px
  headline-lg:
    fontFamily: EB Garamond
    fontSize: 40px
    fontWeight: '500'
    lineHeight: 48px
  headline-lg-mobile:
    fontFamily: EB Garamond
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
  headline-md:
    fontFamily: EB Garamond
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 30px
  body-lg-mobile:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  button:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  eyebrow:
    fontFamily: Manrope
    fontSize: 13px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.12em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 32px
  margin: 48px
  space-xs: 8px
  space-sm: 16px
  space-md: 24px
  space-lg: 48px
  space-xl: 64px
---

# Design System: We Can Organization

Design specification for the bilingual (English and Arabic) website of We Can Organization, a newly registered community-based NGO in Jordan that empowers women and youth. This file grounds Stitch screen generation and the site build.

## 1. Visual Theme & Atmosphere

Warm, hopeful, grounded and dignified. A calm editorial layout with generous whitespace on a warm off-white "paper" canvas. Organic leaf-green tones come straight from the flowing "WC" ribbon in the logo; sandstone creams echo Jordanian stone and daylight. Real documentary photography of people and places in Jordan carries the emotion, softly darkened wherever text sits on top of it.

It should read as a credible, modern civil-society organization: elegant rather than corporate, friendly rather than childish. Avoid dashboards, neon gradients, glassmorphism, busy patterns, floating pills, badge dots and generic icon grids.

## 2. Color Palette & Roles

### Primary Foundation
- **Paper White (`#FAF8F2`)**: Page background.
- **Pure White (`#FFFFFF`)**: Header bar, cards and any surface the logo sits on (the logo artwork has a white background, so it always sits on white).
- **Sand Mist (`#F4EFE2`)**: Alternating section background for rhythm between sections.

### Brand & Interactive
- **Leaf Green (`#597E52`)**: Primary brand color for primary buttons (white text, 4.6:1 contrast), the active navigation underline, icons and large elements.
- **Leaf Green Text (`#4B6E45`)**: A slightly deeper Leaf Green for small text (eyebrow labels, credential lines, links). Plain Leaf Green reaches only 4.4:1 on Paper White, so small text uses this shade, which reaches 5.5:1 on Paper White and 5.0:1 on Sand Mist.
- **Deep Grove (`#2F4A35`)**: Headings, button hover state, footer background and image overlays.
- **Sage (`#A0AD87`)**: Secondary accents, hairline dividers, decorative ribbon flourishes and soft icon backgrounds.
- **Sandstone Cream (`#E7DCB8`)**: Highlight panels, quote marks and secondary fills.
- **Light Cream (`#F1E4C3`)**: Initials avatars, subtle highlights and supporting text on dark green.

### Typography & Text Hierarchy
- **Deep Grove (`#2F4A35`)**: Headings.
- **Charcoal Moss (`#3A4237`)**: Body text on light surfaces.
- **Stone (`#6B6F63`)**: Captions, credentials and secondary labels.
- **Pure White (`#FFFFFF`)** and **Light Cream (`#F1E4C3`)**: Text on photos and on Deep Grove.

### Functional States
- **Focus ring**: 3px Leaf Green outline with a 2px white offset on every interactive element.
- **Placeholder ("coming soon") items**: Stone text, dashed 1.5px Sage border, icons at 60% opacity, not clickable. Used for contact channels that are not set up yet.
- **Form feedback** (only once a contact form is activated): Leaf Green for success, Clay Red (`#B3261E`) for errors.

## 3. Typography Rules

- **EB Garamond** (English headings): classical serif that echoes the lettering in the logo. Display `500` at `56px/64px` on desktop and `40px/48px` on mobile; section headings (`h2`) `500` at `40px/48px` desktop and `32px/40px` mobile; card titles (`h3`) `600` at `24px/32px`.
- **Manrope** (English body and interface): clean, modern sans-serif. Body `400` at `18px/30px` desktop and `16px/26px` mobile; buttons and navigation `600` at `16px/24px`; eyebrow labels `700` at `13px/16px`, uppercase, `0.12em` tracking, in Leaf Green.
- **Amiri** (Arabic headings): classical Naskh that matches EB Garamond's tone, at the same sizes with about 10% more line height, always in the Regular (`400`) weight; the bold cut is heavy and is not loaded, which keeps the Arabic page light.
- **IBM Plex Sans Arabic** (Arabic body and interface): modern and highly legible; body `400` at `17px/30px`.
- Each page downloads only the fonts of its own language: Latin characters inside Arabic text (the email address, "EN", "© 2026") use the system sans-serif, and the "عربي" label on the English page uses the system's Arabic font.
- Keep lines to about 70 characters. Never letter-space or uppercase Arabic text.

## 4. Component Stylings

- **Header and navigation**: Sticky white bar with a 1px Sage hairline once the page scrolls. The logo sits on the leading edge (left in English, right in Arabic) and is shown large and clear: a 64px-tall mark on desktop, 52px on tablet and 44px on mobile, using trimmed artwork without extra white margin. Links for About, Vision, Mission, Founders and Contact use Manrope 16px in Deep Grove, with a Leaf Green underline on the active section. An `EN | عربي` language switch sits at the trailing edge.
- **Menu button (below 1024px)**: The links collapse into a 44×44px hamburger button. Tapping it opens a full-height panel that slides in from the trailing edge (right in English, left in Arabic) over a dimmed backdrop, with large stacked links in EB Garamond 28px, the language switch, the contact email and a close (×) button. Focus stays inside the panel and Escape closes it.
- **Buttons**: Primary is a Leaf Green fill with white Manrope `600` text, `8px` radius, `48px` minimum height and `24px` horizontal padding, turning Deep Grove on hover. Secondary is a transparent fill with a 1.5px Leaf Green border, or white border and text on photos.
- **Hero**: Full-bleed photograph of hands joined together under a Deep Grove overlay that is at least 82% opaque wherever text sits (a gradient fading to 30% away from the text from 1024 px; a solid 82% overlay on narrower screens, where the text spans the photo), over a solid Deep Grove background in case the photo fails to load. The 82% minimum keeps white text above 4.5:1 even over the lightest part of the photo. White EB Garamond headline, Light Cream supporting line, a primary button and a white outline button.
- **Section heading**: Small Leaf Green eyebrow label, an EB Garamond `h2`, and a short 64px Sage ribbon-shaped underline that echoes the logo's swoosh.
- **Vision statement**: A large pull quote in EB Garamond over a full-bleed photo of Amman (the Roman Theatre and hillside city) with a Deep Grove overlay, plus a Sandstone Cream quotation mark.
- **Mission and About**: Text beside a supporting photograph with `16px` rounded corners; a slim Leaf Green rule marks key sentences.
- **Founder cards**: White card, `16px` radius, soft green-tinted shadow (`0 8px 24px rgba(47,74,53,0.08)`), an 88px circular Light Cream initials avatar with Deep Grove EB Garamond initials (a stand-in for future headshots), the name in EB Garamond 22px, the degree in small uppercase Leaf Green Manrope, and the role in Manrope 16px.
- **Contact**: A prominent email card (`info@wecan-jo.org`, opens the visitor's email app) with Amman, Jordan as the location. Phone/WhatsApp, social media links (Facebook, Instagram, LinkedIn, X) and a short contact form appear as clearly marked "Coming soon" placeholders using the placeholder state above.
- **Footer**: Deep Grove background; the logo on a white rounded tile; a one-line mission summary; quick links; "Registered NGO / CBO in Jordan"; "© 2026 We Can Organization".

## 5. Layout Principles

- **Grid and spacing**: Content max width `1200px`, centered, on an `8px` baseline. Side gutters of `20px` on mobile, `32px` on tablet, `48px` on laptop and `64px` on large desktop. Section padding of `64px` (mobile), `88px` (tablet) and `112px` (desktop) top and bottom.
- **Breakpoints and design canvases**: Mobile below `640px` (designed at `390px`), tablet `640px` to `1023px` (designed at `768px`), small laptop `1024px` to `1439px` (designed at `1280px`), large desktop `1440px` and up (designed at `1440px`).
- **Responsive behavior**: Text and image pairs sit side by side from `1024px` and stack below it. Founder cards run 1 per row on mobile, 2 on tablet and laptop, and 4 on large desktop. The full navigation shows from `1024px`; below that the menu button takes over.
- **Right-to-left**: The Arabic version mirrors the whole layout (`dir="rtl"`): logo on the right, menu panel sliding in from the left, right-aligned text and flipped directional icons. Photographs are never mirrored.
- **Accessibility**: Touch targets of at least `44×44px`, visible focus states, text contrast of at least 4.5:1, and motion that respects reduced-motion settings.

## 6. Design System Notes for Stitch Generation

- **Atmosphere keywords**: Warm editorial NGO, organic leaf-green ribbons, paper-white canvas, sandstone cream highlights, documentary photography of Jordan, generous whitespace, elegant serif headlines.
- **Canonical colors**: Leaf Green `#597E52`, Deep Grove `#2F4A35`, Sage `#A0AD87`, Sandstone Cream `#E7DCB8`, Light Cream `#F1E4C3`, Paper White `#FAF8F2`, Sand Mist `#F4EFE2`.
- **Component prompts**: Sticky white header with a large We Can logo on the leading edge, five text links and an `EN | عربي` toggle that collapses into a 44px hamburger button and slide-in menu panel below 1024px. White founder cards with `16px` corners, a soft green-tinted shadow, a large circular cream initials avatar, an EB Garamond name and a small uppercase leaf-green credential line. A full-bleed hero photo under a deep green gradient with a white EB Garamond headline and two buttons, one solid leaf green and one white outline.
