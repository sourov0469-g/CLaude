/* ROOFING PAGE · 1 Opener (the page's one h1). As published on the homepage: 241 shingle and metal roofs documented —
   shingle roofs on 210 documented projects and metal roofs on 31 — from a GAF Master Elite contractor. Verbatim review
   lines (build-checked): Ken Weigand. Photos: the firm's own roofing jobs (PB.img 1 Fairview, Round Rock; 6 Ashford Park,
   Buda).
   A — under the gable (Dropbox Brand: one shape, big type). The headline set inside a drawn gable, the counts on the
       courses below it like shingle rows.
   B — one day (Cowboy: a homeowner's words first). A verbatim line as the opener's centrepiece, the proof beside it.
   C — the photo, gabled (Scout Motors: the real roof, plainly). The firm's own roof job cropped to a gable, with the
       proof and the call along its base. */
window.PRf1 = (function () {
  const B = () => window.PB;
  const PROOF = [['241', 'shingle and metal roofs documented'], ['210', 'shingle roofs'], ['31', 'metal roofs'], ['GAF', 'Master Elite contractor']];

  const A = () => `<section class="sec rf1A" id="roofing-top" aria-labelledby="rf1A-h">
    <div class="gab"><div class="tri"><p class="pkick">Roofing</p><h1 class="sec-h" id="rf1A-h">Shingle and metal roofs.</h1></div>
      <ol class="crs3">${PROOF.map(([b, s], i) => `<li style="--i:${i}"><b>${b}</b><span>${s}</span></li>`).join('')}</ol></div>
    <div class="ft10"><p>From a GAF Master Elite contractor. One free inspection covers the roof and every other trade on the house.</p><div class="pacts">${B().book()}${B().call()}</div></div></section>`;

  const Bv = () => `<section class="sec rf1B" id="roofing-top" aria-labelledby="rf1B-h">
    <div class="l"><p class="pkick">Roofing</p><h1 class="sec-h" id="rf1B-h" data-split>Shingle and metal roofs, from a GAF Master Elite contractor.</h1>
      <dl class="pf4">${PROOF.slice(0, 3).map(([b, s]) => `<div><dt>${b}</dt><dd>${s}</dd></div>`).join('')}</dl><div class="pacts">${B().book()}${B().call()}</div></div>
    <div class="r">${B().quote(15, 'They ripped off the old roof and put on a new one in one day.', 'pq2 hero3')}${B().quote(15, 'The site was clean when they left and the new roof looks great.', 'pq2 sm')}</div></section>`;

  const C = () => `<section class="sec rf1C" id="roofing-top" aria-labelledby="rf1C-h">
    <figure class="gph">${B().img(1)}<figcaption>${B().cap(1)}</figcaption></figure>
    <div class="base"><div><p class="pkick">Roofing</p><h1 class="sec-h" id="rf1C-h" data-split>Shingle and metal roofs.</h1></div>
      <ul class="pr4">${PROOF.map(([b, s]) => `<li><b>${b}</b><span>${s}</span></li>`).join('')}</ul><div class="pacts">${B().book()}${B().call()}</div></div></section>`;

  return { A, B: Bv, C, wire() {} };
})();
