/* ON YOUR STREET L — "Which way from our door" (new-versions addendum, pass 2; Graza, scoped to the custom-animation
   quality bar: crafted, characterful motion). The project finder's records (window.__NEAR.p: [x, y, YYMM, trades
   bitmask, town index, place index, …], in the finder's own projection, 8.3 px per mile, office at __NEAR.hq) on an
   eight-petal compass rose centred on the office. Each petal is stacked in four distance bands; its area grows with the
   records that way (radius by square root). No counts and no total are shown; places are listed, never summed. A needle
   on a damped spring swings to the picked direction or town. No map is drawn (the drivable map stays in Area C). */
window.Area7 = (function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const BOOK = 'https://www.austinprosiding.com/schedule-appointment';
  const CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4"/></svg>';
  const PHONE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>';
  const N = () => window.__NEAR || { p: [], pl: [], ct: [], sv: [], towns: [], hq: [0, 0], ppm: 1 };
  const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  const DIR = ['North', 'Northeast', 'East', 'Southeast', 'South', 'Southwest', 'West', 'Northwest'];
  const AB = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const BANDS = [[0, 5, 'under 5 miles'], [5, 10, '5 to 10 miles'], [10, 20, '10 to 20 miles'], [20, 1e9, '20 miles and more']];
  const MO = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const C = 260, R0 = 22, R = 196;                       // centre, inner radius (the office hub), longest petal
  // bearing (degrees clockwise from north) and straight-line miles from the office, in the finder's projection
  const geo = (x, y) => { const d = N(), dx = x - d.hq[0], dy = y - d.hq[1]; return { b: ((Math.atan2(dx, -dy) * 180 / Math.PI) + 360) % 360, mi: Math.hypot(dx, dy) / d.ppm }; };
  const sector = (b) => Math.floor(((b + 22.5) % 360) / 45);
  const isHood = (nm) => { const [h, t] = nm.split(',').map((x) => x.trim()); return !!t && h !== t; };   // a place named only by its town is not a neighbourhood
  let STATS = null;
  function stats() {
    if (STATS) return STATS;
    const d = N(), S = DIR.map(() => ({ band: [0, 0, 0, 0], hoods: new Map(), work: new Map(), last: 0 }));
    const placePos = new Map();
    d.p.forEach((q) => {
      const g = geo(q[0], q[1]), s = S[sector(g.b)];
      s.band[BANDS.findIndex((b) => g.mi < b[1])]++;
      if (q[2] > s.last) s.last = q[2];
      if (q[5] >= 0 && isHood(d.pl[q[5]])) { const nm = d.pl[q[5]]; s.hoods.set(nm, (s.hoods.get(nm) || 0) + 1); const pp = placePos.get(nm) || [0, 0, 0]; placePos.set(nm, [pp[0] + q[0], pp[1] + q[1], pp[2] + 1]); }
      d.sv.forEach((sv, i) => { if (q[3] & (1 << i)) s.work.set(sv, (s.work.get(sv) || 0) + 1); });
    });
    const max = Math.max(...S.map((s) => s.band.reduce((a, b) => a + b, 0)));
    // towns with three or more records (the finder's own tallies), at the finder's town position; Austin is the office's own city
    const towns = d.towns.filter((t) => t[1] >= 3 && t[0] !== 'Austin').map((t) => ({ nm: t[0], ...geo(t[2], t[3]) }));
    // Austin neighbourhoods with two or more records, at the mean of their records' positions
    const hoods = [...placePos.entries()].filter(([nm, p]) => / Austin$/.test(nm) && p[2] >= 2).map(([nm, p]) => ({ nm: nm.replace(/, Austin$/, ''), ...geo(p[0] / p[2], p[1] / p[2]) })).sort((a, b) => a.nm.localeCompare(b.nm));
    const rank = S.map((s, i) => [i, s.band.reduce((a, b) => a + b, 0)]).sort((a, b) => b[1] - a[1]).map((x) => x[0]);
    return (STATS = { S, max, towns, hoods, rank });
  }
  const pt = (b, r) => [C + r * Math.sin(b * Math.PI / 180), C - r * Math.cos(b * Math.PI / 180)].map((v) => v.toFixed(1)).join(' ');
  const wedge = (a1, a2, r1, r2) => `M${pt(a1, r1)}L${pt(a1, r2)}A${r2.toFixed(1)} ${r2.toFixed(1)} 0 0 1 ${pt(a2, r2)}L${pt(a2, r1)}A${r1.toFixed(1)} ${r1.toFixed(1)} 0 0 0 ${pt(a1, r1)}Z`;
  const rad = (n, max) => R0 + (R - R0) * Math.sqrt(n / max);
  const month = (k) => `${MO[(k % 100) - 1]} 20${Math.floor(k / 100)}`;
  const shortHood = (nm) => { const [h, t] = nm.split(',').map((x) => x.trim()); return t !== 'Austin' ? `${h} (${t})` : h; };

  function panel(s, you) {
    const st = stats(), x = st.S[s], dl = DIR[s].toLowerCase();
    const towns = st.towns.filter((t) => sector(t.b) === s).sort((a, b) => a.mi - b.mi);
    const hoods = [...x.hoods.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 10).map((h) => shortHood(h[0]));
    const work = [...x.work.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3).map((w) => w[0]);
    const pos = st.rank.indexOf(s), rk = pos === 0 ? 'The busiest direction in our records.' : pos === 1 ? 'The second busiest direction in our records.' : pos === 2 ? 'The third busiest direction in our records.' : '';
    return `${you ? `<p class="ayou">${you}</p>` : ''}<p class="akk">${esc(DIR[s])} of our office</p>${rk ? `<p class="ark">${rk}</p>` : ''}
      <dl class="adl">
        <div><dt>Towns that way</dt><dd>${towns.length ? towns.map((t) => `<span class="atn">${esc(t.nm)} <small>${Math.round(t.mi)} mi</small></span>`).join('') : '<span class="atn">Austin itself</span>'}</dd></div>
        <div><dt>Neighbourhoods on our books that way</dt><dd>${hoods.length ? hoods.map(esc).join(' · ') : 'Recorded by town only'}</dd></div>
        <div><dt>Work done most that way</dt><dd>${work.map(esc).join(' · ')}</dd></div>
        <div><dt>Latest record that way</dt><dd>${month(x.last)}</dd></div>
      </dl>`;
  }

  const L = () => {
    const st = stats(), A = st.rank[0];
    const ticks = Array.from({ length: 72 }, (_, i) => { const b = i * 5, l = i % 9 === 0 ? 12 : i % 3 === 0 ? 7 : 4; return `<path d="M${pt(b, 214)}L${pt(b, 214 - l)}"/>`; }).join('');
    const petals = st.S.map((x, s) => {
      const b = s * 45, a1 = b - 21, a2 = b + 21; let cum = 0, r1 = R0;
      const bands = x.band.map((n, k) => { cum += n; const r2 = rad(cum, st.max); const p = n ? `<path class="ab${k}" d="${wedge(a1, a2, r1, r2)}"/>` : ''; r1 = r2; return p; }).join('');
      const out = rad(cum, st.max), ox = (8 * Math.sin(b * Math.PI / 180)).toFixed(1), oy = (-8 * Math.cos(b * Math.PI / 180)).toFixed(1);
      return `<g class="apt" role="radio" data-s="${s}" aria-checked="${s === A}" tabindex="${s === A ? 0 : -1}" aria-label="${DIR[s]} of our office" style="--i:${s};--ox:${ox}px;--oy:${oy}px">`
        + `<path class="ahit" d="${wedge(b - 22.5, b + 22.5, R0, R + 6)}"/><g class="abl"><g class="ash">${bands}<path class="aol" d="${wedge(a1, a2, R0, out)}"/></g></g></g>`;
    }).join('');
    const labels = AB.map((a, s) => { const [x, y] = pt(s * 45, 238).split(' '); return `<text class="alb${s === A ? ' on' : ''}" data-s="${s}" x="${x}" y="${y}" dy="5">${a}</text>`; }).join('');
    const opts = `<option value="">Choose…</option><optgroup label="Towns">${st.towns.slice().sort((a, b) => a.nm.localeCompare(b.nm)).map((t, i) => `<option value="t${i}">${esc(t.nm)}</option>`).join('')}</optgroup>`
      + `<optgroup label="Austin neighbourhoods">${st.hoods.map((h, i) => `<option value="h${i}">${esc(h.nm)}</option>`).join('')}</optgroup>`;
    const order = DIR.map((_, i) => i).sort((a, b) => st.rank.indexOf(a) - st.rank.indexOf(b)).slice(0, 3).map((i) => DIR[i].toLowerCase());
    return `<section class="sec arL" id="area" aria-labelledby="arL-h">
      <div class="ahd"><p class="akk0">On your street · which way from our door</p><h2 class="sec-h" id="arL-h" data-split>Which way from our door?</h2>
        <p class="sec-p">Every documented project in our finder, by its direction and distance from our office on North Lamar. Most of them lie ${order[0]}, ${order[1]} and ${order[2]} of it. Pick a side of town, or your own, to see where we have worked that way.</p></div>
      <div class="acard">
        <div class="arose"><svg viewBox="0 0 520 520" role="radiogroup" aria-label="Eight directions from our office. Arrow keys turn the compass.">
          <circle class="aring" cx="${C}" cy="${C}" r="214"/><g class="atk" aria-hidden="true">${ticks}</g>${petals}<g aria-hidden="true">${labels}</g>
          <g class="andl" aria-hidden="true" transform="rotate(${A * 45} ${C} ${C})"><path class="andn" d="M${C} ${C - 92}L${C + 9} ${C}L${C - 9} ${C}Z"/><path class="ands" d="M${C} ${C + 50}L${C + 9} ${C}L${C - 9} ${C}Z"/></g>
          <circle class="ahub" cx="${C}" cy="${C}" r="12" aria-hidden="true"/><circle class="ahub2" cx="${C}" cy="${C}" r="4" aria-hidden="true"/></svg>
          <div class="algd" aria-hidden="true">${BANDS.map((b, k) => `<span><i class="ab${k}"></i>${b[2]}</span>`).join('')}</div>
          <p class="acap">Centre: our office, 7801 N Lamar Blvd Suite C70, Austin TX 78752. The bigger a petal, the more of our records lie that way.</p></div>
        <div class="apan"><label class="asel"><span>Your town, or your Austin neighbourhood</span><select>${opts}</select></label>
          <div class="abody" aria-live="polite">${panel(A)}</div></div>
      </div>
      <div class="aft"><p class="alk"><b>886</b> documented projects since 2018 · 312 on the map with photos + 574 more counted.</p>
        <p class="acv">Directions and miles are straight lines from the office to where each project sits in our project finder, placed near the home, never on it. Each petal's area grows with the number of records that way; no counts are shown.</p>
        <div class="ctas"><a class="btn key" href="${BOOK}">Book a free inspection<span class="tab">${CAL}</span></a><a class="callx" href="tel:+15125500000">${PHONE}(512) 550-0000</a></div></div></section>`;
  };

  function wire(root) {
    const sec = root.querySelector('.arL'); if (!sec || sec.dataset.w) return; sec.dataset.w = '1';
    const st = stats(), pts = [...sec.querySelectorAll('.apt')], lbs = [...sec.querySelectorAll('.alb')], ndl = sec.querySelector('.andl');
    const body = sec.querySelector('.abody'), sel = sec.querySelector('select');
    const opt = (v) => v[0] === 't' ? st.towns.slice().sort((a, b) => a.nm.localeCompare(b.nm))[+v.slice(1)] : st.hoods[+v.slice(1)];
    // the needle: a damped spring (stiffness 150, damping 12: one overshoot, then it settles), shortest way round
    let th = st.rank[0] * 45, om = 0, tg = th, raf = 0, t0 = 0;
    const draw = () => ndl.setAttribute('transform', `rotate(${th.toFixed(2)} ${C} ${C})`);
    const step = (t) => { const dt = Math.min(0.032, (t - (t0 || t)) / 1000) || 0.016; t0 = t;
      om += (150 * (tg - th) - 12 * om) * dt; th += om * dt; draw();
      if (Math.abs(tg - th) < 0.05 && Math.abs(om) < 0.05) { th = tg; draw(); raf = 0; t0 = 0; return; } raf = requestAnimationFrame(step); };
    const aim = (deg) => { const dlt = ((deg - th) % 360 + 540) % 360 - 180; tg = th + dlt; if (RM) { th = tg; om = 0; draw(); return; } if (!raf) raf = requestAnimationFrame(step); };
    let cur = st.rank[0];
    const pick = (s, focus, you, deg) => {
      cur = s; pts.forEach((p, i) => { p.setAttribute('aria-checked', i === s); p.tabIndex = i === s ? 0 : -1; }); lbs.forEach((l, i) => l.classList.toggle('on', i === s));
      if (focus) pts[s].focus();
      aim(deg === undefined ? s * 45 : deg);
      body.innerHTML = panel(s, you); if (!RM) { body.classList.remove('ain'); void body.offsetWidth; body.classList.add('ain'); }
    };
    pts.forEach((p, i) => {
      p.addEventListener('click', () => { sel.value = ''; pick(i); });
      p.addEventListener('keydown', (e) => {
        const n = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: 7 }[e.key];
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); sel.value = ''; pick(i); return; }
        if (n === undefined) return; e.preventDefault(); sel.value = ''; pick((n + 8) % 8, true);
      });
    });
    sel.addEventListener('change', () => { const o = sel.value && opt(sel.value); if (!o) return;
      const s = sector(o.b), mi = Math.max(1, Math.round(o.mi));
      pick(s, false, `<b>${esc(o.nm)}</b> is about ${mi} mile${mi > 1 ? 's' : ''} ${DIR[s].toLowerCase()} of our office, in a straight line.`, o.b); });
    // arrival, once: the petals bloom out from the office, clockwise from north, and the needle spins up and settles
    const go = () => { sec.classList.add('ago'); if (RM) return; th = tg - 300; om = 0; draw(); raf = raf || requestAnimationFrame(step); };
    if (RM || !('IntersectionObserver' in window)) { sec.classList.add('ago'); return; }
    const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { io.disconnect(); setTimeout(go, 120); } }, { threshold: 0.3 });
    io.observe(sec.querySelector('.arose'));
  }
  return { L, wire };
})();
