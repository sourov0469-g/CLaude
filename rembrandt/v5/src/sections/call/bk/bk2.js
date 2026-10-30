// Backups B4-B8 of the call section (R4 directive Phase 5): the pre-redesign versions from 2ee2693, verbatim except the prefix cl -> ccl and the helper import paths. Never edit.
// CALL (PLAN-V7 §6), the page's close. Facts only: (937) 746-7377; Rachel answers; Monday to Friday, 9 to 5; written,
// line-by-line estimates; 38 N Pioneer Blvd, Springboro OH 45066. The hours line is computed from the real hours in
// Springboro's time zone and states only what the hours say (never "open now", which a holiday could make untrue).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EASE, beats } from '../../../js/frozen/fx2.js';
import { horizontalLoop } from '../../../js/frozen/hloop.js';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(CustomEase);
const IN = CustomEase.create('shazamIn', '.8,-.6,.2,1'), OUT = CustomEase.create('shazamOut', '.4,1,.3,1');

const visible = (el, fn) => { const io = new IntersectionObserver(([e]) => fn(e.isIntersecting), { rootMargin: '80px' }); io.observe(el); return () => io.disconnect(); };
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
function springboro() { // Springboro's clock, read from the real time zone; null if Intl cannot say
  try {
    const now = new Date(), f = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', weekday: 'long', hour: 'numeric', minute: '2-digit', hour12: true });
    const parts = Object.fromEntries(f.formatToParts(now).map(p => [p.type, p.value]));
    const h24 = +new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', hour: 'numeric', hourCycle: 'h23' }).format(now);
    const wd = parts.weekday, work = DAYS.indexOf(wd) < 5, inside = work && h24 >= 9 && h24 < 17;
    const next = work && h24 < 9 ? 'today at 9' : wd === 'Friday' || wd === 'Saturday' || wd === 'Sunday' ? 'Monday at 9' : 'tomorrow at 9';
    return { wd, day: DAYS.indexOf(wd), mins: h24 * 60 + +parts.minute, time: `${parts.hour}:${parts.minute} ${parts.dayPeriod.toLowerCase()}`, inside, next };
  } catch (e) { return null; }
}
function hoursLine() {
  const t = springboro();
  if (!t) return 'Office hours: Monday to Friday, 9 to 5.';
  const when = `It's ${t.time} on ${t.wd} in Springboro`;
  return t.inside ? `${when}, within office hours (Monday to Friday, 9 to 5).` : `${when}, outside office hours. Rachel is back ${t.next}.`;
}

// v1 Anatomy F9/F14 (the offer names the next step and it produces a number: a written, line-by-line estimate), [BANK]
// the OFFF giant two-tone footer wordmark, and a gutter run across the top of the close. Its drops gather at the lip
// and pinch off with a gooey neck (⟦S1350⟧ gooey-blob-system: blur then an alpha threshold), one every 7s, and fall to
// the call button; the loop rests off screen; reduced motion shows one drop hanging still.
function close(root, c) {
  const live = root.querySelector('.ccl1-live'); live.textContent = hoursLine();
  const clock = setInterval(() => { live.textContent = hoursLine(); }, 60000); // recomputed every minute
  const drops = root.querySelector('.ccl1-drops'), d = root.querySelector('.ccl1-d'), fall = root.querySelector('.ccl1-fall');
  const done = [() => clearInterval(clock)];
  const cleanup = () => done.forEach(f => f());
  if (!c.motion) { drops.style.display = 'block'; const r = root.getBoundingClientRect(), b = root.querySelector('.ccl1-call').getBoundingClientRect(); drops.style.left = (b.left - r.left + b.width / 2 - 60) + 'px'; gsap.set(d, { attr: { r: 7, cy: 14 } }); return cleanup; }
  drops.style.display = 'block';
  // hang the emitter from the gutter right above the call button; the drop falls to the button's top edge
  const btn = root.querySelector('.ccl1-call');
  const place = () => { const r = root.getBoundingClientRect(), b = btn.getBoundingClientRect(), sv = drops.getBoundingClientRect(); drops.style.left = (b.left - r.left + b.width / 2 - 60) + 'px'; root.__fall = Math.max(40, b.top - sv.top - 6); };
  place(); const ro = new ResizeObserver(place); ro.observe(root); done.push(() => ro.disconnect());
  beats(root, [root.querySelector('.ccl1-h'), root.querySelector('.ccl1-p'), root.querySelector('.ccl1-act'), root.querySelector('.ccl1-status')]);
  gsap.fromTo(root.querySelector('.ccl1-word span:last-child'), { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 52% 0)', duration: 0.3, ease: EASE, scrollTrigger: { trigger: root.querySelector('.ccl1-word'), start: 'top 90%', once: true } });
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 4.6, paused: true })
    .fromTo(d, { attr: { r: 0, cy: 8 } }, { attr: { r: 8, cy: 16 }, duration: 1.2, ease: 'sine.in' })
    .to(d, { attr: { cy: 30, r: 6 }, duration: 0.25, ease: 'power2.in' })
    .set(d, { attr: { r: 0 } })
    .fromTo(fall, { attr: { cy: 30 }, opacity: 1 }, { attr: { cy: () => root.__fall || 150 }, opacity: 0.6, duration: 0.6, ease: 'power2.in', immediateRender: false }, '<')
    .set(fall, { opacity: 0 });
  done.push(visible(root.querySelector('.ccl1-act'), v => (v ? tl.play() : tl.pause())), () => tl.kill());
  // bg: the gathering drop leans toward the pointer (up to 10 degrees, hinged at the gutter lip), as water does in a draught
  if (c.fine) {
    const lean = gsap.quickTo(drops, 'rotation', { duration: 0.8, ease: 'power3.out' });
    gsap.set(drops, { transformOrigin: '50% 0%' });
    const onMove = e => { if (e.pointerType !== 'mouse') return; const r = drops.getBoundingClientRect(); lean(-gsap.utils.clamp(-1, 1, (e.clientX - (r.left + r.width / 2)) / 400) * 10); };
    const onLeave = () => lean(0);
    root.addEventListener('pointermove', onMove); root.addEventListener('pointerleave', onLeave);
    done.push(() => { root.removeEventListener('pointermove', onMove); root.removeEventListener('pointerleave', onLeave); });
  }
  return cleanup;
}

// v2 [BANK] Shazam-like Morphing Button 255 (the Atlas names it the CALL reference: the call button morphs into the
// contact card). Values: morph 400ms cubic-bezier(.8,-.6,.2,1) (dips before settling); content exits -25px over 0.4s and
// the next enters from +25px; ripple ring 1.2s ease-out, a second ring 0.6s later; close 400ms cubic-bezier(.4,1,.3,1);
// paths share one point structure. Adapted: the round call morphs into a house-shaped card (gable top) with Rachel's
// details; the tel link stays the primary action; rings ring three times on arrival and while hovered, never endlessly.
const pts = (shape, n) => { // n points round a circle, or round a house outline, in the same order: equal structure, so GSAP tweens the d string number by number (no MorphSVG)
  const out = [];
  for (let i = 0; i < n; i++) {
    const t = i / n;
    if (shape === 'circle') { const a = -Math.PI / 2 + t * Math.PI * 2; out.push([300 + Math.cos(a) * 150, 210 + Math.sin(a) * 150]); }
    else { // house: apex (300,24) -> right eave (560,120) -> (560,400) -> (40,400) -> (40,120) -> apex, by perimeter share
      const P = [[300, 24], [560, 120], [560, 400], [40, 400], [40, 120], [300, 24]];
      const L = []; let tot = 0; for (let k = 1; k < P.length; k++) { const l = Math.hypot(P[k][0] - P[k - 1][0], P[k][1] - P[k - 1][1]); L.push(l); tot += l; }
      let s = t * tot, k = 0; while (k < L.length - 1 && s > L[k]) { s -= L[k]; k++; }
      const f = s / L[k]; out.push([P[k][0] + (P[k + 1][0] - P[k][0]) * f, P[k][1] + (P[k + 1][1] - P[k][1]) * f]);
    }
  }
  return 'M' + out.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join('L') + 'Z';
};
function morph(root, c) {
  // R3 F7-V2: the morph is dropped; the disc stays a disc holding the number; one ring (.6s) on arrival and on hover;
  // the details are a solid card below the stage, revealed in .3s (Office and Estimates only: the rest is on the disc)
  const body = root.querySelector('.ccl2-body'), rings = [...root.querySelectorAll('.ccl2-ripple')], tog = root.querySelector('.ccl2-tog'), card = root.querySelector('.ccl2-card'), call = root.querySelector('.ccl2-call');
  const CIRCLE = pts('circle', 48);
  body.setAttribute('d', CIRCLE); rings.forEach(r => r.setAttribute('d', CIRCLE));
  let open = false;
  const ring = () => gsap.fromTo(rings[0], { scale: 1, opacity: 0.8, svgOrigin: '300 210' }, { scale: 1.3, opacity: 0, duration: 0.6, ease: 'power2.out' });
  const set = o => {
    open = o; root.classList.toggle('is-open', o); tog.setAttribute('aria-expanded', String(o)); tog.querySelector('.ccl2-tog-t').textContent = o ? 'Hide the details' : 'See the details';
    if (o) { card.hidden = false; if (c.motion) gsap.fromTo(card, { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.3, ease: EASE }); }
    else card.hidden = true;
  };
  const onTog = () => set(!open);
  tog.addEventListener('click', onTog);
  const onEnter = e => { if (e.pointerType === 'mouse' && c.motion) ring(); };
  call.addEventListener('pointerenter', onEnter);
  if (c.motion) {
    beats(root, [root.querySelector('.ccl2-h'), root.querySelector('.ccl2-p'), root.querySelector('.ccl2-stage'), tog]);
    ScrollTrigger.create({ trigger: root.querySelector('.ccl2-stage'), start: 'top 75%', once: true, onEnter: ring });
  }
  return () => { tog.removeEventListener('click', onTog); call.removeEventListener('pointerenter', onEnter); };
}

// v3 [BANK] Q114 JC Suzanne giant marquee footer CTA (STRONG: the number in giant type 60px -> 272px, hover colour 300ms,
// one marquee), run with the [BANK] Q161 horizontalLoop and the Stronghold 60s lap token, pausable (WCAG 2.2.2), resting
// off screen. Adapted: the band is a standing-seam roof (seams catch a light sweep on hover) with a brick chimney on its
// ridge (R3: one puff on entry); the band is decoration (aria-hidden, not a link: the pill is the action); the number
// is capped so it fits the viewport whole; a lap takes 24s. Hover slows it to 0.3.
function marquee(root, c) {
  const track = root.querySelector('.ccl3-track'), band = root.querySelector('.ccl3-band'), pause = root.querySelector('.ccl3-pause'), smoke = root.querySelectorAll('.ccl3-smoke circle');
  if (!c.motion) return;
  beats(root, [root.querySelector('.ccl3-h'), root.querySelector('.ccl3-p'), root.querySelector('.ccl3-top .cta-row')]);
  let loop = null, held = false, seen = true, dead = false;
  const smokeTl = gsap.timeline({ paused: true }).fromTo(smoke, { y: 20, scale: 0.6, opacity: 0 }, { y: -20, scale: 1.2, opacity: 0.8, duration: 3, ease: 'sine.out', stagger: 1 }).to(smoke, { opacity: 0, duration: 1, stagger: 1 }, 2);
  const apply = () => { if (loop) loop.paused(held || !seen); pause.setAttribute('aria-pressed', String(held)); pause.setAttribute('aria-label', held ? 'Play the moving number' : 'Pause the moving number'); };
  ScrollTrigger.create({ trigger: band, start: 'top 85%', once: true, onEnter: () => smokeTl.play() }); // R3: smoke once, on entry
  const build = () => c.ctx.add(() => {
    if (dead || !root.isConnected) return;
    loop = horizontalLoop([...track.children], { repeat: -1, paddingRight: 0, speed: track.scrollWidth / 24 / 100 }); // R3: one lap in 24s
    ScrollTrigger.create({ trigger: root, start: 'top bottom', end: 'bottom top', onToggle: s => { seen = s.isActive; apply(); } });
    { const r = root.getBoundingClientRect(); seen = r.bottom > 0 && r.top < innerHeight; } // start state: onToggle only reports changes
    apply();
  });
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(build);
  const onPause = () => { held = !held; apply(); };
  const slow = v => () => { if (loop) gsap.to(loop, { timeScale: v, duration: 0.3, overwrite: 'auto' }); };
  const enter = slow(0.3), leave = slow(1);
  pause.addEventListener('click', onPause); band.addEventListener('pointerenter', enter); band.addEventListener('pointerleave', leave);
  // bg: the chimney smoke bends away from the pointer, as smoke does in a breeze
  const plume = root.querySelector('.ccl3-smoke'), chim = root.querySelector('.ccl3-chim'), bend = gsap.quickTo(plume, 'x', { duration: 1.2, ease: 'power2.out' });
  const onDrift = e => { if (e.pointerType !== 'mouse' || !c.fine) return; const r = chim.getBoundingClientRect(), dx = e.clientX - (r.left + r.width / 2); bend(-gsap.utils.clamp(-1, 1, dx / 500) * 22); };
  const onCalm = () => bend(0);
  root.addEventListener('pointermove', onDrift, { passive: true }); root.addEventListener('pointerleave', onCalm);
  return () => { root.removeEventListener('pointermove', onDrift); root.removeEventListener('pointerleave', onCalm); dead = true; smokeTl.kill(); if (loop) loop.destroy(); pause.removeEventListener('click', onPause); band.removeEventListener('pointerenter', enter); band.removeEventListener('pointerleave', leave); };
}

// v4 The keypad (R3 new): ⟦S0095⟧ the action's own artefact, a phone keypad, and ⟦S1448⟧ one purposeful sequence.
// On entry it dials 937 746 7377 once: each key lights in turn, 90ms apart, while the display builds the number; the
// call key answers, then the Call pill settles. The keypad and display are aria-hidden; the tel: pill is the action.
// Reduced motion: the number is shown and nothing dials.
const DIAL = '9377467377';
const fmt = n => n.length <= 3 ? `(${n}` : n.length <= 6 ? `(${n.slice(0, 3)}) ${n.slice(3)}` : `(${n.slice(0, 3)}) ${n.slice(3, 6)}-${n.slice(6)}`;
function keypad(root, c) {
  const num = root.querySelector('.ccl4-num'), keys = Object.fromEntries([...root.querySelectorAll('.ccl4-k[data-k]')].map(k => [k.dataset.k, k])), go = root.querySelector('.ccl4-go'), act = root.querySelector('.ccl4-act');
  if (!c.motion) return;
  beats(root, [root.querySelector('.ccl4-h'), root.querySelector('.ccl4-p')]);
  num.textContent = ''; root.classList.add('is-dialing'); gsap.set(act, { autoAlpha: 0, y: 10 });
  const tl = gsap.timeline({ paused: true });
  [...DIAL].forEach((d, i) => {
    const at = 0.2 + i * 0.09;
    tl.call(() => { num.textContent = fmt(DIAL.slice(0, i + 1)); }, null, at)
      .fromTo(keys[d], { '--lit': 1 }, { '--lit': 0, duration: 0.24, ease: 'power2.out', immediateRender: false }, at);
  });
  tl.fromTo(go, { scale: 1 }, { scale: 0.92, duration: 0.08, ease: 'power2.out', yoyo: true, repeat: 1 }, '+=0.12')
    .call(() => root.classList.remove('is-dialing'))
    .to(act, { autoAlpha: 1, y: 0, duration: 0.3, ease: EASE });
  const st = ScrollTrigger.create({ trigger: root.querySelector('.ccl4-pad'), start: 'top 75%', once: true, onEnter: () => tl.play() });
  return () => { st.kill(); tl.kill(); };
}

// v5 Office status (R3 new): pack G-call (b) and ⟦S1314⟧ (no fake live state). The close is the office's week: Springboro
// time from Intl (America/New_York), recomputed each minute; seven day rows with Monday to Friday 9 to 5 filled; a fixed
// "now" mark on today's row; a plain sentence saying whether that time is inside the hours and when Rachel is next in.
// Never "open now" (a holiday could make it untrue), no pulse, no live region (it would announce every minute).
function status(root, c) {
  const week = root.querySelector('.ccl5-week'), time = root.querySelector('.ccl5-time'), day = root.querySelector('.ccl5-day'), say = root.querySelector('.ccl5-say');
  week.innerHTML = DAYS.map((d, i) => `<div class="ccl5-row" data-d="${i}"><span class="ccl5-dn">${d.slice(0, 3)}</span><span class="ccl5-tr">${i < 5 ? '<span class="ccl5-blk"></span>' : ''}</span></div>`).join('');
  const mark = document.createElement('span'); mark.className = 'ccl5-now'; mark.innerHTML = '<span>Now</span>';
  const paint = () => {
    const t = springboro();
    if (!t) { time.textContent = ''; day.textContent = ''; say.textContent = 'Office hours: Monday to Friday, 9 to 5.'; mark.remove(); return; }
    time.textContent = t.time; day.textContent = `${t.wd} in Springboro`;
    say.textContent = t.inside ? 'That is within office hours.' : `That is outside office hours. Rachel is back ${t.next}.`;
    week.querySelectorAll('.ccl5-row').forEach(r => r.classList.toggle('is-today', +r.dataset.d === t.day));
    const tr = week.querySelector(`.ccl5-row[data-d="${t.day}"] .ccl5-tr`); if (mark.parentNode !== tr) tr.appendChild(mark);
    mark.style.left = (t.mins / 1440 * 100).toFixed(2) + '%';
    mark.classList.toggle('is-end', t.mins > 1200);
  };
  paint();
  const clock = setInterval(paint, 60000);
  if (c.motion) {
    beats(root, [root.querySelector('.ccl5-h'), root.querySelector('.ccl5-p'), root.querySelector('.ccl5-board'), root.querySelector('.ccl5-act')]);
    gsap.fromTo(week.querySelectorAll('.ccl5-blk'), { scaleX: 0 }, { scaleX: 1, transformOrigin: '0 50%', duration: 0.45, ease: EASE, stagger: 0.06, scrollTrigger: { trigger: week, start: 'top 80%', once: true } });
  }
  return () => clearInterval(clock);
}

export default { 4: close, 5: morph, 6: marquee, 7: keypad, 8: status };
