// WORK. Real jobs only; ba2 is the one genuine before/after pair and only it is ever shown as before and after.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { img } from '../../js/main.js';
import { dirReveal } from '../../js/fx.js';
import { horizontalLoop } from '../../js/hloop.js';

gsap.registerPlugin(Flip);

// v1 [BANK] Q361 horizontal-loop project tiles (GreenSock pen xxQaRoX, CROWN): the horizontalLoop helper with the pen's
// call config { paused: false, speed: 2 (200 px/s), center: true, repeat: -1, onChange }; the centre tile carries .is-on
// at full brightness, the rest brightness(0.7); onChange moves the caption; step buttons glide one tile
// (next/previous, 0.4s power1.inOut, the pen's values) and a tile click centres it (toIndex, 0.8s). No Draggable (Club;
// dropped per the entry). Adapted: the gap between tiles (24px) is carried as paddingRight so the seam stays even;
// a pause toggle (WCAG 2.2.2); autoplay only with motion allowed; the loop rests while off screen.
function tiles(root, c) {
  const strip = root.querySelector('.wv1-strip'), items = [...strip.children], cap = root.querySelector('.wv1-cap'), pause = root.querySelector('.wv1-pause');
  let loop = null, held = !c.motion, seen = true, dead = false;
  if (c.motion) dirReveal(root.querySelector('.wv-head'), root);
  const apply = () => { if (loop) loop.paused(held || !seen); pause.setAttribute('aria-pressed', String(held)); };
  const setCap = (el) => {
    items.forEach(t => t.classList.toggle('is-on', t === el));
    const txt = el.dataset.cap; if (cap.textContent === txt) return;
    cap.textContent = txt; cap.classList.remove('is-new'); void cap.offsetWidth; cap.classList.add('is-new');
  };
  const build = () => c.ctx.add(() => {
    if (dead || !root.isConnected) return;
    loop = horizontalLoop(items, { paused: true, speed: 2, center: true, repeat: -1, paddingRight: 24, onChange: setCap });
    ScrollTrigger.create({ trigger: root, start: 'top bottom', end: 'bottom top', onToggle: s => { seen = s.isActive; apply(); } });
    apply();
  });
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(build);
  const step = { duration: c.motion ? 0.4 : 0, ease: 'power1.inOut' };
  const onClick = e => {
    if (!loop) return;
    const b = e.target.closest('.wv-btn'), t = e.target.closest('.wv1-tile');
    if (b === pause) { held = !held; apply(); return; }
    if (!b && !t) return;
    held = true; apply();
    if (b) { loop.closestIndex(true); Number(b.dataset.dir) > 0 ? loop.next(step) : loop.previous(step); }
    else loop.toIndex(items.indexOf(t), { duration: c.motion ? 0.8 : 0, ease: 'power1.inOut' });
  };
  root.addEventListener('click', onClick);
  return () => { dead = true; if (loop) loop.destroy(); root.removeEventListener('click', onClick); };
}

// v2 [BANK] Q157 Push Animation on Grid Items (Codrops, demo 1; all three demo scripts read in the deep read): the
// clicked photo's image moves into the inner area; each other item is classified against the clicked rect (bottom
// above its top: north; top below its bottom: south; else right of it: east, left: west) and only that row or column
// class toggles to the edge; Flip.from replays everything (duration 0.9, ease expo, scale true, prune true). Click
// again, the close button or Esc returns the collage. Adapted: a caption and a close button replace the heading while
// open; focus moves to Close and back to the photo; reduced motion jumps without the flight.
function push(root, c) {
  const grid = root.querySelector('.wv2-grid'), full = root.querySelector('.wv2-full'), items = [...grid.querySelectorAll('.wv2-item')];
  const closed = root.querySelector('.wv2-closed'), open = root.querySelector('.wv2-open'), cap = root.querySelector('.wv2-cap'), closeBtn = root.querySelector('.wv2-close');
  if (c.motion) dirReveal(root.querySelector('.wv-head'), root);
  let current = null, busy = null;
  const DIRS = ['pos-north', 'pos-south', 'pos-west', 'pos-east'];
  const flip = state => {
    if (busy) busy.progress(1);
    busy = Flip.from(state, { duration: c.motion ? 0.9 : 0, ease: 'expo', scale: true, prune: true, onComplete: () => { busy = null; } });
  };
  function show(item) {
    const pic = item.querySelector('img'), r = item.getBoundingClientRect();
    const state = Flip.getState([...items, pic]);
    full.append(pic); item.style.zIndex = 99; current = item;
    for (const other of items) {
      if (other === item) continue;
      const o = other.getBoundingClientRect();
      other.classList.add(o.bottom < r.top ? 'pos-north' : o.top > r.bottom ? 'pos-south' : o.left > r.right ? 'pos-east' : 'pos-west');
    }
    root.classList.add('is-open'); full.setAttribute('aria-hidden', 'false');
    cap.textContent = item.dataset.cap; closed.hidden = true; open.hidden = false;
    flip(state);
    closeBtn.focus({ preventScroll: true });
  }
  function hide() {
    if (!current) return;
    const item = current, pic = full.querySelector('img');
    const state = Flip.getState([...items, pic]);
    item.append(pic); items.forEach(o => o.classList.remove(...DIRS));
    root.classList.remove('is-open'); full.setAttribute('aria-hidden', 'true');
    closed.hidden = false; open.hidden = true; current = null;
    flip(state);
    gsap.delayedCall(c.motion ? 0.9 : 0, () => { item.style.zIndex = ''; });
    item.focus({ preventScroll: true });
  }
  const onClick = e => {
    if (e.target.closest('.wv2-close') || e.target.closest('.wv2-full')) { hide(); return; }
    const item = e.target.closest('.wv2-item'); if (!item) return;
    if (current) hide(); else show(item);
  };
  const onKey = e => { if (e.key === 'Escape' && current) { e.stopPropagation(); hide(); } };
  root.addEventListener('click', onClick); root.addEventListener('keydown', onKey);
  return () => { root.removeEventListener('click', onClick); root.removeEventListener('keydown', onKey); };
}

// v3 [BANK] Q38 SVG Mask Transitions on Scroll, horizontal blinds (Codrops; L2-measured values): 30 slits, stagger 0.02,
// scrub 2.0 to 2.5 on desktop and about 1 on phones, crispEdges, mask rebuilt on resize, not pinned (it scrubs while
// the section passes). Adapted: the after photo opens through the blinds over the before photo (the genuine pair);
// the Before and After labels sit outside the frame and switch at half. Reduced motion: the pair side by side.
const SLITS = 30;
function blinds(root, c) {
  const before = root.querySelector('.wv3-before'), after = root.querySelector('.wv3-after');
  before.setAttribute('href', img(before.dataset.fill)); after.setAttribute('href', img(after.dataset.fill));
  const pair = root.querySelector('.wv3-pair');
  if (!c.motion) { root.classList.add('is-still'); pair.hidden = false; return () => { root.classList.remove('is-still'); pair.hidden = true; }; }
  dirReveal(root.querySelector('.wv-head'), root);
  const g = root.querySelector('.wv3-slits'), H = 600, h = H / SLITS, NS = 'http://www.w3.org/2000/svg';
  g.replaceChildren();
  const rects = Array.from({ length: SLITS }, (_, i) => {
    const r = document.createElementNS(NS, 'rect');
    r.setAttribute('x', 0); r.setAttribute('y', (i * h).toFixed(2)); r.setAttribute('width', 1024); r.setAttribute('height', 0);
    g.append(r); return r;
  });
  const labels = [...root.querySelectorAll('.wv3-l')];
  const setLabel = after => labels.forEach(l => l.classList.toggle('is-on', (l.dataset.l === 'after') === after));
  const tl = gsap.timeline({ onUpdate() { setLabel(this.progress() >= 0.5); }, // the scrubbed progress, so the label meets the blinds
    scrollTrigger: { trigger: root.querySelector('.wv3-frame'), start: 'top 70%', end: 'bottom 35%', scrub: c.wide ? 2.2 : 1, invalidateOnRefresh: true } });
  rects.forEach((r, i) => tl.to(r, { attr: { height: h + 0.6 }, duration: 0.4, ease: 'none' }, i * 0.02));
}

export default { 1: tiles, 2: push, 3: blinds };
