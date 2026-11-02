/* site layer: in-file pages (hash router) + section versions (exactly two per section) */
(function () {
  Owl.header(document.querySelector('.owl-header'));
  // pinned stages stick below the sticky header: measure it once and on resize
  var hdr = document.querySelector('.owl-header');
  function hh() { document.documentElement.style.setProperty('--header-h', hdr.offsetHeight + 'px'); }
  hh(); addEventListener('resize', hh); document.fonts && document.fonts.ready.then(hh);
  document.querySelectorAll('header svg.logo').forEach(function (s) { Owl.logo(s); });
  // ---- in-file navigation: #/page[/section]
  var pages = [].slice.call(document.querySelectorAll('.page'));
  function route() {
    var m = location.hash.match(/^#\/([\w-]+)(?:\/([\w-]+))?/), id = m ? m[1] : 'home';
    var page = pages.filter(function (p) { return p.dataset.page === id; })[0] || pages[0];
    var changed = page.hidden;
    pages.forEach(function (p) { p.hidden = p !== page; });
    document.querySelectorAll('.owl-header nav a').forEach(function (a) { a.toggleAttribute('aria-current', a.getAttribute('href') === '#/' + page.dataset.page); });
    if (m && m[2]) { var t = document.getElementById('s-' + m[2]); t && t.scrollIntoView(); }
    else if (changed) { scrollTo(0, 0); document.getElementById('main').focus({ preventScroll: true }); }
    document.dispatchEvent(new CustomEvent('owl:page', { detail: page.dataset.page }));
  }
  addEventListener('hashchange', route); route();
  // ---- versions: ?v=hero:2,nest:1 > localStorage > data-default
  var stored = {}; try { stored = JSON.parse(localStorage.getItem('owl-versions') || '{}'); } catch (e) {}
  var q = (new URLSearchParams(location.search).get('v') || '').split(',').reduce(function (o, kv) { var p = kv.split(':'); if (p[1]) o[p[0]] = p[1]; return o; }, {});
  function setVer(sec, v, save) {
    sec.querySelectorAll(':scope > .ver').forEach(function (d) { d.hidden = d.dataset.v !== String(v); });
    sec.dataset.active = v;
    if (save) { stored[sec.dataset.sec] = v; try { localStorage.setItem('owl-versions', JSON.stringify(stored)); } catch (e) {} }
    document.dispatchEvent(new CustomEvent('owl:version', { detail: { sec: sec.dataset.sec, v: +v } }));
    var row = document.querySelector('.vrow[data-sec="' + sec.dataset.sec + '"]');
    row && row.querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.v === String(v)); });
  }
  var list = document.getElementById('vlist');
  document.querySelectorAll('.sec').forEach(function (sec) {
    var id = sec.dataset.sec, row = document.createElement('div');
    row.className = 'vrow'; row.dataset.sec = id; row.innerHTML = '<span>' + id + '</span><button type="button" data-v="1">V1</button><button type="button" data-v="2">V2</button>';
    row.addEventListener('click', function (e) { var b = e.target.closest('button'); b && setVer(sec, b.dataset.v, true); });
    list.appendChild(row);
    setVer(sec, q[id] || stored[id] || sec.dataset.default, false);
  });
  addEventListener('keydown', function (e) { if (e.shiftKey && e.key === 'V' && !e.target.closest('input,textarea')) { var p = document.getElementById('vpanel'); p.hidden = !p.hidden; } });
  Owl.companion.init('eyes');
})();
