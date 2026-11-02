/* FINALIZE Phase 2: the cursor companion, rebuilt (PHASE1-PLAN.md "Companion: rebuild plan").
   Owner's rule: never more than TWO cursor things, the exact pointer tip and the companion. Variety comes only from the
   companion's own reactions per element kind. No hover sprites, no tool icons, no rings or brackets.
   Skills: S0574 (tip pivot, 1:2 tap, click ignites on the same frame, physical entry/exit, drift aside),
   S0340 (a body on a spring: mass 1.2, 2.2 Hz, zeta .72; interruptible; visuals derive from state not time),
   S0357 (identity lock: the hat is part of the head and is anchored at the brow in every pose),
   S1455 (explicit states), S0544 (no idle wobble: no breathing loop, no random "actions"),
   S1315 / S0062 (one rAF loop, stops when settled, pauses when hidden, direct transforms only),
   S1190 / S0400 (touch and reduced motion: system cursor, no companion). */
(function () {
  var doc = document, root = doc.documentElement;
  var LS = 'ez-companion';

  /* ---------- pointer service: one source of truth (API unchanged; fields.js and core.js use it) ---------- */
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
  EZ.ptr.rehit = queueHit;

  function initPointer() {
    var lx = 0, ly = 0, lt = 0;
    doc.addEventListener('pointermove', function (e) {
      if (e.pointerType === 'touch') return;
      var now = performance.now(), dt = Math.max(8, now - (lt || now - 16));
      if (P.has) {
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
    window.addEventListener('blur', function () { P.has = false; emit('leave'); emit('up'); });
    window.addEventListener('scroll', queueHit, { passive: true });
    doc.addEventListener('pointerdown', function (e) { if (e.pointerType !== 'touch') emit('down'); });
    doc.addEventListener('pointerup', function (e) { if (e.pointerType !== 'touch') emit('up'); });
    doc.addEventListener('pointercancel', function (e) { if (e.pointerType !== 'touch') emit('up'); });
    doc.addEventListener('lostpointercapture', function () { emit('up'); }, true);
    doc.addEventListener('dragend', function () { emit('up'); }, true);
  }

  /* ---------- artwork: one character, viewBox -40 -40 80 80, drawn in the brand's ink with one clay accent ----------
     Anatomy (all inside .cp-body so squash and lean move it as one):
       .cp-head  : face circle (r 17, centre 0,5) + cheeks + brows + eyes + mouths + the HARD HAT.
                   The hat's brim sits ACROSS the forehead (brim y -7.5 .. -2.5, head top at y -12), so it can never
                   float off the face; the dome rises from the brim. The hat only ever moves with the head.
       .cp-hand-l / .cp-hand-r : two mitten hands, posed per reaction (point, cup an ear, frame, grab, clap). */
  var INK, FACE, CLAY, CLAY_D, CHEEK, PAPER;
  function colours() {
    INK = EZ.c('--color-art-line') || '#1B1916';
    FACE = EZ.c('--sand-50') || '#FCF8F5';
    CLAY = EZ.c('--clay-500') || '#C5735C';
    CLAY_D = EZ.c('--clay-700') || '#884432';
    CHEEK = EZ.c('--clay-200') || '#F5D1C6';
    PAPER = EZ.c('--color-surface') || '#FFFFFF';
  }
  function eye(cx) {
    return '<g class="cp-eye" transform="translate(' + cx + ' 5.5)"><g class="cp-eye-in">' +
      '<ellipse rx="3.7" ry="4.5" fill="' + PAPER + '" stroke="' + INK + '" stroke-width="1.4"/>' +
      '<g class="cp-pupil"><circle r="2" fill="' + INK + '"/><circle cx="-.7" cy="-.9" r=".65" fill="' + PAPER + '"/></g>' +
      '</g></g>';
  }
  function art() {
    var s = ' stroke="' + INK + '" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"';
    var MITT = '<path d="M-4.6 2.6 C-5.6 -1.6 -4.2 -5.6 0 -5.6 C4.2 -5.6 5.6 -1.6 4.6 2.6 C3.6 6 -3.6 6 -4.6 2.6 Z" fill="' + FACE + '"' + s + '/>' +
      '<path d="M-4.4 .2 C-7.6 -.6 -8 -3.8 -5.2 -4" fill="' + FACE + '"' + s + '/>';
    return '' +
      '<ellipse class="cp-shadow" cx="0" cy="31" rx="13" ry="2.4" fill="' + INK + '" fill-opacity=".14"/>' +
      '<g class="cp-body">' +
        '<g class="cp-hand cp-hand-l">' + MITT + '</g>' +
        '<g class="cp-head">' +
          '<circle cx="0" cy="5" r="17" fill="' + FACE + '"' + s + '/>' +
          '<circle cx="-10.5" cy="11.5" r="3" fill="' + CHEEK + '"/><circle cx="10.5" cy="11.5" r="3" fill="' + CHEEK + '"/>' +
          '<path class="cp-brow cp-brow-l" d="M-10.5 -.6 Q-7.5 -2.2 -4.6 -.9" fill="none" stroke="' + INK + '" stroke-width="1.5" stroke-linecap="round"/>' +
          '<path class="cp-brow cp-brow-r" d="M4.6 -.9 Q7.5 -2.2 10.5 -.6" fill="none" stroke="' + INK + '" stroke-width="1.5" stroke-linecap="round"/>' +
          '<g class="cp-eyes">' + eye(-7.5) + eye(7.5) + '</g>' +
          '<g class="cp-mouths">' +
            '<path class="cp-m cp-m-smile" d="M-4.4 13.2 Q0 16.8 4.4 13.2" fill="none" stroke="' + INK + '" stroke-width="1.7" stroke-linecap="round"/>' +
            '<path class="cp-m cp-m-grin" d="M-5.4 12.4 Q0 19.4 5.4 12.4 Z" fill="' + CLAY_D + '" stroke="' + INK + '" stroke-width="1.5" stroke-linejoin="round" opacity="0"/>' +
            '<ellipse class="cp-m cp-m-o" cx="0" cy="14.4" rx="2.2" ry="2.6" fill="' + CLAY_D + '" stroke="' + INK + '" stroke-width="1.4" opacity="0"/>' +
            '<path class="cp-m cp-m-flat" d="M-3.6 14.2 H3.6" fill="none" stroke="' + INK + '" stroke-width="1.7" stroke-linecap="round" opacity="0"/>' +
          '</g>' +
          '<g class="cp-hat">' +
            '<path d="M-15.5 -4.5 C-15.5 -18.5 -8 -24.5 0 -24.5 C8 -24.5 15.5 -18.5 15.5 -4.5 Z" fill="' + CLAY + '"' + s + '/>' +
            '<path d="M-3.4 -24 V-5 M3.4 -24 V-5" stroke="' + CLAY_D + '" stroke-width="2.2"/>' +
            '<rect x="-21" y="-7.5" width="42" height="5" rx="2.5" fill="' + CLAY + '"' + s + '/>' +
          '</g>' +
        '</g>' +
        '<g class="cp-hand cp-hand-r">' + MITT + '<path class="cp-finger" d="M2.6 -3.6 C4.4 -6.6 7.6 -7.8 8.8 -6.4 C9.6 -5.4 7.4 -3.6 4.6 -2" fill="' + FACE + '"' + s + ' opacity="0"/></g>' +
      '</g>';
  }

  /* ---------- the pointer tip: ONE constant form (a pencil nib), exact hotspot at 0,0 ----------
     It never changes shape on hover (the owner: the cursor must not add a different extra thing); it only leans with
     velocity and taps on press (S0574 1:2: down .1s, up .2s, pivot at the tip). */
  var tip, tipG, tipLean = 0;
  function buildTip() {
    tip = doc.createElement('div');
    tip.className = 'ptip';
    tip.setAttribute('aria-hidden', 'true');
    tip.innerHTML = '<svg viewBox="-4 -4 28 28" width="28" height="28"><g class="pt-g">' +
      '<path d="M0 0 L4.2 12 L12 4.2 Z" fill="currentColor" stroke="' + INK + '" stroke-width="1.4" stroke-linejoin="round"/>' +
      '<path d="M0 0 L1.9 5 L5 1.9 Z" fill="' + INK + '"/>' +
      '<path d="M4.2 12 L12 4.2 L21 13.2 L13.2 21 Z" fill="' + FACE + '" stroke="' + INK + '" stroke-width="1.3" stroke-linejoin="round"/>' +
      '</g></svg>';
    doc.body.appendChild(tip);
    tipG = tip.querySelector('.pt-g');
  }
  function tipMove() {
    if (!tip) return;
    var want = EZ.clamp(P.vx * 1.4, -18, 18);
    tipLean += (want - tipLean) * .35;
    tip.style.transform = 'translate3d(' + P.x.toFixed(1) + 'px,' + P.y.toFixed(1) + 'px,0)';
    tipG.style.transform = 'rotate(' + tipLean.toFixed(1) + 'deg)';
  }
  function tipTap() {
    if (!tip || !tipG) return;
    gsap.timeline({ overwrite: 'auto' })
      .to(tip.firstChild, { scale: .84, duration: .1, ease: 'power2.in', transformOrigin: '14.3% 14.3%' })
      .to(tip.firstChild, { scale: 1, duration: .2, ease: 'power2.out', transformOrigin: '14.3% 14.3%' });
  }

  /* ---------- state ---------- */
  var B = EZ.buddy = { on: false, want: true };
  var el, svg, body, head, hat, handL, handR, finger, eyesIn, pupils, brows, mouths, shadow;
  var rafId = 0, last = 0, settledFrames = 0;
  var pos = { x: -300, y: -300 }, vel = { x: 0, y: 0 }, lean = 0, look = { x: 0, y: 0 };
  var state = 'none', stateEl = null, shown = false, leaving = false, pressed = false, nextBlink = 0, reading = 0;
  // the body: mass 1.2, natural frequency 2.2 Hz, damping ratio .72 (about 4% overshoot) [S0340]:
  //  2.2 Hz reads as a light helper that keeps up with a hand; zeta .72 lands it without a wobble; mass 1.2 lags a fast flick by a few px
  var M = 1.2, W0 = 2 * Math.PI * 2.2, ZETA = .72, K = M * W0 * W0, C = 2 * ZETA * W0 * M;
  var OFF = { x: 44, y: 42 };

  function read() { try { var v = localStorage.getItem(LS); return v !== 'off'; } catch (e) { return true; } }   // ON by default (owner's priority)
  function store(v) { try { localStorage.setItem(LS, v ? 'on' : 'off'); } catch (e) {} }
  function enabled() { return EZ.fine() && EZ.motionOn(); }

  function build() {
    colours();
    el = doc.createElement('div');
    el.className = 'buddy';
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML = '<svg viewBox="-40 -40 80 80" width="66" height="66">' + art() + '</svg>';
    doc.body.appendChild(el);
    svg = el.firstChild;
    body = svg.querySelector('.cp-body'); head = svg.querySelector('.cp-head'); hat = svg.querySelector('.cp-hat');
    handL = svg.querySelector('.cp-hand-l'); handR = svg.querySelector('.cp-hand-r'); finger = svg.querySelector('.cp-finger');
    eyesIn = svg.querySelectorAll('.cp-eye-in'); pupils = svg.querySelectorAll('.cp-pupil'); brows = svg.querySelectorAll('.cp-brow');
    shadow = svg.querySelector('.cp-shadow');
    mouths = { smile: svg.querySelector('.cp-m-smile'), grin: svg.querySelector('.cp-m-grin'), o: svg.querySelector('.cp-m-o'), flat: svg.querySelector('.cp-m-flat') };
    gsap.set(handL, { x: -19, y: 17 }); gsap.set(handR, { x: 19, y: 17 });
    el.dataset.state = 'none';
  }

  /* ---------- the poses: every element kind gets the companion's OWN reaction (no extra icons) ---------- */
  var HAND_REST = { l: { x: -19, y: 17, rotation: 0, scale: 1 }, r: { x: 19, y: 17, rotation: 0, scale: 1 } };
  function mouth(name) {
    for (var k in mouths) gsap.to(mouths[k], { opacity: k === name ? 1 : 0, duration: .12, overwrite: 'auto' });
  }
  function hands(l, r, d) {
    d = d || .28;
    gsap.to(handL, Object.assign({ duration: d, ease: 'power3.out', overwrite: 'auto' }, l || HAND_REST.l));
    gsap.to(handR, Object.assign({ duration: d, ease: 'power3.out', overwrite: 'auto' }, r || HAND_REST.r));
  }
  function headTo(v, d) { gsap.to(head, Object.assign({ duration: d || .28, ease: 'power3.out', svgOrigin: '0 20', overwrite: 'auto' }, v)); }
  function eyes(sx, sy) { gsap.to(eyesIn, { scaleX: sx, scaleY: sy, duration: .2, ease: 'power3.out', transformOrigin: '50% 50%', overwrite: 'auto' }); }
  function browUp(dy) { gsap.to(brows, { y: dy, duration: .2, ease: 'power3.out', overwrite: 'auto' }); }

  function classify(t) {
    if (!t || !t.closest) return ['none', null];
    var o = t.closest('[data-buddy]');
    if (o) return [o.dataset.buddy, o];
    if (t.closest('[data-buddy-watch]')) return ['watch', t.closest('[data-buddy-watch]')];
    var dis = t.closest('[disabled], [aria-disabled="true"]');
    if (dis) return ['disabled', dis];
    var f = t.closest('input, textarea, select, [contenteditable="true"]');
    if (f) return [f.type === 'range' ? 'drag' : (f.type === 'radio' || f.type === 'checkbox' ? 'choice' : 'type'), f];
    var tel = t.closest('a[href^="tel:"]');
    if (tel) return ['phone', tel];
    var b = t.closest('button, .btn, [role="button"], [role="radio"], [role="tab"], summary');
    if (b) return [b.matches('.btn:not(.btn--ghost), .nav__book') ? 'cta' : 'button', b];
    if (t.closest('[role="slider"], [draggable="true"], [data-drag]')) return ['drag', t.closest('[role="slider"], [draggable="true"], [data-drag]')];
    var a = t.closest('a[href]');
    if (a) return ['link', a];
    var img = t.closest('img, picture, figure, [data-img], [data-bg-img]');
    if (img) return ['image', img];
    return ['none', null];
  }

  var POSES = {
    none: function () { hands(); headTo({ rotation: 0, y: 0 }); eyes(1, 1); browUp(0); mouth('smile'); gsap.to(finger, { opacity: 0, duration: .1 }); },
    // a link: looks at it and points the way with the right hand; the hat tips with the head
    link: function () { headTo({ rotation: -6 }); hands(null, { x: 23, y: 4, rotation: -20 }); gsap.to(finger, { opacity: 1, duration: .12 }); mouth('smile'); browUp(-.8); },
    // a button: hands together, ready
    button: function () { hands({ x: -7, y: 22 }, { x: 7, y: 22 }); eyes(1.05, 1.05); mouth('smile'); },
    // the primary action: leans in, eyes wide, grin, one small hop (anticipation into arrival) [S0357, S1436]
    cta: function () {
      headTo({ rotation: -8 }); eyes(1.18, 1.18); browUp(-1.6); mouth('grin');
      hands({ x: -16, y: 6, rotation: 20 }, { x: 16, y: 6, rotation: -20 });
      gsap.timeline({ overwrite: 'auto' }).to(body, { y: 2, scaleY: .94, duration: .08, ease: 'power2.in', svgOrigin: '0 30' })
        .to(body, { y: -5, scaleY: 1.04, duration: .16, ease: 'power3.out', svgOrigin: '0 30' })
        .to(body, { y: 0, scaleY: 1, duration: .22, ease: 'back.out(1.4)', svgOrigin: '0 30' });
    },
    // a phone number: cups an ear and tilts the head to listen
    phone: function () { headTo({ rotation: 12 }); hands(null, { x: 18.5, y: 8, rotation: -70, scale: 1.05 }); mouth('o'); eyes(1, .9); browUp(-.8); },
    // a photograph: frames it with both hands and squints with interest
    image: function () { headTo({ rotation: -5 }); hands(null, { x: 6.5, y: 21.5, rotation: -20 }); eyes(1.08, .66); browUp(-1.6); mouth('o'); },
    // a choice (radio, checkbox, tab): a small nod of the head
    choice: function () { hands(null, { x: 16, y: 12 }); gsap.fromTo(head, { y: 0 }, { y: 2.5, duration: .12, yoyo: true, repeat: 1, ease: 'power2.out', svgOrigin: '0 20', overwrite: 'auto' }); mouth('smile'); },
    // something to drag: both hands forward, open, ready to grab
    drag: function () { hands({ x: -9, y: 20, scale: 1.12 }, { x: 9, y: 20, scale: 1.12 }); eyes(1.12, 1.12); mouth('o'); },
    // typing: it steps aside to the field's edge and watches, never over the text [S1441]
    type: function () { hands({ x: -10, y: 21 }, { x: 10, y: 21 }); headTo({ rotation: 0 }); eyes(1, 1); mouth('flat'); },
    // a pinned scene it does not own: it walks to the corner and watches [S0574 drift aside]
    watch: function () { hands({ x: -12, y: 22 }, { x: 12, y: 22 }); eyes(1, 1); mouth('smile'); },
    // disabled: a small head shake, flat mouth
    disabled: function () {
      mouth('flat'); hands();
      gsap.fromTo(head, { rotation: 0 }, { keyframes: [{ rotation: -7 }, { rotation: 6 }, { rotation: -3 }, { rotation: 0 }], duration: .42, ease: 'power2.out', svgOrigin: '0 20', overwrite: 'auto' });
    }
  };
  // the town pins and project cards speak through data-buddy="point" / "peer"
  POSES.point = POSES.link;
  POSES.peer = POSES.image;
  POSES.cards = POSES.image;

  function setState(s, target) {
    if (!POSES[s]) s = 'none';
    if (s === state && target === stateEl) return;
    var prevEl = stateEl;
    state = s; stateEl = target;
    if (el) el.dataset.state = s;
    if (!character()) return;
    if (target !== prevEl || s !== el._lastPose) { el._lastPose = s; POSES[s](target); }
    wake();
  }

  /* ---------- press: the tip taps (1:2), and on the SAME frame the companion squashes; the target's own press is CSS ---------- */
  function press(down) {
    if (down) {
      pressed = true; tipTap();
      if (!character()) return;
      gsap.to(body, { scaleY: .88, scaleX: 1.08, duration: .08, ease: 'power2.in', svgOrigin: '0 30', overwrite: 'auto' });
      if (state === 'drag') hands({ x: -6, y: 18, scale: .85 }, { x: 6, y: 18, scale: .85 }, .1);
      else if (state === 'cta' || state === 'button') hands({ x: -3, y: 16 }, { x: 3, y: 16 }, .08);   // a clap on the click
    } else if (pressed) {
      pressed = false;
      if (!character()) return;
      gsap.to(body, { scaleY: 1, scaleX: 1, duration: .2, ease: 'back.out(1.4)', svgOrigin: '0 30', overwrite: 'auto' });
      if (POSES[state]) POSES[state](stateEl);
    }
    wake();
  }

  function blink() {
    gsap.timeline().to(eyesIn, { scaleY: .1, duration: .06, ease: 'power2.in', transformOrigin: '50% 50%' })
      .to(eyesIn, { scaleY: state === 'image' ? .62 : 1, duration: .1, ease: 'power2.out', transformOrigin: '50% 50%' });
  }

  /* ---------- the loop: one rAF, stops when settled [S1315] ---------- */
  function targetPoint() {
    var Wv = innerWidth, Hv = innerHeight;
    if (leaving) return { x: P.x + OFF.x, y: Hv + 90 };
    if (state === 'watch') return { x: Wv - 56, y: Hv - 56 };
    if (state === 'type' && stateEl && stateEl.isConnected) {
      var r = stateEl.getBoundingClientRect();
      var right = r.right + 34 < Wv - 20;
      return { x: right ? r.right + 34 : r.left - 34, y: r.top + Math.min(r.height / 2, 26) };
    }
    var ox = P.x > Wv - 110 ? -OFF.x : OFF.x, oy = P.y > Hv - 100 ? -OFF.y - 8 : OFF.y;
    return { x: P.x + ox, y: P.y + oy };
  }
  function tick(now) {
    rafId = 0;
    var dt = Math.min(1 / 30, last ? (now - last) / 1000 : 1 / 60);
    last = now;
    var t = targetPoint();
    for (var st = dt; st > 0; st -= 1 / 240) {
      var h = Math.min(st, 1 / 240);
      vel.x += ((K * (t.x - pos.x) - C * vel.x) / M) * h;
      vel.y += ((K * (t.y - pos.y) - C * vel.y) / M) * h;
      pos.x += vel.x * h; pos.y += vel.y * h;
    }
    // lean from velocity, +-10 deg; stretch from speed (state, not time) [S0340]
    var docked = state === 'watch' || state === 'type';
    var want = docked ? 0 : EZ.clamp(vel.x / 90, -10, 10);
    lean += (want - lean) * (1 - Math.exp(-12 * dt));
    var sp = Math.min(1, Math.hypot(vel.x, vel.y) / 1600);
    var sx = 1 + sp * .06, sy = 1 - sp * .05;
    var scl = state === 'type' ? .82 : 1;
    el.style.transform = 'translate3d(' + (pos.x - 33).toFixed(1) + 'px,' + (pos.y - 33).toFixed(1) + 'px,0) rotate(' + lean.toFixed(2) + 'deg) scale(' + (sx * scl).toFixed(3) + ',' + (sy * scl).toFixed(3) + ')';

    // eyes look at the pointer, or at the element the reaction is about
    var fx = P.x, fy = P.y;
    if (stateEl && stateEl.isConnected && (state === 'link' || state === 'image' || state === 'type' || state === 'cta' || state === 'point' || state === 'peer')) {
      var er = stateEl.getBoundingClientRect(); fx = er.left + er.width / 2; fy = er.top + er.height / 2;
    }
    var dx = fx - pos.x, dy = fy - pos.y, d = Math.hypot(dx, dy) || 1, m = Math.min(1, d / 70);
    var ke = 1 - Math.pow(1 - .14, dt * 60);
    look.x += (dx / d * m - look.x) * ke; look.y += (dy / d * m - look.y) * ke;
    for (var i = 0; i < pupils.length; i++) pupils[i].setAttribute('transform', 'translate(' + (look.x * 1.5).toFixed(2) + ' ' + (look.y * 1.7).toFixed(2) + ')');

    if (now > nextBlink) { blink(); nextBlink = now + 2800 + Math.random() * 2600; }
    if (now - (B._hit || 0) > 350) { B._hit = now; queueHit(); }

    if (leaving && pos.y > innerHeight + 60) { finishHide(); return; }
    // settled: near the target, slow, eyes still, pointer idle for 1.5s -> stop the loop (it wakes on any event)
    var still = Math.abs(t.x - pos.x) < .4 && Math.abs(t.y - pos.y) < .4 && Math.hypot(vel.x, vel.y) < 2 && now - P.t > 1500;
    settledFrames = still ? settledFrames + 1 : 0;
    if (settledFrames > 30) return;
    rafId = requestAnimationFrame(tick);
  }
  function wake() { if (!rafId && shown && character() && !doc.hidden) { last = 0; settledFrames = 0; rafId = requestAnimationFrame(tick); } }
  function character() { return B.on && B.want; }

  /* ---------- entry and exit are physical, never a fade at rest [S0574] ---------- */
  function show() {
    if (shown && !leaving) return;
    var wasLeaving = leaving;
    shown = true; leaving = false;
    if (tip) tip.classList.add('is-on');
    if (!character()) return;
    if (!wasLeaving) { pos.x = P.x + OFF.x; pos.y = innerHeight + 70; vel.x = 0; vel.y = -600; }   // rises in from the bottom edge, already moving
    el.classList.add('is-on');
    wake();
  }
  function hide() {
    if (!shown) return;
    if (tip) tip.classList.remove('is-on');
    if (!character()) { shown = false; return; }
    leaving = true; wake();   // drops out of the bottom edge, then stops
  }
  function finishHide() { shown = false; leaving = false; el.classList.remove('is-on'); if (rafId) cancelAnimationFrame(rafId); rafId = 0; }
  doc.addEventListener('visibilitychange', function () { if (doc.hidden && rafId) { cancelAnimationFrame(rafId); rafId = 0; } else wake(); });

  P.on(function (type) {
    if (!B.on) return;
    if (type === 'enter' || type === 'move') { show(); tipMove(); wake(); }
    else if (type === 'leave') hide();
    else if (type === 'target') { var c = classify(P.target); setState(c[0], c[1]); }
    else if (type === 'down') press(true);
    else if (type === 'up') press(false);
  });

  B.refresh = function () {
    var on = enabled();
    B.on = on;
    root.classList.toggle('has-buddy', on);
    if (!el) return;
    if (!on || !B.want) { el.classList.remove('is-on'); if (rafId) cancelAnimationFrame(rafId); rafId = 0; shown = shown && on; }
    if (on && P.has) { shown = false; show(); var c = classify(P.target); state = ''; setState(c[0], c[1]); }
  };
  B.retarget = function () { if (B.on) { state = ''; stateEl = undefined; queueHit(); var c = classify(P.target); setState(c[0], c[1]); } };
  B.led = function (on) { if (character() && on) { eyes(1.1, 1.1); browUp(-1.2); } };   // a field asks for attention: the companion looks up
  B.set = function (v) { B.want = !!v; store(B.want); B.refresh(); syncSwitch(); };

  /* ---------- Settings: Companion On / Off (fine pointers with motion on) ---------- */
  var sw;
  function buildSwitch() {
    sw = doc.createElement('fieldset');
    sw.className = 'buddysw';
    sw.innerHTML = '<legend id="buddysw-t">Cursor companion</legend><div class="seg" role="radiogroup" aria-labelledby="buddysw-t">' +
      '<button type="button" role="radio" data-bv="on" aria-checked="true">On</button>' +
      '<button type="button" role="radio" data-bv="off" aria-checked="false">Off</button></div>';
    var panel = doc.getElementById('settings-panel');
    (panel || doc.body).appendChild(sw);
    sw.addEventListener('click', function (e) { var b = e.target.closest('[data-bv]'); if (b) { B.set(b.dataset.bv === 'on'); b.focus(); } });
    sw.addEventListener('keydown', function (e) {
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].indexOf(e.key) < 0) return;
      e.preventDefault(); B.set(!B.want); sw.querySelector('[data-bv="' + (B.want ? 'on' : 'off') + '"]').focus();
    });
  }
  function syncSwitch() {
    if (!sw) return;
    sw.querySelectorAll('[data-bv]').forEach(function (b) {
      var on = (b.dataset.bv === 'on') === B.want;
      b.setAttribute('aria-checked', on ? 'true' : 'false'); b.tabIndex = on ? 0 : -1;
    });
  }

  B.init = function () {
    initPointer();
    build();
    buildTip();
    buildSwitch();
    B.want = read();
    syncSwitch();
    POSES.none();
    B.refresh();
  };
})();
