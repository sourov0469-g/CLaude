// SERVICES (R4, AUDIT-R4.md, TRACEABILITY.md "R4 Services"). Five concepts over the same facts: the six main services
// with the firm's own one-line descriptions (pack §5.6, flag C12) and the wider menu. Nothing here prices, guarantees or
// promises a claim outcome.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EASE, beats } from '../../js/fx.js';


// v1 [BANK] 523 ULTRAGRID (one explorable scene, its hotspots, a plain list as the fallback) + ⟦S0139⟧ flat drawing.
// Six numbered hotspot buttons sit on their parts of one house; choosing one fills that part sun and shows its line in
// the panel (crossfade .2s). Arrow keys move between hotspots (roving focus). The visually hidden list carries all six.
function house(root, c) {
  const hs = [...root.querySelectorAll('.sv1-hs')], parts = [...root.querySelectorAll('.sv1-p')], list = [...root.querySelectorAll('.sv1-list li')];
  const n = root.querySelector('.sv1-n'), t = root.querySelector('.sv1-t'), d = root.querySelector('.sv1-d'), body = [n, t, d];
  let cur = 0;
  const paint = i => { parts.forEach(p => p.classList.toggle('is-on', +p.dataset.p === i)); hs.forEach((b, k) => { b.setAttribute('aria-pressed', String(k === i)); b.tabIndex = k === i ? 0 : -1; }); };
  const fill = i => { const li = list[i]; n.textContent = String(i + 1).padStart(2, '0'); t.textContent = li.querySelector('b').textContent.replace(/\.$/, ''); d.textContent = li.textContent.replace(li.querySelector('b').textContent, '').trim(); };
  const choose = i => {
    if (i === cur) return; cur = i; paint(i);
    if (!c.motion) { fill(i); return; }
    gsap.to(body, { autoAlpha: 0, y: -6, duration: 0.1, ease: 'power2.in', overwrite: true, onComplete: () => { fill(i); gsap.fromTo(body, { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.2, ease: EASE, stagger: 0.03 }); } });
  };
  paint(0);
  const onClick = e => { const b = e.target.closest('.sv1-hs'); if (b) choose(+b.dataset.i); };
  const onKey = e => {
    const b = e.target.closest('.sv1-hs'); if (!b) return;
    const k = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]; if (!k) return;
    e.preventDefault(); const i = (cur + k + hs.length) % hs.length; choose(i); hs[i].focus();
  };
  root.addEventListener('click', onClick); root.addEventListener('keydown', onKey);
  if (c.motion) {
    beats(root, [root.querySelector('.sv1-head'), root.querySelector('.sv1-fig'), root.querySelector('.sv1-panel'), root.querySelector('.sv-also')]);
    gsap.fromTo(hs, { scale: 0.6, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.3, ease: 'back.out(1.6)', stagger: 0.05, scrollTrigger: { trigger: root.querySelector('.sv1-fig'), start: 'top 75%', once: true } });
  }
  return () => { root.removeEventListener('click', onClick); root.removeEventListener('keydown', onKey); };
}

// v2 [BANK] proven recipe R45: stacking cards are CSS position:sticky, never a GSAP pin. The only script is the
// scale-back: the card underneath eases to .96 as the next card slides over it (scrubbed, wide screens only).
function stack(root, c) {
  const cards = [...root.querySelectorAll('.sv2-card')];
  if (!c.motion) return;
  beats(root, [root.querySelector('.sv2-head')]);
  if (!c.wide) { beats(root, cards.map(x => [x])); return; }
  cards.slice(0, -1).forEach((card, i) => {
    const next = cards[i + 1];
    gsap.to(card, { scale: 0.96, ease: 'none', scrollTrigger: { trigger: next, start: 'top bottom', end: () => `top ${parseFloat(getComputedStyle(next).top) + 40}px`, scrub: true } });
  });
}

// v3 [BANK] Strike Force HVAC (crown 2): the visitor starts from what they see, and each row routes to its service.
// ⟦S1499⟧ chunked into six scannable rows; rows enter once, 40ms apart.
function routes(root, c) {
  if (!c.motion) return;
  beats(root, [root.querySelector('.sv3-head')]);
  gsap.fromTo(root.querySelectorAll('.sv3-t tbody tr'), { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.3, ease: EASE, stagger: 0.04, scrollTrigger: { trigger: root.querySelector('.sv3-t'), start: 'top 80%', once: true } });
  beats(root, [root.querySelector('.sv-also')]);
}

// v4 ⟦S0823⟧ mastercard: circles placed asymmetrically, each with a white satellite button docked at its edge; the button
// opens that service's line (aria-expanded). Faint dashed arcs join the circles (drawn from their real centres, redrawn
// on resize, hidden on phones).
function circles(root, c) {
  const field = root.querySelector('.sv4-field'), sats = [...root.querySelectorAll('.sv4-sat')];
  const NS = 'http://www.w3.org/2000/svg', svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('class', 'sv4-arcs'); svg.setAttribute('aria-hidden', 'true'); svg.setAttribute('focusable', 'false'); field.prepend(svg);
  const draw = () => {
    const f = field.getBoundingClientRect(); svg.setAttribute('viewBox', `0 0 ${f.width} ${f.height}`);
    const pts = [...root.querySelectorAll('.sv4-c')].map(el => { const r = el.getBoundingClientRect(); return [r.left - f.left + r.width / 2, r.top - f.top + r.height / 2, r.width / 2]; });
    const pairs = [[0, 1], [1, 2], [0, 3], [1, 4], [2, 5], [3, 4], [4, 5]];
    svg.innerHTML = pairs.map(([a, b]) => { const [x1, y1] = pts[a], [x2, y2] = pts[b], mx = (x1 + x2) / 2, my = (y1 + y2) / 2 - Math.abs(x2 - x1) * 0.18; return `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}"/>`; }).join('');
  };
  draw(); const ro = new ResizeObserver(draw); ro.observe(field);
  const onClick = e => {
    const b = e.target.closest('.sv4-sat'); if (!b) return;
    const open = b.getAttribute('aria-expanded') !== 'true', d = root.querySelector('#' + b.getAttribute('aria-controls'));
    b.setAttribute('aria-expanded', String(open)); d.hidden = !open;
    if (open && c.motion) gsap.fromTo(d, { y: -6, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.2, ease: EASE });
  };
  root.addEventListener('click', onClick);
  if (c.motion) {
    beats(root, [root.querySelector('.sv4-head')]);
    gsap.fromTo(root.querySelectorAll('.sv4-o'), { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.3, ease: EASE, stagger: 0.06, scrollTrigger: { trigger: field, start: 'top 80%', once: true } });
    gsap.fromTo(svg, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, delay: 0.4, scrollTrigger: { trigger: field, start: 'top 80%', once: true } });
    beats(root, [root.querySelector('.sv-also')]);
  }
  return () => { ro.disconnect(); root.removeEventListener('click', onClick); svg.remove(); };
}

// v5 [BANK] Q55 Codrops 3D text, the unpinned circle variant: words stand on a CSS 3D drum (backface hidden), spaced 36°
// so five face forward at once; the drum turns 180° as the stage crosses the viewport (scrub 1, ease none). The word
// facing you is lit and its line shows beneath. The drum is aria-hidden; the list carries the content, and reduced
// motion shows the list instead of the drum.
function drum(root, c) {
  const words = [...root.querySelectorAll('.sv5-w')], read = root.querySelector('.sv5-read'), ring = root.querySelector('.sv5-drum'), lines = [...root.querySelectorAll('.sv5-list span')];
  if (!c.motion) return;
  const STEP = 36;
  const place = () => { const r = Math.min(0.4 * Math.min(innerWidth, innerHeight), 230); words.forEach((w, i) => { w.style.transform = `rotateX(${-i * STEP}deg) translateZ(${r}px)`; }); };
  place(); addEventListener('resize', place);
  let front = -1;
  const set = rot => { ring.style.transform = `rotateX(${rot}deg)`; const i = Math.max(0, Math.min(words.length - 1, Math.round(rot / STEP))); if (i !== front) { front = i; words.forEach((w, k) => w.classList.toggle('is-front', k === i)); read.textContent = lines[i].textContent; } };
  set(0);
  const p = { r: 0 };
  gsap.to(p, { r: STEP * (words.length - 1), ease: 'none', onUpdate: () => set(p.r), scrollTrigger: { trigger: root.querySelector('.sv5-stage'), start: 'top 70%', end: 'bottom 30%', scrub: 1 } });
  beats(root, [root.querySelector('.sv5-head'), root.querySelector('.sv-also')]);
  return () => removeEventListener('resize', place);
}

// R4 Phase 4: "How many squares is your roof?" (the homepage's business-only interactive). Roof area of a simple gable
// = footprint x slope factor, where the slope factor for a pitch of r in 12 is sqrt(1 + (r/12)^2); one square is 100
// sq ft. The ridge on the drawing is draggable (pointer) and mirrors the pitch slider (keyboard and touch). Geometry
// only: the copy says it is a rough guide and the written estimate measures the real roof. No price is shown.
function squares(root, c) {
  const box = root.querySelector('.sq'); if (!box) return () => {};
  const len = box.querySelector('.sq-len'), wid = box.querySelector('.sq-wid'), pit = box.querySelector('.sq-pit');
  const outs = box.querySelectorAll('.sq-v'), num = box.querySelector('.sq-out b'), svg = box.querySelector('.sq-svg');
  const roof = box.querySelector('.sq-roof'), course = box.querySelector('.sq-course'), run = box.querySelector('.sq-run'), lbl = box.querySelector('.sq-lbl-p'), grip = box.querySelector('.sq-grip');
  const EAVE = 200, HALF = 190, CX = 260; // drawing units: the gable spans 70..450 at the eave line
  const yOf = r => EAVE - HALF * (r / 12) * 0.62; // apex height drawn from the pitch (scaled so 12 in 12 fits the frame)
  const render = () => {
    const L = +len.value, W = +wid.value, R = +pit.value, slope = Math.sqrt(1 + (R / 12) ** 2), sq = (L * W * slope) / 100, y = yOf(R);
    outs[0].textContent = `${L} ft`; outs[1].textContent = `${W} ft`; outs[2].textContent = `${R} in 12`;
    num.textContent = sq.toFixed(1); lbl.textContent = `${R} in 12`;
    roof.setAttribute('d', `M70 ${EAVE} L${CX} ${y.toFixed(1)} L450 ${EAVE} Z`); run.setAttribute('d', `M${CX} ${EAVE} V${y.toFixed(1)}`);
    let d = ''; for (let k = 1; k < 5; k++) { const yy = EAVE - (EAVE - y) * k / 5, half = HALF * (1 - k / 5) + 20 * (1 - k / 5); d += `M${(CX - half).toFixed(1)} ${yy.toFixed(1)}H${(CX + half).toFixed(1)}`; } course.setAttribute('d', d);
    grip.setAttribute('transform', `translate(0 ${(y - 105).toFixed(1)})`);
    lbl.setAttribute('y', (EAVE + 26).toFixed(1));
  };
  const onInput = () => render();
  [len, wid, pit].forEach(i => i.addEventListener('input', onInput));
  let dragging = false;
  const toPitch = e => { const r = svg.getBoundingClientRect(), y = (e.clientY - r.top) * (330 / r.height); const p = Math.round(((EAVE - y) / (HALF * 0.62)) * 12); return Math.max(3, Math.min(12, p)); };
  const down = e => { dragging = true; box.classList.add('is-drag'); grip.setPointerCapture?.(e.pointerId); pit.value = toPitch(e); render(); };
  const move = e => { if (!dragging) return; const p = toPitch(e); if (+pit.value !== p) { pit.value = p; render(); } };
  const up = () => { dragging = false; box.classList.remove('is-drag'); };
  grip.addEventListener('pointerdown', down); addEventListener('pointermove', move); addEventListener('pointerup', up);
  render();
  if (c.motion) beats(root, [box]);
  return () => { [len, wid, pit].forEach(i => i.removeEventListener('input', onInput)); grip.removeEventListener('pointerdown', down); removeEventListener('pointermove', move); removeEventListener('pointerup', up); };
}
function houseAndSquares(root, c) { const a = house(root, c), b = squares(root, c); return () => { a && a(); b && b(); }; }

export default { 1: houseAndSquares, 2: stack, 3: routes, 4: circles, 5: drum };
