/* AREA M (new-versions addendum, pass 3) — "The map, filling in". Reference: Apple AirPods Pro (the pinned scroll; numbers
   as events). The section pins (position: sticky, no scroll hijacking) and the page's own scroll scrubs time: the project
   finder's dated records drop onto a quiet map of the Austin area month by month around the office. The year is the only
   numeral, and it rolls as an event; the locked line lands at the end. No count is derived or shown. Not a drivable map
   (that stays in Area C): the map never moves. */
window.Area8 = (function () {
  const LOCK = '886 documented projects since 2018: 312 on the map with photos + 574 more counted.';
  const MON = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const M = () => `<section class="sec amM" id="area" aria-labelledby="amM-h">
    <div class="amsticky" data-solid>
      <div class="amtext">
        <h2 class="sec-h" id="amM-h" data-split>The map, filling in.</h2>
        <p class="sec-p">Scroll, and our project finder's dated records land on the map month by month, around our door at 7801 N Lamar. Each point is a job, placed near the home, never on it.</p>
        <div class="amyear" aria-hidden="true"><span class="amy">2018</span></div>
        <p class="ammonth" aria-hidden="true">October</p>
        <label class="amsl"><span>Month</span><input type="range" min="0" max="1" step="1" value="0" aria-valuetext="October 2018"></label>
        <p class="amlock">${LOCK}</p>
      </div>
      <figure class="ammap"><canvas aria-hidden="true"></canvas>
        <figcaption>Dated records in our project finder, October 2018 to the latest month on record. Rings at 5, 10 and 20 miles from the office, in straight lines. The frame shows at least 27 miles each way; records farther out are off the frame.</figcaption></figure>
    </div></section>`;

  function wire(root) {
    const s = root.querySelector('.amM'); if (!s || s.dataset.w) return; s.dataset.w = 1;
    const N = globalThis.__NEAR; if (!N) return;
    const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cv = s.querySelector('canvas'), ctx = cv.getContext('2d'), yEl = s.querySelector('.amyear'), mEl = s.querySelector('.ammonth'), sl = s.querySelector('input'), lock = s.querySelector('.amlock');
    // months on record, in order (yymm), and each record's month index
    const months = [...new Set(N.p.map((r) => r[2]))].sort((a, b) => a - b);
    const idxOf = new Map(months.map((m, i) => [m, i]));
    const pts = N.p.map((r) => ({ x: r[0], y: r[1], k: idxOf.get(r[2]) })).sort((a, b) => a.k - b.k);
    const towns = (N.towns || []).filter((t) => Math.abs(t[2] - N.hq[0]) < 200 && Math.abs(t[3] - N.hq[1]) < 200).sort((a, b) => b[1] - a[1]).slice(0, 9).map((t) => [t[0], '', t[2], t[3]]);
    const MAXK = months.length - 1; sl.max = MAXK;
    const label = (k) => { const m = months[k]; return [2000 + Math.floor(m / 100), MON[(m % 100) - 1]]; };
    let shown = -1, manual = false, year = 2018, dpr = 1, fit = { s: 1, ox: 0, oy: 0 }, born = new Map(), raf = 0;
    // frame the map on the office: a square of 2 × 230 finder px (at least 27 miles each way), fitted to the canvas
    const HALF = 230, [HX, HY] = N.hq;
    const size = () => { const r = cv.getBoundingClientRect(); dpr = Math.min(2, devicePixelRatio || 1); cv.width = Math.round(r.width * dpr); cv.height = Math.round(r.height * dpr);
      const sc = Math.min(cv.width, cv.height) / (2 * HALF); fit = { s: sc, ox: cv.width / 2 - HX * sc, oy: cv.height / 2 - HY * sc }; };
    const X = (x) => fit.ox + x * fit.s, Y = (y) => fit.oy + y * fit.s;
    const base = () => { const [hx, hy] = N.hq; ctx.clearRect(0, 0, cv.width, cv.height);
      ctx.lineWidth = 1 * dpr; ctx.setLineDash([4 * dpr, 5 * dpr]); ctx.strokeStyle = 'rgba(14,59,44,.18)';
      [5, 10, 20].forEach((mi) => { ctx.beginPath(); ctx.arc(X(hx), Y(hy), mi * N.ppm * fit.s, 0, Math.PI * 2); ctx.stroke(); });
      ctx.setLineDash([]); ctx.font = `600 ${11 * dpr}px Inter, system-ui, sans-serif`; ctx.fillStyle = 'rgba(14,59,44,.42)'; ctx.textAlign = 'left';
      [5, 10, 20].forEach((mi) => ctx.fillText(`${mi} mi`, X(hx) + 4 * dpr, Y(hy) - mi * N.ppm * fit.s - 4 * dpr));
      ctx.font = `600 ${12 * dpr}px Inter, system-ui, sans-serif`; ctx.fillStyle = 'rgba(22,25,29,.55)'; ctx.textAlign = 'center';
      towns.forEach((g) => ctx.fillText(g[0], X(g[2]), Y(g[3]) - 9 * dpr)); };
    const star = () => { const [hx, hy] = N.hq, cx = X(hx), cy = Y(hy), R = 9 * dpr; ctx.beginPath();
      for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? R * 0.45 : R; ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r); }
      ctx.closePath(); ctx.fillStyle = '#0E3B2C'; ctx.fill(); ctx.lineWidth = 2 * dpr; ctx.strokeStyle = '#FFFFFF'; ctx.stroke();
      ctx.font = `700 ${12 * dpr}px Inter, system-ui, sans-serif`; ctx.fillStyle = '#0E3B2C'; ctx.textAlign = 'left'; ctx.fillText('Our office', cx + 13 * dpr, cy + 4 * dpr); };
    // draw: points up to month k; points from the last few months are fresh (lime, larger), and each eases in from when it was born
    const draw = () => { raf = 0; base(); const now = performance.now(); let live = false;
      for (const q of pts) { if (q.k > shown) break; const age = shown - q.k, b = born.get(q) || 0, t = RM ? 1 : Math.min(1, (now - b) / 900); if (t < 1) live = true;
        const e = 1 - Math.pow(1 - t, 3), fresh = age <= 2, r = (fresh ? 3.6 : 2.6) * dpr * (0.4 + 0.6 * e);
        ctx.beginPath(); ctx.arc(X(q.x), Y(q.y), r, 0, Math.PI * 2); ctx.fillStyle = fresh ? `rgba(127,164,62,${0.55 + 0.45 * e})` : 'rgba(14,59,44,.62)'; ctx.fill(); }
      star(); if (live) raf = requestAnimationFrame(draw); };
    const rollYear = (y) => { if (y === year) return; const up = y > year; year = y;
      const old = yEl.querySelector('.amy:last-child'), nw = document.createElement('span'); nw.className = 'amy ' + (up ? 'amin' : 'amin2'); nw.textContent = y; yEl.appendChild(nw);
      if (RM) { old.remove(); nw.className = 'amy'; return; }
      old.classList.add(up ? 'amout' : 'amout2'); setTimeout(() => old.remove(), 700); requestAnimationFrame(() => requestAnimationFrame(() => nw.classList.remove('amin', 'amin2'))); };
    const show = (k) => { k = Math.max(0, Math.min(MAXK, k)); if (k === shown) return; const now = performance.now();
      for (const q of pts) { if (q.k > Math.max(k, shown)) break; if (q.k > shown && q.k <= k) born.set(q, now); }
      shown = k; const [y, mo] = label(k); rollYear(y); mEl.textContent = mo; sl.value = k; sl.setAttribute('aria-valuetext', `${mo} ${y}`);
      if (!raf) raf = requestAnimationFrame(draw); };
    // the page's own scroll drives time; the last stretch of the section is the final event (the lock lands)
    const prog = () => { const r = s.getBoundingClientRect(), run = r.height - innerHeight; return run > 0 ? Math.max(0, Math.min(1, -r.top / run)) : 1; };
    const onScroll = () => { if (RM) return; const p = prog(); if (!manual) show(Math.round(Math.min(1, p / 0.86) * MAXK)); lock.classList.toggle('on', p > 0.9 || shown === MAXK); };
    sl.addEventListener('input', () => { manual = true; show(+sl.value); lock.classList.toggle('on', shown === MAXK); });
    addEventListener('scroll', () => { manual = false; onScroll(); }, { passive: true });
    addEventListener('resize', () => { size(); if (!raf) raf = requestAnimationFrame(draw); });
    size();
    if (RM) { show(MAXK); lock.classList.add('on'); } else { show(0); onScroll(); }
  }
  return { M, wire };
})();
