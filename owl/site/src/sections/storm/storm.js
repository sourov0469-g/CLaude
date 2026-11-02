/* storm V1: a drawn storm; the hailstones fall once when first seen (ease-in: falling things), then rest */
(function () {
  var r = document.querySelector('.storm-v1'); if (!r) return;
  Owl.bg.lawn(r.querySelector('.storm-bg'), { sweep: false });
  var NS = 'http://www.w3.org/2000/svg', svg = r.querySelector('.st1-sky');
  function el(t, a, p) { var n = document.createElementNS(NS, t); for (var k in a) n.setAttribute(k, a[k]); p && p.appendChild(n); return n; }
  el('path', { d: 'M150 96 A44 44 0 0 1 160 22 A58 58 0 0 1 268 26 A40 40 0 0 1 306 96 Z', fill: 'var(--surface-page)', 'stroke-width': 4, 'stroke-linejoin': 'round', style: 'stroke:var(--text-primary)' }, svg);
  el('path', { d: 'M40 206 L260 120 L480 206', fill: 'none', 'stroke-width': 4, 'stroke-linejoin': 'round', style: 'stroke:var(--text-primary)' }, svg);
  el('path', { d: 'M110 178 H410 M170 155 H350 M222 135 H298', 'stroke-width': 2, style: 'stroke:var(--line-control)' }, svg);
  var stones = [];
  for (var i = 0; i < 11; i++) { var x = 170 + (i * 37) % 150 + Owl.seeded(i, 61) * 20, land = 206 - Math.abs(x - 260) * 0.39 - 4; stones.push({ n: el('circle', { cx: x, cy: 0, r: 4 + (i % 3), fill: 'none', 'stroke-width': 2.5, style: 'stroke:var(--text-primary)' }, svg), y0: 100 + Owl.seeded(i, 62) * 10, y1: land, t: i * 0.05 }); }
  var dents = [[218, 150], [262, 140], [300, 158]].map(function (d) { return el('ellipse', { cx: d[0], cy: d[1], rx: 7, ry: 3.5, fill: 'none', 'stroke-width': 2.5, style: 'stroke:var(--accent-fill);opacity:0' }, svg); });
  function set(p) {
    stones.forEach(function (s) { var t = Owl.EASE.in(Owl.seg(p, s.t, s.t + 0.45)); s.n.setAttribute('cy', (s.y0 + (s.y1 - s.y0) * t).toFixed(1)); s.n.style.opacity = t >= 1 ? 0 : 1; });
    dents.forEach(function (d, i) { d.style.opacity = Owl.seg(p, 0.6 + i * 0.1, 0.8 + i * 0.1); });
  }
  set(Owl.reduced() ? 1 : 0);
  new IntersectionObserver(function (es, io) { if (es[0].isIntersecting) { io.disconnect(); Owl.play(set, 1800); } }, { threshold: 0.5 }).observe(svg);
})();
