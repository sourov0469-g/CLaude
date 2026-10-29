// HOW. Three steps in the owner's words only: "Call Rachel." / "Get it in writing, line by line." / "We put the roof on.",
// with the hours placed by step one: Monday to Friday, 9 to 5 (never 24/7). The chapter's background reacts as weather
// (PLAN 5.5): in v1 it rains, in v2 the overcast lifts as the roof goes on, in v3 the cards run storm blue, sun, clear sky.
// Each init runs inside the section's gsap.matchMedia() (main.js); rAF loops, observers and listeners are returned as cleanup.
import { gsap } from 'gsap';
import { lines, rise, clipIn, onEnter, EASE } from '../../js/fx.js';
import { loop } from '../../js/gl.js';

const seeded = s => () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

// prepText names a split element with aria-label, which ARIA 1.2 prohibits on <p> (screen readers drop it, and its words
// are aria-hidden): give the words back as visually hidden text instead (S0070, split text keeps one accessible name).
function speak(root) {
  root.querySelectorAll('p[data-cursor="text"][aria-label]').forEach(el => {
    const s = document.createElement('span'); s.className = 'vh'; s.textContent = el.getAttribute('aria-label');
    el.prepend(s); el.removeAttribute('aria-label');
  });
}

// ---------------------------------------------------------------------------------------------------------------------
// v1 Shelter. Rain on ONE canvas, S1377 exactly:
//   layers  far  scale .3-.5,   opacity .22-.40, slow   (behind the type)
//           mid  scale .5-.85,  opacity .46-.78, medium (the body of the effect, behind the type)
//           near scale 1.05-1.9, opacity .50-.82, fast, blurred, only 2 or 3 drops, drawn IN FRONT of the type
//   density k = clamp(sqrt(W*H/(1440*900)), .5, 1.3) scales the authored counts; every parameter is varied per drop
//   (speed, lean, length, width, opacity, colour from a 4-step ramp, phase); one drawImage per drop from pre-rendered
//   sprites; paused when hidden or off-screen (gl.js loop: IntersectionObserver + visibilitychange, dt clamped to 1/30);
//   DPR capped at 2; sized from a ResizeObserver on the root with a zero-size guard.
// Rain is linear: seeded ±20% speed and x drift (S0489 rain recipe). Far and mid drops are cut out exactly where the letters
// are (a glyph mask redrawn only on layout), so they pass BEHIND the words while the near drops cross in front.
// The field is data-cursor="roof" (cursor.js): mid and near drops that hit the chevron splash, and some run down its slopes
// and drip off the eaves; far rain passes behind it. Nothing depends on the pointer (S1377): without it the rain is the whole
// scene, on touch and keyboard alike. Depth also lives in the drawing (S1330 opposing, unequal layers): far rain lags the
// scroll and leans against the pointer, near rain leads. Reduced motion: one composed still frame.
function shelter(root, c) {
  const cv = root.querySelector('.hw1-cv'), g = cv.getContext('2d'), stack = root.querySelector('.hw1-stack');
  if (!g) return;
  const roofEl = document.querySelector('.cur-roof');
  const rnd = seeded(2015);
  const RAMP = ['255,255,255', '228,235,248', '201,214,242', '169,191,233'];
  const LAYERS = [ // authored at 1440x900; v in px/s; par = share of the scroll the layer lags by; pd = pointer depth
    { n: 96, s: [0.3, 0.5], o: [0.22, 0.4], v: 620, par: 0.45, pd: -0.015 },
    { n: 132, s: [0.5, 0.85], o: [0.46, 0.78], v: 1150, par: 0.2, pd: 0.012 },
    { n: 3, s: [1.05, 1.9], o: [0.5, 0.82], v: 2150, par: -0.15, pd: 0.05 },
  ];
  // sprites, pre-rendered once (S1377 cost rule): a streak whose head is at the bottom, and a soft droplet
  const streak = (rgb, blur) => {
    const s = document.createElement('canvas'); s.width = 24; s.height = 136; const x = s.getContext('2d');
    const gr = x.createLinearGradient(0, 8, 0, 128);
    gr.addColorStop(0, `rgba(${rgb},0)`); gr.addColorStop(0.68, `rgba(${rgb},.5)`); gr.addColorStop(1, `rgba(${rgb},1)`);
    if (blur) x.filter = 'blur(2.5px)';
    x.fillStyle = gr; x.beginPath(); if (x.roundRect) x.roundRect(9, 8, 6, 120, 3); else x.rect(9, 8, 6, 120); x.fill(); return s;
  };
  const SPR = [RAMP.map(r => streak(r, false)), RAMP.map(r => streak(r, true))];
  const DOT = (() => {
    const s = document.createElement('canvas'); s.width = s.height = 16; const x = s.getContext('2d'), gr = x.createRadialGradient(8, 8, 0, 8, 8, 8);
    gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.45, 'rgba(236,242,252,.85)'); gr.addColorStop(1, 'rgba(236,242,252,0)');
    x.fillStyle = gr; x.fillRect(0, 0, 16, 16); return s;
  })();
  const drops = [];
  LAYERS.forEach((L, li) => {
    const max = li === 2 ? 3 : Math.ceil(L.n * 1.3);
    for (let i = 0; i < max; i++) {
      const sc = L.s[0] + rnd() * (L.s[1] - L.s[0]), v = L.v * (0.8 + 0.4 * rnd()), lean = 0.15 * (0.8 + 0.4 * rnd()), a = Math.atan(lean);
      drops.push({ L: li, i, v, vx: v * lean, lean, cos: Math.cos(a), sin: Math.sin(a), op: L.o[0] + rnd() * (L.o[1] - L.o[0]),
        len: v * (0.026 + 0.018 * rnd()) * (li === 2 ? 0.9 : 1), w: (li === 2 ? 2.6 : 2.2) * sc, col: Math.floor(rnd() * RAMP.length),
        r: rnd(), x: 0, y: 0, py: 0, live: false, f: 1 });
    }
  });
  const rain = { want: c.motion ? 0 : 1 };
  let W = 0, H = 0, dpr = 1, cw = 0, ch = 0, cnt = [0, 0, 0], rect = null, masked = !c.motion, lp = null, dead = false, lastSY = scrollY;
  let roofKind = false, inside = false;
  const P = { x: 0, y: 0, tx: 0, ty: 0 }, offX = [0, 0, 0], offY = [0, 0, 0];
  const spray = [], runs = [], drips = [];
  const spawnX = d => -H * d.lean + rnd() * (W + H * d.lean);
  const respawn = d => { d.x = spawnX(d); d.y = -rnd() * H * 0.25; d.py = d.y; d.live = d.r < rain.want; d.f = 1; };
  const scatter = () => drops.forEach(d => { d.x = spawnX(d); d.y = rnd() * (H + d.len); d.py = d.y; d.live = d.r < rain.want; });

  // the glyph mask: the words drawn once, at their laid-out places, so far and mid rain can be cut out behind them
  const mask = document.createElement('canvas'); let box = [0, 0, 0, 0];
  function buildMask() {
    if (!W) return;
    mask.width = cw; mask.height = ch; const m = mask.getContext('2d'); box = [cw, ch, 0, 0];
    m.setTransform(dpr, 0, 0, dpr, 0, 0); m.fillStyle = m.strokeStyle = '#000'; m.lineWidth = 3; m.lineJoin = 'round';
    const cr = cv.getBoundingClientRect(), range = document.createRange(), walk = document.createTreeWalker(stack, NodeFilter.SHOW_TEXT);
    while (walk.nextNode()) {
      const n = walk.currentNode, el = n.parentElement; if (!el || !n.textContent.trim()) continue;
      const cs = getComputedStyle(el);
      m.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
      if ('letterSpacing' in m) m.letterSpacing = cs.letterSpacing === 'normal' ? '0px' : cs.letterSpacing;
      for (const w of n.textContent.matchAll(/\S+/g)) {
        range.setStart(n, w.index); range.setEnd(n, w.index + w[0].length);
        const r = range.getClientRects()[0]; if (!r) continue;
        const asc = m.measureText(w[0]).fontBoundingBoxAscent || parseFloat(cs.fontSize) * 0.8;
        const x = r.left - cr.left, y = r.top - cr.top + asc;
        m.fillText(w[0], x, y); m.strokeText(w[0], x, y);
        box = [Math.min(box[0], x * dpr - 4), Math.min(box[1], (r.top - cr.top) * dpr - 4), Math.max(box[2], (x + r.width) * dpr + 4), Math.max(box[3], (r.bottom - cr.top) * dpr + 4)];
      }
    }
  }

  // the roof is the cursor's own chevron (path M4 26 30 5 56 26 in a 60x30 box at -30,-24): apex 19px above the pointer,
  // eaves 26px either side and 2px below. Read where the cursor actually drew it, lag included.
  const SL = 21 / 26, SLEN = Math.hypot(26, 21), UX = 26 / SLEN, UY = 21 / SLEN;
  function roof() {
    if (!(roofKind && inside && roofEl)) return null;
    if (!rect) rect = cv.getBoundingClientRect();
    return { ax: gsap.getProperty(roofEl, 'x') - rect.left, ay: gsap.getProperty(roofEl, 'y') - 19 - rect.top };
  }
  function hit(d, x, y, R) {
    const side = x < R.ax ? -1 : 1, big = d.L === 2, n = big ? 4 : 2 + (rnd() < 0.45 ? 1 : 0);
    for (let k = 0; k < n && spray.length < 64; k++) {
      spray.push({ x, y, vx: side * (30 + rnd() * 120) + (rnd() - 0.5) * 70, vy: -(80 + rnd() * 160) * (big ? 1.35 : 1), t: 0, life: 0.24 + rnd() * 0.22, r: (big ? 2.2 : 1.3) + rnd() * 0.9, op: d.op });
    }
    if ((big || rnd() < 0.55) && runs.length < 28) runs.push({ side, u: Math.min(SLEN - 2, Math.abs(x - R.ax) / UX), v: 18 + rnd() * 24, op: d.op, r: 1.5 + rnd() * 0.8, x, y });
  }
  const drip = (x, y, vx, vy, op) => { if (drips.length < 40) drips.push({ x, y, vx, vy, op }); };

  function frame(dt) {
    if (!dt) lastSY = scrollY; // first frame after a pause: no integration across it (S1377)
    const sy = scrollY, ds = sy - lastSY; lastSY = sy;
    const a = 1 - Math.pow(1 - 0.055, dt * 60); // S1330 damping
    P.x += (P.tx - P.x) * a; P.y += (P.ty - P.y) * a;
    for (let l = 0; l < 3; l++) { offX[l] = P.x * W * 0.5 * LAYERS[l].pd; offY[l] = P.y * H * 0.5 * LAYERS[l].pd; }
    const R = roof();
    for (const d of drops) {
      if (d.i >= cnt[d.L]) continue;
      d.py = d.y; d.y += d.v * dt + ds * LAYERS[d.L].par; d.x += d.vx * dt;
      if (d.y - d.len > H + 8) { respawn(d); continue; }
      if (!d.live && d.r < rain.want) { d.live = true; d.f = 0; } // the rain thickens where it is: each new drop fades in
      if (d.f < 1) d.f = Math.min(1, d.f + dt / 0.35);
      if (R && d.live && d.L > 0) {
        const hx = d.x + offX[d.L], dx = hx - R.ax;
        if (Math.abs(dx) <= 27) {
          const s = R.ay + Math.abs(dx) * SL - 2.2 - offY[d.L]; // the chevron's top surface (4px stroke)
          if (d.py <= s && d.y >= s) { hit(d, hx, s + offY[d.L], R); respawn(d); }
        }
      }
    }
    for (let k = runs.length - 1; k >= 0; k--) { // a bead runs down the slope (gravity along 39 degrees, less friction)
      const q = runs[k];
      if (!R) { drip(q.x, q.y, q.side * q.v * UX, q.v * UY, q.op); runs.splice(k, 1); continue; }
      q.v += 520 * dt; q.u += q.v * dt;
      if (q.u >= SLEN + 1) { drip(R.ax + q.side * 27.2, R.ay + 22.5, q.side * q.v * UX * 0.4, q.v * UY * 0.5, q.op); runs.splice(k, 1); continue; }
      q.x = R.ax + q.side * q.u * UX; q.y = R.ay + q.u * UY - 2.6;
    }
    for (let k = drips.length - 1; k >= 0; k--) { // falling away: gravity, so ease-in is right here (S0489)
      const q = drips[k]; q.vy = Math.min(1250, q.vy + 2100 * dt); q.x += q.vx * dt; q.y += q.vy * dt + ds * LAYERS[1].par;
      if (q.y > H + 40) drips.splice(k, 1);
    }
    for (let k = spray.length - 1; k >= 0; k--) {
      const q = spray[k]; q.vy += 1500 * dt; q.x += q.vx * dt; q.y += q.vy * dt + ds; q.t += dt;
      if (q.t >= q.life) spray.splice(k, 1);
    }
    draw();
  }

  function put(d) {
    if (!d.live || d.i >= cnt[d.L]) return;
    const x = d.x + offX[d.L], y = d.y + offY[d.L];
    if (y < -2 || y - d.len > H) return;
    const Wd = d.w * 4, Hd = d.len * 136 / 120;
    g.globalAlpha = d.op * d.f;
    g.setTransform(dpr * d.cos, -dpr * d.sin, dpr * d.sin, dpr * d.cos, x * dpr, y * dpr);
    g.drawImage(SPR[d.L === 2 ? 1 : 0][d.col], -Wd / 2, -Hd * 128 / 136, Wd, Hd);
  }
  function line(x, y, vx, vy, len, w, op) { // a short streak along a velocity
    const s = Math.hypot(vx, vy) || 1, cs = vy / s, sn = vx / s;
    g.globalAlpha = op; g.setTransform(dpr * cs, -dpr * sn, dpr * sn, dpr * cs, x * dpr, y * dpr);
    g.drawImage(SPR[0][0], -w * 2, -len * 136 / 120 * 128 / 136, w * 4, len * 136 / 120);
  }
  function draw() {
    if (!W) return;
    g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = 1; g.clearRect(0, 0, cw, ch);
    for (const d of drops) if (d.L < 2) put(d);
    if (masked && mask.width === cw) { // behind the words
      g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = 1; g.globalCompositeOperation = 'destination-out';
      const bx = Math.max(0, Math.floor(box[0])), by = Math.max(0, Math.floor(box[1])), bw = Math.min(cw, Math.ceil(box[2])) - bx, bh = Math.min(ch, Math.ceil(box[3])) - by;
      if (bw > 0 && bh > 0) g.drawImage(mask, bx, by, bw, bh, bx, by, bw, bh); // only the words' box is composited
      g.globalCompositeOperation = 'source-over';
    }
    for (const q of runs) { line(q.x, q.y, q.side * UX, UY, 5, q.r * 0.9, q.op); g.setTransform(dpr, 0, 0, dpr, 0, 0); g.drawImage(DOT, q.x - q.r * 1.6, q.y - q.r * 1.6, q.r * 3.2, q.r * 3.2); }
    for (const q of drips) line(q.x, q.y, q.vx, q.vy, clamp(q.vy * 0.02, 3, 26), 1.6, q.op);
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    for (const q of spray) { g.globalAlpha = q.op * (1 - q.t / q.life); g.drawImage(DOT, q.x - q.r, q.y - q.r, q.r * 2, q.r * 2); }
    for (const d of drops) if (d.L === 2) put(d); // in front of the words
    g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = 1;
  }

  // reduced motion: one composed still (S1377), with the near drops placed across the words
  function still() {
    if (!W) return;
    drops.forEach(d => { d.live = true; });
    const sr = stack.getBoundingClientRect(), cr = cv.getBoundingClientRect(), near = drops.filter(d => d.L === 2);
    [[0.3, 0.5], [0.68, 0.86], [0.86, 0.12]].forEach(([fx, fy], i) => { const d = near[i]; if (d) { d.x = sr.left - cr.left + sr.width * fx; d.y = sr.top - cr.top + sr.height * fy; } });
    masked = true; buildMask(); draw();
  }

  function layout() {
    const r = cv.getBoundingClientRect(); if (r.width < 2 || r.height < 2) return; // zero-viewport guard
    const first = !W; W = r.width; H = r.height; dpr = Math.min(devicePixelRatio || 1, 2);
    cw = cv.width = Math.round(W * dpr); ch = cv.height = Math.round(H * dpr);
    const k = clamp(Math.sqrt((W * H) / (1440 * 900)), 0.5, 1.3);
    cnt = [Math.round(LAYERS[0].n * k), Math.round(LAYERS[1].n * k), k < 0.75 ? 2 : 3];
    rect = null;
    if (first) scatter();
    if (lp) { buildMask(); draw(); } else still();
  }
  const ro = new ResizeObserver(layout); ro.observe(root);
  if (document.fonts) document.fonts.ready.then(() => { if (!dead && W) { buildMask(); if (!lp) draw(); } });

  const offs = [];
  if (c.motion) {
    lp = loop(cv, dt => { if (W) frame(dt); });
    // the weather rolls in: drops join as they respawn at the top, so nothing pops into view (S0489 never teleport)
    gsap.to(rain, { want: 1, ease: 'none', scrollTrigger: { trigger: root, start: 'top bottom', end: 'top 25%', scrub: true } });
    // the words arrive the way the rain does, from above, into their line masks (S1321 masked lines, inverted), once
    gsap.timeline({ scrollTrigger: onEnter(stack, { start: 'top 80%' }), onComplete: () => { masked = true; buildMask(); } })
      .fromTo(stack.querySelectorAll('.ln > span'), { yPercent: -110, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 1.05, ease: EASE, stagger: 0.13 })
      .add(rise(root.querySelector('.hw1-hours'), { duration: 0.5 }, { y: 8 }), 0.5)
      .add(rise(root.querySelector('.hw1-cta')), 0.62);
    const onKind = e => { roofKind = e.detail.kind === 'roof'; };
    const scrolled = () => { rect = null; };
    document.addEventListener('cursorkind', onKind); addEventListener('scroll', scrolled, { passive: true });
    offs.push(() => { document.removeEventListener('cursorkind', onKind); removeEventListener('scroll', scrolled); });
    if (c.fine) {
      const move = e => { if (e.pointerType !== 'mouse') return; inside = true; P.tx = e.clientX / innerWidth * 2 - 1; P.ty = e.clientY / innerHeight * 2 - 1; };
      const leave = () => { inside = false; P.tx = P.ty = 0; };
      root.addEventListener('pointermove', move); root.addEventListener('pointerleave', leave);
      offs.push(() => { root.removeEventListener('pointermove', move); root.removeEventListener('pointerleave', leave); });
    }
  }
  return () => { dead = true; if (lp) lp.stop(); ro.disconnect(); offs.forEach(f => f()); };
}

// ---------------------------------------------------------------------------------------------------------------------
// v2 Re-roof. Pinned (end +=200%, scrub, ease none) and driven by ONE normalized progress, 0 to 1 (S1326, SVG renderer).
// The SVG shares the photo's own coordinate space: viewBox 0 0 1156 682 with xMidYMid slice is object-fit cover at
// object-position 50% 50%, so the roofline traced by hand from the real photo sits on the real roof at every crop.
//   0.04-0.34  the roofline draws itself from the left eave, round the hips and ridge (S0407, pathLength 1 draw-on)
//   0.27-0.38  the gable
//   0.40-0.92  the real roof is laid course by course, eave to ridge; each course sweeps left to right and starts before
//              the one below has finished (S0489 overlap); before that the roof sits as a flat --mist field
//   0.20, 0.55, 0.90  the steps appear, each written left to right
//   0.84-0.94  the overcast lifts (the weather), then the drawing leaves; opacity only appears or disappears (S0489)
// Reduced motion and phones: the finished photo and the three steps (S1326 static state, normal flow).
function reroof(root, c) {
  const head = root.querySelector('.hw2-head h2'), frame = root.querySelector('.hw2-frame'), steps = [...root.querySelectorAll('.hw2-steps > li')];
  if (!c.motion) return;
  const SHUT = 'inset(-10% 100% -24% 0%)', OPEN = 'inset(-10% 0% -24% 0%)'; // a left-to-right writing wipe, room for lifts
  gsap.fromTo(head, { clipPath: SHUT }, { clipPath: OPEN, duration: 1, ease: EASE, clearProps: 'clipPath', scrollTrigger: onEnter(root, { start: 'top 70%' }) });
  if (!c.wide) { // phones: no pin (G8 #14); the photo opens and the steps write themselves in, once
    clipIn(frame, { scrollTrigger: onEnter(frame) });
    gsap.fromTo(steps, { clipPath: SHUT, autoAlpha: 0 }, { clipPath: OPEN, autoAlpha: 1, duration: 0.8, ease: EASE, stagger: 0.14, clearProps: 'clipPath', scrollTrigger: onEnter(root.querySelector('.hw2-steps'), { start: 'top 88%' }) });
    return;
  }
  root.classList.add('is-live');
  const pin = root.querySelector('.hw2-pin'), svg = root.querySelector('.hw2-svg'), wx = root.querySelector('.hw2-wx');
  const [outline, gable] = svg.querySelectorAll('.hw2-line'), courses = [...svg.querySelectorAll('.hw2-c')];
  const tl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: pin, start: 'top top', end: '+=200%', scrub: 1, pin: true, anticipatePin: 1, invalidateOnRefresh: true } });
  tl.set({}, {}, 1) // the timeline is exactly 1 long, so every position below is a progress value
    .fromTo(outline, { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.3 }, 0.04)
    .fromTo(gable, { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.11 }, 0.27);
  const D = 0.11, S = (0.52 - D) / (courses.length - 1);
  courses.forEach((r, i) => tl.fromTo(r, { scaleX: 1, transformOrigin: '100% 50%' }, { scaleX: 0, duration: D }, 0.4 + i * S));
  [0.2, 0.55, 0.9].forEach((at, i) => tl.fromTo(steps[i], { autoAlpha: 0, clipPath: SHUT }, { autoAlpha: 1, clipPath: OPEN, duration: 0.07 }, at - 0.04));
  tl.fromTo(wx, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.1 }, 0.84)
    .fromTo([outline, gable], { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.05, immediateRender: false }, 0.93);
  return () => root.classList.remove('is-live');
}

// ---------------------------------------------------------------------------------------------------------------------
// v3 Stack. S1322 sticky card stack: three full-width cards stick at 12vh; as the next one arrives (its top travelling from
// 78% to 24% of the viewport, scrubbed, ease none) the card beneath recedes to scale 0.94 and moves back 24px (S1322 y);
// two deep it sits at 0.92, the S1322 depth floor, and -48px, so each peeks above the next. S0410: nothing pre-scales below
// about 0.9. S0489: opacity is never used to half-dim a card. Each card's words settle into it as it lands (a scrubbed
// counter-drift, 18% of the block), so the type moves at its own rate against the card. Blue, sun, sky: the weather clearing.
// Triggers measure the list, never the sticky cards, because a stuck card's rect moves with the scroll.
function stackV(root, c) {
  if (c.motion && c.fine) speak(root);
  if (!c.motion) return; // reduced motion: the cards simply stack in flow (CSS)
  const list = root.querySelector('.hw3-stack'), cards = [...list.children], ins = cards.map(cd => cd.querySelector('.hw3-in'));
  lines(root.querySelector('.hw3-head h2'), { scrollTrigger: onEnter(root) });
  const H = () => cards[0].offsetHeight, SC = [1, 0.94, 0.92], Y = [0, -24, -48];
  const st = (k, from, to) => ({ trigger: list, start: () => `top+=${k * H()} ${from}`, end: () => `top+=${k * H()} ${to}`, scrub: true, invalidateOnRefresh: true });
  gsap.fromTo(ins[0], { yPercent: 18 }, { yPercent: 0, ease: 'none', scrollTrigger: st(0, 'bottom', '24%') });
  for (let k = 1; k < cards.length; k++) {
    const tl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: st(k, '78%', '24%') });
    for (let j = 0; j < k; j++) { const d = k - j; tl.fromTo(cards[j], { scale: SC[d - 1], y: Y[d - 1] }, { scale: SC[d], y: Y[d], immediateRender: k === 1 }, 0); }
    gsap.fromTo(ins[k], { yPercent: 18 }, { yPercent: 0, ease: 'none', scrollTrigger: st(k, 'bottom', '24%') });
  }
}

export default { 1: shelter, 2: reroof, 3: stackV };
