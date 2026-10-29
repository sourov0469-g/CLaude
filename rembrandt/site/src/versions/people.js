import { def, d, $, $$, E, calm, small, clamp, lerp, sub, stageP, once } from './registry.js';
const RR = window.RR;

// ---------- S10 V2 "Thirty years of Dayton weather": ticks draw (ink, stagger .05); desktop scrubs the track sideways in a 220vh sticky stage, phones scroll it natively
def('people', 2, {
  init(sec) {
    const stage = $('[data-wx-stage]', sec), track = $('[data-wx-track]', sec), ticks = $('[data-wx-ticks]', sec);
    const y0 = 1994.5, y1 = 2027, now = new Date().getFullYear();
    const px = () => track.scrollWidth, X = y => ((y - y0) / (y1 - y0) * 100).toFixed(3) + '%';
    for (let y = 1995; y <= now; y++) ticks.insertAdjacentHTML('beforeend', `<li style="left:${X(y)}" class="${y % 5 === 0 ? 'big' : ''}">${y % 5 === 0 ? y : ''}</li>`);
    $$('.wx-ev li', sec).forEach(li => { li.style.left = X(parseFloat(li.style.getPropertyValue('--y'))); });
    const tk = $$('li', ticks);
    if (!calm()) { tk.forEach(t => t.style.transform = 'scaleY(0)'); once(track, () => tk.forEach((t, i) => t.animate([{ transform: 'scaleY(0)' }, { transform: 'none' }], { duration: 600, delay: i * 50, easing: E.ink, fill: 'forwards' })), { threshold: 0.2 }); }
    const scrubbed = () => !calm() && innerWidth >= 900;
    if (!scrubbed()) { sec.classList.add('wx-native'); return; }
    let x = 0;
    sub(stage, dt => { if (!scrubbed()) return false; const max = track.scrollWidth - track.parentElement.clientWidth, t = stageP(stage) * max; x = lerp(x, t, 1 - Math.pow(1 - 0.2, dt / 16.7)); track.style.transform = `translate3d(${(-x).toFixed(1)}px,0,0)`; return Math.abs(t - x) > 0.5; });
  }
});

// ---------- S10 V3 "Rachel answers": live office state in America/New_York every 60s; ripple dot only while open
def('people', 3, {
  init(sec) {
    const st = $('[data-office]', sec), txt = $('[data-office-long]', sec);
    const upd = () => { const o = RR.office(); st.classList.toggle('is-open', o.open); txt.textContent = o.open ? 'Office open now, until 5 pm.' : `Closed now. Opens ${RR.nextOpenPhrase(o)}. Leave a message or text us.`; };
    upd(); this.iv = setInterval(() => sec.isConnected && upd(), 60000);
  }
});
