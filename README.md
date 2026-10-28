# We Can Organization website

The bilingual website of We Can Organization (جمعية نحن نستطيع), a community-based NGO in Jordan:
English at <https://www.wecan-jo.org/> and Arabic at <https://www.wecan-jo.org/ar/>. It is a static
site (HTML, one stylesheet and a small script) published by GitHub Pages from the `main` branch.

This guide is for the people who look after the site. `_config.yml` keeps it off the public site.

## What is where

| Path | What it is |
|------|------------|
| `index.html` | English page (`/`) |
| `ar/index.html` | Arabic page (`/ar/`), right-to-left |
| `styles.css` | One stylesheet for both pages (colours and type from `DESIGN.md`) |
| `script.js` | Narrow-screen menu and current-section tracking; the site works without it |
| `images/` | Original photos and logo; never edited |
| `images/web/`, `images/icons/`, `favicon.ico`, `apple-touch-icon.png` | Web-sized copies made by `tools/make-web-images.ps1` |
| `fonts/` | Self-hosted fonts and their licences (SIL Open Font License) |
| `sitemap.xml`, `robots.txt`, `site.webmanifest` | Information for search engines and devices |
| `CNAME`, `_config.yml` | Custom domain and GitHub Pages settings |
| `DESIGN.md` | Design system: colours, type and components |
| `specs/001-bilingual-landing-page/` | Specification, plan, tasks, contracts and test records |
| `tools/` | Preview server, checks, image and font scripts |

## Preview on your computer

Needs Node.js 22 or later; nothing is installed from npm.

```bash
node tools/preview-server.js . 5500
```

Open <http://localhost:5500/> (English) and <http://localhost:5500/ar/> (Arabic).

## Run the checks

```bash
node tools/check-site.mjs
```

`All checks passed` means the page information, both languages, placeholders, links, file sizes and
privacy rules are all in order. To check one area, add `--group` with `core`, `founders`,
`contact`, `i18n`, `nav`, `seo`, `budgets` or `privacy`.

## Change the text: always both languages

Every content change is made in English and Arabic in the same update (FR-016).

1. Change the wording in `specs/001-bilingual-landing-page/contracts/content.md`, the single source
   for every text on the site.
2. Make the same change in `index.html` and in `ar/index.html`.
3. Preview, run the checks and publish (see "Publish a change").

## Arabic translation status

The Arabic text was drafted by the project team and launched with the English version. The
organization's registered Arabic name and the founders' names are confirmed; everything else is a
draft until the organization's site coordinator reviews it, within 2 weeks of launch. Apply each
correction to `content.md` and `ar/index.html`, then change the item's status to `reviewed`. The
status lives here only; visitors never see it.

| Item | Status |
|------|--------|
| Organization name: جمعية نحن نستطيع | confirmed |
| Founders' names: إنصاف دعاس، د. ميسون العتوم، د. عبير دبابنة، عماد شهاب | confirmed |
| Founders' initials in the badges (إ‌د، م‌ع، ع‌د، ع‌ش) | draft |
| Navigation, menu, language switch and skip link | draft |
| Hero: label, headline, sentence and buttons | draft |
| Who we are: label, heading, text and registration badge | draft |
| Our vision: label and quote | draft |
| Our mission: label, heading, paragraphs and highlighted sentence | draft |
| Founders: label, heading, qualifications and roles | draft |
| Contact: label, heading, email card, location, placeholders, form labels and "قريبًا" | draft |
| Footer: summary, registration line, copyright and links name | draft |
| Image descriptions (alt text) | draft |
| Page title, description and sharing text | draft |

## Switch on a contact channel

Phone and WhatsApp, social media and the contact form show as "Coming soon" placeholders. Each one
sits between two comments, for example `<!-- PLACEHOLDER:phone START -->` and
`<!-- PLACEHOLDER:phone END -->`, in both `index.html` and `ar/index.html`.

1. Get the real details from the organization: phone number in international format (for example
   `+962 7X XXX XXXX`), WhatsApp number, or the addresses of the social media profiles.
2. In `index.html`, replace everything from the START comment to the END comment with the English
   card below. Keep the `<svg class="channel__icon" …>` line from the placeholder as it is.
3. Do the same in `ar/index.html` with the Arabic card. Numbers and web addresses stay inside
   `dir="ltr"`.
4. Preview both pages and run `node tools/check-site.mjs`.
5. Publish through the normal review (see "Publish a change").

Phone and WhatsApp, English:

```html
<li class="channel" data-channel="phone">
  <!-- the <svg class="channel__icon" …> line from the placeholder -->
  <h3 class="channel__title">Phone &amp; WhatsApp</h3>
  <p class="channel__value"><a class="target" href="tel:+9627XXXXXXXX" dir="ltr">+962 7X XXX XXXX</a></p>
  <p class="channel__value"><a class="target" href="https://wa.me/9627XXXXXXXX">WhatsApp</a></p>
</li>
```

Phone and WhatsApp, Arabic:

```html
<li class="channel" data-channel="phone">
  <!-- the <svg class="channel__icon" …> line from the placeholder -->
  <h3 class="channel__title">الهاتف وواتساب</h3>
  <p class="channel__value"><a class="target" href="tel:+9627XXXXXXXX" dir="ltr">+962 7X XXX XXXX</a></p>
  <p class="channel__value"><a class="target" href="https://wa.me/9627XXXXXXXX">واتساب</a></p>
</li>
```

Social media, English (list only the networks that exist):

```html
<li class="channel" data-channel="social">
  <!-- the <svg class="channel__icon" …> line from the placeholder -->
  <h3 class="channel__title">Social media</h3>
  <ul class="social-links">
    <li><a href="https://www.facebook.com/…">Facebook</a></li>
    <li><a href="https://www.instagram.com/…">Instagram</a></li>
    <li><a href="https://www.linkedin.com/…">LinkedIn</a></li>
    <li><a href="https://x.com/…">X</a></li>
  </ul>
</li>
```

Social media, Arabic:

```html
<li class="channel" data-channel="social">
  <!-- the <svg class="channel__icon" …> line from the placeholder -->
  <h3 class="channel__title">وسائل التواصل الاجتماعي</h3>
  <ul class="social-links">
    <li><a href="https://www.facebook.com/…">فيسبوك</a></li>
    <li><a href="https://www.instagram.com/…">إنستغرام</a></li>
    <li><a href="https://www.linkedin.com/…">لينكدإن</a></li>
    <li><a href="https://x.com/…">إكس</a></li>
  </ul>
</li>
```

The contact form needs more than an edit: a form service account, a short privacy notice next to
the form, and the organization's explicit approval, because it collects personal data. Until then
it stays a placeholder.

## Regenerate the web images

Only needed when an original photo or the logo changes. From the repository folder, run both
steps in this order:

```bash
powershell -NoProfile -ExecutionPolicy Bypass -File tools/make-web-images.ps1
```

```bash
node tools/make-webp.mjs
```

The first script writes the JPEG and PNG copies listed in
`specs/001-bilingual-landing-page/contracts/assets.md`, keeps every JPEG under 300 KB and never
touches the originals in `images/`. The second makes a smaller WebP copy of each photo and logo
file using Microsoft Edge (or Chrome) in the background, so nothing needs installing; the pages
offer the WebP first and the JPEG/PNG to browsers that cannot show WebP.

## Refresh the fonts

```bash
node tools/fetch-fonts.mjs
```

Downloads the WOFF2 files and their licences into `fonts/` and prints the matching `@font-face`
rules to compare with `styles.css`.

## Publish a change

1. Make the change on a branch, preview it and run the checks.
2. Show the preview to the organization and get their OK.
3. Merge into `main` and push. GitHub Pages rebuilds the site in a minute or two.
4. On <https://www.wecan-jo.org> check that `/` and `/ar/` load, `/sitemap.xml` and `/robots.txt`
   are served, `/DESIGN.html`, `/README.html` and `/specs/` return "404", and a shared link shows
   the name, description and logo.
5. Once, in the repository's Settings → Pages, turn on "Enforce HTTPS".

## Privacy

The site sets no cookies, has no analytics and loads nothing from other websites while a page opens;
the fonts are stored with the site. `node tools/check-site.mjs --group privacy` fails if a page, the
stylesheet or the script would load something from another site. Ordinary links to other sites,
such as social media profiles, are fine.

## Credits

Fonts: EB Garamond, Manrope, Amiri and IBM Plex Sans Arabic, under the SIL Open Font License 1.1
(`fonts/OFL-*.txt`). Photos and logo: provided by the organization.
