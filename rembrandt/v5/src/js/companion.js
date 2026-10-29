// Cursor companion (PLAN-FULL G2; BRIEF-FULL §4: no plain or fixed cursor). On a fine pointer, with a variant chosen, the
// companion IS the cursor: the system cursor is hidden (text fields keep the I-beam) and a nail head sits exactly on the
// pointer with zero lag (S1321 cursor dot), so pointing stays precise; the character follows at +22/+22. It idles,
// blinks, glances, rolls its eyes, now and then acts on its own, and reacts differently to buttons, links, images,
// headings and cards (hover and press differ). Variants House, Hammer, Drop and Off (Off gives the system cursor back).
// References: S0489 living illustration, S0635 gaze-follow, S1303 pointer lerp (eyes 0.06-0.12 per frame), S1321
// follower (quickTo 0.35 power3.out) and cursor dot, S1309 tilt from horizontal velocity (<= 8 degrees), #362 mismatched
// idle periods, Q381 state presets, S1455 explicit states, P10 attribute state (data-hover on .cmp), S1323 re-entry
// reset. Safety: the cursor is hidden only after the companion has mounted AND the pointer position is known
// (html.cmp-live), and that is dropped when the pointer leaves the page, so a failure can never strand the page without a
// cursor; aria-hidden, pointer-events none; never mounted on touch or coarse pointers; Off by default under reduced
// motion. One rAF loop, stopped when the tab is hidden or the pointer is still.
import { gsap } from 'gsap';

const NS = 'http://www.w3.org/2000/svg';
const INK = '#0b1f4d', BLUE = '#1a4199', SUN = '#ffb81f', SKY = '#dce4f3', CHALK = '#6f9be8', SH = '#3a4152';
const eye = (x, y, r, lid) => `<g class="eye"><circle cx="${x}" cy="${y}" r="${r}" fill="#fff" stroke="${INK}" stroke-width="2"/><circle class="p" cx="${x}" cy="${y}" r="${(r * 0.5).toFixed(1)}" fill="${INK}"/><circle class="lid" cx="${x}" cy="${y}" r="${r + 0.6}" fill="${lid}"/></g>`;
export const VARIANTS = {
  house: { name: 'House', svg: `
    <ellipse class="sh" cx="32" cy="61" rx="17" ry="2.6" fill="${INK}" opacity=".16"/>
    <g class="bd">
      <g class="smk" fill="none" stroke="${CHALK}" stroke-width="2"></g>
      <rect class="chim" x="40" y="11" width="7.5" height="13" rx="1.5" fill="${SH}" stroke="${INK}" stroke-width="2.2"/>
      <rect class="wall" x="14" y="28" width="36" height="31" rx="5" fill="#fff" stroke="${INK}" stroke-width="2.5"/>
      <g class="win"><rect x="18.5" y="33" width="11" height="11" rx="3" fill="${SKY}" stroke="${INK}" stroke-width="2"/><circle class="p" cx="24" cy="38.5" r="2.5" fill="${INK}"/><rect class="lid" x="18.5" y="33" width="11" height="11" rx="3" fill="${BLUE}"/></g>
      <g class="win"><rect x="34.5" y="33" width="11" height="11" rx="3" fill="${SKY}" stroke="${INK}" stroke-width="2"/><circle class="p" cx="40" cy="38.5" r="2.5" fill="${INK}"/><rect class="lid" x="34.5" y="33" width="11" height="11" rx="3" fill="${BLUE}"/></g>
      <rect class="door" x="28" y="48" width="8" height="11" rx="3" fill="${INK}"/>
      <path class="roof" d="M6 31.5 L32 8.5 L58 31.5 Z" fill="${BLUE}" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
      <path class="ridge" d="M14 24.5 L32 8.5 L50 24.5" fill="none" stroke="${CHALK}" stroke-width="1.6" stroke-linecap="round" opacity=".7"/>
    </g>` },
  hammer: { name: 'Hammer', svg: `
    <ellipse class="sh" cx="32" cy="61" rx="12" ry="2.4" fill="${INK}" opacity=".16"/>
    <g class="bd">
      <rect class="handle" x="28.5" y="24" width="7" height="36" rx="3.5" fill="${SUN}" stroke="${INK}" stroke-width="2.5"/>
      <path d="M28.5 49h7" stroke="${INK}" stroke-width="1.6" opacity=".5"/><path d="M28.5 53h7" stroke="${INK}" stroke-width="1.6" opacity=".5"/>
      <g class="head">
        <path class="claw" d="M15 14 C 8 13 4 17 3 23 M15 22 C 10 22 7 25 6 29" fill="none" stroke="${INK}" stroke-width="3.4" stroke-linecap="round"/>
        <rect x="13" y="10.5" width="34" height="15" rx="4.5" fill="${SH}" stroke="${INK}" stroke-width="2.5"/>
        <rect class="face" x="45" y="9" width="7" height="18" rx="2.5" fill="${SH}" stroke="${INK}" stroke-width="2.5"/>
        ${eye(23.5, 18, 4.2, SH)}${eye(35, 18, 4.2, SH)}
      </g>
      <g class="lvl" opacity="0"><rect x="9" y="0" width="46" height="7" rx="2" fill="${SUN}" stroke="${INK}" stroke-width="2"/><rect x="27" y="1.5" width="10" height="4" rx="2" fill="#fff" stroke="${INK}" stroke-width="1.2"/><circle class="bub" cx="30" cy="3.5" r="1.4" fill="${CHALK}"/></g>
      <g class="ticks" stroke="${INK}" stroke-width="2" stroke-linecap="round" opacity="0"><path d="M14 64v3M22 64v4M30 64v3M38 64v4M46 64v3"/></g>
    </g>` },
  drop: { name: 'Drop', svg: `
    <ellipse class="sh" cx="32" cy="61.5" rx="14" ry="2.6" fill="${INK}" opacity=".16"/>
    <g class="bd">
      <path class="drp" d="M32 5 C 38 15 50 27 50 40.5 A 18 18 0 0 1 14 40.5 C 14 27 26 15 32 5 Z" fill="${CHALK}" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
      <path class="hl" d="M21 37 C 21 31 23.5 27 26 24.5" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" opacity=".85"/>
      ${eye(26, 42, 4.2, CHALK)}${eye(38.5, 42, 4.2, CHALK)}
      <path class="mouth" d="M29 50.5 Q 32 53 35 50.5" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>
      <g class="beads" fill="${CHALK}" stroke="${INK}" stroke-width="1.4" opacity="0"><circle cx="20" cy="-2" r="2.6"/><circle cx="32" cy="-6" r="3"/><circle cx="44" cy="-2" r="2.6"/></g>
      <circle class="lens" cx="32" cy="38" r="27" fill="none" stroke="${INK}" stroke-width="2" opacity="0"/>
    </g>` },
};
// per-section accessory (held top-right; the hard hat sits on the head)
const ACC = {
  umbrella: `<path d="M2 11 A10 9 0 0 1 22 11 Z" fill="${BLUE}" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round"/><path d="M12 11v9a2.5 2.5 0 0 1-5 0" fill="none" stroke="${INK}" stroke-width="1.8" stroke-linecap="round"/><path d="M8.5 11 A4 9 0 0 1 12 2 A4 9 0 0 1 15.5 11" fill="none" stroke="${INK}" stroke-width="1.2" opacity=".5"/>`,
  visor: `<circle cx="12" cy="12" r="5" fill="${SUN}" stroke="${INK}" stroke-width="1.8"/><path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3M4.6 4.6l2.1 2.1M17.3 17.3l2.1 2.1M4.6 19.4l2.1-2.1M17.3 6.7l2.1-2.1" stroke="${INK}" stroke-width="1.6" stroke-linecap="round"/>`,
  reel: `<circle cx="10" cy="12" r="7.5" fill="${CHALK}" stroke="${INK}" stroke-width="1.8"/><circle cx="10" cy="12" r="2" fill="#fff" stroke="${INK}" stroke-width="1.4"/><path d="M17.5 12H23" stroke="${CHALK}" stroke-width="1.8" stroke-linecap="round" stroke-dasharray="1 2.5"/>`,
  tape: `<rect x="2" y="5" width="15" height="14" rx="4" fill="${SUN}" stroke="${INK}" stroke-width="1.8"/><circle cx="9.5" cy="12" r="3" fill="none" stroke="${INK}" stroke-width="1.4"/><path d="M17 15h6v3h-2" fill="none" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round"/>`,
  hat: `<path d="M3 17 A9 9 0 0 1 21 17 Z" fill="${SUN}" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round"/><path d="M1 17.5h22" stroke="${INK}" stroke-width="2.2" stroke-linecap="round"/><path d="M12 8v9" stroke="${INK}" stroke-width="1.4" opacity=".6"/>`,
  belt: `<path d="M3 4 L14 15" stroke="${SH}" stroke-width="3.4" stroke-linecap="round"/><path d="M11 3 l4 -1 l3 3 l-2 3 l-4 -1 z" fill="${SH}" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round"/><path d="M8 20 L22 20 L22 9" fill="none" stroke="${SUN}" stroke-width="3" stroke-linejoin="round"/>`,
  pin: `<path d="M12 22 C 12 22 4 13.5 4 9 A8 8 0 0 1 20 9 C 20 13.5 12 22 12 22 Z" fill="${SUN}" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round"/><path d="M8 10 L12 6.5 L16 10 V13 H8 Z" fill="#fff" stroke="${INK}" stroke-width="1.2" stroke-linejoin="round"/>`,
  phone: `<path d="M5 3.5h3.2l1.6 4.2-2 1.3a11 11 0 0 0 7.2 7.2l1.3-2 4.2 1.6V19a1.6 1.6 0 0 1-1.7 1.6A16.5 16.5 0 0 1 3.4 5.2 1.6 1.6 0 0 1 5 3.5z" fill="${SUN}" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round"/>`,
};
const MOOD = { hero: 'umbrella', proof: 'reel', work: 'tape', family: 'hat', how: 'belt', area: 'pin', call: 'phone' };
const KINDS = ['button', 'link', 'image', 'heading', 'card'];
function kindOf(el) {
  if (!el || !el.closest) return null;
  const t = el.closest('[data-c],a,button,label,[role=button],[role=tab],img,.ph,figure,h1,h2,h3,[data-cursor]');
  if (!t || t.closest('.cmp-pick')) return null;
  if (t.dataset.c) return KINDS.includes(t.dataset.c) ? [t.dataset.c, t] : null;
  if (t.matches('button,label,[role=button],[role=tab]') || t.classList.contains('btn')) return ['button', t];
  if (t.matches('a')) return ['link', t];
  if (t.matches('img,.ph,figure')) return ['image', t];
  if (t.matches('h1,h2,h3')) return ['heading', t];
  return null;
}

// ----- per-variant reactions (hover != press), solo acts, idle; each returns a timeline or tween
const Q = (ch, s) => ch.querySelectorAll(s);
const R = {
  house: {
    idle: ch => gsap.to(Q(ch, '.bd'), { scaleY: 1.03, transformOrigin: '50% 100%', duration: 1.3, ease: 'sine.inOut', yoyo: true, repeat: -1 }),
    hover: {
      button: ch => gsap.to(Q(ch, '.roof,.ridge,.chim'), { y: -5, rotation: -9, transformOrigin: '0% 100%', duration: 0.22, ease: 'power3.out' }),
      link: (ch, dir) => gsap.to(Q(ch, '.bd'), { rotation: 9 * dir, transformOrigin: '50% 100%', duration: 0.25, ease: 'power3.out' }),
      image: ch => gsap.timeline().to(Q(ch, '.lid'), { scaleY: 1, duration: 0.05, ease: 'none' }).to(Q(ch, '.lid'), { scaleY: 0, duration: 0.05, ease: 'none' }).fromTo(Q(ch, '.win rect:first-child'), { fill: '#fff' }, { fill: SKY, duration: 0.3 }, '<'),
      heading: ch => gsap.fromTo(Q(ch, '.p'), { x: -2.6 }, { x: 2.6, duration: 0.6, ease: 'sine.inOut', yoyo: true, repeat: -1 }),
      card: ch => gsap.to(Q(ch, '.bd'), { scaleY: 0.86, y: 4, transformOrigin: '50% 100%', duration: 0.22, ease: 'power3.out' }),
    },
    press: {
      button: ch => gsap.timeline().to(Q(ch, '.door'), { scaleX: 0.2, transformOrigin: '0% 50%', duration: 0.1 }).to(Q(ch, '.door'), { scaleX: 1, duration: 0.25 }).fromTo(Q(ch, '.bd'), { y: 0 }, { y: -7, duration: 0.12, yoyo: true, repeat: 1, ease: 'power2.out' }, 0),
      link: ch => gsap.fromTo(Q(ch, '.bd'), { y: 0 }, { y: 3, duration: 0.09, yoyo: true, repeat: 1 }),
      image: ch => gsap.fromTo(Q(ch, '.win rect:first-child'), { fill: SUN }, { fill: SKY, duration: 0.3 }),
      heading: ch => gsap.fromTo(Q(ch, '.lid'), { scaleY: 0.6 }, { scaleY: 0, duration: 0.3 }),
      card: ch => gsap.fromTo(Q(ch, '.bd'), { y: 4 }, { y: -6, duration: 0.14, yoyo: true, repeat: 1, ease: 'power2.out' }),
    },
    solo: [
      ch => { const s = Q(ch, '.smk')[0]; const r = document.createElementNS(NS, 'circle'); r.setAttribute('cx', 43.5); r.setAttribute('cy', 9); r.setAttribute('r', 2.5); s.append(r); return gsap.timeline({ onComplete: () => r.remove() }).to(r, { attr: { cy: -14, r: 7 }, opacity: 0, duration: 1.6, ease: 'power1.out' }); },
      ch => gsap.timeline().to(Q(ch, '.p'), { y: -2.6, duration: 0.18 }).to(Q(ch, '.p'), { x: 2.6, y: 0, duration: 0.18 }).to(Q(ch, '.p'), { x: 0, y: 2.2, duration: 0.18 }).to(Q(ch, '.p'), { x: -2.6, y: 0, duration: 0.18 }).to(Q(ch, '.p'), { x: 0, y: 0, duration: 0.2 }),
      ch => gsap.timeline().to(Q(ch, '.roof,.ridge,.chim'), { y: -6, rotation: -14, transformOrigin: '0% 100%', duration: 0.25, ease: 'power3.out' }).to(Q(ch, '.roof,.ridge,.chim'), { y: 0, rotation: 0, duration: 0.35, ease: 'power2.out' }, '+=0.3'),
    ],
  },
  hammer: {
    idle: ch => gsap.fromTo(Q(ch, '.bd'), { rotation: -3 }, { rotation: 3, transformOrigin: '50% 95%', duration: 2.15, ease: 'sine.inOut', yoyo: true, repeat: -1 }),
    hover: {
      button: ch => gsap.to(Q(ch, '.head'), { rotation: -24, transformOrigin: '55% 140%', duration: 0.22, ease: 'power3.out' }),
      link: (ch, dir) => gsap.to(Q(ch, '.head'), { rotation: dir < 0 ? 22 : -14, transformOrigin: '55% 140%', duration: 0.25, ease: 'power3.out' }),
      image: ch => gsap.timeline().to(Q(ch, '.lvl'), { opacity: 1, duration: 0.15 }).fromTo(Q(ch, '.bub'), { attr: { cx: 29 } }, { attr: { cx: 32 }, duration: 0.6, ease: 'elastic.out(1,0.5)' }),
      heading: ch => gsap.to(Q(ch, '.ticks'), { opacity: 1, duration: 0.18 }),
      card: ch => gsap.fromTo(Q(ch, '.head'), { rotation: 0 }, { rotation: 10, transformOrigin: '55% 140%', duration: 0.12, yoyo: true, repeat: 3, ease: 'power2.inOut' }),
    },
    press: {
      button: (ch, dir, fx) => { fx && fx('spark'); return gsap.timeline().to(Q(ch, '.head'), { rotation: 18, transformOrigin: '55% 140%', duration: 0.08, ease: 'power2.in' }).to(Q(ch, '.bd'), { scaleY: 0.9, transformOrigin: '50% 100%', duration: 0.06 }).to(Q(ch, '.head'), { rotation: 0, duration: 0.3, ease: 'power3.out' }).to(Q(ch, '.bd'), { scaleY: 1, duration: 0.3, ease: 'elastic.out(1,0.4)' }, '<'); },
      link: ch => gsap.fromTo(Q(ch, '.head'), { rotation: 0 }, { rotation: 12, transformOrigin: '55% 140%', duration: 0.08, yoyo: true, repeat: 1 }),
      image: ch => gsap.fromTo(Q(ch, '.bub'), { attr: { cx: 35 } }, { attr: { cx: 32 }, duration: 0.5, ease: 'elastic.out(1,0.5)' }),
      heading: ch => gsap.fromTo(Q(ch, '.ticks path'), { y: 0 }, { y: 2, duration: 0.08, yoyo: true, repeat: 1 }),
      card: ch => gsap.fromTo(Q(ch, '.bd'), { scaleY: 0.92 }, { scaleY: 1, transformOrigin: '50% 100%', duration: 0.3, ease: 'elastic.out(1,0.4)' }),
    },
    solo: [
      (ch, fx) => { fx && fx('spark'); return gsap.timeline().to(Q(ch, '.head'), { rotation: -30, transformOrigin: '55% 140%', duration: 0.2 }).to(Q(ch, '.head'), { rotation: 16, duration: 0.08, ease: 'power2.in' }).to(Q(ch, '.head'), { rotation: 0, duration: 0.3 }); },
      ch => gsap.fromTo(Q(ch, '.bd'), { rotation: 0 }, { rotation: 360, transformOrigin: '50% 60%', duration: 0.6, ease: 'power2.inOut', clearProps: 'rotation' }),
    ],
  },
  drop: {
    idle: ch => gsap.timeline({ repeat: -1, yoyo: true }).to(Q(ch, '.drp'), { scaleX: 1.04, scaleY: 0.97, transformOrigin: '50% 100%', duration: 1.3, ease: 'sine.inOut' }),
    hover: {
      button: ch => gsap.to(Q(ch, '.bd'), { scale: 1.14, transformOrigin: '50% 100%', duration: 0.22, ease: 'power3.out' }),
      link: (ch, dir) => gsap.to(Q(ch, '.bd'), { scaleY: 1.12, scaleX: 0.92, rotation: 10 * dir, transformOrigin: '50% 100%', duration: 0.25, ease: 'power3.out' }),
      image: ch => gsap.to(Q(ch, '.lens'), { opacity: 0.85, attr: { r: 30 }, duration: 0.25, ease: 'power3.out' }),
      heading: ch => gsap.fromTo(Q(ch, '.beads circle'), { y: -4, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, stagger: 0.06, ease: 'power3.out', onStart: () => gsap.set(Q(ch, '.beads'), { opacity: 1 }) }),
      card: ch => gsap.to(Q(ch, '.sh'), { attr: { rx: 22, ry: 3.4 }, opacity: 0.3, duration: 0.3, ease: 'power3.out' }),
    },
    press: {
      button: (ch, dir, fx) => { fx && fx('splash'); return gsap.fromTo(Q(ch, '.bd'), { scaleY: 0.82, scaleX: 1.12 }, { scaleY: 1, scaleX: 1, transformOrigin: '50% 100%', duration: 0.35, ease: 'elastic.out(1,0.45)' }); },
      link: ch => gsap.fromTo(Q(ch, '.bd'), { y: 3 }, { y: 0, duration: 0.25, ease: 'power3.out' }),
      image: ch => gsap.fromTo(Q(ch, '.lens'), { attr: { r: 24 } }, { attr: { r: 30 }, duration: 0.3, ease: 'power3.out' }),
      heading: ch => gsap.fromTo(Q(ch, '.beads circle'), { y: 0 }, { y: 6, opacity: 0, duration: 0.3, stagger: 0.04 }),
      card: ch => gsap.fromTo(Q(ch, '.bd'), { scaleY: 0.88 }, { scaleY: 1, transformOrigin: '50% 100%', duration: 0.3, ease: 'elastic.out(1,0.45)' }),
    },
    solo: [
      (ch, fx) => { fx && fx('drip'); return gsap.fromTo(Q(ch, '.bd'), { scaleY: 0.94 }, { scaleY: 1, transformOrigin: '50% 100%', duration: 0.4, ease: 'elastic.out(1,0.4)' }); },
      ch => gsap.timeline().to(Q(ch, '.lid'), { scaleY: 0.55, duration: 0.12 }).fromTo(Q(ch, '.hl'), { x: 0 }, { x: 8, duration: 0.35, ease: 'sine.inOut', yoyo: true, repeat: 1 }).to(Q(ch, '.lid'), { scaleY: 0, duration: 0.12 }),
    ],
  },
};

export function initCompanion(store) {
  const html = document.documentElement, root = document.querySelector('.cmp'), pick = document.querySelector('.cmp-pick');
  const fineQ = matchMedia('(hover: hover) and (pointer: fine)'), rmQ = matchMedia('(prefers-reduced-motion: reduce)');
  const pos = root.querySelector('.cmp-pos'), tilt = root.querySelector('.cmp-tilt'), ch = root.querySelector('.cmp-ch'), acc = root.querySelector('.cmp-acc'), lab = root.querySelector('.cmp-label');
  const fxl = root.querySelector('.cmp-fx'), nail = root.querySelector('.cmp-nail');
  const TEXT = 'input:not([type=radio]):not([type=checkbox]):not([type=range]):not([type=button]):not([type=submit]),textarea,[contenteditable]';
  let mode = null, on = false, mounted = false;
  let px = -200, py = -200, cx = -200, cy = -200, vx = 0, rot = 0, lastMove = 0, raf = 0, last = 0;
  let hoverKind = null, hoverEl = null, hoverTw = null, idleTw = null, soloAt = 0, soloTw = null, blinkAt = 0, glanceAt = 0, glance = [0, 0], mood = '';
  const look = { x: 0, y: 0 };
  let qx = null, qy = null;

  const want = () => { const s = store.get().companion; return VARIANTS[s] || s === 'off' ? s : rmQ.matches ? 'off' : 'house'; };
  function fx(kind) { // small effects outside the character: spark lines, splash ring, a falling droplet
    const r = document.createElementNS(NS, 'g'), x = cx + 23, y = cy + 44;
    r.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`); fxl.append(r);
    if (kind === 'spark') { r.innerHTML = [0, 1, 2].map(i => `<path d="M0 0 L${[14, 0, -14][i]} ${[-8, -16, -8][i]}" stroke="${SUN}" stroke-width="2.5" stroke-linecap="round"/>`).join(''); gsap.fromTo(r.children, { scale: 0.3, opacity: 1, transformOrigin: '0 0' }, { scale: 1.2, opacity: 0, duration: 0.35, ease: 'power2.out', onComplete: () => r.remove() }); }
    else if (kind === 'splash') { r.innerHTML = `<ellipse rx="6" ry="2" fill="none" stroke="${CHALK}" stroke-width="2"/>`; gsap.to(r.firstChild, { attr: { rx: 22, ry: 6 }, opacity: 0, duration: 0.45, ease: 'power2.out', onComplete: () => r.remove() }); }
    else if (kind === 'drip') { r.innerHTML = `<path d="M0 -6 C 2 -3 3 -1 3 1 A3 3 0 0 1 -3 1 C -3 -1 -2 -3 0 -6Z" fill="${CHALK}" stroke="${INK}" stroke-width="1.2"/>`; gsap.fromTo(r.firstChild, { y: 0, opacity: 1 }, { y: 34, opacity: 0, duration: 0.7, ease: 'power2.in', onComplete: () => r.remove() }); }
  }
  function setMood(id, sec) {
    const m = (sec && sec.dataset.mood) || MOOD[id] || '';
    if (m === mood) return; mood = m;
    acc.innerHTML = ACC[m] || '';
    if (m === 'hat') { gsap.set(acc, { right: 'auto', left: mode === 'hammer' ? 14 : 12, top: mode === 'house' ? -6 : mode === 'drop' ? -10 : -10 }); }
    else gsap.set(acc, { left: 'auto', right: -12, top: -8 });
    if (m && on && !rmQ.matches) gsap.fromTo(acc, { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: 'back.out(1.7)' });
  }
  function resetParts() { gsap.killTweensOf(ch.querySelectorAll('*')); gsap.set(ch.querySelectorAll('.bd,.bd *'), { clearProps: 'transform,opacity' }); ch.querySelectorAll('.lid').forEach(l => gsap.set(l, { scaleY: 0 })); const lv = ch.querySelector('.lvl'), tk = ch.querySelector('.ticks'), be = ch.querySelector('.beads'), le = ch.querySelector('.lens'); [lv, tk, be].forEach(e => e && gsap.set(e, { opacity: 0 })); if (le) gsap.set(le, { opacity: 0 }); }
  function build(v) {
    ch.innerHTML = VARIANTS[v].svg; mood = '';
    resetParts();
    if (idleTw) idleTw.kill(); idleTw = rmQ.matches ? null : R[v].idle(ch);
  }
  function setHover(k, el) {
    if (k === hoverKind && el === hoverEl) return;
    if (hoverTw) { hoverTw.kill(); hoverTw = null; }
    if (hoverKind) { resetParts(); if (idleTw) { idleTw.kill(); idleTw = R[mode].idle(ch); } }
    hoverKind = k; hoverEl = el; root.dataset.hover = k || '';
    const label = el && el.dataset.cursorLabel; lab.textContent = label || ''; lab.classList.toggle('is-on', !!label);
    if (!k || rmQ.matches) return;
    if (idleTw) idleTw.pause();
    const r = el.getBoundingClientRect(), dir = r.left + r.width / 2 < cx ? -1 : 1;
    hoverTw = R[mode].hover[k](ch, dir);
  }
  function onDown(e) {
    if (!on || e.pointerType !== 'mouse') return;
    nail.classList.add('is-down'); // the nail head sets on press (precise, no lag)
    if (rmQ.matches) return;
    const k = kindOf(e.target); if (!k) return;
    const r = k[1].getBoundingClientRect(), dir = r.left + r.width / 2 < cx ? -1 : 1;
    R[mode].press[k[0]](ch, dir, fx);
  }
  function solo() {
    const list = R[mode].solo; soloTw = list[Math.floor(Math.random() * list.length)](ch, fx);
  }
  function tick(t) {
    raf = 0;
    if (!on || document.hidden) return;
    const dt = Math.min(1 / 30, (t - last) / 1000 || 1 / 60); last = t;
    // follower lag is quickTo (S1321); tilt from horizontal velocity only, capped at 8 degrees (S1309)
    const k = 1 - Math.pow(1 - 0.12, dt * 60);
    rot += (Math.max(-8, Math.min(8, vx * 0.35)) - rot) * k; vx *= Math.pow(0.82, dt * 60);
    gsap.set(tilt, { rotation: rot });
    // eyes: toward the hovered element's centre, else toward the pointer; else idle glances (S1303 lerp)
    let tx = glance[0], ty = glance[1];
    const ox = cx + 23, oy = cy + 30;
    let gx = px, gy = py;
    if (hoverEl) { const r = hoverEl.getBoundingClientRect(); gx = r.left + r.width / 2; gy = r.top + r.height / 2; }
    if (t - lastMove < 1800 || hoverEl) { const dx = gx - ox, dy = gy - oy, d = Math.hypot(dx, dy) || 1; tx = (dx / d) * Math.min(1, d / 120) * 2.6; ty = (dy / d) * Math.min(1, d / 120) * 2.2; }
    look.x += (tx - look.x) * k; look.y += (ty - look.y) * k;
    if (hoverKind !== 'heading' || mode !== 'house') gsap.set(ch.querySelectorAll('.p'), { x: look.x, y: look.y });
    if (!rmQ.matches) {
      if (t > blinkAt) { blinkAt = t + 2600 + Math.random() * 4500; gsap.timeline().to(ch.querySelectorAll('.lid'), { scaleY: 1, duration: 0.06, ease: 'none' }).to(ch.querySelectorAll('.lid'), { scaleY: 0, duration: 0.08, ease: 'none' }, '+=0.05'); }
      if (t > glanceAt) { glanceAt = t + 4300 + Math.random() * 2800; glance = Math.random() < 0.35 ? [0, 0] : [(Math.random() * 2 - 1) * 2.6, (Math.random() * 2 - 1) * 2]; }
      if (!hoverEl && t - lastMove > 6000 && t > soloAt) { soloAt = t + 9000 + Math.random() * 7100; solo(); }
    }
    if (t - lastMove < 12000 || hoverEl) raf = requestAnimationFrame(tick); // sleeps after 12 s of stillness; wakes on move
    else if (idleTw) idleTw.pause();
  }
  const wake = () => { if (!raf && on) { last = performance.now(); raf = requestAnimationFrame(tick); if (idleTw && !hoverKind) idleTw.resume(); } };
  function onMove(e) {
    if (e.pointerType && e.pointerType !== 'mouse') return;
    vx += (e.clientX - px) * 0.5 * (px < -100 ? 0 : 1); px = e.clientX; py = e.clientY; lastMove = performance.now();
    if (!on) return;
    nail.style.transform = `translate3d(${px - 6}px,${py - 6}px,0)`; // the hotspot: exactly on the pointer, no lag
    if (!html.classList.contains('cmp-live')) html.classList.add('cmp-live');
    html.classList.toggle('cmp-text', !!(e.target.closest && e.target.closest(TEXT)));
    // keep it on screen: flip to the other side of the pointer near the right / bottom edges
    const ox = px > innerWidth - 80 ? -68 : 22, oy = py > innerHeight - 80 ? -68 : 22;
    cx = px + ox; cy = py + oy;
    if (rmQ.matches) gsap.set(pos, { x: cx, y: cy }); else { qx(cx); qy(cy); }
    gsap.to(root, { autoAlpha: 1, duration: 0.15, overwrite: 'auto' });
    const k = kindOf(e.target); setHover(k ? k[0] : null, k ? k[1] : null);
    const sec = e.target.closest ? e.target.closest('[data-section]') : null; setMood(sec ? sec.dataset.section : '', sec);
    wake();
  }
  function apply(v) {
    mode = v; html.dataset.companion = v;
    const can = fineQ.matches && v !== 'off';
    if (pick) { const i = pick.querySelector(`input[value="${v}"]`); if (i) i.checked = true; }
    if (!can) { if (on) { on = false; html.classList.remove('cmp-on', 'cmp-live', 'cmp-text'); setHover(null, null); if (idleTw) idleTw.kill(); idleTw = null; gsap.set(root, { autoAlpha: 0 }); } return; }
    if (!mounted) { mounted = true; qx = gsap.quickTo(pos, 'x', { duration: 0.35, ease: 'power3.out' }); qy = gsap.quickTo(pos, 'y', { duration: 0.35, ease: 'power3.out' }); }
    build(v); on = true; html.classList.add('cmp-on'); hoverKind = null; hoverEl = null;
    gsap.set(root, { autoAlpha: px < -100 ? 0 : 1 }); if (px > -100) { gsap.set(pos, { x: cx, y: cy }); }
    const m = mood; mood = '__'; setMood('', { dataset: { mood: m } });
    wake();
  }
  // switcher (radio group) + key H cycles House > Hammer > Drop > Off
  const ORDER = ['house', 'hammer', 'drop', 'off'];
  const choose = v => { const s = store.get(); s.companion = v; store.set(s); apply(v); };
  if (pick) pick.addEventListener('change', e => choose(e.target.value));
  addEventListener('keydown', e => {
    if (e.metaKey || e.ctrlKey || e.altKey || (e.target.closest && e.target.closest('input,textarea,select,[contenteditable]'))) return;
    if (e.key === 'h' || e.key === 'H') { if (!fineQ.matches) return; const n = ORDER[(ORDER.indexOf(mode) + 1) % ORDER.length]; choose(n); const a = document.getElementById('announce'); if (a) { a.textContent = ''; requestAnimationFrame(() => { a.textContent = `Pointer helper: ${n === 'off' ? 'off' : VARIANTS[n].name}`; }); } }
  });
  addEventListener('pointermove', onMove, { passive: true });
  addEventListener('pointerdown', onDown, { passive: true });
  addEventListener('pointerup', () => nail.classList.remove('is-down'), { passive: true });
  addEventListener('scroll', () => { if (!on || px < -100) return; const el = document.elementFromPoint(px, py); const k = kindOf(el); setHover(k ? k[0] : null, k ? k[1] : null); }, { passive: true });
  document.addEventListener('pointerleave', () => { html.classList.remove('cmp-live'); gsap.to(root, { autoAlpha: 0, duration: 0.15 }); setHover(null, null); });
  addEventListener('blur', () => gsap.to(root, { autoAlpha: 0, duration: 0.15 }));
  document.addEventListener('visibilitychange', () => { if (document.hidden) { if (idleTw) idleTw.pause(); } else wake(); });
  document.addEventListener('versionswap', () => setHover(null, null));
  fineQ.addEventListener('change', () => apply(want()));
  rmQ.addEventListener('change', () => apply(want()));
  if (pick) pick.querySelectorAll('[data-thumb]').forEach(t => { t.innerHTML = VARIANTS[t.dataset.thumb].svg; });
  gsap.set(root, { autoAlpha: 0 });
  apply(want());
}
