// WORK. Real jobs only; ba2 is the one genuine before/after pair and only it is ever shown as before and after.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { img } from '../../js/main.js';
import { beats, EASE } from '../../js/fx.js';
import { horizontalLoop } from '../../js/hloop.js';

gsap.registerPlugin(Flip);

// v1 [BANK] Q361 horizontal-loop project tiles (GreenSock pen xxQaRoX, CROWN): the horizontalLoop helper with the pen's
// call config { paused: false, speed: 2 (200 px/s), center: true, repeat: -1, onChange }; the centre tile carries .is-on
// at full brightness, the rest brightness(0.7); onChange moves the caption; step buttons glide one tile
// (next/previous, 0.4s power1.inOut, the pen's values) and a tile click centres it (toIndex, 0.8s). No Draggable (Club;
// dropped per the entry). Adapted: the gap between tiles (24px) is carried as paddingRight so the seam stays even;
// a pause toggle (WCAG 2.2.2); autoplay only with motion allowed; the loop rests while off screen.
function tiles(root, c) {
  const strip = root.querySelector('.wv1-strip'), items = [...strip.children], cap = root.querySelector('.wv1-cap-t'), pause = root.querySelector('.wv1-pause');
  const pat = root.querySelector('#wv1-ticks'), sq = root.querySelector('.wv1-sq');
  let loop = null, held = !c.motion, seen = true, dead = false;
  if (c.motion) beats(root, [root.querySelector('.wv-h'), root.querySelector('.wv-note'), [strip, root.querySelector('.wv1-tape')], root.querySelector('.wv1-foot')]);
  const apply = () => { if (loop) loop.paused(held || !seen); pause.setAttribute('aria-pressed', String(held)); };
  const setCap = (el) => {
    items.forEach(t => t.classList.toggle('is-on', t === el));
    sq.style.transform = `rotate(${(-4 * items.indexOf(el)).toFixed(0)}deg)`; // the speed square turns with the job on show
    const txt = el.dataset.cap; if (cap.textContent === txt) return;
    cap.textContent = txt; cap.classList.remove('is-new'); void cap.offsetWidth; cap.classList.add('is-new');
  };
  const build = () => c.ctx.add(() => {
    if (dead || !root.isConnected) return;
    loop = horizontalLoop(items, { paused: true, speed: 2, center: true, repeat: -1, paddingRight: 24, onChange: setCap });
    ScrollTrigger.create({ trigger: root, start: 'top bottom', end: 'bottom top', onToggle: s => { seen = s.isActive; apply(); } });
    apply();
    // the tape's ticks travel with the track: offset the tick pattern by the first tile's x, modulo one inch (96px)
    const tick = () => { if (seen) pat.setAttribute('x', (gsap.getProperty(items[0], 'x') % 96).toFixed(1)); };
    gsap.ticker.add(tick); c.ctx.add(() => () => gsap.ticker.remove(tick));
  });
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(build);
  const step = { duration: c.motion ? 0.4 : 0, ease: 'power1.inOut' };
  const onClick = e => {
    if (!loop) return;
    const b = e.target.closest('.wv-btn'), t = e.target.closest('.wv1-tile');
    if (b === pause) { held = !held; apply(); return; }
    if (!b && !t) return;
    held = true; apply();
    if (b) { root.classList.remove('is-step'); void root.offsetWidth; root.classList.add('is-step'); loop.closestIndex(true); Number(b.dataset.dir) > 0 ? loop.next(step) : loop.previous(step); }
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
  if (c.motion) beats(root, [root.querySelector('.wv2-closed .wv-h'), root.querySelector('.wv2-closed .wv-note'), items]);
  // [BANK] Q147 Shape Hover (chevron preset, 300ms back-out), inverted into a roof line: a gable cap of the section's
  // colour lowers over the photo's top so the job sits under a drawn roof; the caption rises 50px -> 0 over 0.3s (CSS)
  const FLAT = ['M0 0 H180 V0 L90 0 L0 0 Z', 'M0 0 L90 0 L180 0'], GABLE = ['M0 0 H180 V96 L90 16 L0 96 Z', 'M0 96 L90 16 L180 96'];
  items.forEach(it => { const t = it.querySelector('.wv2-tag'); if (t) t.textContent = it.dataset.cap; });
  const roofCap = (it, on) => { const [f, l] = it.querySelectorAll('.wv2-gc path'), sh = on ? GABLE : FLAT; gsap.to(f, { attr: { d: sh[0] }, duration: c.motion ? (on ? 0.3 : 0.22) : 0, ease: on ? 'back.out(1.4)' : 'power2.out', overwrite: 'auto' }); gsap.to(l, { attr: { d: sh[1] }, duration: c.motion ? (on ? 0.3 : 0.22) : 0, ease: on ? 'back.out(1.4)' : 'power2.out', overwrite: 'auto' }); };
  const onOver = e => { const it = e.target.closest('.wv2-item'); if (it && !current && (e.type === 'focusin' || e.pointerType === 'mouse')) roofCap(it, true); };
  const onOut = e => { const it = e.target.closest('.wv2-item'); if (it && (!e.relatedTarget || !it.contains(e.relatedTarget))) roofCap(it, false); };
  grid.addEventListener('pointerover', onOver); grid.addEventListener('pointerout', onOut); grid.addEventListener('focusin', onOver); grid.addEventListener('focusout', onOut);
  let current = null, busy = null;
  const DIRS = ['pos-north', 'pos-south', 'pos-west', 'pos-east'];
  const flip = state => {
    if (busy) busy.progress(1);
    busy = Flip.from(state, { duration: c.motion ? 0.9 : 0, ease: 'expo', scale: true, prune: true, onComplete: () => { busy = null; } });
  };
  function show(item) {
    gsap.to(item.querySelectorAll('.wv2-gc'), { yPercent: -60, opacity: 0, duration: c.motion ? 0.25 : 0, ease: 'power2.out', onComplete: () => { gsap.set(item.querySelectorAll('.wv2-gc'), { clearProps: 'all' }); roofCap(item, false); } }); // the roof lifts off
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
  return () => { root.removeEventListener('click', onClick); root.removeEventListener('keydown', onKey); grid.removeEventListener('pointerover', onOver); grid.removeEventListener('pointerout', onOut); grid.removeEventListener('focusin', onOver); grid.removeEventListener('focusout', onOut); };
}

// v3 [BANK] Q38 SVG Mask Transitions on Scroll, horizontal blinds (Codrops; L2-measured values): slits opening in a
// scrubbed stagger (0.02), scrub 2.0 to 2.5 on desktop and about 1 on phones, crispEdges, mask rebuilt on resize, not
// pinned. V7 adaptation: the slits are shingle courses and they go on bottom to top, the order a roofer lays them.
// Each course unrolls from its top line down to a 3-tab bottom edge (keyway slots every half tab, offset each course),
// so the leading edge you watch is a real shingle edge; the after photo is "re-roofed" over the before photo as you
// scroll. A small hammer rides the course going on. Labels switch at half. Reduced motion: the pair side by side.
const COURSES = 16, TAB = 128;
function blinds(root, c) {
  const before = root.querySelector('.wv3-before'), after = root.querySelector('.wv3-after');
  before.setAttribute('href', img(before.dataset.fill)); after.setAttribute('href', img(after.dataset.fill));
  const pair = root.querySelector('.wv3-pair'), ham = root.querySelector('.wv3-ham');
  if (!c.motion) { root.classList.add('is-still'); pair.hidden = false; return () => { root.classList.remove('is-still'); pair.hidden = true; }; }
  beats(root, [root.querySelector('.wv-h'), root.querySelector('.wv-note'), root.querySelector('.wv3-stage')]);
  const g = root.querySelector('.wv3-slits'), H = 600, h = H / COURSES, nd = h * 0.5, kw = 6, NS = 'http://www.w3.org/2000/svg';
  g.replaceChildren();
  const course = i => { // top line -> 3-tab bottom edge with keyway slots, overlapping the course below by nd
    const y0 = i * h, y1 = y0 + h + nd, off = i % 2 ? TAB / 2 : 0;
    let d = `M0 ${y0.toFixed(1)}H1024V${y1.toFixed(1)}`;
    for (let x = 1024 - ((1024 - off) % TAB || TAB); x > 0; x -= TAB) d += `H${(x + kw / 2).toFixed(1)}V${(y1 - nd).toFixed(1)}H${(x - kw / 2).toFixed(1)}V${y1.toFixed(1)}`;
    return d + `H0Z`;
  };
  const paths = Array.from({ length: COURSES }, (_, i) => { const p = document.createElementNS(NS, 'path'); p.setAttribute('d', course(i)); g.append(p); return p; });
  gsap.set(paths, { scaleY: 0, transformOrigin: '50% 0%' });
  const labels = [...root.querySelectorAll('.wv3-l')];
  const setLabel = after => labels.forEach(l => l.classList.toggle('is-on', (l.dataset.l === 'after') === after));
  const order = paths.slice().reverse(); // bottom course first
  const tl = gsap.timeline({ onUpdate() {
      const p = this.progress(); setLabel(p >= 0.5);
      // the hammer sits on the edge of the course going on, tapping as it goes
      const k = Math.min(COURSES - 1, Math.floor(p * COURSES)), y = (COURSES - k) * h - (p * COURSES - k) * 0, x = 940 - (p * COURSES - k) * 40;
      gsap.set(ham, { x, y: Math.max(16, y), rotation: Math.sin(p * COURSES * Math.PI * 2) * 14, svgOrigin: `${x + 8} ${y + 10}`, opacity: p > 0.985 || p < 0.01 ? 0 : 1 });
    },
    scrollTrigger: { trigger: root.querySelector('.wv3-frame'), start: 'top 70%', end: 'bottom 35%', scrub: c.wide ? 2.2 : 1, invalidateOnRefresh: true } });
  order.forEach((p, i) => tl.to(p, { scaleY: 1, duration: 0.4, ease: 'none' }, i * 0.4));
  gsap.set(ham, { opacity: 0 });
}

export default { 1: tiles, 2: push, 3: blinds };
