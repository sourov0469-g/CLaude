/* Built for MN weather. V1: the real numbers count up once when seen (10, 50; nothing invented).
   V2: three pressed-state buttons swap the weather on one drawn roof; the roof itself never changes. */
(function () {
  var r1 = document.querySelector('.hb-v1');
  if (r1) {
    var nums = [].slice.call(r1.querySelectorAll('[data-to]'));
    var set = function (p) { nums.forEach(function (n) { n.textContent = Math.round(+n.dataset.to * Owl.EASE.out(p)); }); };
    set(Owl.reduced() ? 1 : 0);
    new IntersectionObserver(function (es, io) { if (es[0].isIntersecting) { io.disconnect(); Owl.play(set, 1200); } }, { threshold: 0.6 }).observe(r1.querySelector('.hb1-facts'));
  }
  var r2 = document.querySelector('.hb-v2'); if (!r2) return;
  var NS = 'http://www.w3.org/2000/svg';
  function el(t, a, p) { var n = document.createElementNS(NS, t); for (var k in a) n.setAttribute(k, a[k]); p && p.appendChild(n); return n; }
  var INK = 'stroke:var(--text-primary)', MUTE = 'stroke:var(--line-control)', AMB = 'stroke:var(--accent-fill)';
  var s = r2.querySelector('.hb2-svg');
  var layers = { snow: el('g', {}, s), wind: el('g', {}, s), hail: el('g', {}, s) };
  el('path', { d: 'M110 300 V380 M450 300 V380 M70 380 H490 M246 380 V320 H314 V380', fill: 'none', 'stroke-width': 4, 'stroke-linecap': 'round', style: INK }, s);
  el('path', { d: 'M150 268 H410 M196 236 H364 M240 206 H320', 'stroke-width': 2, style: MUTE }, s);
  el('path', { d: 'M70 304 L280 160 L490 304', fill: 'none', 'stroke-width': 5, 'stroke-linejoin': 'round', 'stroke-linecap': 'round', style: INK }, s);
  // snow: a drawn load on both planes, with three weight arrows
  el('path', { d: 'M84 294 C92 276 104 258 124 248 L266 146 C274 128 286 128 294 146 L436 248 C456 258 468 276 476 294 L280 162 Z', fill: 'var(--surface-page)', 'stroke-width': 3, 'stroke-linejoin': 'round', style: INK }, layers.snow);
  [[170, 150], [280, 66], [390, 150]].forEach(function (a) { el('path', { d: 'M' + a[0] + ' ' + a[1] + ' v44 m-10 -12 l10 12 l10 -12', fill: 'none', 'stroke-width': 3, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', style: AMB }, layers.snow); });
  // wind: three long gust lines with curls
  [[20, 120, 330], [40, 170, 420], [10, 220, 300]].forEach(function (w, i) { el('path', { d: 'M' + w[0] + ' ' + w[1] + ' H' + w[2] + ' c26 0 26 -30 6 -30 c-12 0 -14 14 -4 16', fill: 'none', 'stroke-width': 3, 'stroke-linecap': 'round', style: i === 1 ? AMB : INK, 'class': 'gust' }, layers.wind); });
  // hail: stones with motion ticks
  for (var i = 0; i < 18; i++) { var x = 90 + (i * 53) % 380 + Owl.seeded(i, 81) * 20, y = 40 + (i * 37) % 120; el('circle', { cx: x.toFixed(1), cy: y, r: 5 + (i % 3), fill: 'none', 'stroke-width': 2.5, style: i % 5 === 0 ? AMB : INK }, layers.hail); el('path', { d: 'M' + (x + 4).toFixed(1) + ' ' + (y - 12) + ' l4 -10', 'stroke-width': 2, 'stroke-linecap': 'round', style: MUTE }, layers.hail); }
  var btns = [].slice.call(r2.querySelectorAll('.hb2-pick button'));
  function pick(w) {
    btns.forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.w === w); });
    Object.keys(layers).forEach(function (k) {
      var g = layers[k], on = k === w;
      if (Owl.reduced()) { g.style.opacity = on ? 1 : 0; return; }
      g.animate(on ? [{ opacity: 0, transform: k === 'wind' ? 'translateX(-40px)' : 'translateY(-24px)' }, { opacity: 1, transform: 'none' }] : [{ opacity: getComputedStyle(g).opacity }, { opacity: 0 }], { duration: on ? 420 : 160, easing: on ? 'cubic-bezier(.23,1,.32,1)' : 'linear', fill: 'forwards' });
    });
  }
  btns.forEach(function (b) { b.addEventListener('click', function () { pick(b.dataset.w); }); });
  Object.keys(layers).forEach(function (k) { layers[k].style.opacity = k === 'snow' ? 1 : 0; });
})();
