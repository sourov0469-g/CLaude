// AREA: where we work. The firm's own 24 towns (TOWNS, US Census 2023 centroids). Facts only: names, and straight-line
// miles from the Springboro office (haversine from the coordinates, rounded to whole miles). Nothing about drive times,
// response times or coverage beyond the list. Every version draws the same real geography three ways:
//   v1 Route   a road line visits the towns nearest first, drawn by scroll (S0407 draw-on and motion along a path)
//   v2 Your town   a live lookup: a sentence with an inline field (S1442, S0661); the town dots answer (S0089)
//   v3 Radar   distance rings and true bearings; a slow sweep pings each town (S0489 water ripple, endless loop)
import { gsap } from 'gsap';
import { TOWNS } from '../../data/towns.js';
import { lines, rise, onEnter, EASE } from '../../js/fx.js';
import { parallax } from '../../js/depth.js';
import { loop } from '../../js/gl.js';

const RAD = Math.PI / 180, MPD = 69.05, R_EARTH = 3958.8; // statute miles per degree of latitude; Earth radius in miles
const O = TOWNS[0], KX = Math.cos(O.lat * RAD);
const hav = t => { const a = Math.sin((t.lat - O.lat) * RAD / 2) ** 2 + Math.cos(O.lat * RAD) * Math.cos(t.lat * RAD) * Math.sin((t.lon - O.lon) * RAD / 2) ** 2; return 2 * R_EARTH * Math.asin(Math.sqrt(a)); };
// equirectangular projection around Springboro with x scaled by cos(lat): miles east (x) and south (y) of the office
const T = TOWNS.map((t, i) => { const d = hav(t); return { name: t.name, i, d, n: Math.round(d), brg: t.brg, x: (t.lon - O.lon) * KX * MPD, y: (O.lat - t.lat) * MPD }; });
const NEAR = [...T].sort((a, b) => a.d - b.d); // nearest first, by the precise distance (the route never crosses itself)
const AZ = [...T].sort((a, b) => a.name.localeCompare(b.name));
const BX = { x0: Math.min(...T.map(t => t.x)), x1: Math.max(...T.map(t => t.x)), y0: Math.min(...T.map(t => t.y)), y1: Math.max(...T.map(t => t.y)) };
const away = t => (t.i ? `${t.n} miles from our Springboro office` : 'Our office');
const NS = 'http://www.w3.org/2000/svg';
const el = (tag, attrs, parent, cls) => { const e = document.createElementNS(NS, tag); for (const k in attrs || {}) e.setAttribute(k, attrs[k]); if (cls) e.setAttribute('class', cls); if (parent) parent.append(e); return e; };
const f1 = v => Math.round(v * 10) / 10;

// fit the projected box into W x H with padding [top, right, bottom, left]
function fit(W, H, [pt, pr, pb, pl]) {
  const w = Math.max(10, W - pl - pr), h = Math.max(10, H - pt - pb);
  const s = Math.min(w / (BX.x1 - BX.x0), h / (BX.y1 - BX.y0));
  const ox = pl + (w - s * (BX.x1 - BX.x0)) / 2 - s * BX.x0, oy = pt + (h - s * (BX.y1 - BX.y0)) / 2 - s * BX.y0;
  return { s, X: t => ox + t.x * s, Y: t => oy + t.y * s, cx: ox, cy: oy };
}

// Greedy label placement: each label tries 8 spots around its dot, nearest towns first, and takes the spot with the least
// overlap (other labels, dots, obstacles, the frame), preferring the side that points away from Springboro.
function placeLabels(items, W, H, cx, cy, extra = []) {
  const boxes = extra.map(b => ({ k: 1, ...b }));
  items.forEach(d => boxes.push({ x: d.x - d.r - 2, y: d.y - d.r - 2, w: d.r * 2 + 4, h: d.r * 2 + 4, k: 2 }));
  const ov = (x, y, w, h, b) => Math.max(0, Math.min(x + w, b.x + b.w) - Math.max(x, b.x)) * Math.max(0, Math.min(y + h, b.y + b.h) - Math.max(y, b.y));
  const order = items.map((d, i) => i).sort((a, b) => Math.hypot(items[a].x - cx, items[a].y - cy) - Math.hypot(items[b].x - cx, items[b].y - cy));
  const out = [];
  for (const i of order) {
    const d = items[i], g = d.r + 6, { w, h } = d;
    const C = [[g, -h / 2, 'r'], [-g - w, -h / 2, 'l'], [g * 0.55, -h - g * 0.25, 'r'], [g * 0.55, g * 0.25, 'r'], [-w - g * 0.55, -h - g * 0.25, 'l'], [-w - g * 0.55, g * 0.25, 'l'], [-w / 2, -h - g * 0.8, 'c'], [-w / 2, g * 0.8, 'c']];
    const ox = d.x - cx, oy = d.y - cy, ol = Math.hypot(ox, oy) || 1;
    let best = null, bs = Infinity;
    C.forEach(([dx, dy, side], k) => {
      const x = d.x + dx, y = d.y + dy;
      let s = 0;
      for (const b of boxes) s += ov(x, y, w, h, b) * b.k;
      s += (Math.max(0, -x) + Math.max(0, x + w - W) + Math.max(0, -y) + Math.max(0, y + h - H)) * 400;
      const lx = x + w / 2 - d.x, ly = y + h / 2 - d.y;
      s += (1 - (lx * ox + ly * oy) / ((Math.hypot(lx, ly) || 1) * ol)) * 10 + k * 0.5;
      if (s < bs) { bs = s; best = { x, y, side }; }
    });
    boxes.push({ x: best.x, y: best.y, w, h, k: 3 }); out[i] = best;
  }
  return out;
}
const measure = els => els.map(e => ({ w: e.offsetWidth, h: e.offsetHeight })); // one batched read, before any write
const fontsReady = () => (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve());

// ---------------------------------------------------------------------------------------------------------------------
// v1 Route. Narrative: the road leaves the office and visits every town, nearest first. Between two towns it turns
// around Springboro (radius and bearing both interpolate), so distance only ever grows and the road never crosses itself.
// S0407: stroke draw-on with pathLength="1" (dashoffset 1 -> 0), scrubbed, ease none; a plain dot rides the same path,
// placed by arc length on the polyline the path is made of (motion along a path). Each town lights when the road arrives.
// Depth (S0204 speeds, S1321 parallax): on wide screens the photo travels at 0.08x and the map at 0.15x of the scroll,
// the words at 1x, so the map stays in view while the copy passes it. Not pinned.
function routeV(root, c) {
  const layer = root.querySelector('.av1-mapl'), map = root.querySelector('.av1-map'), svg = root.querySelector('.av1-svg');
  const ol = root.querySelector('.av1-towns'), now = root.querySelector('.av1-now'), nn = now.querySelector('.av1-nn'), nd = now.querySelector('.av1-nd');
  const bg = root.querySelector('.av1-bg');
  if (!ol.children.length) NEAR.forEach(t => { const li = document.createElement('li'); li.innerHTML = `<span class="av-nm">${t.name}</span><span class="vh">, ${away(t).replace(/^O/, 'o')}</span>`; ol.append(li); });
  const lis = [...ol.children];
  const S = { total: 1, cum: [], pts: [], reach: [], dots: [], road: null, casing: null, marker: null, p: c.motion ? 0 : 1, idx: -2 };

  let sig = '';
  const layout = force => {
    const W = map.clientWidth; if (!W) return;
    const wide = c.wide, key = W + 'x' + map.clientHeight;
    if (key === sig && !force) return; sig = key;
    // narrow screens: the map is as tall as its geography; labels move into a list under it (the map simplifies)
    const H = wide ? map.clientHeight : Math.round(W * (BX.y1 - BX.y0) / (BX.x1 - BX.x0)) + 40;
    if (!wide) svg.style.height = H + 'px'; else svg.style.height = '';
    const sizes = wide ? measure(lis) : [];
    const nowBox = wide ? { x: 0, y: 0, w: now.offsetWidth + 12, h: now.offsetHeight + 12 } : null;
    const F = fit(W, H, wide ? [16, 96, 16, 96] : [20, 18, 20, 18]);
    const P = NEAR.map(t => ({ t, X: F.X(t), Y: F.Y(t) }));
    // the road: polar interpolation around the office between consecutive towns, every 2 degrees
    const cx = F.cx, cy = F.cy, pts = [[cx, cy]], at = [0];
    for (let i = 1; i < P.length; i++) {
      const A = P[i - 1], B = P[i];
      const ra = Math.hypot(A.X - cx, A.Y - cy), rb = Math.hypot(B.X - cx, B.Y - cy);
      const ab = Math.atan2(B.X - cx, -(B.Y - cy)), aa = i === 1 ? ab : Math.atan2(A.X - cx, -(A.Y - cy));
      let d = ab - aa; d = ((d + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI;
      const n = Math.max(2, Math.ceil(Math.abs(d) / (2 * RAD)), Math.ceil(Math.abs(rb - ra) / 6));
      for (let k = 1; k <= n; k++) { const u = k / n, r = ra + (rb - ra) * u, a = aa + d * u; pts.push([cx + Math.sin(a) * r, cy - Math.cos(a) * r]); }
      pts[pts.length - 1] = [B.X, B.Y]; at.push(pts.length - 1);
    }
    const cum = [0]; for (let k = 1; k < pts.length; k++) cum.push(cum[k - 1] + Math.hypot(pts[k][0] - pts[k - 1][0], pts[k][1] - pts[k - 1][1]));
    S.pts = pts; S.cum = cum; S.total = cum[cum.length - 1]; S.reach = at.map(k => cum[k]);
    const dPath = 'M' + pts.map(p => f1(p[0]) + ' ' + f1(p[1])).join('L');

    svg.setAttribute('viewBox', `0 0 ${W} ${H}`); svg.replaceChildren();
    el('path', { d: dPath }, svg, 'av1-ghost');
    S.casing = el('path', { d: dPath, pathLength: 1 }, svg, 'av1-casing');
    S.road = el('path', { d: dPath, pathLength: 1 }, svg, 'av1-road');
    // a 5-mile scale bar, bottom left (an honest map key)
    const sb = 5 * F.s, sx = 12, sy = H - 18;
    const keyG = el('g', { transform: `translate(${sx} ${sy})` }, svg, 'av1-key');
    el('path', { d: `M0 -6V0H${f1(sb)}V-6` }, keyG);
    el('text', { x: f1(sb + 8), y: 0 }, keyG).textContent = '5 miles';
    const dg = el('g', {}, svg, 'av1-dots');
    S.dots = P.map((p, i) => el('circle', { cx: f1(p.X), cy: f1(p.Y), r: i ? 4.5 : 7 }, dg, i ? 'av1-dot' : 'av1-dot av1-home'));
    S.marker = el('g', {}, svg, 'av1-mk');
    el('circle', { r: 15 }, S.marker, 'av1-mk-h'); el('circle', { r: 7 }, S.marker, 'av1-mk-d');
    S.marker.style.display = c.motion ? '' : 'none';
    if (!wide) el('text', { x: f1(cx + 12), y: f1(cy - 10) }, svg, 'av1-home-l').textContent = 'Springboro';

    if (wide) { // labels on the map, placed around their dots
      const extra = [{ ...nowBox }, { x: sx - 4, y: sy - 22, w: sb + 80, h: 30 }];
      for (let k = 0; k < pts.length; k += 5) extra.push({ x: pts[k][0] - 3, y: pts[k][1] - 3, w: 6, h: 6, k: 0.25 });
      const spots = placeLabels(P.map((p, i) => ({ x: p.X, y: p.Y, r: i ? 5 : 8, ...sizes[i] })), W, H, cx, cy, extra);
      lis.forEach((li, i) => { li.style.left = f1(spots[i].x) + 'px'; li.style.top = f1(spots[i].y) + 'px'; li.dataset.side = spots[i].side; });
    } else lis.forEach(li => { li.style.left = li.style.top = ''; });
    S.idx = -2; render(S.p);
  };

  const pointAt = L => { // arc-length lookup on the road's own polyline (binary search)
    const { cum, pts } = S; let lo = 0, hi = cum.length - 1;
    if (L <= 0) return pts[0]; if (L >= cum[hi]) return pts[hi];
    while (hi - lo > 1) { const m = (lo + hi) >> 1; if (cum[m] <= L) lo = m; else hi = m; }
    const u = (L - cum[lo]) / (cum[hi] - cum[lo] || 1);
    return [pts[lo][0] + (pts[hi][0] - pts[lo][0]) * u, pts[lo][1] + (pts[hi][1] - pts[lo][1]) * u];
  };
  const setIdx = k => {
    if (k === S.idx) return;
    const first = S.idx === -2; S.idx = k;
    lis.forEach((li, i) => { li.classList.toggle('is-lit', i <= k); li.classList.toggle('is-now', i === k && c.motion); });
    S.dots.forEach((d, i) => { d.classList.toggle('is-lit', i <= k); d.classList.toggle('is-now', i === k && c.motion); });
    const t = NEAR[k]; nn.textContent = t.name; nd.textContent = away(t);
    if (c.motion && !first) gsap.fromTo(now.children, { y: 4, autoAlpha: 0.2 }, { y: 0, autoAlpha: 1, duration: 0.15, ease: EASE, overwrite: true }); // S0410 text swap
  };
  function render(p) {
    S.p = p; if (!S.road) return;
    const off = (1 - p).toFixed(5);
    S.road.style.strokeDashoffset = off; S.casing.style.strokeDashoffset = off;
    const L = p * S.total, [mx, my] = pointAt(L);
    S.marker.setAttribute('transform', `translate(${f1(mx)} ${f1(my)})`);
    let k = 0; while (k + 1 < S.reach.length && S.reach[k + 1] <= L + 0.5) k++;
    setIdx(k);
  }

  const ro = new ResizeObserver(() => layout()); ro.observe(map);
  fontsReady().then(() => { if (S.alive) layout(true); });
  S.alive = true;
  layout();

  if (c.motion) {
    lines(root.querySelector('h2'), { scrollTrigger: onEnter(root.querySelector('h2'), { start: 'top 88%' }) });
    rise(root.querySelectorAll('.av1-end > *'), { scrollTrigger: onEnter(root.querySelector('.av1-end'), { start: 'top 90%' }) });
    const prog = { p: 0 };
    const st = c.wide ? { trigger: root, start: 'top 38%', end: 'bottom bottom+=80' } : { trigger: svg, start: 'top 78%', end: 'bottom 42%' };
    gsap.to(prog, { p: 1, ease: 'none', scrollTrigger: { ...st, scrub: 0.6, invalidateOnRefresh: true }, onUpdate: () => render(Math.min(1, prog.p / 0.96)) });
    if (c.wide) { // the slow layers: screen speed k, positioned so the whole map is in view while the road draws
      const slow = (target, k, endTop) => {
        const u0 = () => root.offsetHeight - innerHeight - 80; // scroll offset (from "top top") where the draw ends
        const s0 = () => endTop + k * u0();
        gsap.fromTo(target, { y: () => s0() - (1 - k) * innerHeight }, { y: () => s0() + (1 - k) * root.offsetHeight, ease: 'none', scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true } });
      };
      slow(layer, 0.15, -16);
      slow(bg, 0.08, -70);
    }
  }
  return () => { S.alive = false; ro.disconnect(); lis.forEach(li => li.classList.remove('is-lit', 'is-now')); };
}

// ---------------------------------------------------------------------------------------------------------------------
// v2 Your town. A live lookup (S1442: one field, a persistent visible label, autocomplete="address-level2"; S0661: no
// verdict while the visitor is still typing, the "not on our list" answer only after Enter or leaving the field, re-checked
// on input once shown, results in a polite live region). S0089: typing is high-frequency, so nothing moves per keystroke;
// names and dots change colour in 150ms. The one sanctioned motion is the matched town's dot growing on the map.
const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z]+/g, ' ').trim().replace(/\s+(oh|ohio)$/, '').replace(/^(city of|village of)\s+/, '');
const KEYS = T.map(t => { const n = norm(t.name); return { n, flat: n.replace(/ /g, ''), words: n.split(' ') }; });
const list = names => (names.length < 2 ? names.join('') : names.slice(0, -1).join(', ') + ' or ' + names[names.length - 1]);
function lookupV(root, c) {
  const svg = root.querySelector('.av2-svg'), wrap = root.querySelector('.av2-mapl'), form = root.querySelector('.av2-ask');
  const input = root.querySelector('.av2-input'), ans = root.querySelector('.av2-ans'), ul = root.querySelector('.av2-names');
  if (!ul.children.length) AZ.forEach(t => { const li = document.createElement('li'); li.textContent = t.name; li.dataset.i = t.i; ul.append(li); });
  const lis = [], byI = {}; [...ul.children].forEach(li => { byI[li.dataset.i] = li; }); T.forEach(t => lis.push(byI[t.i]));
  const S = { dots: [], link: null, tag: null, committed: false, timer: 0, hits: new Set(), exact: -1, hov: -1, F: null };

  let sig = '';
  const layout = () => {
    const W = wrap.clientWidth, H = wrap.clientHeight; if (!W || !H || W + 'x' + H === sig) return; sig = W + 'x' + H;
    const F = S.F = fit(W, H, c.wide ? [110, 40, 40, Math.max(40, W * 0.48)] : [Math.max(60, H - W * 1.25 - 40), 18, 40, 18]);
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`); svg.replaceChildren();
    const sp = el('g', {}, svg, 'av2-spokes');
    S.spokes = T.map((t, i) => (i ? el('line', { x1: f1(F.cx), y1: f1(F.cy), x2: f1(F.X(t)), y2: f1(F.Y(t)) }, sp) : null));
    S.link = el('line', { x1: f1(F.cx), y1: f1(F.cy), x2: f1(F.cx), y2: f1(F.cy) }, svg, 'av2-link');
    const g = el('g', {}, svg, 'av2-dots');
    S.dots = T.map((t, i) => el('circle', { cx: f1(F.X(t)), cy: f1(F.Y(t)), r: i ? 5 : 7 }, g, i ? 'av2-dot' : 'av2-dot av2-home'));
    el('text', { x: f1(F.cx + 14), y: f1(F.cy + 5) }, svg, 'av2-home-l').textContent = 'Springboro';
    S.tag = el('text', { x: 0, y: 0 }, svg, 'av2-tag');
    paint(true);
  };
  const paint = () => { // classes only; CSS changes colour in 150ms and grows the matched dot
    const q = !!norm(input.value);
    ul.classList.toggle('is-q', q); svg.classList.toggle('is-q', q);
    T.forEach((t, i) => {
      const hit = S.hits.has(i), ex = S.exact === i;
      lis[i].classList.toggle('is-hit', hit); lis[i].classList.toggle('is-on', ex);
      const d = S.dots[i]; if (!d) return;
      d.classList.toggle('is-hit', hit); d.classList.toggle('is-on', ex); d.classList.toggle('is-hov', S.hov === i);
      const s = S.spokes && S.spokes[i]; if (s) { s.classList.toggle('is-hit', hit); s.classList.toggle('is-hov', S.hov === i); }
    });
    if (S.F && S.link) {
      const t = T[S.exact];
      svg.classList.toggle('has-on', !!(t && t.i));
      if (t && t.i) {
        const x = S.F.X(t), y = S.F.Y(t), right = x < S.F.cx + 40;
        S.link.setAttribute('x2', f1(x)); S.link.setAttribute('y2', f1(y));
        S.tag.textContent = `${t.n} miles`; S.tag.setAttribute('x', f1(x + (right ? 16 : -16))); S.tag.setAttribute('y', f1(y + 5)); S.tag.setAttribute('text-anchor', right ? 'start' : 'end');
      }
    }
  };
  const match = raw => {
    const q = norm(raw), flat = q.replace(/ /g, '');
    if (!q) return { q, hits: [], exact: -1 };
    const hits = []; let exact = -1;
    KEYS.forEach((k, i) => {
      if (k.n === q || k.flat === flat) exact = i;
      if (k.n.startsWith(q) || k.flat.startsWith(flat) || k.words.some(w => w.startsWith(q))) hits.push(i);
    });
    return { q, hits, exact };
  };
  const say = html => { if (ans.innerHTML !== html) ans.innerHTML = html; };
  const yes = i => (i ? `<strong>Yes.</strong> ${T[i].name} is ${T[i].n} miles from our Springboro office.` : '<strong>Yes.</strong> Our office is in Springboro.');
  const update = (commit, enter) => {
    clearTimeout(S.timer);
    let m = match(input.value);
    if (enter && m.exact < 0 && m.hits.length === 1) { input.value = T[m.hits[0]].name; m = match(input.value); } // Enter accepts the one candidate
    S.hits = new Set(m.hits); S.exact = m.exact; paint();
    if (!m.q) { S.committed = false; ans.dataset.state = ''; say(''); return; }
    if (m.exact >= 0) { if (commit) S.committed = true; ans.dataset.state = 'yes'; say(yes(m.exact)); return; }
    if (commit || S.committed) S.committed = true;
    const names = m.hits.map(i => T[i].name).sort();
    let state = '', html = '';
    if (!names.length) { if (S.committed) { state = 'no'; html = '<strong>Not on our list of 24.</strong> Call and ask.'; } }
    else if (names.length <= 4) { state = 'maybe'; html = `Do you mean ${list(names)}?`; }
    else { state = 'maybe'; html = `${names.length} of our towns match so far.`; }
    const apply = () => { ans.dataset.state = state; say(html); };
    if (commit || state === 'no' || !html) apply(); else S.timer = setTimeout(apply, 300); // S0661: debounce the live text
  };
  const onInput = () => update(false, false);
  const onSubmit = e => { e.preventDefault(); update(true, true); };
  const onBlur = () => { if (norm(input.value)) update(true, false); };
  const onKey = e => { if (e.key === 'Escape' && input.value) { input.value = ''; update(false, false); } };
  input.addEventListener('input', onInput); form.addEventListener('submit', onSubmit); input.addEventListener('blur', onBlur); input.addEventListener('keydown', onKey);
  // pointer: a name under the pointer finds its dot on the map (fine pointers; colour, plus growth when motion is allowed)
  const over = e => { const li = e.target.closest('li'); const i = li ? +li.dataset.i : -1; if (i !== S.hov) { S.hov = i; paint(); } };
  const out = () => { if (S.hov !== -1) { S.hov = -1; paint(); } };
  if (c.fine) { ul.addEventListener('pointerover', over); ul.addEventListener('pointerleave', out); }

  const ro = new ResizeObserver(() => layout()); ro.observe(wrap);
  layout(); if (input.value) update(false, false);

  if (c.motion) {
    lines(root.querySelector('h2'), { scrollTrigger: onEnter(root) });
    rise([root.querySelector('.av2-q'), root.querySelector('.av2-act')], { scrollTrigger: onEnter(root, { start: 'top 70%' }), delay: 0.2 });
    gsap.fromTo(ul.children, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: EASE, stagger: { amount: 0.4 }, scrollTrigger: onEnter(ul, { start: 'top 92%' }) }); // the 24 as one group, 400ms in total
    gsap.fromTo(svg, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8, ease: EASE, scrollTrigger: onEnter(root, { start: 'top 70%' }) });
    parallax(root);
  }
  return () => {
    clearTimeout(S.timer); ro.disconnect();
    input.removeEventListener('input', onInput); form.removeEventListener('submit', onSubmit); input.removeEventListener('blur', onBlur); input.removeEventListener('keydown', onKey);
    ul.removeEventListener('pointerover', over); ul.removeEventListener('pointerleave', out);
  };
}

// ---------------------------------------------------------------------------------------------------------------------
// v3 Radar. A data graphic: rings every 5 miles, each town at its true bearing and straight-line distance. S0489: one main
// action (the sweep, one turn per 8s, linear, as endless loops are) plus the pings it causes: a ring grows 0 to 1 with a
// bell fade as the sweep passes a town. On entry the rings ripple out from the office (ease-out, "things that arrive").
// Nothing runs unseen (gl.js loop: off-screen and hidden tab pause). Reduced motion: one still frame, sweep at 40 degrees.
// Hovering grows the label nearest the pointer; the labels are the full list in text for keyboard and touch.
const BANDS = [[-1, 5, 'Within 5 miles'], [5, 10, '5 to 10 miles'], [10, 15, '10 to 15 miles'], [15, 20, '15 to 20 miles'], [20, 25, '20 to 25 miles']];
const PERIOD = 8, PING = 1.3, WEDGE = 30;
const bell = p => Math.sin(Math.PI * Math.min(1, Math.max(0, p))); // S0489 bell: fades in and out over its run
function radarV(root, c) {
  const box = root.querySelector('.av3-radar'), svg = root.querySelector('.av3-svg'), dl = root.querySelector('.av3-bands');
  if (!dl.children.length) BANDS.forEach(([lo, hi, label]) => {
    const dt = document.createElement('dt'); dt.textContent = label;
    const dd = document.createElement('dd'), ul = document.createElement('ul');
    T.filter(t => t.d > lo && t.d <= hi).sort((a, b) => a.d - b.d).forEach(t => {
      const li = document.createElement('li'); li.dataset.i = t.i;
      li.innerHTML = `<span class="av-nm">${t.name}</span><span class="vh">, ${t.i ? t.n + ' miles' : 'our office'}</span>`; ul.append(li);
    });
    dd.append(ul); dl.append(dt, dd);
  });
  const lis = []; dl.querySelectorAll('li').forEach(li => { lis[+li.dataset.i] = li; });
  const S = { size: 0, c: 0, R: 0, pos: [], dots: [], pings: [], sweep: null, rings: [], ang: c.motion ? 0 : 40, near: -1, last: 0, t: 0, start: [] };

  const layout = labelsOnly => {
    const W = box.clientWidth; if (!W) return;
    if (W === S.size) { if (labelsOnly === true) placeR(); return; }
    const size = S.size = W, ctr = S.c = size / 2, R = S.R = size / 2 * (c.wide ? 0.8 : 0.92);
    const pos = S.pos = T.map(t => { const r = t.d / 25 * R, a = t.brg * RAD; return [ctr + Math.sin(a) * r, ctr - Math.cos(a) * r]; });
    svg.setAttribute('viewBox', `0 0 ${size} ${size}`); svg.replaceChildren();
    el('circle', { cx: ctr, cy: ctr, r: f1(R) }, svg, 'av3-disc');
    const ticks = el('g', {}, svg, 'av3-ticks');
    for (let b = 0; b < 360; b += 5) { const a = b * RAD, l = b % 30 ? 5 : 10; ticks.append(el('line', { x1: f1(ctr + Math.sin(a) * R), y1: f1(ctr - Math.cos(a) * R), x2: f1(ctr + Math.sin(a) * (R + l)), y2: f1(ctr - Math.cos(a) * (R + l)) })); }
    el('text', { x: ctr, y: f1(ctr - R - 18) }, svg, 'av3-n').textContent = 'N';
    const rg = el('g', {}, svg, 'av3-rings');
    S.rings = [1, 2, 3, 4, 5].map(k => el('circle', { cx: ctr, cy: ctr, r: f1(R * k / 5) }, rg));
    const rl = el('g', {}, svg, 'av3-rl'), la = 160 * RAD; const rlBoxes = [];
    [1, 2, 3, 4, 5].forEach(k => {
      const r = R * k / 5, x = ctr + Math.sin(la) * r + 4, y = ctr - Math.cos(la) * r + 4;
      el('text', { x: f1(x), y: f1(y) }, rl).textContent = k === 5 ? '25 miles' : String(k * 5);
      rlBoxes.push({ x: x - 2, y: y - 12, w: k === 5 ? 62 : 22, h: 16 });
    });
    S.sweep = el('g', {}, svg, 'av3-sweep');
    // the trail: three flat slices that fade behind the beam (no gradients, PLAN 3)
    [[0, 8, 0.16], [8, 18, 0.085], [18, WEDGE, 0.04]].forEach(([a0, a1, o]) => {
      const p0 = -a0 * RAD, p1 = -a1 * RAD;
      el('path', { d: `M${ctr} ${ctr}L${f1(ctr + Math.sin(p1) * R)} ${f1(ctr - Math.cos(p1) * R)}A${f1(R)} ${f1(R)} 0 0 1 ${f1(ctr + Math.sin(p0) * R)} ${f1(ctr - Math.cos(p0) * R)}Z`, 'fill-opacity': o }, S.sweep, 'av3-wedge');
    });
    el('line', { x1: ctr, y1: ctr, x2: ctr, y2: f1(ctr - R) }, S.sweep, 'av3-beam');
    const pg = el('g', {}, svg, 'av3-pings');
    S.pings = pos.map(p => el('circle', { cx: f1(p[0]), cy: f1(p[1]), r: 0 }, pg));
    const dg = el('g', {}, svg, 'av3-dots');
    S.dots = pos.map((p, i) => el('circle', { cx: f1(p[0]), cy: f1(p[1]), r: i ? 4.5 : 7 }, dg, i ? 'av3-dot' : 'av3-dot av3-home'));
    S.rlBoxes = rlBoxes; placeR();
    S.start = T.map(() => -1e9); draw();
  };
  const placeR = () => {
    if (!c.wide) { lis.forEach(li => { li.style.left = li.style.top = ''; }); return; }
    const sizes = measure(lis);
    const spots = placeLabels(S.pos.map((p, i) => ({ x: p[0], y: p[1], r: i ? 5 : 8, ...sizes[i] })), S.size, S.size, S.c, S.c, S.rlBoxes);
    lis.forEach((li, i) => { li.style.left = f1(spots[i].x) + 'px'; li.style.top = f1(spots[i].y) + 'px'; li.dataset.side = spots[i].side; });
  };
  const draw = () => {
    if (!S.sweep) return;
    S.sweep.setAttribute('transform', `rotate(${f1(S.ang)} ${S.c} ${S.c})`);
    S.pings.forEach((p, i) => {
      const k = (S.t - S.start[i]) / PING;
      if (k < 0 || k > 1) { if (p.dataset.on) { p.setAttribute('r', 0); p.style.opacity = 0; delete p.dataset.on; } return; }
      p.dataset.on = 1; p.setAttribute('r', f1(4 + 18 * k)); p.style.opacity = (bell(k) * 0.9).toFixed(3);
    });
  };
  const ro = new ResizeObserver(() => layout()); ro.observe(box);
  layout(); fontsReady().then(() => { if (S.alive) layout(true); }); S.alive = true;

  let lp = null;
  if (c.motion) {
    const ent = gsap.timeline({ scrollTrigger: onEnter(box, { start: 'top 75%' }) });
    ent.add(lines(root.querySelector('h2')), 0).add(rise(root.querySelectorAll('.av3-copy > :not(h2)')), 0.35);
    ent.fromTo(S.rings, { scale: 0.04, autoAlpha: 0, transformOrigin: '50% 50%' }, { scale: 1, autoAlpha: 1, duration: 1.2, ease: EASE, stagger: 0.09 }, 0.1); // S0489 ripple
    ent.fromTo(svg.querySelectorAll('.av3-ticks, .av3-rl, .av3-n, .av3-disc'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6, ease: EASE }, 0.1);
    // each town appears as the ripple reaches its distance (one group, 500ms spread)
    const appear = T.map(t => 0.2 + (t.d / 25) * 0.5);
    T.forEach((t, i) => { ent.fromTo([S.dots[i], lis[i]], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35, ease: EASE }, appear[i]); });
    ent.fromTo(S.sweep, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6, ease: EASE }, 0.6);
    lp = loop(svg, dt => {
      if (!ent.progress()) return false; // the sweep starts with the entrance
      const prev = S.ang; S.t += dt; S.ang = (S.ang + dt / PERIOD * 360) % 360;
      T.forEach((t, i) => { if (!i) return; const b = t.brg, crossed = prev <= S.ang ? b > prev && b <= S.ang : b > prev || b <= S.ang; if (crossed) S.start[i] = S.t; });
      draw();
    });
    ent.eventCallback('onStart', () => lp && lp.wake());
  } else draw();

  // hover: the label nearest the pointer grows (rects read on enter and on scroll, not per move)
  let rect = null;
  const near = i => {
    if (i === S.near) return;
    if (S.near >= 0) { lis[S.near].classList.remove('is-near'); S.dots[S.near] && S.dots[S.near].classList.remove('is-near'); }
    S.near = i;
    if (i >= 0) { lis[i].classList.add('is-near'); S.dots[i] && S.dots[i].classList.add('is-near'); }
  };
  const move = e => {
    if (e.pointerType !== 'mouse' || !S.pos.length) return;
    rect = rect || svg.getBoundingClientRect();
    const k = S.size / rect.width, x = (e.clientX - rect.left) * k, y = (e.clientY - rect.top) * k;
    let best = -1, bd = 70 * k;
    S.pos.forEach((p, i) => { const d = Math.hypot(p[0] - x, p[1] - y); if (d < bd) { bd = d; best = i; } });
    near(best);
  };
  const leave = () => { rect = null; near(-1); };
  const scrolled = () => { rect = null; };
  if (c.fine) { box.addEventListener('pointermove', move); box.addEventListener('pointerleave', leave); addEventListener('scroll', scrolled, { passive: true }); }
  return () => {
    S.alive = false; ro.disconnect(); if (lp) lp.stop(); near(-1);
    box.removeEventListener('pointermove', move); box.removeEventListener('pointerleave', leave); removeEventListener('scroll', scrolled);
  };
}

export default { 1: routeV, 2: lookupV, 3: radarV };
