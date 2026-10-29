/* Pointer service + cursor companion ("buddy"), PLAN-V3 §2.1.
   Mechanism refs: [BANK] P10 attribute-state follower (state from the element under the pointer),
   [BANK] Andrew Reff 381 (named state presets tweened on change), S1303 eye lerp .06-.12,
   S0489 / S0792 idle blink, [BANK] 344 frame-independent smoothing k = 1 - e^(-damp*dt),
   [BANK] 239 spring .06 / .85 for the level bubble, [BANK] 229 asymmetric hover in .5 / out .2,
   [BANK] Built Kindly 203 persisted motion toggle. The system cursor stays visible: the buddy trails it. */
(function () {
  var doc = document, root = doc.documentElement;
  var LS = 'ez-buddy';
  var VARIANTS = ['hat', 'level', 'tape', 'off'];
  var NAMES = { hat: 'Hard hat', level: 'Level', tape: 'Tape', off: 'Off' };

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
  }
  EZ.ptr.rehit = queueHit;

  /* ---------- buddy artwork (viewBox -40 -40 80 80; outlines in ink so it reads on teal, ink and daylight grounds) ---------- */
  var INK = '#0B1418', YEL = '#f2c230', YEL_D = '#c8960f', SKIN = '#ecdcc4', STEEL = '#c9d1d3', TEAL = '#77b3b8', DEEP = '#1d4a4e';
  function eye(x, y, rx, ry) {
    return '<g transform="translate(' + x + ' ' + y + ')"><g class="bd-eye"><ellipse rx="' + rx + '" ry="' + ry + '" fill="#fff" stroke="' + INK + '" stroke-width="1.4"/>' +
      '<circle class="bd-pupil" r="' + (rx * .5).toFixed(2) + '" fill="' + INK + '"/><circle class="bd-glint" cx="-.9" cy="-1.3" r=".8" fill="#fff"/></g></g>';
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
        '<rect class="bd-vial" x="-14" y="-6.2" width="28" height="12.4" rx="6.2" fill="#d6ec8a" stroke="' + INK + '" stroke-width="1.6"/>' +
        '<g class="bd-bubble">' + eye(0, 0, 4.4, 3.6) + '</g>' +
        '<path d="M-5.2 -6.2 V6.2 M5.2 -6.2 V6.2" stroke="' + INK + '" stroke-width="1.2"/>' +
        '<circle cx="-17.5" cy="0" r="1.3" fill="' + INK + '"/><circle cx="17.5" cy="0" r="1.3" fill="' + INK + '"/>' +
      '</g>',
    tape:
      '<g class="bd-blade">' +
        '<rect class="bd-blade-strip" x="16" y="9" width="2" height="6.5" fill="' + YEL + '" stroke="' + INK + '" stroke-width="1.1"/>' +
        '<rect class="bd-blade-ticks" x="16" y="9" width="2" height="3.2" fill="url(#bd-ticks)"/>' +
        '<path class="bd-hook" d="M18 7.5 h2.2 v9.5 h-2.2" fill="' + STEEL + '" stroke="' + INK + '" stroke-width="1.1"/>' +
        '<text class="bd-read" x="18" y="2" font-family="Geist, sans-serif" font-size="8.5" font-weight="600" fill="' + INK + '" stroke="#fff" stroke-width="2.6" paint-order="stroke" text-anchor="end" opacity="0"></text>' +
      '</g>' +
      '<g class="bd-head">' +
        '<rect x="-19" y="-19" width="38" height="37" rx="9" fill="' + YEL + '" stroke="' + INK + '" stroke-width="2"/>' +
        '<path d="M-19 -10 H19" stroke="' + INK + '" stroke-width="1.4"/>' +
        '<rect x="-7" y="-23" width="14" height="5" rx="1.5" fill="' + DEEP + '" stroke="' + INK + '" stroke-width="1.4"/>' +
        '<g class="bd-eyes">' + eye(-6.5, -1, 4.2, 4.8) + eye(6.5, -1, 4.2, 4.8) + '</g>' +
        '<circle cx="0" cy="11" r="3.6" fill="' + STEEL + '" stroke="' + INK + '" stroke-width="1.3"/>' +
        '<path class="bd-mouth" d="M-3.5 7 Q0 8.6 3.5 7" fill="none" stroke="' + INK + '" stroke-width="1.4" stroke-linecap="round"/>' +
      '</g>'
  };
  // one small tool per section: the buddy picks it up as it enters (PLAN-V3 §2.3)
  var TOOLS = {
    hero: '<path d="M-7 5 L4 -6 L7.5 -2.5 L-3.5 8.5 Z" fill="' + YEL + '" stroke="' + INK + '" stroke-width="1.3" stroke-linejoin="round"/><path d="M-7 5 L-8.6 10 L-3.5 8.5 Z" fill="' + SKIN + '" stroke="' + INK + '" stroke-width="1.1" stroke-linejoin="round"/><path d="M4 -6 L7.5 -2.5" stroke="' + DEEP + '" stroke-width="2.4"/>',
    proof: '<rect x="-8" y="-3.5" width="11" height="7" rx="1.5" fill="' + DEEP + '" stroke="' + INK + '" stroke-width="1.2"/><path d="M3 -4.5 L7 -6.5 V6.5 L3 4.5 Z" fill="' + STEEL + '" stroke="' + INK + '" stroke-width="1.2" stroke-linejoin="round"/><path class="bd-beam" d="M7 -6 L19 -11 V11 L7 6 Z" fill="#fff5c2" opacity=".55"/>',
    services: '<rect x="-9" y="-3" width="9" height="6" rx="2" fill="' + TEAL + '" stroke="' + INK + '" stroke-width="1.2"/><path d="M0 0 H9" stroke="' + STEEL + '" stroke-width="2.2"/><path d="M9 -1.6 L11.5 0 L9 1.6" fill="' + STEEL + '" stroke="' + INK + '" stroke-width=".8"/>',
    ba: '<rect x="-7" y="-9" width="14" height="18" rx="3" fill="' + DEEP + '" stroke="' + INK + '" stroke-width="1.3"/><rect x="-4" y="-6" width="8" height="5" rx="1" fill="#a7c9cb"/><circle class="bd-led" cx="0" cy="4" r="2" fill="#41545a"/>',
    process: '<circle cx="-2" cy="0" r="6.5" fill="' + YEL + '" stroke="' + INK + '" stroke-width="1.3"/><circle cx="-2" cy="0" r="2" fill="' + INK + '"/><path d="M4.5 0 H13" stroke="#5aa8d6" stroke-width="1.4" stroke-dasharray="2 1.4"/>',
    financing: '<path d="M0 -10 V-2" stroke="' + INK + '" stroke-width="1"/><path d="M-4 -2 H4 L0 9 Z" fill="' + STEEL + '" stroke="' + INK + '" stroke-width="1.3" stroke-linejoin="round"/>',
    work: '<rect x="-9" y="-5" width="18" height="12" rx="2" fill="' + STEEL + '" stroke="' + INK + '" stroke-width="1.3"/><rect x="-4" y="-8" width="7" height="3.5" rx="1" fill="' + STEEL + '" stroke="' + INK + '" stroke-width="1.1"/><circle cx="0" cy="1" r="3.6" fill="' + DEEP + '" stroke="' + INK + '" stroke-width="1.1"/>',
    reviews: '<path d="M-3 -9 L5 -3 L1 2 L-7 -4 Z" fill="' + DEEP + '" stroke="' + INK + '" stroke-width="1.2" stroke-linejoin="round"/><path d="M-1 -1 L-6 9" stroke="' + INK + '" stroke-width="1.4"/><path class="bd-beam" d="M5 -3 L16 4 L8 11 L1 2 Z" fill="#fff1b8" opacity=".6"/>',
    towns: '<circle cx="0" cy="0" r="8" fill="#fff" stroke="' + INK + '" stroke-width="1.4"/><path class="bd-needle" d="M0 -6 L2 0 L0 6 L-2 0 Z" fill="#c8402e" stroke="' + INK + '" stroke-width=".6"/>',
    consult: '<rect x="-8" y="-5" width="13" height="10" rx="1.5" fill="' + YEL + '" stroke="' + INK + '" stroke-width="1.2"/><circle cx="5" cy="0" r="1.6" fill="#e2412b"/><path d="M6.5 0 H16" stroke="#e2412b" stroke-width="1.2"/>',
    footer: '<circle cx="-4" cy="0" r="4.6" fill="none" stroke="' + YEL + '" stroke-width="2.2"/><path d="M0.5 0 H10 M7 0 V3.5 M9.5 0 V3" stroke="' + YEL + '" stroke-width="2.2" stroke-linecap="round"/>'
  };

  var B = EZ.buddy = { variant: 'hat', on: false };
  var el, svg, inner, art, toolG, brackets, rafId = 0, last = 0;
  var pos = { x: -200, y: -200 }, lean = 0, look = { x: 0, y: 0 }, bub = { x: 0, v: 0 };
  var state = 'none', stateEl = null, dock = null, idleT = 0, nextAct = 0, nextBlink = 0, shown = false, scanTw = null;
  var parts = {};

  function read() { try { var v = localStorage.getItem(LS); return VARIANTS.indexOf(v) > -1 ? v : 'hat'; } catch (e) { return 'hat'; } }
  function store(v) { try { localStorage.setItem(LS, v); } catch (e) {} }
  function enabled() { return EZ.fine() && EZ.motionOn() && B.variant !== 'off'; }

  function build() {
    el = doc.createElement('div');
    el.className = 'buddy';
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML = '<svg viewBox="-40 -40 80 80" width="64" height="64">' +
      '<defs><pattern id="bd-ticks" width="3" height="3.2" patternUnits="userSpaceOnUse"><path d="M.5 0 V2.2" stroke="' + INK + '" stroke-width=".7"/></pattern></defs>' +
      '<ellipse class="bd-shadow" cx="0" cy="33" rx="15" ry="2.6" fill="rgba(0,0,0,.28)"/>' +
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
      vial: art.querySelector('.bd-vial'),
      blade: art.querySelector('.bd-blade'),
      strip: art.querySelector('.bd-blade-strip'),
      ticks: art.querySelector('.bd-blade-ticks'),
      hook: art.querySelector('.bd-hook'),
      read: art.querySelector('.bd-read')
    };
    el.dataset.variant = B.variant;
    blade(2, true);
    applyTool(P.zone, true);
  }

  // tape blade length in svg units (1 unit = 64/80 px)
  var bladeLen = 2;
  function blade(L, now) {
    if (!parts.strip) return;
    var o = { v: bladeLen };
    gsap.killTweensOf(o);
    function set(v) {
      bladeLen = v;
      parts.strip.setAttribute('width', v); parts.ticks.setAttribute('width', v);
      parts.hook.setAttribute('transform', 'translate(' + (v - 2) + ' 0)');
      parts.read.setAttribute('x', 16 + v - 2);
    }
    if (now) { set(L); return; }
    gsap.to(o, { v: L, duration: L > bladeLen ? .5 : .2, ease: L > bladeLen ? 'expo.out' : 'power3.out', onUpdate: function () { set(o.v); } });
  }

  function applyTool(zone, now) {
    var t = TOOLS[zone] || '';
    if (toolG.dataset.zone === (zone || '')) return;
    toolG.dataset.zone = zone || '';
    if (now || !shown) { toolG.innerHTML = t; return; }
    gsap.to(toolG, { opacity: 0, y: 4, duration: .12, ease: 'power2.in', onComplete: function () {
      toolG.innerHTML = t;
      gsap.fromTo(toolG, { opacity: 0, y: -6, scale: .6, svgOrigin: '27 18' }, { opacity: 1, y: 0, scale: 1, duration: .45, ease: 'back.out(2.2)', svgOrigin: '27 18' });
    } });
  }
  B.led = function (on) { var l = toolG.querySelector('.bd-led'); if (l) l.setAttribute('fill', on ? '#ff5a3c' : '#41545a'); };

  /* ---------- states: what the element under the pointer is ---------- */
  function classify(t) {
    if (!t || !t.closest) return ['none', null];
    var o = t.closest('[data-buddy]');
    if (o) return [o.dataset.buddy, o];
    var f = t.closest('input, textarea, select, [contenteditable="true"]');
    if (f) return [f.type === 'range' ? 'drag' : (f.type === 'radio' || f.type === 'checkbox' ? 'button' : 'type'), f];
    var b = t.closest('button, .btn, [role="button"], [role="radio"], [role="tab"], [role="slider"], summary');
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
      gsap.to(inner, { scale: 1, opacity: 1, y: 0, duration: .2, ease: 'power3.out', svgOrigin: '0 0' });
      if (a.vial) gsap.to(a.vial, { attr: { fill: '#d6ec8a' }, duration: .2 });
      if (a.mouth) gsap.to(a.mouth, { scaleY: 1, duration: .2, transformOrigin: '50% 50%' });
      if (a.read) gsap.to(a.read, { opacity: 0, duration: .15 });
      blade(2);
    }
    // enter presets (in .5)
    if (s === 'button') {
      if (B.variant === 'hat') {
        gsap.to(a.hat, { rotation: -18, y: -5, duration: .5, ease: 'back.out(2)', svgOrigin: '-26 0' });
        gsap.to(a.eyes, { scaleY: .55, duration: .3, ease: 'power3.out', transformOrigin: '50% 50%' });
        gsap.to(a.mouth, { scaleY: 1.8, duration: .3, ease: 'power3.out', transformOrigin: '50% 50%' });
      } else if (B.variant === 'level') {
        dock = 'top';
        gsap.to(a.vial, { attr: { fill: TEAL }, duration: .5, ease: 'power3.out' });
      } else if (B.variant === 'tape') {
        dock = 'bottom';
        var w = target.getBoundingClientRect().width;
        blade(Math.min(w / (64 / 80), 420));
        a.read.textContent = Math.round(w) + ' px';
        gsap.to(a.read, { opacity: 1, duration: .3, delay: .25 });
      }
    } else if (s === 'link') {
      gsap.fromTo(inner, { y: 0 }, { y: -5, duration: .16, ease: 'power2.out', yoyo: true, repeat: 1, svgOrigin: '0 0' });
    } else if (s === 'image') {
      gsap.to(brackets, { opacity: 1, scale: 1, duration: .5, ease: 'expo.out', svgOrigin: '0 0' });
      gsap.to(a.eyes, { scaleX: 1.2, scaleY: 1.25, duration: .4, ease: 'back.out(2)', transformOrigin: '50% 50%' });
    } else if (s === 'heading') {
      scanTw = gsap.fromTo(look, { x: -1 }, { x: 1, duration: .55, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    } else if (s === 'type') {
      gsap.to(inner, { scale: .62, opacity: .35, duration: .3, ease: 'power3.out', svgOrigin: '0 0' });
    } else if (s === 'drag') {
      gsap.to(a.eyes, { scaleX: 1.15, scaleY: 1.15, duration: .3, ease: 'back.out(2)', transformOrigin: '50% 50%' });
    }
    if (B.variant === 'tape' && s === 'link') { blade(14); gsap.delayedCall(.35, function () { if (state === 'link') blade(2); }); }
  }

  /* ---------- the loop ---------- */
  function blink() {
    var target = B.variant === 'level' ? parts.bubble && parts.bubble.querySelector('.bd-eye') : parts.eyes;
    if (!target) return;
    gsap.timeline().to(target, { scaleY: .08, duration: .07, ease: 'power2.in', transformOrigin: '50% 50%' })
      .to(target, { scaleY: state === 'button' && B.variant === 'hat' ? .55 : 1, duration: .1, ease: 'power2.out', transformOrigin: '50% 50%' });
  }
  function rollEyes() {
    var o = { a: -Math.PI / 2 };
    gsap.to(o, { a: Math.PI * 1.5, duration: .9, ease: 'sine.inOut', onUpdate: function () { look.roll = [Math.cos(o.a), Math.sin(o.a)]; }, onComplete: function () { look.roll = null; } });
  }
  function action() {
    var a = parts;
    if (B.variant === 'hat' && a.hat) {
      gsap.timeline().to(a.hat, { y: -7, duration: .14, ease: 'power2.out' }).to(a.hat, { y: 0, duration: .5, ease: 'bounce.out' })
        .to(a.hat, { y: -4, duration: .1, ease: 'power2.out' }, '+=.08').to(a.hat, { y: 0, duration: .35, ease: 'bounce.out' });
    } else if (B.variant === 'level') {
      bub.v += 2.6;
      gsap.fromTo(inner, { rotation: 0 }, { rotation: 7, duration: .12, yoyo: true, repeat: 3, ease: 'sine.inOut', svgOrigin: '0 0' });
    } else if (B.variant === 'tape' && state !== 'button') {
      blade(46);
      gsap.delayedCall(.55, function () { if (state !== 'button') blade(2); });
    }
  }

  function tick(now) {
    rafId = requestAnimationFrame(tick);
    var dt = Math.min(.05, last ? (now - last) / 1000 : .016);
    last = now;
    var W = innerWidth, H = innerHeight;
    // follow target: trailing below-right of the pointer, flipping near the edges
    var ox = P.x > W - 110 ? -46 : 40, oy = P.y > H - 100 ? -44 : 38;
    var tx = P.x + ox, ty = P.y + oy;
    if (dock && stateEl && stateEl.isConnected) {
      var r = stateEl.getBoundingClientRect();
      if (dock === 'top') { tx = EZ.clamp(P.x, r.left + 30, r.right - 30); ty = r.top - 10; }
      else { tx = r.left - 18; ty = r.bottom + 6; }
    }
    var k = 1 - Math.exp(-(dock ? 12 : 15) * dt);           // [BANK 344] frame-independent
    pos.x += (tx - pos.x) * k; pos.y += (ty - pos.y) * k;
    var speed = (tx - pos.x) / 40;
    var lt = dock ? 0 : EZ.clamp(speed * 9, -14, 14);   // docked (tape reading shown) never tilts: no rotated text
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
    look.cx = (look.cx || 0) + (lx - (look.cx || 0)) * .12;
    look.cy = (look.cy || 0) + (ly - (look.cy || 0)) * .12;
    var pr = B.variant === 'level' ? 1.5 : 2.1;
    for (var i = 0; i < parts.pupils.length; i++) parts.pupils[i].setAttribute('transform', 'translate(' + (look.cx * pr).toFixed(2) + ' ' + (look.cy * pr).toFixed(2) + ')');

    // level bubble: spring against the lean (.06 / .85) [BANK 239]
    if (parts.bubble) {
      var bt = dock === 'top' ? 0 : EZ.clamp(-lean * .6 - P.vx * .25, -8, 8);
      bub.v = (bub.v + (bt - bub.x) * .06) * .85;
      bub.x += bub.v;
      parts.bubble.setAttribute('transform', 'translate(' + bub.x.toFixed(2) + ' 0)');
    }

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
    pos.x = P.x + 40; pos.y = P.y + 38;           // first frame lands beside the pointer, never flies in from 0,0
    el.classList.add('is-on');
    if (!rafId) { last = 0; rafId = requestAnimationFrame(tick); }
  }
  function hide() {
    if (!shown) return;
    shown = false;
    el.classList.remove('is-on');
    cancelAnimationFrame(rafId); rafId = 0;
  }

  P.on(function (type) {
    if (!B.on) return;
    if (type === 'enter' || type === 'move') { show(); }
    else if (type === 'leave') hide();
    else if (type === 'target') { var c = classify(P.target); setState(c[0], c[1]); }
    else if (type === 'zone') applyTool(P.zone);
    else if (type === 'down') gsap.to(inner, { scaleY: .86, scaleX: 1.1, duration: .1, ease: 'power2.out', svgOrigin: '0 30' });
    else if (type === 'up') gsap.to(inner, { scaleY: 1, scaleX: 1, duration: .5, ease: 'elastic.out(1,.4)', svgOrigin: '0 30' });
  });

  B.refresh = function () {
    var on = enabled();
    B.on = on;
    root.classList.toggle('has-buddy', on);
    if (!el) return;
    if (!on) { hide(); setState('none', null); return; }
    if (P.has) { show(); var c = classify(P.target); state = ''; setState(c[0], c[1]); }
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
  var sw;
  function buildSwitch() {
    sw = doc.createElement('div');
    sw.className = 'buddysw';
    sw.innerHTML = '<span class="buddysw__t" id="buddysw-t">Cursor buddy</span><div class="buddysw__in" role="radiogroup" aria-labelledby="buddysw-t">' +
      VARIANTS.map(function (v) {
        return '<button type="button" role="radio" data-bv="' + v + '" aria-checked="false">' + NAMES[v] + '</button>';
      }).join('') + '</div>';
    doc.body.appendChild(sw);
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
    buildSwitch();
    B.variant = read();
    if (B.variant !== 'off') paint();
    syncSwitch();
    B.refresh();
  };
})();
