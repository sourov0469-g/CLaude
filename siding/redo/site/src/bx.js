/* BX — the homepage button system (GATE-BUTTONS). Runs on the homepage view only (html.bx); subpages are untouched.
   1. Label roll (Lando Norris): every .btn label is split into characters that ride up to a duplicate, 14 ms apart;
      the original text stays readable to screen readers in a hidden span. The .tab icon gets a twin for Lusion's
      slide-through.
   2. Physics for every control (delegated; Web Animations on the individual `scale` / `translate` properties, so it
      composes with each version's own `transform` and never replaces it):
      - hover (fine pointer): small controls lift 2 px, wide rows 1 px, tiles zoom 1.2%; huge surfaces and draggable
        pieces keep their own hover;
      - press: down to .955 (small) / .985 (large) in 110 ms, held at least 90 ms so a quick tap still shows, then a
        spring release with a small overshoot; the first icon inside pops;
      - keyboard: Enter / Space give the same press-and-spring pulse;
      - focus ring: snaps in from 9 px out when focus is keyboard-visible;
      - draggable controls (touch-action:none) and reduced motion get a brightness press instead of any movement;
      - disabled controls get nothing. */
window.Bx = (function () {
  const SEL = ':is(button,a[href],[role="button"],[role="radio"],[role="tab"],[role="switch"],[role="checkbox"],summary,label.tile)';
  const OUT = 'cubic-bezier(.4,0,.1,1)';
  const inScope = (el) => !!el.closest('main .slot, header.hdr, .mbar');
  const off = (el) => el.disabled || el.getAttribute('aria-disabled') === 'true' || el.closest('[data-bx="off"]');
  const small = (el) => { const r = el.getBoundingClientRect(); return r.height <= 80 && r.width <= 480; };
  const pair = (v, d) => { if (!v || v === 'none') return [d, d]; const p = v.split(' ').map(parseFloat); return [p[0], p.length > 1 ? p[1] : (d === 1 ? p[0] : 0)]; };
  const S = new WeakMap();   // el -> { base:[sx,sy], press, lift, t0 }
  const state = (el) => { let s = S.get(el); if (!s) { s = {}; S.set(el, s); } return s; };

  /* ---------- 1. label roll ---------- */
  function roll(btn) {
    if (btn.dataset.bxr || !inScope(btn)) return; btn.dataset.bxr = 1; let i = 0;
    [...btn.childNodes].forEach((n) => {
      if (n.nodeType !== 3 || !n.textContent.trim()) return;
      const txt = n.textContent, t = document.createElement('span'); t.className = 'bx-t';
      const row = () => { const w = document.createElement('span'); w.className = 'bx-w'; w.setAttribute('aria-hidden', 'true');
        [...txt].forEach((ch, k) => { const c = document.createElement('span'); c.className = 'bx-c'; c.style.setProperty('--i', i + k); c.textContent = ch; w.appendChild(c); }); return w; };
      const sr = document.createElement('span'); sr.className = 'bx-sr'; sr.textContent = txt;
      sr.style.cssText = 'position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap';
      t.append(sr, row(), row()); i += txt.length; n.replaceWith(t);
    });
    const tab = btn.querySelector('.tab'), svg = tab && tab.querySelector('svg');
    if (svg && !tab.querySelector('.bx-i2')) { const c = svg.cloneNode(true); c.classList.add('bx-i2'); c.setAttribute('aria-hidden', 'true'); tab.appendChild(c); }
  }
  const rollAll = (root) => { if (root.matches && root.matches('.btn')) roll(root); root.querySelectorAll && root.querySelectorAll('.btn').forEach(roll); };

  /* ---------- 2. physics ---------- */
  let RM = false;
  const still = (el) => RM || getComputedStyle(el).touchAction === 'none';
  // hover by size: small controls lift 2 px, wide rows lift 1 px, tiles zoom 1.2%; huge surfaces keep their own hover
  const mode = (el) => { const r = el.getBoundingClientRect(); if (r.height <= 80 && r.width <= 480) return 2; if (r.height <= 90) return 1; if (r.width * r.height <= 420000) return 'z'; return 0; };
  function lift(el, up) {
    const s = state(el);
    if (up) { if (s.lift) { s.lift.playbackRate = 1; s.lift.play(); return; }
      const m = mode(el); if (!m) return;
      if (m === 'z') { const [x, y] = pair(getComputedStyle(el).scale, 1);
        s.lift = el.animate([{ scale: `${x} ${y}` }, { scale: `${x * 1.012} ${y * 1.012}` }], { duration: 320, easing: OUT, fill: 'forwards' }); }
      else { const [tx, ty] = pair(getComputedStyle(el).translate, 0);
        s.lift = el.animate([{ translate: `${tx}px ${ty}px` }, { translate: `${tx}px ${ty - m}px` }], { duration: 260, easing: OUT, fill: 'forwards' }); }
    } else if (s.lift) { const a = s.lift; a.playbackRate = -1.15; a.play(); a.onfinish = () => { if (a.playbackRate < 0) { a.cancel(); if (s.lift === a) s.lift = null; } }; }
  }
  function press(el) {
    const s = state(el); if (s.press) return;
    s.t0 = performance.now(); s.small = small(el);
    if (still(el)) { s.press = el.animate([{ filter: 'brightness(1)' }, { filter: 'brightness(.9)' }], { duration: 90, fill: 'forwards' }); s.still = true; return; }
    s.still = false; s.base = pair(getComputedStyle(el).scale, 1); const k = s.small ? 0.955 : 0.985, [x, y] = s.base;
    s.press = el.animate([{ scale: `${x} ${y}` }, { scale: `${x * k} ${y * k}` }], { duration: 110, easing: 'cubic-bezier(.2,0,.2,1)', fill: 'forwards' }); s.k = k;
  }
  function release(el) {
    const s = state(el); if (!s.press) return;
    const wait = Math.max(0, 90 - (performance.now() - s.t0));
    setTimeout(() => {
      const p = s.press; s.press = null; if (!p) return;
      if (s.still) { el.animate([{ filter: 'brightness(.9)' }, { filter: 'brightness(1)' }], { duration: 160 }); p.cancel(); return; }
      const [x, y] = s.base, k = s.k, o = s.small ? 1.03 : 1.008;
      el.animate([{ scale: `${x * k} ${y * k}` }, { scale: `${x * o} ${y * o}`, offset: 0.42 }, { scale: `${x} ${y}` }], { duration: s.small ? 420 : 360, easing: 'cubic-bezier(.3,0,.2,1)' });
      p.cancel(); pop(el);
    }, wait);
  }
  function pop(el) {
    const i = el.querySelector(':scope > svg, :scope > .tab, :scope > i > svg, :scope > span > svg');
    if (i && !RM) i.animate([{ scale: '1' }, { scale: '1.18', offset: 0.4 }, { scale: '1' }], { duration: 320, easing: OUT });
  }
  function pulse(el) { press(el); setTimeout(() => release(el), 90); }
  function ring(el) {
    if (RM || !el.matches(':focus-visible')) return; const c = getComputedStyle(el); if (c.outlineStyle === 'none') return;
    el.animate([{ outlineOffset: `${parseFloat(c.outlineOffset) + 6}px`, outlineColor: 'transparent' }, { outlineOffset: c.outlineOffset, outlineColor: c.outlineColor }], { duration: 240, easing: OUT });
  }

  function init() {
    if (document.querySelector('main[data-page]:not([data-page="home"])')) return;   // a subpage view: left exactly as delivered
    document.documentElement.classList.add('bx');
    RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
    rollAll(document);
    const m = document.querySelector('main'); if (m) new MutationObserver((ms) => ms.forEach((r) => r.addedNodes.forEach((n) => { if (n.nodeType === 1) rollAll(n); }))).observe(m, { childList: true, subtree: true });
    const target = (e) => { const el = e.target.closest && e.target.closest(SEL); return el && inScope(el) && !off(el) ? el : null; };
    // capture phase, so a version that stops propagation on its own controls still gets the physics
    document.addEventListener('pointerover', (e) => { if (e.pointerType !== 'mouse' || RM) return; const el = target(e); if (!el || el.contains(e.relatedTarget)) return;
      if (!el.matches('.btn,.tel') && getComputedStyle(el).touchAction !== 'none') lift(el, true); }, true);
    document.addEventListener('pointerout', (e) => { const el = target(e); if (el && !el.contains(e.relatedTarget)) { lift(el, false); if (e.pointerType === 'mouse') release(el); } }, true);
    document.addEventListener('pointerdown', (e) => { if (e.button !== 0) return; const el = target(e); if (!el) return; press(el);
      // a control that captures the pointer is being dragged: no scale or lift under the drag, a brightness press instead
      setTimeout(() => { if (el.hasPointerCapture && el.hasPointerCapture(e.pointerId)) { const s = state(el); if (s.press && !s.still) { s.press.cancel(); s.still = true;
        s.press = el.animate([{ filter: 'brightness(1)' }, { filter: 'brightness(.9)' }], { duration: 90, fill: 'forwards' }); } lift(el, false); } }, 0);
      const up = () => { release(el); removeEventListener('pointerup', up); removeEventListener('pointercancel', up); };
      addEventListener('pointerup', up); addEventListener('pointercancel', up); }, true);
    document.addEventListener('keydown', (e) => { if (e.repeat || (e.key !== 'Enter' && e.key !== ' ')) return; const el = target(e); if (!el || el !== document.activeElement) return;
      if (e.key === ' ' && el.tagName === 'A') return; pulse(el); }, true);
    document.addEventListener('focusin', (e) => { const el = target(e); if (el) ring(el); }, true);
    document.addEventListener('touchstart', () => {}, { passive: true });   // lets :active show on iOS taps
  }
  return { init, roll };
})();
