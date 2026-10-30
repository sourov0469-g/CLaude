// Boot: smooth scroll, the version registry behind every section's 1 · 2 · 3 picker, and the global cursor and depth.
// Each section module exports { 1: init, 2: init, 3: init }. An init gets (root, c) and runs inside a gsap.matchMedia()
// scoped to its version root, so switching versions reverts every tween, ScrollTrigger, pin and split it made (G8 #4).
// c = { motion, reduce, fine, wide, swap, sec, id, ctx }. ctx.add(fn) records late work (after fonts load) in the same
// context. An init may return a cleanup for rAF loops, observers and GL.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import Lenis from 'lenis';
import { initDepth } from './depth.js';
import { initMagnet } from './magnet.js';
import { initCompanion } from './companion.js';
import { initDividers } from './dividers.js';

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);
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
    const init = MODS[id] && MODS[id][v];
    return init ? init(root, { ...ctx.conditions, swap, sec, id, ctx }) : undefined;
  }, root);
  live.set(id, { mm, v });
  const bk = String(v)[0] === 'b'; sec.classList.toggle('on-bk', bk); if (bk) showBk(sec, true);
  paintBg(sec, root);
}
// PLAN-V7 §4b: each section paints its active version's background (--vbg on the version root, else its computed
// background); the neighbours' dividers take that colour (--prev-bg on the next host, --next-bg on the one above).
function paintBg(sec, root) {
  const cs = getComputedStyle(root);
  let bg = cs.getPropertyValue('--vbg').trim();
  if (!bg) { const c = cs.backgroundColor; bg = c && c !== 'rgba(0, 0, 0, 0)' && c !== 'transparent' ? c : getComputedStyle(document.documentElement).getPropertyValue('--sky').trim(); }
  sec.style.setProperty('--sec-bg', bg);
  const next = sec.nextElementSibling || document.getElementById('foot');
  if (next) next.style.setProperty('--prev-bg', bg);
  const prev = sec.previousElementSibling; if (prev && prev.matches('[data-section]')) prev.style.setProperty('--next-bg', bg);
  if (sec.id === 'call') { const f = document.getElementById('foot'); if (f) f.style.setProperty('--prev-bg', bg); }
}
const announce = t => { const a = document.getElementById('announce'); a.textContent = ''; requestAnimationFrame(() => { a.textContent = t; }); };
function setUrl() {
  const u = new URL(location.href);
  const v = [...live].filter(([id, s]) => s.v !== DEF(id)).map(([id, s]) => id + s.v).join(',');
  if (v) u.searchParams.set('v', v); else u.searchParams.delete('v');
  try { history.replaceState(null, '', u); } catch (e) { /* file:// in some browsers */ }
}
// ⟦S0736⟧ tweaks pattern: choices persist client-side under a per-artifact key and are re-applied at first paint;
// T hides or shows the controls, R resets to defaults. One knob per section (its version).
const KEY = 'tweaks-rembrandt-home';
const store = { get() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }, set(v) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) { /* private mode */ } } };
function save() { const o = { companion: store.get().companion }; for (const [id, s] of live) if (s.v !== DEF(id)) o[id] = s.v; store.set(o); }
// versions are strings: '1'-'5' visible, 'b1'-'b3' the backups (audit pack 2026-10-30 A2); each section's default is its
// audit winner (data-def, set by the build)
const DEF = id => document.getElementById(id).dataset.def || '1';
const valid = (id, v) => !!(MODS[id] && document.getElementById(`v-${id}-${v}`));
function readUrl() { // ?v=hero2,proofb1 (strict: unknown ids or versions are ignored)
  const out = {}; let raw = '';
  try { raw = new URL(location.href).searchParams.get('v') || ''; } catch (e) { return out; }
  for (const part of raw.split(',')) { const m = /^([a-z]+?)([1-5]|b[1-3])$/.exec(part.trim()); if (m && valid(m[1], m[2])) out[m[1]] = m[2]; }
  return out;
}
// the hidden Backup buttons: the picker's "more" button (or the B key for every section) shows them; a section showing a
// backup keeps its backup buttons visible so the way back is in view
function showBk(sec, on) {
  const b = sec.querySelector('.pick-more'); if (!b) return;
  on = on ?? b.getAttribute('aria-expanded') !== 'true';
  if (!on && sec.classList.contains('on-bk')) return;
  b.setAttribute('aria-expanded', String(on)); sec.querySelector('.pick').classList.toggle('show-bk', on); placeInd(sec);
}
// R3 D7: the picker's sliding indicator sits under the checked label; the glyph plays once on a switch
function placeInd(sec, play) {
  const pk = sec.querySelector('.pick'); let ind = pk.querySelector('.pick-ind');
  if (!ind) { ind = document.createElement('span'); ind.className = 'pick-ind'; ind.setAttribute('aria-hidden', 'true'); pk.classList.add('has-ind', 'no-anim'); pk.prepend(ind); requestAnimationFrame(() => requestAnimationFrame(() => pk.classList.remove('no-anim'))); }
  const l = pk.querySelector('input:checked + label'); if (!l || !l.offsetParent) { ind.style.opacity = '0'; return; }
  ind.style.opacity = ''; ind.style.translate = `${l.offsetLeft}px 0`; ind.style.top = `${l.offsetTop}px`;
  if (play) { pk.classList.remove('is-sw'); void pk.offsetWidth; pk.classList.add('is-sw'); clearTimeout(pk._sw); pk._sw = setTimeout(() => pk.classList.remove('is-sw'), 320); }
}
export function switchTo(sec, v) {
  v = String(v);
  const id = sec.dataset.section, cur = live.get(id);
  if (!valid(id, v)) return;
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
  placeInd(sec, true);
  setUrl(); save();
  const n = sec.querySelectorAll('.pick > input').length;
  announce(`${sec.querySelector('legend').textContent.replace(': choose a version', '')}: ${v[0] === 'b' ? `backup ${v.slice(1)}` : `version ${v} of ${n}`}`);
}

export function boot(mods) {
  // sections mount once the embedded Epilogue is ready (capped at 1.2s), so every init that measures or draws type
  // (the Constellation's "4.9" outline, the hero canvases) runs on the real font, as it did in the owner-kept build
  const fontReady = document.fonts ? Promise.race([Promise.all(['300', '800', '900'].map(w => document.fonts.load(`${w} 100px Epilogue`))), new Promise(r => setTimeout(r, 1200))]) : Promise.resolve();
  fontReady.then(() => start(mods), () => start(mods));
}
function start(mods) {
  MODS = mods;
  document.querySelectorAll('img[data-img][src]').forEach(i => { IMG[i.dataset.img] = IMG[i.dataset.img] || i.getAttribute('src'); });
  ORDER = [...document.querySelectorAll('[data-section]')];
  for (const sec of ORDER) { // version 1 is live markup; keep a pristine copy so it can come back
    const t = document.createElement('template'); t.id = `tpl-${sec.dataset.section}-${sec.dataset.def || 1}`;
    t.innerHTML = sec.querySelector('.stage').innerHTML; document.body.append(t);
  }
  startLenis();
  hydrate(document.getElementById('foot') || document.createElement('i'));
  // [BANK] Q107 Anton & Irene: one reduced-motion flag on <html>, read by CSS and JS
  const flag = () => { document.documentElement.dataset.motion = RM.matches ? 'reduced' : 'full'; };
  flag(); RM.addEventListener('change', flag);
  const saved = store.get(), url = readUrl();
  const want = Object.keys(url).length ? url : Object.fromEntries(Object.entries(saved).filter(([id, v]) => id !== 'companion' && valid(id, String(v))).map(([id, v]) => [id, String(v)]));
  initDividers();
  for (const sec of ORDER) { const id = sec.dataset.section, w = want[id]; mount(sec, w || DEF(id), !!w && w !== DEF(id)); }
  for (const sec of ORDER) {
    const p = sec.querySelector(`input[value="${live.get(sec.dataset.section).v}"]`); if (p) p.checked = true;
    sec.querySelector('.pick').addEventListener('change', e => switchTo(sec, e.target.value));
    const more = sec.querySelector('.pick-more'); if (more) more.addEventListener('click', () => showBk(sec));
    placeInd(sec);
  }
  addEventListener('resize', () => ORDER.forEach(s => placeInd(s)));
  // keys 1-5 switch the section in view (S1303 picker spec); B shows every section's backup buttons; T and R per S0736
  let inView = ORDER[0];
  for (const sec of ORDER) ScrollTrigger.create({ trigger: sec, start: 'top center', end: 'bottom center', onToggle: s => { if (s.isActive) inView = sec; } });
  addEventListener('keydown', e => {
    if (e.metaKey || e.ctrlKey || e.altKey || e.target.closest('input,textarea,select,[contenteditable]')) return;
    if (/^[1-5]$/.test(e.key)) switchTo(inView, e.key);
    else if (e.key === 'b' || e.key === 'B') { const on = !document.documentElement.classList.toggle('bk-shown') ? false : true; for (const sec of ORDER) showBk(sec, on); }
    else if (e.key === 't' || e.key === 'T') document.documentElement.classList.toggle('picks-off');
    else if (e.key === 'r' || e.key === 'R') { for (const sec of ORDER) if (live.get(sec.dataset.section).v !== DEF(sec.dataset.section)) switchTo(sec, DEF(sec.dataset.section)); store.set({ companion: store.get().companion }); }
  });
  // one filled call per view (S1435, G6 #1): the nav's call button waits until the hero's own has scrolled away
  const nav = document.querySelector('.nav'), hero = document.getElementById('hero');
  if (nav && hero) ScrollTrigger.create({ trigger: hero, start: 'top bottom', end: 'bottom 35%', onToggle: s => nav.classList.toggle('nav--quiet', s.isActive) });
  // R3 D11: the per-section cursor effects are retired (Removal Test, S1314: the companion's mood accessories already do
  // their job; S1331: no trail or ripple layer); js/cursorfx.js is kept, unmounted
  initDepth(); initMagnet(); initCompanion(store);
  // PLAN-V7 §4d: every reaction element (.rx) gets a press state on pointer-down and on Enter/Space, separate from
  // its hover state; the section's CSS draws the press. One delegated listener for the page.
  const press = e => {
    const t = e.target.closest && e.target.closest('.rx'); if (!t) return;
    if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') return;
    t.classList.remove('is-press'); void t.offsetWidth; t.classList.add('is-press');
    clearTimeout(t._rx); t._rx = setTimeout(() => t.classList.remove('is-press'), 700);
  };
  addEventListener('pointerdown', press, { passive: true }); addEventListener('keydown', press);
  RM.addEventListener('change', () => (RM.matches ? stopLenis() : startLenis()));
  FINE.addEventListener('change', () => (FINE.matches ? startLenis() : stopLenis()));
  window.ScrollTrigger = ScrollTrigger; window.gsap = gsap; // inspection hooks for the QA scripts
  sortRefresh();
  addEventListener('load', () => sortRefresh());
  if (document.fonts) document.fonts.ready.then(() => ScrollTrigger.refresh());
}
export { gsap, ScrollTrigger, DrawSVGPlugin };
