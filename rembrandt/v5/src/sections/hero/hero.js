// HERO (PLAN-V7 §6). Each version is the page's one signature interactive (F17). Reveals are compressed to the F17
// level (0.3s moves). Facts only: since 1995; Bunk founded it, Wade runs it, Rachel answers; (937) 746-7377; written,
// line-item estimates; Mon to Fri 9 to 5; the photos are real jobs.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { img } from '../../js/main.js';
import { EASE, words, beats } from '../../js/fx.js';

const NS = 'http://www.w3.org/2000/svg';
const visible = (el, fn) => { const io = new IntersectionObserver(([e]) => fn(e.isIntersecting), { rootMargin: '120px' }); io.observe(el); return () => io.disconnect(); };

// ---------------------------------------------------------------------------------------------------------------
// v1 ⟦S1321⟧ cinematic (clip image reveal; masked lines; overscanned parallax 0.18, scrub 1.2; mouse layers 0.04) with
// the weather over the roofline, after ⟦S1341⟧ threejs-weather ported to SVG: one pre-allocated pool of drops, storm =
// rain intensified (fall speed x1 -> x1.42, slant grows with speed squared), and ⟦S1339⟧'s rule that a light state is
// cross-faded from wherever it is (scroll drives it, so it never jumps). The cursor leans the rain and parts it; the
// Tudor's real ridge and gable lines (traced from the photo) draw themselves and catch the light near the pointer.
// Scrolling the first 40% of the hero clears the storm: rain thins out, the clouds part, the sun warms the scrim.
function cinematic(root, c) {
  root.classList.add('is-run');
  const sec = c.sec, done = [], q = s => root.querySelector(s), qa = s => root.querySelectorAll(s);
  const ridge = q('.hx1-ridge'), glow = q('.hx1-glow-c'), rl = qa('.hx1-rl path'), base = qa('.hx1-rl:not(.hx1-rl--glow) path');
  const clouds = [...qa('.hx1-cloud .cl')], sun = q('.hx1-sun'), shade = q('.hx1-shade');
  done.push(() => { delete sec.dataset.mood; });
  // the ridge glow follows the pointer (fine pointers): client -> SVG user space through the inverse screen matrix
  const pt = ridge.createSVGPoint();
  const onGlow = e => { if (e.pointerType !== 'mouse') return; const m = ridge.getScreenCTM(); if (!m) return; pt.x = e.clientX; pt.y = e.clientY; const p = pt.matrixTransform(m.inverse()); glow.setAttribute('cx', p.x.toFixed(0)); glow.setAttribute('cy', p.y.toFixed(0)); };
  const offGlow = () => { glow.setAttribute('cx', -500); glow.setAttribute('cy', -500); };
  root.addEventListener('pointermove', onGlow, { passive: true }); root.addEventListener('pointerleave', offGlow);
  done.push(() => { root.removeEventListener('pointermove', onGlow); root.removeEventListener('pointerleave', offGlow); });
  const cleanup = () => done.forEach(f => f());
  // reduced motion: the designed still is the cleared state (sun out, clouds parted, the roofline drawn), no rain
  if (!c.motion) {
    sec.dataset.mood = 'visor';
    gsap.set(sun, { opacity: 1 }); gsap.set(shade, { '--warm': 1 });
    gsap.set(clouds[0], { x: -160 }); gsap.set(clouds[1], { y: -40, opacity: 0.6 }); gsap.set(clouds[2], { x: 200 });
    return cleanup;
  }
  // parallax: the plate (photo + traced lines together) travels 0.18 of the viewport as the hero leaves (S1321)
  gsap.to(q('.hx1-plate'), { y: () => -innerHeight * 0.18, ease: 'none', scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: 1.2, invalidateOnRefresh: true } });
  // entrance at the F17 level: media, then the headline lines, then copy and actions, then the roofline draws
  gsap.timeline({ delay: c.swap ? 0 : 0.05 })
    .fromTo(q('.hx1-media'), { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.3, ease: EASE }, 0)
    .fromTo(q('.hx1-img'), { scale: 1.04 }, { scale: 1, duration: 0.3, ease: EASE }, 0)
    .fromTo(qa('.hx1-h .ln > span'), { yPercent: 100 }, { yPercent: 0, duration: 0.3, ease: EASE, stagger: 0.08 }, 0.12)
    .fromTo([q('.hx1-p'), q('.hx1-cta')], { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.3, ease: EASE, stagger: 0.08 }, 0.28)
    .fromTo(rl, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.3, ease: EASE, stagger: 0.06 }, 0.36);

  // rain: one pre-allocated pool (S1341), sized to the hero's pixel box; density scales with area
  const svg = q('.hx1-rain'); let W = 1, H = 1;
  const N = Math.round(gsap.utils.clamp(18, 48, (innerWidth * innerHeight) / 27000));
  const drops = Array.from({ length: N }, (_, i) => { const l = document.createElementNS(NS, 'line'); svg.append(l); return { l, x: 0, y: 0, len: 14 + Math.random() * 14, sp: 820 + Math.random() * 520, i }; });
  const seed = d => { d.x = Math.random() * (W + 200) - 100; d.y = Math.random() * H; };
  const size = () => { const r = root.getBoundingClientRect(); W = Math.max(1, r.width); H = Math.max(1, r.height); svg.setAttribute('viewBox', `0 0 ${W.toFixed(0)} ${H.toFixed(0)}`); };
  const ro = new ResizeObserver(size); ro.observe(root); size(); drops.forEach(seed); done.push(() => ro.disconnect());
  const st = { w: 1, lean: 0, leanT: 0, px: -1e4, py: -1e4 };
  let raf = 0, last = 0, inView = true;
  // weather state from scroll (0 -> 40% of the hero); everything reads st.w so the cross-fade never jumps
  const parts = [{ el: clouds[0], to: { x: -160 } }, { el: clouds[1], to: { y: -40, opacity: 0.6 } }, { el: clouds[2], to: { x: 200 } }];
  const clr = gsap.timeline({ paused: true })
    .to(parts[0].el, { ...parts[0].to, ease: 'none', duration: 1 }, 0).to(parts[1].el, { ...parts[1].to, ease: 'none', duration: 1 }, 0).to(parts[2].el, { ...parts[2].to, ease: 'none', duration: 1 }, 0)
    .fromTo(sun, { opacity: 0, y: 60 }, { opacity: 1, y: 0, ease: 'none', duration: 1 }, 0)
    .fromTo(shade, { '--warm': 0 }, { '--warm': 1, ease: 'none', duration: 1 }, 0)
    .fromTo(base, { stroke: '#ffffff' }, { stroke: '#ffe2a0', ease: 'none', duration: 1 }, 0);
  const setW = w => { st.w = w; clr.progress(1 - w); sec.dataset.mood = w > 0.5 ? 'umbrella' : 'visor'; if (w > 0.01) wake(); };
  ScrollTrigger.create({ trigger: root, start: 'top top', end: '40% top', scrub: true, onUpdate: s => setW(1 - s.progress), onRefresh: s => setW(1 - s.progress) });
  // ambient cloud drift on coprime periods (7.1 / 11.3 / 13.7 s), paused offscreen
  const drift = clouds.map((cl, i) => gsap.fromTo(cl.querySelector('path'), { x: -14 }, { x: 14, duration: [7.1, 11.3, 13.7][i], ease: 'sine.inOut', yoyo: true, repeat: -1 }));
  // the pointer leans the rain (target -0.35..0.35) and parts it locally
  const onMove = e => { if (e.pointerType !== 'mouse') return; const r = root.getBoundingClientRect(); st.leanT = ((e.clientX - r.left) / r.width - 0.5) * 0.7; st.px = e.clientX - r.left; st.py = e.clientY - r.top; };
  const onLeave = () => { st.leanT = 0; st.px = st.py = -1e4; };
  root.addEventListener('pointermove', onMove, { passive: true }); root.addEventListener('pointerleave', onLeave);
  done.push(() => { root.removeEventListener('pointermove', onMove); root.removeEventListener('pointerleave', onLeave); });
  function frame(t) {
    raf = 0; if (!inView || document.hidden) return;
    const dt = Math.min(1 / 30, (t - last) / 1000 || 1 / 60); last = t;
    st.lean += (st.leanT - st.lean) * (1 - Math.pow(0.9, dt * 60));
    const v = 1 + 0.42 * st.w, slant = (0.12 + st.lean) * v * v, live = Math.ceil(N * st.w);
    for (const d of drops) {
      if (d.i >= live) { if (d.on !== false) { d.l.setAttribute('opacity', 0); d.on = false; } continue; }
      if (d.on === false) { d.on = true; d.l.setAttribute('opacity', 1); seed(d); d.y = -d.len; }
      d.y += d.sp * v * dt; d.x += d.sp * v * dt * slant;
      if (d.y > H + d.len) { d.y = -d.len - Math.random() * 40; d.x = Math.random() * (W + 300) - 150 - slant * H * 0.5; }
      // part around the pointer: a visual offset, strongest within 110px
      let off = 0; const dx = d.x - st.px, dy = d.y - st.py, dist = Math.hypot(dx, dy);
      if (dist < 110) off = Math.sign(dx || 1) * 22 * (1 - dist / 110) ** 2;
      const x = d.x + off;
      d.l.setAttribute('x1', x.toFixed(1)); d.l.setAttribute('y1', d.y.toFixed(1)); d.l.setAttribute('x2', (x - d.len * slant).toFixed(1)); d.l.setAttribute('y2', (d.y - d.len).toFixed(1));
    }
    if (st.w > 0.01 || drops.some(d => d.on)) raf = requestAnimationFrame(frame);
    else svg.style.visibility = 'hidden'; // a cleared sky costs nothing to composite
  }
  function wake() { if (!raf && inView && !document.hidden) { svg.style.visibility = ''; last = performance.now(); raf = requestAnimationFrame(frame); } }
  done.push(visible(root, v => { inView = v; drift.forEach(d => (v ? d.resume() : d.pause())); if (v) wake(); }));
  const onVis = () => { if (!document.hidden) wake(); }; document.addEventListener('visibilitychange', onVis);
  done.push(() => { document.removeEventListener('visibilitychange', onVis); cancelAnimationFrame(raf); drift.forEach(d => d.kill()); });
  setW(1);
  return cleanup;
}

// ---------------------------------------------------------------------------------------------------------------
// v2 [BANK] Smeulders Interieurgroep carousel (deep read 506; live site): fullscreen jobs under a slow drift, the title
// in image-filled type, a counter, prev/next. Values: outgoing power2.in 0.7s; incoming power3.out 1.1s; crossfades
// power1.inOut. With [BANK] Q146 morphing background shape: one large outline changes posture per slide, then breathes
// between its path and pathAlt (3500ms linear, alternate). Adapted: the outline is each job's roof line, traced from that
// photo, drawn as a blueprint on a 16px drafting grid; the morph runs with the slide (1.1s power3.out; no elastic, S1314).
// The counter is four shingle tabs. Autoplay every 6s with a visible pause (WCAG 2.2.2); off under reduced motion.
const ROOFS = [ // [outline, breathing alt, detail lines] in the blueprint's 400 x 200 box, ground at y 180
  ['M20 180V95L70 45L120 95V112L150 98L240 98L262 112L320 72L380 112V180Z', 'M20 180V93L70 41L120 93V110L150 95L240 95L262 110L320 68L380 110V180Z', 'M120 112V180M262 112V180M44 120h50v28h-50zM292 128h58v52'],
  ['M10 180V110L120 28L170 64L160 78L208 52L262 114L330 116L352 100L385 122V180Z', 'M10 180V108L120 24L170 61L160 75L208 48L262 112L330 114L352 97L385 120V180Z', 'M160 78L160 180M262 114V180M120 28V60M40 120h60M196 96h28'],
  ['M20 180V118L70 84L330 84L380 118V180Z', 'M20 180V116L70 81L330 81L380 116V180Z', 'M120 118L165 98L210 118M262 84V66H274V84M20 118H380'],
  ['M15 180V120L70 70L330 70L385 120V180Z', 'M15 180V118L70 66L330 66L385 118V180Z', 'M95 120L150 82L205 120M200 110L245 62L290 110M300 120L335 96L370 120M15 120H385'],
];
const HOLD = 6, DRIFT = { scale: 1.06, xPercent: -2.4 };
function carousel(root, c) {
  root.classList.add('is-run');
  const slides = [...root.querySelectorAll('.hx2-slide')], N = slides.length;
  const h = root.querySelector('.hx2-h'), layers = [...h.querySelectorAll('.hx2-fill')];
  const cap = root.querySelector('.hx2-cap'), count = root.querySelector('.hx2-count b'), pause = root.querySelector('.hx2-pause');
  const tabs = [...root.querySelectorAll('.hx2-tabs i')], tabRow = root.querySelector('.hx2-tabs');
  const roof = root.querySelector('.hx2-bp-roof'), det = root.querySelector('.hx2-bp-det');
  const t = c.motion ? 1 : 0;

  for (const l of layers) {
    const text = l.textContent.replace(/\s+/g, ' ').trim(); l.textContent = '';
    text.split(' ').forEach((w, i) => { if (i) l.append(' '); const s = document.createElement('span'); s.className = 'hx2-w'; s.textContent = w; l.append(s); });
  }
  const fills = slides.map(s => ({ uri: img(s.dataset.fill), a: 1.5 }));
  fills.forEach(f => { if (!f.uri) return; const i = new Image(); i.onload = () => { f.a = i.naturalWidth / i.naturalHeight; layout(); }; i.src = f.uri; });
  const shown = [0, 0];
  function paint(l, k) {
    const f = fills[k], W = h.clientWidth, H = h.clientHeight;
    const S = Math.max(W * 1.5, H * f.a * 1.4), SH = S / f.a, bx = (W - S) / 2, by = (H - SH) / 2;
    l.style.setProperty('--fill', `url("${f.uri}")`);
    for (const w of l.children) {
      w.style.backgroundSize = `100% 100%, ${S.toFixed(0)}px ${SH.toFixed(0)}px`;
      w.style.backgroundPosition = `0 0, ${(bx - w.offsetLeft).toFixed(1)}px ${(by - w.offsetTop).toFixed(1)}px`;
    }
  }
  function layout() { layers.forEach((l, i) => paint(l, shown[i])); }
  if (fills.every(f => f.uri)) { h.classList.add('is-filled'); layout(); }
  const ro = new ResizeObserver(() => layout()); ro.observe(h);

  // the blueprint roof line (Q146 posture per slide, then breathing)
  let breathe = null;
  function setRoof(k, dur) {
    const [d, alt, lines] = ROOFS[k];
    if (breathe) { breathe.kill(); breathe = null; }
    det.innerHTML = lines.split('M').filter(Boolean).map(p => `<path d="M${p}"/>`).join('');
    if (!dur) { roof.setAttribute('d', d); }
    else {
      gsap.to(roof, { morphSVG: d, duration: dur, ease: 'power3.out', overwrite: 'auto' });
      gsap.fromTo(det.children, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.3, ease: EASE, stagger: 0.05, delay: dur * 0.5 });
    }
    if (t && inView) breathe = gsap.to(roof, { morphSVG: alt, duration: 3.5, ease: 'none', yoyo: true, repeat: -1, delay: dur || 0 });
  }

  let cur = 0, front = 0, playing = c.motion, timer = null, inView = true;
  const drift = s => gsap.fromTo(s.querySelector('.hx2-img'), { scale: 1, xPercent: 0 }, { ...DRIFT, duration: HOLD + 1.1, ease: 'none', overwrite: 'auto' });
  function setCap(k) {
    const txt = slides[k].dataset.caption || '';
    if (cap.textContent === txt) return;
    cap.textContent = txt;
    if (txt && t) gsap.fromTo(cap, { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.3, ease: EASE });
  }
  function go(n) {
    n = (n + N) % N; if (n === cur) return;
    const out = slides[cur], inn = slides[n];
    slides.forEach((s, i) => { s.style.zIndex = i === n ? 2 : i === cur ? 1 : 0; s.setAttribute('aria-hidden', i === n ? 'false' : 'true'); s.classList.toggle('is-on', i === n || i === cur); });
    gsap.to(out, { autoAlpha: 0, duration: 0.7 * t, ease: 'power2.in', overwrite: 'auto', onComplete: () => out.classList.remove('is-on') });
    gsap.fromTo(inn, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.1 * t, ease: 'power3.out', overwrite: 'auto' });
    count.textContent = n + 1; tabs.forEach((x, i) => x.classList.toggle('is-on', i === n));
    if (t) drift(inn);
    const back = 1 - front; shown[back] = n; paint(layers[back], n);
    // the filled words swap in 0.3s at the middle of the photo fade (F17): a background-clip:text fade repaints every word
    // each frame, so it is kept short rather than run for the photo's full 1.1s
    gsap.to(layers[back], { autoAlpha: 1, duration: 0.3 * t, delay: 0.35 * t, ease: 'power1.inOut', overwrite: 'auto' });
    gsap.to(layers[front], { autoAlpha: 0, duration: 0.3 * t, delay: 0.35 * t, ease: 'power1.inOut', overwrite: 'auto' });
    layers[back].classList.add('is-on'); layers[front].classList.remove('is-on'); front = back;
    setRoof(+inn.dataset.roof, 1.1 * t);
    setCap(n); cur = n; arm();
  }
  function arm() { if (timer) timer.kill(); timer = playing && inView ? gsap.delayedCall(HOLD, () => go(cur + 1)) : null; }
  function setPlaying(p) { playing = p; pause.setAttribute('aria-pressed', String(!p)); arm(); }
  slides.forEach((s, i) => s.setAttribute('aria-hidden', i ? 'true' : 'false'));
  gsap.set(layers[1], { autoAlpha: 0 });
  tabs[0].classList.add('is-on');
  const onClick = e => {
    const b = e.target.closest('.hx2-btn'); if (!b) return;
    if (b === pause) { setPlaying(!playing); return; }
    const dir = Number(b.dataset.dir);
    tabRow.style.setProperty('--sh', dir * 6 + 'px'); tabRow.classList.remove('is-shift'); void tabRow.offsetWidth; tabRow.classList.add('is-shift');
    go(cur + dir);
  };
  root.addEventListener('click', onClick);
  ScrollTrigger.create({ trigger: root, start: 'top bottom', end: 'bottom top', onToggle: s => { inView = s.isActive; arm(); if (breathe) (inView ? breathe.resume() : breathe.pause()); } });
  setRoof(0, 0);
  setPlaying(playing);
  const done = [() => ro.disconnect(), () => timer && timer.kill(), () => root.removeEventListener('click', onClick), () => breathe && breathe.kill()];
  const cleanup = () => done.forEach(f => f());
  if (!t) return cleanup;
  // (no pointer parallax on the photo fill: moving a background-clip:text fill re-rasterizes every word each frame, measured at 5fps)

  // entrance at the F17 level, in the measured order (visual, rules, title words, subtitle, controls, blueprint)
  drift(slides[0]);
  gsap.timeline({ delay: c.swap ? 0 : 0.05 })
    .fromTo(slides[0], { scale: 1.04, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.3, ease: EASE }, 0)
    .fromTo(root.querySelectorAll('.hx2-rule--v'), { scaleY: 0 }, { scaleY: 1, duration: 0.3, ease: EASE }, 0.08)
    .fromTo(root.querySelectorAll('.hx2-rule--h'), { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: EASE }, 0.08)
    .fromTo(layers[0].children, { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.3, ease: EASE, stagger: 0.04 }, 0.12)
    .fromTo(root.querySelector('.hx2-sub'), { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.3, ease: EASE }, 0.3)
    .fromTo(root.querySelector('.hx2-ctl'), { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.3, ease: EASE }, 0.38)
    .fromTo([roof, ...root.querySelectorAll('.hx2-bp-ground,.hx2-bp-tick path')], { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.3, ease: EASE, stagger: 0.05 }, 0.3);
  return cleanup;
}

// ---------------------------------------------------------------------------------------------------------------
// v3 [BANK] AirWorks hover-the-house diagnostic (HVAC triple crown: the illustration answers per spot; GSAP with a CSS
// backstop) with [BANK] BLK 531 (one inline SVG whose id'd zones are re-filled; easing cubic-bezier(.645,.045,.355,1)).
// Adapted: a drawn house; point at or tab to a part of the roof and it lights, a leader draws to its name and a plain
// line about what it does. The chips are the accessible control (aria-pressed), mirrored by the zones for the pointer.
// Copy ties it to a real fact: written, line-item estimates. Definitions are general roofing knowledge, not claims.
const ZONES = {
  ridge: { n: 'Ridge', d: 'The peak, where two slopes meet. Capped so water sheds both ways.', a: [320, 106], l: [250, 34] },
  shingles: { n: 'Shingles', d: 'The field. Courses go on from the bottom up, each lapping the one below.', a: [470, 200], l: [610, 70] },
  flashing: { n: 'Flashing', d: 'Metal folded around the chimney so water runs past the joint.', a: [232, 143], l: [36, 46] },
  vents: { n: 'Vents', d: 'Let the attic breathe, which keeps heat and damp off the deck.', a: [392, 151], l: [610, 30] },
  drip: { n: 'Drip edge', d: 'Metal at the roof edge that turns water into the gutter.', a: [110, 244], l: [20, 168] },
  fascia: { n: 'Fascia', d: 'The board behind the gutter that holds it up.', a: [520, 254], l: [620, 312] },
  gutters: { n: 'Gutters', d: 'Catch the water at the eave.', a: [300, 264], l: [20, 310] },
  downspouts: { n: 'Downspouts', d: 'Carry it down and away from the house.', a: [563, 360], l: [620, 410] },
};
function diagnostic(root, c) {
  root.classList.add('is-run');
  const svg = root.querySelector('.hx3-svg'), house = root.querySelector('.hx3-house'), out = root.querySelector('.hx3-call-out');
  const lead = root.querySelector('.hx3-lead'), dot = root.querySelector('.hx3-dot'), say = root.querySelector('.hx3-say');
  const chips = [...root.querySelectorAll('.hx3-chip')], zones = [...svg.querySelectorAll('.z')];
  const dur = c.motion ? 0.3 : 0;
  let pinned = null, shown = null;
  function show(z) {
    if (z === shown) return; shown = z;
    zones.forEach(p => p.classList.toggle('is-on', p.dataset.z === z));
    svg.classList.toggle('has-z', !!z);
    if (!z) { out.classList.remove('is-on'); gsap.to([lead, dot], { autoAlpha: 0, duration: dur * 0.8 }); return; }
    const Z = ZONES[z], [ax, ay] = Z.a, [lx, ly] = Z.l, mx = lx < 320 ? Math.max(lx + 20, ax - 40) : Math.min(lx - 20, ax + 40);
    lead.setAttribute('d', `M${ax} ${ay} L${mx} ${ly} L${lx} ${ly}`); dot.setAttribute('cx', ax); dot.setAttribute('cy', ay);
    gsap.set([lead, dot], { autoAlpha: 1 });
    gsap.fromTo(lead, { drawSVG: '0%' }, { drawSVG: '100%', duration: dur, ease: EASE });
    gsap.fromTo(dot, { scale: 0.85 }, { scale: 1, duration: dur, ease: 'back.out(2)', transformOrigin: 'center' });
    out.querySelector('b').textContent = Z.n; out.querySelector('span').textContent = Z.d;
    out.style.left = (lx / 640 * 100) + '%'; out.style.top = (ly / 480 * 100) + '%';
    out.style.translate = `${lx < 320 ? '0' : '-100%'} -50%`;
    out.classList.remove('is-on'); void out.offsetWidth; out.classList.add('is-on');
  }
  function pin(z) {
    pinned = pinned === z ? null : z;
    chips.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.z === pinned)));
    show(pinned);
    say.textContent = pinned ? `${ZONES[pinned].n}: ${ZONES[pinned].d}` : '';
  }
  const preview = z => show(z || pinned);
  const zEnter = e => { if (e.pointerType === 'mouse') preview(e.target.dataset.z); };
  const zLeave = e => { if (e.pointerType === 'mouse') preview(null); };
  const zClick = e => { const p = e.target.closest('.z'); if (p) pin(p.dataset.z); };
  zones.forEach(p => { p.addEventListener('pointerenter', zEnter); p.addEventListener('pointerleave', zLeave); });
  svg.addEventListener('click', zClick);
  const cEnter = e => preview(e.currentTarget.dataset.z), cLeave = () => preview(null), cClick = e => pin(e.currentTarget.dataset.z);
  chips.forEach(b => { b.addEventListener('pointerenter', cEnter); b.addEventListener('focus', cEnter); b.addEventListener('pointerleave', cLeave); b.addEventListener('blur', cLeave); b.addEventListener('click', cClick); });
  const done = [() => { zones.forEach(p => { p.removeEventListener('pointerenter', zEnter); p.removeEventListener('pointerleave', zLeave); }); svg.removeEventListener('click', zClick); chips.forEach(b => { b.removeEventListener('pointerenter', cEnter); b.removeEventListener('focus', cEnter); b.removeEventListener('pointerleave', cLeave); b.removeEventListener('blur', cLeave); b.removeEventListener('click', cClick); }); }];
  gsap.set([lead, dot], { autoAlpha: 0 });
  const cleanup = () => done.forEach(f => f());
  if (!c.motion) return cleanup;
  // entrance at the F17 level: copy beats, then the house draws (walls, zones), then the chips
  beats(root, [root.querySelector('.hx3-kick'), root.querySelector('.hx3-h'), [root.querySelector('.hx3-p'), root.querySelector('.hx3-copy .cta-row')]], { now: true, delay: c.swap ? 0 : 0.05 });
  gsap.timeline({ delay: c.swap ? 0.1 : 0.15 })
    .fromTo(root.querySelector('.hx3-stage'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.15 }, 0)
    .fromTo(svg.querySelectorAll('.hx3-walls rect, .z, .hx3-chim rect'), { drawSVG: '0%', fillOpacity: 0 }, { drawSVG: '100%', fillOpacity: 1, duration: 0.3, ease: EASE, stagger: 0.025, clearProps: 'fillOpacity' }, 0)
    .fromTo(chips, { y: 8, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.3, ease: EASE, stagger: 0.03, clearProps: 'transform,opacity,visibility' }, 0.3);
  // quiet weather: clouds drift on coprime periods, paused offscreen
  const drift = [...root.querySelectorAll('.hx3-cloud .cl')].map((cl, i) => gsap.fromTo(cl, { x: -18 }, { x: 18, duration: [9.7, 12.1, 14.3][i], ease: 'sine.inOut', yoyo: true, repeat: -1 }));
  done.push(visible(root, v => drift.forEach(d => (v ? d.resume() : d.pause()))), () => drift.forEach(d => d.kill()));
  return cleanup;
}

export default { 1: cinematic, 2: carousel, 3: diagnostic };
