/* SERVICE AREA PAGE · 3 Neighbourhoods. The neighbourhoods in the firm's own documented records, by town (window.__NEAR
   towns: each town's top neighbourhoods with their record counts, as On your street D). Names exactly as recorded; the
   town's own name is left out of its list. No total is stated.
   A — open a town (Erie Home, note only: disclosure grammar). Native details per town; open one for its neighbourhoods.
   B — pick a town (Cash App Brand Guidelines: list and detail). Towns down one side; the chosen town's neighbourhoods as
       chips with their counts.
   C — side by side (Dropbox Brand: columns of type). The five towns with the most documented work, in five columns. */
window.PSa3 = (function () {
  const B = () => window.PB;
  const T = () => ((window.__NEAR || {}).towns || []).filter((t) => t[1] > 0 && (t[4] || []).some((h) => h[0].toLowerCase() !== t[0].toLowerCase()));
  const hoods = (t) => (t[4] || []).filter((h) => h[0].toLowerCase() !== t[0].toLowerCase());
  const chips = (t) => hoods(t).map(([h, n]) => `<li><span>${B().esc(h)}</span><b>${n}</b></li>`).join('');
  const NOTE = 'The neighbourhoods named most often in our documented records, with how many records name each (up to twelve per town).';

  const A = () => `<section class="sec sa3A" id="area-hoods" aria-labelledby="sa3A-h">
    <div class="hd"><h2 class="sec-h" id="sa3A-h" data-split>Neighbourhoods, town by town.</h2><p class="sec-p">${NOTE}</p></div>
    <div class="acc">${T().slice(0, 10).map((t, i) => `<details${i ? '' : ' open'}><summary><b>${B().esc(t[0])}</b><span>Most-named neighbourhoods</span><i aria-hidden="true"></i></summary><ul class="hl">${chips(t)}</ul></details>`).join('')}</div></section>`;

  const Bv = () => { const L = T().slice(0, 12); return `<section class="sec sa3B" id="area-hoods" aria-labelledby="sa3B-h">
    <div class="hd"><h2 class="sec-h" id="sa3B-h" data-split>Pick a town.</h2><p class="sec-p">${NOTE}</p></div>
    <div class="wrap"><div class="tl5" role="radiogroup" aria-label="Town">${L.map((t, i) => `<button type="button" role="radio" aria-checked="${!i}" tabindex="${i ? -1 : 0}" data-i="${i}">${B().esc(t[0])}</button>`).join('')}</div>
      <div class="pane2" aria-live="polite"><h3>${B().esc(L[0][0])}</h3><ul class="hl">${chips(L[0])}</ul></div></div></section>`; };

  const C = () => `<section class="sec sa3C" id="area-hoods" aria-labelledby="sa3C-h">
    <div class="hd"><h2 class="sec-h" id="sa3C-h" data-split>Five towns, side by side.</h2><p class="sec-p">${NOTE}</p></div>
    <div class="c7">${T().slice(0, 5).map((t) => `<div><h3>${B().esc(t[0])}</h3><ol>${hoods(t).map(([h, n]) => `<li><span>${B().esc(h)}</span><b>${n}</b></li>`).join('')}</ol></div>`).join('')}</div></section>`;

  function wireB(root) { const s = root.querySelector('.sa3B'); if (!s) return; const L = T().slice(0, 12), bs = [...s.querySelectorAll('.tl5 button')], pn = s.querySelector('.pane2');
    const set = (i, f) => { bs.forEach((b, k) => { b.setAttribute('aria-checked', k === i); b.tabIndex = k === i ? 0 : -1; }); if (f) bs[i].focus(); pn.innerHTML = `<h3>${B().esc(L[i][0])}</h3><ul class="hl">${chips(L[i])}</ul>`; };
    bs.forEach((b, i) => { b.addEventListener('click', () => set(i)); b.addEventListener('keydown', (e) => { const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]; if (d) { e.preventDefault(); set((i + d + bs.length) % bs.length, true); } }); }); }
  return { A, B: Bv, C, wire(root) { wireB(root); } };
})();
