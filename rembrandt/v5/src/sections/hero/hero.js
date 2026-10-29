// HERO. Each version is the page's one signature interactive (F17), built from a named reference (PLAN-V6).
// Facts only: since 1995; Bunk founded it, Wade runs it, Rachel answers; (937) 746-7377; 24 towns; the photos are real jobs.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { img } from '../../js/main.js';
import { EASE, lines, clipIn, words } from '../../js/fx.js';
import { TOWNS } from '../../data/towns.js';

// v1 ⟦S1321⟧ cinematic: media first (clip inset 100% -> 0 over 1.1s power4.out, image 1.08 -> 1 over 1.2s), then the
// headline lines (yPercent 100 -> 0, blur 8 -> 0, 1.0s, stagger 0.11), then the copy by words (yPercent 110, blur 8,
// 0.9s, stagger 0.055), the CTA last (y 32, 0.9s). The image sits 120% tall in an overscanned frame and parallaxes
// 0.18 of the viewport as the hero leaves (scrub 1.2); mouse layers via data-pd (depth.js, quickTo 0.8 power3.out).
function cinematic(root, c) {
  root.classList.add('is-run');
  if (!c.motion) return;
  const im = root.querySelector('.hx1-img');
  gsap.to(im, { y: () => -innerHeight * 0.18, ease: 'none', scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: 1.2, invalidateOnRefresh: true } });
  const [ws, unsplit] = words(root.querySelector('.hx1-p'));
  gsap.timeline({ delay: c.swap ? 0 : 0.1 })
    .add(clipIn(root.querySelector('.hx1-media')), 0)
    .add(lines(root.querySelector('.hx1-h')), 0.35)
    .fromTo(ws, { yPercent: 110, autoAlpha: 0, filter: 'blur(8px)' }, { yPercent: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 0.9, ease: EASE, stagger: 0.055 }, 0.75)
    .fromTo(root.querySelector('.hx1-cta'), { y: 32, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, ease: EASE }, 1.0);
  return unsplit;
}

// v2 [BANK] Smeulders Interieurgroep project carousel (deep read 506; live site): fullscreen jobs under a slow drift
// (scale to 1.06), the title set in image-filled type (background-clip:text, background 150% wide, offset from centre,
// a glass rim of stacked drop-shadows), a "1 / N" counter that updates on complete, prev/next and a circular link.
// Measured values: outgoing power2.in 0.7s; incoming power3.out 1.1s; crossfades power1.inOut; title words y 24 -> 0
// over 0.85s power3.out, stagger 0.06, delay 0.15; subtitle words 0.7s, stagger 0.08; visual settles over 0.7s; the
// CTA rises from y 64 / scale 0.92 over 0.85s. Adapted: the letters hold the same job seen another way; on the ba2
// slide they hold the house BEFORE while the photo shows it AFTER (the one genuine pair). Autoplay every 6s with a
// visible pause (WCAG 2.2.2); off under reduced motion.
const HOLD = 6, DRIFT = { scale: 1.06, xPercent: -2.4 };
function carousel(root, c) {
  root.classList.add('is-run');
  const slides = [...root.querySelectorAll('.hx2-slide')], N = slides.length;
  const h = root.querySelector('.hx2-h'), layers = [...h.querySelectorAll('.hx2-fill')];
  const cap = root.querySelector('.hx2-cap'), count = root.querySelector('.hx2-count b'), pause = root.querySelector('.hx2-pause');
  const t = c.motion ? 1 : 0;

  // the title: each word clips the shared image box (so words can move one by one)
  for (const l of layers) {
    const text = l.textContent.replace(/\s+/g, ' ').trim(); l.textContent = '';
    text.split(' ').forEach((w, i) => { if (i) l.append(' '); const s = document.createElement('span'); s.className = 'hx2-w'; s.textContent = w; l.append(s); });
  }
  const fills = slides.map(s => ({ uri: img(s.dataset.fill), a: 1.5 }));
  fills.forEach(f => { if (!f.uri) return; const i = new Image(); i.onload = () => { f.a = i.naturalWidth / i.naturalHeight; layout(); }; i.src = f.uri; });
  const shown = [0, 0]; // which slide's fill each layer holds
  function paint(l, k) {
    const f = fills[k], W = h.clientWidth, H = h.clientHeight;
    const S = Math.max(W * 1.5, H * f.a * 1.4), SH = S / f.a, bx = (W - S) / 2, by = (H - SH) / 2;
    l.style.setProperty('--fill', `url("${f.uri}")`);
    for (const w of l.children) {
      w.style.backgroundSize = `100% 100%, ${S.toFixed(0)}px ${SH.toFixed(0)}px`;
      w.style.backgroundPosition = `0 0, calc(${(bx - w.offsetLeft).toFixed(1)}px + var(--mx, 0px)) calc(${(by - w.offsetTop).toFixed(1)}px + var(--my, 0px))`;
    }
  }
  function layout() { layers.forEach((l, i) => paint(l, shown[i])); }
  if (fills.every(f => f.uri)) { h.classList.add('is-filled'); layout(); }
  const ro = new ResizeObserver(() => layout()); ro.observe(h);

  // slides
  let cur = 0, front = 0, playing = c.motion, timer = null, inView = true;
  const drift = s => gsap.fromTo(s.querySelector('.hx2-img'), { scale: 1, xPercent: 0 }, { ...DRIFT, duration: HOLD + 1.1, ease: 'none', overwrite: 'auto' });
  function setCap(k) {
    const txt = slides[k].dataset.caption || '';
    if (cap.textContent === txt) return;
    cap.textContent = txt;
    if (txt && t) gsap.fromTo(cap, { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, ease: 'power3.out', delay: 0.08 });
  }
  function go(n) {
    n = (n + N) % N; if (n === cur) return;
    const out = slides[cur], inn = slides[n];
    slides.forEach((s, i) => { s.style.zIndex = i === n ? 2 : i === cur ? 1 : 0; s.setAttribute('aria-hidden', i === n ? 'false' : 'true'); s.classList.toggle('is-on', i === n || i === cur); });
    gsap.to(out, { autoAlpha: 0, duration: 0.7 * t, ease: 'power2.in', overwrite: 'auto', onComplete: () => out.classList.remove('is-on') });
    gsap.fromTo(inn, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.1 * t, ease: 'power3.out', overwrite: 'auto', onComplete: () => { count.textContent = n + 1; } });
    if (t) drift(inn); else count.textContent = n + 1;
    // the title's fill crossfades to the incoming job
    const back = 1 - front; shown[back] = n; paint(layers[back], n);
    gsap.to(layers[back], { autoAlpha: 1, duration: 1.1 * t, ease: 'power1.inOut', overwrite: 'auto' });
    gsap.to(layers[front], { autoAlpha: 0, duration: 1.1 * t, ease: 'power1.inOut', overwrite: 'auto' });
    layers[back].classList.add('is-on'); layers[front].classList.remove('is-on'); front = back;
    setCap(n); cur = n; arm();
  }
  function arm() { if (timer) timer.kill(); timer = playing && inView ? gsap.delayedCall(HOLD, () => go(cur + 1)) : null; }
  function setPlaying(p) { playing = p; pause.setAttribute('aria-pressed', String(!p)); arm(); } // a toggle: pressed = paused
  slides.forEach((s, i) => s.setAttribute('aria-hidden', i ? 'true' : 'false'));
  gsap.set(layers[1], { autoAlpha: 0 });
  const onClick = e => {
    const b = e.target.closest('.hx2-btn'); if (!b) return;
    if (b === pause) setPlaying(!playing); else go(cur + Number(b.dataset.dir));
  };
  root.addEventListener('click', onClick);
  ScrollTrigger.create({ trigger: root, start: 'top bottom', end: 'bottom top', onToggle: s => { inView = s.isActive; arm(); } });
  setPlaying(playing);
  const done = [() => ro.disconnect(), () => timer && timer.kill(), () => root.removeEventListener('click', onClick)];
  const cleanup = () => done.forEach(f => f());
  if (!t) return cleanup;
  // the fill follows the pointer a little (live site: background-position calc(50% + Xpx)), opposing the move
  const off = { x: 0, y: 0 }, setOff = () => { h.style.setProperty('--mx', off.x.toFixed(1) + 'px'); h.style.setProperty('--my', off.y.toFixed(1) + 'px'); };
  const qx = gsap.quickTo(off, 'x', { duration: 0.8, ease: 'power3.out', onUpdate: setOff }), qy = gsap.quickTo(off, 'y', { duration: 0.8, ease: 'power3.out', onUpdate: setOff });
  const onMove = e => { if (!c.fine || e.pointerType !== 'mouse') return; qx(-(e.clientX / innerWidth - 0.5) * 80); qy(-(e.clientY / innerHeight - 0.5) * 40); };
  root.addEventListener('pointermove', onMove, { passive: true }); done.push(() => root.removeEventListener('pointermove', onMove));

  // entrance, in the measured order
  const [sub, unsplit] = words(root.querySelector('.hx2-sub')); done.push(unsplit);
  drift(slides[0]);
  gsap.timeline({ delay: c.swap ? 0 : 0.1 })
    .fromTo(slides[0], { scale: 1.06, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.7, ease: 'power3.out' }, 0)
    .fromTo(root.querySelectorAll('.hx2-rule--v'), { scaleY: 0 }, { scaleY: 1, duration: 1.1, ease: 'power3.out' }, 0.3)
    .fromTo(root.querySelectorAll('.hx2-rule--h'), { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: 'power3.out' }, 0.3)
    .fromTo(layers[0].children, { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.85, ease: 'power3.out', stagger: 0.06 }, 0.15)
    .fromTo(sub, { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, ease: 'power3.out', stagger: 0.08 }, 0.45)
    .fromTo(root.querySelector('.hx2-ctl'), { y: 64, scale: 0.92, autoAlpha: 0 }, { y: 0, scale: 1, autoAlpha: 1, duration: 0.85, ease: 'power3.out' }, 0.85);
  return cleanup;
}

// v3 [BANK] West London Roofing (crowned trade hero, live site): copy left, a real job right, the phone as the route,
// a low-friction entry (anatomy F3: their postcode checker becomes "Is your town on our list?"), a small facts grid.
// Motion is CSS only at the F17 dose (hero.css). The checker answers from the firm's 24 towns with Census distances.
const norm = s => s.toLowerCase().replace(/[^a-z ]/g, '').replace(/\s+/g, ' ').trim();
function trade(root) {
  const form = root.querySelector('.hx3-check'), input = form.querySelector('input'), ans = form.querySelector('.hx3-ans');
  if (!form.querySelector('datalist')) {
    const dl = document.createElement('datalist'); dl.id = 'hx3-towns';
    TOWNS.forEach(t => { const o = document.createElement('option'); o.value = t.name; dl.append(o); });
    form.append(dl); input.setAttribute('list', dl.id);
  }
  let last = '', wait = null;
  function answer() {
    const q = norm(input.value);
    let html = '';
    if (q) {
      const hit = TOWNS.find(t => norm(t.name) === q) || (q.length >= 3 ? TOWNS.find(t => norm(t.name).startsWith(q)) : null);
      if (hit && hit.mi === 0) html = `Yes. <b>Springboro</b> is home: the office is at 38 N Pioneer Blvd.`;
      else if (hit) html = `Yes. <b>${hit.name}</b> is ${hit.mi} miles from our Springboro office, as the crow flies.`;
      else if (q.length >= 3) html = 'Not on our list of 24. Call and ask: (937) 746-7377.';
    }
    if (html === last) return;
    last = html; ans.innerHTML = html;
    ans.classList.remove('is-new'); void ans.offsetWidth; ans.classList.add('is-new');
  }
  const onInput = () => { clearTimeout(wait); wait = setTimeout(answer, 350); };
  const onSubmit = e => { e.preventDefault(); clearTimeout(wait); answer(); };
  input.addEventListener('input', onInput); form.addEventListener('submit', onSubmit);
  return () => { clearTimeout(wait); input.removeEventListener('input', onInput); form.removeEventListener('submit', onSubmit); };
}

export default { 1: cinematic, 2: carousel, 3: trade };
