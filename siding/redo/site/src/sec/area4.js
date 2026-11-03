/* ON YOUR STREET G and H (overnight ladder, Round 27). Data: the firm's documented-project records (window.__NEAR): town,
   neighbourhood, month and trades per record; town tallies are the finder's own (as Area D). No map, no dots, no total;
   the locked 886 wording stays verbatim.
   G — street signs (Scout Motors: roadside Americana). Choose a town; its neighbourhoods on our books hang as green street
       signs. Turn a sign over to read the work done there and the latest month.
   H — town by trade (Dropbox Brand: one bold grid). The towns we work in most, against the trades; each cell's square
       grows with the documented projects. Sort by any trade; walk the grid with the arrow keys. */
window.Area4 = (function () {
  const N = () => window.__NEAR || { sv: [], ct: [], pl: [], p: [], towns: [] };
  const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  const MO = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const when = (m) => `${MO[(m % 100) - 1]} 20${String(Math.floor(m / 100)).padStart(2, '0')}`;
  const LOCKS = '<b>886</b> documented projects since 2018 · 312 on the map with photos + 574 more counted.';
  const hoodOf = (q) => (q[5] >= 0 ? N().pl[q[5]].split(',')[0].trim() : '');
  const townOf = (q) => N().ct[q[4]] || '';
  const trades = (mask) => N().sv.filter((_, i) => mask & (1 << i));

  /* ---------- G ---------- */
  const TOWNS = ['Austin', 'Round Rock', 'Cedar Park', 'Leander', 'Pflugerville', 'Georgetown', 'Buda', 'Kyle'];
  const towns = () => TOWNS.filter((t) => N().towns.some((x) => x[0] === t));
  function signs(town) { const d = N(), T = d.towns.find((x) => x[0] === town); if (!T) return '';
    const hs = T[4].filter((h) => h[0].toLowerCase() !== town.toLowerCase());
    if (!hs.length) return `<p class="only">Jobs in ${esc(town)} are recorded by town only.</p>`;
    return hs.map(([h, n], i) => { const recs = d.p.filter((q) => townOf(q) === town && hoodOf(q) === h), last = recs.reduce((m, q) => Math.max(m, q[2]), 0), tc = {};
      recs.forEach((q) => trades(q[3]).forEach((t) => (tc[t] = (tc[t] || 0) + 1))); const work = Object.keys(tc).sort((a, b) => tc[b] - tc[a]).slice(0, 3);
      return `<li style="--t:${[-2, 1.5, -1, 2.5, -1.5, 1, -2.5, 2][i % 8]}deg;--i:${i}"><button type="button" class="sg2" aria-pressed="false" aria-label="${esc(h)}: ${n} documented job${n === 1 ? '' : 's'}. Turn over for the work.">
        <span class="fc fr3"><i class="bt"></i><b>${esc(h)}</b><small>${n} documented job${n === 1 ? '' : 's'}</small><i class="bt r"></i></span>
        <span class="fc bk"><small>Latest ${last ? when(last) : '—'}</small><b>${work.map(esc).join(' · ') || '—'}</b></span></button></li>`; }).join(''); }
  const G = () => `<section class="sec arG" id="area" aria-labelledby="arG-h">
    <div class="hd"><h2 class="sec-h" id="arG-h" data-split>The streets we know.</h2><p class="sec-p">Choose a town. Each sign is a neighbourhood where we have documented work; turn one over to see what we did there.</p></div>
    <div class="tw" role="radiogroup" aria-label="Town">${towns().map((t, i) => `<button type="button" role="radio" aria-checked="${!i}" tabindex="${i ? -1 : 0}" data-t="${esc(t)}">${t}</button>`).join('')}</div>
    <ul class="post" aria-live="polite">${signs(towns()[0])}</ul>
    <p class="lk">${LOCKS} Not on a sign? Call <a href="tel:+15125500000">(512) 550-0000</a>.</p></section>`;

  function wireG(root) {
    const s = root.querySelector('.arG'); if (!s) return; const bs = [...s.querySelectorAll('.tw button')], post = s.querySelector('.post');
    const bind = () => post.querySelectorAll('.sg2').forEach((b) => b.addEventListener('click', () => b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true')));
    const set = (i, f) => { bs.forEach((b, k) => { b.setAttribute('aria-checked', k === i); b.tabIndex = k === i ? 0 : -1; }); if (f) bs[i].focus(); post.innerHTML = signs(bs[i].dataset.t); post.classList.remove('hang'); void post.offsetWidth; post.classList.add('hang'); bind(); };
    bs.forEach((b, i) => { b.addEventListener('click', () => set(i)); b.addEventListener('keydown', (e) => { const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]; if (d) { e.preventDefault(); set((i + d + bs.length) % bs.length, true); } }); });
    bind();
  }

  /* ---------- H ---------- */
  const COLS = [['Siding', [0]], ['Windows', [1]], ['Roofing', [2, 3]], ['Painting', [4]], ['Gutters', [5]], ['Doors', [6, 7]]];
  function matrix() { const d = N(), rows = d.towns.filter((t) => t[1] >= 6).slice(0, 14).map((t) => { const recs = d.p.filter((q) => townOf(q) === t[0]);
      return { t: t[0], n: t[1], c: COLS.map(([, b]) => { const r = recs.filter((q) => b.some((k) => q[3] & (1 << k))); return [r.length, r.reduce((m, q) => Math.max(m, q[2]), 0)]; }) }; });
    const max = Math.max(1, ...rows.flatMap((r) => r.c.map((c) => c[0]))); return { rows, max }; }
  const cell = (r, j, max) => { const [n, l] = r.c[j]; return `<td><button type="button" class="cl" tabindex="-1" data-t="${esc(r.t)}" data-j="${j}" data-n="${n}" data-l="${l}" aria-label="${esc(r.t)}, ${COLS[j][0]}: ${n} documented project${n === 1 ? '' : 's'}"><i style="--s:${n ? (0.16 + 0.84 * Math.sqrt(n / max)).toFixed(3) : 0}"></i></button></td>`; };
  const body = (m) => m.rows.map((r) => `<tr><th scope="row"><b>${esc(r.t)}</b><small>${r.n}</small></th>${r.c.map((_, j) => cell(r, j, m.max)).join('')}</tr>`).join('');
  const H = () => { const m = matrix(); return `<section class="sec arH" id="area" aria-labelledby="arH-h">
    <div class="hd"><h2 class="sec-h" id="arH-h" data-split>Town by trade.</h2><p class="sec-p">Where we work, and what we do there. The bigger the square, the more documented projects. Sort by a trade.</p></div>
    <div class="mtx" data-solid><table><caption class="vh2">Documented projects by town and trade</caption>
      <thead><tr><th scope="col"><button type="button" class="srt" data-j="-1" aria-pressed="true">Town</button></th>${COLS.map(([c], j) => `<th scope="col"><button type="button" class="srt" data-j="${j}" aria-pressed="false">${c}</button></th>`).join('')}</tr></thead>
      <tbody>${body(m)}</tbody></table></div>
    <p class="rdo" aria-live="polite">Choose a square to read it.</p>
    <p class="lk">Town figures are documented projects in our records; a job with two trades counts in both columns. ${LOCKS}</p></section>`; };

  function wireH(root) {
    const s = root.querySelector('.arH'); if (!s) return; const m = matrix(), tb = s.querySelector('tbody'), rdo = s.querySelector('.rdo'), srt = [...s.querySelectorAll('.srt')];
    let cur = [0, 0];
    const cells = () => [...tb.querySelectorAll('tr')].map((tr) => [...tr.querySelectorAll('.cl')]);
    const read = (b) => { const n = +b.dataset.n, l = +b.dataset.l; rdo.innerHTML = `<b>${esc(b.dataset.t)} · ${COLS[+b.dataset.j][0]}</b>: ${n} documented project${n === 1 ? '' : 's'}${l ? `, latest ${when(l)}` : ''}.`; };
    const focus = (r, c, f) => { const g = cells(); r = Math.max(0, Math.min(g.length - 1, r)); c = Math.max(0, Math.min(COLS.length - 1, c)); g.flat().forEach((b) => { b.tabIndex = -1; b.classList.remove('on'); });
      const b = g[r][c]; b.tabIndex = 0; b.classList.add('on'); cur = [r, c]; if (f) b.focus(); read(b); };
    const bindCells = () => cells().forEach((row, r) => row.forEach((b, c) => { b.addEventListener('click', () => focus(r, c)); b.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') read(b); });
      b.addEventListener('keydown', (e) => { const d = { ArrowRight: [0, 1], ArrowLeft: [0, -1], ArrowDown: [1, 0], ArrowUp: [-1, 0] }[e.key]; if (d) { e.preventDefault(); focus(cur[0] + d[0], cur[1] + d[1], true); } if (e.key === 'Home') { e.preventDefault(); focus(cur[0], 0, true); } if (e.key === 'End') { e.preventDefault(); focus(cur[0], COLS.length - 1, true); } }); }));
    srt.forEach((b) => b.addEventListener('click', () => { const j = +b.dataset.j; srt.forEach((x) => x.setAttribute('aria-pressed', x === b));
      const rows = m.rows.slice().sort((a, z) => (j < 0 ? z.n - a.n : z.c[j][0] - a.c[j][0] || z.n - a.n)); tb.innerHTML = body({ rows, max: m.max }); s.classList.remove('re'); void s.offsetWidth; s.classList.add('re'); bindCells(); focus(0, Math.max(0, j)); }));
    bindCells(); cells()[0][0].tabIndex = 0;
  }
  return { G, H, wire(root) { wireG(root); wireH(root); } };
})();
