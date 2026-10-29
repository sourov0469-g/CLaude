/* The 1|2|3 section switcher (PLAN §3.6) and the alternate versions (Run D).
   Defaults are server-rendered; versions 2 and 3 live as <template>s in versions.html, fetched on first use (inert until then).
   Switched-out versions are parked in a fragment, not destroyed: switching back is instant and keeps their state. */
import { V } from './registry.js';
import './header.js'; import './hero.js'; import './storm.js'; import './inspect.js'; import './layers.js'; import './estimate.js';
import './install.js'; import './signature.js'; import './work.js'; import './reviews.js'; import './people.js'; import './towns.js';
import './insurance.js'; import './faq.js'; import './close.js'; import './footer.js';
import { stormMode } from './storm-mode.js';

const RR = window.RR, { d, H, $, $$, P, track } = RR;
import { ORDER } from './order.js';
export { ORDER };
const NAMES = {
  header: ['Lamp pill', 'Chapter rail', 'Sign-painter overlay'], hero: ['First light', 'Condition report', 'Raking light, live'],
  storm: ['One night in May', 'The year in one roof', 'Twenty years in twenty seconds'], inspect: ['The lamp', 'Street view, roof view', 'Ask the roof'],
  layers: ['Exploded roof', 'Core sample', 'Choose what goes on top'], estimate: ['The paper', 'Read the estimate', 'Build your request'],
  install: ['Install day, step by step', 'One day, time-lapse', 'Install day on the clock'], signature: ['Sign here', 'The terms, plainly', 'Fifty years'],
  work: ['Plates', 'On the table', 'Light line'], reviews: ['Read them where we can\'t edit them', 'How to check any roofer', 'Live from Google'],
  people: ['The people who answer', 'Thirty years of Dayton weather', 'Rachel answers'], towns: ['Distance rings', 'Your town\'s roofs', 'Roofline of towns'],
  insurance: ['The claim, in order', 'The adjuster\'s checklist', 'Your questions, answered by the office'], faq: ['Plain answers', 'Ask by situation', 'Find it by the picture'],
  close: ['The number', 'Dusk', 'Tomorrow\'s light'], footer: ['Directory + wordmark', 'Porch light', 'Colophon and receipt']
};
const TITLES = { header: 'Header', hero: 'Hero', storm: 'The storm', inspect: 'Raking light', layers: 'Layers', estimate: 'The estimate', install: 'Install day', signature: 'Signature & warranty', work: 'Real roofs', reviews: 'Reviews', people: 'Family & community', towns: 'Towns', insurance: 'Insurance & paying', faq: 'Questions', close: 'Close', footer: 'Footer' };
const STATE_CLS = ['is-solid', 'is-hidden', 'glint'];
export const sectionOf = key => key === 'header' ? $('.hdr') : key === 'footer' ? $('.ftr') : $(`section[data-chapter="${key}"]`);
const cur = {}, store = {};
ORDER.forEach(k => cur[k] = 1);
const clean = P.get('clean') === '1';

// styles first (pills and versions), then templates on demand
const cssReady = new Promise(res => { const l = d.createElement('link'); l.rel = 'stylesheet'; l.href = new URL('../css/versions.css', import.meta.url).href; l.onload = l.onerror = res; d.head.append(l); });
let tplDoc = null;
async function templates() {
  if (!tplDoc) { const html = await fetch(new URL('../versions.html', import.meta.url).href).then(r => r.text()); tplDoc = new DOMParser().parseFromString(html, 'text/html'); }
  return tplDoc;
}

export async function swap(key, n, opts = {}) {
  const sec = sectionOf(key); n = n === 's' ? 's' : +n; // 's': the storm-mode compact S2 (§3.12)
  if (!sec || !NAMES[key] || !((n >= 1 && n <= 3) || (n === 's' && key === 'storm')) || cur[key] === n) return false;
  await cssReady;
  const doc = n === 1 ? null : await templates();
  const tpl = doc && doc.getElementById(`tpl-${key}-${n}`); if (n !== 1 && !tpl) return false;
  const top0 = sec.getBoundingClientRect().top;
  const st = store[key] || (store[key] = {}), out = cur[key];
  const pill = sec.querySelector(':scope > .vpill');
  const frag = d.createDocumentFragment(); [...sec.childNodes].forEach(c => { if (c !== pill) frag.append(c); });
  const keep = STATE_CLS.filter(c => sec.classList.contains(c));
  st[out] = { frag, cls: sec.className.split(' ').filter(c => !STATE_CLS.includes(c)).join(' '), label: sec.getAttribute('aria-labelledby') };
  try { V[key]?.[out]?.off?.(sec); } catch (e) {}
  let first = false;
  if (st[n]) { sec.insertBefore(st[n].frag, pill); sec.className = st[n].cls; setLabel(sec, st[n].label); }
  else { first = true; sec.insertBefore(d.importNode(tpl.content, true), pill); sec.className = tpl.dataset.class; setLabel(sec, tpl.dataset.label); }
  keep.forEach(c => sec.classList.add(c));
  cur[key] = n;
  RR.syncSms();
  if (first) { RR.enhance(sec); try { V[key]?.[n]?.init?.(sec); } catch (e) { console.warn(key, n, e); } }
  try { V[key]?.[n]?.on?.(sec); } catch (e) {}
  updatePill(key);
  if (!opts.silent) { writeUrl(); track('version_switch', { section: key, v: n }); }
  // no jump: put the section top back where it was at once, then again after the incoming images decode (§3.13), capped at 400ms
  const keepTop = () => { if (opts.keep === false || key === 'header') return; const top1 = sec.getBoundingClientRect().top; if (Math.abs(top1 - top0) > 0.5) scrollBy({ top: top1 - top0, behavior: 'instant' }); }; // instant: the page sets scroll-behavior: smooth
  RR.refresh(); keepTop();
  const near = $$('img', sec).filter(i => !i.complete && i.loading !== 'lazy').slice(0, 8);
  await Promise.race([Promise.all(near.map(i => i.decode().catch(() => {}))), new Promise(r => setTimeout(r, 400))]);
  RR.refresh(); keepTop();
  d.dispatchEvent(new CustomEvent('rr:version', { detail: { key, n } }));
  return true;
}
function setLabel(sec, id) { if (id) sec.setAttribute('aria-labelledby', id); else sec.removeAttribute('aria-labelledby'); }

// buttons inside inserted versions that add a service to the estimate (V1's own are bound by app.js; a Set makes doubles harmless)
d.addEventListener('click', e => { const a = e.target.closest('[data-adds]'); if (a) { RR.est.services = [...new Set([...(RR.est.services || []), a.dataset.adds])]; RR.saveEst(); } });

// motion toggles inside inserted versions (the footer alternates); V1's are bound by app.js
$$('[data-motion-set]').forEach(b => b.dataset.bound = '1');
d.addEventListener('click', e => {
  const b = e.target.closest('[data-motion-set]'); if (!b || b.dataset.bound) return;
  try { localStorage.setItem('rr-motion', b.dataset.motionSet); sessionStorage.setItem('rr-y', String(scrollY)); } catch (er) {}
  const u = new URL(location.href); u.searchParams.delete('motion'); location.replace(u);
});
d.addEventListener('rr:version', () => $$('[data-motion-set]:not([data-bound])').forEach(b => b.setAttribute('aria-pressed', String((b.dataset.motionSet === 'calm') === H.classList.contains('calm')))));

// ---------- pills
function pillFor(key) {
  const sec = sectionOf(key); if (!sec || sec.querySelector(':scope > .vpill')) return;
  const g = d.createElement('div'); g.className = 'vpill'; g.setAttribute('role', 'group'); g.setAttribute('aria-label', `Versions of ${TITLES[key]}`); g.dataset.key = key;
  g.innerHTML = '<i class="hl" aria-hidden="true"></i>' + [1, 2, 3].map(n => `<button type="button" data-v="${n}" aria-pressed="${n === 1}" title="${n}: ${NAMES[key][n - 1].replace(/"/g, '&quot;')}">${n}${n === 1 ? '<b class="def" aria-hidden="true"></b>' : ''}</button>`).join('');
  g.addEventListener('click', e => { const b = e.target.closest('[data-v]'); if (b) swap(key, b.dataset.v); });
  g.addEventListener('keydown', e => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return; e.preventDefault();
    const n = (cur[key] + (e.key === 'ArrowRight' ? 0 : 1)) % 3 + 1; swap(key, n).then(() => g.querySelector(`[data-v="${n}"]`).focus());
  });
  sec.append(g);
}
function updatePill(key) {
  const g = sectionOf(key)?.querySelector(':scope > .vpill'); if (!g) return;
  $$('[data-v]', g).forEach(b => b.setAttribute('aria-pressed', String(+b.dataset.v === cur[key])));
  g.style.setProperty('--i', cur[key] - 1);
}

// ---------- URL state: ?v=hero:2,storm:3 (non-defaults only)
function writeUrl() {
  const u = new URL(location.href); const v = ORDER.filter(k => typeof cur[k] === 'number' && cur[k] !== 1).map(k => `${k}:${cur[k]}`).join(',');
  if (v) u.searchParams.set('v', v); else u.searchParams.delete('v');
  history.replaceState(history.state, '', u.pathname + (u.search ? u.search.replace(/%3A/gi, ':').replace(/%2C/gi, ',') : '') + u.hash);
}
function readUrl() { return (P.get('v') || '').split(',').map(s => s.split(':')).filter(([k, n]) => NAMES[k] && /^[123]$/.test(n)); }

// ---------- keyboard: 1 2 3 switch the section nearest the 40% line, H hides the pills
function nearest() {
  const y = innerHeight * 0.4; let best = null, bd = Infinity;
  ORDER.forEach(k => { if (k === 'header') return; const s = sectionOf(k); if (!s) return; const r = s.getBoundingClientRect(); const dd = r.top <= y && r.bottom >= y ? 0 : Math.min(Math.abs(r.top - y), Math.abs(r.bottom - y)); if (dd < bd) { bd = dd; best = k; } });
  return best;
}
d.addEventListener('keydown', e => {
  if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
  const t = e.target; if (t && (t.closest('input,select,textarea,[contenteditable]') || t.isContentEditable)) return;
  if (/^[123]$/.test(e.key)) { const k = nearest(); if (k) swap(k, +e.key); }
  else if (e.key === 'h' || e.key === 'H') H.classList.toggle('vp-off');
});

// ---------- ?showcase=1: a "Versions" index with a copy-link button
function showcase() {
  const b = d.createElement('div'); b.className = 'vindex';
  b.innerHTML = `<button type="button" class="vindex-btn" aria-expanded="false" aria-controls="vindex-panel">Versions</button><div class="vindex-panel" id="vindex-panel" hidden><ol>${ORDER.map(k => `<li><b>${TITLES[k]}</b>${NAMES[k].map((nm, i) => `<button type="button" data-k="${k}" data-n="${i + 1}">${i + 1} ${nm}</button>`).join('')}</li>`).join('')}</ol><button type="button" class="copy" data-copy>Copy link to this mix</button></div>`;
  const btn = $('.vindex-btn', b), panel = $('.vindex-panel', b);
  btn.onclick = () => { panel.hidden = !panel.hidden; btn.setAttribute('aria-expanded', String(!panel.hidden)); };
  panel.addEventListener('click', e => {
    const s = e.target.closest('[data-k]'); if (s) { const sec = sectionOf(s.dataset.k); swap(s.dataset.k, s.dataset.n, { keep: false }).then(() => sec && s.dataset.k !== 'header' && sec.scrollIntoView({ block: 'start' })); }
    if (e.target.closest('[data-copy]')) { navigator.clipboard && navigator.clipboard.writeText(location.href); e.target.textContent = 'Copied'; setTimeout(() => e.target.textContent = 'Copy link to this mix', 1200); }
  });
  d.body.append(b);
}

// ---------- start
(async () => {
  await cssReady;
  if (!clean) ORDER.forEach(pillFor);
  H.classList.add('has-versions'); if (clean) H.classList.add('vp-clean');
  if (P.get('showcase') === '1') showcase();
  const wanted = readUrl();
  for (const [k, n] of wanted) await swap(k, +n, { silent: true, keep: false });
  if (wanted.length) { writeUrl(); if (location.hash) { const t = d.getElementById(location.hash.slice(1)); t && t.scrollIntoView(); } }
  RR.swap = swap; RR.versions = cur;
  stormMode({ swap, cur, sectionOf, templates });
})();
export { cur };
