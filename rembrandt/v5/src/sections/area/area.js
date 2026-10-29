// TOWNS (PLAN-V7 §6). Every number comes from data/towns.js (US Census 2023 Gazetteer positions; ACS median year built
// and decades of construction); miles and bearings are from the centre of Springboro. The source is printed on the page.
// Genuinely local (Hippo doctrine): each town carries facts of its own; nothing is city-swapped, nothing invented.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { EASE, beats } from '../../js/fx.js';
import { TOWNS } from '../../data/towns.js';

gsap.registerPlugin(Flip);
const NS = 'http://www.w3.org/2000/svg';
const DIR = ['north', 'northeast', 'east', 'southeast', 'south', 'southwest', 'west', 'northwest'];
const dir = b => DIR[Math.round(b / 45) % 8];
const HOME = TOWNS[0]; // Springboro
const fact = t => t === HOME ? 'Home. The office is at 38 N Pioneer Blvd.' : `${t.mi} miles ${dir(t.brg)} of the centre of Springboro, in ${t.county} County. The median home there was built in ${t.built}.`;
const el = (tag, attrs, parent) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.append(e); return e; };

// v1 [BANK] Austin Pro project map (CROWN: "the map is the coverage claim"; plot only what is real, label it honestly,
// reconcile its arithmetic). Adapted: no job pins exist, so the 24 towns are placed by their Census bearing and distance
// from the Springboro centroid (square-root radial scale, rings labelled in real miles), with a north arrow; the list is the
// accessible control. Choosing a town draws a line from home and prints its facts. Rings ripple from the pointer.
function map(root, c) {
  const svg = root.querySelector('.tw1-map'), rings = svg.querySelector('.tw1-rings'), marks = svg.querySelector('.tw1-marks'), ripples = svg.querySelector('.tw1-ripples');
  const line = svg.querySelector('.tw1-line'), card = root.querySelector('.tw1-card'), list = root.querySelector('.tw1-list');
  // true bearings; distance on a square-root radial scale so the close-in towns do not pile up (the rings carry the
  // real miles, so the scale stays honest): r = 460 * sqrt(mi / 25)
  const R = mi => 460 * Math.sqrt(mi / 25), S = R(5) / 5;
  const pos = t => { const a = t.brg * Math.PI / 180, r = R(t.mi); return [500 + Math.sin(a) * r, 500 - Math.cos(a) * r]; };
  rings.replaceChildren(); marks.replaceChildren(); list.replaceChildren();
  for (const r of [5, 10, 15, 20, 25]) { el('circle', { cx: 500, cy: 500, r: R(r) }, rings); const tx = el('text', { x: 506, y: 500 - R(r) - 6 }, rings); tx.textContent = `${r} mi`; }
  const mks = [], btns = [];
  TOWNS.forEach((t, i) => {
    if (i) {
      const [x, y] = pos(t), g = el('g', { class: 'mk', 'data-i': i }, marks);
      el('path', { class: 'mk-h', d: `M${(x - 9).toFixed(1)} ${(y + 8).toFixed(1)} V${(y - 2).toFixed(1)} L${x.toFixed(1)} ${(y - 11).toFixed(1)} L${(x + 9).toFixed(1)} ${(y - 2).toFixed(1)} V${(y + 8).toFixed(1)} Z` }, g);
      const right = x >= 500 || (t.brg > 300 && t.brg < 360), tx = el('text', { x: (right ? x + 14 : x - 14).toFixed(1), y: (y + 5).toFixed(1), 'text-anchor': right ? 'start' : 'end' }, g); tx.textContent = t.name;
      mks[i] = g;
    }
    const li = document.createElement('li'), b = document.createElement('button');
    b.type = 'button'; b.className = 'rx'; b.dataset.i = i; b.setAttribute('aria-pressed', String(!i));
    b.innerHTML = `${t.name}<span class="mi">${i ? t.mi + ' mi' : 'home'}</span>`; li.append(b); list.append(li); btns[i] = b;
  });
  let cur = 0;
  const choose = i => {
    cur = i; btns.forEach((b, j) => b.setAttribute('aria-pressed', String(j === i)));
    mks.forEach((m, j) => m && m.classList.toggle('is-on', j === i));
    const t = TOWNS[i];
    card.innerHTML = `<p class="tw1-card-t"></p><p class="tw1-card-d"></p>`; card.firstChild.textContent = t.name; card.lastChild.textContent = fact(t);
    if (!i) { gsap.set(line, { opacity: 0 }); return; }
    const [x, y] = pos(t); line.setAttribute('d', `M500 500 L${x.toFixed(1)} ${y.toFixed(1)}`);
    gsap.set(line, { opacity: 1 }); gsap.fromTo(line, { drawSVG: '0%' }, { drawSVG: '100%', duration: c.motion ? 0.3 : 0, ease: EASE });
  };
  const hover = (i, on) => { if (mks[i]) mks[i].classList.toggle('is-hover', on); };
  const onClick = e => { const b = e.target.closest('[data-i]'); if (b && root.contains(b)) choose(+b.dataset.i); };
  const onOver = e => { const b = e.target.closest('[data-i]'); if (b) hover(+b.dataset.i, true); };
  const onOut = e => { const b = e.target.closest('[data-i]'); if (b) hover(+b.dataset.i, false); };
  root.addEventListener('click', onClick); root.addEventListener('pointerover', onOver); root.addEventListener('pointerout', onOut); root.addEventListener('focusin', onOver); root.addEventListener('focusout', onOut);
  gsap.set(line, { opacity: 0 });
  const done = [() => { root.removeEventListener('click', onClick); root.removeEventListener('pointerover', onOver); root.removeEventListener('pointerout', onOut); root.removeEventListener('focusin', onOver); root.removeEventListener('focusout', onOut); }];
  const cleanup = () => done.forEach(f => f());
  if (!c.motion) return cleanup;
  // the background answers the pointer: a distance ring ripples out from it (at most one every 0.9s, three alive)
  const pt = svg.createSVGPoint(); let lastR = 0;
  const onMove = e => {
    if (e.pointerType !== 'mouse') return; const now = performance.now(); if (now - lastR < 900 || ripples.childElementCount >= 3) return; lastR = now;
    const m = svg.getScreenCTM(); if (!m) return; pt.x = e.clientX; pt.y = e.clientY; const p = pt.matrixTransform(m.inverse());
    const ci = el('circle', { cx: p.x.toFixed(0), cy: p.y.toFixed(0), r: 4 }, ripples);
    gsap.fromTo(ci, { attr: { r: 4 }, opacity: 0.7 }, { attr: { r: 120 }, opacity: 0, duration: 1.4, ease: 'power2.out', onComplete: () => ci.remove() });
  };
  if (c.fine) { svg.addEventListener('pointermove', onMove, { passive: true }); done.push(() => svg.removeEventListener('pointermove', onMove)); }
  beats(root, [root.querySelector('.tw-h'), root.querySelector('.tw-note'), card, list.children]);
  gsap.timeline({ scrollTrigger: { trigger: svg, start: 'top 80%', once: true } })
    .fromTo(rings.querySelectorAll('circle'), { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.3, ease: EASE, stagger: 0.05 }, 0)
    .fromTo(marks.querySelectorAll('.mk-h'), { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(2)', stagger: 0.015, clearProps: 'transform,opacity' }, 0.15);
  return cleanup;
}

// v2 [BANK] Q4 Ragged Edge metric-led cards (STRONG: the card's headline is its metric; power2.out 0.4-0.6s, stagger
// 0.08-0.1, compressed to F17), with the Hippo doctrine (each town's own facts). Each card leads with the median year its
// homes were built and carries the real share of homes by decade (⟦S1420⟧: bars from zero, one scale for all cards,
// direct labels), drawn as stacked shingle courses; decades before 1980 in blue. Sorting re-lays the cards (Flip).
function cards(root, c) {
  const ol = root.querySelector('.tw2-cards'), plan = root.querySelector('.tw2-plan'), sorts = [...root.querySelectorAll('.tw2-sb')];
  const MAX = Math.max(...TOWNS.flatMap(t => t.decades.map(d => d[1])));
  ol.replaceChildren();
  const items = TOWNS.map(t => {
    const li = document.createElement('li'); li.className = 'tw2-card'; li.dataset.c = 'card'; li.dataset.built = t.built; li.dataset.mi = t.mi;
    li.innerHTML = `<p class="tw2-y num"></p><p class="tw2-yl">median year built</p><p class="tw2-n"></p><p class="tw2-m"></p>`;
    li.children[0].textContent = t.built; li.children[2].textContent = t.name;
    li.children[3].textContent = `${t.county} County, ${t.mi ? `${t.mi} mi ${dir(t.brg)}` : 'home'}. ${t.pre1980}% built before 1980.`;
    const dec = t.decades.slice().reverse(), W = 220, H = 64, bw = W / dec.length, top = dec.reduce((a, d, i) => (d[1] > dec[a][1] ? i : a), 0);
    const s = el('svg', { class: 'tw2-bars', viewBox: `0 -14 ${W} ${H + 28}`, 'aria-hidden': 'true', focusable: 'false' });
    dec.forEach(([lab, v], i) => {
      const h = (v / MAX) * H, g = el('g', { class: 'bar' + (i < 5 ? ' is-old' : '') }, s), x = i * bw + 2;
      el('rect', { x: x.toFixed(1), y: (H - h).toFixed(1), width: (bw - 4).toFixed(1), height: Math.max(0.5, h).toFixed(1), rx: 1.5 }, g);
      for (let yy = H - 6; yy > H - h; yy -= 6) el('line', { x1: x, x2: x + bw - 4, y1: yy, y2: yy }, g);
      if (i === top) { const tx = el('text', { x: (x + (bw - 4) / 2).toFixed(1), y: (H - h - 4).toFixed(1), 'text-anchor': 'middle', class: 'top' }, s); tx.textContent = `${Math.round(v)}%`; }
    });
    const l0 = el('text', { x: 2, y: H + 12 }, s); l0.textContent = 'before 1940'; const l1 = el('text', { x: W - 2, y: H + 12, 'text-anchor': 'end' }, s); l1.textContent = '2020+';
    li.append(s);
    const sr = document.createElement('p'); sr.className = 'vh'; sr.textContent = 'Share of homes by decade built: ' + t.decades.slice().reverse().map(d => `${d[0]} ${d[1]}%`).join(', ') + '.'; li.append(sr);
    ol.append(li); return li;
  });
  const order = key => items.slice().sort((a, b) => (+a.dataset[key]) - (+b.dataset[key]));
  const apply = (key, animate) => {
    const state = animate ? Flip.getState(items) : null;
    order(key).forEach(li => ol.append(li));
    sorts.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.sort === key)));
    if (state) Flip.from(state, { duration: 0.3, ease: EASE, stagger: 0.01 });
  };
  apply('built', false);
  const onSort = e => { const b = e.target.closest('.tw2-sb'); if (b) apply(b.dataset.sort, c.motion); };
  root.addEventListener('click', onSort);
  // background: neighbourhood roofs seen from above (hips and gables in plan), faint, drifting with scroll
  const paint = () => {
    const W = root.clientWidth, H = root.clientHeight; plan.setAttribute('viewBox', `0 0 ${W} ${H}`); plan.replaceChildren();
    let seed = 7; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    for (let y = 40; y < H; y += 150) for (let x = (y / 150) % 2 ? 20 : 110; x < W; x += 190) {
      const w = 90 + rnd() * 50, h = 60 + rnd() * 30, hip = rnd() > 0.5;
      const d = hip ? `M${x} ${y}h${w}v${h}h${-w}Z M${x} ${y}L${x + h / 2} ${y + h / 2}L${x + w - h / 2} ${y + h / 2}L${x + w} ${y} M${x} ${y + h}L${x + h / 2} ${y + h / 2} M${x + w} ${y + h}L${x + w - h / 2} ${y + h / 2}`
        : `M${x} ${y}h${w}v${h}h${-w}Z M${x} ${y + h / 2}H${x + w}`;
      el('path', { class: 'rf', d }, plan);
    }
  };
  paint(); const ro = new ResizeObserver(paint); ro.observe(root);
  if (c.motion) {
    beats(root, [root.querySelector('.tw-h'), root.querySelector('.tw-note'), root.querySelector('.tw2-sort')]);
    ScrollTrigger.batch(items, { start: 'top 88%', once: true, onEnter: b => gsap.fromTo(b, { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.3, ease: EASE, stagger: 0.04, clearProps: 'transform,opacity,visibility' }) });
  }
  return () => { root.removeEventListener('click', onSort); ro.disconnect(); };
}

// v3 [BANK] ROTTLER town finder (a finder, "135+ locations" counted in the heading, offered twice) with [BANK] West London
// Roofing's coverage checker (CROWN: instant answer), and ⟦S1453⟧'s zero-results state (confirm the query, offer the next
// step). Adapted: type or pick a town; the answer gives its real distance, direction, county and median year built; a
// compass needle swings to the town's bearing, a roofer's tape pulls out to the miles (one inch per mile on its scale), and
// the weathervane on the ridge behind turns with it. Not on the list: say so and offer the phone.
const norm = s => s.toLowerCase().replace(/[^a-z ]/g, '').replace(/\s+/g, ' ').trim();
function finder(root, c) {
  const input = root.querySelector('#tw3-q'), ans = root.querySelector('.tw3-ans'), chips = root.querySelector('.tw3-chips');
  const needle = root.querySelector('.tw3-needle'), tape = root.querySelector('.tw3-tape-b'), tk = root.querySelector('.tw3-tape-tk'), lab = root.querySelector('.tw3-tape-l'), arrow = root.querySelector('.tw3-arrow');
  const ticks = root.querySelector('.tw3-ticks');
  ticks.replaceChildren(); for (let a = 0; a < 360; a += 15) { const r1 = a % 45 ? 160 : 150, rad = a * Math.PI / 180; el('path', { d: `M${200 + Math.sin(rad) * r1} ${200 - Math.cos(rad) * r1} L${200 + Math.sin(rad) * 170} ${200 - Math.cos(rad) * 170}` }, ticks); }
  tk.replaceChildren(); for (let m = 0; m <= 25; m++) { const x = 40 + m * 15; el('path', { d: `M${x} 24 V${m % 5 ? 30 : 36}` }, tk); }
  chips.replaceChildren();
  TOWNS.forEach((t, i) => { const b = document.createElement('button'); b.type = 'button'; b.className = 'rx'; b.dataset.i = i; b.setAttribute('aria-pressed', 'false'); b.textContent = t.name; chips.append(b); });
  const dur = c.motion ? 0.6 : 0;
  let rot = 0;
  const point = (t, preview) => {
    const target = t ? t.brg : 0, delta = ((target - rot) % 360 + 540) % 360 - 180; rot += delta; // shortest way round
    gsap.to(needle, { rotation: rot, svgOrigin: '200 200', duration: preview ? dur * 0.5 : dur, ease: 'back.out(1.6)', overwrite: 'auto' });
    const len = t ? t.mi * 15 : 0; gsap.to(tape, { attr: { width: Math.max(0, len) + 30 }, duration: preview ? dur * 0.5 : dur, ease: EASE, overwrite: 'auto' });
    lab.textContent = t ? (t.mi ? `${t.mi} miles` : 'home') : '';
    arrow.style.transform = `scaleX(${t && t.mi ? (Math.sin(target * Math.PI / 180) * 0.85 + Math.sign(Math.sin(target * Math.PI / 180) || 1) * 0.15).toFixed(2) : 1})`;
  };
  const say = (t, q) => {
    const T = ans.querySelector('.tw3-ans-t'), D = ans.querySelector('.tw3-ans-d');
    if (t) { T.textContent = t === HOME ? 'Yes. Springboro is home.' : `Yes. ${t.name} is on our list.`; D.textContent = fact(t); }
    else { T.textContent = `${q} isn't on our list of 24.`; D.textContent = 'Call Rachel and ask: (937) 746-7377, Monday to Friday, 9 to 5.'; }
    ans.classList.remove('is-new'); void ans.offsetWidth; ans.classList.add('is-new');
  };
  const pick = (i, fromChip) => {
    const t = TOWNS[i]; [...chips.children].forEach((b, j) => b.setAttribute('aria-pressed', String(j === i)));
    if (fromChip) input.value = t.name;
    say(t); point(t);
  };
  let wait = null;
  const onInput = () => {
    clearTimeout(wait); wait = setTimeout(() => {
      const q = norm(input.value); if (!q) return;
      const i = TOWNS.findIndex(t => norm(t.name) === q), j = i >= 0 ? i : q.length >= 3 ? TOWNS.findIndex(t => norm(t.name).startsWith(q)) : -1;
      if (j >= 0) pick(j, false); else if (q.length >= 3) { [...chips.children].forEach(b => b.setAttribute('aria-pressed', 'false')); say(null, input.value.trim()); point(null); }
    }, 300);
  };
  const onSubmit = e => { e.preventDefault(); clearTimeout(wait); onInput(); };
  const onChip = e => { const b = e.target.closest('.tw3-chips button'); if (b) pick(+b.dataset.i, true); };
  const onPrev = e => { const b = e.target.closest('.tw3-chips button'); if (b && e.pointerType === 'mouse') point(TOWNS[+b.dataset.i], true); };
  const onPrevOut = e => { const b = e.target.closest('.tw3-chips button'); if (b && e.pointerType === 'mouse') { const on = chips.querySelector('[aria-pressed="true"]'); point(on ? TOWNS[+on.dataset.i] : null, true); } };
  input.addEventListener('input', onInput); root.querySelector('.tw3-form').addEventListener('submit', onSubmit);
  chips.addEventListener('click', onChip); chips.addEventListener('pointerover', onPrev); chips.addEventListener('pointerout', onPrevOut);
  if (c.motion) beats(root, [root.querySelector('.tw-h'), root.querySelector('.tw3-form'), [ans, chips], root.querySelector('.tw3-dial')]);
  return () => { clearTimeout(wait); input.removeEventListener('input', onInput); root.querySelector('.tw3-form').removeEventListener('submit', onSubmit); chips.removeEventListener('click', onChip); chips.removeEventListener('pointerover', onPrev); chips.removeEventListener('pointerout', onPrevOut); };
}

export default { 1: map, 2: cards, 3: finder };
