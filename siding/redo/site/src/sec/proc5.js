/* PROCESS I and J (overnight ladder, Round 22). The firm's four steps (Proc.CH), its hours and FACTS.md figures only
   (Proc2.FIGS); no new claims.
   I — your part, and ours (Cash App Brand Guidelines: a clear binary, bold blocks). Each step split into two lanes, what
       the homeowner does and what the firm does; a three-way switch (Both / Your part / Our part) narrows the view.
   J — the job in four numbers (Apple AirPods Pro: one huge figure per moment). One giant figure per step, revealed as it
       arrives; tap a figure to turn it over to the step's other figure. */
window.Proc5 = (function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const BOOK = 'https://www.austinprosiding.com/schedule-appointment';
  const CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4"/></svg>';
  const book = `<a class="btn key" href="${BOOK}">Book a free inspection<span class="tab">${CAL}</span></a>`;
  const CH = () => (window.Proc ? Proc.CH : []);
  const FG = () => (window.Proc2 ? Proc2.FIGS : []);

  /* ---------- I ---------- */
  const LANES = [
    ['Pick a time that suits you: Mon–Fri 8–8, Sat 8–6, Sun 12–5.', 'A project manager walks every side of the house: siding, trim, windows, roof and gutters. One visit covers every trade.'],
    ['Choose the work you want.', 'An itemised price for that work and nothing else. Across 415 priced siding jobs the median band is $10k–$15k.'],
    ['Watch the house change.', 'Old material off, new boards up, trim and paint: 1–2 weeks on site for siding. Most window-only jobs take 2 days.'],
    ['Walk the finished job with us.', 'Clear the punch list and leave the site clean. Then the warranties start: lifetime on labor, 30 years non-prorated on James Hardie siding.']];
  const VIEWS = [['both', 'Both'], ['you', 'Your part'], ['us', 'Our part']];
  const I = () => `<section class="sec pcI" id="process" data-view="both" aria-labelledby="pcI-h">
    <div class="hd"><h2 class="sec-h" id="pcI-h" data-split>Your part, and ours.</h2><p class="sec-p">Four steps. Here is who does what in each.</p></div>
    <div class="vsw" role="radiogroup" aria-label="Show">${VIEWS.map(([k, t], i) => `<button type="button" role="radio" data-v="${k}" aria-checked="${!i}" tabindex="${i ? -1 : 0}">${t}</button>`).join('')}</div>
    <div class="lanes"><div class="lh" aria-hidden="true"><span class="ly">You</span><span></span><span class="lu">Austin Pro</span></div>
      ${CH().map((c, i) => `<div class="row"><p class="you"><b class="lt">You</b>${LANES[i][0]}</p><p class="spn"><b>${c.n}</b><span>${c.t}</span></p><p class="us"><b class="lt">Austin Pro</b>${LANES[i][1]}</p></div>`).join('')}</div>
    <div class="ifoot"><p>Your first part is a phone call: <a href="tel:+15125500000">(512) 550-0000</a>.</p>${book}</div></section>`;

  function wireI(root) {
    const s = root.querySelector('.pcI'); if (!s) return; const bs = [...s.querySelectorAll('.vsw button')];
    const set = (i, f) => { bs.forEach((b, k) => { b.setAttribute('aria-checked', k === i); b.tabIndex = k === i ? 0 : -1; }); s.dataset.view = bs[i].dataset.v; if (f) bs[i].focus(); };
    bs.forEach((b, i) => { b.addEventListener('click', () => set(i)); b.addEventListener('keydown', (e) => { const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]; if (d) { e.preventDefault(); set((i + d + bs.length) % bs.length, true); } }); });
    const rows = [...s.querySelectorAll('.row')];
    if (RM) rows.forEach((r) => r.classList.add('on')); else { const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { io.unobserve(e.target); e.target.classList.add('on'); } }), { threshold: 0.3 }); rows.forEach((r) => io.observe(r)); }
  }

  /* ---------- J ---------- */
  // which figure leads each step: the most telling one first
  const LEAD = [0, 0, 0, 1];
  const J = () => { const F = FG(); return `<section class="sec pcJ" id="process" aria-labelledby="pcJ-h">
    <div class="hd"><h2 class="sec-h" id="pcJ-h" data-split>The job in four numbers.</h2><p class="sec-p">One figure for each step. Tap a figure to turn it over.</p></div>
    <ol class="nums">${CH().map((c, i) => { const a = (F[i] || [])[LEAD[i]] || ['', ''], b = (F[i] || [])[1 - LEAD[i]] || ['', ''];
      return `<li class="nr"><p class="sl"><b>${c.n}</b>${c.t}</p><button type="button" class="fl" aria-pressed="false" aria-label="${c.t}: ${a[0]}, ${a[1]}. Show the other figure"><span class="mask"><span class="roll"><span class="fa">${a[0]}</span><span class="fb">${b[0]}</span></span></span></button>
        <p class="cap" aria-live="polite"><span class="ca">${a[1]}</span><span class="cb" hidden>${b[1]}</span></p></li>`; }).join('')}</ol>
    <div class="jfoot"><p>It starts with one call: <a href="tel:+15125500000">(512) 550-0000</a>. Mon–Fri 8–8, Sat 8–6, Sun 12–5.</p>${book}</div></section>`; };

  function wireJ(root) {
    const s = root.querySelector('.pcJ'); if (!s) return; const F = FG();
    s.querySelectorAll('.nr').forEach((r, i) => { const b = r.querySelector('.fl'), ca = r.querySelector('.ca'), cb = r.querySelector('.cb'), t = CH()[i].t;
      const A = F[i][LEAD[i]], B = F[i][1 - LEAD[i]];
      b.addEventListener('click', () => { const on = b.getAttribute('aria-pressed') !== 'true'; b.setAttribute('aria-pressed', on); ca.hidden = on; cb.hidden = !on;
        const x = on ? B : A; b.setAttribute('aria-label', `${t}: ${x[0]}, ${x[1]}. Show the other figure`); }); });
    const rows = [...s.querySelectorAll('.nr')];
    if (RM) rows.forEach((r) => r.classList.add('on')); else { const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { io.unobserve(e.target); e.target.classList.add('on'); } }), { threshold: 0.4 }); rows.forEach((r) => io.observe(r)); }
  }
  return { I, J, wire(root) { wireI(root); wireJ(root); } };
})();
