/* WINDOWS & DOORS PAGE · 2 The makers. As published on the homepage, of 376 priced window jobs: NT Windows 238 (made in
   Texas), Simonton 54, Andersen 38 (Andersen Certified Contractor, Premier; median band $20k–$25k), Pella 31, 15 other
   makers or not recorded. Frame colours: each maker's published swatches (window.__WCOL, as Windows G).
   A — four makers, four cards (Cash App Brand Guidelines: one card per thing). Each maker's job count, one line and its
       published frame colours as a swatch row.
   B — one bar (Dropbox Brand: one bold shape). All 376 priced jobs as one bar split by maker; choose a maker to lift its
       share and read it.
   C — set in type (Apple AirPods Pro: scale as meaning). The four names set at sizes in proportion to their job counts. */
window.PWd2 = (function () {
  const B = () => window.PB;
  const W = () => window.__WCOL || {};
  const M = [['nt', 'NT Windows', 238, 'Made in Texas. The maker on most of our window jobs.'], ['si', 'Simonton', 54, 'The second most-used maker on our priced jobs.'],
    ['an', 'Andersen', 38, 'Andersen Certified Contractor, Premier. Median band $20k–$25k.'], ['pe', 'Pella', 31, 'On 31 of our priced window jobs.']];
  const OTHER = 15;

  const A = () => `<section class="sec wd2A" id="windows-makers" aria-labelledby="wd2A-h">
    <div class="hd"><h2 class="sec-h" id="wd2A-h" data-split>Four makers we fit.</h2><p class="sec-p">Of 376 priced window jobs. The colour rows are each maker's own frame colours.</p></div>
    <ul class="mk">${M.map(([k, n, c, t]) => `<li class="mc" data-k="${k}"><p class="cnt2"><b>${c}</b><span>of 376</span></p><h3>${n}</h3><p class="t4">${t}</p>
      <div class="sws" role="list" aria-label="${n} frame colours">${(W()[n] || []).map(([cn, hx]) => `<i role="listitem" title="${B().esc(cn)}" style="background:${hx}"><span class="vh7">${B().esc(cn)}</span></i>`).join('')}</div></li>`).join('')}</ul>
    <p class="ot4">The other ${OTHER} priced jobs used other makers or have no maker recorded.</p></section>`;

  const Bv = () => `<section class="sec wd2B" id="windows-makers" aria-labelledby="wd2B-h">
    <div class="hd"><h2 class="sec-h" id="wd2B-h" data-split>376 window jobs, one bar.</h2><p class="sec-p">Each maker's share of our priced window jobs. Choose one.</p></div>
    <div class="bar4" role="radiogroup" aria-label="Maker">${M.map(([k, n, c], i) => `<button type="button" role="radio" aria-checked="${!i}" tabindex="${i ? -1 : 0}" data-i="${i}" style="flex:${c}"><span>${n}</span></button>`).join('')}<i class="ot5" style="flex:${OTHER}" title="Other or not recorded"></i></div>
    <div class="rd8" aria-live="polite"></div></section>`;

  const max = 238; const fs = (c) => (0.9 + 5.6 * Math.sqrt(c / max)).toFixed(2);
  const C = () => `<section class="sec wd2C" id="windows-makers" aria-labelledby="wd2C-h">
    <div class="hd"><h2 class="sec-h" id="wd2C-h" data-split>The makers, to scale.</h2><p class="sec-p">Each name is set in proportion to its share of our 376 priced window jobs.</p></div>
    <ol class="tp4">${M.map(([k, n, c, t]) => `<li style="--f:${fs(c)}"><b>${n}</b><span><em>${c}</em> ${t}</span></li>`).join('')}<li style="--f:${fs(OTHER)}" class="o"><b>Other or not recorded</b><span><em>${OTHER}</em></span></li></ol></section>`;

  function wireB(root) { const s = root.querySelector('.wd2B'); if (!s) return; const bs = [...s.querySelectorAll('.bar4 button')], rd = s.querySelector('.rd8');
    const set = (i, f) => { bs.forEach((b, k) => { b.setAttribute('aria-checked', k === i); b.tabIndex = k === i ? 0 : -1; }); if (f) bs[i].focus(); const [, n, c, t] = M[i]; rd.innerHTML = `<b>${n}</b><span><em>${c} of 376</em> priced window jobs. ${t}</span>`; };
    bs.forEach((b, i) => { b.addEventListener('click', () => set(i)); b.addEventListener('keydown', (e) => { const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]; if (d) { e.preventDefault(); set((i + d + bs.length) % bs.length, true); } }); }); set(0); }
  return { A, B: Bv, C, wire(root) { wireB(root); } };
})();
