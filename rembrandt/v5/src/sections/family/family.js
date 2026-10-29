// FAMILY. Facts only (owner): Bunk Walker started Rembrandt in 1995; his son Wade has run it since 2015; Rachel answers
// the phone. The team photo shows nine staff; nobody in it is named, labelled or pointed at (we do not know who is who).
// Each init runs inside the section's gsap.matchMedia() (main.js); tweens and triggers made here revert on swap, and the
// returned cleanup undoes what GSAP does not own (DOM splits, classes, loops, listeners).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { lines, rise, clipIn, onEnter, EASE, MOVE } from '../../js/fx.js';
import { parallax } from '../../js/depth.js';
import { loop } from '../../js/gl.js';

// S1327 split: walk text nodes with a TreeWalker (never flatten), wrap each non-whitespace token in span.wd, keep whitespace
// and inline elements (the name spans, any link) exactly as they are. Returns a restore for the original subtree.
function splitWords(el) {
  const saved = [...el.childNodes].map(n => n.cloneNode(true));
  const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, { acceptNode: n => (n.parentElement.closest('[data-no-split],script,style') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT) });
  const nodes = []; while (walk.nextNode()) nodes.push(walk.currentNode);
  for (const n of nodes) {
    const frag = document.createDocumentFragment();
    for (const part of n.textContent.split(/(\s+)/)) {
      if (!part) continue;
      if (/^\s+$/.test(part)) { frag.append(part); continue; }
      const w = document.createElement('span'); w.className = 'wd'; w.textContent = part; frag.append(w);
    }
    n.replaceWith(frag);
  }
  return () => el.replaceChildren(...saved);
}

// v1 Sentence. Pinned scene (end +=150%, scrub; S1321 pinned story, S0019 row 6) in which the family sentence lights word by
// word (S1327): one normalized progress, local = clamp((p - i * step) / d) with a 25% word overlap, opacity .18 -> 1 and a
// .14em rise, no blur (G9: blur is one-shot only). A sun bar sweeps under each name as it lights (S0410 emphasis, 500ms;
// it retracts in 150ms if the visitor scrolls back). The photo opens with the S1321 clip reveal and drifts at background
// depth; pointer depth moves the photo and the sentence in opposite, unequal amounts (S1330).
function sentence(root, c) {
  if (!c.motion) return; // reduced motion: the whole sentence, names underlined, no pin (S1327)
  const pin = root.querySelector('.fv1-pin'), say = root.querySelector('.fv1-say'), fig = root.querySelector('.fv1-ph'), sy = root.querySelector('.fv1-sy');
  const restore = say.querySelector('.wd') ? null : splitWords(say); // prepText (cursor) may have split it already
  const words = [...say.querySelectorAll('.wd')], N = words.length;
  const OV = 0.25, D = 1 / ((1 - OV) * (N - 1) + 1), STEP = (1 - OV) * D;
  const last = words.map(() => -1);
  const names = [...say.querySelectorAll('.fv1-nm')].map(n => ({ n, i: words.indexOf(n.querySelector('.wd')), on: false }));
  const st = { p: 0 };
  const draw = () => {
    for (let i = 0; i < N; i++) {
      const v = Math.round(Math.min(1, Math.max(0, (st.p - i * STEP) / D)) * 1000) / 1000;
      if (v !== last[i]) { last[i] = v; words[i].style.setProperty('--wp', v); }
    }
    for (const m of names) { // hysteresis so a name does not flicker at the threshold
      const v = last[m.i], on = m.on ? v > 0.45 : v >= 0.7;
      if (on !== m.on) { m.on = on; m.n.classList.toggle('is-lit', on); }
    }
  };
  root.classList.add('is-live'); draw();
  if (c.wide) {
    const v = Number(sy.dataset.sy) || 10;
    gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: pin, start: 'top top', end: '+=150%', scrub: 0.8, pin: true, anticipatePin: 1, invalidateOnRefresh: true } })
      .fromTo(sy, { yPercent: -v / 2 }, { yPercent: v / 2, duration: 1 }, 0) // the bg layer inside the pinned scene (S0019 row 6)
      .fromTo(st, { p: 0 }, { p: 1, duration: 0.86, onUpdate: draw }, 0.04);
  } else { // no pin below 900px: the words light as the sentence passes through the viewport
    gsap.fromTo(st, { p: 0 }, { p: 1, ease: 'none', onUpdate: draw, scrollTrigger: { trigger: say, start: 'top 85%', end: 'bottom 40%', scrub: 0.6 } });
    parallax(root);
  }
  clipIn(fig, { scrollTrigger: onEnter(fig, { start: 'top 85%' }) });
  rise(root.querySelector('.fv1-copy .tlink'), { scrollTrigger: onEnter(root, { start: 'top 45%' }) });
  return () => {
    root.classList.remove('is-live'); names.forEach(m => m.n.classList.remove('is-lit'));
    if (restore) restore(); else words.forEach(w => w.style.removeProperty('--wp'));
  };
}

// v2 Years. S1325 scroll-progress timeline: a semantic <ol>, a quiet base rail from the first dot's centre to the last's,
// a fill at scaleY(progress) (one normalized value, scrub: true, so line head and active step always agree), reached steps
// marked with aria-current="step". Each year rises into its mask when the head reaches it; 2015 counts up from 1995 once
// (G4 #11: easeOutCubic over 1.5s, tabular figures, the real value stays in the HTML). The photo arrives at Today with a
// wipe from the rail's side (S0060 clip reveal, ease-in-out). Huge faint numerals drift at background speed (S0019 rows
// 13 and 14), and the photo and the numerals answer the pointer in opposite, unequal amounts (S1330).
function years(root, c) {
  const tl = root.querySelector('.fv2-tl'), rail = root.querySelector('.fv2-rail'), fill = root.querySelector('.fv2-fill');
  const steps = [...root.querySelectorAll('.fv2-step')], dots = steps.map(s => s.querySelector('.fv2-dot'));
  let f = steps.map(() => 0);
  const measure = () => { // S1325: measure the point centres, not the section edges
    const r = tl.getBoundingClientRect(), ys = dots.map(d => { const b = d.getBoundingClientRect(); return b.top + b.height / 2 - r.top; });
    const a = ys[0], b = ys[ys.length - 1], h = Math.max(0, b - a);
    rail.style.top = a.toFixed(1) + 'px'; rail.style.height = h.toFixed(1) + 'px';
    f = ys.map(y => (h ? (y - a) / h : 0));
  };
  measure();
  const ro = new ResizeObserver(measure); ro.observe(tl);
  ScrollTrigger.addEventListener('refreshInit', measure);
  const off = () => { ro.disconnect(); ScrollTrigger.removeEventListener('refreshInit', measure); rail.style.top = rail.style.height = ''; };
  if (!c.motion) return off; // reduced motion: the complete line, every step reached (S1325)

  root.classList.add('is-live');
  const made = [];
  const plays = steps.map(s => {
    const y = s.querySelector('.fv2-y'), inner = y.querySelector('.ln > span');
    const t = gsap.timeline({ paused: true }).fromTo(inner, { yPercent: 125 }, { yPercent: 0, duration: 0.8, ease: EASE }); // S0451 masked rise
    if (y.dataset.from) {
      let digits = [...inner.querySelectorAll('.ch')];
      if (!digits.length) { // the cursor's prepText did not run (touch): make the digit spans and keep one accessible name
        const text = inner.textContent.trim(), w = document.createElement('span');
        w.className = 'wd'; w.setAttribute('aria-hidden', 'true');
        for (const d of text) { const ch = document.createElement('span'); ch.className = 'ch'; ch.textContent = d; w.append(ch); }
        y.setAttribute('aria-label', text); inner.replaceChildren(w); digits = [...w.children];
        made.push(() => { inner.textContent = text; y.removeAttribute('aria-label'); });
      }
      const to = Number(digits.map(d => d.textContent).join('')), n = { v: Number(y.dataset.from) };
      const write = () => { const s = String(Math.round(n.v)); digits.forEach((d, k) => { if (d.textContent !== s[k]) d.textContent = s[k]; }); };
      write();
      t.fromTo(n, { v: Number(y.dataset.from) }, { v: to, duration: 1.5, ease: 'power2.out', onUpdate: write }, 0);
      made.push(() => { n.v = to; write(); });
    }
    const fig = s.querySelector('.fv2-ph');
    if (fig) t.fromTo(fig, { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: MOVE }, 0.1)
      .fromTo(fig.querySelector('img'), { scale: 1.08 }, { scale: 1, duration: 1.3, ease: EASE }, 0.1);
    return t;
  });
  const shown = steps.map(() => false), on = steps.map(() => false);
  const paint = s => {
    const head = s.isActive || s.progress === 1 ? s.progress : -1;
    let cur = -1;
    steps.forEach((el, i) => {
      const reached = head >= f[i] - 0.002;
      if (reached) cur = i;
      if (reached !== on[i]) { on[i] = reached; el.classList.toggle('is-on', reached); }
      if (reached && !shown[i]) { shown[i] = true; plays[i].play(); } // once (G7 #5)
    });
    steps.forEach((el, i) => (i === cur ? el.setAttribute('aria-current', 'step') : el.removeAttribute('aria-current')));
  };
  gsap.fromTo(fill, { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: rail, start: 'top 62%', end: 'bottom 62%', scrub: true, invalidateOnRefresh: true, onUpdate: paint, onRefresh: paint } });
  rise(root.querySelector('.fv2-cta'), { scrollTrigger: onEnter(root.querySelector('.fv2-cta'), { start: 'top 92%' }) });
  steps.forEach(s => parallax(s, s)); // numerals and the photo, each over its own step's pass
  return () => {
    off(); made.forEach(fn => fn());
    root.classList.remove('is-live'); steps.forEach(el => { el.classList.remove('is-on'); el.removeAttribute('aria-current'); });
  };
}

// v3 Strata. The photo is three bands (sign, people, ground) of one image. On scroll they slide at different rates
// (S0019 row 14: yPercent (i+1)*8, scrub 0.5, three layers) and lock into the one exact picture while it is centred
// (progress .4 to .6 of the section's pass), then part the other way. Under the pointer they shift in opposite, unequal directions (S1330:
// one damped normalized target, alpha = 1 - (1 - 0.055)^(dt*60), dt <= 1/30), loosening only away from the lock, so the
// centred picture is always exact. Calm by default (S0489): small amplitudes, no idle loop.
function strata(root, c) {
  if (!c.motion) return; // reduced motion: the exact picture, still
  const fig = root.querySelector('.fv3-ph'), bands = [...root.querySelectorAll('.fv3-b')];
  lines(root.querySelector('.fv3-h'), { scrollTrigger: onEnter(root) });
  rise(root.querySelectorAll('.fv3-side > *'), { scrollTrigger: onEnter(root.querySelector('.fv3-side'), { start: 'top 90%' }) });
  const k = c.wide ? 1 : 0.5; // S0204: halve the distances on small screens
  let p = 0, lp = null;
  // one pass of the whole section; progress .5 is the section centred in the viewport
  const tl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 0.5, invalidateOnRefresh: true, onUpdate: s => { p = s.progress; if (lp) lp.wake(); } } });
  bands.forEach((b, i) => {
    const a = (i + 1) * 8 * k;
    tl.fromTo(b, { yPercent: a }, { yPercent: 0, duration: 0.28 }, 0.12).to(b, { yPercent: -a, duration: 0.28 }, 0.6);
  });
  tl.set({}, {}, 1);
  if (!c.fine) return;
  const AMP = [0.012, -0.022, 0.034]; // fractions of half the viewport width: sign far, people opposite, ground near
  const set = bands.map(b => gsap.quickSetter(b, 'x', 'px')), was = bands.map(() => 0);
  const s = { x: 0, tx: 0 };
  let hw = innerWidth / 2;
  lp = loop(fig, dt => {
    const a = 1 - Math.pow(1 - 0.055, dt * 60);
    s.x += (s.tx - s.x) * a; s.x = Math.round(s.x * 1000) / 1000;
    const t = Math.min(1, Math.max(0, (Math.abs(p - 0.5) - 0.1) / 0.14)), L = t * t * (3 - 2 * t); // 0 inside the lock
    bands.forEach((b, i) => { const x = Math.round(AMP[i] * hw * s.x * L * 10) / 10; if (x !== was[i]) { was[i] = x; set[i](x); } });
    return Math.abs(s.tx - s.x) > 0.001;
  });
  const move = e => { if (e.pointerType !== 'mouse') return; s.tx = e.clientX / innerWidth * 2 - 1; lp.wake(); };
  const leave = () => { s.tx = 0; lp.wake(); };
  const resize = () => { hw = innerWidth / 2; };
  root.addEventListener('pointermove', move); root.addEventListener('pointerleave', leave); addEventListener('resize', resize);
  return () => {
    lp.stop(); root.removeEventListener('pointermove', move); root.removeEventListener('pointerleave', leave); removeEventListener('resize', resize);
    gsap.set(bands, { x: 0 });
  };
}

export default { 1: sentence, 2: years, 3: strata };
