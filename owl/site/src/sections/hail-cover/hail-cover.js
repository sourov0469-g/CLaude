/* storm cover. V1: hail falls once on the drawn house (ease-in: falling things), then three marks are circled (assess).
   V2: a drawn phone; the photo message slides up once and a reply starts typing (no words are invented). */
(function () {
  var NS = 'http://www.w3.org/2000/svg';
  function el(t, a, p) { var n = document.createElementNS(NS, t); for (var k in a) n.setAttribute(k, a[k]); p && p.appendChild(n); return n; }
  var INK = 'stroke:var(--text-primary)', MUTE = 'stroke:var(--line-control)', AMB = 'stroke:var(--accent-fill)';
  function once(node, fn, dur) { fn(Owl.reduced() ? 1 : 0); new IntersectionObserver(function (es, io) { if (es[0].isIntersecting) { io.disconnect(); Owl.play(fn, dur); } }, { threshold: 0.4 }).observe(node); }
  var r1 = document.querySelector('.hc-v1');
  if (r1) {
    Owl.bg.lawn(r1.querySelector('.hc-bg'), { sweep: false });
    var s = r1.querySelector('.hc1-art');
    el('path', { d: 'M178 104 A50 50 0 0 1 190 20 A66 66 0 0 1 312 24 A46 46 0 0 1 356 104 Z', fill: 'var(--surface-page)', 'stroke-width': 4, 'stroke-linejoin': 'round', style: INK }, s);
    el('path', { d: 'M196 126 l-8 18 M232 128 l-8 18 M268 126 l-8 18 M304 128 l-8 18 M340 126 l-8 18', 'stroke-width': 2.5, 'stroke-linecap': 'round', style: MUTE }, s);
    el('path', { d: 'M96 384 V266 M424 384 V266 M70 384 H450', fill: 'none', 'stroke-width': 4, 'stroke-linecap': 'round', style: INK }, s);
    el('path', { d: 'M60 280 L260 168 L460 280', fill: 'none', 'stroke-width': 4, 'stroke-linejoin': 'round', 'stroke-linecap': 'round', style: INK }, s);
    el('path', { d: 'M118 248 H402 M168 220 H352 M216 194 H304', 'stroke-width': 2, style: MUTE }, s);
    el('path', { d: 'M226 384 V318 H294 V384', fill: 'none', 'stroke-width': 3, style: INK }, s);
    el('rect', { x: 132, y: 300, width: 52, height: 40, fill: 'none', 'stroke-width': 3, style: INK }, s);
    el('rect', { x: 336, y: 300, width: 52, height: 40, fill: 'none', 'stroke-width': 3, style: INK }, s);
    var roofY = function (x) { return 280 - (200 - Math.abs(x - 260)) * 0.56 - 4; };
    var stones = [];
    for (var i = 0; i < 16; i++) { var x = 170 + ((i * 41) % 190) + Owl.seeded(i, 71) * 14; stones.push({ n: el('circle', { cx: x.toFixed(1), cy: 110, r: 4 + (i % 3), fill: 'none', 'stroke-width': 2.5, style: INK }, s), y0: 112 + Owl.seeded(i, 72) * 12, y1: roofY(x), t: (i % 8) * 0.045 + (i >= 8 ? 0.2 : 0) }); }
    var marks = [[196, 218], [262, 190], [320, 226]].map(function (m) {
      return { dot: el('ellipse', { cx: m[0], cy: m[1], rx: 6, ry: 3, fill: 'none', 'stroke-width': 2.5, style: AMB + ';opacity:0' }, s),
        ring: el('circle', { cx: m[0], cy: m[1], r: 15, fill: 'none', 'stroke-width': 2, 'stroke-dasharray': '4 4', pathLength: 100, style: INK + ';opacity:0' }, s) };
    });
    once(s, function (p) {
      stones.forEach(function (st) { var t = Owl.EASE.in(Owl.seg(p, st.t, st.t + 0.32)); st.n.setAttribute('cy', (st.y0 + (st.y1 - st.y0) * t).toFixed(1)); st.n.style.opacity = t >= 1 ? 0 : 1; });
      marks.forEach(function (m, k) { m.dot.style.opacity = Owl.seg(p, 0.55 + k * 0.05, 0.62 + k * 0.05); var q = Owl.EASE.out(Owl.seg(p, 0.72 + k * 0.08, 0.9 + k * 0.03)); m.ring.style.opacity = q > 0 ? 1 : 0; m.ring.setAttribute('transform', 'rotate(' + (-90 + q * 90) + ' ' + m.ring.getAttribute('cx') + ' ' + m.ring.getAttribute('cy') + ')'); m.ring.style.strokeDashoffset = (1 - q) * 100; });
    }, 2400);
  }
  var r2 = document.querySelector('.hc-v2');
  if (r2) {
    var v = r2.querySelector('.hc2-svg');
    el('rect', { x: 10, y: 10, width: 280, height: 500, rx: 40, fill: 'var(--surface-page)', 'stroke-width': 4, style: INK }, v);
    el('path', { d: 'M120 34 H180', 'stroke-width': 5, 'stroke-linecap': 'round', style: MUTE }, v);
    el('path', { d: 'M30 470 H270 M30 96 H270', 'stroke-width': 2, style: MUTE }, v);
    var nm = el('text', { x: 150, y: 80, 'text-anchor': 'middle', style: 'fill:var(--text-primary);font:700 18px var(--font-display)' }, v); nm.textContent = 'Owl Roofing';
    var g = el('g', {}, v);
    el('rect', { x: 110, y: 150, width: 160, height: 150, rx: 18, fill: 'var(--surface-alt)', 'stroke-width': 3, style: INK }, g);
    el('path', { d: 'M126 260 L190 210 L254 260', fill: 'none', 'stroke-width': 3, 'stroke-linejoin': 'round', style: INK }, g);
    [[170, 234], [206, 226], [224, 244]].forEach(function (d) { el('ellipse', { cx: d[0], cy: d[1], rx: 5, ry: 2.5, fill: 'none', 'stroke-width': 2.5, style: AMB }, g); });
    el('path', { d: 'M126 286 H200', 'stroke-width': 3, 'stroke-linecap': 'round', style: MUTE }, g);
    var reply = el('g', {}, v);
    el('rect', { x: 30, y: 318, width: 90, height: 44, rx: 18, fill: 'none', 'stroke-width': 3, style: INK }, reply);
    var dots = [56, 75, 94].map(function (x) { return el('circle', { cx: x, cy: 340, r: 4.5, style: 'fill:var(--text-primary)' }, reply); });
    once(v, function (p) {
      var a = Owl.EASE.out(Owl.seg(p, 0, 0.45)); g.setAttribute('transform', 'translate(0 ' + ((1 - a) * 60).toFixed(1) + ')'); g.style.opacity = a;
      var b = Owl.EASE.out(Owl.seg(p, 0.55, 0.8)); reply.style.opacity = b; reply.setAttribute('transform', 'translate(0 ' + ((1 - b) * 16).toFixed(1) + ')');
      dots.forEach(function (d, k) { d.style.opacity = p >= 1 ? 1 : 0.35 + 0.65 * Owl.seg(p, 0.8 + k * 0.05, 0.86 + k * 0.05); });
    }, 1800);
  }
})();
