/* WINDOWS (sheet: day/night same window; 3D built-out bay). Realness duty: only parts that exist and look like that.
   Andersen 100 Series single-hung (the firm's Andersen jobs are mostly 100 Series Fibrex, FACTS.md): Fibrex composite frame,
   fixed upper sash, operable lower sash that slides up BEHIND the upper sash, lock and lift on the interior (not seen from
   outside), Finelight grilles sit between the two panes, an insect screen covers the lower half outside, Low-E (SmartSun) glass.
   Andersen 400 Series bay: three units joined on 30° or 45° angled joining posts, head board and seat board, support hardware.
   Wall build-out behind the siding: lap siding over house wrap over sheathing over studs with insulation. */
window.Win = (function () {
  const BOOK = 'https://www.austinprosiding.com/schedule-appointment';
  const CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4"/></svg>';
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const AC = [['White', '#F3F0E9'], ['Sandtone', '#B0A299'], ['Terratone', '#786A61'], ['Dark Bronze', '#493F3D'], ['Black', '#323433']];   // Andersen 100 Series exterior colours (firm's published swatches)

  /* ---------- A: one single-hung window, morning to midnight ---------- */
  function svgWindow() {
    // geometry (viewBox 640 x 700): casing 188..452 x 92..520, frame 210..430 x 114..498, opening 222..418 x 126..486
    let lap = ''; for (let y = 0; y < 700; y += 27) lap += `<rect x="-400" y="${y}" width="1440" height="27" fill="url(#wnLap)"/>`;
    const sash = (x, y, w, h, top, bot, cls) => {
      const gx = x + 13, gy = y + top, gw = w - 26, gh = h - top - bot;
      let gr = ''; for (let i = 1; i < 3; i++) gr += `<rect x="${(gx + gw * i / 3 - 2).toFixed(1)}" y="${gy}" width="4" height="${gh}"/>`;
      gr += `<rect x="${gx}" y="${(gy + gh / 2 - 2).toFixed(1)}" width="${gw}" height="4"/>`;
      return `<g class="${cls}" data-part="${cls}">
        <rect class="glass-base" x="${gx}" y="${gy}" width="${gw}" height="${gh}"/>
        <rect class="glow" x="${gx}" y="${gy}" width="${gw}" height="${gh}" fill="url(#wnGlow)"/>
        <g class="grille" data-part="grille" fill="var(--fc)">${gr}</g>
        <rect class="refl" x="${gx}" y="${gy}" width="${gw}" height="${gh}" fill="url(#wnSky)"/>
        <path class="streak" d="M${gx + gw * .1} ${gy + gh}L${gx + gw * .55} ${gy}H${gx + gw * .72}L${gx + gw * .27} ${gy + gh}Z" fill="#fff"/>
        <path class="sashframe" fill-rule="evenodd" d="M${x} ${y}h${w}v${h}h${-w}Z M${gx} ${gy}v${gh}h${gw}v${-gh}Z"/>
        <path d="M${gx} ${gy}h${gw}v3h${-gw}Z" fill="rgba(0,0,0,.25)"/></g>`;
    };
    return `<svg class="wnsvg" viewBox="0 0 640 700" preserveAspectRatio="xMidYMid slice" role="img" aria-label="An Andersen 100 Series single-hung window in a lap-sided wall, shown from outside.">
      <defs>
        <linearGradient id="wnLap" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="rgba(255,255,255,.10)"/><stop offset=".86" stop-color="rgba(0,0,0,0)"/><stop offset=".9" stop-color="rgba(0,0,0,.22)"/><stop offset="1" stop-color="rgba(0,0,0,.06)"/></linearGradient>
        <linearGradient id="wnSky" x1="0" y1="0" x2=".35" y2="1"><stop offset="0" stop-color="#C9DAE6"/><stop offset=".55" stop-color="#8FA7BA"/><stop offset="1" stop-color="#5D7183"/></linearGradient>
        <radialGradient id="wnGlow" cx=".45" cy=".35" r=".9"><stop offset="0" stop-color="#FFE7B5"/><stop offset=".45" stop-color="#F3B467"/><stop offset="1" stop-color="#9A5A26"/></radialGradient>
        <radialGradient id="wnSpill"><stop offset="0" stop-color="rgba(255,196,120,.6)"/><stop offset="1" stop-color="rgba(255,196,120,0)"/></radialGradient>
        <mask id="wnNightM"><rect x="-400" width="1440" height="700" fill="#fff"/><rect x="222" y="126" width="196" height="360" fill="#000"/></mask>
        <pattern id="wnMesh" width="3" height="3" patternUnits="userSpaceOnUse"><path d="M0 0H3M0 0V3" stroke="rgba(20,24,28,.38)" stroke-width=".7"/></pattern>
        <clipPath id="wnOpen"><rect x="220" y="124" width="200" height="364"/></clipPath>
        <linearGradient id="wnBack" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8A8176"/><stop offset=".55" stop-color="#A39A8D"/><stop offset="1" stop-color="#857B6F"/></linearGradient>
        <linearGradient id="wnFloor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6B5039"/><stop offset="1" stop-color="#8A6A4B"/></linearGradient>
        <linearGradient id="wnDoor" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="rgba(0,0,0,.25)"/><stop offset="1" stop-color="rgba(255,255,255,.06)"/></linearGradient>
        <radialGradient id="wnLamp"><stop offset="0" stop-color="rgba(255,214,150,.95)"/><stop offset=".5" stop-color="rgba(255,190,110,.35)"/><stop offset="1" stop-color="rgba(255,190,110,0)"/></radialGradient>
        <filter id="wnSoft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="6"/></filter>
      </defs>
      <rect class="wall" x="-400" width="1440" height="700"/>${lap}
      
      <g class="shadow" filter="url(#wnSoft)"><rect x="188" y="92" width="264" height="440" rx="2" fill="rgba(0,0,0,.32)"/></g>
      <g data-part="trim"><rect class="trim" x="188" y="92" width="264" height="430"/><rect x="188" y="84" width="264" height="10" class="trim drip"/>
        <path class="trim" d="M174 520H466V532H174Z"/><path d="M174 532H466V536H174Z" fill="rgba(0,0,0,.25)"/></g>
      <g data-part="frame"><rect class="frame" x="208" y="112" width="224" height="388"/><g class="room" clip-path="url(#wnOpen)" aria-hidden="true">
          <rect x="220" y="124" width="200" height="364" fill="url(#wnBack)"/>
          <path d="M232 420H408V476H232Z" fill="url(#wnFloor)"/><path class="fl" d="M262 420L238 476M292 420L280 476M322 420L320 476M352 420L360 476M382 420L402 476"/>
          <path d="M232 416H408V421H232Z" fill="#E2DBCF"/>
          <path d="M334 252h52v168h-52Z" fill="#E2DBCF"/><path d="M339 257h42v163h-42Z" fill="#4A433D"/><path d="M339 257h42v163h-42Z" fill="url(#wnDoor)"/>
          <path d="M262 262h46v36h-46Z" fill="#EFEAE0"/><path d="M267 267h36v26h-36Z" fill="#9AA79A"/><path d="M267 285l11-9 9 7 6-4 10 9v5h-36Z" fill="#6F8070"/>
          <g class="lamp"><path d="M294 386h8v30h-8Z" fill="#3D3833"/><path d="M286 386h24l-5-20h-14Z" fill="#E9DFC8"/><ellipse class="lglow" cx="298" cy="378" rx="70" ry="60" fill="url(#wnLamp)"/></g>
          <path class="sun" d="M262 476L300 420H372L350 476Z" fill="#FFF3D6"/>
          <path d="M220 124L234 138V474L220 488Z" fill="#D9D2C5"/><path d="M420 124L406 138V474L420 488Z" fill="#B4AC9F"/><path d="M220 124H420L406 138H234Z" fill="#9C9487"/><path d="M220 488L234 474H406L420 488Z" fill="#E8E2D6"/>
          <g class="drape"><path d="M234 138h30v336h-30Z" fill="#EEE8DC" opacity=".9"/><path d="M241 138v336M249 138v336M257 138v336" stroke="#D3CABA" stroke-width="2.4"/></g>
          <rect class="rshade" x="220" y="124" width="200" height="364" fill="#2A2622"/><rect class="rwarm" x="220" y="124" width="200" height="364" fill="url(#wnGlow)"/>
        </g></g>
      <g class="lowerwrap"><g class="lower">${sash(222, 302, 196, 184, 16, 22, 'lowersash')}</g></g>
      ${sash(222, 126, 196, 192, 15, 17, 'uppersash')}
      <g class="screen" data-part="screen"><rect x="222" y="318" width="196" height="168" fill="url(#wnMesh)"/><path fill-rule="evenodd" d="M222 318h196v168h-196Z M227 323v158h186v-158Z" fill="#2B2F33" opacity=".85"/></g>
      <rect class="night" x="-400" width="1440" height="700" mask="url(#wnNightM)"/><ellipse class="spill" cx="320" cy="560" rx="230" ry="120" fill="url(#wnSpill)"/>
    </svg>`;
  }
  const PARTS = [['frame', 'Fibrex frame', 'Andersen\'s wood-fibre and polymer composite'], ['uppersash', 'Fixed upper sash', 'Sits to the outside'],
    ['lowersash', 'Lower sash', 'Lifts up, behind the upper sash'], ['grille', 'Finelight grilles', 'Between the two panes'], ['screen', 'Insect screen', 'Outside, over the lower half'],
    ['trim', 'Trim and sill', 'Our casing around the opening']];
  const A = () => `<section class="sec wnA" id="windows" aria-labelledby="wnA-h">
    <div class="side"><h2 class="sec-h" id="wnA-h">One window, morning to midnight.</h2>
      <p class="sec-p">An Andersen 100 Series single-hung, as we fit it: Fibrex frame, a fixed upper sash, a lower sash that lifts, Low-E glass. Drag the sun across the day.</p>
      <ul class="parts" aria-label="Parts of the window">${PARTS.map(([k, n, d]) => `<li><button type="button" data-p="${k}"><b>${n}</b><span>${d}</span></button></li>`).join('')}</ul>
      <div class="brands"><b>388</b><span>documented window jobs. Of 376 priced: NT Windows 238, Simonton 54, Andersen 38, Pella 31.</span></div>
      <a class="btn key" href="${BOOK}">Book a free inspection<span class="tab">${CAL}</span></a></div>
    <div class="stage">${svgWindow()}
      <div class="ctrl"><div class="day"><label for="wnA-t" class="sr">Time of day</label><input id="wnA-t" type="range" min="0" max="100" value="22" aria-valuetext="9 am">
        <div class="ticks" aria-hidden="true"><span>7 am</span><span>Noon</span><span>Dusk</span><span>11 pm</span></div></div>
        <div class="tg"><button type="button" class="chipb" data-t="lift" aria-pressed="false">Lift the sash</button><button type="button" class="chipb" data-t="grille" aria-pressed="true">Grilles</button></div>
        <div class="fc" role="radiogroup" aria-label="Frame colour">${AC.map(([n, h], i) => `<button type="button" role="radio" aria-checked="${i === 0}" aria-label="${n}" style="--c:${h}"></button>`).join('')}<span class="fcn">White</span></div></div></div></section>`;

  function wireA(root) {
    const s = root.querySelector('.wnA'); if (!s) return;
    const svg = s.querySelector('.wnsvg'), rng = s.querySelector('#wnA-t');
    const hour = (v) => 7 + v / 100 * 16;   // 7 am .. 11 pm
    const fmt = (h) => { const H = Math.floor(h), m = Math.round((h - H) * 60 / 15) * 15 % 60, ap = H >= 12 ? 'pm' : 'am', h12 = ((H + 11) % 12) + 1; return `${h12}${m ? ':' + String(m).padStart(2, '0') : ''} ${ap}`; };
    function set(v) {
      const h = hour(v), night = Math.max(0, Math.min(1, (h - 18.2) / 2.3)), dusk = Math.max(0, 1 - Math.abs(h - 19) / 1.6), sun = Math.max(-1, Math.min(1, (h - 13) / 6));
      svg.style.setProperty('--night', night.toFixed(3)); svg.style.setProperty('--dusk', dusk.toFixed(3));
      svg.style.setProperty('--sx', (-sun * 10).toFixed(1) + 'px'); s.style.setProperty('--night', night.toFixed(3));
      rng.setAttribute('aria-valuetext', fmt(h)); rng.style.setProperty('--v', v + '%');
    }
    rng.addEventListener('input', () => { stopIntro(); set(+rng.value); });
    s.querySelectorAll('[data-t]').forEach((b) => b.addEventListener('click', () => { const on = b.getAttribute('aria-pressed') !== 'true'; b.setAttribute('aria-pressed', on); svg.classList.toggle(b.dataset.t === 'lift' ? 'lifted' : 'nogrille', b.dataset.t === 'lift' ? on : !on); }));
    const fcs = [...s.querySelectorAll('.fc [role=radio]')];
    const pickC = (i, focus) => { fcs.forEach((b, k) => { b.setAttribute('aria-checked', k === i); b.tabIndex = k === i ? 0 : -1; }); svg.style.setProperty('--fc', AC[i][1]); s.querySelector('.fcn').textContent = AC[i][0]; if (focus) fcs[i].focus(); };
    fcs.forEach((b, i) => { b.addEventListener('click', () => pickC(i)); b.addEventListener('keydown', (e) => { const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]; if (d) { e.preventDefault(); pickC((i + d + fcs.length) % fcs.length, true); } }); });
    pickC(0);
    // part buttons highlight the real component in the drawing
    s.querySelectorAll('.parts button').forEach((b) => { const on = (v) => { svg.querySelectorAll('[data-part]').forEach((p) => p.classList.toggle('hl', v && p.dataset.part === b.dataset.p)); svg.classList.toggle('hlon', v); };
      b.addEventListener('pointerenter', () => on(true)); b.addEventListener('pointerleave', () => on(false)); b.addEventListener('focus', () => on(true)); b.addEventListener('blur', () => on(false));
      b.addEventListener('click', () => { if (b.dataset.p === 'lowersash') s.querySelector('[data-t=lift]').click(); }); });
    // intro: once in view, the day runs from morning to dusk; any touch of the slider stops it
    let raf = 0, t0 = 0; const stopIntro = () => { cancelAnimationFrame(raf); raf = 0; };
    set(+rng.value);
    if (!RM) new IntersectionObserver((es, io) => es.forEach((e) => { if (!e.isIntersecting) return; io.disconnect(); const from = +rng.value, to = 80;
      const step = (now) => { if (!t0) t0 = now; const k = Math.min(1, (now - t0) / 3200), ez = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2; const v = from + (to - from) * ez; rng.value = v; set(v); if (k < 1) raf = requestAnimationFrame(step); };
      raf = requestAnimationFrame(step); }), { threshold: 0.5 }).observe(s.querySelector('.stage'));
  }

  /* ---------- B: a 400 Series bay, built out from the wall; peel the wall to its build-up ---------- */
  const LAYERS = [['siding', 'Lap siding', 'James Hardie, 7 in exposure'], ['wrap', 'House wrap', 'Sheds water that gets behind the boards'], ['sheath', 'Sheathing', 'Structural panels on the studs'], ['studs', 'Studs and insulation', 'The frame of the wall']];
  const unit = (cls) => `<div class="u ${cls}"><div class="ufr"><div class="usash"><i class="ug"></i></div></div></div>`;
  const wallPieces = (cls) => `<i class="wp ${cls} t"></i><i class="wp ${cls} b"></i><i class="wp ${cls} l"></i><i class="wp ${cls} r"></i>`;
  const B = () => `<section class="sec wnB" id="windows" aria-labelledby="wnB-h">
    <div class="side"><h2 class="sec-h" id="wnB-h">A bay, built out from the wall.</h2>
      <p class="sec-p">Andersen 400 Series bays join three windows on angled posts, at 30° or 45°, with a head board above and a seat board below. Peel the wall to see what holds it.</p>
      <div class="seg" role="group" aria-label="Bay angle"><button type="button" aria-pressed="false" data-a="30">30° bay</button><button type="button" aria-pressed="true" data-a="45">45° bay</button></div>
      <ol class="layers" aria-label="Wall layers">${LAYERS.map(([k, n, d], i) => `<li data-l="${i}"><b>${n}</b><span>${d}</span></li>`).join('')}</ol>
      <div class="acts"><button class="btn light" type="button" data-peel>Peel a layer</button><a class="btn key" href="${BOOK}">Book a free inspection<span class="tab">${CAL}</span></a></div>
      <p class="note">Andersen Certified Contractor, Premier. 38 priced Andersen jobs; median band $20k–$25k.</p></div>
    <div class="stage" role="img" aria-label="A three-window bay projecting from a lap-sided wall; the wall around it can be peeled back to house wrap, sheathing and studs.">
      <div class="cam"><div class="world">
        <div class="wall"><i class="inside"></i>${wallPieces('studs')}${wallPieces('sheath')}${wallPieces('wrap')}${wallPieces('siding')}</div>
        <div class="bay">${unit('lf')}${unit('ct')}${unit('rf')}<i class="post pl"></i><i class="post pr"></i><i class="head"></i><i class="seat"></i><i class="brk bl"></i><i class="brk br"></i></div>
      </div></div><span class="hint" aria-hidden="true">Move across the bay to turn it</span></div></section>`;

  function wireB(root) {
    const s = root.querySelector('.wnB'); if (!s) return;
    const stage = s.querySelector('.stage'), world = s.querySelector('.world'), cam = s.querySelector('.cam');
    const F = 150, C = 210;   // flanker and centre unit widths (px in world units)
    let ang = 45, peel = 0, ry = -22, rx = -6, try_ = -22, trx = -6, raf = 0;
    function geo() { const a = ang * Math.PI / 180, W = C + 2 * F * Math.cos(a), P = F * Math.sin(a);
      world.style.setProperty('--W', W.toFixed(1) + 'px'); world.style.setProperty('--P', P.toFixed(1) + 'px'); world.style.setProperty('--a', ang + 'deg');
      world.style.setProperty('--F', F + 'px'); world.style.setProperty('--C', C + 'px'); world.style.setProperty('--inset', ((W - C) / 2).toFixed(1) + 'px'); }
    function fit() { const r = stage.getBoundingClientRect(); cam.style.setProperty('--s', Math.min(r.width / 760, r.height / 600).toFixed(3)); }
    function tick() { raf = 0; ry += (try_ - ry) * 0.12; rx += (trx - rx) * 0.12; world.style.setProperty('--ry', ry.toFixed(2) + 'deg'); world.style.setProperty('--rx', rx.toFixed(2) + 'deg');
      if (Math.abs(try_ - ry) + Math.abs(trx - rx) > 0.05) raf = requestAnimationFrame(tick); }
    const go = () => { if (RM) { ry = try_; rx = trx; world.style.setProperty('--ry', ry + 'deg'); world.style.setProperty('--rx', rx + 'deg'); } else if (!raf) raf = requestAnimationFrame(tick); };
    stage.addEventListener('pointermove', (e) => { if (e.pointerType !== 'mouse') return; const r = stage.getBoundingClientRect(); try_ = -22 + ((e.clientX - r.left) / r.width - 0.5) * 50; trx = -6 - ((e.clientY - r.top) / r.height - 0.5) * 14; go(); });
    stage.addEventListener('pointerleave', () => { try_ = -22; trx = -6; go(); });
    // touch: drag sideways to turn
    let sx = null; stage.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse') sx = [e.clientX, try_]; });
    stage.addEventListener('pointermove', (e) => { if (sx && e.pointerType !== 'mouse') { try_ = Math.max(-48, Math.min(8, sx[1] + (e.clientX - sx[0]) * 0.25)); go(); } });
    addEventListener('pointerup', () => { sx = null; });
    s.querySelectorAll('[data-a]').forEach((b) => b.addEventListener('click', () => { ang = +b.dataset.a; s.querySelectorAll('[data-a]').forEach((x) => x.setAttribute('aria-pressed', x === b)); geo(); }));
    const pb = s.querySelector('[data-peel]'), lis = s.querySelectorAll('.layers li');
    function showPeel() { world.dataset.peel = peel; lis.forEach((l, i) => { l.classList.toggle('off', i < peel); l.classList.toggle('now', i === peel); });
      pb.textContent = peel >= 3 ? 'Build it back' : 'Peel a layer'; }
    pb.addEventListener('click', () => { peel = peel >= 3 ? 0 : peel + 1; showPeel(); });
    geo(); fit(); showPeel(); world.style.setProperty('--ry', ry + 'deg'); world.style.setProperty('--rx', rx + 'deg');
    addEventListener('resize', fit); new ResizeObserver(fit).observe(stage);
    // entrance: the bay slides out of the wall once in view
    if (!RM) new IntersectionObserver((es, io) => es.forEach((e) => { if (e.isIntersecting) { io.disconnect(); world.classList.add('in'); } }), { threshold: 0.4 }).observe(stage); else world.classList.add('in');
  }
  return { A, B, wire(root) { wireA(root); wireB(root); } };
})();
