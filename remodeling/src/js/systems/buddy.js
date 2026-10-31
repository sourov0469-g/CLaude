/* Pointer service + cursor companion ("buddy"), PLAN-V3 §2.1.
   Mechanism refs: [BANK] P10 attribute-state follower (state from the element under the pointer),
   [BANK] Andrew Reff 381 (named state presets tweened on change), S1303 eye lerp .06-.12,
   S0489 / S0792 idle blink, [BANK] 344 frame-independent smoothing k = 1 - e^(-damp*dt),
   [BANK] 239 spring .06 / .85 for the level bubble, [BANK] 229 asymmetric hover in .5 / out .2,
   [BANK] Built Kindly 203 persisted motion toggle.
   FULL §4 "no plain or fixed cursor": on fine pointers the system arrow is replaced by an exact, animated pointer tip
   (a pencil nib that leans with the motion and changes form per target); the buddy trails it. Text fields keep the
   native caret (C5). Touch, reduced motion and "No buddy" restore the system cursor. */
(function () {
  var doc = document, root = doc.documentElement;
  var LS = 'ez-buddy';
  var VARIANTS = ['hat', 'level', 'cone', 'off'];
  var NAMES = { hat: 'Hard hat', level: 'Level', cone: 'Traffic cone', off: 'No buddy' };
  var ICONS = {
    hat: '<path d="M4 15a8 8 0 0 1 16 0z" fill="' + EZ.c('--color-art-accent') + '\" stroke="currentColor" stroke-width="1.5"/><rect x="2" y="15" width="20" height="3" rx="1.5" fill="' + EZ.c('--color-art-accent') + '\" stroke="currentColor" stroke-width="1.5"/>',
    level: '<rect x="2" y="9" width="20" height="7" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="8" y="10.6" width="8" height="3.8" rx="1.9" fill="' + EZ.c('--color-art-accent-soft') + '\"/><circle cx="12" cy="12.5" r="1.3" fill="currentColor"/>',
    cone: '<path d="M10 3h4l5 16H5z" fill="' + EZ.c('--color-art-accent') + '\" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M8 11h8" stroke="' + EZ.c('--color-surface') + '\" stroke-width="2.4"/><rect x="3" y="18.5" width="18" height="3" rx="1" fill="' + EZ.c('--color-art-accent') + '\" stroke="currentColor" stroke-width="1.3"/>',
    off: '<circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M6.5 17.5l11-11" stroke="currentColor" stroke-width="1.6"/>'
  };

  /* ---------- pointer service: one source of truth for the buddy and the section fields ---------- */
  var P = EZ.ptr = { x: -1, y: -1, vx: 0, vy: 0, has: false, target: null, zone: null, t: 0, subs: [] };
  P.on = function (fn) { P.subs.push(fn); };
  function emit(type) { for (var i = 0; i < P.subs.length; i++) P.subs[i](type, P); }
  function zoneOf(el) {
    if (!el || !el.closest) return null;
    var s = el.closest('[data-section]');
    if (s) return s.dataset.section;
    return el.closest('.foot') ? 'footer' : null;
  }
  function setTarget(el) {
    P.target = el;
    var z = zoneOf(el);
    if (z !== P.zone) { P.zone = z; emit('zone'); }
    emit('target');
  }
  var hitQueued = false;
  function rehit() {
    hitQueued = false;
    if (!P.has) return;
    var el = doc.elementFromPoint(P.x, P.y);
    if (el !== P.target) setTarget(el);
  }
  function queueHit() { if (!hitQueued) { hitQueued = true; requestAnimationFrame(rehit); } }

  function initPointer() {
    var lx = 0, ly = 0, lt = 0;
    doc.addEventListener('pointermove', function (e) {
      if (e.pointerType === 'touch') return;
      var now = performance.now(), dt = Math.max(8, now - (lt || now - 16));
      if (P.has) {
        // velocity in px/frame@60, lightly smoothed
        P.vx = P.vx * .6 + ((e.clientX - lx) / dt * 16.7) * .4;
        P.vy = P.vy * .6 + ((e.clientY - ly) / dt * 16.7) * .4;
      }
      lx = P.x = e.clientX; ly = P.y = e.clientY; lt = P.t = now;
      var first = !P.has;
      P.has = true;
      if (first) { setTarget(e.target); emit('enter'); }
      emit('move');
    }, { passive: true });
    doc.addEventListener('pointerover', function (e) {
      if (e.pointerType === 'touch') return;
      if (e.target !== P.target) setTarget(e.target);
    }, { passive: true });
    doc.addEventListener('pointerout', function (e) {
      if (!e.relatedTarget && e.pointerType !== 'touch') { P.has = false; emit('leave'); }
    });
    window.addEventListener('blur', function () { P.has = false; emit('leave'); });
    // content moves under a still pointer while scrolling: re-hit-test (flawless rule: no stale states)
    window.addEventListener('scroll', queueHit, { passive: true });
    doc.addEventListener('pointerdown', function (e) { if (e.pointerType !== 'touch') emit('down'); });
    doc.addEventListener('pointerup', function (e) { if (e.pointerType !== 'touch') emit('up'); });
    // a press can end without a pointerup (a native drag takes over, the window loses focus): never leave the tip pressed
    doc.addEventListener('pointercancel', function (e) { if (e.pointerType !== 'touch') emit('up'); });
    doc.addEventListener('lostpointercapture', function () { emit('up'); }, true);
    doc.addEventListener('dragend', function () { emit('up'); }, true);
    window.addEventListener('blur', function () { emit('up'); });
  }
  EZ.ptr.rehit = queueHit;

  /* ---------- buddy artwork (viewBox -40 -40 80 80; outlines in ink so it reads on teal, ink and daylight grounds) ---------- */
  var INK = EZ.c('--color-art-line'), YEL = EZ.c('--color-art-accent'), YEL_D = EZ.c('--color-art-accent'), SKIN = EZ.c('--color-border-subtle'), STEEL = EZ.c('--color-border'), TEAL = EZ.c('--color-art-accent'), DEEP = EZ.c('--color-art-accent');
  function eye(x, y, rx, ry) {
    return '<g transform="translate(' + x + ' ' + y + ')"><g class="bd-eye"><ellipse rx="' + rx + '" ry="' + ry + '" fill="' + EZ.c('--color-surface') + '\" stroke="' + INK + '" stroke-width="1.4"/>' +
      '<circle class="bd-pupil" r="' + (rx * .5).toFixed(2) + '" fill="' + INK + '"/><circle class="bd-glint" cx="-.9" cy="-1.3" r=".8" fill="' + EZ.c('--color-surface') + '\"/></g></g>';
  }
  var ART = {
    hat:
      '<g class="bd-head">' +
        '<circle cx="0" cy="9" r="18.5" fill="' + SKIN + '" stroke="' + INK + '" stroke-width="2"/>' +
        '<g class="bd-eyes">' + eye(-7, 10, 4.6, 5.2) + eye(7, 10, 4.6, 5.2) + '</g>' +
        '<path class="bd-mouth" d="M-4.5 19.5 Q0 22.5 4.5 19.5" fill="none" stroke="' + INK + '" stroke-width="1.7" stroke-linecap="round"/>' +
      '</g>' +
      '<g class="bd-hat">' +
        '<path d="M-19 -1.5 C-19 -16 -10 -23.5 0 -23.5 C10 -23.5 19 -16 19 -1.5 Z" fill="' + YEL + '" stroke="' + INK + '" stroke-width="2" stroke-linejoin="round"/>' +
        '<path d="M-4.2 -23 V-2 M4.2 -23 V-2" stroke="' + YEL_D + '" stroke-width="2.6"/>' +
        '<rect x="-26" y="-3.5" width="52" height="6" rx="3" fill="' + YEL + '" stroke="' + INK + '" stroke-width="2"/>' +
        '<circle cx="11.5" cy="-10" r="3" fill="' + TEAL + '" stroke="' + INK + '" stroke-width="1"/>' +
      '</g>',
    level:
      '<g class="bd-head">' +
        '<rect x="-31" y="-10" width="62" height="20" rx="3.5" fill="' + STEEL + '" stroke="' + INK + '" stroke-width="2"/>' +
        '<rect x="-31" y="-10" width="9" height="20" rx="3" fill="' + DEEP + '" stroke="' + INK + '" stroke-width="2"/>' +
        '<rect x="22" y="-10" width="9" height="20" rx="3" fill="' + DEEP + '" stroke="' + INK + '" stroke-width="2"/>' +
        '<path d="M-22 -10 V10 M22 -10 V10" stroke="' + INK + '" stroke-width="1"/>' +
        '<rect class="bd-vial" x="-14" y="-6.2" width="28" height="12.4" rx="6.2" fill="' + EZ.c('--color-art-accent-soft') + '\" stroke="' + INK + '" stroke-width="1.6"/>' +
        '<g class="bd-bubble">' + eye(0, 0, 4.4, 3.6) + '</g>' +
        '<path d="M-5.2 -6.2 V6.2 M5.2 -6.2 V6.2" stroke="' + INK + '" stroke-width="1.2"/>' +
        '<circle cx="-17.5" cy="0" r="1.3" fill="' + INK + '"/><circle cx="17.5" cy="0" r="1.3" fill="' + INK + '"/>' +
      '</g>',
    cone:
      '<g class="bd-head">' +
        '<path d="M-7 -27 H7 L20 20 H-20 Z" fill="' + EZ.c('--color-art-accent') + '\" stroke="' + INK + '" stroke-width="2" stroke-linejoin="round"/>' +
        '<path d="M-11.6 -10 H11.6 L13.4 -3.5 H-13.4 Z" fill="' + EZ.c('--color-surface') + '\" stroke="' + INK + '" stroke-width="1.2"/>' +
        '<g class="bd-eyes">' + eye(-6, 6, 4.2, 4.8) + eye(6, 6, 4.2, 4.8) + '</g>' +
        '<path class="bd-mouth" d="M-3.5 14 Q0 16.4 3.5 14" fill="none" stroke="' + INK + '" stroke-width="1.5" stroke-linecap="round"/>' +
        '<rect x="-26" y="20" width="52" height="7" rx="2" fill="' + EZ.c('--color-art-accent') + '\" stroke="' + INK + '" stroke-width="2"/>' +
      '</g>'
  };
  // one small tool per section: the buddy picks it up as it enters (PLAN-V3 §2.3)
  var TOOLS = {
    hero: '<path d="M-7 5 L4 -6 L7.5 -2.5 L-3.5 8.5 Z" fill="' + YEL + '" stroke="' + INK + '" stroke-width="1.3" stroke-linejoin="round"/><path d="M-7 5 L-8.6 10 L-3.5 8.5 Z" fill="' + SKIN + '" stroke="' + INK + '" stroke-width="1.1" stroke-linejoin="round"/><path d="M4 -6 L7.5 -2.5" stroke="' + DEEP + '" stroke-width="2.4"/>',
    proof: '<rect x="-8" y="-3.5" width="11" height="7" rx="1.5" fill="' + DEEP + '" stroke="' + INK + '" stroke-width="1.2"/><path d="M3 -4.5 L7 -6.5 V6.5 L3 4.5 Z" fill="' + STEEL + '" stroke="' + INK + '" stroke-width="1.2" stroke-linejoin="round"/><path class="bd-beam" d="M7 -6 L19 -11 V11 L7 6 Z" fill="' + EZ.c('--color-art-fill') + '\" opacity=".55"/>',
    services: '<rect x="-9" y="-3" width="9" height="6" rx="2" fill="' + TEAL + '" stroke="' + INK + '" stroke-width="1.2"/><path d="M0 0 H9" stroke="' + STEEL + '" stroke-width="2.2"/><path d="M9 -1.6 L11.5 0 L9 1.6" fill="' + STEEL + '" stroke="' + INK + '" stroke-width=".8"/>',
    ba: '<rect x="-7" y="-9" width="14" height="18" rx="3" fill="' + DEEP + '" stroke="' + INK + '" stroke-width="1.3"/><rect x="-4" y="-6" width="8" height="5" rx="1" fill="' + EZ.c('--color-border') + '\"/><circle class="bd-led" cx="0" cy="4" r="2" fill="' + EZ.c('--color-art-line-soft') + '\"/>',
    process: '<circle cx="-2" cy="0" r="6.5" fill="' + YEL + '" stroke="' + INK + '" stroke-width="1.3"/><circle cx="-2" cy="0" r="2" fill="' + INK + '"/><path d="M4.5 0 H13" stroke="' + EZ.c('--color-art-accent') + '\" stroke-width="1.4" stroke-dasharray="2 1.4"/>',
    financing: '<path d="M0 -10 V-2" stroke="' + INK + '" stroke-width="1"/><path d="M-4 -2 H4 L0 9 Z" fill="' + STEEL + '" stroke="' + INK + '" stroke-width="1.3" stroke-linejoin="round"/>',
    work: '<rect x="-9" y="-5" width="18" height="12" rx="2" fill="' + STEEL + '" stroke="' + INK + '" stroke-width="1.3"/><rect x="-4" y="-8" width="7" height="3.5" rx="1" fill="' + STEEL + '" stroke="' + INK + '" stroke-width="1.1"/><circle cx="0" cy="1" r="3.6" fill="' + DEEP + '" stroke="' + INK + '" stroke-width="1.1"/>',
    reviews: '<path d="M-3 -9 L5 -3 L1 2 L-7 -4 Z" fill="' + DEEP + '" stroke="' + INK + '" stroke-width="1.2" stroke-linejoin="round"/><path d="M-1 -1 L-6 9" stroke="' + INK + '" stroke-width="1.4"/><path class="bd-beam" d="M5 -3 L16 4 L8 11 L1 2 Z" fill="' + EZ.c('--color-art-fill') + '\" opacity=".6"/>',
    towns: '<circle cx="0" cy="0" r="8" fill="' + EZ.c('--color-surface') + '\" stroke="' + INK + '" stroke-width="1.4"/><path class="bd-needle" d="M0 -6 L2 0 L0 6 L-2 0 Z" fill="' + EZ.c('--color-art-accent') + '\" stroke="' + INK + '" stroke-width=".6"/>',
    consult: '<rect x="-8" y="-5" width="13" height="10" rx="1.5" fill="' + YEL + '" stroke="' + INK + '" stroke-width="1.2"/><circle cx="5" cy="0" r="1.6" fill="' + EZ.c('--color-art-accent') + '\"/><path d="M6.5 0 H16" stroke="' + EZ.c('--color-art-accent') + '\" stroke-width="1.2"/>',
    footer: '<circle cx="-4" cy="0" r="4.6" fill="none" stroke="' + YEL + '" stroke-width="2.2"/><path d="M0.5 0 H10 M7 0 V3.5 M9.5 0 V3" stroke="' + YEL + '" stroke-width="2.2" stroke-linecap="round"/>'
  };

  /* ---------- the pointer tip: exact, animated, never a plain arrow (FULL §4) ----------
     Drawn at the hotspot (0,0 = the pointer). Forms: nib (rest), nib + underline (link), target ring (button),
     crosshair (image), rule (heading), frame (card), arrows (drag). Leans with velocity; squashes on press.
     Colour follows the section under it. */
  var TIP_C = { hero: EZ.c('--color-art-accent'), proof: EZ.c('--color-art-accent'), services: EZ.c('--color-art-accent'), ba: EZ.c('--color-art-accent'), process: EZ.c('--color-border'), financing: EZ.c('--color-art-accent'),
    work: EZ.c('--color-art-accent'), reviews: EZ.c('--color-art-accent'), towns: EZ.c('--color-art-accent'), consult: EZ.c('--color-art-accent'), footer: EZ.c('--color-art-accent') };
  var tip, tipG, tipLean = 0;
  function buildTip() {
    tip = doc.createElement('div');
    tip.className = 'ptip';
    tip.setAttribute('aria-hidden', 'true');
    tip.innerHTML = '<svg viewBox="-20 -20 40 40" width="40" height="40"><g class="pt-g">' +
      '<g class="pt-nib"><path d="M0 0 L4 11 L11 4 Z" fill="currentColor" stroke="' + INK + '" stroke-width="1.4" stroke-linejoin="round"/><path d="M0 0 L1.8 4.6 L4.6 1.8 Z" fill="' + INK + '"/>' +
        '<path d="M4 11 L13 20 M11 4 L20 13" stroke="' + INK + '" stroke-width="1.4"/><path d="M4 11 L11 4 L20 13 L13 20 Z" fill="' + SKIN + '" stroke="' + INK + '" stroke-width="1.2" opacity=".95"/></g>' +
      '<path class="pt-ul" d="M2 14 H16" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>' +
      '<g class="pt-ring"><circle r="9" fill="none" stroke="currentColor" stroke-width="2.2"/><circle r="2.2" fill="currentColor"/></g>' +
      '<g class="pt-cross" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M0 -13 V-5 M0 5 V13 M-13 0 H-5 M5 0 H13"/><circle r="1.6" fill="currentColor" stroke="none"/></g>' +
      '<path class="pt-rule" d="M-9 0 H9 M-9 -5 V5 M9 -5 V5" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>' +
      '<path class="pt-frame" d="M-11 -6 V-11 H-6 M6 -11 H11 V-6 M11 6 V11 H6 M-6 11 H-11 V6" stroke="currentColor" stroke-width="2" fill="none"/>' +
      '<path class="pt-drag" d="M-14 0 H14 M-9 -5 L-14 0 L-9 5 M9 -5 L14 0 L9 5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>' +
      '</g></svg>';
    doc.body.appendChild(tip);
    tipG = tip.querySelector('.pt-g');
  }
  function tipMove() {
    if (!tip) return;
    var want = tip.dataset.state === 'none' || !tip.dataset.state ? EZ.clamp(P.vx * 1.6, -24, 24) : 0;
    tipLean += (want - tipLean) * .35;
    tip.style.transform = 'translate3d(' + P.x.toFixed(1) + 'px,' + P.y.toFixed(1) + 'px,0)';
    tipG.style.transform = 'rotate(' + tipLean.toFixed(1) + 'deg)';
  }

  var B = EZ.buddy = { variant: 'hat', on: false };
  var el, svg, inner, art, toolG, brackets, rafId = 0, last = 0;
  var pos = { x: -200, y: -200 }, vel = { x: 0, y: 0 }, lean = 0, look = { x: 0, y: 0 }, bub = { x: 0, v: 0 };
  var state = 'none', stateEl = null, dock = null, idleT = 0, nextAct = 0, nextBlink = 0, shown = false, scanTw = null, breathTw = null, pressed = false, sigEl = null, sig = '';
  var parts = {};

  // REBRAND Step 6 [S1436]: the exact pointer tip is the cursor; the trailing character is opt-in (Settings), off by default
  function read() { try { var v = localStorage.getItem(LS); return VARIANTS.indexOf(v) > -1 ? v : 'off'; } catch (e) { return 'off'; } }
  function store(v) { try { localStorage.setItem(LS, v); } catch (e) {} }
  function enabled() { return EZ.fine() && EZ.motionOn(); }            // the tip: fine pointers with motion on; touch and reduced motion keep the system cursor
  function character() { return B.on && B.variant !== 'off'; }        // the trailing companion, only when chosen

  function build() {
    el = doc.createElement('div');
    el.className = 'buddy';
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML = '<svg viewBox="-40 -40 80 80" width="64" height="64">' +
      '<ellipse class="bd-shadow" cx="0" cy="33" rx="15" ry="2.6" fill="' + EZ.c('--color-shadow') + '" fill-opacity=".28"/>' +
      '<g class="bd-brackets" opacity="0"><path d="M-34 -24 V-34 H-24 M24 -34 H34 V-24 M34 24 V34 H24 M-24 34 H-34 V24" fill="none" stroke="' + TEAL + '" stroke-width="2.4" stroke-linecap="square"/></g>' +
      '<g class="bd-inner"><g class="bd-art"></g></g>' +
      '<g class="bd-tool" transform="translate(27 18)"></g>' +
      '</svg>';
    doc.body.appendChild(el);
    svg = el.firstChild;
    inner = svg.querySelector('.bd-inner');
    art = svg.querySelector('.bd-art');
    toolG = svg.querySelector('.bd-tool');
    brackets = svg.querySelector('.bd-brackets');
  }

  function paint() {
    gsap.killTweensOf(art.querySelectorAll('*'));
    art.innerHTML = ART[B.variant] || '';
    parts = {
      eyes: art.querySelectorAll('.bd-eye'),
      pupils: art.querySelectorAll('.bd-pupil'),
      hat: art.querySelector('.bd-hat'),
      head: art.querySelector('.bd-head'),
      mouth: art.querySelector('.bd-mouth'),
      bubble: art.querySelector('.bd-bubble'),
      vial: art.querySelector('.bd-vial')
    };
    el.dataset.variant = B.variant;
    applyTool(P.zone, true);
  }

  function applyTool(zone, now) {
    var t = TOOLS[zone] || '';
    if (toolG.dataset.zone === (zone || '')) return;
    toolG.dataset.zone = zone || '';
    if (now || !shown) { toolG.innerHTML = t; return; }
    gsap.to(toolG, { opacity: 0, y: 4, duration: .12, ease: 'power2.in', onComplete: function () {
      toolG.innerHTML = t;
      gsap.fromTo(toolG, { opacity: 0, y: -6, scale: .6, svgOrigin: '27 18' }, { opacity: 1, y: 0, scale: 1, duration: .23, ease: 'back.out(1.6)', svgOrigin: '27 18' });
    } });
  }
  B.led = function (on) { var l = toolG.querySelector('.bd-led'); if (l) l.setAttribute('fill', on ? EZ.c('--color-art-accent') : EZ.c('--color-art-line-soft')); };

  /* ---------- states: what the element under the pointer is ---------- */
  function classify(t) {
    if (!t || !t.closest) return ['none', null];
    var o = t.closest('[data-buddy]');
    if (o) return [o.dataset.buddy, o];
    var f = t.closest('input, textarea, select, [contenteditable="true"]');
    if (f) return [f.type === 'range' ? 'drag' : (f.type === 'radio' || f.type === 'checkbox' ? 'button' : 'type'), f];
    var b = t.closest('button, .btn, [role="button"], [role="radio"], [role="tab"], [role="slider"], summary');
    var pic = t.closest('img, picture, [data-img], [data-bg-img]');
    if (b && pic && b.contains(pic) && b.getBoundingClientRect().width > 140) return ['image', b];
    if (b) return ['button', b];
    var a = t.closest('a[href]');
    if (a) return ['link', a];
    var img = t.closest('img, picture, figure, [data-img], [data-bg-img]');
    if (img) return ['image', img];
    var h = t.closest('h1, h2, h3');
    if (h) return ['heading', h];
    var c = t.closest('article, [data-card], li.card');
    if (c) return ['card', c];
    return ['none', null];
  }

  function setState(s, target) {
    if (tip) tip.dataset.state = s;
    if (s === state && target === stateEl) return;
    var prev = state;
    state = s; stateEl = target;
    el.dataset.state = s;
    dock = null;
    if (scanTw) { scanTw.kill(); scanTw = null; }
    var a = parts;
    // reset presets (out .2) [BANK 229]
    if (prev !== s) {
      if (a.hat) gsap.to(a.hat, { rotation: 0, y: 0, duration: .2, ease: 'power3.out', svgOrigin: '-26 0' });
      gsap.to(a.eyes, { scaleY: 1, scaleX: 1, duration: .2, ease: 'power3.out', transformOrigin: '50% 50%' });
      gsap.to(brackets, { opacity: 0, scale: 1.25, duration: .2, ease: 'power3.out', svgOrigin: '0 0' });
      gsap.to(inner, { scale: 1, opacity: 1, y: 0, rotation: 0, duration: .2, ease: 'power3.out', svgOrigin: '0 0' });
      if (a.vial) gsap.to(a.vial, { attr: { fill: EZ.c('--color-art-accent-soft') }, duration: .2 });
      if (a.mouth) gsap.to(a.mouth, { scaleY: 1, duration: .2, transformOrigin: '50% 50%' });
    }
    // enter presets (in .5)
    if (s === 'button') {
      if (B.variant === 'hat') {
        gsap.to(a.hat, { rotation: -18, y: -5, duration: .3, ease: 'back.out(1.6)', svgOrigin: '-26 0' });
        gsap.to(a.eyes, { scaleY: .55, duration: .3, ease: 'power3.out', transformOrigin: '50% 50%' });
        gsap.to(a.mouth, { scaleY: 1.8, duration: .3, ease: 'power3.out', transformOrigin: '50% 50%' });
      } else if (B.variant === 'level') {
        dock = 'top';
        gsap.to(a.vial, { attr: { fill: TEAL }, duration: .5, ease: 'power3.out' });
      } else if (B.variant === 'cone') {
        // the cone sets itself down at the button's left edge, like marking the spot
        dock = 'side';
        gsap.fromTo(inner, { y: -14 }, { y: 0, duration: .4, ease: 'bounce.out', svgOrigin: '0 0' });
      }
    } else if (s === 'link') {
      gsap.fromTo(inner, { y: 0 }, { y: -5, duration: .16, ease: 'power2.out', yoyo: true, repeat: 1, svgOrigin: '0 0' });
    } else if (s === 'image') {
      gsap.to(brackets, { opacity: 1, scale: 1, duration: .5, ease: 'expo.out', svgOrigin: '0 0' });
      gsap.to(a.eyes, { scaleX: 1.2, scaleY: 1.25, duration: .4, ease: 'back.out(2)', transformOrigin: '50% 50%' });
    } else if (s === 'type') {
      gsap.to(inner, { scale: .62, opacity: .35, duration: .3, ease: 'power3.out', svgOrigin: '0 0' });
    } else if (s === 'drag') {
      gsap.to(a.eyes, { scaleX: 1.15, scaleY: 1.15, duration: .3, ease: 'back.out(2)', transformOrigin: '50% 50%' });
    }
    if (B.variant === 'cone' && s === 'link') gsap.fromTo(inner, { rotation: 0 }, { keyframes: [{ rotation: -10 }, { rotation: 8 }, { rotation: 0 }], duration: .4, svgOrigin: '0 27' });
    signature(target);
    breathe();
  }

  /* ---------- per-element signatures [AUDIT-01 D.1; S1314 §7, S1448]: the companion answers the element, not its kind.
     The auditor's full table (lane file 06 §4) is not in this repo; these follow the pack's named list. */
  var SIGS = {
    // nav Book: a permit stamp comes down on the spot
    stamp: function () {
      gsap.timeline().to(inner, { y: 5, scaleY: .9, duration: .08, ease: 'power2.in', svgOrigin: '0 30' })
        .to(inner, { y: 0, scaleY: 1, duration: .2, ease: 'power2.out', svgOrigin: '0 30' });
      ring(EZ.c('--color-art-accent'));
    },
    // a drawing tool: the companion leans into the stroke
    lean: function () { gsap.to(inner, { rotation: -10, duration: .2, ease: 'power2.out', svgOrigin: '0 30' }); },
    // a rivet: flinch and blink
    flinch: function () { blink(); gsap.fromTo(inner, { scale: .9 }, { scale: 1, duration: .18, ease: 'power2.out', svgOrigin: '0 0' }); },
    // a bolt: the pupils orbit it once
    orbit: function () { rollEyes(.5); },
    // every phone link: the listening head-tilt, held while the pointer stays
    tilt: function () { gsap.to(inner, { rotation: 12, duration: .2, ease: 'power2.out', svgOrigin: '0 20' }); },
    // work photographs: the camera tool's record light comes on
    led: function () { B.led(true); },
    // towns tabs: a compass needle swings to the county's bearing
    compass: function (t) {
      var b = parseFloat(t.dataset.bearing || '0');
      toolG.innerHTML = '<circle r="9" fill="' + EZ.c('--color-surface') + '\" stroke="' + INK + '" stroke-width="1.6"/><path class="bd-ndl" d="M0 -7 L2.2 0 L0 7 L-2.2 0 Z" fill="' + EZ.c('--color-art-accent') + '\" stroke="' + INK + '" stroke-width="1"/>';
      toolG.dataset.zone = '__compass';
      gsap.fromTo(toolG.querySelector('.bd-ndl'), { rotation: b - 200 }, { rotation: b, duration: .35, ease: 'power3.out', svgOrigin: '0 0' });
    }
  };
  function ring(col) {
    var c = doc.createElementNS('http://www.w3.org/2000/svg', 'circle');
    c.setAttribute('r', '14'); c.setAttribute('cx', '27'); c.setAttribute('cy', '18'); c.setAttribute('fill', 'none');
    c.setAttribute('stroke', col); c.setAttribute('stroke-width', '2.4');
    svg.appendChild(c);
    gsap.fromTo(c, { scale: .4, opacity: 1, svgOrigin: '27 18' }, { scale: 1.2, opacity: 0, duration: .3, ease: 'power2.out', svgOrigin: '27 18', onComplete: function () { c.remove(); } });
  }
  function signature(t) {
    var s2 = t && t.dataset ? (t.dataset.buddySig || (t.matches && t.matches('a[href^="tel:"]') ? 'tilt' : '') || (state === 'image' ? 'led' : '')) : '';
    if (sigEl === t && sig === s2) return;
    // leaving a signature: put the tool and the record light back
    if (sig === 'compass' || toolG.dataset.zone === '__compass') { toolG.dataset.zone = '#'; applyTool(P.zone, true); }
    if (sig === 'led') B.led(false);
    sigEl = t; sig = s2;
    if (s2 && SIGS[s2] && s2 !== 'flip') SIGS[s2](t);
  }
  // the switch digits: a mini sheet flips over the companion carrying the incoming version
  doc.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('[data-buddy-sig="flip"]');
    if (!t || !B.on || !shown) return;
    var g = doc.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.innerHTML = '<rect x="-11" y="-14" width="22" height="28" rx="2" fill="' + EZ.c('--color-surface') + '\" stroke="' + INK + '" stroke-width="1.6"/><text x="0" y="6" text-anchor="middle" font-family="Poppins, Arial, sans-serif" font-weight="600" font-size="18" fill="' + INK + '">' + (t.textContent || '').trim().slice(0, 2).replace(/[<&]/g, '') + '</text>';
    g.setAttribute('transform', 'translate(0 -30)');
    svg.appendChild(g);
    gsap.timeline({ onComplete: function () { g.remove(); } })
      .fromTo(g, { scaleX: 0, opacity: 1, svgOrigin: '0 -30' }, { scaleX: 1, duration: .16, ease: 'power2.out', svgOrigin: '0 -30' })
      .to(g, { opacity: 0, y: -6, duration: .2, ease: 'power2.in' }, .5);
  }, true);
  // idle breath: only while parked and unpressed [D.9; S1448, S0405]
  function breathe() {
    if (!art) return;
    var idle = state === 'none' && !pressed;
    if (idle && !breathTw) breathTw = gsap.fromTo(art, { scaleY: 1 }, { scaleY: 1.025, duration: 1.6, ease: 'sine.inOut', yoyo: true, repeat: -1, svgOrigin: '0 30' });
    else if (!idle && breathTw) { breathTw.kill(); breathTw = null; gsap.to(art, { scaleY: 1, duration: .12, svgOrigin: '0 30' }); }
  }

  /* ---------- the loop ---------- */
  function blink() {
    var target = B.variant === 'level' ? parts.bubble && parts.bubble.querySelector('.bd-eye') : parts.eyes;
    if (!target) return;
    gsap.timeline().to(target, { scaleY: .08, duration: .07, ease: 'power2.in', transformOrigin: '50% 50%' })
      .to(target, { scaleY: state === 'button' && B.variant === 'hat' ? .55 : 1, duration: .1, ease: 'power2.out', transformOrigin: '50% 50%' });
  }
  function rollEyes(d) {
    var o = { a: -Math.PI / 2 };
    gsap.to(o, { a: Math.PI * 1.5, duration: d || .9, ease: 'sine.inOut', onUpdate: function () { look.roll = [Math.cos(o.a), Math.sin(o.a)]; }, onComplete: function () { look.roll = null; } });
  }
  function action() {
    var a = parts;
    if (B.variant === 'hat' && a.hat) {
      gsap.timeline().to(a.hat, { y: -7, duration: .14, ease: 'power2.out' }).to(a.hat, { y: 0, duration: .5, ease: 'bounce.out' })
        .to(a.hat, { y: -4, duration: .1, ease: 'power2.out' }, '+=.08').to(a.hat, { y: 0, duration: .35, ease: 'bounce.out' });
    } else if (B.variant === 'level') {
      bub.v += 2.6;
      gsap.fromTo(inner, { rotation: 0 }, { rotation: 7, duration: .12, yoyo: true, repeat: 3, ease: 'sine.inOut', svgOrigin: '0 0' });
    } else if (B.variant === 'cone') {
      // a little shuffle on its base
      gsap.timeline().to(inner, { x: -3, rotation: -6, duration: .12, svgOrigin: '0 27' }).to(inner, { x: 3, rotation: 6, duration: .12, svgOrigin: '0 27' })
        .to(inner, { x: 0, rotation: 0, duration: .3, ease: 'elastic.out(1,.4)', svgOrigin: '0 27' });
    }
  }

  function tick(now) {
    rafId = requestAnimationFrame(tick);
    var dt = Math.min(.05, last ? (now - last) / 1000 : .016);
    last = now;
    var W = innerWidth, H = innerHeight;
    // follow target: trailing below-right of the pointer, flipping near the edges
    var ox = P.x > W - 120 ? -50 : 56, oy = P.y > H - 110 ? -48 : 54;
    var tx = P.x + ox, ty = P.y + oy;
    if (dock && stateEl && stateEl.isConnected) {
      var r = stateEl.getBoundingClientRect();
      if (dock === 'top') { tx = EZ.clamp(P.x, r.left + 30, r.right - 30); ty = r.top - 10; }
      else { tx = r.left - 24; ty = r.top + r.height / 2 - 4; }
    }
    // spring, stiffness 500 / damping 30 (mass 1), integrated in fixed 1/240s sub-steps so it is frame-rate independent
    for (var st = dt; st > 0; st -= 1 / 240) {
      var hh = Math.min(st, 1 / 240);
      vel.x += (500 * (tx - pos.x) - 30 * vel.x) * hh; vel.y += (500 * (ty - pos.y) - 30 * vel.y) * hh;
      pos.x += vel.x * hh; pos.y += vel.y * hh;
    }
    var speed = vel.x / 600;
    var lt = dock ? 0 : EZ.clamp(speed * 9, -14, 14);   // docked: stands still
    if (state === 'card' && stateEl) {
      var cr = stateEl.getBoundingClientRect();
      lt = EZ.clamp((cr.left + cr.width / 2 - pos.x) / 40, -9, 9);
    }
    lean += (lt - lean) * (1 - Math.exp(-10 * dt));
    el.style.transform = 'translate3d(' + (pos.x - 32).toFixed(1) + 'px,' + (pos.y - 32).toFixed(1) + 'px,0) rotate(' + lean.toFixed(2) + 'deg)';

    // eyes: look at the pointer, or at the element the state is about (S1303 lerp .1)
    var lx, ly;
    if (look.roll) { lx = look.roll[0]; ly = look.roll[1]; }
    else if (state === 'heading') { lx = look.x; ly = -.2; }
    else {
      var fx = P.x, fy = P.y;
      if ((state === 'link' || state === 'card' || state === 'image') && stateEl) { var er = stateEl.getBoundingClientRect(); fx = er.left + er.width / 2; fy = er.top + er.height / 2; }
      var dx = fx - pos.x, dy = fy - pos.y, d = Math.hypot(dx, dy) || 1;
      var m = Math.min(1, d / 60);
      lx = dx / d * m; ly = dy / d * m;
    }
    var ke = 1 - Math.pow(1 - .12, dt * 60);   // .12 per 60 Hz frame, same feel at any refresh rate
    look.cx = (look.cx || 0) + (lx - (look.cx || 0)) * ke;
    look.cy = (look.cy || 0) + (ly - (look.cy || 0)) * ke;
    var pr = B.variant === 'level' ? 1.5 : 2.1;
    for (var i = 0; i < parts.pupils.length; i++) parts.pupils[i].setAttribute('transform', 'translate(' + (look.cx * pr).toFixed(2) + ' ' + (look.cy * pr).toFixed(2) + ')');

    // level bubble: spring against the lean (.06 / .85) [BANK 239]
    if (parts.bubble) {
      var bt = dock === 'top' ? 0 : EZ.clamp(-lean * .6 - P.vx * .25, -8, 8);
      bub.v = (bub.v + (bt - bub.x) * .06) * .85;
      bub.x += bub.v;
      parts.bubble.setAttribute('transform', 'translate(' + bub.x.toFixed(2) + ' 0)');
    }

    // things appear under a resting pointer (reveals, sheets): look again a few times a second
    if (now - (B._hit || 0) > 350) { B._hit = now; queueHit(); }
    // idle life
    var idle = now - P.t;
    if (now > nextBlink) { blink(); nextBlink = now + 2600 + Math.random() * 2600; }
    if (idle > 4000 && !idleT) { idleT = 1; rollEyes(); }
    if (idle < 4000) idleT = 0;
    if (now > nextAct) { if (state === 'none') action(); nextAct = now + 11000 + Math.random() * 5000; }
  }

  function show() {
    if (shown) return;
    shown = true;
    pos.x = P.x + 56; pos.y = P.y + 54; vel.x = vel.y = 0;   // first frame lands beside the pointer, never flies in from 0,0
    if (tip) tip.classList.add('is-on');
    if (!character()) return;
    el.classList.add('is-on');
    if (!rafId) { last = 0; rafId = requestAnimationFrame(tick); }
  }
  function hide() {
    if (!shown) return;
    shown = false;
    el.classList.remove('is-on');
    if (tip) tip.classList.remove('is-on');
    cancelAnimationFrame(rafId); rafId = 0;
  }

  P.on(function (type) {
    if (!B.on) return;
    if (type === 'enter' || type === 'move') { show(); tipMove(); }
    else if (type === 'leave') hide();
    else if (type === 'target') { var c = classify(P.target); setState(c[0], c[1]); }
    else if (type === 'zone') { applyTool(P.zone); if (tip) tip.style.color = TIP_C[P.zone] || EZ.c('--color-art-accent'); }
    else if (type === 'down') { if (tip) tip.classList.add('is-down'); }
    if (type === 'up' && tip) tip.classList.remove('is-down');
    if (!character()) return;
    // press / release: micro and short durations, each tween overwrites the last so a fast double click never stacks [S1436]
    if (type === 'down') { pressed = true; breathe(); gsap.to(inner, { scaleY: .86, scaleX: 1.1, duration: .08, ease: 'power2.out', svgOrigin: '0 30', overwrite: 'auto' }); gsap.to(el, { opacity: .35, duration: .08, overwrite: 'auto' }); }
    else if (type === 'up') { pressed = false; breathe(); gsap.to(inner, { scaleY: 1, scaleX: 1, duration: .18, ease: 'power3.out', svgOrigin: '0 30', overwrite: 'auto' }); gsap.to(el, { opacity: 1, duration: .15, overwrite: 'auto' }); }
  });

  B.refresh = function () {
    var on = enabled();
    B.on = on;
    root.classList.toggle('has-buddy', on);
    if (!el) return;
    if (!on) { hide(); setState('none', null); return; }
    if (!character()) { el.classList.remove('is-on'); cancelAnimationFrame(rafId); rafId = 0; }
    if (P.has) { shown = false; show(); var c = classify(P.target); state = ''; setState(c[0], c[1]); }
  };
  B.retarget = function () { if (B.on) { state = ''; stateEl = undefined; queueHit(); var c = classify(P.target); setState(c[0], c[1]); } };
  B.set = function (v) {
    if (VARIANTS.indexOf(v) < 0) return;
    B.variant = v; store(v);
    if (v !== 'off') paint();
    state = ''; B.refresh();
    syncSwitch();
  };

  /* ---------- the Buddy switcher (fine pointers only; touch has no companion) ---------- */
  var sw, SW_RX = { hat: '~goggles/bounce/hop/t', level: '~ruler/bounce/squash/t', cone: '~vest/bounce/wobble/t', off: '~xbrace/bounce/shake/t' };
  function buildSwitch() {
    // lives in the Settings panel beside Theme and Motion (fine pointers only)
    sw = doc.createElement('fieldset');
    sw.className = 'buddysw';
    sw.innerHTML = '<legend id="buddysw-t">Cursor buddy</legend><div class="buddysw__in" role="radiogroup" aria-labelledby="buddysw-t">' +
      VARIANTS.map(function (v) {
        return '<button type="button" role="radio" data-bv="' + v + '" data-rx="' + SW_RX[v] + '" aria-checked="false" aria-label="' + NAMES[v] + '" title="' + NAMES[v] + '"><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">' + ICONS[v] + '</svg></button>';
      }).join('') + '</div>';
    var panel = doc.getElementById('settings-panel');
    (panel || doc.body).appendChild(sw);
    sw.addEventListener('click', function (e) { var b = e.target.closest('[data-bv]'); if (b) B.set(b.dataset.bv); });
    sw.addEventListener('keydown', function (e) {
      var d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
      if (!d) return;
      e.preventDefault();
      var nv = VARIANTS[(VARIANTS.indexOf(B.variant) + d + VARIANTS.length) % VARIANTS.length];
      B.set(nv);
      sw.querySelector('[data-bv="' + nv + '"]').focus();
    });
  }
  function syncSwitch() {
    if (!sw) return;
    sw.querySelectorAll('[data-bv]').forEach(function (b) {
      var on = b.dataset.bv === B.variant;
      b.setAttribute('aria-checked', on ? 'true' : 'false');
      b.tabIndex = on ? 0 : -1;
    });
  }

  B.init = function () {
    initPointer();
    build();
    buildTip();
    buildSwitch();
    B.variant = read();
    if (B.variant !== 'off') paint();
    syncSwitch();
    B.refresh();
  };
})();
