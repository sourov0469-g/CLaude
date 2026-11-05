/* WINDOWS M (new-versions addendum, pass 3) — "One window, four answers". Reference: Lusion (flow: one object that never
   cuts, only becomes its next state). One drawn window holds the firm's window record: pick a question and the mullions
   glide to divide the glass into the answer, each pane's area its share of the 376 priced window jobs. Beside it, the
   firm's own published answer, verbatim (faq.json). Counts as published; "other or not recorded" = published total minus
   the named counts, labelled as such. Nothing game-like, no configurator. */
window.Win8 = (function () {
  const BOOK = 'https://www.austinprosiding.com/schedule-appointment';
  const CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4"/></svg>';
  const T = 376;
  // [label, count or null, share (0..1), note]
  const Q = [
    { k: 'cost', q: 'What does it cost?', h: 'How much does window replacement cost in Austin?',
      a: 'Across the 376 priced window jobs we documented from 2022–2026, the middle half landed between $5,000 and $25,000, and the median fell in the $10,000–$15,000 band. Your price depends on how many windows you replace and how big they are, the brand and line, and the color and glass you choose. The inspection and estimate are free.',
      src: 'Panes grouped from the 12 published price bands (376 priced jobs).',
      p: [['$5k–$10k', 96, 0, 'most common'], ['$15k–$25k', 80, 0, ''], ['$10k–$15k', 79, 0, 'median band'], ['$25k and up', 69, 0, ''], ['Under $5k', 52, 0, '']] },
    { k: 'brand', q: 'Which brand?', h: 'Which window brands does Austin Pro install?',
      a: 'NT Windows, built in Texas, is on 238 of our 376 priced window jobs. Pella (31), Simonton (54) and Andersen (38) cover most of the rest, and we’re an Andersen Certified Contractor at the Premier level.',
      src: 'The remaining 15 jobs are other makers or not recorded.',
      p: [['NT Windows', 238, 0, 'built in Texas'], ['Simonton', 54, 0, ''], ['Andersen', 38, 0, ''], ['Pella', 31, 0, ''], ['Other or not recorded', 15, 0, '']] },
    { k: 'frame', q: 'Which frame?', h: 'Vinyl, aluminum or fiberglass: what do Austin homes usually get?',
      a: 'Mostly vinyl. 214 of our 376 priced window jobs were vinyl, 64 were NT’s Twinsulator aluminum and 33 were Andersen’s Fibrex composite. Pella’s Impervia fiberglass is also available.',
      src: 'The remaining 65 jobs are other frames or not recorded.',
      p: [['Vinyl', 214, 0, ''], ['Other or not recorded', 65, 0, ''], ['NT Twinsulator aluminum', 64, 0, ''], ['Andersen Fibrex composite', 33, 0, '']] },
    { k: 'siding', q: 'Siding at the same time?', h: 'Should I replace windows and siding at the same time?',
      a: 'Often, yes. The siding was replaced on 36% of our priced window jobs. When we do both, the windows usually go in first, so the new siding and trim seal cleanly around each opening.',
      src: 'Shares of the 376 priced window jobs, as published.',
      p: [['Windows only', null, 0.64, ''], ['Siding replaced too', null, 0.36, '']] }];
  Q.forEach((x) => x.p.forEach((r) => { if (r[1] != null) r[2] = r[1] / T; }));
  const ALL = [['376 priced window jobs', T, 1, 'of our 388 documented window jobs']];
  const MAXP = 5;

  // slice-and-stack: the largest pane takes a full-height column on the left (width = its share), the rest stack in the
  // right column with heights in proportion, so every pane's area is its share of the glass
  const layout = (ps) => { const out = []; if (ps.length === 1) return [[0, 0, 100, 100]];
    const w0 = ps[0][2] * 100; out.push([0, 0, w0, 100]); const rest = ps.slice(1), rs = rest.reduce((s, r) => s + r[2], 0); let y = 0;
    rest.forEach((r) => { const h = (r[2] / rs) * 100; out.push([w0, y, 100 - w0, h]); y += h; }); return out; };
  // a pane not used by this answer collapses to the foot of the right column (or the right edge), so the glass stays filled
  const hid = (L) => (L.length > 1 ? [L[1][0], 100, L[1][2], 0] : [100, 0, 0, 100]);
  const pct = (s) => `${Math.round(s * 100)}%`;
  const lab = (r) => `<b>${r[0]}</b><span>${r[1] != null ? `${r[1]} jobs · ` : ''}${pct(r[2])}</span>${r[3] ? `<em>${r[3]}</em>` : ''}`;
  const panes = () => { const L = layout(ALL); let h = '';
    for (let i = 0; i < MAXP; i++) { const g = L[i] || hid(L), r = ALL[i];
      h += `<div class="wmp${i === 0 ? '' : ' wz'}" style="left:${g[0]}%;top:${g[1]}%;width:${g[2]}%;height:${g[3]}%"><div class="wml">${r ? lab(r) : ''}</div></div>`; }
    return h; };

  const M = () => `<section class="sec wnM" id="windows" aria-labelledby="wnM-h">
    <div class="wmgrid">
      <div class="wmhd"><h2 class="sec-h" id="wnM-h" data-split>One window, four answers.</h2>
        <p class="sec-p">The questions every window buyer asks, answered from our own records. Pick one and the glass divides by the numbers: each pane is its share of the 376 priced jobs among our 388 documented window jobs.</p></div>
      <div class="wmq" role="radiogroup" aria-label="Question">${Q.map((x, i) => `<button type="button" role="radio" class="wmr" data-i="${i}" aria-checked="false" tabindex="${i ? -1 : 0}">${x.q}</button>`).join('')}</div>
      <figure class="wmwin" data-solid aria-hidden="true"><div class="wmframe"><div class="wmglass">${panes()}</div></div><div class="wmsill"></div></figure>
      <div class="wmans" data-solid aria-live="polite"><h3 class="wmh">Our window record, 2022–2026</h3>
        <p class="wma">376 of our 388 documented window jobs carry a price. Pick a question to see how they divide.</p><p class="wms"></p>
        <ul class="wmlist"></ul></div>
      <div class="wmcta"><a class="btn key" href="${BOOK}">Book a free inspection<span class="tab">${CAL}</span></a></div>
    </div></section>`;

  function wire(root) {
    const s = root.querySelector('.wnM'); if (!s || s.dataset.w) return; s.dataset.w = 1;
    const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const rs = [...s.querySelectorAll('.wmr')], ps = [...s.querySelectorAll('.wmp')], h3 = s.querySelector('.wmh'), ans = s.querySelector('.wma'), src = s.querySelector('.wms'), list = s.querySelector('.wmlist');
    let cur = -1, tm = 0, seen = false;
    const fit = () => ps.forEach((p) => { const l = p.querySelector('.wml'); p.classList.toggle('wsm', p.clientHeight < 74 || p.clientWidth < 120); p.classList.toggle('wxs', p.clientHeight < 40 || p.clientWidth < 70); void l; });
    const draw = (rows) => { const L = layout(rows);
      ps.forEach((p, i) => { const g = L[i], r = rows[i];
        if (!g) { const z = hid(L); p.classList.add('wz'); Object.assign(p.style, { left: z[0] + '%', top: z[1] + '%', width: z[2] + '%', height: z[3] + '%' }); return; }
        p.classList.remove('wz'); Object.assign(p.style, { left: g[0] + '%', top: g[1] + '%', width: g[2] + '%', height: g[3] + '%' });
        p.classList.toggle('wmed', r[3] === 'median band'); p.querySelector('.wml').innerHTML = lab(r); }); };
    const pick = (i) => { if (i === cur) return; cur = i; const x = Q[i];
      rs.forEach((b, j) => { b.setAttribute('aria-checked', j === i); b.tabIndex = j === i ? 0 : -1; });
      h3.textContent = x.h; ans.textContent = x.a; src.textContent = x.src;
      list.innerHTML = x.p.map((r) => `<li>${r[0]}: ${r[1] != null ? `${r[1]} jobs (${pct(r[2])})` : pct(r[2])}</li>`).join('');
      clearTimeout(tm);
      if (RM) { draw(x.p); fit(); return; }
      s.classList.add('wmout'); tm = setTimeout(() => { draw(x.p); tm = setTimeout(() => { fit(); s.classList.remove('wmout'); }, 820); }, 160); };
    rs.forEach((b, i) => { b.addEventListener('click', () => pick(i));
      b.addEventListener('keydown', (e) => { const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]; let n = -1;
        if (d) n = (i + d + rs.length) % rs.length; else if (e.key === 'Home') n = 0; else if (e.key === 'End') n = rs.length - 1;
        if (n >= 0) { e.preventDefault(); pick(n); rs[n].focus(); } }); });
    addEventListener('resize', fit); fit();
    // arrival: once, the undivided glass divides into the first answer
    if (RM) pick(0);
    else new IntersectionObserver((es, io) => es.forEach((e) => { if (e.isIntersecting && !seen) { seen = true; io.disconnect(); setTimeout(() => { if (cur < 0) pick(0); }, 450); } }), { threshold: 0.4 }).observe(s.querySelector('.wmwin'));
  }
  return { M, wire, Q, layout };
})();
