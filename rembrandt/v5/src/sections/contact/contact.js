// CONTACT PAGE, the office and the towns (R5, versioned per section; build/gen-pages.py). The towns come from
// data/towns.js; nothing is typed by hand. The phone and the hours live in the cthero section. Reveal-level motion only.
import { gsap } from 'gsap';
import { beats } from '../../js/fx.js';
import { TOWNS } from '../../data/towns.js';

const DIR = ['north', 'northeast', 'east', 'southeast', 'south', 'southwest', 'west', 'northwest'];
const dir = b => DIR[Math.round(b / 45) % 8];
const near = () => [...TOWNS].sort((a, b) => a.mi - b.mi);
const az = () => [...TOWNS].sort((a, b) => a.name.localeCompare(b.name));
const mi = t => (t.mi ? `${t.mi} mi` : 'Home');
function common(root, c) {
  root.querySelectorAll('[data-towns]').forEach(ul => {
    const k = ul.dataset.towns, ts = k === 'az' ? az() : near();
    ul.innerHTML = ts.map(t => `<li>${t.name}<span class="num">${mi(t)}</span></li>`).join('');
  });
}
const rise = (root, sel, c) => { if (c.motion) beats(root, [...root.querySelectorAll(sel)].map(x => [x])); };

// v1 the office and the towns A to Z
function list(root, c) { common(root, c); rise(root, '.ct1-office, .ct1-towns', c); }
// v2 ⟦S0603⟧ + [BANK] Austin Pro map: the towns at true bearing and distance (5 units a mile) beside the list
function distance(root, c) {
  common(root, c);
  const g = root.querySelector('.ct-ring-dots'), NS = 'http://www.w3.org/2000/svg';
  TOWNS.filter(t => t.mi).forEach(t => { const a = t.brg * Math.PI / 180, d = document.createElementNS(NS, 'circle');
    d.setAttribute('r', '4'); d.setAttribute('class', 'ct-ring-dot'); d.setAttribute('cx', (Math.sin(a) * t.mi * 5).toFixed(1)); d.setAttribute('cy', (-Math.cos(a) * t.mi * 5).toFixed(1)); g.append(d); });
  if (c.motion) gsap.from(g.children, { scale: 0.4, autoAlpha: 0, transformOrigin: '50% 50%', duration: 0.3, ease: 'back.out(2)', stagger: 0.02, delay: 0.3 });
  rise(root, '.ct2-office, .ct2-list', c);
}
// v3 (R5) towns by distance band: a WAI-ARIA tablist (arrows, Home, End); each band lists its towns, nearest first
function bands(root, c) {
  common(root, c);
  root.querySelectorAll('[data-band]').forEach(ul => { const [a, b] = ul.dataset.band.split('-').map(Number);
    ul.innerHTML = near().filter(t => t.mi >= a && (t.mi < b || (b === 25 && t.mi <= b))).map(t => `<li>${t.name}<span class="num">${mi(t)}</span></li>`).join(''); });
  const tabs = [...root.querySelectorAll('.ct3-tab')], pans = [...root.querySelectorAll('.ct3-pan')];
  const show = (i, focus) => { tabs.forEach((t, j) => { t.setAttribute('aria-selected', String(j === i)); t.tabIndex = j === i ? 0 : -1; }); pans.forEach((p, j) => { p.hidden = j !== i; }); if (focus) tabs[i].focus(); };
  const on = e => { const t = e.target.closest('.ct3-tab'); if (t) show(tabs.indexOf(t)); };
  const key = e => { const i = tabs.indexOf(e.target); if (i < 0) return; const n = tabs.length; const j = { ArrowRight: (i + 1) % n, ArrowLeft: (i - 1 + n) % n, Home: 0, End: n - 1 }[e.key]; if (j === undefined) return; e.preventDefault(); show(j, true); };
  root.addEventListener('click', on); root.addEventListener('keydown', key);
  rise(root, '.ct3-office, .ct3-towns', c);
  return () => { root.removeEventListener('click', on); root.removeEventListener('keydown', key); };
}
// v4 the towns as chips, nearest first, beside the office
function chips(root, c) { common(root, c); rise(root, '.ct4-office, .ct4-towns', c); }
// v5 [BANK] ROTTLER finder + West London checker: a town field; a match (case and punctuation ignored) answers yes, with
// miles and direction; anything else says it is not on the list and to call
function finder(root, c) {
  common(root, c);
  const inp = root.querySelector('.ct5-in'), out = root.querySelector('.ct5-out'), dl = root.querySelector('#ct5-list');
  dl.innerHTML = az().map(t => `<option value="${t.name}">`).join('');
  const norm = s => s.toLowerCase().replace(/[^a-z]/g, '');
  const on = () => { const q = norm(inp.value); out.classList.remove('is-yes');
    if (!q) { out.textContent = ''; return; }
    const t = TOWNS.find(x => norm(x.name) === q);
    if (t) { out.classList.add('is-yes'); out.textContent = t.mi ? `Yes. ${t.name} is ${t.mi} miles ${dir(t.brg)} of our office, in ${t.county} County.` : 'Yes. Springboro is home: the office is at 38 N Pioneer Blvd.'; }
    else if (q.length >= 3) out.innerHTML = 'That town isn\u2019t on our list of 24. Call Rachel and ask: <a class="rx" href="tel:+19377467377" data-c="call">(937) 746-7377</a>.';
    else out.textContent = ''; };
  inp.addEventListener('input', on);
  rise(root, '.ct5-office', c);
  return () => inp.removeEventListener('input', on);
}
export default { 1: list, 2: distance, 3: bands, 4: chips, 5: finder };
