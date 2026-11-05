/* TRY THE JOB E and F (overnight ladder, Round 23). Two new small jobs, each its own mechanic; neither moves sideways
   and neither dives (the dive is Try D's alone).
   E — inspect at dusk (Lando Norris: play with precision). A drawn house at dusk; the visitor holds the inspector's torch
       (the beam follows the pointer or finger) and checks parts of the house for the six faults on the firm's own
       inspection list. Keyboard: every part of the house is a button; focusing one moves the beam onto it.
   F — measure the opening (Scout Motors: honest tools, mechanical feel). A drawn window opening that is slightly out of
       square; pull a tape across it at the top, middle and bottom. The tape stops at the jamb and reads in eighths. The
       general fitter's rule (order to the smallest width) closes it. Keyboard: each tape is a slider. */
window.Seq3 = (function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const BOOK = 'https://www.austinprosiding.com/schedule-appointment';
  const CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4"/></svg>';
  const book = `<a class="btn key" href="${BOOK}">Book a free inspection<span class="tab">${CAL}</span></a>`;
  const TICK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  /* ---------- E ---------- */
  // the firm's own inspection list (Process A) — one fault for each
  const LIST = ['Siding and trim', 'Windows and doors', 'Roof and flashing', 'Gutters', 'Paint and caulk', 'Rot and water damage'];
  // zones on an 800 × 520 drawing: [name, x, y, w, h, list index or -1 (sound), what was found]
  const Z = [['the roof', 230, 138, 140, 78, 2, 'A missing shingle'], ['the chimney', 508, 84, 64, 76, -1, ''], ['the gutter', 166, 224, 168, 40, 3, 'A sagging, blocked gutter'],
    ['the left window', 188, 280, 114, 140, 1, 'A gap in the window seal'], ['the right window', 498, 280, 114, 140, -1, ''], ['the wall by the door', 436, 284, 62, 64, 0, 'A cracked lap board'],
    ['the front door', 358, 340, 84, 150, -1, ''], ['the left corner trim', 126, 280, 42, 140, 4, 'Paint peeling off the trim'], ['the base of the wall', 540, 438, 104, 54, 5, 'Soft, rotting board at the ground']];
  function house() {
    let lap = ''; for (let y = 250; y < 490; y += 20) lap += `<path d="M140 ${y}H660"/>`;
    let sh = ''; for (let y = 100; y < 236; y += 17) { const dx = (y - 70) * (290 / 170); sh += `<path d="M${(400 - dx).toFixed(1)} ${y}H${(400 + dx).toFixed(1)}"/>`; }
    const win = (x) => `<rect x="${x}" y="290" width="90" height="120" class="wf"/><rect x="${x + 8}" y="298" width="74" height="104" class="gl"/><path d="M${x + 45} 298V402M${x + 8} 350H${x + 82}" class="mu"/><rect x="${x - 6}" y="410" width="102" height="9" class="wf"/>`;
    return `<svg class="hs" viewBox="0 0 800 520" aria-hidden="true">
      <rect x="0" y="0" width="800" height="520" class="sky"/><path d="M0 490H800V520H0Z" class="gd"/>
      <rect x="520" y="88" width="40" height="72" class="ch"/><rect x="514" y="82" width="52" height="10" class="wf"/>
      <rect x="140" y="236" width="520" height="254" class="wl"/><g class="lp">${lap}</g>
      <path d="M100 244L400 66L700 244Z" class="rf"/><g class="sh">${sh}</g>
      <path d="M300 168h28v15h-28z" class="fx miss"/>
      <path d="M104 238H696V252H104Z" class="gt"/><path d="M200 252Q250 268 300 252" class="fx sag"/><g class="fx lv"><circle cx="232" cy="236" r="5"/><circle cx="244" cy="233" r="4"/><circle cx="258" cy="237" r="5"/><circle cx="270" cy="234" r="3.5"/></g>
      <rect x="648" y="252" width="14" height="238" class="gt"/>
      ${win(200)}${win(510)}<path d="M290 292v40" class="fx gap"/>
      <rect x="370" y="350" width="60" height="140" class="dr4"/><circle cx="420" cy="424" r="3.5" class="kn"/><rect x="362" y="342" width="76" height="9" class="wf"/>
      <path d="M446 306l9 7-6 5 10 8-5 6 11 9" class="fx crk"/>
      <rect x="140" y="250" width="12" height="240" class="wf"/><rect x="648" y="250" width="12" height="240" class="wf"/>
      <g class="fx pl"><path d="M140 300h10l-3 6h-7z"/><path d="M140 326h12l-4 4h-8z"/><path d="M140 352h9l-2 7h-7z"/><path d="M140 380h12l-5 5h-7z"/></g>
      <path d="M556 486c4-12 18-20 30-16s22-6 30 2 10 14 6 14z" class="fx rot"/></svg>`;
  }
  const E = () => `<section class="sec sqE" id="try" aria-labelledby="sqE-h">
    <div class="hd"><h2 class="sec-h" id="sqE-h" data-split>Inspect it at dusk.</h2><p class="sec-p">Six faults hide on this house, one for each line of our inspection list. Move the torch, then check a part of the house.</p></div>
    <div class="wrap"><div class="stage">${house()}<div class="dusk" aria-hidden="true"></div>
        <div class="zs">${Z.map(([n, x, y, w, h], i) => `<button type="button" class="zn" data-i="${i}" style="left:${(x / 8).toFixed(2)}%;top:${(y / 5.2).toFixed(2)}%;width:${(w / 8).toFixed(2)}%;height:${(h / 5.2).toFixed(2)}%" aria-label="Check ${n}"></button>`).join('')}</div></div>
      <div class="side"><p class="cnt"><b>0</b> of 6 found</p>
        <ul class="lst6">${LIST.map((t, i) => `<li data-l="${i}"><i>${TICK}</i><span>${t}</span></li>`).join('')}</ul>
        <p class="msg" aria-live="polite">Move the torch over the house. Check anything that looks wrong.</p>
        <div class="acts"><button type="button" class="pb sh6">Show me all six</button><button type="button" class="pb rs6">Start again</button></div>
        <p class="note">The real inspection is free: a project manager walks every side of the house, and one visit covers every trade. Mon–Fri 8–8, Sat 8–6, Sun 12–5.</p>${book}</div></div></section>`;

  function wireE(root) {
    const s = root.querySelector('.sqE'); if (!s) return; const st = s.querySelector('.stage'), zs = [...s.querySelectorAll('.zn')], lis = [...s.querySelectorAll('.lst6 li')];
    const cnt = s.querySelector('.cnt b'), msg = s.querySelector('.msg');
    let tx = 50, ty = 45, x = 50, y = 45, raf = 0;
    const draw = () => { x += (tx - x) * (RM ? 1 : 0.22); y += (ty - y) * (RM ? 1 : 0.22); st.style.setProperty('--x', x.toFixed(2) + '%'); st.style.setProperty('--y', y.toFixed(2) + '%'); raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.05 ? requestAnimationFrame(draw) : 0; };
    const aim = (px, py) => { tx = px; ty = py; if (!raf) raf = requestAnimationFrame(draw); };
    const rel = (e) => { const r = st.getBoundingClientRect(); return [((e.clientX - r.left) / r.width) * 100, ((e.clientY - r.top) / r.height) * 100]; };
    st.addEventListener('pointermove', (e) => aim(...rel(e))); st.addEventListener('pointerdown', (e) => aim(...rel(e)));
    const found = new Set();
    const mark = (i, quiet) => { const z = Z[i]; zs[i].classList.add('chk'); if (z[5] < 0) { if (!quiet) msg.textContent = `${z[0][0].toUpperCase() + z[0].slice(1)} looks sound.`; return; }
      if (!found.has(i)) { found.add(i); zs[i].classList.add('got'); lis[z[5]].classList.add('got'); cnt.textContent = found.size; }
      if (!quiet) msg.textContent = found.size === 6 ? 'All six found. That is what our project managers look for on every side of the house.' : `Found: ${z[6]}. That is on the list under “${LIST[z[5]]}”.`; };
    zs.forEach((b, i) => { const [, zx, zy, w, h] = Z[i]; b.addEventListener('click', () => mark(i)); b.addEventListener('focus', () => aim((zx + w / 2) / 8, (zy + h / 2) / 5.2)); });
    s.querySelector('.sh6').addEventListener('click', () => { Z.forEach((z, i) => { if (z[5] >= 0) mark(i, true); }); msg.textContent = 'All six shown: a missing shingle, a sagging gutter, a window seal gap, a cracked board, peeling trim and rot at the base.'; s.classList.add('lit'); });
    s.querySelector('.rs6').addEventListener('click', () => { found.clear(); zs.forEach((b) => b.classList.remove('got', 'chk')); lis.forEach((l) => l.classList.remove('got')); cnt.textContent = 0; s.classList.remove('lit'); msg.textContent = 'Move the torch over the house. Check anything that looks wrong.'; });
    draw();
  }

  /* ---------- F ---------- */
  const PX = 12, X0 = 100; // 12 px to the inch; the left jamb at x = 100
  const ROWS = [['Top', 110, 35.25], ['Middle', 220, 35.125], ['Bottom', 330, 35.375]];
  const frac = (inch) => { const n = Math.round(inch * 8), w = Math.floor(n / 8), r = n % 8; if (!r) return `${w} in`; const g = r % 4 === 0 ? 4 : r % 2 === 0 ? 2 : 1; return `${w} ${r / g}/${8 / g} in`; };
  function opening() {
    let lap = ''; for (let y = 14; y < 440; y += 22) lap += `<path d="M0 ${y}H640"/>`;
    const jx = ROWS.map((r) => X0 + r[2] * PX);
    return `<svg class="ms" viewBox="0 0 640 440" aria-hidden="false" role="group" aria-label="A window opening with three tapes">
      <defs><pattern id="sqF-tk" width="12" height="16" patternUnits="userSpaceOnUse" x="${X0}"><path d="M0 0v7M6 0v4M3 0v2M9 0v2" stroke="#0E3B2C" stroke-width="1.2"/></pattern></defs>
      <rect width="640" height="440" class="wl"/><g class="lp">${lap}</g>
      <path d="M${X0} 50H${jx[0]}L${jx[0]} 110L${jx[1]} 220L${jx[2]} 330L${jx[2]} 392H${X0}Z" class="op"/>
      <path d="M${X0 - 8} 42H${jx[0] + 8}M${X0 - 8} 400H${jx[2] + 8}" class="hd2"/><path d="M${X0} 50V392" class="jb"/><path d="M${jx[0]} 50L${jx[0]} 110L${jx[1]} 220L${jx[2]} 330L${jx[2]} 392" class="jb"/>
      ${ROWS.map(([n, y, w], i) => `<g class="tp" data-r="${i}"><rect x="${X0 - 64}" y="${y - 22}" width="58" height="44" rx="12" class="cs"/><circle cx="${X0 - 35}" cy="${y}" r="10" class="cs2"/>
        <rect x="${X0 - 6}" y="${y - 8}" width="60" height="16" class="bl"/><rect x="${X0 - 6}" y="${y - 8}" width="60" height="16" fill="url(#sqF-tk)" class="bl2"/>
        <g class="hk" role="slider" tabindex="0" aria-label="${n} tape" aria-valuemin="0" aria-valuemax="${w}" aria-valuenow="5" aria-valuetext="${frac(5)}"><rect x="0" y="${y - 12}" width="6" height="24" class="hk1"/><circle cx="3" cy="${y}" r="20" class="hit"/></g>
        <text x="${X0 + 30}" y="${y - 16}" class="rd">${frac(5)}</text></g>`).join('')}</svg>`;
  }
  const F = () => `<section class="sec sqF" id="try" aria-labelledby="sqF-h">
    <div class="hd"><h2 class="sec-h" id="sqF-h" data-split>Measure the opening.</h2><p class="sec-p">Pull each tape to the far jamb: top, middle and bottom. Openings are rarely square.</p></div>
    <div class="wrap"><div class="stage">${opening()}</div>
      <div class="side"><table class="rt"><caption>Widths</caption><tbody>${ROWS.map(([n], i) => `<tr data-r="${i}"><th scope="row">${n}</th><td>—</td></tr>`).join('')}</tbody></table>
        <p class="res" aria-live="polite">Three widths to take.</p>
        <div class="acts"><button type="button" class="pb auto3">Measure it for me</button><button type="button" class="pb rs3">Start again</button></div>
        <p class="note">On the real job, every window is measured, built to order, then set and sealed. 388 documented window jobs so far.</p>${book}</div></div></section>`;

  function wireF(root) {
    const s = root.querySelector('.sqF'); if (!s) return; const svg = s.querySelector('svg.ms'), tps = [...s.querySelectorAll('.tp')], tds = [...s.querySelectorAll('.rt td')], res = s.querySelector('.res');
    const L = ROWS.map(() => 5 * PX), done = ROWS.map(() => false);
    const put = (i, px) => { const max = ROWS[i][2] * PX; L[i] = Math.max(0, Math.min(max, px)); const t = tps[i], y = ROWS[i][1], inch = L[i] / PX, end = X0 + L[i];
      t.querySelectorAll('.bl,.bl2').forEach((r) => r.setAttribute('width', (L[i] + 6).toFixed(2))); t.querySelector('.hk').setAttribute('transform', `translate(${(end - 3).toFixed(2)} 0)`);
      const rd = t.querySelector('.rd'); rd.textContent = frac(inch); rd.setAttribute('x', Math.min(end - 4, 520).toFixed(1)); rd.setAttribute('text-anchor', end > 200 ? 'end' : 'start'); rd.setAttribute('y', y - 16);
      const hk = t.querySelector('.hk'); hk.setAttribute('aria-valuenow', inch.toFixed(3)); hk.setAttribute('aria-valuetext', frac(inch));
      const hit = L[i] >= max - 0.01; t.classList.toggle('hit2', hit); if (hit && !done[i]) { done[i] = true; tds[i].textContent = frac(ROWS[i][2]); tds[i].parentNode.classList.add('got'); sum(); } };
    const sum = () => { const n = done.filter(Boolean).length; if (n < 3) { res.textContent = `${n} of 3 widths taken.`; return; }
      const m = Math.min(...ROWS.map((r) => r[2])), M = Math.max(...ROWS.map((r) => r[2])); s.classList.add('all');
      res.innerHTML = `<b>Order to the smallest: ${frac(m)}.</b> The widths differ by ${frac(M - m).replace(/^0 /, '')}; the smallest fits all three, and the gap is shimmed and sealed.`; };
    const toX = (e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()).x; };
    tps.forEach((t, i) => { const hk = t.querySelector('.hk'); let drag = false;
      hk.addEventListener('pointerdown', (e) => { drag = true; hk.setPointerCapture(e.pointerId); e.preventDefault(); t.classList.add('drag'); });
      hk.addEventListener('pointermove', (e) => { if (drag) put(i, toX(e) - X0); });
      const end = () => { drag = false; t.classList.remove('drag'); }; hk.addEventListener('pointerup', end); hk.addEventListener('pointercancel', end);
      hk.addEventListener('keydown', (e) => { const st = e.shiftKey ? PX : PX / 8; const d = { ArrowRight: st, ArrowUp: st, ArrowLeft: -st, ArrowDown: -st }[e.key];
        if (d) { e.preventDefault(); put(i, L[i] + d); } if (e.key === 'End') { e.preventDefault(); put(i, 1e4); } if (e.key === 'Home') { e.preventDefault(); put(i, 0); } }); put(i, L[i]); });
    let anim = 0;
    s.querySelector('.auto3').addEventListener('click', () => { cancelAnimationFrame(anim); if (RM) { ROWS.forEach((r, i) => put(i, 1e4)); return; } const from = L.slice(), t0 = performance.now();
      const step = (now) => { const k = Math.min(1, (now - t0) / 1100), e = 1 - Math.pow(1 - k, 3); ROWS.forEach((r, i) => { const kk = Math.max(0, Math.min(1, e * 1.25 - i * 0.12)); put(i, from[i] + (r[2] * PX - from[i]) * kk); }); if (k < 1) anim = requestAnimationFrame(step); else ROWS.forEach((r, i) => put(i, 1e4)); };
      anim = requestAnimationFrame(step); });
    s.querySelector('.rs3').addEventListener('click', () => { cancelAnimationFrame(anim); done.fill(false); tds.forEach((td) => { td.textContent = '—'; td.parentNode.classList.remove('got'); }); s.classList.remove('all'); ROWS.forEach((r, i) => put(i, 5 * PX)); res.textContent = 'Three widths to take.'; });
  }
  return { E, F, wire(root) { wireE(root); wireF(root); } };
})();
