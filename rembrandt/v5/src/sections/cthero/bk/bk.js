// Backups B1-B5 of the cthero section (R5): the whole-page contact layouts as they stood at cbe610a; verbatim except the prefix ct -> ect and the import paths. Never edit.
// CONTACT PAGE (R4): five layouts over one fact list (build/gen-pages.py). The towns come from data/towns.js; the hours
// line reads Springboro's clock and says only the time and the office hours, never "open now" (a holiday could make it
// untrue, ⟦S1314⟧ no fake live state). Reveal-level motion only.
import { gsap } from 'gsap';
import { EASE, beats } from '../../../js/fx.js';
import { TOWNS } from '../../../data/towns.js';

const DIR = ['north', 'northeast', 'east', 'southeast', 'south', 'southwest', 'west', 'northwest'];
const dir = b => DIR[Math.round(b / 45) % 8];
const near = () => [...TOWNS].sort((a, b) => a.mi - b.mi);
const az = () => [...TOWNS].sort((a, b) => a.name.localeCompare(b.name));
const mi = t => (t.mi ? `${t.mi} mi` : 'Home');
function clock() { // Springboro's day (0 = Monday) and minutes since midnight; null if Intl cannot say
  try {
    const f = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', weekday: 'long', hour: 'numeric', minute: '2-digit', hour12: true });
    const p = Object.fromEntries(f.formatToParts(new Date()).map(x => [x.type, x.value]));
    const h = +new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', hour: 'numeric', hourCycle: 'h23' }).format(new Date());
    const day = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].indexOf(p.weekday);
    return { day, wd: p.weekday, mins: h * 60 + +p.minute, time: `${p.hour}:${p.minute} ${p.dayPeriod.toLowerCase()}` };
  } catch (e) { return null; }
}
function common(root, c) {
  root.querySelectorAll('[data-towns]').forEach(ul => {
    const k = ul.dataset.towns, ts = k === 'az' ? az() : near();
    ul.innerHTML = ts.map(t => `<li>${t.name}<span class="num">${mi(t)}</span></li>`).join('');
  });
  const t = clock(), h = root.querySelector('[data-hours]');
  if (t && h) h.textContent = `It's ${t.time} on ${t.wd} in Springboro. Office hours: Monday to Friday, 9 to 5.`;
  if (c.motion) {
    beats(root, [root.querySelector('.ect-hero')], { now: true });
    gsap.fromTo(root.querySelectorAll('.pg-ridge path'), { drawSVG: '50% 50%' }, { drawSVG: '0% 100%', duration: 0.8, ease: EASE, delay: 0.15 });
  }
  return t;
}
const rise = (root, sel, c) => { if (c.motion) beats(root, [...root.querySelectorAll(sel)].map(x => [x])); };

// v1 [BANK] Q114 the number in giant type: the phone is the headline; office and towns follow
function phone(root, c) { common(root, c); rise(root, '.ect1-office, .ect1-towns', c); }
// v2 ⟦S0603⟧ + [BANK] Austin Pro map: the towns at true bearing and distance (5 units a mile) beside the list
function distance(root, c) {
  common(root, c);
  const g = root.querySelector('.ect-ring-dots'), NS = 'http://www.w3.org/2000/svg';
  TOWNS.filter(t => t.mi).forEach(t => { const a = t.brg * Math.PI / 180, d = document.createElementNS(NS, 'circle');
    d.setAttribute('r', '4'); d.setAttribute('class', 'ect-ring-dot'); d.setAttribute('cx', (Math.sin(a) * t.mi * 5).toFixed(1)); d.setAttribute('cy', (-Math.cos(a) * t.mi * 5).toFixed(1)); g.append(d); });
  if (c.motion) gsap.from(g.children, { scale: 0.4, autoAlpha: 0, transformOrigin: '50% 50%', duration: 0.3, ease: 'back.out(2)', stagger: 0.02, delay: 0.3 });
  rise(root, '.ect2-office, .ect2-list', c);
}
// v3 pack G-call (b) + ⟦S1314⟧: the week strip; a "Now" line at Springboro's day and time (a clock, not a promise)
function week(root, c) {
  const t = common(root, c), now = root.querySelector('.ect3-now'), board = root.querySelector('.ect3-board');
  if (!t) return;
  const row = root.querySelector(`.ect3-day[data-d="${t.day}"]`); row.classList.add('is-today');
  const place = () => { const bar = row.querySelector('.ect3-bar').getBoundingClientRect(), bb = board.getBoundingClientRect();
    Object.assign(now.style, { left: `${bar.left - bb.left + bar.width * (t.mins / 1440)}px`, top: `${bar.top - bb.top - 6}px`, height: `${bar.height + 12}px` }); now.hidden = false; };
  place(); addEventListener('resize', place);
  rise(root, '.ect3-office, .ect3-towns', c);
  return () => removeEventListener('resize', place);
}
// v4 [BANK] Harvest [201] flip card: a button turns the card (aria-pressed); the hidden face is inert
function card(root, c) {
  common(root, c);
  const b = root.querySelector('.ect4-turn'), k = root.querySelector('.ect4-card'), f = root.querySelector('.ect4-front'), bk = root.querySelector('.ect4-back');
  const set = on => { b.setAttribute('aria-pressed', String(on)); k.classList.toggle('is-back', on); f.inert = on; bk.inert = !on; };
  set(false); const on = () => set(b.getAttribute('aria-pressed') !== 'true'); b.addEventListener('click', on);
  rise(root, '.ect4-towns', c);
  return () => b.removeEventListener('click', on);
}
// v5 [BANK] ROTTLER finder + West London checker: a town field; a match (case and punctuation ignored) answers yes, with
// miles and direction; anything else says it is not on the list and to call
function finder(root, c) {
  common(root, c);
  const inp = root.querySelector('.ect5-in'), out = root.querySelector('.ect5-out'), dl = root.querySelector('#ect5-list');
  dl.innerHTML = az().map(t => `<option value="${t.name}">`).join('');
  const norm = s => s.toLowerCase().replace(/[^a-z]/g, '');
  const on = () => { const q = norm(inp.value); out.classList.remove('is-yes');
    if (!q) { out.textContent = ''; return; }
    const t = TOWNS.find(x => norm(x.name) === q);
    if (t) { out.classList.add('is-yes'); out.textContent = t.mi ? `Yes. ${t.name} is ${t.mi} miles ${dir(t.brg)} of our office, in ${t.county} County.` : 'Yes. Springboro is home: the office is at 38 N Pioneer Blvd.'; }
    else if (q.length >= 3) out.innerHTML = 'That town isn’t on our list of 24. Call Rachel and ask: <a class="rx" href="tel:+19377467377" data-c="call">(937) 746-7377</a>.';
    else out.textContent = ''; };
  inp.addEventListener('input', on);
  rise(root, '.ect5-panel', c);
  return () => inp.removeEventListener('input', on);
}
export default { 1: phone, 2: distance, 3: week, 4: card, 5: finder };
