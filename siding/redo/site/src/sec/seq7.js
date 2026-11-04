/* TRY THE JOB L — "Price the job" (new-versions addendum, pass 2; Apple AirPods Pro: numbers as events).
   A quiz (game-like mechanics live in this section only). Six documented jobs, each with the band the firm published
   for that trade on that job. Pick one of four bands; the real band then lands on the photo, character by character,
   and a seven-step ladder lights the job's band beside the trade's published median band. Markup is built in
   build_site.py (tryL); this file only wires it. Nothing here is saved or sent anywhere. */
window.Seq7 = (function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const say = (b) => b.replace('–', ' to ');
  function roll(el, txt) {
    el.textContent = ''; el.classList.remove('tqrl');
    [...txt].forEach((ch, i) => {
      const o = document.createElement('span'); o.className = 'tqch'; o.style.setProperty('--d', i);
      const s = document.createElement('span'); s.textContent = ch; o.appendChild(s); el.appendChild(o);
    });
    if (RM) { el.classList.add('tqrl'); return; }
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('tqrl')));
  }
  function wire(root) {
    const sec = root.querySelector('.tqL'); if (!sec || sec.dataset.w) return; sec.dataset.w = '1';
    const card = sec.querySelector('.tqcard'), live = sec.querySelector('.tqlive');
    const R = [...sec.querySelectorAll('.tqr:not(.tqend)')], END = sec.querySelector('.tqend');
    const pips = [...sec.querySelectorAll('.tqpips i')], cn = sec.querySelector('.tqcn'), okc = sec.querySelector('.tqok');
    const res = R.map(() => null);           // distance in bands for each answered job
    let cur = 0;
    const label = (r) => r.querySelector('.tqbig small').textContent;
    const band = (r) => r.querySelector('.tqbig b').dataset.v;
    function bring() {                        // keep the card's top in view when the job changes
      const t = card.getBoundingClientRect().top;
      if (t < 0 || t > innerHeight * 0.5) scrollTo({ top: scrollY + t - 90, behavior: RM ? 'auto' : 'smooth' });
    }
    function show(n) {
      [...R, END].forEach((r, i) => { r.hidden = i !== n; r.classList.remove('tqin'); });
      const r = n < R.length ? R[n] : END; if (!RM) { void r.offsetWidth; r.classList.add('tqin'); }
      cur = n; cn.textContent = Math.min(n + 1, R.length);
    }
    function answer(r, t) {
      const n = +r.dataset.n; if (res[n] !== null) return;
      const c = +r.dataset.c, i = +t.dataset.i, d = Math.abs(i - c); res[n] = d;
      r.querySelectorAll('.tqb').forEach((b) => {
        const bi = +b.dataset.i; b.setAttribute('aria-disabled', 'true');
        const tag = (txt) => { const s = document.createElement('small'); s.textContent = txt; b.appendChild(s); };
        if (bi === c) { b.classList.add('tqy'); tag(d ? 'Published' : 'Spot on'); b.setAttribute('aria-label', say(b.firstChild.textContent) + ', the published band'); }
        else if (bi === i) { b.classList.add('tqx'); tag('Your pick'); b.setAttribute('aria-label', say(b.firstChild.textContent) + ', your pick'); }
        else b.classList.add('tqd');
      });
      const pick = t.firstChild.textContent, hi = c > i ? 'higher' : 'lower';
      const hit = d === 0 ? `<b>Spot on.</b> You picked ${pick}.` : `<b>${d === 1 ? 'One band off.' : d + ' bands off.'}</b> You picked ${pick}; the job came in ${hi}.`;
      const hp = r.querySelector('.tqhit'); hp.innerHTML = hit;
      r.querySelector('.tqph').classList.add('tqgo'); roll(r.querySelector('.tqbig b'), band(r));
      const rs = r.querySelector('.tqres'); rs.hidden = false; if (!RM) { void rs.offsetWidth; } rs.classList.add('tqon');
      pips[n].classList.add('on', d ? 'x' : 'y');
      okc.textContent = res.filter((v) => v === 0).length;
      live.textContent = `${label(r)}: ${say(band(r))}. ${hp.textContent}`;
      const nx = r.querySelector('.tqnext'); if (nx) setTimeout(() => nx.focus({ preventScroll: true }), RM ? 0 : 650);
    }
    function finish() {
      const ok = res.filter((v) => v === 0).length, near = res.filter((v) => v === 1).length;
      const mos = END.querySelector('.tqmos'); mos.textContent = '';
      R.forEach((r, n) => {
        const f = document.createElement('figure'); f.className = 'tqmf' + (res[n] === 0 ? ' y' : '');
        const im = document.createElement('img'); im.src = r.querySelector('.tqph img').src; im.alt = ''; im.decoding = 'async';
        const cap = document.createElement('figcaption');
        const b = document.createElement('b'); b.textContent = band(r);
        const s = document.createElement('span'); s.textContent = res[n] === 0 ? 'Spot on' : res[n] === 1 ? 'One band off' : res[n] + ' bands off';
        cap.append(b, s); f.append(im, cap); mos.appendChild(f);
      });
      show(R.length);
      roll(END.querySelector('.tqsc b'), String(ok));
      END.querySelector('.tqsc2').textContent = `Spot on for ${ok} of ${R.length} jobs` + (near ? `, and one band off for ${near} more.` : '.');
      live.textContent = `You priced ${ok} of ${R.length} jobs spot on` + (near ? `, and ${near} within one band.` : '.');
      setTimeout(() => END.querySelector('.tqagain').focus({ preventScroll: true }), RM ? 0 : 500);
    }
    function reset() {
      res.fill(null); okc.textContent = '0'; pips.forEach((p) => p.className = '');
      R.forEach((r) => {
        r.querySelectorAll('.tqb').forEach((b) => { b.removeAttribute('aria-disabled'); b.classList.remove('tqy', 'tqx', 'tqd'); b.querySelectorAll('small').forEach((s) => s.remove()); b.setAttribute('aria-label', say(b.firstChild.textContent)); });
        r.querySelector('.tqph').classList.remove('tqgo'); const big = r.querySelector('.tqbig b'); big.classList.remove('tqrl'); big.textContent = '?';
        const rs = r.querySelector('.tqres'); rs.hidden = true; rs.classList.remove('tqon');
      });
      show(0); bring(); live.textContent = 'Job 1 of ' + R.length + '.';
      setTimeout(() => R[0].querySelector('.tqb').focus({ preventScroll: true }), RM ? 0 : 300);
    }
    sec.addEventListener('click', (ev) => {
      const t = ev.target.closest('.tqb, .tqnext, .tqagain'); if (!t || !sec.contains(t)) return;
      if (t.classList.contains('tqb')) { if (t.getAttribute('aria-disabled') !== 'true') answer(t.closest('.tqr'), t); return; }
      if (t.classList.contains('tqagain')) { reset(); return; }
      if (cur + 1 >= R.length) { finish(); bring(); return; }
      show(cur + 1); bring(); live.textContent = `Job ${cur + 1} of ${R.length}.`;
      setTimeout(() => R[cur].querySelector('.tqb').focus({ preventScroll: true }), RM ? 0 : 300);
    });
  }
  return { wire };
})();
