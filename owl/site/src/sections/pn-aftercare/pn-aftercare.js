/* Aftercare V2: the spare shingles drop into the box, then the lid drops into place (ease-out; it stays inside the drawing), once, when seen. */
(function () {
  var r = document.querySelector('.na-v2'); if (!r) return;
  var NS = 'http://www.w3.org/2000/svg';
  function el(t, a, p) { var n = document.createElementNS(NS, t); for (var k in a) n.setAttribute(k, a[k]); p && p.appendChild(n); return n; }
  var INK = 'stroke:var(--text-primary)', MUTE = 'stroke:var(--line-control)';
  var s = r.querySelector('.na2-art');
  el('path', { d: 'M30 280 H490', 'stroke-width': 2, style: MUTE }, s);
  var sh = [0, 1, 2].map(function (i) { return el('rect', { x: 110 + i * 10, y: 0, width: 280, height: 18, rx: 3, fill: 'var(--surface-page)', 'stroke-width': 3, style: INK }, s); });
  el('path', { d: 'M90 190 V272 H430 V190', fill: 'var(--surface-alt)', 'stroke-width': 4, 'stroke-linejoin': 'round', style: INK }, s);
  el('path', { d: 'M90 190 H430', 'stroke-width': 4, style: INK }, s);
  var lbl = el('text', { x: 260, y: 240, 'text-anchor': 'middle', style: 'fill:var(--text-primary);font:800 30px var(--font-display);letter-spacing:.08em' }, s); lbl.textContent = 'OWL';
  var lid = el('g', {}, s);
  el('rect', { x: 86, y: 172, width: 348, height: 18, rx: 4, fill: 'var(--accent-fill)', 'stroke-width': 4, style: INK }, lid);
  el('path', { d: 'M236 181 H284', 'stroke-width': 4, 'stroke-linecap': 'round', style: INK }, lid);
  function set(p) {
    sh.forEach(function (n, i) { var t = Owl.EASE.in(Owl.seg(p, i * 0.12, i * 0.12 + 0.3)); n.setAttribute('y', (90 + (244 - i * 20 - 90) * t).toFixed(1)); n.style.opacity = Owl.seg(p, i * 0.12, i * 0.12 + 0.05); });
    var q = Owl.EASE.out(Owl.seg(p, 0.55, 1)); lid.setAttribute('transform', 'translate(0 ' + (-64 * (1 - q)).toFixed(1) + ')'); lid.style.opacity = 0.25 + 0.75 * q;
  }
  set(Owl.reduced() ? 1 : 0);
  new IntersectionObserver(function (es, io) { if (es[0].isIntersecting) { io.disconnect(); Owl.play(set, 1800); } }, { threshold: 0.5 }).observe(s);
})();
