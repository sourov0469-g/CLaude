/* HERO N — "The cover story" (Ever's magazine-narrative craft). The homepage as a magazine, the hero as its cover (markup
   in build_site.py, heroN). On arrival the masthead letters drop in, the cover lines stagger in and the photo settles.
   As the reader scrolls into the page, the cover turns away on its left edge like a page (native scroll, never
   hijacked; off on phones and under reduced motion). The cover lines are plain links to the sections. */
window.Hero7 = (function () {
  function n(h) {
    const RM = matchMedia('(prefers-reduced-motion: reduce)').matches, PH = matchMedia('(max-width:760px)');
    const page = h.querySelector('.npage'); let raf = 0;
    if (RM) { h.classList.add('ngo', 'ndone'); return; }
    requestAnimationFrame(() => requestAnimationFrame(() => { h.classList.add('ngo'); setTimeout(() => h.classList.add('ndone'), 1600); }));
    const turn = () => { raf = 0; if (PH.matches) { page.style.transform = ''; page.style.setProperty('--turn', 0); return; }
      const r = h.getBoundingClientRect(), p = Math.max(0, Math.min(1, -r.top / (r.height * 0.85)));
      page.style.transform = p ? `rotateY(${(-24 * p).toFixed(2)}deg) translateX(${(-2 * p).toFixed(2)}%)` : '';
      page.style.setProperty('--turn', p.toFixed(3)); };
    addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(turn); }, { passive: true });
    PH.addEventListener('change', turn); turn();
  }
  function wire() { const h = document.querySelector('.slot[data-slot=hero] .hero'); if (h && h.matches('.hnv')) n(h); }
  return { wire };
})();
