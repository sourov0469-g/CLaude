// CALL (PLAN-V7 §6), the page's close. Facts only: (937) 746-7377; Rachel answers; Monday to Friday, 9 to 5; written,
// line-by-line estimates; 38 N Pioneer Blvd, Springboro OH 45066. The hours line is computed from the real hours in
// Springboro's time zone and states only what the hours say (never "open now", which a holiday could make untrue).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EASE, beats } from '../../js/fx.js';
import { horizontalLoop } from '../../js/hloop.js';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(CustomEase);
const IN = CustomEase.create('shazamIn', '.8,-.6,.2,1'), OUT = CustomEase.create('shazamOut', '.4,1,.3,1');

const visible = (el, fn) => { const io = new IntersectionObserver(([e]) => fn(e.isIntersecting), { rootMargin: '80px' }); io.observe(el); return () => io.disconnect(); };
function hoursLine() {
  try {
    const now = new Date(), f = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', weekday: 'long', hour: 'numeric', minute: '2-digit', hour12: true });
    const parts = Object.fromEntries(f.formatToParts(now).map(p => [p.type, p.value]));
    const h24 = +new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', hour: 'numeric', hourCycle: 'h23' }).format(now);
    const wd = parts.weekday, work = !['Saturday', 'Sunday'].includes(wd), inside = work && h24 >= 9 && h24 < 17;
    const when = `It's ${parts.hour}:${parts.minute} ${parts.dayPeriod.toLowerCase()} on ${wd} in Springboro`;
    if (inside) return `${when}, within office hours (Monday to Friday, 9 to 5).`;
    const next = work && h24 < 9 ? 'today at 9' : wd === 'Friday' || wd === 'Saturday' || wd === 'Sunday' ? 'Monday at 9' : 'tomorrow at 9';
    return `${when}, outside office hours. Rachel is back ${next}.`;
  } catch (e) { return 'Office hours: Monday to Friday, 9 to 5.'; }
}

// v1 Anatomy F9/F14 (the offer names the next step and it produces a number: a written, line-by-line estimate), [BANK]
// the OFFF giant two-tone footer wordmark, and a gutter run across the top of the close. Its drops gather at the lip
// and pinch off with a gooey neck (⟦S1350⟧ gooey-blob-system: blur then an alpha threshold), one every 7s, and fall to
// the call button; the loop rests off screen; reduced motion shows one drop hanging still.
function close(root, c) {
  const live = root.querySelector('.cl1-live'); live.textContent = hoursLine();
  const drops = root.querySelector('.cl1-drops'), d = root.querySelector('.cl1-d'), fall = root.querySelector('.cl1-fall');
  const done = [];
  const cleanup = () => done.forEach(f => f());
  if (!c.motion) { drops.style.display = 'block'; const r = root.getBoundingClientRect(), b = root.querySelector('.cl1-call').getBoundingClientRect(); drops.style.left = (b.left - r.left + b.width / 2 - 60) + 'px'; gsap.set(d, { attr: { r: 7, cy: 14 } }); return cleanup; }
  drops.style.display = 'block';
  // hang the emitter from the gutter right above the call button; the drop falls to the button's top edge
  const btn = root.querySelector('.cl1-call');
  const place = () => { const r = root.getBoundingClientRect(), b = btn.getBoundingClientRect(), sv = drops.getBoundingClientRect(); drops.style.left = (b.left - r.left + b.width / 2 - 60) + 'px'; root.__fall = Math.max(40, b.top - sv.top - 6); };
  place(); const ro = new ResizeObserver(place); ro.observe(root); done.push(() => ro.disconnect());
  beats(root, [root.querySelector('.cl1-kick'), root.querySelector('.cl1-h'), root.querySelector('.cl1-p'), root.querySelector('.cl1-act')]);
  gsap.fromTo(root.querySelector('.cl1-word span:last-child'), { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 52% 0)', duration: 0.3, ease: EASE, scrollTrigger: { trigger: root.querySelector('.cl1-word'), start: 'top 90%', once: true } });
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 4.6, paused: true })
    .fromTo(d, { attr: { r: 0, cy: 8 } }, { attr: { r: 8, cy: 16 }, duration: 1.2, ease: 'sine.in' })
    .to(d, { attr: { cy: 30, r: 6 }, duration: 0.25, ease: 'power2.in' })
    .set(d, { attr: { r: 0 } })
    .fromTo(fall, { attr: { cy: 30 }, opacity: 1 }, { attr: { cy: () => root.__fall || 150 }, opacity: 0.6, duration: 0.6, ease: 'power2.in', immediateRender: false }, '<')
    .set(fall, { opacity: 0 });
  done.push(visible(root.querySelector('.cl1-act'), v => (v ? tl.play() : tl.pause())), () => tl.kill());
  return cleanup;
}

// v2 [BANK] Shazam-like Morphing Button 255 (the Atlas names it the CALL reference: the call button morphs into the
// contact card). Values: morph 400ms cubic-bezier(.8,-.6,.2,1) (dips before settling); content exits -25px over 0.4s and
// the next enters from +25px; ripple ring 1.2s ease-out, a second ring 0.6s later; close 400ms cubic-bezier(.4,1,.3,1);
// paths share one point structure. Adapted: the round call morphs into a house-shaped card (gable top) with Rachel's
// details; the tel link stays the primary action; rings ring three times on arrival and while hovered, never endlessly.
const pts = (shape, n) => { // n points round a circle, or round a house outline, in the same order (MorphSVG still matches)
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
  const body = root.querySelector('.cl2-body'), rings = [...root.querySelectorAll('.cl2-ripple')], tog = root.querySelector('.cl2-tog'), card = root.querySelector('.cl2-card'), call = root.querySelector('.cl2-call');
  const CIRCLE = pts('circle', 48), HOUSE = pts('house', 48);
  body.setAttribute('d', CIRCLE); rings.forEach(r => r.setAttribute('d', CIRCLE));
  let open = false;
  const dur = c.motion ? 0.4 : 0;
  const ring = (n) => rings.forEach((r, i) => gsap.fromTo(r, { scale: 1, opacity: 0.8, svgOrigin: '300 210' }, { scale: 1.35, opacity: 0, duration: 1.2, ease: 'power2.out', delay: i * 0.6, repeat: n - 1 }));
  const set = o => {
    open = o; root.classList.toggle('is-open', o); tog.setAttribute('aria-expanded', String(o)); tog.querySelector('.cl2-tog-t').textContent = o ? 'Hide the details' : 'See the details';
    gsap.to(body, { morphSVG: o ? HOUSE : CIRCLE, duration: dur, ease: o ? IN : OUT, overwrite: 'auto' });
    if (o) { card.hidden = false; gsap.fromTo(card, { y: 25, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: dur, delay: dur * 0.5, ease: EASE }); }
    else gsap.to(card, { y: -25, autoAlpha: 0, duration: dur * 0.8, ease: EASE, onComplete: () => { card.hidden = true; } });
  };
  const onTog = () => set(!open);
  tog.addEventListener('click', onTog);
  const onEnter = e => { if (e.pointerType === 'mouse' && c.motion && !open) ring(2); };
  call.addEventListener('pointerenter', onEnter);
  if (c.motion) {
    beats(root, [root.querySelector('.cl2-h'), root.querySelector('.cl2-p'), root.querySelector('.cl2-stage'), tog]);
    ScrollTrigger.create({ trigger: root.querySelector('.cl2-stage'), start: 'top 75%', once: true, onEnter: () => ring(3) });
  }
  return () => { tog.removeEventListener('click', onTog); call.removeEventListener('pointerenter', onEnter); };
}

// v3 [BANK] Q114 JC Suzanne giant marquee footer CTA (STRONG: the number in giant type 60px -> 272px, hover colour 300ms,
// one marquee), run with the [BANK] Q161 horizontalLoop and the Stronghold 60s lap token, pausable (WCAG 2.2.2), resting
// off screen. Adapted: the band is a standing-seam roof (seams catch a light sweep on hover) with a brick chimney on its
// ridge puffing slow smoke; the whole band is the tel link; a static readable copy sits above. Hover slows it to 0.3.
function marquee(root, c) {
  const track = root.querySelector('.cl3-track'), band = root.querySelector('.cl3-band'), pause = root.querySelector('.cl3-pause'), smoke = root.querySelectorAll('.cl3-smoke circle');
  if (!c.motion) return;
  beats(root, [root.querySelector('.cl3-h'), root.querySelector('.cl3-p'), root.querySelector('.cl3-top .cta-row')]);
  let loop = null, held = false, seen = true, dead = false;
  const smokeTl = gsap.timeline({ repeat: -1 }).fromTo(smoke, { y: 20, scale: 0.6, opacity: 0 }, { y: -20, scale: 1.2, opacity: 0.8, duration: 3, ease: 'sine.out', stagger: 1 }).to(smoke, { opacity: 0, duration: 1, stagger: 1 }, 2);
  const apply = () => { if (loop) loop.paused(held || !seen); held || !seen ? smokeTl.pause() : smokeTl.play(); pause.setAttribute('aria-pressed', String(held)); };
  const build = () => c.ctx.add(() => {
    if (dead || !root.isConnected) return;
    loop = horizontalLoop([...track.children], { repeat: -1, paddingRight: 0, speed: track.scrollWidth / 60 / 100 });
    ScrollTrigger.create({ trigger: root, start: 'top bottom', end: 'bottom top', onToggle: s => { seen = s.isActive; apply(); } });
    apply();
  });
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(build);
  const onPause = () => { held = !held; apply(); };
  const slow = v => () => { if (loop) gsap.to(loop, { timeScale: v, duration: 0.3, overwrite: 'auto' }); };
  const enter = slow(0.3), leave = slow(1);
  pause.addEventListener('click', onPause); band.addEventListener('pointerenter', enter); band.addEventListener('pointerleave', leave);
  return () => { dead = true; smokeTl.kill(); if (loop) loop.destroy(); pause.removeEventListener('click', onPause); band.removeEventListener('pointerenter', enter); band.removeEventListener('pointerleave', leave); };
}

export default { 1: close, 2: morph, 3: marquee };
