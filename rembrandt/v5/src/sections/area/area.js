// TOWNS (PLAN-V7 §6). Every number comes from data/towns.js (US Census 2023 Gazetteer positions; ACS median year built
// and decades of construction); miles and bearings are from the centre of Springboro. The source is printed on the page.
// Genuinely local (Hippo doctrine): each town carries facts of its own; nothing is city-swapped, nothing invented.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { EASE, beats } from '../../js/fx.js';
import { parallax } from '../../js/depth.js';
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
      // R3 F6-V1: the 8 nearest towns' labels sit radially, outward along the line from the office through the house
      const right = x >= 500 || (t.brg > 300 && t.brg < 360), a = t.brg * Math.PI / 180, rad = i <= 8, lx = rad ? x + Math.sin(a) * 20 : (right ? x + 14 : x - 14), ly = rad ? y - Math.cos(a) * 20 + 5 : y + 5;
      const tx = el('text', { x: lx.toFixed(1), y: ly.toFixed(1), 'text-anchor': rad ? (Math.sin(a) >= 0 ? 'start' : 'end') : right ? 'start' : 'end' }, g); tx.textContent = t.name;
      mks[i] = g;
    }
    const li = document.createElement('li'), b = document.createElement('button');
    b.type = 'button'; b.className = 'rx'; b.dataset.i = i; b.setAttribute('aria-pressed', String(!i));
    b.innerHTML = `${t.name}<span class="mi">${i ? t.mi + ' mi' : 'home'}</span>`; li.append(b); list.append(li); btns[i] = b;
    if (i > 8) li.hidden = true; // R3: the 8 nearest (plus home); "Show all 24" opens the rest
  });
  // labels that collide with an earlier label or a house step down (then up) a line until clear; phones hide the labels
  const placed = mks.filter(Boolean).map(g => g.querySelector('.mk-h').getBBox()); // labels keep clear of every house too
  mks.forEach(g => { if (!g) return; const tx = g.querySelector('text'), y0 = +tx.getAttribute('y'); let b = tx.getBBox(); if (!b.width) return;
    const hit = r => placed.some(q => r.x < q.x + q.width && q.x < r.x + r.width && r.y < q.y + q.height && q.y < r.y + r.height);
    for (const dy of [0, 16, -16, 32, -32]) { tx.setAttribute('y', y0 + dy); b = tx.getBBox(); if (!hit(b)) break; }
    placed.push(b); });
  let cur = 0;
  const choose = i => {
    cur = i; btns.forEach((b, j) => b.setAttribute('aria-pressed', String(j === i)));
    mks.forEach((m, j) => m && m.classList.toggle('is-on', j === i));
    const t = TOWNS[i];
    card.innerHTML = `<p class="tw1-card-t"></p><p class="tw1-card-d"></p>`; card.firstChild.textContent = t.name; card.lastChild.textContent = fact(t);
    if (!i) { gsap.set(line, { opacity: 0 }); return; }
    const [x, y] = pos(t); line.setAttribute('d', `M500 500 L${x.toFixed(1)} ${y.toFixed(1)}`);
    gsap.set(line, { opacity: 1 }); gsap.fromTo(line, { drawSVG: '0%' }, { drawSVG: '100%', duration: c.motion ? 0.22 : 0, ease: EASE });
    if (c.motion) { const ci = el('circle', { cx: x.toFixed(1), cy: y.toFixed(1), r: 6 }, ripples); gsap.fromTo(ci, { attr: { r: 6 }, opacity: 0.9 }, { attr: { r: 46 }, opacity: 0, duration: 0.6, ease: 'power2.out', delay: 0.2, onComplete: () => ci.remove() }); } // one ripple
  };
  const hover = (i, on) => { if (mks[i]) mks[i].classList.toggle('is-hover', on); };
  const onClick = e => { const b = e.target.closest('[data-i]'); if (b && root.contains(b)) choose(+b.dataset.i); };
  const onOver = e => { const b = e.target.closest('[data-i]'); if (b) hover(+b.dataset.i, true); };
  const onOut = e => { const b = e.target.closest('[data-i]'); if (b) hover(+b.dataset.i, false); };
  root.addEventListener('click', onClick); root.addEventListener('pointerover', onOver); root.addEventListener('pointerout', onOut); root.addEventListener('focusin', onOver); root.addEventListener('focusout', onOut);
  const more = root.querySelector('.tw1-more');
  const onMore = () => { const open = more.getAttribute('aria-expanded') !== 'true'; more.setAttribute('aria-expanded', String(open)); more.textContent = open ? 'Show the nearest 8' : 'Show all 24'; [...list.children].forEach((li, i) => { if (i > 8) li.hidden = !open; }); };
  more.addEventListener('click', onMore);
  gsap.set(line, { opacity: 0 });
  const done = [() => more.removeEventListener('click', onMore), () => { root.removeEventListener('click', onClick); root.removeEventListener('pointerover', onOver); root.removeEventListener('pointerout', onOut); root.removeEventListener('focusin', onOver); root.removeEventListener('focusout', onOut); }];
  const cleanup = () => done.forEach(f => f());
  if (!c.motion) return cleanup;
  beats(root, [root.querySelector('.tw-h'), root.querySelector('.tw-note'), card, list]); // the list fades as one group
  gsap.timeline({ scrollTrigger: { trigger: svg, start: 'top 80%', once: true } })
    .fromTo(rings.querySelectorAll('circle'), { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.3, ease: EASE, stagger: 0.05 }, 0)
    .fromTo(marks.querySelectorAll('.mk-h'), { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: EASE, stagger: 0.015, clearProps: 'transform,opacity' }, 0.15);
  return cleanup;
}

// v2 [BANK] Q4 Ragged Edge metric-led cards (STRONG: the card's headline is its metric; power2.out 0.4-0.6s, stagger
// 0.08-0.1, compressed to F17), with the Hippo doctrine (each town's own facts). Each card leads with the median year its
// homes were built and carries the real share of homes by decade (⟦S1420⟧: bars from zero, one scale for all cards,
// direct labels), drawn as stacked shingle courses; decades before 1980 in blue. Sorting re-lays the cards (Flip).
function cards(root, c) {
  const ol = root.querySelector('.tw2-cards'), sorts = [...root.querySelectorAll('.tw2-sb')], more = root.querySelector('.tw2-more');
  const MAX = Math.max(...TOWNS.flatMap(t => t.decades.map(d => d[1])));
  ol.replaceChildren();
  const items = TOWNS.map(t => {
    const li = document.createElement('li'); li.className = 'tw2-card' + (t.built < 1980 ? ' is-old' : ''); li.dataset.c = 'card'; li.dataset.built = t.built; li.dataset.mi = t.mi;
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
    order(key).forEach((li, k) => { ol.append(li); li.hidden = k >= 8 && more.getAttribute('aria-expanded') !== 'true'; });
    sorts.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.sort === key)));
    if (state) Flip.from(state, { duration: 0.3, ease: EASE, stagger: 0.01 });
  };
  apply('built', false);
  const onSort = e => { const b = e.target.closest('.tw2-sb'); if (b) apply(b.dataset.sort, c.motion); if (e.target.closest('.tw2-more')) { const open = more.getAttribute('aria-expanded') !== 'true'; more.setAttribute('aria-expanded', String(open)); more.textContent = open ? 'Show the first 8' : 'Show all 24'; apply(sorts.find(x => x.getAttribute('aria-pressed') === 'true').dataset.sort, c.motion); } };
  root.addEventListener('click', onSort);
  if (c.motion) {
    // R3: the bars grow from zero as each card arrives (one scale for every card, S1420)
    ScrollTrigger.batch(items, { start: 'top 90%', once: true, onEnter: bs => bs.forEach(li => gsap.fromTo(li.querySelectorAll('.bar'), { scaleY: 0 }, { scaleY: 1, duration: 0.3, ease: EASE, stagger: 0.02, clearProps: 'transform' })) });
    beats(root, [root.querySelector('.tw-h'), root.querySelector('.tw-note'), root.querySelector('.tw2-sort')]);
    ScrollTrigger.batch(items, { start: 'top 88%', once: true, onEnter: b => gsap.fromTo(b, { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.3, ease: EASE, stagger: 0.04, clearProps: 'transform,opacity,visibility' }) });
  }
  return () => { root.removeEventListener('click', onSort); };
}

// v3 [BANK] ROTTLER town finder (a finder, "135+ locations" counted in the heading, offered twice) with [BANK] West London
// Roofing's coverage checker (CROWN: instant answer), and ⟦S1453⟧'s zero-results state (confirm the query, offer the next
// step). Adapted: type or pick a town; the answer gives its real distance, direction, county and median year built; a
// compass needle swings to the town's bearing, a roofer's tape pulls out to the miles (one inch per mile on its scale), and
// the weathervane on the ridge behind turns with it. Not on the list: say so and offer the phone.
const norm = s => s.toLowerCase().replace(/[^a-z ]/g, '').replace(/\s+/g, ' ').trim();
function finder(root, c) {
  const input = root.querySelector('#tw3-q'), ans = root.querySelector('.tw3-ans'), chips = root.querySelector('.tw3-chips');
  const needle = root.querySelector('.tw3-needle'), tape = root.querySelector('.tw3-tape-b'), tk = root.querySelector('.tw3-tape-tk'), lab = root.querySelector('.tw3-tape-l');
  const mini = root.querySelector('.tw3-mini'), mr = mini.querySelector('.tw3-mr'), ml = mini.querySelector('.tw3-ml'), mh = mini.querySelector('.tw3-mh');
  const MR = mi => 104 * Math.sqrt(mi / 25); mr.replaceChildren(); for (const r of [5, 10, 15, 20, 25]) el('circle', { cx: 120, cy: 120, r: MR(r).toFixed(1) }, mr);
  const ticks = root.querySelector('.tw3-ticks');
  ticks.replaceChildren(); for (let a = 0; a < 360; a += 15) { const r1 = a % 45 ? 160 : 150, rad = a * Math.PI / 180; el('path', { d: `M${200 + Math.sin(rad) * r1} ${200 - Math.cos(rad) * r1} L${200 + Math.sin(rad) * 170} ${200 - Math.cos(rad) * 170}` }, ticks); }
  tk.replaceChildren(); for (let m = 0; m <= 25; m++) { const x = 40 + m * 15; el('path', { d: `M${x} 24 V${m % 5 ? 30 : 36}` }, tk); }
  chips.replaceChildren();
  TOWNS.forEach((t, i) => { const b = document.createElement('button'); b.type = 'button'; b.className = 'rx'; b.dataset.i = i; b.dataset.c = 'chip'; b.setAttribute('aria-pressed', 'false'); b.textContent = t.name; chips.append(b); });
  const dur = c.motion ? 0.45 : 0; // R3: needle spring and tape in one 0.45s beat
  let rot = 45; gsap.set(needle, { rotation: 45, svgOrigin: '200 200' }); // parked neutral at 45 deg, 40% (CSS) until a town
  const point = (t, preview) => {
    const target = t ? t.brg : 45, delta = ((target - rot) % 360 + 540) % 360 - 180; rot += delta; // shortest way round
    gsap.to(needle, { rotation: rot, svgOrigin: '200 200', duration: preview ? dur * 0.5 : dur, ease: 'back.out(1.2)', overwrite: 'auto' });
    const len = t ? t.mi * 15 : 0; gsap.to(tape, { attr: { width: Math.max(0, len) + 30 }, duration: preview ? dur * 0.5 : dur, ease: EASE, overwrite: 'auto' });
    lab.textContent = t ? (t.mi ? `${t.mi} miles` : 'home') : '';
  };
  const say = (t, q) => {
    const T = ans.querySelector('.tw3-ans-t'), D = ans.querySelector('.tw3-ans-d');
    if (t) { T.textContent = t === HOME ? 'Yes. Springboro is home.' : `Yes. ${t.name} is on our list.`; D.textContent = fact(t); graft(t); }
    else {
      T.textContent = `${q} isn't on our list of 24.`;
      const a = document.createElement('a'); a.className = 'tw3-tel rx'; a.href = 'tel:+19377467377'; a.textContent = '(937) 746-7377';
      a.insertAdjacentHTML('beforeend', '<svg class="rx-s tw3-wv" viewBox="0 0 26 20" aria-hidden="true" focusable="false"><g class="tw3-wv-a"><path d="M3 10 H23 M23 10 l-5 -4 M23 10 l-5 4 M3 10 l-2 -3 h4 l2 3 l-2 3 h-4 z"/></g></svg>');
      D.replaceChildren('Call Rachel and ask: ', a, ', Monday to Friday, 9 to 5.');
      root.classList.remove('has-yes');
      if (c.motion) gsap.fromTo(needle, { rotation: rot - 4 }, { keyframes: [{ rotation: rot + 4, duration: 0.05 }, { rotation: rot - 4, duration: 0.05 }, { rotation: rot + 4, duration: 0.05 }, { rotation: rot, duration: 0.05 }], svgOrigin: '200 200', overwrite: 'auto' }); // a miss: +-4 deg, 200ms
    }
    ans.classList.remove('is-new'); void ans.offsetWidth; ans.classList.add('is-new');
  };
  // R3 graft: the town on V1's honest rings, lit, the connector drawn
  function graft(t) {
    root.classList.add('has-yes');
    const a = t.brg * Math.PI / 180, r = MR(t.mi), x = 120 + Math.sin(a) * r, y = 120 - Math.cos(a) * r;
    mh.setAttribute('d', `M${(x - 7).toFixed(1)} ${(y + 6).toFixed(1)} V${(y - 1).toFixed(1)} L${x.toFixed(1)} ${(y - 8).toFixed(1)} L${(x + 7).toFixed(1)} ${(y - 1).toFixed(1)} V${(y + 6).toFixed(1)} Z`);
    ml.setAttribute('d', `M120 120 L${x.toFixed(1)} ${y.toFixed(1)}`);
    if (c.motion) gsap.fromTo(ml, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.25, ease: EASE, overwrite: 'auto' });
  }
  const reset = () => { root.classList.remove('has-town', 'has-yes'); [...chips.children].forEach(b => b.setAttribute('aria-pressed', 'false')); const T = ans.querySelector('.tw3-ans-t'), D = ans.querySelector('.tw3-ans-d'); T.textContent = '24 towns, from Franklin to Yellow Springs.'; D.textContent = 'Pick one below or type yours.'; rot = ((rot % 360) + 360) % 360; gsap.to(needle, { rotation: 45, svgOrigin: '200 200', duration: dur, ease: EASE, overwrite: 'auto' }); rot = 45; gsap.to(tape, { attr: { width: 30 }, duration: dur, ease: EASE, overwrite: 'auto' }); lab.textContent = ''; };
  const pick = (i, fromChip) => {
    const t = TOWNS[i]; root.classList.add('has-town'); [...chips.children].forEach((b, j) => b.setAttribute('aria-pressed', String(j === i)));
    if (fromChip) input.value = t.name;
    say(t); point(t);
  };
  let wait = null;
  const answer = () => {
    const q = norm(input.value); if (!q) { reset(); return; } // R3 E1: an empty field clears the answer
    const i = TOWNS.findIndex(t => norm(t.name) === q), j = i >= 0 ? i : q.length >= 3 ? TOWNS.findIndex(t => norm(t.name).startsWith(q)) : -1;
    if (j >= 0) pick(j, false); else if (q.length >= 3) { root.classList.remove('has-town'); [...chips.children].forEach(b => b.setAttribute('aria-pressed', 'false')); point(null); say(null, input.value.trim()); }
  };
  const onInput = () => { clearTimeout(wait); wait = setTimeout(answer, 150); }; // R3 E2: 150ms, read at settle
  const field = root.querySelector('.tw3-field');
  const onSubmit = e => { e.preventDefault(); clearTimeout(wait); answer(); field.classList.remove('is-hook'); void field.offsetWidth; field.classList.add('is-hook'); }; // R33 press: the hook clicks
  const onChip = e => { const b = e.target.closest('.tw3-chips button'); if (b) pick(+b.dataset.i, true); };
  const onPrev = e => { const b = e.target.closest('.tw3-chips button'); if (b && e.pointerType === 'mouse') point(TOWNS[+b.dataset.i], true); };
  const onPrevOut = e => { const b = e.target.closest('.tw3-chips button'); if (b && e.pointerType === 'mouse') { const on = chips.querySelector('[aria-pressed="true"]'); point(on ? TOWNS[+on.dataset.i] : null, true); } };
  input.addEventListener('input', onInput); root.querySelector('.tw3-form').addEventListener('submit', onSubmit);
  chips.addEventListener('click', onChip); chips.addEventListener('pointerover', onPrev); chips.addEventListener('pointerout', onPrevOut);
  if (c.motion) beats(root, [root.querySelector('.tw-h'), root.querySelector('.tw3-form'), [ans, chips], root.querySelector('.tw3-dial')]);
  point(null, true);
  return () => { clearTimeout(wait); input.removeEventListener('input', onInput); root.querySelector('.tw3-form').removeEventListener('submit', onSubmit); chips.removeEventListener('click', onChip); chips.removeEventListener('pointerover', onPrev); chips.removeEventListener('pointerout', onPrevOut); };
}

// v4 (R3, new): ⟦S0603⟧ evidence doctrine (zero baseline, direct labels, tabular figures). The ordered list is the content
// (phones read it as a plain list); from 900px each town is placed at mi/25 along one tape with 1-mile ticks and labels on
// the 5s; labels take greedy lanes (alternating above and below, three each) so none overlap, with a leader to the tape.
function ruler(root, c) {
  const ol = root.querySelector('.tw4-list'), wrap = root.querySelector('.tw4-wrap'), ticks = root.querySelector('.tw4-ticks'), svg = root.querySelector('.tw4-tape'), read = root.querySelector('.tw4-read');
  const towns = TOWNS.slice(1).sort((a, b) => a.mi - b.mi);
  ol.replaceChildren(...towns.map(t => { const li = document.createElement('li'); li.className = 'tw4-t'; li.tabIndex = 0; li.dataset.c = 'chip'; li.style.setProperty('--x', (t.mi / 25 * 100).toFixed(2)); li.innerHTML = '<span class="nm"></span><span class="mi"></span>'; li.firstChild.textContent = t.name; li.lastChild.textContent = `${t.mi} mi`; li._t = t; return li; }));
  const lay = () => {
    const W = svg.getBoundingClientRect().width; if (!W) return; svg.setAttribute('viewBox', `0 0 ${W} 28`); ticks.replaceChildren();
    for (let m = 0; m <= 25; m++) { const x = (m / 25) * W; el('path', { d: `M${x.toFixed(1)} 0 V${m % 5 ? 8 : 14}` }, ticks); if (m % 5 === 0) { const tx = el('text', { x: (x + (m === 25 ? -3 : 3)).toFixed(1), y: 24, 'text-anchor': m === 25 ? 'end' : 'start' }, ticks); tx.textContent = m ? `${m} mi` : '0'; } }
    // greedy lanes, alternating above/below, as many as the cluster needs; the stage grows to fit
    const N = 12, lanes = Array.from({ length: N }, () => []), items = [...ol.children].map(li => ({ li, w: li.offsetWidth + 14, h: li.offsetHeight })), lh = Math.max(...items.map(o => o.h)) + 6;
    let used = 0;
    items.forEach(o => { const x = (o.li._t.mi / 25) * W, l = x - o.w / 2, r = x + o.w / 2; let k = lanes.findIndex(L => !L.some(([a, b]) => l < b && a < r)); if (k < 0) k = 0; lanes[k].push([l, r]); o.k = k; used = Math.max(used, Math.floor(k / 2) + 1); });
    const mid = 30 + used * lh + 10, H = mid * 2;
    items.forEach(({ li, h, k }) => {
      const up = k % 2 === 0, lane = Math.floor(k / 2), y = up ? mid - 30 - lane * lh - h : mid + 30 + lane * lh;
      li.style.top = y + 'px';
      const lead = up ? mid - 14 - (y + h) : y - (mid + 14);
      li.style.setProperty('--lead', Math.max(0, lead) + 'px'); li.style.setProperty('--lt', up ? h + 'px' : -lead + 'px');
    });
    svg.style.top = (mid - 14) + 'px';
    wrap.style.setProperty('--h', H + 'px');
  };
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => { if (root.isConnected) lay(); });
  const ro = new ResizeObserver(() => { if (innerWidth >= 900) lay(); }); ro.observe(wrap);
  const show = e => { const li = e.target.closest('.tw4-t'); if (li) read.textContent = `${li._t.name}: ${fact(li._t)}`; };
  ol.addEventListener('pointerover', show); ol.addEventListener('focusin', show);
  if (c.motion) beats(root, [root.querySelector('.tw-h'), root.querySelector('.tw-note'), wrap]);
  return () => { ro.disconnect(); ol.removeEventListener('pointerover', show); ol.removeEventListener('focusin', show); };
}

// v5 (R3, new): ⟦S1499⟧ chunking: the 23 towns (plus home) grouped by compass direction (8 sectors of 45 degrees), each
// list nearest first, under an arrow rotated to the sector's bearing; the office sits in the centre cell; an empty
// direction says so. Cells enter once, 40ms apart.
function directions(root, c) {
  const grid = root.querySelector('.tw5-grid'), NAME = ['North', 'Northeast', 'East', 'Southeast', 'South', 'Southwest', 'West', 'Northwest'];
  const POS = [1, 2, 5, 8, 7, 6, 3, 0]; // sector -> cell index in the 3x3 grid (north on top)
  const cells = Array.from({ length: 9 }, () => null);
  NAME.forEach((n, k) => {
    const list = TOWNS.slice(1).filter(t => Math.round(t.brg / 45) % 8 === k).sort((a, b) => a.mi - b.mi);
    const d = document.createElement('section'); d.className = 'tw5-cell';
    d.innerHTML = `<h3><svg class="tw5-arr" viewBox="0 0 24 24" aria-hidden="true" focusable="false" style="transform:rotate(${k * 45}deg)"><path d="M12 2 L19 20 L12 16 L5 20 Z"/></svg></h3>`;
    d.querySelector('h3').append(n);
    if (list.length) { const ul = document.createElement('ul'); list.forEach(t => { const li = document.createElement('li'); li.innerHTML = '<span></span><span class="mi"></span>'; li.firstChild.textContent = t.name; li.lastChild.textContent = `${t.mi} mi`; ul.append(li); }); d.append(ul); }
    else { const p = document.createElement('p'); p.className = 'tw5-none'; p.textContent = 'None on our list.'; d.append(p); }
    cells[POS[k]] = d;
  });
  const home = document.createElement('div'); home.className = 'tw5-cell tw5-home';
  home.innerHTML = '<svg viewBox="0 0 40 40" aria-hidden="true" focusable="false"><path d="M6 20 L20 7 L34 20 V34 H6 Z" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/></svg><b>Springboro</b><span>38 N Pioneer Blvd</span>';
  cells[4] = home;
  grid.replaceChildren(...cells);
  if (c.motion) beats(root, [root.querySelector('.tw-h'), root.querySelector('.tw-note'), grid.children], { stagger: 0.04 });
}

export default { 1: map, 2: cards, 3: finder, 4: ruler, 5: directions };
