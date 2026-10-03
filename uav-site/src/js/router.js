/* Single-file edition only: swaps page content in place using hash routes (#/services/...).
   The deployable multi-page site does not use this file. */
(function () {
  'use strict';
  var doc = document, U = window.UAV, main = doc.getElementById('main');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var tpls = {}, cur = null, announcer = doc.getElementById('route-announcer');
  Array.prototype.forEach.call(doc.querySelectorAll('template[data-route]'), function (t) { tpls[t.getAttribute('data-route')] = t; });
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  function parse(h) {
    h = (h || '').replace(/^#/, '') || '/';
    var anchor = '', query = '', i = h.indexOf('#');
    if (i > -1) { anchor = h.slice(i + 1); h = h.slice(0, i); }
    i = h.indexOf('?'); if (i > -1) { query = h.slice(i); h = h.slice(0, i); }
    if (h.charAt(0) !== '/') h = '/' + h;
    if (h.charAt(h.length - 1) !== '/') h += '/';
    return { path: h, query: query, anchor: anchor };
  }
  function setMeta(sel, attr, val) { var el = doc.querySelector(sel); if (el) el.setAttribute(attr, val); }
  function scrollToAnchor(a) {
    var el = a && doc.getElementById(decodeURIComponent(a));
    if (el) { el.scrollIntoView({ behavior: reduce.matches ? 'auto' : 'smooth', block: 'start' }); return true; }
    return false;
  }
  function render(r, initial) {
    var is404 = !tpls[r.path], t = tpls[is404 ? '/404/' : r.path];
    main.innerHTML = '';
    main.appendChild(t.content.cloneNode(true));
    main.classList.remove('route-in'); if (!reduce.matches) { void main.offsetWidth; main.classList.add('route-in'); }
    var title = t.getAttribute('data-title'), desc = t.getAttribute('data-desc'), canon = t.getAttribute('data-canonical');
    doc.title = title;
    setMeta('meta[name="description"]', 'content', desc);
    setMeta('link[rel="canonical"]', 'href', canon);
    setMeta('meta[property="og:title"]', 'content', title); setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', desc); setMeta('meta[name="twitter:description"]', 'content', desc);
    setMeta('meta[property="og:url"]', 'content', canon);
    var ld = doc.getElementById('ld'), src = t.content.querySelector('script[type="application/ld+json"]');
    if (ld) ld.textContent = src ? src.textContent : '';
    if (src) { var inMain = main.querySelector('script[type="application/ld+json"]'); if (inMain) inMain.remove(); }
    U.query = r.query; U.markActive(r.path); U.closeMenus(); U.initPage(main);
    cur = r;
    if (!(r.anchor && scrollToAnchor(r.anchor))) window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    if (!initial) {
      var h1 = main.querySelector('h1');
      if (h1) { h1.setAttribute('tabindex', '-1'); h1.focus({ preventScroll: true }); }
      if (announcer) { announcer.textContent = ''; setTimeout(function () { announcer.textContent = 'Page loaded: ' + title; }, 60); }
    }
  }
  function go(initial) {
    var r = parse(location.hash);
    if (!initial && cur && r.path === cur.path && r.query === cur.query) {
      if (!(r.anchor && scrollToAnchor(r.anchor))) window.scrollTo({ top: 0, behavior: reduce.matches ? 'auto' : 'smooth' });
      U.closeMenus(); return;
    }
    render(r, initial);
  }
  window.addEventListener('hashchange', function () { go(false); });
  doc.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]'); if (!a) return;
    if (a.classList.contains('skip')) { e.preventDefault(); main.setAttribute('tabindex', '-1'); main.focus({ preventScroll: false }); return; }
    var h = a.getAttribute('href');
    if (h && h.charAt(0) === '#' && h === location.hash) {   // same destination: hashchange will not fire
      e.preventDefault(); go(false);
    }
  });
  go(true);
})();
