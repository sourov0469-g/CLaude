// Backups B1-B3 of the hero section (audit pack 2026-10-30 A2): verbatim except the prefix hx -> bhx. Never edit.
// HERO (PLAN-FULL.md §1): three fresh builds from three reference families; each version's headline system is the
// page's one signature interactive (F17). Facts only (BRIEF-FULL.md §3): founded 1995 by Bunk Walker, son Wade
// president since 2015, Rachel answers the phone, Monday to Friday 9 to 5, (937) 746-7377, the 24 service towns.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EASE, beats } from '../../../js/frozen/fx.js';
import { TOWNS } from '../../../data/towns.js';

const clamp01 = u => (u < 0 ? 0 : u > 1 ? 1 : u);
const smooth = u => { u = clamp01(u); return u * u * (3 - 2 * u); };
const mulberry = seed => () => { seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
const inView = (el, fn) => { const io = new IntersectionObserver(([e]) => fn(e.isIntersecting), { rootMargin: '60px' }); io.observe(el); return () => io.disconnect(); };

// v1 ⟦S0534⟧ heygen-com/code-slice-hero (HyperFrames block; live source read: code-slice-hero.html). One surface of cells
// carries a headline and a second headline sits behind it. A cursor's Gaussian depth field, exp(-falloff·d²/r²) cut off
// smoothly at 0.06, lifts and tilts the cells near it (tilt ∝ offset/r × strength × pull × depth/160; z = strength/30 ×
// depth × 0.45 × pull). Only cells over either headline's ink flip: a half-turn smooth(p/0.64) with a damped ring
// bounce flipBounce·36·sin(3.3π·t), a flight lift 17·sin(πp)^0.7·peak and shading 1 − 0.12|sin|; flip time ×(1 + 0.18
// (1 − peak)); ink-free cells lift at 0.55 and never flip. A 2.6s sweep (ease strength 3) turns front into rear.
// Adapted: the cells are 3-tab shingle tabs in staggered courses with keyways and granules; the letters are spelled in
// a second shingle colour, FAMILY ROOFERS then SINCE 1995; the visitor's pointer is the cursor (it lifts tabs like
// wind); the reference's sweep runs once on load, and a press anywhere on the wall sends a flip wave out from that
// point. Canvas 2D, drawn only while something moves; it sleeps at rest and off screen.
const WALL = { falloff: 1.4, depth: 80, tilt: 28, flip: 0.75, bounce: 0.15, sweep: 2.6, sweepPow: 4, noise: 2 };
const SHADES = { under: '#070d1c', dark: ['#202a40', '#2b3650', '#323e5a'], front: ['#cfc6b1', '#ece5d3', '#f6f1e4'], rear: ['#e09a00', '#ffb81f', '#ffc94f'] };
function wall(root, c) {
  const host = root.querySelector('.bhx1-wall'), plate = root.querySelector('.bhx1-plate'), cv = root.querySelector('.bhx1-cv');
  const ctx = cv.getContext && cv.getContext('2d');
  const done = [];
  const cleanup = () => done.forEach(f => f());
  if (!ctx) { root.classList.add('no-cv'); return cleanup; }
  const size = { w: 0, h: 0 };
  let W = 0, H = 0, dpr = 1, T = 72, TH = 45, R = 160, tiles = [], base = null, faces = [], shadow = null, raf = 0, last = 0, seen = true, built = false;
  const field = { x: -1e4, y: -1e4, on: 0, target: 0, moved: 0 };
  let sweep = null, target = 0; const queue = [];
  const now = () => performance.now() / 1000;

  // ---------- textures: a field of tabs in one shingle colour, the same tabs in a letter colour masked by the type
  function noise(n = 96) {
    const cn = document.createElement('canvas'); cn.width = cn.height = n; const x = cn.getContext('2d'), rnd = mulberry(7);
    for (let i = 0; i < n * n * 0.16; i++) { x.fillStyle = rnd() < 0.5 ? `rgba(255,255,255,${0.04 + rnd() * 0.1})` : `rgba(0,0,0,${0.06 + rnd() * 0.14})`; x.fillRect(Math.floor(rnd() * n), Math.floor(rnd() * n), 1, 1); }
    return cn;
  }
  const NOISE = noise();
  function tabs(colors) {
    const cn = document.createElement('canvas'); cn.width = W; cn.height = H; const x = cn.getContext('2d');
    const g = Math.max(2, Math.round(T * 0.035));
    for (const t of tiles) {
      const gr = x.createLinearGradient(0, t.y, 0, t.y + t.h);
      gr.addColorStop(0, colors[0]); gr.addColorStop(0.24, colors[0]); gr.addColorStop(0.3, colors[1]); gr.addColorStop(1, colors[2]);
      x.fillStyle = gr; x.fillRect(t.x + g / 2, t.y, t.w - g, t.h - Math.max(1, dpr));
    }
    x.globalCompositeOperation = 'source-atop'; x.fillStyle = x.createPattern(NOISE, 'repeat'); x.fillRect(0, 0, W, H);
    return cn;
  }
  function mask(lines, fs) {
    const cn = document.createElement('canvas'); cn.width = W; cn.height = H; const x = cn.getContext('2d');
    x.font = `900 ${fs}px Epilogue, sans-serif`; x.textAlign = 'center'; x.textBaseline = 'alphabetic';
    if ('letterSpacing' in x) x.letterSpacing = `${-0.02 * fs}px`;
    const lh = fs * 0.86, top = (H - lh * lines.length) / 2;
    lines.forEach((l, i) => { const m = x.measureText(l); const asc = m.actualBoundingBoxAscent || fs * 0.72; x.fillText(l, W / 2, top + i * lh + (lh + asc) / 2 - fs * 0.04); });
    return cn;
  }
  function face(colors, m) { // dark tabs, then the letter-coloured tabs cut to the type
    const out = tabs(SHADES.dark), lt = tabs(colors), x = lt.getContext('2d');
    x.globalCompositeOperation = 'destination-in'; x.drawImage(m, 0, 0);
    out.getContext('2d').drawImage(lt, 0, 0); return out;
  }
  function build() {
    const r = host.getBoundingClientRect(); if (r.width < 10 || r.height < 10) return;
    if (built && Math.abs(r.width - size.w) < 2 && Math.abs(r.height - size.h) < 2) return; // ResizeObserver's first call
    size.w = r.width; size.h = r.height;
    // a real resize (fonts reflowing the band, a rotated phone): the wall restarts in the state its latest wave was
    // heading to; a load sweep still under way is re-laid onto the new tiles with its original start time
    const state = built ? (queue.length ? target : (tiles.filter(t => t.active && t.want === 1).length > tiles.filter(t => t.active).length / 2 ? 1 : 0)) : 0;
    const resweep = built && sweep && now() < sweep.t0 + WALL.sweep;
    queue.length = 0; if (built && !resweep) sweep = null;
    dpr = Math.min(2, window.devicePixelRatio || 1);
    const cw = r.width, ch = r.height;
    W = Math.round(cw * dpr); H = Math.round(ch * dpr); cv.width = W; cv.height = H; cv.style.width = cw + 'px'; cv.style.height = ch + 'px';
    const tw = Math.max(30, Math.min(84, cw / 20)); T = tw * dpr; TH = tw * 0.62 * dpr; R = Math.max(90, cw * 0.11);
    // tiles in staggered courses (odd courses shift half a tab), covering the canvas
    tiles = []; const rnd = mulberry(1995);
    const rows = Math.ceil(H / TH) + 1, cols = Math.ceil(W / T) + 2;
    for (let row = 0; row < rows; row++) for (let col = -1; col < cols; col++) {
      const x = col * T - (row % 2 ? T / 2 : 0), y = row * TH;
      if (x + T < 0 || x > W || y > H) continue;
      tiles.push({ x, y, w: T, h: TH, cx: (x + T / 2) / dpr, cy: (y + TH / 2) / dpr, face: 0, want: 0, flip: null, st: state, pull: 0, ink: 0, active: false,
        seedX: rnd() * 2 - 1, seedY: rnd() * 2 - 1, seedZ: rnd() * 2 - 1, phase: rnd() * 6.283 });
    }
    // one type size for both headlines, fitted to the wall (S0534: copy, type size and cell size are independent)
    const probe = document.createElement('canvas').getContext('2d'); probe.font = `900 100px Epilogue, sans-serif`;
    const widest = Math.max(...[...FRONT, ...REAR].map(l => probe.measureText(l).width)) / 100;
    const fs = Math.min((W * 0.86) / widest, (H * 0.82) / (2 * 0.86));
    const mf = mask(FRONT, fs), mr = mask(REAR, fs);
    faces = [face(SHADES.front, mf), face(SHADES.rear, mr)];
    // which tiles carry ink (either headline): eligibility and peak, from the masks' alpha (downsampled)
    const k = 4, sw = Math.ceil(W / k), sh = Math.ceil(H / k), sc = document.createElement('canvas'); sc.width = sw; sc.height = sh;
    const sx = sc.getContext('2d', { willReadFrequently: true });
    sx.drawImage(mf, 0, 0, sw, sh); sx.globalCompositeOperation = 'lighter'; sx.drawImage(mr, 0, 0, sw, sh);
    const a = sx.getImageData(0, 0, sw, sh).data;
    for (const t of tiles) {
      let n = 0, tot = 0;
      for (let y = Math.max(0, Math.floor(t.y / k)); y < Math.min(sh, Math.ceil((t.y + t.h) / k)); y++)
        for (let x = Math.max(0, Math.floor(t.x / k)); x < Math.min(sw, Math.ceil((t.x + t.w) / k)); x++) { tot++; if (a[(y * sw + x) * 4 + 3] > 40) n++; }
      t.ink = tot ? n / tot : 0; t.active = t.ink > 0.04; t.peak = Math.min(1, t.ink * 2);
      if (t.active) t.face = t.want = t.st;
    }
    // a soft shadow sprite for lifted tabs
    shadow = document.createElement('canvas'); const pad = Math.ceil(T * 0.35); shadow.width = Math.ceil(T + pad * 2); shadow.height = Math.ceil(TH + pad * 2);
    const shx = shadow.getContext('2d'); shx.filter = `blur(${Math.max(2, T * 0.08)}px)`; shx.fillStyle = 'rgba(0,0,0,1)'; shx.fillRect(pad, pad, T, TH);
    shadow.pad = pad;
    // the rest image: every tile in its current face
    base = document.createElement('canvas'); base.width = W; base.height = H; paintBase();
    if (resweep) { tiles.forEach(t => { if (t.active) t.face = t.want = 0; }); paintBase(); schedule(null, 1, sweep.t0); }
    built = true; draw(now());
  }
  function paintBase() {
    const b = base.getContext('2d'); b.fillStyle = SHADES.under; b.fillRect(0, 0, W, H);
    for (const t of tiles) b.drawImage(faces[t.face], t.x, t.y, t.w, t.h, t.x, t.y, t.w, t.h);
  }
  function settle(t) { const b = base.getContext('2d'); b.fillStyle = SHADES.under; b.fillRect(t.x, t.y, t.w, t.h); b.drawImage(faces[t.face], t.x, t.y, t.w, t.h, t.x, t.y, t.w, t.h); }

  // ---------- the reference's field, sweep easing and pose
  const fieldAt = (x, y, fx, fy) => { const d2 = (x - fx) ** 2 + (y - fy) ** 2, raw = Math.exp((-WALL.falloff * d2) / (R * R)); return smooth((raw - 0.06) / 0.94); };
  const easeSweep = u => 1 - Math.pow(1 - clamp01(u), WALL.sweepPow), invSweep = u => 1 - Math.pow(1 - clamp01(u), 1 / WALL.sweepPow);
  function startFlip(t, at) { t.flip = { t0: at, dur: WALL.flip * (1 + 0.18 * (1 - t.peak)), from: t.face, to: 1 - t.face }; }
  function schedule(origin, toFace, at) { // a flip wave: every ink tile flips when the wave front reaches it
    queue.length = 0; target = toFace; const cw = W / dpr, ch = H / dpr;
    const maxD = origin ? Math.max(...[[0, 0], [cw, 0], [0, ch], [cw, ch]].map(([x, y]) => Math.hypot(x - origin.x, y - origin.y))) : cw;
    for (const t of tiles) if (t.active) {
      const rank = origin ? Math.hypot(t.cx - origin.x, t.cy - origin.y) / maxD : t.cx / cw;
      queue.push({ t, at: at + (origin ? 0.85 : 1) * WALL.sweep * invSweep(rank), to: toFace });
    }
    queue.sort((a, b) => a.at - b.at);
  }
  function pose(t, time, fx, fy, on, sweepOn) {
    let p = 0, theta = 0, flight = 0;
    if (t.flip) {
      p = clamp01((time - t.flip.t0) / t.flip.dur);
      const turn = smooth(p / 0.64), ringT = clamp01((p - 0.64) / 0.36);
      const env = smooth(ringT / 0.12) * Math.exp(-3.3 * ringT) * (1 - smooth((ringT - 0.72) / 0.28));
      theta = 180 * turn + WALL.bounce * 36 * Math.sin(ringT * Math.PI * 3.3) * env;
      flight = Math.pow(Math.sin(Math.PI * p), 0.7);
    }
    const pull = t.pull, dx = fx - t.cx, dy = fy - t.cy, gain = WALL.depth / 160;
    const variation = WALL.noise * Math.max(pull, flight * t.peak) * (sweepOn ? 1 : field.jit);
    const jitter = variation * (Math.sin(time * 5.7 + t.phase) * 0.7 + Math.sin(time * 10.3 + t.phase * 1.71) * 0.3);
    const rx = gain * ((dy / R) * WALL.tilt * 1.6 * pull + t.seedX * WALL.tilt * 0.16 * pull) + jitter;
    const ry = gain * ((dx / R) * WALL.tilt * 1.8 * pull + t.seedY * WALL.tilt * 0.12 * pull) + jitter * 0.7;
    const z = (WALL.tilt / 30) * WALL.depth * 0.45 * pull + 17 * flight * t.peak;
    return {
      p, theta, z, rx, ry, rz: t.seedZ * variation * (2.3 * flight + 1.2 * pull) + jitter * 0.35,
      x: Math.max(-t.w * 0.18, Math.min(t.w * 0.18, dx * dpr * 0.08 * pull)) + jitter * 0.2 * dpr,
      y: Math.max(-t.h * 0.11, Math.min(t.h * 0.11, dy * dpr * 0.07 * pull)) + jitter * 0.16 * dpr,
    };
  }

  // ---------- one frame
  function draw(time) {
    if (!built) return false;
    const dt = Math.min(1 / 30, last ? time - last : 1 / 60); last = time;
    // sweep cursor (the reference's imaginary cursor) and the visitor's pointer field
    let fx = field.x, fy = field.y, on = field.on, sweepOn = false;
    if (sweep) {
      const u = (time - sweep.t0) / WALL.sweep;
      if (u > 1.15) sweep = null;
      else if (u > -0.1) { sweepOn = true; const cw = W / dpr; fx = -R + (cw + 2 * R) * easeSweep(u); fy = H / dpr / 2; on = Math.max(on, smooth((u + 0.1) / 0.2) * (1 - smooth((u - 0.95) / 0.2))); }
    }
    field.on += (field.target - field.on) * (1 - Math.exp(-dt / 0.18));
    field.jit = smooth(1 - (time - field.moved - 0.6) / 0.9);
    while (queue.length && queue[0].at <= time) { const q = queue.shift(); q.t.want = q.to; if (!q.t.flip && q.t.face !== q.t.want) startFlip(q.t, q.at); }
    const k = 1 - Math.exp(-dt / 0.09);
    ctx.drawImage(base, 0, 0);
    const act = []; let moving = false;
    for (const t of tiles) {
      const target = on > 0.002 ? fieldAt(t.cx, t.cy, fx, fy) * on * (t.active ? 1 : 0.55) : 0;
      if (Math.abs(target - t.pull) > 0.0015) { t.pull += (target - t.pull) * k; moving = true; } else t.pull = target;
      if (t.flip && time - t.flip.t0 >= t.flip.dur) { t.face = t.flip.to; t.flip = null; settle(t); if (t.want !== t.face) startFlip(t, time); }
      if (t.pull > 0.002 || t.flip) act.push(t);
    }
    if (act.length) {
      const poses = act.map(t => [t, pose(t, time, fx, fy, on, sweepOn)]);
      ctx.fillStyle = SHADES.under; for (const [t] of poses) ctx.fillRect(t.x, t.y, t.w, t.h);
      poses.sort((a, b) => a[1].z - b[1].z);
      const pad = shadow.pad;
      for (const [t, q] of poses) if (q.z > 0.5) { ctx.globalAlpha = Math.min(0.55, 0.19 * q.z / 9); ctx.drawImage(shadow, t.x + q.x + q.z * 0.25 * dpr - pad, t.y + q.y + q.z * 0.45 * dpr - pad); }
      ctx.globalAlpha = 1;
      for (const [t, q] of poses) {
        const th = (q.theta * Math.PI) / 180, cos = Math.cos(th), f = cos >= 0 || !t.flip ? (t.flip ? t.flip.from : t.face) : t.flip.to;
        const lift = 1 + q.z * 0.004, sy = Math.max(0.02, Math.abs(cos)) * Math.cos((q.rx * Math.PI) / 180) * lift, sxs = Math.cos((q.ry * Math.PI) / 180) * lift;
        ctx.save(); ctx.translate(t.x + t.w / 2 + q.x, t.y + t.h / 2 + q.y); ctx.rotate((q.rz * Math.PI) / 180); ctx.scale(sxs, sy);
        ctx.drawImage(faces[f], t.x, t.y, t.w, t.h, -t.w / 2, -t.h / 2, t.w, t.h);
        const shade = 0.12 * Math.abs(Math.sin(th)) + Math.max(0, -q.rx / WALL.tilt) * 0.16;
        if (shade > 0.01) { ctx.fillStyle = `rgba(0,0,0,${shade})`; ctx.fillRect(-t.w / 2, -t.h / 2, t.w, t.h); }
        const glint = Math.max(0, q.rx / WALL.tilt) * 0.14; if (glint > 0.01) { ctx.fillStyle = `rgba(255,255,255,${glint})`; ctx.fillRect(-t.w / 2, -t.h / 2, t.w, t.h * 0.3); }
        ctx.restore();
      }
    }
    return moving || act.length > 0 || queue.length > 0 || !!sweep || Math.abs(field.target - field.on) > 0.002 || field.jit > 0;
  }
  const tick = () => { raf = 0; if (!seen || document.hidden) return; if (draw(now())) raf = requestAnimationFrame(tick); };
  const wake = () => { if (!raf && seen && c.motion) { last = 0; raf = requestAnimationFrame(tick); } };

  // ---------- input: the pointer is the cursor; a press sends a flip wave from the press point
  const local = e => { const r = host.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
  const onMove = e => { if (e.pointerType === 'touch') return; const p = local(e); field.x = p.x; field.y = p.y; field.target = 1; field.moved = now(); wake(); };
  const onLeave = () => { field.target = 0; wake(); };
  const onDown = e => {
    if (e.button > 0 || (e.target.closest && e.target.closest('a,button,input,label'))) return;
    const p = local(e), majority = tiles.filter(t => t.active && t.want === 1).length > tiles.filter(t => t.active).length / 2;
    schedule(p, majority ? 0 : 1, now()); if (e.pointerType === 'touch') { field.x = p.x; field.y = p.y; field.target = 1; field.moved = now(); setTimeout(() => { field.target = 0; wake(); }, 450); }
    wake();
  };

  const start = () => {
    if (!root.isConnected) return;
    build();
    const ro = new ResizeObserver(() => { clearTimeout(ro.t); ro.t = setTimeout(() => { if (root.isConnected) { build(); wake(); } }, 140); }); ro.observe(host); done.push(() => { ro.disconnect(); clearTimeout(ro.t); });
    if (!c.motion) return;
    sweep = { t0: now() + (c.swap ? 0.25 : 0.9) }; schedule(null, 1, sweep.t0); wake();
  };
  (document.fonts ? document.fonts.load('900 100px Epilogue').then(() => document.fonts.ready) : Promise.resolve()).then(start, start);
  if (c.motion) {
    root.addEventListener('pointermove', onMove, { passive: true }); root.addEventListener('pointerleave', onLeave); host.addEventListener('pointerdown', onDown);
    done.push(() => { root.removeEventListener('pointermove', onMove); root.removeEventListener('pointerleave', onLeave); host.removeEventListener('pointerdown', onDown); });
    done.push(inView(root, v => { seen = v; if (v) wake(); }));
    const onVis = () => wake(); document.addEventListener('visibilitychange', onVis); done.push(() => document.removeEventListener('visibilitychange', onVis));
    // the wall leaves at its own rate (S1321 parallax 0.18 of the viewport)
    gsap.fromTo(plate, { y: 0 }, { y: () => innerHeight * 0.18, ease: 'none', scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true, invalidateOnRefresh: true } });
    beats(root, [root.querySelector('.bhx1-sub'), root.querySelector('.bhx1-call')], { now: true, delay: c.swap ? 0 : 0.15 });
  }
  done.push(() => cancelAnimationFrame(raf));
  return cleanup;
}
const FRONT = ['FAMILY', 'ROOFERS'], REAR = ['SINCE', '1995'];

// v2 [BANK] Variable Proximity (React Bits; deep read slice 4 #171, full source mined). Each letter's
// font-variation-settings eases toward a target set by its distance to the pointer: gaussian falloff
// (e^(-2(d/r)²) − e⁻²)/(1 − e⁻²), cut at d ≥ r; damping level += (target − level)(1 − exp(−Δt/(0.2·400))), Δt ≤ 64ms,
// snap within 0.002; letters reset to the rest weight before measuring. After 500ms with nothing near, an idle wave
// mixes in (τ 600ms): phase ((x + 0.6y)/span − t/3.2)·2π, amplitude 0.7·((1 + cos)/2)^2.2, span max(220, 0.85 × width);
// the loop stops when everything settles. Adapted: Epilogue's own wght axis 300 → 900, radius = 1.0 × font-size; the
// headline stands on drawn shingle courses whose keyways lift under heavy letters; the wave (a gust over the roof)
// runs two passes then rests until the pointer moves again (WCAG 2.2.2); the Call label thickens as the pointer
// approaches; a rafter drawing behind turns toward the pointer; the Tudor job photo is cut along a 6/12 roof pitch.
const VP = { from: 300, to: 900, smoothing: 0.2, period: 3.2, peak: 0.7, edge: Math.exp(-2) };
function weighted(root, c) {
  const h = root.querySelector('.bhx2-vis'), lines = [...root.querySelectorAll('.bhx2-l')], photo = root.querySelector('.bhx2-photo');
  const cut = root.querySelector('.bhx2-cut'), cutL = cut.querySelector('.bhx2-cut-l'), cutC = cut.querySelector('.bhx2-cut-c');
  const NS = 'http://www.w3.org/2000/svg', done = [];
  const cleanup = () => done.forEach(f => f());
  // split into letters (an sr-only copy already carries the sentence) and give each line its course drawing
  const L = [];
  lines.forEach((ln, li) => {
    const text = ln.textContent; ln.textContent = '';
    for (const ch of text) { const s = document.createElement('span'); s.className = ch === ' ' ? 'bhx2-sp' : 'bhx2-ch'; s.textContent = ch; ln.append(s); if (ch !== ' ') L.push({ el: s, line: li, x: 0, y: 0, level: 0, target: 0, w: '' }); }
    const svg = document.createElementNS(NS, 'svg'); svg.setAttribute('class', 'bhx2-course'); svg.setAttribute('aria-hidden', 'true');
    svg.innerHTML = '<path class="bhx2-course-l"/>'; ln.append(svg);
  });
  const courses = lines.map(ln => ln.querySelector('.bhx2-course-l'));
  const write = (o, v) => { const w = Math.round(VP.from + (VP.to - VP.from) * v); if (w !== o.w) { o.w = w; o.el.style.fontVariationSettings = `'wght' ${w}`; } };
  let fs = 80, span = 220, geom = [];
  function measure() {
    L.forEach(o => { o.el.style.fontVariationSettings = `'wght' ${VP.from}`; o.w = VP.from; });
    const hr = h.getBoundingClientRect(); fs = parseFloat(getComputedStyle(h).fontSize);
    L.forEach(o => { const r = o.el.getBoundingClientRect(); o.x = r.left - hr.left + r.width / 2; o.y = r.top - hr.top + r.height / 2; o.w0 = r.width; });
    span = Math.max(220, hr.width * 0.85);
    geom = lines.map((ln, li) => { const r = ln.getBoundingClientRect(); return { x0: r.left - hr.left, w: r.width, letters: L.filter(o => o.line === li) }; });
    L.forEach(o => write(o, o.level));
    courses.forEach((p, i) => p.closest('svg').setAttribute('viewBox', `0 0 ${Math.max(1, geom[i].w).toFixed(0)} 14`));
    drawCourses(true);
    // the photo's top edge follows a 6/12 roof pitch: it rises half the panel's width across the panel
    const pr = photo.getBoundingClientRect(), rise = Math.min(pr.height * 0.42, pr.width * 0.5);
    photo.style.setProperty('--rise', rise.toFixed(1) + 'px');
    cut.setAttribute('viewBox', `0 0 ${pr.width.toFixed(0)} ${pr.height.toFixed(0)}`);
    const d = `M0 ${rise.toFixed(1)} L${pr.width.toFixed(1)} 0`;
    cutL.setAttribute('d', d); cutC.setAttribute('d', d);
  }
  let lastCourse = '';
  function drawCourses(force) { // keyway notches every ~0.42em, each lifted 4px × the level of the letter above it
    const key = L.map(o => o.level.toFixed(2)).join(''); if (!force && key === lastCourse) return; lastCourse = key;
    courses.forEach((p, i) => {
      const g = geom[i]; if (!g) return; const step = fs * 0.42, n = Math.max(2, Math.floor(g.w / step));
      let d = 'M0 9'; for (let k = 1; k < n; k++) {
        const x = (k * g.w) / n, gx = g.x0 + x; let lv = 0, best = 1e9;
        for (const o of g.letters) { const dd = Math.abs(o.x - gx); if (dd < best) { best = dd; lv = o.level; } }
        const lift = 4 * lv; d += `H${(x - 2).toFixed(1)}V${(9 - 6 - lift).toFixed(1)}H${(x + 2).toFixed(1)}V9`;
      }
      p.setAttribute('d', d + `H${g.w.toFixed(1)}`);
    });
  }
  const strength = (d, r) => (d >= r ? 0 : (Math.exp(-2 * (d / r) ** 2) - VP.edge) / (1 - VP.edge));
  if (!c.motion) { // a designed still: "since 1995." set heavy
    measure(); L.forEach(o => { o.level = o.line === 2 ? 1 : 0; write(o, o.level); }); drawCourses(true);
    const ro0 = new ResizeObserver(() => { measure(); L.forEach(o => { o.level = o.line === 2 ? 1 : 0; write(o, o.level); }); drawCourses(true); }); ro0.observe(root); done.push(() => ro0.disconnect());
    return cleanup;
  }
  let px = -1e4, py = -1e4, raf = 0, last = 0, idleSince = performance.now(), waveMix = 0, waveStart = 0, waveDone = false, seen = true;
  const call = root.querySelector('.bhx2-call'), callT = root.querySelector('.bhx2-call-t'); let callW = 600;
  function tick(t) {
    raf = 0; if (!seen || document.hidden) return;
    const dt = Math.min(64, last ? t - last : 16); last = t;
    const hr = h.getBoundingClientRect(), r = fs * 1.0;
    let near = false, busy = false;
    for (const o of L) { const d = Math.hypot(px - (hr.left + o.x), py - (hr.top + o.y)); o.target = strength(d, r); if (o.target > 0) near = true; }
    if (near) { idleSince = t; waveStart = 0; waveDone = false; }
    const idle = t - idleSince > 500 && !waveDone;
    if (idle && !waveStart) waveStart = t;
    if (waveStart && t - waveStart > VP.period * 2000) { waveDone = true; waveStart = 0; }
    const wTarget = idle ? 1 : 0; waveMix += (wTarget - waveMix) * (1 - Math.exp(-dt / 600)); if (Math.abs(wTarget - waveMix) < 0.002) waveMix = wTarget;
    const k = 1 - Math.exp(-dt / (VP.smoothing * 400)), ts = t / 1000;
    for (const o of L) {
      let tg = o.target;
      if (waveMix > 0.001) { const ph = ((o.x + o.y * 0.6) / span - ts / VP.period) * Math.PI * 2; tg = Math.max(tg, VP.peak * Math.pow((1 + Math.cos(ph)) / 2, 2.2) * waveMix); }
      const dl = tg - o.level; if (Math.abs(dl) < 0.002) o.level = tg; else { o.level += dl * k; busy = true; }
      write(o, o.level);
    }
    drawCourses(false);
    // R09: the Call label thickens as the pointer approaches the button
    const cr = call.getBoundingClientRect(), cd = Math.hypot(px - (cr.left + cr.width / 2), py - (cr.top + cr.height / 2));
    const cw = Math.round(600 + 300 * strength(Math.max(0, cd - cr.width * 0.35), 170)); if (cw !== callW) { callW = cw; callT.style.fontVariationSettings = `'wght' ${cw}`; busy = true; }
    if (busy || waveMix > 0.001 || (idle && !waveDone)) raf = requestAnimationFrame(tick);
  }
  const wake = () => { if (!raf && seen) { last = 0; raf = requestAnimationFrame(tick); } };
  const onMove = e => { px = e.clientX; py = e.clientY; if (e.pointerType === 'mouse' || e.pointerType === 'pen') waveDone = false; wake(); };
  const onTouch = e => { const t = e.touches && e.touches[0]; if (t) { px = t.clientX; py = t.clientY; wake(); } };
  const onEnd = () => { px = py = -1e4; wake(); };
  addEventListener('pointermove', onMove, { passive: true }); addEventListener('touchmove', onTouch, { passive: true }); addEventListener('touchend', onEnd, { passive: true });
  document.documentElement.addEventListener('mouseleave', onEnd);
  done.push(() => { removeEventListener('pointermove', onMove); removeEventListener('touchmove', onTouch); removeEventListener('touchend', onEnd); document.documentElement.removeEventListener('mouseleave', onEnd); cancelAnimationFrame(raf); });
  done.push(inView(root, v => { seen = v; if (v) wake(); }));
  const go = () => { if (!root.isConnected) return; measure(); idleSince = performance.now() - 520; wake(); };
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(go);
  const ro = new ResizeObserver(() => { if (root.isConnected) { measure(); wake(); } }); ro.observe(root); done.push(() => ro.disconnect());
  // the rafter drawing turns toward the pointer (±1.5°); the photo plate leaves at 0.18 of the viewport
  const raft = root.querySelector('.bhx2-raft'), qr = gsap.quickTo(raft, 'rotation', { duration: 0.8, ease: 'power3.out' });
  const onRaft = e => { if (e.pointerType === 'mouse') qr((e.clientX / innerWidth - 0.5) * 3); };
  root.addEventListener('pointermove', onRaft, { passive: true }); done.push(() => root.removeEventListener('pointermove', onRaft));
  gsap.fromTo(root.querySelector('.bhx2-plate'), { y: 0 }, { y: () => innerHeight * 0.18, ease: 'none', scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true, invalidateOnRefresh: true } });
  beats(root, [root.querySelector('.bhx2-kick'), lines, root.querySelector('.bhx2-sub'), root.querySelector('.bhx2-cta'), photo], { now: true, delay: c.swap ? 0 : 0.1 });
  return cleanup;
}

// v3 [BANK] 289 Rotating Text (React Bits, STRONG: "services-list hero pattern"; deep read slice 5 #289) with the
// [BANK] P73 Harvest [204] word-rotator values. A fixed sentence with one word slot; the slot's characters split; in
// 'wait' mode the old word leaves completely before the new one enters; a highlight block behind the active word
// resizes to fit each new word; pause on hover. P73: out 0.45s sine.in, yPercent −100, blur 12px, stagger 0.04; in
// 0.8s sine.out, yPercent 100 → 0, blur 20 → 0, stagger 0.05; interval 3.2s. Adapted: the slot cycles the 24 real
// service towns (towns.js order, Springboro first); the highlight is a sun-yellow 3-tab shingle tab (keyway slots on its
// bottom edge) whose two nails pop at each change; a counter ticks; each town rests readable for 2s after it lands
// (the interval runs from the end of the entry, so long names like West Carrollton read as long as short ones); a
// visible pause button (WCAG 2.2.2), hover/focus pause and off-screen rest. Reduced motion: a static line.
function rotator(root, c) {
  const word = root.querySelector('.bhx3-word'), slot = root.querySelector('.bhx3-slot'), tab = root.querySelector('.bhx3-tab');
  const tabS = tab.querySelector('.bhx3-tab-s'), nails = [...tab.querySelectorAll('.bhx3-nail')], count = root.querySelector('.bhx3-count b');
  const pause = root.querySelector('.bhx3-pause'), h1 = root.querySelector('.bhx3-h');
  const names = TOWNS.map(t => t.name), done = [];
  const cleanup = () => done.forEach(f => f());
  const box = { w: 0, h: 0 };
  function shape(w, hgt) { // a 3-tab shingle tab: flat top, two keyway slots in the bottom edge
    box.w = w; box.h = hgt; tab.setAttribute('viewBox', `0 0 ${w.toFixed(1)} ${hgt.toFixed(1)}`); tab.style.width = w + 'px'; tab.style.height = hgt + 'px';
    const s = Math.max(5, hgt * 0.13), k = 3.2, a = w / 3, b = (2 * w) / 3, y = hgt;
    tabS.setAttribute('d', `M0 0H${w}V${y}H${b + k}V${y - s}H${b - k}V${y}H${a + k}V${y - s}H${a - k}V${y}H0Z`);
    nails[0].setAttribute('cx', Math.min(14, w * 0.12)); nails[1].setAttribute('cx', w - Math.min(14, w * 0.12));
    nails.forEach(n => n.setAttribute('cy', Math.max(7, hgt * 0.16)));
  }
  const fit = () => { const r = slot.getBoundingClientRect(); return [r.width, r.height]; }; // the padded slot is the tab
  const split = text => { word.textContent = ''; return [...text].map(ch => { const s = document.createElement('span'); s.className = 'bhx3-c'; s.textContent = ch === ' ' ? ' ' : ch; word.append(s); return s; }); };
  if (!c.motion) { word.textContent = '24 towns'; root.querySelector('.bhx3-dot').textContent = ' around Springboro.'; count.parentElement.hidden = true; pause.hidden = true; requestAnimationFrame(() => shape(...fit())); return cleanup; }
  let i = 0, held = false, hover = false, seen = true, timer = null, busy = false, dead = false;
  let chars = split(names[0]);
  const fonts = (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => { if (!dead) shape(...fit()); });
  const tw = { w: 0 };
  function next() {
    timer = null; if (held || hover || !seen || dead) return;
    busy = true; i = (i + 1) % names.length;
    const tl = gsap.timeline({ onComplete: () => { busy = false; arm(); } });
    tl.to(chars, { yPercent: -100, filter: 'blur(12px)', opacity: 0, duration: 0.45, ease: 'sine.in', stagger: { each: 0.04, from: 'end' } });
    tl.add(() => {
      const prev = box.w; chars = split(names[i]); const [w, hgt] = fit(); gsap.set(chars, { yPercent: 100, filter: 'blur(20px)', opacity: 0 });
      tw.w = prev; gsap.to(tw, { w, duration: 0.3, ease: EASE, onUpdate: () => shape(tw.w, hgt) });
      gsap.fromTo(nails, { scale: 0.4, opacity: 0, transformOrigin: '50% 50%' }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(3)', stagger: 0.06, delay: 0.18 });
      count.textContent = i + 1;
    });
    tl.to({}, { duration: 0.12 });
    tl.add(() => gsap.to(chars, { yPercent: 0, filter: 'blur(0px)', opacity: 1, duration: 0.8, ease: 'sine.out', stagger: 0.05 }));
    tl.to({}, { duration: 0.8 + chars.length * 0.05 });
  }
  function arm() { clearTimeout(timer); timer = null; if (!held && !hover && seen && !busy && !dead) timer = setTimeout(next, 2000); }
  const setHeld = v => { held = v; pause.setAttribute('aria-pressed', String(v)); pause.setAttribute('aria-label', v ? 'Play the town names' : 'Pause the town names'); root.classList.toggle('is-held', v); if (!v) arm(); else { clearTimeout(timer); timer = null; } };
  const onPause = () => setHeld(!held);
  const onIn = () => { hover = true; clearTimeout(timer); timer = null; }, onOut = () => { hover = false; arm(); };
  pause.addEventListener('click', onPause); h1.addEventListener('pointerenter', onIn); h1.addEventListener('pointerleave', onOut);
  done.push(() => { dead = true; clearTimeout(timer); pause.removeEventListener('click', onPause); h1.removeEventListener('pointerenter', onIn); h1.removeEventListener('pointerleave', onOut); });
  done.push(inView(root, v => { seen = v; if (v) arm(); else { clearTimeout(timer); timer = null; } }));
  const ro = new ResizeObserver(() => { if (!busy && root.isConnected) shape(...fit()); }); ro.observe(slot); done.push(() => ro.disconnect());
  fonts.then(() => { if (!dead) { arm(); } });
  gsap.fromTo(root.querySelector('.bhx3-plate'), { y: 0 }, { y: () => innerHeight * 0.18, ease: 'none', scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true, invalidateOnRefresh: true } });
  beats(root, [root.querySelector('.bhx3-kick'), root.querySelector('.bhx3-h'), root.querySelector('.bhx3-row'), root.querySelector('.bhx3-sub'), root.querySelector('.bhx3-cta')], { now: true, delay: c.swap ? 0 : 0.1 });
  return cleanup;
}

export default { 1: wall, 2: weighted, 3: rotator };
