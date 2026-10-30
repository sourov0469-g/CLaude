/* Austin Pro homepage v4: page-wide SVG systems (PLAN-HOME-V4.md §2).
   Companion: [BANK] small follower with the system cursor kept usable (standing rule); P10 attribute-state routing; S0489 idle
   life (blink 110/40/190 ms every 3-4 s, glance 500 ms + hold >= 1 s, follow-through by delay 110 ms at 0.45); S0546 tap
   (0.84 in 0.1 s power2.in, 0.22 s power2.out, pivot near the tip); S1303 lerp made frame-rate independent; S0385/S1315/S1319
   one loop that sleeps, dt clamp 1/30, paused when hidden; coprime idle periods (Shruti #395). Three variants: Sash, Gable, Chip.
   Fields: one industry motif per section that answers the cursor and the scroll (§2.2). Dividers: one trade profile per
   boundary (§2.3). Reaction kit: an own hover and a different click for every interactive element (§2.4).
   Everything here is decorative: aria-hidden, pointer-events none, and absent when motion is off. */
(() => {
  'use strict';
  // MASTER DIRECTIVE Rule 3: colours come from the declared CSS tokens, resolved once per name
  const TOK = {}, tok = n => TOK[n] || (TOK[n] = getComputedStyle(document.documentElement).getPropertyValue(n).trim());
  const d = document, root = d.documentElement, G = window.gsap;
  const NS = 'http://www.w3.org/2000/svg';
  const mqFine = matchMedia('(hover: hover) and (pointer: fine)');
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* storage blocked */ } }
  };
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const mix = (a, b, t) => a + (b - a) * t;
  const smooth = t => t * t * (3 - 2 * t);
  let uidN = 0;
  const uid = p => `${p}${++uidN}`;
  // stable hash per entity, never Math.random in the render path (S0385)
  const hash = n => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };
  const API = window.APV4 = { motion: false };
  let hexCache = null;   // the 29 published colours (12 Sherwin-Williams + 17 ColorPlus) from the page data, never invented
  const HEX = () => { if (hexCache) return hexCache; try { const D = JSON.parse(d.getElementById('home-data').textContent); hexCache = D.sw.concat(D.cp).map(c => c[2]); } catch (e) { hexCache = []; } return hexCache; };

  /* ======================================================================================
     ONE LOOP (S0385): every subscriber returns true while it still has work; the loop stops when all settle
     ====================================================================================== */
  const subs = new Set();
  let raf = 0, last = 0, hiddenNow = d.hidden;
  function frame(t) {
    raf = 0; API.frames = (API.frames || 0) + 1;
    const dt = Math.min(1 / 30, last ? (t - last) / 1000 : 1 / 60);
    last = t;
    let more = false;
    subs.forEach(fn => { if (fn(dt, t)) more = true; });
    if (more && !hiddenNow) raf = requestAnimationFrame(frame); else last = 0;
  }
  const wake = () => { if (!raf && !hiddenNow && API.motion) raf = requestAnimationFrame(frame); };
  d.addEventListener('visibilitychange', () => { hiddenNow = d.hidden; if (!hiddenNow) wake(); });

  /* pointer, shared by the companion and the fields */
  const P = { x: -999, y: -999, vx: 0, vy: 0, t: 0, in: false, moved: 0 };
  function onMove(e) {
    if (e.pointerType && e.pointerType !== 'mouse') return;
    const now = performance.now(), dtm = Math.max(8, now - (P.t || now - 16));
    P.vx = mix(P.vx, (e.clientX - P.x) / dtm * 16, 0.5); P.vy = mix(P.vy, (e.clientY - P.y) / dtm * 16, 0.5);
    if (!P.in) { P.vx = P.vy = 0; }
    P.x = e.clientX; P.y = e.clientY; P.t = now; P.in = true; P.moved = now;
    FIELDS.forEach(f => f.onPointer && f.onPointer());
    Pal.move(e);
    Halo.move(e);
    wake();
  }

  /* ======================================================================================
     COMPANION (§2.1): three variants, one engine
     ====================================================================================== */
  const INK = 'var(--pal-ink)', PAPER = 'var(--pal-paper)';
  const VARIANTS = {
    sash: {
      name: 'Sash',
      svg: `<g class="pb">
  <rect class="pk pp" x="8" y="4" width="32" height="40" rx="2.5"/>
  <rect class="pdark" data-mo x="11.5" y="40.5" width="25" height="0"/>
  <g data-ls><rect class="pglass" x="11.5" y="25" width="25" height="15.5"/><rect class="pk pn" x="11.5" y="25" width="25" height="15.5"/><line class="pk" x1="21" y1="38" x2="27" y2="38"/></g>
  <g data-head>
    <rect class="pglass" x="11.5" y="7.5" width="25" height="16"/>
    <g data-eye="0" data-r="3.2"><circle class="pinkf" cx="17.75" cy="15.5" r="2.5"/><circle class="pglint" cx="18.6" cy="14.6" r=".85"/></g>
    <g data-eye="1" data-r="3.2"><circle class="pinkf" cx="30.25" cy="15.5" r="2.5"/><circle class="pglint" cx="31.1" cy="14.6" r=".85"/></g>
    <rect class="plid" data-lid x="11.5" y="7.5" width="25" height="16"/>
    <line class="pk" x1="24" y1="7.5" x2="24" y2="23.5"/>
    <rect class="pk pn" x="11.5" y="7.5" width="25" height="16"/>
    <path class="psheen" data-sheen d="M11.5 18 L20 7.5 L23 7.5 L11.5 21.8Z"/>
  </g>
  <rect class="prail" x="10" y="23.4" width="28" height="2.2" rx=".6"/>
  <g data-br class="pbr"><path d="M3 9V3h6M45 9V3h-6M3 39v6h6M45 39v6h-6"/></g>
  <line class="pk psill" x1="4.5" y1="44.6" x2="43.5" y2="44.6"/>
</g>`
    },
    gable: {
      name: 'Gable',
      svg: `<g class="pb">
  <rect class="pk pp" x="10" y="20" width="28" height="23"/>
  <g class="plap"><line x1="10" y1="25" x2="38" y2="25"/><line x1="10" y1="30" x2="38" y2="30"/><line x1="10" y1="35" x2="38" y2="35"/><line x1="10" y1="40" x2="38" y2="40"/></g>
  <rect class="pdark" x="21" y="32" width="6.5" height="11"/>
  <rect class="pred" data-door x="21" y="32" width="6.5" height="11"/>
  <g data-head>
    <g data-wins>
      <rect class="pglass" x="13" y="22.5" width="8" height="7"/><rect class="pglass" x="27" y="22.5" width="8" height="7"/>
      <g data-eye="0" data-r="2"><circle class="pinkf" cx="17" cy="26" r="1.9"/></g>
      <g data-eye="1" data-r="2"><circle class="pinkf" cx="31" cy="26" r="1.9"/></g>
      <rect class="plid" data-lid x="13" y="22.5" width="8" height="7"/><rect class="plid" data-lid x="27" y="22.5" width="8" height="7"/>
      <rect class="pk pn" x="13" y="22.5" width="8" height="7"/><rect class="pk pn" x="27" y="22.5" width="8" height="7"/>
    </g>
  </g>
  <g data-roof><rect class="pk pinkf" x="30" y="8.5" width="4.5" height="8"/><path class="pk pinkf" d="M5.5 21.5 24 6.5 42.5 21.5Z"/></g>
  <line class="pk psill" x1="5" y1="43.6" x2="43" y2="43.6"/>
</g>`
    },
    chip: {
      name: 'Chip',
      svg: `<g class="pb">
  <g data-back="0"><rect class="pk" x="16" y="5" width="16" height="34" rx="1.6" style="fill:var(--accent-dd)"/></g>
  <g data-back="1"><rect class="pk" x="16" y="5" width="16" height="34" rx="1.6" style="fill:var(--accent-d)"/></g>
  <g data-front>
    <rect class="pk" x="15" y="4" width="18" height="36" rx="1.8" style="fill:var(--paper)"/>
    <rect data-mid x="15.8" y="16.5" width="16.4" height="11" style="fill:var(--accent-300)"/>
    <rect x="15.8" y="28" width="16.4" height="11.2" style="fill:var(--ink)"/>
    <rect class="pk pn" x="15" y="4" width="18" height="36" rx="1.8"/>
    <g data-head>
      <g data-eye="0" data-r="1.6"><circle class="pinkf" cx="21" cy="10.5" r="1.9"/></g>
      <g data-eye="1" data-r="1.6"><circle class="pinkf" cx="27" cy="10.5" r="1.9"/></g>
      <rect class="plid" data-lid x="15.8" y="4.8" width="16.4" height="11.4" style="fill:var(--paper)"/>
    </g>
    <rect class="pred" data-stripe x="15" y="41.5" width="18" height="2" rx="1"/>
  </g>
  <circle class="pk" cx="24" cy="36.4" r="1.5" style="fill:var(--paper)"/>
</g>`
    }
  };
  const PAL_ORDER = ['sash', 'gable', 'chip', 'off'];

  const Pal = (() => {
    let el = null, svg = null, kind = 'off', on = false, parts = {};
    const S = { x: 0, y: 0, vx: 0, vy: 0, ox: 24, oy: 22, lean: 0, hx: [], state: 'idle', target: null, shown: false, gx: 0, gy: 0, sleep: false, read: 0 };
    let timers = [];
    function build() {
      el = d.createElement('div');
      el.className = 'pal';
      el.setAttribute('aria-hidden', 'true');
      el.innerHTML = `<svg viewBox="0 0 48 48" width="48" height="48" focusable="false"></svg>`;
      svg = el.firstChild;
      d.body.appendChild(el);
    }
    function draw() {
      if (!el) build();
      svg.innerHTML = VARIANTS[kind].svg;
      const q = s => svg.querySelector(s), qa = s => Array.from(svg.querySelectorAll(s));
      parts = { body: q('.pb'), head: q('[data-head]'), eyes: qa('[data-eye]'), lids: qa('[data-lid]'), mo: q('[data-mo]'), ls: q('[data-ls]'),
        sheen: q('[data-sheen]'), br: q('[data-br]'), door: q('[data-door]'), roof: q('[data-roof]'), wins: q('[data-wins]'), lap: qa('.plap line'),
        back: qa('[data-back]'), front: q('[data-front]'), mid: q('[data-mid]'), stripe: q('[data-stripe]') };
      parts.eyes.forEach(g => { g._r = +g.dataset.r; g._x = 0; g._y = 0; });
      el.dataset.kind = kind;
      rest(true);
    }
    /* named pose presets: every part retargets together (Andrew Reff #381 state machine) */
    const T = (t, v, dur = 0.24, ease = 'power3.out') => t && G.to(t, Object.assign({ duration: dur, ease, overwrite: 'auto' }, v));
    function rest(instant) {
      const k = instant ? 0.001 : 0.24;
      T(parts.body, { scale: 1, scaleX: 1, scaleY: 1, rotation: 0, transformOrigin: '50% 100%' }, k);
      T(parts.lids, { scaleY: 0, transformOrigin: '50% 0%' }, k);
      if (kind === 'sash') { T(parts.ls, { y: 0 }, k); T(parts.mo, { attr: { y: 40.5, height: 0 } }, k); T(parts.br, { opacity: 0, scale: 1.3, transformOrigin: '50% 50%' }, k); T(parts.sheen, { opacity: 0, x: 0 }, k); }
      if (kind === 'gable') { T(parts.door, { scaleX: 1, transformOrigin: '0% 50%' }, k); T(parts.roof, { rotation: 0, scaleY: 1, y: 0, transformOrigin: '50% 100%' }, k); T(parts.wins, { scale: 1, transformOrigin: '50% 50%' }, k); }
      if (kind === 'chip') { T(parts.back[0], { rotation: -9, svgOrigin: '24 36.4' }, k); T(parts.back[1], { rotation: 9, svgOrigin: '24 36.4' }, k); T(parts.front, { rotation: 0, scaleX: 1, svgOrigin: '24 36.4' }, k); T(parts.mid, { fill: tok('--accent-300') }, k); T(parts.stripe, { x: -22, opacity: 0 }, k); }
    }
    function pose(name, tgt) {
      rest();
      const dir = tgt ? Math.sign(tgt.left + tgt.width / 2 - S.x - 24) || 1 : 1;
      if (name === 'cta') {   // D.1: "looks at the booking": lower pane up 3 px, lids to 0.42, 140 ms ease-out (sash); the others lean in
        if (kind === 'sash') { T(parts.ls, { y: -3 }, 0.14, 'power2.out'); T(parts.lids, { scaleY: 0.42 }, 0.14, 'power2.out'); }
        if (kind === 'gable') { T(parts.wins, { scale: 1.12 }, 0.14, 'power2.out'); T(parts.lids, { scaleY: 0.42 }, 0.14, 'power2.out'); }
        if (kind === 'chip') { T(parts.mid, { fill: tok('--accent') }, 0.14, 'power2.out'); T(parts.lids, { scaleY: 0.42 }, 0.14, 'power2.out'); }
      } else if (name === 'button') {
        if (kind === 'sash') { T(parts.ls, { y: -7 }, 0.26); T(parts.mo, { attr: { y: 33.5, height: 7 } }, 0.26); T(parts.sheen, { opacity: 1, x: 14, duration: 0.65, ease: 'power2.inOut' }); }
        if (kind === 'gable') T(parts.door, { scaleX: 0.16 }, 0.3, 'back.out(1.5)');
        if (kind === 'chip') { T(parts.mid, { fill: tok('--accent') }, 0.22); T(parts.front, { rotation: 8 * dir }, 0.3, 'back.out(1.5)'); }
      } else if (name === 'link') {
        if (kind === 'sash') T(parts.lids, { scaleY: 0.42 }, 0.2);
        if (kind === 'gable') T(parts.roof, { rotation: -12 * dir, transformOrigin: dir > 0 ? '100% 100%' : '0% 100%' }, 0.3, 'back.out(1.6)');
        if (kind === 'chip') T(parts.stripe, { x: 0, opacity: 1 }, 0.25);
      } else if (name === 'image') {
        if (kind === 'sash') T(parts.br, { opacity: 1, scale: 1 }, 0.28, 'back.out(1.6)');
        if (kind === 'gable') T(parts.wins, { scale: 1.22 }, 0.28, 'back.out(1.6)');
        if (kind === 'chip') { T(parts.back[0], { rotation: -26 }, 0.3, 'back.out(1.4)'); T(parts.back[1], { rotation: 26 }, 0.3, 'back.out(1.4)'); }
      } else if (name === 'heading') {
        if (kind === 'gable') { T(parts.body, { rotation: 6 * dir }, 0.3); T(parts.lids, { scaleY: 0.32 }, 0.2); }
        if (kind === 'chip') T(parts.front, { rotation: 10 * dir }, 0.3);
        if (kind === 'sash') T(parts.lids, { scaleY: 0.18 }, 0.2);
        S.read = performance.now();
      } else if (name === 'card') {
        if (kind === 'sash') T(parts.body, { scale: 1.08 }, 0.3, 'back.out(1.5)');
        if (kind === 'gable') parts.lap.forEach((l, i) => G.fromTo(l, { x: 0 }, { x: i % 2 ? 1.6 : -1.6, duration: 0.14, delay: i * 0.04, yoyo: true, repeat: 1, ease: 'sine.inOut', overwrite: 'auto' }));
        if (kind === 'chip') G.timeline().to(parts.front, { scaleX: 0, duration: 0.12, ease: 'power2.in' }).set(parts.mid, { fill: tok('--accent-300') }).to(parts.front, { scaleX: 1, duration: 0.18, ease: 'power2.out' });
      } else if (name === 'drag') {
        T(parts.body, { scaleY: 0.9, scaleX: 1.07 }, 0.2);
        if (kind === 'gable') T(parts.roof, { scaleY: 0.72 }, 0.2);
        if (kind === 'chip') { T(parts.back[0], { rotation: -2 }, 0.2); T(parts.back[1], { rotation: 2 }, 0.2); }
      } else if (name === 'sleep') {
        T(parts.lids, { scaleY: 1 }, 0.5, 'power2.inOut');
        if (kind === 'chip') { T(parts.back[0], { rotation: -3 }, 0.6); T(parts.back[1], { rotation: 3 }, 0.6); }
      }
    }
    function blink() {
      if (!on || S.sleep || !S.shown || !parts.lids.length) return;
      const base = (S.state === 'link' && kind === 'sash') || S.state === 'cta' ? 0.42 : S.state === 'heading' ? 0.25 : 0;
      G.timeline({ overwrite: 'auto' }).to(parts.lids, { scaleY: 1, duration: 0.11, ease: 'power2.in', transformOrigin: '50% 0%' })
        .to(parts.lids, { scaleY: base, duration: 0.19, ease: 'power2.out' }, '+=0.04');
    }
    function roll() {   // the eye roll: pupils circle once (S0489 glance family, slowed for the tic)
      if (!on || S.sleep || S.state !== 'idle') return;
      const o = { a: 0 };
      G.to(o, { a: Math.PI * 2, duration: 0.9, ease: 'power2.inOut', onUpdate: () => { S.rollA = o.a; wake(); }, onComplete: () => { S.rollA = null; } });
    }
    function tic() {     // each variant's own small action, never layout wobble (S0544)
      if (!on || S.sleep || S.state !== 'idle') return;
      if (kind === 'sash') G.timeline().to(parts.ls, { y: -3, duration: 0.35, ease: 'power2.out' }).to(parts.ls, { y: 0, duration: 0.5, ease: 'power2.inOut' });
      if (kind === 'gable') G.timeline().to(parts.roof, { rotation: -4, transformOrigin: '50% 100%', duration: 0.3, ease: 'power2.out' }).to(parts.roof, { rotation: 0, duration: 0.45, ease: 'back.out(1.4)' });
      if (kind === 'chip') G.timeline().to(parts.back[0], { rotation: -21, duration: 0.3, ease: 'power2.out' }, 0).to(parts.back[1], { rotation: 21, duration: 0.3, ease: 'power2.out' }, 0)
        .to(parts.back[0], { rotation: -9, duration: 0.45, ease: 'power2.inOut' }, 0.5).to(parts.back[1], { rotation: 9, duration: 0.45, ease: 'power2.inOut' }, 0.5);
    }
    function glance() {   // look at the nearest heading in view for >= 1 s, then back (S0489)
      if (!on || S.sleep || S.state !== 'idle') return;
      const hs = Array.from(d.querySelectorAll('.stage .h2x, .stage .display, .stage h2')).map(h => h.getBoundingClientRect()).filter(r => r.bottom > 0 && r.top < innerHeight);
      if (!hs.length) return;
      const r = hs[0];
      S.look = { x: r.left + r.width * 0.3, y: r.top + r.height / 2, until: performance.now() + 1300 };
      wake();
    }
    /* coprime periods so the idle never visibly repeats */
    function schedule() {
      clear();
      if (!on) return;
      let n = 0;
      const every = (fn, base, spread) => { const go = () => { fn(); timers.push(setTimeout(go, base + hash(++n + base) * spread)); }; timers.push(setTimeout(go, base * 0.6 + hash(base) * spread)); };
      every(blink, 3000, 1000);
      every(glance, 7300, 900);
      every(tic, 11900, 1300);
      every(roll, 17100, 1500);
    }
    function clear() { timers.forEach(clearTimeout); timers = []; clearTimeout(napT); }

    const sel = {
      cta: '[data-cur="hero"], .btn-red',   // Audit pack D.1: the money buttons get the companion's first pose
      drag: '[role="slider"], .cmp-handle, [data-cur="drag"], .tape-strip',
      card: '[role="radio"], [role="option"], [role="tab"], .h2p, .ix-row, .mx-row, .sw, .cmp-sw, .cb-t, .cr-n, .dv-chip, .pay-t, .dt, .lg-b, .bp-step, .fs, .sp-toggle, [data-card]',
      button: '.btn, button, [role="button"], input[type="submit"]',
      link: 'a[href]',
      image: 'img, figure, picture, canvas, .map-svg',
      heading: 'h1, h2, h3, .display, .h2x'
    };
    function classify(t) {
      if (!t || !t.closest) return [null, 'idle'];
      for (const k of ['cta', 'drag', 'card', 'button', 'link', 'image', 'heading']) { const x = t.closest(sel[k]); if (x && !x.closest('.pal-sw, .picks')) return [x, k]; }
      return [null, 'idle'];
    }
    let lastSec = null, napT = 0;
    const nap = () => { if (on && S.shown && S.state !== 'drag' && !S.sleep) { S.sleep = true; pose('sleep'); } else if (on) napT = setTimeout(nap, 3000); };
    function move(e) {
      if (!on) return;
      clearTimeout(napT); napT = setTimeout(nap, 9000);   // asleep after 9 s without a move: shades down
      if (S.sleep) { S.sleep = false; pose(S.state, S.tr); blink(); }
      const [tg, st] = classify(e.target);
      if (tg !== S.target || st !== S.state) {
        S.target = tg; S.state = st;
        S.tr = tg ? tg.getBoundingClientRect() : null;
        pose(st, S.tr);
      }
      const sec = e.target.closest && e.target.closest('.v, .ft');
      if (sec !== lastSec) {
        lastSec = sec;
        const tone = sec ? (sec.dataset.tone || (sec.classList.contains('ft') ? 'night' : 'ground')) : 'ground';
        el.classList.toggle('pal--dark', /night|photo|red/.test(tone));
        el.classList.toggle('pal--red', tone === 'red');
        if (S.shown) { S.x = mix(S.x, P.x + S.ox, 0.6); S.y = mix(S.y, P.y + S.oy, 0.6); }   // S1333: never streak across a section edge
      }
      if (!S.shown) { S.x = P.x + S.ox; S.y = P.y + S.oy; S.vx = S.vy = 0; S.shown = true; el.classList.add('is-on'); }
    }
    function press(e) {
      if (!on || (e.pointerType && e.pointerType !== 'mouse')) { if (e.pointerType === 'touch') hide(); return; }
      G.timeline({ overwrite: 'auto' }).to(svg, { scale: 0.84, duration: 0.1, ease: 'power2.in', transformOrigin: '21% 14%' }).to(svg, { scale: 1, duration: 0.22, ease: 'power2.out' });
    }
    function hide() { if (!el) return; S.shown = false; el.classList.remove('is-on'); }
    function tick(dt, now) {
      if (!on || !S.shown) return false;
      if (S.target) { if (S.target.isConnected) S.tr = S.target.getBoundingClientRect(); else { S.target = S.tr = null; S.state = 'idle'; pose('idle'); } }
      // keep clear of the viewport edge: the offset swings to the other side (S1047 never cover what you point at)
      let wantOx = P.x > innerWidth - 90 ? -72 : 24, wantOy = P.y > innerHeight - 90 ? -70 : 22;
      // over a small target the companion steps aside to the target's edge instead of sitting on it (S0546 drift aside)
      if (S.tr && S.tr.width < 380 && S.tr.height < 220) {
        const right = S.tr.right + 10 - P.x, left = S.tr.left - 58 - P.x;
        wantOx = S.tr.right + 60 < innerWidth ? Math.max(24, right) : Math.min(-72, left);
        wantOy = clamp(wantOy, S.tr.top - 20 - P.y, S.tr.bottom - 20 - P.y);
      }
      const ao = 1 - Math.pow(1 - 0.12, dt * 60);
      S.ox += (wantOx - S.ox) * ao; S.oy += (wantOy - S.oy) * ao;
      const tx = clamp(P.x + S.ox, 2, innerWidth - 50), ty = clamp(P.y + S.oy, 2, innerHeight - 50);
      /* Audit pack D.4: a velocity-preserving spring (stiffness 400, damping 25, mass 1, semi-implicit Euler in 4 ms
         substeps) instead of a lerp that restarts on every turn; S0089 spring-for-interruptible */
      const a = 1 - Math.pow(1 - 0.14, dt * 60);
      const px = S.x, py = S.y;
      for (let t = Math.min(dt, 0.05); t > 1e-6; t -= 0.004) {
        const h = Math.min(0.004, t);
        S.vx += ((tx - S.x) * 400 - S.vx * 25) * h; S.vy += ((ty - S.y) * 400 - S.vy * 25) * h;
        S.x += S.vx * h; S.y += S.vy * h;
      }
      const vx = (S.x - px) / Math.max(dt, 1e-3) / 60;
      // body lean from velocity, head counter-leans 110 ms later at 0.45 (follow-through by delay, S0489)
      const leanT = clamp(vx * 0.9, -8, 8);
      S.lean += (leanT - S.lean) * a;
      S.hx.push([now, S.lean]); while (S.hx.length > 2 && now - S.hx[1][0] > 110) S.hx.shift();
      const headLean = -0.45 * S.hx[0][1];
      el.style.transform = `translate3d(${S.x.toFixed(2)}px, ${S.y.toFixed(2)}px, 0) rotate(${S.lean.toFixed(2)}deg)`;
      if (parts.head) parts.head.setAttribute('transform', `rotate(${headLean.toFixed(2)} 24 24)`);
      // gaze: reaction target > glance > reading sweep > the pointer itself
      let gx = P.x, gy = P.y;
      if (S.look && now < S.look.until) { gx = S.look.x; gy = S.look.y; } else S.look = null;
      if (S.state === 'heading' && S.tr) { const ph = ((now - S.read) / 1400) % 1; gx = S.tr.left + S.tr.width * ph; gy = S.tr.top + S.tr.height * 0.5; }
      const cx = S.x + 24, cy = S.y + 18;
      let ex = gx - cx, ey = gy - cy;
      const m = Math.hypot(ex, ey) || 1;
      ex /= m; ey /= m;
      if (S.rollA != null) { ex = Math.cos(S.rollA - Math.PI / 2); ey = Math.sin(S.rollA - Math.PI / 2); }
      const k = Math.min(1, m / 120);
      parts.eyes.forEach(g => {
        const r = g._r * (S.rollA != null ? 1 : k);
        g._x += (ex * r - g._x) * a * 1.4; g._y += (ey * r * 0.8 - g._y) * a * 1.4;
        g.setAttribute('transform', `translate(${g._x.toFixed(2)} ${g._y.toFixed(2)})`);
      });
      const busy = Math.abs(tx - S.x) > 0.05 || Math.abs(ty - S.y) > 0.05 || Math.abs(S.lean) > 0.02 || S.state === 'heading' || S.look || S.rollA != null;
      return busy || (now - P.moved < 400);
    }
    function set(next) {
      kind = PAL_ORDER.includes(next) ? next : 'sash';
      store.set('ap-pal', kind);
      root.dataset.pal = kind;
      sync();
      d.querySelectorAll('.pal-sw button').forEach(b => { const onb = b.dataset.pal === kind; b.setAttribute('aria-checked', onb); b.tabIndex = onb ? 0 : -1; });
    }
    function sync() {
      const want = API.motion && mqFine.matches && kind !== 'off';
      Halo.sync(want);
      if (want && !on) { on = true; draw(); subs.add(tick); schedule(); root.classList.add('has-pal'); }
      else if (want && on && el.dataset.kind !== kind) { draw(); }
      else if (!want && on) { on = false; clear(); subs.delete(tick); hide(); root.classList.remove('has-pal'); }
    }
    return { move, press, hide, set, sync, get kind() { return kind; }, pose: n => { S.state = n; pose(n); }, blink };
  })();

  /* ======================================================================================
     CURSOR EFFECT (BRIEF-V5 §4): a halo under the companion that changes with each section's ground: lap lines in
     the hero, a seal ring in proof, a dimension cross in services, a split disc in work, an X-ray of studs in built,
     a bloom of the published colours in colour, a survey reticle near you, a warm read in reviews, a coin rim in
     money, a porch light in book. The fields answer the same pointer, so the ground reacts back. Shown only with
     the companion (fine pointer, motion on, a variant picked); never takes pointer events.
     ====================================================================================== */
  const Halo = (() => {
    let el = null, on = false, key = '', x = -999, y = -999;
    const make = () => { el = d.createElement('div'); el.className = 'cfx'; el.setAttribute('aria-hidden', 'true'); d.body.appendChild(el); };
    const tick = dt => {
      if (!on || !el) return false;
      const a = 1 - Math.pow(1 - 0.24, dt * 60);
      x += (P.x - x) * a; y += (P.y - y) * a;
      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      return Math.abs(P.x - x) + Math.abs(P.y - y) > 0.4;
    };
    function move(e) {
      if (!on) return;
      const sec = e.target.closest && e.target.closest('.sec'), k = sec ? sec.dataset.sec : '';
      if (k !== key) {
        key = k; el.dataset.sec = k;
        const v = sec && sec.querySelector('.v');
        el.classList.toggle('is-dark', !!v && /night|photo|red/.test(v.dataset.tone || ''));
      }
      if (!el.classList.contains('is-on') && k) { x = P.x; y = P.y; }
      el.classList.toggle('is-on', !!k && P.in);
    }
    function sync(want) {
      if (want && !on) { if (!el) make(); on = true; subs.add(tick); }
      else if (!want && on) { on = false; subs.delete(tick); if (el) el.classList.remove('is-on'); }
    }
    const hide = () => { if (el) el.classList.remove('is-on'); };
    return { move, sync, hide };
  })();

  /* switcher: "Companion: Sash · Gable · Chip · Off" (radiogroup, persisted, ?pal=) */
  function wireSwitchers() {
    d.querySelectorAll('.pal-sw').forEach(g => {
      g.addEventListener('click', e => { const b = e.target.closest('button[data-pal]'); if (b) Pal.set(b.dataset.pal); });
      g.addEventListener('keydown', e => {
        const i = PAL_ORDER.indexOf(Pal.kind); let n = null;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = (i + 1) % 4; else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = (i + 3) % 4;
        if (n !== null) { e.preventDefault(); Pal.set(PAL_ORDER[n]); const b = g.querySelector(`[data-pal="${PAL_ORDER[n]}"]`); if (b) b.focus(); }
      });
    });
  }

  /* ======================================================================================
     FIELDS (§2.2): one industry motif per section, cursor + scroll, still frame without motion
     ====================================================================================== */
  const FIELDS = new Set();
  const svgEl = (tag, attrs, parent) => { const n = d.createElementNS(NS, tag); for (const k in attrs) n.setAttribute(k, attrs[k]); if (parent) parent.appendChild(n); return n; };

  function makeField(vr, key) {
    const wrap = d.createElement('div');
    wrap.className = `sfx sfx-${key}`;
    wrap.setAttribute('aria-hidden', 'true');
    const svg = svgEl('svg', { focusable: 'false', preserveAspectRatio: 'none' });
    wrap.appendChild(svg);
    const old = vr.querySelector(':scope > .bgf');
    if (old) old.after(wrap); else vr.prepend(wrap);   // above v3's depth figures, under the content
    const F = { key, vr, wrap, svg, w: 0, h: 0, vis: false, lp: { x: -999, y: -999 }, p: 0, built: false, live: API.motion, last: 0, idle: 0 };
    const impl = BUILDERS[key];
    const size = () => {
      const r = vr.getBoundingClientRect();
      const w = Math.round(r.width), h = Math.round(r.height);
      if (!w || !h || (w === F.w && Math.abs(h - F.h) < 2 && F.built)) return;
      F.w = w; F.h = h;
      svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
      svg.textContent = '';
      impl.build(F);
      F.built = true;
      F.scroll();
      if (impl.still) impl.still(F);
    };
    F.scroll = () => {
      const r = vr.getBoundingClientRect();
      F.p = clamp((innerHeight - r.top) / (innerHeight + r.height), 0, 1);
      F.rect = r;
    };
    F.onPointer = () => { F.want = true; };
    F.tick = (dt, now) => {
      if (!F.vis || !F.built) return false;
      if (now - F.last < 33) return F.busy;        // ambient work capped at 30 fps; a skipped frame keeps the last verdict
      const fdt = Math.min(1 / 30, (now - (F.last || now - 33)) / 1000);
      F.last = now;
      F.scroll();
      const r = F.rect;
      const inside = mqFine.matches && P.in && P.x >= r.left && P.x <= r.right && P.y >= r.top && P.y <= r.bottom;
      F.lp.x = inside ? P.x - r.left : -999; F.lp.y = inside ? P.y - r.top : -999;
      F.busy = impl.tick(F, fdt, now, inside) !== false;
      return F.busy;
    };
    const ro = window.ResizeObserver ? new ResizeObserver(() => { size(); wake(); }) : null;
    if (ro) ro.observe(vr);
    const io = new IntersectionObserver(es => es.forEach(en => { F.vis = en.isIntersecting; if (F.vis) { if (!F.built) size(); wake(); } }), { rootMargin: '80px 0px' });
    io.observe(vr);
    const onScroll = () => { if (F.vis) wake(); };
    addEventListener('scroll', onScroll, { passive: true });
    size();
    if (API.motion) { subs.add(F.tick); FIELDS.add(F); }
    return () => { io.disconnect(); if (ro) ro.disconnect(); removeEventListener('scroll', onScroll); subs.delete(F.tick); FIELDS.delete(F); wrap.remove(); };
  }

  const BUILDERS = {
    /* Hero: lap-course shadow lines lift as wavefronts expand from the cursor path; ghost waves when idle (Q138) */
    hero: {
      build(F) {
        const gap = clamp(F.w / 42, 26, 40), n = Math.ceil(F.h / gap) + 1, step = 36;
        F.lines = [];
        F.waves = [];
        const g = svgEl('g', { class: 'f-lines' }, F.svg);
        for (let i = 0; i < n; i++) {
          const y = i * gap + gap * 0.6;
          const sh = svgEl('polyline', { class: 'f-shadow' }, g), ln = svgEl('polyline', { class: 'f-line' }, g);
          const pts = []; for (let x = -step; x <= F.w + step * 2; x += step) pts.push(x);
          F.lines.push({ y, sh, ln, pts, dir: i % 2 ? 1 : -1, off: new Float32Array(pts.length) });
        }
        F.trail = { x: -999, y: -999 };
      },
      still(F) { F.lines.forEach(L => this.write(F, L, 0)); },
      write(F, L, shift) {
        const s = shift * L.dir;
        let a = '', b = '';
        for (let i = 0; i < L.pts.length; i++) {
          const x = (L.pts[i] + s).toFixed(1), o = L.off[i];
          a += `${x},${(L.y - o).toFixed(1)} `; b += `${x},${(L.y + 3 - o * 0.4).toFixed(1)} `;
        }
        L.ln.setAttribute('points', a); L.sh.setAttribute('points', b);
      },
      tick(F, dt, now, inside) {
        const lp = F.lp;
        if (inside && Math.hypot(lp.x - F.trail.x, lp.y - F.trail.y) > 26) {
          const sp = clamp(Math.hypot(P.vx, P.vy) / 14, 0.25, 1);
          F.waves.push({ x: lp.x, y: lp.y, t: now, s: sp }); F.trail.x = lp.x; F.trail.y = lp.y;
          if (F.waves.length > 14) F.waves.shift();
        }
        // V6 (F17): no idle ghost waves; the courses move only for the cursor and the scroll, then the field sleeps
        F.waves = F.waves.filter(w => now - w.t < 2600);
        const shift = (F.p - 0.5) * 70, moved = Math.abs(shift - (F.lastShift ?? NaN)) > 0.1 || F.lastShift === undefined;
        F.lastShift = shift;
        if (!F.waves.length && !moved && !F.dirty) return false;
        F.dirty = F.waves.length > 0;
        F.lines.forEach(L => {
          for (let i = 0; i < L.pts.length; i++) {
            const x = L.pts[i] + shift * L.dir;
            let o = 0;
            for (const w of F.waves) {
              const age = (now - w.t) / 1000, r = age * 420, dd = Math.hypot(x - w.x, L.y - w.y) - r;
              o += w.s * Math.exp(-(dd * dd) / (2 * 34 * 34)) * Math.exp(-age / 0.9) / (1 + Math.hypot(x - w.x, L.y - w.y) * 0.004);
            }
            L.off[i] = Math.min(9, o * 9);
          }
          this.write(F, L, shift);
        });
        return F.waves.length > 0;
      }
    },
    /* Proof: a big double-hung window grid with a glass sheen that follows the cursor (372 Glare: -45 deg, screen) */
    proof: {
      build(F) {
        const id = uid('pg');
        F.svg.innerHTML = `<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".42" stop-color="#fff" stop-opacity=".0"/><stop offset=".5" stop-color="#fff" stop-opacity=".55"/><stop offset=".58" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>`;
        const cols = F.w > 900 ? 4 : 2, rows = 2, m = 18, gw = (F.w - m * 2) / cols, gh = (F.h - m * 2) / rows;
        const g = svgEl('g', { class: 'f-mun' }, F.svg);
        for (let c = 0; c <= cols; c++) svgEl('line', { x1: m + c * gw, y1: m, x2: m + c * gw, y2: F.h - m }, g);
        for (let r = 0; r <= rows; r++) svgEl('line', { x1: m, y1: m + r * gh, x2: F.w - m, y2: m + r * gh, class: r === 1 ? 'rail' : '' }, g);
        F.sheen = svgEl('rect', { x: -F.w, y: -F.h, width: F.w * 3, height: F.h * 3, fill: `url(#${id})`, class: 'f-sheen' }, F.svg);
        F.sx = 0.5; F.sa = -45;
      },
      still(F) { this.place(F, 0.3, -45); },
      place(F, x, a) { F.sheen.setAttribute('transform', `translate(${((x - 0.5) * F.w * 1.4).toFixed(1)} 0) rotate(${a.toFixed(1)} ${F.w / 2} ${F.h / 2})`); },
      tick(F, dt, now, inside) {
        const tx = inside ? F.lp.x / F.w : F.p, ta = inside ? -45 + (F.lp.y / F.h - 0.5) * 24 : -45;
        const a = 1 - Math.pow(1 - 0.08, dt * 60);
        F.sx += (tx - F.sx) * a; F.sa += (ta - F.sa) * a;
        this.place(F, F.sx, F.sa);
        return Math.abs(tx - F.sx) > 0.001 || Math.abs(ta - F.sa) > 0.05;
      }
    },
    /* Services: dashed blueprint elevations turn solid around the cursor (S1335 scan-then-solid) */
    services: {
      build(F) {
        const id = uid('sm'), gid = uid('sg');
        const houses = [];
        const base = F.h * 0.92, unit = clamp(F.w / 9, 90, 180);
        const shapes = [
          (x, u) => `M${x} ${base}V${base - u * .9}H${x + u * 1.6}V${base}M${x - u * .1} ${base - u * .9}L${x + u * .8} ${base - u * 1.55}L${x + u * 1.7} ${base - u * .9}M${x + u * .3} ${base - u * .65}h${u * .35}v${u * .32}h${-u * .35}zM${x + u * .95} ${base - u * .65}h${u * .35}v${u * .32}h${-u * .35}zM${x + u * .68} ${base}v${-u * .5}h${u * .26}v${u * .5}`,
          (x, u) => `M${x} ${base}V${base - u * .6}H${x + u * 2.4}V${base}M${x - u * .12} ${base - u * .6}L${x + u * .5} ${base - u * .98}H${x + u * 1.9}L${x + u * 2.52} ${base - u * .6}M${x + u * .25} ${base - u * .42}h${u * .5}v${u * .26}h${-u * .5}zM${x + u * 1.6} ${base - u * .42}h${u * .5}v${u * .26}h${-u * .5}zM${x + u * 1.05} ${base}v${-u * .45}h${u * .3}v${u * .45}`,
          (x, u) => `M${x} ${base}V${base - u * 1.5}H${x + u * 1.3}V${base}M${x - u * .1} ${base - u * 1.5}L${x + u * .65} ${base - u * 2}L${x + u * 1.4} ${base - u * 1.5}M${x} ${base - u * .75}H${x + u * 1.3}M${x + u * .2} ${base - u * 1.3}h${u * .32}v${u * .36}h${-u * .32}zM${x + u * .78} ${base - u * 1.3}h${u * .32}v${u * .36}h${-u * .32}zM${x + u * .2} ${base - u * .55}h${u * .32}v${u * .36}h${-u * .32}zM${x + u * .78} ${base}v${-u * .52}h${u * .3}v${u * .52}`
        ];
        let x = unit * 0.3, i = 0;
        while (x < F.w) { const u = unit * (0.75 + hash(i) * 0.5); houses.push(shapes[i % 3](x, u)); x += u * (i % 3 === 1 ? 2.9 : 2.1) + unit * 0.25; i++; }
        const dpath = houses.join('');
        F.svg.innerHTML = `<defs><radialGradient id="${gid}"><stop offset="0" stop-color="#fff"/><stop offset=".6" stop-color="#fff" stop-opacity=".6"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
<mask id="${id}" maskUnits="userSpaceOnUse" x="0" y="0" width="${F.w}" height="${F.h}"><circle class="f-lens" r="0" cx="-999" cy="-999" fill="url(#${gid})"/></mask></defs>
<g class="f-bp"><path class="f-dash" d="${dpath}"/><path class="f-solid" d="${dpath}" mask="url(#${id})"/></g>`;
        F.lens = F.svg.querySelector('.f-lens'); F.bp = F.svg.querySelector('.f-bp');
        F.lx = -999; F.ly = -999; F.lr = 0;
      },
      still(F) { F.bp.setAttribute('transform', 'translate(0 0)'); },
      tick(F, dt, now, inside) {
        const a = 1 - Math.pow(1 - 0.16, dt * 60), tr = inside ? 190 : 0;
        if (inside) { if (F.lx < -900) { F.lx = F.lp.x; F.ly = F.lp.y; } F.lx += (F.lp.x - F.lx) * a; F.ly += (F.lp.y - F.ly) * a; }
        F.lr += (tr - F.lr) * a;
        const ty = (F.p - 0.5) * -60;
        F.lens.setAttribute('cx', F.lx.toFixed(1)); F.lens.setAttribute('cy', (F.ly - ty).toFixed(1)); F.lens.setAttribute('r', F.lr.toFixed(1));
        F.bp.setAttribute('transform', `translate(0 ${ty.toFixed(1)})`);
        if (!inside && F.lr < 0.5) { F.lx = -999; }
        return (inside && (Math.abs(F.lp.x - F.lx) > 0.3 || Math.abs(F.lp.y - F.ly) > 0.3)) || Math.abs(tr - F.lr) > 0.5;
      }
    },
    /* Work: the nail schedule on 16 in stud lines; heads lean toward the cursor (P79 field, Q156 roam, lerp 0.07) */
    work: {
      build(F) {
        const sx = clamp(F.w / 22, 48, 72), sy = sx * 1.5;
        const g = svgEl('g', { class: 'f-studs' }, F.svg), ng = svgEl('g', { class: 'f-nails' }, F.svg);
        F.studs = []; F.nails = [];
        for (let x = sx / 2, c = 0; x < F.w; x += sx, c++) {
          const l = svgEl('line', { x1: x, y1: 0, x2: x, y2: F.h, pathLength: 1 }, g);
          F.studs.push(l);
          for (let y = sy * (c % 2 ? 0.5 : 1), r = 0; y < F.h; y += sy, r++) {
            const n = svgEl('circle', { cx: x, cy: y, r: 2.4 }, ng);
            F.nails.push({ n, x, y, ox: 0, oy: 0, k: 0.6 + hash(c * 31 + r) * 0.8 });
          }
        }
      },
      still(F) { F.studs.forEach(l => { l.style.strokeDashoffset = 0; }); },
      tick(F, dt, now, inside) {
        F.studs.forEach((l, i) => { l.style.strokeDashoffset = clamp(1 - (F.p * 1.6 - i / F.studs.length * 0.4), 0, 1).toFixed(3); });
        const a = 1 - Math.pow(1 - 0.07, dt * 60);
        let busy = false;
        for (const N of F.nails) {
          let tx = 0, ty = 0;
          if (inside) {
            const dx = F.lp.x - N.x, dy = F.lp.y - N.y, dist = Math.hypot(dx, dy);
            if (dist < 220) { const f = smooth(1 - dist / 220) * 18 * N.k; tx = dx / (dist || 1) * f; ty = dy / (dist || 1) * f; }
          }
          if (Math.abs(tx - N.ox) > 0.05 || Math.abs(ty - N.oy) > 0.05) {
            N.ox += (tx - N.ox) * a; N.oy += (ty - N.oy) * a; busy = true;
            N.n.setAttribute('transform', `translate(${N.ox.toFixed(1)} ${N.oy.toFixed(1)})`);
            N.n.classList.toggle('is-near', Math.hypot(N.ox, N.oy) > 4);
          }
        }
        return busy;
      }
    },
    /* Built: an X-ray band (7 rem) shows the framing behind the cream (specia1ne reveal slit, lerp 0.12, settles at 680 ms) */
    built: {
      build(F) {
        const id = uid('xr');
        const st = clamp(F.w / 22, 48, 72);
        let studs = '', seams = '', wrap = '';
        for (let x = 0; x < F.w + st; x += st) studs += `M${x} 0V${F.h}M${x + 9} 0V${F.h}`;
        for (let y = 0; y < F.h; y += 380) seams += `M0 ${y}H${F.w}`;
        for (let y = 60; y < F.h; y += 120) wrap += `M0 ${y}H${F.w}`;
        F.svg.innerHTML = `<defs><clipPath id="${id}"><rect class="f-band" x="-200" y="0" width="112" height="${F.h}"/></clipPath></defs>
<g clip-path="url(#${id})"><rect class="f-xbg" width="${F.w}" height="${F.h}"/><path class="f-wrap" d="${wrap}"/><path class="f-studx" d="${studs}"/><path class="f-seam" d="${seams}"/><path class="f-plate" d="M0 6H${F.w}M0 ${F.h - 6}H${F.w}"/></g>
<rect class="f-bandline" x="-200" y="0" width="112" height="${F.h}"/>`;
        F.band = F.svg.querySelector('.f-band'); F.bline = F.svg.querySelector('.f-bandline');
        F.bx = F.w / 2; F.bw = 0;
      },
      still(F) { const mg = clamp(F.w * 0.03, 12, 44); this.place(F, F.w - mg / 2, mg); },
      place(F, x, w) { [F.band, F.bline].forEach(r => { r.setAttribute('x', (x - w / 2).toFixed(1)); r.setAttribute('width', w.toFixed(1)); }); },
      tick(F, dt, now, inside) {
        // V6 (screenshot defect D1): at rest and on touch the X-ray band sits in the right page margin and swells with the
        // scroll; it only crosses the content where the cursor takes it
        const mg = clamp(F.w * 0.03, 12, 44);
        const target = inside ? F.lp.x : F.w - mg / 2;
        const a = 1 - Math.pow(1 - 0.12, dt * 60);
        F.bx += (target - F.bx) * a;
        const tw = inside ? 112 : mg * (0.5 + 0.5 * Math.sin(Math.PI * F.p));
        F.bw += (tw - F.bw) * a;
        this.place(F, F.bx, F.bw);
        if (inside && (F.lp.x !== F.lastX || F.lp.y !== F.lastY)) { F.idle = now; F.lastX = F.lp.x; F.lastY = F.lp.y; }   // settles 680 ms after the pointer stops
        return now - (F.idle || 0) < 680 || Math.abs(target - F.bx) > 0.3 || Math.abs(tw - F.bw) > 0.3;
      }
    },
    /* Colour: published colours as chips scattered on the ground; near the cursor they flip up to show their face (P70) */
    colour: {
      build(F) {
        const pal = HEX();
        // V5: chips live in the side margins only, so they never sit under a heading or a line of copy
        const mg = clamp(F.w * 0.03, 12, 44), sc = 0.55;   // the page margin (--m) and no further
        const n = clamp(Math.round(F.h / 60), 10, 40);
        F.chips = [];
        const g = svgEl('g', { class: 'f-chips' }, F.svg);
        for (let i = 0; i < n; i++) {
          const side = i % 2, u = 6 + hash(i * 3.1) * (mg - 12);
          const x = side ? F.w - u : u, y = hash(i * 7.7 + 1) * (F.h - 40) + 20, rot = (hash(i * 5.3) - 0.5) * 24;
          const c = svgEl('g', { transform: `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rot.toFixed(1)}) scale(${sc})` }, g);
          const inner = svgEl('g', {}, c);
          const face = svgEl('rect', { x: -9, y: -13, width: 18, height: 26, rx: 1.5, class: 'f-chip' }, inner);
          svgEl('circle', { cx: 0, cy: -9, r: 1.6, class: 'f-punch' }, inner);
          F.chips.push({ x, y, inner, face, hex: pal.length ? pal[i % pal.length] : tok('--stone'), k: 0, row: i });
        }
      },
      still(F) { F.chips.forEach((C, i) => { if (i % 7 === 0) this.set(C, 1); }); },
      set(C, k) {
        const s = Math.abs(Math.cos(Math.PI * k));
        C.inner.setAttribute('transform', `scale(1 ${Math.max(0.04, s).toFixed(3)})`);
        const showFace = k > 0.5;
        if (showFace !== C.face._f) { C.face._f = showFace; C.face.style.fill = showFace ? C.hex : ''; C.face.classList.toggle('is-face', showFace); }
      },
      tick(F, dt, now, inside) {
        const a = 1 - Math.pow(1 - 0.16, dt * 60);
        let busy = false;
        const band = (F.p * 1.3) % 1;
        for (const C of F.chips) {
          let t = 0;
          if (inside) { const dist = Math.hypot(F.lp.x - C.x, F.lp.y - C.y); t = dist < 140 ? smooth(1 - dist / 140) : 0; }
          if (!mqFine.matches) t = Math.abs(C.y / F.h - band) < 0.06 ? 1 : 0;   // touch: a scroll band flips one row
          if (Math.abs(t - C.k) > 0.002) { C.k += (t - C.k) * a; this.set(C, C.k); busy = true; }
        }
        return busy;
      }
    },
    /* Near: roof plans on lot lines; lots near the cursor light and draw their ridge (S0425 emblem answers the pointer) */
    near: {
      build(F) {
        const cw = clamp(F.w / 9, 120, 170), chh = cw * 0.72;
        const sid = uid('rp');
        F.svg.innerHTML = `<defs><symbol id="${sid}h" viewBox="0 0 60 40"><rect x="2" y="2" width="56" height="36"/><path d="M2 2 20 20 2 38M58 2 40 20 58 38M20 20H40"/></symbol>
<symbol id="${sid}g" viewBox="0 0 60 40"><rect x="2" y="2" width="56" height="36"/><path d="M2 20H58"/></symbol></defs>`;
        const lots = svgEl('g', { class: 'f-lots' }, F.svg);
        F.lots = [];
        for (let r = 0, y = 0; y < F.h + chh; y += chh, r++) {
          for (let c = 0, x = (r % 2) * cw * 0.5 - cw * 0.5; x < F.w + cw; x += cw, c++) {
            const i = r * 40 + c;
            svgEl('rect', { x: x + 4, y: y + 4, width: cw - 8, height: chh - 8, class: 'f-lot' }, lots);
            const w = cw * (0.42 + hash(i) * 0.18), h = w * 0.66, hx = x + cw / 2 - w / 2, hy = y + chh / 2 - h / 2 + (hash(i + 3) - 0.5) * 10;
            const u = svgEl('use', { href: `#${sid}${hash(i + 9) > 0.45 ? 'h' : 'g'}`, x: hx, y: hy, width: w, height: h, class: 'f-roof' }, lots);
            const ridge = svgEl('line', { x1: hx + w * 0.33, y1: hy + h / 2, x2: hx + w * 0.67, y2: hy + h / 2, pathLength: 1, class: 'f-ridge' }, lots);
            F.lots.push({ x: x + cw / 2, y: y + chh / 2, u, ridge, k: 0 });
          }
        }
        F.g = lots;
      },
      still(F) { F.g.setAttribute('transform', 'translate(0 0)'); },
      tick(F, dt, now, inside) {
        const pan = (F.p - 0.5) * 50;
        F.g.setAttribute('transform', `translate(${pan.toFixed(1)} ${(pan * 0.6).toFixed(1)})`);
        const a = 1 - Math.pow(1 - 0.14, dt * 60);
        let busy = false;
        for (const L of F.lots) {
          let t = 0;
          if (inside) { const dist = Math.hypot(F.lp.x - (L.x + pan), F.lp.y - (L.y + pan * 0.6)); t = dist < 120 ? 1 : dist < 200 ? 1 - (dist - 120) / 80 : 0; }
          if (Math.abs(t - L.k) > 0.003) {
            L.k += (t - L.k) * a; busy = true;
            L.u.style.opacity = (0.08 + L.k * 0.52).toFixed(3);
            L.ridge.style.strokeDashoffset = (1 - L.k).toFixed(3);
          }
        }
        return busy;
      }
    },
    /* Reviews: louvred shutters at both edges; slats open near the cursor and progressively with scroll (Q122 hinge) */
    reviews: {
      build(F) {
        const pw = F.w > 900 ? 92 : 30, gap = 16;
        F.slats = [];
        [0, F.w - pw].forEach((x0, side) => {
          const g = svgEl('g', { class: 'f-shut' }, F.svg);
          svgEl('rect', { x: x0 + 3, y: 10, width: pw - 6, height: F.h - 20, class: 'f-stile' }, g);
          for (let y = 22, i = 0; y < F.h - 22; y += gap, i++) {
            const s = svgEl('rect', { x: x0 + 9, y: y - 5, width: pw - 18, height: 10, class: 'f-slat' }, g);
            F.slats.push({ s, y, side, cy: y, k: 0 });
          }
        });
      },
      still(F) { F.slats.forEach(S => this.set(S, 0.5)); },
      set(S, k) { const h = mix(10, 1.4, k); S.s.setAttribute('y', (S.cy - h / 2).toFixed(2)); S.s.setAttribute('height', h.toFixed(2)); S.s.style.opacity = (0.5 + k * 0.5).toFixed(2); },
      tick(F, dt, now, inside) {
        const a = 1 - Math.pow(1 - 0.12, dt * 60);
        let busy = false;
        for (const S of F.slats) {
          let t = clamp(F.p * 1.5 - 0.2, 0, 1) * 0.55;
          if (inside) { const dy = Math.abs(F.lp.y - S.y), near = S.side ? F.w - F.lp.x : F.lp.x; t = Math.max(t, dy < 120 ? smooth(1 - dy / 120) * clamp(1 - near / (F.w * 0.5), 0.25, 1) : 0); }
          if (Math.abs(t - S.k) > 0.003) { S.k += (t - S.k) * a; this.set(S, S.k); busy = true; }
        }
        return busy;
      }
    },
    /* Money (V5): ledger paper. Ruled rows and a red double margin; rows near the cursor ink in as if a figure were
       being entered, and the ruling drifts a little with the scroll. Replaces the v4 chalk line and tape ticks, which
       were Book 3's and Services 3's tricks. */
    money: {
      build(F) {
        const gap = 30, mx = clamp(F.w * 0.07, 22, 96);
        F.rows = [];
        const g = svgEl('g', { class: 'f-ledger' }, F.svg);
        for (let y = 40, i = 0; y < F.h - 10; y += gap, i++) {
          const ln = svgEl('line', { x1: 0, x2: F.w, y1: y, y2: y, class: 'f-rule' }, g);
          F.rows.push({ ln, y, k: 0 });
        }
        svgEl('path', { d: `M${mx} 0V${F.h}M${mx + 4} 0V${F.h}`, class: 'f-margin' }, F.svg);
        F.g = g;
      },
      still(F) { F.g.setAttribute('transform', 'translate(0 0)'); },
      tick(F, dt, now, inside) {
        F.g.setAttribute('transform', `translate(0 ${((F.p - 0.5) * 12).toFixed(1)})`);
        const a = 1 - Math.pow(1 - 0.16, dt * 60), band = F.p * F.h;
        let busy = false;
        for (const R of F.rows) {
          const yy = inside ? F.lp.y : (mqFine.matches ? -999 : band);
          const t = Math.abs(yy - R.y) < 70 ? smooth(1 - Math.abs(yy - R.y) / 70) : 0;
          if (Math.abs(t - R.k) > 0.003) { R.k += (t - R.k) * a; busy = true; R.ln.style.strokeOpacity = (0.07 + R.k * 0.35).toFixed(3); R.ln.style.strokeWidth = (1 + R.k * 0.8).toFixed(2); }
        }
        return busy;
      }
    },
    /* Book: a six-panel door, large and faint, with a porch-light pool that trails the cursor (S0267, lag 0.3-0.5 s) */
    book: {
      build(F) {
        const id = uid('pl');
        const dw = clamp(F.w * 0.26, 180, 360), dh = Math.min(F.h * 0.86, dw * 2.3), dx = F.w - dw - F.w * 0.06, dy = (F.h - dh) / 2;
        const pw = (dw - 54) / 2, ph = [0.2, 0.34, 0.28].map(k => (dh - 72) * k);
        let panels = '', y = dy + 18;
        ph.forEach(h => { panels += `<rect x="${dx + 18}" y="${y}" width="${pw}" height="${h}"/><rect x="${dx + 36 + pw}" y="${y}" width="${pw}" height="${h}"/>`; y += h + 18; });
        F.svg.innerHTML = `<defs><radialGradient id="${id}"><stop offset="0" style="stop-color:var(--star)" stop-opacity=".34"/><stop offset=".45" style="stop-color:var(--star)" stop-opacity=".1"/><stop offset="1" style="stop-color:var(--star)" stop-opacity="0"/></radialGradient></defs>
<circle class="f-pool" r="${clamp(F.w * 0.22, 160, 320)}" cx="${F.w * 0.7}" cy="${F.h * 0.3}" fill="url(#${id})"/>
<g class="f-door" style="transform-origin:${dx + dw}px ${dy + dh / 2}px"><rect class="f-jamb" x="${dx - 8}" y="${dy - 8}" width="${dw + 16}" height="${dh + 8}"/><rect class="f-leaf" x="${dx}" y="${dy}" width="${dw}" height="${dh}"/>${panels}<circle class="f-knob" cx="${dx + 16}" cy="${dy + dh * 0.53}" r="5"/></g>`;
        F.pool = F.svg.querySelector('.f-pool'); F.door = F.svg.querySelector('.f-door');
        F.px = F.w * 0.7; F.py = F.h * 0.3;
      },
      still(F) { F.door.style.transform = 'perspective(900px) rotateY(4deg)'; },
      tick(F, dt, now, inside) {
        const tx = inside ? F.lp.x : F.w * 0.7, ty = inside ? F.lp.y : F.h * 0.3;
        const a = 1 - Math.pow(1 - 0.06, dt * 60);
        F.px += (tx - F.px) * a; F.py += (ty - F.py) * a;
        F.pool.setAttribute('cx', F.px.toFixed(1)); F.pool.setAttribute('cy', F.py.toFixed(1));
        F.door.style.transform = `perspective(900px) rotateY(${(clamp(F.p * 1.4 - 0.2, 0, 1) * 8).toFixed(2)}deg)`;
        return Math.abs(tx - F.px) > 0.3 || Math.abs(ty - F.py) > 0.3;
      }
    }
  };

  /* ======================================================================================
     DIVIDERS (§2.3): one trade profile per boundary, in the colour of the section above, drawn with the scroll
     ====================================================================================== */
  const DIV = {
    proof(w) {   // lap siding edge: sawtooth of board butts, one course at a time
      const n = 24, tw = w / n; let teeth = '';
      for (let i = 0; i < n; i++) teeth += `<path class="sdv-p sdv-t" d="M${i * tw} 10 L${i * tw} 30 L${(i + 1) * tw} 10Z"/>`;
      return `<rect class="sdv-p" width="${w}" height="11"/>${teeth}<path class="sdv-l" d="M0 10.5H${w}"/>`;
    },
    services(w) { // gable roofline: same five points, pitch morphs low to steep
      return `<path class="sdv-p sdv-gable" d="M0 0H${w}V14L${w / 2} 22L0 14Z" data-to="M0 0H${w}V8L${w / 2} 52L0 8Z"/><path class="sdv-l sdv-ridge" d="M${w / 2 - 28} 22H${w / 2 + 28}"/>`;
    },
    work(w) {     // three-tab shingle row, staggered, tabs drop in
      const tw = 84; let s = '';
      for (let x = -tw / 2, i = 0; x < w; x += tw, i++) s += `<rect class="sdv-p sdv-t" x="${x + 2}" y="0" width="${tw / 3 - 3}" height="${i % 2 ? 34 : 28}"/><rect class="sdv-p sdv-t" x="${x + tw / 3 + 1}" y="0" width="${tw / 3 - 3}" height="${i % 2 ? 30 : 36}"/><rect class="sdv-p sdv-t" x="${x + tw * 2 / 3}" y="0" width="${tw / 3 - 3}" height="${i % 2 ? 36 : 32}"/>`;
      return `<rect class="sdv-p" width="${w}" height="14"/>${s}`;
    },
    built(w) {    // board-and-batten profile: battens rise staggered by 0.02
      let s = '';
      for (let x = 30; x < w; x += 92) s += `<rect class="sdv-p sdv-t" x="${x}" y="0" width="14" height="44"/>`;
      return `<rect class="sdv-p" width="${w}" height="16"/>${s}`;
    },
    colour(w) {   // paint drips off a drip-edge line, lengths grow with the scroll
      let s = '';
      for (let i = 0; i < 18; i++) { const x = hash(i * 9.1) * w, l = 18 + hash(i * 4.4) * 30, r = 4 + hash(i) * 4; s += `<path class="sdv-p sdv-t" d="M${x - r} 10 V${10 + l} a${r} ${r} 0 0 0 ${r * 2} 0 V10Z"/>`; }
      return `<rect class="sdv-p" width="${w}" height="12"/>${s}<path class="sdv-l" d="M0 12H${w}"/>`;
    },
    near(w) {     // half-round transom with muntin rays
      const r = 44, cx = w / 2; let rays = '';
      for (let i = 1; i < 6; i++) { const a = Math.PI * i / 6; rays += `M${cx} 10L${(cx - Math.cos(a) * r).toFixed(1)} ${(10 + Math.sin(a) * r).toFixed(1)}`; }
      return `<path class="sdv-p" d="M0 0H${w}V10H${cx + r}A${r} ${r} 0 0 1 ${cx - r} 10H0Z"/><path class="sdv-l sdv-draw" pathLength="1" d="${rays}M${cx - r + 10} 10A${r - 10} ${r - 10} 0 0 0 ${cx + r - 10} 10"/>`;
    },
    reviews(w) {  // K-style gutter and a downspout; a water bead runs along it
      const x2 = w - 60;   // downspout 60 px from the right edge
      return `<rect class="sdv-p" width="${w}" height="8"/><path class="sdv-p" d="M0 8H${w}V22H${x2 + 16}V50H${x2}V22H0Z"/><path class="sdv-l" d="M0 14H${x2}M0 20C10 20 8 14 16 14"/><circle class="sdv-bead" r="3" cx="0" cy="17"/>`;
    },
    money(w) {    // fish-scale shakes pop in from the centre out
      const r = 18; let s = '';
      for (let x = r; x < w + r; x += r * 2) s += `<path class="sdv-p sdv-t" d="M${x - r} 8 A${r} ${r} 0 0 0 ${x + r} 8Z"/>`;
      return `<rect class="sdv-p" width="${w}" height="9"/>${s}`;
    },
    book(w) {     // dentil moulding under a fascia, filling left to right
      let s = '';
      for (let x = 8; x < w; x += 30) s += `<rect class="sdv-p sdv-t" x="${x}" y="14" width="18" height="16"/>`;
      return `<rect class="sdv-p" width="${w}" height="14"/><path class="sdv-l" d="M0 14H${w}"/>${s}`;
    },
    ft(w) {       // ridge-line skyline of house elevations; windows light
      let s = '', x = 0, i = 0;
      while (x < w) {
        const hw = 60 + hash(i) * 70, hh = 16 + hash(i + 2) * 22, base = 56;
        s += `<path class="sdv-house" d="M${x} ${base}V${base - hh}L${x + hw / 2} ${base - hh - hw * 0.22}L${x + hw} ${base - hh}V${base}Z"/>`;
        if (hash(i + 5) > 0.35) s += `<rect class="sdv-win sdv-t" x="${x + hw * 0.3}" y="${base - hh + 6}" width="7" height="7"/>`;
        x += hw + 4; i++;
      }
      return `<rect class="sdv-p" width="${w}" height="56"/>${s}`;
    }
  };
  const DIVS = {};
  function bgOf(el) { if (!el) return ''; const c = getComputedStyle(el).backgroundColor; return c && c !== 'rgba(0, 0, 0, 0)' ? c : ''; }
  function recolor() {
    const secs = Array.from(d.querySelectorAll('.sec'));
    secs.forEach((s, i) => {
      const dv = DIVS[s.dataset.sec]; if (!dv || !i) return;
      const prev = secs[i - 1].querySelector('.stage > .v');
      const own = s.querySelector('.stage > .v');
      const pb = bgOf(prev) || tok('--paper'), ob = bgOf(own);
      // same colour on both sides: the profile takes a shade of it so the boundary still reads
      dv.style.setProperty('--sdv', pb === ob ? `color-mix(in srgb, ${pb} 90%, #000)` : pb);
      dv.style.setProperty('--sdv-line', getComputedStyle(own || s).color);
    });
    const ft = DIVS.ft;
    if (ft) { const last = secs[secs.length - 1]; ft.style.setProperty('--sdv', bgOf(last && last.querySelector('.stage > .v')) || 'var(--ground)'); }
  }
  function makeDivider(host, key) {
    const h = 56;
    const svg = svgEl('svg', { class: `sdv sdv-${key}`, preserveAspectRatio: 'none', 'aria-hidden': 'true', focusable: 'false' });
    host.prepend(svg);
    DIVS[key] = svg;
    let tl = null, w = 0;
    const draw = () => {
      const nw = Math.max(320, Math.round(host.clientWidth));
      if (Math.abs(nw - w) < 24 && w) return;
      w = nw;
      if (tl) { if (tl.scrollTrigger) tl.scrollTrigger.kill(); tl.kill(); tl = null; }
      svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
      svg.innerHTML = DIV[key](w);
      svg.querySelectorAll('.sdv-draw').forEach(p => { p.style.strokeDasharray = '1 1'; });
      recolor();
      if (!API.motion || !G || !window.ScrollTrigger) return;
      tl = G.timeline({ scrollTrigger: { trigger: svg, start: 'top bottom', end: 'top 45%', scrub: true }, defaults: { ease: 'none' } });
      const teeth = svg.querySelectorAll('.sdv-t');
      if (key === 'proof') tl.from(teeth, { scaleY: 0, transformOrigin: '0% 0%', stagger: 0.03, duration: 0.3 });
      if (key === 'services') { const g = svg.querySelector('.sdv-gable'); tl.fromTo(g, { attr: { d: g.getAttribute('d') } }, { attr: { d: g.dataset.to }, duration: 1 }); tl.to(svg.querySelector('.sdv-ridge'), { y: 30, duration: 1 }, 0); }
      if (key === 'work') tl.from(teeth, { scaleY: 0.2, transformOrigin: '50% 0%', stagger: { each: 0.01, from: 'random' }, duration: 0.3 });
      if (key === 'built') tl.from(teeth, { scaleY: 0, transformOrigin: '50% 0%', stagger: 0.02, duration: 0.3 });
      if (key === 'colour') tl.from(teeth, { scaleY: 0.15, transformOrigin: '50% 0%', stagger: 0.02, duration: 0.5 });
      if (key === 'near') tl.fromTo(svg.querySelector('.sdv-draw'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1 });
      if (key === 'reviews') tl.fromTo(svg.querySelector('.sdv-bead'), { attr: { cx: 0 } }, { attr: { cx: w - 52 }, duration: 1 });
      if (key === 'money') tl.from(teeth, { scale: 0, transformOrigin: '50% 0%', stagger: { each: 0.015, from: 'center' }, duration: 0.3 });
      if (key === 'book') tl.from(teeth, { autoAlpha: 0, y: -8, stagger: 0.008, duration: 0.2 });
      if (key === 'ft') tl.from(teeth, { autoAlpha: 0, stagger: { each: 0.03, from: 'random' }, duration: 0.2 });
    };
    draw();
    const ro = window.ResizeObserver ? new ResizeObserver(draw) : null;
    if (ro) ro.observe(host);
    return () => { if (ro) ro.disconnect(); if (tl) { if (tl.scrollTrigger) tl.scrollTrigger.kill(); tl.kill(); } svg.remove(); if (DIVS[key] === svg) delete DIVS[key]; };
  }

  /* ======================================================================================
     REACTION KIT (BRIEF-V5 §4): every interactive element answers with its section's own trade glyph, laid out by
     its role, on a hover verb and a DIFFERENT click verb. Hover verbs and click verbs are assigned so that no two
     sections share one for the same role and no two roles in a section share one (11 x 6 table, below). The kit
     never reuses a version-owned trick: no glint, level, tape, chalk pluck, stamp or path morph. At rest every
     glyph is invisible; the kit only runs with motion on and a fine pointer or keyboard focus.
     ====================================================================================== */
  const KEYS = ['hero', 'proof', 'services', 'work', 'built', 'colour', 'near', 'reviews', 'money', 'book', 'chrome'];
  const ROLES = ['button', 'link', 'card', 'image', 'control', 'tel'];
  const MOTIF = {   // one glyph per section, about 12 px, centred on 0 0
    hero: '<path class="g-l" pathLength="1" d="M-7 -2.5H7M-7 2.5H7"/><circle class="g-f" cx="4.5" cy="0" r="1.2"/>',
    proof: '<path class="g-f" d="M0 -6.5L1.9 -1.9 6.5 0 1.9 1.9 0 6.5 -1.9 1.9 -6.5 0 -1.9 -1.9Z"/>',
    services: '<rect class="g-l" pathLength="1" x="-5" y="-5" width="10" height="10"/><path class="g-l" pathLength="1" d="M-5 2L2 -5M-2 5L5 -2"/>',
    work: '<rect class="g-l" pathLength="1" x="-6" y="-4.5" width="12" height="9"/><rect class="g-f" x="-6" y="-4.5" width="6" height="9"/>',
    built: '<path class="g-l" pathLength="1" d="M-6 -6H6M-6 6H6M-4 -6V6M0 -6V6M4 -6V6"/>',
    colour: '<rect class="g-c" x="-4" y="-6" width="8" height="12" rx="1.6"/><rect class="g-w" x="-4" y="2.5" width="8" height="3.5" rx="1"/>',
    near: '<path class="g-l" pathLength="1" d="M-6 6V-1L0 -6L6 -1V6Z"/><path class="g-l" pathLength="1" d="M-1.6 6V2H1.6V6"/>',
    reviews: '<path class="g-s" d="M-4.5 -6.5H4.5L3.4 6.5H-3.4Z"/><path class="g-l" pathLength="1" d="M-0.8 -5.5C-0.4 -1 -1.2 2 -0.6 5.5"/>',
    money: '<circle class="g-l" pathLength="1" r="5.6"/><path class="g-l" pathLength="1" d="M0 -3.4V3.4M-2 -1.8C-2 -3 2 -3 2 -1.2S-2 0.8 -2 1.6 2 3 2 1.8"/>',
    book: '<rect class="g-l" pathLength="1" x="-4.2" y="-6.5" width="8.4" height="13"/><path class="g-l" pathLength="1" d="M-2.4 -4.4H2.4V-0.8H-2.4Z"/><circle class="g-f" cx="2.3" cy="1.8" r="0.9"/>',
    chrome: '<rect class="g-l" pathLength="1" x="-5" y="-5" width="10" height="10"/><path class="g-l" pathLength="1" d="M0 -5V5M-5 0H5"/>'
  };
  const LAYOUT = {   // where a role's glyphs sit around the element (w x h)
    button: (w, h) => { const n = clamp(Math.floor((w - 12) / 18), 2, 8), s = (w - 20) / Math.max(1, n - 1); return Array.from({ length: n }, (_, i) => [10 + i * s, h + 10, 1]); },
    link: (w, h) => { const n = clamp(Math.floor(w / 13), 2, 12), s = (w - 8) / Math.max(1, n - 1); return Array.from({ length: n }, (_, i) => [4 + i * s, h + 7, 0.62]); },
    card: (w) => [[w - 6, -9, 1], [w - 21, -9, 0.82], [w + 6, 7, 0.82]],
    image: (w, h) => [[14, 14, 1.2], [w - 14, 14, 1.2], [14, h - 14, 1.2], [w - 14, h - 14, 1.2]],
    control: (w, h) => [[-12, h / 2, 1], [w + 12, h / 2, 1]],
    tel: (w, h) => { const n = clamp(Math.floor(w / 15), 2, 10), s = (w - 8) / Math.max(1, n - 1); return Array.from({ length: n }, (_, i) => [4 + i * s, h + 7, 0.7]); }
  };
  const ST = (g, k) => ({ each: k, from: 'start' });
  const HOVER = {   // 11 ways in
    pop: g => G.fromTo(g, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.22, ease: 'back.out(2.2)', stagger: ST(g, 0.025) }),
    fly: g => G.fromTo(g, { x: -14, opacity: 0 }, { x: 0, opacity: 1, duration: 0.24, ease: 'power3.out', stagger: ST(g, 0.02) }),
    drop: g => G.fromTo(g, { y: -12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.24, ease: 'power3.out', stagger: ST(g, 0.02) }),
    rise: g => G.fromTo(g, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.22, ease: 'power2.out', stagger: ST(g, 0.03) }),
    stretch: g => G.fromTo(g, { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.22, ease: 'power3.out', stagger: ST(g, 0.02) }),
    spin: g => G.fromTo(g, { rotation: -160, scale: 0.3, opacity: 0 }, { rotation: 0, scale: 1, opacity: 1, duration: 0.3, ease: 'power3.out', stagger: ST(g, 0.03) }),
    sway: g => G.fromTo(g, { rotation: 28, opacity: 0, transformOrigin: '50% 0%' }, { rotation: 0, opacity: 1, duration: 0.3, ease: 'back.out(1.7)', stagger: ST(g, 0.03) }),
    draw: g => { G.set(g, { opacity: 1 }); return G.fromTo(g.map(x => Array.from(x.querySelectorAll('.g-l'))).flat(), { strokeDasharray: '1 1', strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.28, ease: 'power2.out', stagger: 0.015 }); },
    grow: g => G.fromTo(g, { scale: 0.2, opacity: 0, transformOrigin: '50% 100%' }, { scale: 1, opacity: 1, duration: 0.24, ease: 'power3.out', stagger: ST(g, 0.025) }),
    slip: g => G.fromTo(g, { x: 14, opacity: 0 }, { x: 0, opacity: 1, duration: 0.24, ease: 'power3.out', stagger: { each: 0.02, from: 'end' } }),
    unfold: g => G.fromTo(g, { scaleY: 0, opacity: 0, transformOrigin: '50% 0%' }, { scaleY: 1, opacity: 1, duration: 0.24, ease: 'power3.out', stagger: ST(g, 0.025) })
  };
  const CLICK = {   // 11 different answers to a press
    hammer: g => G.fromTo(g, { scaleY: 1 }, { scaleY: 0.4, duration: 0.07, ease: 'power2.in', yoyo: true, repeat: 1, transformOrigin: '50% 100%' }),
    scatter: g => g.forEach((x, i) => { const a = hash(i + 3) * Math.PI * 2; G.fromTo(x, { x: 0, y: 0 }, { x: Math.cos(a) * 10, y: Math.sin(a) * 10, duration: 0.12, ease: 'power2.out', yoyo: true, repeat: 1 }); }),
    hop: g => G.fromTo(g, { y: 0 }, { y: -7, duration: 0.12, ease: 'power2.out', yoyo: true, repeat: 1, stagger: 0.03 }),
    twirl: g => G.fromTo(g, { rotation: 0 }, { rotation: 360, duration: 0.3, ease: 'power2.inOut', stagger: 0.02 }),
    swell: g => G.fromTo(g, { scale: 1 }, { scale: 1.6, duration: 0.12, ease: 'power2.out', yoyo: true, repeat: 1, stagger: { each: 0.03, from: 'center' } }),
    slide: g => G.fromTo(g, { x: 0 }, { x: 12, duration: 0.12, ease: 'power2.out', yoyo: true, repeat: 1, stagger: 0.02 }),
    shrink: g => G.fromTo(g, { scale: 1 }, { scale: 0.3, duration: 0.12, ease: 'power2.in', yoyo: true, repeat: 1 }),
    tilt: g => G.fromTo(g, { rotation: 0 }, { rotation: -25, duration: 0.12, ease: 'power2.out', yoyo: true, repeat: 1, transformOrigin: '0% 100%' }),
    blink: g => G.fromTo(g, { opacity: 1 }, { opacity: 0.15, duration: 0.07, ease: 'none', yoyo: true, repeat: 3 }),
    burst: g => G.fromTo(g, { scale: 1, opacity: 1 }, { scale: 2, opacity: 0, duration: 0.24, ease: 'power2.out', onComplete: () => G.set(g, { scale: 1, opacity: 1 }) }),
    nod: g => G.fromTo(g, { rotation: 0 }, { rotation: 18, duration: 0.09, ease: 'power1.inOut', yoyo: true, repeat: 3 })
  };
  const HV = Object.keys(HOVER), CK = Object.keys(CLICK);
  /* the table: section i, role r -> hover HV[(i + 3r) % 11], click CK[(i + 5r + 1) % 11]; both are distinct across
     the 11 keys for a role and across the 6 roles within a key, and a click never reuses a hover verb */
  const verbOf = (key, role) => { const i = Math.max(0, KEYS.indexOf(key)), r = ROLES.indexOf(role); return { hover: HV[(i + 3 * r) % 11], click: CK[(i + 5 * r + 1) % 11] }; };
  API.table = () => KEYS.map(k => ROLES.map(r => { const v = verbOf(k, r); return `${k}.${r}: ${v.hover}/${v.click}`; }));
  function roleOf(el) {
    if (el.matches('[role="slider"], .cmp-handle, input[type="range"]')) return 'control';
    if (el.matches('a[href^="tel:"]')) return 'tel';
    if (el.matches('[role="radio"], [role="option"], [role="tab"], .h2p, .ix-row, .mx-row, .sw, .cmp-sw, .cb-t, .cr-n, .dv-chip, .pay-t, .dt, .lg-b, .bp-step, .fs, .sp-toggle, .vsw-b, .h3-tab')) return 'card';
    if (el.matches('.btn, button, input[type="submit"]')) return 'button';
    if (el.matches('a[href]')) return 'link';
    if (el.matches('figure.rx-img, [data-rx-img]')) return 'image';
    return '';
  }
  function glyphs(key, role, w, h) {
    const hex = HEX(), m = MOTIF[key] || MOTIF.chrome;
    return LAYOUT[role](w, h).map(([x, y, s], i) => {
      const body = key === 'colour' && hex.length ? m.replace('class="g-c"', `class="g-c" style="fill:${hex[(i * 7 + 3) % hex.length]}"`) : m;
      return `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${s})"><g class="rg">${body}</g></g>`;
    }).join('');
  }
  function rxize(scope, key, b) {
    const els = Array.from(scope.querySelectorAll('a[href], button, [role="slider"], [role="radio"], [role="tab"], input[type="submit"], input[type="range"], figure[data-rx-img], [data-rx]'));
    els.forEach(el => {
      if (el.closest('.pal-sw, .picks, .rx') || el.dataset.rx === 'none' || el._rx) return;
      const role = roleOf(el); if (!role) return;
      const v = verbOf(key, role);
      el._rx = { svg: null, w: 0, h: 0, on: false };
      const ensure = () => {
        const r = el.getBoundingClientRect(), w = Math.round(r.width), h = Math.round(r.height);
        if (!w || !h) return null;
        if (el._rx.svg && el._rx.w === w && el._rx.h === h) return el._rx.svg;
        if (el._rx.svg) el._rx.svg.remove();
        if (getComputedStyle(el).position === 'static') el.classList.add('rx-host');
        const s = svgEl('svg', { class: `rx rx-${role} rx-k-${key}`, width: w, height: h, viewBox: `0 0 ${w} ${h}`, 'aria-hidden': 'true', focusable: 'false' });
        s.innerHTML = glyphs(key, role, w, h);
        (el.matches('input') ? el.parentElement : el).appendChild(s);
        if (el.matches('input')) { el.parentElement.classList.add('rx-host'); G.set(s, { left: el.offsetLeft, top: el.offsetTop }); }
        el._rx.svg = s; el._rx.w = w; el._rx.h = h;
        return s;
      };
      const g = () => Array.from(el._rx.svg.querySelectorAll('.rg'));
      const over = () => { if (el._rx.on) return; const s = ensure(); if (!s) return; el._rx.on = true; G.killTweensOf(g()); HOVER[v.hover](g()); };
      const out = () => { if (!el._rx.on || !el._rx.svg) return; el._rx.on = false; G.killTweensOf(g()); G.to(g(), { opacity: 0, duration: 0.18, ease: 'power2.in', stagger: { each: 0.015, from: 'end' } }); };
      b.on(el, 'pointerenter', e => { if (e.pointerType !== 'touch') over(); });
      b.on(el, 'pointerleave', e => { if (e.pointerType !== 'touch') out(); });
      b.on(el, 'focus', () => { if (el.matches(':focus-visible')) over(); });
      b.on(el, 'blur', out);
      b.on(el, 'click', () => {
        if (role === 'tel') phoneCard(el);
        const s = ensure(); if (!s) return;
        if (!el._rx.on) { G.set(g(), { opacity: 1 }); el._rx.on = true; setTimeout(out, 700); }
        CLICK[v.click](g());
      });
      b.add(() => { if (el._rx && el._rx.svg) el._rx.svg.remove(); el.classList.remove('rx-host'); delete el._rx; });
    });
  }
  /* Shazam-style call card (overshoot (.8,-.6,.2,1) 400 ms, close (.4,1,.3,1)); the tel: link still dials */
  function phoneCard(el) {
    const r = el.getBoundingClientRect();
    const c = d.createElement('div');
    c.className = 'rx-call'; c.setAttribute('aria-hidden', 'true');
    c.innerHTML = '<b>(512) 550-0000</b><span>Monday\u2013Friday 8\u20138, Saturday 8\u20136, Sunday 12\u20135</span>';
    d.body.appendChild(c);
    const w = Math.min(340, innerWidth - 32);
    G.set(c, { left: clamp(r.left + r.width / 2 - w / 2, 16, innerWidth - w - 16), top: clamp(r.top - 110, 12, innerHeight - 120), width: w });
    G.timeline({ onComplete: () => c.remove() }).fromTo(c, { scale: 0.6, opacity: 0, transformOrigin: '50% 100%' }, { scale: 1, opacity: 1, duration: 0.4, ease: 'shazamIn' })
      .to(c, { scale: 0.9, opacity: 0, duration: 0.3, ease: 'shazamOut', delay: 2.4 });
  }
  /* headings react on approach: a lap underline lifts within 140 px (P70 falloff) */
  function lapHeads(scope, b) {
    const hs = Array.from(scope.querySelectorAll('.h2x, .display'));
    if (!hs.length) return;
    const items = hs.map(h => {
      const s = svgEl('svg', { class: 'rx-lap', viewBox: '0 0 100 8', preserveAspectRatio: 'none', 'aria-hidden': 'true', focusable: 'false' });
      s.innerHTML = '<path class="rx-lap1" d="M0 2H100"/><path class="rx-lap2" d="M0 6H100"/>';
      if (getComputedStyle(h).position === 'static') h.classList.add('rx-host');
      h.appendChild(s);
      return { h, s, k: 0 };
    });
    const sub = (dt) => {
      let busy = false;
      const a = 1 - Math.pow(1 - 0.14, dt * 60);
      items.forEach(it => {
        const r = it.h.getBoundingClientRect();
        if (r.bottom < -50 || r.top > innerHeight + 50) return;
        const dx = Math.max(r.left - P.x, 0, P.x - r.right), dy = Math.max(r.top - P.y, 0, P.y - r.bottom);
        const t = P.in && mqFine.matches ? Math.max(0, 1 - Math.hypot(dx, dy) / 140) : 0;
        if (Math.abs(t - it.k) > 0.003) { it.k += (t - it.k) * a; busy = true; it.s.style.setProperty('--k', it.k.toFixed(3)); }
      });
      return busy;
    };
    subs.add(sub);
    b.add(() => { subs.delete(sub); items.forEach(it => { it.s.remove(); it.h.classList.remove('rx-host'); }); });
  }

  /* ======================================================================================
     PUBLIC: home.js calls mount() for each live version, sync() when motion changes
     ====================================================================================== */
  API.mount = (vr, key, b) => {
    const offs = [];
    if (!vr) return;
    // Audit pack F3: the dashed house watermark behind Services fails the Removal Test; backups keep theirs
    if (BUILDERS[key] && !(/^(services|near)$/.test(key) && !vr.closest('[data-bk="a"]'))) offs.push(makeField(vr, key));   // F7.7: the lot-line motif behind Near goes too
    if (DIV[key] && key !== 'ft') offs.push(makeDivider(vr, key));
    if (API.motion && G) { rxize(vr, key, b); lapHeads(vr, b); }
    recolor();
    b.add(() => { offs.forEach(f => f && f()); });
    wake();
  };
  let chromeBag = null, ftDiv = null;
  function chrome() {
    const fns = [];
    const bb = { on(el, ev, fn, o) { el.addEventListener(ev, fn, o); fns.push(() => el.removeEventListener(ev, fn, o)); }, add(fn) { fns.push(fn); }, clear() { while (fns.length) fns.pop()(); } };
    if (chromeBag) chromeBag.clear();
    chromeBag = bb;
    if (API.motion && G) {
      d.querySelectorAll('.hd, .ft, .vsw').forEach(sc => rxize(sc, 'chrome', bb));
    }
  }
  API.sync = (motionOn) => {
    API.motion = !!motionOn && !!G;
    root.toggleAttribute('data-motion-reduced', !API.motion);
    root.dataset.motion = API.motion ? 'full' : 'reduced';
    Pal.sync();
    chrome();
    const ft = d.querySelector('.ft');
    if (ft && !ftDiv) ftDiv = makeDivider(ft, 'ft');
    else if (ft && ftDiv) { ftDiv(); ftDiv = makeDivider(ft, 'ft'); }
    wake();
  };
  API.recolor = recolor;
  API.pal = Pal;

  function boot() {
    // named curves for the kit: Q78 Kukuri sweep and the Shazam overshoot pair (CustomEase is in the shared GSAP load)
    if (G && window.CustomEase) { window.CustomEase.create('kukuri', '.7,0,.3,1'); window.CustomEase.create('shazamIn', '.8,-.6,.2,1'); window.CustomEase.create('shazamOut', '.4,1,.3,1'); }
    const q = new URLSearchParams(location.search).get('pal');
    const saved = q || store.get('ap-pal') || 'sash';
    wireSwitchers();
    Pal.set(PAL_ORDER.includes(saved) ? saved : 'sash');
    d.addEventListener('pointermove', onMove, { passive: true });
    d.addEventListener('pointerdown', e => Pal.press(e), { passive: true });
    root.addEventListener('pointerleave', () => { P.in = false; Pal.hide(); Halo.hide(); });
    addEventListener('blur', () => { P.in = false; Pal.hide(); Halo.hide(); });
    mqFine.addEventListener('change', () => Pal.sync());
    addEventListener('resize', () => recolor(), { passive: true });
  }
  boot();
})();
