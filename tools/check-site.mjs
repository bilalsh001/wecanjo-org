// Automated checks for the bilingual site (Node built-ins only).
// Usage: node tools/check-site.mjs [--group core|founders|contact|i18n|nav|seo|budgets|privacy|all] [--page index.html|ar/index.html]
// Expected values come from specs/001-bilingual-landing-page/contracts/.
import { existsSync, readFileSync, statSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const groupArg = process.argv.indexOf('--group');
const group = groupArg > 0 ? process.argv[groupArg + 1] : 'all';
const groups = ['core', 'founders', 'contact', 'i18n', 'nav', 'seo', 'budgets', 'privacy'];
if (group !== 'all' && !groups.includes(group)) {
  console.error(`Unknown group "${group}". Use one of: ${groups.join(', ')}, all`);
  process.exit(2);
}

const site = 'https://www.wecan-jo.org';
const sections = ['top', 'about', 'vision', 'mission', 'founders', 'contact'];
const pages = [
  {
    lang: 'en', dir: 'ltr', file: 'index.html', other: '/ar/', otherLang: 'ar', switchName: 'العربية',
    title: 'We Can Organization | Empowering women and youth in Jordan',
    description: 'We Can Organization is a community-based NGO in Jordan creating opportunities and resources for women and youth to thrive socially and economically.',
    canonical: `${site}/`, ogLocale: 'en_US', ogLocaleAlt: 'ar_JO', soon: 'Coming soon',
    founders: [
      ['Insaf Daas', 'Master in Gender Studies', 'Founder of the "We Can Initiative" and expert in gender mainstreaming and integration, and sustainable development.'],
      ['Dr. Maysoon Otoom', 'PhD, Sociology', "Faculty Member, Center for Women's Studies, University of Jordan."],
      ['Dr. Abeer Dababneh', 'PhD, Gender Studies and Human Rights', 'Commissioner of the Independent Election Commission of Jordan.'],
      ['Emad Shehab', 'B.Sc. Mathematics', 'Founder and President of Broccoli Not for Profit Organization.'],
    ],
    initials: ['ID', 'MO', 'AD', 'ES'],
    fonts: ['eb-garamond-latin', 'eb-garamond-italic-latin', 'manrope-latin', 'ibm-plex-sans-arabic-600-arabic'],
  },
  {
    lang: 'ar', dir: 'rtl', file: 'ar/index.html', other: '/', otherLang: 'en', switchName: 'English',
    title: 'جمعية نحن نستطيع | تمكين المرأة والشباب في الأردن',
    description: 'جمعية نحن نستطيع منظمة مجتمعية في الأردن توفّر الفرص والموارد للنساء والشباب ليزدهروا اجتماعيًا واقتصاديًا.',
    canonical: `${site}/ar/`, ogLocale: 'ar_JO', ogLocaleAlt: 'en_US', soon: 'قريبًا',
    founders: [
      ['إنصاف دعاس', 'ماجستير في دراسات النوع الاجتماعي', 'مؤسِّسة مبادرة «نحن نستطيع»، وخبيرة في تعميم مراعاة النوع الاجتماعي وإدماجه وفي التنمية المستدامة.'],
      ['د. ميسون العتوم', 'دكتوراه في علم الاجتماع', 'عضو هيئة تدريس، مركز دراسات المرأة، الجامعة الأردنية.'],
      ['د. عبير دبابنة', 'دكتوراه في دراسات النوع الاجتماعي وحقوق الإنسان', 'مفوّضة في الهيئة المستقلة للانتخاب في الأردن.'],
      ['عماد شهاب', 'بكالوريوس في الرياضيات', 'مؤسس ورئيس منظمة بروكلي غير الربحية.'],
    ],
    initials: ['إ‌د', 'م‌ع', 'ع‌د', 'ع‌ش'],
    fonts: ['amiri-400-arabic', 'amiri-700-arabic', 'ibm-plex-sans-arabic-400-arabic', 'ibm-plex-sans-arabic-600-arabic',
      'ibm-plex-sans-arabic-400-latin', 'ibm-plex-sans-arabic-600-latin'],
  },
];

const failures = [];
const fail = (g, msg) => failures.push(`FAIL [${g}] ${msg}`);
const read = (rel) => (existsSync(join(root, rel)) ? readFileSync(join(root, rel), 'utf8') : null);
const size = (rel) => (existsSync(join(root, rel)) ? statSync(join(root, rel)).size : 0);
const kb = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;

const decode = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ');
const plainText = (html) => decode(html.replace(/<!--[\s\S]*?-->/g, ' ').replace(/<script[\s\S]*?<\/script>/g, ' ')
  .replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ');
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g)]
  .slice(1).map(([, k, a, b, c]) => [k.toLowerCase(), decode(a ?? b ?? c ?? '')]));
const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'gi'))].map((m) => ({ raw: m[0], index: m.index, a: attrs(m[0]) }));
const ids = (html) => new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));
const metaContent = (html, key) => tags(html, 'meta').find((t) => t.a.name === key || t.a.property === key)?.a.content;
const linkHref = (html, rel, extra = {}) => tags(html, 'link').find((t) => t.a.rel === rel
  && Object.entries(extra).every(([k, v]) => t.a[k] === v))?.a.href;
const fileForPath = (p) => {
  const clean = p.split('#')[0].split('?')[0];
  if (clean === '/' || clean === '') return 'index.html';
  if (clean.endsWith('/')) return `${clean.slice(1)}index.html`;
  return clean.slice(1);
};

const pageArg = process.argv.indexOf('--page');
const onlyPage = pageArg > 0 ? process.argv[pageArg + 1] : null;
for (const page of pages) page.html = read(page.file);
const present = pages.filter((p) => p.html !== null && (!onlyPage || p.file === onlyPage));
for (const page of pages) if (page.html === null) fail('core', `${page.file} is missing`);

function checkCore() {
  for (const p of present) {
    const h1 = tags(p.html, 'h1').length;
    if (h1 !== 1) fail('core', `${p.file}: expected exactly one h1, found ${h1}`);
    const found = [...p.html.matchAll(/<section\b[^>]*\bid="([^"]+)"/g)].map((m) => m[1]);
    if (found.join() !== sections.join()) fail('core', `${p.file}: section IDs ${found.join(', ') || '(none)'} should be ${sections.join(', ')}`);
    for (const img of tags(p.html, 'img')) {
      for (const need of ['alt', 'width', 'height']) if (!(need in img.a)) fail('core', `${p.file}: <img src="${img.a.src}"> has no ${need}`);
    }
    const pageIds = ids(p.html);
    for (const a of tags(p.html, 'a')) {
      const href = a.a.href || '';
      if (href.startsWith('#') && href.length > 1 && !pageIds.has(href.slice(1))) fail('core', `${p.file}: link ${href} has no target`);
      if (href.startsWith('/') && !href.startsWith('//')) {
        const target = fileForPath(href);
        if (!existsSync(join(root, target))) fail('core', `${p.file}: link ${href} points to missing ${target}`);
        const hash = href.split('#')[1];
        if (hash && existsSync(join(root, target)) && !ids(read(target)).has(hash)) fail('core', `${p.file}: link ${href} has no target in ${target}`);
      }
    }
    const assets = [];
    for (const t of [...tags(p.html, 'img'), ...tags(p.html, 'script')]) if (t.a.src) assets.push(t.a.src);
    for (const t of [...tags(p.html, 'img'), ...tags(p.html, 'source')]) if (t.a.srcset) assets.push(...t.a.srcset.split(',').map((s) => s.trim().split(/\s+/)[0]));
    for (const t of tags(p.html, 'link')) {
      if (t.a.href && t.a.rel !== 'canonical' && t.a.rel !== 'alternate') assets.push(t.a.href);
      if (t.a.imagesrcset) assets.push(...t.a.imagesrcset.split(',').map((s) => s.trim().split(/\s+/)[0]));
    }
    for (const src of assets) {
      if (src.startsWith('/') && !src.startsWith('//') && !existsSync(join(root, fileForPath(src)))) fail('core', `${p.file}: asset ${src} is missing`);
    }
  }
  if (!(read('CNAME') || '').includes('www.wecan-jo.org')) fail('core', 'CNAME must contain www.wecan-jo.org');
}

function checkFounders() {
  for (const p of present) {
    const cards = (p.html.match(/class="[^"]*\bfounder-card\b[^"]*"/g) || []).length;
    if (cards !== 4) fail('founders', `${p.file}: expected 4 founder cards, found ${cards}`);
    const text = plainText(p.html);
    let last = -1;
    p.founders.forEach(([name, credential, role], i) => {
      const at = text.indexOf(name);
      if (at < 0) fail('founders', `${p.file}: missing founder name "${name}"`);
      else if (at < last) fail('founders', `${p.file}: "${name}" is out of order`);
      last = Math.max(last, at);
      for (const s of [credential, role]) if (!text.includes(s)) fail('founders', `${p.file}: missing "${s}"`);
      const badges = [...p.html.matchAll(/class="[^"]*\bfounder-card__badge\b[^"]*"[^>]*>([^<]*)</g)].map((m) => m[1].trim());
      if (badges[i] !== p.initials[i]) fail('founders', `${p.file}: badge ${i + 1} is "${badges[i] ?? ''}", expected "${p.initials[i]}"`);
    });
  }
}

function checkContact() {
  const blocks = {};
  for (const p of present) {
    if (!p.html.includes('href="mailto:info@wecan-jo.org"')) fail('contact', `${p.file}: missing mailto:info@wecan-jo.org link`);
    blocks[p.file] = [];
    for (const ch of ['phone', 'social', 'form']) {
      const m = p.html.match(new RegExp(`<!-- PLACEHOLDER:${ch} START -->([\\s\\S]*?)<!-- PLACEHOLDER:${ch} END -->`));
      if (!m) {
        // A channel switched on (README, "Switch on a contact channel") replaces its placeholder with a working card.
        if (!p.html.includes(`data-channel="${ch}"`)) fail('contact', `${p.file}: channel "${ch}" is neither a placeholder nor a working card`);
        continue;
      }
      blocks[p.file].push(ch);
      const block = m[1];
      if (/<a\b/i.test(block)) fail('contact', `${p.file}: placeholder "${ch}" contains a link`);
      if (/tabindex\s*=/i.test(block)) fail('contact', `${p.file}: placeholder "${ch}" sets tabindex`);
      if (/<(input|textarea|select|button)\b/i.test(block) && !/<fieldset\b[^>]*\bdisabled\b/i.test(block)) fail('contact', `${p.file}: placeholder "${ch}" has enabled controls`);
      if (/<form\b[^>]*\baction\s*=/i.test(block)) fail('contact', `${p.file}: placeholder form has an action`);
      if (!plainText(block).includes(p.soon)) fail('contact', `${p.file}: placeholder "${ch}" lacks "${p.soon}"`);
    }
  }
  if (present.length === 2 && blocks[present[0].file].join() !== blocks[present[1].file].join()) {
    fail('contact', `the pages have different placeholders: ${present.map((p) => `${p.file} [${blocks[p.file].join(', ')}]`).join(' vs ')}`);
  }
}

function checkI18n() {
  for (const p of present) {
    const html = tags(p.html, 'html')[0]?.a || {};
    if (html.lang !== p.lang || html.dir !== p.dir) fail('i18n', `${p.file}: <html> must have lang="${p.lang}" dir="${p.dir}"`);
    const sw = tags(p.html, 'a').filter((t) => /\blang-switch\b/.test(t.a.class || ''));
    if (!sw.length) fail('i18n', `${p.file}: no language switch link`);
    for (const t of sw) {
      if (fileForPath(t.a.href || '') !== fileForPath(p.other)) fail('i18n', `${p.file}: language link should point to ${p.other}`);
      if (t.a.lang !== p.otherLang || t.a.hreflang !== p.otherLang) fail('i18n', `${p.file}: language link needs lang/hreflang="${p.otherLang}"`);
      if (t.a['aria-label'] !== p.switchName) fail('i18n', `${p.file}: language link accessible name should be "${p.switchName}"`);
    }
  }
  if (present.length === 2) {
    const [en, ar] = present;
    const sec = (h) => [...h.matchAll(/<section\b[^>]*\bid="([^"]+)"/g)].map((m) => m[1]).join();
    if (sec(en.html) !== sec(ar.html)) fail('i18n', 'section IDs differ between the two pages');
    const imgs = (h) => tags(h, 'img');
    const counts = (h) => [imgs(h).length, imgs(h).filter((i) => i.a.alt).length, imgs(h).filter((i) => i.a.alt === '').length].join('/');
    if (counts(en.html) !== counts(ar.html)) fail('i18n', `image counts differ (all/with alt/empty alt): en ${counts(en.html)}, ar ${counts(ar.html)}`);
    if (!ar.html.includes('جمعية نحن نستطيع')) fail('i18n', 'ar/index.html must use the registered name جمعية نحن نستطيع');
    if (ar.html.includes('منظمة نحن نستطيع')) fail('i18n', 'ar/index.html still uses the superseded draft name منظمة نحن نستطيع');
  }
}

function checkNav() {
  for (const p of present) {
    if (!/\bno-js\b/.test(tags(p.html, 'html')[0]?.a.class || '')) fail('nav', `${p.file}: <html> must start with class "no-js"`);
    const toggle = tags(p.html, 'button').find((t) => t.a['aria-controls'] === 'site-menu');
    if (!toggle) fail('nav', `${p.file}: no menu button with aria-controls="site-menu"`);
    else if (toggle.a['aria-expanded'] !== 'false') fail('nav', `${p.file}: menu button must start with aria-expanded="false"`);
    if (!ids(p.html).has('site-menu')) fail('nav', `${p.file}: #site-menu is missing`);
    const firstLink = tags(p.html.slice(p.html.search(/<body\b/i)), 'a')[0];
    if (firstLink?.a.href !== '#main' || !ids(p.html).has('main')) fail('nav', `${p.file}: the first link must be the skip link to #main`);
    for (const nav of p.html.matchAll(/<nav\b[^>]*>([\s\S]*?)<\/nav>/g)) {
      for (const a of tags(nav[1], 'a')) {
        const href = a.a.href || '';
        if (href.startsWith('#') && !sections.includes(href.slice(1))) fail('nav', `${p.file}: nav link ${href} is not a section`);
      }
    }
  }
}

function checkSeo() {
  for (const p of present) {
    const h = p.html;
    const title = decode(h.match(/<title>([\s\S]*?)<\/title>/)?.[1].trim() || '');
    if (title !== p.title) fail('seo', `${p.file}: title is "${title}"`);
    if ([...title].length > 60) fail('seo', `${p.file}: title longer than 60 characters`);
    const desc = metaContent(h, 'description');
    if (desc !== p.description) fail('seo', `${p.file}: meta description differs from the contract`);
    if (desc && [...desc].length > 160) fail('seo', `${p.file}: description longer than 160 characters`);
    if (linkHref(h, 'canonical') !== p.canonical) fail('seo', `${p.file}: canonical should be ${p.canonical}`);
    for (const [lang, href] of [['en', `${site}/`], ['ar', `${site}/ar/`], ['x-default', `${site}/`]]) {
      if (linkHref(h, 'alternate', { hreflang: lang }) !== href) fail('seo', `${p.file}: hreflang ${lang} should be ${href}`);
    }
    const og = {
      'og:type': 'website', 'og:url': p.canonical, 'og:image': `${site}/images/web/og-image.jpg`,
      'og:image:width': '1200', 'og:image:height': '630', 'og:locale': p.ogLocale, 'og:locale:alternate': p.ogLocaleAlt,
      'og:title': undefined, 'og:description': p.description, 'og:site_name': undefined, 'og:image:alt': undefined,
      'twitter:card': 'summary_large_image', 'twitter:title': undefined, 'twitter:description': p.description,
      'twitter:image': `${site}/images/web/og-image.jpg`, 'theme-color': '#2F4A35',
    };
    for (const [key, want] of Object.entries(og)) {
      const got = metaContent(h, key);
      if (!got) fail('seo', `${p.file}: missing ${key}`);
      else if (want !== undefined && got !== want) fail('seo', `${p.file}: ${key} is "${got}", expected "${want}"`);
    }
    for (const [rel, href] of [['icon', '/favicon.ico'], ['apple-touch-icon', '/apple-touch-icon.png'], ['manifest', '/site.webmanifest']]) {
      if (linkHref(h, rel) !== href) fail('seo', `${p.file}: <link rel="${rel}"> should point to ${href}`);
      if (!existsSync(join(root, href.slice(1)))) fail('seo', `${href} is missing`);
    }
    const ld = h.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    if (!ld) { fail('seo', `${p.file}: no JSON-LD`); continue; }
    let data;
    try { data = JSON.parse(ld[1]); } catch (e) { fail('seo', `${p.file}: JSON-LD does not parse (${e.message})`); continue; }
    if (data['@type'] !== 'NGO' || data['@id'] !== `${site}/#organization`) fail('seo', `${p.file}: JSON-LD must be the NGO ${site}/#organization`);
    if (data.alternateName !== 'جمعية نحن نستطيع' || data.email !== 'info@wecan-jo.org') fail('seo', `${p.file}: JSON-LD name or email is wrong`);
    if (data.description !== p.description) fail('seo', `${p.file}: JSON-LD description should match the meta description`);
    if (!Array.isArray(data.founder) || data.founder.length !== 4) fail('seo', `${p.file}: JSON-LD should list 4 founders`);
    for (const url of [data.logo, data.image]) if (!url?.startsWith(site) || !existsSync(join(root, url.slice(site.length + 1)))) fail('seo', `${p.file}: JSON-LD file ${url} is missing`);
  }
  const sitemap = read('sitemap.xml') || '';
  for (const loc of [`${site}/`, `${site}/ar/`]) if (!sitemap.includes(`<loc>${loc}</loc>`)) fail('seo', `sitemap.xml lacks ${loc}`);
  if (!(read('robots.txt') || '').includes(`Sitemap: ${site}/sitemap.xml`)) fail('seo', 'robots.txt lacks the Sitemap line');
  try {
    const manifest = JSON.parse(read('site.webmanifest') || '');
    for (const icon of manifest.icons || []) if (!existsSync(join(root, icon.src.replace(/^\//, '')))) fail('seo', `manifest icon ${icon.src} is missing`);
    if (!manifest.icons?.length) fail('seo', 'site.webmanifest has no icons');
  } catch { fail('seo', 'site.webmanifest is missing or invalid JSON'); }
}

function checkBudgets() {
  const imageFiles = ['images/web', 'images/icons'].flatMap((d) => (existsSync(join(root, d)) ? readdirSync(join(root, d)).map((f) => `${d}/${f}`) : []))
    .concat(['favicon.ico', 'apple-touch-icon.png']);
  for (const f of imageFiles) if (size(f) > 300 * 1024) fail('budgets', `${f} is ${kb(size(f))} (limit 300 KB)`);
  if (size('styles.css') > 32 * 1024) fail('budgets', `styles.css is ${kb(size('styles.css'))} (limit 32 KB)`);
  if (size('script.js') > 8 * 1024) fail('budgets', `script.js is ${kb(size('script.js'))} (limit 8 KB)`);
  for (const p of present) {
    const fonts = p.fonts.reduce((sum, f) => sum + size(`fonts/${f}.woff2`), 0);
    if (fonts > 350 * 1024) fail('budgets', `${p.file}: fonts ${kb(fonts)} (limit 350 KB)`);
    const firstLoad = size(p.file) + size('styles.css') + size('script.js') + fonts
      + size('images/web/hero-portrait-1080.jpg') + size('images/web/logo-mark-192.png');
    if (firstLoad > 1.5 * 1024 * 1024) fail('budgets', `${p.file}: phone first load about ${kb(firstLoad)} (limit 1.5 MB)`);
    console.log(`  ${p.file}: fonts ${kb(fonts)}, phone first load about ${kb(firstLoad)}`);
  }
}

function checkPrivacy() {
  for (const f of ['index.html', 'ar/index.html', 'styles.css', 'script.js']) {
    // Ordinary links (<a href>) only load when a visitor follows them, so they are not counted (FR-033).
    const text = read(f)?.replace(/<a\b[^>]*>/gi, '');
    if (text === undefined) continue;
    for (const m of text.matchAll(/(?:https?:)?\/\/([a-z0-9.-]+\.[a-z]{2,})/gi)) {
      const host = m[1].toLowerCase();
      if (host === 'www.wecan-jo.org' || (host === 'schema.org' && f.endsWith('.html'))) continue;
      fail('privacy', `${f}: reference to third-party host ${host}`);
    }
  }
}

const run = { core: checkCore, founders: checkFounders, contact: checkContact, i18n: checkI18n, nav: checkNav, seo: checkSeo, budgets: checkBudgets, privacy: checkPrivacy };
for (const g of group === 'all' ? groups : [group]) run[g]();

for (const f of failures) console.log(f);
console.log(failures.length ? `${failures.length} check(s) failed` : 'All checks passed');
process.exit(failures.length ? 1 : 0);
