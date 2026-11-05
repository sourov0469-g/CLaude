/* BOOKING M (new-versions addendum, pass 3) — "Walk round the house". Reference: Ever, verified craft only (the case page's
   3D visualisations: an object you turn to understand it). One small CSS-3D house: turn it (drag, buttons, ← → keys) and,
   as each side comes round, its parts are labelled and the free-inspection checklist ticks off. The process text and the
   six inspection items are the homepage's own (Proc.CH, Proc INSP); contact facts locked. No form: nothing is sent or saved.
   Not a game (no score, goal or timer) and not a configurator. */
window.Cta8 = (function () {
  const BOOK = 'https://www.austinprosiding.com/schedule-appointment';
  const CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4"/></svg>';
  const TEL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>';
  const LEAD = 'A project manager walks every side of the house: siding, trim, windows, roof and gutters. One visit covers every trade.';
  // the homepage process's inspection list, verbatim (process.js INSP), and which view of the drawing shows each
  const INSP = ['Siding and trim', 'Windows and doors', 'Roof and flashing', 'Gutters', 'Paint and caulk', 'Rot and water damage'];
  const VIEW = { front: [0, 1], right: [3], back: [4], left: [5], roof: [2] };
  const NAMES = ['front', 'right', 'back', 'left'];
  const tag = (t, x, y, k) => `<span class="bmtag" style="left:${x}%;top:${y}%" data-k="${k}">${t}</span>`;
  const win = (x, y, w, h) => `<i class="bmwin" style="left:${x}%;top:${y}%;width:${w}%;height:${h}%"></i>`;
  const house = () => `<div class="bmscene" aria-hidden="true"><div class="bmrig"><div class="bmhouse">
      <div class="bmground"></div>
      <div class="bmf bmfront">${win(10, 26, 22, 34)}${win(68, 26, 22, 34)}<i class="bmdoor"></i><i class="bmgut"></i>
        ${tag('Siding', 6, 72, 0)}${tag('Trim', 82, 8, 0)}${tag('Window', 14, 12, 1)}${tag('Door', 43, 44, 1)}</div>
      <div class="bmf bmback">${win(16, 24, 20, 32)}${win(64, 24, 20, 32)}<i class="bmgut"></i>${tag('Paint and caulk at the trim', 22, 62, 4)}</div>
      <div class="bmf bmgable bmright">${win(36, 46, 28, 22)}<i class="bmspout"></i>${tag('Gutter and downspout', 20, 84, 3)}</div>
      <div class="bmf bmgable bmleft">${win(38, 46, 24, 22)}${tag('Low boards and sills', 22, 84, 5)}</div>
      <div class="bmroof bmrf"><i class="bmchim"></i>${tag('Shingles and flashing', 30, 40, 2)}</div>
      <div class="bmroof bmrb"></div>
    </div></div></div>`;

  const M = () => `<section class="sec bmM" id="booking" aria-labelledby="bmM-h">
    <div class="bmgrid">
      <div class="bmstage">
        <div class="bmturn" tabindex="0" role="group" aria-roledescription="3D drawing" aria-label="A drawn house you can turn. Use the buttons or the left and right arrow keys.">${house()}</div>
        <p class="bmside" aria-hidden="true">Front</p>
        <div class="bmctl"><button type="button" class="bmb" data-d="-1"><span aria-hidden="true">↺</span> Turn left</button>
          <button type="button" class="bmb bmroofbtn" aria-pressed="false">Look at the roof</button>
          <button type="button" class="bmb" data-d="1">Turn right <span aria-hidden="true">↻</span></button></div>
      </div>
      <div class="bmcopy">
        <h2 class="sec-h" id="bmM-h" data-split>Walk round the house.</h2>
        <p class="sec-p">${LEAD}</p>
        <ol class="bmlist" aria-label="What the free inspection covers">${INSP.map((t, i) => `<li data-i="${i}"><i aria-hidden="true"></i><span>${t}</span><b class="vh">: not yet seen</b></li>`).join('')}</ol>
        <p class="bmdone" aria-hidden="true">That’s the free inspection. One visit covers every trade.</p>
        <div class="bmct">
          <a class="btn key" href="${BOOK}">Book a free inspection<span class="tab">${CAL}</span></a>
          <a class="bmtel" href="tel:+15125500000">${TEL}(512) 550-0000</a><span class="bmst"></span>
          <p class="bmmeta">Mon–Fri 8–8 · Sat 8–6 · Sun 12–5<br>7801 N Lamar Blvd Suite C70, Austin TX 78752 · <a href="mailto:info@austinprosiding.com">info@austinprosiding.com</a></p>
          <p class="bmnote">No form: nothing here is sent or saved.</p>
        </div>
        <p class="vh bmlive" aria-live="polite"></p>
      </div>
    </div></section>`;

  function wire(root) {
    const s = root.querySelector('.bmM'); if (!s || s.dataset.w) return; s.dataset.w = 1;
    const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const rig = s.querySelector('.bmhouse'), turnEl = s.querySelector('.bmturn'), side = s.querySelector('.bmside'), roofBtn = s.querySelector('.bmroofbtn');
    const items = [...s.querySelectorAll('.bmlist li')], live = s.querySelector('.bmlive'), done = s.querySelector('.bmdone'), st = s.querySelector('.bmst');
    let v = 0, roof = false, drag = null, seen = new Set(), tm = 0;
    if (window.Cta && Cta.status) { const x = Cta.status(); st.textContent = x.t; st.classList.toggle('open', x.open); }
    const pose = (extra = 0, anim = true) => { rig.style.transition = anim && !RM ? 'transform .7s cubic-bezier(.22,1,.36,1)' : 'none';
      rig.style.transform = roof ? `rotateX(-58deg) rotateY(${-360 * Math.round(v / 4)}deg)` : `rotateX(-14deg) rotateY(${-90 * v + extra}deg)`; };
    const face = () => (roof ? 'roof' : NAMES[((v % 4) + 4) % 4]);
    const tick = (quiet) => { const f = face(), fresh = [];
      VIEW[f].forEach((i) => { if (!seen.has(i)) { seen.add(i); fresh.push(INSP[i]); const li = items[i]; li.classList.add('on'); li.querySelector('.vh').textContent = ': seen'; } });
      s.querySelectorAll('.bmtag').forEach((t) => t.classList.toggle('lit', VIEW[f].includes(+t.dataset.k)));
      side.textContent = f === 'roof' ? 'The roof' : f[0].toUpperCase() + f.slice(1) + ' side';
      if (fresh.length && !quiet) live.textContent = `${fresh.join(' and ')}: seen. ${seen.size} of 6.`;
      if (seen.size === INSP.length && !s.classList.contains('bmall')) { s.classList.add('bmall'); live.textContent = 'All six seen. That’s the free inspection. One visit covers every trade.'; } };
    const settle = () => { clearTimeout(tm); tm = setTimeout(tick, RM ? 0 : 520); };
    const turn = (d) => { v += d; if (roof) { roof = false; roofBtn.setAttribute('aria-pressed', 'false'); } pose(); settle(); };
    s.querySelectorAll('.bmb[data-d]').forEach((b) => b.addEventListener('click', () => turn(+b.dataset.d)));
    roofBtn.addEventListener('click', () => { roof = !roof; roofBtn.setAttribute('aria-pressed', roof); pose(); settle(); });
    turnEl.addEventListener('keydown', (e) => { const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
      if (d) { e.preventDefault(); turn(d); } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') { e.preventDefault(); roof = e.key === 'ArrowUp'; roofBtn.setAttribute('aria-pressed', roof); pose(); settle(); } });
    // drag sideways to turn; release snaps to the nearest side
    turnEl.addEventListener('pointerdown', (e) => { if (e.button) return; turnEl.setPointerCapture(e.pointerId); drag = { x: e.clientX, dx: 0 }; });
    turnEl.addEventListener('pointermove', (e) => { if (!drag) return; drag.dx = e.clientX - drag.x; pose(drag.dx * 0.45, false); });
    const up = () => { if (!drag) return; const a = drag.dx * 0.45; drag = null; const n = Math.round(a / 90) || (Math.abs(a) > 18 ? Math.sign(a) : 0);
      if (n) { v -= n; if (roof) { roof = false; roofBtn.setAttribute('aria-pressed', 'false'); } } pose(); settle(); };
    turnEl.addEventListener('pointerup', up); turnEl.addEventListener('pointercancel', up);
    pose(0, false); tick(true);
  }
  return { M, wire, INSP };
})();
