/* SIDING PAGE · 1 Opener (the page's one h1). Facts only as already published on the homepage: 431 documented siding jobs;
   James Hardie Elite Preferred + President's Club 2025; 30-year James Hardie non-prorated + lifetime workmanship on labor;
   replaced by the full wall or the whole house, no patch repairs; 1–2 weeks on site including paint. Photos: the firm's own
   documented jobs (PB.img).
   A — split cover (Scout Motors: the honest product page). Headline and proof on the left, one real siding job on the right.
   B — hung as courses (Dropbox Brand: type as the whole design). No photo: the headline is set as lap boards that hang one
       course at a time, each lapping the one below; the proof sits on the last board.
   C — the street view (Graza: the custom-animation bar). A real job full-bleed, the proof running along a strip that counts
       up once as it arrives. */
window.PSd1 = (function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const B = () => window.PB;
  const PROOF = [['431', 'documented siding jobs'], ['30-year', 'James Hardie non-prorated warranty'], ['Lifetime', 'workmanship warranty on labor'], ['1–2 weeks', 'on site, including paint']];

  /* ---------- A ---------- */
  const A = () => `<section class="sec sd1A" id="siding-top" aria-labelledby="sd1A-h">
    <div class="txt"><p class="pkick">Siding · James Hardie Elite Preferred</p><h1 class="sec-h" id="sd1A-h" data-split>Siding, by the full wall or the whole house.</h1>
      <p class="sec-p">James Hardie fiber cement, replaced by the full wall or the whole house. No patch repairs. One free inspection covers every trade on the house.</p>
      <dl class="pf2">${PROOF.map(([b, s]) => `<div><dt>${b}</dt><dd>${s}</dd></div>`).join('')}</dl>
      <div class="pacts">${B().book()}${B().call()}</div></div>
    <figure class="ph2">${B().img(0)}<figcaption>${B().cap(0)}</figcaption></figure></section>`;

  /* ---------- B ---------- */
  const LINES = ['Siding,', 'by the full wall', 'or the whole house.'];
  const Bv = () => `<section class="sec sd1B" id="siding-top" aria-labelledby="sd1B-h">
    <h1 class="vh4" id="sd1B-h">Siding, by the full wall or the whole house.</h1>
    <div class="crs" aria-hidden="true">${LINES.map((l, i) => `<div class="cr2" style="--i:${i}"><span>${l}</span></div>`).join('')}
      <div class="cr2 last" style="--i:${LINES.length}"><span class="pr3">${PROOF.map(([b, s]) => `<b>${b}</b> ${s}`).join('<i>·</i>')}</span></div></div>
    <p class="sr2">${PROOF.map(([b, s]) => `${b} ${s}`).join('. ')}.</p>
    <div class="ft4"><p>James Hardie fiber cement, installed by a James Hardie Elite Preferred contractor, President's Club 2025.</p><div class="pacts">${B().book()}${B().call()}</div></div></section>`;

  /* ---------- C ---------- */
  const C = () => `<section class="sec sd1C" id="siding-top" aria-labelledby="sd1C-h">
    <div class="bg2">${B().img(4)}</div>
    <div class="ov"><p class="pkick">Siding</p><h1 class="sec-h" id="sd1C-h" data-split>The whole house, in James Hardie.</h1>
      <p class="cp2">${B().cap(4)}</p><div class="pacts">${B().book()}${B().call('pcall lt')}</div></div>
    <ul class="strip">${PROOF.map(([b, s]) => `<li><b data-n="${/^\d+$/.test(b) ? b : ''}">${b}</b><span>${s}</span></li>`).join('')}</ul></section>`;

  function wireB(root) { const s = root.querySelector('.sd1B'); if (!s) return; if (RM) { s.classList.add('hung'); return; }
    new IntersectionObserver((es, io) => es.forEach((e) => { if (e.isIntersecting) { io.disconnect(); s.classList.add('hung'); } }), { threshold: 0.2 }).observe(s); }
  function wireC(root) { const s = root.querySelector('.sd1C'); if (!s) return; const n = s.querySelector('b[data-n]:not([data-n=""])'); if (!n || RM) return;
    const to = +n.dataset.n; n.textContent = '0';
    new IntersectionObserver((es, io) => es.forEach((e) => { if (!e.isIntersecting) return; io.disconnect(); const t0 = performance.now();
      const step = (t) => { const k = Math.min(1, (t - t0) / 1400), v = Math.round(to * (1 - Math.pow(1 - k, 3))); n.textContent = v; if (k < 1) requestAnimationFrame(step); else n.textContent = to; }; requestAnimationFrame(step); }), { threshold: 0.4 }).observe(s.querySelector('.strip')); }
  return { A, B: Bv, C, wire(root) { wireB(root); wireC(root); } };
})();
