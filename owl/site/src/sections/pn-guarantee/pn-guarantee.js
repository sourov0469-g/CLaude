/* Guarantee. V1: the amber ring draws round Owl's seal once. V2: the straight path and the bumpy path draw together and
   meet at one check (ease-out); under reduced motion everything is drawn. */
(function () {
  var r1 = document.querySelector('.ng-v1');
  if (r1) { var ring = r1.querySelector('.ng1-ring'); var s1 = function (p) { ring.style.strokeDashoffset = 1 - Owl.EASE.out(p); }; s1(Owl.reduced() ? 1 : 0); new IntersectionObserver(function (es, io) { if (es[0].isIntersecting) { io.disconnect(); Owl.play(s1, 1400); } }, { threshold: 0.5 }).observe(ring.closest('.ng1-seal')); }
  var r2 = document.querySelector('.ng-v2'); if (!r2) return;
  var NS = 'http://www.w3.org/2000/svg';
  function el(t, a, p) { var n = document.createElementNS(NS, t); for (var k in a) n.setAttribute(k, a[k]); p && p.appendChild(n); return n; }
  var s = r2.querySelector('.ng2-svg');
  var a = el('path', { d: 'M20 70 H600 C720 70 760 130 860 130', fill: 'none', 'stroke-width': 4, 'stroke-linecap': 'round', pathLength: 1, 'stroke-dasharray': 1, style: 'stroke:var(--text-primary)' }, s);
  var b = el('path', { d: 'M20 190 H440 c20 0 30 -40 50 -40 s30 40 50 40 H560 c20 0 30 -40 50 -40 s30 40 50 40 H660 C750 190 780 130 860 130', fill: 'none', 'stroke-width': 4, 'stroke-linecap': 'round', pathLength: 1, 'stroke-dasharray': 1, style: 'stroke:var(--text-primary)' }, s);
  var c = el('circle', { cx: 900, cy: 130, r: 40, style: 'fill:var(--accent-fill)' }, s);
  var t = el('path', { d: 'M882 130 l12 12 l24 -26', fill: 'none', 'stroke-width': 6, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', pathLength: 1, 'stroke-dasharray': 1, style: 'stroke:var(--text-primary)' }, s);
  function set(p) { a.style.strokeDashoffset = 1 - Owl.EASE.out(Owl.seg(p, 0, 0.7)); b.style.strokeDashoffset = 1 - Owl.EASE.out(Owl.seg(p, 0, 0.8)); c.style.transform = 'scale(' + Owl.EASE.out(Owl.seg(p, 0.7, 0.9)) + ')'; c.style.transformOrigin = '900px 130px'; t.style.strokeDashoffset = 1 - Owl.seg(p, 0.85, 1); }
  set(Owl.reduced() ? 1 : 0);
  new IntersectionObserver(function (es, io) { if (es[0].isIntersecting) { io.disconnect(); Owl.play(set, 2000); } }, { threshold: 0.5 }).observe(s);
})();
