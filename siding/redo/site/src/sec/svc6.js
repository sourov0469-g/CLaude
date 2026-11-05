/* SERVICES L (new-versions addendum, pass 2) — "Built from our records". Reference: Quiet Cubes (modular cubes, calm and
   tactile, a staffed service behind it). An isotype house: one cube for about every ten documented projects of a trade
   (homepage service list), each set where that trade sits on a house. Pick a trade and its cubes lift with its
   published record. Counts and bands from FACTS.md (service list + "Compare all 10 trades"). Locked wordings verbatim:
   "431 documented siding jobs", "388 documented window jobs", "$10k–$15k median band (415 priced)". Not a configurator. */
window.Svc6 = (function () {
  const BOOK = 'https://www.austinprosiding.com/schedule-appointment';
  const CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4"/></svg>';
  // the house: 18 columns x 14 rows; one letter per cube (counts verified: S43 W39 P32 R21 G12 D11 M3 C3 Y1 = 165)
  const MAP = ['......RRRRRR......', '.....RRRRRRRR.....', '....RRRRRRRMMM....', '...GGGGGGGGGGGG...', '...PPPPPPPPPPPP...',
    '...PWWWSWWSWWWP...', '...PWWWSWWSWWWP...', '...PWWWSWWSWWWP...', 'CCCPSSSSSSSSSSP...', '...PDDSWWSSWWWP...',
    '...PDDSWWSSWWWP...', '...PDDSWWSSWWWP...', '...PDDSSSSSSSSPSSP', '...PDDSSSSSSSSPDYP'];
  // trades, largest first; c = documented projects (service list); b = median band and priced count; x = published timeline
  const T = [
    { k: 'S', n: 'Siding', c: 431, l: '431 documented siding jobs', b: '$10k–$15k median band (415 priced)', x: '1 to 2 weeks including paint.' },
    { k: 'W', n: 'Windows', c: 388, l: '388 documented window jobs', b: '$10k–$15k median band (376 priced)', x: 'Most window-only jobs: two days on site.' },
    { k: 'P', n: 'Exterior painting', c: 320, b: '$2k–$5k median band (317 priced)' },
    { k: 'R', n: 'Shingle roofing', c: 210, b: '$10k–$15k median band (204 priced)' },
    { k: 'G', n: 'Gutters', c: 121, b: '$2k–$5k median band (109 priced)' },
    { k: 'D', n: 'Exterior doors', c: 109, b: '$2k–$5k median band (96 priced)' },
    { k: 'C', n: 'Patio covers', c: 34, b: '$15k–$20k median band (33 priced)' },
    { k: 'M', n: 'Metal roofing', c: 31, b: '$20k–$25k median band (29 priced)' },
    { k: 'Y', n: 'Garage doors', c: 9, b: '$2k–$5k median band (6 priced)' },
    { k: 'K', n: 'Decking', c: 0, b: '$20k–$25k median band (5 priced)', x: 'No documented count on our service list, so it has no cubes.' }];
  const cubes = (k) => MAP.join('').split('').filter((ch) => ch === k).length;
  const TOTAL = T.reduce((s, t) => s + t.c, 0);   // 1,653 trade-projects
  const fmt = (n) => n.toLocaleString('en-US');
  const label = 'A house built from our records, one cube for about every ten documented projects: ' + T.filter((t) => t.c).map((t) => `${t.n.toLowerCase()} ${t.c} (${cubes(t.k)} ${cubes(t.k) === 1 ? 'cube' : 'cubes'})`).join(', ') + '. Decking has no documented count.';

  const L = () => {
    let o = 0; const cells = [];
    for (let r = MAP.length - 1; r >= 0; r--) for (let c = 0; c < MAP[r].length; c++) { const k = MAP[r][c]; if (k !== '.') cells.push(`<i class="sq" data-t="${k}" style="grid-area:${r + 1}/${c + 1};--o:${o++}"></i>`); }
    const chip = (t, i) => `<button type="button" role="radio" class="slc" data-k="${t.k}" aria-checked="false" tabindex="-1"><i class="slw" data-t="${t.k}" aria-hidden="true"></i>${t.n}<small>${t.c ? fmt(t.c) : 'no count'}</small></button>`;
    return `<section class="sec svL" id="services" aria-labelledby="svL-h">
    <div class="slh"><h2 class="sec-h" id="svL-h" data-split>Built from our records.</h2>
      <p class="sec-p">Every trade we do, as cubes on one house: one cube for about every ten documented projects, set where that trade sits. Pick a trade to see its record.</p></div>
    <div class="slg">
      <figure class="slf"><div class="slhouse" role="img" aria-label="${label}">${cells.join('')}</div>
        <figcaption class="sln">Cubes are rounded to the nearest ten. One project can include several trades, so the 165 cubes count ${fmt(TOTAL)} trade-projects, not separate projects. Where a cube sits shows where that trade sits on a house, not one real house.</figcaption></figure>
      <div class="slside">
        <div class="slr" role="radiogroup" aria-label="Show a trade's record"><button type="button" role="radio" class="slc" data-k="all" aria-checked="true" tabindex="0">All trades<small>${fmt(TOTAL)}</small></button>${T.map(chip).join('')}</div>
        <div class="slp" aria-live="polite"><p class="slk">All trades</p><p class="slbig">${fmt(TOTAL)}</p><p class="slt">documented trade-projects across ten trades, from siding (431) down to garage doors (9).</p><p class="slt slx">Decking has no documented count on our service list.</p></div>
        <div class="slcta"><a class="btn key" href="${BOOK}">Book a free inspection<span class="tab">${CAL}</span></a><p>Ask about any trade at the free inspection.</p></div>
      </div></div></section>`;
  };

  function wire(root) {
    const s = root.querySelector('.svL'); if (!s || s.dataset.w) return; s.dataset.w = 1;
    const RM = matchMedia('(prefers-reduced-motion: reduce)').matches, FINE = matchMedia('(hover:hover) and (pointer:fine)').matches;
    const house = s.querySelector('.slhouse'), bs = [...s.querySelectorAll('.slc')], p = s.querySelector('.slp');
    let chosen = 'all';
    const show = (k) => {
      house.dataset.on = k; s.querySelectorAll('.sq').forEach((q) => q.classList.toggle('on', q.dataset.t === k));
      if (k === 'all') { p.innerHTML = `<p class="slk">All trades</p><p class="slbig">${fmt(TOTAL)}</p><p class="slt">documented trade-projects across ten trades, from siding (431) down to garage doors (9).</p><p class="slt slx">Decking has no documented count on our service list.</p>`; return; }
      const t = T.find((x) => x.k === k), n = cubes(k);
      p.innerHTML = `<p class="slk">${t.n}</p><p class="slbig">${t.c ? fmt(t.c) : '—'}</p>`
        + `<p class="slt">${t.l || (t.c ? `${fmt(t.c)} documented projects` : 'No documented count')}${n ? ` · ${n} ${n === 1 ? 'cube' : 'cubes'}` : ''}</p>`
        + `<p class="slt">${t.b}.</p>${t.x ? `<p class="slt slx">${t.x}</p>` : ''}`;
    };
    const set = (i, focus) => { bs.forEach((b, j) => { b.setAttribute('aria-checked', j === i); b.tabIndex = j === i ? 0 : -1; }); if (focus) bs[i].focus(); chosen = bs[i].dataset.k; show(chosen); };
    bs.forEach((b, i) => {
      b.addEventListener('click', () => set(i));
      b.addEventListener('keydown', (e) => { const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
        if (d) { e.preventDefault(); set((i + d + bs.length) % bs.length, true); }
        else if (e.key === 'Home' || e.key === 'End') { e.preventDefault(); set(e.key === 'Home' ? 0 : bs.length - 1, true); } });
    });
    if (FINE) {   // pointing at a cube previews its trade; pointing away restores the chosen one
      house.addEventListener('pointerover', (e) => { const t = e.target.dataset && e.target.dataset.t; if (t) show(t); });
      house.addEventListener('pointerleave', () => show(chosen));
    }
    // arrival: the house goes up bottom to top, once
    if (RM) s.classList.add('slgo');
    else new IntersectionObserver((es, io) => es.forEach((e) => { if (e.isIntersecting) { io.disconnect(); s.classList.add('slgo'); } }), { threshold: 0.2 }).observe(house);
  }
  return { L, wire };
})();
