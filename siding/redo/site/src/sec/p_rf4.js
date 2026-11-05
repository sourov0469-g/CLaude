/* ROOFING PAGE · 4 What homeowners said about roofs. Only verbatim lines from the published Google reviews, checked word
   for word at build time (PB.quote); no per-review stars; the rating is the locked 4.9 from 474 Google reviews.
   A — the pinned wall (Cowboy: warm, pinned). Five roof lines as cards on a wall.
   B — one at a time (Apple AirPods Pro: one line, full attention). A single large line with previous / next and a count.
   C — laid like shingles (Dropbox Brand: one strong device). The lines on overlapping shingle-shaped tiles, course by
       course, each lapping the one below. */
window.PRf4 = (function () {
  const B = () => window.PB;
  const Q = [[15, 'They ripped off the old roof and put on a new one in one day.'], [3, 'We lost some shingles in one of the bigger storms that passed through and thankfully Austin Pro was able to fix everything WITHIN DAYS'],
    [0, 'I wish I would\'ve replaced my roof years ago instead of doing more damage waiting.'], [20, 'Paul Hale arrived and was able to get an in-person inspection of the roof as I was closing on a new home.'],
    [9, 'Paul Hale with Austin Pro was responsive and helped with a roof inspection for a buyer client of mine within 24 hours.']];
  const rating = '<p class="rt3">4.9 from 474 Google reviews</p>';

  const A = () => `<section class="sec rf4A" id="roofing-words" aria-labelledby="rf4A-h">
    <div class="hd"><h2 class="sec-h" id="rf4A-h" data-split>What homeowners said about their roofs.</h2>${rating}</div>
    <div class="wal">${Q.map(([i, t], k) => `<div class="pin" style="--r:${[-1.5, 1, -0.5, 1.5, -1][k]}deg">${B().quote(i, t)}</div>`).join('')}</div></section>`;

  const Bv = () => `<section class="sec rf4B" id="roofing-words" aria-labelledby="rf4B-h">
    <div class="hd"><h2 class="sec-h" id="rf4B-h" data-split>In their words.</h2>${rating}</div>
    <div class="one" aria-roledescription="carousel" aria-label="Roof reviews">${Q.map(([i, t], k) => `<div class="sl2" role="group" aria-roledescription="slide" aria-label="${k + 1} of ${Q.length}" ${k ? 'hidden' : ''}>${B().quote(i, t, 'pq2 big2')}</div>`).join('')}
      <div class="ctr2"><button type="button" class="pv3" aria-label="Previous review">←</button><span class="ct3" aria-live="polite">1 of ${Q.length}</span><button type="button" class="nx6" aria-label="Next review">→</button></div></div></section>`;

  const C = () => `<section class="sec rf4C" id="roofing-words" aria-labelledby="rf4C-h">
    <div class="hd"><h2 class="sec-h" id="rf4C-h" data-split>Lapped, line over line.</h2>${rating}</div>
    <div class="lap3">${Q.map(([i, t], k) => `<div class="tile" style="--i:${k}">${B().quote(i, t)}</div>`).join('')}</div></section>`;

  function wireB(root) { const s = root.querySelector('.rf4B'); if (!s) return; const sl = [...s.querySelectorAll('.sl2')], ct = s.querySelector('.ct3'); let i = 0;
    const go = (n) => { i = (n + sl.length) % sl.length; sl.forEach((x, k) => (x.hidden = k !== i)); ct.textContent = `${i + 1} of ${sl.length}`; };
    s.querySelector('.pv3').addEventListener('click', () => go(i - 1)); s.querySelector('.nx6').addEventListener('click', () => go(i + 1)); }
  return { A, B: Bv, C, wire(root) { wireB(root); } };
})();
