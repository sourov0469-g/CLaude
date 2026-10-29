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
    { const r = root.getBoundingClientRect(); seen = r.bottom > 0 && r.top < innerHeight; } // start state: onToggle only reports changes
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
    root.classList.remove('is-step'); void root.offsetWidth; root.classList.add('is-step'); // R16/R17 press: the tape hook snaps
    if (b) { loop.closestIndex(true); Number(b.dataset.dir) > 0 ? loop.next(step) : loop.previous(step); }
    else loop.toIndex(items.indexOf(t), { duration: c.motion ? 0.8 : 0, ease: 'power1.inOut' });
  };
  root.addEventListener('click', onClick);
  // bg: a lit band follows the pointer along the tape, strongest when the pointer is close to it
  const tape = root.querySelector('.wv1-tape'), glow = root.querySelector('.wv1-glow-m');
  let onMove = null, onLeave = null;
  if (c.fine && c.motion) {
    const gx = gsap.quickTo(glow, 'x', { duration: 0.3, ease: 'power3.out' });
    const go = gsap.quickTo(glow, 'opacity', { duration: 0.25, ease: 'power2.out' });
    onMove = e => { if (e.pointerType !== 'mouse') return; const r = tape.getBoundingClientRect(), d = Math.abs(e.clientY - (r.top + r.height / 2)); gx(e.clientX - r.left - 120); go(Math.max(0, 1 - d / 260)); };
    onLeave = () => go(0);
    gsap.set(glow, { opacity: 0 });
    root.addEventListener('pointermove', onMove); root.addEventListener('pointerleave', onLeave);
  }
  return () => { dead = true; if (loop) loop.destroy(); root.removeEventListener('click', onClick); if (onMove) { root.removeEventListener('pointermove', onMove); root.removeEventListener('pointerleave', onLeave); } };
}

// v2 [BANK] Q157 Push Animation on Grid Items (Codrops, demo 1; all three demo scripts read in the deep read; P80
// exact parameters): the layout is the animation data. The clicked photo's image moves into the inner area; the other
// items are pushed to the edges; Flip.from replays everything (duration 0.9, ease expo, scale true, prune true).
// v2 audit adaptation: six real jobs frame the title as a dense gallery wall (no empty cell), so the push is expressed
// on the grid tracks: opening switches the tracks (CSS .is-open) so the frame squeezes to thin edges around the opened
// photo. Caption and Close sit on the photo; focus moves to Close and back; Esc, Close or a click on the photo closes;
// reduced motion jumps without the flight.
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
  const flip = state => {
    if (busy) busy.progress(1);
    busy = Flip.from(state, { duration: c.motion ? 0.9 : 0, ease: 'expo', scale: true, prune: true, onComplete: () => { busy = null; } });
  };
  function show(item) {
    gsap.to(item.querySelectorAll('.wv2-gc'), { yPercent: -60, opacity: 0, duration: c.motion ? 0.25 : 0, ease: 'power2.out', onComplete: () => { gsap.set(item.querySelectorAll('.wv2-gc'), { clearProps: 'all' }); roofCap(item, false); } }); // the roof lifts off
    const pic = item.querySelector('img');
    const state = Flip.getState([...items, pic]);
    full.append(pic); item.style.zIndex = 99; current = item;
    root.classList.add('is-open'); full.setAttribute('aria-hidden', 'false');
    cap.textContent = item.dataset.cap; closed.hidden = true; open.hidden = false;
    flip(state);
    closeBtn.focus({ preventScroll: true });
  }
  function hide() {
    if (!current) return;
    const item = current, pic = full.querySelector('img');
    const state = Flip.getState([...items, pic]);
    item.append(pic);
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
  // Before / After buttons (PLAN-V7 Work V3): hover outlines the course that goes on first (bottom, for Before) or last
  // (top, for After); press lays or lifts every course in 0.3s and holds there until the reader scrolls again
  const hl = root.querySelector('.wv3-hl'), st = tl.scrollTrigger;
  let held = false;
  const SCROLL_KEYS = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '];
  const resume = () => { if (!held) return; held = false; off(); st.enable(false); };
  const onKey = e => { if (SCROLL_KEYS.includes(e.key) && !(e.target.closest && e.target.closest('button,a,input'))) resume(); };
  const off = () => { removeEventListener('wheel', resume); removeEventListener('touchstart', resume); removeEventListener('keydown', onKey); };
  const outline = b => { hl.setAttribute('d', course(b.dataset.l === 'after' ? 0 : COURSES - 1)); };
  const onOver = e => { const b = e.target.closest('.wv3-l'); if (b && (e.type === 'focusin' || e.pointerType === 'mouse')) { outline(b); hl.classList.add('is-on'); } };
  const onOut = e => { if (e.target.closest('.wv3-l')) hl.classList.remove('is-on'); };
  const onClick = e => {
    const b = e.target.closest('.wv3-l'); if (!b) return;
    outline(b); hl.classList.remove('is-flash'); void hl.getBBox(); hl.classList.add('is-flash');
    if (!held) { held = true; st.disable(false); addEventListener('wheel', resume, { passive: true }); addEventListener('touchstart', resume, { passive: true }); addEventListener('keydown', onKey); }
    gsap.to(tl, { progress: b.dataset.l === 'after' ? 1 : 0, duration: 0.3, ease: EASE, overwrite: true });
  };
  const box = root.querySelector('.wv3-labels');
  box.addEventListener('pointerover', onOver); box.addEventListener('pointerout', onOut); box.addEventListener('focusin', onOver); box.addEventListener('focusout', onOut); box.addEventListener('click', onClick);
  // bg: nail heads along the starter strip; within 150px of the pointer they lift off the strip and tip toward it
  const row = root.querySelector('.wv3-nailrow'), N = c.wide ? 22 : 12;
  row.replaceChildren(...Array.from({ length: N }, () => { const n = document.createElementNS(NS, 'svg'); n.setAttribute('class', 'wv3-nail'); n.setAttribute('viewBox', '-6 -6 12 12'); n.innerHTML = '<circle class="wv3-nail-h" r="4.6"/><path class="wv3-nail-g" d="M-2.6 -1.2 A2.8 2.8 0 0 1 -.6 -2.8"/>'; return n; }));
  let onMove = null, onLeave = null;
  if (c.fine) {
    const nails = [...row.children].map(n => ({ n, y: gsap.quickTo(n, 'y', { duration: 0.3, ease: 'power3.out' }), r: gsap.quickTo(n, 'rotation', { duration: 0.3, ease: 'power3.out' }), s: gsap.quickTo(n, 'scale', { duration: 0.3, ease: 'power3.out' }) }));
    let at = null; // each nail's centre x from the row's left edge (lifting and tipping about its centre never moves it)
    const measure = () => { const l = row.getBoundingClientRect().left; at = nails.map(o => { const r = o.n.getBoundingClientRect(); return r.left + r.width / 2 - l; }); };
    onMove = e => {
      if (e.pointerType !== 'mouse') return;
      if (!at) measure();
      const rr = row.getBoundingClientRect(), cy = rr.top + rr.height / 2;
      nails.forEach((o, i) => { const dx = e.clientX - rr.left - at[i], k = Math.max(0, 1 - Math.hypot(dx, e.clientY - cy) / 150) ** 2; o.y(-9 * k); o.s(1 + 0.35 * k); o.r(Math.max(-1, Math.min(1, dx / 60)) * 24 * k); });
    };
    onLeave = () => { at = null; nails.forEach(o => { o.y(0); o.s(1); o.r(0); }); };
    root.addEventListener('pointermove', onMove); root.addEventListener('pointerleave', onLeave);
  }
  return () => { off(); row.replaceChildren(); if (onMove) { root.removeEventListener('pointermove', onMove); root.removeEventListener('pointerleave', onLeave); } box.removeEventListener('pointerover', onOver); box.removeEventListener('pointerout', onOut); box.removeEventListener('focusin', onOver); box.removeEventListener('focusout', onOut); box.removeEventListener('click', onClick); };
}

export default { 1: tiles, 2: push, 3: blinds };
