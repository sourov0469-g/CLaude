/* proof strip V1: numbers count up once when first seen (ease-out, tabular), then rest; reduced motion shows them as-is */
(function () {
  var root = document.querySelector('.proof-v1'); if (!root || Owl.reduced()) return;
  var spans = [].slice.call(root.querySelectorAll('[data-count]'));
  spans.forEach(function (s) { s.textContent = (+(s.dataset.from || 0)).toFixed(+(s.dataset.dec || 0)); }); // start value set before first paint of the strip: no jump
  new IntersectionObserver(function (es, io) {
    if (!es[0].isIntersecting) return; io.disconnect();
    spans.forEach(function (s, i) {
      var to = parseFloat(s.dataset.count), from = parseFloat(s.dataset.from || 0), dec = +(s.dataset.dec || 0);
      setTimeout(function () { Owl.play(function (p) { s.textContent = (from + (to - from) * Owl.EASE.out(p)).toFixed(dec); }, 900); }, i * 40);
    });
  }, { threshold: 0.6 }).observe(root);
})();
