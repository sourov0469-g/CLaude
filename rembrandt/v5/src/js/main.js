// Boot: smooth scroll, the version registry behind every section's 1 · 2 · 3 picker, and the global cursor and depth.
// Each section module exports { 1: init, 2: init, 3: init }. An init gets (root, c) and runs inside a gsap.matchMedia()
// scoped to its version root, so switching versions reverts every tween, ScrollTrigger, pin and split it made (G8 #4).
// c = { motion, reduce, fine, wide, swap, sec, id }. An init may return a cleanup for rAF loops, observers and GL.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';
import { initCursor } from './cursor.js';
import { initDepth } from './depth.js';
import { prepText } from './textfx.js';

gsap.registerPlugin(ScrollTrigger, SplitText);
gsap.defaults({ ease: 'power3.out', duration: 0.8 });

const IMG = window.__IMG || {};
export const img = k => IMG[k];
const hydrate = root => root.querySelectorAll('img[data-img]:not([src])').forEach(i => { i.src = IMG[i.dataset.img]; });
const RM = matchMedia('(prefers-reduced-motion: reduce)');
const FINE = matchMedia('(hover: hover) and (pointer: fine)');
const Q = { motion: '(prefers-reduced-motion: no-preference)', reduce: '(prefers-reduced-motion: reduce)', fine: '(hover: hover) and (pointer: fine)', wide: '(min-width: 900px)' };

// ---------- smooth scroll (S1321 setup; off for reduced motion and touch, G4 #7)
export let lenis = null;
const lenisRaf = t => lenis && lenis.raf(t * 1000);
function startLenis() {
  if (lenis || RM.matches || !FINE.matches) return;
  lenis = new Lenis({ lerp: 0.08, smoothWheel: true, wheelMultiplier: 0.9, anchors: { offset: 0 } });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(lenisRaf); gsap.ticker.lagSmoothing(0);
  document.documentElement.classList.add('lenis');
}
function stopLenis() { if (!lenis) return; gsap.ticker.remove(lenisRaf); lenis.destroy(); lenis = null; document.documentElement.classList.remove('lenis'); }

// ---------- versions
let MODS = {}, ORDER = [];
const live = new Map();
const rank = el => { const s = el && el.closest && el.closest('[data-section]'); return s ? ORDER.indexOf(s) : -1; };
function sortRefresh() { // refresh in page order, so a re-created pin above lays out before triggers below it (G8 #6)
  ScrollTrigger.sort((a, b) => rank(a.trigger) - rank(b.trigger) || a.start - b.start);
  ScrollTrigger.refresh();
}
function mount(sec, v, swap) {
  const id = sec.dataset.section, prev = live.get(id);
  if (prev) { prev.mm.revert(); document.dispatchEvent(new Event('versionswap')); }
  const stage = sec.querySelector('.stage');
  if (swap) stage.replaceChildren(document.getElementById(`tpl-${id}-${v}`).content.cloneNode(true));
  hydrate(stage);
  const root = stage.firstElementChild;
  root.dataset.v = v; sec.dataset.v = v;
  const mm = gsap.matchMedia();
  mm.add(Q, ctx => {
    if (ctx.conditions.motion && ctx.conditions.fine) prepText(root);
    const init = MODS[id] && MODS[id][v];
    return init ? init(root, { ...ctx.conditions, swap, sec, id }) : undefined;
  }, root);
  live.set(id, { mm, v });
}
const announce = t => { const a = document.getElementById('announce'); a.textContent = ''; requestAnimationFrame(() => { a.textContent = t; }); };
function setUrl() {
  const u = new URL(location.href);
  const v = [...live].filter(([, s]) => s.v !== 1).map(([id, s]) => id + s.v).join(',');
  if (v) u.searchParams.set('v', v); else u.searchParams.delete('v');
  try { history.replaceState(null, '', u); } catch (e) { /* file:// in some browsers */ }
}
function readUrl() { // ?v=hero2,proof3 (strict: unknown ids or versions are ignored)
  const out = {}; let raw = '';
  try { raw = new URL(location.href).searchParams.get('v') || ''; } catch (e) { return out; }
  for (const part of raw.split(',')) { const m = /^([a-z]+)([123])$/.exec(part.trim()); if (m && MODS[m[1]]) out[m[1]] = +m[2]; }
  return out;
}
export function switchTo(sec, v) {
  const id = sec.dataset.section, cur = live.get(id);
  if (!cur || cur.v === v) return;
  const before = sec.getBoundingClientRect().top;
  if (lenis) lenis.stop();
  mount(sec, v, true);
  sortRefresh();
  // keep the section where it was; if the visitor was inside it, start the new version at its top
  const top = window.scrollY + sec.getBoundingClientRect().top;
  const y = before < -2 ? top : window.scrollY + (sec.getBoundingClientRect().top - before);
  if (lenis) { lenis.scrollTo(y, { immediate: true, force: true }); lenis.start(); } else window.scrollTo(0, y);
  ScrollTrigger.update();
  const p = sec.querySelector(`input[value="${v}"]`); if (p && !p.checked) p.checked = true;
  setUrl();
  announce(`${sec.querySelector('legend').textContent.replace(': choose a version', '')}: version ${v} of 3`);
}

export function boot(mods) {
  MODS = mods;
  document.querySelectorAll('img[data-img][src]').forEach(i => { IMG[i.dataset.img] = IMG[i.dataset.img] || i.getAttribute('src'); });
  ORDER = [...document.querySelectorAll('[data-section]')];
  for (const sec of ORDER) { // version 1 is live markup; keep a pristine copy so it can come back
    const t = document.createElement('template'); t.id = `tpl-${sec.dataset.section}-1`;
    t.innerHTML = sec.querySelector('.stage').innerHTML; document.body.append(t);
  }
  startLenis();
  const want = readUrl();
  for (const sec of ORDER) mount(sec, want[sec.dataset.section] || 1, !!want[sec.dataset.section] && want[sec.dataset.section] !== 1);
  for (const sec of ORDER) {
    const p = sec.querySelector(`input[value="${live.get(sec.dataset.section).v}"]`); if (p) p.checked = true;
    sec.querySelector('.pick').addEventListener('change', e => switchTo(sec, +e.target.value));
  }
  // keys 1, 2, 3 switch the section in view; R replays it (S1303 picker spec)
  let inView = ORDER[0];
  for (const sec of ORDER) ScrollTrigger.create({ trigger: sec, start: 'top center', end: 'bottom center', onToggle: s => { if (s.isActive) inView = sec; } });
  addEventListener('keydown', e => {
    if (e.metaKey || e.ctrlKey || e.altKey || e.target.closest('input,textarea,select,[contenteditable]')) return;
    if (/^[123]$/.test(e.key)) switchTo(inView, +e.key);
    else if (e.key === 'r' || e.key === 'R') { const s = live.get(inView.dataset.section); mount(inView, s.v, true); sortRefresh(); }
  });
  // one filled call per view (S1435, G6 #1): the nav's call button waits until the hero's own has scrolled away
  const nav = document.querySelector('.nav'), hero = document.getElementById('hero');
  if (nav && hero) ScrollTrigger.create({ trigger: hero, start: 'top bottom', end: 'bottom 35%', onToggle: s => nav.classList.toggle('nav--quiet', s.isActive) });
  initCursor(); initDepth();
  RM.addEventListener('change', () => (RM.matches ? stopLenis() : startLenis()));
  FINE.addEventListener('change', () => (FINE.matches ? startLenis() : stopLenis()));
  window.ScrollTrigger = ScrollTrigger; // inspection hook for the QA scripts
  sortRefresh();
  addEventListener('load', () => sortRefresh());
  if (document.fonts) document.fonts.ready.then(() => ScrollTrigger.refresh());
}
export { gsap, ScrollTrigger, SplitText };
