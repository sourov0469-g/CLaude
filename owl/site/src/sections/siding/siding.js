(function () {
  var b = document.querySelector('.sid-bg'); b && Owl.bg.rings(b);
  var svg = document.querySelector('.sd2-art'); if (!svg) return;
  var NS = 'http://www.w3.org/2000/svg';
  function el(t, a, p) { var n = document.createElementNS(NS, t); for (var k in a) n.setAttribute(k, a[k]); p && p.appendChild(n); return n; }
  el('path', { d: 'M40 330 V40 H480 V330', fill: 'none', 'stroke-width': 4, style: 'stroke:var(--text-primary)' }, svg);
  var rows = []; for (var y = 310, i = 0; y > 50; y -= 22, i++) rows.push(el('path', { d: 'M44 ' + y + ' H476', 'stroke-width': 2.5, pathLength: 1, 'stroke-dasharray': '1 1', style: 'stroke:var(--line-control)' }, svg));
  el('rect', { x: 196, y: 110, width: 128, height: 140, fill: 'var(--surface-alt)', 'stroke-width': 4, style: 'stroke:var(--text-primary)' }, svg);
  el('path', { d: 'M260 110 V250 M196 180 H324', 'stroke-width': 3, style: 'stroke:var(--text-primary)' }, svg);
  function set(p) { rows.forEach(function (r, i) { r.setAttribute('stroke-dashoffset', 1 - Owl.EASE.out(Owl.seg(p, i * 0.05, i * 0.05 + 0.3))); }); }
  set(Owl.reduced() ? 1 : 0); Owl.scrub(svg, set, { start: 0.95, end: 0.45 });
})();
