/* The page router for the one file. Pages are hash routes: #/  (home), #/siding, #/windows, #/roofing, #/our-work, #/contact, and #/siding/lap (a page plus an anchor inside it).
   A plain #id that lives on another page (for example #colours or #booking from an inner page) shows that page and scrolls to it; #booking from an inner page opens the Contact page
   (where the form is). Each change: the right <main> is shown, the title and the nav's current page are set, focus moves to the page, a live region says where you are, the page's scroll is
   restored when you go back, and the page's own code is told (document 'fpage' event, detail = name) so it can measure. Reduced motion: no entrance animation. */
window.FRoute = (function () {
  const TITLES = { home: 'Austin Pro Siding, Windows & Roofing | Austin, TX since 2009', siding: 'Siding in Austin | Austin Pro Siding, Windows & Roofing', windows: 'Windows in Austin | Austin Pro Siding, Windows & Roofing', roofing: 'Roofing in Austin | Austin Pro Siding, Windows & Roofing', 'our-work': 'Our work | Austin Pro Siding, Windows & Roofing', contact: 'Contact us | Austin Pro Siding, Windows & Roofing' };
  const NAMES = { home: 'Home', siding: 'Siding', windows: 'Windows', roofing: 'Roofing', 'our-work': 'Our work', contact: 'Contact us' };
  const pages = {}; let cur = 'home', live = null; const scrolls = {};
  const pageOf = (id) => { const el = document.getElementById(id); const m = el && el.closest('.pg'); return m ? m.dataset.page : null; };
  function parse(h) {
    h = h || location.hash;
    if (!h || h === '#' || h === '#/' || h === '#top') return { page: 'home', id: null, top: true };
    if (h.slice(0, 2) === '#/') { const [p, a] = h.slice(2).split('/'); return pages[p] ? { page: p, id: a || null } : { page: 'home', id: null, top: true }; }
    const id = decodeURIComponent(h.slice(1)); let pg = pageOf(id); if (!pg) return null;
    if (id === 'booking' && cur !== 'home') return { page: 'contact', id: null, redirect: true };
    return { page: pg, id, plain: true };
  }
  function show(name) {
    Object.keys(pages).forEach((k) => { const on = k === name; pages[k].classList.toggle('on', on); pages[k].hidden = !on; });
    document.querySelectorAll('.menu>li>a[href^="#/"]').forEach((a) => { const t = a.getAttribute('href').slice(2).split('/')[0]; if (t === name) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    const sb = document.querySelector('.menu>li>button'); if (sb) { if (name === 'siding') sb.setAttribute('aria-current', 'page'); else sb.removeAttribute('aria-current'); }
  }
  let lastClick = 0;
  function go(r, first, restore) {
    if (!r) return; const prev = cur, change = r.page !== cur;
    if (change) { scrolls[prev] = scrollY; show(r.page); cur = r.page; document.title = TITLES[cur] || TITLES.home; document.documentElement.dataset.page = cur; }
    const el = r.id ? (document.getElementById(r.id) || document.getElementById(cur + '-' + r.id)) : null;
    if (change) {
      if (r.redirect) history.replaceState(null, '', '#/contact');
      requestAnimationFrame(() => { dispatchEvent(new Event('resize'));
        if (el) el.scrollIntoView({ block: 'start', behavior: 'instant' }); else scrollTo({ top: restore && scrolls[cur] != null ? scrolls[cur] : 0, behavior: 'instant' });
        dispatchEvent(new Event('scroll')); document.dispatchEvent(new CustomEvent('fpage', { detail: cur }));
        if (!first) { const m = pages[cur]; m.setAttribute('tabindex', '-1'); m.focus({ preventScroll: true }); live.textContent = (NAMES[cur] || cur) + ' page'; } });
    } else if (el) el.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }
  function route(first, restore) { const r = parse(); if (r === null) return; go(r, first, restore); }
  function init() {
    document.querySelectorAll('main.pg').forEach((m) => { pages[m.dataset.page] = m; });
    live = document.createElement('p'); live.className = 'pg-live'; live.setAttribute('role', 'status'); live.setAttribute('aria-live', 'polite'); document.body.append(live);
    document.addEventListener('click', (e) => { if (e.target.closest && e.target.closest('a[href^="#"]')) lastClick = Date.now(); }, true);
    addEventListener('hashchange', () => route(false, Date.now() - lastClick > 600));
    // the brand and "Back to top" on the page you are already on: scroll up, no route change
    document.addEventListener('click', (e) => { const a = e.target.closest && e.target.closest('a[href="#top"]'); if (a && cur !== 'home') { e.preventDefault(); location.hash = '#/'; } });
    route(true);
  }
  return { init, go: (h) => { location.hash = h; }, get page() { return cur; } };
})();
