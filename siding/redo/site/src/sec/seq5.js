/* TRY THE JOB I and J (overnight ladder, Round 25). The last two new small jobs; not sideways, no dive.
   I — nail it on the studs (Lando Norris: speed and timing). A lap board over a wall whose studs are chalked on the wrap; the
       nail gun sweeps along the board and the visitor fires when it is over a stud. Anyone who prefers not to play against
       the clock can aim with the arrow keys instead (the sweep pauses), and reduced motion never sweeps.
   J — name the parts (Cash App Brand Guidelines: the labelled spec sheet). A close-up of an eave and a window; six labels to
       place: drip edge, fascia, gutter, soffit, siding, trim. Drag a label onto its spot, or choose a label and then a spot. */
window.Seq5 = (function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const BOOK = 'https://www.austinprosiding.com/schedule-appointment';
  const CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4"/></svg>';
  const book = `<a class="btn key" href="${BOOK}">Book a free inspection<span class="tab">${CAL}</span></a>`;

  /* ---------- I ---------- */
  const STUDS = [100, 220, 340, 460, 580, 700], TOL = 9, GX1 = 60, GX2 = 740;
  const I = () => `<section class="sec sqI" id="try" aria-labelledby="sqI-h">
    <div class="hd"><h2 class="sec-h" id="sqI-h" data-split>Nail it on the studs.</h2><p class="sec-p">Lap siding is nailed into the studs behind it, not just the sheathing. The studs are chalked on the wrap. Fire when the gun is over one.</p></div>
    <div class="wrap"><div class="stage" data-solid><svg class="ns" viewBox="0 0 800 380" aria-hidden="true">
        <rect width="800" height="380" class="wr"/>${STUDS.map((x) => `<path d="M${x} 0V380" class="ck"/>`).join('')}
        <g class="old">${[0, 1, 2].map((k) => `<rect x="0" y="${268 + k * 38}" width="800" height="44" class="bd2"/>`).join('')}</g>
        <rect x="0" y="222" width="800" height="50" class="bd3"/><path d="M0 266H800" class="bdl"/>
        <g class="nails"></g>
        <g class="gun"><rect x="-26" y="120" width="52" height="70" rx="10" class="gbd"/><rect x="-8" y="186" width="16" height="40" rx="4" class="gnz"/><rect x="-40" y="96" width="80" height="30" rx="12" class="gh"/><path d="M0 230v8" class="gt2"/></g></svg></div>
      <div class="side"><p class="cnt"><b>0</b> of 6 studs nailed</p><p class="mis">Misses: <span>0</span></p>
        <p class="msg" aria-live="polite">Press Nail (or Space) when the gun lines up with a chalk line.</p>
        <div class="acts"><button type="button" class="pb fire">Nail</button><button type="button" class="pb rs7">Start again</button></div>
        <p class="tip">Too fast? Focus the Nail button and aim with the arrow keys; the sweep stops while you aim.</p>
        <p class="note">On the real wall, a crew does this along every course. 431 documented siding jobs so far.</p>${book}</div></div></section>`;

  function wireI(root) {
    const s = root.querySelector('.sqI'); if (!s) return; const gun = s.querySelector('.gun'), nails = s.querySelector('.nails'), fire = s.querySelector('.fire');
    const cnt = s.querySelector('.cnt b'), mis = s.querySelector('.mis span'), msg = s.querySelector('.msg');
    let x = GX1, dir = 1, sp = 250, run = !RM, last = 0, raf = 0, vis = false, hits = new Set(), miss = 0;
    const place = () => gun.setAttribute('transform', `translate(${x.toFixed(1)} 0)`);
    const loop = (t) => { const dt = last ? Math.min(0.05, (t - last) / 1000) : 0; last = t; if (run && vis && hits.size < 6) { x += dir * sp * dt; if (x > GX2) { x = GX2; dir = -1; } if (x < GX1) { x = GX1; dir = 1; } place(); } raf = requestAnimationFrame(loop); };
    new IntersectionObserver((es) => es.forEach((e) => { vis = e.isIntersecting; if (vis && !raf) { last = 0; raf = requestAnimationFrame(loop); } if (!vis && raf) { cancelAnimationFrame(raf); raf = 0; } })).observe(s);
    const shoot = () => { if (hits.size >= 6) return; gun.classList.remove('kick'); void gun.getBoundingClientRect(); gun.classList.add('kick');
      const i = STUDS.findIndex((sx) => Math.abs(sx - x) <= TOL);
      if (i >= 0 && !hits.has(i)) { hits.add(i); nails.insertAdjacentHTML('beforeend', `<g class="nl"><circle cx="${STUDS[i]}" cy="240" r="6"/><circle cx="${STUDS[i]}" cy="240" r="13" class="ring"/></g>`); cnt.textContent = hits.size; sp += 30;
        msg.textContent = hits.size === 6 ? `All six on the studs${miss ? `, with ${miss} miss${miss === 1 ? '' : 'es'}` : ', no misses'}. The board is fastened.` : `On the stud. ${6 - hits.size} to go.`; if (hits.size === 6) s.classList.add('won'); }
      else if (i >= 0) msg.textContent = 'That stud already has its nail. Find the next chalk line.';
      else { miss++; mis.textContent = miss; nails.insertAdjacentHTML('beforeend', `<g class="ms2"><path d="M${x - 6} 234l12 12M${x + 6} 234l-12 12"/></g>`); msg.textContent = 'Missed the stud: that nail only holds the sheathing. Watch the chalk lines.'; } };
    fire.addEventListener('click', shoot);
    fire.addEventListener('keydown', (e) => { const d = { ArrowLeft: -1, ArrowRight: 1 }[e.key]; if (d) { e.preventDefault(); run = false; x = Math.max(GX1, Math.min(GX2, x + d * (e.shiftKey ? 30 : 6))); place(); }
      if (e.key === 'Home' || e.key === 'End') { e.preventDefault(); run = false; x = e.key === 'Home' ? GX1 : GX2; place(); } });
    s.querySelector('.stage').addEventListener('pointerdown', (e) => { e.preventDefault(); shoot(); });
    s.querySelector('.rs7').addEventListener('click', () => { hits = new Set(); miss = 0; sp = 250; nails.innerHTML = ''; cnt.textContent = 0; mis.textContent = 0; run = !RM; s.classList.remove('won'); msg.textContent = 'Press Nail (or Space) when the gun lines up with a chalk line.'; });
    place();
  }

  /* ---------- J ---------- */
  // [label, spot x, spot y] on an 800 × 480 close-up
  const PARTS = [['Drip edge', 640, 113], ['Fascia', 660, 146], ['Gutter', 210, 152], ['Soffit', 520, 194], ['Siding', 250, 360], ['Trim', 574, 400]];
  const ORDER = [3, 0, 5, 1, 4, 2]; // the tray is shuffled so it does not read top to bottom
  function eave() { let lap = ''; for (let y = 240; y < 480; y += 30) lap += `<path d="M0 ${y}H800" class="lpl"/>`;
    let sh = ''; for (let y = 30; y < 108; y += 19) for (let x = ((y / 19) % 2) * 28 - 28; x < 800; x += 56) sh += `<path d="M${x} ${y}v19"/>`;
    return `<svg class="es" viewBox="0 0 800 480" aria-hidden="true"><rect width="800" height="480" class="sky"/>
      <rect x="0" y="20" width="800" height="90" class="rf2"/><g class="shl">${sh}</g>
      <rect x="0" y="108" width="800" height="9" class="de"/><rect x="0" y="117" width="800" height="54" class="fs"/>
      <path d="M0 128H430V176Q430 186 420 186H0Z" class="gtr"/><path d="M0 134H424" class="gtl"/><rect x="392" y="186" width="22" height="294" class="dsp"/>
      <rect x="0" y="171" width="800" height="44" class="sf"/>${[460, 540, 620, 700].map((x) => `<rect x="${x}" y="186" width="44" height="14" rx="2" class="vt"/>`).join('')}
      <rect x="0" y="215" width="800" height="25" class="fz"/><rect x="0" y="240" width="800" height="240" class="wl2"/>${lap}
      <rect x="560" y="290" width="180" height="190" class="cs3"/><rect x="584" y="314" width="132" height="166" class="gl3"/><path d="M650 314V480" class="mu3"/></svg>`; }
  const J = () => `<section class="sec sqJ" id="try" aria-labelledby="sqJ-h">
    <div class="hd"><h2 class="sec-h" id="sqJ-h" data-split>Name the parts.</h2><p class="sec-p">Six words you will hear at an inspection. Drag each label onto its part, or choose a label and then a spot.</p></div>
    <div class="wrap"><div class="stage" data-solid>${eave()}
        <div class="spots">${PARTS.map(([, x, y], i) => `<button type="button" class="sp" data-i="${i}" style="left:${(x / 8).toFixed(2)}%;top:${(y / 4.8).toFixed(2)}%" aria-label="Spot ${i + 1}"><i></i></button>`).join('')}</div></div>
      <div class="side"><p class="cnt"><b>0</b> of 6 named</p>
        <div class="tray" role="group" aria-label="Labels">${ORDER.map((i) => `<button type="button" class="chip" data-i="${i}" aria-pressed="false">${PARTS[i][0]}</button>`).join('')}</div>
        <p class="msg" aria-live="polite">Pick up a label.</p>
        <div class="acts"><button type="button" class="pb all6">Show me</button><button type="button" class="pb rs8">Start again</button></div>
        <p class="note">At the free inspection a project manager walks every side of the house and checks each of these. Mon–Fri 8–8, Sat 8–6, Sun 12–5.</p>${book}</div></div></section>`;

  function wireJ(root) {
    const s = root.querySelector('.sqJ'); if (!s) return; const st = s.querySelector('.stage'), chips = [...s.querySelectorAll('.chip')], sps = [...s.querySelectorAll('.sp')];
    const msg = s.querySelector('.msg'), cnt = s.querySelector('.cnt b'); let sel = -1; const done = new Set();
    const pick = (i) => { sel = sel === i ? -1 : i; chips.forEach((c) => c.setAttribute('aria-pressed', +c.dataset.i === sel)); s.classList.toggle('holding', sel >= 0);
      sps.forEach((p, k) => p.setAttribute('aria-label', done.has(k) ? PARTS[k][0] : sel >= 0 ? `Put “${PARTS[sel][0]}” on spot ${k + 1}` : `Spot ${k + 1}`)); if (sel >= 0) msg.textContent = `Holding “${PARTS[sel][0]}”. Now choose its spot.`; };
    const settle = (k) => { done.add(k); const p = sps[k]; p.classList.add('ok'); p.disabled = true; p.innerHTML = `<i></i><span>${PARTS[k][0]}</span>`; p.setAttribute('aria-label', PARTS[k][0]);
      const c = chips.find((x) => +x.dataset.i === k); c.classList.add('used'); c.disabled = true; cnt.textContent = done.size; };
    const drop = (k) => { if (sel < 0 || done.has(k)) return; if (k === sel) { settle(k); msg.textContent = done.size === 6 ? 'All six named. Those are the parts we look at on every side of the house.' : `Right: ${PARTS[k][0].toLowerCase()}.`; sel = -1; pick(-1); }
      else { sps[k].classList.remove('no'); void sps[k].offsetWidth; sps[k].classList.add('no'); msg.textContent = `Not the ${PARTS[sel][0].toLowerCase()}. ${HINT[sel]}`; } };
    const HINT = ['It is the thin metal edge right at the bottom of the shingles.', 'It is the flat board the gutter hangs on.', 'It is the channel that catches the rain.', 'It is the underside of the overhang, with the vents.', 'It is the lap boards that cover the wall.', 'It is the boards framing the window.'];
    chips.forEach((c) => { const i = +c.dataset.i; c.addEventListener('click', () => { if (!c.classList.contains('dragged')) pick(i); c.classList.remove('dragged'); });
      c.addEventListener('pointerdown', (e) => { if (c.disabled) return; const r0 = c.getBoundingClientRect(), ox = e.clientX - r0.left, oy = e.clientY - r0.top, x0 = e.clientX, y0 = e.clientY; let g = null;
        const mv = (ev) => { if (!g && Math.hypot(ev.clientX - x0, ev.clientY - y0) < 6) return; if (!g) { g = c.cloneNode(true); g.className = 'chip ghost'; g.removeAttribute('data-i'); document.body.appendChild(g); pick(i); if (sel !== i) pick(i); }
          g.style.left = ev.clientX - ox + 'px'; g.style.top = ev.clientY - oy + 'px'; };
        const up = (ev) => { removeEventListener('pointermove', mv); removeEventListener('pointerup', up); if (!g) return; g.remove(); c.classList.add('dragged');
          let best = -1, bd = 48; sps.forEach((p, k) => { if (done.has(k)) return; const r = p.getBoundingClientRect(), d = Math.hypot(ev.clientX - (r.left + r.width / 2), ev.clientY - (r.top + r.height / 2)); if (d < bd) { bd = d; best = k; } });
          if (best >= 0) drop(best); else { msg.textContent = 'Drop it right on a spot.'; } setTimeout(() => c.classList.remove('dragged'), 0); };
        addEventListener('pointermove', mv); addEventListener('pointerup', up); }); });
    sps.forEach((p, k) => p.addEventListener('click', () => (sel < 0 ? (msg.textContent = 'Pick up a label first.') : drop(k))));
    s.querySelector('.all6').addEventListener('click', () => { PARTS.forEach((_, k) => { if (!done.has(k)) settle(k); }); sel = -1; pick(-1); msg.textContent = 'All six shown.'; });
    s.querySelector('.rs8').addEventListener('click', () => { done.clear(); sel = -1; sps.forEach((p, k) => { p.classList.remove('ok', 'no'); p.disabled = false; p.innerHTML = '<i></i>'; }); chips.forEach((c) => { c.classList.remove('used'); c.disabled = false; }); cnt.textContent = 0; pick(-1); msg.textContent = 'Pick up a label.'; });
    void st;
  }
  return { I, J, wire(root) { wireI(root); wireJ(root); } };
})();
