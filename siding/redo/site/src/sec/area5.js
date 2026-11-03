/* ON YOUR STREET I and J (overnight ladder, Round 28). Data: the firm's documented-project records (window.__NEAR). No map,
   no dots, no total; the locked 886 wording stays verbatim.
   I — miles from our door (Cowboy: the ride from here). One straight ruler from the office at 7801 N Lamar; every town with
       three or more documented projects sits at its straight-line distance (measured in the finder's own positions). Drag
       the range to your distance; the towns inside it light up. Towns are listed, never summed.
   J — year by year (Quiet Cubes: calm, one figure at a time). Choose a trade; five years of records show the share of that
       year's documented jobs that included it. Shares only, never counts. */
window.Area5 = (function () {
  const N = () => window.__NEAR || { sv: [], ct: [], pl: [], p: [], towns: [], hq: [0, 0], ppm: 1 };
  const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  const LOCKS = '<b>886</b> documented projects since 2018 · 312 on the map with photos + 574 more counted.';
  const MAXMI = 60;

  /* ---------- I ---------- */
  const towns = () => { const d = N(); return d.towns.filter((t) => t[1] >= 3).map((t) => ({ t: t[0], n: t[1], mi: Math.hypot(t[2] - d.hq[0], t[3] - d.hq[1]) / d.ppm })).sort((a, b) => a.mi - b.mi); };
  const I = () => { const all = towns(), near = all.filter((x) => x.mi <= MAXMI), far = all.filter((x) => x.mi > MAXMI);
    return `<section class="sec arI" id="area" aria-labelledby="arI-h">
    <div class="hd"><h2 class="sec-h" id="arI-h" data-split>Miles from our door.</h2><p class="sec-p">Every town where we have three or more documented projects, set out by straight-line distance from our office at 7801 N Lamar Blvd Suite C70, Austin TX 78752.</p></div>
    <div class="rl" data-solid><div class="trk2"><i class="fill"></i>
        <span class="door" aria-hidden="true"><b>Our door</b></span>
        ${near.map((x, i) => `<span class="tn" data-mi="${x.mi.toFixed(1)}" style="left:${(x.mi / MAXMI * 100).toFixed(2)}%;--l:${i % 4}"><i></i><b>${esc(x.t)}</b><small>${Math.round(x.mi)} mi</small></span>`).join('')}
        ${[10, 20, 30, 40, 50, 60].map((m) => `<span class="tk3" style="left:${(m / MAXMI * 100).toFixed(2)}%">${m}</span>`).join('')}</div>
      <label class="rg"><span>How far are you from us?</span><input type="range" min="2" max="${MAXMI}" step="1" value="15" aria-valuetext="15 miles"></label></div>
    <p class="rd5" aria-live="polite"></p>
    ${far.length ? `<p class="far">Further out, with documented work too: ${far.map((x) => `${esc(x.t)} (${Math.round(x.mi)} mi)`).join(', ')}.</p>` : ''}
    <p class="lk">Distances are straight lines between the office and each town's centre in our records, not driving miles. ${LOCKS}</p></section>`; };

  function wireI(root) {
    const s = root.querySelector('.arI'); if (!s) return; const r = s.querySelector('input'), fill = s.querySelector('.fill'), tns = [...s.querySelectorAll('.tn')], rd = s.querySelector('.rd5');
    const upd = () => { const v = +r.value, inn = tns.filter((t) => +t.dataset.mi <= v); fill.style.width = (v / MAXMI * 100).toFixed(2) + '%'; r.setAttribute('aria-valuetext', `${v} miles`);
      tns.forEach((t) => t.classList.toggle('on', +t.dataset.mi <= v));
      rd.innerHTML = inn.length ? `<b>Within ${v} miles:</b> ${inn.map((t) => esc(t.querySelector('b').textContent)).join(', ')}.` : `<b>Within ${v} miles:</b> our own part of Austin. Call <a href="tel:+15125500000">(512) 550-0000</a>.`; };
    // labels go into the first free lane above the ruler (measured, so nothing overlaps at any width)
    const trk = s.querySelector('.trk2'), lay = () => { if (matchMedia('(max-width: 760px)').matches) { trk.style.removeProperty('--lanes'); return; } const ends = [];
      tns.forEach((t) => { const lab = t.querySelector('b'), sm = t.querySelector('small'), x = t.offsetLeft, w = Math.max(lab.offsetWidth, sm.offsetWidth) + 14; let l = ends.findIndex((e) => e < x - w / 2); if (l < 0) { l = ends.length; ends.push(0); } ends[l] = x + w / 2; t.style.setProperty('--l', l); });
      trk.style.setProperty('--lanes', ends.length); };
    lay(); addEventListener('resize', lay); if (document.fonts) document.fonts.ready.then(lay);
    r.addEventListener('input', upd); upd();
  }

  /* ---------- J ---------- */
  const TR = [['Siding', [0]], ['Windows', [1]], ['Roofing', [2, 3]], ['Painting', [4]], ['Gutters', [5]], ['Doors', [6, 7]]];
  const YRS = [22, 23, 24, 25, 26];
  const share = (j) => YRS.map((y) => { const recs = N().p.filter((q) => Math.floor(q[2] / 100) === y); const k = recs.filter((q) => TR[j][1].some((b) => q[3] & (1 << b))).length; return recs.length ? Math.round((k / recs.length) * 100) : 0; });
  const cols = (j) => share(j).map((v, i) => `<li style="--v:${v};--i:${i}"><b>${v}%</b><span class="br"><i></i></span><small>20${YRS[i]}${YRS[i] === 26 ? ' so far' : ''}</small></li>`).join('');
  const J = () => `<section class="sec arJ" id="area" aria-labelledby="arJ-h">
    <div class="hd"><h2 class="sec-h" id="arJ-h" data-split>Year by year.</h2><p class="sec-p">What our neighbours have had us do. Choose a trade: each year shows the share of that year's documented jobs that included it.</p></div>
    <div class="tr2" role="radiogroup" aria-label="Trade">${TR.map(([t], i) => `<button type="button" role="radio" aria-checked="${!i}" tabindex="${i ? -1 : 0}" data-j="${i}">${t}</button>`).join('')}</div>
    <ol class="yrs" aria-live="polite">${cols(0)}</ol>
    <p class="lk">A job with several trades counts toward each of them, so a year's shares add up to more than 100%. 2022 has few records; 2026 runs to September. ${LOCKS}</p></section>`;

  function wireJ(root) {
    const s = root.querySelector('.arJ'); if (!s) return; const bs = [...s.querySelectorAll('.tr2 button')], ol = s.querySelector('.yrs');
    const set = (i, f) => { bs.forEach((b, k) => { b.setAttribute('aria-checked', k === i); b.tabIndex = k === i ? 0 : -1; }); if (f) bs[i].focus();
      const v = share(i); [...ol.children].forEach((li, k) => { li.style.setProperty('--v', v[k]); li.querySelector('b').textContent = v[k] + '%'; }); };
    bs.forEach((b, i) => { b.addEventListener('click', () => set(i)); b.addEventListener('keydown', (e) => { const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]; if (d) { e.preventDefault(); set((i + d + bs.length) % bs.length, true); } }); });
    new IntersectionObserver((es, io) => es.forEach((e) => { if (e.isIntersecting) { io.disconnect(); s.classList.add('up'); } }), { threshold: 0.3 }).observe(ol);
  }
  return { I, J, wire(root) { wireI(root); wireJ(root); } };
})();
