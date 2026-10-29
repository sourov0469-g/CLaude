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
  var INK = '#0B1418', YEL = '#f2c230', STEEL = '#c9d1d3', BLUE = '#2b6a96', RED = '#e2412b', DEEP = '#1d4a4e';

  function f(n) { return Math.round(n * 10) / 10; }
  function q(svg, s) { return svg.querySelectorAll(s); }
  function one(svg, s) { return svg.querySelector(s); }

  // each reaction: art(w,h) -> markup; hover(svg,w,h) -> paused timeline; click(svg,w,h,el) -> timeline
  var R = {};

  /* nav: a blueprint roll unrolls a sheet under the label */
  R.blueprint = {
    art: function (w, h) {
      var y = P + h + 5;
      return '<g class="s" opacity="0"><rect x="' + P + '" y="' + y + '" width="' + w + '" height="11" fill="' + BLUE + '"/>' +
        '<path d="M' + P + ' ' + (y + 3.5) + 'H' + (P + w) + 'M' + P + ' ' + (y + 7.5) + 'H' + (P + w) + '" stroke="#cfe3f2" stroke-width=".6" stroke-dasharray="3 3"/>' +
        '<path d="M' + (P + 8) + ' ' + y + 'v11M' + (P + w * .5) + ' ' + y + 'v11" stroke="#cfe3f2" stroke-width=".6"/></g>' +
        '<g class="r" opacity="0"><circle cx="0" cy="0" r="7.5" fill="' + BLUE + '" stroke="' + INK + '" stroke-width="1.4"/><circle r="3" fill="#cfe3f2"/></g>';
    },
    hover: function (svg, w, h) {
      var s = one(svg, '.s'), r = one(svg, '.r');
      gsap.set(r, { x: P, y: P + h + 10.5 });
      return gsap.timeline({ paused: true })
        .set([s, r], { opacity: 1 })
        .fromTo(s, { scaleX: 0 }, { scaleX: 1, transformOrigin: '0 0', duration: .5, ease: 'expo.out' }, 0)
        .fromTo(r, { x: P }, { x: P + w, duration: .5, ease: 'expo.out' }, 0)
        .fromTo(r, { rotation: 0 }, { rotation: 540, transformOrigin: '50% 50%', duration: .5, ease: 'expo.out' }, 0);
    },
    click: function (svg) {
      return gsap.timeline().to(one(svg, '.r'), { y: '-=7', duration: .12, ease: 'power2.out', yoyo: true, repeat: 1 });
    }
  };

  /* hero v1: a carpenter's pencil draws a box round the button; click stamps a tick */
  R.pencil = {
    art: function (w, h) {
      var d = 'M' + (P - 6) + ' ' + (P - 6) + 'H' + (P + w + 6) + 'V' + (P + h + 6) + 'H' + (P - 6) + 'Z';
      return '<path class="box" d="' + d + '" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"/>' +
        '<g class="pc" opacity="0"><path d="M0 0 L-4 -9 L4 -9 Z" fill="#ecdcc4" stroke="' + INK + '" stroke-width="1"/><path d="M-1.3 -3 L0 0 L1.3 -3Z" fill="' + INK + '"/>' +
        '<rect x="-4" y="-34" width="8" height="25" fill="' + YEL + '" stroke="' + INK + '" stroke-width="1.1"/><rect x="-4" y="-38" width="8" height="4" fill="#d06a5a" stroke="' + INK + '" stroke-width="1.1"/></g>' +
        '<path class="tk" d="M' + (P + w - 2) + ' ' + (P - 2) + 'l5 5l11 -12" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>';
    },
    hover: function (svg) {
      var box = one(svg, '.box'), pc = one(svg, '.pc');
      gsap.set(one(svg, '.tk'), { drawSVG: '0%' });
      return gsap.timeline({ paused: true })
        .fromTo(box, { drawSVG: '0%' }, { drawSVG: '100%', duration: .55, ease: 'power2.inOut' }, 0)
        .set(pc, { opacity: 1 }, 0)
        .to(pc, { motionPath: { path: box, align: box, alignOrigin: [0, 0], autoRotate: 30 }, duration: .55, ease: 'power2.inOut' }, 0)
        .to(pc, { opacity: 0, duration: .15 }, .5);
    },
    click: function (svg) {
      return gsap.timeline().fromTo(one(svg, '.tk'), { drawSVG: '0%' }, { drawSVG: '100%', duration: .3, ease: 'power2.out' })
        .to(one(svg, '.tk'), { drawSVG: '100% 100%', duration: .25, ease: 'power2.in' }, 1.1);
    }
  };

  /* hero v3: a hex bolt screws into the top-right corner; click pulses its washer */
  R.bolt = {
    art: function (w, h) {
      var cx = P + w - 2, cy = P + 2, hex = '';
      for (var i = 0; i < 6; i++) { var a = Math.PI / 3 * i + Math.PI / 6; hex += (i ? 'L' : 'M') + f(cx + Math.cos(a) * 9) + ' ' + f(cy + Math.sin(a) * 9); }
      return '<circle class="ws" cx="' + cx + '" cy="' + cy + '" r="12" fill="none" stroke="currentColor" stroke-width="1.6" opacity="0"/>' +
        '<g class="bt" opacity="0"><path d="' + hex + 'Z" fill="' + STEEL + '" stroke="' + INK + '" stroke-width="1.4"/><circle cx="' + cx + '" cy="' + cy + '" r="4" fill="none" stroke="' + INK + '" stroke-width="1.1"/></g>';
    },
    hover: function (svg, w) {
      var o = (P + w - 2) + ' ' + (P + 2);
      return gsap.timeline({ paused: true })
        .fromTo(one(svg, '.bt'), { opacity: 0, scale: 1.7, rotation: -300 }, { opacity: 1, scale: 1, rotation: 0, svgOrigin: o, duration: .5, ease: 'power3.out' }, 0)
        .fromTo(one(svg, '.ws'), { opacity: 0, scale: 1.6 }, { opacity: 1, scale: 1, svgOrigin: o, duration: .3, ease: 'power3.out' }, .3);
    },
    click: function (svg, w) {
      return gsap.timeline().fromTo(one(svg, '.ws'), { scale: 1, opacity: 1 }, { scale: 2.6, opacity: 0, svgOrigin: (P + w - 2) + ' ' + (P + 2), duration: .5, ease: 'expo.out' })
        .set(one(svg, '.ws'), { scale: 1, opacity: 1 });
    }
  };

  /* services v1: a screwdriver turns a screw at the left edge */
  R.screw = {
    art: function (w, h) {
      var cx = P - 12, cy = P + h / 2;
      return '<g class="sw"><circle cx="' + cx + '" cy="' + cy + '" r="7" fill="' + STEEL + '" stroke="' + INK + '" stroke-width="1.3"/><path class="sl" d="M' + (cx - 4.5) + ' ' + cy + 'h9M' + cx + ' ' + (cy - 4.5) + 'v9" stroke="' + INK + '" stroke-width="1.6"/></g>' +
        '<g class="dv" opacity="0"><path d="M' + (cx - 9) + ' ' + cy + 'h-14" stroke="' + STEEL + '" stroke-width="2.6"/><rect x="' + (cx - 44) + '" y="' + (cy - 5) + '" width="21" height="10" rx="3" fill="' + DEEP + '" stroke="' + INK + '" stroke-width="1.2"/></g>' +
        '<circle class="rg" cx="' + cx + '" cy="' + cy + '" r="9" fill="none" stroke="currentColor" stroke-width="1.4" opacity="0"/>';
    },
    hover: function (svg, w, h) {
      var o = (P - 12) + ' ' + (P + h / 2);
      return gsap.timeline({ paused: true })
        .fromTo(one(svg, '.dv'), { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: .22, ease: 'power3.out' }, 0)
        .fromTo(one(svg, '.sl'), { rotation: 0 }, { rotation: 270, svgOrigin: o, duration: .5, ease: 'power2.inOut' }, .12);
    },
    click: function (svg, w, h) {
      var o = (P - 12) + ' ' + (P + h / 2);
      return gsap.timeline().to(one(svg, '.sw'), { scale: .8, svgOrigin: o, duration: .12, yoyo: true, repeat: 1 })
        .fromTo(one(svg, '.rg'), { opacity: 1, scale: 1 }, { opacity: 0, scale: 2, svgOrigin: o, duration: .45, ease: 'expo.out' }, 0);
    }
  };

  /* services v2: a handsaw cuts along the bottom edge; click drops sawdust */
  R.saw = {
    art: function (w, h) {
      var y = P + h, teeth = 'M0 0';
      for (var i = 0; i < 9; i++) teeth += 'l2.5 4l2.5 -4';
      var dust = '';
      for (var j = 0; j < 9; j++) dust += '<circle cx="' + f(P + w * (.15 + j * .09)) + '" cy="' + (y + 4) + '" r="' + (1 + (j % 3) * .5) + '" fill="#d9b98a"/>';
      return '<path class="ct" d="M' + P + ' ' + (y + 3) + 'H' + (P + w) + '" stroke="currentColor" stroke-width="1.2" stroke-dasharray="4 3"/>' +
        '<g class="sa" opacity="0"><path d="M0 -12 H40 L46 -2 V0 H0 Z" fill="' + STEEL + '" stroke="' + INK + '" stroke-width="1.1"/><path d="' + teeth + '" fill="' + STEEL + '" stroke="' + INK + '" stroke-width=".8"/>' +
        '<path d="M46 -12 h10 a5 5 0 0 1 5 5 v4 a5 5 0 0 1 -5 5 h-10 Z" fill="#8a5a33" stroke="' + INK + '" stroke-width="1.1"/></g>' +
        '<g class="du" opacity="0">' + dust + '</g>';
    },
    hover: function (svg, w, h) {
      var sa = one(svg, '.sa');
      gsap.set(sa, { y: P + h + 2 });
      return gsap.timeline({ paused: true })
        .set(sa, { opacity: 1 }, 0)
        .fromTo(sa, { x: P - 40 }, { x: P + w - 40, duration: .6, ease: 'power1.inOut' }, 0)
        .fromTo(one(svg, '.ct'), { drawSVG: '0%' }, { drawSVG: '100%', duration: .6, ease: 'power1.inOut' }, 0)
        .to(sa, { opacity: 0, duration: .15 }, .55);
    },
    click: function (svg) {
      var du = one(svg, '.du');
      return gsap.timeline().set(du, { opacity: 1 })
        .fromTo(du.children, { y: 0, opacity: 1 }, { y: function () { return 16 + Math.random() * 18; }, x: function () { return (Math.random() - .5) * 12; }, opacity: 0, duration: .7, ease: 'power2.in', stagger: .02 });
    }
  };

  /* services v3: a pegboard hook drops onto the top edge and sways */
  R.hook = {
    art: function (w) {
      var x = P + w / 2;
      return '<g class="hk" opacity="0"><circle cx="' + x + '" cy="' + (P - 26) + '" r="3.2" fill="' + INK + '"/><path d="M' + x + ' ' + (P - 26) + 'V' + (P - 6) + 'q0 8 -7 8q-6 0 -6 -6" fill="none" stroke="' + STEEL + '" stroke-width="2.8" stroke-linecap="round"/></g>';
    },
    hover: function (svg, w) {
      var hk = one(svg, '.hk'), o = (P + w / 2) + ' ' + (P - 26);
      return gsap.timeline({ paused: true })
        .fromTo(hk, { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: .3, ease: 'back.out(2)' }, 0)
        .fromTo(hk, { rotation: 14 }, { rotation: 0, svgOrigin: o, duration: .7, ease: 'elastic.out(1,.35)' }, .1);
    },
    click: function (svg) {
      return gsap.timeline().to(one(svg, '.hk'), { y: -7, duration: .12, ease: 'power2.out', yoyo: true, repeat: 1 });
    }
  };

  /* before/after: a fan of paint swatches opens at the right edge; click lets a drip fall */
  R.swatch = {
    art: function (w, h) {
      var x = P + w + 4, y = P + h - 2, cols = ['#ecdcc4', '#77b3b8', '#1d4a4e', '#c9a46a'], s = '';
      for (var i = 0; i < 4; i++) s += '<rect class="sw' + i + '" x="' + (x - 3) + '" y="' + (y - 30) + '" width="9" height="30" rx="1" fill="' + cols[i] + '" stroke="' + INK + '" stroke-width="1"/>';
      return '<g class="fan" opacity="0">' + s + '<circle cx="' + (x + 1.5) + '" cy="' + (y - 4) + '" r="1.6" fill="' + INK + '"/></g><circle class="dp" cx="' + (x + 1.5) + '" cy="' + (y + 2) + '" r="2.6" fill="#77b3b8" opacity="0"/>';
    },
    hover: function (svg, w, h) {
      var o = (P + w + 5.5) + ' ' + (P + h - 6), tl = gsap.timeline({ paused: true }).set(one(svg, '.fan'), { opacity: 1 }, 0);
      [-48, -26, -6, 14].forEach(function (a, i) { tl.fromTo(one(svg, '.sw' + i), { rotation: 0 }, { rotation: a, svgOrigin: o, duration: .45, ease: 'back.out(1.8)' }, i * .03); });
      return tl;
    },
    click: function (svg) {
      return gsap.timeline().fromTo(one(svg, '.dp'), { opacity: 1, y: 0, scaleY: 1 }, { y: 22, scaleY: 1.5, opacity: 0, duration: .5, ease: 'power2.in', transformOrigin: '50% 0' });
    }
  };

  /* process: a chalk line snaps under the label and leaves a puff of blue dust */
  R.chalk = {
    art: function (w, h) {
      var y = P + h + 6, dust = '';
      for (var i = 0; i < 7; i++) dust += '<circle cx="' + f(P + w / 2 + (i - 3) * 5) + '" cy="' + y + '" r="2" fill="#5aa8d6"/>';
      return '<path class="cl" d="M' + P + ' ' + y + 'Q' + (P + w / 2) + ' ' + y + ' ' + (P + w) + ' ' + y + '" fill="none" stroke="#5aa8d6" stroke-width="1.8" stroke-linecap="round"/><g class="pf" opacity="0">' + dust + '</g>';
    },
    hover: function (svg, w, h) {
      var cl = one(svg, '.cl'), y = P + h + 6, o = { d: 0 };
      function set() { cl.setAttribute('d', 'M' + P + ' ' + y + 'Q' + (P + w / 2) + ' ' + f(y + o.d) + ' ' + (P + w) + ' ' + y); }
      return gsap.timeline({ paused: true })
        .fromTo(cl, { drawSVG: '0%' }, { drawSVG: '100%', duration: .25, ease: 'power2.out' }, 0)
        .fromTo(o, { d: 0 }, { d: 14, duration: .15, ease: 'power2.out', onUpdate: set }, .2)
        .to(o, { d: 0, duration: .6, ease: 'elastic.out(1.2,.25)', onUpdate: set }, .35)
        .fromTo(one(svg, '.pf').children, { opacity: .9, y: 0, scale: 1, transformOrigin: '50% 50%' }, { opacity: 0, y: function (i) { return -6 - (i % 3) * 4; }, scale: 2.2, duration: .5, stagger: .02, ease: 'power2.out' }, .36)
        .set(one(svg, '.pf'), { opacity: 1 }, .36);
    },
    click: function (svg, w, h) {
      var cl = one(svg, '.cl'), y = P + h + 6, o = { d: -10 };
      return gsap.timeline().to(o, { d: 0, duration: .55, ease: 'elastic.out(1.2,.25)', onUpdate: function () { cl.setAttribute('d', 'M' + P + ' ' + y + 'Q' + (P + w / 2) + ' ' + f(y + o.d) + ' ' + (P + w) + ' ' + y); } });
    }
  };

  /* work: viewfinder corners snap onto the button; click fires the shutter */
  R.viewfinder = {
    art: function (w, h) {
      var a = P - 7, b = P + w + 7, c = P - 7, d = P + h + 7, L = 9;
      return '<g class="vf" fill="none" stroke="currentColor" stroke-width="2"><path class="c0" d="M' + a + ' ' + (c + L) + 'V' + c + 'H' + (a + L) + '"/><path class="c1" d="M' + (b - L) + ' ' + c + 'H' + b + 'V' + (c + L) + '"/>' +
        '<path class="c2" d="M' + b + ' ' + (d - L) + 'V' + d + 'H' + (b - L) + '"/><path class="c3" d="M' + (a + L) + ' ' + d + 'H' + a + 'V' + (d - L) + '"/></g>' +
        '<circle class="rec" cx="' + (P + w + 2) + '" cy="' + (P - 12) + '" r="3" fill="' + RED + '" opacity="0"/>' +
        '<rect class="fl" x="' + P + '" y="' + P + '" width="' + w + '" height="' + h + '" fill="#fff" opacity="0"/>';
    },
    hover: function (svg) {
      return gsap.timeline({ paused: true })
        .fromTo(one(svg, '.c0'), { x: -10, y: -10, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: .35, ease: 'expo.out' }, 0)
        .fromTo(one(svg, '.c1'), { x: 10, y: -10, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: .35, ease: 'expo.out' }, .03)
        .fromTo(one(svg, '.c2'), { x: 10, y: 10, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: .35, ease: 'expo.out' }, .06)
        .fromTo(one(svg, '.c3'), { x: -10, y: 10, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: .35, ease: 'expo.out' }, .09)
        .fromTo(one(svg, '.rec'), { opacity: 0 }, { opacity: 1, duration: .1, repeat: 3, yoyo: true }, .2);
    },
    click: function (svg) {
      return gsap.timeline().fromTo(one(svg, '.fl'), { opacity: .7 }, { opacity: 0, duration: .35, ease: 'power2.out' });
    }
  };

  /* reviews: a clamp work-lamp swings in and lights the button; click flickers it */
  R.lamp = {
    art: function (w, h) {
      var x = P - 4, y = P - 22;
      return '<path class="cn" d="M' + (x + 6) + ' ' + (y + 6) + 'L' + (P + w * .9) + ' ' + (P + h + 4) + 'L' + (P - 2) + ' ' + (P + h + 4) + 'Z" fill="#fff1b8" opacity="0"/>' +
        '<g class="lp" opacity="0"><path d="M' + (x - 16) + ' ' + (y - 14) + 'L' + x + ' ' + y + '" stroke="' + STEEL + '" stroke-width="2.2"/><path d="M' + (x - 4) + ' ' + (y - 6) + 'l13 -3l3 13l-13 3z" fill="' + DEEP + '" stroke="' + INK + '" stroke-width="1.2"/></g>';
    },
    hover: function (svg) {
      var o = (P - 20) + ' ' + (P - 36);
      return gsap.timeline({ paused: true })
        .fromTo(one(svg, '.lp'), { opacity: 0, rotation: -40 }, { opacity: 1, rotation: 0, svgOrigin: o, duration: .45, ease: 'back.out(1.6)' }, 0)
        .fromTo(one(svg, '.cn'), { opacity: 0 }, { opacity: .32, duration: .3, ease: 'power2.out' }, .25);
    },
    click: function (svg) {
      return gsap.timeline().to(one(svg, '.cn'), { keyframes: [{ opacity: .05, duration: .05 }, { opacity: .32, duration: .05 }, { opacity: .1, duration: .06 }, { opacity: .4, duration: .1 }, { opacity: .32, duration: .2 }] });
    }
  };

  /* work v3: two strips of masking tape stick the button to the board; click tears one off */
  R.masking = {
    art: function (w, h) {
      function strip(cx, cy, a, cls) {
        return '<g class="' + cls + '" transform="translate(' + cx + ' ' + cy + ') rotate(' + a + ')"><path d="M-20 -7 L20 -7 L22 -4 L19 -1 L22 2 L20 7 L-20 7 L-22 4 L-19 1 L-22 -2 Z" fill="#e9dfc2" fill-opacity=".9" stroke="#b9ad8c" stroke-width=".8"/></g>';
      }
      return strip(P + 6, P + 2, -32, 'ta') + strip(P + w - 6, P + h - 2, -32, 'tb');
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

  /* towns: a survey stake with flagging tape is driven in beside the button */
  R.stake = {
    art: function (w, h) {
      var x = P - 12, y = P + h;
      return '<g class="sk2" opacity="0"><path d="M' + x + ' ' + (y - 34) + 'v30l3 7l3 -7v-30z" fill="#c9a46a" stroke="' + INK + '" stroke-width="1.2" stroke-linejoin="round"/>' +
        '<path class="fl" d="M' + (x + 6) + ' ' + (y - 32) + 'q12 2 16 9q-9 -3 -16 2z" fill="#ff7a3c" stroke="' + INK + '" stroke-width=".8"/></g>' +
        '<path class="gd" d="M' + (x - 10) + ' ' + (y + 4) + 'h26" stroke="currentColor" stroke-width="1.4" opacity="0"/>';
    },
    hover: function (svg, w, h) {
      return gsap.timeline({ paused: true })
        .fromTo(one(svg, '.sk2'), { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: .25, ease: 'power4.in' }, 0)
        .fromTo(one(svg, '.gd'), { opacity: 0, scaleX: .3, transformOrigin: '50% 50%' }, { opacity: 1, scaleX: 1, duration: .25, ease: 'expo.out' }, .24)
        .fromTo(one(svg, '.fl'), { scaleX: .6, transformOrigin: '0% 50%' }, { scaleX: 1, duration: .5, ease: 'elastic.out(1,.4)' }, .25);
    },
    click: function (svg) {
      return gsap.timeline().to(one(svg, '.sk2'), { y: 4, duration: .08, ease: 'power4.in' }).to(one(svg, '.sk2'), { y: 2, duration: .2 });
    }
  };

  /* consult v3: a ring of keys jingles at the left edge */
  R.keys = {
    art: function (w, h) {
      var cx = P - 14, cy = P + 6;
      function key(a, col) { return '<g class="ky" transform="rotate(' + a + ' ' + cx + ' ' + cy + ')"><circle cx="' + cx + '" cy="' + (cy + 12) + '" r="4.5" fill="' + col + '" stroke="' + INK + '" stroke-width="1.1"/><path d="M' + cx + ' ' + (cy + 16) + 'v14m0 -4h4m-4 4h3" stroke="' + col + '" stroke-width="2.4" stroke-linecap="round"/></g>'; }
      return '<g class="kr" opacity="0"><circle cx="' + cx + '" cy="' + cy + '" r="6" fill="none" stroke="' + STEEL + '" stroke-width="2"/>' + key(-20, YEL) + key(10, STEEL) + key(34, '#c9a46a') + '</g>';
    },
    hover: function (svg) {
      var tl = gsap.timeline({ paused: true }).fromTo(one(svg, '.kr'), { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: .25, ease: 'power3.out' }, 0);
      q(svg, '.ky').forEach(function (k, i) { tl.fromTo(k, { rotation: 0 }, { rotation: (i - 1) * 16, transformOrigin: '50% 0%', duration: .5, ease: 'elastic.out(1,.3)' }, .1 + i * .04); });
      return tl;
    },
    click: function (svg) {
      return gsap.timeline().to(q(svg, '.ky'), { rotation: '+=14', transformOrigin: '50% 0%', duration: .07, yoyo: true, repeat: 5, stagger: .02 });
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
      w = nw; h = nh;
      if (hoverTl) hoverTl.kill();
      if (clickTl) clickTl.kill();
      svg.setAttribute('width', w + P * 2); svg.setAttribute('height', h + P * 2);
      svg.setAttribute('viewBox', '0 0 ' + (w + P * 2) + ' ' + (h + P * 2));
      svg.innerHTML = def.art(w, h);
      hoverTl = def.build ? def.build(svg, w, h) : def.hover(svg, w, h);
      hoverTl.eventCallback('onReverseComplete', rest);
      if (inside) hoverTl.progress(1); else rest();   // a redraw while resting never leaves the drawing switched on
    }
    // the drawing is only on stage while it acts: nothing sits beside a resting button
    var clicking = false;
    function rest() { if (!inside && !clicking) el.classList.remove('rx-on'); }
    function enter() { inside = true; draw(); el.classList.add('rx-on'); if (hoverTl) hoverTl.timeScale(1).play(); }
    function leave() { inside = false; if (hoverTl) hoverTl.timeScale(2.5).reverse(); }   // in .5 / out .2 [BANK 229]
    function press(e) {
      if (!w) draw();
      if (clickTl) clickTl.progress(1).kill();
      el.classList.add('rx-on');
      clicking = true;
      clickTl = def.click(svg, w, h, el);
      clickTl.eventCallback('onComplete', function () { clicking = false; if (!inside && (!hoverTl || hoverTl.progress() === 0)) rest(); });
      if (e && e.pointerType === 'touch') {
        // phones: the tap is the hover, then it settles back
        if (hoverTl) { hoverTl.timeScale(1.4).play(0); }
        clearTimeout(el._rxT);
        el._rxT = setTimeout(function () { if (hoverTl && !inside) hoverTl.timeScale(2.5).reverse(); }, 900);
      }
    }
    var offs = [];
    function on(t, ev, fn, o) { t.addEventListener(ev, fn, o); offs.push(function () { t.removeEventListener(ev, fn, o); }); }
    on(el, 'pointerenter', function (e) { if (e.pointerType === 'mouse' || e.pointerType === 'pen') enter(); });
    on(el, 'pointerleave', function (e) { if (e.pointerType === 'mouse' || e.pointerType === 'pen') leave(); });
    // focusin/out so a wrapper (label, field box) reacts when the control inside it takes keyboard focus
    on(el, 'focusin', function (e) { if (e.target.matches(':focus-visible')) enter(); });
    on(el, 'focusout', function () { if (inside) leave(); });
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
