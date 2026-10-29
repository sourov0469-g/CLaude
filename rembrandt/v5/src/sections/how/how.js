// HOW (PLAN-V7 §6). Facts only: call Rachel (Monday to Friday, 9 to 5); a written, line-by-line estimate; the roof
// (Owens Corning Platinum Preferred, $2M liability insurance). No durations, prices or guarantees are invented.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EASE, beats } from '../../js/fx.js';

const NS = 'http://www.w3.org/2000/svg';

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
  if (c.motion) beats(root, [root.querySelector('.hw-h'), root.querySelector('.hw-note')]);
  return () => { ro.disconnect(); removeEventListener('scroll', onScroll); };
}

// v2 ⟦S1340⟧ threejs-towers (a building that builds itself: one rising plane, finished work below it, bare framing above,
// stage captions naming the work as it passes, a quiet percentage in the corner), ported to SVG, with ⟦S1326⟧'s progress
// math (a sticky stage; state is a pure function of normalized progress, no implicit easing; copy stops 0 / 0.42 / 0.78).
// Adapted to the three real steps: 0 Rachel's phone rings over a bare frame; 0.42 the written estimate, where the roof's
// layers are named and come apart in CSS 3D so each line is a visible layer (3D earns its place here); 0.78 the roof is
// on. CSS sticky, not a GSAP pin (the only sticky stage on the page). Reduced motion: no sticky, the finished frame.
function build(root, c) {
  const track = root.querySelector('.hw2-track'), clip = root.querySelector('.hw2-clip'), line = root.querySelector('.hw2-line');
  const layers = [...root.querySelectorAll('.ly')], tags = [...root.querySelectorAll('.tag')], steps = [...root.querySelectorAll('.hw2-step')];
  const phone = root.querySelector('.hw2-phone'), pct = root.querySelector('.hw2-pct'), sun = root.querySelector('.hw2-sun'), arc = root.querySelector('.hw2-arc'), svg = root.querySelector('.hw2-svg');
  const L = arc.getTotalLength();
  const STOPS = [0, 0.42, 0.78];
  // the estimate's ghost: an unclipped outline copy of every layer that comes apart and is named before the build
  const solid = root.querySelector('.hw2-layers'), ghost = solid.cloneNode(true);
  ghost.removeAttribute('clip-path'); ghost.setAttribute('class', 'hw2-ghost'); solid.before(ghost);
  const ghosts = [...ghost.querySelectorAll('.ly')];
  root.__hwClean = () => ghost.remove();
  const render = p => {
    // copy stops
    const s = p >= STOPS[2] ? 2 : p >= STOPS[1] ? 1 : 0; steps.forEach((el, i) => el.classList.toggle('is-on', i === s));
    // phone over the bare frame for the first stop
    gsap.set(phone, { opacity: gsap.utils.clamp(0, 1, 1 - (p - 0.3) / 0.08), scale: 1 + 0.06 * Math.sin(p * 60) * (p < 0.3 ? 1 : 0), svgOrigin: '400 250' });
    // tags (the estimate's lines) light up one by one between 0.3 and 0.42, and stay
    tags.forEach((t, i) => t.classList.toggle('is-on', p >= 0.3 + i * 0.03));
    // the explode: the ghost layers come apart (translateY in SVG units, depth by CSS 3D) around the estimate stop
    const ex = gsap.utils.clamp(0, 1, Math.min((p - 0.28) / 0.12, (0.6 - p) / 0.08));
    ghosts.forEach((ly, i) => gsap.set(ly, { y: -ex * (i + 1) * 28, z: ex * (i + 1) * 30 }));
    gsap.set(ghost, { opacity: gsap.utils.clamp(0, 1, Math.min((p - 0.26) / 0.04, (0.86 - p) / 0.06)) });
    gsap.set(svg, { rotationX: ex * 12 });
    // build: the line rises from the ground to above the ridge between 0.55 and 0.85; finished work below it
    const b = gsap.utils.clamp(0, 1, (p - 0.55) / 0.3), y = 560 - b * 500;
    clip.setAttribute('y', y.toFixed(1)); line.setAttribute('transform', `translate(0 ${(y - 560).toFixed(1)})`); line.style.opacity = b > 0 && b < 1 ? 1 : 0;
    // the sun walks its arc with the whole sequence; the corner percentage
    const pt = arc.getPointAtLength(L * p); sun.setAttribute('cx', pt.x.toFixed(1)); sun.setAttribute('cy', pt.y.toFixed(1));
    pct.textContent = Math.round(p * 100) + '%';
  };
  if (!c.motion) { render(1); return () => root.__hwClean(); }
  render(0);
  ScrollTrigger.create({ trigger: track, start: 'top top', end: 'bottom bottom', scrub: true, onUpdate: s => render(s.progress), onRefresh: s => render(s.progress) });
  return () => root.__hwClean();
}

// v3 [BANK] Q409 Grow My Business process (CROWN: numbered steps, each naming what the customer gets as deliverable
// chips; reveals trail the scroll, scrub 0.2, start "top bottom-=10%", 0.6s power3.out, compressed to 0.3s by F17), with
// [BANK] Q411 NVRMND three verbs (Map/Make/Move with a hand-drawn SVG icon set) and [BANK] Q91 animated SVG icons
// (from -> to steps at 200ms, bound to click/tap, never hover-only). Adapted: Call. Estimate. Roof. Each verb is a real
// link with its own drawn tool (handset, folding rule, hammer and nail); hover readies it, press uses it. A roofer's
// ladder joins the columns; its rungs light as each column scrolls in.
function verbs(root, c) {
  const lad = root.querySelector('.hw3-ladder'), rungs = lad.querySelector('.hw3-rungs'), cols = [...root.querySelectorAll('.hw3-col')], rail = lad.querySelector('.hw3-rail');
  const draw = () => {
    const narrow = innerWidth <= 900;
    if (narrow) { lad.setAttribute('viewBox', '0 0 80 1000'); rail.setAttribute('d', 'M18 0 V1000 M62 0 V1000'); }
    else { lad.setAttribute('viewBox', '0 0 1000 80'); rail.setAttribute('d', 'M0 18 H1000 M0 62 H1000'); }
    rungs.innerHTML = Array.from({ length: 15 }, (_, i) => { const t = 20 + i * 68; return narrow ? `<path d="M18 ${t} H62"/>` : `<path d="M${t} 18 V62"/>`; }).join('');
  };
  draw(); const ro = new ResizeObserver(draw); ro.observe(root);
  const light = n => [...rungs.children].forEach((r, i) => r.classList.toggle('is-on', i < n * 5));
  if (!c.motion) { light(3); return () => ro.disconnect(); }
  beats(root, [root.querySelector('.hw-h'), root.querySelector('.hw-note')]);
  cols.forEach((col, i) => {
    gsap.fromTo(col.children, { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.3, ease: EASE, stagger: 0.06, clearProps: 'transform,opacity,visibility', scrollTrigger: { trigger: col, start: 'top bottom-=10%', once: true } });
    ScrollTrigger.create({ trigger: col, start: 'top 70%', onEnter: () => light(i + 1), onLeaveBack: () => light(i) });
  });
  return () => ro.disconnect();
}

export default { 1: spine, 2: build, 3: verbs };
