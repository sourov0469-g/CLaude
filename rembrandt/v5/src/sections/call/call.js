// CALL. The last chapter ends on the number (PLAN §1 FINISH; S1303 C2 statement + action, Ft6 marquee footer).
// Facts only, from the owner's list: (937) 746-7377, Rachel answers, Monday to Friday 9 to 5, written line-by-line
// estimates. No texting, no response-time promise, no 24/7, no address, no licence number.
// Each init runs inside the section's gsap.matchMedia() (main.js); tweens and triggers revert on swap, and the returned
// cleanup stops loops, observers, timers and listeners.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { lines, rise, onEnter, EASE } from '../../js/fx.js';
import { parallax } from '../../js/depth.js';
import { loop } from '../../js/gl.js';
import { spring, step } from '../../js/spring.js';

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const bell = p => Math.sin(Math.PI * clamp(p, 0, 1)); // S0489 bell(p): fades in and out over one beat

// ---------- the one real-time state on the page (G5 #22, S0650 9.F). The office is open Monday to Friday, 9 to 5,
// Eastern time; Intl reads the time in America/New_York, so the line is right wherever the visitor is. Nothing else is
// claimed (no holidays, no reply times). officeState() is pure so fixed dates can check it.
//@@office
const DAY = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
let fmt = null;
export function officeState(date = new Date()) {
  fmt = fmt || new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' });
  const p = {}; for (const x of fmt.formatToParts(date)) p[x.type] = x.value;
  const d = DAY[p.weekday], m = (Number(p.hour) % 24) * 60 + Number(p.minute), weekday = d >= 1 && d <= 5;
  if (weekday && m >= 540 && m < 1020) return { open: true, text: 'Open now, until 5.' };
  if (weekday && m < 540) return { open: false, text: 'Closed now. Back today at 9.' };
  if (d >= 1 && d <= 4) return { open: false, text: 'Closed now. Back tomorrow at 9.' }; // Monday to Thursday evenings
  return { open: false, text: 'Closed now. Back Monday at 9.' }; // Friday evening and the weekend
}
//@@office-end
function liveHours(root) { // filled by script only (no-JS shows the hours line alone); re-checked every 30s and on return
  const el = root.querySelector('[data-now]'); if (!el) return () => {};
  const t = el.querySelector('.cv-now-t');
  const paint = () => { const s = officeState(); if (t.textContent !== s.text) t.textContent = s.text; el.classList.toggle('is-open', s.open); };
  paint(); el.hidden = false;
  const id = setInterval(paint, 30000);
  const vis = () => { if (!document.hidden) paint(); };
  document.addEventListener('visibilitychange', vis);
  return () => { clearInterval(id); document.removeEventListener('visibilitychange', vis); };
}

// ---------- v1 Number. Hierarchy: the type is the call. A blue field; the number is ONE tel link that fills the measure.
// Entrance, once (G4 #18; S0634 text-char-fall, its parameters): each character drops like a shingle from translateY(-60px)
//   rotate(-20deg) and opacity 0, 1.2s each, 0.1s apart, ease-out (power4.out = --ease-out; the case's overshoot curve is
//   dropped per G7 #17 and S1303 gate 30). Then the sun rule under it draws in (S0410 emphasis, 500ms) and it rings.
// Pointer (S0340, the model named before the code): "each digit is a mass of 1 on a 1.35 Hz spring with ζ 0.74: slow enough
//   to read as weight, a 3% overshoot like something landing. Its target is the pointer, never more than 12px away, fading
//   to nothing 1.6 type-heights out. A second body, the tilt, is read from the first one's sideways speed, at most 3°."
//   One rAF loop for every digit (gl.js loop: off-screen and hidden-tab pause), transform only, stopping when all settle.
//   Rest centres are read once per enter or resize, never per move (S1330).
// Background: the number rings (S0489 one main action, then a pause). Every 6s while in view: a phone buzz, bursts of ±3°
//   for 4 cycles in 0.45s under a bell envelope, its phase delayed a little more along each digit (S0489 principle 5);
//   and three soft rings that grow 0 to 1 out of the number and fade with bell(p) (S0489 water ripple). Off-screen, in a
//   hidden tab and under reduced motion nothing runs; reduced motion draws one composed still of the rings.
const BUZZ = { amp: 3, cycles: 4, dur: 0.45, lag: 0.014 };
const RINGS = { n: 3, gap: 0.24, life: 1.9, every: 6000, alpha: 0.5 };
function number(root, c) {
  const offs = [liveHours(root)];
  const num = root.querySelector('.cv1-num'), bar = root.querySelector('.cv1-bar'), cv = root.querySelector('.cv1-rings'), g = cv.getContext('2d');
  // split once into characters (idempotent: matchMedia re-runs this init on breakpoint changes); the link's accessible
  // name stays "Call (937) 746-7377" through its aria-label, which contains the visible text (WCAG 2.5.3)
  if (!num.querySelector('.cv1-c')) num.querySelectorAll('.cv1-g').forEach(gr => {
    const t = gr.textContent; gr.textContent = '';
    for (const ch of t) { const o = document.createElement('span'), f = document.createElement('span'); o.className = gr.firstChild ? 'cv1-c' : 'cv1-c cv1-lead'; f.className = 'cv1-f'; f.textContent = ch; o.append(f); gr.append(o); }
  });
  const S = spring(1.35, 0.74);
  const chars = [...num.querySelectorAll('.cv1-c')].map((el, i) => ({ el, f: el.firstElementChild, i, x: { p: 0, v: 0 }, y: { p: 0, v: 0 }, cx: 0, cy: 0, w: '' }));
  let W = 0, H = 0, box = null, stale = true, reach = 200, clock = 0, buzzAt = -1, lp = null, drawn = false;
  const rings = [];
  const ptr = { on: false, x: 0, y: 0 };

  const pill = (x, y, w, h, r) => { g.beginPath(); g.moveTo(x + r, y); g.lineTo(x + w - r, y); g.arc(x + w - r, y + r, r, -Math.PI / 2, Math.PI / 2); g.lineTo(x + r, y + h); g.arc(x + r, y + r, r, Math.PI / 2, Math.PI * 1.5); g.closePath(); };
  const drawRings = ps => { // ps: each ring's progress 0..1
    g.clearRect(0, 0, W, H); drawn = false; if (!box) return;
    const far = Math.min(H * 0.42, 340), r0 = Math.min(box.w, box.h) / 2;
    g.lineWidth = W < 640 ? 1.5 : 2; g.strokeStyle = '#c9d6f2';
    for (const p of ps) {
      if (p <= 0 || p >= 1) continue;
      const o = 8 + (1 - (1 - p) ** 3) * far; // rings open, so they ease out (S0489 "things that open or arrive")
      g.globalAlpha = bell(p) * RINGS.alpha; pill(box.x - o, box.y - o, box.w + 2 * o, box.h + 2 * o, r0 + o); g.stroke(); drawn = true;
    }
    g.globalAlpha = 1;
  };
  const STILL = [0.3, 0.55, 0.8]; // reduced motion: one composed frame of the rings mid-radiate
  const layout = () => {
    const r = root.getBoundingClientRect(), n = num.getBoundingClientRect(); W = cv.clientWidth; H = cv.clientHeight; if (!W || !H) return;
    const dpr = Math.min(devicePixelRatio || 1, 2); cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); g.setTransform(dpr, 0, 0, dpr, 0, 0);
    box = { x: n.left - r.left, y: n.top - r.top, w: n.width, h: n.height }; stale = true;
    drawRings(c.reduce ? STILL : rings.map(s => (clock - s) / RINGS.life));
  };
  const measure = () => { // rest centres in page coordinates (the body's own offset taken back out); once per enter/resize
    const sx = scrollX, sy = scrollY;
    for (const ch of chars) { const b = ch.el.getBoundingClientRect(); ch.cx = b.left + b.width / 2 + sx - ch.x.p; ch.cy = b.top + b.height / 2 + sy - ch.y.p; }
    reach = Math.max(200, (parseFloat(getComputedStyle(num).fontSize) || 120) * 1.6); stale = false;
  };
  const frame = dt => {
    clock += dt;
    let busy = false;
    const px = ptr.x + scrollX, py = ptr.y + scrollY;
    for (const ch of chars) {
      let tx = 0, ty = 0;
      if (ptr.on) { const dx = px - ch.cx, dy = py - ch.cy, d = Math.hypot(dx, dy); if (d < reach && d > 0.01) { const L = Math.min(d, 12) * (1 - d / reach) ** 2; tx = dx / d * L; ty = dy / d * L; } }
      step(S, ch.x, tx, dt); step(S, ch.y, ty, dt);
      if (Math.abs(ch.x.p - tx) < 0.05 && Math.abs(ch.y.p - ty) < 0.05 && Math.abs(ch.x.v) < 0.5 && Math.abs(ch.y.v) < 0.5) { ch.x.p = tx; ch.y.p = ty; ch.x.v = ch.y.v = 0; } else busy = true;
      let bz = 0;
      if (buzzAt >= 0) { const u = (clock - buzzAt - ch.i * BUZZ.lag) / BUZZ.dur; if (u > 0 && u < 1) bz = BUZZ.amp * Math.sin(2 * Math.PI * BUZZ.cycles * u) * bell(u); }
      const rot = clamp(ch.x.v * 0.03, -3, 3) + bz;
      const w = ch.x.p || ch.y.p || rot ? `translate3d(${ch.x.p.toFixed(2)}px,${ch.y.p.toFixed(2)}px,0) rotate(${rot.toFixed(2)}deg)` : '';
      if (w !== ch.w) { ch.el.style.transform = w; ch.w = w; }
    }
    if (buzzAt >= 0) { if (clock - buzzAt > BUZZ.dur + chars.length * BUZZ.lag) buzzAt = -1; else busy = true; }
    while (rings.length && clock - rings[0] > RINGS.life) rings.shift();
    if (rings.length || drawn) drawRings(rings.map(s => (clock - s) / RINGS.life));
    return busy || rings.length > 0;
  };
  const ro = new ResizeObserver(layout); ro.observe(root);
  if (document.fonts) document.fonts.ready.then(() => { if (box) layout(); });
  offs.push(() => { ro.disconnect(); g.clearRect(0, 0, cv.width, cv.height); chars.forEach(ch => { ch.el.style.transform = ''; }); });
  if (!c.motion) return () => offs.forEach(f => f());

  lp = loop(cv, frame);
  offs.push(() => lp.stop());
  // the ring: one buzz plus three rings, then a 6s pause; scheduled only while in view and the tab is visible
  let timer = 0, seen = false, entered = false;
  const ring = () => { buzzAt = clock; for (let k = 0; k < RINGS.n; k++) rings.push(clock + k * RINGS.gap); lp.wake(); };
  const schedule = () => { clearTimeout(timer); timer = 0; if (entered && seen && !document.hidden) timer = setTimeout(() => { ring(); schedule(); }, RINGS.every); };
  const io = new IntersectionObserver(([e]) => { seen = e.isIntersecting; schedule(); }, { threshold: 0.2 }); io.observe(num);
  const vis = () => schedule(); document.addEventListener('visibilitychange', vis);
  offs.push(() => { clearTimeout(timer); io.disconnect(); document.removeEventListener('visibilitychange', vis); });

  const fall = gsap.timeline({ scrollTrigger: onEnter(num, { start: 'top 88%' }) });
  fall.fromTo(chars.map(ch => ch.f), { y: -60, rotation: -20, autoAlpha: 0 }, { y: 0, rotation: 0, autoAlpha: 1, duration: 1.2, ease: EASE, stagger: 0.1 })
    .fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: EASE }, '-=0.55')
    .add(() => { entered = true; ring(); schedule(); }, '-=0.3');
  lines(root.querySelector('.cv1-h'), { scrollTrigger: onEnter(root, { start: 'top 72%' }) });
  rise(root.querySelectorAll('.cv1 .cv-meta > *'), { scrollTrigger: onEnter(num, { start: 'top 88%' }), delay: 1.1 });

  if (c.fine) {
    const move = e => { if (e.pointerType !== 'mouse') return; if (stale) measure(); ptr.on = true; ptr.x = e.clientX; ptr.y = e.clientY; lp.wake(); };
    const leave = () => { ptr.on = false; lp.wake(); };
    const scrolled = () => { if (ptr.on) lp.wake(); };
    root.addEventListener('pointermove', move); root.addEventListener('pointerleave', leave); addEventListener('scroll', scrolled, { passive: true });
    offs.push(() => { root.removeEventListener('pointermove', move); root.removeEventListener('pointerleave', leave); removeEventListener('scroll', scrolled); });
  }
  return () => offs.forEach(f => f());
}

// ---------- v2 Before you call. Interaction: a converter, the one live thing that converts (G3 #3; S0095 #3).
// Micro-interaction spec (S1448 format):
//   name      roof-state choice
//   trigger   click, tap, Enter or Space on one of four toggle buttons
//   rules     one state at a time; choosing another moves it; choosing the pressed one clears it (back to the prompt)
//   feedback  press scale .96 at 150ms (S0075); the button fills white and its ring fills with a tick (200ms ease-out,
//             icon swap per S0075: scale .25 to 1, blur 4px to 0); the script line swaps (S0410 text swap: 150ms out,
//             150ms in, 4px, blur 2px); the field answers: ink turns brand blue and the giant faint word becomes the state
//   timing    150 to 300ms, power4.out (--ease-out); nothing animates on hover beyond a 200ms colour change
//   loops     none: each choice is a fresh state change with no entrance replay; a click mid-swap retargets from where it is
//   a11y      native buttons, aria-pressed, a group labelled by the question; the script is a polite atomic live region,
//             changed with opacity only so its text is never hidden from assistive tech; reduced motion keeps the colour
//             states and crossfades the text in 150ms (S0075)
// Copy (S1445): the felt state is "I don't know what to say on the phone"; the line hands over the words, warm and brief,
// with one next step, and the estimate ask comes with it every time.
function converter(root, c) {
  const offs = [liveHours(root)];
  const opts = [...root.querySelectorAll('.cv2-opt')], a = root.querySelector('.cv2-say-a'), w = root.querySelector('.cv2-w');
  const PROMPT = 'Call and tell Rachel what your roof is doing.', ASK = '?';
  let cur = opts.find(o => o.getAttribute('aria-pressed') === 'true') || null, tl = null;
  const write = () => {
    a.textContent = '';
    if (!cur) a.textContent = PROMPT;
    else { const b = document.createElement('b'); b.textContent = cur.dataset.say; a.append('Call and tell Rachel: ', b, '.'); }
    w.textContent = cur ? cur.dataset.word : ASK;
  };
  const choose = btn => {
    cur = btn === cur ? null : btn;
    opts.forEach(o => o.setAttribute('aria-pressed', String(o === cur)));
    root.classList.toggle('is-set', !!cur);
    if (tl) tl.kill();
    if (!c.motion) { tl = gsap.timeline().to([a, w], { opacity: 0, duration: 0.075, ease: 'none' }).add(write).to([a, w], { opacity: 1, duration: 0.075, ease: 'none' }); return; }
    tl = gsap.timeline()
      .to(a, { opacity: 0, y: -4, duration: 0.15, ease: EASE })
      .to(w, { opacity: 0, y: -12, duration: 0.15, ease: EASE }, 0)
      .add(write)
      .fromTo(a, { opacity: 0, y: 4, filter: 'blur(2px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.15, ease: EASE })
      .fromTo(w, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.3, ease: EASE }, '<');
  };
  write(); root.classList.toggle('is-set', !!cur);
  const click = e => { const b = e.target.closest('.cv2-opt'); if (b) choose(b); };
  root.addEventListener('click', click);
  offs.push(() => root.removeEventListener('click', click));
  if (c.motion) {
    lines(root.querySelector('.cv2-h'), { scrollTrigger: onEnter(root, { start: 'top 72%' }) });
    gsap.fromTo(opts, { autoAlpha: 0, y: 12, scale: 0.95 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.6, ease: EASE, stagger: 0.04, clearProps: 'transform', scrollTrigger: onEnter(root.querySelector('.cv2-opts'), { start: 'top 90%' }) });
    rise(root.querySelectorAll('.cv2-act > *'), { scrollTrigger: onEnter(root.querySelector('.cv2-act'), { start: 'top 90%' }), delay: 0.2 });
    gsap.fromTo(w, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9, ease: EASE, scrollTrigger: onEnter(root, { start: 'top 60%' }) });
    parallax(root);
  }
  return () => { if (tl) tl.kill(); offs.forEach(f => f()); };
}

// ---------- v3 Sign-off. Motion: two giant counter-running lines (S1303 Ft6), the number and the hours.
// Model (S0340, a field with no target), named first: "each line is a mass of 1 in a friction field (c = 1.6 per second)
//   that pulls its speed toward a drive. The drive is the loop speed, one unit per 24s or 28s (G4 #16: 20 to 30s linear
//   loops), plus the scroll's speed and in the scroll's direction. A drag is a hand: a 9 Hz critically damped spring pulls
//   the line to the pointer, so it follows almost 1:1, never jumps on grab, and keeps the hand's real velocity on release
//   (velocity older than 60ms has already died in the hand spring). Then it coasts x + v·m/c, about 620px per 1000px/s,
//   before the field brings it back to the drive." Skew is read from the speed above the drive (S0340: visuals from
//   state), capped at 8°, so it shows only when the line is thrown or scrolled.
// One rAF loop for both lines (gl.js loop: off-screen and hidden-tab pause, G4 #16 IntersectionObserver rule).
// Pause / Play (WCAG 2.2.2) stops the drive and the scroll coupling; a drag still works, because the visitor moves it.
// Entrance: one impulse per line as the chapter arrives (a throw-in decided by the model, not a tween).
// The lines are aria-hidden; the real tel link and the hours stay in normal flow. Reduced motion: still lines, no loop.
function signoff(root, c) {
  const offs = [liveHours(root)];
  const rows = [...root.querySelectorAll('.cv3-row')].map((el, i) => ({ el, track: el.querySelector('.cv3-track'), dir: i ? 1 : -1, T: i ? 28 : 24, U: 0, x: { p: 0, v: 0 }, skew: 0, hand: null, pid: null, gx: 0, w: '' }));
  const FRICTION = 1.6, HAND = spring(9, 1), SCROLL = 0.35;
  let vs = 0, sgn = 1, paused = false, lp = null;
  const paint = () => {
    for (const r of rows) {
      if (!r.U) continue;
      const X = (((r.x.p % r.U) + r.U) % r.U) - r.U;
      const w = `translate3d(${X.toFixed(2)}px,0,0) skewX(${r.skew.toFixed(2)}deg)`;
      if (w !== r.w) { r.track.style.transform = w; r.w = w; }
    }
  };
  const layout = () => { // the track repeats its unit until it covers the width plus one unit (the wrap never shows a gap)
    const Wd = root.clientWidth;
    for (const r of rows) {
      const units = r.track.querySelectorAll('.cv3-u'); r.U = units[0].offsetWidth; if (!r.U) continue;
      for (let k = units.length; k < Math.ceil(Wd / r.U) + 2; k++) r.track.append(units[0].cloneNode(true));
    }
    paint();
  };
  const ro = new ResizeObserver(layout); ro.observe(root);
  if (document.fonts) document.fonts.ready.then(layout);
  offs.push(() => { ro.disconnect(); rows.forEach(r => { r.track.style.transform = ''; }); });
  if (!c.motion) return () => offs.forEach(f => f());

  const frame = dt => {
    vs *= Math.exp(-dt * 5); // the scroll's push fades once the scroll stops
    let busy = !paused;
    for (const r of rows) {
      const cruise = paused ? 0 : r.dir * sgn * r.U / r.T;
      if (r.hand !== null) { step(HAND, r.x, r.hand, dt); busy = true; }
      else {
        const drive = paused ? 0 : cruise + r.dir * sgn * Math.abs(vs) * SCROLL;
        r.x.v += -FRICTION * (r.x.v - drive) * dt; r.x.p += r.x.v * dt;
        if (Math.abs(r.x.v - drive) > 0.5) busy = true; else if (paused) r.x.v = 0;
      }
      r.skew = clamp(-(r.x.v - cruise) * 0.004, -8, 8);
    }
    paint();
    return busy;
  };
  lp = loop(root.querySelector('.cv3-rows'), frame);
  offs.push(() => lp.stop());

  // scroll coupling: speed in, direction from its sign (ScrollTrigger velocity, px/s; Lenis feeds ScrollTrigger.update)
  const st = ScrollTrigger.create({ trigger: root, start: 'top bottom', end: 'bottom top', onUpdate: s => {
    if (paused) return; const v = clamp(s.getVelocity(), -4000, 4000); vs = v; if (Math.abs(v) > 30) sgn = Math.sign(v); lp.wake();
  } });
  offs.push(() => st.kill());

  // drag: a hand on the grabbed line (setPointerCapture, multi-touch guard; touch-action pan-y keeps the page scrolling)
  const down = e => {
    const r = rows.find(q => q.el.contains(e.target)); if (!r || r.hand !== null || (e.pointerType === 'mouse' && e.button !== 0)) return;
    r.el.setPointerCapture(e.pointerId); r.pid = e.pointerId; r.gx = e.clientX - r.x.p; r.hand = r.x.p; lp.wake();
  };
  const move = e => { const r = rows.find(q => q.pid === e.pointerId); if (r) r.hand = e.clientX - r.gx; };
  const up = e => { const r = rows.find(q => q.pid === e.pointerId); if (!r) return; r.hand = null; r.pid = null; lp.wake(); };
  rows.forEach(r => { r.el.addEventListener('pointerdown', down); r.el.addEventListener('pointermove', move); r.el.addEventListener('pointerup', up); r.el.addEventListener('pointercancel', up); r.el.addEventListener('lostpointercapture', up); });
  offs.push(() => rows.forEach(r => { r.el.removeEventListener('pointerdown', down); r.el.removeEventListener('pointermove', move); r.el.removeEventListener('pointerup', up); r.el.removeEventListener('pointercancel', up); r.el.removeEventListener('lostpointercapture', up); }));

  const btn = root.querySelector('.cv3-pause'), lab = btn.querySelector('.cv3-pl');
  const toggle = () => { paused = !paused; vs = 0; root.classList.toggle('is-paused', paused); lab.textContent = paused ? 'Play' : 'Pause'; lp.wake(); };
  btn.hidden = false; btn.addEventListener('click', toggle);
  offs.push(() => { btn.removeEventListener('click', toggle); btn.hidden = true; root.classList.remove('is-paused'); lab.textContent = 'Pause'; });

  // entrance: the throw-in, then the in-flow block
  ScrollTrigger.create({ ...onEnter(root, { start: 'top 75%' }), onEnter: () => { if (!paused) rows.forEach(r => { r.x.v += r.dir * sgn * 2400; }); lp.wake(); } });
  lines(root.querySelector('.cv3-h'), { scrollTrigger: onEnter(root, { start: 'top 72%' }) });
  rise(root.querySelectorAll('.cv3-dock > *:not([hidden])'), { scrollTrigger: onEnter(root.querySelector('.cv3-dock'), { start: 'top 92%' }), stagger: 0.08 });
  parallax(root);
  return () => offs.forEach(f => f());
}

export default { 1: number, 2: converter, 3: signoff };
