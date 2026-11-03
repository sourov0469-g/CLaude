/* WINDOWS I and J (overnight ladder, Round 16 — Windows reaches 10). Quotes verbatim (build-checked); steps only as the
   firm itself describes the work ("measured, built to order, then set and sealed"; "our casing around the opening").
   I — a window of words (Cowboy: warmth; homeowners' own voices). A drawn four-pane window; each pane holds one line a
       customer wrote about their windows. Choose a pane and it fills the window; the others wait behind it.
   J — from opening to trim (Scout Motors: sequenced proof). A drawn wall opening, step by step: the old window comes out,
       the new one (built to order) is set, sealed, then trimmed. Step buttons or the slider move through it. */
window.Win5 = (function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const BOOK = 'https://www.austinprosiding.com/schedule-appointment';
  const CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4"/></svg>';
  const book = `<a class="btn key" href="${BOOK}">Book a free inspection<span class="tab">${CAL}</span></a>`;
  const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const Q = [[17, 'Wow what a difference our new windows have made, our home is so QUIET!'], [28, 'Austin pro just finished my windows in one day!'],
    [19, 'They were also the most affordable quote I received for very high quality windows.'], [23, 'Have used Austin Pro for 2 different window installation jobs.']];

  /* ---------- I ---------- */
  const I = () => { const R = window.__REV || [];
    return `<section class="sec wnI" id="windows" aria-labelledby="wnI-h">
      <div class="hd"><h2 class="sec-h" id="wnI-h" data-split>A window of words.</h2><p class="sec-p">Four things customers wrote about their new windows. Choose a pane to read it.</p></div>
      <div class="wrap"><div class="win" data-solid><div class="panes">${Q.map(([i, t], k) => { const r = R[i] || {}; return `<button type="button" class="pane p${k}" aria-pressed="false" data-k="${k}"><span class="q">“${esc(t)}”</span><span class="who">${esc(r.name || '')}, ${esc(r.source || 'Google review')}</span></button>`; }).join('')}</div><i class="mul v" aria-hidden="true"></i><i class="mul h" aria-hidden="true"></i></div>
        <div class="side"><p class="agg"><b>4.9</b> <span class="stars" aria-hidden="true">★★★★★</span> from 474 Google reviews</p><p class="sm">Excerpts, verbatim, from reviews published on our site.</p><dl class="fx"><div><dt>388</dt><dd>documented window jobs</dd></div><div><dt>2 days</dt><dd>most window-only jobs</dd></div></dl>${book}</div></div></section>`; };

  function wireI(root) {
    const s = root.querySelector('.wnI'); if (!s) return; const win = s.querySelector('.win'), ps = [...s.querySelectorAll('.pane')];
    ps.forEach((p) => p.addEventListener('click', () => { const on = p.getAttribute('aria-pressed') !== 'true'; ps.forEach((x) => x.setAttribute('aria-pressed', x === p && on)); win.dataset.open = on ? p.dataset.k : ''; }));
    s.addEventListener('keydown', (e) => { if (e.key === 'Escape' && win.dataset.open) { const p = ps[+win.dataset.open]; p.click(); p.focus(); } });
    if (RM) s.classList.add('in'); else new IntersectionObserver((es, io) => es.forEach((e) => { if (e.isIntersecting) { io.disconnect(); s.classList.add('in'); } }), { threshold: 0.3 }).observe(win);
  }

  /* ---------- J ---------- */
  const STEPS = [['The old window', 'Before: the old unit in its opening.'], ['Out it comes', 'The old window is taken out; the opening is checked.'],
    ['Set the new one', 'Measured at the inspection and built to order, the new window is set in the opening.'], ['Sealed', 'The gap around the frame is sealed against the weather.'],
    ['Trimmed', 'Our casing closes the opening to the siding, with a sill below.']];
  const J = () => `<section class="sec wnJ" id="windows" aria-labelledby="wnJ-h">
    <div class="hd"><h2 class="sec-h" id="wnJ-h" data-split>From opening to trim.</h2><p class="sec-p">How a replacement goes in, step by step. Most window-only jobs take 2 days.</p></div>
    <div class="wrap"><div class="op" data-solid data-s="0"><svg viewBox="0 0 520 420" aria-hidden="true">
        <defs><pattern id="wnJl" width="520" height="22" patternUnits="userSpaceOnUse"><rect width="520" height="22" fill="#CDC8BE"/><path d="M0 21H520" stroke="rgba(0,0,0,.18)" stroke-width="2"/></pattern></defs>
        <rect width="520" height="420" fill="url(#wnJl)"/><rect class="hole" x="150" y="80" width="220" height="260"/>
        <g class="old"><rect x="150" y="80" width="220" height="260" fill="#8A8277"/><rect x="164" y="94" width="192" height="110" fill="#6E7F86"/><rect x="164" y="216" width="192" height="110" fill="#6E7F86"/><path d="M160 210H360" stroke="#8A8277" stroke-width="12"/><path d="M170 120l60-20M175 250l50-18" stroke="#9AA7AC" stroke-width="3"/></g>
        <g class="new"><rect x="156" y="86" width="208" height="248" fill="#F6F4EF"/><rect x="170" y="100" width="180" height="104" fill="#A9C2D1"/><rect x="170" y="216" width="180" height="104" fill="#A9C2D1"/><rect x="164" y="204" width="192" height="12" fill="#F6F4EF"/><path d="M180 128l56-20M182 242l46-16" stroke="#fff" stroke-width="4" opacity=".7"/></g>
        <rect class="seal" x="152" y="82" width="216" height="256" pathLength="1"/>
        <g class="trim"><rect x="134" y="64" width="252" height="16" fill="#EDEAE3"/><rect x="134" y="64" width="16" height="284" fill="#EDEAE3"/><rect x="370" y="64" width="16" height="284" fill="#EDEAE3"/><rect x="120" y="340" width="280" height="14" fill="#E2DED5"/></g>
        <g class="lbl"><path d="M386 120h50" /><text x="440" y="124">casing</text><path d="M400 347h36"/><text x="440" y="351">sill</text></g></svg>
      <p class="cap" aria-live="polite"><b></b><span></span></p></div>
      <div class="side"><ol class="sts">${STEPS.map(([n], i) => `<li><button type="button" data-i="${i}" aria-pressed="${!i}"><span class="no">${i + 1}</span>${n}</button></li>`).join('')}</ol>
        <label class="rg"><span class="sr">Step</span><input type="range" min="0" max="${STEPS.length - 1}" step="1" value="0" aria-valuetext="${STEPS[0][0]}"></label>${book}</div></div></section>`;

  function wireJ(root) {
    const s = root.querySelector('.wnJ'); if (!s) return; const op = s.querySelector('.op'), bs = [...s.querySelectorAll('.sts button')], rg = s.querySelector('input[type=range]');
    const go = (i) => { op.dataset.s = i; bs.forEach((b, k) => b.setAttribute('aria-pressed', k === i)); rg.value = i; rg.setAttribute('aria-valuetext', STEPS[i][0]); s.querySelector('.cap b').textContent = `${i + 1}. ${STEPS[i][0]}`; s.querySelector('.cap span').textContent = STEPS[i][1]; };
    bs.forEach((b, i) => b.addEventListener('click', () => go(i))); rg.addEventListener('input', () => go(+rg.value)); go(0);
  }
  return { I, J, wire(root) { wireI(root); wireJ(root); }, Q };
})();
