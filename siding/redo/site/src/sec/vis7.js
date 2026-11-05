/* VISUALISER L (new-versions addendum, pass 2) — "Roll it on". Reference: Graza (the custom-animation quality bar).
   The firm's two published routes to a colour, each shown arriving the way it really does: painted on site (Sherwin-
   Williams; the 12 published swatches) — a roller rolls it on, course by course, with a wet sheen that dries; or
   ColorPlus, factory-baked (the 17 published Austin colours, Arctic White trim) — the boards come finished, so the
   courses turn over to the new colour from the bottom up, the way siding is hung. Colours, names and codes exactly as
   published (FACTS.md). The configurator lives in the Visualiser only; the roller answers a choice, it is not a game. */
window.Vis7 = (function () {
  const BOOK = 'https://www.austinprosiding.com/schedule-appointment';
  const CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4"/></svg>';
  const SW = [['Pure White', 'SW 7005', '#EDECE6'], ['Alabaster', 'SW 7008', '#EDEAE0'], ['Agreeable Gray', 'SW 7029', '#D1CBC1'], ['Repose Gray', 'SW 7015', '#CCC9C0'],
    ['Accessible Beige', 'SW 7036', '#D1C7B8'], ['Dovetail', 'SW 7018', '#908A83'], ['Gauntlet Gray', 'SW 7019', '#78736E'], ['Urbane Bronze', 'SW 7048', '#54504A'],
    ['Iron Ore', 'SW 7069', '#434341'], ['Tricorn Black', 'SW 6258', '#2F2F30'], ['In the Navy', 'SW 9178', '#283849'], ['Hunt Club', 'SW 6468', '#2A4F43']];
  const CP = [['Arctic White', '#E0E0D8'], ['Cobble Stone', '#C6BEB0'], ['Navajo Beige', '#D5C9B2'], ['Khaki Brown', '#A28F7D'], ['Timber Bark', '#7B7064'],
    ['Rich Espresso', '#5F5A55'], ['Mountain Sage', '#706F5E'], ['Light Mist', '#B6BAB5'], ['Pearl Gray', '#B2AEA9'], ['Gray Slate', '#898A87'], ['Boothbay Blue', '#778184'],
    ['Evening Blue', '#5F696D'], ['Deep Ocean', '#49545C'], ['Aged Pewter', '#7D7974'], ['Night Gray', '#6A6D6F'], ['Iron Gray', '#575B59'], ['Countrylane Red', '#714D47']];
  const PRIMER = '#F2F0EA', TRIM = { sw: '#EDECE6', cp: '#E0E0D8' }, N = 12, X0 = 24, X1 = 776, CH = 40;

  const wall = () => {
    let c = '';
    for (let i = 0; i < N; i++) { const y = i * CH;
      c += `<g class="vcr" data-i="${i}"><rect class="vb" x="${X0}" y="${y}" width="${X1 - X0}" height="${CH}" fill="${PRIMER}"/>`
        + `<rect class="vn" x="${X0}" y="${y}" width="0" height="${CH}"/><rect class="vw" x="${X0}" y="${y}" width="${X1 - X0}" height="${CH}"/>`
        + `<rect x="${X0}" y="${y + CH - 4}" width="${X1 - X0}" height="4" fill="rgba(10,22,17,.16)"/><rect x="${X0}" y="${y}" width="${X1 - X0}" height="2" fill="rgba(255,255,255,.35)"/></g>`; }
    const mull = '<rect x="398" y="120" width="4" height="220" class="vt" fill="#EDECE6"/><rect x="300" y="228" width="200" height="4" class="vt" fill="#EDECE6"/>';
    return `<svg class="vwall" viewBox="0 0 800 500" role="img" aria-label="A lap-sided wall with a window; it shows the chosen colour.">
      <rect x="0" y="480" width="800" height="20" fill="#E4EAE5"/><rect x="${X0}" y="0" width="${X1 - X0}" height="480" fill="#D7DCD8"/>${c}
      <rect x="0" y="0" width="${X0}" height="480" class="vt" fill="#EDECE6"/><rect x="${X1}" y="0" width="${800 - X1}" height="480" class="vt" fill="#EDECE6"/>
      <rect x="280" y="100" width="240" height="260" class="vt" fill="#EDECE6"/><rect x="300" y="120" width="200" height="220" fill="#9FB4BC"/>
      <path d="M300 120h200L300 300z" fill="rgba(255,255,255,.18)"/>${mull}<rect x="270" y="356" width="260" height="14" class="vt" fill="#EDECE6"/>
      <g class="vroll" transform="translate(-120 -120)"><g class="vrb">
        <path d="M0 -18 V-34 H46 L70 -84" fill="none" stroke="#3B4240" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="58" y="-112" width="16" height="36" rx="6" transform="rotate(25 66 -94)" fill="#0E3B2C"/>
        <rect class="vrc" x="-38" y="-18" width="76" height="36" rx="12" stroke="#0A1611" stroke-width="2"/>
        <rect x="-38" y="-18" width="76" height="10" rx="6" fill="rgba(255,255,255,.25)"/></g></g></svg>`;
  };
  const sw = (list, route) => list.map((c, i) => { const name = route === 'sw' ? `${c[0]} ${c[1]}` : `${c[0]}, ColorPlus`, hex = route === 'sw' ? c[2] : c[1];
    return `<button type="button" role="radio" class="vsw" data-r="${route}" data-i="${i}" style="--c:${hex}" aria-checked="false" tabindex="-1" aria-label="${name}" title="${name}"></button>`; }).join('');

  const L = () => `<section class="sec viL" id="colours" aria-labelledby="viL-h">
    <div class="vhd"><h2 class="sec-h" id="viL-h" data-split>Two ways to get a colour on the wall.</h2>
      <p class="sec-p">Painted on site in any Sherwin-Williams colour, or ColorPlus, baked on at the factory. Pick a colour and watch how it arrives.</p></div>
    <div class="vgrid"><div class="vstage">${wall()}</div>
      <div class="vside">
        <div class="vfin" role="radiogroup" aria-label="Finish"><button type="button" role="radio" class="vfb" data-r="sw" aria-checked="true" tabindex="0">Painted on site</button><button type="button" role="radio" class="vfb" data-r="cp" aria-checked="false" tabindex="-1">ColorPlus, factory-baked</button></div>
        <div class="vset" data-r="sw" role="radiogroup" aria-label="Sherwin-Williams swatches">${sw(SW, 'sw')}</div>
        <div class="vset" data-r="cp" role="radiogroup" aria-label="ColorPlus Austin colours" hidden>${sw(CP, 'cp')}</div>
        <div class="vread" aria-live="polite"><p class="vnm"><b>Dovetail</b> SW 7018 · painted on site</p>
          <p class="vtx">One of the 12 Sherwin-Williams swatches we publish. We paint on site in any of 1,700+ Sherwin-Williams colours, with free colour matching.</p></div>
        <div class="vcta"><a class="btn key" href="${BOOK}">Book a free inspection<span class="tab">${CAL}</span></a>
          <p>Screen colours are approximate. Bring real samples to the free inspection.</p></div>
      </div></div></section>`;

  function wire(root) {
    const s = root.querySelector('.viL'); if (!s || s.dataset.w) return; s.dataset.w = 1;
    const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const crs = [...s.querySelectorAll('.vcr')], base = crs.map((g) => g.querySelector('.vb')), nw = crs.map((g) => g.querySelector('.vn')), wet = crs.map((g) => g.querySelector('.vw'));
    const trim = [...s.querySelectorAll('.vt')], roll = s.querySelector('.vroll'), rb = s.querySelector('.vrb'), rc = s.querySelector('.vrc');
    const fbs = [...s.querySelectorAll('.vfb')], sets = [...s.querySelectorAll('.vset')], nm = s.querySelector('.vnm'), tx = s.querySelector('.vtx');
    let route = 'sw', pick = { sw: 5, cp: 14 }, cur = PRIMER, tgt = PRIMER, raf = 0, timers = [], seen = false;
    const hexOf = (r, i) => (r === 'sw' ? SW[i][2] : CP[i][1]);
    const setTrim = (r) => trim.forEach((t) => t.setAttribute('fill', TRIM[r]));
    const read = () => { const i = pick[route];
      if (route === 'sw') { nm.innerHTML = `<b>${SW[i][0]}</b> ${SW[i][1]} · painted on site`; tx.textContent = 'One of the 12 Sherwin-Williams swatches we publish. We paint on site in any of 1,700+ Sherwin-Williams colours, with free colour matching.'; }
      else { nm.innerHTML = `<b>${CP[i][0]}</b> · ColorPlus, factory-baked`; tx.textContent = 'One of the 17 ColorPlus colours for Austin, with Arctic White trim. The colour is baked on at the factory: “ColorPlus finish 15+ yrs.”'; } };
    // settle everything at once (interrupts, reduced motion)
    const settle = (hex) => { cancelAnimationFrame(raf); raf = 0; timers.forEach(clearTimeout); timers = [];
      crs.forEach((g, i) => { g.classList.remove('vturn'); base[i].setAttribute('fill', hex); nw[i].setAttribute('width', 0); }); roll.setAttribute('transform', 'translate(-120 -120)'); cur = hex; };
    // painted on site: the roller, course by course, top down, serpentine
    function rollOn(hex) {
      settle(tgt); tgt = hex; setTrim('sw'); rc.setAttribute('fill', hex); nw.forEach((r) => r.setAttribute('fill', hex));
      const PASS = 150, LIFT = 45, T = N * (PASS + LIFT) + 260; let t0 = 0, done = -1;
      const ease = (u) => 1 - Math.pow(1 - u, 2.2);
      const step = (t) => { if (!t0) t0 = t; const e = t - t0;
        const k = Math.min(N - 1, Math.floor(e / (PASS + LIFT))), u = Math.min(1, (e - k * (PASS + LIFT)) / PASS), ltr = k % 2 === 0;
        for (let i = done + 1; i < k; i++) { nw[i].setAttribute('width', X1 - X0); nw[i].setAttribute('x', X0); dry(i); done = i; }
        const w = (X1 - X0) * ease(u); nw[k].setAttribute('width', w); nw[k].setAttribute('x', ltr ? X0 : X1 - w);
        if (u >= 1 && done < k) { dry(k); done = k; }
        const x = ltr ? X0 + w : X1 - w, y = k * CH + CH / 2 + (u >= 1 ? -6 * Math.sin(Math.min(1, (e - k * (PASS + LIFT) - PASS) / LIFT) * Math.PI) : 0);
        const lean = (ltr ? 1 : -1) * (u < 1 ? 7 : 0), sq = u < 1 ? 0.94 : 1;
        if (e < N * (PASS + LIFT)) { roll.setAttribute('transform', `translate(${x} ${y})`); rb.setAttribute('transform', `rotate(${lean}) scale(1 ${sq})`); }
        else { const o = Math.min(1, (e - N * (PASS + LIFT)) / 260); roll.setAttribute('transform', `translate(${X1 + 140 * o} ${(N - 1) * CH + CH / 2 + 160 * o})`); }
        if (e < T) raf = requestAnimationFrame(step); else { raf = 0; base.forEach((b) => b.setAttribute('fill', hex)); nw.forEach((r) => r.setAttribute('width', 0)); cur = hex; roll.setAttribute('transform', 'translate(-120 -120)'); } };
      raf = requestAnimationFrame(step);
    }
    const dry = (i) => { const w = wet[i]; w.classList.remove('vdry'); void w.getBBox(); w.classList.add('vdry'); };
    // ColorPlus: boards arrive finished; each course turns over, bottom course first
    function turnOver(hex) {
      settle(tgt); tgt = hex; setTrim('cp');
      for (let k = 0; k < N; k++) { const i = N - 1 - k, d = k * 55;
        timers.push(setTimeout(() => { crs[i].classList.remove('vturn'); void crs[i].getBBox(); crs[i].classList.add('vturn'); }, d));
        timers.push(setTimeout(() => base[i].setAttribute('fill', hex), d + 180)); }
      timers.push(setTimeout(() => { crs.forEach((g) => g.classList.remove('vturn')); cur = hex; }, N * 55 + 420));
    }
    const apply = () => { const hex = hexOf(route, pick[route]); read();
      if (RM) { setTrim(route); tgt = hex; settle(hex); return; } if (route === 'sw') rollOn(hex); else turnOver(hex); };
    const mark = () => sets.forEach((set) => { const r = set.dataset.r; set.hidden = r !== route;
      [...set.children].forEach((b, i) => { b.setAttribute('aria-checked', i === pick[r]); b.tabIndex = i === pick[r] ? 0 : -1; }); });
    const radios = (bs, onSet) => bs.forEach((b, i) => {
      b.addEventListener('click', () => onSet(i));
      b.addEventListener('keydown', (e) => { const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
        let n = -1; if (d) n = (i + d + bs.length) % bs.length; else if (e.key === 'Home') n = 0; else if (e.key === 'End') n = bs.length - 1;
        if (n >= 0) { e.preventDefault(); onSet(n); bs[n].focus(); } }); });
    radios(fbs, (i) => { const r = fbs[i].dataset.r; fbs.forEach((b, j) => { b.setAttribute('aria-checked', j === i); b.tabIndex = j === i ? 0 : -1; }); if (r === route) return; route = r; mark(); apply(); });
    sets.forEach((set) => { const bs = [...set.children]; radios(bs, (i) => { pick[set.dataset.r] = i; mark(); apply(); }); });
    mark(); read(); setTrim('sw');
    // arrival: on first view the roller rolls the default colour over a primer-white wall, once
    if (RM) { tgt = hexOf('sw', pick.sw); settle(tgt); }
    else new IntersectionObserver((es, io) => es.forEach((e) => { if (e.isIntersecting && !seen) { seen = true; io.disconnect(); rollOn(hexOf('sw', pick.sw)); } }), { threshold: 0.4 }).observe(s.querySelector('.vwall'));
  }
  return { L, wire };
})();
