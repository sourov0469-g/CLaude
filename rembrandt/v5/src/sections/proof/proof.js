// PROOF. Only the owner's figures: 4.9 stars, 295 Google reviews, BBB A+ since 2001, Owens Corning Platinum Preferred,
// $2M liability cover, family-run since 1995 (S1303 gate 47: nothing invented).
import { gsap } from 'gsap';
import { lines, rise, onEnter } from '../../js/fx.js';
import { loop } from '../../js/gl.js';
import { spring, step } from '../../js/spring.js';

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
    const data = x.getImageData(0, 0, ow, oh).data; let pts = [];
    for (let sp = 9; sp >= 1.5; sp -= 0.25) {
      pts = [];
      for (let yy = sp / 2, row = 0; yy < oh; yy += sp * 0.866, row++) for (let xx = (row % 2 ? sp : sp / 2); xx < ow; xx += sp) if (data[(Math.round(yy) * ow + Math.round(xx)) * 4 + 3] > 140) pts.push([xx, yy]);
      if (pts.length >= N) break;
    }
    const out = []; for (let i = 0; i < N; i++) { const p = pts[Math.floor(i * pts.length / N)] || [ow / 2, oh / 2]; out.push([box.x + p[0] * 2, box.y + p[1] * 2]); }
    for (let i = out.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [out[i], out[j]] = [out[j], out[i]]; } // mixed tiers across the glyph
    return out;
  };
  const layout = () => {
    const r = cv.getBoundingClientRect(); W = r.width; H = r.height; if (!W || !H) return;
    dpr = Math.min(devicePixelRatio || 1, 2); cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); g.setTransform(dpr, 0, 0, dpr, 0, 0);
    const box = W >= 900 ? { x: W * 0.42, y: H * 0.08, w: W * 0.54, h: H * 0.6 } : { x: W * 0.05, y: H * 0.06, w: W * 0.9, h: H * 0.4 };
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

// v2 Odometer: P4 stat strip (S1303), digits roll once on entry (G4 #11: 260ms per changed digit, ease-out) and again on
// hover with a tilt under 4 degrees (S1321 magnetic cards). Background: course lines that bend away from the pointer.
function odometer(root, c) {
  const figs = [...root.querySelectorAll('.pv2-fig')], cv = root.querySelector('.pv2-cv'), g = cv.getContext('2d');
  const strips = [];
  figs.forEach(f => { // build the digit strips (the real value stays in the HTML for no-JS and screen readers)
    const n = f.querySelector('.pv2-n'), val = f.dataset.odo; n.textContent = '';
    for (const ch of val) {
      if (!/\d/.test(ch)) { const s = document.createElement('span'); s.textContent = ch; n.append(s); continue; }
      const o = document.createElement('span'); o.className = 'odo'; const col = document.createElement('span');
      for (let k = 0; k < 20; k++) { const d = document.createElement('span'); d.textContent = k % 10; col.append(d); }
      o.append(col); n.append(o); strips.push({ f, col, d: +ch });
    }
  });
  const at = (s, cycle) => -(cycle * 10 + s.d) * 5; // yPercent of a 20-digit strip
  strips.forEach(s => gsap.set(s.col, { yPercent: at(s, 1) }));
  if (c.motion) {
    rise(root.querySelectorAll('.pv2-h .ln > span'), { scrollTrigger: onEnter(root), stagger: 0.11, duration: 0.9 }, { y: 24 });
    const tl = gsap.timeline({ scrollTrigger: onEnter(root.querySelector('.pv2-row'), { start: 'top 88%' }) });
    strips.forEach((s, i) => tl.fromTo(s.col, { yPercent: 0 }, { yPercent: at(s, 1), duration: 0.55 + 0.11 * s.d, ease: 'power3.out' }, i * 0.05));
    tl.fromTo(figs, { borderTopColor: 'rgba(255,255,255,0)' }, { borderTopColor: 'rgba(255,255,255,0.22)', duration: 0.6, stagger: 0.08 }, 0);
  }
  const offs = [];
  if (c.fine && c.motion) figs.forEach(f => {
    const rx = gsap.quickTo(f, 'rotationX', { duration: 0.45, ease: 'power3.out' }), ry = gsap.quickTo(f, 'rotationY', { duration: 0.45, ease: 'power3.out' });
    let r = null;
    const enter = () => { r = f.getBoundingClientRect(); strips.filter(s => s.f === f).forEach((s, i) => gsap.fromTo(s.col, { yPercent: at(s, 0) }, { yPercent: at(s, 1), duration: 0.9, ease: 'power3.out', delay: i * 0.05, overwrite: true })); };
    const move = e => { if (!r) r = f.getBoundingClientRect(); ry(((e.clientX - r.left) / r.width - 0.5) * 8); rx(-((e.clientY - r.top) / r.height - 0.5) * 8); };
    const leave = () => { r = null; rx(0); ry(0); };
    f.addEventListener('pointerenter', enter); f.addEventListener('pointermove', move); f.addEventListener('pointerleave', leave);
    offs.push(() => { f.removeEventListener('pointerenter', enter); f.removeEventListener('pointermove', move); f.removeEventListener('pointerleave', leave); });
  });
  // course lines: horizontal hairlines every 22px; near the damped pointer they bend away like a lens (S1330 damping)
  let W = 0, H = 0, dpr = 1, rect = null, lp = null;
  const p = { x: -1e4, y: -1e4, tx: -1e4, ty: -1e4, k: 0, tk: 0 };
  const draw = () => {
    g.clearRect(0, 0, W, H); g.strokeStyle = 'rgba(203,218,246,0.09)'; g.lineWidth = 1;
    const sig = 150, Rv = 170;
    for (let y0 = 11; y0 < H; y0 += 22) {
      g.beginPath();
      const dv = y0 - p.y, near = Math.abs(dv) < Rv ? (1 - Math.abs(dv) / Rv) : 0;
      for (let x = 0; x <= W; x += 16) {
        const push = near ? Math.sign(dv || 1) * near * 26 * p.k * Math.exp(-((x - p.x) ** 2) / (2 * sig * sig)) : 0;
        x ? g.lineTo(x, y0 + push) : g.moveTo(x, y0 + push);
      }
      g.stroke();
    }
  };
  const layout = () => { const r = cv.getBoundingClientRect(); W = r.width; H = r.height; dpr = Math.min(devicePixelRatio || 1, 2); cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); g.setTransform(dpr, 0, 0, dpr, 0, 0); rect = null; draw(); };
  const ro = new ResizeObserver(layout); ro.observe(cv);
  if (c.fine && c.motion) {
    lp = loop(cv, dt => {
      const a = 1 - Math.pow(1 - 0.09, dt * 60);
      p.x += (p.tx - p.x) * a; p.y += (p.ty - p.y) * a; p.k += (p.tk - p.k) * a; draw();
      return Math.abs(p.tx - p.x) > 0.3 || Math.abs(p.ty - p.y) > 0.3 || Math.abs(p.tk - p.k) > 0.005;
    });
    const move = e => { if (e.pointerType !== 'mouse') return; rect = rect || cv.getBoundingClientRect(); p.tx = e.clientX - rect.left; p.ty = e.clientY - rect.top; if (p.k < 0.01) { p.x = p.tx; p.y = p.ty; } p.tk = 1; lp.wake(); };
    const leave = () => { p.tk = 0; lp.wake(); };
    const scrolled = () => { rect = null; };
    root.addEventListener('pointermove', move); root.addEventListener('pointerleave', leave); addEventListener('scroll', scrolled, { passive: true });
    offs.push(() => { root.removeEventListener('pointermove', move); root.removeEventListener('pointerleave', leave); removeEventListener('scroll', scrolled); });
  }
  return () => { offs.forEach(f => f()); ro.disconnect(); if (lp) lp.stop(); };
}

// v3 Zoom-through: pinned (S0019 row 6, end +=300%, scrub 1). Each figure ends in a full stop; scrolling dives into it and
// the stop floods the screen in the next chapter's colour. Scrubbed motion is linear (S0652); the zoom runs on a log scale.
function zoom(root, c) {
  if (!(c.motion && c.wide)) return; // narrow screens and reduced motion get the stacked figures (CSS)
  const pin = root.querySelector('.pv3-pin'), steps = [...root.querySelectorAll('.pv3-step')], flood = root.querySelector('.pv3-flood');
  gsap.set(steps.slice(1), { autoAlpha: 0 }); gsap.set(flood, { autoAlpha: 0 });
  const tl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: pin, start: 'top top', end: '+=300%', scrub: 1, pin: true, anticipatePin: 1, invalidateOnRefresh: true } });
  const bg = el => (el.dataset.tone === 'blue' ? '#1a4199' : '#ffffff');
  steps.forEach((st, i) => {
    const fig = st.querySelector('.pv3-fig'), num = st.querySelector('.pv3-n'), dot = st.querySelector('.pv3-dot'), cap = st.querySelector('.pv3-c');
    if (i) tl.fromTo(fig, { scale: 0.92, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.3, immediateRender: false });
    tl.to({}, { duration: 0.3 });
    if (i === steps.length - 1) return;
    const next = steps[i + 1];

    // the stop's centre as a fraction of the figure: a percentage origin does not move while the figure scales
    let org = null;
    const origin = () => { if (!org) { const n = num.getBoundingClientRect(), d = dot.getBoundingClientRect(); org = `${((d.left + d.width / 2 - n.left) / n.width) * 100}% ${((d.top + d.height / 2 - n.top) / n.height) * 100}%`; } return org; };
    const dotXY = () => { const d = dot.getBoundingClientRect(), r = pin.getBoundingClientRect(); return [d.left + d.width / 2 - r.left, d.top + d.height / 2 - r.top, d.width]; };
    const z = { v: 0 };
    tl.to(cap, { autoAlpha: 0, duration: 0.12 })
      .fromTo(z, { v: 0 }, { v: 1, duration: 0.55, immediateRender: false, onUpdate: () => gsap.set(num, { scale: Math.exp(z.v * Math.log(9)), transformOrigin: origin() }) }, '<')
      .fromTo(flood, { x: () => dotXY()[0], y: () => dotXY()[1], scale: () => dotXY()[2] * 9 / 20 * 0.55, autoAlpha: 1, backgroundColor: () => bg(next), borderRadius: '12%' },
        { scale: () => Math.hypot(pin.clientWidth, pin.clientHeight) / 10 * 1.15, duration: 0.3, immediateRender: false }, '<0.25')
      .set(st, { autoAlpha: 0 }).set(next, { autoAlpha: 1 }).set(flood, { autoAlpha: 0 });
  });
  tl.to({}, { duration: 0.25 });
}

export default { 1: constellation, 2: odometer, 3: zoom };
