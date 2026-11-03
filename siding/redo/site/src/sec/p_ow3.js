/* OUR WORK PAGE · 3 By trade. Documented projects per trade exactly as published on the homepage: Siding 431 · Windows 388 ·
   Exterior painting 320 · Shingle roofing 210 · Gutters 121 · Exterior doors 109 · Patio covers 34 · Metal roofing 31 ·
   Garage doors 9. A project with several trades counts in each, so these are not added up anywhere.
   A — the ladder (Dropbox Brand: one bold chart). Nine ranked bars that grow in as they arrive.
   B — blocks by size (Cash App Brand Guidelines: tiles). Nine tiles whose areas follow their counts; choose one to read it.
   C — nine trades, nine lines (Cowboy: warm, drawn). One line per trade with a small drawn icon and its count. */
window.POw3 = (function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const B = () => window.PB;
  const T = [['Siding', 431, 'sd'], ['Windows', 388, 'wn'], ['Exterior painting', 320, 'pt'], ['Shingle roofing', 210, 'rf'], ['Gutters', 121, 'gt'], ['Exterior doors', 109, 'dr'], ['Patio covers', 34, 'pc'], ['Metal roofing', 31, 'mr'], ['Garage doors', 9, 'gd']];
  const NOTE = 'Documented projects per trade. A project with several trades counts once in each.';
  const ICO = { sd: '<path d="M3 7h18M3 12h18M3 17h18"/>', wn: '<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M12 3v18M5 12h14"/>', pt: '<path d="M4 4h12v6H4zM10 10v3M8 13h4v8H8z"/>',
    rf: '<path d="M2 13L12 4l10 9M6 10v10h12V10"/>', gt: '<path d="M3 7v4a3 3 0 003 3h12a3 3 0 003-3V7M18 14v6"/>', dr: '<rect x="6" y="2" width="12" height="20" rx="1"/><circle cx="15" cy="12" r="1"/>',
    pc: '<path d="M2 8h20M4 8v12M20 8v12M2 8l3-4h14l3 4"/>', mr: '<path d="M2 13L12 4l10 9M7 9v11M12 5v15M17 9v11"/>', gd: '<rect x="3" y="6" width="18" height="15"/><path d="M3 10h18M3 14h18M3 18h18"/>' };
  const ico = (k) => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICO[k]}</svg>`;

  const A = () => `<section class="sec ow3A" id="work-trades" aria-labelledby="ow3A-h">
    <div class="hd"><h2 class="sec-h" id="ow3A-h" data-split>What we do, by the numbers.</h2><p class="sec-p">${NOTE}</p></div>
    <ol class="lad">${T.map(([t, n], i) => `<li style="--w:${((n / 431) * 100).toFixed(2)}%;--i:${i}"><span class="tn2">${t}</span><span class="bar5"><i></i></span><b>${n}</b></li>`).join('')}</ol></section>`;

  const Bv = () => `<section class="sec ow3B" id="work-trades" aria-labelledby="ow3B-h">
    <div class="hd"><h2 class="sec-h" id="ow3B-h" data-split>Nine trades, sized by our records.</h2><p class="sec-p">${NOTE} Each tile's size follows its count.</p></div>
    <div class="blk" role="radiogroup" aria-label="Trade">${T.map(([t, n, k], i) => `<button type="button" role="radio" aria-checked="${!i}" tabindex="${i ? -1 : 0}" data-i="${i}" style="flex-grow:${n};flex-basis:${Math.max(90, Math.round(Math.sqrt(n) * 14))}px">${ico(k)}<b>${n}</b><span>${t}</span></button>`).join('')}</div>
    <p class="rd11" aria-live="polite"></p></section>`;

  const C = () => `<section class="sec ow3C" id="work-trades" aria-labelledby="ow3C-h">
    <div class="hd"><h2 class="sec-h" id="ow3C-h" data-split>Nine trades, nine lines.</h2><p class="sec-p">${NOTE}</p></div>
    <ul class="ln5">${T.map(([t, n, k]) => `<li><span class="ic2">${ico(k)}</span><span class="tt2">${t}</span><i aria-hidden="true"></i><b>${n}</b></li>`).join('')}</ul>
    <div class="pacts">${B().book()}</div></section>`;

  function wireA(root) { const s = root.querySelector('.ow3A'); if (!s) return; if (RM) { s.classList.add('grow'); return; }
    new IntersectionObserver((es, io) => es.forEach((e) => { if (e.isIntersecting) { io.disconnect(); s.classList.add('grow'); } }), { threshold: 0.3 }).observe(s.querySelector('.lad')); }
  function wireB(root) { const s = root.querySelector('.ow3B'); if (!s) return; const bs = [...s.querySelectorAll('.blk button')], rd = s.querySelector('.rd11');
    const set = (i, f) => { bs.forEach((b, k) => { b.setAttribute('aria-checked', k === i); b.tabIndex = k === i ? 0 : -1; }); if (f) bs[i].focus(); rd.innerHTML = `<b>${T[i][1]}</b> documented ${T[i][0].toLowerCase()} projects.`; };
    bs.forEach((b, i) => { b.addEventListener('click', () => set(i)); b.addEventListener('keydown', (e) => { const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]; if (d) { e.preventDefault(); set((i + d + bs.length) % bs.length, true); } }); }); set(0); }
  return { A, B: Bv, C, wire(root) { wireA(root); wireB(root); } };
})();
