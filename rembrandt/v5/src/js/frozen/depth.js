// Layered depth (owner: background, midground, foreground at different rates).
// Pointer depth: one listener for the page; layers marked [data-pd="0.04"] inside the section under the pointer move by
// (pointer offset from the viewport centre) x depth, through quickTo 0.8s power3.out (S1321 mouse-reactive layers).
// Depths are opposing and unequal (S1330): bg negative and small, fg positive and larger. Text gets the smallest values.
// Scroll depth: parallax(root) wires [data-sy="-12"] layers to yPercent over the section's pass, scrub 1.2 (S1321, S0019).
import { gsap } from 'gsap';

const setters = new WeakMap();
function layer(el) {
  let s = setters.get(el);
  if (!s) { s = { x: gsap.quickTo(el, 'x', { duration: 0.8, ease: 'power3.out' }), y: gsap.quickTo(el, 'y', { duration: 0.8, ease: 'power3.out' }), d: Number(el.dataset.pd) || 0 }; setters.set(el, s); }
  return s;
}
export function initDepth() {
  const ok = () => matchMedia('(hover: hover) and (pointer: fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches;
  let sec = null;
  const rest = s => s && s.querySelectorAll('[data-pd]').forEach(el => { const l = layer(el); l.x(0); l.y(0); });
  addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse' || !ok()) return;
    const s = e.target.closest ? e.target.closest('[data-section]') : null;
    if (s !== sec) { rest(sec); sec = s; }
    if (!sec) return;
    const nx = e.clientX / innerWidth * 2 - 1, ny = e.clientY / innerHeight * 2 - 1, hw = innerWidth / 2, hh = innerHeight / 2;
    sec.querySelectorAll('[data-pd]').forEach(el => { const l = layer(el); l.x(nx * hw * l.d); l.y(ny * hh * l.d); });
  }, { passive: true });
  document.addEventListener('pointerleave', () => { rest(sec); sec = null; });
  document.addEventListener('versionswap', () => { sec = null; });
}
export function parallax(root, trigger) {
  root.querySelectorAll('[data-sy]').forEach(el => {
    const v = Number(el.dataset.sy);
    gsap.fromTo(el, { yPercent: -v / 2 }, { yPercent: v / 2, ease: 'none', scrollTrigger: { trigger: trigger || root, start: 'top bottom', end: 'bottom top', scrub: 1.2, invalidateOnRefresh: true } });
  });
}
