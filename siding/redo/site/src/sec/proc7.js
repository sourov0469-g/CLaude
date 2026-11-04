/* PROCESS L (new-versions addendum, pass 2) — "One job, on its calendar". Reference: Scout Motors (sequenced proof).
   Markup is built in Python (procL in build_site.py) from the firm's published project page for job APS-4867; this
   module wires the tablist (arrows, Home/End, aria-selected, one panel shown) and the one-time arrival. */
window.Proc7 = (function () {
  function wire(root) {
    const s = root.querySelector('.prL'); if (!s || s.dataset.w) return; s.dataset.w = 1;
    const ts = [...s.querySelectorAll('.plt')], ps = [...s.querySelectorAll('.plp')];
    const set = (i, focus) => { ts.forEach((t, k) => { t.setAttribute('aria-selected', k === i); t.tabIndex = k === i ? 0 : -1; ps[k].hidden = k !== i; });
      ps[i].classList.remove('plin'); void ps[i].offsetWidth; ps[i].classList.add('plin'); if (focus) ts[i].focus(); };
    ts.forEach((t, i) => {
      t.addEventListener('click', () => set(i));
      t.addEventListener('keydown', (e) => { const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
        if (d) { e.preventDefault(); set((i + d + ts.length) % ts.length, true); }
        else if (e.key === 'Home' || e.key === 'End') { e.preventDefault(); set(e.key === 'Home' ? 0 : ts.length - 1, true); } });
    });
    const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (RM) s.classList.add('plgo');
    else new IntersectionObserver((es, io) => es.forEach((e) => { if (e.isIntersecting) { io.disconnect(); s.classList.add('plgo'); } }), { threshold: 0.25 }).observe(s.querySelector('.plax'));
  }
  return { wire };
})();
