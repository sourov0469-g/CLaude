/* ON YOUR STREET K — "Month by month" (new-versions addendum; Cash App Brand Guidelines: colour as content).
   The project finder's dated records (window.__NEAR.p: [x, y, YYMM, trades bitmask, town index, place index, …]) as a
   calendar: years 2022–2026 down, months across. Each tile's green deepens with how much work the records show that
   month (five steps, relative; no per-month counts and no total, so nothing competes with the locked 886 wording).
   Pick a month: the panel lists the neighbourhoods and towns named in that month's records, and its trades. */
window.Area6 = (function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const BOOK = 'https://www.austinprosiding.com/schedule-appointment';
  const CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4"/></svg>';
  const N = () => window.__NEAR || { p: [], pl: [], ct: [], sv: [] };
  const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  const YRS = [22, 23, 24, 25, 26], MO = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const LAST = 2609;   // the last month in the finder's records (Sep 2026); later months are "not yet recorded"
  // trade filters: bit positions in the records' trade bitmask (Siding 0, Windows 1, Shingle 2, Metal 3, Painting 4)
  const TR = [['all', 'All work', null], ['sd', 'Siding', [0]], ['wn', 'Windows', [1]], ['rf', 'Roofing', [2, 3]], ['pt', 'Painting', [4]]];
  const STEP = ['none', 'a little', 'some', 'busy', 'very busy', 'busiest'];
  const fits = (q, t) => !TR[t][2] || TR[t][2].some((b) => q[3] & (1 << b));
  function counts(t) { const c = {}; N().p.forEach((q) => { if (fits(q, t)) c[q[2]] = (c[q[2]] || 0) + 1; }); return c; }
  // five steps relative to the busiest month for this filter (0 = no records that month)
  function steps(t) { const c = counts(t), mx = Math.max(1, ...Object.values(c)); const s = {}; YRS.forEach((y) => MO.forEach((_, m) => { const k = y * 100 + m + 1, n = c[k] || 0; s[k] = n ? Math.min(5, 1 + Math.floor((n / mx) * 4.999)) : 0; })); return s; }
  const label = (k) => `${MO[(k % 100) - 1]} 20${Math.floor(k / 100)}`;
  function places(k, t) {
    const d = N(), seen = new Map(), trades = new Set();
    d.p.forEach((q) => { if (q[2] !== k || !fits(q, t)) return; const nm = q[5] >= 0 ? d.pl[q[5]] : d.ct[q[4]]; seen.set(nm, (seen.get(nm) || 0) + 1); d.sv.forEach((sv, i) => { if (q[3] & (1 << i)) trades.add(sv); }); });
    const list = [...seen.entries()].sort((a, b) => b[1] - a[1]).map((x) => x[0]);
    return { list, trades: [...trades] };
  }
  function note(k, t) {
    if (k > LAST) return `${label(k)}: not yet recorded.`;
    const { list, trades } = places(k, t); if (!list.length) return `${label(k)}: no ${t ? TR[t][1].toLowerCase() + ' ' : ''}records in the finder for this month.`;
    const shown = list.slice(0, 8).map(esc).join(' · ');
    return `<b>${label(k)}</b>: we worked in ${shown}${list.length > 8 ? ' and other places' : ''}.<small>On these jobs: ${trades.map(esc).join(' · ')}</small>`;
  }
  const DEF = 2609;

  const K = () => { const s = steps(0);
    return `<section class="sec arK" id="area" aria-labelledby="arK-h">
      <div class="hd"><p class="kk">On your street · month by month</p><h2 class="sec-h" id="arK-h" data-split>Month by month, street by street.</h2>
        <p class="sec-p">Each square is a month of our documented jobs: the darker the green, the more work that month. Since 2024 every month has jobs on record. Pick a month to see the streets and towns we were on.</p></div>
      <div class="flt" role="radiogroup" aria-label="Show a trade">${TR.map(([k, l], i) => `<button type="button" role="radio" class="tf" data-t="${i}" aria-checked="${!i}" tabindex="${i ? -1 : 0}">${l}</button>`).join('')}</div>
      <div class="cal">
        <div class="grd" role="grid" aria-label="Documented jobs by month, 2022 to 2026"><div class="gr ghd" role="row"><span class="yl" role="columnheader"><span class="vh9">Year</span></span>${MO.map((m) => `<span class="ml" role="columnheader"><span class="lg">${m}</span><span class="sh" aria-hidden="true">${m[0]}</span></span>`).join('')}</div>
          ${YRS.map((y) => `<div class="gr" role="row"><span class="yl" role="rowheader">20${y}</span>${MO.map((_, m) => { const k = y * 100 + m + 1, st = k > LAST ? 'x' : s[k];
            return `<span role="gridcell"><button type="button" class="tile" data-k="${k}" data-s="${st}" style="--i:${(y - 22) * 12 + m}" tabindex="${k === DEF ? 0 : -1}" aria-pressed="${k === DEF}" aria-label="${label(k)}, ${st === 'x' ? 'not yet recorded' : STEP[st]}"></button></span>`; }).join('')}</div>`).join('')}</div>
        <div class="lgd" aria-hidden="true"><span>fewer</span>${[1, 2, 3, 4, 5].map((i) => `<i data-s="${i}"></i>`).join('')}<span>more</span><i data-s="0"></i><span>none</span><i data-s="x"></i><span>not yet recorded</span></div>
      </div>
      <div class="mp"><p class="mn" aria-live="polite">${note(DEF, 0)}</p></div>
      <div class="ft9"><p class="lk9"><b>886</b> documented projects since 2018: 312 on the map with photos + 574 more counted.</p>
        <p class="cv">The calendar uses the dated records in our project finder, Mar 2022 to Sep 2026 (one earlier record, Oct 2018, sits outside it). It shows when and where, relative to our busiest month; it is not a count.</p>
        <a class="btn key" href="${BOOK}">Book a free inspection<span class="tab">${CAL}</span></a></div></section>`; };

  function wire(root) {
    const s = root.querySelector('.arK'); if (!s) return;
    const tiles = [...s.querySelectorAll('.tile')], tfs = [...s.querySelectorAll('.tf')], mn = s.querySelector('.mn');
    let t = 0, cur = tiles.findIndex((x) => +x.dataset.k === DEF);
    const pick = (i, focus) => { i = Math.max(0, Math.min(tiles.length - 1, i)); cur = i; tiles.forEach((x, j) => { x.setAttribute('aria-pressed', j === i); x.tabIndex = j === i ? 0 : -1; }); if (focus) tiles[i].focus(); mn.innerHTML = note(+tiles[i].dataset.k, t); };
    tiles.forEach((x, i) => { x.addEventListener('click', () => pick(i));
      x.addEventListener('keydown', (e) => { const n = { ArrowRight: i + 1, ArrowLeft: i - 1, ArrowDown: i + 12, ArrowUp: i - 12, Home: i - (i % 12), End: i - (i % 12) + 11 }[e.key]; if (n === undefined) return; e.preventDefault(); if (n >= 0 && n < tiles.length) pick(n, true); }); });
    const setT = (k, focus) => { t = k; tfs.forEach((b, i) => { b.setAttribute('aria-checked', i === k); b.tabIndex = i === k ? 0 : -1; if (i === k && focus) b.focus(); });
      const st = steps(k); tiles.forEach((x) => { const kk = +x.dataset.k; if (kk > LAST) return; x.dataset.s = st[kk]; x.setAttribute('aria-label', `${label(kk)}, ${STEP[st[kk]]}`); }); mn.innerHTML = note(+tiles[cur].dataset.k, t); };
    tfs.forEach((b, i) => { b.addEventListener('click', () => setT(i));
      b.addEventListener('keydown', (e) => { const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]; if (!d) return; e.preventDefault(); setT((i + d + tfs.length) % tfs.length, true); }); });
    if (!RM && 'IntersectionObserver' in window) { s.classList.add('pre'); const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { s.classList.add('in9'); io.disconnect(); } }, { threshold: 0.2 }); io.observe(s.querySelector('.grd')); }
  }
  return { K, wire };
})();
