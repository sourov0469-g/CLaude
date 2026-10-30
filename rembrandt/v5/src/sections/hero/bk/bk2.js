// Backups B4-B8 of the hero section (R4 directive Phase 5): the pre-redesign versions from 2ee2693, verbatim except the prefix hx -> chx and the helper import paths. Never edit.
// HERO (PLAN-FULL.md §1): three fresh builds from three reference families; each version's headline system is the
// page's one signature interactive (F17). Facts only (BRIEF-FULL.md §3): founded 1995 by Bunk Walker, son Wade
// president since 2015, Rachel answers the phone, Monday to Friday 9 to 5, (937) 746-7377, the 24 service towns.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EASE } from '../../../js/frozen/fx2.js';
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
const SHADES = { under: '#0b1f4d', dark: ['#202a40', '#2b3650', '#323e5a'], front: ['#cfc6b1', '#ece5d3', '#f6f1e4'], rear: ['#e09a00', '#ffb81f', '#ffc94f'] };
function wall(root, c) {
  const host = root.querySelector('.chx1-wall'), plate = root.querySelector('.chx1-plate'), cv = root.querySelector('.chx1-cv');
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
    x.font = `900 ${fs}px Poppins, sans-serif`; x.textAlign = 'center'; x.textBaseline = 'alphabetic';
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
    const probe = document.createElement('canvas').getContext('2d'); probe.font = `900 100px Poppins, sans-serif`;
    const widest = Math.max(...[...FRONT, ...REAR].map(l => probe.measureText(l).width)) / 100;
    const fs = Math.min((W * 0.86) / widest, (H * 0.55) / (2 * 0.86)); // R3 F1-V1: type capped at 55% of the wall height
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
  (document.fonts ? document.fonts.load('900 100px Poppins').then(() => document.fonts.ready) : Promise.resolve()).then(start, start);
  if (c.motion) {
    root.addEventListener('pointermove', onMove, { passive: true }); root.addEventListener('pointerleave', onLeave); host.addEventListener('pointerdown', onDown);
    done.push(() => { root.removeEventListener('pointermove', onMove); root.removeEventListener('pointerleave', onLeave); host.removeEventListener('pointerdown', onDown); });
    done.push(inView(root, v => { seen = v; if (v) wake(); }));
    const onVis = () => wake(); document.addEventListener('visibilitychange', onVis); done.push(() => document.removeEventListener('visibilitychange', onVis));
    // the wall leaves at its own rate (S1321 parallax 0.18 of the viewport)
    gsap.fromTo(plate, { y: 0 }, { y: () => innerHeight * 0.18, ease: 'none', scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true, invalidateOnRefresh: true } });
    // R3 F1-V1: the band enters once (first load only): rise 12px, 240ms, 60ms apart
    if (!c.swap) gsap.fromTo([root.querySelector('.chx1-h'), root.querySelector('.chx1-sub'), root.querySelector('.chx1-call')], { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.24, ease: EASE, stagger: 0.06, delay: 0.15, clearProps: 'transform' });
  }
  done.push(() => cancelAnimationFrame(raf));
  return cleanup;
}
const FRONT = ['FAMILY', 'ROOFERS'], REAR = ['SINCE', '1995'];

// v2 [BANK] Variable Proximity (React Bits; deep read slice 4 #171), R3 F1: quantised per WORD, so a word's weight never
// splits. Light words (300) ease toward 300 + 400·g, g = (e^(-2(d/r)²) − e⁻²)/(1 − e⁻²) cut at d ≥ r, d = the pointer's
// distance to the word's box, r = 1.0 × font-size; damping level += (target − level)(1 − e^(−Δt/80)), Δt ≤ 64ms. The bold
// phrase "family roofers" rests at 700 and is the ceiling, so it is never outweighed. No idle wave (S1314 §8).
// Load (pack F1.7, once, never on a switcher re-entry): lines rise 14px + fade 320ms, 90ms apart; sub and CTA at +180ms;
// the photo wipes in on a clip-path 480ms --ease-x; the proof link's underline draws 250ms. The photo's top edge follows
// a 6/12 roof pitch; the plate leaves at 0.18 of the viewport.
const VP = { from: 300, to: 700, edge: Math.exp(-2) };
function weighted(root, c) {
  const h = root.querySelector('.chx2-h'), photo = root.querySelector('.chx2-photo'), plate = root.querySelector('.chx2-plate');
  const cut = root.querySelector('.chx2-cut'), cutL = cut.querySelector('.chx2-cut-l'), cutC = cut.querySelector('.chx2-cut-c');
  const W = [...root.querySelectorAll('.chx2-w:not(.chx2-b)')].map(el => ({ el, level: 0, target: 0, w: 300, comp: 0 }));
  // R3 QA (S1314 §8: hover must not shift nearby layout): a heavier word is wider, so its tracking tightens by the width it
  // gains (measured per word at 300 and 700), and its neighbours never move
  const calib = () => W.forEach(o => {
    const st = o.el.style; st.fontWeight = '700'; st.letterSpacing = ''; const w1 = o.el.getBoundingClientRect().width;
    st.fontWeight = '300'; const w0 = o.el.getBoundingClientRect().width;
    o.comp = (w1 - w0) / Math.max(1, o.el.textContent.length);
    st.fontWeight = String(o.w); st.letterSpacing = `calc(-.02em - ${(o.comp * o.level).toFixed(2)}px)`;
  });
  const done = [], cleanup = () => done.forEach(f => f());
  function pitch() {
    const pr = photo.getBoundingClientRect(), rise = Math.min(pr.height * 0.42, pr.width * 0.5);
    photo.style.setProperty('--rise', rise.toFixed(1) + 'px');
    cut.setAttribute('viewBox', `0 0 ${pr.width.toFixed(0)} ${pr.height.toFixed(0)}`);
    const d = `M0 ${rise.toFixed(1)} L${pr.width.toFixed(1)} 0`; cutL.setAttribute('d', d); cutC.setAttribute('d', d);
  }
  pitch();
  const ro = new ResizeObserver(() => { if (root.isConnected) pitch(); }); ro.observe(photo); done.push(() => ro.disconnect());
  if (!c.motion) return cleanup;
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => { if (root.isConnected) calib(); });
  let lastW = 0; const ro2 = new ResizeObserver(([e]) => { const w = Math.round(e.contentRect.width); if (w !== lastW && root.isConnected) { lastW = w; calib(); } }); ro2.observe(root); done.push(() => ro2.disconnect());
  // ---------- load choreography (first mount only)
  if (!c.swap) {
    root.classList.add('is-pre');
    const tl = gsap.timeline({ delay: 0.1, onComplete: () => root.classList.remove('is-pre') });
    tl.fromTo(root.querySelectorAll('.chx2-l'), { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.32, ease: EASE, stagger: 0.09, clearProps: 'transform' }, 0)
      .fromTo(root.querySelector('.chx2-rule'), { scaleX: 0, transformOrigin: '0 50%' }, { scaleX: 1, duration: 0.32, ease: EASE, clearProps: 'transform' }, 0.18)
      .fromTo([root.querySelector('.chx2-sub'), root.querySelector('.chx2-cta')], { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.32, ease: EASE, stagger: 0.06, clearProps: 'transform' }, 0.18)
      .fromTo(plate, { clipPath: 'inset(0% 0% 0% 100%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.48, ease: EASE, clearProps: 'clipPath' }, 0)
      .fromTo([cutL, cutC], { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.48, ease: EASE }, 0)
      .add(() => root.classList.remove('is-pre'), 0.5);
    done.push(() => tl.kill());
  }
  // ---------- per-word proximity
  let px = -1e4, py = -1e4, raf = 0, last = 0, seen = true;
  const strength = (d, r) => (d >= r ? 0 : (Math.exp(-2 * (d / r) ** 2) - VP.edge) / (1 - VP.edge));
  function tick(t) {
    raf = 0; if (!seen || document.hidden) return;
    const dt = Math.min(64, last ? t - last : 16); last = t;
    const r = parseFloat(getComputedStyle(h).fontSize), k = 1 - Math.exp(-dt / 80);
    let busy = false;
    for (const o of W) {
      const b = o.el.getBoundingClientRect(), dx = Math.max(b.left - px, 0, px - b.right), dy = Math.max(b.top - py, 0, py - b.bottom);
      o.target = strength(Math.hypot(dx, dy), r);
      const dl = o.target - o.level; if (Math.abs(dl) < 0.002) o.level = o.target; else { o.level += dl * k; busy = true; }
      const w = Math.round((VP.from + (VP.to - VP.from) * o.level) / 100) * 100; if (w !== o.w) { o.w = w; o.el.style.fontWeight = String(w); /* R4: Poppins ships fixed weights, so the proximity weight steps 300-700 in 100s */ o.el.style.letterSpacing = `calc(-.02em - ${(o.comp * o.level).toFixed(2)}px)`; }
    }
    if (busy) raf = requestAnimationFrame(tick);
  }
  const wake = () => { if (!raf && seen) { last = 0; raf = requestAnimationFrame(tick); } };
  const onMove = e => { if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return; px = e.clientX; py = e.clientY; wake(); };
  const onEnd = () => { px = py = -1e4; wake(); };
  addEventListener('pointermove', onMove, { passive: true }); document.documentElement.addEventListener('mouseleave', onEnd);
  done.push(() => { removeEventListener('pointermove', onMove); document.documentElement.removeEventListener('mouseleave', onEnd); cancelAnimationFrame(raf); });
  done.push(inView(root, v => { seen = v; if (v) wake(); }));
  gsap.fromTo(plate, { y: 0 }, { y: () => innerHeight * 0.18, ease: 'none', scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true, invalidateOnRefresh: true } });
  return cleanup;
}

// v3 [BANK] 289 Rotating Text: a fixed sentence with one word slot and a highlight that resizes to each word. R3 F1-V3:
// the per-letter blur roll (P73: 0.45s out + 0.8s in) is replaced by a 220ms crossfade of two stacked words inside a
// one-line mask (the slot clips), the tab resizing in the same 220ms; each town rests 2.6s; the counter is gone. The
// highlight is a sun 3-tab shingle tab (keyway slots on its bottom edge). Pause button (WCAG 2.2.2), hover/focus on the
// headline pauses, off screen rests. Reduced motion: a static line, "Roofers for 24 towns around Springboro."
function rotator(root, c) {
  const slot = root.querySelector('.chx3-slot'), tab = root.querySelector('.chx3-tab'), tabS = tab.querySelector('.chx3-tab-s');
  const nails = [...tab.querySelectorAll('.chx3-nail')], pause = root.querySelector('.chx3-pause'), h1 = root.querySelector('.chx3-h');
  let [cur, nxt] = root.querySelectorAll('.chx3-word');
  const names = TOWNS.map(t => t.name), done = [], cleanup = () => done.forEach(f => f());
  function shape(w, hgt) { // a 3-tab shingle tab: flat top, two keyway slots in the bottom edge
    tab.setAttribute('viewBox', `0 0 ${w.toFixed(1)} ${hgt.toFixed(1)}`); tab.style.width = w + 'px'; tab.style.height = hgt + 'px';
    const s = Math.max(5, hgt * 0.13), k = 3.2, a = w / 3, b = (2 * w) / 3, y = hgt;
    tabS.setAttribute('d', `M0 0H${w}V${y}H${b + k}V${y - s}H${b - k}V${y}H${a + k}V${y - s}H${a - k}V${y}H0Z`);
    nails[0].setAttribute('cx', Math.min(14, w * 0.12)); nails[1].setAttribute('cx', w - Math.min(14, w * 0.12));
    nails.forEach(n => n.setAttribute('cy', Math.max(7, hgt * 0.16)));
  }
  const pad = () => parseFloat(getComputedStyle(slot).paddingLeft) * 2;
  const fit = el => [el.getBoundingClientRect().width + pad(), slot.getBoundingClientRect().height];
  const size = () => { slot.style.width = ''; const [w, hgt] = fit(cur); slot.style.width = w + 'px'; shape(w, hgt * 0.94); };
  if (!c.motion) { cur.textContent = '24 towns'; root.querySelector('.chx3-dot').textContent = ' around Springboro.'; pause.hidden = true; requestAnimationFrame(size); return cleanup; }
  let i = 0, held = false, hover = false, seen = true, timer = null, dead = false;
  const fonts = (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => { if (!dead) size(); });
  const box = { w: 0 };
  function next() {
    timer = null; if (held || hover || !seen || dead) return;
    i = (i + 1) % names.length; nxt.textContent = names[i];
    const [w, hgt] = fit(nxt); box.w = parseFloat(slot.style.width) || w;
    gsap.timeline({ onComplete: () => { [cur, nxt] = [nxt, cur]; arm(); } })
      // R3 QA (S0063 STANDARDS: a crossfade that shows two states gets blur(2px) to read as one change)
      .fromTo(cur, { filter: 'blur(0px)' }, { opacity: 0, filter: 'blur(2px)', duration: 0.22, ease: 'power2.out', clearProps: 'filter' }, 0)
      .fromTo(nxt, { opacity: 0, filter: 'blur(2px)' }, { opacity: 1, filter: 'blur(0px)', duration: 0.22, ease: 'power2.out', clearProps: 'filter' }, 0)
      .to(box, { w, duration: 0.22, ease: EASE, onUpdate: () => { slot.style.width = box.w + 'px'; shape(box.w, hgt * 0.94); } }, 0);
  }
  function arm() { clearTimeout(timer); timer = null; if (!held && !hover && seen && !dead) timer = setTimeout(next, 2600); }
  const setHeld = v => { held = v; pause.setAttribute('aria-pressed', String(v)); pause.setAttribute('aria-label', v ? 'Play the town names' : 'Pause the town names'); root.classList.toggle('is-held', v); if (!v) arm(); else { clearTimeout(timer); timer = null; } };
  const onPause = () => setHeld(!held);
  const onIn = () => { hover = true; clearTimeout(timer); timer = null; }, onOut = () => { hover = false; arm(); };
  pause.addEventListener('click', onPause); h1.addEventListener('pointerenter', onIn); h1.addEventListener('pointerleave', onOut);
  done.push(() => { dead = true; clearTimeout(timer); pause.removeEventListener('click', onPause); h1.removeEventListener('pointerenter', onIn); h1.removeEventListener('pointerleave', onOut); });
  done.push(inView(root, v => { seen = v; if (v) arm(); else { clearTimeout(timer); timer = null; } }));
  const ro = new ResizeObserver(() => { if (root.isConnected) size(); }); ro.observe(root); done.push(() => ro.disconnect());
  fonts.then(() => { if (!dead) arm(); });
  gsap.fromTo(root.querySelector('.chx3-plate'), { y: 0 }, { y: () => innerHeight * 0.12, ease: 'none', scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true, invalidateOnRefresh: true } });
  if (!c.swap) gsap.fromTo([h1, root.querySelector('.chx3-sub'), root.querySelector('.chx3-cta')], { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.32, ease: EASE, stagger: 0.09, delay: 0.1, clearProps: 'transform' });
  return cleanup;
}

// v4 (R3, new) ⟦S0218⟧ stitch-design-taste, Inline Image Typography: photos between the headline's words at type height,
// rounded, "visual punctuation"; on phones they stack below the headline. Load (first mount only): the lines rise 14px +
// fade 320ms, 90ms apart; then each inline photo opens from its centre (clip-path inset 50% -> 0, 360ms --ease-x).
// Hover (CSS, fine pointers): a photo lifts to 2.4x in place over 240ms, so no word moves (S1314 §8).
function stitched(root, c) {
  if (!c.motion || c.swap) return;
  const tl = gsap.timeline({ delay: 0.1 });
  tl.fromTo(root.querySelectorAll('.chx4-l'), { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.32, ease: EASE, stagger: 0.09, clearProps: 'transform' }, 0)
    .fromTo(root.querySelectorAll('.chx4-pic, .chx4-sp'), { clipPath: 'inset(0% 50% 0% 50%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.36, ease: EASE, stagger: 0.09, clearProps: 'clipPath' }, 0.24)
    .fromTo([root.querySelector('.chx4-sub'), root.querySelector('.chx4-cta')], { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.32, ease: EASE, stagger: 0.06, clearProps: 'transform' }, 0.18);
  return () => tl.kill();
}

// v5 (R3, new): poster lines at hero scale, in How V3's grammar (index rows with a numeral column; [BANK] Q409/Q411 as
// built there) and ⟦S0095⟧'s rule that the idea comes from the subject's own inventory (the years, the names, the phone).
// Each row's top rule is a ridge zigzag (period 18px, amplitude 4px) sized to its row; on first load they draw once,
// left to right, 60ms apart (DrawSVG 0.5s), with the rows rising 8px + fading 300ms, 50ms apart (pack F5.7's values).
function poster(root, c) {
  const ridges = [...root.querySelectorAll('.chx5-ridge')], done = [], cleanup = () => done.forEach(f => f());
  const draw = () => ridges.forEach(svg => {
    const w = Math.max(10, Math.round(svg.getBoundingClientRect().width)); svg.setAttribute('viewBox', `0 0 ${w} 10`);
    let d = 'M0 5'; for (let x = 9; x <= w; x += 9) d += `L${x} ${(x / 9) % 2 ? 1 : 9}`;
    svg.firstElementChild.setAttribute('d', d);
  });
  draw(); const ro = new ResizeObserver(() => { if (root.isConnected) draw(); }); ro.observe(root); done.push(() => ro.disconnect());
  if (c.motion && !c.swap) {
    const tl = gsap.timeline({ delay: 0.1 });
    tl.fromTo(root.querySelector('.chx5-h'), { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.32, ease: EASE, clearProps: 'transform' }, 0)
      .fromTo(ridges.map(r => r.firstElementChild), { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.5, ease: EASE, stagger: 0.06 }, 0.16)
      .fromTo(root.querySelectorAll('.chx5-n, .chx5-line'), { y: 8, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.3, ease: EASE, stagger: 0.05, clearProps: 'transform' }, 0.2);
    done.push(() => tl.kill());
  }
  return cleanup;
}

export default { 4: wall, 5: weighted, 6: rotator, 7: stitched, 8: poster };
