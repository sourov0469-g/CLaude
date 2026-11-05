/* WINDOWS & DOORS PAGE · 3 What windows cost. Only the bands already published on the homepage: from 376 priced window
   jobs, 2022–2026, materials and labour, before tax: middle half $5k–$25k, median band $10k–$15k; Andersen jobs (38 priced):
   median band $20k–$25k.
   A — the window sticker (Scout Motors: honest labels). The figures set as the kind of label that comes stuck to a new
       window: ruled boxes, plain type, one big figure.
   B — the pane as the scale (Apple AirPods Pro: one measured object). A drawn window whose width is $0–$30k: the middle
       half is the tinted glass, the median band is the sash; the Andersen band can be laid over it.
   C — three plain questions (Erie Home, note only: FAQ grammar). What's typical, what's the usual range, and what about
       Andersen, each answered with one figure. */
window.PWd3 = (function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const B = () => window.PB;
  const SRC = 'From 376 priced window jobs, 2022–2026: materials and labour, before tax.';

  const A = () => `<section class="sec wd3A" id="windows-cost" aria-labelledby="wd3A-h">
    <div class="txt"><h2 class="sec-h" id="wd3A-h" data-split>What windows cost here.</h2><p class="sec-p">Not a quote: what our own priced window jobs came to. Your own price comes from the free inspection: an itemised price for the work you want.</p><div class="pacts">${B().book()}${B().call()}</div></div>
    <div class="stk"><p class="s1"><b>Austin Pro</b><span>Window jobs, as priced</span></p>
      <div class="s2"><small>Median band</small><b>$10k–$15k</b><span>per window job</span></div>
      <div class="s3"><div><small>Middle half of jobs</small><b>$5k–$25k</b></div><div><small>Andersen jobs, median band</small><b>$20k–$25k</b></div></div>
      <p class="s4">${SRC} Andersen: 38 priced jobs.</p></div></section>`;

  const X = (v) => ((v / 30) * 100).toFixed(2) + '%';
  const Bv = () => `<section class="sec wd3B" id="windows-cost" aria-labelledby="wd3B-h">
    <div class="hd"><h2 class="sec-h" id="wd3B-h" data-split>The price, across one window.</h2><p class="sec-p">${SRC} Read across the glass from $0 to $30k.</p></div>
    <div class="pane" role="img" aria-label="A window drawn as a scale from $0 to $30k. Middle half of window jobs $5k to $25k; median band $10k to $15k."><div class="gls2">
        <i class="mh3" style="left:${X(5)};width:${X(20)}"></i><i class="md3" style="left:${X(10)};width:${X(5)}"></i><i class="an" style="left:${X(20)};width:${X(5)}"></i></div>
      <div class="tks">${[0, 5, 10, 15, 20, 25, 30].map((v) => `<span style="left:${X(v)}">$${v}k</span>`).join('')}</div></div>
    <div class="key2"><p><i class="k1"></i><b>$5k–$25k</b> middle half of window jobs</p><p><i class="k2"></i><b>$10k–$15k</b> median band</p>
      <label class="an2"><input type="checkbox"> Show Andersen jobs: <b>$20k–$25k</b> median band (38 priced)</label></div></section>`;

  const QS = [['What does a typical window job cost?', '$10k–$15k', 'That is the median band: the band the middle job falls in.'], ['What is the usual range?', '$5k–$25k', 'Half of all 376 priced window jobs fell between these.'], ['And with Andersen windows?', '$20k–$25k', 'The median band across 38 priced Andersen jobs. We are an Andersen Certified Contractor, Premier.']];
  const C = () => `<section class="sec wd3C" id="windows-cost" aria-labelledby="wd3C-h">
    <div class="hd"><h2 class="sec-h" id="wd3C-h" data-split>Three plain questions.</h2><p class="sec-p">${SRC}</p></div>
    <ol class="qa">${QS.map(([q, a, n], i) => `<li style="--i:${i}"><p class="q">${q}</p><p class="a"><b>${a}</b><span>${n}</span></p></li>`).join('')}</ol>
    <div class="ft8"><p>Your own price comes from the free inspection.</p><div class="pacts">${B().book()}${B().call()}</div></div></section>`;

  function wireB(root) { const s = root.querySelector('.wd3B'); if (!s) return; const c = s.querySelector('.an2 input'); c.addEventListener('change', () => s.classList.toggle('and', c.checked));
    if (RM) { s.classList.add('up'); return; } new IntersectionObserver((es, io) => es.forEach((e) => { if (e.isIntersecting) { io.disconnect(); s.classList.add('up'); } }), { threshold: 0.4 }).observe(s.querySelector('.pane')); }
  function wireC(root) { const s = root.querySelector('.wd3C'); if (!s) return; if (RM) { s.classList.add('up'); return; }
    new IntersectionObserver((es, io) => es.forEach((e) => { if (e.isIntersecting) { io.disconnect(); s.classList.add('up'); } }), { threshold: 0.3 }).observe(s.querySelector('.qa')); }
  return { A, B: Bv, C, wire(root) { wireB(root); wireC(root); } };
})();
