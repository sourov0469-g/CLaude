// CONTACT PAGE HEAD (R5): the phone and the hours, five ways. The hours line reads Springboro's clock and states only
// the time and the office hours, never "open now" (a holiday could make it untrue, ⟦S1314⟧ no fake live state).
import { head } from '../sphero/sphero.js';

export function clock() { // Springboro's day (0 = Monday) and minutes since midnight; null if Intl cannot say
  try {
    const f = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', weekday: 'long', hour: 'numeric', minute: '2-digit', hour12: true });
    const p = Object.fromEntries(f.formatToParts(new Date()).map(x => [x.type, x.value]));
    const h = +new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', hour: 'numeric', hourCycle: 'h23' }).format(new Date());
    const day = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].indexOf(p.weekday);
    return { day, wd: p.weekday, mins: h * 60 + +p.minute, time: `${p.hour}:${p.minute} ${p.dayPeriod.toLowerCase()}` };
  } catch (e) { return null; }
}
function hours(root, c, extra) {
  head(root, c, extra);
  const t = clock(), h = root.querySelector('[data-hours]');
  if (t && h) h.textContent = `It's ${t.time} on ${t.wd} in Springboro. Office hours: Monday to Friday, 9 to 5.`;
  return t;
}
// v2 [BANK] Harvest [201] flip card: a button turns the card (aria-pressed); the hidden face is inert
function card(root, c) {
  hours(root, c, '.kt2-stage');
  const b = root.querySelector('.kt2-turn'), k = root.querySelector('.kt2-card'), f = root.querySelector('.kt2-front'), bk = root.querySelector('.kt2-back');
  const set = on => { b.setAttribute('aria-pressed', String(on)); k.classList.toggle('is-back', on); f.inert = on; bk.inert = !on; };
  set(false); const on = () => set(b.getAttribute('aria-pressed') !== 'true'); b.addEventListener('click', on);
  return () => b.removeEventListener('click', on);
}
// v3 pack G-call (b) + ⟦S1314⟧: the week strip; a "Now" line at Springboro's day and time (a clock, not a promise)
function week(root, c) {
  const t = hours(root, c, '.kt3-board'), now = root.querySelector('.kt3-now'), board = root.querySelector('.kt3-board');
  if (!t) return;
  const row = root.querySelector(`.kt3-day[data-d="${t.day}"]`); row.classList.add('is-today');
  const place = () => { const bar = row.querySelector('.kt3-bar').getBoundingClientRect(), bb = board.getBoundingClientRect();
    Object.assign(now.style, { left: `${bar.left - bb.left + bar.width * (t.mins / 1440)}px`, top: `${bar.top - bb.top - 6}px`, height: `${bar.height + 12}px` }); now.hidden = false; };
  place(); addEventListener('resize', place);
  return () => removeEventListener('resize', place);
}
export default { 1: (r, c) => { hours(r, c); }, 2: card, 3: week, 4: (r, c) => { hours(r, c); }, 5: (r, c) => { hours(r, c, '.kt5-rows div'); } };
