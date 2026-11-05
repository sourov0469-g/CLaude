/* HERO — wiring. Depth: the photograph (back and front together, so the cut-out always lines up) drifts a few pixels with the pointer and the
   headline drifts the opposite way by more, so it slides behind the chimney and trees; on scroll the headline sinks behind the roofline and fades.
   Touch: only the entrance and the scroll sink. Reduced motion: nothing moves. Pointer and scroll work in transform and opacity only, one rAF. */
window.FHero = (function () {
  function wire(root) {
    const h = root.querySelector('.fh'); if (!h || h.dataset.w) return; h.dataset.w = 1;
    const RM = matchMedia('(prefers-reduced-motion: reduce)').matches, fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
    const imgs = [...h.querySelectorAll('.fh-stage img')];
    const ready = Promise.all(imgs.map((i) => (i.decode ? i.decode().catch(() => {}) : Promise.resolve())));
    ready.then(() => { h.classList.add('fh-on'); if (!RM) { h.classList.add('fh-rise', 'fh-settle'); } });
    if (RM) return;
    let tx = 0, ty = 0, cx = 0, cy = 0, run = false, on = true;
    const sc = () => scrollY, hh = () => h.clientHeight;
    const frame = () => { run = false;
      cx += (tx - cx) * .09; cy += (ty - cy) * .09;
      const s = Math.max(0, Math.min(1, sc() / (hh() * .85)));
      h.style.setProperty('--sx', (-cx * 9).toFixed(2) + 'px'); h.style.setProperty('--sy', (-cy * 5).toFixed(2) + 'px');
      h.style.setProperty('--tx', (cx * 22).toFixed(2) + 'px'); h.style.setProperty('--ty', (cy * 9).toFixed(2) + 'px');
      h.style.setProperty('--sink', (s * hh() * .26).toFixed(1) + 'px'); h.style.setProperty('--ta', (1 - Math.min(1, s * 1.5)).toFixed(3));
      if (Math.abs(tx - cx) > .001 || Math.abs(ty - cy) > .001) kick(); };
    const kick = () => { if (!run && on) { run = true; requestAnimationFrame(frame); } };
    if (fine) { h.addEventListener('pointermove', (e) => { const r = h.getBoundingClientRect(); tx = (e.clientX - r.left) / r.width * 2 - 1; ty = (e.clientY - r.top) / r.height * 2 - 1; kick(); });
      h.addEventListener('pointerleave', () => { tx = 0; ty = 0; kick(); }); }
    addEventListener('scroll', kick, { passive: true }); addEventListener('resize', kick);
    document.addEventListener('visibilitychange', () => { on = !document.hidden; if (on) kick(); });
    new IntersectionObserver((es) => { on = es.some((e) => e.isIntersecting); if (on) kick(); }).observe(h);
    kick();
  }
  return { wire };
})();
