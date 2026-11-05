/* SERVICES N (new-versions addendum, pass 4) — "Built trade by trade". Reference: Apple AirPods Pro (the pinned scroll,
   the product assembling itself as you scroll, numbers landing as events). The section pins and a drawn house is built in
   the order of the firm's record, most documented first; each layer lands with its trade's documented count as a big
   numeral and its published median band. Counts and bands exactly as Services L and M use them; never summed. The
   drawing is a generic house (an interface graphic). Previous / Next and trade chips step without scrolling. */
window.Svc8 = (function () {
  const BOOK = 'https://www.austinprosiding.com/schedule-appointment';
  const CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4"/></svg>';
  // [trade, count, count line, band line, timeline]
  const T = [['Siding', 431, 'documented siding jobs', '$10k–$15k median band (415 priced)', '1 to 2 weeks including paint.'],
    ['Windows', 388, 'documented window jobs', '$10k–$15k median band (376 priced)', 'Most window-only jobs: two days on site.'],
    ['Exterior painting', 320, 'documented projects', '$2k–$5k median band (317 priced)', ''],
    ['Shingle roofing', 210, 'documented projects', '$10k–$15k median band (204 priced)', ''],
    ['Gutters', 121, 'documented projects', '$2k–$5k median band (109 priced)', ''],
    ['Exterior doors', 109, 'documented projects', '$2k–$5k median band (96 priced)', ''],
    ['Patio covers', 34, 'documented projects', '$15k–$20k median band (33 priced)', ''],
    ['Metal roofing', 31, 'documented projects', '$20k–$25k median band (29 priced)', ''],
    ['Garage doors', 9, 'documented projects', '$2k–$5k median band (6 priced)', '']];
  const CLOSE = 'One free inspection covers every trade on the house.';
  const lap = (x, y, w, h, step) => { let s = ''; for (let yy = y + step; yy < y + h; yy += step) s += `<rect x="${x}" y="${yy - 2}" width="${w}" height="2"/>`; return s; };
  const WALL = 'M262 230H638V470H262Z M92 300H262V470H92Z';
  const house = () => `<svg class="snhouse" viewBox="40 90 840 410" role="img" aria-label="A drawn house built trade by trade: siding, windows, paint, shingle roof, gutters, front door, patio cover, metal porch roof and garage door.">
    <defs><clipPath id="snWall"><path d="${WALL}"/></clipPath></defs>
    <rect x="50" y="470" width="820" height="16" rx="4" fill="#E4EAE5"/>
    <g class="snframe" fill="none" stroke="#B9C4BE" stroke-width="2" stroke-dasharray="6 6"><path d="${WALL}"/><path d="M240 230L300 140H600L660 230"/><path d="M80 300L106 256H250L270 300"/><path d="M650 330V470M812 330V470M640 322H824"/></g>
    <g class="snl" data-s="0"><path d="${WALL}" fill="#DCD8CE"/><g clip-path="url(#snWall)" fill="rgba(10,22,17,.14)">${lap(92, 230, 546, 240, 16)}${lap(92, 300, 170, 170, 16)}</g></g>
    <g class="snl" data-s="1" fill="#F3F1EB">
      <rect x="292" y="292" width="76" height="92"/><rect x="300" y="300" width="60" height="76" fill="#A9C0C8"/><rect x="328" y="300" width="4" height="76"/><rect x="300" y="336" width="60" height="4"/>
      <rect x="532" y="292" width="76" height="92"/><rect x="540" y="300" width="60" height="76" fill="#A9C0C8"/><rect x="568" y="300" width="4" height="76"/><rect x="540" y="336" width="60" height="4"/>
      <rect x="284" y="384" width="92" height="7"/><rect x="524" y="384" width="92" height="7"/></g>
    <g class="snl" data-s="2"><path d="${WALL}" fill="#4F5F68"/><g clip-path="url(#snWall)" fill="rgba(255,255,255,.10)">${lap(92, 230, 546, 240, 16)}${lap(92, 300, 170, 170, 16)}</g>
      <g fill="#F3F1EB"><rect x="262" y="230" width="9" height="240"/><rect x="629" y="230" width="9" height="240"/><rect x="92" y="300" width="8" height="170"/>
      <rect x="292" y="292" width="76" height="92" fill="none" stroke="#F3F1EB" stroke-width="8"/><rect x="532" y="292" width="76" height="92" fill="none" stroke="#F3F1EB" stroke-width="8"/>
      <rect x="300" y="300" width="60" height="76" fill="#A9C0C8"/><rect x="328" y="300" width="4" height="76"/><rect x="300" y="336" width="60" height="4"/>
      <rect x="540" y="300" width="60" height="76" fill="#A9C0C8"/><rect x="568" y="300" width="4" height="76"/><rect x="540" y="336" width="60" height="4"/></g></g>
    <g class="snl" data-s="3"><path d="M232 234L298 136H602L668 234Z" fill="#363C40"/><path d="M74 304L104 252H252L276 304Z" fill="#363C40"/>
      <g fill="rgba(255,255,255,.08)"><rect x="262" y="160" width="376" height="2"/><rect x="250" y="184" width="400" height="2"/><rect x="238" y="208" width="424" height="2"/><rect x="92" y="272" width="168" height="2"/></g></g>
    <g class="snl" data-s="4" fill="#E9E6DE"><rect x="232" y="232" width="436" height="9" rx="4"/><rect x="74" y="302" width="202" height="8" rx="4"/><rect x="652" y="236" width="9" height="234" rx="4"/></g>
    <g class="snl" data-s="5"><rect x="414" y="356" width="72" height="114" fill="#F3F1EB"/><rect x="422" y="364" width="56" height="106" fill="#0E3B2C"/><circle cx="470" cy="420" r="3.5" fill="#E9E6DE"/></g>
    <g class="snl" data-s="6"><g fill="#8A6E5E"><rect x="650" y="330" width="8" height="140"/><rect x="806" y="330" width="8" height="140"/></g><rect x="638" y="318" width="188" height="14" rx="3" fill="#6F5848"/>
      <g fill="#6F5848"><rect x="660" y="332" width="4" height="10"/><rect x="700" y="332" width="4" height="10"/><rect x="740" y="332" width="4" height="10"/><rect x="780" y="332" width="4" height="10"/></g></g>
    <g class="snl" data-s="7"><path d="M396 352L410 330H490L504 352Z" fill="#7C8B90"/><g fill="rgba(255,255,255,.25)"><rect x="420" y="332" width="2" height="20"/><rect x="440" y="332" width="2" height="20"/><rect x="460" y="332" width="2" height="20"/><rect x="480" y="332" width="2" height="20"/></g></g>
    <g class="snl" data-s="8"><rect x="112" y="356" width="130" height="114" fill="#F3F1EB"/><rect x="120" y="364" width="114" height="106" fill="#E2E0D8"/>
      <g fill="rgba(10,22,17,.16)"><rect x="120" y="390" width="114" height="2"/><rect x="120" y="416" width="114" height="2"/><rect x="120" y="442" width="114" height="2"/></g></g>
  </svg>`;

  const N = () => `<section class="sec snN" id="services" aria-labelledby="snN-h">
    <div class="snsticky" data-solid>
      <div class="sntext">
        <h2 class="sec-h" id="snN-h" data-split>Built trade by trade.</h2>
        <p class="snlead">Scroll, and the house goes together in the order of our record, most documented trade first.</p>
        <div class="snnum" aria-hidden="true"><span class="snd">—</span></div>
        <p class="sntrade" aria-hidden="true">Scroll to start</p>
        <p class="snband" aria-hidden="true"></p>
        <p class="snclose">${CLOSE}</p>
        <div class="snchips" role="group" aria-label="Trades, most documented first">${T.map((t, i) => `<button type="button" class="snc" data-s="${i}" aria-pressed="false">${t[0]}</button>`).join('')}</div>
        <div class="snnav"><button type="button" class="snb" data-d="-1">‹ Previous</button><button type="button" class="snb" data-d="1">Next ›</button>
          <a class="btn key" href="${BOOK}">Book a free inspection<span class="tab">${CAL}</span></a></div>
      </div>
      <figure class="snfig">${house()}</figure>
    </div>
    <dl class="snall">${T.map((t) => `<div><dt>${t[0]}</dt><dd>${t[1]} ${t[2]} · ${t[3]}${t[4] ? ' · ' + t[4] : ''}</dd></div>`).join('')}</dl>
    <p class="snfoot">Counts are documented projects from our service list; one project can include several trades. Bands are each trade's median price band, materials and labor, before discounts.</p>
    <p class="vh snlive" aria-live="polite"></p></section>`;

  function wire(root) {
    const s = root.querySelector('.snN'); if (!s || s.dataset.w) return; s.dataset.w = 1;
    const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const L = [...s.querySelectorAll('.snl')], chips = [...s.querySelectorAll('.snc')], num = s.querySelector('.snnum'), tr = s.querySelector('.sntrade'), bd = s.querySelector('.snband'), live = s.querySelector('.snlive');
    let st = -2, manual = false;
    const roll = (txt) => { const old = num.querySelector('.snd:last-child'); if (old.textContent === txt) return; const nw = document.createElement('span'); nw.className = 'snd' + (RM ? '' : ' snin'); nw.textContent = txt; num.appendChild(nw);
      if (RM) { old.remove(); return; } old.classList.add('snout'); setTimeout(() => old.remove(), 600); requestAnimationFrame(() => requestAnimationFrame(() => nw.classList.remove('snin'))); };
    const show = (k, say) => { k = Math.max(-1, Math.min(T.length, k)); if (k === st) return; st = k;
      L.forEach((g) => g.classList.toggle('on', +g.dataset.s <= Math.min(k, T.length - 1)));
      chips.forEach((c, i) => c.setAttribute('aria-pressed', i === k));
      s.classList.toggle('sndone', k >= T.length);
      if (k < 0) { roll('—'); tr.textContent = 'Scroll to start'; bd.textContent = ''; return; }
      if (k >= T.length) { roll('All'); tr.textContent = 'the trades, on one house'; bd.textContent = ''; if (say) live.textContent = CLOSE; return; }
      const t = T[k]; roll(String(t[1])); tr.textContent = `${t[0]} · ${t[2]}`; bd.textContent = t[3] + (t[4] ? ' ' + t[4] : '');
      if (say) live.textContent = `${t[0]}: ${t[1]} ${t[2]}, ${t[3]}.`; };
    const prog = () => { const r = s.getBoundingClientRect(), run = r.height - innerHeight; return run > 0 ? Math.max(0, Math.min(1, -r.top / run)) : 1; };
    const onScroll = () => { if (RM || manual) return; const p = prog(); show(p >= 0.92 ? T.length : Math.floor(Math.min(0.9999, p / 0.9) * (T.length + 1)) - 1); };
    chips.forEach((c, i) => c.addEventListener('click', () => { manual = true; show(i, true); }));
    s.querySelectorAll('.snb').forEach((b) => b.addEventListener('click', () => { manual = true; show(st + +b.dataset.d, true); }));
    addEventListener('scroll', () => { manual = false; onScroll(); }, { passive: true });
    if (RM) show(T.length); else { show(-1); onScroll(); }
  }
  return { N, wire, T };
})();
