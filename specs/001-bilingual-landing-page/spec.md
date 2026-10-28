# Feature Specification: Bilingual Landing Page for We Can Organization

**Feature Branch**: `001-bilingual-landing-page`

**Created**: 2026-10-28

**Status**: Draft

**Input**: User description: "Build a simple but elegant, modern website (landing page) for We Can Organization, a newly registered NGO / CBO in Jordan that serves women and youth. It must reflect the nature of the organization, use the color palette of its logo, make the logo more prominent, use all the photos in the images folder, and include all necessary SEO information. It must be in English and Arabic. Content: who we are, vision, mission, founders (Insaf Daas, Dr. Maysoon Otoom, Dr. Abeer Dababneh, Emad Shehab, with their credentials) and contact (email info@wecan-jo.org, with placeholders for phone/WhatsApp, social media and a contact form until they exist). It must be responsive for mobile, tablet, small laptop and large desktop, with a menu button on tablets and phones instead of a crowded navigation bar, follow the approved Google Stitch designs, and be tested through UAT for the general public."

## Clarifications

### Session 2026-10-28

- Q: Should the header show the logo's "WC" mark on its own, with the name "We Can Organization" set in large type beside it, or the complete logo exactly as supplied? → A: The WC mark alone (trimmed from the supplied logo) with the name in large type beside it; the complete logo appears in the footer.
- Q: Should the Arabic version go live only after someone at the organization has checked and approved the Arabic text, or launch together with English using the draft? → A: Launch both languages together with the draft Arabic; the organization corrects it afterwards.
- Q: Are these Arabic spellings of the founders' names correct: إنصاف دعاس، د. ميسون العتوم، د. عبير دبابنة، عماد شهاب? → A: Yes, all four are correct as written.
- Q: Should the site use the proposed wording for the hero sentence and section headings, or only words taken directly from the organization's own text? → A: Use the proposed wording; it is approved.
- Q: When a contact channel such as a phone number becomes available, is it OK to switch it on by editing both the English and Arabic pages with the help of a short step-by-step guide, rather than in a single settings file? → A: Yes; edit both pages using a step-by-step guide, so the details show for every visitor without scripts.

## User Scenarios & Testing *(mandatory)*

All stories describe members of the **general public** (the single UAT role for this release):
women and young people in Jordan looking for opportunities, prospective partners and funders
checking credibility, journalists, and anyone who arrives from a search or a shared link.

### User Story 1 - Discover who We Can is (Priority: P1)

A visitor opens the website on any device and, within moments, understands who the organization
is, whom it serves and what it stands for: the prominent logo and name, a headline about
empowering women and youth in Jordan, the "Who we are" description, the vision and the mission.

**Why this priority**: This is the core reason the site exists. On its own it already gives a
newly registered NGO a credible public presence.

**Independent Test**: Open the English page on a phone and on a laptop; a first-time visitor can
identify the organization, its audience, its vision and its mission, and every statement matches
the approved content.

**Acceptance Scenarios**:

1. **Given** a visitor opens the site, **When** the first screen appears, **Then** they see the
   organization's logo prominently in the header, the name "We Can Organization", the headline
   "Empowering women and youth for a better future", a supporting sentence, and two actions:
   "Learn about us" and "Contact us".
2. **Given** the visitor selects "Learn about us", **When** the page moves, **Then** the "Who we
   are" section is shown.
3. **Given** the visitor scrolls down, **When** they pass each section, **Then** they find
   "Who we are", "Our vision" and "Our mission" in that order, with the approved texts shown
   word for word.
4. **Given** photographs are shown, **When** a screen reader user reaches them, **Then** each has a
   description of what it shows.

---

### User Story 2 - Meet the founders (Priority: P2)

A prospective partner, funder or journalist wants to know who is behind the organization and
finds the four founding members with their names, academic credentials and current roles.

**Why this priority**: The founders' expertise is the strongest credibility signal a new NGO has.

**Independent Test**: Open the Founders section; all four people appear with exactly the approved
names, credentials and roles.

**Acceptance Scenarios**:

1. **Given** the visitor reaches the Founders section, **When** it is displayed, **Then** it shows
   four cards, one per founder, each with an initials badge, the name, the credential and the role.
2. **Given** the cards are displayed, **When** the text is compared with the approved list, **Then**
   it matches exactly:
   - Insaf Daas: Master in Gender Studies. Founder of the "We Can Initiative" and expert in gender
     mainstreaming and integration, and sustainable development.
   - Dr. Maysoon Otoom: PhD, Sociology. Faculty Member, Center for Women's Studies, University of
     Jordan.
   - Dr. Abeer Dababneh: PhD, Gender Studies and Human Rights. Commissioner of the Independent
     Election Commission of Jordan.
   - Emad Shehab: B.Sc. Mathematics. Founder and President of Broccoli Not for Profit
     Organization.

---

### User Story 3 - Get in touch (Priority: P2)

A visitor who wants to volunteer, partner or ask a question finds how to contact the
organization: a working email address and its location, plus clearly marked placeholders for
channels that are not available yet.

**Why this priority**: Contact turns interest into relationships; the email is available today.

**Independent Test**: Select "Contact us", use the email link, and confirm that every
not-yet-available channel is labelled "Coming soon" and cannot be used.

**Acceptance Scenarios**:

1. **Given** the visitor selects the email address, **When** their device opens its email app,
   **Then** a new message is addressed to info@wecan-jo.org.
2. **Given** the Contact section is shown, **When** the visitor looks for other channels, **Then**
   they see Phone & WhatsApp, Social media (Facebook, Instagram, LinkedIn, X) and Contact form,
   each visibly labelled "Coming soon".
3. **Given** a placeholder is shown, **When** the visitor taps, clicks or tabs to it, **Then**
   nothing happens: it does not navigate, open an app, accept input or receive keyboard focus.
4. **Given** the Contact section is shown, **When** the visitor reads it, **Then** the location
   "Amman, Jordan" is displayed.

---

### User Story 4 - Read the site in Arabic (Priority: P2)

An Arabic-speaking visitor switches to Arabic (or opens the Arabic address directly) and gets the
same content in Arabic, laid out right-to-left, and can switch back to English at any time.

**Why this priority**: Most of the women and young people the organization serves read Arabic
first; English serves partners and funders.

**Independent Test**: Open the Arabic version on a phone and a laptop; every section of the
English page is present in Arabic, the layout reads right-to-left, and the switch returns to
English.

**Acceptance Scenarios**:

1. **Given** the English page, **When** the visitor selects "عربي", **Then** the Arabic version
   opens with the same sections, the logo and navigation on the right, and right-aligned text.
2. **Given** the visitor was viewing a specific section, **When** they switch language, **Then**
   the other language opens at the same section.
3. **Given** the Arabic page, **When** the visitor selects "EN", **Then** the English version opens.
4. **Given** the Arabic page shows the email address, **When** it is displayed, **Then** it reads
   correctly left-to-right inside the Arabic text.
5. **Given** the Arabic founder cards, **When** they are displayed, **Then** the initials badges use
   Arabic letters.

---

### User Story 5 - Navigate comfortably on any device (Priority: P3)

A visitor on a phone, tablet, small laptop or large monitor moves around the page easily: a
clean header that stays available, a single menu button on smaller screens, and clear
indication of where they are.

**Why this priority**: Navigation polish improves every other story but is not the content
itself; basic readability on all devices is already part of Story 1.

**Independent Test**: At 390, 768, 1280 and 1440 pixels wide, in both languages, reach every
section through the navigation, open and close the menu, and confirm there is no horizontal
scrolling.

**Acceptance Scenarios**:

1. **Given** a screen at least 1024 px wide, **When** the page loads, **Then** the header shows the
   logo, links to About, Vision, Mission, Founders and Contact, and the language switch.
2. **Given** a screen narrower than 1024 px, **When** the page loads, **Then** the header shows
   only the logo and a menu button.
3. **Given** the menu button is activated, **When** the menu opens, **Then** it shows the section
   links, the language switch and the email address, and keyboard focus stays inside it until it
   closes.
4. **Given** the menu is open, **When** the visitor selects a link, presses Escape, uses the close
   button or taps outside the menu, **Then** the menu closes (and, for a link, the page moves to
   that section).
5. **Given** the visitor scrolls, **When** a section is in view, **Then** the header remains
   available and the navigation marks that section as current.

---

### User Story 6 - Find and share the site (Priority: P3)

Someone searches for "We Can Organization Jordan" (or "جمعية نحن نستطيع") and finds the site with
a clear title and description, or receives the link on WhatsApp or social media and sees an
attractive preview with the organization's name, description and image.

**Why this priority**: Discoverability and sharing grow reach over time; the site still delivers
value before search engines index it.

**Independent Test**: Inspect the page as search engines and sharing services see it, in both
languages: title, description, language alternates, organization details and preview image are
all present and correct.

**Acceptance Scenarios**:

1. **Given** a search engine reads either language version, **When** it indexes the page, **Then**
   it finds a unique title and description in that language, the page's preferred address, the
   address of the other language version, and structured details of the organization (name,
   logo, website, email, location).
2. **Given** someone shares either address in a messaging or social app, **When** the preview is
   generated, **Then** it shows the organization's name, a one-sentence description in that
   language and a representative image.
3. **Given** a visitor bookmarks the site or adds it to their phone's home screen, **When** the
   icon is shown, **Then** it is derived from the organization's logo.

---

### Edge Cases

- **Scripts unavailable**: all content, section links and the language switch remain usable; on
  small screens the navigation links are still reachable without the menu button.
- **Very narrow (320 px) or very wide (2560 px) screens**: no horizontal scrolling; text keeps a
  readable line length and content stays centered rather than stretching.
- **Slow mobile connection**: text and layout appear first; photos load progressively without
  shifting the layout.
- **Photo fails to load**: its description is available, the layout stays intact, and text over
  photos remains readable against the fallback background color.
- **Zoom to 200% or larger text settings**: content reflows without overlapping or cutting off.
- **Reduced-motion preference**: movement between sections and menu transitions happen without
  animation.
- **Mixed-direction text**: Latin-script items (email address, "We Can" in the logo) display
  correctly inside Arabic text.
- **Direct link to a section** (for example the Founders section of the Arabic page): the page
  opens at that section with the header not covering its heading.
- **Placeholder channels**: a visitor cannot accidentally open an empty link or submit the
  placeholder form, and assistive technology announces them as unavailable ("coming soon").
- **Browser language set to Arabic**: the visitor is not redirected automatically; the language
  switch is immediately visible.

## Requirements *(mandatory)*

### Functional Requirements

**Content and structure**

- **FR-001**: Each language version MUST be a single page with these parts in order: header with
  navigation, hero, Who we are, Our vision, Our mission, Founders, Contact, footer. Navigation
  labels MUST be About, Vision, Mission, Founders and Contact, and the sections MUST use the
  approved headings: "Who we are" (label "About us"), "Our vision", "How we create change"
  (label "Our mission"), "The people behind We Can" (label "Our founders") and "Get in touch"
  (label "Contact").
- **FR-002**: The hero MUST show the headline "Empowering women and youth for a better future", the
  approved supporting sentence "We create opportunities and resources so every woman and young
  person in Jordan can pursue their dreams and drive positive change.", a "Learn about us" action
  leading to Who we are, and a "Contact us" action leading to Contact.
- **FR-003**: Who we are MUST show the approved text: "We are an organization dedicated to serving
  both women and youth through a variety of programs. We are registered as a local
  Non-Governmental Organization (NGO) or Community-Based Organization (CBO) in Jordan and are
  working to expand our impact and create meaningful change on multiple levels."
- **FR-004**: Our vision MUST show the approved vision statement word for word: "A community
  dedicated to the development and success of all women and youth, where individuals can pursue
  their dreams and make meaningful contributions to a vibrant and equitable society."
- **FR-005**: Our mission MUST show the approved mission statement word for word (all three
  sentences), with "By leveraging the collective strength of our ecosystem, we believe that
  individual success drives community prosperity." visually emphasized.
- **FR-006**: Founders MUST list the four founding members with names, credentials and roles
  exactly as given in User Story 2. On the Arabic page the names MUST read exactly: إنصاف دعاس،
  د. ميسون العتوم، د. عبير دبابنة، عماد شهاب (confirmed by the organization).
- **FR-007**: Each founder MUST be represented by an initials badge (Latin letters in English,
  Arabic letters in Arabic) until approved headshots are supplied; adding a headshot later MUST
  NOT require a layout change.
- **FR-008**: Contact MUST show info@wecan-jo.org as a link that opens the visitor's email app
  with a new message to that address, and the location "Amman, Jordan".
- **FR-009**: Contact MUST show placeholders for Phone & WhatsApp, Social media (Facebook,
  Instagram, LinkedIn, X) and a Contact form, each labelled "Coming soon" (Arabic: "قريبًا"),
  visually muted, non-interactive, not keyboard-focusable, and collecting no data.
- **FR-010**: Each placeholder MUST be activatable later by supplying its real value (number,
  profile address or form destination) in both the English and Arabic pages, following a
  step-by-step guide included in the project. Each placeholder MUST be clearly marked in both
  pages, and activating one MUST NOT require a redesign or depend on scripts.
- **FR-011**: The footer MUST show the complete logo as supplied, a one-line summary ("Empowering women and youth across
  Jordan."), links to every section, "Registered NGO in Jordan" and "© 2026 We Can Organization".

**Brand and imagery**

- **FR-012**: The visual design MUST match the approved Stitch designs and the project design
  system (colors taken from the logo, the agreed typefaces, rounded cards, deep green and cream
  accents).
- **FR-013**: The logo MUST be prominent. On every screen size the header MUST show the logo's
  "WC" mark on its own (trimmed from the supplied logo, without its built-in text), about
  56–64 px tall on laptops and desktops and at least 44 px tall on phones, with the
  organization's name set in large heading type beside it ("We Can Organization" in English,
  "جمعية نحن نستطيع" in Arabic). The complete logo, exactly as supplied, MUST appear in the
  footer. Neither may be distorted or recolored.
- **FR-014**: The four supplied photographs (hands joined together, women working together at a
  table, Amman's Roman Theatre and hillside city, a classroom of young adults) MUST all be used,
  each with a description in both languages.
- **FR-015**: Photos MUST be shown from web-optimized copies; the original photo files MUST remain
  unchanged.

**Languages**

- **FR-016**: The site MUST be available in English and Arabic with equivalent content in every
  section, including image descriptions, labels and page information for search engines and
  sharing.
- **FR-017**: The Arabic version MUST be right-to-left throughout, with mirrored layout and
  navigation; photographs and the logo MUST NOT be mirrored.
- **FR-018**: A language switch labelled "EN | عربي" MUST be in the header on wide screens and in
  the menu on narrow screens; switching MUST keep the visitor at the same section.
- **FR-019**: Each language MUST have its own permanent address, with English at the site's main
  address. Visitors MUST NOT be redirected automatically based on browser language.
- **FR-020**: Wherever the Arabic version names the organization (header wordmark, footer, page
  title, search and sharing information), it MUST use the registered Arabic name
  "جمعية نحن نستطيع". (The approved Arabic designs show the earlier draft "منظمة نحن نستطيع",
  which is superseded.)
- **FR-021**: The Arabic version MUST launch at the same time as the English version, using the
  project team's draft translation. The organization reviews and corrects it after launch, so
  every Arabic text item MUST be editable in one clearly documented place, and the draft status
  MUST be recorded in the project files (not shown to visitors) until the review is done.

**Navigation and responsiveness**

- **FR-022**: On screens 1024 px wide or wider, the header MUST show the logo, links to About,
  Vision, Mission, Founders and Contact, and the language switch.
- **FR-023**: On screens narrower than 1024 px, the header MUST show only the logo and a menu
  button; the menu MUST contain the section links, the language switch and the email address, and
  MUST close via a close button, the Escape key, selecting a link or tapping outside it.
- **FR-024**: The header MUST stay available while scrolling, and the navigation MUST indicate the
  section currently in view.
- **FR-025**: The layout MUST adapt to phones (from 320 px), tablets, small laptops and large
  desktops as in the approved designs, with no horizontal scrolling.
- **FR-026**: All content and navigation MUST remain usable if scripts do not run.

**Accessibility**

- **FR-027**: The site MUST meet WCAG 2.2 Level AA, including sufficient text contrast, complete
  keyboard operation (including the menu), visible focus, a "skip to content" link, logical
  heading order, image descriptions, touch targets of at least 44×44 px and respect for
  reduced-motion settings.

**Search, sharing and privacy**

- **FR-028**: Each language version MUST have a unique title and description, a preferred
  (canonical) address and references to the other language version.
- **FR-029**: Each language version MUST provide a link preview (name, description, image) for
  messaging and social apps.
- **FR-030**: The site MUST describe the organization to search engines in a structured way:
  name in both languages, logo, website address, email address and location (Amman, Jordan).
- **FR-031**: The site MUST provide a list of its pages for search engines (including both
  languages), crawling instructions, and browser and home-screen icons made from the logo.
- **FR-032**: Internal project files (specifications, design notes, tooling) MUST NOT be reachable
  as public pages.
- **FR-033**: The site MUST NOT track visitors, set cookies or collect personal data.

### Key Entities

- **Page section**: one part of the page (Hero, Who we are, Vision, Mission, Founders, Contact)
  with a heading, body content and a stable link target shared by both languages.
- **Founder**: a founding member with a name, credential, role, initials (per language) and an
  optional headshot added later.
- **Contact channel**: a way to reach the organization (email, phone/WhatsApp, social profile,
  contact form) with a status of available or coming soon and, when available, its value.
- **Language version**: English (left-to-right, default address) or Arabic (right-to-left, own
  address), each with its own title, description and preview text.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In a hallway test with at least 5 first-time visitors, at least 4 can correctly say
  who the organization serves and what it aims to do within 30 seconds of opening the page.
- **SC-002**: From any point on the page, a visitor reaches any section in at most 2 taps or
  clicks, on every screen size and in both languages.
- **SC-003**: 100% of sections, labels, image descriptions and search/sharing texts exist in both
  English and Arabic.
- **SC-004**: There is no horizontal scrolling at any width from 320 px to 2560 px, verified at
  390, 768, 1280 and 1440 px in both languages.
- **SC-005**: On a typical mobile connection, the hero headline is visible within 2.5 seconds and
  the page responds to input without noticeable delay.
- **SC-006**: Automated audits on mobile score at least 90 out of 100 for performance,
  accessibility, best practices and search-friendliness in both languages, and an automated
  accessibility scan reports zero WCAG 2.2 AA violations.
- **SC-007**: The first visit downloads at most 1.5 MB in total, and no single image exceeds
  300 KB.
- **SC-008**: Link previews for both language versions show the correct name, description and
  image in a sharing-preview checker.
- **SC-009**: The email link opens a new message to info@wecan-jo.org on every tested device and
  browser.
- **SC-010**: UAT for the General public role passes with no open critical or major defects in
  either language, and the organization approves the English content for launch (the Arabic
  wording is reviewed after launch).

## Assumptions

- **Audience**: the general public is the only UAT role for this release; it includes women and
  youth, partners and funders, journalists and search/social visitors.
- **Scope**: one single-page site per language. Programs, news, donations and volunteering pages
  are out of scope for now and will be added as the organization develops.
- **Copy**: the hero supporting sentence and the section headings in FR-001 and FR-002 were
  derived from the organization's content and approved by the organization on 2026-10-28.
- **Arabic**: apart from the organization's registered Arabic name and the founders' names (both
  confirmed), the Arabic text is drafted by the project team, goes live with the English
  version, and is reviewed and corrected by the organization after launch.
- **Founders**: the four people are presented together as the founding team; no headshots are
  available yet.
- **Contact**: only email is available today; the other channels stay as placeholders until the
  organization supplies real details.
- **Photos**: the four supplied photographs are used with the organization's permission; the
  Wadi Rum photo in the older OneDrive copy is not used.
- **Address**: the site keeps its existing web address, www.wecan-jo.org.
- **Privacy**: no analytics or cookies, so no cookie consent notice is needed.
- **Browsers**: the latest two versions of Chrome, Edge, Firefox and Safari on desktop and mobile.
- **Design sources**: the approved Stitch project "We Can Organization Website" (screens for large
  desktop, laptop, tablet, mobile, mobile menu, and Arabic laptop and mobile) and the repository's
  `DESIGN.md`.
