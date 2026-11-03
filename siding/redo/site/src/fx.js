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
  // section headings: split once, rise in when they arrive (the hero splits itself)
  const io = 'IntersectionObserver' in window && !RM ? new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.3 }) : null;
  setTimeout(() => document.querySelectorAll('.slot [data-split]').forEach((el) => { if (el.closest('.hero') || el.dataset.split) return;
    const t = el.textContent; el.setAttribute('aria-label', t.trim()); el.textContent = '';
    t.split(/(\s+)/).forEach((w) => { if (!w.trim()) { el.append(w); return; } const s = document.createElement('span'); s.className = 'w'; s.setAttribute('aria-hidden', 'true'); const i = document.createElement('span'); i.textContent = w; s.append(i); el.append(s); });
    [...el.querySelectorAll('.w')].forEach((w, i) => w.style.setProperty('--i', i)); el.dataset.split = 1; if (io) io.observe(el); else el.classList.add('in'); }));
  // phones: a sideways row that runs past the screen edge gets an arrow at that edge (and one back, once scrolled);
  // the arrow scrolls the row, nudges twice when it first appears, and disappears at the end of the row
  const XS = ['.svB .words', '.viB .steps', '.rvB .lineview', '.arA .cards'];
  const CHEV = (d) => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${d > 0 ? 'M9 5l7 7-7 7' : 'M15 5l-7 7 7 7'}" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  setTimeout(() => XS.forEach((q) => document.querySelectorAll('.slot ' + q).forEach((row) => {
    const host = row.parentElement; if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
    const mk = (d) => { const b = document.createElement('button'); b.type = 'button'; b.className = 'xh ' + (d > 0 ? 'r' : 'l'); b.innerHTML = CHEV(d); b.setAttribute('aria-label', d > 0 ? 'Scroll this row right' : 'Scroll this row left');
      b.addEventListener('click', () => row.scrollBy({ left: d * row.clientWidth * 0.8, behavior: RM ? 'auto' : 'smooth' })); host.append(b); return b; };
    const R = mk(1), L = mk(-1);
    const place = () => { const on = innerWidth <= 860 && row.scrollWidth > row.clientWidth + 4, y = row.offsetTop + row.offsetHeight / 2;
      [R, L].forEach((b) => { b.style.top = y + 'px'; }); R.hidden = !on || row.scrollLeft + row.clientWidth >= row.scrollWidth - 6; L.hidden = !on || row.scrollLeft < 6; };
    row.addEventListener('scroll', place, { passive: true }); addEventListener('resize', place); new ResizeObserver(place).observe(row); place(); })), 60);
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
