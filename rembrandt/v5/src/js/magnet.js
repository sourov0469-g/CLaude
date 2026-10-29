// Magnetic primary actions (S1321 initMagnetic): an element marked [data-magnetic] leans toward the pointer by 0.18 of
// the offset (quickTo 0.45 power3.out, translate only) and eases home on leave. Fine pointers with motion allowed only.
import { gsap } from 'gsap';

export function initMagnet() {
  const ok = () => matchMedia('(hover: hover) and (pointer: fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches;
  let cur = null;
  const make = el => { const s = Number(el.dataset.magnetic) || 0.18, xTo = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3.out' }), yTo = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3.out' }); return { el, s, xTo, yTo }; };
  addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse' || !ok()) return;
    const el = e.target.closest ? e.target.closest('[data-magnetic]') : null;
    if (cur && cur.el !== el) { cur.xTo(0); cur.yTo(0); cur = null; }
    if (!el) return;
    if (!cur) cur = make(el);
    const r = el.getBoundingClientRect(); // measured each move: the element itself moves, so read its untranslated box
    const bx = r.left - (gsap.getProperty(el, 'x') || 0), by = r.top - (gsap.getProperty(el, 'y') || 0);
    cur.xTo((e.clientX - bx - r.width / 2) * cur.s); cur.yTo((e.clientY - by - r.height / 2) * cur.s);
  }, { passive: true });
  document.addEventListener('versionswap', () => { cur = null; });
}
