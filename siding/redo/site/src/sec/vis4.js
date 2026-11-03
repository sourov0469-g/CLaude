/* VISUALISER G and H (overnight ladder, Round 12). Colours: the published ColorPlus values for Austin (Vis2.CP).
   G — four questions (Quiet Cubes: the visualiser as a design service). The questions a designer would ask — the roof,
       any brick or stone, the shade, the look you like — answered with plain choices; three ColorPlus colours are
       suggested as a starting point, each with the visual reason, updating as you answer. Reasons are about how the
       colours look together, never about heat, energy or value.
   H — colour in Austin light (Scout Motors: filmic light). One wall of lap siding in the colour you choose, seen in
       morning sun, at noon, in shade and at dusk; the eave's shadow moves with the light. */
window.Vis4 = (function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const BOOK = 'https://www.austinprosiding.com/schedule-appointment';
  const CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4"/></svg>';
  const book = `<a class="btn key" href="${BOOK}">Book a free inspection<span class="tab">${CAL}</span></a>`;
  const CP = () => (window.Vis2 ? Vis2.CP : []);
  const V3 = () => window.Vis3 || { house: () => '', lum: () => 0.2, hex2: () => [0, 0, 0] };

  /* ---------- G ---------- */
  const QS = [['roof', 'What colour is the roof?', [['dark', 'Dark: black or charcoal'], ['brown', 'Brown'], ['light', 'Light grey or weathered']]],
    ['mas', 'Any brick or stone on the house?', [['none', 'None'], ['brick', 'Red or brown brick'], ['stone', 'Light stone']]],
    ['shade', 'How much shade does the front get?', [['sun', 'Full sun'], ['some', 'Some'], ['lots', 'A lot']]],
    ['look', 'Which look do you lean to?', [['crisp', 'Crisp and light'], ['earthy', 'Warm and earthy'], ['deep', 'Deep and dramatic']]]];
  const G = () => `<section class="sec viG" id="colours" aria-labelledby="viG-h">
    <div class="hd"><h2 class="sec-h" id="viG-h" data-split>Four questions, three colours.</h2><p class="sec-p">Answer what you can. Three ColorPlus colours to start from appear as you go, each with the reason.</p></div>
    <div class="wrap"><form class="qs" onsubmit="return false">${QS.map(([k, q, o], i) => `<fieldset><legend><span class="no">${i + 1}</span>${q}</legend><div class="op">${o.map(([v, n]) => `<label><input type="radio" name="viG-${k}" value="${v}"><span>${n}</span></label>`).join('')}</div></fieldset>`).join('')}</form>
      <div class="res" data-solid aria-live="polite"><p class="k">To start from</p><div class="cards"></div><p class="sm">A starting point, not a rule. The choice is yours at the free inspection.</p>${book}</div></div></section>`;

  function wireG(root) {
    const s = root.querySelector('.viG'); if (!s) return; const v3 = V3(), cards = s.querySelector('.cards');
    const C = CP().map(([n, h]) => { const [r, , b] = v3.hex2(h); return { n, h, l: Math.sqrt(v3.lum(h)), w: r - b }; });
    function score() { const a = {}; s.querySelectorAll('input:checked').forEach((i) => (a[i.name.slice(4)] = i.value));
      const res = C.map((c) => { let sc = 0; const why = [];
        const tl = { crisp: 0.78, earthy: 0.55, deep: 0.38 }[a.look]; if (tl) { sc -= Math.abs(c.l - tl) * 4; if (Math.abs(c.l - tl) < 0.12) why.push({ crisp: 'light and clean', earthy: 'a mid tone with warmth', deep: 'deep and strong' }[a.look]); }
        if (a.look === 'earthy') sc += c.w * 6; if (a.look === 'crisp') sc -= Math.abs(c.w) * 3;
        if (a.roof === 'dark') { sc += (c.l - 0.45) * 1.5; if (c.l > 0.55) why.push('stands apart from a dark roof'); }
        if (a.roof === 'brown') { sc += c.w * 2; if (c.w > 0.02) why.push('sits easily under a brown roof'); }
        if (a.roof === 'light') { sc += (0.6 - c.l) * 1.5; if (c.l < 0.6) why.push('gives a light roof an edge'); }
        if (a.mas === 'brick') { sc += c.w * 3 - Math.max(0, c.w - 0.12) * 8; if (c.w > 0 && c.w < 0.12) why.push('warm enough to sit beside brick'); }
        if (a.mas === 'stone') { sc += (c.l > 0.45 && c.l < 0.75 ? 0.8 : 0) + c.w; if (c.l > 0.45 && c.l < 0.75) why.push('close in value to light stone'); }
        if (a.shade === 'lots') { sc += (c.l - 0.5) * 1.6; if (c.l > 0.6) why.push('stays light in shade'); }
        if (a.shade === 'sun') { sc += (0.75 - c.l) * 0.8; if (c.l < 0.7) why.push('reads well in bright sun'); }
        return { ...c, sc, why: why.slice(0, 2) }; }).sort((x, y) => y.sc - x.sc).slice(0, 3);
      const n = Object.keys(a).length;
      cards.innerHTML = res.map((c, i) => `<figure class="rc" style="--i:${i}">${v3.house(c.h, '#E0E0D8')}<figcaption><b>${c.n}</b><span>${c.why.length ? c.why.join(', ') : (n ? 'a close match to your answers' : 'a popular starting point')}</span></figcaption></figure>`).join('');
      s.classList.toggle('some', n > 0); }
    s.querySelectorAll('input').forEach((i) => i.addEventListener('change', score)); score();
  }

  /* ---------- H ---------- */
  const LIGHT = [['Morning sun', 'mo'], ['Noon', 'no'], ['Shade', 'sh'], ['Dusk', 'du']];
  const wall = () => { let c = ''; for (let i = 0; i < 16; i++) c += `<rect class="crs" x="0" y="${70 + i * 24}" width="800" height="24"/><path class="lp" d="M0 ${70 + i * 24 + 23}H800"/>`;
    return `<svg class="wl" viewBox="0 0 800 460" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="viHs" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="rgba(0,0,0,.55)"/><stop offset="1" stop-color="rgba(0,0,0,0)"/></linearGradient>
      <linearGradient id="viHl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="var(--l1)"/><stop offset="1" stop-color="var(--l2)"/></linearGradient></defs>
      <rect class="base" x="0" y="70" width="800" height="390"/>${c}<rect class="lit" x="0" y="70" width="800" height="390" fill="url(#viHl)"/>
      <rect class="shd" x="0" y="70" width="800" height="200" fill="url(#viHs)"/><rect class="eave" x="0" y="0" width="800" height="70"/><rect class="fas" x="0" y="58" width="800" height="14"/>
      <rect class="win" x="300" y="170" width="200" height="230"/><path class="cas" d="M290 160h220v250H290z M400 170V400 M300 285H500"/></svg>`; };
  const H = () => `<section class="sec viH" id="colours" aria-labelledby="viH-h">
    <div class="hd"><h2 class="sec-h" id="viH-h" data-split>Colour in Austin light.</h2><p class="sec-p">The same colour reads differently through the day. Choose one, then move the light.</p></div>
    <div class="stage" data-solid data-l="mo"><div class="wv">${wall()}</div><p class="nm" aria-live="polite"><b></b><span></span></p>
      <div class="lt" role="radiogroup" aria-label="Light">${LIGHT.map(([n, k], i) => `<button type="button" role="radio" aria-checked="${!i}" data-k="${k}">${n}</button>`).join('')}</div></div>
    <div class="chips" role="radiogroup" aria-label="Colour">${CP().map(([n, h], i) => `<button type="button" role="radio" aria-checked="${n === 'Iron Gray'}" aria-label="${n}" data-i="${i}" style="--c:${h}"></button>`).join('')}</div>
    <p class="note">A drawing, not a photograph: the light is shown as a wash over the colour. Screens show colour a little differently; see real samples at the free inspection.</p>${book}</section>`;

  function wireH(root) {
    const s = root.querySelector('.viH'); if (!s) return; const st = s.querySelector('.stage'), lts = [...s.querySelectorAll('.lt button')], chips = [...s.querySelectorAll('.chips button')];
    const pickL = (i, f) => { lts.forEach((b, k) => { b.setAttribute('aria-checked', k === i); b.tabIndex = k === i ? 0 : -1; }); st.dataset.l = LIGHT[i][1]; s.querySelector('.nm span').textContent = LIGHT[i][0]; if (f) lts[i].focus(); };
    const pickC = (i, f) => { chips.forEach((b, k) => { b.setAttribute('aria-checked', k === i); b.tabIndex = k === i ? 0 : -1; }); const [n, h] = CP()[i]; st.style.setProperty('--c', h); s.querySelector('.nm b').textContent = n; if (f) chips[i].focus(); };
    const keys = (list, fn) => list.forEach((b, i) => { b.addEventListener('click', () => fn(i)); b.addEventListener('keydown', (e) => { const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]; if (d) { e.preventDefault(); fn((i + d + list.length) % list.length, true); } }); });
    keys(lts, pickL); keys(chips, pickC); pickL(0); pickC(Math.max(0, CP().findIndex(([n]) => n === 'Iron Gray')));
  }
  return { G, H, wire(root) { wireG(root); wireH(root); } };
})();
