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
  let cur = 0, held = !c.motion, seen = false, keyed = false;
  const run = () => { bars[cur].style.animationPlayState = c.motion && !held && seen && !keyed ? 'running' : 'paused'; pause.setAttribute('aria-pressed', String(held)); };
  const go = i => {
    cur = (i + items.length) % items.length;
    items.forEach((it, k) => { const on = k === cur; it.classList.toggle('is-visible', on); it.inert = !on; });
    tabs.forEach((t, k) => { t.setAttribute('aria-selected', String(k === cur)); t.tabIndex = k === cur ? 0 : -1; bars[k].classList.remove('is-animating'); bars[k].classList.toggle('is-done', k < cur); bars[k].style.animationPlayState = ''; });
    if (c.motion) { void bars[cur].offsetWidth; bars[cur].classList.add('is-animating'); }
    run();
  };
  const onIter = e => { if (e.target === bars[cur]) go(cur + 1); };
  const onClick = e => { const t = e.target.closest('.hw2-tab'); if (t) { go(tabs.indexOf(t)); return; } if (e.target.closest('.hw2-pause')) { held = !held; run(); } };
  const KEYS = { ArrowRight: 1, ArrowLeft: -1, Home: 'first', End: 'last' };
  const onKey = e => { const k = KEYS[e.key]; if (k === undefined) return; e.preventDefault(); go(k === 'first' ? 0 : k === 'last' ? items.length - 1 : cur + k); tabs[cur].focus(); };
  const onFocus = e => { keyed = !!(e.target.matches && e.target.matches(':focus-visible')); run(); };
  const onBlur = e => { if (!list.contains(e.relatedTarget)) { keyed = false; run(); } };
  list.addEventListener('animationiteration', onIter); root.addEventListener('click', onClick); list.addEventListener('keydown', onKey); list.addEventListener('focusin', onFocus); list.addEventListener('focusout', onBlur);
  const io = new IntersectionObserver(([e]) => { seen = e.isIntersecting; run(); }, { threshold: 0.35 }); io.observe(story);
  go(0);
  if (c.motion) beats(root, [root.querySelector('.hw-h'), root.querySelector('.hw-note'), story]);
  return () => { io.disconnect(); list.removeEventListener('animationiteration', onIter); root.removeEventListener('click', onClick); list.removeEventListener('keydown', onKey); list.removeEventListener('focusin', onFocus); list.removeEventListener('focusout', onBlur); };
}

// v3 (v2 audit, rebuilt layout) [BANK] Q409 Grow My Business process (CROWN): numbered steps, each naming what the
// customer gets as deliverable chips; reveals trail the scroll by a hair (scrub 0.2, start "top bottom-=10%"). With
// [BANK] Q411 NVRMND (three verbs are the whole process) and [BANK] Signal-A case-study index rows (the list is the
// design: a small label beside a giant line whose weight changes inside the line). [BANK] S18 SVG scroll hairlines:
// each row's ridge-cap rule draws itself scrubbed, linear (scrubbed motion is always linear). Each verb is a real link
// with its own drawn tool (R28: hover readies it, press uses it); hover also runs a sun overstroke along the row's ridge.
function verbs(root, c) {
  const rows = [...root.querySelectorAll('.hw3-row')];
  const over = rows.map(r => r.querySelector('.hw3-ro'));
  gsap.set(over, { drawSVG: '0%' });
  rows.forEach((row, i) => {
    const a = row.querySelector('.hw3-act');
    const on = () => gsap.to(over[i], { drawSVG: '0% 100%', duration: c.motion ? 0.3 : 0, ease: EASE, overwrite: 'auto' });
    const off = () => gsap.to(over[i], { drawSVG: '0%', duration: c.motion ? 0.22 : 0, ease: 'power2.out', overwrite: 'auto' });
    a.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') on(); }); a.addEventListener('pointerleave', off);
    a.addEventListener('focus', on); a.addEventListener('blur', off);
  });
  if (!c.motion) return () => {};
  beats(root, [root.querySelector('.hw-h'), root.querySelector('.hw-note')]);
  const tweens = [];
  rows.forEach(row => {
    const rule = row.querySelectorAll('.hw3-rl, .hw3-rt'), body = [row.querySelector('.hw3-n'), row.querySelector('.hw3-line'), row.querySelector('.hw3-chips')];
    tweens.push(gsap.fromTo(rule, { drawSVG: '0%' }, { drawSVG: '0% 100%', ease: 'none', scrollTrigger: { trigger: row, start: 'top bottom-=10%', end: 'top 55%', scrub: 0.2 } }));
    tweens.push(gsap.fromTo(body, { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: 'none', stagger: 0.08, scrollTrigger: { trigger: row, start: 'top bottom-=10%', end: 'top 60%', scrub: 0.2 } }));
  });
  return () => tweens.forEach(t => { if (t.scrollTrigger) t.scrollTrigger.kill(); t.kill(); });
}

export default { 1: spine, 2: pager, 3: verbs };
