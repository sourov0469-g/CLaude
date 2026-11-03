/* Assess, secure, plan. V1: three small drawings play once each as they enter (staggered).
   V2: one drawn roof on a pinned stage; scroll moves it through the three states and marks the current step. */
(function () {
  var NS = 'http://www.w3.org/2000/svg';
  function el(t, a, p) { var n = document.createElementNS(NS, t); for (var k in a) n.setAttribute(k, a[k]); p && p.appendChild(n); return n; }
  var INK = 'stroke:var(--text-primary)', MUTE = 'stroke:var(--line-control)', AMB = 'stroke:var(--accent-fill)';
  function ring(svg, cx, cy, r) { return el('circle', { cx: cx, cy: cy, r: r, fill: 'none', 'stroke-width': 2, 'stroke-dasharray': '4 4', pathLength: 100, transform: 'rotate(-90 ' + cx + ' ' + cy + ')', style: INK }, svg); }
  function tick(svg, x, y) { return el('path', { d: 'M' + x + ' ' + y + ' l6 6 l12 -14', fill: 'none', 'stroke-width': 3, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', pathLength: 1, 'stroke-dasharray': 1, style: AMB }, svg); }
  function roof(svg, d, courses) { el('path', { d: d, fill: 'none', 'stroke-width': 4, 'stroke-linejoin': 'round', 'stroke-linecap': 'round', style: INK }, svg); el('path', { d: courses, 'stroke-width': 2, style: MUTE }, svg); }
  var r1 = document.querySelector('.hr-v1');
  if (r1) {
    r1.querySelectorAll('.hr1-art').forEach(function (s, idx) {
      var set;
      if (s.dataset.art === 'assess') {
        roof(s, 'M10 130 L120 40 L230 130', 'M50 108 H190 M80 84 H160');
        var ms = [[90, 96], [148, 78]].map(function (m) { el('ellipse', { cx: m[0], cy: m[1], rx: 6, ry: 3, fill: 'none', 'stroke-width': 2.5, style: AMB }, s); return ring(s, m[0], m[1], 14); });
        set = function (p) { ms.forEach(function (r, k) { r.style.strokeDashoffset = (1 - Owl.EASE.out(Owl.seg(p, k * 0.3, 0.6 + k * 0.3))) * 100; }); };
      } else if (s.dataset.art === 'secure') {
        roof(s, 'M10 130 L120 40 L230 130', 'M50 108 H190 M80 84 H160');
        var sh = el('rect', { x: 128, y: 74, width: 30, height: 10, fill: 'var(--surface-alt)', 'stroke-width': 2.5, style: INK }, s);
        var band = el('rect', { x: 70, y: 62, width: 0, height: 52, rx: 4, fill: 'none', 'stroke-width': 3, style: AMB }, s);
        set = function (p) { var a = Owl.EASE.out(Owl.seg(p, 0, 0.5)); sh.setAttribute('transform', 'rotate(' + (-24 * (1 - a)).toFixed(1) + ' 128 84)'); band.setAttribute('width', (110 * Owl.EASE.out(Owl.seg(p, 0.45, 1))).toFixed(1)); };
      } else {
        el('rect', { x: 66, y: 8, width: 108, height: 128, rx: 8, fill: 'none', 'stroke-width': 3, style: INK }, s);
        el('path', { d: 'M100 8 V2 H140 V8', fill: 'none', 'stroke-width': 3, style: INK }, s);
        var ts = [40, 72, 104].map(function (y) { el('path', { d: 'M110 ' + (y + 2) + ' H160', 'stroke-width': 3, 'stroke-linecap': 'round', style: MUTE }, s); return tick(s, 80, y); });
        set = function (p) { ts.forEach(function (t, k) { t.style.strokeDashoffset = 1 - Owl.EASE.out(Owl.seg(p, k * 0.3, 0.4 + k * 0.3)); }); };
      }
      set(Owl.reduced() ? 1 : 0);
      new IntersectionObserver(function (es, io) { if (es[0].isIntersecting) { io.disconnect(); setTimeout(function () { Owl.play(set, 1100); }, idx * 220); } }, { threshold: 0.6 }).observe(s);
    });
  }
  var r2 = document.querySelector('.hr-v2');
  if (r2) {
    var s = r2.querySelector('.hr2-art'), items = [].slice.call(r2.querySelectorAll('.hr2-steps li'));
    roof(s, 'M20 330 L240 120 L460 330', 'M74 288 H406 M120 244 H360 M166 200 H314 M210 158 H270');
    el('path', { d: 'M64 330 V410 M416 330 V410 M30 410 H450 M212 410 V350 H268 V410', fill: 'none', 'stroke-width': 4, 'stroke-linecap': 'round', style: INK }, s);
    var marks = [[170, 266], [300, 226]].map(function (m) { var d = el('ellipse', { cx: m[0], cy: m[1], rx: 8, ry: 4, fill: 'none', 'stroke-width': 3, style: AMB }, s); return { d: d, r: ring(s, m[0], m[1], 22) }; });
    var sh = el('rect', { x: 232, y: 270, width: 46, height: 14, fill: 'var(--surface-alt)', 'stroke-width': 3, style: INK }, s);
    var shR = ring(s, 255, 274, 34);
    var band = el('rect', { x: 140, y: 196, width: 0, height: 104, rx: 6, fill: 'none', 'stroke-width': 4, style: AMB }, s);
    var card = el('g', {}, s);
    el('rect', { x: 430, y: 40, width: 120, height: 150, rx: 10, fill: 'var(--surface-page)', 'stroke-width': 3, style: INK }, card);
    var ts = [70, 110, 150].map(function (y) { el('path', { d: 'M482 ' + (y + 2) + ' H530', 'stroke-width': 3, 'stroke-linecap': 'round', style: MUTE }, card); return tick(s, 452, y); });
    ts.forEach(function (t) { card.appendChild(t); });
    var render = function (p) {
      var a = Owl.seg(p, 0.02, 0.3), b = Owl.seg(p, 0.36, 0.62), c = Owl.seg(p, 0.68, 0.95);
      marks.forEach(function (m, k) { m.d.style.opacity = Owl.seg(a, k * 0.2, k * 0.2 + 0.2); m.r.style.strokeDashoffset = (1 - Owl.EASE.out(Owl.seg(a, 0.3 + k * 0.2, 0.7 + k * 0.2))) * 100; });
      shR.style.strokeDashoffset = (1 - Owl.EASE.out(Owl.seg(a, 0.5, 1))) * 100;
      sh.setAttribute('transform', 'rotate(' + (-26 * (1 - Owl.EASE.out(Owl.seg(b, 0, 0.5)))).toFixed(1) + ' 232 284)');
      band.setAttribute('width', (200 * Owl.EASE.out(Owl.seg(b, 0.4, 1))).toFixed(1));
      card.style.opacity = Owl.seg(c, 0, 0.25); card.setAttribute('transform', 'translate(0 ' + (16 * (1 - Owl.EASE.out(Owl.seg(c, 0, 0.3)))).toFixed(1) + ')');
      ts.forEach(function (t, k) { t.style.strokeDashoffset = 1 - Owl.EASE.out(Owl.seg(c, 0.3 + k * 0.22, 0.5 + k * 0.22)); });
      var cur = p < 0.33 ? 0 : p < 0.66 ? 1 : 2;
      items.forEach(function (li, k) { if (k === cur) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current'); li.classList.toggle('is-done', k < cur); });
    };
    var mobile = function () { return innerWidth < 1024; };
    if (Owl.reduced() || mobile()) render(1);
    Owl.pinScrub(r2.querySelector('.hr2-stage'), function (p) { if (r2.closest('[hidden]')) return; render(mobile() ? 1 : p); });
  }
})();
