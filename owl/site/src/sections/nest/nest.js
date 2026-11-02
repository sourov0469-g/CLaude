/* ===== Protect Your Nest: beat drawings (made only from Owl's system) + V1 pinned choreography ===== */
window.OwlNest = (function () {
  var NS = 'http://www.w3.org/2000/svg', seg = Owl.seg, E = Owl.EASE;
  function el(t, a, p) { var n = document.createElementNS(NS, t); for (var k in a) n.setAttribute(k, a[k]); p && p.appendChild(n); return n; }
  var INK = 'stroke:var(--text-primary)', WARM = 'stroke:var(--graphic-warm)', MUTED = 'stroke:var(--line-control)';
  function drawn(p, a, b) { return 1 - E.out(seg(p, a, b)); } // dashoffset for a draw-on window
  // beat 1: the wrap drops from the eave and catches the debris before it reaches the shrubs
  function wrap(svg) {
    el('path', { d: 'M40 330 H560', 'stroke-width': 3, 'stroke-linecap': 'round', style: INK }, svg);
    [[96, 316], [124, 322], [476, 322], [504, 316]].forEach(function (b, i) { el('path', { d: 'M' + (b[0] - 18) + ' 330 a18 16 0 0 1 36 0', fill: 'none', 'stroke-width': 2.5, style: MUTED }, svg); });
    el('path', { d: 'M150 172 V330 M450 172 V330 M110 176 L300 70 L490 176 M110 176 H490 M260 330 V270 H300 V330', fill: 'none', 'stroke-width': 4, 'stroke-linejoin': 'round', 'stroke-linecap': 'round', style: INK }, svg);
    el('rect', { x: 340, y: 220, width: 60, height: 44, rx: 2, fill: 'none', 'stroke-width': 3, style: INK }, svg);
    var w = [
      el('path', { d: 'M110 178 C 96 230 70 280 52 334', fill: 'none', 'stroke-width': 4, 'stroke-linecap': 'round', pathLength: 1, 'stroke-dasharray': '1 1', style: WARM }, svg),
      el('path', { d: 'M490 178 C 504 230 530 280 548 334', fill: 'none', 'stroke-width': 4, 'stroke-linecap': 'round', pathLength: 1, 'stroke-dasharray': '1 1', style: WARM }, svg),
      el('path', { d: 'M52 336 C 200 344 400 344 548 336', fill: 'none', 'stroke-width': 5, 'stroke-linecap': 'round', pathLength: 1, 'stroke-dasharray': '1 1', style: WARM }, svg)
    ];
    var bits = [];
    for (var i = 0; i < 7; i++) {
      var side = i % 2 ? 1 : -1, x0 = 300 + side * (40 + i * 22), y0 = 100 + Math.abs(x0 - 300) * 0.55;
      bits.push({ n: el('path', { d: 'M-5 0 H5', 'stroke-width': 3, 'stroke-linecap': 'round', style: INK }, svg), x0: x0, y0: y0, x1: x0 + side * (60 + i * 6), y1: 326 + (i % 3) * 3, r: 40 + i * 47, t: 0.5 + i * 0.05 });
    }
    return function (p) {
      w[0].setAttribute('stroke-dashoffset', drawn(p, 0.05, 0.45)); w[1].setAttribute('stroke-dashoffset', drawn(p, 0.1, 0.5)); w[2].setAttribute('stroke-dashoffset', drawn(p, 0.25, 0.6));
      bits.forEach(function (b) { var t = E.in(seg(p, b.t, b.t + 0.22)); var x = b.x0 + (b.x1 - b.x0) * t, y = b.y0 + (b.y1 - b.y0) * t; b.n.setAttribute('transform', 'translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') rotate(' + (b.r * t).toFixed(0) + ')'); b.n.style.opacity = p > 0.02 ? 1 : 0; });
    };
  }
  // beat 3: leftover shingles slide into the aftercare box; the lid closes on its hinge
  function box(svg) {
    el('path', { d: 'M40 336 H560', 'stroke-width': 3, 'stroke-linecap': 'round', style: INK }, svg);
    el('path', { d: 'M170 230 H430 V334 H170 Z', fill: 'var(--surface-page)', 'stroke-width': 4, 'stroke-linejoin': 'round', style: INK }, svg);
    el('path', { d: 'M196 300 H404', 'stroke-width': 2, style: MUTED }, svg);
    var sh = [0, 1, 2].map(function (i) { return el('rect', { x: -48, y: -10, width: 96, height: 20, rx: 2, 'stroke-width': 3, style: 'fill:var(--surface-alt);' + INK }, svg); });
    var front = el('path', { d: 'M170 230 H430 V262 H170 Z', fill: 'var(--surface-page)', 'stroke-width': 4, 'stroke-linejoin': 'round', style: INK }, svg);
    var lid = el('g', {}, svg); el('path', { d: 'M0 0 H260 V-14 H0 Z', fill: 'var(--surface-page)', 'stroke-width': 4, 'stroke-linejoin': 'round', style: INK }, lid);
    return function (p) {
      sh.forEach(function (n, i) { var t = E.out(seg(p, 0.08 + i * 0.12, 0.38 + i * 0.12)); var x = 250 + i * 50 + (1 - t) * (60 - i * 30), y = 120 + i * 6 + t * (138 - i * 12), r = (1 - t) * (18 - i * 14); n.setAttribute('transform', 'translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') rotate(' + r.toFixed(1) + ')'); });
      var c = E.travel(seg(p, 0.66, 0.92)); lid.setAttribute('transform', 'translate(170 230) rotate(' + (-(1 - c) * 72).toFixed(1) + ')');
      front.style.opacity = 1;
    };
  }
  return { wrap: wrap, box: box };
})();

(function () {
  var root = document.querySelector('.nest-v1');
  if (!root) return;
  var beats = [].slice.call(root.querySelectorAll('.nv1-beat')), dots = [].slice.call(root.querySelectorAll('.nv1-dots li'));
  var arts = [root.querySelector('.nv1-wrapart'), root.querySelector('.nv1-passart'), root.querySelector('.nv1-boxart'), root.querySelector('.nv1-sealart')];
  var n = root.querySelector('.nv1-n'), ring = root.querySelector('.nv1-ring');
  Owl.bg.lawn(root.querySelector('.nv1-bg'), { sweep: false });
  var set = [OwlNest.wrap(arts[0]), Owl.magnetPass(arts[1], { nails: 8, width: 600 }).set, OwlNest.box(arts[2]), function (p) { ring.style.strokeDashoffset = 1 - Owl.EASE.out(Owl.seg(p, 0.05, 0.7)); }];
  var cur = -1;
  function show(b) {
    if (b === cur) return; cur = b;
    beats.forEach(function (x, i) { x.classList.toggle('is-on', i === b); x.setAttribute('aria-hidden', i === b ? 'false' : 'true'); });
    arts.forEach(function (x, i) { x.classList.toggle('is-on', i === b); });
    dots.forEach(function (d, i) { d.classList.toggle('is-passed', i <= b); });
    n.textContent = b + 1;
  }
  function render(p) {
    var b = Math.min(3, Math.floor(p * 4)); show(b);
    set[b](Owl.seg(p, b / 4, (b + 1) / 4));
  }
  if (Owl.reduced()) { beats.forEach(function (x) { x.classList.add('is-on'); x.removeAttribute('aria-hidden'); }); return; }
  render(0);
  Owl.pinScrub(root.querySelector('.nv1-stage'), function (p) { if (!root.closest('[hidden]')) render(p); });
})();
(function () {
  var root = document.querySelector('.nest-v2');
  if (!root) return;
  Owl.bg.lawn(root.querySelector('.nv2-bg'), { sweep: false });
  // the rail: the page's line runs down the left through every station (measured, never through copy)
  var rail = root.querySelector('.nv2-rail'), line = Owl.sweepLine(root.querySelector('.nv2-railpath'), { width: 3 });
  function placeRail() {
    if (root.closest('[hidden]')) return;
    var w = root.querySelector('.nv2-wrap').getBoundingClientRect(), pins = root.querySelectorAll('.nv2-pin'), first = pins[0].getBoundingClientRect(), last = pins[pins.length - 1].getBoundingClientRect();
    var top = Math.round(first.top + first.height / 2 - w.top), h = Math.round(last.top + last.height / 2 - w.top) - top; // starts at the first station: never through the heading
    rail.style.top = top + 'px'; rail.style.height = h + 'px'; rail.setAttribute('viewBox', '0 0 4 ' + h);
    [line.live, line.base].forEach(function (n) { n.setAttribute('d', 'M2 0 V' + h); });
  }
  placeRail(); addEventListener('resize', placeRail); document.fonts.ready.then(placeRail); document.addEventListener('owl:version', placeRail);
  Owl.scrub(root.querySelector('.nv2-stations'), function (p) { line.set(p); }, { start: 0.7, end: 0.6 });
  root.querySelectorAll('.nv2-st').forEach(function (st) {
    var art = st.querySelector('.nv2-art'), kind = st.dataset.art, set;
    if (kind === 'wrap') set = OwlNest.wrap(art);
    else if (kind === 'box') set = OwlNest.box(art);
    else if (kind === 'pass') set = Owl.magnetPass(art, { nails: 8, width: 600 }).set;
    else { var ring = st.querySelector('.nv2-ring'); set = function (p) { ring.style.strokeDashoffset = 1 - Owl.EASE.out(Owl.seg(p, 0.1, 0.8)); }; }
    Owl.scrub(art, function (p) { set(p); st.classList.toggle('is-reached', p > 0.02); }, { start: 0.9, end: 0.35 });
  });
})();
