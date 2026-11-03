/* SIDING PAGE · 2 The board. Product facts only as already published on the homepage (from 415 priced siding jobs):
   HardiePlank lap 8.25 in, 7 in exposure, 301 of 415 · Select Cedarmill 286 of 415 · Smooth 36 of 415 · board and batten
   27 of 415 (4 ft HardiePanel with 2.5 in battens) · ColorPlus baked on at the factory, 17 colours for Austin · painted on
   site from 1,700+ Sherwin-Williams colours, free colour matching. Not a configurator (that belongs to the Visualiser).
   A — the spec sheet (Cash App Brand Guidelines: the labelled spec). A drawn side section of lap boards with dimension
       lines, beside a spec table; pointing at a row lights its part of the drawing.
   B — the two faces (Apple AirPods Pro: one close-up, one comparison). Two drawn close-ups, Select Cedarmill and Smooth,
       split by a handle you drag (or move with the arrow keys); the counts sit under each side.
   C — 415 squares (Quiet Cubes: calm, one figure at a time). One square per priced siding job; choose a fact and that
       many squares light. Each figure is shown as "N of 415", never as a new number. */
window.PSd2 = (function () {
  const B = () => window.PB;
  const SPEC = [['board', 'Board', 'HardiePlank lap, 8.25 in', '301 of 415 priced jobs'], ['exp', 'Exposure', '7 in to the weather', 'the face you see on each course'],
    ['tex', 'Texture', 'Select Cedarmill or Smooth', '286 and 36 of 415'], ['bb', 'Or board and batten', '4 ft HardiePanel, 2.5 in battens', '27 of 415'],
    ['fin', 'Finish', 'ColorPlus, baked on at the factory', '17 colours for Austin'], ['pnt', 'Or painted on site', '1,700+ Sherwin-Williams colours', 'free colour matching']];

  /* ---------- A ---------- */
  function section() { let b = ''; for (let k = 0; k < 4; k++) { const y = 40 + k * 70; b += `<path d="M150 ${y}L232 ${y + 6}L232 ${y + 92}L150 ${y + 82}Z" class="bd5"/>`; }
    return `<svg class="sx" viewBox="0 0 400 420" aria-hidden="true"><rect x="110" y="20" width="40" height="390" class="stud"/><rect x="146" y="20" width="6" height="390" class="wrap2"/>
      <g class="brd">${b}</g><g class="tex" opacity="0">${[0, 1, 2, 3].map((k) => `<path d="M236 ${50 + k * 70}c4 10-2 22 2 34M240 ${60 + k * 70}c3 8-1 18 2 26" />`).join('')}</g>
      <g class="dim d-board"><path d="M260 40v92M254 40h12M254 132h12"/><text x="272" y="92">8.25 in</text></g>
      <g class="dim d-exp"><path d="M316 46v70M310 46h12M310 116h12"/><text x="328" y="86">7 in</text></g>
      <path class="fin" d="M232 46L232 392" /><g class="bbx" opacity="0"><rect x="30" y="120" width="60" height="150" class="pan"/><rect x="54" y="120" width="10" height="150" class="bat"/><text x="20" y="295">batten</text></g></svg>`; }
  const A = () => `<section class="sec sd2A" id="siding-board" aria-labelledby="sd2A-h">
    <div class="hd"><h2 class="sec-h" id="sd2A-h" data-split>The board, on paper.</h2><p class="sec-p">What went on most of the 415 priced siding jobs. Point at a line to see where it sits.</p></div>
    <div class="wrap">${section()}<table class="spec"><caption class="vh5">James Hardie siding as installed</caption><tbody>
      ${SPEC.map(([k, h, a, b]) => `<tr data-k="${k}" tabindex="0"><th scope="row">${h}</th><td><b>${a}</b><small>${b}</small></td></tr>`).join('')}</tbody></table></div></section>`;

  /* ---------- B ---------- */
  const grain = () => { let g = ''; for (let i = 0; i < 26; i++) { const y = 8 + i * 15; g += `<path d="M0 ${y}c80 ${(i % 3) - 1} 160 ${2 - (i % 4)} 240 ${(i % 2)}s160 -3 240 1 160 2 240 -1"/>`; } return g; };
  const face = (k) => `<svg viewBox="0 0 720 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="720" height="400" class="bs ${k}"/>${[0, 1, 2, 3, 4].map((i) => `<path d="M0 ${80 * i + 78}H720" class="lap"/><path d="M0 ${80 * i + 80}H720" class="lap2"/>`).join('')}${k === 'ced' ? `<g class="gr">${grain()}</g>` : ''}</svg>`;
  const Bv = () => `<section class="sec sd2B" id="siding-board" aria-labelledby="sd2B-h">
    <div class="hd"><h2 class="sec-h" id="sd2B-h" data-split>Two faces of the same board.</h2><p class="sec-p">Drag the handle to compare. Both are HardiePlank lap, 7 in to the weather.</p></div>
    <div class="cmp" data-solid style="--x:50%"><div class="f1">${face('ced')}</div><div class="f2">${face('smo')}</div>
      <span class="lb1">Select Cedarmill</span><span class="lb2">Smooth</span>
      <div class="hn" role="slider" tabindex="0" aria-label="Compare textures" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50" aria-valuetext="Half Cedarmill, half Smooth"><i></i></div></div>
    <div class="two3"><p><b>286 of 415</b> priced siding jobs chose Select Cedarmill, the wood-grain texture.</p><p><b>36 of 415</b> went smooth.</p></div>
    <p class="fn">Either face takes ColorPlus (17 colours for Austin, baked on at the factory) or paint on site from 1,700+ Sherwin-Williams colours.</p></section>`;

  /* ---------- C ---------- */
  const FACTS = [[301, 'HardiePlank lap, 8.25 in, 7 in exposure'], [286, 'Select Cedarmill texture'], [36, 'Smooth texture'], [27, 'Board and batten']];
  const C = () => `<section class="sec sd2C" id="siding-board" aria-labelledby="sd2C-h">
    <div class="hd"><h2 class="sec-h" id="sd2C-h" data-split>415 jobs, one square each.</h2><p class="sec-p">Every priced siding job was James Hardie fiber cement. Choose a fact to see how many jobs it covers.</p></div>
    <div class="ch3" role="radiogroup" aria-label="Fact">${FACTS.map(([n, t], i) => `<button type="button" role="radio" aria-checked="${!i}" tabindex="${i ? -1 : 0}" data-n="${n}"><b>${n} of 415</b><span>${t}</span></button>`).join('')}</div>
    <div class="grid3" aria-hidden="true">${'<i></i>'.repeat(415)}</div>
    <p class="rd6" aria-live="polite"><b>301 of 415</b> priced siding jobs: HardiePlank lap, 8.25 in, 7 in exposure.</p></section>`;

  function wireA(root) { const s = root.querySelector('.sd2A'); if (!s) return; const svg = s.querySelector('.sx');
    const on = (k) => { svg.dataset.k = k || ''; s.querySelectorAll('tr').forEach((r) => r.classList.toggle('on', r.dataset.k === k)); };
    s.querySelectorAll('tr').forEach((r) => { r.addEventListener('pointerenter', () => on(r.dataset.k)); r.addEventListener('focus', () => on(r.dataset.k)); r.addEventListener('click', () => on(r.dataset.k)); });
    s.querySelector('tbody').addEventListener('pointerleave', () => on('')); }
  function wireB(root) { const s = root.querySelector('.sd2B'); if (!s) return; const c = s.querySelector('.cmp'), h = s.querySelector('.hn');
    const set = (p) => { p = Math.max(0, Math.min(100, p)); c.style.setProperty('--x', p + '%'); h.setAttribute('aria-valuenow', Math.round(p)); h.setAttribute('aria-valuetext', p > 85 ? 'All Cedarmill' : p < 15 ? 'All Smooth' : `${Math.round(p)}% Cedarmill, ${100 - Math.round(p)}% Smooth`); };
    let drag = false; const at = (e) => { const r = c.getBoundingClientRect(); set(((e.clientX - r.left) / r.width) * 100); };
    c.addEventListener('pointerdown', (e) => { drag = true; c.setPointerCapture(e.pointerId); at(e); }); c.addEventListener('pointermove', (e) => drag && at(e)); c.addEventListener('pointerup', () => (drag = false)); c.addEventListener('pointercancel', () => (drag = false));
    h.addEventListener('keydown', (e) => { const v = +h.getAttribute('aria-valuenow'), d = { ArrowRight: 5, ArrowUp: 5, ArrowLeft: -5, ArrowDown: -5 }[e.key]; if (d) { e.preventDefault(); set(v + d); } if (e.key === 'Home') { e.preventDefault(); set(0); } if (e.key === 'End') { e.preventDefault(); set(100); } }); }
  function wireC(root) { const s = root.querySelector('.sd2C'); if (!s) return; const bs = [...s.querySelectorAll('.ch3 button')], sq = [...s.querySelectorAll('.grid3 i')], rd = s.querySelector('.rd6');
    const set = (i, f) => { bs.forEach((b, k) => { b.setAttribute('aria-checked', k === i); b.tabIndex = k === i ? 0 : -1; }); if (f) bs[i].focus(); const n = +bs[i].dataset.n;
      sq.forEach((q, k) => { q.classList.toggle('on', k < n); q.style.transitionDelay = (k < n ? (k / n) * 0.6 : 0).toFixed(3) + 's'; }); rd.innerHTML = `<b>${n} of 415</b> priced siding jobs: ${FACTS[i][1]}.`; };
    bs.forEach((b, i) => { b.addEventListener('click', () => set(i)); b.addEventListener('keydown', (e) => { const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]; if (d) { e.preventDefault(); set((i + d + bs.length) % bs.length, true); } }); });
    set(0); }
  return { A, B: Bv, C, wire(root) { wireA(root); wireB(root); wireC(root); } };
})();
