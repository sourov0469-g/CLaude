// PROOF. Only the owner's figures: 4.9 stars, 295 Google reviews, BBB A+ since 2001, Owens Corning Platinum Preferred,
// $2M liability cover, family-run since 1995 (S1303 gate 47: nothing invented).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { lines, rise, onEnter, beats, EASE } from '../../js/fx.js';
import { loop } from '../../js/gl.js';
import { spring, step } from '../../js/spring.js';

const seeded = s => () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;

// v1 Constellation: one star per Google review (295), scattered, gathering into "4.9" as the section scrolls in
// (S1326 normalized progress). Model (S0340): each star is a mass of 1 on a 2.2 Hz spring, zeta 0.7, around its place;
// the pointer is a repelling field of radius 130px. Depth tiers from S1377 (far, mid, near), every value varied per star.
function constellation(root, c) {
  const cv = root.querySelector('.pv1-cv'), g = cv.getContext('2d'), N = 295, R = 130;
  const SPR = spring(2.2, 0.7), rnd = seeded(1995);
  const COLORS = ['#ffffff', '#ffffff', '#ffffff', '#ffc9ae', '#ffa27a', '#ff5a1f'];
  const sprites = COLORS.map(col => { // pre-rendered once (S1377 cost rule): a soft five-point star
    const s = document.createElement('canvas'); s.width = s.height = 64; const x = s.getContext('2d');
    x.translate(32, 32); x.fillStyle = col; x.shadowColor = col; x.shadowBlur = 10; x.beginPath();
    for (let i = 0; i < 10; i++) { const r = i % 2 ? 9 : 22, a = -Math.PI / 2 + i * Math.PI / 5; x.lineTo(Math.cos(a) * r, Math.sin(a) * r); }
    x.closePath(); x.fill(); return s;
  });
  const stars = Array.from({ length: N }, () => {
    const t = rnd(), tier = t < 0.3 ? 0 : t < 0.85 ? 1 : 2;
    const [s0, s1, o0, o1] = [[0.3, 0.5, 0.22, 0.4], [0.5, 0.85, 0.46, 0.78], [1.05, 1.9, 0.5, 0.82]][tier];
    return { tier, size: s0 + rnd() * (s1 - s0), op: o0 + rnd() * (o1 - o0), col: Math.floor(rnd() * COLORS.length), d: rnd() * 0.35,
      su: rnd(), sv: rnd(), tx: 0, ty: 0, ox: { p: 0, v: 0 }, oy: { p: 0, v: 0 }, ph: rnd() * 6.28, tw: rnd() < 0.3 ? 0.6 + rnd() * 1.4 : 0 };
  });
  let stopIo = null;
  let W = 0, H = 0, dpr = 1, prog = c.motion ? 0 : 1, rect = null, ptr = { x: -1e4, y: -1e4, nx: 0, ny: 0 }, ready = false, lp = null, time = 0;
  const glyph = (box) => { // sample the "4.9" glyph into N points on a staggered grid (densest spacing that still yields N)
    const ow = Math.max(40, Math.round(box.w / 2)), oh = Math.max(40, Math.round(box.h / 2));
    const oc = document.createElement('canvas'); oc.width = ow; oc.height = oh; const x = oc.getContext('2d');
    let fs = oh * 1.25; x.font = `800 ${fs}px Poppins, sans-serif`; const w = x.measureText('4.9').width; if (w > ow * 0.98) fs *= ow * 0.98 / w;
    x.font = `800 ${fs}px Poppins, sans-serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#000'; x.fillText('4.9', ow / 2, oh / 2 + fs * 0.04);
    const data = x.getImageData(0, 0, ow, oh).data, A = (i, j) => (i < 0 || j < 0 || i >= ow || j >= oh ? 0 : data[(j * ow + i) * 4 + 3]);
    // stars trace the glyph's outline (295 marks read far better as a contour than as a sparse fill)
    const edge = [];
    for (let j = 0; j < oh; j++) for (let i = 0; i < ow; i++) if (A(i, j) > 140 && (A(i - 1, j) <= 140 || A(i + 1, j) <= 140 || A(i, j - 1) <= 140 || A(i, j + 1) <= 140)) edge.push([i, j]);
    for (let i = edge.length - 1; i > 0; i--) { const k = Math.floor(rnd() * (i + 1)); [edge[i], edge[k]] = [edge[k], edge[i]]; }
    const thin = d => { // Poisson-style thinning on a hash grid: keep points at least d apart
      const cell = d, grid = new Map(), keep = [];
      for (const q of edge) {
        const gx = Math.floor(q[0] / cell), gy = Math.floor(q[1] / cell); let ok = true;
        for (let a = -1; a <= 1 && ok; a++) for (let b = -1; b <= 1 && ok; b++) for (const o of grid.get((gx + a) + ',' + (gy + b)) || []) if ((o[0] - q[0]) ** 2 + (o[1] - q[1]) ** 2 < d * d) { ok = false; break; }
        if (ok) { keep.push(q); const key = gx + ',' + gy; (grid.get(key) || grid.set(key, []).get(key)).push(q); }
      }
      return keep;
    };
    let lo = 1, hi = 40, pts = thin(lo);
    for (let it = 0; it < 18; it++) { const mid = (lo + hi) / 2, k = thin(mid); if (k.length >= N) { lo = mid; pts = k; } else hi = mid; }
    const out = pts.slice(0, N).map(p => [box.x + p[0] * 2, box.y + p[1] * 2]);
    while (out.length < N) out.push(out[out.length % Math.max(1, pts.length)] || [box.x + ow, box.y + oh]);
    for (let i = out.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [out[i], out[j]] = [out[j], out[i]]; } // mixed tiers across the glyph
    return out;
  };
  const layout = () => {
    const r = cv.getBoundingClientRect(); W = r.width; H = r.height; if (!W || !H) return;
    dpr = Math.min(devicePixelRatio || 1, 2); cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); g.setTransform(dpr, 0, 0, dpr, 0, 0);
    // R3 F2-V1: lower-left of the old box, toward the copy; phones: directly above the copy, no gap
    let box = { x: W * 0.4, y: H * 0.2, w: W * 0.54, h: H * 0.5 };
    if (W < 900) { const cr = root.querySelector('.pv1-copy h2').getBoundingClientRect(), top = cr.top - r.top, h = Math.min(H * 0.34, W * 0.5); box = { x: W * 0.05, y: Math.max(16, top - h - 12), w: W * 0.9, h }; }
    glyph(box).forEach((p, i) => { stars[i].tx = p[0]; stars[i].ty = p[1]; });
    rect = null; ready = true; draw();
  };
  const draw = () => {
    if (!ready) return; g.clearRect(0, 0, W, H);
    for (const s of stars) {
      const t = Math.min(1, Math.max(0, (prog - s.d) / 0.65)), e = 1 - Math.pow(1 - t, 3);
      const sx = s.su * W * 1.3 - W * 0.15, sy = s.sv * H * 1.3 - H * 0.15, depth = [0.4, 1, 1.8][s.tier];
      const x = sx + (s.tx - sx) * e + s.ox.p + ptr.nx * 10 * depth, y = sy + (s.ty - sy) * e + s.oy.p + ptr.ny * 10 * depth;
      const tw = s.tw && c.motion ? 0.78 + 0.22 * Math.sin(time * s.tw + s.ph) : 1;
      const z = 16 * (s.size + (0.78 - s.size) * e * 0.7); // tiers read as depth while scattered, one weight once formed
      g.globalAlpha = Math.min(1, (s.op + (1 - s.op) * e * 0.85)) * tw;
      g.drawImage(sprites[s.col], x - z / 2, y - z / 2, z, z);
    }
    g.globalAlpha = 1;
  };
  const ro = new ResizeObserver(layout); ro.observe(cv);
  (document.fonts ? document.fonts.load('800 100px Poppins') : Promise.resolve()).then(layout, layout);
  if (c.motion) {
    // R3 F2-V1: the formation completes once the section is at least half in view, and holds (never scrubs back)
    const form = { p: 0 }; let formed = false;
    const io = new IntersectionObserver(([e]) => { if (formed || e.intersectionRatio < 0.5) return; formed = true; io.disconnect();
      gsap.to(form, { p: 1, duration: 1.6, ease: 'power3.out', onUpdate: () => { prog = form.p; if (lp) lp.wake(); } }); }, { threshold: [0, 0.5, 0.75] });
    io.observe(root); stopIo = () => io.disconnect();
    lines(root.querySelector('h2'), { scrollTrigger: onEnter(root, { start: 'top 55%' }) });
    rise(root.querySelectorAll('.pv-cred li'), { scrollTrigger: onEnter(root, { start: 'top 45%' }), stagger: 0.05, delay: 0.3 });
    lp = loop(cv, dt => {
      time += dt;
      for (const s of stars) {
        const px = s.tx + s.ox.p, py = s.ty + s.oy.p, dx = px - ptr.x, dy = py - ptr.y, d = Math.hypot(dx, dy);
        let fx = 0, fy = 0; if (d < R && d > 0.01) { const f = (1 - d / R) ** 2 * 5200; fx = dx / d * f; fy = dy / d * f; }
        s.ox.v += fx * dt; s.oy.v += fy * dt; step(SPR, s.ox, 0, dt); step(SPR, s.oy, 0, dt);
      }
      draw();
    });
  }
  const move = e => { if (e.pointerType !== 'mouse') return; rect = rect || cv.getBoundingClientRect(); ptr.x = e.clientX - rect.left; ptr.y = e.clientY - rect.top; ptr.nx = ptr.x / W * 2 - 1; ptr.ny = ptr.y / H * 2 - 1; if (lp) lp.wake(); };
  const leave = () => { ptr.x = ptr.y = -1e4; ptr.nx = ptr.ny = 0; if (lp) lp.wake(); };
  const scrolled = () => { rect = null; };
  if (c.fine && c.motion) { root.addEventListener('pointermove', move); root.addEventListener('pointerleave', leave); addEventListener('scroll', scrolled, { passive: true }); }
  return () => { ro.disconnect(); if (lp) lp.stop(); if (stopIo) stopIo(); root.removeEventListener('pointermove', move); root.removeEventListener('pointerleave', leave); removeEventListener('scroll', scrolled); };
}

// v2 the ledger: [BANK] Cenco Roofing DEEP 5 (every credential carries a link to its issuer; live: "Every figure is
// read from the platform named beside it"), anatomy F12 checkable proof (KBF "The Ledger": print the caveat), [BANK] #317
// Digital Butlers "Proof, not promises". Rows arrive once at the F17 dose (CSS, proof.css). V7: each rule is a roofer's
// chalk line, drawn taut (DrawSVG 0.3s) then snapped (a 90ms, 2px vibration of the line's sag) as its row arrives; the
// R3 F2: the reel and the shingle-course background are removed (Removal Test, S1314); ink ground; stars clip 115/120.
const NS = 'http://www.w3.org/2000/svg';
function ledger(root, c) {
  const done = [], cleanup = () => done.forEach(f => f());
  if (!c.motion) return cleanup;
  beats(root, [root.querySelector('.pv2-h'), [root.querySelector('.pv2-big'), root.querySelector('.pv2-count')], root.querySelector('.pv2-note')]); // G1
  root.classList.add('is-armed');
  const lines = [...root.querySelectorAll('.pv2-cl')], dust = [...root.querySelectorAll('.pv2-dust')];
  gsap.set(lines, { drawSVG: '0%' }); gsap.set(dust, { opacity: 0 });
  ScrollTrigger.create({ trigger: root.querySelector('.pv2-ledger'), start: 'top 80%', once: true, onEnter: () => {
    root.classList.add('is-in');
    const tl = gsap.timeline(); done.push(() => tl.kill());
    lines.forEach((l, i) => {
      const at = i * 0.04;
      tl.to(l, { drawSVG: '100%', duration: 0.3, ease: 'power3.out' }, at)
        .to(l, { keyframes: [{ attr: { d: 'M0 6 Q500 8.5 1000 6' }, duration: 0.03 }, { attr: { d: 'M0 6 Q500 4 1000 6' }, duration: 0.03 }, { attr: { d: 'M0 6 Q500 6.8 1000 6' }, duration: 0.03 }, { attr: { d: 'M0 6 Q500 6 1000 6' }, duration: 0.03 }] }, at + 0.3)
        .to(dust[i], { opacity: 0.28, duration: 0.2 }, at + 0.32);
    });
  } });
  return cleanup;
}

// v3 [BANK] Count Up (React Bits; deep read slice 4 #279, code read: animation/code-source/count-up-reactbits/CountUp.jsx)
// in roll mode, inside [BANK] Q409 Grow My Business's proof stack (CROWN: counters as the proof stack). Roll mode, as
// in the source: every place is a column; its travel is the mod-10 shortest distance plus whole extra turns, capped at
// 3 − rank (rank 0 = the rightmost column); a 4-cell strip (offsets −1..+2, cells 1.2em) shows mod10(base + offset − 1)
// and is translated by −(1 + pos − base)·1.2em; columns stagger min(0.07, total·0.4/(n − 1)); a vertical motion blur
// σ = min(0.05·cell, speed·cell/600) only while σ > 0.2; ease cubic-bezier(0.33, 1, 0.68, 1); fires once when the
// number enters the view; an sr-only copy carries the final value; reduced motion lands at once. Adapted: each digit
// rolls on a strip of shingle tabs (courses moving up a roof) under a ridge-cap rail; duration 2s → 1.4s (the bank's
// recorded 1.2–1.6s trade counters, toward F17); aggregate-led: 4.9 and 295 lead, 2001 / 1995 / $2M follow; a sun
// sheen on the slate follows the pointer (the background answers back).
const bezier = (x1, y1, x2, y2) => { // cubic-bezier easing (Newton–Raphson on x, then y)
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx, cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
  const sx = t => ((ax * t + bx) * t + cx) * t, sy = t => ((ay * t + by) * t + cy) * t, dx = t => (3 * ax * t + 2 * bx) * t + cx;
  return u => { if (u <= 0) return 0; if (u >= 1) return 1; let t = u; for (let k = 0; k < 6; k++) { const e = sx(t) - u, d = dx(t); if (Math.abs(e) < 1e-5 || !d) break; t -= e / d; } return sy(t); };
};
const ROLL = { cell: 1.2, stagger: 0.05, total: 0.6, ease: bezier(0.33, 1, 0.68, 1) }; // R3 F2-V3: <= .6s
const mod10 = n => ((n % 10) + 10) % 10;
function rollModel(el) { // digits become columns; anything else ($, ., M) is a fixed mark
  const text = el.dataset.to, digits = [...text].filter(ch => /\d/.test(ch)), to = +digits.join(''), cols = [];
  el.querySelectorAll('.pv3-col,.pv3-mark,.pv3-defs').forEach(n => n.remove());
  const frag = document.createDocumentFragment(); let di = 0;
  for (const ch of text) {
    if (/\d/.test(ch)) {
      const place = digits.length - 1 - di, d = +ch; di++;
      const box = document.createElement('span'); box.className = 'pv3-col'; box.setAttribute('aria-hidden', 'true');
      const strip = document.createElement('span'); strip.className = 'pv3-strip';
      for (let o = 0; o < 4; o++) { const c = document.createElement('span'); c.className = 'pv3-cell'; c.textContent = mod10(o - 1); strip.append(c); }
      box.append(strip); frag.append(box); cols.push({ place, to: d, box, strip, cells: [...strip.children], base: 0, sigma: 0 });
    } else { const m = document.createElement('span'); m.className = 'pv3-mark'; m.setAttribute('aria-hidden', 'true'); m.textContent = ch; frag.append(m); }
  }
  el.prepend(frag);
  // vertical-only motion blur, as in the source: one SVG feGaussianBlur per column, stdDeviation "0 σ"
  const uid = 'pv3f' + Math.random().toString(36).slice(2, 7), defs = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  defs.setAttribute('class', 'pv3-defs'); defs.setAttribute('aria-hidden', 'true'); defs.setAttribute('width', '0'); defs.setAttribute('height', '0');
  defs.innerHTML = '<defs>' + cols.map((_, i) => `<filter id="${uid}-${i}" x="-10%" y="-40%" width="120%" height="180%"><feGaussianBlur stdDeviation="0 0"/></filter>`).join('') + '</defs>';
  el.append(defs); cols.forEach((col, i) => { col.blur = defs.querySelector(`#${uid}-${i} feGaussianBlur`); col.fid = `${uid}-${i}`; });
  cols.forEach((c, index) => { // rank 0 is the rightmost column (CountUp: rank = columns.length − 1 − index)
    const rank = cols.length - 1 - index, base = mod10(c.to - 0);
    const turns = Math.min(Math.floor(to / 10 ** (c.place + 1)), Math.max(0, 3 - rank));
    c.delta = base + 10 * turns; c.index = index;
  });
  return { cols, to };
}
function rollers(root, c) {
  const done = [], cleanup = () => done.forEach(f => f());
  const els = [...root.querySelectorAll('.pv3-roll')], models = els.map(rollModel);
  const set = (col, pos) => {
    const base = Math.floor(pos);
    if (base !== col.base) { col.base = base; col.cells.forEach((n, o) => { n.textContent = mod10(base + o - 1); }); }
    col.strip.style.transform = `translateY(${(-(1 + pos - base) * ROLL.cell).toFixed(4)}em)`;
  };
  const land = m => m.cols.forEach(col => { set(col, col.delta); col.strip.style.filter = ''; });
  if (!c.motion) { models.forEach(land); return cleanup; }
  beats(root, [root.querySelector('.pv3-head'), root.querySelectorAll('.pv3-lab'), root.querySelector('.pv3-foot')]);
  // each number rolls once, when it enters the view
  models.forEach((m, k) => {
    if (els[k].hasAttribute('data-still')) { land(m); return; } // R3: 2001 and $2M are set, not rolled
    m.cols.forEach(col => set(col, 0));
    const n = m.cols.length, stagger = n > 1 ? Math.min(ROLL.stagger, (ROLL.total * 0.4) / (n - 1)) : 0, span = ROLL.total - stagger * (n - 1);
    const fontPx = () => parseFloat(getComputedStyle(els[k]).fontSize);
    const run = () => {
      const cell = ROLL.cell * fontPx(), t0 = performance.now();
      const tick = now => {
        const t = (now - t0) / 1000; let live = false;
        m.cols.forEach(col => {
          const u = Math.min(1, Math.max(0, (t - col.index * stagger) / span)), pos = col.delta * ROLL.ease(u);
          set(col, pos); if (u < 1) live = true;
          const u0 = Math.max(0, u - 0.004), u1 = Math.min(1, u + 0.004);
          const speed = u1 > u0 ? (col.delta * Math.abs(ROLL.ease(u1) - ROLL.ease(u0))) / (u1 - u0) / span : 0;
          const sigma = u > 0 && u < 0.92 ? Math.max(3, Math.min(cell * 0.12, (speed * cell) / 300)) : 0; // R3: illegible while moving
          if (Math.abs(sigma - col.sigma) > 0.05 || (sigma === 0 && col.sigma !== 0)) { col.sigma = sigma; if (sigma > 0.2) { col.blur.setAttribute('stdDeviation', `0 ${sigma.toFixed(2)}`); col.strip.style.filter = `url(#${col.fid})`; } else col.strip.style.filter = ''; }
        });
        if (live) raf = requestAnimationFrame(tick); else land(m);
      };
      let raf = requestAnimationFrame(tick); done.push(() => cancelAnimationFrame(raf));
    };
    ScrollTrigger.create({ trigger: els[k], start: 'top 92%', once: true, onEnter: run });
  });
  return cleanup;
}

// v4 (R3, new): [BANK] 514 The Record Institute + [BANK] 372 Glare Hover. The glare is Q372's analytic streak profile,
// streak(t) = bump(t, .5, .06 + .16·softness) + .32·bump(t, .5, .5), bump = smootherstep(1 − |t − c|/h), written as a
// 33-stop linear-gradient (softness .5, peak alpha .6) and swept across a frame once per hover/focus (CSS, 600ms
// (.25,1,.5,1), the Record Institute's dominant bezier). Frames enter once, 60ms apart, rising 12px.
const smoother = t => t * t * t * (t * (6 * t - 15) + 10);
const bump = (t, c, h) => { const u = 1 - Math.abs(t - c) / h; return u <= 0 ? 0 : smoother(Math.min(1, u)); };
function wall(root, c) {
  const stops = Array.from({ length: 33 }, (_, i) => { const t = i / 32, a = Math.min(1, bump(t, 0.5, 0.06 + 0.16 * 0.5) + 0.32 * bump(t, 0.5, 0.5)) * 0.6; return `rgba(255,255,255,${a.toFixed(3)}) ${(t * 100).toFixed(1)}%`; });
  root.style.setProperty('--glare', `linear-gradient(105deg,${stops.join(',')})`);
  if (!c.motion) return;
  beats(root, [root.querySelector('.pv4-h'), root.querySelector('.pv4-sub')]);
  const frames = root.querySelectorAll('.pv4-frame');
  const st = ScrollTrigger.create({ trigger: root.querySelector('.pv4-wall'), start: 'top 82%', once: true, onEnter: () => gsap.fromTo(frames, { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.3, ease: EASE, stagger: 0.06, clearProps: 'transform,opacity,visibility' }) });
  gsap.set(frames, { autoAlpha: 0 });
  return () => st.kill();
}

// v5 (R3, new): [BANK] Q164 Circular Text (React Bits; deep read slice 3). Letters are DOM spans set around the ring, each
// given an arc proportional to its measured width (Q164's non-fill mode), so the ring reads evenly; the ring turns by a
// drag (the pointer's angle about the centre; dead radius 6% of the size) and a release keeps the drag's angular
// velocity, decaying with tau 0.3s (settled in ~1.2s). Departures: no endless cruise (S1314 §8); instead a quarter turn
// scroll-linked across the section's pass. Coarse pointers never drag (the seal must not trap a scrolling thumb).
// Reduced motion: still.
const SEAL = 'Owens Corning Platinum Preferred \u2605 $2M liability insurance \u2605 4.9 stars from 295 Google reviews \u2605 BBB A+ accredited since 2001 \u2605 ';
function seal(root, c) {
  const seal = root.querySelector('.pv5-seal'), ring = root.querySelector('.pv5-ring'), done = [], cleanup = () => done.forEach(f => f());
  const chars = [...SEAL].map(ch => { const s = document.createElement('span'); s.className = 'pv5-ch' + (ch === '\u2605' ? ' is-star' : ''); s.textContent = ch; ring.append(s); return s; });
  const lay = () => {
    const size = seal.getBoundingClientRect().width; if (!size) return;
    const fs = Math.max(10, Math.min(19, size * 0.034)); ring.style.setProperty('--fs', fs + 'px');
    const ws = chars.map(s => s.offsetWidth || fs * 0.5) /* layout width: a rotated span's bounding box is not its width */, total = ws.reduce((a, b) => a + b, 0);
    let acc = 0; chars.forEach((s, i) => { const a = ((acc + ws[i] / 2) / total) * 360; acc += ws[i]; s.style.transform = `translateX(-50%) rotate(${a.toFixed(2)}deg)`; s.style.height = (size / 2 - size * 0.035) + 'px'; s.style.top = (size * 0.035) + 'px'; });
  };
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => { if (root.isConnected) lay(); });
  const ro = new ResizeObserver(lay); ro.observe(seal); done.push(() => ro.disconnect());
  if (!c.motion) return cleanup;
  let base = 0, drag = 0, vel = 0, raf = 0, last = 0, held = null;
  const paint = () => { ring.style.transform = `rotate(${(base + drag).toFixed(2)}deg)`; };
  const st = ScrollTrigger.create({ trigger: root, start: 'top bottom', end: 'bottom top', onUpdate: s => { base = s.progress * 90; paint(); } });
  done.push(() => st.kill());
  beats(root, [root.querySelector('.pv5-h'), root.querySelectorAll('.pv5-list li')]);
  if (!c.fine) return cleanup;
  const ang = e => { const r = seal.getBoundingClientRect(), x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2; return Math.hypot(x, y) < r.width * 0.06 ? null : Math.atan2(y, x) * 180 / Math.PI; };
  const coast = t => { raf = 0; const dt = Math.min(0.05, (t - last) / 1000 || 0.016); last = t; drag += vel * dt; vel *= Math.exp(-dt / 0.3); paint(); if (Math.abs(vel) > 2) raf = requestAnimationFrame(coast); };
  const down = e => { if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return; const a = ang(e); if (a === null) return; cancelAnimationFrame(raf); raf = 0; held = { a, t: performance.now(), v: 0 }; seal.classList.add('is-drag'); seal.setPointerCapture(e.pointerId); };
  const move = e => { if (!held) return; const a = ang(e); if (a === null) return; let d = a - held.a; d = ((d + 540) % 360) - 180; const now = performance.now(), dt = Math.max(1, now - held.t) / 1000; held.v = d / dt; held.a = a; held.t = now; drag += d; paint(); };
  const up = () => { if (!held) return; vel = performance.now() - held.t < 80 ? held.v : 0; held = null; seal.classList.remove('is-drag'); last = performance.now(); if (Math.abs(vel) > 2) raf = requestAnimationFrame(coast); };
  seal.addEventListener('pointerdown', down); seal.addEventListener('pointermove', move); seal.addEventListener('pointerup', up); seal.addEventListener('pointercancel', up);
  done.push(() => { cancelAnimationFrame(raf); seal.removeEventListener('pointerdown', down); seal.removeEventListener('pointermove', move); seal.removeEventListener('pointerup', up); seal.removeEventListener('pointercancel', up); });
  return cleanup;
}

// R4 v6 (new) Shingle meter: 295 tiles, one per Google review (an aggregate count; no review text), placed once; the
// roof fills to 98% (4.9 of 5, the honest share) as it enters (.9s), never past it
function meter(root, c) {
  const t = root.querySelector('.pv6-tally'); t.innerHTML = '<i></i>'.repeat(295);
  if (!c.motion) return;
  gsap.fromTo(root.querySelector('.pv6-fillrect'), { attr: { width: 0 } }, { attr: { width: 509.6 }, duration: 0.9, ease: 'power2.out', scrollTrigger: { trigger: root.querySelector('.pv6-meter'), start: 'top 75%', once: true } });
  gsap.from(t.children, { scale: 0, duration: 0.2, ease: 'back.out(2)', stagger: { each: 0.004, from: 'start' }, scrollTrigger: { trigger: t, start: 'top 80%', once: true } });
  beats(root, [root.querySelector('.pv6-head'), root.querySelector('.pv6-creds')]);
}
// R4 v7 (new) The yard sign: the sign swings in on its stakes once (rotate -6 to 0 deg, back.out)
function sign(root, c) {
  if (!c.motion) return;
  gsap.from(root.querySelector('.pv7-sign svg'), { rotate: -6, y: 24, autoAlpha: 0, duration: 0.6, ease: 'back.out(1.6)', scrollTrigger: { trigger: root, start: 'top 70%', once: true } });
  beats(root, [root.querySelector('.pv7-copy')]);
}
// R4 v8 (new) Four big numbers: each brushstroke paints under its figure once, 120ms apart
function numbers(root, c) {
  if (!c.motion) return;
  beats(root, [root.querySelector('.pv8-head')]);
  gsap.from(root.querySelectorAll('.pv8-brush'), { scaleX: 0, transformOrigin: '0 50%', duration: 0.45, ease: 'power2.out', stagger: 0.12, scrollTrigger: { trigger: root.querySelector('.pv8-row'), start: 'top 80%', once: true } });
  beats(root, [root.querySelectorAll('.pv8-n'), root.querySelector('.pv8-oc')], { stagger: 0.08 });
}
export default { 1: constellation, 2: ledger, 3: rollers, 4: wall, 5: seal , 6: meter, 7: sign, 8: numbers };
