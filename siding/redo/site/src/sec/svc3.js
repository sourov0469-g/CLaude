/* SERVICES E and F (overnight ladder, Round 8). Facts from Svc2.T (FACTS.md); quotes verbatim (build-checked).
   E — pick a part of the house (Ever, craft note only: selecting a part of a building on its elevation). A drawn house
       front (line art: the honest form for a diagram); choosing the roof, the wall or the windows lights that part and
       opens its trade beside it. Buttons mirror the parts for keyboard and touch.
   F — the magazine spread (Ever, craft note only: magazine narrative). The three trades as an editorial spread: a
       masthead, three features with outlined numerals that fill as they arrive, a body, the facts, and one verbatim
       line from a customer per trade. */
window.Svc3 = (function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const BOOK = 'https://www.austinprosiding.com/schedule-appointment';
  const CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4"/></svg>';
  const book = `<a class="btn key" href="${BOOK}">Book a free inspection<span class="tab">${CAL}</span></a>`;
  const T = () => (window.Svc2 ? Svc2.T : []);
  const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const figs = (t) => `<dl class="figs2">${t.figs.map(([b, s]) => `<div><dt>${b}</dt><dd>${s}</dd></div>`).join('')}</dl>`;

  /* ---------- E ---------- */
  const PART = { siding: 'The wall', 'svc-windows': 'The windows', roofing: 'The roof' };
  function elev() { let lap = ''; for (let y = 210; y < 390; y += 13) lap += `<path d="M92 ${y}H508"/>`;
    let sh = ''; for (let y = 82; y < 200; y += 12) { const k = (y - 60) / 140, x0 = 300 - 240 * k, x1 = 300 + 240 * k; sh += `<path d="M${x0.toFixed(1)} ${y}H${x1.toFixed(1)}"/>`; }
    const win = (x) => `<rect x="${x}" y="236" width="92" height="104" rx="2"/><path d="M${x + 46} 236V340M${x} 288H${x + 92}"/>`;
    return `<svg class="elev" viewBox="0 0 600 420" aria-hidden="true">
      <path class="gnd" d="M20 392H580"/>
      <g class="pt" data-k="roofing"><path class="fill" d="M54 204L300 58L546 204Z"/><g class="ln">${sh}</g><path class="edge" d="M54 204L300 58L546 204"/><path class="edge" d="M70 204H530"/></g>
      <g class="pt" data-k="siding"><path class="fill" d="M90 204H510V390H90Z"/><g class="ln">${lap}</g><path class="edge" d="M90 204V390H510V204"/><rect class="door" x="272" y="282" width="56" height="108"/></g>
      <g class="pt" data-k="svc-windows"><g class="fill w">${win(122)}${win(386)}</g><g class="edge">${win(122)}${win(386)}</g></g>
      <g class="tags"><g data-k="roofing" transform="translate(300 112)"><rect x="-38" y="-15" width="76" height="30" rx="15"/><text y="5">Roof</text></g>
        <g data-k="siding" transform="translate(208 372)"><rect x="-40" y="-15" width="80" height="30" rx="15"/><text y="5">Siding</text></g>
        <g data-k="svc-windows" transform="translate(432 224)"><rect x="-50" y="-15" width="100" height="30" rx="15"/><text y="5">Windows</text></g></g></svg>`; }
  const E = () => `<section class="sec svE" id="services" aria-labelledby="svE-h">
    <div class="hd"><h2 class="sec-h" id="svE-h" data-split>Point at the part that needs work.</h2><p class="sec-p">Three trades, one house. Pick the roof, the wall or the windows.</p></div>
    <div class="wrap"><div class="house" data-solid>${elev()}</div>
      <div class="side"><div class="parts" role="tablist" aria-label="Part of the house">${T().map((t, i) => `<button type="button" role="tab" id="svE-t${i}" aria-selected="${!i}" aria-controls="svE-p${i}" data-k="${t.id}">${PART[t.id] || t.name}<small>${t.name}</small></button>`).join('')}</div>
        ${T().map((t, i) => `<div class="pan${i ? '' : ' on'}" id="svE-p${i}" role="tabpanel" aria-labelledby="svE-t${i}" ${i ? 'hidden' : ''}><p class="cnt"><b>${t.n}</b> ${t.unit}</p><h3>${t.name}</h3><p class="ld">${t.lead}</p>${figs(t)}${book}</div>`).join('')}</div></div></section>`;

  function wireE(root) {
    const s = root.querySelector('.svE'); if (!s) return; const tabs = [...s.querySelectorAll('.parts [role=tab]')], pans = [...s.querySelectorAll('.pan')], svg = s.querySelector('.elev');
    const ids = tabs.map((t) => t.dataset.k);
    const pick = (i, focus) => { tabs.forEach((t, k) => { t.setAttribute('aria-selected', k === i); t.tabIndex = k === i ? 0 : -1; pans[k].hidden = k !== i; pans[k].classList.toggle('on', k === i); });
      svg.querySelectorAll('[data-k]').forEach((g) => g.classList.toggle('on', g.dataset.k === ids[i])); svg.classList.add('sel'); if (focus) tabs[i].focus(); };
    const peek = (k) => { svg.querySelectorAll('.pt').forEach((g) => g.classList.toggle('peek', g.dataset.k === k)); };
    tabs.forEach((t, i) => { t.addEventListener('click', () => pick(i)); t.addEventListener('keydown', (e) => { const d = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key]; if (d) { e.preventDefault(); pick((i + d + tabs.length) % tabs.length, true); } });
      t.addEventListener('pointerenter', () => peek(ids[i])); t.addEventListener('pointerleave', () => peek('')); });
    svg.querySelectorAll('.pt, .tags [data-k]').forEach((g) => { g.style.cursor = 'pointer'; g.addEventListener('click', () => pick(ids.indexOf(g.dataset.k)));
      g.addEventListener('pointerenter', () => peek(g.dataset.k)); g.addEventListener('pointerleave', () => peek('')); });
    tabs.forEach((t, k) => (t.tabIndex = k ? -1 : 0)); pick(0);
    // the drawing draws itself once, roof last
    if (RM) s.classList.add('in'); else new IntersectionObserver((es, io) => es.forEach((e) => { if (e.isIntersecting) { io.disconnect(); s.classList.add('in'); } }), { threshold: 0.3 }).observe(svg);
  }

  /* ---------- F ---------- */
  const Q = [[7, 'I hired Austin Pro to redo my house\'s 80s era masonite siding with Hardie Board.'], [17, 'Wow what a difference our new windows have made, our home is so QUIET!'], [15, 'They ripped off the old roof and put on a new one in one day.']];
  const HEAD = ['The full wall, not a patch.', 'Built to order, set in two days.', 'A roof from a GAF Master Elite contractor.'];
  const F = () => { const R = window.__REV || [];
    return `<section class="sec svF" id="services" aria-labelledby="svF-h">
      <header class="mast"><p class="k">Austin Pro · the trades</p><h2 class="sec-h" id="svF-h" data-split>Every trade on the house.</h2><p class="iss">Siding · Windows · Roofing</p></header>
      <div class="cols">${T().map((t, i) => { const q = Q[i], r = R[q[0]] || {}; return `<article class="ft3" style="--i:${i}" aria-labelledby="svF-${i}">
        <p class="kick">${t.name}</p><p class="big" aria-hidden="true">${t.n}</p><h3 id="svF-${i}">${HEAD[i]}</h3>
        <p class="body"><span class="dc">${t.lead.charAt(0)}</span>${t.lead.slice(1)}</p>
        <blockquote><p>“${esc(q[1])}”</p><footer>${esc(r.name || '')}, ${esc(r.source || 'Google review')}</footer></blockquote>
        ${figs(t)}</article>`; }).join('')}</div>
      <div class="sfoot">${book}<p>${T().map((t) => `<b>${t.n}</b> ${t.unit}`).join(' · ')}</p></div></section>`; };

  function wireF(root) {
    const s = root.querySelector('.svF'); if (!s) return; const arts = [...s.querySelectorAll('.ft3')];
    if (RM) arts.forEach((a) => a.classList.add('in'));
    else { const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.25 }); arts.forEach((a) => io.observe(a)); }
  }
  return { E, F, wire(root) { wireE(root); wireF(root); }, Q };
})();
