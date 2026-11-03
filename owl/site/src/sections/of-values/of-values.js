/* Values V2: the nest is woven once when seen. */
(function () {
  var r = document.querySelector('.fv-v2'); if (!r) return; var s = r.querySelector('.fv2-nest');
  var n = Owl.nest(s, { width: 480, height: 280, seed: 21 });
  new IntersectionObserver(function (es, io) { if (es[0].isIntersecting) { io.disconnect(); Owl.play(n.set, 2000); } }, { threshold: 0.4 }).observe(s);
})();
