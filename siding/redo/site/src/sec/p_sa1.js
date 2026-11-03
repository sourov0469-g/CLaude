/* SERVICE AREA PAGE · 1 Opener (the page's one h1). The firm's real records only: town names from the documented-project
   records (window.__NEAR towns), the locked 886 wording, the office address. No map, no dots, no count of towns.
   A — town names (Dropbox Brand: type as the map). The towns on our books, largest tally first, set as one paragraph of
       names that steps down in size.
   B — where the jobs are (Cowboy: real houses). Two of the firm's job photos from two towns, with their records.
   C — from one door (Scout Motors: the plain start point). The office address as the starting line; the towns listed
       beneath it in order of documented work. */
window.PSa1 = (function () {
  const B = () => window.PB;
  const T = () => ((window.__NEAR || {}).towns || []).filter((t) => t[1] > 0);
  const LOCK = '886 documented projects since 2018: 312 on the map with photos + 574 more counted.';

  const A = () => { const L = T().slice(0, 24), max = (L[0] || [0, 1])[1];
    return `<section class="sec sa1A" id="area-top" aria-labelledby="sa1A-h">
    <p class="pkick">Service area</p><h1 class="sec-h" id="sa1A-h" data-split>Austin, and the towns around it.</h1>
    <p class="tn3">${L.map(([n, k]) => `<span style="--s:${(0.8 + 2.6 * Math.sqrt(k / max)).toFixed(2)}">${B().esc(n)}</span>`).join(' ')}</p>
    <p class="lk5">The towns on our documented records, set by how much work we have done there. ${LOCK}</p><div class="pacts">${B().book()}${B().call()}</div></section>`; };

  const Bv = () => `<section class="sec sa1B" id="area-top" aria-labelledby="sa1B-h">
    <div class="hd"><p class="pkick">Service area</p><h1 class="sec-h" id="sa1B-h" data-split>Austin, and the towns around it.</h1><p class="sec-p">${LOCK}</p></div>
    <div class="two6"><figure>${B().img(4)}<figcaption>${B().cap(4)}</figcaption></figure><figure>${B().img(6)}<figcaption>${B().cap(6)}</figcaption></figure></div>
    <div class="pacts">${B().book()}${B().call()}</div></section>`;

  const C = () => `<section class="sec sa1C" id="area-top" aria-labelledby="sa1C-h">
    <p class="pkick">Service area</p><h1 class="sec-h" id="sa1C-h" data-split>From one door on North Lamar.</h1>
    <p class="door2"><b>7801 N Lamar Blvd Suite C70</b><span>Austin TX 78752</span></p>
    <ol class="out4">${T().slice(0, 12).map(([n]) => `<li>${B().esc(n)}</li>`).join('')}</ol>
    <p class="lk5">Towns in order of our documented work. ${LOCK}</p></section>`;

  return { A, B: Bv, C, wire() {} };
})();
