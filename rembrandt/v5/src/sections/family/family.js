// FAMILY (PLAN-V7 §6). Facts only: founded 1995 by Franklin "Bunk" Walker; his son Wade, president since 2015; Rachel
// answers the phone, Monday to Friday, 9 to 5; BBB A+ since 2001; Owens Corning Platinum Preferred; 38 N Pioneer Blvd.
// No quotes (none exist) and no portraits (nobody in the crew photo is identified).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { img } from '../../js/main.js';
import { EASE, beats } from '../../js/fx.js';
import { parallax } from '../../js/depth.js';

const visible = (el, fn) => { const io = new IntersectionObserver(([e]) => fn(e.isIntersecting), { rootMargin: '100px' }); io.observe(el); return () => io.disconnect(); };

// v1 [BANK] Q95 Masked Heading (React Bits; reduced motion verified in source): heading letters are windows onto a photo
// (an SVG clipPath of the glyphs); the photo drifts idly (dx = sin(t*0.21)*18, dy = cos(t*0.17)*18*0.6) and answers the
// pointer (parallax 26), smoothed 1 - exp(-dt/0.18); a spotlight (radius 160, smootherstep) follows the pointer with
// tau 0.12 on hover and 0.6 when idle. F17 caps the rise at 0.3s. Adapted: WALKER, filled with the crew, standing under
// drawn roof framing (rafters, collar tie, king post, ridge board, a sun-coloured top plate): the name under the roof.
function masked(root, c) {
  const svg = root.querySelector('.fm1-name'), im = root.querySelector('.fm1-img'), spot = root.querySelector('.fm1-spot');
  im.setAttribute('href', img(im.dataset.fill));
  const done = [];
  const cleanup = () => done.forEach(f => f());
  if (!c.motion) return cleanup;
  beats(root, [root.querySelector('.fm1-frame'), root.querySelector('.fm1-h'), root.querySelectorAll('.fm1-facts li'), [root.querySelector('.fm1-call'), root.querySelector('.fm1-photo')]]);
  // R3 P7 (S1325): the facts' rail fills sun as the list passes through the view
  const facts = root.querySelector('.fm1-facts'); facts.style.setProperty('--rail', 0);
  ScrollTrigger.create({ trigger: facts, start: 'top 85%', end: 'bottom 55%', scrub: true, onUpdate: s => facts.style.setProperty('--rail', s.progress.toFixed(3)) });
  gsap.timeline({ scrollTrigger: { trigger: svg, start: 'top 82%', once: true } })
    .fromTo(root.querySelectorAll('.fm1-frame path, .fm1-frame rect'), { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.3, ease: EASE, stagger: 0.05 }, 0)
    .fromTo([im, root.querySelector('.fm1-under')], { y: 60 }, { y: 0, duration: 0.3, ease: EASE }, 0.1);
  const st = { x: 0, y: 0, tx: 0, ty: 0, sx: 600, sy: 300, stx: 600, sty: 300, hover: false };
  const pt = svg.createSVGPoint();
  const onMove = e => {
    if (e.pointerType !== 'mouse') return;
    const r = svg.getBoundingClientRect(); st.tx = -((e.clientX - r.left) / r.width - 0.5) * 2 * 26; st.ty = -((e.clientY - r.top) / r.height - 0.5) * 2 * 26;
    const m = svg.getScreenCTM(); if (!m) return; pt.x = e.clientX; pt.y = e.clientY; const p = pt.matrixTransform(m.inverse()); st.stx = p.x; st.sty = p.y; st.hover = true;
  };
  const onLeave = () => { st.tx = st.ty = 0; st.hover = false; };
  root.addEventListener('pointermove', onMove, { passive: true }); root.addEventListener('pointerleave', onLeave);
  let raf = 0, last = 0, inView = false, t0 = performance.now();
  const frame = t => {
    raf = 0; if (!inView || document.hidden) return;
    const dt = Math.min(1 / 30, (t - last) / 1000 || 1 / 60); last = t; const s = (t - t0) / 1000;
    const k = 1 - Math.exp(-dt / 0.18);
    st.x += (st.tx + Math.sin(s * 0.21) * 18 - st.x) * k; st.y += (st.ty + Math.cos(s * 0.17) * 10.8 - st.y) * k;
    if (!st.hover) { st.stx = 600 + Math.sin(s * 0.3) * 380; st.sty = 300 + Math.cos(s * 0.23) * 60; }
    const ks = 1 - Math.exp(-dt / (st.hover ? 0.12 : 0.6));
    st.sx += (st.stx - st.sx) * ks; st.sy += (st.sty - st.sy) * ks;
    im.setAttribute('x', (-60 + st.x).toFixed(1)); im.setAttribute('y', (-330 + st.y).toFixed(1));
    spot.setAttribute('cx', st.sx.toFixed(1)); spot.setAttribute('cy', st.sy.toFixed(1));
    raf = requestAnimationFrame(frame);
  };
  const wake = () => { if (!raf && inView && !document.hidden) { last = performance.now(); raf = requestAnimationFrame(frame); } };
  done.push(visible(svg, v => { inView = v; if (v) wake(); }));
  const onVis = () => wake(); document.addEventListener('visibilitychange', onVis);
  done.push(() => { cancelAnimationFrame(raf); document.removeEventListener('visibilitychange', onVis); root.removeEventListener('pointermove', onMove); root.removeEventListener('pointerleave', onLeave); });
  return cleanup;
}

// v2, R3 F4-V2: ⟦S1329⟧ staggered word reveal (once): words rise from y 20 and fade in, 0.8s cubic-bezier(0.16,1,0.3,1),
// 0.07s apart, when the statement reaches 80% of the view; the statement is the section's h2. The house draws once
// with it: ridge and eave 0.9s power3.out, then the 8 courses 0.08s apart. Reduced motion: all shown.
function statement(root, c) {
  const p = root.querySelector('.fm2-say'), ridge = root.querySelector('.fm2-ridge'), eave = root.querySelector('.fm2-eave'), courses = [...root.querySelectorAll('.fm2-courses path')];
  const done = [], cleanup = () => done.forEach(f => f());
  if (!c.motion) return cleanup;
  parallax(root); // the skyline travels at its own scroll rate (data-sy)
  const text = p.textContent, words = [];
  p.setAttribute('aria-label', text); p.textContent = '';
  text.split(/(\s+)/).forEach(part => { if (!part) return; if (/^\s+$/.test(part)) { p.append(part); return; } const w = document.createElement('span'); w.className = 'w'; w.setAttribute('aria-hidden', 'true'); w.textContent = part; words.push(w); p.append(w); });
  done.push(() => { p.textContent = text; p.removeAttribute('aria-label'); });
  gsap.set(words, { y: 20, opacity: 0 }); gsap.set([ridge, ...courses], { drawSVG: '0%' }); gsap.set(eave, { drawSVG: '50% 50%' });
  const st = ScrollTrigger.create({ trigger: p, start: 'top 80%', once: true, onEnter: () => {
    gsap.to(words, { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out', stagger: 0.07 }); // expo.out = cubic-bezier(0.16,1,0.3,1)
    gsap.timeline().to(ridge, { drawSVG: '100%', duration: 0.9, ease: 'power3.out' }, 0).to(eave, { drawSVG: '0% 100%', duration: 0.9, ease: 'power3.out' }, 0)
      .to(courses.slice().reverse(), { drawSVG: '100%', duration: 0.3, ease: EASE, stagger: 0.08 }, 0.9);
  } });
  done.push(() => st.kill());
  beats(root, [root.querySelector('.fm2-photo'), root.querySelector('.fm2-call')]);
  return cleanup;
}

// v3 ⟦S1362⟧ technical-wireframe-info-layout: an outlined object with annotation pills joined by connector lines,
// labels appearing in stages, connectors drawing; emphasis by brightness and line weight. Adapted: a king-post roof
// truss on blueprint blue; each member carries one true fact (pills are the accessible control; the members mirror them
// for the pointer). Plywood roof-deck sheets behind light up under the pointer.
const ANCHOR = { bunk: [500, 62], wade: [500, 220], rachel: [300, 360], crew: [937, 357] };
const SAY = { bunk: 'Founded in 1995 by Franklin "Bunk" Walker.', wade: 'His son, Wade Walker, has been president since 2015.', rachel: 'Rachel answers the phone, Monday to Friday, 9 to 5.', crew: 'Today, the crew in company shirts, under the Rembrandt sign.' };
// R3 F4-V3: the crew photo's crop widens with each member (the sign, then the group, then everyone); never a face crop
const CROP = { bunk: [1.7, '50%', '12%'], wade: [1.35, '50%', '35%'], rachel: [1.15, '50%', '55%'], crew: [1, '50%', '50%'] };
function truss(root, c) {
  const svg = root.querySelector('.fm3-truss'), leads = root.querySelector('.fm3-leads'), say = root.querySelector('.fm3-say');
  const pills = [...root.querySelectorAll('.fm3-pill')], members = [...svg.querySelectorAll('.m')];
  const NS = 'http://www.w3.org/2000/svg', paths = {}, pt = svg.createSVGPoint(), done = [];
  for (const b of pills) { const p = document.createElementNS(NS, 'path'); p.dataset.m = b.dataset.m; leads.append(p); paths[b.dataset.m] = p; }
  const layout = () => {
    const m = svg.getScreenCTM(); if (!m || getComputedStyle(leads).display === 'none') return; const inv = m.inverse();
    for (const b of pills) {
      const r = b.getBoundingClientRect(); pt.x = r.left + r.width / 2; pt.y = r.top + r.height / 2; const q = pt.matrixTransform(inv);
      const [ax, ay] = ANCHOR[b.dataset.m]; paths[b.dataset.m].setAttribute('d', `M${q.x.toFixed(1)} ${q.y.toFixed(1)} L${ax} ${q.y.toFixed(1) * 0.5 + ay * 0.5} L${ax} ${ay}`);
    }
  };
  const ro = new ResizeObserver(layout); ro.observe(root); layout(); done.push(() => ro.disconnect());
  let pinned = null, shown = null;
  const show = k => {
    if (k === shown) return; shown = k;
    svg.classList.toggle('has-m', !!k);
    members.forEach(m => m.classList.toggle('is-on', m.dataset.m === k));
    Object.entries(paths).forEach(([id, p]) => p.classList.toggle('is-on', id === k));
  };
  const crop = root.querySelector('.fm3-crop');
  const pin = k => { pinned = pinned === k ? null : k; pills.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.m === pinned))); show(pinned); say.textContent = pinned ? SAY[pinned] : ''; const [z, ox, oy] = CROP[pinned || 'crew']; crop.style.setProperty('--z', z); crop.style.setProperty('--ox', ox); crop.style.setProperty('--oy', oy); };
  pin('bunk'); // R3: Bunk is selected from the start (a clear selected state, S1314 §7)
  const over = e => { const t = e.target.closest('[data-m]'); if (t && (e.pointerType === 'mouse' || e.type === 'focusin')) show(t.dataset.m); };
  const out = e => { const t = e.target.closest('[data-m]'); if (t && (!e.relatedTarget || !e.relatedTarget.closest || e.relatedTarget.closest('[data-m]') !== t)) show(pinned); };
  const click = e => { const t = e.target.closest('[data-m]'); if (t) pin(t.dataset.m); };
  root.addEventListener('pointerover', over); root.addEventListener('pointerout', out); root.addEventListener('focusin', over); root.addEventListener('focusout', out); root.addEventListener('click', click);
  // the deck highlight follows the pointer as a small window moved by transform (a section-sized masked layer composited
  // at half the frame rate), written once per frame
  const hi = root.querySelector('.fm3-deck--hi'), hiG = hi.querySelector('.fm3-hi-g'); let pq = 0, px = 0, py = 0;
  const ptrW = () => { pq = 0; hi.style.transform = `translate3d(${px - 220}px,${py - 220}px,0)`; hiG.setAttribute('transform', `translate(${220 - px} ${220 - py})`); };
  const ptr = e => { if (e.pointerType !== 'mouse') return; const r = root.getBoundingClientRect(); px = Math.round(e.clientX - r.left); py = Math.round(e.clientY - r.top); if (!pq) pq = requestAnimationFrame(ptrW); root.classList.add('is-ptr'); };
  const ptrOut = () => root.classList.remove('is-ptr');
  if (c.fine && c.motion) { root.addEventListener('pointermove', ptr, { passive: true }); root.addEventListener('pointerleave', ptrOut); }
  done.push(() => { ['pointerover', 'pointerout', 'focusin', 'focusout', 'click'].forEach((ev, i) => root.removeEventListener(ev, [over, out, over, out, click][i])); root.removeEventListener('pointermove', ptr); root.removeEventListener('pointerleave', ptrOut); cancelAnimationFrame(pq); });
  const cleanup = () => done.forEach(f => f());
  if (!c.motion) return cleanup;
  beats(root, [root.querySelector('.fm3-h'), root.querySelector('.fm3-note')]);
  // staged: the members draw, then the pills arrive and their connectors draw
  gsap.timeline({ scrollTrigger: { trigger: svg, start: 'top 80%', once: true }, onComplete: layout })
    .fromTo(members, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.3, ease: EASE, stagger: 0.05 }, 0)
    .fromTo(pills, { y: 10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.3, ease: EASE, stagger: 0.06, clearProps: 'transform,opacity,visibility' }, 0.25)
    .fromTo(Object.values(paths), { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.3, ease: EASE, stagger: 0.06 }, 0.3);
  return cleanup;
}

// v4 (R3, new): [BANK] Harvest [201] CSS-only flip card (deep read slice 8, entry 523): the turn is CSS (.36s --ease-x);
// JS only toggles aria-pressed on click. The cards enter once, 60ms apart. Reduced motion swaps the faces (CSS).
function cards(root, c) {
  const btns = [...root.querySelectorAll('.fm4-card')];
  const onClick = e => { const b = e.target.closest('.fm4-card'); if (b) b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true')); };
  root.addEventListener('click', onClick);
  if (c.motion) beats(root, [root.querySelector('.fm4-h'), root.querySelector('.fm4-note'), root.querySelectorAll('.fm4-li'), root.querySelector('.fm4-call')], { stagger: 0.06 });
  return () => root.removeEventListener('click', onClick);
}

// v5 (R3, new): ⟦S1354⟧ agency-grid-layout-minimal: masked text reveals and a slow image settle, once. The headline lines
// rise from yPercent 100 inside their masks (.5s, 60ms apart); the panorama settles from scale 1.06 to 1 over 1.2s.
function pano(root, c) {
  if (!c.motion) return;
  const ln = root.querySelectorAll('.fm5-h .ln > span'), im = root.querySelector('.fm5-pano img');
  gsap.set(ln, { yPercent: 100 }); gsap.set(im, { scale: 1.06 });
  const a = ScrollTrigger.create({ trigger: root.querySelector('.fm5-h'), start: 'top 85%', once: true, onEnter: () => gsap.to(ln, { yPercent: 0, duration: 0.5, ease: EASE, stagger: 0.06 }) });
  const b = ScrollTrigger.create({ trigger: root.querySelector('.fm5-pano'), start: 'top 90%', once: true, onEnter: () => gsap.to(im, { scale: 1, duration: 1.2, ease: 'power2.out' }) });
  beats(root, [root.querySelectorAll('.fm5-row'), root.querySelector('.fm5-call')], { stagger: 0.05 });
  return () => { a.kill(); b.kill(); };
}

export default { 1: masked, 2: statement, 3: truss, 4: cards, 5: pano };
