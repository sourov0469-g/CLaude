// Backups B1-B3 of the proof section (audit pack 2026-10-30 A2): verbatim except the prefix pv -> bpv. Never edit.
// PROOF. Only the owner's figures: 4.9 stars, 295 Google reviews, BBB A+ since 2001, Owens Corning Platinum Preferred,
// $2M liability cover, family-run since 1995 (S1303 gate 47: nothing invented).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { lines, rise, onEnter, beats, EASE } from '../../../js/frozen/fx.js';
import { loop } from '../../../js/frozen/gl.js';
import { spring, step } from '../../../js/frozen/spring.js';

const seeded = s => () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;

// v1 Constellation: one star per Google review (295), scattered, gathering into "4.9" as the section scrolls in
// (S1326 normalized progress). Model (S0340): each star is a mass of 1 on a 2.2 Hz spring, zeta 0.7, around its place;
// the pointer is a repelling field of radius 130px. Depth tiers from S1377 (far, mid, near), every value varied per star.
function constellation(root, c) {
  const cv = root.querySelector('.bpv1-cv'), g = cv.getContext('2d'), N = 295, R = 130;
  const SPR = spring(2.2, 0.7), rnd = seeded(1995);
  const COLORS = ['#ffffff', '#ffffff', '#ffffff', '#cbdaf6', '#abc3f0', '#ffb81f'];
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
  let W = 0, H = 0, dpr = 1, prog = c.motion ? 0 : 1, rect = null, ptr = { x: -1e4, y: -1e4, nx: 0, ny: 0 }, ready = false, lp = null, time = 0;
  const glyph = (box) => { // sample the "4.9" glyph into N points on a staggered grid (densest spacing that still yields N)
    const ow = Math.max(40, Math.round(box.w / 2)), oh = Math.max(40, Math.round(box.h / 2));
    const oc = document.createElement('canvas'); oc.width = ow; oc.height = oh; const x = oc.getContext('2d');
    let fs = oh * 1.25; x.font = `800 ${fs}px Epilogue, sans-serif`; const w = x.measureText('4.9').width; if (w > ow * 0.98) fs *= ow * 0.98 / w;
    x.font = `800 ${fs}px Epilogue, sans-serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#000'; x.fillText('4.9', ow / 2, oh / 2 + fs * 0.04);
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
    const box = W >= 900 ? { x: W * 0.42, y: H * 0.15, w: W * 0.52, h: H * 0.54 } : { x: W * 0.05, y: H * 0.1, w: W * 0.9, h: H * 0.36 };
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
  (document.fonts ? document.fonts.load('800 100px Epilogue') : Promise.resolve()).then(layout, layout);
  if (c.motion) {
    gsap.to({ p: 0 }, { p: 1, ease: 'none', scrollTrigger: { trigger: root, start: 'top 85%', end: 'center 55%', scrub: 1 }, onUpdate() { prog = this.targets()[0].p; if (lp) lp.wake(); } });
    lines(root.querySelector('h2'), { scrollTrigger: onEnter(root, { start: 'top 55%' }) });
    rise(root.querySelectorAll('.bpv-cred li'), { scrollTrigger: onEnter(root, { start: 'top 45%' }), stagger: 0.08, delay: 0.3 });
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
  return () => { ro.disconnect(); if (lp) lp.stop(); root.removeEventListener('pointermove', move); root.removeEventListener('pointerleave', leave); removeEventListener('scroll', scrolled); };
}

// v2 the ledger: [BANK] Cenco Roofing DEEP 5 (every credential carries a link to its issuer; live: "Every figure is
// read from the platform named beside it"), anatomy F12 checkable proof (KBF "The Ledger": print the caveat), [BANK] #317
// Digital Butlers "Proof, not promises". Rows arrive once at the F17 dose (CSS, proof.css). V7: each rule is a roofer's
// chalk line, drawn taut (DrawSVG 0.3s) then snapped (a 90ms, 2px vibration of the line's sag) as its row arrives; the
// reel's crank turns while it feeds. Behind, faint shingle courses recede in perspective and lift 2px near the pointer.
const NS = 'http://www.w3.org/2000/svg';
function ledger(root, c) {
  const done = [];
  // background courses: rows closer together far up the roof, wider near the eave; keyway ticks staggered per course
  const bg = root.querySelector('.bpv2-bg');
  const paint = () => {
    const W = root.clientWidth, H = root.clientHeight; bg.setAttribute('viewBox', `0 0 ${W} ${H}`); bg.innerHTML = '';
    const rows = []; for (let y = 24, g = 14, i = 0; y < H; y += g, g *= 1.12, i++) rows.push([y, g, i]);
    for (const [y, g, i] of rows) {
      const tab = g * 2.6, off = i % 2 ? tab / 2 : 0;
      let d = `M0 ${y.toFixed(1)}H${W}`; for (let x = off; x < W; x += tab) d += `M${x.toFixed(1)} ${y.toFixed(1)}v${(-g * 0.85).toFixed(1)}`;
      const p = document.createElementNS(NS, 'path'); p.setAttribute('class', 'crs'); p.setAttribute('d', d); p.dataset.y = y; bg.append(p);
    }
  };
  paint(); const ro = new ResizeObserver(paint); ro.observe(root); done.push(() => ro.disconnect());
  if (c.fine && c.motion) {
    let last = null;
    const move = e => { const r = root.getBoundingClientRect(), y = e.clientY - r.top; bg.querySelectorAll('.crs').forEach(p => p.classList.toggle('is-up', Math.abs(+p.dataset.y - y) < 46)); };
    const leave = () => bg.querySelectorAll('.crs.is-up').forEach(p => p.classList.remove('is-up'));
    root.addEventListener('pointermove', move, { passive: true }); root.addEventListener('pointerleave', leave);
    done.push(() => { root.removeEventListener('pointermove', move); root.removeEventListener('pointerleave', leave); });
  }
  const cleanup = () => done.forEach(f => f());
  if (!c.motion) return cleanup;
  beats(root, [root.querySelector('.bpv2-h'), [root.querySelector('.bpv2-big'), root.querySelector('.bpv2-count')], root.querySelector('.bpv2-note')]); // G1
  root.classList.add('is-armed');
  const lines = [...root.querySelectorAll('.bpv2-cl')], dust = [...root.querySelectorAll('.bpv2-dust')], crank = root.querySelector('.bpv2-crank');
  gsap.set(lines, { drawSVG: '0%' }); gsap.set(dust, { opacity: 0 });
  ScrollTrigger.create({ trigger: root.querySelector('.bpv2-ledger'), start: 'top 80%', once: true, onEnter: () => {
    root.classList.add('is-in');
    const tl = gsap.timeline();
    tl.to(crank, { rotation: 360 * lines.length, duration: 0.3 + 0.04 * lines.length + 0.2, ease: 'power2.out', svgOrigin: '24 24' }, 0);
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
const ROLL = { cell: 1.2, stagger: 0.07, total: 1.4, ease: bezier(0.33, 1, 0.68, 1) };
const mod10 = n => ((n % 10) + 10) % 10;
function rollModel(el) { // digits become columns; anything else ($, ., M) is a fixed mark
  const text = el.dataset.to, digits = [...text].filter(ch => /\d/.test(ch)), to = +digits.join(''), cols = [];
  el.querySelectorAll('.bpv3-col,.bpv3-mark,.bpv3-defs').forEach(n => n.remove());
  const frag = document.createDocumentFragment(); let di = 0;
  for (const ch of text) {
    if (/\d/.test(ch)) {
      const place = digits.length - 1 - di, d = +ch; di++;
      const box = document.createElement('span'); box.className = 'bpv3-col'; box.setAttribute('aria-hidden', 'true');
      const strip = document.createElement('span'); strip.className = 'bpv3-strip';
      for (let o = 0; o < 4; o++) { const c = document.createElement('span'); c.className = 'bpv3-cell'; c.textContent = mod10(o - 1); strip.append(c); }
      box.append(strip); frag.append(box); cols.push({ place, to: d, box, strip, cells: [...strip.children], base: 0, sigma: 0 });
    } else { const m = document.createElement('span'); m.className = 'bpv3-mark'; m.setAttribute('aria-hidden', 'true'); m.textContent = ch; frag.append(m); }
  }
  el.prepend(frag);
  // vertical-only motion blur, as in the source: one SVG feGaussianBlur per column, stdDeviation "0 σ"
  const uid = 'pv3f' + Math.random().toString(36).slice(2, 7), defs = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  defs.setAttribute('class', 'bpv3-defs'); defs.setAttribute('aria-hidden', 'true'); defs.setAttribute('width', '0'); defs.setAttribute('height', '0');
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
  const els = [...root.querySelectorAll('.bpv3-roll')], models = els.map(rollModel);
  const set = (col, pos) => {
    const base = Math.floor(pos);
    if (base !== col.base) { col.base = base; col.cells.forEach((n, o) => { n.textContent = mod10(base + o - 1); }); }
    col.strip.style.transform = `translateY(${(-(1 + pos - base) * ROLL.cell).toFixed(4)}em)`;
  };
  const land = m => m.cols.forEach(col => { set(col, col.delta); col.strip.style.filter = ''; });
  // courses behind the board, and the sheen that follows the pointer
  const courses = root.querySelector('.bpv3-courses'), NS = 'http://www.w3.org/2000/svg';
  const paint = () => {
    const W = root.clientWidth, H = root.clientHeight; courses.setAttribute('viewBox', `0 0 ${W} ${H}`); courses.innerHTML = '';
    for (let y = 30, i = 0; y < H; y += 46, i++) { const p = document.createElementNS(NS, 'path'); let d = `M0 ${y}H${W}`; for (let x = (i % 2) * 46; x < W; x += 92) d += `M${x} ${y}v-14`; p.setAttribute('d', d); courses.append(p); }
  };
  paint(); const ro = new ResizeObserver(paint); ro.observe(root); done.push(() => ro.disconnect());
  if (!c.motion) { models.forEach(land); return cleanup; }
  const sheen = root.querySelector('.bpv3-sheen'), qx = gsap.quickTo(sheen, 'x', { duration: 0.9, ease: 'power3.out' });
  const onMove = e => { if (e.pointerType !== 'mouse') return; const r = root.getBoundingClientRect(); qx(e.clientX - r.left - r.width / 2); };
  root.addEventListener('pointermove', onMove, { passive: true }); done.push(() => root.removeEventListener('pointermove', onMove));
  beats(root, [root.querySelector('.bpv3-head'), root.querySelectorAll('.bpv3-lab'), root.querySelector('.bpv3-foot')]);
  // each number rolls once, when it enters the view
  models.forEach((m, k) => {
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
          const sigma = u > 0 && u < 1 ? Math.min(cell * 0.05, (speed * cell) / 600) : 0;
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

export default { 1: constellation, 2: ledger, 3: rollers };
