/* HEADER + FOOTER treatment (upgrade Round 5).
   Header: a reading line under the bar fills as the page is read; the bar steps out of the way while reading downward
   and comes back on any move up (never while its menu is open or something in it has focus); on wide screens a small
   chip names the part of the page you are in.
   Footer: the boards stand up one after another as the footer arrives, like boards going up a wall. */
(function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const h = document.querySelector('.hdr'); if (!h) return;
  const line = document.createElement('i'); line.className = 'hline'; line.setAttribute('aria-hidden', 'true'); h.append(line);
  const chip = document.createElement('span'); chip.className = 'hwhere'; chip.setAttribute('aria-hidden', 'true'); h.querySelector('.brand').after(chip);
  const NAMES = window.__SLOTNAMES || {}; let lastY = scrollY, raf = 0, cur = '';
  function upd() { raf = 0; const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
    line.style.transform = `scaleX(${max > 0 ? (y / max).toFixed(4) : 0})`;
    const busy = h.contains(document.activeElement) || (document.getElementById('book') || {}).classList?.contains('open') || document.body.classList.contains('sheet-open');
    if (!RM) { if (y > 420 && y - lastY > 6 && !busy) h.classList.add('away'); else if (lastY - y > 6 || y < 200 || busy) h.classList.remove('away'); }
    lastY = y;
    let name = ''; document.querySelectorAll('main > .slot').forEach((sl) => { const r = sl.firstElementChild && sl.firstElementChild.getBoundingClientRect(); if (r && r.top < innerHeight * 0.4 && r.bottom > innerHeight * 0.4) name = NAMES[sl.dataset.slot] || ''; });
    if (name === 'Hero') name = ''; if (name !== cur) { cur = name; chip.textContent = name; chip.classList.toggle('on', !!name); } }
  addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(upd); }, { passive: true }); addEventListener('resize', upd);
  h.addEventListener('focusin', () => h.classList.remove('away')); upd();
  // footer boards
  const ft = document.querySelector('footer.ft');
  if (ft) { if (RM) ft.classList.add('up'); else new IntersectionObserver((es, io) => es.forEach((e) => { if (e.isIntersecting) { io.disconnect(); ft.classList.add('up'); } }), { threshold: 0.15 }).observe(ft); }
})();
