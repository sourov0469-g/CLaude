/* The wrap V1: once seen, the netting drops down the walls (ease-out) and the tarps unroll across the lawn. */
(function () {
  var r = document.querySelector('.nw-v1'); if (!r) return;
  var NS = 'http://www.w3.org/2000/svg';
  function el(t, a, p) { var n = document.createElementNS(NS, t); for (var k in a) n.setAttribute(k, a[k]); p && p.appendChild(n); return n; }
  var INK = 'stroke:var(--text-primary)', MUTE = 'stroke:var(--line-control)';
  var s = r.querySelector('.nw1-art');
  el('path', { d: 'M20 330 H540', 'stroke-width': 3, style: MUTE }, s);
  el('path', { d: 'M150 330 V200 M410 330 V200', fill: 'none', 'stroke-width': 4, 'stroke-linecap': 'round', style: INK }, s);
  el('path', { d: 'M120 206 L280 96 L440 206', fill: 'none', 'stroke-width': 5, 'stroke-linejoin': 'round', 'stroke-linecap': 'round', style: INK }, s);
  el('path', { d: 'M178 176 H382 M214 150 H346 M248 126 H312', 'stroke-width': 2, style: MUTE }, s);
  el('path', { d: 'M250 330 V272 H310 V330', fill: 'none', 'stroke-width': 3, style: INK }, s);
  var net = el('g', {}, s), clip = el('clipPath', { id: 'nw1-clip' }, el('defs', {}, s)), cr = el('rect', { x: 130, y: 206, width: 300, height: 0 }, clip);
  net.setAttribute('clip-path', 'url(#nw1-clip)');
  el('rect', { x: 140, y: 206, width: 280, height: 124, fill: 'var(--text-primary)', opacity: 0.7 }, net);
  for (var x = 152; x < 420; x += 16) el('path', { d: 'M' + x + ' 206 V330', 'stroke-width': 1.5, style: 'stroke:var(--surface-alt);opacity:.35' }, net);
  el('path', { d: 'M140 206 H420', 'stroke-width': 4, 'stroke-linecap': 'round', style: INK }, net);
  var tl = el('rect', { x: 140, y: 332, width: 0, height: 14, fill: 'var(--text-primary)', opacity: 0.82 }, s);
  var tr = el('rect', { x: 420, y: 332, width: 0, height: 14, fill: 'var(--text-primary)', opacity: 0.82 }, s);
  function set(p) {
    cr.setAttribute('height', (124 * Owl.EASE.out(Owl.seg(p, 0, 0.6))).toFixed(1));
    var w = 110 * Owl.EASE.out(Owl.seg(p, 0.45, 1)); tl.setAttribute('x', (140 - w).toFixed(1)); tl.setAttribute('width', w.toFixed(1)); tr.setAttribute('width', w.toFixed(1));
  }
  set(Owl.reduced() ? 1 : 0);
  new IntersectionObserver(function (es, io) { if (es[0].isIntersecting) { io.disconnect(); Owl.play(set, 1600); } }, { threshold: 0.5 }).observe(s);
})();
