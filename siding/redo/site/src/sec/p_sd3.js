/* SIDING PAGE · 3 What siding costs here. Only the band already published on the homepage: from 415 priced siding jobs,
   2022–2026, materials and labour, before tax: middle half of jobs $5k–$20k, median band $10k–$15k. No other figure.
   A — the price tag (Cowboy: warmth, a physical object). A hanging tag with the median band; turn it over for how it was
       measured and the middle half.
   B — the column (Apple AirPods Pro: one measured scale). A tall $0–$30k column; the middle half and the median band rise
       into place as it arrives, labelled on the scale itself.
   C — one sentence (Dropbox Brand: subtraction). The band said in one plain sentence; each term ("priced job", "middle
       half", "median band") opens a short note on what it means. */
window.PSd3 = (function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const B = () => window.PB;
  const SRC = 'From 415 priced siding jobs, 2022–2026: materials and labour, before tax.';

  /* ---------- A ---------- */
  const A = () => `<section class="sec sd3A" id="siding-cost" aria-labelledby="sd3A-h">
    <div class="txt"><h2 class="sec-h" id="sd3A-h" data-split>What siding costs here.</h2><p class="sec-p">Not a quote: what our own priced jobs came to. Turn the tag over for how it was measured.</p>
      <p class="nx3">Your own price comes from the free inspection: an itemised price for the work you want.</p><div class="pacts">${B().book()}${B().call()}</div></div>
    <div class="tagw"><span class="str" aria-hidden="true"></span><button type="button" class="tag3" aria-pressed="false" aria-label="Price tag. Median band $10k–$15k. Turn over for details.">
      <span class="fc3 fr4"><i class="hole"></i><small>Median band</small><b>$10k–$15k</b><span>siding, per job</span><em>Turn over</em></span>
      <span class="fc3 bk3"><i class="hole"></i><small>How it was measured</small><span>${SRC}</span><span class="mh"><b>$5k–$20k</b> middle half of jobs</span><em>Turn back</em></span></button></div></section>`;

  /* ---------- B ---------- */
  const Y = (v) => `${100 - (v / 30) * 100}%`;
  const Bv = () => `<section class="sec sd3B" id="siding-cost" aria-labelledby="sd3B-h">
    <div class="hd"><h2 class="sec-h" id="sd3B-h" data-split>Where siding jobs land.</h2><p class="sec-p">${SRC}</p></div>
    <div class="wrap"><div class="col" data-solid role="img" aria-label="Scale from $0 to $30k. Middle half of jobs: $5k to $20k. Median band: $10k to $15k.">
        ${[0, 5, 10, 15, 20, 25, 30].map((v) => `<span class="tk4" style="top:${Y(v)}">$${v}k</span>`).join('')}
        <i class="mh2" style="top:${Y(20)};bottom:${(5 / 30) * 100}%"></i><i class="md2" style="top:${Y(15)};bottom:${(10 / 30) * 100}%"></i></div>
      <div class="lbls"><div class="l1"><b>$10k–$15k</b><span>Median band: the band the middle job falls in.</span></div><div class="l2"><b>$5k–$20k</b><span>Middle half of jobs: half of all priced siding jobs fell in here.</span></div>
        <p class="l3">Your own number comes from the free inspection.</p><div class="pacts">${B().book()}</div></div></div></section>`;

  /* ---------- C ---------- */
  const NOTES = { pj: 'A finished job with a recorded price for its siding. There are 415 of them, 2022–2026.', mh: 'Line all 415 jobs up by price: the middle half of them ran from $5k to $20k.', mb: 'The price band the middle job falls in: $10k to $15k.', inc: 'Materials and labour, before tax.' };
  const t = (k, w) => `<button type="button" class="tm" aria-expanded="false" aria-controls="sd3C-${k}" data-k="${k}">${w}</button>`;
  const C = () => `<section class="sec sd3C" id="siding-cost" aria-labelledby="sd3C-h">
    <h2 class="pkick" id="sd3C-h">What siding costs here</h2>
    <p class="sent">Across 415 ${t('pj', 'priced siding jobs')}, the ${t('mh', 'middle half')} came in between <b>$5k and $20k</b>, and the ${t('mb', 'median band')} was <b>$10k–$15k</b>, ${t('inc', 'all in')}.</p>
    <div class="notes">${Object.entries(NOTES).map(([k, v]) => `<p class="nt3" id="sd3C-${k}" hidden>${v}</p>`).join('')}</div>
    <div class="ft5"><p>Your own price comes from the free inspection.</p><div class="pacts">${B().book()}${B().call()}</div></div></section>`;

  function wireA(root) { const s = root.querySelector('.sd3A'); if (!s) return; const b = s.querySelector('.tag3');
    b.addEventListener('click', () => { const on = b.getAttribute('aria-pressed') !== 'true'; b.setAttribute('aria-pressed', on); b.setAttribute('aria-label', on ? `How it was measured. ${SRC} Middle half of jobs $5k–$20k. Turn back.` : 'Price tag. Median band $10k–$15k. Turn over for details.'); }); }
  function wireB(root) { const s = root.querySelector('.sd3B'); if (!s) return; if (RM) { s.classList.add('up'); return; }
    new IntersectionObserver((es, io) => es.forEach((e) => { if (e.isIntersecting) { io.disconnect(); s.classList.add('up'); } }), { threshold: 0.35 }).observe(s.querySelector('.col')); }
  function wireC(root) { const s = root.querySelector('.sd3C'); if (!s) return; const bs = [...s.querySelectorAll('.tm')];
    bs.forEach((b) => b.addEventListener('click', () => { const open = b.getAttribute('aria-expanded') !== 'true'; bs.forEach((x) => { x.setAttribute('aria-expanded', x === b && open); s.querySelector('#sd3C-' + x.dataset.k).hidden = !(x === b && open); }); })); }
  return { A, B: Bv, C, wire(root) { wireA(root); wireB(root); wireC(root); } };
})();
