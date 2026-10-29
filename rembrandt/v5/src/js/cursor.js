// The custom cursor: an inspector's viewfinder (four corner brackets) and a dot. It reacts differently per element,
// read from data-cursor on the closest hovered element (S1321 Custom Cursor, quickTo 0.35s power3.out lag):
//   default  brackets around the dot          text   brackets fold into a caret; nearby letters lift (textfx)
//   link     brackets lock onto the element   pick   same, tighter
//   view, drag, call   a sun disc with a word (S1321 scale 1.75 label)
//   field    the dot grows; the section's canvas reacts      roof   a small roof chevron (rain sheds off it; how v1)
// Sections may read the cursor's position from the 'cursorkind' event and their own pointer listeners.
//   none     everything hides; the native I-beam shows (inputs; S0212)
// Fine pointer and motion allowed only (S1321 media rule); never moves a CTA out from under the pointer (S1303).
// [data-magnetic] elements pull toward the pointer: strength 0.18, quickTo 0.45 power3.out, translate only (S1321).
import { gsap } from 'gsap';
import { textEnter, textMove, textLeave, textScroll } from './textfx.js';

const LABEL = { view: 'Look', drag: 'Drag', call: 'Call' };
export function initCursor() {
  const html = document.documentElement, root = document.querySelector('.cur');
  const q = matchMedia('(hover: hover) and (pointer: fine)'), rm = matchMedia('(prefers-reduced-motion: reduce)');
  const f = root.querySelector('.cur-f'), dot = root.querySelector('.cur-dot'), disc = root.querySelector('.cur-disc'), discT = disc.firstElementChild;
  const caret = root.querySelector('.cur-caret'), roof = root.querySelector('.cur-roof');
  const [tl, tr, bl, br] = root.querySelectorAll('.cur-c');
  const fx = gsap.quickTo(f, 'x', { duration: 0.35, ease: 'power3.out' }), fy = gsap.quickTo(f, 'y', { duration: 0.35, ease: 'power3.out' });
  const dx = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3.out' }), dy = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3.out' });
  const cx = gsap.quickTo(disc, 'x', { duration: 0.45, ease: 'power3.out' }), cy = gsap.quickTo(disc, 'y', { duration: 0.45, ease: 'power3.out' });
  const rx = gsap.quickTo(roof, 'x', { duration: 0.18, ease: 'power3.out' }), ry = gsap.quickTo(roof, 'y', { duration: 0.18, ease: 'power3.out' });
  let on = false, kind = 'default', target = null, rect = null, px = -100, py = -100, mag = null;
  const T = { duration: 0.3, ease: 'power3.out', overwrite: 'auto' };

  function brackets(w, h, pad) { // outer corner of each bracket sits pad px outside a w x h box centred on the group
    const x = w / 2 + pad - 6, y = h / 2 + pad - 6;
    gsap.to(tl, { x: -x, y: -y, ...T }); gsap.to(tr, { x, y: -y, ...T }); gsap.to(bl, { x: -x, y, ...T }); gsap.to(br, { x, y, ...T });
  }
  function setKind(k, el) {
    if (k === kind && el === target) return;
    if (kind === 'text') textLeave();
    if (mag && mag.el !== el) { mag.release(); mag = null; }
    kind = k; target = el; rect = el ? el.getBoundingClientRect() : null;
    const show = (o, v) => gsap.to(o, { opacity: v, ...T });
    const label = LABEL[k];
    show(disc, label ? 1 : 0); gsap.to(disc, { scale: label ? 1 : 0.6, ...T }); if (label) discT.textContent = label;
    show(caret, k === 'text' ? 1 : 0); show(roof, k === 'roof' ? 1 : 0);
    show([tl, tr, bl, br], k === 'text' || k === 'none' || k === 'roof' || label ? 0 : 1);
    show(dot, k === 'none' || label || k === 'roof' ? 0 : 1);
    gsap.to(dot, { scale: k === 'field' ? 2.2 : 1, ...T });
    if (k === 'link' || k === 'pick') brackets(rect.width, rect.height, k === 'pick' ? 3 : 7);
    else if (k === 'field') brackets(44, 44, 0);
    else brackets(24, 24, 0);
    if (k === 'text') { const fs = parseFloat(getComputedStyle(el).fontSize) || 48; gsap.to(caret, { scaleY: Math.min(4, fs * 0.95 / 36), ...T }); textEnter(el); }
    if (el && el.hasAttribute('data-magnetic')) mag = magnet(el);
    document.dispatchEvent(new CustomEvent('cursorkind', { detail: { kind: k, el } }));
  }
  function magnet(el) { // S1321 initMagnetic: strength 0.18, translate only, rect read on enter (S1330)
    const r = el.getBoundingClientRect(), s = Number(el.dataset.magnetic) || 0.18;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3.out' }), yTo = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3.out' });
    return { el, move(x, y) { xTo((x - r.left - r.width / 2) * s); yTo((y - r.top - r.height / 2) * s); }, release() { xTo(0); yTo(0); } };
  }
  function place() {
    if ((kind === 'link' || kind === 'pick') && target && target.isConnected) { // brackets lock to the element (plus its magnetic offset)
      const r = target.getBoundingClientRect(); fx(r.left + r.width / 2); fy(r.top + r.height / 2);
    } else { fx(px); fy(py); }
    dx(px); dy(py); cx(px); cy(py); rx(px); ry(py);
  }
  function update(hit) {
    const el = hit && hit.closest ? hit.closest('[data-cursor], input[type=text], input[type=search], input[type=tel], textarea') : null;
    const k = !el ? 'default' : (el.matches('input,textarea') ? 'none' : el.dataset.cursor || 'default');
    setKind(k, el);
    if (mag) mag.move(px, py);
    if (kind === 'text') textMove(px, py);
    place();
  }
  function onMove(e) {
    if (e.pointerType && e.pointerType !== 'mouse') return;
    px = e.clientX; py = e.clientY;
    if (!on) return;
    gsap.to(root, { opacity: 1, duration: 0.2, overwrite: 'auto' });
    update(e.target);
  }
  let sPending = false;
  function onScroll() { // content moves under a still pointer: re-read what is under it once per frame
    if (!on || sPending || px < 0) return; sPending = true;
    requestAnimationFrame(() => { sPending = false; if (kind === 'text') textScroll(); update(document.elementFromPoint(px, py)); });
  }
  function enable() {
    const want = q.matches && !rm.matches;
    if (want === on) return;
    on = want; html.classList.toggle('cur-on', on);
    if (!on) { setKind('default', null); gsap.set(root, { opacity: 0 }); }
  }
  gsap.set(root, { opacity: 0 }); gsap.set([tl, tr, bl, br], { x: 0, y: 0 }); brackets(24, 24, 0);
  addEventListener('pointermove', onMove, { passive: true });
  addEventListener('scroll', onScroll, { passive: true });
  document.addEventListener('versionswap', () => { if (on) setKind('default', null); });
  document.addEventListener('pointerleave', () => gsap.to(root, { opacity: 0, duration: 0.2 }));
  addEventListener('blur', () => gsap.to(root, { opacity: 0, duration: 0.2 }));
  q.addEventListener('change', enable); rm.addEventListener('change', enable);
  enable();
}
