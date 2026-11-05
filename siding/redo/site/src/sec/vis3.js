/* VISUALISER E and F (overnight ladder, Round 11). Colours: the firm's published values only (Vis2.CP: James Hardie
   ColorPlus for Austin; Vis2.SW: the Sherwin-Williams samples it publishes). Wall configurators stay in this slot only.
   E — pairings (Ever, craft note only: selection and filtering presentation). Twelve drawn house fronts, each painted in
       a body colour with a trim, filterable by light, mid and dark bodies; open one to see it large and step through.
       The pairings are our suggestions, labelled so; nothing claims a customer chose them.
   F — the colour map (Cash App Brand Guidelines: colour treated as a system). Every published colour placed by its
       lightness and its warmth, both computed from its published value; choose a dot to see it on a house beside its
       three nearest neighbours. */
window.Vis3 = (function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const BOOK = 'https://www.austinprosiding.com/schedule-appointment';
  const CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4"/></svg>';
  const book = `<a class="btn key" href="${BOOK}">Book a free inspection<span class="tab">${CAL}</span></a>`;
  const V = () => window.Vis2 || { CP: [], SW: [], ink: () => '#fff' };
  const hex2 = (h) => [1, 3, 5].map((i) => parseInt(h.substr(i, 2), 16) / 255);
  const lum = (h) => { const c = hex2(h).map((x) => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4)); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
  // a house front: body fill, trim on corners, fascia, casings and door
  const house = (body, trim, cls) => { let lap = ''; for (let y = 108; y < 196; y += 9) lap += `<path d="M34 ${y}H206"/>`;
    return `<svg class="hs ${cls || ''}" viewBox="0 0 240 210" aria-hidden="true" style="--b:${body};--t:${trim}"><path class="bd" d="M34 104L120 44L206 104V198H34Z"/><g class="ln">${lap}</g>
      <path class="tr" d="M26 108L120 40L214 108" stroke-width="7"/><path class="tr" d="M34 104V198M206 104V198" stroke-width="7"/>
      <rect class="wn" x="56" y="122" width="38" height="44"/><rect class="wn" x="146" y="122" width="38" height="44"/><rect class="dr" x="104" y="140" width="32" height="58"/>
      <path class="tr" d="M56 122h38v44H56zM146 122h38v44h-38zM104 140h32v58h-32z" stroke-width="4"/><path class="gd" d="M14 199H226"/></svg>`; };

  /* ---------- E ---------- */
  // body index in CP → trim name/hex (our suggested pairings)
  const AW = ['Arctic White', '#E0E0D8'], TB = ['Tricorn Black SW 6258', '#2F2F30'], TBK = ['Timber Bark', '#7B7064'];
  const PAIRS = [[15, AW], [11, AW], [12, AW], [6, AW], [5, AW], [16, AW], [9, AW], [14, AW], [0, TB], [1, TBK], [7, TB], [3, AW]];
  const tone = (h) => { const l = lum(h); return l > 0.45 ? 'light' : l > 0.15 ? 'mid' : 'dark'; };
  const E = () => { const cp = V().CP;
    return `<section class="sec viE" id="colours" aria-labelledby="viE-h">
      <div class="hd"><div><h2 class="sec-h" id="viE-h" data-split>Pairings to start from.</h2><p class="sec-p">Twelve body and trim pairings from the ColorPlus colours offered in Austin. Our suggestions only; the choice is yours at the free inspection.</p></div>
        <div class="flt" role="group" aria-label="Show bodies">${[['all', 'All 12'], ['light', 'Light'], ['mid', 'Mid'], ['dark', 'Dark']].map(([k, n], i) => `<button type="button" data-f="${k}" aria-pressed="${!i}">${n}</button>`).join('')}</div></div>
      <ul class="grid">${PAIRS.map(([bi, tr], i) => { const [n, h] = cp[bi] || ['', '#888']; return `<li data-tone="${tone(h)}"><button type="button" class="pr" data-i="${i}" aria-label="${n} body with ${tr[0]} trim">${house(h, tr[1])}<span class="nm"><b>${n}</b><small>Trim: ${tr[0]}</small></span></button></li>`; }).join('')}</ul>
      <div class="big" hidden><div class="bh"></div><div class="bt"><p class="k">Pairing <b class="ix">1</b> of ${PAIRS.length}</p><h3></h3><p class="hx"></p>
        <div class="nav"><button type="button" class="arw" data-d="-1" aria-label="Previous pairing"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg></button><button type="button" class="arw" data-d="1" aria-label="Next pairing"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg></button><button type="button" class="cls">Back to all</button></div>${book}</div></div>
      <p class="note">ColorPlus is baked on at the factory. Screens show colour a little differently.</p></section>`; };

  function wireE(root) {
    const s = root.querySelector('.viE'); if (!s) return; const cp = V().CP, big = s.querySelector('.big'), grid = s.querySelector('.grid'), items = [...grid.children];
    let cur = 0;
    const show = (i) => { cur = (i + PAIRS.length) % PAIRS.length; const [bi, tr] = PAIRS[cur], [n, h] = cp[bi];
      big.querySelector('.bh').innerHTML = house(h, tr[1], 'hsl'); big.querySelector('h3').textContent = `${n} with ${tr[0]} trim`; big.querySelector('.hx').textContent = `Body ColorPlus ${n} · ${h}   Trim ${tr[0]} · ${tr[1]}`; big.querySelector('.ix').textContent = cur + 1; };
    s.querySelectorAll('.pr').forEach((b) => b.addEventListener('click', () => { show(+b.dataset.i); big.hidden = false; s.classList.add('open'); big.querySelector('.cls').focus(); }));
    s.querySelectorAll('.arw').forEach((b) => b.addEventListener('click', () => show(cur + +b.dataset.d)));
    big.querySelector('.cls').addEventListener('click', () => { big.hidden = true; s.classList.remove('open'); grid.querySelector(`.pr[data-i="${cur}"]`).focus(); });
    big.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight') show(cur + 1); if (e.key === 'ArrowLeft') show(cur - 1); if (e.key === 'Escape') big.querySelector('.cls').click(); });
    s.querySelectorAll('.flt button').forEach((b) => b.addEventListener('click', () => { const f = b.dataset.f; s.querySelectorAll('.flt button').forEach((x) => x.setAttribute('aria-pressed', x === b)); items.forEach((li) => (li.hidden = f !== 'all' && li.dataset.tone !== f)); }));
    if (RM) s.classList.add('in'); else new IntersectionObserver((es, io) => es.forEach((e) => { if (e.isIntersecting) { io.disconnect(); s.classList.add('in'); } }), { threshold: 0.2 }).observe(grid);
  }

  /* ---------- F ---------- */
  // warmth: (red − blue) of the published value; lightness: relative luminance. Both are computed, not judged.
  const F = () => `<section class="sec viF" id="colours" aria-labelledby="viF-h">
    <div class="hd"><h2 class="sec-h" id="viF-h" data-split>The colour map.</h2><p class="sec-p">Every colour we publish, placed by how light it is and how warm or cool it is. Choose a dot to see it on a house beside its nearest neighbours.</p></div>
    <div class="wrap"><div class="map"><span class="ax yt" aria-hidden="true">↑ Lighter</span><span class="ax yb" aria-hidden="true">↓ Darker</span><div class="ax x" aria-hidden="true"><span>Cooler</span><span>Warmer</span></div>
        <div class="pl" role="radiogroup" aria-label="Colours"></div><p class="lgd2" aria-hidden="true"><span><i class="c"></i>ColorPlus, factory finish</span><span><i class="s"></i>Painted on site (Sherwin-Williams)</span></p></div>
      <div class="side"><div class="pick2" aria-live="polite"></div><p class="k">Nearest neighbours</p><div class="nb"></div>${book}</div></div>
    <p class="note">Positions are computed from each colour's published value. Screens show colour a little differently.</p></section>`;

  function wireF(root) {
    const s = root.querySelector('.viF'); if (!s) return; const v = V(), pl = s.querySelector('.pl'), hero = s.querySelector('.pick2'), nb = s.querySelector('.nb');
    const C = [...v.CP.map(([n, h]) => ({ n, h, f: 'ColorPlus' })), ...v.SW.map(([n, h]) => ({ n, h, f: 'Painted' }))];
    C.forEach((c) => { const [r, , b] = hex2(c.h); c.l = Math.sqrt(lum(c.h)); c.w = r - b; });
    const wMin = Math.min(...C.map((c) => c.w)), wMax = Math.max(...C.map((c) => c.w)), lMin = Math.min(...C.map((c) => c.l)), lMax = Math.max(...C.map((c) => c.l));
    C.forEach((c, i) => { c.x = 6 + (c.w - wMin) / (wMax - wMin || 1) * 88; c.y = 6 + (1 - (c.l - lMin) / (lMax - lMin || 1)) * 88;
      const b = document.createElement('button'); b.type = 'button'; b.className = 'dot ' + (c.f === 'ColorPlus' ? 'cp' : 'sw'); b.setAttribute('role', 'radio'); b.setAttribute('aria-checked', 'false'); b.setAttribute('aria-label', `${c.n}, ${c.f}`);
      b.style.cssText = `left:${c.x}%;top:${c.y}%;--c:${c.h};--d:${(i * 0.025).toFixed(3)}s`; b.addEventListener('click', () => pick(i)); c.el = b; pl.append(b); });
    let cur = -1;
    function pick(i, focus) { cur = i; const c = C[i]; C.forEach((x, k) => { x.el.setAttribute('aria-checked', k === i); x.el.tabIndex = k === i ? 0 : -1; });
      const near = C.map((x, k) => [k, Math.hypot(x.x - c.x, x.y - c.y)]).filter(([k]) => k !== i).sort((a, b) => a[1] - b[1]).slice(0, 3).map(([k]) => C[k]);
      hero.innerHTML = `${house(c.h, '#E0E0D8', 'hsl')}<h3>${c.n}</h3><p class="hx">${c.f === 'ColorPlus' ? 'ColorPlus' : 'Painted'} · ${c.h}</p>`;
      nb.innerHTML = near.map((x) => `<button type="button" class="nbi" data-k="${C.indexOf(x)}">${house(x.h, '#E0E0D8')}<span>${x.n}</span></button>`).join('');
      nb.querySelectorAll('.nbi').forEach((b) => b.addEventListener('click', () => pick(+b.dataset.k, true)));
      C.forEach((x, k) => x.el.classList.toggle('near', near.includes(x))); if (focus) c.el.focus(); }
    pl.addEventListener('keydown', (e) => { if (cur < 0) return; const c = C[cur]; const dir = { ArrowRight: [1, 0], ArrowLeft: [-1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[e.key]; if (!dir) return; e.preventDefault();
      let best = -1, bd = 1e9; C.forEach((x, k) => { if (k === cur) return; const dx = x.x - c.x, dy = x.y - c.y; if (dx * dir[0] + dy * dir[1] <= 0) return; const d = Math.hypot(dx, dy) + Math.abs(dx * dir[1] - dy * dir[0]) * 1.5; if (d < bd) { bd = d; best = k; } }); if (best >= 0) pick(best, true); });
    pick(C.findIndex((c) => c.n === 'Iron Gray'));
    if (RM) s.classList.add('in'); else new IntersectionObserver((es, io) => es.forEach((e) => { if (e.isIntersecting) { io.disconnect(); s.classList.add('in'); } }), { threshold: 0.25 }).observe(pl);
  }
  return { E, F, wire(root) { wireE(root); wireF(root); }, house, lum, hex2 };
})();
