/* ABOUT PAGE · 1 Opener (the page's one h1). The locked history only, as worded on the homepage: since 2009; merged with
   Sanders Roofing & Exteriors in 2018; "Siding, windows and roofing for Austin homes since 2009." Today's marks: 4.9 from
   474 Google reviews; 886 documented projects since 2018: 312 on the map with photos + 574 more counted. Nothing between
   2009 and 2018 is invented.
   A — since 2009 (Dropbox Brand: one number). The year set huge, the h1 and the merger line under it.
   B — two become one (Scout Motors: heritage, drawn plainly). Two lines, Austin Pro from 2009 and Sanders Roofing &
       Exteriors, meeting in 2018 as Austin Pro Siding, Windows & Roofing.
   C — the years (Apple AirPods Pro: one measured line). A ruler from 2009 to today with only the locked marks on it. */
window.PAb1 = (function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const B = () => window.PB;
  const LOCK = '886 documented projects since 2018: 312 on the map with photos + 574 more counted.';

  const A = () => `<section class="sec ab1A" id="about-top" aria-labelledby="ab1A-h">
    <p class="y2009" aria-hidden="true">2009</p>
    <p class="pkick">About Austin Pro</p><h1 class="sec-h" id="ab1A-h" data-split>Siding, windows and roofing for Austin homes since 2009.</h1>
    <p class="mg">Merged with Sanders Roofing &amp; Exteriors in 2018.</p><div class="pacts">${B().book()}${B().call()}</div></section>`;

  const Bv = () => `<section class="sec ab1B" id="about-top" aria-labelledby="ab1B-h">
    <p class="pkick">About Austin Pro</p><h1 class="sec-h" id="ab1B-h" data-split>Two firms, one company since 2018.</h1>
    <div class="mrg" data-solid><svg viewBox="0 0 1000 260" preserveAspectRatio="none" aria-hidden="true"><path class="l1" d="M20 60H560C640 60 640 130 720 130H980" pathLength="1"/><path class="l2" d="M300 200H560C640 200 640 130 720 130" pathLength="1"/></svg>
      <p class="n1"><b>Austin Pro</b><span>since 2009</span></p><p class="n2"><b>Sanders Roofing &amp; Exteriors</b></p><p class="n3"><b>2018</b><span>Merged</span></p></div>
    <p class="sub3">Since 2009; merged with Sanders Roofing &amp; Exteriors in 2018.</p></section>`;

  const X = (y) => (((y - 2009) / (2026 - 2009)) * 100).toFixed(2) + '%';
  const C = () => `<section class="sec ab1C" id="about-top" aria-labelledby="ab1C-h">
    <p class="pkick">About Austin Pro</p><h1 class="sec-h" id="ab1C-h" data-split>From 2009 to today.</h1>
    <div class="rul2" data-solid><i class="ln7"></i>${Array.from({ length: 18 }, (_, k) => `<span class="tk6 ${k % 3 ? '' : 'mj'}" style="left:${X(2009 + k)}">${k % 3 ? '' : 2009 + k}</span>`).join('')}
      <div class="mk3" style="left:${X(2009)}"><b>2009</b><span>Austin Pro begins</span></div><div class="mk3 up4" style="left:${X(2018)}"><b>2018</b><span>Merged with Sanders Roofing &amp; Exteriors</span></div>
      <div class="mk3 now" style="left:100%"><b>Today</b><span>4.9 from 474 Google reviews</span></div></div>
    <p class="sub3">${LOCK}</p><div class="pacts">${B().book()}</div></section>`;

  function wireB(root) { const s = root.querySelector('.ab1B'); if (!s) return; if (RM) { s.classList.add('go'); return; }
    new IntersectionObserver((es, io) => es.forEach((e) => { if (e.isIntersecting) { io.disconnect(); s.classList.add('go'); } }), { threshold: 0.4 }).observe(s.querySelector('.mrg')); }
  function wireC(root) { const s = root.querySelector('.ab1C'); if (!s) return; if (RM) { s.classList.add('go'); return; }
    new IntersectionObserver((es, io) => es.forEach((e) => { if (e.isIntersecting) { io.disconnect(); s.classList.add('go'); } }), { threshold: 0.4 }).observe(s.querySelector('.rul2')); }
  return { A, B: Bv, C, wire(root) { wireB(root); wireC(root); } };
})();
