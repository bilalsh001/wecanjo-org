# Placeholder Contract: contact channels

Covers FR-009 and FR-010 (clarified: switch channels on by editing both pages with a step-by-step
guide; nothing depends on scripts). The guide for the organization lives in `README.md` and follows
the steps below.

## Rules for a "coming soon" card

- It is wrapped in `<!-- PLACEHOLDER:<channel> START -->` … `<!-- PLACEHOLDER:<channel> END -->`
  in **both** `index.html` and `ar/index.html`. Channels: `phone` (phone and WhatsApp), `social`
  (Facebook, Instagram, LinkedIn, X), `form`.
- It shows the card title, a muted icon and the "Coming soon" / "قريبًا" badge, followed by
  visually hidden text: "not available yet" / "غير متاح بعد".
- It contains no `<a>`, no `tabindex`, and no enabled form control.
- The form placeholder is `<form class="contact-form" aria-describedby="…">` without `action`,
  wrapping `<fieldset disabled>` with the Name, Email and Message fields and the disabled button.

## Markup pattern (English; Arabic uses the same structure and the Arabic text)

```html
<!-- PLACEHOLDER:phone START -->
<li class="channel channel--soon" data-channel="phone">
  <svg class="channel__icon" aria-hidden="true" focusable="false">…</svg>
  <h3 class="channel__title">Phone &amp; WhatsApp</h3>
  <p class="channel__status">
    <span class="badge">Coming soon</span><span class="visually-hidden">, not available yet</span>
  </p>
</li>
<!-- PLACEHOLDER:phone END -->
```

## Switching a channel on (step-by-step)

1. Get the real details from the organization: phone number (international format, for example
   `+962 7X XXX XXXX`), WhatsApp number, profile addresses, or the form service address.
2. Open `index.html`, find the matching `PLACEHOLDER:<channel>` block, and replace the card between
   the START and END comments with the "available" version below.
3. Do the same in `ar/index.html` using the Arabic labels from [content.md](content.md); keep
   numbers and web addresses inside `dir="ltr"`.
4. Remove the two placeholder comments for that channel in both files.
5. Preview locally, run `node tools/check-site.mjs`, and publish through the normal review
   workflow.

### "Available" versions

```html
<!-- Phone & WhatsApp -->
<li class="channel" data-channel="phone">
  <svg class="channel__icon" aria-hidden="true" focusable="false">…</svg>
  <h3 class="channel__title">Phone &amp; WhatsApp</h3>
  <p><a href="tel:+9627XXXXXXXX" dir="ltr">+962 7X XXX XXXX</a></p>
  <p><a href="https://wa.me/9627XXXXXXXX">WhatsApp</a></p>
</li>

<!-- Social media: list only the networks that exist -->
<li class="channel" data-channel="social">
  <svg class="channel__icon" aria-hidden="true" focusable="false">…</svg>
  <h3 class="channel__title">Social media</h3>
  <ul class="social-links">
    <li><a href="https://www.facebook.com/…">Facebook</a></li>
    <li><a href="https://www.instagram.com/…">Instagram</a></li>
  </ul>
</li>
```

The contact form needs extra care before it goes live: a form service account, a short privacy
notice next to the form, and the organization's explicit approval, because it would collect
personal data (constitution, privacy constraint). Until then it stays a placeholder.

## Verification

`tools/check-site.mjs` confirms that every `channel--soon` card and the disabled form contain no
links or focusable controls, and that both pages contain the same set of placeholder blocks.
