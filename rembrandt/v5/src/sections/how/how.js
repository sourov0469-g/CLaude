// HOW (PLAN-V7 §6). Facts only: call Rachel (Monday to Friday, 9 to 5); a written, line-by-line estimate; the roof
// (Owens Corning Platinum Preferred, $2M liability insurance). No durations, prices or guarantees are invented.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EASE, beats } from '../../js/fx.js';
import { parallax } from '../../js/depth.js';

// v1 ⟦S1325⟧ scroll-progress-timeline: a real <ol>; one line runs from the first step's dot centre to the last; the
// fill scales with normalized progress = (anchor - lineStart) / (lineEnd - lineStart), clamped, written in one rAF;
// a step activates as the head crosses it (aria-current="step"); inactive steps stay readable; left rail on phones;
// geometry re-measured on resize and font load. Adapted: the line is a downspout fed by a gutter; water fills it as you
// read; the step markers are its hangers; a drop rides the head of the water. Reduced motion: discrete reached states.
function spine(root, c) {
  const body = root.querySelector('.hw1-body'), svg = root.querySelector('.hw1-pipe'), steps = [...root.querySelectorAll('.hw1-step')];
  const gut = svg.querySelector('.hw1-gut'), tube = svg.querySelector('.hw1-tube'), water = svg.querySelector('.hw1-water'), hang = svg.querySelector('.hw1-hangers'), drop = svg.querySelector('.hw1-drop');
  let g = { x: 40, y0: 0, y1: 1, ys: [] }, pending = false, p = -1;
  const W = 14;
  const measure = () => {
    const br = body.getBoundingClientRect(), w = svg.getBoundingClientRect().width, x = w * 0.5;
    const ys = steps.map(s => { const r = s.querySelector('.hw1-t').getBoundingClientRect(); return r.top - br.top + r.height / 2; });
    g = { x, y0: ys[0], y1: ys[ys.length - 1], ys };
    svg.setAttribute('viewBox', `0 0 ${w} ${br.height}`);
    // gutter run across the top, elbow into the downspout
    gut.setAttribute('d', `M${x + 34} ${ys[0] - 64} H${x - 30} M${x - 30} ${ys[0] - 64} v8 M${x + 34} ${ys[0] - 64} v8 M${x - 30} ${ys[0] - 56} H${x + 34}`);
    tube.setAttribute('d', `M${x - W / 2} ${ys[0] - 56} H${x + W / 2} V${g.y1 + 18} q0 10 10 12 h10 v10 h-14 q-16 -2 -16 -20 Z`);
    hang.innerHTML = ys.map(y => `<path d="M${x - W / 2 - 6} ${y} H${x + W / 2 + 6} M${x - W / 2 - 6} ${y - 5} V${y + 5} M${x + W / 2 + 6} ${y - 5} V${y + 5}"/>`).join('');
    p = -1; update();
  };
  const update = () => {
    pending = false;
    const br = body.getBoundingClientRect(), anchor = innerHeight * 0.55 - br.top;
    const k = c.motion ? gsap.utils.clamp(0, 1, (anchor - g.y0) / (g.y1 - g.y0)) : null;
    const reached = steps.map((s, i) => (c.motion ? anchor >= g.ys[i] - 2 : anchor >= g.ys[i] - innerHeight * 0.1));
    const q = c.motion ? k : (reached.lastIndexOf(true) / (steps.length - 1));
    if (q === p) return; p = q;
    const yHead = g.y0 + (g.y1 - g.y0) * Math.max(0, q);
    water.setAttribute('d', `M${g.x - W / 2 + 3} ${g.y0 - 56 + 3} H${g.x + W / 2 - 3} V${yHead} H${g.x - W / 2 + 3} Z`);
    drop.setAttribute('transform', `translate(${g.x} ${yHead + 8})`); drop.style.opacity = q > 0.002 && q < 0.998 ? 1 : 0;
    const last = reached.lastIndexOf(true);
    steps.forEach((s, i) => { if (i === last) s.setAttribute('aria-current', 'step'); else s.removeAttribute('aria-current'); s.classList.toggle('is-past', i < last); });
    [...hang.children].forEach((h, i) => h.classList.toggle('is-on', reached[i]));
  };
  const onScroll = () => { if (!pending) { pending = true; requestAnimationFrame(update); } };
  const ro = new ResizeObserver(measure); ro.observe(body); measure();
  if (document.fonts) document.fonts.ready.then(() => root.isConnected && measure());
  addEventListener('scroll', onScroll, { passive: true });
  if (c.motion) { beats(root, [root.querySelector('.hw-h'), root.querySelector('.hw-note')]); parallax(root); } // the rain layer drifts with scroll
  return () => { ro.disconnect(); removeEventListener('scroll', onScroll); };
}

// v2 [BANK] UZIK story pager (deep read 221; live CSS read: .diapo__item / .story__pager-progress) + [BANK] P74: the
// steps are stacked; the visible one crossfades in (opacity 0.4s cubic-bezier(0.25,0.1,0.25,1)); in the pager, past bars
// are full (.is-done) and the current one runs storyPagerProgress 5s linear infinite (.is-animating), and that run IS the
// dwell: the step advances on animationiteration, so timing lives in one place; chrome on the house curve
// (0.86,0.1,0.14,0.9) at 300ms. Adapted: three drawn roofing scenes for the three real steps, each playing as it shows;
// tabs are real tabs (arrow keys, aria-selected, inactive panels inert); a pause button (WCAG 2.2.2); the dwell holds while
// a tab has keyboard focus and while the story is off screen. Not pinned, nothing sticky. Reduced motion: no autoplay.
function pager(root, c) {
  const tabs = [...root.querySelectorAll('.hw2-tab')], items = [...root.querySelectorAll('.hw2-item')], bars = tabs.map(t => t.querySelector('.hw2-prog'));
  const pause = root.querySelector('.hw2-pause'), list = root.querySelector('.hw2-tabs'), story = root.querySelector('.hw2-story');
  let cur = 0, held = !c.motion, seen = false, keyed = false, over = false;
  // R3 F5-V2: hover or focus on the story pauses it; choosing a tab stops the timer for good (the pause shows it)
  const run = () => { bars[cur].style.animationPlayState = c.motion && !held && seen && !keyed && !over ? 'running' : 'paused'; pause.setAttribute('aria-pressed', String(held)); pause.setAttribute('aria-label', held ? 'Play the steps' : 'Pause the steps'); };
  const go = i => {
    cur = (i + items.length) % items.length;
    items.forEach((it, k) => { const on = k === cur; it.classList.toggle('is-visible', on); it.inert = !on; });
    tabs.forEach((t, k) => { t.setAttribute('aria-selected', String(k === cur)); t.tabIndex = k === cur ? 0 : -1; bars[k].classList.remove('is-animating'); bars[k].classList.toggle('is-done', k < cur); bars[k].style.animationPlayState = ''; });
    if (c.motion) { void bars[cur].offsetWidth; bars[cur].classList.add('is-animating'); }
    run();
  };
  const onIter = e => { if (e.target === bars[cur]) go(cur + 1); };
  const onClick = e => { const t = e.target.closest('.hw2-tab'); if (t) { held = true; go(tabs.indexOf(t)); return; } if (e.target.closest('.hw2-pause')) { held = !held; run(); } };
  const onIn = e => { if (e.pointerType === 'mouse') { over = true; run(); } }, onOut = () => { over = false; run(); };
  story.addEventListener('pointerenter', onIn); story.addEventListener('pointerleave', onOut);
  const KEYS = { ArrowRight: 1, ArrowLeft: -1, Home: 'first', End: 'last' };
  const onKey = e => { const k = KEYS[e.key]; if (k === undefined) return; e.preventDefault(); held = true; go(k === 'first' ? 0 : k === 'last' ? items.length - 1 : cur + k); tabs[cur].focus(); };
  const onFocus = e => { keyed = !!(e.target.matches && e.target.matches(':focus-visible')); run(); };
  const onBlur = e => { if (!list.contains(e.relatedTarget)) { keyed = false; run(); } };
  list.addEventListener('animationiteration', onIter); root.addEventListener('click', onClick); list.addEventListener('keydown', onKey); list.addEventListener('focusin', onFocus); list.addEventListener('focusout', onBlur);
  const io = new IntersectionObserver(([e]) => { seen = e.isIntersecting; run(); }, { threshold: 0.35 }); io.observe(story);
  go(0);
  if (c.motion) beats(root, [root.querySelector('.hw-h'), root.querySelector('.hw-note'), story]);
  return () => { io.disconnect(); story.removeEventListener('pointerenter', onIn); story.removeEventListener('pointerleave', onOut); list.removeEventListener('animationiteration', onIter); root.removeEventListener('click', onClick); list.removeEventListener('keydown', onKey); list.removeEventListener('focusin', onFocus); list.removeEventListener('focusout', onBlur); };
}

// v3 (R3 F5 fixed; v2 audit layout) [BANK] Q409 Grow My Business process (CROWN): numbered steps, each naming what the
// customer gets as deliverable chips; reveals trail the scroll by a hair (scrub 0.2, start "top bottom-=10%"). With
// [BANK] Q411 NVRMND (three verbs are the whole process) and [BANK] Signal-A case-study index rows (the list is the
// design: a small label beside a giant line whose weight changes inside the line). [BANK] S18 SVG scroll hairlines:
// each row's ridge-cap rule draws itself scrubbed, linear (scrubbed motion is always linear). Each verb is a real link
// with its own drawn tool (R28: hover readies it, press uses it); hover also runs a sun overstroke along the row's ridge.
function verbs(root, c) {
  // R3 F5: lines rest at full ink; the emphasis is the ridge filling sun (300ms). The active row is the one nearest the
  // viewport centre (it advances as you read; no timer, S1314 §8), or the hovered/focused one while that lasts.
  const rows = [...root.querySelectorAll('.hw3-row')], over = rows.map(r => r.querySelector('.hw3-ro'));
  gsap.set(over, { drawSVG: '0%' });
  let read = -1, held = -1, shown = -1;
  const paint = () => {
    const k = held >= 0 ? held : read; if (k === shown) return; shown = k;
    over.forEach((o, i) => gsap.to(o, i === k ? { drawSVG: '0% 100%', duration: c.motion ? 0.3 : 0, ease: EASE, overwrite: 'auto' } : { drawSVG: '0%', duration: c.motion ? 0.22 : 0, ease: 'power2.out', overwrite: 'auto' }));
  };
  const ls = [];
  rows.forEach((row, i) => {
    const on = e => { if (e.type === 'focusin' || e.pointerType === 'mouse') { held = i; paint(); } }, off = () => { if (held === i) { held = -1; paint(); } };
    row.addEventListener('pointerenter', on); row.addEventListener('pointerleave', off); row.addEventListener('focusin', on); row.addEventListener('focusout', off);
    ls.push(() => { row.removeEventListener('pointerenter', on); row.removeEventListener('pointerleave', off); row.removeEventListener('focusin', on); row.removeEventListener('focusout', off); });
  });
  const st = ScrollTrigger.create({ trigger: root.querySelector('.hw3-rows'), start: 'top 70%', end: 'bottom 30%', onUpdate: () => {
    const mid = innerHeight / 2; let best = -1, d = 1e9; rows.forEach((r, i) => { const b = r.getBoundingClientRect(), m = Math.abs(b.top + b.height / 2 - mid); if (m < d) { d = m; best = i; } }); read = best; paint();
  }, onLeave: () => { read = -1; paint(); }, onLeaveBack: () => { read = -1; paint(); } });
  ls.push(() => st.kill());
  const cleanup = () => ls.forEach(f => f());
  if (!c.motion) return cleanup;
  beats(root, [root.querySelector('.hw-h'), root.querySelector('.hw-note')]);
  // the rules draw and the rows enter once (y 8 + opacity, 40ms apart)
  rows.forEach(row => {
    const rule = row.querySelectorAll('.hw3-rl, .hw3-rt'), body = [row.querySelector('.hw3-n'), row.querySelector('.hw3-act'), row.querySelector('.hw3-chips')];
    gsap.set(rule, { drawSVG: '0%' }); gsap.set(body, { autoAlpha: 0 });
    const t = ScrollTrigger.create({ trigger: row, start: 'top 88%', once: true, onEnter: () => {
      gsap.to(rule, { drawSVG: '0% 100%', duration: 0.5, ease: EASE });
      gsap.fromTo(body, { y: 8, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.3, ease: EASE, stagger: 0.04, clearProps: 'transform' });
    } });
    ls.push(() => t.kill());
  });
  return cleanup;
}

// v4 (R3, new): ⟦S0441⟧ gsap-scrolltrigger-storytelling: one artefact held in view (CSS sticky) while its states are
// revealed per label. Each step's ScrollTrigger (centre line) sets data-st on the root; CSS crossfades the house's layers
// in 200ms (phone at the door rings once; measuring lines; new courses lay, 50ms apart). Steps enter once.
function house(root, c) {
  const steps = [...root.querySelectorAll('.hw4-step')], cs = [...root.querySelectorAll('.hw4-courses > *')];
  cs.forEach((el, i) => { el.style.transitionDelay = `${i * 0.05}s`; });
  if (!c.motion) { root.dataset.st = '3'; return; }
  const set = i => { root.dataset.st = String(i + 1); steps.forEach((s, k) => s.classList.toggle('is-on', k === i)); };
  const sts = steps.map((s, i) => ScrollTrigger.create({ trigger: s, start: 'top center', end: 'bottom center', onToggle: t => { if (t.isActive) set(i); } }));
  set(0);
  beats(root, [root.querySelector('.hw-h'), root.querySelector('.hw-note')]);
  return () => sts.forEach(t => t.kill());
}

// v5 (R3, new): three artefacts (pack G-how (b); S0095 the subject's artefacts; S1314 product truth). The panels enter once,
// 60ms apart; the sheet's ruled lines then draw left to right, 40ms apart (DrawSVG .3s).
function artefacts(root, c) {
  if (!c.motion) return;
  const items = root.querySelectorAll('.hw5-a'), lines = root.querySelectorAll('.hw5-hd, .hw5-ln, .hw5-sg');
  gsap.set(items, { autoAlpha: 0 }); gsap.set(lines, { drawSVG: '0%' });
  beats(root, [root.querySelector('.hw-h')]);
  const st = ScrollTrigger.create({ trigger: root.querySelector('.hw5-row'), start: 'top 82%', once: true, onEnter: () => {
    gsap.fromTo(items, { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.3, ease: EASE, stagger: 0.06, clearProps: 'transform' });
    gsap.to(lines, { drawSVG: '100%', duration: 0.3, ease: EASE, stagger: 0.04, delay: 0.25 });
  } });
  return () => st.kill();
}

// R4 v6 (new) The drive over: three stops along a drawn road; picking one drives the truck there (a .6s tween along the
// path via getPointAtLength), the travelled road fills in accent and that step's card shows. Reduced motion: it jumps.
function drive(root, c) {
  const road = root.querySelector('.hw6-road'), done = root.querySelector('.hw6-done'), tk = root.querySelector('.hw6-truck');
  const pins = [...root.querySelectorAll('.hw6-pin')], btn = [...root.querySelectorAll('.hw6-stop')], cards = [...root.querySelectorAll('.hw6-card')];
  const L = road.getTotalLength(), at = [0.02, 0.5, 0.98].map(f => f * L), pos = { l: at[0] };
  pins.forEach((p, i) => { const q = road.getPointAtLength(at[i]); p.setAttribute('transform', `translate(${q.x} ${q.y + 30})`); });
  done.style.strokeDasharray = `${L} ${L}`;
  const place = () => { const q = road.getPointAtLength(pos.l); tk.setAttribute('transform', `translate(${q.x} ${q.y})`); done.style.strokeDashoffset = String(L - pos.l); };
  let tw; const go = i => {
    btn.forEach((b, j) => b.setAttribute('aria-pressed', String(j === i))); cards.forEach((k, j) => { k.hidden = j !== i; });
    pins.forEach((p, j) => p.classList.toggle('is-on', j <= i));
    tw?.kill(); if (c.motion) tw = gsap.to(pos, { l: at[i], duration: 0.6, ease: EASE, onUpdate: place }); else { pos.l = at[i]; place(); }
  };
  place(); pins[0].classList.add('is-on');
  const on = e => { const b = e.target.closest('.hw6-stop'); if (b) go(+b.dataset.i); };
  root.addEventListener('click', on);
  if (c.motion) beats(root, [root.querySelector('.hw6-head')]);
  return () => { root.removeEventListener('click', on); tw?.kill(); };
}
// R4 v7 (new) The work order: a tablist over three carbon copies; arrows, Home and End move between tabs; the new sheet
// drops in from the top edge (.24s) like a page torn off the pad
function order(root, c) {
  const tabs = [...root.querySelectorAll('.hw7-tab')], sh = [...root.querySelectorAll('.hw7-sheet')];
  const show = (i, focus) => {
    tabs.forEach((t, j) => { t.setAttribute('aria-selected', String(j === i)); t.tabIndex = j === i ? 0 : -1; }); sh.forEach((s, j) => { s.hidden = j !== i; });
    if (focus) tabs[i].focus();
    if (c.motion) gsap.fromTo(sh[i], { y: -18, rotate: -1.2, autoAlpha: 0 }, { y: 0, rotate: 0, autoAlpha: 1, duration: 0.24, ease: 'power2.out', clearProps: 'transform' });
  };
  const on = e => { const t = e.target.closest('.hw7-tab'); if (t) show(tabs.indexOf(t)); };
  const key = e => { const i = tabs.indexOf(e.target); if (i < 0) return; const n = tabs.length;
    const j = { ArrowRight: (i + 1) % n, ArrowLeft: (i - 1 + n) % n, Home: 0, End: n - 1 }[e.key]; if (j === undefined) return; e.preventDefault(); show(j, true); };
  root.addEventListener('click', on); root.addEventListener('keydown', key);
  if (c.motion) beats(root, [root.querySelector('.hw7-head'), root.querySelector('.hw7-pad')]);
  return () => { root.removeEventListener('click', on); root.removeEventListener('keydown', key); };
}
// R4 v8 (new) Up the slope: the three steps rise in order, low to high, 120ms apart; the ridge cap draws last (DrawSVG)
function slope(root, c) {
  if (!c.motion) return;
  beats(root, [root.querySelector('.hw8-head')]);
  const s = root.querySelectorAll('.hw8-s'), cap = root.querySelector('.hw8-cap');
  gsap.set(s, { autoAlpha: 0, y: 40 }); gsap.set(cap, { drawSVG: '0%' });
  const st = ScrollTrigger.create({ trigger: root.querySelector('.hw8-climb'), start: 'top 78%', once: true, onEnter: () =>
    gsap.timeline().to(s, { autoAlpha: 1, y: 0, duration: 0.3, ease: 'expo.out', stagger: 0.12 }).to(cap, { drawSVG: '100%', duration: 0.4, ease: EASE }, '-=0.1') });
  return () => st.kill();
}
export default { 1: spine, 2: pager, 3: verbs, 4: house, 5: artefacts, 6: drive, 7: order, 8: slope };
