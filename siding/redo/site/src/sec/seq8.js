/* TRY M (new-versions addendum, pass 3) — "Match the house". Reference: MERSI (the split-slider: two halves moving past a
   seam, a central label naming what sits at it). Six published before/after pairs split into two reels, each shuffled.
   Turn the reels until a house's before meets its after: the pair locks and the seam shows the job's published record.
   Markup and photos come from build_site.tryM(); this file wires the reels. Game-like mechanics live in Try only. */
window.Seq8 = (function () {
  function wire(root) {
    const s = root.querySelector('.tmM'); if (!s || s.dataset.w) return; s.dataset.w = 1;
    const RM = matchMedia('(prefers-reduced-motion: reduce)').matches, PH = matchMedia('(max-width:760px)');
    const JOBS = JSON.parse(s.dataset.jobs), N = JOBS.length;
    const R = { b: { el: s.querySelector('.tmb'), order: s.dataset.bo.split(',').map(Number), i: 0 }, a: { el: s.querySelector('.tma'), order: s.dataset.ao.split(',').map(Number), i: 0 } };
    const label = s.querySelector('.tmlabel'), rec = s.querySelector('.tmrec'), live = s.querySelector('.tmlive'), nEl = s.querySelector('.tmn'), tEl = s.querySelector('.tmt'), stage = s.querySelector('.tmstage');
    const found = new Set(); let turns = 0, hints = 0, lastLock = -1;
    const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
    // each track holds the six slides three times over (clones), so a reel can turn forever without a jump
    Object.values(R).forEach((r) => { const t = r.el.querySelector('.tmtrack'), orig = [...t.children];
      [0, 1].forEach(() => orig.forEach((f) => t.appendChild(f.cloneNode(true))));
      [...t.children].forEach((f, k) => { if (k < N || k >= 2 * N) { f.setAttribute('aria-hidden', 'true'); f.querySelector('img').alt = ''; } });
      r.track = t; r.slides = [...t.children]; r.pos = N; });
    const ax = () => (PH.matches ? 'X' : 'Y');
    const stepPx = (r) => { const a = r.slides[0], b = r.slides[1]; return PH.matches ? b.offsetLeft - a.offsetLeft : b.offsetTop - a.offsetTop; };
    const offset = (r) => { const v = r.el.querySelector('.tmview'), sl = r.slides[0]; return PH.matches ? (v.clientWidth - sl.offsetWidth) / 2 : (v.clientHeight - sl.offsetHeight) / 2; };
    const place = (r, anim, extra = 0) => { r.track.style.transition = anim && !RM ? 'transform .55s cubic-bezier(.22,1,.36,1)' : 'none';
      r.track.style.transform = `translate${ax()}(${(offset(r) - r.pos * stepPx(r) + extra).toFixed(1)}px)`;
      r.slides.forEach((f, k) => f.classList.toggle('tmon', k === r.pos)); };
    const cur = (r) => r.order[((r.pos % N) + N) % N];
    const mark = () => Object.values(R).forEach((r) => r.slides.forEach((f) => f.classList.toggle('tmdone', found.has(+f.dataset.j))));
    const setLabel = (t, ok) => { const old = label.querySelector('.tmlt'), nw = document.createElement('span'); nw.className = 'tmlt tmin'; nw.textContent = t;
      label.classList.toggle('tmlock', !!ok); label.appendChild(nw); old.classList.add('tmout'); setTimeout(() => old.remove(), RM ? 0 : 600);
      requestAnimationFrame(() => requestAnimationFrame(() => nw.classList.remove('tmin'))); };
    const record = (j) => { const x = JOBS[j];
      rec.innerHTML = `<p class="tmkick">Matched</p><p class="tmrecp"><b>${esc(x.place)}</b><span>${esc(x.trade)} · ${esc(x.when)} · ${esc(x.inst)}</span></p>`
        + `<p class="tmband"><small>${esc(x.bl)}</small><b>${esc(x.band)}</b></p><a class="tmlink" href="${esc(x.href)}" target="_blank" rel="noopener">See the project</a>`; };
    const finish = () => { rec.classList.remove('tmstale'); rec.innerHTML = `<p class="tmrecp"><b>All six matched</b><span>in ${turns} turn${turns === 1 ? '' : 's'}${hints ? `, with ${hints} hint${hints === 1 ? '' : 's'}` : ''}. Every one is a real job of ours.</span></p>`
        + `<ul class="tmall">${JOBS.map((x) => `<li><a href="${esc(x.href)}" target="_blank" rel="noopener">${esc(x.place)}</a> · ${esc(x.trade)}, ${esc(x.when)}</li>`).join('')}</ul>`;
      s.classList.add('tmwon'); live.textContent = `All six matched in ${turns} turns.`; };
    // after every move: does the seam hold one house?
    const check = () => { const jb = cur(R.b), ja = cur(R.a);
      if (jb === ja) { const fresh = !found.has(jb); found.add(jb); mark(); nEl.textContent = found.size; stage.classList.remove('tmhit'); void stage.offsetWidth; stage.classList.add('tmhit');
        setLabel(`${JOBS[jb].place}`, true); rec.classList.remove('tmstale'); if (lastLock !== jb) { record(jb); lastLock = jb; }
        if (fresh) live.textContent = `Matched: ${JOBS[jb].place}, ${JOBS[jb].trade}, ${JOBS[jb].when}. ${found.size} of ${N}.`;
        if (fresh && found.size === N) setTimeout(finish, RM ? 0 : 700); }
      else { stage.classList.remove('tmhit'); if (lastLock >= 0) rec.classList.add('tmstale'); if (label.classList.contains('tmlock')) setLabel('Turn the reels to match a house', false); lastLock = -1; } };
    const turn = (side, d, count = true) => { const r = R[side]; r.pos += d; if (count) { turns++; tEl.textContent = turns; } place(r, true);
      const done = () => { if (r.pos < N || r.pos >= 2 * N) { r.pos = ((r.pos - N) % N + N) % N + N; place(r, false); } };
      if (RM) done(); else setTimeout(done, 570); check(); };
    s.querySelectorAll('.tmbtn').forEach((b) => b.addEventListener('click', () => turn(b.dataset.r, +b.dataset.d)));
    Object.entries(R).forEach(([side, r]) => {
      r.el.addEventListener('keydown', (e) => { const d = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key]; if (d && e.target === r.el) { e.preventDefault(); turn(side, d); } });
      // drag the reel; release snaps by the distance moved
      const v = r.el.querySelector('.tmview'); let d0 = null;
      v.addEventListener('pointerdown', (e) => { if (e.button) return; d0 = { p: PH.matches ? e.clientX : e.clientY, id: e.pointerId, m: 0 }; v.setPointerCapture(e.pointerId); });
      v.addEventListener('pointermove', (e) => { if (!d0) return; d0.m = (PH.matches ? e.clientX : e.clientY) - d0.p; place(r, false, d0.m); });
      const up = () => { if (!d0) return; const m = d0.m, st = stepPx(r); d0 = null; const k = Math.round(-m / st) || (Math.abs(m) > 28 ? -Math.sign(m) : 0);
        if (k) { const n = Math.max(-3, Math.min(3, k)); r.pos += n; turns += Math.abs(n); tEl.textContent = turns; place(r, true);
          setTimeout(() => { if (r.pos < N || r.pos >= 2 * N) { r.pos = ((r.pos - N) % N + N) % N + N; place(r, false); } }, RM ? 0 : 570); check(); }
        else place(r, true); };
      v.addEventListener('pointerup', up); v.addEventListener('pointercancel', up); });
    // hint: bring the after reel to the before shown (or, if that house is already found, the next unmatched pair)
    s.querySelector('.tmhint').addEventListener('click', () => { if (found.size === N) return; hints++;
      let jb = cur(R.b); if (found.has(jb)) { const k = [...Array(N).keys()].map((x) => (R.b.pos - N + x) % N).find((x) => !found.has(R.b.order[x]));
        R.b.pos = N + k; place(R.b, true); jb = R.b.order[k]; }
      const ka = R.a.order.indexOf(jb), now = ((R.a.pos - N) % N + N) % N; let d = ka - now; if (d > N / 2) d -= N; if (d < -N / 2) d += N;
      R.a.pos += d; place(R.a, true); setTimeout(() => { R.a.pos = ((R.a.pos - N) % N + N) % N + N; place(R.a, false); }, RM ? 0 : 570); check(); });
    s.querySelector('.tmreset').addEventListener('click', () => { found.clear(); turns = 0; hints = 0; lastLock = -1; nEl.textContent = 0; tEl.textContent = 0; s.classList.remove('tmwon');
      R.b.pos = N; R.a.pos = N; place(R.b, true); place(R.a, true); mark(); stage.classList.remove('tmhit'); setLabel('Turn the reels to match a house', false);
      rec.classList.remove('tmstale'); rec.innerHTML = '<p class="tmrecl">Line up a before and its after. Each match shows the job as we published it.</p>'; live.textContent = 'Reels reset.'; });
    const all = () => { place(R.b, false); place(R.a, false); };
    PH.addEventListener('change', all); addEventListener('resize', all);
    s.querySelectorAll('img').forEach((im) => { if (!im.complete) im.addEventListener('load', all, { once: true }); });
    all();
  }
  return { wire };
})();
