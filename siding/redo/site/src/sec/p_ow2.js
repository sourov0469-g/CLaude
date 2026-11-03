/* OUR WORK PAGE · 2 The photographs. The firm's own eight documented-job photos (PB.img 0–7) with their record captions
   (place, month, trades); nothing else is said about them.
   A — the gallery (Apple AirPods Pro: look closer). A tidy grid; choose a photo to open it large in a dialog with previous /
       next; Escape closes and focus returns to the photo you chose.
   B — by the work done (Cash App Brand Guidelines: one filter, one grid). Chips for Siding, Windows, Roofing and Painting
       filter the photos by their recorded trades.
   C — editorial rows (Ever, craft note only: magazine narrative). Each photo set wide, its record set beside it like a
       magazine caption, alternating sides down the page. */
window.POw2 = (function () {
  const B = () => window.PB;
  const J = () => window.__JOBS || [];
  const IDX = [0, 1, 2, 3, 4, 5, 6, 7];

  const A = () => `<section class="sec ow2A" id="work-photos" aria-labelledby="ow2A-h">
    <div class="hd"><h2 class="sec-h" id="ow2A-h" data-split>The photographs.</h2><p class="sec-p">Eight of our documented jobs, as photographed. Choose one to see it large.</p></div>
    <ul class="gal">${IDX.map((i, k) => `<li><button type="button" data-k="${k}" aria-label="Open photo: ${B().esc(B().cap(i))}">${B().img(i)}</button><p>${B().cap(i)}</p></li>`).join('')}</ul>
    <dialog class="lbx" aria-label="Photo"><div class="lin">${IDX.map((i, k) => `<figure data-k="${k}" hidden>${B().img(i)}<figcaption>${B().cap(i)}</figcaption></figure>`).join('')}
      <div class="lctl"><button type="button" class="lp" aria-label="Previous photo">←</button><span class="lc" aria-live="polite"></span><button type="button" class="ln" aria-label="Next photo">→</button><button type="button" class="lx">Close</button></div></div></dialog></section>`;

  const FIL = [['All', ''], ['Siding', 'Siding'], ['Windows', 'Windows'], ['Roofing', 'Roofing'], ['Painting', 'Painting']];
  const Bv = () => `<section class="sec ow2B" id="work-photos" aria-labelledby="ow2B-h">
    <div class="hd"><h2 class="sec-h" id="ow2B-h" data-split>By the work done.</h2><p class="sec-p">Filter our job photos by what the record says was done.</p></div>
    <div class="ch4" role="radiogroup" aria-label="Work">${FIL.map(([t], k) => `<button type="button" role="radio" aria-checked="${!k}" tabindex="${k ? -1 : 0}" data-k="${k}">${t}</button>`).join('')}</div>
    <ul class="gr5" aria-live="polite">${IDX.map((i) => `<li data-t="${B().esc((J()[i] || {}).trades || '')}"><figure>${B().img(i)}<figcaption>${B().cap(i)}</figcaption></figure></li>`).join('')}</ul>
    <p class="cnt3" aria-live="polite"></p></section>`;

  const C = () => `<section class="sec ow2C" id="work-photos" aria-labelledby="ow2C-h">
    <div class="hd"><h2 class="sec-h" id="ow2C-h" data-split>Eight jobs, set wide.</h2></div>
    <div class="rows5">${IDX.map((i, k) => { const j = J()[i] || {}; const [h, t] = String(j.place || '').split(',').map((x) => x.trim());
      return `<article class="er ${k % 2 ? 'r' : ''}"><div class="im">${B().img(i)}</div><div class="tx2"><p class="no2">${String(k + 1).padStart(2, '0')}</p><h3>${B().esc(h || '')}</h3><p class="tw3">${B().esc(t || '')}</p><p class="wk5">${B().esc(j.trades || '')}</p><p class="mo">${B().esc(j.when || '')}</p></div></article>`; }).join('')}</div></section>`;

  function wireA(root) { const s = root.querySelector('.ow2A'); if (!s) return; const d = s.querySelector('dialog'), fs = [...d.querySelectorAll('figure')], lc = d.querySelector('.lc'), opens = [...s.querySelectorAll('.gal button')]; let k = 0, from = null;
    const show = (n) => { k = (n + fs.length) % fs.length; fs.forEach((f, j) => (f.hidden = j !== k)); lc.textContent = `${k + 1} of ${fs.length}`; };
    opens.forEach((b) => b.addEventListener('click', () => { from = b; show(+b.dataset.k); if (d.showModal) d.showModal(); else d.setAttribute('open', ''); d.querySelector('.ln').focus(); }));
    d.querySelector('.lp').addEventListener('click', () => show(k - 1)); d.querySelector('.ln').addEventListener('click', () => show(k + 1));
    d.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') show(k - 1); if (e.key === 'ArrowRight') show(k + 1); });
    const close = () => { if (d.close) d.close(); else d.removeAttribute('open'); };
    d.querySelector('.lx').addEventListener('click', close); d.addEventListener('close', () => { if (from) from.focus(); }); d.addEventListener('click', (e) => { if (e.target === d) close(); }); }
  function wireB(root) { const s = root.querySelector('.ow2B'); if (!s) return; const bs = [...s.querySelectorAll('.ch4 button')], li = [...s.querySelectorAll('.gr5 li')], cnt = s.querySelector('.cnt3');
    const set = (k, f) => { bs.forEach((b, j) => { b.setAttribute('aria-checked', j === k); b.tabIndex = j === k ? 0 : -1; }); if (f) bs[k].focus(); const t = FIL[k][1]; let n = 0;
      li.forEach((x) => { const on = !t || x.dataset.t.includes(t); x.hidden = !on; n += on; }); cnt.textContent = t ? `${n} of our 8 job photos include ${FIL[k][0].toLowerCase()}.` : 'All eight job photos.'; };
    bs.forEach((b, k) => { b.addEventListener('click', () => set(k)); b.addEventListener('keydown', (e) => { const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]; if (d) { e.preventDefault(); set((k + d + bs.length) % bs.length, true); } }); }); set(0); }
  return { A, B: Bv, C, wire(root) { wireA(root); wireB(root); } };
})();
