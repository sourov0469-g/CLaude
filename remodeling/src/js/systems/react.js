/* Button reaction kit, PLAN-V3 §2.2: every button gets its own drawn trade reaction.
   Mechanism refs: [BANK] 147 Shape Hover (path morph 250-330ms, backout), [BANK] 151 elastic two-stage press,
   [BANK] 348 circular progress, S0634 Motion.Lab (border-draw, click-burst, ripple), S0409 success check,
   [BANK] 72 MotionPath follower, [BANK] 229 asymmetric hover (in .5 / out .2).
   Rules: the button itself never moves (the old magnet did, and broke hovers); only the drawn tools move,
   tools may rotate, text never does; reduced motion and Motion: Off keep plain colour hovers.
   Usage: <a class="btn" data-rx="hammer">…</a>, bound per version by core (kit-scoped) or once for chrome. */
(function () {
  var NS = 'http://www.w3.org/2000/svg';
  var P = 36;                                   // drawing margin around the button, px
  var INK = '#121212', YEL = '#FF5F00', STEEL = '#C9C1B6', BLUE = '#FF5F00', RED = '#C42B1C', DEEP = '#FF5F00';

  function f(n) { return Math.round(n * 10) / 10; }
  function q(svg, s) { return svg.querySelectorAll(s); }
  function one(svg, s) { return svg.querySelector(s); }

  // each reaction: art(w,h) -> markup; hover(svg,w,h) -> paused timeline; click(svg,w,h,el) -> timeline
  var R = {};

  /* nav: a blueprint roll unrolls a sheet under the label */
  R.blueprint = {
    art: function (w, h) {
      var y = P + h - 7;
      return '<g class="s" opacity="0"><rect x="' + P + '" y="' + y + '" width="' + w + '" height="7" fill="' + DEEP + '"/>' +
        '<path d="M' + P + ' ' + (y + 3.5) + 'H' + (P + w) + '" stroke="#121212" stroke-width=".7" stroke-dasharray="3 3"/></g>' +
        '<g class="r" opacity="0"><circle cx="0" cy="0" r="5" fill="' + DEEP + '" stroke="' + INK + '" stroke-width="1.2"/><circle r="2" fill="#FFFFFF"/></g>';
    },
    hover: function (svg, w, h) {
      var s = one(svg, '.s'), r = one(svg, '.r');
      gsap.set(r, { x: P, y: P + h - 3.5 });
      return gsap.timeline({ paused: true })
        .set([s, r], { opacity: 1 })
        .fromTo(s, { scaleX: 0 }, { scaleX: 1, transformOrigin: '0 0', duration: .28, ease: 'expo.out' }, 0)
        .fromTo(r, { x: P }, { x: P + w, duration: .28, ease: 'expo.out' }, 0)
        .fromTo(r, { rotation: 0 }, { rotation: 540, transformOrigin: '50% 50%', duration: .28, ease: 'expo.out' }, 0);
    },
    click: function (svg) {
      return gsap.timeline().to(one(svg, '.r'), { y: '-=5', duration: .12, ease: 'power2.out', yoyo: true, repeat: 1 });
    }
  };

  /* hero v1: a carpenter's pencil draws a box round the button; click stamps a tick */
  R.pencil = {
    art: function (w, h) {
      var d = 'M' + (P + 3) + ' ' + (P + 3) + 'H' + (P + w - 3) + 'V' + (P + h - 3) + 'H' + (P + 3) + 'Z';
      return '<path class="box" d="' + d + '" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"/>' +
        '<g class="pc" opacity="0"><path d="M0 0 L-4 -9 L4 -9 Z" fill="#ecdcc4" stroke="' + INK + '" stroke-width="1"/><path d="M-1.3 -3 L0 0 L1.3 -3Z" fill="' + INK + '"/>' +
        '<rect x="-4" y="-34" width="8" height="25" fill="' + YEL + '" stroke="' + INK + '" stroke-width="1.1"/><rect x="-4" y="-38" width="8" height="4" fill="#d06a5a" stroke="' + INK + '" stroke-width="1.1"/></g>' +
        '<path class="tk" d="M' + (P + w - 22) + ' ' + (P + h / 2) + 'l5 5l11 -12" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>';
    },
    hover: function (svg) {
      var box = one(svg, '.box'), pc = one(svg, '.pc');
      gsap.set(one(svg, '.tk'), { drawSVG: '0%' });
      return gsap.timeline({ paused: true })
        .fromTo(box, { drawSVG: '0%' }, { drawSVG: '100%', duration: .3, ease: 'power2.out' }, 0)
        .set(pc, { opacity: 1 }, 0)
        .to(pc, { motionPath: { path: box, align: box, alignOrigin: [0, 0], autoRotate: 30 }, duration: .3, ease: 'power2.out' }, 0)
        .to(pc, { opacity: 0, duration: .1 }, .26);
    },
    click: function (svg) {
      return gsap.timeline().fromTo(one(svg, '.tk'), { drawSVG: '0%' }, { drawSVG: '100%', duration: .3, ease: 'power2.out' })
        .to(one(svg, '.tk'), { drawSVG: '100% 100%', duration: .25, ease: 'power2.in' }, 1.1);
    }
  };

  /* hero v3: a hex bolt screws into the top-right corner; click pulses its washer */
  R.bolt = {
    art: function (w, h) {
      var cx = P + w - 9, cy = P + 9, hex = '';
      for (var i = 0; i < 6; i++) { var a = Math.PI / 3 * i + Math.PI / 6; hex += (i ? 'L' : 'M') + f(cx + Math.cos(a) * 9) + ' ' + f(cy + Math.sin(a) * 9); }
      return '<circle class="ws" cx="' + cx + '" cy="' + cy + '" r="12" fill="none" stroke="currentColor" stroke-width="1.6" opacity="0"/>' +
        '<g class="bt" opacity="0"><path d="' + hex + 'Z" fill="' + STEEL + '" stroke="' + INK + '" stroke-width="1.4"/><circle cx="' + cx + '" cy="' + cy + '" r="4" fill="none" stroke="' + INK + '" stroke-width="1.1"/></g>';
    },
    hover: function (svg, w) {
      var o = (P + w - 9) + ' ' + (P + 9);
      return gsap.timeline({ paused: true })
        .fromTo(one(svg, '.bt'), { opacity: 0, scale: 1.7, rotation: -300 }, { opacity: 1, scale: .7, rotation: 0, svgOrigin: o, duration: .28, ease: 'power3.out' }, 0)
        .fromTo(one(svg, '.ws'), { opacity: 0, scale: 1.4 }, { opacity: 1, scale: .7, svgOrigin: o, duration: .18, ease: 'power3.out' }, .18);
    },
    click: function (svg, w) {
      return gsap.timeline().fromTo(one(svg, '.ws'), { scale: 1, opacity: 1 }, { scale: 2, opacity: 0, svgOrigin: (P + w - 9) + ' ' + (P + 9), duration: .3, ease: 'expo.out' })
        .set(one(svg, '.ws'), { scale: .7, opacity: 1 });
    }
  };

  /* services v1: a screwdriver turns a screw at the left edge */
  R.screw = {
    art: function (w, h) {
      var cx = P + 11, cy = P + h / 2;
      return '<g class="sw"><circle cx="' + cx + '" cy="' + cy + '" r="7" fill="' + STEEL + '" stroke="' + INK + '" stroke-width="1.3"/><path class="sl" d="M' + (cx - 4.5) + ' ' + cy + 'h9M' + cx + ' ' + (cy - 4.5) + 'v9" stroke="' + INK + '" stroke-width="1.6"/></g>' +
        '<g class="dv" opacity="0"><path d="M' + (cx - 9) + ' ' + cy + 'h-14" stroke="' + STEEL + '" stroke-width="2.6"/><rect x="' + (cx - 44) + '" y="' + (cy - 5) + '" width="21" height="10" rx="3" fill="' + DEEP + '" stroke="' + INK + '" stroke-width="1.2"/></g>' +
        '<circle class="rg" cx="' + cx + '" cy="' + cy + '" r="9" fill="none" stroke="currentColor" stroke-width="1.4" opacity="0"/>';
    },
    hover: function (svg, w, h) {
      var o = (P + 11) + ' ' + (P + h / 2);
      return gsap.timeline({ paused: true })
        .fromTo(one(svg, '.dv'), { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: .14, ease: 'power3.out' }, 0)
        .fromTo(one(svg, '.sl'), { rotation: 0 }, { rotation: 270, svgOrigin: o, duration: .2, ease: 'power2.out' }, .1);
    },
    click: function (svg, w, h) {
      var o = (P + 11) + ' ' + (P + h / 2);
      return gsap.timeline().to(one(svg, '.sw'), { scale: .8, svgOrigin: o, duration: .12, yoyo: true, repeat: 1 })
        .fromTo(one(svg, '.rg'), { opacity: 1, scale: 1 }, { opacity: 0, scale: 2, svgOrigin: o, duration: .45, ease: 'expo.out' }, 0);
    }
  };

  /* services v3: a pegboard hook drops onto the top edge and sways */
  R.hook = {
    art: function (w) {
      var x = P + w / 2;
      return '<g class="hk" opacity="0"><circle cx="' + x + '" cy="' + (P - 12) + '" r="3" fill="' + INK + '"/><path d="M' + x + ' ' + (P - 12) + 'V' + (P + 2) + 'q0 7 -6 7q-5 0 -5 -5" fill="none" stroke="' + STEEL + '" stroke-width="2.8" stroke-linecap="round"/></g>';
    },
    hover: function (svg, w) {
      var hk = one(svg, '.hk'), o = (P + w / 2) + ' ' + (P - 12);
      return gsap.timeline({ paused: true })
        .fromTo(hk, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: .2, ease: 'power3.out' }, 0)
        .fromTo(hk, { rotation: 12 }, { rotation: 0, svgOrigin: o, duration: .3, ease: 'back.out(2)' }, .1);
    },
    click: function (svg) {
      return gsap.timeline().to(one(svg, '.hk'), { y: -7, duration: .12, ease: 'power2.out', yoyo: true, repeat: 1 });
    }
  };

  /* before/after: a fan of paint swatches opens at the right edge; click lets a drip fall */
  R.swatch = {
    art: function (w, h) {
      var x = P + w - 16, y = P + h - 4, cols = ['#ecdcc4', '#FF5F00', '#FF5F00', '#FFC29A'], s = '';
      for (var i = 0; i < 4; i++) s += '<rect class="sw' + i + '" x="' + (x - 3) + '" y="' + (y - 30) + '" width="9" height="30" rx="1" fill="' + cols[i] + '" stroke="' + INK + '" stroke-width="1"/>';
      return '<g class="fan" opacity="0">' + s + '<circle cx="' + (x + 1.5) + '" cy="' + (y - 4) + '" r="1.6" fill="' + INK + '"/></g><circle class="dp" cx="' + (x + 1.5) + '" cy="' + (y + 2) + '" r="2.6" fill="#FF5F00" opacity="0"/>';
    },
    hover: function (svg, w, h) {
      var o = (P + w - 14.5) + ' ' + (P + h - 8), tl = gsap.timeline({ paused: true }).set(one(svg, '.fan'), { opacity: 1 }, 0);
      [-48, -26, -6, 14].forEach(function (a, i) { tl.fromTo(one(svg, '.sw' + i), { rotation: 0 }, { rotation: a, svgOrigin: o, duration: .26, ease: 'power3.out' }, i * .03); });
      return tl;
    },
    click: function (svg) {
      return gsap.timeline().fromTo(one(svg, '.dp'), { opacity: 1, y: 0, scaleY: 1 }, { y: 22, scaleY: 1.5, opacity: 0, duration: .5, ease: 'power2.in', transformOrigin: '50% 0' });
    }
  };

  /* work: viewfinder corners snap onto the button; click fires the shutter */
  R.viewfinder = {
    art: function (w, h) {
      var a = P + 3, b = P + w - 3, c = P + 3, d = P + h - 3, L = 8;
      return '<g class="vf" fill="none" stroke="currentColor" stroke-width="2"><path class="c0" d="M' + a + ' ' + (c + L) + 'V' + c + 'H' + (a + L) + '"/><path class="c1" d="M' + (b - L) + ' ' + c + 'H' + b + 'V' + (c + L) + '"/>' +
        '<path class="c2" d="M' + b + ' ' + (d - L) + 'V' + d + 'H' + (b - L) + '"/><path class="c3" d="M' + (a + L) + ' ' + d + 'H' + a + 'V' + (d - L) + '"/></g>' +
        '<circle class="rec" cx="' + (P + w - 10) + '" cy="' + (P + 10) + '" r="2.5" fill="' + RED + '" opacity="0"/>' +
        '<rect class="fl" x="' + P + '" y="' + P + '" width="' + w + '" height="' + h + '" fill="#fff" opacity="0"/>';
    },
    hover: function (svg) {
      return gsap.timeline({ paused: true })
        .fromTo(one(svg, '.c0'), { x: -10, y: -10, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: .21, ease: 'expo.out' }, 0)
        .fromTo(one(svg, '.c1'), { x: 10, y: -10, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: .21, ease: 'expo.out' }, .03)
        .fromTo(one(svg, '.c2'), { x: 10, y: 10, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: .21, ease: 'expo.out' }, .06)
        .fromTo(one(svg, '.c3'), { x: -10, y: 10, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: .21, ease: 'expo.out' }, .09)
        .fromTo(one(svg, '.rec'), { opacity: 0 }, { opacity: 1, duration: .1 }, .2);
    },
    click: function (svg) {
      return gsap.timeline().fromTo(one(svg, '.fl'), { opacity: .7 }, { opacity: 0, duration: .35, ease: 'power2.out' });
    }
  };

  /* work v3: two strips of masking tape stick the button to the board; click tears one off */
  R.masking = {
    art: function (w, h) {
      function strip(cx, cy, a, cls) {
        return '<g class="' + cls + '" transform="translate(' + cx + ' ' + cy + ') rotate(' + a + ')"><path d="M-20 -7 L20 -7 L22 -4 L19 -1 L22 2 L20 7 L-20 7 L-22 4 L-19 1 L-22 -2 Z" fill="#e9dfc2" fill-opacity=".9" stroke="#b9ad8c" stroke-width=".8"/></g>';
      }
      return strip(P + 10, P + 4, -32, 'ta') + strip(P + w - 10, P + h - 4, -32, 'tb');
    },
    hover: function (svg) {
      return gsap.timeline({ paused: true })
        .fromTo(one(svg, '.ta'), { opacity: 0, scale: 1.6, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1, duration: .28, ease: 'back.out(2.4)' }, 0)
        .fromTo(one(svg, '.tb'), { opacity: 0, scale: 1.6, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1, duration: .28, ease: 'back.out(2.4)' }, .12);
    },
    click: function (svg) {
      return gsap.timeline().to(one(svg, '.tb'), { x: 18, y: -20, opacity: 0, duration: .35, ease: 'power2.in' })
        .set(one(svg, '.tb'), { x: 0, y: 0, opacity: 1 }, .9);
    }
  };

  /* consult v3: a ring of keys jingles at the left edge */
  R.keys = {
    art: function (w, h) {
      var cx = P + 12, cy = P + 6;
      function key(a, col) { return '<g class="ky" transform="rotate(' + a + ' ' + cx + ' ' + cy + ')"><circle cx="' + cx + '" cy="' + (cy + 12) + '" r="4.5" fill="' + col + '" stroke="' + INK + '" stroke-width="1.1"/><path d="M' + cx + ' ' + (cy + 16) + 'v14m0 -4h4m-4 4h3" stroke="' + col + '" stroke-width="2.4" stroke-linecap="round"/></g>'; }
      return '<g class="kr" opacity="0"><circle cx="' + cx + '" cy="' + cy + '" r="6" fill="none" stroke="' + STEEL + '" stroke-width="2"/>' + key(-20, YEL) + key(10, STEEL) + key(34, '#FFC29A') + '</g>';
    },
    hover: function (svg) {
      var tl = gsap.timeline({ paused: true }).fromTo(one(svg, '.kr'), { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: .25, ease: 'power3.out' }, 0);
      q(svg, '.ky').forEach(function (k, i) { tl.fromTo(k, { rotation: 0 }, { rotation: (i - 1) * 16, transformOrigin: '50% 0%', duration: .18, ease: 'power3.out' }, .08 + i * .02); });
      return tl;
    },
    click: function (svg) {
      return gsap.timeline().to(q(svg, '.ky'), { rotation: '+=14', transformOrigin: '50% 0%', duration: .07, yoyo: true, repeat: 5, stagger: .02 });
    }
  };

  /* every tel: link: one job, one signature [AUDIT-01 D.5; S1314 §7 same-job consistency, S0220 Axiom 2] */
  R.phone = {
    art: function (w, h) {
      var x = P + w + 2, y = P + h - 2;
      return '<path class="ul" d="M' + P + ' ' + (P + h + 1) + 'H' + (P + w) + '" stroke="currentColor" stroke-width="1.6" fill="none"/>' +
        '<g class="hs" opacity="0"><path d="M' + (x + 2) + ' ' + (y - 13) + 'q-4 7 0 14l4-1.4 1.4-4.6-2.7-1.3q-.6-2 0-4l2.7-1.3-1.4-4.6z" fill="currentColor" stroke="' + INK + '" stroke-width="1"/></g>' +
        '<g class="ar" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M' + (x + 10) + ' ' + (y - 10) + 'q3 4 0 8"/><path d="M' + (x + 14) + ' ' + (y - 13) + 'q5 7 0 14"/></g>';
    },
    hover: function (svg) {
      var arcs = q(svg, '.ar path');
      return gsap.timeline({ paused: true })
        .fromTo(one(svg, '.ul'), { drawSVG: '0%' }, { drawSVG: '100%', duration: .16, ease: 'power2.out' }, 0)
        .fromTo(one(svg, '.hs'), { opacity: 0, y: 3 }, { opacity: 1, y: -2, duration: .16, ease: 'power2.out' }, 0)
        .fromTo(arcs, { drawSVG: '0%', opacity: 1 }, { drawSVG: '100%', duration: .16, ease: 'power2.out', stagger: .04 }, .02);
    },
    click: function (svg) {
      var arcs = q(svg, '.ar path'), hs = one(svg, '.hs');
      return gsap.timeline()
        .fromTo(arcs, { opacity: 1 }, { opacity: .2, duration: .08, yoyo: true, repeat: 1, stagger: .04 }, 0)
        .to(hs, { keyframes: [{ rotation: -10 }, { rotation: 8 }, { rotation: 0 }], duration: .3, transformOrigin: '50% 50%' }, 0);
    }
  };

  EZ.REACTIONS = R;

  /* ---------- binding ---------- */
  function wrapLabel(el) {
    if (el.querySelector(':scope > .btn__label, :scope > .rx-l')) return null;
    // structured buttons (grid rows, tabs) keep their children: each child is lifted above the drawing instead
    if (el.children.length > 1) { Array.prototype.forEach.call(el.children, function (c) { c.classList.add('rx-c'); }); return null; }
    var span = document.createElement('span');
    span.className = 'rx-l';
    while (el.firstChild) span.appendChild(el.firstChild);
    el.appendChild(span);
    return span;
  }

  function bind(el, kit) {
    var name = el.dataset.rx, def = name && name.charAt(0) === '~' ? EZ.rigDef(name, P) : R[name];
    if (!def || el.dataset.rxBound) return;
    el.dataset.rxBound = '1';
    var wrapped = wrapLabel(el);
    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'rx rx--' + (name.charAt(0) === '~' ? 'rig' : name));
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    el.appendChild(svg);
    el.classList.add('has-rx');
    var hoverTl = null, clickTl = null, w = 0, h = 0, inside = false;

    function draw() {
      var r = el.getBoundingClientRect();
      var nw = Math.round(r.width), nh = Math.round(r.height);
      if (!nw || !nh || (nw === w && nh === h)) return;
      // a beat in flight is never cut by a redraw (a chip whose border grows on select, a toggle that relabels):
      // the redraw waits for the beat, then runs [AUDIT-01 D.2.2]
      if (clicking) { pending = true; return; }
      w = nw; h = nh;
      if (hoverTl) hoverTl.kill();
      svg.setAttribute('width', w + P * 2); svg.setAttribute('height', h + P * 2);
      svg.setAttribute('viewBox', '0 0 ' + (w + P * 2) + ' ' + (h + P * 2));
      svg.innerHTML = def.art(w, h, el);
      hoverTl = def.build ? def.build(svg, w, h) : def.hover(svg, w, h);
      hoverTl.eventCallback('onReverseComplete', rest);
      if (inside) hoverTl.progress(1); else rest();   // a redraw while resting never leaves the drawing switched on
    }
    // the drawing is only on stage while it acts: nothing sits beside a resting button
    var clicking = false, pending = false;
    function rest() { if (!inside && !clicking) el.classList.remove('rx-on'); }
    // draw BEFORE marking inside: a first draw while inside used to jump the timeline to its end [AUDIT-01 D.11]
    function enter() { draw(); inside = true; el.classList.add('rx-on'); if (hoverTl) hoverTl.timeScale(1).play(); }
    function leave() { inside = false; if (hoverTl) hoverTl.timeScale(2.5).reverse(); }   // in .5 / out .2 [BANK 229]
    function press(e) {
      if (!w) draw();
      if (clickTl) clickTl.progress(1).kill();
      el.classList.add('rx-on');
      clicking = true;
      clickTl = def.click(svg, w, h, el);
      clickTl.eventCallback('onComplete', function () {
        clicking = false;
        if (pending) { pending = false; draw(); }
        if (!inside && (!hoverTl || hoverTl.progress() === 0)) rest();
      });
      if (e && e.pointerType === 'touch') {
        // phones: the tap is the hover, then it settles back
        if (hoverTl) { hoverTl.timeScale(1.4).play(0); }
        clearTimeout(el._rxT);
        el._rxT = setTimeout(function () { if (hoverTl && !inside) hoverTl.timeScale(2.5).reverse(); }, 600);
      }
    }
    var offs = [];
    function on(t, ev, fn, o) { t.addEventListener(ev, fn, o); offs.push(function () { t.removeEventListener(ev, fn, o); }); }
    on(el, 'pointerenter', function (e) { if (e.pointerType === 'mouse' || e.pointerType === 'pen') enter(); });
    on(el, 'pointerleave', function (e) { if (e.pointerType === 'mouse' || e.pointerType === 'pen') leave(); });
    // focusin/out so a wrapper (label, field box) reacts when the control inside it takes keyboard focus
    on(el, 'focusin', function (e) { if (e.target.matches(':focus-visible')) enter(); });
    on(el, 'focusout', function () { if (inside && !el.matches(':hover')) leave(); });   // still under the pointer: keep it
    on(el, 'pointerdown', function (e) { if (e.pointerType === 'touch') press(e); });
    on(el, 'click', function (e) { if (!el._rxTouch) press(e); });   // mouse, pen and keyboard; touch already reacted on press
    on(el, 'touchstart', function () { el._rxTouch = 1; clearTimeout(el._rxTT); el._rxTT = setTimeout(function () { el._rxTouch = 0; }, 600); }, { passive: true });
    var ro = new ResizeObserver(function () { draw(); });
    ro.observe(el);
    function dispose() {
      offs.splice(0).forEach(function (f) { f(); });
      ro.disconnect();
      if (hoverTl) hoverTl.kill();
      if (clickTl) clickTl.kill();
      clearTimeout(el._rxT);
      svg.remove();
      el.classList.remove('has-rx');
      delete el.dataset.rxBound;
      if (wrapped && wrapped.parentNode === el) { while (wrapped.firstChild) el.insertBefore(wrapped.firstChild, wrapped); wrapped.remove(); }
    }
    if (kit) kit.add(dispose);
    return dispose;
  }

  // controls created after a version was bound (a success note's call link) bind themselves [AUDIT-01 D.2.4]
  EZ.bindOne = function (el, kit) { if (EZ.motionOn() && el.dataset.rx) bind(el, kit); };
  EZ.rxValid = function (n) { return !!n && (n.indexOf('native:') === 0 || (n.charAt(0) === '~' ? !!EZ.rigDef(n, P) : !!R[n])); };
  // called by core on every version activation (kit-scoped) and once for chrome
  EZ.bindReactions = function (scope, kit) {
    if (!EZ.motionOn()) return;
    scope.querySelectorAll('[data-rx]').forEach(function (el) { bind(el, kit); });
  };
  var chromeOff = [];
  EZ.bindChromeReactions = function () {
    chromeOff.splice(0).forEach(function (f) { f(); });
    if (!EZ.motionOn()) return;
    document.querySelectorAll('.nav [data-rx], .foot [data-rx], .mbar [data-rx], .sheet [data-rx], .vswitch [data-rx], #settings [data-rx], .viewer [data-rx], .skip[data-rx]').forEach(function (el) {
      var d = bind(el, null);
      if (d) chromeOff.push(d);
    });
  };
})();
