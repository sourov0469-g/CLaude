/* PROCESS E and F (overnight ladder, Round 20). The firm's own four steps (Proc.CH), its hours, and FACTS.md figures only
   (Proc2.FIGS); the step drawings are the shared line drawings (Proc2.DR).
   E — turn the dial (Graza: the custom-animation bar). The four steps sit around a dial; drag the handle, use the arrow
       keys, or tap a step; the centre shows that step's drawing, words and figures.
   F — questions at each step (Erie Home, note only: FAQ grammar). The plain questions people ask at each step, answered
       with the firm's own lines and figures; nothing beyond them. */
window.Proc3 = (function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const BOOK = 'https://www.austinprosiding.com/schedule-appointment';
  const CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4"/></svg>';
  const book = `<a class="btn key" href="${BOOK}">Book a free inspection<span class="tab">${CAL}</span></a>`;
  const CH = () => (window.Proc ? Proc.CH : []);
  const P2 = () => window.Proc2 || { DR: () => '', FIGS: [] };
  const figs = (i) => `<dl class="pf">${(P2().FIGS[i] || []).map(([b, s]) => `<div><dt>${b}</dt><dd>${s}</dd></div>`).join('')}</dl>`;

  /* ---------- E ---------- */
  const E = () => `<section class="sec pcE" id="process" aria-labelledby="pcE-h">
    <div class="hd"><h2 class="sec-h" id="pcE-h" data-split>Four steps. Turn the dial.</h2><p class="sec-p">Drag the handle, use the arrow keys, or choose a step.</p></div>
    <div class="wrap"><div class="dial"><svg class="ring" viewBox="0 0 400 400" aria-hidden="true"><circle cx="200" cy="200" r="170" class="trk"/><circle cx="200" cy="200" r="170" class="val" pathLength="1"/>
        ${CH().map((c, i) => { const a = (i / 4) * 2 * Math.PI - Math.PI / 2, x = 200 + 170 * Math.cos(a), y = 200 + 170 * Math.sin(a); return `<g class="tk" data-i="${i}"><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="22"/><text x="${x.toFixed(1)}" y="${(y + 6).toFixed(1)}">${c.n}</text></g>`; }).join('')}</svg>
        <div class="hdl" role="slider" tabindex="0" aria-label="Step" aria-valuemin="1" aria-valuemax="4" aria-valuenow="1" aria-valuetext="${CH()[0] ? CH()[0].t : ''}"><i></i></div>
        <div class="ctr" aria-live="polite">${CH().map((c, i) => `<div class="cs" data-i="${i}" ${i ? 'hidden' : ''}><div class="dw ${i ? '' : 'in'}">${P2().DR(i)}</div><p class="k">Step ${c.n}</p><h3>${c.t}</h3></div>`).join('')}</div></div>
      <div class="side"><ol class="lst">${CH().map((c, i) => `<li><button type="button" data-i="${i}" aria-pressed="${!i}"><span class="no">${c.n}</span>${c.t}</button></li>`).join('')}</ol>
        ${CH().map((c, i) => `<div class="tx" data-i="${i}" ${i ? 'hidden' : ''}><p>${c.p}</p>${figs(i)}</div>`).join('')}${book}</div></div></section>`;

  function wireE(root) {
    const s = root.querySelector('.pcE'); if (!s) return; const dial = s.querySelector('.dial'), hdl = s.querySelector('.hdl'), val = s.querySelector('.val'), n = CH().length;
    const css = [...s.querySelectorAll('.cs')], txs = [...s.querySelectorAll('.tx')], bs = [...s.querySelectorAll('.lst button')], tks = [...s.querySelectorAll('.tk')];
    let cur = 0, ang = 0;
    const place = (a) => { hdl.style.transform = `rotate(${a}deg)`; val.style.strokeDashoffset = (1 - a / 360).toFixed(4); };
    const go = (i, snap = true) => { cur = (i + n) % n; css.forEach((c, k) => { c.hidden = k !== cur; const d = c.querySelector('.dw'); d.classList.toggle('in', k === cur); });
      txs.forEach((t, k) => (t.hidden = k !== cur)); bs.forEach((b, k) => b.setAttribute('aria-pressed', k === cur)); tks.forEach((t, k) => t.classList.toggle('on', k <= cur));
      hdl.setAttribute('aria-valuenow', cur + 1); hdl.setAttribute('aria-valuetext', CH()[cur].t); if (snap) { ang = cur * 90; place(ang); } };
    bs.forEach((b, i) => b.addEventListener('click', () => go(i))); tks.forEach((t, i) => { t.style.cursor = 'pointer'; t.addEventListener('click', () => go(i)); });
    hdl.addEventListener('keydown', (e) => { const d = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 }[e.key]; if (d) { e.preventDefault(); go(Math.max(0, Math.min(n - 1, cur + d))); } if (e.key === 'Home') go(0); if (e.key === 'End') go(n - 1); });
    let drag = false; const angleAt = (e) => { const r = dial.getBoundingClientRect(), x = e.clientX - (r.left + r.width / 2), y = e.clientY - (r.top + r.height / 2); return (Math.atan2(y, x) * 180 / Math.PI + 90 + 360) % 360; };
    hdl.addEventListener('pointerdown', (e) => { drag = true; hdl.setPointerCapture(e.pointerId); e.preventDefault(); dial.classList.add('drag'); });
    hdl.addEventListener('pointermove', (e) => { if (!drag) return; ang = Math.min(270, angleAt(e) > 315 ? 0 : angleAt(e)); place(ang); const i = Math.round(ang / 90); if (i !== cur) go(i, false); });
    const end = () => { if (!drag) return; drag = false; dial.classList.remove('drag'); go(Math.round(ang / 90)); }; hdl.addEventListener('pointerup', end); hdl.addEventListener('pointercancel', end);
    go(0);
  }

  /* ---------- F ---------- */
  const QS = [['Free inspection', [['What does the inspection cover?', 'A project manager walks every side of the house: siding, trim, windows, roof and gutters. One visit covers every trade.'], ['When can you come?', 'Book any day: Mon–Fri 8–8, Sat 8–6, Sun 12–5.']]],
    ['Detailed proposal', [['What will the price include?', 'An itemised price for the work you want, nothing else.'], ['What do jobs like mine usually cost?', 'Across 415 priced siding jobs, the median band is $10k–$15k, materials and labour, before tax.']]],
    ['Expert install', [['How long will it take?', 'A siding job is 1–2 weeks on site, paint included. Most window-only jobs take 2 days.'], ['What happens to the windows?', 'Windows are measured, built to order, then set and sealed.']]],
    ['Final check', [['How do I know it is done right?', 'We walk the finished job with you and clear the punch list.'], ['What warranty comes with it?', 'A lifetime workmanship warranty on labor, plus the maker’s: 30 years non-prorated on James Hardie siding.']]]];
  const F = () => `<section class="sec pcF" id="process" aria-labelledby="pcF-h">
    <div class="hd"><h2 class="sec-h" id="pcF-h" data-split>Questions at each step.</h2><p class="sec-p">The four steps of every job, and the questions people ask at each.</p></div>
    <div class="steps">${QS.map(([st, qs], i) => `<div class="stp"><p class="sn"><b>0${i + 1}</b>${st}</p><div class="qs">${qs.map(([q, a], k) => `<details${!i && !k ? ' open' : ''}><summary><span>${q}</span><i aria-hidden="true"></i></summary><p>${a}</p></details>`).join('')}</div></div>`).join('')}</div>
    <div class="sfoot"><p>Still a question? Call <a href="tel:+15125500000">(512) 550-0000</a>, Mon–Fri 8–8, Sat 8–6, Sun 12–5.</p>${book}</div></section>`;

  function wireF(root) {
    const s = root.querySelector('.pcF'); if (!s) return;
    s.querySelectorAll('details').forEach((d) => d.addEventListener('toggle', () => { if (d.open) { d.classList.remove('in'); void d.offsetWidth; d.classList.add('in'); } }));
    if (RM) s.classList.add('in'); else new IntersectionObserver((es, io) => es.forEach((e) => { if (e.isIntersecting) { io.disconnect(); s.classList.add('in'); } }), { threshold: 0.2 }).observe(s.querySelector('.steps'));
  }
  return { E, F, wire(root) { wireE(root); wireF(root); } };
})();
