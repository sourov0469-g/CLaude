/* WINDOWS & DOORS PAGE · 4 How a window goes in. As published: each opening measured; windows built to order, then set
   and sealed; 2 days on site for most window-only jobs. Verbatim review lines (checked against the published reviews at
   build time): Sara Helms "It took about 6 weeks for measuring, ordering and installing." · Charles Statler "Austin pro
   just finished my windows in one day!"
   A — three steps, two voices (Graza: the custom-animation bar). Measure, built to order, set and sealed, each with a
       small line drawing that draws in; two homeowners' own words beside them.
   B — weeks, then days (Apple AirPods Pro: one comparison). A calendar of about six weeks, in one homeowner's words, set
       against the two days on site that most window-only jobs take.
   C — step through it (Scout Motors: honest mechanics). One drawn opening; four buttons add each stage to the drawing:
       measure, the unit built to order, set, sealed. Not a game: nothing to win, just the order of work. */
window.PWd4 = (function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const B = () => window.PB;
  const p = (d, t) => `<path d="${d}" pathLength="1" style="--d:${t}s"/>`;
  const ICO = [`<svg viewBox="0 0 120 90" aria-hidden="true">${p('M20 10h80v70H20z', 0)}${p('M20 88h80M20 84v8M100 84v8', .3)}${p('M8 10v70M4 10h8M4 80h8', .5)}</svg>`,
    `<svg viewBox="0 0 120 90" aria-hidden="true">${p('M24 12h72v66H24z', 0)}${p('M32 20h56v50H32z', .25)}${p('M60 20v50M32 45h56', .5)}</svg>`,
    `<svg viewBox="0 0 120 90" aria-hidden="true">${p('M14 8h92v74H14z', 0)}${p('M22 16h76v58H22z', .25)}${p('M18 12h84v66H18z', .5)}</svg>`];
  const STEPS = [['Measured', 'Each opening is measured before anything is ordered.'], ['Built to order', 'The windows are made to those measurements.'], ['Set and sealed', 'Fitted in the opening, then sealed. Most window-only jobs: 2 days on site.']];

  const A = () => `<section class="sec wd4A" id="windows-install" aria-labelledby="wd4A-h">
    <div class="hd"><h2 class="sec-h" id="wd4A-h" data-split>How a window goes in.</h2></div>
    <div class="wrap"><ol class="st4">${STEPS.map(([t, d], i) => `<li style="--i:${i}"><span class="ic">${ICO[i]}</span><b><em>0${i + 1}</em>${t}</b><p>${d}</p></li>`).join('')}</ol>
      <div class="vo">${B().quote(19, 'It took about 6 weeks for measuring, ordering and installing.')}${B().quote(28, 'Austin pro just finished my windows in one day!')}</div></div></section>`;

  const Bv = () => `<section class="sec wd4B" id="windows-install" aria-labelledby="wd4B-h">
    <div class="hd"><h2 class="sec-h" id="wd4B-h" data-split>Weeks to make, days to fit.</h2><p class="sec-p">The windows are built to order first. Then, for most window-only jobs, 2 days on site.</p></div>
    <div class="two4"><div class="cal" data-solid><p class="pkick">Measuring, ordering and installing</p><div class="grid4" aria-hidden="true">${Array.from({ length: 42 }, (_, i) => `<i style="--i:${i}"></i>`).join('')}</div>
        ${B().quote(19, 'It took about 6 weeks for measuring, ordering and installing.', 'pq2 sm')}</div>
      <div class="days" data-solid><p class="pkick">On site</p><div class="d2" aria-hidden="true"><i></i><i></i></div><p class="big3"><b>2 days</b> for most window-only jobs</p>
        ${B().quote(28, 'Austin pro just finished my windows in one day!', 'pq2 sm')}</div></div></section>`;

  const SG = [['m', 'Measure'], ['b', 'Built to order'], ['s', 'Set'], ['c', 'Sealed']];
  const C = () => `<section class="sec wd4C" id="windows-install" aria-labelledby="wd4C-h">
    <div class="hd"><h2 class="sec-h" id="wd4C-h" data-split>Step through it.</h2><p class="sec-p">One opening, in the order we work. Choose each stage.</p></div>
    <div class="wrap"><svg class="op4" viewBox="0 0 400 320" aria-hidden="true" data-at="0">
        <rect width="400" height="320" class="wl3"/>${Array.from({ length: 14 }, (_, i) => `<path d="M0 ${12 + i * 23}H400" class="lp3"/>`).join('')}<rect x="110" y="50" width="180" height="220" class="ro"/>
        <g class="g-m"><path d="M110 34h180M110 28v12M290 28v12"/><path d="M92 50v220M86 50h12M86 270h12"/><text x="200" y="24">width</text><text x="78" y="164" transform="rotate(-90 78 164)">height</text></g>
        <g class="g-b"><rect x="296" y="60" width="90" height="110" class="u"/><rect x="305" y="69" width="72" height="92" class="gl4"/><text x="341" y="190">built to order</text></g>
        <g class="g-s"><rect x="114" y="54" width="172" height="212" class="u"/><rect x="126" y="66" width="148" height="188" class="gl4"/><path d="M200 66v188" class="mu4"/></g>
        <g class="g-c"><rect x="111" y="51" width="178" height="218" class="bead2"/></g></svg>
      <div class="side"><div class="sg" role="group" aria-label="Stages">${SG.map(([k, t], i) => `<button type="button" aria-pressed="false" data-i="${i + 1}"><em>${i + 1}</em>${t}</button>`).join('')}</div>
        <p class="rd9" aria-live="polite">Start with the measuring.</p><p class="nt4">Most window-only jobs: 2 days on site.</p><div class="pacts">${B().book()}</div></div></div></section>`;

  function wireA(root) { const s = root.querySelector('.wd4A'); if (!s) return; if (RM) { s.classList.add('in'); return; }
    new IntersectionObserver((es, io) => es.forEach((e) => { if (e.isIntersecting) { io.disconnect(); s.classList.add('in'); } }), { threshold: 0.3 }).observe(s.querySelector('.st4')); }
  function wireB(root) { const s = root.querySelector('.wd4B'); if (!s) return; if (RM) { s.classList.add('in'); return; }
    new IntersectionObserver((es, io) => es.forEach((e) => { if (e.isIntersecting) { io.disconnect(); s.classList.add('in'); } }), { threshold: 0.3 }).observe(s.querySelector('.two4')); }
  const SAY = ['Each opening is measured before anything is ordered.', 'The unit is built to those measurements.', 'It is set in the opening.', 'Then it is sealed all round. Done.'];
  function wireC(root) { const s = root.querySelector('.wd4C'); if (!s) return; const svg = s.querySelector('.op4'), bs = [...s.querySelectorAll('.sg button')], rd = s.querySelector('.rd9');
    bs.forEach((b) => b.addEventListener('click', () => { const n = +b.dataset.i; svg.dataset.at = n; bs.forEach((x) => x.setAttribute('aria-pressed', +x.dataset.i <= n)); rd.textContent = SAY[n - 1]; })); }
  return { A, B: Bv, C, wire(root) { wireA(root); wireB(root); wireC(root); } };
})();
