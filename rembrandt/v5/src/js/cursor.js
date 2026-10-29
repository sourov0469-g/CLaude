// Custom cursor, built to ⟦S1321⟧ cinematic-gsap-lenis-motion-system "Custom Cursor": a follower ring with
// mix-blend-mode: difference, positioned by gsap.quickTo (0.35s power3.out), scaling to 1.75 with a word on label
// targets; hidden on coarse pointers and under reduced motion. It reacts per element, read from data-cursor:
//   default  ring + dot              link, pick  ring grows to 1.75 (S1321 hover scale); [data-magnetic] pulls (0.18)
//   view, drag, call, open, show   ring 1.75 with a word (S1321 label targets; sun fill for legibility)
//   text     ring shrinks; letters near the pointer lift ([BANK] Variable Proximity, adapted to transforms: textfx)
//   field    ring hides, dot grows (the section's own canvas answers)      none  hidden (inputs keep the native caret)
import { gsap } from 'gsap';
import { textEnter, textMove, textLeave, textScroll } from './textfx.js';

const LABEL = { view: 'Look', drag: 'Drag', call: 'Call', open: 'Open', show: 'Show' };
export function initCursor() {
  const html = document.documentElement, root = document.querySelector('.cur');
  const q = matchMedia('(hover: hover) and (pointer: fine)'), rm = matchMedia('(prefers-reduced-motion: reduce)');
  const ring = root.querySelector('.cur-ring'), dot = root.querySelector('.cur-dot'), lab = root.querySelector('.cur-label');
  const rx = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3.out' }), ry = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3.out' });
  const dx = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3.out' }), dy = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3.out' });
  let on = false, kind = 'default', target = null, px = -100, py = -100, mag = null;
  const T = { duration: 0.35, ease: 'power3.out', overwrite: 'auto' };

  function setKind(k, el) {
    if (k === kind && el === target) return;
    if (kind === 'text') textLeave();
    if (mag && mag.el !== el) { mag.release(); mag = null; }
    kind = k; target = el;
    const label = (el && el.dataset.cursorLabel) || LABEL[k];
    lab.textContent = label || '';
    ring.classList.toggle('is-label', !!label);
    const scale = label ? 1.75 : k === 'link' || k === 'pick' ? 1.75 : k === 'text' ? 0.45 : 1;
    gsap.to(ring, { scale, autoAlpha: k === 'field' || k === 'none' ? 0 : 1, ...T });
    gsap.to(dot, { scale: k === 'field' ? 2.2 : 1, autoAlpha: k === 'none' || label ? 0 : 1, ...T });
    if (k === 'text') textEnter(el);
    if (el && el.hasAttribute('data-magnetic')) mag = magnet(el);
  }
  function magnet(el) { // S1321 initMagnetic: strength 0.18, quickTo 0.45 power3.out, translate only
    const r = el.getBoundingClientRect(), s = Number(el.dataset.magnetic) || 0.18;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3.out' }), yTo = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3.out' });
    return { el, move(x, y) { xTo((x - r.left - r.width / 2) * s); yTo((y - r.top - r.height / 2) * s); }, release() { xTo(0); yTo(0); } };
  }
  function update(hit) {
    const el = hit && hit.closest ? hit.closest('[data-cursor], input[type=text], input[type=search], input[type=tel], textarea') : null;
    setKind(!el ? 'default' : el.matches('input,textarea') ? 'none' : el.dataset.cursor || 'default', el);
    if (mag) mag.move(px, py);
    if (kind === 'text') textMove(px, py);
    rx(px); ry(py); dx(px); dy(py);
  }
  function onMove(e) {
    if (e.pointerType && e.pointerType !== 'mouse') return;
    px = e.clientX; py = e.clientY;
    if (!on) return;
    gsap.to(root, { autoAlpha: 1, duration: 0.15, overwrite: 'auto' });
    update(e.target);
  }
  let pending = false;
  function onScroll() { // content moves under a still pointer: re-read what is under it once per frame
    if (!on || pending || px < 0) return; pending = true;
    requestAnimationFrame(() => { pending = false; if (kind === 'text') textScroll(); update(document.elementFromPoint(px, py)); });
  }
  function enable() {
    const want = q.matches && !rm.matches;
    if (want === on) return;
    on = want; html.classList.toggle('cur-on', on);
    if (!on) { setKind('default', null); gsap.set(root, { autoAlpha: 0 }); }
  }
  gsap.set(root, { autoAlpha: 0 });
  addEventListener('pointermove', onMove, { passive: true });
  addEventListener('scroll', onScroll, { passive: true });
  document.addEventListener('versionswap', () => { if (on) setKind('default', null); });
  document.addEventListener('pointerleave', () => gsap.to(root, { autoAlpha: 0, duration: 0.15 }));
  addEventListener('blur', () => gsap.to(root, { autoAlpha: 0, duration: 0.15 }));
  q.addEventListener('change', enable); rm.addEventListener('change', enable);
  enable();
}
