import { def, d, $, $$, E, calm, small, clamp, sub } from './registry.js';
const RR = window.RR;
const sentLine = sec => { let s = null; try { s = JSON.parse(localStorage.getItem('rr-sent')); } catch (e) {} const el = $('[data-sent]', sec); if (el && s && Date.now() - s.t < 7 * 864e5) { el.hidden = false; el.textContent = `We have your request (${s.ref}). Rachel will call you ${s.when}.`; } };
const officeLine = sec => { const o = RR.office(), st = $('[data-office]', sec), t = $('[data-office-long]', sec); if (!st) return; st.classList.toggle('is-open', o.open); t.textContent = o.open ? 'We\'re in. The office is open until 5 pm today.' : `The office is closed right now. Text us and we'll call you ${RR.nextOpenPhrase(o)}.`; };

// ---------- S14 V2 "Dusk": the hero house again at dusk, porch lights on; the lamp sinks with scroll
def('close', 2, {
  init(sec) {
    officeLine(sec); sentLine(sec);
    const lamp = $('[data-dusk-lamp]', sec);
    if (calm()) { lamp.style.transform = 'translate3d(0,40%,0)'; return; }
    sub(sec, () => { const r = RR.R(sec), p = clamp((innerHeight - r.top) / (innerHeight + r.height), 0, 1); lamp.style.transform = `translate3d(0,${(p * 70).toFixed(1)}%,0)`; lamp.style.opacity = (1 - p * 0.7).toFixed(3); return false; });
  }
});

// ---------- S14 V3 "Tomorrow's light": tomorrow's sunrise in Springboro from the same NOAA equations (rounded to the minute); one still lamp frame at the sunrise azimuth
function sunriseTomorrow() {
  const day = dt => new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit' }).format(dt);
  const now = new Date(), tomorrow = day(new Date(now.getTime() + 864e5));
  let prev = null;
  for (let t = now.getTime(); t < now.getTime() + 2 * 864e5; t += 60000) {
    const dt = new Date(t), el = RR.sun(dt).el;
    if (prev !== null && prev < -0.833 && el >= -0.833 && day(dt) === tomorrow) return { date: dt, az: RR.sun(dt).az };
    prev = el;
  }
  return null;
}
def('close', 3, {
  init(sec) {
    officeLine(sec);
    const s = sunriseTomorrow(), line = $('[data-sunrise-line]', sec);
    if (s) line.textContent = `Sunrise tomorrow in Springboro: ${RR.NYT.format(s.date).toLowerCase()}.`;
    // lamp at the sunrise azimuth: east (90°) maps left, south-east toward the middle
    const x = s ? clamp((s.az - 50) / 90, 0.08, 0.6) : 0.2, dim = $('[data-dawn-dim]', sec);
    dim.style.background = `radial-gradient(60% 120% at ${(x * 100).toFixed(1)}% 100%, rgb(233 179 100 / .18) 0, rgb(24 17 13 / .2) 22%, rgb(16 12 9 / .9) 60%)`;
  }
});
