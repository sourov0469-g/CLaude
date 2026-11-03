/* Magnetic buttons (fine pointers only; S0405 timings, S1330-style damping) and the review switcher (?review). */
(function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches, FINE = matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (FINE && !RM) {
    let cur = null;
    addEventListener('pointermove', (e) => { if (e.pointerType !== 'mouse') return;
      const b = e.target.closest && e.target.closest('.btn'); if (cur && cur !== b) { cur.style.setProperty('--mx', '0px'); cur.style.setProperty('--my', '0px'); cur = null; }
      if (!b) return; cur = b; const r = b.getBoundingClientRect(), dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
      b.style.setProperty('--mx', (dx * 0.14).toFixed(1) + 'px'); b.style.setProperty('--my', (dy * 0.22).toFixed(1) + 'px'); }, { passive: true });
  }
  // review switcher
  const q = new URLSearchParams(location.search); if (!q.has('review')) return;
  const V = window.__VERSIONS || {}, NAMES = window.__SLOTNAMES || {};
  setTimeout(() => {   // after the boot has put the requested versions in place
  const el = document.createElement('aside'); el.className = 'rv'; el.setAttribute('aria-label', 'Review switcher');
  const link = (slot, v) => { const p = new URLSearchParams(location.search); p.delete('review'); p.set(slot, v); return '?review&' + p.toString(); };
  const live = (slot) => (document.querySelector(`.slot[data-slot="${slot}"]`) || {}).dataset?.v;
  el.innerHTML = `<header><div><b>Review</b> <span>every version, live in place</span></div><button type="button">Hide</button></header><div class="body">${Object.keys(V).map((slot) =>
    `<div class="row"><b>${NAMES[slot] || slot}</b><div class="vs">${V[slot].map(([v, label]) => `<a href="${link(slot, v)}" aria-current="${live(slot) === v}"><span class="n">${v.toUpperCase()}</span>${label}</a>`).join('')}</div></div>`).join('')}</div>`;
  document.body.append(el);
  el.querySelector('header button').addEventListener('click', (e) => { const m = el.classList.toggle('min'); e.target.textContent = m ? 'Show' : 'Hide'; });
  });
})();
