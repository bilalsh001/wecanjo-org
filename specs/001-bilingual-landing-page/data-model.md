# Data Model: Bilingual Landing Page

There is no database. Content lives directly in the two HTML pages (`index.html`, `ar/index.html`).
This model defines what each page must contain and how the two languages correspond. The exact
wording is in [contracts/content.md](contracts/content.md).

## LanguageVersion

| Field | English | Arabic | Rules |
|-------|---------|--------|-------|
| `code` | `en` | `ar` | Set on `<html lang>` |
| `dir` | `ltr` | `rtl` | Set on `<html dir>` |
| `path` | `/` | `/ar/` | Permanent; canonical = `https://www.wecan-jo.org` + path (FR-019) |
| `ogLocale` | `en_US` | `ar_JO` | Each page lists the other as `og:locale:alternate` |
| `orgName` | We Can Organization | جمعية نحن نستطيع | FR-020 |
| `title`, `description` | see [seo-and-sharing](contracts/seo-and-sharing.md) | see same | Unique per language (FR-028) |

**Relationships**: each version contains the same ordered PageSections; `alternate` points to the
other version. English is also `x-default`.

## PageSection

| Field | Type | Rules |
|-------|------|-------|
| `id` | `top` \| `about` \| `vision` \| `mission` \| `founders` \| `contact` | Same set and order in both versions (SC-003); also used as the language-switch anchor |
| `order` | 1–6 | Fixed: top, about, vision, mission, founders, contact (FR-001) |
| `navLabel` | text (en, ar) | Not for `top`; About, Vision, Mission, Founders, Contact |
| `eyebrow` | text (en, ar) | Small label above the heading |
| `heading` | text (en, ar) | `h1` for the hero, `h2` for every other section |
| `body` | rich text (en, ar) | Approved copy only (Principle I) |
| `image` | ImageAsset, optional | Hero, About, Vision band and Mission each use one photo |

## Founder

| Field | Rules |
|-------|-------|
| `key` | `insaf-daas`, `maysoon-otoom`, `abeer-dababneh`, `emad-shehab`, always in this order |
| `nameEn`, `nameAr` | Exactly as in the spec (FR-006); Arabic names confirmed by the organization |
| `credentialEn`, `credentialAr` | Exactly as in the spec; Arabic is a draft |
| `roleEn`, `roleAr` | Exactly as in the spec; Arabic is a draft |
| `initialsEn`, `initialsAr` | `ID`, `MO`, `AD`, `ES` / `إ‌د`, `م‌ع`, `ع‌د`, `ع‌ش` (letters separated by U+200C, R11) |
| `headshot` | Empty until supplied; when added it replaces the badge in the same 88 px circle (FR-007) |

## ContactChannel

| Field | Values |
|-------|--------|
| `type` | `email`, `phone`, `whatsapp`, `facebook`, `instagram`, `linkedin`, `x`, `form` |
| `status` | `available` or `coming-soon` |
| `value` | Address, number, profile URL or form destination; empty while `coming-soon` |
| `labelEn`, `labelAr` | Card titles from [contracts/content.md](contracts/content.md) |

**Initial state**: `email` is `available` with `info@wecan-jo.org`; every other channel is
`coming-soon`. Phone and WhatsApp share one card, and the four social networks share one card.

**State transition**: `coming-soon` → `available` happens only when the organization supplies a
value, by editing both pages as described in [contracts/placeholders.md](contracts/placeholders.md).
A channel is never `available` without a value, and a `coming-soon` card never contains a link or a
focusable control. Activating the contact form also requires the organization's privacy approval
(constitution, Technology & Hosting Constraints).

The location "Amman, Jordan" / "عمّان، الأردن" is shown beside the email and is not a channel.

## ImageAsset

| Field | Rules |
|-------|-------|
| `key` | `hero`, `women`, `community`, `youth`, `logo` |
| `original` | `images/<key>.jpg`; never modified (FR-015) |
| `role` | `hero` (top section), `inline` (About, Mission), `band` (Vision background), `logo` |
| `altEn`, `altAr` | Required for every photo (FR-014). The header mark uses `alt=""` because the organization's name sits right next to it as text |
| `derivatives` | `{width, path, bytes}` list from [contracts/assets.md](contracts/assets.md); each at most 300 KB |

## SeoMetadata (one per LanguageVersion)

| Field | Rules |
|-------|-------|
| `title`, `description` | Unique per language |
| `canonical` | Absolute address of the page itself |
| `alternates` | `en`, `ar`, `x-default` |
| `openGraph`, `twitter` | Name, description and the share image |
| `jsonLd` | One shared organization entity; `description` is in the page's language |

## TranslationStatus

| Field | Rules |
|-------|-------|
| `item` | An Arabic text item (section copy, label, alt text, metadata) |
| `status` | `draft` or `reviewed` |
| `reviewer`, `date` | Filled in when the organization reviews the item |

**Initial state**: every Arabic item is `draft` except the organization's name and the founders'
names, which are `reviewed` (confirmed on 2026-10-28). The status is recorded in `README.md` (not
published, FR-021) and never shown to visitors.

**Review deadline**: the organization's site coordinator reviews every `draft` item within 2 weeks
of launch; the review is complete when every item is `reviewed` and the corrections are published.
