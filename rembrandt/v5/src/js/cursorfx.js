// Per-section cursor effects (PLAN-FULL G3; BRIEF-FULL §4: the cursor's effect changes with each section's background).
// One kind per section: hero a warm sun halo, reviews gold star dust, work a viewfinder, family wood shavings, how
// water ripples, towns a compass that points along the path of travel, call signal arcs. Its colours follow the
// background under the pointer (light marks on dark versions, ink and blue on light ones).
// References: S1323 pointer-trail-emitter (emission by distance travelled, re-entry reset, hover:none gate, nothing drawn
// while the pointer is still), [BANK] Q41 renderer caps (small pools, hidden-tab skip: no pointer events, no emission),
// S1321 halo (lag 0.35s). Runs only while the cursor companion is live (html.cmp-live), so Off, touch and reduced motion
// get none of it; DOM pools moved by transform, at most 12 nodes per pool, aria-hidden, pointer-events none.
import { gsap } from 'gsap';

const KIND = { hero: 'halo', proof: 'stars', work: 'finder', family: 'shavings', how: 'ripple', area: 'compass', call: 'signal' };
const STEP = { stars: 30, shavings: 42, ripple: 64, signal: 48 }; // px of travel between emissions
const SVG = {
  stars: '<svg viewBox="-6 -6 12 12"><path d="M0 -5.5l1.6 3.5 3.9.3-3 2.5.9 3.8L0 2.7-3.4 4.6l.9-3.8-3-2.5 3.9-.3z"/></svg>',
  shavings: '<svg viewBox="-8 -8 16 16"><path d="M-6 3 C -6 -5 5 -6 5 0 C 5 4 -2 4 -1 0 C 0 -2 2 -1 2 0"/></svg>',
  ripple: '<svg viewBox="-20 -20 40 40"><circle r="17"/></svg>',
  signal: '<svg viewBox="-16 -16 32 32"><path d="M2 -6 a7 7 0 0 1 0 12 M6 -10 a12 12 0 0 1 0 20 M10 -14 a17 17 0 0 1 0 28"/></svg>',
};
const ONE = {
  halo: '<div class="cfx-halo"></div>',
  finder: '<svg class="cfx-finder" viewBox="-30 -30 60 60"><path d="M-22 -12 V-22 H-12 M12 -22 H22 V-12 M22 12 V22 H12 M-12 22 H-22 V12"/><circle r="1.6"/></svg>',
  compass: '<svg class="cfx-compass" viewBox="-30 -30 60 60"><circle r="24"/><path class="cfx-ticks" d="M0 -24 v5 M24 0 h-5 M0 24 v-5 M-24 0 h5"/><g class="cfx-needle"><path class="n" d="M0 -18 L4 0 L-4 0 Z"/><path class="s" d="M0 18 L4 0 L-4 0 Z"/></g></svg>',
};

export function initCursorFx() {
  const html = document.documentElement, fine = matchMedia('(hover: hover) and (pointer: fine)'), rm = matchMedia('(prefers-reduced-motion: reduce)');
  const layer = document.createElement('div'); layer.className = 'cfx'; layer.setAttribute('aria-hidden', 'true'); document.body.append(layer);
  const one = {}, pools = {};
  for (const k in ONE) { const w = document.createElement('div'); w.className = 'cfx-one cfx-' + k + '-w'; w.innerHTML = ONE[k]; layer.append(w); one[k] = { el: w, x: gsap.quickTo(w, 'x', { duration: k === 'halo' ? 0.35 : 0.22, ease: 'power3.out' }), y: gsap.quickTo(w, 'y', { duration: k === 'halo' ? 0.35 : 0.22, ease: 'power3.out' }) }; }
  for (const k in SVG) { pools[k] = Array.from({ length: 12 }, () => { const d = document.createElement('div'); d.className = 'cfx-p cfx-' + k; d.innerHTML = SVG[k]; layer.append(d); return d; }); pools[k].i = 0; }
  gsap.set(layer.querySelectorAll('.cfx-one,.cfx-p'), { autoAlpha: 0 });
  const tone = new WeakMap(); // live version root -> is its background dark? (a swap brings a new root, so a fresh reading)
  const dark = (sec, root) => { // the section's painted background (--sec-bg, set by main.js paintBg for the live version)
    if (tone.has(root)) return tone.get(root);
    const probe = document.createElement('i'); probe.style.cssText = 'position:absolute;width:0;height:0;color:var(--sec-bg,var(--color-bg))'; sec.append(probe);
    const m = getComputedStyle(probe).color.match(/[\d.]+/g) || [255, 255, 255]; probe.remove();
    const [r, g, b] = m.map(Number).map(v => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; });
    const d = 0.2126 * r + 0.7152 * g + 0.0722 * b < 0.25; tone.set(root, d); return d;
  };
  let kind = null, lx = null, ly = null, acc = 0, rot = 0, still = null;
  const show = k => {
    if (k === kind) return;
    if (kind && one[kind]) gsap.to(one[kind].el, { autoAlpha: 0, duration: 0.2, overwrite: 'auto' });
    kind = k; layer.dataset.kind = k || ''; acc = 0;
    if (k && one[k]) gsap.to(one[k].el, { autoAlpha: 1, duration: 0.2, overwrite: 'auto' });
  };
  const emit = (k, x, y, ang) => {
    const pool = pools[k], d = pool[pool.i++ % pool.length]; gsap.killTweensOf(d);
    const j = () => (Math.random() - 0.5) * 10;
    if (k === 'stars') gsap.fromTo(d, { x: x + j(), y: y + j(), scale: 0.9, rotation: 0, autoAlpha: 1 }, { y: '+=18', rotation: 120, scale: 0.2, autoAlpha: 0, duration: 0.7, ease: 'power2.out' });
    else if (k === 'shavings') gsap.fromTo(d, { x: x + j(), y, rotation: Math.random() * 360, scale: 1, autoAlpha: 1 }, { y: '+=46', x: '+=' + j() * 2, rotation: '+=220', autoAlpha: 0, duration: 0.9, ease: 'power1.in' });
    else if (k === 'ripple') gsap.fromTo(d, { x, y, scale: 0.25, autoAlpha: 0.8 }, { scale: 1.6, autoAlpha: 0, duration: 0.8, ease: 'power2.out' });
    else if (k === 'signal') gsap.fromTo(d, { x, y, rotation: ang, scale: 0.6, autoAlpha: 1 }, { scale: 1.3, autoAlpha: 0, duration: 0.6, ease: 'power2.out' });
  };
  const off = () => { show(null); lx = null; };
  addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse' || !fine.matches || rm.matches || !html.classList.contains('cmp-live')) { if (kind) off(); return; }
    const sec = e.target.closest ? e.target.closest('[data-section]') : null, k = sec && KIND[sec.dataset.section];
    if (!k) { if (kind) off(); return; }
    const stage = sec.querySelector('.stage'), vroot = stage && stage.firstElementChild;
    layer.classList.toggle('is-dark', !!vroot && dark(sec, vroot));
    show(k);
    const x = e.clientX, y = e.clientY, dx = lx === null ? 0 : x - lx, dy = ly === null ? 0 : y - ly; lx = x; ly = y; // re-entry reset
    const d = Math.hypot(dx, dy);
    if (one[k]) {
      one[k].x(x); one[k].y(y);
      if (k === 'finder') { gsap.to(one[k].el.firstChild, { scale: 1 + Math.min(0.6, d / 30), duration: 0.15, overwrite: 'auto' }); clearTimeout(still); still = setTimeout(() => gsap.to(one[k].el.firstChild, { scale: 1, duration: 0.3, ease: 'back.out(2)' }), 120); }
      if (k === 'compass' && d > 2) { const a = Math.atan2(dy, dx) * 180 / Math.PI + 90, delta = ((a - rot) % 360 + 540) % 360 - 180; rot += delta; gsap.to(one[k].el.querySelector('.cfx-needle'), { rotation: rot, duration: 0.3, ease: 'power3.out', overwrite: 'auto' }); }
      return;
    }
    acc += d; if (acc < STEP[k]) return; acc = 0;
    emit(k, x, y, Math.atan2(dy, dx) * 180 / Math.PI);
  }, { passive: true });
  document.addEventListener('pointerleave', off);
  return { layer };
}
