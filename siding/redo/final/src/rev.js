/* SECTION 6 — Reviews. B (the ported hanging tags) gets: a count-up 4.9, an occasional gust of wind (synthetic pointer sweeps across the line, which the tags' own
   physics answer), parallax art, and a reader dialog you can step through (buttons, arrow keys). C is one review whose words light up as you scroll. */
window.FRev = (function () {
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x)), ease = (t) => t * t * (3 - 2 * t);
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function parallax(sec, bg) {
    if (!bg || RM) return; const far = bg.firstElementChild, near = bg.lastElementChild; let tick = false;
    const upd = () => { tick = false; const r = sec.getBoundingClientRect(), p = clamp((r.top + r.height / 2 - innerHeight / 2) / (innerHeight * .9), -1, 1); far.style.setProperty('--py', (p * -24).toFixed(1) + 'px'); near.style.setProperty('--py', (p * -60).toFixed(1) + 'px'); };
    addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(upd); } }, { passive: true }); upd();
  }
  function wireB(root) {
    const s = root.querySelector('.rvB'); if (!s || s.dataset.fr) return; s.dataset.fr = 1;
    parallax(s, s.querySelector('.rv-bg'));
    // count-up for the 4.9 when the tags are pegged on
    const b = s.querySelector('.tag.big b'); if (b) { const fin = b.textContent; b.dataset.fin = fin;
      const run = () => { if (RM) return; const t0 = performance.now(); b.textContent = '0.0'; const f = (t) => { const u = clamp((t - t0 - 700) / 1300); b.textContent = (4.9 * ease(u)).toFixed(1); if (u < 1) requestAnimationFrame(f); else b.textContent = fin; }; requestAnimationFrame(f); };
      const mo = new MutationObserver(() => { if (s.classList.contains('in')) { mo.disconnect(); run(); } }); if (s.classList.contains('in')) run(); else mo.observe(s, { attributes: true, attributeFilter: ['class'] }); }
    // a gust now and then: the tags' own pointer-driven physics do the swinging
    const view = s.querySelector('.lineview'); let inside = false, vis = false, timer = 0, dlgOpen = false;
    view.addEventListener('pointerenter', () => { inside = true; }); view.addEventListener('pointerleave', () => { inside = false; });
    new IntersectionObserver((es) => { vis = es[0].isIntersecting; }, { threshold: .4 }).observe(s);
    function gust() { if (RM || inside || !vis || document.hidden || dlgOpen) return; const r = view.getBoundingClientRect(), n = 14, rows = [r.top + 70, r.top + Math.min(r.height * .52, 330) + 70], row = rows[(Math.random() * 2) | 0], dir = Math.random() < .5;
      for (let i = 0; i < n; i++) setTimeout(() => { const x = r.left + r.width * (dir ? .06 + i / n * .88 : .94 - i / n * .88); view.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, clientX: x, clientY: row, pointerType: 'mouse' })); }, i * 48);
      setTimeout(() => view.dispatchEvent(new PointerEvent('pointerleave', { bubbles: false })), n * 48 + 30); }
    if (!RM) timer = setInterval(gust, 8500);
    // the reader dialog: prev / next / counter / arrow keys
    const dlg = document.querySelector('.rvdlg'); if (!dlg) return; const tags = [...s.querySelectorAll('.tag:not(.big)')]; let cur = 0;
    const card = dlg.querySelector('.card'), nav = document.createElement('div'); nav.className = 'rdn';
    const ar = (d) => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${d}" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    nav.innerHTML = `<button type="button" class="rp">${ar('M15 5l-7 7 7 7')}Previous</button><span class="rn" aria-live="polite"></span><button type="button" class="rx">Next${ar('M9 5l7 7-7 7')}</button>`; card.append(nav);
    const cnt = nav.querySelector('.rn'); const go = (d) => { const n = (cur + d + tags.length) % tags.length; tags[n].click(); };
    tags.forEach((t, i) => t.addEventListener('click', () => { cur = i; cnt.textContent = (i + 1) + ' of ' + tags.length; dlgOpen = true; }, true));
    nav.querySelector('.rp').addEventListener('click', () => go(-1)); nav.querySelector('.rx').addEventListener('click', () => go(1));
    dlg.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight') go(1); else if (e.key === 'ArrowLeft') go(-1); });
    new MutationObserver(() => { dlgOpen = !dlg.hidden; }).observe(dlg, { attributes: true, attributeFilter: ['hidden'] });
  }
  function wireC(root) {
    const s = root.querySelector('.rc'); if (!s || s.dataset.fr) return; s.dataset.fr = 1;
    parallax(s, s.querySelector('.rc-bg'));
    const words = [...s.querySelectorAll('.w')], N = words.length, by = s.querySelector('.rc-by'), ring = s.querySelector('.rc-ring'), pc = s.querySelector('.rc-pc'), qm = s.querySelector('.rc-qm'), all = s.querySelector('.rc-all');
    if (RM) return; s.classList.add('js'); let tick = false, last = -1;
    const upd = () => { tick = false; const r = s.getBoundingClientRect(), len = r.height - innerHeight, p = clamp(-r.top / len), rd = clamp((p - .07) / .76), pos = rd * (N + 1.5);
      qm.style.setProperty('--q', clamp(p / .1).toFixed(3));
      for (let i = 0; i < N; i++) { const t = clamp(pos - i), w = words[i], o = .16 + .84 * ease(t); w.style.opacity = o.toFixed(3); if (w.classList.contains('k')) w.style.setProperty('--u', ease(clamp(pos - i - 1)).toFixed(3)); }
      const bo = clamp((p - .84) / .1); by.style.setProperty('--bo', bo.toFixed(3)); by.style.setProperty('--bl', clamp((p - .8) / .12).toFixed(3));
      ring.parentNode.parentNode.style.setProperty('--r', rd.toFixed(3)); s.style.setProperty('--r', rd.toFixed(3)); pc.textContent = Math.round(rd * 100) + '%'; };
    addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(upd); } }, { passive: true }); addEventListener('resize', upd); upd();
    all.addEventListener('click', () => { const r = s.getBoundingClientRect(); scrollTo({ top: scrollY + r.bottom - innerHeight - 4, behavior: 'smooth' }); });
  }
  return { wire(root) { wireB(root); wireC(root); } };
})();
