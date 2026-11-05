/* Visualiser A (swatch fan) and B (snap-together wall). Colours are the firm's published values (FACTS.md):
   James Hardie ColorPlus, the 17 colours offered for Austin, Arctic White trim; or painted on site (Sherwin-Williams). */
window.Vis = (function () {
  const BOOK = 'https://www.austinprosiding.com/schedule-appointment';
  const CP = [['Arctic White', '#E0E0D8'], ['Cobble Stone', '#C6BEB0'], ['Navajo Beige', '#D5C9B2'], ['Khaki Brown', '#A28F7D'], ['Timber Bark', '#7B7064'], ['Rich Espresso', '#5F5A55'],
    ['Mountain Sage', '#706F5E'], ['Light Mist', '#B6BAB5'], ['Pearl Gray', '#B2AEA9'], ['Gray Slate', '#898A87'], ['Boothbay Blue', '#778184'], ['Evening Blue', '#5F696D'],
    ['Deep Ocean', '#49545C'], ['Aged Pewter', '#7D7974'], ['Night Gray', '#6A6D6F'], ['Iron Gray', '#575B59'], ['Countrylane Red', '#714D47']];
  const SW = [['Pure White SW 7005', '#EDECE6'], ['Alabaster SW 7008', '#EDEAE0'], ['Agreeable Gray SW 7029', '#D1CBC1'], ['Repose Gray SW 7015', '#CCC9C0'], ['Accessible Beige SW 7036', '#D1C7B8'],
    ['Dovetail SW 7018', '#908A83'], ['Gauntlet Gray SW 7019', '#78736E'], ['Urbane Bronze SW 7048', '#54504A'], ['Iron Ore SW 7069', '#434341'], ['Tricorn Black SW 6258', '#2F2F30'],
    ['In the Navy SW 9178', '#283849'], ['Hunt Club SW 6468', '#2A4F43']];
  const lum = (h) => { const c = [1, 3, 5].map((i) => parseInt(h.substr(i, 2), 16) / 255).map((x) => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4)); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
  const ink = (h) => (lum(h) > 0.28 ? '#16191D' : '#FFFFFF');
  const CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4"/></svg>';

  /* the house drawn as a real elevation: gable, lap or batten body, corner boards, frieze, casings, sills, door, shingle roof */
  function house() {
    let lap = ''; for (let y = 172; y < 392; y += 11) lap += `<path d="M150 ${y}h300" stroke="rgba(0,0,0,.24)" stroke-width="1.6"/><path d="M150 ${y + 1.6}h300" stroke="rgba(255,255,255,.16)" stroke-width="1"/>`;
    let gl = ''; for (let y = 104; y < 170; y += 11) { const hw = (y - 70) * (150 / 100); gl += `<path d="M${300 - hw} ${y}h${hw * 2}" stroke="rgba(0,0,0,.22)" stroke-width="1.6"/>`; }
    let bat = ''; for (let x = 168; x < 450; x += 22) bat += `<rect x="${x}" y="95" width="5" height="297" fill="rgba(255,255,255,.14)"/><rect x="${x + 5}" y="95" width="2" height="297" fill="rgba(0,0,0,.18)"/>`;
    let sh = ''; for (let i = 0; i < 9; i++) { const y = 66 + i * 11; sh += `<path d="M${300 - (y - 40) * 1.72} ${y}L300 ${y - 0}" stroke="rgba(255,255,255,.08)"/>`; }
    return `<svg class="house" viewBox="0 0 600 430" role="img" aria-label="A house elevation in the chosen colour">
      <defs><clipPath id="hb"><path d="M150 392V170L300 70L450 170V392Z"/></clipPath><linearGradient id="rf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4A5054"/><stop offset="1" stop-color="#2F3437"/></linearGradient></defs>
      <ellipse cx="300" cy="400" rx="240" ry="14" fill="rgba(22,25,29,.12)"/>
      <path class="body" d="M150 392V170L300 70L450 170V392Z"/>
      <g clip-path="url(#hb)"><g class="lines lapl">${lap}${gl}</g><g class="lines batl" style="opacity:0">${bat}</g>
        <rect x="150" y="70" width="300" height="322" fill="url(#sh)" opacity=".0"/><path d="M150 170L300 70L450 170V200L300 100L150 200Z" fill="rgba(0,0,0,.12)"/></g>
      <path d="M128 182L300 60L472 182L462 190L300 76L138 190Z" fill="url(#rf)"/>${sh}
      <path class="trim" d="M128 182L300 60L472 182L468 186L300 66L132 186Z"/>
      <rect class="trim" x="150" y="165" width="300" height="9"/><rect class="trim" x="146" y="165" width="11" height="228"/><rect class="trim" x="443" y="165" width="11" height="228"/>
      <rect class="trim" x="180" y="212" width="72" height="92" rx="1"/><rect x="187" y="219" width="58" height="78" fill="#2B3A44"/><rect x="187" y="219" width="58" height="36" fill="#7F99A9" opacity=".7"/><rect class="trim" x="187" y="255" width="58" height="5"/><rect class="trim" x="175" y="303" width="82" height="7"/>
      <rect class="trim" x="348" y="212" width="72" height="92" rx="1"/><rect x="355" y="219" width="58" height="78" fill="#2B3A44"/><rect x="355" y="219" width="58" height="36" fill="#7F99A9" opacity=".7"/><rect class="trim" x="355" y="255" width="58" height="5"/><rect class="trim" x="343" y="303" width="82" height="7"/>
      <rect class="trim" x="272" y="270" width="56" height="122"/><rect x="279" y="277" width="42" height="115" fill="#1E3B31"/><circle cx="314" cy="336" r="2.6" fill="#C9B98A"/>
      <rect class="trim" x="279" y="116" width="42" height="34"/><rect x="284" y="121" width="32" height="24" fill="#2B3A44"/>
      <rect x="140" y="392" width="320" height="10" fill="#B9B2A4"/></svg>`;
  }

  const A = () => {
    const n = CP.length, span = 128;
    const fan = CP.map(([nm, h], i) => `<button type="button" class="sw" role="radio" aria-checked="${i === 15}" aria-label="${nm}" data-i="${i}" style="--c:${h};--tc:${ink(h)};--a:${(-span / 2 + span * i / (n - 1)).toFixed(1)}deg;z-index:${i}"><span>${nm}</span></button>`).join('');
    return `<section class="sec viA" id="colours" aria-labelledby="viA-h" style="--c:#575B59">
      <div class="side"><h2 class="sec-h" id="viA-h">Fan the colours across your house.</h2>
        <p class="sec-p">James Hardie ColorPlus is baked on at the factory: 17 colours for Austin, with Arctic White trim. Or we paint on site in any of 1,700+ Sherwin-Williams colours.</p>
        <div class="seg" role="group" aria-label="Profile"><button type="button" aria-pressed="true" data-p="lap">Lap 8.25 in</button><button type="button" aria-pressed="false" data-p="bnb">Board &amp; batten</button></div>
        <div class="read" aria-live="polite"><i></i><div><b class="nm">Iron Gray</b><span>ColorPlus, factory-baked, Arctic White trim</span></div></div>
        <a class="btn key" href="${BOOK}">Book a free inspection<span class="tab">${CAL}</span></a>
        <p class="note">Colours drawn from the published ColorPlus values; every screen shows them a little differently.</p></div>
      <div class="stage"><div class="fanbox" role="radiogroup" aria-label="ColorPlus colours">${fan}</div>${house()}
        <div class="slider"><label for="viA-r">Slide through all 17</label><input id="viA-r" type="range" min="0" max="${n - 1}" value="15" aria-valuetext="Iron Gray"></div></div></section>`;
  };
  function wireA(root) {
    const s = root.querySelector('.viA'); if (!s) return; const sws = [...s.querySelectorAll('.sw')], rng = s.querySelector('input[type=range]'), nm = s.querySelector('.nm');
    function pick(i, focus) { sws.forEach((b, k) => b.setAttribute('aria-checked', k === i)); s.style.setProperty('--c', CP[i][1]); nm.textContent = CP[i][0]; rng.value = i; rng.setAttribute('aria-valuetext', CP[i][0]);
      s.querySelector('.read i').style.background = CP[i][1]; if (focus) sws[i].focus(); }
    sws.forEach((b, i) => { b.addEventListener('click', () => pick(i)); b.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { e.preventDefault(); pick(Math.min(CP.length - 1, i + 1), true); }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); pick(Math.max(0, i - 1), true); } }); b.tabIndex = i === 15 ? 0 : -1; });
    rng.addEventListener('input', () => pick(+rng.value));
    s.querySelectorAll('.seg button').forEach((b) => b.addEventListener('click', () => { s.querySelectorAll('.seg button').forEach((x) => x.setAttribute('aria-pressed', x === b));
      const bnb = b.dataset.p === 'bnb'; s.querySelector('.lapl').style.opacity = bnb ? 0 : 1; s.querySelector('.batl').style.opacity = bnb ? 1 : 0; }));
    pick(15);
  }

  /* B: the Quiet Cubes structure: steps left, the object centre, the step's options right, PREV / NEXT */
  const STEPS = [['Profile', 'Lap or board and batten'], ['Texture', 'Cedarmill or smooth'], ['Finish', 'ColorPlus or painted'], ['Colour', 'From the finish you chose'], ['Trim', 'Corners and casings']];
  const B = () => {
    let crs = ''; for (let i = 0; i < 12; i++) crs += `<i class="crs" style="top:calc(${(11 - i) * 100 / 12}% - 2px);--d:${(i * 0.06).toFixed(2)}s"></i>`;
    let pnl = ''; for (let i = 0; i < 6; i++) pnl += `<i class="pnl" style="left:${i * 100 / 6}%;--d:${(i * 0.07).toFixed(2)}s"></i>`;
    let bat = ''; for (let i = 1; i < 12; i++) bat += `<i class="bat" style="left:${i * 100 / 12}%;--d:${(0.35 + i * 0.04).toFixed(2)}s"></i>`;
    return `<section class="sec viB" id="colours" aria-labelledby="viB-h" style="--c:#575B59;--t:#E0E0D8">
      <div class="hd"><div><h2 class="sec-h" id="viB-h">Build your wall, board by board.</h2><p class="sec-p">Five choices, the same ones our project managers walk through at the free inspection.</p></div></div>
      <ol class="steps">${STEPS.map(([a, b], i) => `<li><button type="button" data-s="${i}" ${i ? '' : 'aria-current="step"'}><i>${i + 1}</i><span>${a}<small>${b}</small></span></button></li>`).join('')}</ol>
      <div class="wallbox" role="img" aria-label="A section of wall that builds as you choose"><div class="wall"><span class="wrapword">HOUSE WRAP</span>${crs}${pnl}${bat}<i class="corner l"></i><i class="corner r"></i><div class="win"></div></div><span class="tag" aria-live="polite"></span><span class="stepcap" aria-hidden="true"></span></div>
      <div class="opts"><div class="body"></div><div class="sum" aria-live="polite"></div>
        <div class="nav"><button class="btn light" type="button" data-nav="-1">Back</button><button class="btn" type="button" data-nav="1">Next</button></div></div></section>`;
  };
  function wireB(root) {
    const s = root.querySelector('.viB'); if (!s) return;
    const st = { step: 0, profile: null, texture: 'grain', finish: 'cp', colour: 15, trim: 'arctic' }, wall = s.querySelector('.wall'), body = s.querySelector('.opts .body');
    const list = () => (st.finish === 'cp' ? CP : SW);
    const opt = (k, v, label, sub, on) => `<button type="button" class="opt" role="radio" aria-checked="${on}" data-k="${k}" data-v="${v}">${label}<small>${sub}</small></button>`;
    function render() {
      const L = list(); if (st.colour >= L.length) st.colour = 0; const c = L[st.colour];
      s.style.setProperty('--c', c[1]); s.style.setProperty('--t', st.trim === 'arctic' ? '#E0E0D8' : st.trim === 'match' ? c[1] : '#2F2F30');
      wall.className = 'wall' + (st.profile ? ' ' + st.profile : '') + (st.texture === 'grain' ? ' grain' : '') + (st.step >= 4 || st.trimSet ? ' trimmed' : '');
      const steps = s.querySelectorAll('.steps button'); steps.forEach((b, i) => { b.toggleAttribute('aria-current', i === st.step); if (i === st.step) b.setAttribute('aria-current', 'step'); b.classList.toggle('done', i < st.step); });
      let h = '';
      if (st.step === 0) h = `<h3>Profile</h3><p class="why">Pick one and watch it go up.</p><div class="grid" role="radiogroup" aria-label="Profile">${opt('profile', 'lap', 'Lap, 8.25 in', '301 of 415 priced jobs; 7 in exposure', st.profile === 'lap')}${opt('profile', 'bnb', 'Board &amp; batten', '27 of 415; 4 ft panels, 2.5 in battens', st.profile === 'bnb')}</div>`;
      if (st.step === 1) h = `<h3>Texture</h3><p class="why">Embossed wood grain, or flat.</p><div class="grid" role="radiogroup" aria-label="Texture">${opt('texture', 'grain', 'Select Cedarmill', '286 of 415 priced jobs', st.texture === 'grain')}${opt('texture', 'smooth', 'Smooth', '36 of 415', st.texture === 'smooth')}</div>`;
      if (st.step === 2) h = `<h3>Finish</h3><p class="why">Baked on at the factory, or painted on site.</p><div class="grid" role="radiogroup" aria-label="Finish">${opt('finish', 'cp', 'ColorPlus', '17 colours for Austin, factory-baked', st.finish === 'cp')}${opt('finish', 'sw', 'Painted on site', '1,700+ Sherwin-Williams colours, free colour matching', st.finish === 'sw')}</div>`;
      if (st.step === 3) h = `<h3>Colour</h3><p class="why">${st.finish === 'cp' ? 'The 17 ColorPlus colours for Austin.' : 'Sherwin-Williams samples the firm publishes; any of 1,700+ can be matched.'}</p>
        <div class="grid sw" role="radiogroup" aria-label="Colour">${L.map(([n, x], i) => `<button type="button" class="chip" role="radio" aria-checked="${i === st.colour}" aria-label="${n}" data-k="colour" data-v="${i}" style="--c:${x}"></button>`).join('')}</div><p class="colname">${c[0]}</p>`;
      if (st.step === 4) h = `<h3>Trim</h3><p class="why">Corner boards and casings frame the wall.</p><div class="grid" role="radiogroup" aria-label="Trim">${opt('trim', 'arctic', 'Arctic White', 'the ColorPlus trim colour', st.trim === 'arctic')}${opt('trim', 'match', 'Match the body', 'one colour, quieter look', st.trim === 'match')}${opt('trim', 'dark', 'Tricorn Black', 'painted, high contrast', st.trim === 'dark')}</div>`;
      body.innerHTML = h; s.querySelector('.stepcap').textContent = `Step ${st.step + 1} of 5 · ${STEPS[st.step][0]}`;
      body.querySelectorAll('[data-k]').forEach((b) => b.addEventListener('click', () => { const k = b.dataset.k; st[k] = k === 'colour' ? +b.dataset.v : b.dataset.v; if (k === 'trim') st.trimSet = true; render(); }));
      const prof = st.profile === 'lap' ? 'Lap 8.25 in' : st.profile === 'bnb' ? 'Board and batten' : '';
      const summary = `${prof} · ${st.texture === 'grain' ? 'Select Cedarmill' : 'Smooth'} · ${c[0]}${st.finish === 'cp' ? ' (ColorPlus)' : ' (painted)'} · ${st.trim === 'arctic' ? 'Arctic White' : st.trim === 'match' ? 'matching' : 'Tricorn Black'} trim`;
      s.querySelector('.sum').innerHTML = st.profile ? `<b>Your wall</b>${summary}<br>Bring it to the free inspection: one visit covers every trade on the house.` : '<b>Your wall</b>Start with a profile: the boards go up as you choose.';
      s.querySelector('.tag').textContent = st.profile ? `${prof}, ${c[0]}` : 'House wrap, ready for siding';
      const next = s.querySelector('[data-nav="1"]'); next.textContent = st.step === 4 ? 'Book a free inspection' : 'Next'; next.classList.toggle('key', st.step === 4);
      next.disabled = st.step === 0 && !st.profile;
      s.querySelector('[data-nav="-1"]').style.visibility = st.step ? 'visible' : 'hidden';
    }
    s.querySelectorAll('[data-nav]').forEach((b) => b.addEventListener('click', () => { const d = +b.dataset.nav; if (d > 0 && st.step === 4) { location.href = BOOK; return; } st.step = Math.max(0, Math.min(4, st.step + d)); render(); }));
    s.querySelectorAll('.steps button').forEach((b) => b.addEventListener('click', () => { const i = +b.dataset.s; if (i > 0 && !st.profile) return; st.step = i; render(); }));
    render();
    window.__visB = { set(o) { Object.assign(st, o); render(); } };
  }
  return { A, B, wire(root) { wireA(root); wireB(root); } };
})();
