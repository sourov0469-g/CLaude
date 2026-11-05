/* VISUALISER I and J (overnight ladder, Round 13 — the Visualiser reaches 10). Colours: the published ColorPlus values
   (Vis2.CP). Profile and texture figures: the firm's records (FACTS.md, as on the services boards).
   I — look closer (Apple AirPods Pro: the product in close-up). A drawn wall section in the profile and texture you
       choose; a loupe magnifies it under the pointer (drag it on touch); each choice carries its documented share.
   J — your house on the street (Cowboy: warmth, the neighbourhood). Five drawn houses in a row; the middle one is yours.
       Paint it from the published colours and see it among neighbours drawn in other published colours. */
window.Vis5 = (function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const BOOK = 'https://www.austinprosiding.com/schedule-appointment';
  const CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4"/></svg>';
  const book = `<a class="btn key" href="${BOOK}">Book a free inspection<span class="tab">${CAL}</span></a>`;
  const CP = () => (window.Vis2 ? Vis2.CP : []);

  /* ---------- I ---------- */
  const PROF = [['lap', 'Lap, 8.25 in', '301 of 415 priced siding jobs: HardiePlank lap, 7 in exposure'], ['bnb', 'Board and batten', '27 of 415: 4 ft HardiePanel with 2.5 in battens']];
  const TEX = [['ced', 'Select Cedarmill', '286 of 415 chose this wood-grain texture'], ['smo', 'Smooth', '36 of 415 went smooth']];
  const wall = (id) => { let lap = '', bnb = ''; for (let y = 0; y < 400; y += 28) lap += `<rect x="0" y="${y}" width="600" height="28" class="cr"/><path d="M0 ${y + 27}H600" class="sh"/><path d="M0 ${y + 1}H600" class="hl"/>`;
    for (let x = 0; x < 600; x += 60) bnb += `<rect x="${x + 26}" y="0" width="9" height="400" class="bt"/><path d="M${x + 35} 0V400" class="sh"/>`;
    return `<svg class="wsec" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><filter id="${id}g" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".012 .35" numOctaves="3" seed="4"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .22 0"/><feComposite in2="SourceGraphic" operator="in"/></filter></defs>
      <rect class="base" width="600" height="400"/><g class="p-lap">${lap}</g><g class="p-bnb"><rect class="pnl" width="600" height="400"/>${bnb}</g><rect class="grain" width="600" height="400" filter="url(#${id}g)"/></svg>`; };
  const I = () => `<section class="sec viI" id="colours" aria-labelledby="viI-h">
    <div class="hd"><h2 class="sec-h" id="viI-h" data-split>Look closer.</h2><p class="sec-p">Profile and texture, up close. Move over the wall to look through the loupe.</p></div>
    <div class="wrap"><div class="ws" data-p="lap" data-t="ced">${wall('viIa')}<div class="loupe" aria-hidden="true"><div class="lz">${wall('viIb')}</div></div><span class="hint">Move to look closer</span></div>
      <div class="side"><fieldset><legend>Profile</legend>${PROF.map(([k, n, d], i) => `<label><input type="radio" name="viI-p" value="${k}" ${i ? '' : 'checked'}><span><b>${n}</b><small>${d}</small></span></label>`).join('')}</fieldset>
        <fieldset><legend>Texture</legend>${TEX.map(([k, n, d], i) => `<label><input type="radio" name="viI-t" value="${k}" ${i ? '' : 'checked'}><span><b>${n}</b><small>${d}</small></span></label>`).join('')}</fieldset>
        <div class="sw" role="radiogroup" aria-label="Colour">${CP().filter((_, i) => [15, 11, 6, 3, 0, 16].includes(i)).map(([n, h], i) => `<button type="button" role="radio" aria-checked="${!i}" aria-label="${n}" data-h="${h}" style="--c:${h}"></button>`).join('')}</div>${book}</div></div></section>`;

  function wireI(root) {
    const s = root.querySelector('.viI'); if (!s) return; const ws = s.querySelector('.ws'), lp = s.querySelector('.loupe'), lz = s.querySelector('.lz');
    s.querySelectorAll('input[name="viI-p"]').forEach((i) => i.addEventListener('change', () => (ws.dataset.p = i.value)));
    s.querySelectorAll('input[name="viI-t"]').forEach((i) => i.addEventListener('change', () => (ws.dataset.t = i.value)));
    const sws = [...s.querySelectorAll('.sw button')]; const pick = (k, f) => { sws.forEach((b, j) => { b.setAttribute('aria-checked', j === k); b.tabIndex = j === k ? 0 : -1; }); ws.style.setProperty('--c', sws[k].dataset.h); if (f) sws[k].focus(); };
    sws.forEach((b, k) => { b.addEventListener('click', () => pick(k)); b.addEventListener('keydown', (e) => { const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key]; if (d) { e.preventDefault(); pick((k + d + sws.length) % sws.length, true); } }); }); pick(0);
    const Z = 2.6; let on = false;
    const place = (x, y) => { const r = ws.getBoundingClientRect(), lx = Math.max(0, Math.min(r.width, x - r.left)), ly = Math.max(0, Math.min(r.height, y - r.top)), R = lp.offsetWidth / 2;
      lp.style.transform = `translate(${lx - R}px,${ly - R}px)`; lz.style.width = r.width + 'px'; lz.style.height = r.height + 'px'; lz.style.transform = `translate(${R - lx * Z}px,${R - ly * Z}px) scale(${Z})`; };
    ws.addEventListener('pointerenter', () => { on = true; ws.classList.add('lens'); });
    ws.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') { on = false; ws.classList.remove('lens'); } });
    ws.addEventListener('pointermove', (e) => place(e.clientX, e.clientY));
    ws.addEventListener('pointerdown', (e) => { ws.classList.add('lens'); place(e.clientX, e.clientY); });
    // touch and first view: the loupe rests on the middle of the wall so the close-up is visible without a pointer
    const r0 = ws.getBoundingClientRect(); requestAnimationFrame(() => { const r = ws.getBoundingClientRect(); place(r.left + r.width * 0.62, r.top + r.height * 0.45); ws.classList.add('lens'); });
    void on; void r0;
  }

  /* ---------- J ---------- */
  const NB = [['Arctic White', '#E0E0D8'], ['Khaki Brown', '#A28F7D'], null, ['Pearl Gray', '#B2AEA9'], ['Timber Bark', '#7B7064']];
  const SHAPES = [(x) => `M${x} 118L${x + 70} 64L${x + 140} 118V210H${x}Z`, (x) => `M${x} 104L${x + 30} 74H${x + 120}L${x + 150} 104V210H${x}Z`,
    (x) => `M${x} 96L${x + 85} 30L${x + 170} 96V210H${x}Z`, (x) => `M${x} 120L${x + 65} 76L${x + 130} 120V210H${x}Z`, (x) => `M${x} 84H${x + 140}V210H${x}Z`];
  const XS = [10, 168, 336, 524, 672];
  const street = () => `<svg class="st2" viewBox="0 0 830 250" aria-hidden="true"><path class="gr" d="M0 212H830"/><path class="rd" d="M0 232H830"/>
    ${XS.map((x, i) => { const d = SHAPES[i](x), w = i === 2 ? 170 : i === 1 ? 150 : 140; const c = NB[i] ? NB[i][1] : 'var(--c)';
      return `<g class="hz${i === 2 ? ' me' : ''}"><path d="${d}" class="bd" style="fill:${c}"/>${i === 2 ? `<clipPath id="viJc"><rect class="wipe" x="${x}" y="30" width="${w}" height="182"/></clipPath><path d="${d}" class="bd new" clip-path="url(#viJc)"/>` : ''}
        <path d="${d}" class="ol"/><rect x="${x + w * 0.16}" y="${i === 2 ? 128 : 140}" width="${w * 0.22}" height="34" class="wn"/><rect x="${x + w * 0.62}" y="${i === 2 ? 128 : 140}" width="${w * 0.22}" height="34" class="wn"/><rect x="${x + w * 0.42}" y="170" width="${w * 0.16}" height="42" class="dr"/></g>`; }).join('')}
    <g class="tag" transform="translate(421 18)"><rect x="-34" y="-13" width="68" height="26" rx="13"/><text y="5">Yours</text></g></svg>`;
  const J = () => `<section class="sec viJ" id="colours" aria-labelledby="viJ-h">
    <div class="hd"><h2 class="sec-h" id="viJ-h" data-split>Your house, on the street.</h2><p class="sec-p">The middle house is yours. Paint it from the ColorPlus colours for Austin and see how it sits beside the neighbours.</p></div>
    <div class="stw">${street()}<p class="nm" aria-live="polite"><b></b><span></span></p></div>
    <div class="pal" role="radiogroup" aria-label="Your colour">${CP().map(([n, h], i) => `<button type="button" role="radio" aria-checked="${n === 'Evening Blue'}" aria-label="${n}" data-i="${i}" style="--c:${h}"><span>${n}</span></button>`).join('')}</div>
    <p class="note">Neighbours are drawn in other ColorPlus colours for contrast. Screens show colour a little differently.</p>${book}</section>`;

  function wireJ(root) {
    const s = root.querySelector('.viJ'); if (!s) return; const stw = s.querySelector('.stw'), bs = [...s.querySelectorAll('.pal button')], newp = s.querySelector('.bd.new'), wipe = s.querySelector('.wipe');
    let prev = null;
    const pick = (i, f) => { const [n, h] = CP()[i]; bs.forEach((b, k) => { b.setAttribute('aria-checked', k === i); b.tabIndex = k === i ? 0 : -1; });
      s.querySelector('.nm b').textContent = n; s.querySelector('.nm span').textContent = 'ColorPlus · ' + h;
      if (RM || !prev) { stw.style.setProperty('--c', h); newp.style.fill = h; } else { newp.style.fill = h; wipe.style.transition = 'none'; wipe.style.transform = 'scaleY(0)'; void wipe.getBoundingClientRect();
        requestAnimationFrame(() => { wipe.style.transition = ''; wipe.style.transform = 'scaleY(1)'; setTimeout(() => stw.style.setProperty('--c', h), 750); }); }
      prev = h; if (f) bs[i].focus(); };
    bs.forEach((b, i) => { b.addEventListener('click', () => pick(i)); b.addEventListener('keydown', (e) => { const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]; if (d) { e.preventDefault(); pick((i + d + bs.length) % bs.length, true); } }); });
    pick(Math.max(0, CP().findIndex(([n]) => n === 'Evening Blue')));
  }
  return { I, J, wire(root) { wireI(root); wireJ(root); } };
})();
