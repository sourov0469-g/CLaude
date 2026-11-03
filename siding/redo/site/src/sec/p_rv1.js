/* REVIEWS PAGE · 1 Opener (the page's one h1). Locked: 4.9 from 474 Google reviews; "474 reviews. 30 of them here." (as on
   the homepage). Names and words only as published (window.__REV); verbatim lines checked at build (PB.quote). No stars.
   A — the score (Dropbox Brand: one number). 4.9 set as large as the width allows, with the locked line.
   B — thirty names (Cowboy: the people first). The thirty reviewers' names, as published, set as one block of type
       behind the headline.
   C — one voice first (Apple AirPods Pro: one line, full attention). The h1, then one homeowner's verbatim line large. */
window.PRv1 = (function () {
  const B = () => window.PB;
  const R = () => window.__REV || [];
  const nm = (n) => String(n).trim(); // names exactly as published
  const LINE = '4.9 from 474 Google reviews';

  const A = () => `<section class="sec rv1A" id="reviews-top" aria-labelledby="rv1A-h">
    <p class="pkick">Reviews</p><h1 class="sec-h" id="rv1A-h"><span class="sc2">4.9</span><span class="ln6">from 474 Google reviews.</span></h1>
    <p class="sub2">474 reviews. 30 of them here, word for word, as published.</p><div class="pacts">${B().book()}${B().call()}</div></section>`;

  const Bv = () => `<section class="sec rv1B" id="reviews-top" aria-labelledby="rv1B-h">
    <p class="names" aria-hidden="true">${R().map((r) => `<span>${B().esc(nm(r.name))}</span>`).join(' ')}</p>
    <div class="ov2"><p class="pkick">Reviews</p><h1 class="sec-h" id="rv1B-h">Thirty reviews, in their own words.</h1><p class="sub2">${LINE}. 474 reviews. 30 of them here.</p><div class="pacts">${B().book()}</div></div></section>`;

  const C = () => `<section class="sec rv1C" id="reviews-top" aria-labelledby="rv1C-h">
    <p class="pkick">Reviews · ${LINE}</p><h1 class="sec-h" id="rv1C-h" data-split>What homeowners say.</h1>
    ${B().quote(26, 'Replacing siding is a huge investment, but Austin Pro made it seamless.', 'pq2 open2')}
    <p class="sub2">474 reviews. 30 of them here, word for word.</p></section>`;

  return { A, B: Bv, C, wire() {} };
})();
