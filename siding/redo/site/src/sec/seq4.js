/* TRY THE JOB G and H (overnight ladder, Round 24). Two more new small jobs, new mechanics; not sideways, no dive.
   G — shingle it from the eave up (Cowboy: warm, tactile). A bare roof deck; lay the starter strip and five courses.
       The order is the game: a course laid above a gap is refused, because shingles must lap over the one below to shed
       water. When the roof is done, a rain test runs the water off into the gutter. Keyboard: each course is a button.
   H — level the window (Quiet Cubes: calm, tactile). A window sits in its opening a little off level; a level on its head
       shows the bubble. Add or pull shims under each corner until the bubble centres. Keyboard: two steppers. */
window.Seq4 = (function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const BOOK = 'https://www.austinprosiding.com/schedule-appointment';
  const CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4"/></svg>';
  const book = `<a class="btn key" href="${BOOK}">Book a free inspection<span class="tab">${CAL}</span></a>`;

  /* ---------- G ---------- */
  // roof deck 800 × 440: eave at y = 380; the starter strip, then five courses of 60, each lapping 12 over the one below
  const EAVE = 380, CH = 60, NC = 6, X1 = 60, X2 = 740;
  const top = (k) => EAVE - 22 - k * CH;
  function course(k) { const y = top(k), h = k === 0 ? 22 : CH + 12; let tabs = '';
    if (k > 0) { const off = (k % 2) * 34; for (let x = X1 - off; x < X2; x += 68) if (x > X1) tabs += `<path d="M${x} ${y + h - 30}V${y + h}"/>`; }
    return `<g class="cr" data-k="${k}"><rect x="${X1}" y="${y}" width="${X2 - X1}" height="${h}" class="${k ? 'sg' : 'ss'}"/>${k ? `<path d="M${X1} ${y + h - 30}H${X2}" class="sl"/>` : ''}<g class="tb">${tabs}</g></g>`; }
  const deck = () => { let b = ''; for (let x = X1; x < X2; x += 136) b += `<path d="M${x} 40V${EAVE}"/>`; for (let y = 40; y < EAVE; y += 85) b += `<path d="M${X1} ${y}H${X2}"/>`; return b; };
  const NAMES = ['Starter strip', 'Course 1', 'Course 2', 'Course 3', 'Course 4', 'Course 5'];
  const G = () => `<section class="sec sqG" id="try" aria-labelledby="sqG-h">
    <div class="hd"><h2 class="sec-h" id="sqG-h" data-split>Shingle it from the eave up.</h2><p class="sec-p">A bare roof deck. Lay the starter strip and five courses, in the order that keeps water out.</p></div>
    <div class="wrap"><div class="stage" data-solid><svg class="rs" viewBox="0 0 800 440" aria-hidden="true">
        <rect width="800" height="440" class="sky"/><rect x="${X1}" y="40" width="${X2 - X1}" height="${EAVE - 40}" class="dk"/><g class="dkl">${deck()}</g>
        <g class="lay"></g><rect x="${X1 - 10}" y="${EAVE}" width="${X2 - X1 + 20}" height="12" class="fa"/><path d="M${X1 - 14} ${EAVE + 12}H${X2 + 14}V${EAVE + 26}Q${X2 + 14} ${EAVE + 36} ${X2} ${EAVE + 36}H${X1}Q${X1 - 14} ${EAVE + 36} ${X1 - 14} ${EAVE + 26}Z" class="gu"/>
        <g class="rain"></g></svg>
        <div class="slots">${NAMES.map((n, k) => `<button type="button" class="sb" data-k="${k}" style="top:${(top(k) / 4.4).toFixed(2)}%;height:${(((k ? CH : 22)) / 4.4).toFixed(2)}%">${n}</button>`).join('')}</div></div>
      <div class="side"><ol class="ord">${NAMES.map((n, k) => `<li data-k="${k}">${n}</li>`).join('')}</ol>
        <p class="msg" aria-live="polite">Choose where the first piece goes.</p>
        <div class="acts"><button type="button" class="pb auto6">Lay it for me</button><button type="button" class="pb rain6" disabled>Rain test</button><button type="button" class="pb rs6">Start again</button></div>
        <p class="note">On the real roof, we are a GAF Master Elite contractor. 204 priced shingle roofs so far.</p>${book}</div></div></section>`;

  function wireG(root) {
    const s = root.querySelector('.sqG'); if (!s) return; const lay = s.querySelector('.lay'), rain = s.querySelector('.rain'), bs = [...s.querySelectorAll('.sb')], lis = [...s.querySelectorAll('.ord li')];
    const msg = s.querySelector('.msg'), rb = s.querySelector('.rain6'); let n = 0, timers = [];
    const put = (k) => { lay.insertAdjacentHTML('beforeend', course(k)); const g = lay.lastElementChild; if (!RM) { g.classList.add('drop'); } bs[k].classList.add('done'); bs[k].disabled = true; lis[k].classList.add('done'); n = k + 1;
      if (n === NC) { msg.textContent = 'Done. Every course laps the one below, so water can only run down and off. Try the rain.'; rb.disabled = false; s.classList.add('full'); }
      else msg.textContent = `${NAMES[k]} down. Next: ${NAMES[n].toLowerCase()}.`; };
    const no = (k) => { bs[k].classList.remove('no'); void bs[k].offsetWidth; bs[k].classList.add('no');
      msg.textContent = `Not yet. ${NAMES[n]} goes first: shingles go on from the eave up, so each course laps over the one below and sheds water.`; };
    bs.forEach((b, k) => b.addEventListener('click', () => (k === n ? put(k) : no(k))));
    s.querySelector('.auto6').addEventListener('click', () => { timers.forEach(clearTimeout); timers = []; for (let k = n, t = 0; k < NC; k++, t++) timers.push(setTimeout(() => put(k), RM ? 0 : t * 280)); });
    rb.addEventListener('click', () => { rain.innerHTML = ''; let h = ''; for (let i = 0; i < 26; i++) { const x = X1 + 20 + ((i * 97) % (X2 - X1 - 40)); h += `<circle cx="${x}" cy="40" r="3.4" style="--d:${((i * 0.137) % 1.6).toFixed(2)}s;--t:${(EAVE + 22 - 40)}px"/>`; } rain.innerHTML = h; s.classList.remove('wet'); void s.offsetWidth; s.classList.add('wet');
      msg.textContent = 'Rain runs down the courses, off the drip edge and into the gutter. Nothing gets under.'; });
    s.querySelector('.rs6').addEventListener('click', () => { timers.forEach(clearTimeout); lay.innerHTML = ''; rain.innerHTML = ''; n = 0; bs.forEach((b) => { b.disabled = false; b.classList.remove('done', 'no'); }); lis.forEach((l) => l.classList.remove('done')); rb.disabled = true; s.classList.remove('full', 'wet'); msg.textContent = 'Choose where the first piece goes.'; });
  }

  /* ---------- H ---------- */
  const STEP = 0.75, BASE = -2.25; // degrees: the left side sits low; each shim under a corner lifts that corner by 0.75°
  const H = () => `<section class="sec sqH" id="try" aria-labelledby="sqH-h">
    <div class="hd"><h2 class="sec-h" id="sqH-h" data-split>Level the window.</h2><p class="sec-p">It sits a little off. Add or pull shims under each corner until the bubble centres.</p></div>
    <div class="wrap"><div class="stage" data-solid><svg class="ws" viewBox="0 0 640 440" aria-hidden="true">
        <rect width="640" height="440" class="wl"/>${Array.from({ length: 20 }, (_, i) => `<path d="M0 ${14 + i * 22}H640" class="lp"/>`).join('')}
        <rect x="150" y="70" width="340" height="300" class="op"/>
        <g class="wn"><g class="sm l"></g><g class="sm r"></g><g class="win"><rect x="168" y="86" width="304" height="262" rx="3" class="fr"/><rect x="186" y="104" width="268" height="108" class="gls"/><rect x="186" y="226" width="268" height="108" class="gls"/><rect x="180" y="212" width="280" height="14" class="fr2"/>
          <g class="lv"><rect x="210" y="54" width="220" height="26" rx="6" class="lvb"/><rect x="290" y="59" width="60" height="16" rx="8" class="vl"/><path d="M308 59v16M332 59v16" class="vm"/><ellipse cx="320" cy="67" rx="9" ry="5.5" class="bb"/></g></g></g>
        <path d="M150 370H490" class="sill"/></svg></div>
      <div class="side"><div class="steps2">${[['l', 'Left corner'], ['r', 'Right corner']].map(([k, n]) => `<div class="stp2" data-s="${k}"><p>${n}</p><div class="ctl"><button type="button" class="mn" aria-label="Pull a shim, ${n.toLowerCase()}">−</button><output aria-live="polite">0 shims</output><button type="button" class="pl" aria-label="Add a shim, ${n.toLowerCase()}">+</button></div></div>`).join('')}</div>
        <p class="rdg"><b>2.25°</b> off level</p><p class="msg" aria-live="polite">The left side is low.</p>
        <div class="acts"><button type="button" class="pb auto2">Level it for me</button><button type="button" class="pb rs2">Start again</button></div>
        <p class="note">On the real job, windows are measured, built to order, then set and sealed. We are Andersen Certified Premier, with 388 documented window jobs.</p>${book}</div></div></section>`;

  function wireH(root) {
    const s = root.querySelector('.sqH'); if (!s) return; const win = s.querySelector('.win'), bb = s.querySelector('.bb'), rd = s.querySelector('.rdg b'), msg = s.querySelector('.msg');
    const sm = { l: s.querySelector('.sm.l'), r: s.querySelector('.sm.r') }, out = { l: s.querySelector('[data-s="l"] output'), r: s.querySelector('[data-s="r"] output') };
    const c = { l: 0, r: 0 }; let ang = BASE, cur = BASE, vel = 0, raf = 0;
    const shims = (k) => { let h = ''; for (let i = 0; i < c[k]; i++) { const x = k === 'l' ? 170 : 430, y = 362 - i * 7; h += `<path d="M${x} ${y + 6}h40l-40 -5z" class="shm" transform="${k === 'r' ? `translate(${2 * x + 40} 0) scale(-1 1)` : ''}"/>`; } sm[k].innerHTML = h; };
    const show = (a) => { win.setAttribute('transform', `rotate(${a.toFixed(3)} 320 348)`); bb.setAttribute('cx', (320 - Math.max(-22, Math.min(22, a * 9))).toFixed(2)); };
    const tick = () => { if (RM) { cur = ang; vel = 0; } else { vel += (ang - cur) * 0.12; vel *= 0.78; cur += vel; } show(cur); raf = Math.abs(ang - cur) + Math.abs(vel) > 0.002 ? requestAnimationFrame(tick) : (show(ang), 0); };
    const upd = () => { ang = BASE + (c.l - c.r) * STEP; shims('l'); shims('r');
      out.l.textContent = `${c.l} shim${c.l === 1 ? '' : 's'}`; out.r.textContent = `${c.r} shim${c.r === 1 ? '' : 's'}`; const off = Math.abs(ang);
      rd.textContent = `${off.toFixed(2)}°`; s.classList.toggle('lvl', off < 0.01);
      msg.textContent = off < 0.01 ? 'Level. Now it can be fastened, then sealed.' : ang < 0 ? 'The left side is low.' : 'The right side is low.'; if (!raf) raf = requestAnimationFrame(tick); };
    s.querySelectorAll('.stp2').forEach((d) => { const k = d.dataset.s; d.querySelector('.pl').addEventListener('click', () => { if (c[k] < 5) { c[k]++; upd(); } }); d.querySelector('.mn').addEventListener('click', () => { if (c[k] > 0) { c[k]--; upd(); } }); });
    s.querySelector('.auto2').addEventListener('click', () => { c.l = 3; c.r = 0; upd(); });
    s.querySelector('.rs2').addEventListener('click', () => { c.l = 0; c.r = 0; upd(); });
    show(BASE); upd();
  }
  return { G, H, wire(root) { wireG(root); wireH(root); } };
})();
