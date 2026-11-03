/* SERVICE AREA PAGE · 4 From the office. The real address (7801 N Lamar Blvd Suite C70, Austin TX 78752) and straight-line
   distances from it to each town's centre in our own records (the finder's positions; labelled "straight line, not driving
   miles", as On your street I on the homepage). Towns with three or more documented projects. No map.
   A — nearest first (Cash App Brand Guidelines: one sorted list). Every town with its straight-line miles, nearest first.
   B — the directions card (Scout Motors: a plain printed card). The address, a directions link, the hours, and the
       towns within ten miles.
   C — three distance bands (Dropbox Brand: three groups, big type). Within 10 miles, 10–20 and 20 plus, names only. */
window.PSa4 = (function () {
  const B = () => window.PB;
  const L = () => B().LOCK;
  const N = () => window.__NEAR || { towns: [], hq: [0, 0], ppm: 1 };
  const towns = () => { const d = N(); return d.towns.filter((t) => t[1] >= 3).map((t) => ({ t: t[0], mi: Math.hypot(t[2] - d.hq[0], t[3] - d.hq[1]) / d.ppm })).sort((a, b) => a.mi - b.mi); };
  const NOTE = 'Straight-line distance from our office to each town’s centre in our records, not driving miles. Towns with three or more documented projects.';
  const MAPS = () => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(L().addr);

  const A = () => `<section class="sec sa4A" id="area-office" aria-labelledby="sa4A-h">
    <div class="hd"><h2 class="sec-h" id="sa4A-h" data-split>From our door, nearest first.</h2><p class="sec-p">${L().addr}. ${NOTE}</p></div>
    <ol class="nf">${towns().map((x, i) => `<li><span class="i3">${String(i + 1).padStart(2, '0')}</span><b>${B().esc(x.t)}</b><i aria-hidden="true"></i><span class="m5">${Math.round(x.mi)} mi</span></li>`).join('')}</ol></section>`;

  const Bv = () => { const near = towns().filter((x) => x.mi <= 10); return `<section class="sec sa4B" id="area-office" aria-labelledby="sa4B-h">
    <div class="dc" data-solid><p class="pkick">The office</p><h2 class="sec-h" id="sa4B-h">7801 N Lamar Blvd, Suite C70.</h2><p class="c8">Austin TX 78752</p>
      <div class="pacts"><a class="btn key" href="${MAPS()}" target="_blank" rel="noopener">Directions<span class="tab">${B().CAL}</span></a>${B().call()}</div>
      <dl><div><dt>Hours</dt><dd>${L().hours}</dd></div><div><dt>Email</dt><dd><a href="mailto:${L().mail}">${L().mail}</a></dd></div><div><dt>Within 10 miles, straight line</dt><dd>${near.map((x) => B().esc(x.t)).join(', ')}</dd></div></dl></div></section>`; };

  const BANDS = [['Within 10 miles', 0, 10], ['10 to 20 miles', 10, 20], ['20 miles and more', 20, 1e9]];
  const C = () => { const T = towns(); return `<section class="sec sa4C" id="area-office" aria-labelledby="sa4C-h">
    <div class="hd"><h2 class="sec-h" id="sa4C-h" data-split>Near, nearer, nearest.</h2><p class="sec-p">${NOTE}</p></div>
    <div class="bd7">${BANDS.map(([h, a, b]) => `<div><h3>${h}</h3><p>${T.filter((x) => x.mi >= a && x.mi < b).map((x) => B().esc(x.t)).join(' · ')}</p></div>`).join('')}</div>
    <p class="from">From ${L().addr}.</p></section>`; };

  return { A, B: Bv, C, wire() {} };
})();
