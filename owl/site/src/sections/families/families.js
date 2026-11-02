(function () {
  document.querySelectorAll('.fam-bg').forEach(function (s) { Owl.bg.rings(s); });
  var r = document.querySelector('.fam-v2'); if (!r) return;
  var t = r.querySelector('.fv2-track'), prev = r.querySelector('.fv2-prev'), next = r.querySelector('.fv2-next');
  function step(d) { var c = t.querySelector('.fv2-ch'); t.scrollBy({ left: d * (c.getBoundingClientRect().width + (parseFloat(getComputedStyle(t).columnGap) || 0)), behavior: Owl.reduced() ? 'auto' : 'smooth' }); }
  function state() { prev.disabled = t.scrollLeft < 4; next.disabled = t.scrollLeft + t.clientWidth > t.scrollWidth - 4; }
  prev.addEventListener('click', function () { step(-1); }); next.addEventListener('click', function () { step(1); });
  t.addEventListener('scroll', state, { passive: true }); addEventListener('resize', state); document.addEventListener('owl:version', state); state();
})();
