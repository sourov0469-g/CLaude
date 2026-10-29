// PROOF. Only the owner's figures: 4.9 stars, 295 Google reviews, BBB A+ since 2001, Owens Corning Platinum Preferred,
// $2M liability cover, family-run since 1995 (S1303 gate 47: nothing invented).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { lines, rise, onEnter } from '../../js/fx.js';
import { loop } from '../../js/gl.js';
import { spring, step } from '../../js/spring.js';
import { horizontalLoop } from '../../js/hloop.js';

const seeded = s => () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;

// v1 Constellation: one star per Google review (295), scattered, gathering into "4.9" as the section scrolls in
// (S1326 normalized progress). Model (S0340): each star is a mass of 1 on a 2.2 Hz spring, zeta 0.7, around its place;
// the pointer is a repelling field of radius 130px. Depth tiers from S1377 (far, mid, near), every value varied per star.
function constellation(root, c) {
  const cv = root.querySelector('.pv1-cv'), g = cv.getContext('2d'), N = 295, R = 130;
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
    rise(root.querySelectorAll('.pv-cred li'), { scrollTrigger: onEnter(root, { start: 'top 45%' }), stagger: 0.08, delay: 0.3 });
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
// Digital Butlers "Proof, not promises". Static content; the rows arrive once at the F17 dose (CSS, proof.css).
function ledger(root, c) {
  if (!c.motion) return;
  root.classList.add('is-armed');
  ScrollTrigger.create({ trigger: root.querySelector('.pv2-ledger'), start: 'top 80%', once: true, onEnter: () => root.classList.add('is-in') });
}

// v3 the trains: [BANK] Q161 GreenSock horizontalLoop, lifted whole (js/hloop.js), measured after document.fonts.ready.
// Config per the entry: { repeat: -1, paddingRight } with the gap carried by each item's own padding; speed set so one
// lap takes 60s (F17 marquee token, Stronghold); the second train runs reversed. next()/previous() glide both trains
// one item (0.8s power3.inOut) and leave them paused; the pause button (WCAG 2.2.2) holds or resumes; trains rest
// while off screen. Reduced motion: no loops, the trains stand still and the controls hide.
function trains(root, c) {
  if (!c.motion) return;
  const rows = [...root.querySelectorAll('.pv3-row')], pause = root.querySelector('.pv3-pause');
  let loops = [], held = false, seen = true, dead = false;
  const apply = () => { loops.forEach(l => l.paused(held || !seen)); pause.setAttribute('aria-pressed', String(held)); };
  const build = () => c.ctx.add(() => {
    if (dead || !root.isConnected) return;
    loops = rows.map((row, i) => {
      const lap = row.scrollWidth; // items carry their own trailing gap
      return horizontalLoop(row.children, { repeat: -1, paddingRight: 0, speed: lap / 60 / 100, reversed: i === 1 });
    });
    ScrollTrigger.create({ trigger: root, start: 'top bottom', end: 'bottom top', onToggle: s => { seen = s.isActive; apply(); } });
    apply();
  });
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(build);
  const onClick = e => {
    const b = e.target.closest('.pv3-btn'); if (!b || !loops.length) return;
    if (b === pause) { held = !held; apply(); return; }
    held = true; pause.setAttribute('aria-pressed', 'true');
    const d = Number(b.dataset.dir), v = { duration: 0.8, ease: 'power3.inOut' };
    loops.forEach((l, i) => { l.closestIndex(true); (d * (i ? -1 : 1) > 0 ? l.next(v) : l.previous(v)); });
  };
  root.addEventListener('click', onClick);
  return () => { dead = true; loops.forEach(l => l.destroy()); root.removeEventListener('click', onClick); };
}

export default { 1: constellation, 2: ledger, 3: trains };
