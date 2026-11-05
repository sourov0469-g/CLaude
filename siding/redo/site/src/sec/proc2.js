/* PROCESS, new versions for upgrade Round 4. The firm's own four steps (Proc.CH); figures from FACTS.md.
   C — the plumb line (Lusion: one carrying thread through the section; Graza: the custom-animation bar). A line drops down
       the page as the visitor reads, a plumb bob riding its tip; each step's drawing draws itself when the line reaches it.
       Steps alternate sides on wide screens; on phones the line runs down the left edge and the steps stack beside it.
   D — four columns (Dropbox Brand: subtraction, bold colour blocks, big type). Four colour columns, one open at a time;
       the open one widens to its drawing, words and figures. On phones the columns become rows that open downward. */
window.Proc2 = (function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const BOOK = 'https://www.austinprosiding.com/schedule-appointment';
  const CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4"/></svg>';
  const book = `<a class="btn key" href="${BOOK}">Book a free inspection<span class="tab">${CAL}</span></a>`;
  const CH = () => (window.Proc ? Proc.CH : []);
  const F = [[['One visit', 'covers every trade on the house'], ['Mon–Fri 8–8', 'Sat 8–6 · Sun 12–5']],
    [['$10k–$15k', 'median band, 415 priced siding jobs'], ['Itemised', 'only the work you asked for']],
    [['1–2 weeks', 'a siding job on site, paint included'], ['2 days', 'most window-only jobs']],
    [['Lifetime', 'workmanship warranty on labor'], ['30 years', 'James Hardie siding, non-prorated']]];
  const figs = (i) => `<dl class="pf">${F[i].map(([b, s]) => `<div><dt>${b}</dt><dd>${s}</dd></div>`).join('')}</dl>`;
  const p = (d, t, cls) => `<path ${cls ? `class="${cls}" ` : ''}d="${d}" pathLength="1" style="--d:${t}s"/>`;
  // four line drawings, one per step; every stroke draws itself in order
  function DR(i) {
    if (i === 0) { return `<svg class="dr" viewBox="0 0 240 180" aria-hidden="true">${p('M14 166H226', 0)}${p('M48 166V94L120 40L192 94V166', 0.15)}${p('M34 104L120 32L206 104', 0.45, 'a')}
        ${p('M66 114h28v26h-28z', 0.7)}${p('M146 114h28v26h-28z', 0.8)}${p('M108 128h24v38h-24z', 0.9)}${p('M140 54V30h14v35', 0.55)}
        <g class="mg"><circle r="17" pathLength="1"/><path d="M12 12l13 13" pathLength="1"/></g></svg>`; }
    if (i === 1) { let l = ''; [40, 58, 76, 94, 112].forEach((y, k) => { l += p(`M86 ${y}h${46 + (k * 13) % 22}`, 0.4 + k * 0.12) + p(`M150 ${y}h10`, 0.46 + k * 0.12); });
      return `<svg class="dr" viewBox="0 0 240 180" aria-hidden="true">${p('M70 14h100v154H70z', 0)}${l}${p('M86 134h74', 1.1, 'a')}${p('M86 152h74', 1.3)}${p('M106 152h22', 1.5, 'a')}</svg>`; }
    if (i === 2) { let c = ''; for (let k = 0; k < 10; k++) c += p(`M52 ${154 - k * 12}H188`, 0.3 + k * 0.1); return `<svg class="dr" viewBox="0 0 240 180" aria-hidden="true">${p('M14 166H226', 0)}${p('M50 166V30H190V166', 0.1)}${c}${p('M50 30V166', 1.3, 'a')}${p('M190 30V166', 1.35, 'a')}</svg>`; }
    return `<svg class="dr" viewBox="0 0 240 180" aria-hidden="true">${p('M84 52h72v76H84z', 0)}${p('M84 90h72M120 52v76', 0.25)}${p('M60 152V30H180V152H72', 0.45, 'w')}
      ${p('M196 140a16 16 0 1 0 0.01 0', 1.25)}${p('M189 156l6 6 11-12', 1.5, 'a')}</svg>`;
  }

  /* ---------- C ---------- */
  const C = () => `<section class="sec pcC" id="process" aria-labelledby="pcC-h">
    <div class="hd"><h2 class="sec-h" id="pcC-h" data-split>From the first visit to the last walk.</h2><p class="sec-p">Four steps, the same on every job.</p></div>
    <div class="pline"><div class="sp" aria-hidden="true"><i class="fill"></i><svg class="bob" viewBox="0 0 30 48"><path d="M15 0V14"/><path d="M15 14L26 26L15 46L4 26Z"/></svg></div>
      ${CH().map((c, i) => `<article class="pst${i % 2 ? ' r' : ''}" data-i="${i}" aria-labelledby="pcC-${i}"><i class="nd" aria-hidden="true"></i>
        <div class="tx"><span class="num" aria-hidden="true">${c.n}</span><h3 id="pcC-${i}">${c.t}</h3><p>${c.p}</p>${figs(i)}</div>
        <div class="art">${DR(i)}</div></article>`).join('')}
      <div class="end">${book}</div></div></section>`;

  function wireC(root) {
    const s = root.querySelector('.pcC'); if (!s) return; const tl = s.querySelector(".pline"), sp = s.querySelector('.sp'), sts = [...s.querySelectorAll('.pst')];
    let raf = 0;
    function upd() { raf = 0; const r = tl.getBoundingClientRect(), y = innerHeight * 0.78, k = RM ? 1 : Math.max(0, Math.min(1, (y - r.top) / r.height));
      sp.style.setProperty('--k', k.toFixed(4));
      sts.forEach((st) => { const nd = st.querySelector('.nd').getBoundingClientRect(); const reached = RM || nd.top + nd.height / 2 < y; st.classList.toggle('on', reached); if (reached) st.classList.add('in'); }); }
    addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(upd); }, { passive: true }); addEventListener('resize', upd); upd();
  }

  /* ---------- D ---------- */
  const D = () => `<section class="sec pcD" id="process" aria-labelledby="pcD-h">
    <div class="hd"><h2 class="sec-h" id="pcD-h" data-split>Four steps. Nothing hidden.</h2>${book}</div>
    <div class="cols">${CH().map((c, i) => `<div class="col c${i}${i ? '' : ' on'}" data-i="${i}">
        <h3 class="ch"><button type="button" id="pcD-b${i}" aria-expanded="${!i}" aria-controls="pcD-p${i}"><span class="n">${c.n}</span><span class="t">${c.t}</span></button></h3>
        <div class="bd" id="pcD-p${i}" role="region" aria-labelledby="pcD-b${i}" ${i ? 'hidden' : ''}><div class="art">${DR(i)}</div><p>${c.p}</p>${figs(i)}</div></div>`).join('')}</div></section>`;

  function wireD(root) {
    const s = root.querySelector('.pcD'); if (!s) return; const cols = [...s.querySelectorAll('.col')], bs = cols.map((c) => c.querySelector('.ch button'));
    let cur = 0, ht = 0;
    function open(i) { if (i === cur) return; cols.forEach((c, k) => { const on = k === i; c.classList.toggle('on', on); bs[k].setAttribute('aria-expanded', on); c.querySelector('.bd').hidden = !on; }); cur = i;
      const bd = cols[i].querySelector('.bd'); bd.classList.remove('in'); void bd.offsetWidth; bd.classList.add('in'); }
    const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
    bs.forEach((b, i) => { b.addEventListener('click', () => open(i));
      b.addEventListener('keydown', (e) => { const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]; if (!d) return; e.preventDefault(); const n = (i + d + bs.length) % bs.length; bs[n].focus(); open(n); }); });
    // on a desktop the columns also open as the pointer rests on them (a short dwell, so a pass across does not flicker)
    if (fine) cols.forEach((c, i) => { c.addEventListener('pointerenter', () => { clearTimeout(ht); ht = setTimeout(() => open(i), 140); }); c.addEventListener('pointerleave', () => clearTimeout(ht)); });
    // the first drawing plays when the section arrives
    const first = cols[0].querySelector('.bd');
    if (RM) cols.forEach((c) => c.querySelector('.bd').classList.add('in'));
    else new IntersectionObserver((es, io) => es.forEach((e) => { if (e.isIntersecting) { io.disconnect(); cols[cur].querySelector('.bd').classList.add('in'); } }), { threshold: 0.35 }).observe(s.querySelector('.cols'));
    void first;
  }
  return { C, D, wire(root) { wireC(root); wireD(root); }, DR, FIGS: F };
})();
