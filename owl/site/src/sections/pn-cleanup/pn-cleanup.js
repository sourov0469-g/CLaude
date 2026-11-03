/* 3-Part Cleanup V1 (S1325): base + fill measured between the first and last dot centres; horizontal on wide screens,
   vertical on phones. One normalised scroll value fills the line; a round turns on (ticked) when the head reaches it. */
(function () {
  var r = document.querySelector('.nk-v1'); if (!r) return;
  var NS = 'http://www.w3.org/2000/svg';
  function el(t, a, p) { var n = document.createElementNS(NS, t); for (var k in a) n.setAttribute(k, a[k]); p && p.appendChild(n); return n; }
  var INK = 'stroke:var(--text-primary)', MUTE = 'stroke:var(--line-control)', AMB = 'stroke:var(--accent-fill)';
  r.querySelectorAll('.nk1-art').forEach(function (s) {
    var a = s.dataset.art;
    if (a === 'bin') { el('path', { d: 'M14 30 H106 L98 74 H22 Z M10 30 H110', fill: 'none', 'stroke-width': 3, 'stroke-linejoin': 'round', style: INK }, s); el('path', { d: 'M34 30 l10 -18 l14 8 M66 30 l6 -22 l14 6', fill: 'none', 'stroke-width': 2.5, 'stroke-linecap': 'round', style: MUTE }, s); }
    else if (a === 'magnet') { el('path', { d: 'M40 10 V40 A20 20 0 0 0 80 40 V10', fill: 'none', 'stroke-width': 10, style: AMB }, s); el('path', { d: 'M40 10 V20 M80 10 V20', 'stroke-width': 10, style: INK }, s); el('path', { d: 'M54 70 l4 -8 M64 74 l2 -10 M74 70 l-2 -8', 'stroke-width': 2.5, 'stroke-linecap': 'round', style: INK }, s); }
    else { el('rect', { x: 34, y: 8, width: 52, height: 66, rx: 6, fill: 'none', 'stroke-width': 3, style: INK }, s); el('path', { d: 'M44 30 l5 5 l9 -11 M44 52 l5 5 l9 -11', fill: 'none', 'stroke-width': 3, 'stroke-linecap': 'round', style: AMB }, s); el('path', { d: 'M64 32 H78 M64 54 H78', 'stroke-width': 3, 'stroke-linecap': 'round', style: MUTE }, s); }
  });
  var track = r.querySelector('.nk1-track'), base = r.querySelector('.nk1-base'), fill = r.querySelector('.nk1-fill'), lis = [].slice.call(r.querySelectorAll('.nk1-rounds li')), geo = null, raf = 0;
  function vertical() { return innerWidth < 768; }
  function measure() {
    var tr = track.getBoundingClientRect(), v = vertical();
    var c = lis.map(function (li) { var d = li.querySelector('.nk1-dot').getBoundingClientRect(); return v ? d.top + d.height / 2 - tr.top : d.left + d.width / 2 - tr.left; });
    geo = { v: v, a: c[0], b: c[c.length - 1], c: c };
    [base, fill].forEach(function (n) { n.style.left = v ? '' : geo.a + 'px'; n.style.width = v ? '' : (geo.b - geo.a) + 'px'; n.style.top = v ? geo.a + 'px' : ''; n.style.height = v ? (geo.b - geo.a) + 'px' : ''; });
  }
  function update() {
    raf = 0; if (r.closest('[hidden]')) return; if (!geo) measure();
    var tr = track.getBoundingClientRect(), p;
    if (Owl.reduced()) p = 1;
    else if (geo.v) p = (innerHeight * 0.6 - tr.top - geo.a) / Math.max(1, geo.b - geo.a);
    else p = (innerHeight * 0.85 - tr.top) / (innerHeight * 0.45);
    p = Math.max(0, Math.min(1, p));
    fill.style.transform = geo.v ? 'scaleY(' + p.toFixed(4) + ')' : 'scaleX(' + p.toFixed(4) + ')';
    var head = geo.a + p * (geo.b - geo.a);
    lis.forEach(function (li, k) { li.classList.toggle('is-on', geo.c[k] <= head + 1); });
  }
  function req() { if (!raf) raf = requestAnimationFrame(update); }
  function re() { geo = null; req(); }
  addEventListener('scroll', req, { passive: true }); addEventListener('resize', re); document.addEventListener('owl:version', re); addEventListener('hashchange', re);
  document.fonts && document.fonts.ready.then(re); re();
})();
