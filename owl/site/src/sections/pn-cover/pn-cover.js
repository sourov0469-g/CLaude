/* Nest cover V1: Owl's nest is woven once when the cover is seen (the identity's own nest drawing). */
(function () {
  var r = document.querySelector('.nc-v1'); if (!r) return;
  var n = Owl.nest(r.querySelector('.nc1-nest'), { width: 520, height: 300 });
  new IntersectionObserver(function (es, io) { if (es[0].isIntersecting) { io.disconnect(); Owl.play(n.set, 2200); } }, { threshold: 0.3 }).observe(r.querySelector('.nc1-nest'));
})();
