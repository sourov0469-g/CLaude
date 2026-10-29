/* Austin Pro homepage v3: page-wide systems (PLAN-HOME-V3.md G1-G3).
   Cursor: S1321 (fixed, pointer-events none, quickTo 0.35 power3.out, labelled targets x1.75, off on coarse pointers and
   reduced motion), S0197 (follower starts at -100,-100; per-element states are discrete), S0086 (three-line glyph that
   morphs, expo-out 0.4 s, round caps), S1333 (reset the follower when the pointer leaves a section), S0159 (every
   effect also has a keyboard and touch path in the element itself).
   Magnetic: S1321 strength 0.18, quickTo 0.45 power3.out, translate only.
   Depth: S1330 one damped pointer target, alpha = 1-(1-0.055)^(dt*60), unequal opposing layers, settle to 3 decimals.
   Headings: S0184 split + Mona Sans weight axis answering pointer distance. */
(() => {
  'use strict';
  const G = window.gsap;
  const d = document, root = d.documentElement;
  const mqFine = matchMedia('(hover: hover) and (pointer: fine)');
  const mqReduce = matchMedia('(prefers-reduced-motion: reduce)');
  let enabled = false;
  const API = window.APFX = { on: false, paint: '#D42125', depthLayers: new Set(), motion: true };

  /* ---------- S0086 glyphs: exactly three lines in a 14 x 14 box; unused lines collapse to the centre ---------- */
  const C = { x1: 7, y1: 7, x2: 7, y2: 7, o: 0 };
  const L = (x1, y1, x2, y2) => ({ x1, y1, x2, y2, o: 1 });
  const GLYPH = {
    none: [C, C, C],
    arrow: [L(2, 7, 12, 7), L(7.5, 2.5, 12, 7), L(7.5, 11.5, 12, 7)],
    plus: [L(2, 7, 12, 7), L(7, 2, 7, 12), C],
    dots: [L(3, 7, 3, 7), L(7, 7, 7, 7), L(11, 7, 11, 7)],
    minus: [L(2, 7, 12, 7), C, C]
  };
  const ROT = { arrow: 0, arrowUp: -45, plus: 0, cross: 45 };   // rotation groups: arrow, plus-cross

  let cur, dot, ring, glyph, lines, tag, qx, qy, rx, ry;
  let state = '', host = null, px = -100, py = -100, pressed = false;

  function build() {
    cur = d.createElement('div');
    cur.className = 'cur';
    cur.setAttribute('aria-hidden', 'true');
    cur.innerHTML = '<i class="cur-dot"></i><span class="cur-ring"><svg class="cur-g" viewBox="0 0 14 14"><line/><line/><line/></svg><b class="cur-t"></b></span>';
    d.body.appendChild(cur);
    dot = cur.querySelector('.cur-dot'); ring = cur.querySelector('.cur-ring'); glyph = cur.querySelector('.cur-g');
    lines = Array.from(glyph.querySelectorAll('line')); tag = cur.querySelector('.cur-t');
    setGlyph('none', 0, true);
    G.set([dot, ring], { x: -100, y: -100 });
    qx = G.quickTo(dot, 'x', { duration: 0.12, ease: 'power3.out' });
    qy = G.quickTo(dot, 'y', { duration: 0.12, ease: 'power3.out' });
    rx = G.quickTo(ring, 'x', { duration: 0.35, ease: 'power3.out' });
    ry = G.quickTo(ring, 'y', { duration: 0.35, ease: 'power3.out' });
  }

  let glyphName = '';
  function setGlyph(name, rot, instant) {
    const shape = GLYPH[name] || GLYPH.none;
    const grouped = (glyphName === 'arrow' && name === 'arrow') || (glyphName === 'plus' && name === 'plus');
    lines.forEach((ln, i) => {
      const s = shape[i];
      G.to(ln, { attr: { x1: s.x1, y1: s.y1, x2: s.x2, y2: s.y2 }, opacity: s.o, duration: instant ? 0 : 0.4, ease: 'expoOut', overwrite: 'auto' });
    });
    // grouped icons rotate between each other; non-grouped transitions jump rotation instantly (S0086)
    G.to(glyph, { rotation: rot || 0, duration: grouped && !instant ? 0.4 : 0, ease: 'expoOut', overwrite: 'auto', transformOrigin: '50% 50%' });
    glyphName = name;
  }

  /* states: hero CTA, alternate CTA, drag, view, map, paint, text, link */
  const STATES = {
    '': { g: 'none' },
    link: { g: 'arrow', r: 0 },
    hero: { g: 'arrow', r: 0 },
    alt: { g: 'arrow', r: -45 },
    drag: { g: 'dots' },
    view: { g: 'plus', r: 0 },
    map: { g: 'plus', r: 0 },
    paint: { g: 'none' },
    text: { g: 'none' }
  };

  function resolve(t) {
    if (!t || !t.closest) return [null, ''];
    const el = t.closest('[data-cur], a[href], button, [role="slider"], [role="radio"], [role="tab"], label, select, summary, h1, .h2x, .display');
    if (!el) return [null, ''];
    if (el.dataset.cur) return [el, el.dataset.cur];
    if (/^H1$/.test(el.tagName) || el.classList.contains('h2x') || el.classList.contains('display')) return [el, 'text'];
    return [el, 'link'];
  }

  function setState(next, el) {
    if (next === state && el === host) return;
    if (host && host !== el && host._magOff) host._magOff();
    state = next; host = el;
    cur.className = 'cur' + (next ? ' cur--' + next : '') + (pressed ? ' is-down' : '');
    const s = STATES[next] || STATES[''];
    setGlyph(s.g, s.r);
    tag.textContent = el && el.dataset.curLabel ? el.dataset.curLabel : '';
    if (next === 'hero' && el) {
      const r = el.getBoundingClientRect();
      ring.style.setProperty('--cw', (r.width + 14) + 'px');
      ring.style.setProperty('--ch', (r.height + 14) + 'px');
    }
    if (next === 'paint') ring.style.setProperty('--paint', API.paint);
  }

  function onMove(e) {
    if (e.pointerType && e.pointerType !== 'mouse') return;
    px = e.clientX; py = e.clientY;
    const [el, st] = resolve(e.target);
    setState(st, el);
    qx(px); qy(py);
    if (state === 'hero' && host) {
      const r = host.getBoundingClientRect();
      rx(r.left + r.width / 2 + (px - (r.left + r.width / 2)) * 0.18);
      ry(r.top + r.height / 2 + (py - (r.top + r.height / 2)) * 0.18);
    } else { rx(px); ry(py); }
    magnet(e);
    heads(e);
  }

  /* ---------- magnetic buttons (S1321): translate only, strength 0.18, 0.45 s power3.out ---------- */
  function magnet(e) {
    const el = e.target.closest && e.target.closest('[data-magnet]');
    if (!el) return;
    if (!el._mq) {
      el._mq = [G.quickTo(el, 'x', { duration: 0.45, ease: 'power3.out' }), G.quickTo(el, 'y', { duration: 0.45, ease: 'power3.out' })];
      const off = () => { el._mq[0](0); el._mq[1](0); };
      el._magOff = off;
      el.addEventListener('pointerleave', off);
    }
    const r = el.getBoundingClientRect();
    el._mq[0]((e.clientX - (r.left + r.width / 2)) * 0.18);
    el._mq[1]((e.clientY - (r.top + r.height / 2)) * 0.18);
  }

  /* ---------- headings answer the passing cursor: word weight on the variable axis (S0184 split, Mona Sans wght) ---------- */
  let headRAF = 0, lastHead = null;
  function heads(e) {
    if (headRAF) return;
    headRAF = requestAnimationFrame(() => {
      headRAF = 0;
      const h = e.target.closest && e.target.closest('.sec [data-split].is-split');
      if (lastHead && lastHead !== h) relax(lastHead);
      lastHead = h;
      if (!h) return;
      const ws = h.querySelectorAll('.w');
      ws.forEach(w => {
        const r = w.getBoundingClientRect();
        const dx = Math.max(r.left - px, 0, px - r.right), dy = Math.max(r.top - py, 0, py - r.bottom);
        const k = Math.max(0, 1 - Math.hypot(dx, dy) / 140);
        w.style.setProperty('--hw', k.toFixed(3));
      });
    });
  }
  function relax(h) { h.querySelectorAll('.w').forEach(w => w.style.setProperty('--hw', '0')); }

  function onDown(e) { if (e.pointerType !== 'mouse') return; pressed = true; cur.classList.add('is-down'); if (state === 'drag') setGlyph('minus'); if (state === 'view') setGlyph('plus', 45); }
  function onUp() { pressed = false; if (!cur) return; cur.classList.remove('is-down'); const s = STATES[state] || STATES['']; setGlyph(s.g, s.r); }
  function onLeaveDoc() { if (!cur) return; cur.classList.add('is-gone'); }
  function onEnterDoc() { if (!cur) return; cur.classList.remove('is-gone'); }
  // S1333: reset the follower when the pointer crosses into another section so it never streaks across
  let secNow = null;
  function onOver(e) {
    const s = e.target.closest && e.target.closest('.sec');
    if (s !== secNow) { secNow = s; if (cur && ring) { G.set(ring, { x: e.clientX, y: e.clientY }); } }
  }

  /* ---------- depth: one damped pointer target split across unequal layers (S1330) ---------- */
  const tgt = { x: 0, y: 0 }, sm = { x: 0, y: 0 };
  let last = 0;
  function depthTick(t) {
    const dt = Math.min(1 / 30, last ? (t - last) : 1 / 60); last = t;
    const a = 1 - Math.pow(1 - 0.055, dt * 60);
    const nx = Math.round((sm.x + (tgt.x - sm.x) * a) * 1000) / 1000, ny = Math.round((sm.y + (tgt.y - sm.y) * a) * 1000) / 1000;
    if (nx === sm.x && ny === sm.y) return;
    sm.x = nx; sm.y = ny;
    API.depthLayers.forEach(el => {
      const k = +el.dataset.depth || 0, rot = +el.dataset.tilt || 0;
      el.style.transform = `translate3d(${(-sm.x * 26 * k).toFixed(2)}px, ${(sm.y * 16 * k).toFixed(2)}px, 0)` + (rot ? ` rotateY(${(sm.x * 3 * rot).toFixed(2)}deg) rotateX(${(-sm.y * 1.5 * rot).toFixed(2)}deg)` : '');
    });
  }
  function depthMove(e) {
    if (e.pointerType === 'touch') return;
    tgt.x = e.clientX / innerWidth * 2 - 1; tgt.y = e.clientY / innerHeight * 2 - 1;
  }
  API.depth = (scope) => {
    const els = Array.from(scope.querySelectorAll('[data-depth]'));
    if (!enabled) return () => {};
    const io = new IntersectionObserver(ents => ents.forEach(en => { if (en.isIntersecting) API.depthLayers.add(en.target); else API.depthLayers.delete(en.target); }), { rootMargin: '120px 0px' });
    els.forEach(el => io.observe(el));
    return () => { io.disconnect(); els.forEach(el => { API.depthLayers.delete(el); el.style.transform = ''; }); };
  };
  API.setPaint = hex => { API.paint = hex; if (ring) ring.style.setProperty('--paint', hex); };

  function enable() {
    if (enabled || !G) return;
    enabled = true; API.on = true;
    if (!cur) build();
    root.classList.add('has-cur');
    cur.hidden = false;
    d.addEventListener('pointermove', onMove, { passive: true });
    d.addEventListener('pointermove', depthMove, { passive: true });
    d.addEventListener('pointerover', onOver, { passive: true });
    d.addEventListener('pointerdown', onDown, { passive: true });
    d.addEventListener('pointerup', onUp, { passive: true });
    root.addEventListener('pointerleave', onLeaveDoc);
    root.addEventListener('pointerenter', onEnterDoc);
    window.addEventListener('blur', onUp);
    G.ticker.add(depthTick);
  }
  function disable() {
    if (!enabled) return;
    enabled = false; API.on = false;
    root.classList.remove('has-cur');
    if (cur) cur.hidden = true;
    d.removeEventListener('pointermove', onMove);
    d.removeEventListener('pointermove', depthMove);
    d.removeEventListener('pointerover', onOver);
    d.removeEventListener('pointerdown', onDown);
    d.removeEventListener('pointerup', onUp);
    root.removeEventListener('pointerleave', onLeaveDoc);
    root.removeEventListener('pointerenter', onEnterDoc);
    window.removeEventListener('blur', onUp);
    G.ticker.remove(depthTick);
    API.depthLayers.forEach(el => { el.style.transform = ''; });
    d.querySelectorAll('[data-magnet]').forEach(el => G.set(el, { x: 0, y: 0 }));
  }
  API.sync = () => { (API.motion && mqFine.matches && !!G) ? enable() : disable(); };
  if (G && window.CustomEase) window.CustomEase.create('expoOut', '0.19,1,0.22,1');
  mqFine.addEventListener('change', API.sync);
  void mqReduce;
})();
