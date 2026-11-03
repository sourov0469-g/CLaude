/* Story V1 (S1325): the spine fills between the first and last dot centres as the reader passes; reversible. */
(function () {
  var r = document.querySelector('.fs-v1'); if (!r) return;
  var sp = r.querySelector('.fs1-spine'), base = r.querySelector('.fs1-base'), fill = r.querySelector('.fs1-fill'), lis = [].slice.call(r.querySelectorAll('.fs1-steps li')), geo = null, raf = 0;
  function measure() { var t = sp.getBoundingClientRect(), c = lis.map(function (li) { var d = li.querySelector('.fs1-dot').getBoundingClientRect(); return d.top + d.height / 2 - t.top; }); geo = { a: c[0], b: c[c.length - 1], c: c }; [base, fill].forEach(function (n) { n.style.top = geo.a + 'px'; n.style.height = (geo.b - geo.a) + 'px'; }); }
  function update() {
    raf = 0; if (r.closest('[hidden]')) return; if (!geo) measure();
    var p = Owl.reduced() ? 1 : Math.max(0, Math.min(1, (innerHeight * 0.55 - sp.getBoundingClientRect().top - geo.a) / Math.max(1, geo.b - geo.a)));
    fill.style.transform = 'scaleY(' + p.toFixed(4) + ')'; var head = geo.a + p * (geo.b - geo.a);
    lis.forEach(function (li, k) { li.classList.toggle('is-on', geo.c[k] <= head + 1); });
  }
  function req() { if (!raf) raf = requestAnimationFrame(update); }
  function re() { geo = null; req(); }
  addEventListener('scroll', req, { passive: true }); addEventListener('resize', re); document.addEventListener('owl:version', re); addEventListener('hashchange', re);
  document.fonts && document.fonts.ready.then(re); re();
})();
