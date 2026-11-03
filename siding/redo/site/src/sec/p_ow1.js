/* OUR WORK PAGE · 1 Opener (the page's one h1). The locked wording, exactly as on the homepage: "886 documented projects
   since 2018: 312 on the map with photos + 574 more counted." No dot count is drawn or claimed. Photos: the firm's own eight
   documented jobs (PB.img 0–7) with their record captions.
   A — the contact sheet (Scout Motors: the honest record). All eight photos as a photographer's contact sheet, the h1 laid
       over a white band across it.
   B — 886, plainly (Dropbox Brand: subtraction). Type only: the number, the locked line, and what "documented" covers.
   C — one at a time (Apple AirPods Pro: one image, full attention). One photo large with its record; a strip of the other
       seven to choose from. Nothing advances on its own. */
window.POw1 = (function () {
  const B = () => window.PB;
  const LOCK = '886 documented projects since 2018: 312 on the map with photos + 574 more counted.';
  const IDX = [0, 1, 2, 3, 4, 5, 6, 7];

  const A = () => `<section class="sec ow1A" id="work-top" aria-labelledby="ow1A-h">
    <div class="sheet">${IDX.map((i) => `<figure>${B().img(i)}<figcaption>${B().cap(i)}</figcaption></figure>`).join('')}
      <div class="band3"><p class="pkick">Our work</p><h1 class="sec-h" id="ow1A-h">Real jobs, recorded where they happened.</h1><p class="lk3">${LOCK}</p></div></div>
    <div class="pacts">${B().book()}${B().call()}</div></section>`;

  const Bv = () => `<section class="sec ow1B" id="work-top" aria-labelledby="ow1B-h">
    <p class="pkick">Our work</p><h1 class="sec-h" id="ow1B-h"><span class="n886">886</span><span class="t">documented projects since 2018.</span></h1>
    <p class="lk4">${LOCK}</p>
    <p class="ex">Each one is a job in our own records, with its place, its month and the work done. Some have photos published; every one is counted.</p>
    <div class="pacts">${B().book()}${B().call()}</div></section>`;

  const C = () => `<section class="sec ow1C" id="work-top" aria-labelledby="ow1C-h">
    <div class="hd"><p class="pkick">Our work</p><h1 class="sec-h" id="ow1C-h" data-split>Real jobs, one at a time.</h1><p class="sec-p">${LOCK}</p></div>
    <div class="stage3" data-solid>${IDX.map((i, k) => `<figure class="big4" ${k ? 'hidden' : ''} data-k="${k}">${B().img(i)}<figcaption>${B().cap(i)}</figcaption></figure>`).join('')}</div>
    <div class="thumbs" role="radiogroup" aria-label="Choose a job">${IDX.map((i, k) => `<button type="button" role="radio" aria-checked="${!k}" tabindex="${k ? -1 : 0}" data-k="${k}" aria-label="${B().esc(B().cap(i))}">${B().img(i)}</button>`).join('')}</div></section>`;

  function wireC(root) { const s = root.querySelector('.ow1C'); if (!s) return; const bs = [...s.querySelectorAll('.thumbs button')], fs = [...s.querySelectorAll('.big4')];
    const set = (k, f) => { bs.forEach((b, j) => { b.setAttribute('aria-checked', j === k); b.tabIndex = j === k ? 0 : -1; }); fs.forEach((x, j) => (x.hidden = j !== k)); if (f) bs[k].focus(); };
    bs.forEach((b, k) => { b.addEventListener('click', () => set(k)); b.addEventListener('keydown', (e) => { const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]; if (d) { e.preventDefault(); set((k + d + bs.length) % bs.length, true); } }); }); }
  return { A, B: Bv, C, wire(root) { wireC(root); } };
})();
