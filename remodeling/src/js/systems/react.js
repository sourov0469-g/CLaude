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

  /* hero v2: a hammer swings in and drives a nail into the edge; click throws sparks */
  R.hammer = {
    art: function (w, h) {
      var nx = P + w, ny = P + h / 2;
      var sp = '';
      for (var i = 0; i < 6; i++) { var a = -Math.PI / 2 + (i - 2.5) * .42; sp += '<path d="M' + f(nx + 14 + Math.cos(a) * 6) + ' ' + f(ny + Math.sin(a) * 6) + 'l' + f(Math.cos(a) * 8) + ' ' + f(Math.sin(a) * 8) + '" stroke="' + YEL + '" stroke-width="1.8" stroke-linecap="round"/>'; }
      return '<g class="nl"><path d="M' + (nx + 2) + ' ' + ny + 'h14" stroke="' + STEEL + '" stroke-width="2.2"/><rect x="' + (nx + 15) + '" y="' + (ny - 4.5) + '" width="2.6" height="9" fill="' + STEEL + '" stroke="' + INK + '" stroke-width=".8"/></g>' +
        '<g class="hm" opacity="0"><rect x="' + (nx + 17.5) + '" y="' + (ny - 7) + '" width="9" height="16" rx="1" fill="' + STEEL + '" stroke="' + INK + '" stroke-width="1.2"/>' +
        '<rect x="' + (nx + 26.5) + '" y="' + (ny - 2) + '" width="26" height="5.4" rx="2" fill="#8a5a33" stroke="' + INK + '" stroke-width="1.1"/></g>' +
        '<g class="sk" opacity="0">' + sp + '</g>';
    },
    hover: function (svg, w, h) {
      var hm = one(svg, '.hm'), nl = one(svg, '.nl'), o = (P + w + 52) + ' ' + (P + h / 2 + 1);
      return gsap.timeline({ paused: true })
        .set(hm, { opacity: 1 }, 0)
        .fromTo(hm, { rotation: -70 }, { rotation: -38, svgOrigin: o, duration: .2, ease: 'power2.out' }, 0)
        .to(hm, { rotation: 0, svgOrigin: o, duration: .12, ease: 'power4.in' }, .2)
        .fromTo(nl, { x: 0 }, { x: -9, duration: .08, ease: 'power2.out' }, .32)
        .to(hm, { rotation: -10, svgOrigin: o, duration: .25, ease: 'back.out(3)' }, .32);
    },
    click: function (svg) {
      var sk = one(svg, '.sk');
      return gsap.timeline().set(sk, { opacity: 1 })
        .fromTo(sk.children, { scale: .3, transformOrigin: '0% 50%' }, { scale: 1.3, duration: .35, ease: 'expo.out', stagger: .02 }, 0)
        .to(sk, { opacity: 0, duration: .25 }, .2);
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

  /* proof v1: a rubber stamp hovers over the corner; click thuds an inspection box */
  R.stamp = {
    art: function (w, h) {
      var cx = P + w - 26, cy = P;
      return '<g class="ink" opacity="0"><rect x="' + (cx - 13) + '" y="' + (cy - 9) + '" width="26" height="18" fill="none" stroke="' + RED + '" stroke-width="2"/>' +
        '<path d="M' + (cx - 6) + ' ' + cy + 'l4 4l8 -9" fill="none" stroke="' + RED + '" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></g>' +
        '<g class="st" opacity="0"><rect x="' + (cx - 15) + '" y="' + (cy - 15) + '" width="30" height="5" fill="' + RED + '" stroke="' + INK + '" stroke-width="1"/>' +
        '<rect x="' + (cx - 11) + '" y="' + (cy - 26) + '" width="22" height="11" fill="' + DEEP + '" stroke="' + INK + '" stroke-width="1.2"/>' +
        '<rect x="' + (cx - 3) + '" y="' + (cy - 40) + '" width="6" height="14" fill="#8a5a33" stroke="' + INK + '" stroke-width="1"/><circle cx="' + cx + '" cy="' + (cy - 42) + '" r="6" fill="#8a5a33" stroke="' + INK + '" stroke-width="1.2"/></g>';
    },
    hover: function (svg) {
      return gsap.timeline({ paused: true }).fromTo(one(svg, '.st'), { opacity: 0, y: -16 }, { opacity: 1, y: -6, duration: .4, ease: 'expo.out' });
    },
    click: function (svg) {
      var st = one(svg, '.st');
      return gsap.timeline()
        .to(st, { y: 9, duration: .1, ease: 'power4.in' })
        .fromTo(one(svg, '.ink'), { opacity: 0, scale: 1.25, transformOrigin: '50% 50%' }, { opacity: .95, scale: 1, duration: .5, ease: 'back.out(3)' }, .1)
        .to(st, { y: -6, duration: .35, ease: 'expo.out' }, .18)
        .to(one(svg, '.ink'), { opacity: 0, duration: .4 }, 1.6);
    }
  };

  /* proof v2: a tape blade runs out under the label; click snaps it home */
  R.tape = {
    art: function (w, h) {
      var y = P + h + 6, ticks = '';
      for (var x = 4; x < w; x += 6) ticks += 'M' + (P + x) + ' ' + y + 'v' + (x % 30 === 4 ? 5 : 2.6);
      return '<g class="bl"><rect x="' + P + '" y="' + y + '" width="' + w + '" height="7" fill="' + YEL + '" stroke="' + INK + '" stroke-width="1"/><path d="' + ticks + '" stroke="' + INK + '" stroke-width=".8"/></g>' +
        '<rect class="cs" x="' + (P - 16) + '" y="' + (y - 7) + '" width="16" height="16" rx="4" fill="' + YEL + '" stroke="' + INK + '" stroke-width="1.3"/>';
    },
    hover: function (svg) {
      return gsap.timeline({ paused: true })
        .fromTo(one(svg, '.cs'), { opacity: 0, x: -6 }, { opacity: 1, x: 0, duration: .2, ease: 'power3.out' }, 0)
        .fromTo(one(svg, '.bl'), { scaleX: 0 }, { scaleX: 1, transformOrigin: '0 0', duration: .5, ease: 'expo.out' }, .08);
    },
    click: function (svg) {
      return gsap.timeline().to(one(svg, '.bl'), { scaleX: .02, transformOrigin: '0 0', duration: .16, ease: 'power3.in' })
        .to(one(svg, '.cs'), { x: -4, duration: .06, yoyo: true, repeat: 3 }, .16)
        .to(one(svg, '.bl'), { scaleX: 1, duration: .5, ease: 'expo.out' }, .45);
    }
  };

  /* proof v3: a survey instrument shoots its laser onto the button; click blinks the target */
  R.theodolite = {
    art: function (w, h) {
      var x = P - 28, y = P + h / 2;
      return '<g class="ti" opacity="0"><path d="M' + x + ' ' + (y + 4) + 'l-7 16M' + x + ' ' + (y + 4) + 'v17M' + x + ' ' + (y + 4) + 'l7 16" stroke="' + STEEL + '" stroke-width="1.6"/>' +
        '<rect x="' + (x - 6) + '" y="' + (y - 7) + '" width="12" height="11" rx="2" fill="' + YEL + '" stroke="' + INK + '" stroke-width="1.2"/><rect x="' + (x + 6) + '" y="' + (y - 4) + '" width="5" height="4" fill="' + INK + '"/></g>' +
        '<path class="lz" d="M' + (x + 11) + ' ' + (y - 2) + 'H' + (P + 2) + '" stroke="' + RED + '" stroke-width="1.3"/>' +
        '<circle class="dt" cx="' + (P + 2) + '" cy="' + (y - 2) + '" r="3" fill="' + RED + '" opacity="0"/>';
    },
    hover: function (svg) {
      return gsap.timeline({ paused: true })
        .fromTo(one(svg, '.ti'), { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: .25, ease: 'power3.out' }, 0)
        .fromTo(one(svg, '.lz'), { drawSVG: '0%' }, { drawSVG: '100%', duration: .25, ease: 'power2.in' }, .2)
        .fromTo(one(svg, '.dt'), { opacity: 0, scale: 2, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1, duration: .2, ease: 'power3.out' }, .42);
    },
    click: function (svg) {
      return gsap.timeline().to(one(svg, '.dt'), { opacity: 0, duration: .08, yoyo: true, repeat: 5 });
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

  /* before/after v2: a roller paints a stripe along the top edge */
  R.roller = {
    art: function (w) {
      return '<rect class="pt" x="' + P + '" y="' + (P - 7) + '" width="' + w + '" height="5" fill="#77b3b8"/>' +
        '<g class="rl" opacity="0"><rect x="-8" y="-11" width="16" height="9" rx="3" fill="#ecdcc4" stroke="' + INK + '" stroke-width="1.1"/><path d="M8 -6.5 h5 v-10 h-6" fill="none" stroke="' + STEEL + '" stroke-width="1.6"/><rect x="4" y="-26" width="5" height="10" rx="1.5" fill="' + DEEP + '" stroke="' + INK + '" stroke-width="1"/></g>';
    },
    hover: function (svg, w) {
      var rl = one(svg, '.rl');
      gsap.set(rl, { y: P - 0 });
      return gsap.timeline({ paused: true }).set(rl, { opacity: 1 }, 0)
        .fromTo(rl, { x: P }, { x: P + w, duration: .5, ease: 'power2.inOut' }, 0)
        .fromTo(one(svg, '.pt'), { scaleX: 0 }, { scaleX: 1, transformOrigin: '0 0', duration: .5, ease: 'power2.inOut' }, 0)
        .to(rl, { opacity: 0, duration: .12 }, .45);
    },
    click: function (svg) {
      return gsap.timeline().to(one(svg, '.pt'), { scaleY: 2.2, transformOrigin: '50% 100%', duration: .12, yoyo: true, repeat: 1 });
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

  /* financing v1: perforations march down the stub line; click tears it */
  R.perforation = {
    art: function (w, h) {
      var x = P + w - 16;
      var zz = 'M' + (x + 3) + ' ' + (P - 4);
      for (var y = P; y < P + h + 4; y += 6) zz += 'L' + (x + (((y - P) / 6) % 2 ? 7 : 1)) + ' ' + y;
      return '<path class="pf" d="M' + x + ' ' + (P - 4) + 'V' + (P + h + 4) + '" stroke="currentColor" stroke-width="2" stroke-dasharray="2.5 3.5"/>' +
        '<path class="tr" d="' + zz + '" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>' +
        '<circle class="nt" cx="' + x + '" cy="' + (P - 2) + '" r="4.5" fill="var(--bg, #0B1418)" opacity="0"/><circle class="nb" cx="' + x + '" cy="' + (P + h + 2) + '" r="4.5" fill="var(--bg, #0B1418)" opacity="0"/>';
    },
    hover: function (svg) {
      gsap.set(one(svg, '.tr'), { drawSVG: '0%' });
      return gsap.timeline({ paused: true })
        .fromTo(one(svg, '.pf'), { drawSVG: '0%' }, { drawSVG: '100%', duration: .4, ease: 'power2.out' }, 0)
        .fromTo([one(svg, '.nt'), one(svg, '.nb')], { opacity: 0, scale: .4, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1, duration: .3, ease: 'back.out(2)' }, .1)
        .fromTo(one(svg, '.pf'), { strokeDashoffset: 0 }, { strokeDashoffset: -12, duration: .5, ease: 'none', repeat: 1 }, 0);
    },
    click: function (svg) {
      return gsap.timeline().fromTo(one(svg, '.tr'), { drawSVG: '0%' }, { drawSVG: '100%', duration: .3, ease: 'power3.out' })
        .to(one(svg, '.tr'), { drawSVG: '100% 100%', duration: .3 }, 1.2);
    }
  };

  /* financing v2: a valve wheel turns and the button fills like a pipe */
  R.valve = {
    art: function (w, h) {
      var cx = P - 14, cy = P + h / 2, sp = '';
      for (var i = 0; i < 4; i++) { var a = Math.PI / 4 * i * 2; sp += 'M' + f(cx - Math.cos(a) * 8) + ' ' + f(cy - Math.sin(a) * 8) + 'L' + f(cx + Math.cos(a) * 8) + ' ' + f(cy + Math.sin(a) * 8); }
      return '<clipPath id="rxc-' + w + '-' + h + '"><rect x="' + P + '" y="' + P + '" width="' + w + '" height="' + h + '"/></clipPath>' +
        '<rect class="wt" clip-path="url(#rxc-' + w + '-' + h + ')" x="' + P + '" y="' + P + '" width="' + w + '" height="' + h + '" fill="#77b3b8" opacity=".28"/>' +
        '<path d="M' + (cx + 9) + ' ' + cy + 'H' + P + '" stroke="' + STEEL + '" stroke-width="4"/>' +
        '<g class="vw"><circle cx="' + cx + '" cy="' + cy + '" r="9" fill="none" stroke="' + RED + '" stroke-width="2.6"/><path d="' + sp + '" stroke="' + RED + '" stroke-width="1.6"/><circle cx="' + cx + '" cy="' + cy + '" r="2" fill="' + INK + '"/></g>';
    },
    hover: function (svg, w, h) {
      var o = (P - 14) + ' ' + (P + h / 2);
      return gsap.timeline({ paused: true })
        .fromTo(one(svg, '.vw'), { rotation: 0 }, { rotation: 180, svgOrigin: o, duration: .5, ease: 'power2.inOut' }, 0)
        .fromTo(one(svg, '.wt'), { scaleY: 0 }, { scaleY: 1, transformOrigin: '50% 100%', duration: .5, ease: 'power2.out' }, .15);
    },
    click: function (svg) {
      return gsap.timeline().to(one(svg, '.wt'), { opacity: .55, duration: .1, yoyo: true, repeat: 1 });
    }
  };

  /* financing v3: a level under the label; the bubble settles in the middle */
  R.level = {
    art: function (w, h) {
      var lw = Math.min(110, w * .7), x = P + (w - lw) / 2, y = P + h + 5;
      return '<g class="lv" opacity="0"><rect x="' + x + '" y="' + y + '" width="' + lw + '" height="9" rx="2" fill="' + STEEL + '" stroke="' + INK + '" stroke-width="1"/>' +
        '<rect x="' + (x + lw / 2 - 13) + '" y="' + (y + 1.6) + '" width="26" height="5.8" rx="2.9" fill="#d6ec8a" stroke="' + INK + '" stroke-width=".8"/>' +
        '<path d="M' + (x + lw / 2 - 4) + ' ' + (y + 1.6) + 'v5.8M' + (x + lw / 2 + 4) + ' ' + (y + 1.6) + 'v5.8" stroke="' + INK + '" stroke-width=".8"/>' +
        '<ellipse class="bb" cx="' + (x + lw / 2) + '" cy="' + (y + 4.5) + '" rx="3.4" ry="2.1" fill="#fff"/></g>';
    },
    hover: function (svg) {
      return gsap.timeline({ paused: true })
        .fromTo(one(svg, '.lv'), { opacity: 0, y: 5 }, { opacity: 1, y: 0, duration: .25, ease: 'power3.out' }, 0)
        .fromTo(one(svg, '.bb'), { x: -9 }, { x: 0, duration: .7, ease: 'elastic.out(1,.4)' }, .1);
    },
    click: function (svg) {
      return gsap.timeline().fromTo(one(svg, '.bb'), { x: 5 }, { x: 0, duration: .6, ease: 'elastic.out(1.2,.3)' });
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

  /* towns: a survey pin drops onto the top edge with a ripple */
  R.pin = {
    art: function (w) {
      var x = P + w - 22, y = P;
      return '<ellipse class="rp" cx="' + x + '" cy="' + y + '" rx="10" ry="3.4" fill="none" stroke="currentColor" stroke-width="1.4" opacity="0"/>' +
        '<g class="pn" opacity="0"><path d="M' + x + ' ' + y + 'C' + (x - 2) + ' ' + (y - 8) + ' ' + (x - 9) + ' ' + (y - 12) + ' ' + (x - 9) + ' ' + (y - 19) + 'a9 9 0 0 1 18 0C' + (x + 9) + ' ' + (y - 12) + ' ' + (x + 2) + ' ' + (y - 8) + ' ' + x + ' ' + y + 'Z" fill="' + RED + '" stroke="' + INK + '" stroke-width="1.3"/><circle cx="' + x + '" cy="' + (y - 19) + '" r="3.4" fill="#fff"/></g>';
    },
    hover: function (svg, w) {
      var o = (P + w - 22) + ' ' + P;
      return gsap.timeline({ paused: true })
        .fromTo(one(svg, '.pn'), { opacity: 0, y: -26 }, { opacity: 1, y: 0, duration: .45, ease: 'bounce.out' }, 0)
        .fromTo(one(svg, '.rp'), { opacity: 1, scale: .3 }, { opacity: 0, scale: 2, svgOrigin: o, duration: .5, ease: 'expo.out' }, .3);
    },
    click: function (svg, w) {
      var o = (P + w - 22) + ' ' + P;
      return gsap.timeline().to(one(svg, '.pn'), { y: -8, duration: .15, ease: 'power2.out', yoyo: true, repeat: 1 })
        .fromTo(one(svg, '.rp'), { opacity: 1, scale: .3 }, { opacity: 0, scale: 2.4, svgOrigin: o, duration: .5, ease: 'expo.out' }, .28);
    }
  };

  /* consult v1: the clipboard clip opens on hover and snaps shut on click */
  R.clip = {
    art: function (w) {
      var x = P + w / 2, y = P;
      return '<g class="cb"><rect x="' + (x - 18) + '" y="' + (y - 8) + '" width="36" height="12" rx="3" fill="' + STEEL + '" stroke="' + INK + '" stroke-width="1.3"/><circle cx="' + x + '" cy="' + (y - 12) + '" r="5" fill="none" stroke="' + STEEL + '" stroke-width="2.6"/></g>' +
        '<path class="lv" d="M' + (x - 14) + ' ' + (y + 3) + 'H' + (x + 14) + '" stroke="' + INK + '" stroke-width="2.4" stroke-linecap="round"/>';
    },
    hover: function (svg, w) {
      var x = P + w / 2;
      return gsap.timeline({ paused: true })
        .fromTo(one(svg, '.cb'), { y: -6, opacity: 0 }, { y: 0, opacity: 1, duration: .3, ease: 'power3.out' }, 0)
        .fromTo(one(svg, '.lv'), { rotation: 0 }, { rotation: -22, svgOrigin: (x + 14) + ' ' + (P + 3), duration: .35, ease: 'back.out(2)' }, .15);
    },
    click: function (svg, w) {
      var x = P + w / 2;
      return gsap.timeline().to(one(svg, '.lv'), { rotation: 0, svgOrigin: (x + 14) + ' ' + (P + 3), duration: .1, ease: 'power4.in' })
        .to(one(svg, '.cb'), { y: 2, duration: .06, yoyo: true, repeat: 1 }, .1);
    }
  };

  /* consult v2: a door opens at the right edge and light spills out */
  R.door = {
    art: function (w, h) {
      var x = P + w + 6, y = P - 6, dh = h + 12;
      return '<path class="lt" d="M' + x + ' ' + y + 'L' + (x - 34) + ' ' + (y + dh) + 'H' + x + 'Z" fill="#fff1b8" opacity="0"/>' +
        '<rect x="' + x + '" y="' + y + '" width="16" height="' + dh + '" fill="#2a1d12" stroke="' + INK + '" stroke-width="1.2"/>' +
        '<g class="lf"><rect x="' + x + '" y="' + y + '" width="16" height="' + dh + '" fill="#c9a46a" stroke="' + INK + '" stroke-width="1.2"/><circle cx="' + (x + 12) + '" cy="' + (y + dh / 2) + '" r="1.6" fill="' + INK + '"/></g>';
    },
    hover: function (svg, w) {
      var x = P + w + 6;
      return gsap.timeline({ paused: true })
        .fromTo(svg.querySelectorAll('rect, .lf'), { opacity: 0 }, { opacity: 1, duration: .15 }, 0)
        .fromTo(one(svg, '.lf'), { scaleX: 1 }, { scaleX: .2, svgOrigin: (x + 16) + ' 0', duration: .45, ease: 'power3.inOut' }, .1)
        .fromTo(one(svg, '.lt'), { opacity: 0 }, { opacity: .45, duration: .3 }, .3);
    },
    click: function (svg) {
      return gsap.timeline().to(one(svg, '.lt'), { opacity: .9, duration: .08, yoyo: true, repeat: 1 });
    }
  };

  /* phone links and consult v3: the handset rings */
  R.handset = {
    art: function (w, h) {
      var x = P - 16, y = P + h / 2;
      return '<g class="hs"><path d="M' + (x - 6) + ' ' + (y - 8) + 'q-3 8 0 16l3 -1 2 -5 -2 -1q-1 -3 0 -4l2 -1 -2 -5z" fill="' + YEL + '" stroke="' + INK + '" stroke-width="1.1" stroke-linejoin="round"/></g>' +
        '<g class="wv" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><path d="M' + (x + 1) + ' ' + (y - 5) + 'q3 5 0 10"/><path d="M' + (x + 4) + ' ' + (y - 8) + 'q5 8 0 16"/></g>';
    },
    hover: function (svg, w, h) {
      var o = (P - 19) + ' ' + (P + h / 2);
      return gsap.timeline({ paused: true })
        .fromTo(one(svg, '.hs'), { rotation: 0 }, { keyframes: [{ rotation: -16, duration: .06 }, { rotation: 14, duration: .07 }, { rotation: -12, duration: .07 }, { rotation: 8, duration: .07 }, { rotation: 0, duration: .1 }], svgOrigin: o }, 0)
        .fromTo(one(svg, '.wv').children, { drawSVG: '50% 50%', opacity: 0 }, { drawSVG: '0% 100%', opacity: 1, duration: .25, stagger: .08 }, .1);
    },
    click: function (svg, w, h) {
      return gsap.timeline().fromTo(one(svg, '.wv'), { scale: 1, opacity: 1 }, { scale: 1.8, opacity: 0, svgOrigin: (P - 16) + ' ' + (P + h / 2), duration: .45, ease: 'expo.out' })
        .set(one(svg, '.wv'), { scale: 1, opacity: 1 });
    }
  };

  /* footer: a hard hat drops onto the button */
  R.hardhat = {
    art: function (w) {
      var x = P + 26, y = P + 1;
      return '<g class="hh" opacity="0"><path d="M' + (x - 13) + ' ' + y + 'c0 -10 6 -15 13 -15s13 5 13 15z" fill="' + YEL + '" stroke="' + INK + '" stroke-width="1.4"/><rect x="' + (x - 17) + '" y="' + (y - 2.5) + '" width="34" height="4.5" rx="2" fill="' + YEL + '" stroke="' + INK + '" stroke-width="1.3"/><path d="M' + (x - 2.5) + ' ' + (y - 14.5) + 'v12M' + (x + 2.5) + ' ' + (y - 14.5) + 'v12" stroke="#c8960f" stroke-width="1.8"/></g>';
    },
    hover: function () {
      return gsap.timeline({ paused: true });   // built in bind (needs svg)
    },
    build: function (svg) {
      return gsap.timeline({ paused: true }).fromTo(one(svg, '.hh'), { opacity: 0, y: -34 }, { opacity: 1, y: 0, duration: .55, ease: 'bounce.out' });
    },
    click: function (svg) {
      return gsap.timeline().to(one(svg, '.hh'), { y: -10, duration: .14, ease: 'power2.out' }).to(one(svg, '.hh'), { y: 0, duration: .45, ease: 'bounce.out' });
    }
  };

  /* work alt: a trowel smooths along the bottom edge */
  R.trowel = {
    art: function (w, h) {
      return '<rect class="mt" x="' + P + '" y="' + (P + h + 3) + '" width="' + w + '" height="3" fill="#b9b3a6"/>' +
        '<g class="tw" opacity="0"><path d="M-14 0 H14 L10 -4 H-10 Z" fill="' + STEEL + '" stroke="' + INK + '" stroke-width="1"/><path d="M0 -4 V-10" stroke="' + INK + '" stroke-width="1.4"/><rect x="-8" y="-15" width="16" height="5" rx="2.5" fill="#8a5a33" stroke="' + INK + '" stroke-width="1"/></g>';
    },
    hover: function (svg, w, h) {
      var tw = one(svg, '.tw');
      gsap.set(tw, { y: P + h + 3 });
      return gsap.timeline({ paused: true }).set(tw, { opacity: 1 }, 0)
        .fromTo(tw, { x: P }, { x: P + w, duration: .55, ease: 'power2.inOut' }, 0)
        .fromTo(one(svg, '.mt'), { scaleX: 0 }, { scaleX: 1, transformOrigin: '0 0', duration: .55, ease: 'power2.inOut' }, 0)
        .to(tw, { opacity: 0, duration: .12 }, .5);
    },
    click: function (svg) {
      return gsap.timeline().to(one(svg, '.mt'), { scaleY: 2, transformOrigin: '50% 0', duration: .1, yoyo: true, repeat: 1 });
    }
  };

  /* before/after v3: a roll-down storm shutter closes behind the label; click rolls it up and down again */
  R.shutter = {
    art: function (w, h) {
      var n = Math.max(4, Math.round(h / 7)), sl = '', sh = h / n;
      for (var i = 0; i < n; i++) sl += '<rect class="sl" x="' + P + '" y="' + f(P + i * sh) + '" width="' + w + '" height="' + f(sh - 1.2) + '" fill="#9fb0b5" opacity=".38"/>';
      return '<clipPath id="rxs-' + w + '-' + h + '"><rect x="' + P + '" y="' + P + '" width="' + w + '" height="' + h + '"/></clipPath>' +
        '<g clip-path="url(#rxs-' + w + '-' + h + ')"><g class="sls">' + sl + '</g></g>' +
        '<rect class="bx" x="' + (P - 3) + '" y="' + (P - 9) + '" width="' + (w + 6) + '" height="8" rx="2" fill="' + STEEL + '" stroke="' + INK + '" stroke-width="1.1"/>';
    },
    hover: function (svg, w, h) {
      return gsap.timeline({ paused: true })
        .fromTo(one(svg, '.bx'), { opacity: 0, y: -4 }, { opacity: 1, y: 0, duration: .15, ease: 'power2.out' }, 0)
        .fromTo(one(svg, '.sls'), { y: -h }, { y: 0, duration: .45, ease: EZ.bezier(.625, .05, 0, 1) }, .05);
    },
    click: function (svg, w, h) {
      return gsap.timeline().to(one(svg, '.sls'), { y: -h, duration: .2, ease: 'power3.in' }).to(one(svg, '.sls'), { y: 0, duration: .4, ease: 'bounce.out' });
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
    var name = el.dataset.rx, def = R[name];
    if (!def || el.dataset.rxBound) return;
    el.dataset.rxBound = '1';
    var wrapped = wrapLabel(el);
    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'rx rx--' + name);
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
      if (inside) hoverTl.progress(1);
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
    on(el, 'focus', function () { if (el.matches(':focus-visible')) enter(); });
    on(el, 'blur', function () { if (inside) leave(); });
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

  // called by core on every version activation (kit-scoped) and once for chrome
  EZ.bindReactions = function (scope, kit) {
    if (!EZ.motionOn()) return;
    scope.querySelectorAll('[data-rx]').forEach(function (el) { bind(el, kit); });
  };
  var chromeOff = [];
  EZ.bindChromeReactions = function () {
    chromeOff.splice(0).forEach(function (f) { f(); });
    if (!EZ.motionOn()) return;
    document.querySelectorAll('.nav [data-rx], .foot [data-rx], .mbar [data-rx], .sheet [data-rx]').forEach(function (el) {
      var d = bind(el, null);
      if (d) chromeOff.push(d);
    });
  };
})();
