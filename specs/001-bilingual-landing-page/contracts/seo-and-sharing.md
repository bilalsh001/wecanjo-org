# Search and Sharing Contract

Exact metadata for both pages and the site-wide files. Base address: `https://www.wecan-jo.org`.

## English page (`/`)

| Tag | Value |
|-----|-------|
| `<title>` | We Can Organization \| Empowering women and youth in Jordan |
| `meta description` | We Can Organization is a community-based NGO in Jordan creating opportunities and resources for women and youth to thrive socially and economically. |
| `link canonical` | https://www.wecan-jo.org/ |
| `link alternate hreflang="en"` | https://www.wecan-jo.org/ |
| `link alternate hreflang="ar"` | https://www.wecan-jo.org/ar/ |
| `link alternate hreflang="x-default"` | https://www.wecan-jo.org/ |
| `og:type` / `og:site_name` | website / We Can Organization |
| `og:title` | We Can Organization: Empowering women and youth in Jordan |
| `og:description` | Same as the meta description |
| `og:url` | https://www.wecan-jo.org/ |
| `og:image` (+ `:width`, `:height`, `:alt`) | https://www.wecan-jo.org/images/web/og-image.jpg, 1200, 630, "We Can Organization logo" |
| `og:locale` / `og:locale:alternate` | en_US / ar_JO |
| `twitter:card` | summary_large_image (title, description and image as for Open Graph) |
| `meta theme-color` | #2F4A35 |

## Arabic page (`/ar/`)

| Tag | Value |
|-----|-------|
| `<title>` | جمعية نحن نستطيع \| تمكين المرأة والشباب في الأردن |
| `meta description` | جمعية نحن نستطيع منظمة مجتمعية في الأردن توفّر الفرص والموارد للنساء والشباب ليزدهروا اجتماعيًا واقتصاديًا. |
| `link canonical` | https://www.wecan-jo.org/ar/ |
| `link alternate` (en, ar, x-default) | Same three links as the English page |
| `og:type` / `og:site_name` | website / جمعية نحن نستطيع |
| `og:title` | جمعية نحن نستطيع: تمكين المرأة والشباب في الأردن |
| `og:description` | Same as the meta description |
| `og:url` | https://www.wecan-jo.org/ar/ |
| `og:image` (+ `:width`, `:height`, `:alt`) | Same image, 1200, 630, "شعار جمعية نحن نستطيع" |
| `og:locale` / `og:locale:alternate` | ar_JO / en_US |
| `twitter:card` | summary_large_image (Arabic title, description and image alt) |
| `meta theme-color` | #2F4A35 |

The Arabic metadata is draft text like the rest of the Arabic copy (FR-021).

## Icons and manifest (both pages)

```html
<link rel="icon" href="/favicon.ico" sizes="32x32 48x48">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
```

`site.webmanifest`: `name` "We Can Organization", `short_name` "We Can", `start_url` "/",
`display` "browser", `lang` "en", `dir` "ltr", `theme_color` "#2F4A35", `background_color`
"#FAF8F2", icons `/images/icons/icon-192.png` (192×192) and `/images/icons/icon-512.png` (512×512).

## Structured data (JSON-LD, both pages)

One `<script type="application/ld+json">` per page with the same entity; only `description` changes
language.

```json
{
  "@context": "https://schema.org",
  "@type": "NGO",
  "@id": "https://www.wecan-jo.org/#organization",
  "name": "We Can Organization",
  "alternateName": "جمعية نحن نستطيع",
  "url": "https://www.wecan-jo.org/",
  "logo": "https://www.wecan-jo.org/images/web/logo-full-480.png",
  "image": "https://www.wecan-jo.org/images/web/og-image.jpg",
  "email": "info@wecan-jo.org",
  "description": "<the page's meta description>",
  "address": { "@type": "PostalAddress", "addressLocality": "Amman", "addressCountry": "JO" },
  "areaServed": { "@type": "Country", "name": "Jordan" },
  "knowsLanguage": ["en", "ar"],
  "founder": [
    { "@type": "Person", "name": "Insaf Daas", "jobTitle": "Founder of the We Can Initiative" },
    { "@type": "Person", "name": "Dr. Maysoon Otoom", "jobTitle": "Faculty Member, Center for Women's Studies, University of Jordan" },
    { "@type": "Person", "name": "Dr. Abeer Dababneh", "jobTitle": "Commissioner, Independent Election Commission of Jordan" },
    { "@type": "Person", "name": "Emad Shehab", "jobTitle": "Founder and President, Broccoli Not for Profit Organization" }
  ]
}
```

## `sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://www.wecan-jo.org/</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://www.wecan-jo.org/"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://www.wecan-jo.org/ar/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://www.wecan-jo.org/"/>
  </url>
  <url>
    <loc>https://www.wecan-jo.org/ar/</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://www.wecan-jo.org/"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://www.wecan-jo.org/ar/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://www.wecan-jo.org/"/>
  </url>
</urlset>
```

## `robots.txt`

```text
User-agent: *
Allow: /

Sitemap: https://www.wecan-jo.org/sitemap.xml
```

## `_config.yml` (keeps project files off the public site, FR-032)

```yaml
exclude:
  - specs/
  - tools/
  - DESIGN.md
  - README.md
```

After deployment `/DESIGN.html`, `/README.html` and `/specs/` must return 404.
