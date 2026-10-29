// We Can Organization: the narrow-screen menu panel and current-section tracking.
// Everything here is an enhancement; without scripts the links stay visible in the header.

(() => {
  const root = document.documentElement;
  const menu = document.getElementById('site-menu');
  const toggle = document.querySelector('.menu-toggle');
  const closeButton = menu?.querySelector('.menu-close');
  const backdrop = document.querySelector('.menu-backdrop');
  if (!menu || !toggle || !closeButton || !backdrop) return;

  const narrow = window.matchMedia('(max-width: 1023px)');
  // Everything outside the panel is made inert while it is open, so it behaves as a modal dialog.
  const outside = ['.skip-link', '.brand', '.menu-toggle', 'main', '.site-footer']
    .map((selector) => document.querySelector(selector))
    .filter(Boolean);

  const isOpen = () => menu.classList.contains('is-open');
  const focusable = () => [...menu.querySelectorAll('a[href], button:not([disabled])')]
    .filter((el) => el.getClientRects().length > 0);

  function openMenu() {
    menu.classList.add('is-open');
    backdrop.classList.add('is-visible');
    menu.setAttribute('role', 'dialog');
    menu.setAttribute('aria-modal', 'true');
    menu.setAttribute('aria-label', menu.dataset.dialogLabel);
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', toggle.dataset.labelClose);
    root.classList.add('menu-open');
    outside.forEach((el) => { el.inert = true; });
    document.addEventListener('keydown', onKeydown);
    closeButton.focus();
  }

  function closeMenu({ restoreFocus = true } = {}) {
    menu.classList.remove('is-open');
    backdrop.classList.remove('is-visible');
    menu.removeAttribute('role');
    menu.removeAttribute('aria-modal');
    menu.removeAttribute('aria-label');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', toggle.dataset.labelOpen);
    root.classList.remove('menu-open');
    outside.forEach((el) => { el.inert = false; });
    document.removeEventListener('keydown', onKeydown);
    if (restoreFocus) toggle.focus({ preventScroll: true });
  }

  // Escape closes the panel; Tab and Shift+Tab wrap around inside it.
  function onKeydown(event) {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeMenu();
      return;
    }
    if (event.key !== 'Tab') return;
    const items = focusable();
    const first = items[0];
    const last = items[items.length - 1];
    const inside = menu.contains(document.activeElement);
    if (event.shiftKey && (document.activeElement === first || !inside)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (document.activeElement === last || !inside)) {
      event.preventDefault();
      first.focus();
    }
  }

  toggle.addEventListener('click', () => (isOpen() ? closeMenu() : openMenu()));
  closeButton.addEventListener('click', () => closeMenu());
  backdrop.addEventListener('click', () => closeMenu());
  // Choosing a link closes the panel and the browser follows it as usual. A section link moves focus
  // to its section (the next Tab continues from there); any other link hands focus back to the button.
  menu.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!isOpen() || !link) return;
    const sectionLink = link.hash !== '' && link.pathname === window.location.pathname;
    closeMenu({ restoreFocus: !sectionLink });
  });
  // At 1024 px and wider the full navigation is back in the header.
  narrow.addEventListener('change', (event) => {
    if (!event.matches && isOpen()) closeMenu({ restoreFocus: false });
  });
})();

// Current section: the section covering the middle of the screen is marked in the navigation (none
// while the hero is in view) and the language link opens the other page at that section. The header
// gets its hairline once the page scrolls.
(() => {
  const header = document.querySelector('.site-header');
  const sections = [...document.querySelectorAll('main section[id]')];
  if (!header || !sections.length || !('IntersectionObserver' in window)) return;

  const navLinks = [...document.querySelectorAll('.site-nav__link')];
  const langLink = document.querySelector('.lang-switch');
  const langTop = langLink?.getAttribute('href');
  const inView = new Set();
  let current = null;

  function setCurrent(id) {
    if (id === current) return;
    current = id;
    navLinks.forEach((link) => {
      if (link.hash === `#${id}`) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
    if (langLink) langLink.setAttribute('href', id ? `${langTop}#${id}` : langTop);
  }

  // Only on scroll, never while the page loads: reading scrollY then would force an early layout.
  // A page that opens at a section link scrolls there, which also fires this.
  const markScrolled = () => header.classList.toggle('is-scrolled', window.scrollY > 0);
  window.addEventListener('scroll', markScrolled, { passive: true });

  function onIntersect(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) inView.add(entry.target.id);
      else inView.delete(entry.target.id);
    });
    const section = sections.find((s) => inView.has(s.id));
    setCurrent(section && section.id !== 'top' ? section.id : null);
  }

  // Watch a thin band across the middle of the screen. The margins are percentages, so the band
  // follows the window size and nothing has to be measured.
  const observer = new IntersectionObserver(onIntersect, { rootMargin: '-50% 0px -49% 0px' });
  sections.forEach((section) => observer.observe(section));
})();
