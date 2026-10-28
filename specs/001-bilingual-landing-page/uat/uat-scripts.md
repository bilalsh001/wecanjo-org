# UAT Scripts: General public role

Run every script in English (`/`) and Arabic (`/ar/`) at 390, 768, 1280 and 1440 px (see
[uat-plan.md](uat-plan.md)). Arabic expectations use the Arabic text from
[contracts/content.md](../contracts/content.md); "EN | AR" shows both where they differ.
Persona codes: P1 opportunity seeker, P2 partner or funder, P3 journalist, P4 visitor from search or
a shared link.

## Coverage

| Script | Title | Personas | User story | Requirements and criteria |
|--------|-------|----------|------------|---------------------------|
| UAT-01 | First screen | P1 P2 P4 | US1 (1) | FR-001, FR-002, FR-013 |
| UAT-02 | Learn about the organization | P1 P2 | US1 (2, 3) | FR-003, FR-004, FR-005, FR-014 |
| UAT-03 | Photo descriptions | all | US1 (4) | FR-014, FR-015, FR-027 |
| UAT-04 | Founders | P2 P3 | US2 (1, 2) | FR-006, FR-007 |
| UAT-05 | Email and location | P1 P2 P3 | US3 (1, 4) | FR-008, SC-009 |
| UAT-06 | Channels that are coming soon | P1 P3 | US3 (2, 3) | FR-009, FR-010 |
| UAT-07 | Switch language at a section | P3 P4 | US4 (1, 2, 3) | FR-016, FR-018, FR-019 |
| UAT-08 | Arabic page integrity | P1 P3 | US4 (4, 5) | FR-017, FR-020, FR-021, SC-003 |
| UAT-09 | Reach any section | P1 P2 P3 | US5 (1–4) | FR-022, FR-023, SC-002 |
| UAT-10 | Header and current section | P2 | US5 (5) | FR-024 |
| UAT-11 | Keyboard-only visit | all | US5 | FR-027 |
| UAT-12 | Scripts switched off | all | US1, US5 | FR-026 |
| UAT-13 | Layout at this width | all | US1–US5 | FR-012, FR-025, SC-004 |
| UAT-14 | Search and sharing information | P4 | US6 (1–3) | FR-028, FR-029, FR-030, FR-031, SC-003 |
| UAT-15 | Privacy and download size | all | US6 | FR-033, SC-007 |

---

## UAT-01 First screen

**Persona**: P1 on a phone in Arabic, P2 on a laptop in English, P4 arriving from a link.

| Step | Action | Expected result |
|------|--------|-----------------|
| 1 | Open the page and do not scroll | The header shows the "WC" logo mark (44 px tall on phones, 52 px on tablets, 64 px from 1024 px) beside the name "We Can Organization" \| "جمعية نحن نستطيع" |
| 2 | Read the first screen | Headline "Empowering women and youth for a better future" \| "تمكين المرأة والشباب من أجل مستقبل أفضل" and the supporting sentence are visible |
| 3 | Look for actions | "Learn about us" \| "تعرّف علينا" and "Contact us" \| "تواصل معنا" are visible without scrolling |

## UAT-02 Learn about the organization

**Persona**: P1, P2.

| Step | Action | Expected result |
|------|--------|-----------------|
| 1 | Select "Learn about us" | The page moves to "Who we are" \| "من نحن"; its heading is fully visible below the header |
| 2 | Read the section | The approved text and the badge "Registered NGO / CBO in Jordan" \| "مسجّلة في الأردن كمنظمة غير حكومية / مجتمعية" are shown with the women's photo |
| 3 | Scroll on | "Our vision" then "Our mission" follow, in that order, with the approved texts word for word |

## UAT-03 Photo descriptions

**Persona**: all, as a screen reader user would meet them.

| Step | Action | Expected result |
|------|--------|-----------------|
| 1 | Inspect each photo's description | Hero, women, Amman and classroom photos each have the approved description in the page's language |
| 2 | Inspect the logos | The header mark has an empty description (the name is beside it); the footer logo is described as "We Can Organization logo" \| "شعار جمعية نحن نستطيع" |
| 3 | Check the photo files | Every photo is a web-sized copy (`/images/web/…`) with width and height, and loads |

## UAT-04 Founders

**Persona**: P2 checking credibility, P3 checking names and titles.

| Step | Action | Expected result |
|------|--------|-----------------|
| 1 | Go to Founders | Four cards, each with an initials badge, name, credential and role |
| 2 | Compare with the approved list | Names, credentials and roles match exactly, in order: Insaf Daas, Dr. Maysoon Otoom, Dr. Abeer Dababneh, Emad Shehab \| إنصاف دعاس، د. ميسون العتوم، د. عبير دبابنة، عماد شهاب |
| 3 | Look at the badges | ID, MO, AD, ES \| إ د، م ع، ع د، ع ش (Arabic letters shown separately) |
| 4 | Check the arrangement | 1 card per row at 390 px, 2 at 768 and 1280 px, 4 at 1440 px |

## UAT-05 Email and location

**Persona**: P1 wanting to volunteer, P2 proposing a partnership, P3 asking for an interview.

| Step | Action | Expected result |
|------|--------|-----------------|
| 1 | Select "Contact us" in the hero | The page moves to "Get in touch" \| "تواصل معنا" |
| 2 | Find the email card | "Email us" \| "راسلنا عبر البريد الإلكتروني" with `info@wecan-jo.org`, a link that opens a new message to that address (in Arabic it reads left to right) |
| 3 | Read the location | "Amman, Jordan" \| "عمّان، الأردن" |

## UAT-06 Channels that are coming soon

**Persona**: P1 looking for WhatsApp, P3 looking for social media.

| Step | Action | Expected result |
|------|--------|-----------------|
| 1 | Look at the other channels | Phone & WhatsApp, Social media (Facebook, Instagram, LinkedIn, X) and Contact form, each labelled "Coming soon" \| "قريبًا" |
| 2 | Click or tap each card and each form field | Nothing happens: no page change, no app opens, the fields accept no input |
| 3 | Tab from the email link | Focus moves past all three placeholders to the footer |

## UAT-07 Switch language at a section

**Persona**: P3 comparing both versions, P4 who opened the wrong language.

| Step | Action | Expected result |
|------|--------|-----------------|
| 1 | Scroll to Founders | Founders is the section in view |
| 2 | Select "عربي" (EN page) or "EN" (AR page), in the header from 1024 px or in the menu below | The other language opens at Founders (`/ar/#founders` or `/#founders`) |
| 3 | Select the switch again | The first language returns at Founders |
| 4 | Check the switch | It reads "EN \| عربي" with the current language highlighted; it is announced as "العربية" or "English" |

## UAT-08 Arabic page integrity

**Persona**: P1 reading Arabic, P3 quoting the Arabic name. (On the English page: confirm every
section exists in English and the page is left to right.)

| Step | Action | Expected result |
|------|--------|-----------------|
| 1 | Open `/ar/` directly | Right to left: logo and name on the right, text right-aligned, menu or links on the left |
| 2 | Read the names | The header, footer and page title use "جمعية نحن نستطيع"; the founders' names are the confirmed ones |
| 3 | Check mixed text | The email address reads left to right; "© 2026" sits correctly before the name |
| 4 | Check images | Photos and the logo are not mirrored |
| 5 | Compare with English | The same six sections, in the same order, with the same number of photos |

## UAT-09 Reach any section

**Persona**: P2 on a laptop, P1 on a phone, P3 on a tablet.

| Step | Action | Expected result |
|------|--------|-----------------|
| 1 | From 1024 px: look at the header | Logo, links About, Vision, Mission, Founders, Contact, and the language switch |
| 2 | From 1024 px: select each link | One click reaches each section, heading visible below the header |
| 3 | Below 1024 px: look at the header | Only the logo with the name and a menu button |
| 4 | Below 1024 px: open the menu | Links, language switch and email; focus moves into the menu and Tab / Shift+Tab stay inside |
| 5 | Close it with Escape, then reopen and tap outside, then reopen and use the close button | Each closes the menu and returns focus to the menu button |
| 6 | Reopen and choose Founders | The menu closes and the page moves to Founders (2 taps in total) |

## UAT-10 Header and current section

**Persona**: P2 reading the whole page.

| Step | Action | Expected result |
|------|--------|-----------------|
| 1 | Scroll down from the top | The header stays at the top and takes at most about 15% of the screen height |
| 2 | Watch the navigation while scrolling | No section is marked while the hero is in view; then About, Vision, Mission, Founders, Contact are marked in turn (underlined from 1024 px; marked in the menu below) |

## UAT-11 Keyboard-only visit

**Persona**: any visitor who uses the keyboard instead of a mouse.

| Step | Action | Expected result |
|------|--------|-----------------|
| 1 | Press Tab once | "Skip to content" \| "تخطَّ إلى المحتوى" appears and has focus |
| 2 | Press Enter | Focus moves to the main content |
| 3 | Keep pressing Tab through the page | Order: logo, navigation (or menu button), language switch, hero actions, email link, footer links; every element shows a clear focus ring; nothing traps focus |

## UAT-12 Scripts switched off

**Persona**: any visitor whose browser blocks scripts.

| Step | Action | Expected result |
|------|--------|-----------------|
| 1 | Open the page with scripts off | All sections and texts are visible |
| 2 | Look at the header | Below 1024 px the links and language switch show as a wrapped list (no menu button); from 1024 px the full header shows |
| 3 | Select a link and the language switch | Both work |

## UAT-13 Layout at this width

**Persona**: all.

| Step | Action | Expected result |
|------|--------|-----------------|
| 1 | Scroll through the whole page | No horizontal scrolling; nothing is cut off or overlaps |
| 2 | Compare with the layout table in page-structure.md | Hero, Who we are / Our mission, vision band, founders and contact are arranged as specified for this width, matching the approved designs |

## UAT-14 Search and sharing information

**Persona**: P4.

| Step | Action | Expected result |
|------|--------|-----------------|
| 1 | Look at the page title and description as a search result would show them | Title and description in the page's language, unique to the page |
| 2 | Check addresses | Preferred address of this page and the address of the other language are declared |
| 3 | Check the sharing preview information | Name, one-sentence description in the page's language, and the 1200 × 630 preview image |
| 4 | Check organization details and icons | Structured details (name, logo, website, email, location); browser and home-screen icons made from the logo; sitemap and robots file exist |

## UAT-15 Privacy and download size

**Persona**: all.

| Step | Action | Expected result |
|------|--------|-----------------|
| 1 | Load the page with the network log open | Every request goes to the site itself |
| 2 | Check cookies and storage | No cookies, nothing stored in the browser |
| 3 | Check the download size | The first visit downloads well under 1.5 MB and no image is over 300 KB |
