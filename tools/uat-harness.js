// UAT helper for the General public scripts (specs/001-bilingual-landing-page/uat/uat-scripts.md).
// Testing only; tools/ is not published. In the browser console of a preview page:
//   const uat = await import('/tools/uat-harness.js');
//   uat.checkPage();           // static checks for this page and width
//   await uat.interact();      // scripted clicks and scrolling
//   uat.watchFocus(); ...press Tab...; uat.focusLog();   // keyboard order with real key presses
// Expected values come from contracts/content.md and contracts/seo-and-sharing.md.

const site = 'https://www.wecan-jo.org';
const expected = {
  en: {
    dir: 'ltr', name: 'We Can Organization', other: '/ar/', switchName: 'العربية', skip: 'Skip to content',
    title: 'We Can Organization | Empowering women and youth in Jordan',
    description: 'We Can Organization is a community-based NGO in Jordan creating opportunities and resources for women and youth to thrive socially and economically.',
    h1: 'Empowering women and youth for a better future',
    lead: 'We create opportunities and resources so every woman and young person in Jordan can pursue their dreams and drive positive change.',
    ctas: ['Learn about us', 'Contact us'],
    badge: 'Registered NGO / CBO in Jordan',
    vision: 'A community dedicated to the development and success of all women and youth, where individuals can pursue their dreams and make meaningful contributions to a vibrant and equitable society.',
    mission: [
      'To build a dynamic platform that supports, encourages and empowers youth and women to thrive socially and economically at all levels.',
      'By leveraging the collective strength of our ecosystem, we believe that individual success drives community prosperity.',
      'We are committed to fostering an environment where every young person and woman has the opportunities and resources to achieve their dreams and create positive change.',
    ],
    alts: [
      'Many hands from different people stacked together',
      'Women working together around a long table covered with greenery',
      "The Roman Theatre in Amman with the city's hillside neighborhoods behind it",
      'Young adults in a classroom listening to a teacher',
    ],
    footerAlt: 'We Can Organization logo',
    founders: [
      ['Insaf Daas', 'Master in Gender Studies', 'Founder of the "We Can Initiative" and expert in gender mainstreaming and integration, and sustainable development.'],
      ['Dr. Maysoon Otoom', 'PhD, Sociology', "Faculty Member, Center for Women's Studies, University of Jordan."],
      ['Dr. Abeer Dababneh', 'PhD, Gender Studies and Human Rights', 'Commissioner of the Independent Election Commission of Jordan.'],
      ['Emad Shehab', 'B.Sc. Mathematics', 'Founder and President of Broccoli Not for Profit Organization.'],
    ],
    initials: ['ID', 'MO', 'AD', 'ES'],
    emailTitle: 'Email us', location: 'Amman, Jordan',
    channels: ['Phone & WhatsApp', 'Social media', 'Contact form'], soon: 'Coming soon',
    networks: ['Facebook', 'Instagram', 'LinkedIn', 'X'],
  },
  ar: {
    dir: 'rtl', name: 'جمعية نحن نستطيع', other: '/', switchName: 'English', skip: 'تخطَّ إلى المحتوى',
    title: 'جمعية نحن نستطيع | تمكين المرأة والشباب في الأردن',
    description: 'جمعية نحن نستطيع منظمة مجتمعية في الأردن توفّر الفرص والموارد للنساء والشباب ليزدهروا اجتماعيًا واقتصاديًا.',
    h1: 'تمكين المرأة والشباب من أجل مستقبل أفضل',
    lead: 'نوفّر الفرص والموارد لتتمكّن كل امرأة وكل شاب وشابة في الأردن من تحقيق أحلامهم وصناعة تغيير إيجابي.',
    ctas: ['تعرّف علينا', 'تواصل معنا'],
    badge: 'مسجّلة في الأردن كمنظمة غير حكومية / مجتمعية',
    vision: 'مجتمعٌ يكرّس جهوده لتنمية جميع النساء والشباب ونجاحهم، حيث يستطيع الأفراد تحقيق أحلامهم والإسهام إسهامًا هادفًا في مجتمعٍ حيويٍّ وعادل.',
    mission: [
      'بناء منصة ديناميكية تدعم الشباب والنساء وتشجّعهم وتمكّنهم من الازدهار اجتماعيًا واقتصاديًا على جميع المستويات.',
      'من خلال تسخير القوة الجماعية لمنظومتنا، نؤمن بأن نجاح الفرد يقود إلى ازدهار المجتمع.',
      'نلتزم بتهيئة بيئة تتيح لكل شاب وشابة ولكل امرأة الفرص والموارد اللازمة لتحقيق أحلامهم وإحداث تغيير إيجابي.',
    ],
    alts: [
      'أيادٍ كثيرة لأشخاص مختلفين متراصّة معًا',
      'نساء يعملن معًا حول طاولة طويلة مغطاة بالأغصان الخضراء',
      'المدرج الروماني في عمّان وخلفه أحياء المدينة على التلال',
      'شباب وشابات في قاعة دراسية يستمعون إلى مدرّس',
    ],
    footerAlt: 'شعار جمعية نحن نستطيع',
    founders: [
      ['إنصاف دعاس', 'ماجستير في دراسات النوع الاجتماعي', 'مؤسِّسة مبادرة «نحن نستطيع»، وخبيرة في تعميم مراعاة النوع الاجتماعي وإدماجه وفي التنمية المستدامة.'],
      ['د. ميسون العتوم', 'دكتوراه في علم الاجتماع', 'عضو هيئة تدريس، مركز دراسات المرأة، الجامعة الأردنية.'],
      ['د. عبير دبابنة', 'دكتوراه في دراسات النوع الاجتماعي وحقوق الإنسان', 'مفوّضة في الهيئة المستقلة للانتخاب في الأردن.'],
      ['عماد شهاب', 'بكالوريوس في الرياضيات', 'مؤسس ورئيس منظمة بروكلي غير الربحية.'],
    ],
    initials: ['إ‌د', 'م‌ع', 'ع‌د', 'ع‌ش'],
    emailTitle: 'راسلنا عبر البريد الإلكتروني', location: 'عمّان، الأردن',
    channels: ['الهاتف وواتساب', 'وسائل التواصل الاجتماعي', 'نموذج التواصل'], soon: 'قريبًا',
    networks: ['فيسبوك', 'إنستغرام', 'لينكدإن', 'إكس'],
  },
};
const sectionIds = ['top', 'about', 'vision', 'mission', 'founders', 'contact'];

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const text = (el) => (el?.textContent || '').replace(/\s+/g, ' ').trim();
const rect = (el) => el.getBoundingClientRect();
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const visible = (el) => !!el && el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden';
const headerBottom = () => Math.max(0, rect($('.site-header')).bottom);
const rows = (els) => {
  const counts = {};
  els.forEach((e) => { const t = Math.round(rect(e).top + scrollY); counts[t] = (counts[t] || 0) + 1; });
  return Object.values(counts).join('/');
};
const result = (checks) => {
  const failed = Object.entries(checks).filter(([, ok]) => !ok).map(([k]) => k);
  return { pass: failed.length === 0, failed };
};

function context() {
  const lang = document.documentElement.lang === 'ar' ? 'ar' : 'en';
  const w = innerWidth;
  return { lang, e: expected[lang], w, narrow: w < 1024 };
}

// Static checks: what a visitor sees on this page at this width, without interacting.
export function checkPage() {
  const { lang, e, w, narrow } = context();
  scrollTo({ top: 0, behavior: 'instant' });
  const out = { lang, width: w };

  const mark = $('.brand__mark');
  const markHeight = Math.round(rect(mark).height);
  out['UAT-01'] = result({
    markHeight: markHeight === (w < 640 ? 44 : w < 1024 ? 52 : 64),
    name: text($('.brand__name')) === e.name,
    headline: text($('h1')) === e.h1 && rect($('h1')).bottom <= innerHeight,
    sentence: text($('.hero__lead')) === e.lead,
    actionsVisible: $$('.hero__actions a').map(text).join('|') === e.ctas.join('|')
      && $$('.hero__actions a').every((a) => rect(a).bottom <= innerHeight),
  });
  out['UAT-01'].evidence = `mark ${markHeight}px; actions bottom ${Math.round(Math.max(...$$('.hero__actions a').map((a) => rect(a).bottom)))} of ${innerHeight}px`;

  const photos = [$('.hero__media img'), $('#about img'), $('.vision__media'), $('#mission img')];
  out['UAT-03'] = result({
    photoAlts: photos.map((i) => i.alt).join('|') === e.alts.join('|'),
    headerMarkEmpty: mark.getAttribute('alt') === '',
    footerLogo: $('.site-footer__logo').alt === e.footerAlt,
    webCopies: $$('img').every((i) => (i.currentSrc || i.getAttribute('src')).includes('/images/web/') && i.getAttribute('width') && i.getAttribute('height')),
  });

  const cards = $$('.founder-card');
  out['UAT-04'] = result({
    fourCards: cards.length === 4,
    exactText: cards.every((c, i) => text($('.founder-card__name', c)) === e.founders[i][0]
      && text($('.founder-card__credential', c)) === e.founders[i][1] && text($('.founder-card__role', c)) === e.founders[i][2]),
    initials: cards.every((c, i) => $('.founder-card__badge', c).textContent.trim() === e.initials[i]),
    perRow: rows(cards) === (w < 640 ? '1/1/1/1' : w < 1440 ? '2/2' : '4'),
  });
  out['UAT-04'].evidence = `per row ${rows(cards)}`;

  const email = $('.channel--email a');
  out['UAT-05'] = result({
    title: text($('.channel--email .channel__title')) === e.emailTitle,
    mailto: email.getAttribute('href') === 'mailto:info@wecan-jo.org' && text(email) === 'info@wecan-jo.org',
    leftToRight: getComputedStyle(email).direction === 'ltr',
    location: text($('.channel__location')) === e.location,
  });

  const soon = $$('.channel--soon');
  const controls = $$('input, textarea, button', $('.contact-form'));
  out['UAT-06'] = result({
    threeCards: soon.map((c) => text($('.channel__title', c))).join('|') === e.channels.join('|'),
    labelled: soon.every((c) => text($('.badge', c)) === e.soon),
    networks: $$('.channel__networks li').map(text).join('|') === e.networks.join('|'),
    nothingFocusable: soon.every((c) => !$$('a, [tabindex]', c).length) && controls.every((el) => el.matches(':disabled')),
    noFormAction: !$('.contact-form').hasAttribute('action'),
  });

  const html = document.documentElement;
  const images = $$('img');
  const mirrored = images.filter((i) => {
    for (let el = i; el && el !== html; el = el.parentElement) if (getComputedStyle(el).transform.startsWith('matrix(-1')) return true;
    return false;
  });
  out['UAT-08'] = result({
    direction: html.dir === e.dir && getComputedStyle(document.body).direction === e.dir,
    logoOnStartSide: lang === 'ar' ? rect(mark).left > rect($('.brand__name')).left : rect(mark).left < rect($('.brand__name')).left,
    registeredName: lang === 'en' || (document.title.includes(e.name) && text($('.brand__name')) === e.name && text($('.site-footer__meta')).includes(e.name)),
    sections: $$('main > section').map((s) => s.id).join() === sectionIds.join(),
    sixImages: images.length === 6,
    notMirrored: mirrored.length === 0,
  });

  const overflow = document.documentElement.scrollWidth - document.documentElement.clientWidth;
  const aboutMedia = rect($('#about .split__media'));
  const aboutText = rect($('#about .split__text'));
  out['UAT-13'] = result({
    noHorizontalScroll: overflow <= 0,
    heroPhoto: $('.hero__media img').currentSrc.includes(w < 640 ? 'hero-portrait' : 'hero-'),
    aboutLayout: narrow ? aboutMedia.top < aboutText.top : Math.abs(aboutMedia.top + aboutMedia.height / 2 - (aboutText.top + aboutText.height / 2)) < aboutMedia.height / 2,
    contactLayout: rows($$('.contact__channels > .channel')) === (w < 640 ? '1/1/1' : w < 1024 ? '1/2' : '3'),
  });
  out['UAT-13'].evidence = `overflow ${overflow}px; contact rows ${rows($$('.contact__channels > .channel'))}`;

  const meta = (k) => $(`meta[name="${k}"], meta[property="${k}"]`)?.content;
  let ld = {};
  try { ld = JSON.parse($('script[type="application/ld+json"]').textContent); } catch { ld = {}; }
  const canonical = `${site}${lang === 'ar' ? '/ar/' : '/'}`;
  out['UAT-14'] = result({
    titleAndDescription: document.title === e.title && meta('description') === e.description,
    addresses: $('link[rel="canonical"]').href === canonical
      && $('link[hreflang="en"]').href === `${site}/` && $('link[hreflang="ar"]').href === `${site}/ar/`,
    preview: meta('og:title')?.includes(e.name) && meta('og:description') === e.description
      && meta('og:image') === `${site}/images/web/og-image.jpg` && meta('og:image:width') === '1200' && meta('og:image:height') === '630',
    organization: ld['@type'] === 'NGO' && ld.email === 'info@wecan-jo.org' && ld.address?.addressLocality === 'Amman' && !!ld.logo,
    icons: !!$('link[rel="icon"]') && !!$('link[rel="apple-touch-icon"]') && !!$('link[rel="manifest"]'),
  });

  const resources = performance.getEntriesByType('resource');
  const hosts = [...new Set(resources.map((r) => new URL(r.name).host))];
  let stored = 0;
  try { stored = localStorage.length + sessionStorage.length; } catch { stored = 0; }
  const bytes = resources.reduce((s, r) => s + (r.encodedBodySize || 0), 0) + (performance.getEntriesByType('navigation')[0]?.encodedBodySize || 0);
  out['UAT-15'] = result({
    siteOnly: hosts.every((h) => h === location.host),
    noCookies: document.cookie === '',
    nothingStored: stored === 0,
    underBudget: bytes < 1.5 * 1024 * 1024 && resources.filter((r) => r.initiatorType === 'img').every((r) => (r.encodedBodySize || 0) <= 300 * 1024),
  });
  out['UAT-15'].evidence = `hosts ${hosts.join(', ')}; ${Math.round(bytes / 1024)} KB so far`;
  return out;
}

async function settle() {
  await wait(500); // the section observer after an instant scroll
}

async function scrolled() {
  await wait(1700); // a full-page smooth scroll takes about 1.5 s
}

// Scripted visitor actions: clicks and scrolling (keyboard checks use real key presses).
export async function interact() {
  const { lang, e, w, narrow } = context();
  const out = { lang, width: w };
  const inView = (id) => {
    const r = rect(document.getElementById(id));
    return Math.abs(r.top - headerBottom()) <= 2;
  };

  // UAT-02: "Learn about us", then the sections in order with the approved texts.
  scrollTo({ top: 0, behavior: 'instant' }); await wait(300);
  $('.hero__actions a[href="#about"]').click(); await scrolled();
  const aboutTitle = rect($('#about-title'));
  out['UAT-02'] = result({
    movedToAbout: inView('about') && aboutTitle.top >= headerBottom() && aboutTitle.bottom <= innerHeight,
    badge: text($('.badge-line')) === e.badge,
    order: ['about', 'vision', 'mission'].map((id) => rect(document.getElementById(id)).top).every((t, i, a) => i === 0 || t > a[i - 1]),
    vision: text($('.vision__quote')) === e.vision,
    mission: $$('#mission .split__text p:not(.eyebrow)').map(text).join('|') === e.mission.join('|'),
  });

  // UAT-05 step 1: "Contact us" in the hero.
  scrollTo({ top: 0, behavior: 'instant' }); await wait(300);
  $('.hero__actions a[href="#contact"]').click(); await scrolled();
  out['UAT-05 step 1'] = result({ movedToContact: inView('contact') });

  // UAT-06 step 2: clicking placeholders does nothing.
  const before = location.href;
  $$('.channel--soon').forEach((c) => c.click());
  $$('input, textarea, button', $('.contact-form')).forEach((el) => el.click());
  out['UAT-06 step 2'] = result({
    noNavigation: location.href === before,
    noFocusInside: !document.activeElement.closest('.channel--soon'),
  });

  // UAT-10: header stays; the marked section follows the scroll.
  const header = $('.site-header');
  scrollTo({ top: 0, behavior: 'instant' }); await settle();
  const marks = [];
  const current = () => $('.site-nav__link[aria-current="true"]')?.hash.slice(1) || 'none';
  marks.push(`top:${current()}`);
  for (const id of ['about', 'vision', 'mission', 'founders', 'contact']) {
    const s = document.getElementById(id);
    // Put the section's middle on the screen's middle line below the header.
    const mid = (innerHeight + header.offsetHeight) / 2;
    scrollTo({ top: scrollY + rect(s).top + Math.min(rect(s).height / 2, 200) - mid, behavior: 'instant' });
    await settle();
    marks.push(`${id}:${current()}`);
  }
  const shortScreen = innerHeight < 500;
  out['UAT-10'] = result({
    headerStays: shortScreen || (getComputedStyle(header).position === 'sticky' && Math.round(rect(header).top) === 0),
    headerAtMost15pct: header.offsetHeight / innerHeight <= 0.155,
    marksFollow: marks.every((m) => { const [id, mark] = m.split(':'); return id === 'top' ? mark === 'none' : mark === id; }),
  });
  out['UAT-10'].evidence = `${marks.join(' ')}; header ${header.offsetHeight}px of ${innerHeight}px`;

  // UAT-07 step 1-2: at Founders the language link points to the other page's Founders.
  document.getElementById('founders').scrollIntoView({ behavior: 'instant' }); await settle();
  out['UAT-07 step 2 (link)'] = result({
    switchKeepsSection: $('.lang-switch').getAttribute('href') === `${e.other}#founders`,
    announced: $('.lang-switch').getAttribute('aria-label') === e.switchName,
  });

  // UAT-09: reach any section.
  if (!narrow) {
    const links = $$('.site-nav__link');
    const reached = [];
    for (const link of links) {
      link.click(); await scrolled();
      reached.push(inView(link.hash.slice(1)));
    }
    out['UAT-09'] = result({
      headerContents: visible($('.brand__mark')) && links.length === 5 && links.every(visible) && visible($('.lang-switch')) && !visible($('.menu-toggle')),
      oneClickEach: reached.every(Boolean),
    });
  } else {
    const toggle = $('.menu-toggle');
    const menu = $('#site-menu');
    const headerOnly = visible(toggle) && !visible($('.site-nav__link'));
    toggle.click(); await wait(350);
    const opened = menu.getAttribute('role') === 'dialog' && document.activeElement === $('.menu-close')
      && $$('.site-nav__link').every(visible) && visible($('.lang-switch')) && visible($('.menu-email'));
    $('.menu-backdrop').click(); await wait(350);
    const outsideCloses = !menu.classList.contains('is-open') && document.activeElement === toggle;
    toggle.click(); await wait(350);
    $('.menu-close').click(); await wait(350);
    const closeButton = !menu.classList.contains('is-open') && document.activeElement === toggle;
    toggle.click(); await wait(350);
    $('.site-nav__link[href="#founders"]').click(); await scrolled();
    out['UAT-09'] = result({ headerOnly, opened, outsideCloses, closeButton, twoTapsToFounders: !menu.classList.contains('is-open') && inView('founders') });
  }

  // UAT-12: scripts off (the page styles key off the html class).
  const html = document.documentElement;
  html.classList.replace('js', 'no-js');
  out['UAT-12'] = result({
    contentVisible: $$('main section').every(visible),
    linksReachable: $$('.site-nav__link').every(visible) && visible($('.lang-switch')),
    noMenuButton: !visible($('.menu-toggle')) && !visible($('.menu-email')),
  });
  html.classList.replace('no-js', 'js');
  scrollTo({ top: 0, behavior: 'instant' });
  return out;
}

// Keyboard order: call watchFocus(), press Tab with the real keyboard, then read focusLog().
const log = [];
export function watchFocus() {
  log.length = 0;
  document.addEventListener('focusin', (event) => {
    const el = event.target;
    const style = getComputedStyle(el);
    log.push(`${el.getAttribute('aria-label') || text(el).slice(0, 24) || el.tagName}${style.outlineStyle === 'solid' && parseFloat(style.outlineWidth) >= 3 ? '' : ' (no ring)'}`);
  });
  return 'watching';
}
export const focusLog = () => [...log];
