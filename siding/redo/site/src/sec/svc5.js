/* SERVICES I and J (overnight ladder, Round 10 — Services reaches 10). Facts from Svc2.T; photos are the firm's own
   published jobs with their recorded place and month (window.__SVCP640, injected at build).
   I — three rings, one visit (Cowboy: one named system — the one visit at the centre ties the trades together). A radial
       bar chart: one ring per trade, its arc in proportion to documented jobs (the longest = 431). Rings, not a pie:
       one job can cover several trades, so the counts are not shares of a whole. Choose a ring to bring its trade to
       the centre.
   J — the index (Lando Norris: the archive presented as an index). The trades as a large-type index; over each row one
       of the firm's own job photos follows the pointer; on touch, a row opens with its photo inline. */
window.Svc5 = (function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches, FINE = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const BOOK = 'https://www.austinprosiding.com/schedule-appointment';
  const CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4"/></svg>';
  const book = `<a class="btn key" href="${BOOK}">Book a free inspection<span class="tab">${CAL}</span></a>`;
  const T = () => (window.Svc2 ? Svc2.T : []);
  const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  const figs = (t) => `<dl class="figs2">${t.figs.map(([b, s]) => `<div><dt>${b}</dt><dd>${s}</dd></div>`).join('')}</dl>`;

  /* ---------- I ---------- */
  const I = () => { const t = T(), R = [150, 118, 86], max = 431;
    const arc = (r, f) => { const a = f * 2 * Math.PI * 0.86, x = 180 + r * Math.sin(a), y = 180 - r * Math.cos(a); return `M180 ${180 - r} A${r} ${r} 0 ${a > Math.PI ? 1 : 0} 1 ${x.toFixed(2)} ${y.toFixed(2)}`; };
    return `<section class="sec svI" id="services" aria-labelledby="svI-h">
      <div class="hd"><h2 class="sec-h" id="svI-h" data-split>Three trades. One visit.</h2><p class="sec-p">Each ring is one trade, as long as its documented jobs. One free inspection sits at the centre of all three.</p></div>
      <div class="wrap"><div class="rings" data-solid><svg viewBox="0 0 360 360" aria-hidden="true">${t.map((x, i) => `<g class="rg" data-i="${i}"><path class="trk" d="${arc(R[i], 1)}" pathLength="1"/><path class="val" d="${arc(R[i], x.n / max)}" pathLength="1" style="--d:${i * 0.15}s"/>
            <text x="162" y="${180 - R[i] + 5}" text-anchor="end">${x.name} · ${x.n}</text></g>`).join('')}</svg>
          <div class="ctr"><p class="k">One visit</p><b>Every trade</b><span>on the house</span></div></div>
        <div class="side"><div class="pk" role="tablist" aria-label="Trade">${t.map((x, i) => `<button type="button" role="tab" id="svI-t${i}" aria-selected="${!i}" aria-controls="svI-p${i}">${x.name}<small>${x.n}</small></button>`).join('')}</div>
          ${t.map((x, i) => `<div class="pan${i ? '' : ' on'}" id="svI-p${i}" role="tabpanel" aria-labelledby="svI-t${i}" ${i ? 'hidden' : ''}><p class="cnt"><b>${x.n}</b> ${x.unit}</p><p class="ld">${x.lead}</p>${figs(x)}${book}</div>`).join('')}</div></div>
      <p class="note">One job can include several trades, so the rings are not parts of one whole.</p></section>`; };

  function wireI(root) {
    const s = root.querySelector('.svI'); if (!s) return; const tabs = [...s.querySelectorAll('.pk [role=tab]')], pans = [...s.querySelectorAll('.pan')], rgs = [...s.querySelectorAll('.rg')], ctr = s.querySelector('.ctr');
    const pick = (i, f) => { tabs.forEach((t, k) => { t.setAttribute('aria-selected', k === i); t.tabIndex = k === i ? 0 : -1; pans[k].hidden = k !== i; pans[k].classList.toggle('on', k === i); });
      rgs.forEach((g, k) => g.classList.toggle('on', k === i)); const x = T()[i]; ctr.querySelector('b').textContent = x.name; ctr.querySelector('span').textContent = `${x.n} ${x.unit}`; if (f) tabs[i].focus(); };
    tabs.forEach((t, i) => { t.addEventListener('click', () => pick(i)); t.addEventListener('keydown', (e) => { const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]; if (d) { e.preventDefault(); pick((i + d + tabs.length) % tabs.length, true); } }); });
    rgs.forEach((g, i) => { g.addEventListener('click', () => pick(i)); g.style.cursor = 'pointer'; });
    pick(0); if (RM) s.classList.add('in'); else new IntersectionObserver((es, io) => es.forEach((e) => { if (e.isIntersecting) { io.disconnect(); s.classList.add('in'); } }), { threshold: 0.35 }).observe(s.querySelector('.rings'));
  }

  /* ---------- J ---------- */
  const J = () => { const P = window.__SVCP640 || {};
    return `<section class="sec svJ" id="services" aria-labelledby="svJ-h">
      <div class="hd"><h2 class="sec-h" id="svJ-h" data-split>The index.</h2><p class="sec-p">Three trades. Point at one to see a job of ours.</p></div>
      <ol class="ix">${T().map((t, i) => { const p = P[t.scene] || {}; return `<li class="ir" data-i="${i}"><button type="button" class="rb" aria-expanded="false" aria-controls="svJ-p${i}">
          <span class="no">${String(i + 1).padStart(2, '0')}</span><span class="nm">${t.name}</span><span class="n">${t.n}</span><span class="u">${t.unit}</span></button>
          <div class="ip" id="svJ-p${i}" hidden><figure>${p.src ? `<img src="${p.src}" alt="${esc(p.alt)}" loading="lazy" decoding="async">` : ''}<figcaption>${esc(p.place || '')} · ${esc(p.when || '')}</figcaption></figure><div><p class="ld">${t.lead}</p>${figs(t)}${book}</div></div></li>`; }).join('')}</ol>
      <div class="peek" aria-hidden="true">${T().map((t) => { const p = P[t.scene] || {}; return `<figure data-s="${t.scene}">${p.src ? `<img src="${p.src}" alt="" decoding="async">` : ''}<figcaption>${esc(p.place || '')} · ${esc(p.when || '')}</figcaption></figure>`; }).join('')}</div></section>`; };

  function wireJ(root) {
    const s = root.querySelector('.svJ'); if (!s) return; const rows = [...s.querySelectorAll('.ir')], pk = s.querySelector('.peek'), figsP = [...pk.querySelectorAll('figure')];
    rows.forEach((r) => { const b = r.querySelector('.rb'); b.addEventListener('click', () => { const on = b.getAttribute('aria-expanded') !== 'true'; rows.forEach((x) => { const xb = x.querySelector('.rb'), o = x === r && on; xb.setAttribute('aria-expanded', o); x.querySelector('.ip').hidden = !o; x.classList.toggle('open', o); }); }); });
    if (!FINE) return;
    let raf = 0, tx = 0, ty = 0, x = 0, y = 0, cur = -1;
    const tick = () => { x += (tx - x) * 0.18; y += (ty - y) * 0.18; pk.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) rotate(${((tx - x) * 0.04).toFixed(2)}deg)`; raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.5 ? requestAnimationFrame(tick) : 0; };
    const ol = s.querySelector('.ix');
    ol.addEventListener('pointermove', (e) => { const r = s.getBoundingClientRect(); tx = e.clientX - r.left + 28; ty = e.clientY - r.top - 120; if (RM) { x = tx; y = ty; pk.style.transform = `translate3d(${x}px,${y}px,0)`; } else if (!raf) raf = requestAnimationFrame(tick);
      const row = e.target.closest('.ir'); const i = row ? +row.dataset.i : -1; if (i !== cur) { cur = i; figsP.forEach((f, k) => f.classList.toggle('on', k === i)); pk.classList.toggle('on', i >= 0); rows.forEach((rr, k) => rr.classList.toggle('hot', k === i)); } });
    ol.addEventListener('pointerleave', () => { cur = -1; pk.classList.remove('on'); figsP.forEach((f) => f.classList.remove('on')); rows.forEach((rr) => rr.classList.remove('hot')); });
  }
  return { I, J, wire(root) { wireI(root); wireJ(root); } };
})();
