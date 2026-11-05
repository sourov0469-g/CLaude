/* ROOFING PAGE · 2 What a roof costs. Only the bands already published on the homepage, materials and labour, before tax,
   2022–2026: shingle roofs, 204 priced, median band $10k–$15k, middle half of jobs $5k–$20k; metal roofs, 29 priced,
   median band $20k–$25k. Documented: 210 shingle, 31 metal.
   A — two roofs, two bands (Cowboy: two drawn objects). A drawn shingle roof and a drawn standing-seam metal roof, each
       carrying its median band and its priced count.
   B — up the pitch (Apple AirPods Pro: one measured scale). The price scale laid up a roof slope, $0 at the eave to $30k at
       the ridge; the shingle middle half and median band sit on it, and the metal median band can be laid over.
   C — the plain table (Cash App Brand Guidelines: the honest table). Shingle and metal side by side, row by row. */
window.PRf2 = (function () {
  const B = () => window.PB;
  const SRC = 'Materials and labour, before tax, 2022–2026.';
  const shingles = () => { let s = ''; for (let r = 0; r < 6; r++) { const y = 40 + r * 24; for (let x = (r % 2) * 18 - 18; x < 300; x += 36) s += `<rect x="${x}" y="${y}" width="34" height="22" rx="2"/>`; } return s; };
  const seams = () => { let s = ''; for (let x = 12; x < 300; x += 30) s += `<path d="M${x} 36V190"/>`; return s; };

  const A = () => `<section class="sec rf2A" id="roofing-cost" aria-labelledby="rf2A-h">
    <div class="hd"><h2 class="sec-h" id="rf2A-h" data-split>What a roof costs here.</h2><p class="sec-p">What our own priced roofs came to. ${SRC} Your own price comes from the free inspection.</p></div>
    <div class="two5"><figure class="rcard"><svg viewBox="0 0 300 200" aria-hidden="true"><g class="sh2">${shingles()}</g></svg><figcaption><small>Shingle roofs</small><b>$10k–$15k</b><span>median band, 204 priced · middle half $5k–$20k</span></figcaption></figure>
      <figure class="rcard m"><svg viewBox="0 0 300 200" aria-hidden="true"><rect x="0" y="36" width="300" height="154" class="mt"/><g class="sm4">${seams()}</g></svg><figcaption><small>Metal roofs</small><b>$20k–$25k</b><span>median band, 29 priced</span></figcaption></figure></div>
    <div class="pacts">${B().book()}${B().call()}</div></section>`;

  // the slope: $0 at the eave (bottom left) to $30k at the ridge (top right), along a 600×300 drawing
  const P = (v) => { const t = v / 30; return [40 + t * 520, 270 - t * 230]; };
  const seg = (a, b, cls, w) => { const [x1, y1] = P(a), [x2, y2] = P(b); return `<path class="${cls}" d="M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}" stroke-width="${w}"/>`; };
  const Bv = () => `<section class="sec rf2B" id="roofing-cost" aria-labelledby="rf2B-h">
    <div class="hd"><h2 class="sec-h" id="rf2B-h" data-split>Up the pitch.</h2><p class="sec-p">Our priced roofs, laid up the slope from $0 at the eave to $30k at the ridge. ${SRC}</p></div>
    <div class="slp"><svg viewBox="0 0 600 300" role="img" aria-label="Price scale up a roof slope from $0 to $30k. Shingle roofs: middle half $5k to $20k, median band $10k to $15k. Metal roofs: median band $20k to $25k.">
        <path d="M20 290L580 30" class="deck"/>${seg(0, 30, 'rail', 6)}${seg(5, 20, 'mh4', 22)}${seg(10, 15, 'md4', 22)}${seg(20, 25, 'mtl', 22)}
        ${[0, 5, 10, 15, 20, 25, 30].map((v) => { const [x, y] = P(v); return `<g class="tk5"><path d="M${x.toFixed(1)} ${(y + 16).toFixed(1)}l-6 13"/><text x="${(x - 10).toFixed(1)}" y="${(y + 44).toFixed(1)}">$${v}k</text></g>`; }).join('')}</svg>
      <div class="key3"><p><i class="a1"></i><b>$5k–$20k</b> shingle, middle half of 204 priced</p><p><i class="a2"></i><b>$10k–$15k</b> shingle median band</p><label><input type="checkbox"> Show metal: <b>$20k–$25k</b> median band (29 priced)</label></div></div></section>`;

  const ROWS = [['Documented roofs', '210', '31'], ['Priced roofs', '204', '29'], ['Median band', '$10k–$15k', '$20k–$25k'], ['Middle half of jobs', '$5k–$20k', 'Not published']];
  const C = () => `<section class="sec rf2C" id="roofing-cost" aria-labelledby="rf2C-h">
    <div class="hd"><h2 class="sec-h" id="rf2C-h" data-split>Shingle or metal, side by side.</h2><p class="sec-p">${SRC} From a GAF Master Elite contractor.</p></div>
    <table class="tb5"><thead><tr><th scope="col"><span class="vh8">Measure</span></th><th scope="col">Shingle</th><th scope="col">Metal</th></tr></thead>
      <tbody>${ROWS.map(([h, a, b]) => `<tr><th scope="row">${h}</th><td>${a}</td><td${b === 'Not published' ? ' class="np"' : ''}>${b}</td></tr>`).join('')}</tbody></table>
    <div class="ft11"><p>Your own price comes from the free inspection: an itemised price for the work you want.</p><div class="pacts">${B().book()}${B().call()}</div></div></section>`;

  function wireB(root) { const s = root.querySelector('.rf2B'); if (!s) return; const c = s.querySelector('input'); c.addEventListener('change', () => s.classList.toggle('met', c.checked)); }
  return { A, B: Bv, C, wire(root) { wireB(root); } };
})();
