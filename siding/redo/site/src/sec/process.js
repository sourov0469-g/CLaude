/* PROCESS (direction v2: full-view stacked chapters, NOT five cards). The firm's own four steps (siding/windows pages):
   Free Inspection → Detailed Proposal → Expert Install → Final Check. Figures from FACTS.md; quotes verbatim from reviews.json. */
window.Proc = (function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const BOOK = 'https://www.austinprosiding.com/schedule-appointment';
  const CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4"/></svg>';
  const TICK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  // [review index, verbatim excerpt]
  const QUOTES = [[14, 'They only took 15 minutes to measure and understand the job rather than taking hours of my time'], [26, 'providing a fair and transparent estimate'],
    [15, 'They ripped off the old roof and put on a new one in one day.'], [10, 'swept the pollen off my deck!']];
  const qt = (i) => { const r = (window.__REV || [])[QUOTES[i][0]] || {}; const t = QUOTES[i][1]; return `<figure class="pq"><blockquote>“${/^[a-z]/.test(t) ? '…' : ''}${t}${/[.!?]$/.test(t) ? '' : '…'}”</blockquote><figcaption>${r.name || ''}, Google review</figcaption></figure>`; };
  // middle-half ranges and median bands (FACTS.md, homepage chart labels + cost guides), $k on a 0–50 axis
  const BANDS = { siding: { lo: 5, hi: 20, m: [10, 15], n: '415 priced siding jobs' }, windows: { lo: 5, hi: 25, m: [10, 15], n: '376 priced window jobs' }, roofing: { lo: 5, hi: 20, m: [10, 15], n: '204 priced shingle roofs' } };
  const CH = [
    { n: '01', t: 'Free inspection', p: 'A project manager walks every side of the house: siding, trim, windows, roof and gutters. One visit covers every trade.', obj: 'insp' },
    { n: '02', t: 'Detailed proposal', p: 'An itemised price for the work you want, nothing else. Here is where our documented jobs actually landed.', obj: 'band' },
    { n: '03', t: 'Expert install', p: 'Old material off, new boards up, then trim and paint. Windows are measured, built to order, then set and sealed.', obj: 'build' },
    { n: '04', t: 'Final check', p: 'We walk the finished job with you, clear the punch list and leave the site clean. Then the warranties start.', obj: 'final' },
  ];
  const INSP = ['Siding and trim', 'Windows and doors', 'Roof and flashing', 'Gutters', 'Paint and caulk', 'Rot and water damage'];
  function obj(k) {
    if (k === 'insp') return `<div class="clip" data-solid><div class="clamp" aria-hidden="true"></div><p class="clh">Inspection</p>
      <ul>${INSP.map((x, i) => `<li><button type="button" role="checkbox" aria-checked="false" style="--d:${0.25 + i * 0.22}s"><i>${TICK}</i>${x}</button></li>`).join('')}</ul>
      <p class="hrs"><b>Book any day</b>Mon–Fri 8–8 · Sat 8–6 · Sun 12–5</p></div>${qt(0)}`;
    if (k === 'band') return `<div class="band" data-solid><div class="seg" role="group" aria-label="Trade">${Object.keys(BANDS).map((x, i) => `<button type="button" aria-pressed="${!i}" data-b="${x}">${x[0].toUpperCase() + x.slice(1)}</button>`).join('')}</div>
      <div class="axis"><div class="mid"></div><div class="med"><span class="lbl"></span></div>${[0, 5, 10, 15, 20, 25, 30].map((v) => `<i style="left:${(v * 100 / 30).toFixed(2)}%"><span>$${v}k</span></i>`).join('')}</div>
      <p class="lgd"><span><i class="k1"></i>Middle half of jobs <b class="lv1"></b></span><span><i class="k2"></i>Median band <b class="lv2"></b></span></p><p class="src"></p></div>${qt(1)}`;
    if (k === 'build') { let c = ''; for (let i = 0; i < 10; i++) c += `<i class="crs" style="--i:${i}"></i>`;
      return `<div class="bld" data-solid><div class="wallb"><span class="wrapw">HOUSE WRAP</span>${c}<i class="cb l"></i><i class="cb r"></i></div>
      <div class="days"><div><b>1–2 weeks</b><span>a siding job on site, paint included</span></div><div><b>2 days</b><span>most window-only jobs</span></div></div></div>${qt(2)}`; }
    return `<div class="fin" data-solid><ul>${['Walk the job together', 'Clear the punch list', 'Haul away the old material', 'Leave the site clean'].map((x, i) => `<li style="--d:${0.2 + i * 0.25}s"><i>${TICK}</i>${x}</li>`).join('')}</ul>
      <div class="seal" aria-hidden="true"><svg viewBox="0 0 200 200"><defs><path id="pcS" d="M100 100m-74 0a74 74 0 1 1 148 0a74 74 0 1 1 -148 0"/></defs><circle cx="100" cy="100" r="92" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="100" cy="100" r="58" fill="none" stroke="currentColor" stroke-width="2"/><text font-size="15" font-weight="800" letter-spacing="3" fill="currentColor"><textPath href="#pcS">LIFETIME WORKMANSHIP · ON LABOR ·</textPath></text><text x="100" y="96" text-anchor="middle" font-size="22" font-weight="800" fill="currentColor">AUSTIN</text><text x="100" y="120" text-anchor="middle" font-size="22" font-weight="800" fill="currentColor">PRO</text></svg></div>
      <p class="war"><b>Lifetime workmanship warranty on labor</b>plus the maker's warranty: 30 years non-prorated on James Hardie siding.</p>
      <a class="btn key" href="${BOOK}">Book a free inspection<span class="tab">${CAL}</span></a></div>${qt(3)}`;
  }
  const A = () => `<section class="sec pcA" id="process" aria-labelledby="pcA-h"><h2 class="sec-h" id="pcA-h">Four steps, start to finish.</h2>
    ${CH.map((c, i) => `<article class="ch" style="--z:${i}" aria-labelledby="pcA-${i}"><div class="card"><div class="txt"><span class="num" aria-hidden="true">${c.n}</span><h3 id="pcA-${i}">${c.t}</h3><p>${c.p}</p>
      <ol class="dots" aria-hidden="true">${CH.map((_, k) => `<li class="${k === i ? 'on' : k < i ? 'done' : ''}"></li>`).join('')}</ol></div><div class="obj">${obj(c.obj)}</div></div></article>`).join('')}</section>`;

  function wireA(root) {
    const s = root.querySelector('.pcA'); if (!s) return; const chs = [...s.querySelectorAll('.ch')];
    // chapters stack: the one underneath sinks back as the next slides over it
    let raf = 0; const upd = () => { raf = 0; if (innerWidth <= 860) { bld(); return; } chs.forEach((c, i) => { const nx = chs[i + 1]; if (!nx) return; const r = nx.getBoundingClientRect(), k = Math.max(0, Math.min(1, 1 - (r.top - 84) / (innerHeight - 84)));
      c.style.setProperty('--k', k.toFixed(3)); }); bld(); };
    addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(upd); }, { passive: true }); addEventListener('resize', upd);
    // each chapter plays its object once in view
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.45 });
    chs.forEach((c) => (RM ? c.classList.add('in') : io.observe(c)));
    // inspection: items tick themselves in, and can be ticked by hand
    s.querySelectorAll('.clip [role=checkbox]').forEach((b) => { b.addEventListener('click', () => b.setAttribute('aria-checked', b.getAttribute('aria-checked') !== 'true')); });
    const insp = s.querySelector('.clip'); new MutationObserver(() => { if (insp.closest('.ch').classList.contains('in')) insp.querySelectorAll('[role=checkbox]').forEach((b) => b.setAttribute('aria-checked', 'true')); }).observe(insp.closest('.ch'), { attributes: true, attributeFilter: ['class'] });
    if (RM) insp.querySelectorAll('[role=checkbox]').forEach((b) => b.setAttribute('aria-checked', 'true'));
    // price band per trade
    const band = s.querySelector('.band');
    const X = (v) => (v * 100 / 30).toFixed(2) + '%';
    const setB = (k) => { const b = BANDS[k]; band.style.setProperty('--lo', X(b.lo)); band.style.setProperty('--hi', X(b.hi)); band.style.setProperty('--m0', X(b.m[0])); band.style.setProperty('--m1', X(b.m[1]));
      band.querySelector('.med .lbl').textContent = `$${b.m[0]}k–$${b.m[1]}k`; band.querySelector('.lv1').textContent = `$${b.lo}k–$${b.hi}k`; band.querySelector('.lv2').textContent = `$${b.m[0]}k–$${b.m[1]}k`;
      band.querySelector('.src').textContent = `From ${b.n}, 2022–2026: materials and labour, before tax.`; band.querySelectorAll('[data-b]').forEach((x) => x.setAttribute('aria-pressed', x.dataset.b === k)); };
    band.querySelectorAll('[data-b]').forEach((x) => x.addEventListener('click', () => setB(x.dataset.b))); setB('siding');
    // install: the courses go up with the scroll through this chapter
    const wb = s.querySelector('.wallb'), bch = wb.closest('.ch');
    function bld() { if (RM) { wb.style.setProperty('--p', 1); return; } const r = bch.getBoundingClientRect(), p = Math.max(0, Math.min(1, (innerHeight - r.top) / (innerHeight * 0.9)));
      wb.style.setProperty('--p', p.toFixed(3)); }
    upd();
  }

  /* B: one pinned wall; scrolling runs the job from the old siding to the finished house, chapter by chapter */
  const B = () => { let crs = ''; for (let i = 0; i < 12; i++) crs += `<i class="nc" style="--i:${i}"></i>`; let old = ''; for (let i = 0; i < 12; i++) old += `<i class="oc" style="--i:${i}"></i>`;
    return `<section class="sec pcB" id="process" aria-labelledby="pcB-h"><div class="pin">
      <div class="lft"><h2 class="sec-h" id="pcB-h">Four steps, start to finish.</h2>
        ${CH.map((c, i) => `<div class="cap" data-c="${i}"><span class="num">${c.n}</span><h3>${c.t}</h3><p>${c.p}</p></div>`).join('')}
        <a class="btn key" href="${BOOK}">Book a free inspection<span class="tab">${CAL}</span></a></div>
      <div class="job" data-solid role="img" aria-label="A wall going from old siding, through house wrap, to new lap siding with trim, as you scroll.">
        <div class="wall2"><span class="wrapw">HOUSE WRAP</span>${old}${crs}<i class="tr l"></i><i class="tr r"></i><i class="win2"></i><span class="pm"></span></div>
        <div class="rule">${CH.map((c, i) => `<button type="button" data-g="${i}"><i></i><span>${c.t}</span></button>`).join('')}<b class="fill"></b></div></div></div></section>`; };
  function wireB(root) {
    const s = root.querySelector('.pcB'); if (!s) return; const job = s.querySelector('.job'), caps = [...s.querySelectorAll('.cap')], gs = [...s.querySelectorAll('[data-g]')], pm = s.querySelector('.pm');
    const PM = ['As found: the old siding', 'Planned: lap 8.25 in, Arctic White trim', 'Going up: course by course', 'Done: walked, cleaned, warranted'];
    let raf = 0; const mob = () => innerWidth <= 860;
    function upd() { raf = 0; const r = s.getBoundingClientRect(), tot = s.offsetHeight - innerHeight, p = mob() ? 1 : Math.max(0, Math.min(1, -r.top / tot));
      job.style.setProperty('--p', p.toFixed(3)); const c = Math.min(3, Math.floor(p * 4 - 1e-6 < 0 ? 0 : p * 4 - 1e-6));
      caps.forEach((x, i) => x.classList.toggle('on', mob() || i === c)); gs.forEach((g, i) => g.classList.toggle('on', i <= c)); pm.textContent = PM[c]; }
    addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(upd); }, { passive: true }); addEventListener('resize', upd);
    gs.forEach((g, i) => g.addEventListener('click', () => { const tot = s.offsetHeight - innerHeight; scrollTo({ top: s.offsetTop + tot * (i + 0.5) / 4, behavior: RM ? 'auto' : 'smooth' }); }));
    upd();
  }
  return { A, B, wire(root) { wireA(root); wireB(root); }, QUOTES };
})();
