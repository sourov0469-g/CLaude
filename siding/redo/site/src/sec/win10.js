/* WINDOWS W — "Windows, close up" (upgrade plan W-A). Reference: Lando Norris, the curated archive with index and hover craft. The page's ONE dark
   band. Six crops of real installed windows in a sideways archive (scroll-snap); previous/next buttons and arrow keys step one frame; an index
   says which of six is centred. The glass of a centred frame catches one slow reflection sweep (frames whose glass suits it only).
   Two drawn background layers drift at different speeds (transform only). Markup and data come from build_site.py winW(). */
window.Win10 = (function () {
  function wire(root) {
    const s = root.querySelector('.wclS'); if (!s || s.dataset.w) return; s.dataset.w = 1;
    const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const sc = s.querySelector('.wclscroll'), frs = [...s.querySelectorAll('.wclfr')], prev = s.querySelector('.wclprev'), next = s.querySelector('.wclnext'), idx = s.querySelector('.wclidx b');
    let cur = 0, ticking = false;
    const centre = () => { const c = sc.scrollLeft + sc.clientWidth / 2; let best = 0, bd = 1e9; frs.forEach((f, i) => { const d = Math.abs(f.offsetLeft + f.offsetWidth / 2 - c); if (d < bd) { bd = d; best = i; } });
      if (sc.scrollLeft + sc.clientWidth >= sc.scrollWidth - 2) best = frs.length - 1; if (sc.scrollLeft <= 2) best = 0; return best; };
    const set = (i) => { if (i === cur) return; cur = i; idx.textContent = i + 1; prev.disabled = i === 0; next.disabled = i === frs.length - 1;
      frs.forEach((f, k) => f.classList.toggle('on', k === i)); const f = frs[i]; if (!RM && f.hasAttribute('data-sweep') && f.animate && !f.dataset.sw) { f.dataset.sw = 1; const g = f.querySelector('.wclph');
        g.animate([{ transform: 'translateX(-120%) skewX(-14deg)', opacity: 0 }, { opacity: 1, offset: .25 }, { transform: 'translateX(220%) skewX(-14deg)', opacity: 0 }], { duration: 2200, easing: 'cubic-bezier(.22,1,.36,1)', pseudoElement: '::after' }); } };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { ticking = false; set(centre()); }); } };
    sc.addEventListener('scroll', onScroll, { passive: true });
    const go = (i) => { i = Math.max(0, Math.min(frs.length - 1, i)); const f = frs[i]; sc.scrollTo({ left: f.offsetLeft - (sc.clientWidth - f.offsetWidth) / 2, behavior: RM ? 'auto' : 'smooth' }); };
    prev.addEventListener('click', () => go(cur - 1)); next.addEventListener('click', () => go(cur + 1));
    sc.addEventListener('keydown', (e) => { if (e.target !== sc) return; if (e.key === 'ArrowRight') { e.preventDefault(); go(cur + 1); } else if (e.key === 'ArrowLeft') { e.preventDefault(); go(cur - 1); } else if (e.key === 'Home') { e.preventDefault(); go(0); } else if (e.key === 'End') { e.preventDefault(); go(frs.length - 1); } });
    // first frame: its sweep plays when the band first comes into view
    frs[0].classList.add('on');
    if ('IntersectionObserver' in window) { const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { io.disconnect(); const f = frs[0]; if (!RM && f.hasAttribute('data-sweep')) { cur = -1; set(0); } } }, { threshold: .4 }); io.observe(sc); }
    // background drift
    const far = s.querySelector('.wclfar'), near = s.querySelector('.wclnear');
    if (!RM && far && near && 'IntersectionObserver' in window) { let on = false, tick = false;
      const upd = () => { tick = false; const r = s.getBoundingClientRect(), p = Math.max(-1, Math.min(1, (r.top + r.height / 2 - innerHeight / 2) / (innerHeight * .9))); far.style.setProperty('--py', (p * -20).toFixed(1) + 'px'); near.style.setProperty('--py', (p * -52).toFixed(1) + 'px'); };
      const req = () => { if (on && !tick) { tick = true; requestAnimationFrame(upd); } };
      new IntersectionObserver((es) => { on = es.some((e) => e.isIntersecting); if (on) req(); }).observe(s); addEventListener('scroll', req, { passive: true }); addEventListener('resize', req); }
  }
  return { wire };
})();
