/* WINDOWS & DOORS PAGE · 1 Opener (the page's one h1). As published on the homepage: 388 documented window jobs; of 376
   priced, 238 with NT Windows (made in Texas); Andersen Certified Contractor, Premier; 2 days on site for most window-only
   jobs; windows measured, built to order, then set and sealed; 109 exterior-door jobs. Photos: the firm's own window jobs
   (PB.img 3 Windermere, Pflugerville; 7 River Place, Austin).
   A — split cover (Scout Motors: the honest product page). Headline and proof beside one real window job.
   B — through the window (Apple AirPods Pro: one object, one move). The headline sits inside a drawn window; the lower
       sash lifts as the section arrives and the proof is behind it.
   C — the diptych (Cowboy: two real houses side by side). Two of the firm's window jobs, the headline across both and the
       proof in a strip between. */
window.PWd1 = (function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const B = () => window.PB;
  const PROOF = [['388', 'documented window jobs'], ['238', 'jobs with NT Windows, made in Texas'], ['2 days', 'on site for most window-only jobs'], ['Premier', 'Andersen Certified Contractor']];
  const pf = () => `<dl class="pf3">${PROOF.map(([b, s]) => `<div><dt>${b}</dt><dd>${s}</dd></div>`).join('')}</dl>`;
  const LINE = 'Measured, built to order, then set and sealed. Exterior doors too.';

  const A = () => `<section class="sec wd1A" id="windows-top" aria-labelledby="wd1A-h">
    <div class="txt"><p class="pkick">Windows &amp; Doors</p><h1 class="sec-h" id="wd1A-h" data-split>Windows, measured and built to order.</h1><p class="sec-p">${LINE} One free inspection covers every trade on the house.</p>${pf()}<div class="pacts">${B().book()}${B().call()}</div></div>
    <figure class="ph3">${B().img(3)}<figcaption>${B().cap(3)}</figcaption></figure></section>`;

  const Bv = () => `<section class="sec wd1B" id="windows-top" aria-labelledby="wd1B-h">
    <div class="win6"><div class="frm2"><div class="up3"><p class="pkick">Windows &amp; Doors</p><h1 class="sec-h" id="wd1B-h">Windows, measured and built to order.</h1></div>
      <div class="lo3"><div class="beh">${pf()}</div><div class="sash" aria-hidden="true"><i></i></div></div></div></div>
    <div class="ft7"><p>${LINE}</p><div class="pacts">${B().book()}${B().call()}</div></div></section>`;

  const C = () => `<section class="sec wd1C" id="windows-top" aria-labelledby="wd1C-h">
    <h1 class="sec-h" id="wd1C-h" data-split>New windows, two Austin-area homes.</h1>
    <div class="dip"><figure>${B().img(3)}<figcaption>${B().cap(3)}</figcaption></figure><ul class="mid3">${PROOF.map(([b, s]) => `<li><b>${b}</b><span>${s}</span></li>`).join('')}</ul><figure>${B().img(7)}<figcaption>${B().cap(7)}</figcaption></figure></div>
    <div class="ft7"><p>${LINE}</p><div class="pacts">${B().book()}${B().call()}</div></div></section>`;

  function wireB(root) { const s = root.querySelector('.wd1B'); if (!s) return; if (RM) { s.classList.add('up'); return; }
    new IntersectionObserver((es, io) => es.forEach((e) => { if (e.isIntersecting) { io.disconnect(); setTimeout(() => s.classList.add('up'), 250); } }), { threshold: 0.3 }).observe(s.querySelector('.win6')); }
  return { A, B: Bv, C, wire(root) { wireB(root); } };
})();
