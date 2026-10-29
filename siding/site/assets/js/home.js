/* Austin Pro homepage v2 (DIRECTION-HOME-V2.md). One live version per section; the others wait in <template>s.
   Motion rules from the Skill Pack: GSAP + ScrollTrigger, Lenis on desktop only, reduced motion = finished states
   (S0400/S0652), UI under 300 ms, reveals once (S1321), pins desktop only, every drag has a key/tap path (S0070). */
(() => {
  'use strict';
  const d = document, root = d.documentElement;
  const $ = (s, el = d) => el.querySelector(s);
  const $$ = (s, el = d) => Array.from(el.querySelectorAll(s));
  const G = window.gsap, ST = window.ScrollTrigger;
  if (G && ST) G.registerPlugin(ST);
  const DATA = JSON.parse($('#home-data').textContent);
  const PINS = DATA.map.pins;

  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* storage blocked: picks still work for this visit */ } }
  };
  const mqReduce = matchMedia('(prefers-reduced-motion: reduce)');
  const mqFine = matchMedia('(hover: hover) and (pointer: fine)');
  const mqDesk = matchMedia('(min-width: 900px)');
  let userMotion = store.get('ap-motion');
  const motionOK = () => !!G && (userMotion ? userMotion === 'on' : !mqReduce.matches);
  const setMotionClass = () => root.classList.toggle('motion', motionOK());
  setMotionClass();

  const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  const usd2 = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const pmt = (P, apr, n) => apr === 0 ? P / n : P * (apr / 12) / (1 - Math.pow(1 + apr / 12, -n));
  const pv = (M, apr, n) => apr === 0 ? M * n : M * (1 - Math.pow(1 + apr / 12, -n)) / (apr / 12);
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const ym = m => `${MONTHS[m % 100 - 1]} 20${String(Math.floor(m / 100)).padStart(2, '0')}`;
  const hdH = () => ($('.hd') || { offsetHeight: 0 }).offsetHeight;
  const AU = p => (window.__apUrl ? window.__apUrl(p) : p);   // single-file build: asset table blob URLs
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const CREW_RX = /\b(Kevin(?: Harris)?|Garret{1,2}|Tracy|Paul Hale|Paul Schantz(?:'s)?|Taylor(?: Anderson)?|Jake|Jerry|Maria|Shorty)\b/g;
  const markNames = s => esc(s).replace(CREW_RX, '<mark>$1</mark>');
  const tradesOf = bits => DATA.map.sv.filter((_, i) => bits & (1 << i)).join(', ');
  const ease = { out: 'power3.out', x: 'expo.out', io: 'power4.inOut' };

  /* a bag of listeners, observers and timers, cleared when a version is switched out (S1315 leak rules) */
  function bag() {
    const fns = [];
    return {
      on(el, ev, fn, opt) { el.addEventListener(ev, fn, opt); fns.push(() => el.removeEventListener(ev, fn, opt)); },
      io(el, cb, opt) { const o = new IntersectionObserver(cb, opt); o.observe(el); fns.push(() => o.disconnect()); return o; },
      ro(el, cb) { if (!window.ResizeObserver) return; const o = new ResizeObserver(cb); o.observe(el); fns.push(() => o.disconnect()); },
      add(fn) { fns.push(fn); },
      clear() { while (fns.length) { try { fns.pop()(); } catch (e) { /* already gone */ } } }
    };
  }

  /* ---------- smooth scroll: Lenis, desktop pointer only, never under reduced motion (S0403, S1209) ---------- */
  let lenis = null;
  const lenisTick = t => lenis && lenis.raf(t * 1000);
  function lenisSync() {
    const want = motionOK() && mqFine.matches && mqDesk.matches && !!window.Lenis && !!ST;
    if (want && !lenis) {
      lenis = new window.Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true });
      lenis.on('scroll', ST.update);
      G.ticker.add(lenisTick);
      G.ticker.lagSmoothing(0);
    } else if (!want && lenis) {
      G.ticker.remove(lenisTick);
      lenis.destroy();
      lenis = null;
    }
  }
  function syncFx() { if (window.APFX) { window.APFX.motion = motionOK(); window.APFX.sync(); } if (window.APV4) window.APV4.sync(motionOK()); }
  function jumpBy(dy) { if (!dy) return; if (lenis) lenis.scrollTo(window.scrollY + dy, { immediate: true, force: true }); else window.scrollBy(0, dy); }
  function goTo(el) {
    const y = el.getBoundingClientRect().top + window.scrollY - hdH();
    if (lenis) lenis.scrollTo(y, { duration: 1.1 });
    else window.scrollTo({ top: y, behavior: motionOK() ? 'smooth' : 'auto' });
  }

  /* ---------- words: masked rise for headings (S0451); accessible name kept on the heading ---------- */
  function splitWords(el) {
    if (el.dataset.splitDone) return $$('.w', el);
    el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim());
    const walker = d.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(n => {
      const frag = d.createDocumentFragment();
      n.textContent.split(/(\s+)/).forEach(p => {
        if (!p) return;
        if (/^\s+$/.test(p)) { frag.appendChild(d.createTextNode(p)); return; }
        const m = d.createElement('span'); m.className = 'wm'; m.setAttribute('aria-hidden', 'true');
        const w = d.createElement('span'); w.className = 'w'; w.textContent = p;
        m.appendChild(w); frag.appendChild(m);
      });
      n.replaceWith(frag);
    });
    el.dataset.splitDone = '1';
    return $$('.w', el);
  }
  /* ---------- headings: each section enters its own way, all inside the parameter library's reveal band (builder
     brief 3: reveals 0.4-0.8 s, staggers 0.02-0.12, no rotation of text, G5 in AUDIT-V3); the phrase stays in
     aria-label ---------- */
  const once = (el, start = 'top 86%') => ({ trigger: el, start, once: true });
  function heads(rootEl, s) {
    $$('[data-split]', rootEl).forEach(el => {
      if (!motionOK()) { el.classList.add('is-split'); return; }
      const words = splitWords(el);
      el.classList.add('is-split');
      const first = s.key === 'hero' && !s.switched;
      const st = first ? undefined : once(el);
      switch (s.key) {
        case 'hero':      // R3 blur-in, headlines only: 0.4 s power1.out, blur 10 px and 15 px to rest
          G.from(words, { y: 15, filter: 'blur(10px)', autoAlpha: 0, duration: 0.4, ease: 'power1.out', stagger: 0.05, delay: first ? 0.1 : 0, scrollTrigger: st, clearProps: 'filter' }); break;
        case 'services':  // R2 masked word reveal: 0.6 s expo.out, stagger 0.05, words rise from under the mask
          G.from(words, { yPercent: 110, duration: 0.6, ease: 'expo.out', stagger: 0.05, scrollTrigger: st }); break;
        case 'work':      // Q40 direction-aware variant: words slide in from the left under their mask
          G.from(words, { xPercent: -110, duration: 0.6, ease: 'expo.out', stagger: 0.045, scrollTrigger: st }); break;
        case 'built':     // slide-up reveal: 0.8 s power2.out, stagger 0.02, autoAlpha + yPercent
          G.from(words, { yPercent: 60, autoAlpha: 0, duration: 0.8, ease: 'power2.out', stagger: 0.02, scrollTrigger: st }); break;
        case 'colour':    // words arrive in paint and dry to ink
          G.from(words, { color: '#D42125', yPercent: 40, autoAlpha: 0, duration: 0.6, ease: 'power3.out', stagger: 0.05, scrollTrigger: st }); break;
        case 'near':      // masked drop from above
          G.from(words, { yPercent: -110, duration: 0.6, ease: 'expo.out', stagger: 0.05, scrollTrigger: st }); break;
        case 'reviews':   // S1329 staggered words: opacity and 12 px, 0.05 s apart
          G.from(words, { autoAlpha: 0, y: 12, duration: 0.6, ease: 'power2.out', stagger: 0.05, scrollTrigger: st }); break;
        case 'money':     // quiet fade, the figures below do the talking
          G.from(words, { autoAlpha: 0, duration: 0.4, ease: 'power1.out', stagger: 0.08, scrollTrigger: st }); break;
        case 'book':      // S1334: words about 72 ms apart, settling from a little large
          G.from(words, { scale: 1.12, autoAlpha: 0, duration: 0.6, ease: 'power3.out', stagger: 0.072, transformOrigin: '0% 100%', scrollTrigger: st }); break;
        default:          // R2 masked word reveal
          G.from(words, { yPercent: 110, duration: 0.6, ease: 'expo.out', stagger: 0.05, scrollTrigger: st });
      }
    });
  }
  function riseIn(els, opts = {}) {
    if (!motionOK() || !els.length) return;
    G.from(els, Object.assign({ y: 16, autoAlpha: 0, duration: 0.6, ease: ease.out, stagger: 0.08 }, opts));
  }

  /* ---------- count-up trust stats (R20). One tempo for the page (Playbook 2): 1.4 s power2.out, inside Feldco's
     1.2-1.6 s band. The final figure is written in the HTML; the counting copy is aria-hidden and an sr-only twin
     keeps the real number. opts.st(el) returns a ScrollTrigger config when the count waits for the scroll. ---------- */
  function countUp(els, opts = {}) {
    els.forEach((el, k) => {
      const final = el.textContent.trim(), m = final.match(/^([^\d]*)([\d,]*\.?\d+)(.*)$/);
      if (!m) return;
      const sr = d.createElement('span'); sr.className = 'sr-only'; sr.textContent = final; el.before(sr); el.setAttribute('aria-hidden', 'true');
      if (!motionOK()) return;
      const dec = (m[2].split('.')[1] || '').length, to = parseFloat(m[2].replace(/,/g, '')), o = { v: 0 };
      const fmt = v => m[1] + v.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + m[3];
      el.textContent = fmt(0);
      G.to(o, { v: to, duration: 1.4, ease: 'power2.out', delay: (opts.delay || 0) + k * 0.08, scrollTrigger: opts.st ? opts.st(el) : undefined,
        onUpdate: () => { el.textContent = fmt(o.v); }, onComplete: () => { el.textContent = final; } });
    });
  }

  /* ---------- odometer: only changed digits roll, 260 ms (S0652) ---------- */
  function Odo(el) {
    let cur = '';
    const strip = c => `<span class="oc" aria-hidden="true"><span class="os" style="transform:translateY(-${c * 10}%)">${'0123456789'.split('').map(n => `<span>${n}</span>`).join('')}</span></span>`;
    return text => {
      if (text === cur) return;
      if (text.length !== cur.length || !motionOK()) {
        el.innerHTML = [...text].map(c => /\d/.test(c) ? strip(c) : `<span class="ox" aria-hidden="true">${esc(c)}</span>`).join('') + `<span class="sr-only">${esc(text)}</span>`;
      } else {
        el.lastElementChild.textContent = text;
        const slots = el.children;
        [...text].forEach((c, i) => {
          if (c === cur[i]) return;
          const slot = slots[i];
          if (/\d/.test(c) && slot && slot.classList.contains('oc')) slot.firstChild.style.transform = `translateY(-${c * 10}%)`;
          else if (slot) slot.outerHTML = /\d/.test(c) ? strip(c) : `<span class="ox" aria-hidden="true">${esc(c)}</span>`;
        });
      }
      cur = text;
    };
  }

  /* ---------- rolling figures for the proof index: two turns of the drum, 1.1 s expo, columns 70 ms apart ---------- */
  function rollIn(el, delay) {
    const val = el.dataset.roll;
    if (!motionOK()) return;
    const drum = '01234567890123456789'.split('').map(n => `<span>${n}</span>`).join('');
    el.innerHTML = `<span aria-hidden="true" style="display:inline-flex">${[...val].map(c => /\d/.test(c) ? `<span class="rc"><span class="rs" data-to="${c}">${drum}</span></span>` : `<span class="rx">${esc(c)}</span>`).join('')}</span><span class="sr-only">${esc(val)}</span>`;
    const strips = $$('.rs', el);
    G.fromTo(strips, { yPercent: 0 }, { yPercent: i => -(10 + +strips[i].dataset.to) * 5, duration: 1.1, ease: ease.x, stagger: 0.07, delay, scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
  }

  /* ---------- the logo's 2x2 window: four panes open from the centre cross (house motif) ---------- */
  function panesOpen(panes, delay = 0) {
    if (!motionOK()) { panes.forEach(p => G && G.set(p, { scale: 0 })); return null; }
    G.set(panes, { scale: 1 });
    return G.to(panes, { scale: 0, duration: 1, ease: ease.io, stagger: { each: 0.06, from: 'center' }, delay });
  }

  /* ---------- drag helper: pointer capture, 10 px direction lock so vertical page scroll is never trapped (S1443) ---------- */
  function hdrag(el, b, { onMove, onStart, onEnd, handle }) {
    let sx = 0, sy = 0, id = null, live = false;
    b.on(el, 'pointerdown', e => {
      if (e.button > 0 || e.target.closest('button:not(.cmp-handle):not(.c3-handle), a')) return;
      sx = e.clientX; sy = e.clientY; id = e.pointerId; live = false;
      if ((handle && e.target.closest(handle)) || e.pointerType === 'mouse') { live = true; el.setPointerCapture(id); onStart && onStart(e); onMove(e); }
    });
    b.on(el, 'pointermove', e => {
      if (e.pointerId !== id) return;
      if (!live) {
        const dx = Math.abs(e.clientX - sx), dy = Math.abs(e.clientY - sy);
        if (dx < 10 && dy < 10) return;
        if (dx > dy) { live = true; el.setPointerCapture(id); onStart && onStart(e); } else { id = null; return; }
      }
      onMove(e);
    });
    const end = e => { if (e.pointerId !== id) return; if (live) onEnd && onEnd(e); id = null; live = false; };
    b.on(el, 'pointerup', end); b.on(el, 'pointercancel', end); b.on(el, 'lostpointercapture', end);
  }
  function sliderKeys(handle, b, get, set) {
    b.on(handle, 'keydown', e => {
      const step = e.shiftKey ? 10 : 5;
      const map = { ArrowLeft: -step, ArrowDown: -step, ArrowRight: step, ArrowUp: step };
      if (e.key in map) { e.preventDefault(); set(get() + map[e.key]); }
      else if (e.key === 'Home') { e.preventDefault(); set(0); }
      else if (e.key === 'End') { e.preventDefault(); set(100); }
    });
  }

  /* ---------- radio groups: one Tab stop, arrows move and select (S0070) ---------- */
  function radios(group, b, onPick, sel = '[role="radio"]') {
    const items = () => $$(sel, group).filter(x => !x.hidden && !x.closest('[hidden]'));
    const pick = (it, focus) => {
      items().forEach(x => { const on = x === it; x.setAttribute('aria-checked', on); x.tabIndex = on ? 0 : -1; });
      if (focus) it.focus();
      onPick(it);
    };
    const all = items();
    const cur = all.find(x => x.getAttribute('aria-checked') === 'true') || all[0];
    all.forEach(x => { x.tabIndex = x === cur ? 0 : -1; });
    b.on(group, 'click', e => { const it = e.target.closest(sel); if (it && group.contains(it)) pick(it); });
    b.on(group, 'keydown', e => {
      const list = items(); const i = list.indexOf(d.activeElement); if (i < 0) return;
      let n = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = list[(i + 1) % list.length];
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = list[(i - 1 + list.length) % list.length];
      else if (e.key === 'Home') n = list[0]; else if (e.key === 'End') n = list[list.length - 1];
      if (n) { e.preventDefault(); pick(n, true); }
    });
    return pick;
  }

  /* ========================================================================================
     VERSIONS
     ======================================================================================== */
  const V = {};

  /* HERO 1: Q38 SVG mask transitions / R6 blinds (30 slits, stagger 0.02): the after photo installs over the before
     in lap courses, bottom-up. Played once on load, not scrubbed (F17: no scroll gate), 0.6 s per course so the whole
     reveal lands in about 1.2 s; pointer depth from fx.js (S1330); scroll parallax 0.18 (S1321) */
  V.hero1 = (r, b) => {
    const fr = $('.h1-frame', r), crs = $$('.crs', fr), btn = $('.h1-replay', r);
    const order = crs.slice().reverse();
    const shut = 'inset(0% 100% 0% 0%)', open = 'inset(0% 0% 0% 0%)';
    const laps = $$('.h1-c', fr).reverse();
    // v4: each course lands with its own lap shadow line and two nail heads, then the lines fade back into the photo
    const nails = delay => laps.forEach((g, i) => {
      G.timeline({ delay: delay + i * 0.02 + 0.42 }).fromTo(g, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.12, ease: 'none' })
        .fromTo($$('.h1-n', g), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.3, ease: 'back.out(1.7)', stagger: 0.05 }, 0)
        .to(g, { autoAlpha: 0, duration: 0.6, ease: 'power2.in' }, 1.1 + (29 - i) * 0.01);
    });
    const play = delay => { nails(delay); return G.fromTo(order, { clipPath: shut }, { clipPath: open, duration: 0.6, ease: 'power3.out', stagger: 0.02, delay, overwrite: true }); };
    if (!motionOK()) { btn.hidden = true; return; }
    G.set(order, { clipPath: shut });
    play(0.35);
    G.from($('.h1-b', fr), { scale: 1.04, duration: 1.2, ease: ease.x });
    riseIn($$('.pstrip, .lead, .ctas', r), { delay: 0.3, duration: 0.5, stagger: 0.06 });
    b.on(btn, 'click', () => { G.set(order, { clipPath: shut }); play(0.1); });
    if (mqDesk.matches && ST) G.to($$('.h1-b, .h1-courses', fr), { yPercent: 9, ease: 'none', scrollTrigger: { trigger: r, start: 'top top', end: 'bottom top', scrub: 1.2 } });
  };

  /* HERO 2: Stronghold crown 1. The proof strip sits above the headline and the hero is step one of the quote:
     four real job photos as project cards; picking one opens step two in place with that trade's published median
     band, middle half and monthly estimate, and a booking button already set to the trade (Neil Kelly picker).
     CSS motion only at Stronghold's dose (0.15-0.28 s). Without JS the cards are links to the services section. */
  V.hero2 = (r, b) => {
    const T = JSON.parse($('.h2-data', r).textContent), step1 = $('.h2-step1', r), res = $('.h2-res', r);
    const f = k => $(`[data-f="${k}"]`, res);
    let from = null;
    const open = c => {
      const t = T[c.dataset.t]; from = c;
      const im = f('img'); im.src = AU(t.img); im.alt = t.alt;
      ['name', 'n', 'med', 'mid', 'mo', 'cap'].forEach(k => { f(k).textContent = t[k]; });
      const band = f('band'), X = v => 10 + v / 50 * 480;   // the median band slides along the tape blade
      band.setAttribute('x', X(t.lo).toFixed(1)); band.setAttribute('width', (X(t.hi) - X(t.lo)).toFixed(1));
      const bk = f('book'); bk.dataset.trade = t.book; bk.textContent = `Book a free ${t.name.toLowerCase()} inspection`;
      step1.hidden = true; res.hidden = false; r.dataset.step = '2';
      f('head').focus({ preventScroll: true });
      if (res.getBoundingClientRect().top < hdH()) goTo(r);
    };
    $$('.h2c', r).forEach(c => b.on(c, 'click', e => { e.preventDefault(); open(c); }));
    b.on(f('back'), 'click', () => { res.hidden = true; step1.hidden = false; r.dataset.step = '1'; if (from) from.focus({ preventScroll: true }); });
    riseIn($$('.pstrip, .lead, .h2-step1 > .h2-k, .h2-cards > li, .h2-more', r), { delay: 0.3, duration: 0.5, stagger: 0.06 });
  };

  /* HERO 3: Feldco crown 2, as R33 poster frames (the live site's film can't be verified as the firm's job, so
     photographs carry it): five job photos cross-fade every 5 s with a slow settle; the chip names place, month and
     trades. Runs only while in view and the tab is visible, with a pause button (WCAG 2.2.2); still under reduced
     motion. The stat band counts up once in trade units (R20). */
  V.hero3 = (r, b) => {
    const fr = $$('.h3f', r), C = JSON.parse($('.h3-data', r).textContent), cap = $('[data-h3-cap]', r), no = $('[data-h3-no]', r), pz = $('.h3-pause', r);
    let k = 0, t = 0, vis = false, paused = !motionOK();
    const glint = $('.h3-glint', r);
    const sweep = () => { if (!motionOK() || !glint) return; const w = r.querySelector('.h3-panel').offsetWidth; G.fromTo(glint, { x: -w * 0.3, opacity: 1 }, { x: w * 1.1, duration: 0.65, ease: 'power2.inOut', onComplete: () => G.set(glint, { opacity: 0 }) }); };
    const show = n => { fr[k].classList.remove('on'); k = (n + fr.length) % fr.length; fr[k].classList.add('on'); cap.textContent = C[k]; no.textContent = String(k + 1).padStart(2, '0'); sweep(); };
    const run = () => { clearInterval(t); t = 0; if (vis && !paused && !d.hidden) t = setInterval(() => show(k + 1), 5000); };
    const label = () => { pz.setAttribute('aria-pressed', paused); pz.textContent = paused ? 'Play' : 'Pause'; };
    b.io(r, ([en]) => { vis = en.isIntersecting; run(); });
    b.on(d, 'visibilitychange', run);
    b.on(pz, 'click', () => { paused = !paused; label(); run(); });
    label();
    b.add(() => clearInterval(t));
    countUp($$('.h3-stats b', r), { delay: 0.4 });
    riseIn($$('.h3-copy > .pstrip, .h3-date, .h3-copy > .lead, .h3-copy > .ctas', r), { delay: 0.3, duration: 0.5, stagger: 0.06 });
  };

  /* PROOF 1: #317 Digital Butlers "Proof, not promises": the counts, with the map's own arithmetic printed under
     886 (anatomy F12). Count-ups at the page's one tempo (R20); 4.9 as a ring drawn to 98 % (S0197: r 40, stroke 8,
     round cap, -90 deg); credentials rise 0.1 s apart */
  V.proof1 = (r, b) => {
    const ring = $('.r49-v', r), ghost = $('.p1-ghost', r);
    countUp($$('[data-count]', r), { st: el => once(el, 'top 92%') });
    if (!motionOK()) return;
    /* v4 3D where earned (Q165 Depth Text, CSS only): the counts are extruded signs whose depth turns away from the
       pointer, lerp 0.14, 12 layers; loop sleeps when settled; a still pose without motion or on touch */
    if (mqFine.matches) {
      const nums = $$('.rc b', r), D = { x: 1, y: 1, tx: 1, ty: 1 }, shade = i => { const p = i / 11; return `rgb(${Math.round(207 - p * p * 80)},${Math.round(203 - p * p * 82)},${Math.round(194 - p * p * 82)})`; };
      let raf2 = 0;
      const paint = () => {
        raf2 = 0;
        D.x += (D.tx - D.x) * 0.14; D.y += (D.ty - D.y) * 0.14;
        const st = []; for (let i = 1; i <= 12; i++) st.push(`${(D.x * i * 0.75).toFixed(2)}px ${(D.y * i * 0.75).toFixed(2)}px 0 ${shade(i - 1)}`);
        st.push(`${(D.x * 10).toFixed(1)}px ${(D.y * 10).toFixed(1)}px 14px rgba(0,0,0,.12)`);
        nums.forEach(n => { n.style.textShadow = st.join(','); });
        if (Math.abs(D.tx - D.x) + Math.abs(D.ty - D.y) > 0.004) raf2 = requestAnimationFrame(paint);
      };
      b.on(r, 'pointermove', e => { const rc = r.getBoundingClientRect(); D.tx = clamp(-(e.clientX - rc.left - rc.width / 2) / (rc.width / 2) * 1.4, -1.4, 1.4); D.ty = clamp(-(e.clientY - rc.top - rc.height / 2) / (rc.height / 2) * 1.4, -1.4, 1.4); if (!raf2) raf2 = requestAnimationFrame(paint); });
      b.on(r, 'pointerleave', () => { D.tx = 1; D.ty = 1; if (!raf2) raf2 = requestAnimationFrame(paint); });
      b.add(() => { cancelAnimationFrame(raf2); nums.forEach(n => { n.style.textShadow = ''; }); });
    }
    G.from($$('.bq', r), { y: -14, autoAlpha: 0, duration: 0.45, ease: 'back.out(1.5)', stagger: 0.12, scrollTrigger: once($('.b886', r), 'top 92%') });
    if (ring) G.fromTo(ring, { strokeDashoffset: () => ring.style.getPropertyValue('--c') }, { strokeDashoffset: () => ring.style.getPropertyValue('--off'), duration: 1.4, ease: 'power2.out', scrollTrigger: once(ring, 'top 92%') });
    G.from($$('.creds li', r), { y: 24, autoAlpha: 0, duration: 0.5, ease: ease.out, stagger: 0.1, scrollTrigger: once($('.p1-foot', r), 'top 92%') });
    if (ghost && mqDesk.matches && ST) G.to(ghost, { yPercent: -22, ease: 'none', scrollTrigger: { trigger: r, start: 'top bottom', end: 'bottom top', scrub: 1.2 } });
  };
  /* PROOF 2: Georgia Contractor Group's "at a glance" table: the credentials as one scannable unit, the record beside
     it. Rows enter as a staggered group (R5, never static); pointing at a row lifts its badge (CSS scale-in .18 s) */
  V.proof2 = (r, b) => {
    if (!motionOK()) return;
    G.from($$('.gl-table tbody tr', r), { y: 18, autoAlpha: 0, duration: 0.5, ease: ease.out, stagger: 0.08, scrollTrigger: once($('.gl-table', r), 'top 85%') });
    G.from($$('.gl-lead, .gl-base .gl-r, .gl-head .btn-alt', r), { y: 14, autoAlpha: 0, duration: 0.5, ease: ease.out, stagger: 0.06, scrollTrigger: once($('.gl-head', r), 'top 80%') });
  };
  /* PROOF 3: one sentence lit word by word on scroll (S1327, #292 Scroll Reveal), then the credentials press in like stamps */
  V.proof3 = (r, b) => {
    const p = $('.statement', r);
    if (!motionOK()) return;
    const walker = d.createTreeWalker(p, NodeFilter.SHOW_TEXT);
    const nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(n => { const f = d.createDocumentFragment(); n.textContent.split(/(\s+)/).forEach(t => { if (!t) return; if (/^\s+$/.test(t)) f.appendChild(d.createTextNode(t)); else { const s = d.createElement('span'); s.className = 't'; s.textContent = t; f.appendChild(s); } }); n.replaceWith(f); });
    G.fromTo($$('.t, .ipill', p), { opacity: 0.18 }, { opacity: 1, ease: 'none', stagger: 0.1, scrollTrigger: { trigger: p, start: 'top 82%', end: 'bottom 50%', scrub: 0.4 } });
    // v4: each photo pill is a casement window; its sash swings open as its word lights (scrub, linear)
    $$('.ip-sash', p).forEach(sa => G.fromTo(sa, { scaleX: 1 }, { scaleX: 0.12, ease: 'none', scrollTrigger: { trigger: sa.closest('.ipill'), start: 'top 78%', end: 'top 58%', scrub: 0.4 } }));
    G.from($$('.creds-stamp li', r), { scale: 1.3, autoAlpha: 0, duration: 0.3, ease: 'power4.out', stagger: 0.12, scrollTrigger: once($('.stamps', r), 'top 88%') });   // pressed in, never rotated (builder brief 6)
  };
  /* SERVICES 1: point at the house. Each part of the traced Rob Roy elevation opens its trade; the part becomes the
     one lit red part and the rest steps down (S0526 selection). Hover previews, press commits; the radio buttons are
     the DOM mirror of every hit area (S1334, 44 px). */
  V.services1 = (r, b) => {
    const svg = $('.pt-el', r), card = $('.pt-card', r), D = JSON.parse($('.pt-data', r).textContent), seg = $('.pt-parts', r);
    const out = k => $(`[data-pt="${k}"]`, card), book = $('.pt-book', card);
    let committed = 'siding', shown = '';
    /* v4: the chosen part answers in its own trade's way: window glass glints (372 Glare), the lap courses get a
       spirit level whose bubble settles (S0340 detent); one overlay group, rebuilt per pick */
    const NSV = 'http://www.w3.org/2000/svg', fx = d.createElementNS(NSV, 'g');
    fx.setAttribute('class', 'pt-fx'); svg.appendChild(fx); b.add(() => fx.remove());
    const partFx = part => {
      fx.textContent = '';
      const g = $(`g[data-part="${part}"]`, svg); if (!g) return;
      if (part === 'windows') {
        $$('rect, path', g).slice(0, 12).forEach((el, i) => {
          const bb = el.getBBox(); if (bb.width < 12 || bb.height < 12) return;
          const ln = d.createElementNS(NSV, 'line'); ln.setAttribute('class', 'pt-glint');
          ln.setAttribute('x1', bb.x + bb.width * 0.2); ln.setAttribute('y1', bb.y + bb.height * 0.8); ln.setAttribute('x2', bb.x + bb.width * 0.55); ln.setAttribute('y2', bb.y + bb.height * 0.2);
          fx.appendChild(ln);
          G.fromTo(ln, { opacity: 0, x: -bb.width * 0.25 }, { opacity: 0.9, x: bb.width * 0.35, duration: 0.65, ease: 'power2.inOut', delay: i * 0.04, yoyo: true, repeat: 1 });
        });
      } else if (part === 'siding') {
        const bb = g.getBBox(), lv = d.createElementNS(NSV, 'g'); lv.setAttribute('class', 'pt-level');
        const x = bb.x + bb.width * 0.55, y = bb.y + bb.height * 0.45;
        lv.innerHTML = `<rect x="${x - 60}" y="${y - 9}" width="120" height="18" rx="4"/><rect x="${x - 16}" y="${y - 6}" width="32" height="12" rx="6"/><circle class="pt-bub" cx="${x - 9}" cy="${y}" r="4.5"/>`;
        fx.appendChild(lv);
        G.fromTo(lv, { y: -18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.3, ease: 'back.out(1.6)' });
        G.fromTo($('.pt-bub', lv), { x: -10 }, { x: 9, duration: 0.8, ease: 'back.out(1.4)', delay: 0.15 });
        G.to(lv, { autoAlpha: 0, duration: 0.4, delay: 2.2 });
      }
    };
    const show = (part, anim) => {
      const d0 = D[part]; if (!d0 || part === shown) return;
      shown = part;
      svg.dataset.on = part;
      $$('[data-part]', svg).forEach(g => g.classList.toggle('is-on', g.dataset.part === part));
      out('trade').textContent = d0.trade; out('med').textContent = d0.med; out('cnt').textContent = d0.cnt;
      const ex = out('extra'); ex.hidden = !d0.extra; ex.textContent = d0.extra;
      const im = out('img'), ph = im.parentElement;
      if (d0.img) { im.src = AU(d0.img); im.alt = d0.cap; ph.hidden = false; } else ph.hidden = true;
      book.dataset.trade = d0.trade; book.textContent = `Book a ${d0.trade.toLowerCase()} inspection`;
      if (anim && motionOK()) {
        partFx(part);
        G.fromTo([out('trade'), out('med')], { yPercent: 40, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.35, ease: ease.out, stagger: 0.05, overwrite: true });
        if (window.DrawSVGPlugin) G.fromTo($$(`g[data-part="${part}"] path`, svg), { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.6, ease: 'power2.inOut', stagger: 0.01, overwrite: true });
      }
    };
    const pick = radios(seg, b, it => { committed = it.dataset.part; show(committed, true); });
    $$('[data-hit]', svg).forEach(h => {
      b.on(h, 'pointerenter', e => { if (e.pointerType === 'mouse') show(h.dataset.hit, true); });
      b.on(h, 'click', () => { const it = $(`[data-part="${h.dataset.hit}"]`, seg); if (it) pick(it, false); });
    });
    b.on(svg, 'pointerleave', e => { if (e.pointerType === 'mouse') show(committed, true); });
    show('siding', false);
    if (motionOK() && window.DrawSVGPlugin) G.from($$('[data-g] path', svg), { drawSVG: '0%', duration: 0.9, ease: 'power2.inOut', stagger: 0.004, scrollTrigger: once(svg, 'top 80%') });
  };

  /* SERVICES 2: Q571 AHA's numbered services index: an ordered list numbered by CSS counters, with the current /
     total counter (01 of 11) in the intro column following the row you point at or tab to. Trade names answer the
     cursor on Mona Sans's weight and width axes (variable axes); a photo follows the pointer (S1321 hover zoom). */
  V.services2 = (r, b) => {
    const list = $('.ix', r), rows = $$('.ix-row', r), now = $('[data-ix-now]', r);
    rows.forEach((row, k) => { const set = () => { now.textContent = String(k + 1).padStart(2, '0'); }; b.on(row, 'pointerenter', set); b.on(row, 'focus', set); });
    // v4 K72 edge-aware band: the hover band grows from the edge the pointer came in through
    rows.forEach(row => b.on(row, 'pointerenter', e => { const rc = row.getBoundingClientRect(); row.style.setProperty('--edge', e.clientY - rc.top < rc.height / 2 ? '0%' : '100%'); }));
    if (motionOK()) G.from(rows, { yPercent: 40, autoAlpha: 0, duration: 0.5, ease: ease.out, stagger: 0.04, scrollTrigger: once(list, 'top 85%') });
    if (!(mqFine.matches && mqDesk.matches) || !G || !motionOK()) return;
    const names = $$('[data-chars]', r);
    names.forEach(n => {
      if (n.dataset.done) return;
      n.dataset.done = '1';
      n.innerHTML = [...n.textContent].map(c => c === ' ' ? ' ' : `<span class="ch" aria-hidden="true">${esc(c)}</span>`).join('');
    });
    let raf = 0, px = -999, py = -999;
    const chars = () => $$('.ch', list);
    const field = () => { raf = 0; chars().forEach(ch => { const rc = ch.getBoundingClientRect(); const k = Math.max(0, 1 - Math.hypot(px - (rc.left + rc.width / 2), py - (rc.top + rc.height / 2)) / 150); ch.style.setProperty('--k', k.toFixed(3)); }); };
    b.on(list, 'pointermove', e => { px = e.clientX; py = e.clientY; if (!raf) raf = requestAnimationFrame(field); });
    b.on(list, 'pointerleave', () => { px = py = -999; if (!raf) raf = requestAnimationFrame(field); });
    b.add(() => cancelAnimationFrame(raf));
    const peek = $('.ix-peek', r), pim = $('img', peek);
    const qx = G.quickTo(peek, 'x', { duration: 0.45, ease: 'power3' }), qy = G.quickTo(peek, 'y', { duration: 0.45, ease: 'power3' });
    let src = '';
    b.on(list, 'pointermove', e => { const rc = r.getBoundingClientRect(); qx(e.clientX - rc.left + 28); qy(e.clientY - rc.top - peek.offsetHeight * 0.5); });
    rows.forEach(row => b.on(row, 'pointerenter', e => {
      if (+G.getProperty(peek, 'opacity') < 0.05) { const rc = r.getBoundingClientRect(); G.set(peek, { x: e.clientX - rc.left + 28, y: e.clientY - rc.top - peek.offsetHeight * 0.5 }); }   // first show starts at the pointer
      const s = row.dataset.img;
      if (!s) { G.to(peek, { autoAlpha: 0, duration: 0.2 }); return; }
      if (s !== src) { pim.src = AU(s); src = s; }
      G.fromTo(pim, { scale: 1 }, { scale: 1.06, duration: 0.7, ease: ease.out });
      G.to(peek, { autoAlpha: 1, scale: 1, duration: 0.3, ease: ease.out });
    }));
    b.on(list, 'pointerleave', () => G.to(peek, { autoAlpha: 0, scale: 0.96, duration: 0.2 }));
  };

  /* SERVICES 3: a tape measure from $0 to $50k. Pull it (Draggable x with Inertia, snapping to $500, S0184; edge
     resistance 0.85), keys step $500 (Shift $5,000); trades whose middle half covers the mark light up. */
  V.services3 = (r, b) => {
    const tape = $('.tape', r), strip = $('.tape-strip', r), band = $('.tape-band', r), list = $('.tm-list', r), rows = $$('.tm-t', r);
    const vOut = $('[data-tm-v]', r), nOut = $('[data-tm-n]', r);
    const PX = () => strip.offsetWidth / 50;
    const xOf = v => band.clientWidth / 2 - v / 1000 * PX();
    const vOf = x => clamp((band.clientWidth / 2 - x) / PX() * 1000, 0, 50000);
    let val = 15000;
    const hook = $('.tape-hook', r);
    let atEnd = false;
    const upd = v => {
      val = Math.round(v / 500) * 500;
      const end = val === 0 || val === 50000;   // v4: the hook catches at either end of the travel
      if (end && !atEnd && motionOK() && hook) G.fromTo(hook, { rotation: 0 }, { rotation: val ? 14 : -14, duration: 0.14, ease: 'power2.out', yoyo: true, repeat: 1 });
      atEnd = end;
      const f = usd.format(val); vOut.textContent = f;
      tape.setAttribute('aria-valuenow', val); tape.setAttribute('aria-valuetext', f);
      list.style.setProperty('--v', (val / 50000).toFixed(4));
      let n = 0; rows.forEach(rw => { const on = val >= +rw.dataset.lo * 1000 && val <= +rw.dataset.hi * 1000; rw.classList.toggle('is-on', on); if (on) n++; });
      nOut.textContent = n === 1 ? `1 of ${rows.length} trades usually lands here.` : `${n} of ${rows.length} trades usually land here.`;
    };
    let drag = null;
    if (window.Draggable) {
      drag = window.Draggable.create(strip, {
        type: 'x', edgeResistance: 0.85, inertia: !!window.InertiaPlugin && motionOK(), zIndexBoost: false,
        bounds: { minX: xOf(50000), maxX: xOf(0) },
        snap: x => xOf(Math.round(vOf(x) / 500) * 500),
        onDrag() { upd(vOf(this.x)); }, onThrowUpdate() { upd(vOf(this.x)); }, onDragEnd() { upd(vOf(this.x)); }
      })[0];
      b.add(() => drag.kill());
    }
    const setV = (v, anim) => {
      v = clamp(v, 0, 50000);
      upd(v);                               // the value commits at once; only the tape travels (keys can stack)
      if (anim && motionOK()) G.to(strip, { x: xOf(v), duration: 0.35, ease: ease.out, overwrite: true, onComplete: () => drag && drag.update() });
      else { G.set(strip, { x: xOf(v) }); if (drag) drag.update(); }
    };
    b.on(tape, 'keydown', e => {
      const st = e.shiftKey ? 5000 : 500, m = { ArrowRight: st, ArrowUp: st, ArrowLeft: -st, ArrowDown: -st };
      if (e.key in m) { e.preventDefault(); setV(val + m[e.key], true); }
      else if (e.key === 'Home') { e.preventDefault(); setV(0, true); }
      else if (e.key === 'End') { e.preventDefault(); setV(50000, true); }
    });
    b.ro(band, () => { if (drag) drag.applyBounds({ minX: xOf(50000), maxX: xOf(0) }); setV(val); });
    setV(15000);
    if (motionOK()) { const o = { v: 0 }; G.to(o, { v: 15000, duration: 1.6, ease: ease.x, scrollTrigger: once(tape, 'top 85%'), onStart: () => setV(0), onUpdate: () => { G.set(strip, { x: xOf(o.v) }); upd(o.v); }, onComplete: () => drag && drag.update() }); }
  };
  /* WORK 1: drag the divider; a flick past 300 px/s or a release 50 px from an edge commits to that side (S0197);
     arrows step 5 % (Shift 10 %); pairs change through the logo window panes. */
  V.work1 = (r, b) => {
    const fig = $('.cmp', r), A = $('.cmp-a', fig), B = $('.cmp-b', fig), h = $('.cmp-handle', fig), info = $('.cmp-info', r);
    const P = JSON.parse($('.pairs-data', r).textContent);
    const panes = $$('.pane', fig);
    // v4: the level on the handle reads the drag; its bubble runs against the motion and settles back (back.out, S0544)
    const bub = $('.cl-bub', fig), lev = $('.cmp-lev', fig);
    const tilt = v => { if (!motionOK() || !bub) return; const k = clamp(v / 1600, -1, 1); G.to(bub, { x: -k * 7, duration: v ? 0.18 : 0.6, ease: v ? 'power2.out' : 'back.out(1.6)', overwrite: true }); G.to(lev, { rotation: k * 6, duration: v ? 0.18 : 0.6, ease: v ? 'power2.out' : 'back.out(1.6)', overwrite: true }); };
    const st = { v: 50 };
    const set = v => { st.v = clamp(v, 0, 100); fig.style.setProperty('--split', st.v + '%'); h.setAttribute('aria-valuenow', Math.round(st.v)); h.setAttribute('aria-valuetext', `${Math.round(st.v)}% of the before photo showing`); };
    const toX = e => { const rc = fig.getBoundingClientRect(); return (e.clientX - rc.left) / rc.width * 100; };
    let vx = 0, lx = 0, lt = 0;
    hdrag(fig, b, {
      handle: '.cmp-handle',
      onStart: e => { G && G.killTweensOf(st); lx = e.clientX; lt = performance.now(); vx = 0; },
      onMove: e => { const t = performance.now(), dt = Math.max(1, t - lt); vx = (e.clientX - lx) / dt * 1000; lx = e.clientX; lt = t; set(toX(e)); tilt(vx); },
      onEnd: () => {
        tilt(0);
        const w = fig.getBoundingClientRect().width, edge = 50 / w * 100;
        let to = null;
        if (Math.abs(vx) > 300) to = vx > 0 ? 100 : 0;
        else if (st.v < edge) to = 0; else if (st.v > 100 - edge) to = 100;
        if (to !== null) { if (motionOK()) G.to(st, { v: to, duration: 0.55, ease: ease.x, onUpdate: () => set(st.v) }); else set(to); }
      }
    });
    sliderKeys(h, b, () => st.v, set);
    if (motionOK()) { set(100); G.to(st, { v: 50, duration: 1.3, ease: ease.io, onUpdate: () => set(st.v), scrollTrigger: once(fig, 'top 70%') }); }
    let cur = 0, busy = false;
    const fill = p => {
      A.src = AU(`assets/img/h/work-${p.id}-a-1000.webp`); A.alt = p.aa; B.src = AU(`assets/img/h/work-${p.id}-b-1000.webp`); B.alt = p.ab;
      $('.cmp-price', info).textContent = p.band;
      $('.cmp-what', info).innerHTML = `<b>${esc(p.bl)}, ${esc(p.place)}</b><span>${esc(p.what)}, ${esc(p.when)}. <a class="tlink" href="${esc(p.href)}" target="_blank" rel="noopener">Job file</a></span>`;
      if (window.__apAsset) window.__apAsset(fig);
    };
    $$('.fs', r).forEach(btn => b.on(btn, 'click', () => {
      const k = +btn.dataset.i; if (k === cur || busy) return;
      $$('.fs', r).forEach(x => x.setAttribute('aria-pressed', x === btn)); cur = k;
      if (!motionOK()) { fill(P[k]); set(50); return; }
      busy = true;
      G.timeline({ onComplete: () => { busy = false; } })
        .to(panes, { scale: 1, duration: 0.42, ease: 'power4.in', stagger: 0.04 })
        .add(() => { fill(P[k]); set(50); return null; })
        .add(() => Promise.all([A, B].map(i => i.decode ? i.decode().catch(() => {}) : 0)))
        .to(panes, { scale: 0, duration: 0.6, ease: 'power4.out', stagger: 0.04 }, '+=0.12');
    }));
  };

  /* WORK 2: survey, draw, rebuild (S0468). For each job: the old house; a scan line turns it into the drawing
     (edge lines from the firm's own photo); one dimension label draws; a second scan builds the finished wall.
     Photos swap only under the drawing. The visitor runs it: "Run the survey" or a job number plays that job once
     (no auto-advance, F17 / AUDIT-V3 G6). */
  V.work2 = (r, b) => {
    const P = JSON.parse($('.pairs-data', r).textContent), fig = $('.bp-fig', r), run = $('.bp-run', fig);
    const B = $('.bp-b', fig), Pl = $('.bp-p', fig), A = $('.bp-a', fig), dim = $('.bp-dim', fig), dimT = $('[data-bp-dim]', fig);
    const kEl = $('[data-bp-k]', r), nmEl = $('[data-bp-name]', r), fxEl = $('[data-bp-fix]', r), tabs = $$('.bp-step', r);
    let i = 0, tl = null;
    const S = { a: 0, c: 0, s: 0 };
    const paint = () => { fig.style.setProperty('--s1', S.a + '%'); fig.style.setProperty('--s2', S.c + '%'); fig.style.setProperty('--scan', S.s + '%'); };
    const load = k => {
      const p = P[k];
      B.src = AU(`assets/img/h/work-${p.id}-b-1000.webp`); B.alt = p.ab; Pl.src = AU(`assets/img/h/bp-${p.id}-1000.webp`);
      A.src = AU(`assets/img/h/work-${p.id}-a-1000.webp`); A.alt = p.aa;
      if (window.__apAsset) window.__apAsset(fig);
      dimT.textContent = `${p.bl} · ${p.band}`.toUpperCase();
      kEl.textContent = '0' + (k + 1); nmEl.textContent = p.place; fxEl.textContent = `${p.what}, ${p.when}. ${p.bl} ${p.band}.`;
      tabs.forEach((t, n) => { t.setAttribute('aria-checked', n === k); t.tabIndex = n === k ? 0 : -1; });
    };
    const play = k => {
      if (tl) tl.kill();
      i = k;
      if (!motionOK()) { load(k); S.a = 100; S.c = 100; S.s = 0; paint(); return; }
      const K = 1.4;   // S0468: everything plays 1.4x slower than its authored seconds
      run.disabled = true;
      tl = G.timeline({ onComplete: () => { run.disabled = false; run.textContent = 'Run it again'; } })
        .add(() => { S.a = 0; S.c = 0; S.s = 0; paint(); load(k); G.set(dim, { autoAlpha: 0 }); })
        .to({}, { duration: 0.4 })
        .to(S, { a: 100, s: 100, duration: 0.8 * K, ease: 'power1.inOut', onUpdate: paint })
        .to(dim, { autoAlpha: 1, duration: 0.4 }, '+=0.1')
        .add(() => { S.s = 0; paint(); }, '+=0.5')
        .to(S, { c: 100, s: 100, duration: 0.8 * K, ease: 'power1.inOut', onUpdate: paint })
        .to(dim, { autoAlpha: 0, duration: 0.35 }, '-=0.3')
        .add(() => { S.s = 0; paint(); });
    };
    radios($('.bp-steps', r), b, it => play(+it.dataset.k), '.bp-step');
    b.on(run, 'click', () => play(i));
    b.add(() => { if (tl) tl.kill(); });
    if (!motionOK()) run.hidden = true;
    load(0); S.a = motionOK() ? 0 : 100; S.c = motionOK() ? 0 : 100; paint();
  };
  V.work3 = (r, b) => {
    $$('.sp-fig', r).forEach(fig => {
      const btn = $('.sp-toggle', fig);
      b.on(btn, 'click', () => { const on = fig.classList.toggle('is-before'); btn.setAttribute('aria-pressed', on); btn.textContent = on ? 'Show after' : 'Show before'; });
      if (!mqFine.matches) return;
      let tx = 0, ty = 0, x = 0, y = 0, tr = 0, rr = 0, raf = 0;
      const R = () => Math.min(260, Math.max(140, fig.clientWidth * 0.22));
      const loop = () => {
        const k1 = motionOK() ? 0.1 : 1, k2 = motionOK() ? 0.14 : 1;
        x += (tx - x) * k1; y += (ty - y) * k1; rr += (tr - rr) * k2;
        fig.style.setProperty('--x', x.toFixed(1) + 'px'); fig.style.setProperty('--y', y.toFixed(1) + 'px'); fig.style.setProperty('--r', rr.toFixed(1) + 'px'); fig.style.setProperty('--o', Math.min(1, rr / R()).toFixed(3));
        raf = (Math.abs(tx - x) > 0.1 || Math.abs(ty - y) > 0.1 || Math.abs(tr - rr) > 0.1) ? requestAnimationFrame(loop) : 0;
      };
      const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };
      const move = e => { const rc = fig.getBoundingClientRect(); tx = e.clientX - rc.left; ty = e.clientY - rc.top; if (rr < 0.5) { x = tx; y = ty; } tr = R(); kick(); };
      b.on(fig, 'pointerenter', move); b.on(fig, 'pointermove', move);
      ['pointerleave', 'pointercancel'].forEach(ev => b.on(fig, ev, () => { tr = 0; kick(); }));
      b.on(window, 'blur', () => { tr = 0; kick(); });
      b.add(() => cancelAnimationFrame(raf));
    });
    if (!motionOK()) return;
    G.from($$('.sp-fig, .sp-cap', r), { y: 40, autoAlpha: 0, duration: 0.6, ease: ease.out, stagger: 0.06, scrollTrigger: { trigger: $('.spots', r), start: 'top 80%', once: true } });
    // S1321 layered scroll: the three columns travel at different speeds, so the pairs sit at different depths
    if (mqDesk.matches && ST) $$('.sp', r).forEach((li, k) => { const s = [0.5, 1.2, 0.8][k % 3] * 36; G.fromTo(li, { y: s }, { y: -s, ease: 'none', scrollTrigger: { trigger: $('.spots', r), start: 'top bottom', end: 'bottom top', scrub: 1.2 } }); });
  };

  /* BUILT 1: the wall, taken apart (S0526 exploded view): one spring per layer, stiffness 64, drag 14.2, 4 sub-steps,
     35 ms stagger, outermost leaves first and closes last; the selected layer is the one lit part, the rest step
     down; it moves only when asked (no idle tour, F17); transforms removed at rest. */
  V.built1 = (r, b) => {
    const svg = $('svg.iso', r), asm = $$('.asm', svg), btns = $$('.lg-b', r), ex = $('[data-explode]', r), read = $('[data-readout]', r);
    const R = JSON.parse($('.b1x-data', r).textContent), ORDER = ['trim', 'siding', 'wrap', 'sheath', 'studs'];
    const sp = {};
    asm.forEach(g => { sp[g.dataset.asm] = { x: 0, v: 0, t: 0, at: 0, el: g, mx: +g.dataset.mx, my: +g.dataset.my }; });
    let apart = false, clock = 0, raf = 0, last = 0, sel = '';
    const write = s => { if (Math.abs(s.x) < 1e-4) s.el.removeAttribute('transform'); else s.el.setAttribute('transform', `translate(${(s.mx * s.x).toFixed(2)} ${(s.my * s.x).toFixed(2)})`); };
    const tick = now => {
      const dt = last ? Math.min(1 / 30, (now - last) / 1000) : 1 / 60; last = now; clock += dt;
      let moving = false;
      Object.values(sp).forEach(s => {
        const tgt = clock >= s.at ? s.t : s.x;
        const h = dt / 4;
        for (let k = 0; k < 4; k++) { const a = 64 * (tgt - s.x) - 14.2 * s.v; s.v += a * h; s.x += s.v * h; }
        if (Math.abs(tgt - s.x) < 1e-4 && Math.abs(s.v) < 1e-4 && clock >= s.at) { s.x = tgt; s.v = 0; } else moving = true;
        write(s);
      });
      raf = moving ? requestAnimationFrame(tick) : 0;
      if (!moving) last = 0;
    };
    const kick = () => { if (!raf) { last = 0; raf = requestAnimationFrame(tick); } };
    const say = () => { read.textContent = sel ? R[sel] : (apart ? 'Apart · 5 layers' : 'Assembled · 5 layers'); };
    const go = on => {
      apart = on;
      ex.setAttribute('aria-pressed', on); ex.textContent = on ? 'Put it back together' : 'Take it apart';
      (on ? ORDER : ORDER.slice().reverse()).forEach((k, n) => { sp[k].t = on ? 1 : 0; sp[k].at = clock + n * 0.035; });
      if (!motionOK()) { Object.values(sp).forEach(s => { s.x = s.t; s.v = 0; write(s); }); } else kick();
      say();
    };
    const select = k => {
      sel = k;
      svg.toggleAttribute('data-focus', !!k);
      asm.forEach(g => g.toggleAttribute('data-on', g.dataset.asm === k));
      btns.forEach(x => x.setAttribute('aria-pressed', x.dataset.asm === k));
      say();
    };
    const stopTour = () => {};   // no idle tour (F17, AUDIT-V3 G6): the wall moves only when asked
    btns.forEach(x => b.on(x, 'click', () => { stopTour(); const k = x.dataset.asm; if (!apart) go(true); select(sel === k ? '' : k); }));
    b.on(ex, 'click', () => { stopTour(); go(!apart); if (!apart) select(''); });
    asm.forEach(g => {
      b.on(g, 'pointerenter', e => { if (e.pointerType !== 'mouse' || !apart) return; stopTour(); select(g.dataset.asm); });
      b.on(g, 'click', () => { stopTour(); if (!apart) go(true); select(g.dataset.asm); });
    });
    b.add(() => cancelAnimationFrame(raf));
    if (motionOK()) G.from(asm.slice().reverse(), { y: -30, autoAlpha: 0, duration: 0.5, ease: ease.out, stagger: 0.09, scrollTrigger: once(svg, 'top 80%') });
  };

  /* BUILT 2: S1322 sticky stack cards (R45: CSS sticky does the stacking, never a GSAP pin, so phones can't be
     trapped). On desktop, as the next card travels from 78 % to 24 % of the viewport, the covered card settles back:
     scale toward 0.92 (+0.015 per index), opacity 0.72, 24 px up, scrubbed linearly (parameter library). */
  V.built2 = (r, b) => {
    const cards = $$('.ts-card', r);
    if (!motionOK()) return;
    G.from($$('.ts-head > *', r), { y: 16, autoAlpha: 0, duration: 0.5, ease: ease.out, stagger: 0.08, scrollTrigger: once(r, 'top 80%') });
    if (!mqDesk.matches || !ST) return;
    cards.slice(0, -1).forEach((c, k) => {
      G.to(c, { scale: 0.92 + 0.015 * k, autoAlpha: 0.72, y: -24, ease: 'none', transformOrigin: '50% 0%',
        scrollTrigger: { trigger: cards[k + 1], start: 'top 78%', end: 'top 24%', scrub: true } });
    });
  };
  /* BUILT 3: the dimensioned sheet (S0361) with a split spec panel (S1361): lap or board and batten swap by a
     MorphSVG of one outline (S0184, 0.8 s power2.inOut); a spec row in focus or under the pointer turns its
     dimension red and draws it again (accent only on the active detail). */
  V.built3 = (r, b) => {
    const svg = $('svg.dwg', r), morph = $('.sh-morph', svg), lap = $('.sh-lap', svg), bb = $('.sh-bb', svg), rows = $$('.spec-r', r);
    // S0361 conflict resolved: phones get their own composition (a tighter viewBox), never a sideways scroll
    const frameFor = style => (mqDesk.matches ? '0 0 620 540' : style === 'lap' ? '196 30 330 500' : '30 150 580 250');
    const setStyle = (style, anim) => {
      svg.setAttribute('viewBox', frameFor(style));
      lap.toggleAttribute('hidden', style !== 'lap'); bb.toggleAttribute('hidden', style !== 'bb');
      rows.forEach(rw => { rw.hidden = rw.dataset.set !== style; });
      const to = style === 'lap' ? morph.dataset.lap : morph.dataset.bb;
      if (anim && motionOK() && window.MorphSVGPlugin) G.to(morph, { morphSVG: { shape: to, type: 'linear', map: 'position' }, duration: 0.8, ease: 'power2.inOut', overwrite: true });
      else morph.setAttribute('d', to);
      if (anim && motionOK()) G.from($$('.dim, .xl, .cl, .vt, .vs, .sh-face', style === 'lap' ? lap : bb), { autoAlpha: 0, duration: 0.4, stagger: 0.03, delay: 0.5 });
    };
    radios($('.b3x-seg', r), b, it => setStyle(it.dataset.style, true));
    svg.setAttribute('viewBox', frameFor('lap'));
    const hi = (code, on) => {
      $$(`.dim[data-code="${code}"]`, svg).forEach(dm => { dm.classList.toggle('on', on); if (on && motionOK() && window.DrawSVGPlugin) G.fromTo($$('path', dm), { drawSVG: '50% 50%' }, { drawSVG: '0% 100%', duration: 0.45, ease: 'power2.out', overwrite: true }); });
      rows.forEach(rw => rw.classList.toggle('on', on && rw.dataset.code === code));
    };
    rows.forEach(rw => { ['pointerenter', 'focus'].forEach(ev => b.on(rw, ev, () => hi(rw.dataset.code, true))); ['pointerleave', 'blur'].forEach(ev => b.on(rw, ev, () => hi(rw.dataset.code, false))); });
    if (motionOK() && window.DrawSVGPlugin) G.from($$('.sh-lap path, .sh-morph', svg), { drawSVG: '0%', duration: 0.9, ease: 'power2.inOut', stagger: 0.02, scrollTrigger: once(svg, 'top 82%') });
  };

  /* COLOUR: one studio engine over the photo-traced masks (S0006: masks from the photo, never polygons) */
  function Studio(frame) {
    const zones = Object.fromEntries($$('.zone', frame).map(z => [z.dataset.zone, z]));
    const state = {};
    function paint(zone, hex, how = {}) {
      const z = zones[zone]; if (!z) return;
      const p0 = $('.p0', z), p1 = $('.p1', z);
      state[zone] = hex;
      const anim = motionOK() && G;
      const shape0 = how.x != null ? `circle(0% at ${how.x}px ${how.y}px)` : 'inset(0% 100% 0% 0%)';
      const shape1 = how.x != null ? `circle(150% at ${how.x}px ${how.y}px)` : 'inset(0% 0% 0% 0%)';
      if (!z.classList.contains('is-painted')) {
        p0.style.setProperty('--c', hex); z.classList.add('is-painted');
        if (anim) { G.killTweensOf(z); G.fromTo(z, { clipPath: shape0 }, { clipPath: shape1, duration: 0.7, ease: ease.io, onComplete: () => G.set(z, { clearProps: 'clipPath' }) }); }
        return;
      }
      if (!anim) { p0.style.setProperty('--c', hex); return; }
      G.killTweensOf(p1);
      p1.style.setProperty('--c', hex);
      G.fromTo(p1, { clipPath: shape0 }, { clipPath: shape1, duration: 0.6, ease: ease.io, onComplete: () => { p0.style.setProperty('--c', hex); G.set(p1, { clipPath: 'inset(0% 100% 0% 0%)' }); } });
    }
    function reset() { Object.values(zones).forEach(z => { z.classList.remove('is-painted'); if (G) G.set(z, { clearProps: 'clipPath' }); }); Object.keys(state).forEach(k => delete state[k]); }
    return { paint, reset, state, zones };
  }
  const ZNAME = { body: 'siding', gable: 'gable', trim: 'trim' };
  V.colour1 = (r, b) => {
    const frame = $('.st-frame', r), S = Studio(frame), now = $('.c1-now', r);
    let part = 'body';
    radios($('.seg:not(.seg-set)', r), b, it => { part = it.dataset.part; });
    const docks = $$('.dock', r);
    radios($('.seg-set', r), b, it => { docks.forEach(dk => { dk.hidden = dk.dataset.setList !== it.dataset.set; }); });
    docks.forEach(dk => {
      radios(dk, b, it => { S.paint(part, it.dataset.hex); now.innerHTML = `<b>${esc(it.dataset.name)}</b> <span>${esc(it.dataset.code)} on the ${ZNAME[part]}</span>`; });
      if (mqFine.matches && motionOK()) {
        const sws = $$('.sw', dk);
        b.on(dk, 'pointermove', e => sws.forEach(s => { const rc = s.getBoundingClientRect(); const dist = Math.abs(e.clientX - (rc.left + rc.width / 2)); G.to(s, { scale: 1 + 0.28 * Math.max(0, 1 - dist / 110), duration: 0.18, ease: ease.out, overwrite: 'auto' }); }));
        b.on(dk, 'pointerleave', () => G.to(sws, { scale: 1, duration: 0.24, ease: ease.out }));
      }
    });
    if (motionOK()) G.from(frame, { clipPath: 'inset(8% 6% 8% 6%)', duration: 1.1, ease: ease.io, scrollTrigger: { trigger: frame, start: 'top 80%', once: true } });
  };

  /* COLOUR 2: R30 comparison table (Other vs Us) adapted to the firm's two finish systems. Each column's swatches
     recolour its own header band; text colour is chosen per swatch for contrast. Static and complete without JS. */
  V.colour2 = (r, b) => {
    $$('.cmp-set', r).forEach((set, k) => {
      const col = $$('.cmp-col', r)[k], now = $('[data-now]', col), code = $('[data-code]', col), sws = $$('.cmp-sw', set);
      sws.forEach(sw => b.on(sw, 'click', () => {
        sws.forEach(x => x.setAttribute('aria-pressed', x === sw));
        col.style.setProperty('--c', sw.dataset.hex); col.style.setProperty('--ink', sw.dataset.ink);
        now.textContent = sw.dataset.name; code.textContent = sw.dataset.code;
      }));
    });
    if (motionOK()) G.from($$('.cmp tbody tr', r), { y: 14, autoAlpha: 0, duration: 0.4, ease: ease.out, stagger: 0.06, scrollTrigger: once($('.cmp', r), 'top 82%') });
  };

  /* COLOUR 3: Grid-to-Fullscreen (Codrops) as builder-brief R10's DOM port: the tile's bounds are measured at click
     and the sheet grows out of them to fill the stage (clip-path inset, 0.5 s power3.inOut), its words arriving
     once it lands; Back or Esc reverses into the same tile. Phones get the recipe's fade and scale. */
  V.colour3 = (r, b) => {
    const stage = $('.cb-stage', r), sheet = $('.cb-sheet', r), tiles = $$('.cb-t', r), close = $('.cb-close', sheet);
    const f = k => $(`[data-cb-${k}]`, sheet), words = $$('.cb-sys, .cb-big, .cb-meta, .cb-note, .cb-close', sheet);
    let from = null, tw = null;
    const box = t => { const g = stage.getBoundingClientRect(), q = t.getBoundingClientRect(); return `inset(${q.top - g.top}px ${g.right - q.right}px ${g.bottom - q.bottom}px ${q.left - g.left}px round 10px)`; };
    const open = t => {
      from = t;
      sheet.style.setProperty('--c', t.dataset.hex); sheet.style.setProperty('--ink', t.dataset.ink);
      f('sys').textContent = t.dataset.sys; f('name').textContent = t.dataset.name; f('code').textContent = t.dataset.code; f('hex').textContent = t.dataset.hex;
      f('note').textContent = t.dataset.sys === 'Sherwin-Williams' ? 'Painted on site, with free colour matching.' : 'Baked on at the factory, with Arctic White trim.';
      sheet.hidden = false;
      sheet.focus({ preventScroll: true });   // the sheet itself, before any tween hides it or its words
      if (tw) tw.kill();
      if (motionOK()) {
        tw = mqDesk.matches
          ? G.timeline().fromTo(sheet, { clipPath: box(t) }, { clipPath: 'inset(0px 0px 0px 0px round 20px)', duration: 0.5, ease: 'power3.inOut' })
              .fromTo(words, { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.3, ease: ease.out, stagger: 0.05 }, '-=0.12')
          : G.fromTo(sheet, { autoAlpha: 0, scale: 0.96 }, { autoAlpha: 1, scale: 1, duration: 0.25, ease: ease.out });
      }
    };
    const shut = () => {
      if (sheet.hidden) return;
      const done = () => { sheet.hidden = true; G.set(sheet, { clearProps: 'clipPath,opacity,visibility,transform' }); if (from) from.focus({ preventScroll: true }); };
      if (tw) tw.kill();
      if (!motionOK()) { done(); return; }
      tw = mqDesk.matches && from
        ? G.timeline({ onComplete: done }).to(words, { autoAlpha: 0, duration: 0.15 }).to(sheet, { clipPath: box(from), duration: 0.45, ease: 'power3.inOut' })
        : G.to(sheet, { autoAlpha: 0, scale: 0.96, duration: 0.2, onComplete: done });
    };
    tiles.forEach(t => b.on(t, 'click', () => open(t)));
    b.on(close, 'click', shut);
    b.on(sheet, 'keydown', e => { if (e.key === 'Escape') shut(); });
    b.add(() => { if (tw) tw.kill(); });
    if (motionOK()) G.from(tiles, { y: 16, autoAlpha: 0, duration: 0.4, ease: ease.out, stagger: { each: 0.015, grid: 'auto', from: 'start' }, scrollTrigger: once(stage, 'top 85%') });
  };

  /* NEAR YOU: shared map + finder */
  function MapView(svg) {
    const pins = $$('.m-pins circle', svg), ring = $('.m-ring', svg);
    return {
      pins,
      hot(set) { pins.forEach((c, i) => { const h = set.has(i); c.classList.toggle('hot', h); c.classList.toggle('dim', set.size > 0 && !h); }); },
      ring(x, y, rad) { if (x < 0 || y < 0 || x > 566 || y > 640) { ring.classList.remove('on'); return; } ring.setAttribute('cx', x); ring.setAttribute('cy', y); ring.setAttribute('r', Math.max(10, rad)); ring.classList.add('on'); },
      clear() { pins.forEach(c => c.classList.remove('hot', 'dim')); ring.classList.remove('on'); }
    };
  }
  const placeOf = i => DATA.map.names[PINS[i][4]];
  function Finder(box, M, n, b, onPick) {
    const inp = $('input', box), list = $('.fd-list', box), out = $('.fd-out', box), clr = $('.fd-clear', box);
    const places = DATA.map.places;
    let opts = [], act = -1;
    const close = () => { list.hidden = true; inp.setAttribute('aria-expanded', 'false'); inp.removeAttribute('aria-activedescendant'); act = -1; };
    const render = () => {
      const q = inp.value.trim().toLowerCase();
      clr.hidden = !q;
      if (q.length < 2) { close(); return; }
      opts = places.filter(p => p[0].toLowerCase().includes(q)).sort((a, z) => (a[0].toLowerCase().startsWith(q) ? 0 : 1) - (z[0].toLowerCase().startsWith(q) ? 0 : 1) || a[0].length - z[0].length).slice(0, 6);
      if (!opts.length) { close(); out.innerHTML = `<p>No place called “${esc(inp.value.trim())}” in the project file.</p><p class="fine">Try a town, like Round Rock, Cedar Park or Georgetown.</p>`; return; }
      list.innerHTML = opts.map((p, i) => { const k = p[0].toLowerCase().indexOf(q); return `<li role="option" id="${inp.id}-o${i}" aria-selected="false">${esc(p[0].slice(0, k))}<mark>${esc(p[0].slice(k, k + q.length))}</mark>${esc(p[0].slice(k + q.length))}</li>`; }).join('');
      list.hidden = false; inp.setAttribute('aria-expanded', 'true'); act = -1;
    };
    const mark = i => { $$('li', list).forEach((li, k) => li.setAttribute('aria-selected', k === i)); act = i; if (i >= 0) inp.setAttribute('aria-activedescendant', `${inp.id}-o${i}`); };
    function pick(p) {
      inp.value = p[0]; close(); clr.hidden = false;
      const [, x, y] = p;
      const near = PINS.map((q, i) => [Math.hypot(q[0] - x, q[1] - y), i]).sort((a, z) => a[0] - z[0]).slice(0, n);
      const ppm = DATA.map.ppm;
      out.innerHTML = `<p>Nearest documented jobs to ${esc(p[0])}</p><ol>${near.map(([dd, i]) => `<li><span><b>${esc(placeOf(i))}</b><br>${esc(tradesOf(PINS[i][3]))}, ${ym(PINS[i][2])}</span><span class="num">${(dd / ppm).toFixed(1)}&nbsp;mi</span></li>`).join('')}</ol>`;
      M.hot(new Set(near.map(a => a[1]))); M.ring(x, y, near[near.length - 1][0] + 6);
      if (onPick) onPick(p);
    }
    b.on(inp, 'input', render);
    b.on(inp, 'keydown', e => {
      if (e.key === 'ArrowDown') { e.preventDefault(); if (list.hidden) render(); mark(Math.min(act + 1, opts.length - 1)); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); mark(Math.max(act - 1, 0)); }
      else if (e.key === 'Enter') { if (!list.hidden && opts.length) { e.preventDefault(); pick(opts[act >= 0 ? act : 0]); } }
      else if (e.key === 'Escape') close();
    });
    b.on(list, 'pointerdown', e => { const li = e.target.closest('li'); if (!li) return; e.preventDefault(); pick(opts[$$('li', list).indexOf(li)]); });
    b.on(inp, 'blur', () => setTimeout(close, 120));
    b.on(clr, 'click', () => { inp.value = ''; out.innerHTML = ''; clr.hidden = true; M.clear(); inp.focus(); });
    $$('[data-try]', box).forEach(t => b.on(t, 'click', () => { const p = places.find(q => q[0] === t.dataset.try); if (p) pick(p); }));
  }
  function tips(svg, tip, b) {
    if (!mqFine.matches) return;
    b.on(svg, 'pointerover', e => {
      const c = e.target.closest('circle[data-i]'); if (!c || c.classList.contains('off')) { tip.hidden = true; return; }
      const i = +c.dataset.i, p = PINS[i];
      tip.innerHTML = `<b>${esc(placeOf(i))}</b>${esc(tradesOf(p[3]))}, ${ym(p[2])}`;
      tip.hidden = false;
      const rc = svg.getBoundingClientRect(), cr = c.getBoundingClientRect(), host = tip.parentElement.getBoundingClientRect();
      tip.style.left = Math.min(cr.left - host.left + 12, host.width - tip.offsetWidth - 4) + 'px';
      tip.style.top = (cr.top - host.top - tip.offsetHeight - 8) + 'px';
      void rc;
    });
    b.on(svg, 'pointerleave', () => { tip.hidden = true; });
  }

  /* survey trail for the map (S1323): motes emitted by distance travelled (step about 1.4 % of the map height), at most
     14 per frame, the ring slot taken before it advances, an idle mote every 0.42 s while the pointer rests; touch
     only while dragging; one loop that stops when the last mote fades. Decorative: the map works without it. */
  function surveyTrail(fig, cv, b) {
    if (!motionOK()) return;
    const cx = cv.getContext('2d'); if (!cx) return;
    const N = 160, M = Array.from({ length: N }, () => ({ x: 0, y: 0, t: -9, s: 1 }));
    let head = 0, acc = 0, lx = null, ly = null, ex = 0, ey = 0, raf = 0, last = 0, now = 0, idle = 0, inside = false, down = false, W = 0, H = 0, dpr = 1;
    const size = () => { const rc = fig.getBoundingClientRect(); dpr = Math.min(1.5, devicePixelRatio || 1); W = rc.width; H = rc.height; cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); };
    const spawn = (x, y, s = 1) => { const i = head; head = (head + 1) % N; const m = M[i]; m.x = x; m.y = y; m.t = now; m.s = s; };
    const frame = t => {
      const dt = last ? Math.min(1 / 30, (t - last) / 1000) : 1 / 60; last = t; now += dt;
      if (inside && lx !== null) {
        ex += (lx - ex) * (1 - Math.exp(-16 * dt)); ey += (ly - ey) * (1 - Math.exp(-16 * dt));
        idle += dt; if (idle > 0.42) { idle = 0; spawn(ex, ey, 0.6); }
      }
      cx.setTransform(dpr, 0, 0, dpr, 0, 0); cx.clearRect(0, 0, W, H);
      let alive = false;
      M.forEach(m => { const age = now - m.t; if (age > 2.2) return; alive = true; const u = age / 2.2; const a = (u < 0.12 ? u / 0.12 : 1 - (u - 0.12) / 0.88) * 0.9; cx.globalAlpha = a; cx.fillStyle = '#EA3C39'; cx.beginPath(); cx.arc(m.x, m.y, 1.7 * m.s * (1 + u * 0.55), 0, 6.283); cx.fill(); });
      cx.globalAlpha = 1;
      raf = (alive || inside) ? requestAnimationFrame(frame) : 0; if (!raf) last = 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };
    const move = e => {
      if (e.pointerType !== 'mouse' && !down) return;
      const rc = fig.getBoundingClientRect(), x = e.clientX - rc.left, y = e.clientY - rc.top;
      if (lx === null) { lx = ex = x; ly = ey = y; }
      const step = Math.max(4, H * 0.014), dx = x - lx, dy = y - ly, moved = Math.hypot(dx, dy);
      acc += moved; let guard = 0;
      while (acc >= step && guard++ < 14) { acc -= step; const t = moved > 1e-6 ? Math.min(1, guard * step / moved) : 0; spawn(lx + dx * t, ly + dy * t); }
      lx = x; ly = y; idle = 0; inside = true; kick();
    };
    size(); b.ro(fig, size);
    b.on(fig, 'pointermove', move);
    b.on(fig, 'pointerdown', e => { down = true; lx = null; move(e); });
    ['pointerup', 'pointercancel'].forEach(ev => b.on(fig, ev, () => { down = false; }));
    b.on(fig, 'pointerleave', () => { inside = false; lx = ly = null; acc = 0; });
    b.add(() => cancelAnimationFrame(raf));
  }
  V.near1 = (r, b) => {
    const svg = $('.map-svg', r), M = MapView(svg), cnt = $('[data-count]', r), when = $('[data-when]', r);
    Finder($('[data-finder]', r), M, 3, b);
    tips(svg, $('.m-tip', r), b);
    if (mqFine.matches) surveyTrail($('.n1-map', r), $('.n1-trail', r), b);
    if (!motionOK() || !ST) return;
    const months = Array.from(new Set(PINS.map(p => p[2])));
    M.pins.forEach(c => c.classList.add('off'));
    G.set($('.m-hq', svg), { scale: 0, transformOrigin: '50% 50%' });
    const st = { k: 0 };
    let shown = 0;
    const tl = G.timeline({ paused: true });
    tl.to($('.m-hq', svg), { scale: 1, duration: 0.5, ease: 'back.out(1.6)' })
      .to(st, { k: months.length - 1, duration: 1.8, ease: 'power1.inOut', onUpdate: () => {
        const lim = months[Math.round(st.k)];
        while (shown < PINS.length && PINS[shown][2] <= lim) { M.pins[shown].classList.remove('off'); shown++; }
        while (shown > 0 && PINS[shown - 1][2] > lim) { shown--; M.pins[shown].classList.add('off'); }
        cnt.textContent = shown; when.textContent = `jobs, Mar 2022 to ${ym(lim)}`;
      } }, 0.2);
    ST.create({ trigger: svg, start: 'top 72%', once: true, onEnter: () => tl.play() });
  };

  /* NEAR 2: West Shore Home's location x service matrix. Each town row is a disclosure; its panel opens on grid rows
     (0fr to 1fr) in 0.24 s, Stronghold's accordion dose, and is inert while closed. Rows enter as a staggered group. */
  V.near2 = (r, b) => {
    const rows = $$('.mx-r', r);
    rows.forEach(li => {
      const btn = $('.mx-row', li), more = $('.mx-more', li);
      b.on(btn, 'click', () => { const on = btn.getAttribute('aria-expanded') !== 'true'; btn.setAttribute('aria-expanded', on); li.classList.toggle('is-open', on); more.inert = !on; });
    });
    if (motionOK()) G.from(rows, { y: 14, autoAlpha: 0, duration: 0.4, ease: ease.out, stagger: 0.06, scrollTrigger: once($('.mx-list', r), 'top 85%') });
  };

  /* NEAR 3: KBF's Neighborhood Drive. Pick a place (radio chips): the job map flies in to it (viewBox tween, 0.8 s
     power3.inOut), its photographed pins light, and the chapter rail shows only the jobs photographed there. */
  V.near3 = (r, b) => {
    const D = JSON.parse($('.dv-data', r).textContent), svg = $('.dv-svg', r), M = MapView(svg), rail = $('[data-dv-rail]', r), kEl = $('[data-dv-k]', r), cap = $('[data-dv-cap]', r);
    const view = t => { const w = 170, h = 192; const x = clamp(t.x - w / 2, 0, 566 - w), y = clamp(t.y - h / 2, 0, 640 - h); return `${x.toFixed(1)} ${y.toFixed(1)} ${w} ${h}`; };
    let tw = null;
    const go = (name, anim) => {
      const t = D[name];
      M.hot(new Set(PINS.map((p, i) => p[5] === t.ci ? i : -1).filter(i => i >= 0)));
      if (tw) tw.kill();
      if (anim && motionOK()) tw = G.timeline().to(svg, { attr: { viewBox: '0 0 566 640' }, duration: 0.35, ease: 'power2.in' }).to(svg, { attr: { viewBox: view(t) }, duration: 0.8, ease: 'power3.inOut' });
      else svg.setAttribute('viewBox', view(t));
      cap.textContent = `${name}: ${t.doc} documented jobs`;
      kEl.textContent = `${t.n} photographed jobs in ${name}` + (t.n > t.p.length ? `, the latest ${t.p.length}` : '');
      rail.innerHTML = t.p.map(q => `<li class="dv-card"><img src="${esc(AU(q.src))}" width="320" height="240" alt="${esc(q.alt)}" loading="lazy" decoding="async"><p><b>${esc(q.place)}</b><span>${esc(q.when)}. ${esc(q.trades)}</span></p></li>`).join('');
      rail.scrollLeft = 0;
      if (anim && motionOK()) G.from($$('.dv-card', rail), { x: 30, autoAlpha: 0, duration: 0.45, ease: ease.out, stagger: 0.05, delay: 0.25 });
    };
    radios($('.dv-chips', r), b, it => go(it.dataset.town, true), '.dv-chip');
    go('Austin', false);
    b.add(() => { if (tw) tw.kill(); });
  };

  /* REVIEWS */
  /* REVIEWS 1: Q161 seamless marquee as R16 (duplicated track, -50 % loop, CSS only), slow and constant like
     Stronghold's 60 s linear band; edges fade 15/85 (S1348); paused on hover, focus, off-screen and by the button
     (WCAG 2.2.2); still under reduced motion. */
  V.reviews1 = (r, b) => {
    const tracks = $$('.mq-track', r), mqs = $('.mqs', r), btn = $('.mq-pause', r);
    if (!motionOK()) { btn.hidden = true; return; }
    tracks.forEach((t, k) => {
      [...t.children].forEach(c => { const cl = c.cloneNode(true); cl.setAttribute('aria-hidden', 'true'); cl.setAttribute('inert', ''); t.appendChild(cl); });
      t.style.setProperty('--dur', (k ? 95 : 80) + 's'); t.classList.add('is-loop');
    });
    b.on(btn, 'click', () => { const on = !mqs.classList.contains('is-paused'); mqs.classList.toggle('is-paused', on); btn.setAttribute('aria-pressed', on); btn.textContent = on ? 'Play' : 'Pause'; });
    b.io(r, ([en]) => r.classList.toggle('is-offscreen', !en.isIntersecting), { threshold: 0.01 });
  };

  /* REVIEWS 2: R29 testimonial carousel, manual: one big quote, arrows or a horizontal swipe (pointer events, 40 px,
     vertical scroll left alone); the new quote's words arrive 0.012 s apart (S1329); the plain text goes to a polite
     live region. */
  V.reviews2 = (r, b) => {
    const Q = JSON.parse($('.one-data', r).textContent), q = $('.one-q', r), name = $('.one-n', r), k = $('.one-k span', r), say = $('[data-one-say]', r);
    let i = 0;
    const go = dir => {
      i = (i + dir + Q.length) % Q.length;
      q.innerHTML = `<p>“${markNames(Q[i].q)}”</p>`;
      name.innerHTML = `${esc(Q[i].n)}<span>Google review, 2026</span>`;
      k.textContent = i + 1;
      say.textContent = `Review ${i + 1} of ${Q.length}, ${Q[i].n}: ${Q[i].q}`;
      if (motionOK()) {
        const p = $('p', q);
        p.setAttribute('aria-hidden', 'true');
        G.from(splitWords(p), { xPercent: dir * 40, autoAlpha: 0, duration: 0.5, ease: ease.out, stagger: 0.012 });
        G.fromTo(name, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: ease.out, delay: 0.2, overwrite: true });
      }
    };
    $$('.rb', r).forEach(btn => b.on(btn, 'click', () => go(+btn.dataset.dir)));
    const one = $('.one', r);
    let sx = 0, sy = 0, on = false;
    b.on(one, 'pointerdown', e => { if (e.target.closest('button, a')) return; on = true; sx = e.clientX; sy = e.clientY; });
    b.on(one, 'pointerup', e => { if (!on) return; on = false; const dx = e.clientX - sx, dy = e.clientY - sy; if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.2) go(dx < 0 ? 1 : -1); });
    b.on(one, 'pointercancel', () => { on = false; });
  };

  /* REVIEWS 3: four cards at a time so the wall never turns into a document; "Show more" adds four */
  V.reviews3 = (r, b) => {
    const cards = $$('.nw', r), more = $('.nw-more', r), say = $('.nw-say', r), STEP = 4;
    let pool = cards, lim = STEP, who = '';
    const lay = fresh => {
      cards.forEach(c => c.classList.toggle('is-out', pool.indexOf(c) < 0 || pool.indexOf(c) >= lim));
      const shown = Math.min(lim, pool.length), left = pool.length - shown;
      more.hidden = left <= 0;
      more.textContent = `Show ${Math.min(STEP, left)} more`;
      say.textContent = `${shown} of ${pool.length} reviews${who ? ' naming ' + who : ''}`;
      if (fresh && motionOK()) G.fromTo(fresh, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: ease.out, stagger: 0.05, overwrite: true });
    };
    radios($('.names', r), b, it => {
      who = it.dataset.name;
      pool = cards.filter(c => !who || c.dataset.names.split('|').includes(who));
      lim = STEP; lay(pool.slice(0, lim));
    });
    b.on(more, 'click', () => {
      const from = lim; lim += STEP; lay(pool.slice(from, lim));
      const f = pool[from] && $('blockquote', pool[from]);
      if (f) { f.tabIndex = -1; f.focus({ preventScroll: true }); }
    });
    lay(null);
  };

  /* MONEY */
  function srSay(el, text) { clearTimeout(el._t); el._t = setTimeout(() => { el.textContent = text; }, 450); }
  V.money1 = (r, b) => {
    const inp = $('#m1-amt', r), out = $('output', r), sub = $('[data-m1-sub]', r), sr = $('[data-sr]', r);
    const odo = Odo($('[data-odo]', r));
    let apr = 0.0799, n = 120;
    const upd = () => {
      const A = +inp.value, m = pmt(A, apr, n), f = usd.format(A);
      out.textContent = f; inp.setAttribute('aria-valuetext', f);
      odo(usd2.format(m));
      sub.textContent = `${f} over ${n} months at ${apr ? (apr * 100).toFixed(2) + '%' : '0%'} APR`;
      srSay(sr, `${usd2.format(m)} a month`);
    };
    radios($('.terms', r), b, it => { apr = +it.dataset.apr; n = +it.dataset.n; upd(); });
    b.on(inp, 'input', upd);
    upd();
  };
  /* MONEY 2: Austin Pro's invoiced distribution (F7e): every priced job by band, median band in red. Bars grow once on
     entry (0.6 s, 0.03 s apart); switching trade re-scales them in 0.4 s (reveal band); the caption, median, middle
     half and the "what moves it" list follow; the caveat is printed under it. */
  V.money2 = (r, b) => {
    const D = JSON.parse($('.dd-data', r).textContent), bars = $$('.db', r), list = $('[data-dd-bars]', r);
    const f = k => $(`[data-dd-${k}]`, r);
    const B = ['Under $2k', '$2k-$5k', '$5k-$10k', '$10k-$15k', '$15k-$20k', '$20k-$25k', '$25k-$30k', '$30k-$40k', '$40k-$50k', '$50k-$60k', '$60k-$75k', '$75k-$100k', '$100k+'];
    const show = k => {
      const d = D[k], mx = Math.max(...d.c);
      bars.forEach((li, i) => {
        const h = d.c[i] / mx;
        if (motionOK()) G.to(li, { '--h': h, duration: 0.4, ease: 'power2.out', overwrite: true }); else li.style.setProperty('--h', h);
        $('.db-n', li).textContent = d.c[i]; $('.sr-only', li).textContent = `${B[i]}: ${d.c[i]} jobs`;
        li.classList.toggle('is-med', i === d.med);
      });
      list.setAttribute('aria-label', `Priced ${d.name.toLowerCase()} jobs by price band, 2022-2026`);
      f('cap').innerHTML = `<b class="num">${d.n}</b> priced ${d.name.toLowerCase()} jobs, 2022-2026, in ${d.cities} Central Texas cities`;
      f('med').textContent = B[d.med]; f('mid').textContent = d.mid; f('mh').textContent = d.moves_h;
      f('moves').innerHTML = d.moves.map(m => `<li>${esc(m)}</li>`).join('');
    };
    radios($('.dd-tabs', r), b, it => show(it.dataset.k), '.dt');
    const flat = matchMedia('(max-width: 639px)').matches;   // phones draw the bars horizontally
    if (motionOK()) G.from($$('.db i', r), Object.assign(flat ? { scaleX: 0, transformOrigin: '0% 50%' } : { scaleY: 0, transformOrigin: '50% 100%' }, { duration: 0.6, ease: ease.out, stagger: 0.03, scrollTrigger: once(list, 'top 85%') }));
  };
  V.money3 = (r, b) => {
    const amt = $('.rc-amt input', r), boxes = $$('input[type="checkbox"]', r), odo = Odo($('[data-odo]', r)), was = $('[data-was]', r), save = $('[data-save]', r);
    const lines = { 5: $('[data-line="5"]', r), p: $('[data-line="p"]', r) };
    const upd = () => {
      const A = Math.min(500000, +amt.value.replace(/[^\d]/g, '') || 0);
      const heroes = boxes[0].checked, full = boxes[1].checked;
      lines[5].classList.toggle('is-off', !heroes); lines.p.classList.toggle('is-off', !full);
      const pct = 10 + (heroes ? 5 : 0) + (full ? 10 : 0), price = Math.round(A * (100 - pct) / 100);
      was.textContent = usd.format(A); odo(usd.format(price)); save.textContent = usd.format(A - price);
    };
    b.on(amt, 'input', upd); b.on(amt, 'blur', () => { const v = +amt.value.replace(/[^\d]/g, '') || 0; amt.value = v.toLocaleString('en-US'); upd(); });
    boxes.forEach(x => b.on(x, 'change', upd));
    upd();
    if (motionOK()) G.from($$('.rc-h, .rc-line, .rc-tot, .rc-save', r), { clipPath: 'inset(0% 0% 100% 0%)', y: -6, duration: 0.45, ease: ease.out, stagger: 0.12, scrollTrigger: { trigger: $('.receipt', r), start: 'top 75%', once: true }, clearProps: 'clipPath' });
  };

  /* BOOK: one form engine for all three versions (S1442, S0661: validate on Continue, then live; focus first invalid) */
  function Form(form, b) {
    const steps = $$('.bk-step', form), kEl = $('.bk-k', form), k = $('.bk-k span', form), next = $('.bk-next', form), back = $('.bk-back', form), send = $('.bk-send', form), done = $('.bk-done', form);
    let i = 0;
    const err = (id, on) => { const e = $('#' + id, form) || $(`[id="${id}"]`, form); if (e) e.hidden = !on; };
    const fid = $('.bk-err', form).id.replace(/-e1$/, '');
    function valid(n, focus) {
      if (n === 0) { const ok = $$('input[name="trade"]:checked', form).length > 0; err(`${fid}-e1`, !ok); if (!ok && focus) $('input[name="trade"]', form).focus(); return ok; }
      if (n === 1) { const ok = !!$(`input[type="radio"]:checked`, form); err(`${fid}-e2`, !ok); if (!ok && focus) $('input[type="radio"]', form).focus(); return ok; }
      const f = [['name', v => v.trim().length > 0], ['tel', v => v.replace(/\D/g, '').length === 10], ['zip', v => /^\d{5}$/.test(v.trim())]];
      let first = null;
      f.forEach(([nm, test]) => { const inp = $(`input[name="${nm}"]`, form), ok = test(inp.value); inp.setAttribute('aria-invalid', !ok); err(inp.getAttribute('aria-describedby'), !ok); if (!ok && !first) first = inp; });
      if (first && focus) first.focus();
      return !first;
    }
    function shake() { if (motionOK()) G.fromTo(steps[i], { x: 0 }, { keyframes: { x: [0, -6, 6, -4, 4, 0] }, duration: 0.32, ease: 'none' }); }
    function show(n, dir) {
      steps[i].hidden = true; steps[n].hidden = false; i = n; k.textContent = n + 1;
      back.hidden = n === 0; next.hidden = n === 2; send.hidden = n !== 2;
      if (motionOK()) G.fromTo(steps[n], { x: 36 * dir, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.3, ease: ease.out, overwrite: true });
      const f = $('input', steps[n]); if (f) f.focus({ preventScroll: true });
    }
    b.on(next, 'click', () => { if (valid(i, true)) show(i + 1, 1); else shake(); });
    b.on(back, 'click', () => show(i - 1, -1));
    b.on(form, 'change', () => { if (i < 2) { const e = $$('.bk-err', steps[i])[0]; if (e && !e.hidden) valid(i, false); } });
    $$('input[name="name"], input[name="tel"], input[name="zip"]', form).forEach(inp => b.on(inp, 'input', () => { if (inp.getAttribute('aria-invalid') === 'true') valid(2, false); }));
    const tel = $('input[name="tel"]', form);
    b.on(tel, 'input', () => { const v = tel.value.replace(/\D/g, '').slice(0, 10); tel.value = v.length > 6 ? `(${v.slice(0, 3)}) ${v.slice(3, 6)}-${v.slice(6)}` : v.length > 3 ? `(${v.slice(0, 3)}) ${v.slice(3)}` : v; });
    b.on(form, 'submit', e => {
      e.preventDefault();
      if (!valid(2, true)) { shake(); return; }
      $('[data-done-name]', form).textContent = $('input[name="name"]', form).value.trim() || 'thanks';
      steps.forEach(s => { s.hidden = true; }); [kEl, $('.bk-nav', form)].forEach(x => { x.hidden = true; });
      done.hidden = false; done.focus();
      if (motionOK()) { const p = $('path', done), L = p.getTotalLength(); G.fromTo(p, { strokeDasharray: L, strokeDashoffset: L }, { strokeDashoffset: 0, duration: 0.55, ease: ease.out, delay: 0.1 }); G.from($$('p', done), { y: 10, autoAlpha: 0, duration: 0.4, ease: ease.out, stagger: 0.06 }); }
    });
    return trade => {
      const box = $$('input[name="trade"]', form).find(x => x.value.toLowerCase() === String(trade).toLowerCase());
      if (box) box.checked = true;
    };
  }
  /* light folds behind the call (S1364): tall bands drifting on slow sines, screen-blended so overlaps brighten,
     brightest toward the lower right, leaning toward the pointer; DPR 1.5; stops off screen; still under reduced motion */
  function folds(cv, host, b) {
    const cx = cv.getContext('2d'); if (!cx) return;
    let W = 0, H = 0, dpr = 1, raf = 0, t0 = 0, on = false, lean = 0, leanT = 0;
    const size = () => { const rc = host.getBoundingClientRect(); dpr = Math.min(1.5, devicePixelRatio || 1); W = rc.width; H = rc.height; cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); draw(t0); };
    const BANDS = Array.from({ length: 18 }, (_, i) => ({ x: (i + 0.5) / 18, w: 0.05 + ((i * 37) % 7) / 70, ph: i * 1.7, sp: 0.06 + ((i * 13) % 5) / 90, a: 0.05 + ((i * 29) % 6) / 70 }));
    function draw(t) {
      cx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx.globalCompositeOperation = 'source-over'; cx.clearRect(0, 0, W, H);
      cx.globalCompositeOperation = 'screen';
      lean += (leanT - lean) * 0.04;
      BANDS.forEach(bd => {
        const x = (bd.x + Math.sin(t * bd.sp + bd.ph) * 0.03 + lean * 0.05 * bd.x) * W, w = bd.w * W;
        const g = cx.createLinearGradient(0, 0, 0, H);
        const near = 0.5 + 0.5 * bd.x;
        g.addColorStop(0, 'rgba(255,120,110,0)'); g.addColorStop(0.55, `rgba(255,140,120,${(bd.a * near).toFixed(3)})`); g.addColorStop(1, `rgba(255,190,170,${(bd.a * 1.6 * near).toFixed(3)})`);
        cx.fillStyle = g; cx.fillRect(x - w / 2, 0, w, H);
      });
      const rg = cx.createRadialGradient(W * 0.86, H * 0.95, 0, W * 0.86, H * 0.95, Math.max(W, H) * 0.6);
      rg.addColorStop(0, 'rgba(255,170,150,0.22)'); rg.addColorStop(1, 'rgba(255,170,150,0)');
      cx.fillStyle = rg; cx.fillRect(0, 0, W, H);
    }
    const loop = t => { t0 = t / 1000; draw(t0); raf = on ? requestAnimationFrame(loop) : 0; };
    size(); b.ro(host, size);
    if (!motionOK()) return;
    b.io(host, ([en]) => { on = en.isIntersecting && !d.hidden; if (on && !raf) raf = requestAnimationFrame(loop); }, { threshold: 0 });
    b.on(d, 'visibilitychange', () => { on = !d.hidden && on; if (on && !raf) raf = requestAnimationFrame(loop); });
    if (mqFine.matches) b.on(host, 'pointermove', e => { const rc = host.getBoundingClientRect(); leanT = (e.clientX - rc.left) / rc.width * 2 - 1; });
    b.add(() => { on = false; cancelAnimationFrame(raf); });
  }
  V.book1 = (r, b, s) => {
    const cv = $('.b1-folds', r); if (cv) folds(cv, r, b);
    const open = $('.b1-open', r), panel = $('#b1-panel', r), pre = Form($('form', r), b);
    const toggle = (on, focus) => {
      open.setAttribute('aria-expanded', on); panel.hidden = !on; open.textContent = on ? 'Hide the form' : 'Book free inspection online';
      if (on && motionOK()) G.fromTo(panel, { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.45, ease: ease.out, overwrite: true });
      if (on && focus) { const f = $('input', panel); if (f) f.focus({ preventScroll: true }); }
    };
    b.on(open, 'click', () => toggle(open.getAttribute('aria-expanded') !== 'true', true));
    s.api.book = trade => { if (trade) pre(trade); toggle(true, true); };
    if (motionOK()) G.from($('.b1-tel', r), { yPercent: 40, autoAlpha: 0, duration: 0.9, ease: ease.x, scrollTrigger: { trigger: r, start: 'top 70%', once: true } });
  };
  V.book2 = (r, b, s) => {
    const pre = Form($('form', r), b);
    s.api.book = trade => { if (trade) pre(trade); const f = $('input', $('form', r)); if (f) setTimeout(() => f.focus({ preventScroll: true }), 600); };
    if (motionOK()) G.from($('.b2-ph img', r), { clipPath: 'inset(0% 0% 100% 0%)', scale: 1.08, duration: 1.1, ease: ease.io, scrollTrigger: { trigger: r, start: 'top 75%', once: true } });
  };
  /* BOOK 3: Q413 Tequila's conversational form: one sentence with inline fields. Validated on Send, then live while
     fixing (S0661); the errors are listed in plain words under the sentence and the first bad field takes focus. */
  V.book3 = (r, b, s) => {
    const form = $('[data-snt]', r), errs = $('.snt-err', form), done = $('.snt-done', form);
    const F = n => form.elements[n];
    const rules = [['name', v => v.trim().length > 0, 'Add your first name.'], ['zip', v => /^\d{5}$/.test(v.trim()), 'ZIP codes have 5 digits, like 78752.'],
      ['tel', v => v.replace(/\D/g, '').length === 10, 'Phone numbers have 10 digits, like (512) 550-0000.']];
    let tried = false;
    const check = focus => {
      const bad = rules.filter(([n, ok]) => !ok(F(n).value));
      rules.forEach(([n, ok]) => F(n).setAttribute('aria-invalid', !ok(F(n).value)));
      errs.hidden = !bad.length; errs.innerHTML = bad.map(x => `<li>${x[2]}</li>`).join('');
      if (bad.length && focus) F(bad[0][0]).focus();
      return !bad.length;
    };
    rules.forEach(([n]) => b.on(F(n), 'input', () => { if (tried) check(false); }));
    b.on(form, 'submit', e => {
      e.preventDefault(); tried = true;
      if (!check(true)) return;
      $('[data-snt-name]', done).textContent = F('name').value.trim();
      $$('.snt, .snt-go', form).forEach(el => { el.hidden = true; });
      done.hidden = false; done.focus();
    });
    s.api.book = trade => {
      if (trade) { const o = [...F('trade').options].find(x => x.text.toLowerCase() === trade.toLowerCase()); if (o) F('trade').value = o.value; }
      setTimeout(() => F('name').focus({ preventScroll: true }), 600);
    };
    if (motionOK()) G.from($$('.snt-k, .snt, .snt-go', form), { y: 18, autoAlpha: 0, duration: 0.5, ease: ease.out, stagger: 0.1, scrollTrigger: once(form, 'top 80%') });
  };

  /* ========================================================================================
     SECTION CONTROLLER: 1/2/3 tabs, keys, picks panel, persistence (S0067, S0082, S1246)
     ======================================================================================== */
  const SECS = $$('.sec').map(el => ({ el, key: el.dataset.sec, stage: $('.stage', el), tabs: $$('.vsw-b', el), label: $('.vsw-l span', el), names: el.dataset.names.split('|'), tpls: $$('template', el), v: 1, b: null, ctx: null, api: {}, switched: false }));
  const BY = Object.fromEntries(SECS.map(s => [s.key, s]));

  function unmount(s) {
    if (s.b) s.b.clear();
    if (s.ctx) s.ctx.revert();
    s.b = s.ctx = null; s.api = {};
  }
  function mount(s, v, initial) {
    if (!initial) {
      unmount(s);
      s.stage.replaceChildren(s.tpls[v - 1].content.cloneNode(true));
      if (window.__apAsset) window.__apAsset(s.stage);
    }
    s.v = v; s.el.dataset.v = v;
    s.tabs.forEach(t => { const on = +t.dataset.v === v; t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1; });
    s.stage.setAttribute('aria-labelledby', s.tabs[v - 1].id);
    s.label.textContent = s.names[v - 1];
    const vr = s.stage.firstElementChild;
    s.b = bag();
    const run = () => { heads(vr, s); const fn = V[s.key + v]; if (fn) fn(vr, s.b, s); if (window.APFX) s.b.add(window.APFX.depth(vr)); if (window.APV4) window.APV4.mount(vr, s.key, s.b); };
    try {
      if (G) { s.ctx = G.context(() => {}); s.ctx.add(run); } else run();
    } catch (err) { console.error(s.key + v, err); }
  }
  const code = () => SECS.map(s => s.v).join('');
  const pretty = () => { const c = code(); return `${c.slice(0, 3)} ${c.slice(3, 6)} ${c.slice(6)}`; };
  function save() {
    store.set('ap-picks', code());
    try { const u = new URL(location.href); u.searchParams.set('v', code()); history.replaceState(null, '', u); } catch (e) { /* file URL or sandbox: the panel still shows the picks */ }
    syncPicks();
  }
  function switchTo(s, v, opts = {}) {
    v = clamp(v | 0, 1, 3);
    if (v === s.v) return;
    const y0 = s.el.getBoundingClientRect().top;
    s.switched = true;
    mount(s, v);
    if (ST) ST.refresh();
    jumpBy(s.el.getBoundingClientRect().top - y0);
    if (opts.focusTab) s.tabs[v - 1].focus();
    save();
  }
  SECS.forEach(s => {
    const list = $('.vsw', s.el);
    list.addEventListener('click', e => { const t = e.target.closest('.vsw-b'); if (t) switchTo(s, +t.dataset.v); });
    list.addEventListener('keydown', e => {
      const i = s.v - 1; let n = null;
      if (e.key === 'ArrowRight') n = (i + 1) % 3; else if (e.key === 'ArrowLeft') n = (i + 2) % 3; else if (e.key === 'Home') n = 0; else if (e.key === 'End') n = 2;
      if (n !== null) { e.preventDefault(); switchTo(s, n + 1, { focusTab: true }); }
    });
  });

  /* keys 1, 2, 3 switch the section in view; never inside fields or with modifiers */
  d.addEventListener('keydown', e => {
    if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey || !/^[123]$/.test(e.key)) return;
    const t = e.target;
    if (t.closest && t.closest('input, textarea, select, [contenteditable="true"], [role="slider"]')) return;
    const mid = window.innerHeight * 0.45;
    const s = SECS.find(x => { const rc = x.el.getBoundingClientRect(); return rc.top <= mid && rc.bottom >= mid; });
    if (s) { e.preventDefault(); switchTo(s, +e.key); }
  });

  /* picks panel */
  const pkBtn = $('.pk-btn'), pkPanel = $('#pk-panel'), pkCode = $('[data-pk-code]'), pkMsg = $('.pk-msg');
  function syncPicks() {
    pkCode.textContent = pretty();
    $$('.pk-seg').forEach(g => { const s = BY[g.dataset.for]; $$('button', g).forEach(x => { const on = +x.dataset.v === s.v; x.setAttribute('aria-checked', on); x.tabIndex = on ? 0 : -1; }); });
  }
  const pkOpen = on => { pkPanel.hidden = !on; pkBtn.setAttribute('aria-expanded', on); if (on) { syncPicks(); const f = $('.pk-seg [aria-checked="true"]', pkPanel); if (f) f.focus(); } };
  pkBtn.addEventListener('click', () => pkOpen(pkPanel.hidden));
  d.addEventListener('keydown', e => { if (e.key === 'Escape' && !pkPanel.hidden) { pkOpen(false); pkBtn.focus(); } });
  d.addEventListener('pointerdown', e => { if (!pkPanel.hidden && !e.target.closest('.picks')) pkOpen(false); });
  $$('.pk-seg').forEach(g => {
    const s = BY[g.dataset.for];
    g.addEventListener('click', e => { const x = e.target.closest('button'); if (x) switchTo(s, +x.dataset.v); });
    g.addEventListener('keydown', e => {
      let n = null; const i = s.v - 1;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = (i + 1) % 3; else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = (i + 2) % 3;
      if (n !== null) { e.preventDefault(); switchTo(s, n + 1); $(`button[data-v="${n + 1}"]`, g).focus(); }
    });
  });
  $('[data-copy]').addEventListener('click', () => {
    const text = 'My picks: ' + SECS.map(s => `${s.el.getAttribute('aria-label')} ${s.v} (${s.names[s.v - 1]})`).join(', ');
    const ok = () => { pkMsg.textContent = 'Copied. Paste it into your message.'; };
    const fallback = () => { const t = d.createElement('textarea'); t.value = text; t.setAttribute('readonly', ''); t.style.cssText = 'position:fixed;opacity:0'; d.body.appendChild(t); t.select(); let done = false; try { done = d.execCommand('copy'); } catch (e) { done = false; } t.remove(); pkMsg.textContent = done ? 'Copied. Paste it into your message.' : text; };
    if (navigator.clipboard) navigator.clipboard.writeText(text).then(ok, fallback); else fallback();
  });
  $('[data-reset]').addEventListener('click', () => { SECS.forEach(s => switchTo(s, 1)); pkMsg.textContent = 'Every section is back to version 1.'; });
  const motionBox = $('[data-motion]');
  motionBox.checked = motionOK();
  function remountAll() { SECS.forEach(s => { const v = s.v; s.switched = true; mount(s, v, false); }); if (ST) ST.refresh(); }
  motionBox.addEventListener('change', () => {
    userMotion = motionBox.checked ? 'on' : 'off'; store.set('ap-motion', userMotion);
    setMotionClass(); lenisSync(); syncFx(); remountAll();
    pkMsg.textContent = motionBox.checked ? 'Motion on.' : 'Motion off: every section shows its finished state.';
  });
  const motionBtns = $$('[data-motion-btn]');
  const paintMotionBtns = () => motionBtns.forEach(b => { const on = motionOK(); b.setAttribute('aria-pressed', on); const t = $('[data-motion-t]', b); if (t) t.textContent = on ? 'Motion on' : 'Motion off'; });
  motionBtns.forEach(b => b.addEventListener('click', () => { motionBox.checked = !motionOK(); motionBox.dispatchEvent(new Event('change')); paintMotionBtns(); }));
  motionBox.addEventListener('change', paintMotionBtns);
  paintMotionBtns();
  mqReduce.addEventListener('change', () => { if (userMotion) return; motionBox.checked = motionOK(); setMotionClass(); lenisSync(); syncFx(); remountAll(); });

  /* in-page links: smooth with Lenis, focus moves to the target (S0915); booking links can preselect a trade */
  d.addEventListener('click', e => {
    if (e.defaultPrevented) return;                                      // a version handled its own link (Hero 2 cards)
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href').slice(1);
    const t = id ? d.getElementById(id) : null;
    if (!t) return;
    e.preventDefault();
    closeSheet();
    goTo(t);
    t.setAttribute('tabindex', '-1');
    setTimeout(() => t.focus({ preventScroll: true }), lenis ? 900 : 50);
    if (a.hasAttribute('data-book') && BY.book && BY.book.api.book) BY.book.api.book(a.dataset.trade || '');
  });

  /* mobile menu sheet */
  const menu = $('.hd-menu'), sheet = $('#sheet');
  function closeSheet() { if (!sheet.hidden) { sheet.hidden = true; menu.setAttribute('aria-expanded', 'false'); menu.textContent = 'Menu'; if (lenis) lenis.start(); } }
  menu.addEventListener('click', () => {
    const on = sheet.hidden; sheet.hidden = !on; menu.setAttribute('aria-expanded', on); menu.textContent = on ? 'Close' : 'Menu';
    if (on) { const f = $('a', sheet); if (f) f.focus(); }
  });
  d.addEventListener('keydown', e => { if (e.key === 'Escape' && !sheet.hidden) { closeSheet(); menu.focus(); } });

  /* boot: picks from ?v=, then saved picks, else all version 1 */
  let picks = null;
  try { picks = new URL(location.href).searchParams.get('v'); } catch (e) { picks = null; }
  if (!/^[123]{10}$/.test(picks || '')) picks = store.get('ap-picks');
  if (!/^[123]{10}$/.test(picks || '')) picks = '1111111111';
  lenisSync(); syncFx();
  SECS.forEach((s, k) => mount(s, +picks[k], +picks[k] === 1));
  syncPicks();
  if (ST) {
    if (d.fonts && d.fonts.ready) d.fonts.ready.then(() => ST.refresh());
    window.addEventListener('load', () => ST.refresh());
  }
  mqDesk.addEventListener('change', () => { lenisSync(); remountAll(); });
})();
