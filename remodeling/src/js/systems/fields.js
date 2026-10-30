/* Section fields (background SVG/CSS layers that answer the pointer and the scroll) and the
   industry dividers between sections, PLAN-V3 §2.3 / §2.4.
   Refs: [BANK] Heron AI blueprint grid with crosshair corners, [BANK] FH Potsdam 421 data-attribute
   parallax (coarse pointer -> scroll parallax), S0634 grid-magnetic (radius 100, pull .3) and
   spotlight-follow, [BANK] 53 morph separator, [BANK] 72 MotionPath follower, S18 hairline draw,
   [BANK] Shopify hand-drawn lines 3s (.34,.22,.47,.84), [BANK] 349 feTurbulence grain. */
(function () {
  var doc = document, NS = 'http://www.w3.org/2000/svg';
  var INK = '#121212', YEL = '#FF5F00', STEEL = '#C9C1B6';
  function f(n) { return Math.round(n * 10) / 10; }
  function live() { return EZ.fine() && EZ.motionOn(); }

  /* ---------- field builders: each returns { el, move(x,y,P), leave(), resize(w,h), scroll } ---------- */
  var FIELD = {};

  // hero: blueprint grid; a crosshair runs to the edges from the pointer, the grid brightens near it
  FIELD.blueprint = function () {
    var el = doc.createElement('div');
    el.innerHTML = '<div class="fld-grid"></div><div class="fld-grid fld-grid--hot"></div><span class="fld-ch fld-ch--x"></span><span class="fld-ch fld-ch--y"></span><span class="fld-read nums"></span>';
    var read = el.querySelector('.fld-read');
    return { el: el, move: function (x, y) { read.textContent = 'X ' + Math.round(x) + '  Y ' + Math.round(y); } };
  };

  // proof: topographic survey contours that bend away from the pointer
  FIELD.contours = function () {
    var el = doc.createElement('div');
    var svg = doc.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'fld-svg');
    el.appendChild(svg);
    var rings = [], W = 0, H = 0, raf = 0, px = -999, py = -999, active = false;
    function build(w, h) {
      W = w; H = h; svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h); svg.innerHTML = ''; rings = [];
      var centres = [[w * .78, h * .32, 1], [w * .18, h * .78, .8]];
      centres.forEach(function (c, ci) {
        for (var r = 1; r <= 7; r++) {
          var pts = [], N = 64, R = r * 46 * c[2];
          for (var i = 0; i < N; i++) {
            var a = i / N * Math.PI * 2;
            var wob = 1 + .16 * Math.sin(a * 3 + r * .7 + ci) + .08 * Math.sin(a * 5 - r);
            pts.push({ bx: c[0] + Math.cos(a) * R * wob * 1.35, by: c[1] + Math.sin(a) * R * wob, x: 0, y: 0 });
          }
          pts.forEach(function (p) { p.x = p.bx; p.y = p.by; });
          var path = doc.createElementNS(NS, 'path');
          path.setAttribute('class', r % 5 === 0 ? 'fld-c fld-c--major' : 'fld-c');
          svg.appendChild(path);
          rings.push({ pts: pts, path: path });
        }
      });
      draw();
    }
    function draw() {
      rings.forEach(function (rg) {
        var p = rg.pts, d = 'M' + f(p[0].x) + ' ' + f(p[0].y);
        for (var i = 1; i <= p.length; i++) {
          var a = p[i % p.length], b = p[(i + 1) % p.length];
          d += 'Q' + f(a.x) + ' ' + f(a.y) + ' ' + f((a.x + b.x) / 2) + ' ' + f((a.y + b.y) / 2);
        }
        rg.path.setAttribute('d', d);
      });
    }
    function step() {
      raf = 0;
      var moving = false, R = 150;
      rings.forEach(function (rg) {
        rg.pts.forEach(function (p) {
          var tx = p.bx, ty = p.by;
          if (active) {
            var dx = p.bx - px, dy = p.by - py, d = Math.hypot(dx, dy);
            if (d < R && d > .01) { var push = (1 - d / R) * 34; tx += dx / d * push; ty += dy / d * push; }
          }
          var nx = p.x + (tx - p.x) * .14, ny = p.y + (ty - p.y) * .14;
          if (Math.abs(nx - p.x) + Math.abs(ny - p.y) > .05) moving = true;
          p.x = nx; p.y = ny;
        });
      });
      draw();
      if (moving || active) raf = requestAnimationFrame(step);
    }
    function kick() { if (!raf) raf = requestAnimationFrame(step); }
    return {
      el: el,
      resize: build,
      move: function (x, y) { px = x; py = y; active = true; kick(); },
      leave: function () { active = false; kick(); }
    };
  };

  // services: an axonometric (30 degree) construction grid; lines thicken near the pointer
  FIELD.axo = function () {
    var el = doc.createElement('div');
    el.innerHTML = '<div class="fld-axo"></div><div class="fld-axo fld-axo--hot"></div>';
    return { el: el };
  };

  // before/after: drywall over studs at 16in centres; the pointer is a stud finder
  FIELD.studs = function () {
    var el = doc.createElement('div');
    el.innerHTML = '<div class="fld-wall"></div><div class="fld-studs"></div>';
    var over = false;
    return {
      el: el,
      move: function (x) {
        var o = ((x - 40) % 96 + 96) % 96, now = o < 14;
        if (now !== over) { over = now; if (EZ.buddy) EZ.buddy.led(now); }
      },
      leave: function () { over = false; if (EZ.buddy) EZ.buddy.led(false); }
    };
  };

  // process: snapped chalk lines that twang when the pointer crosses them
  FIELD.chalk = function () {
    var el = doc.createElement('div');
    var svg = doc.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'fld-svg');
    el.appendChild(svg);
    var lines = [], W = 0, ly = null;
    function build(w, h) {
      W = w; svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h); svg.innerHTML = ''; lines = [];
      [.12, .3, .48, .66, .84].forEach(function (fy, i) {
        var y = Math.round(h * fy), p = doc.createElementNS(NS, 'path');
        p.setAttribute('class', 'fld-chalk');
        svg.appendChild(p);
        var L = { y: y, p: p, o: { a: 0, x: w / 2 } };
        L.set = function () { p.setAttribute('d', 'M0 ' + y + 'Q' + f(L.o.x) + ' ' + f(y + L.o.a) + ' ' + w + ' ' + y); };
        L.set();
        lines.push(L);
      });
    }
    return {
      el: el,
      resize: build,
      move: function (x, y, P) {
        if (ly !== null) {
          lines.forEach(function (L) {
            if ((ly < L.y) !== (y < L.y)) {
              var a = EZ.clamp(P.vy * 3.2, -34, 34) || (y > ly ? 16 : -16);
              gsap.killTweensOf(L.o);
              L.o.x = x * 2 - W / 2;   // quadratic control so the peak sits under the pointer
              gsap.timeline().to(L.o, { a: a, duration: .08, ease: 'power2.out', onUpdate: L.set })
                .to(L.o, { a: 0, duration: 1.1, ease: 'elastic.out(1.1,.18)', onUpdate: L.set });
            }
          });
        }
        ly = y;
      },
      leave: function () { ly = null; }
    };
  };

  // financing: ledger graph paper; a plumb bob hangs from the top and swings to point at the pointer
  FIELD.plumb = function () {
    var el = doc.createElement('div');
    el.innerHTML = '<div class="fld-ledger"></div><svg class="fld-plumb" viewBox="-60 -10 120 300" width="120" height="300"><g class="fld-bobg"><path d="M0 0 V236" stroke="#C42B1C" stroke-width="1.2"/>' +
      '<path d="M0 232 l-9 8 l9 30 l9 -30 z" fill="' + STEEL + '" stroke="' + INK + '" stroke-width="1.4" stroke-linejoin="round"/><path d="M-9 240 H9" stroke="' + INK + '" stroke-width="1"/></g><circle r="4" fill="' + INK + '"/></svg>';
    var g = el.querySelector('.fld-bobg'), plumb = el.querySelector('.fld-plumb');
    var ang = 0, vel = 0, target = 0, raf = 0, ax = 0, ay = 0;
    function step() {
      raf = 0;
      vel = (vel + (target - ang) * .04) * .9;
      ang += vel;
      g.setAttribute('transform', 'rotate(' + f(ang) + ')');
      if (Math.abs(vel) > .01 || Math.abs(target - ang) > .05) raf = requestAnimationFrame(step);
    }
    function kick() { if (!raf) raf = requestAnimationFrame(step); }
    return {
      el: el,
      resize: function (w) { ax = w * .86; ay = 0; plumb.style.left = (ax - 60) + 'px'; },
      move: function (x, y) { target = EZ.clamp(-Math.atan2(x - ax, Math.max(40, y - ay)) * 180 / Math.PI, -38, 38); kick(); },
      leave: function () { target = 0; kick(); },
      nudge: function (v) { vel += v; kick(); }
    };
  };

  // work: registration marks that turn to face the pointer and drift with the scroll
  FIELD.marks = function () {
    var el = doc.createElement('div');
    var svg = doc.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'fld-svg');
    el.appendChild(svg);
    var marks = [], W, H;
    function build(w, h) {
      W = w; H = h; svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h); svg.innerHTML = ''; marks = [];
      var n = Math.max(6, Math.round(w * h / 90000));
      for (var i = 0; i < n; i++) {
        var x = (i * 0.618 % 1) * w, y = ((i * 0.381 + .17) % 1) * h;
        var g = doc.createElementNS(NS, 'g');
        g.setAttribute('class', 'fld-mark');
        g.innerHTML = '<circle r="9" fill="none"/><path d="M-15 0 H15 M0 -15 V15"/><path class="fld-mark-tip" d="M0 -15 l-3 5 h6 z"/>';
        svg.appendChild(g);
        marks.push({ g: g, x: x, y: y, a: 0, s: .4 + (i % 4) * .2 });
      }
      place(0);
    }
    var sp = 0;
    function place(px, py) {
      marks.forEach(function (m) {
        if (px != null && py != null) m.a = Math.atan2(py - m.y, px - m.x) * 180 / Math.PI + 90;
        m.g.setAttribute('transform', 'translate(' + f(m.x) + ' ' + f(m.y - sp * 60 * m.s) + ') rotate(' + f(m.a) + ')');
      });
    }
    return {
      el: el,
      resize: build,
      move: function (x, y) { place(x, y); },
      scroll: function (p) { sp = p; place(); }
    };
  };

  // reviews: plywood grain under a work-lamp halo
  FIELD.plywood = function () {
    var el = doc.createElement('div');
    el.innerHTML = '<div class="fld-wood"></div><div class="fld-halo"></div>';
    return { el: el };
  };

  // towns: a compass rose whose needle points at the pointer, and survey stakes with flagging tape
  FIELD.compass = function () {
    var el = doc.createElement('div');
    var ticks = '';
    for (var i = 0; i < 72; i++) ticks += '<path d="M0 -' + (i % 9 ? 116 : 108) + ' V-122" transform="rotate(' + i * 5 + ')"/>';
    el.innerHTML = '<svg class="fld-compass" viewBox="-130 -130 260 260" width="260" height="260"><circle r="122" class="fld-cr"/><circle r="96" class="fld-cr"/><g class="fld-ticks">' + ticks + '</g>' +
      '<path class="fld-rose" d="M0 -92 L10 -10 L92 0 L10 10 L0 92 L-10 10 L-92 0 L-10 -10 Z"/><text x="0" y="-100" text-anchor="middle" class="fld-n">N</text>' +
      '<g class="fld-needle"><path d="M0 -80 L7 0 L-7 0 Z" fill="#C42B1C"/><path d="M0 80 L7 0 L-7 0 Z" fill="' + STEEL + '"/><circle r="6" fill="' + INK + '" stroke="' + STEEL + '" stroke-width="2"/></g></svg>' +
      '<svg class="fld-svg fld-stakes" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">' +
      [[120, 460], [300, 120], [540, 520], [860, 380], [700, 90]].map(function (p) {
        return '<g transform="translate(' + p[0] + ' ' + p[1] + ')"><path d="M0 0 V-40" stroke="#FFC9A3" stroke-width="5"/><path d="M0 0 l-2.5 6 h5 z" fill="#FFC9A3"/><path d="M2 -38 q14 2 18 10 q-10 -3 -18 2" fill="#FF9C5E"/></g>';
      }).join('') + '</svg>';
    var needle = el.querySelector('.fld-needle'), comp = el.querySelector('.fld-compass'), a = 0, t = 0, raf = 0;
    function step() { raf = 0; a += (t - a) * .12; needle.setAttribute('transform', 'rotate(' + f(a) + ')'); if (Math.abs(t - a) > .1) raf = requestAnimationFrame(step); }
    return {
      el: el,
      move: function (x, y) {
        var r = comp.getBoundingClientRect(), sr = el.getBoundingClientRect();
        var cx = r.left - sr.left + r.width / 2, cy = r.top - sr.top + r.height / 2;
        var na = Math.atan2(y - cy, x - cx) * 180 / Math.PI + 90;
        while (na - a > 180) na -= 360;
        while (na - a < -180) na += 360;
        t = na;
        if (!raf) raf = requestAnimationFrame(step);
      }
    };
  };

  // consult: brick coursing; a laser level throws a red line across the section at the pointer's height
  FIELD.laser = function () {
    var el = doc.createElement('div');
    el.innerHTML = '<div class="fld-brick"></div><span class="fld-laser"></span><span class="fld-dot"></span>' +
      '<svg class="fld-emitter" viewBox="0 0 34 26" width="34" height="26"><rect x="1" y="3" width="26" height="20" rx="3" fill="' + YEL + '" stroke="' + INK + '" stroke-width="1.6"/><rect x="5" y="7" width="12" height="7" rx="1" fill="#5E5852"/><circle cx="29" cy="13" r="3" fill="#C42B1C"/></svg>';
    return { el: el };
  };

  // footer: rebar mat over the footing (static)
  FIELD.rebar = function () {
    var el = doc.createElement('div');
    el.innerHTML = '<div class="fld-rebar"></div>';
    return { el: el };
  };

  // [OWNER DESIGN NOTE] de-AI: no decorative pattern behind every section (contours, graph paper, studs, flags...): the grounds are flat.
  // The field drawings stay in this file, unmounted.
  var MAP = {};
  var fields = {};

  function mount(id, host) {
    var type = MAP[id];
    if (!type || !host) return;
    var fd = FIELD[type]();
    fd.el.className = 'fld fld--' + type;
    fd.el.setAttribute('aria-hidden', 'true');
    fd.host = host;
    host.classList.add('has-fld');
    host.insertBefore(fd.el, host.firstChild);
    fields[id] = fd;
    if (fd.resize) {
      var ro = new ResizeObserver(function () {
        var w = fd.el.clientWidth, h = fd.el.clientHeight;
        if (w && h && (w !== fd.w || Math.abs(h - (fd.h || 0)) > 40)) { fd.w = w; fd.h = h; fd.resize(w, h); }
      });
      ro.observe(fd.el);
    }
  }

  var activeId = null;
  function onPtr(type, P) {
    if (!EZ.fields.on) return;
    if (type === 'zone' || type === 'leave') {
      if (activeId && fields[activeId]) { fields[activeId].el.classList.remove('is-hot'); if (fields[activeId].leave) fields[activeId].leave(); }
      activeId = type === 'leave' ? null : P.zone;
      if (activeId && fields[activeId]) fields[activeId].el.classList.add('is-hot');
    }
    if ((type === 'move' || type === 'zone') && activeId && fields[activeId]) {
      var fd = fields[activeId], r = fd.el.getBoundingClientRect();
      var x = P.x - r.left, y = P.y - r.top;
      fd.el.style.setProperty('--mx', x.toFixed(0) + 'px');
      fd.el.style.setProperty('--my', y.toFixed(0) + 'px');
      if (fd.move) fd.move(x, y, P);
    }
  }

  var scrollTweens = [];
  EZ.fields = {
    on: false,
    refresh: function () {
      EZ.fields.on = live();
      doc.documentElement.classList.toggle('fld-live', EZ.fields.on);
      if (!EZ.fields.on && activeId && fields[activeId]) { fields[activeId].el.classList.remove('is-hot'); if (fields[activeId].leave) fields[activeId].leave(); activeId = null; }
      scrollTweens.splice(0).forEach(function (t) { t.scrollTrigger && t.scrollTrigger.kill(); t.kill(); });
      if (!EZ.motionOn()) return;
      Object.keys(fields).forEach(function (id) {
        var fd = fields[id];
        // scroll reaction for every pointer type (coarse pointers get this instead of the pointer) [BANK FH Potsdam 421]
        var o = { p: 0 };
        scrollTweens.push(gsap.to(o, { p: 1, ease: 'none', scrollTrigger: { trigger: fd.host, start: 'top bottom', end: 'bottom top', scrub: true },
          onUpdate: function () { fd.el.style.setProperty('--sp', o.p.toFixed(3)); if (fd.scroll) fd.scroll(o.p); } }));
      });
      var pf = fields.financing;
      if (pf && pf.nudge && !EZ.fine()) {
        scrollTweens.push(ScrollTrigger.create({ trigger: pf.host, start: 'top bottom', end: 'bottom top', onUpdate: function (s) { pf.nudge(EZ.clamp(s.getVelocity() / 900, -3, 3)); } }));
      }
    }
  };

  /* ---------- dividers: one industry drawing per boundary ---------- */
  var DIV = {};
  // 1 hero -> proof: a dimension line, measured in the visitor's own pixels
  DIV.dimension = function (w) {
    var m = Math.max(16, w * .04), y = 46;
    return { h: 80, svg: '<g class="dv-draw"><path class="dv-l dv-a" d="M' + (w / 2) + ' ' + y + 'H' + m + '"/><path class="dv-l dv-a" d="M' + (w / 2) + ' ' + y + 'H' + (w - m) + '"/></g>' +
      '<path class="dv-l" d="M' + m + ' ' + (y - 16) + 'V' + (y + 16) + 'M' + (w - m) + ' ' + (y - 16) + 'V' + (y + 16) + 'M' + (m - 6) + ' ' + (y + 6) + 'l12 -12M' + (w - m - 6) + ' ' + (y + 6) + 'l12 -12"/>' +
      '<rect class="dv-bg" x="' + (w / 2 - 70) + '" y="' + (y - 11) + '" width="140" height="22"/><text class="dv-t nums" x="' + (w / 2) + '" y="' + (y + 5) + '" text-anchor="middle">' + Math.round(w - 2 * m) + ' px</text>',
      anim: function (svg, st) {
        return gsap.timeline({ scrollTrigger: st }).fromTo(svg.querySelectorAll('.dv-a'), { drawSVG: '0%' }, { drawSVG: '100%', duration: 1, ease: 'power2.out' })
          .from(svg.querySelectorAll('.dv-t, .dv-bg'), { opacity: 0, duration: .4 }, .5);
      } };
  };
  // 2 proof -> services: a steel I-beam slides in on its bolts
  DIV.beam = function (w) {
    var bolts = '';
    for (var x = 60; x < w - 20; x += 120) bolts += '<circle class="dv-bolt" cx="' + x + '" cy="40" r="3.6"/><circle class="dv-bolt" cx="' + (x + 18) + '" cy="40" r="3.6"/>';
    return { h: 80, svg: '<g class="dv-beam"><rect class="dv-steel" x="0" y="18" width="' + w + '" height="7"/><rect class="dv-steel dv-web" x="0" y="25" width="' + w + '" height="30"/><rect class="dv-steel" x="0" y="55" width="' + w + '" height="7"/>' + bolts + '</g>',
      anim: function (svg, st) {
        return gsap.timeline({ scrollTrigger: st }).fromTo(svg.querySelector('.dv-beam'), { x: -w * .35 }, { x: 0, duration: .9, ease: 'expo.out' })
          .from(svg.querySelectorAll('.dv-bolt'), { scale: 0.4, opacity: 0, transformOrigin: '50% 50%', duration: .3, stagger: .015, ease: 'back.out(3)' }, .5);
      } };
  };
  // 3 services -> before/after: barrier tape sags, then pulls taut (stripes only: no lettering bent round a curve)
  DIV.tape = function (w) {
    var d = function (sag) { return 'M-20 30 Q' + f(w / 2) + ' ' + f(30 + sag) + ' ' + (w + 20) + ' 30'; };
    return { h: 96, svg: '<path class="dv-tapeband" d="' + d(50) + '"/><path class="dv-tapestripe" d="' + d(50) + '"/>',
      anim: function (svg, st) {
        var ps = svg.querySelectorAll('path'), o = { s: 50 };
        st.scrub = .8; st.start = 'top 95%'; st.end = 'bottom 40%';
        return gsap.to(o, { s: 6, ease: 'none', scrollTrigger: st, onUpdate: function () { var v = d(o.s); ps[0].setAttribute('d', v); ps[1].setAttribute('d', v); } });
      } };
  };
  // 4 before/after -> process: an electrical conduit run; junction boxes set, the pipe runs between them, straps snap on
  DIV.conduit = function (w) {
    var boxes = '', straps = '', y = 46, step = Math.max(220, w / 5);
    for (var x = 40; x < w - 20; x += step) boxes += '<g class="dv-jb"><rect x="' + f(x - 15) + '" y="' + (y - 15) + '" width="30" height="30" rx="3"/><circle cx="' + f(x) + '" cy="' + y + '" r="5"/></g>';
    for (var x2 = 40 + step / 2; x2 < w; x2 += step / 2) if (Math.abs(((x2 - 40) % step)) > 1) straps += '<path class="dv-strap" d="M' + f(x2 - 9) + ' ' + (y + 9) + 'V' + (y - 9) + 'H' + f(x2 + 9) + 'V' + (y + 9) + '"/>';
    return { h: 92, svg: '<path class="dv-pipe" d="M0 ' + y + 'H' + w + '"/>' + boxes + straps,
      anim: function (svg, st) {
        return gsap.timeline({ scrollTrigger: st })
          .from(svg.querySelectorAll('.dv-jb'), { scale: .4, opacity: 0, transformOrigin: '50% 50%', duration: .25, stagger: .05, ease: 'back.out(2.4)' })
          .fromTo(svg.querySelector('.dv-pipe'), { drawSVG: '0%' }, { drawSVG: '100%', duration: .5, ease: 'power2.inOut' }, .15)
          .from(svg.querySelectorAll('.dv-strap'), { y: -12, opacity: 0, duration: .2, stagger: .03, ease: 'back.out(3)' }, .45);
      } };
  };
  // 5 process -> financing: a handsaw blade grows its teeth and cuts across
  DIV.saw = function (w) {
    function teeth(a) { var s = 'M0 30H' + w + 'V44'; for (var x = w; x > 0; x -= 14) s += 'L' + f(x - 7) + ' ' + f(44 + a) + 'L' + f(x - 14) + ' 44'; return s + 'Z'; }
    return { h: 80, svg: '<path class="dv-kerf" d="M0 66H' + w + '"/><path class="dv-blade" d="' + teeth(0) + '"/>',
      anim: function (svg, st) {
        var b = svg.querySelector('.dv-blade'), o = { a: 0 };
        st.scrub = 1; st.start = 'top 95%'; st.end = 'bottom 45%';
        return gsap.timeline({ scrollTrigger: st })
          .to(o, { a: 12, ease: 'none', onUpdate: function () { b.setAttribute('d', teeth(o.a)); } }, 0)
          .fromTo(b, { x: -60 }, { x: 0, ease: 'none' }, 0)
          .fromTo(svg.querySelector('.dv-kerf'), { drawSVG: '0%' }, { drawSVG: '100%', ease: 'none' }, 0);
      } };
  };
  // 6 financing -> work: a roof truss rises from flat to pitched (morph separator)
  DIV.truss = function (w) {
    var mid = w / 2;
    function roof(a) { return 'M0 84L' + f(mid) + ' ' + f(84 - a) + 'L' + w + ' 84Z'; }
    return { h: 96, svg: '<path class="dv-roof" d="' + roof(0) + '"/><path class="dv-webs" d=""/>',
      anim: function (svg, st) {
        var r = svg.querySelector('.dv-roof'), wb = svg.querySelector('.dv-webs'), o = { a: 0 };
        function set() {
          r.setAttribute('d', roof(o.a));
          var s = '';
          for (var i = 1; i < 6; i++) { var x = w * i / 6, top = 84 - o.a * (1 - Math.abs(x - mid) / mid); s += 'M' + f(x) + ' 84V' + f(top); if (i !== 3) s += 'M' + f(x) + ' 84L' + f(x < mid ? x + w / 6 : x - w / 6) + ' ' + f(84 - o.a * (1 - Math.abs((x < mid ? x + w / 6 : x - w / 6) - mid) / mid)); }
          wb.setAttribute('d', s);
        }
        set();
        st.scrub = 1; st.start = 'top 95%'; st.end = 'bottom 50%';
        return gsap.to(o, { a: 70, ease: 'none', scrollTrigger: st, onUpdate: set });
      } };
  };
  // 7 work -> reviews: a tile course is set, each tile tipping down onto the bed in turn, then the grout lines are struck
  DIV.tile = function (w) {
    var t = '', g = '';
    for (var x = 0; x < w; x += 52) { t += '<rect class="dv-tile" x="' + (x + 2) + '" y="30" width="48" height="36"/>'; g += 'M' + (x + 1) + ' 30V66'; }
    return { h: 92, svg: '<path class="dv-l" d="M0 70H' + w + '"/>' + t + '<path class="dv-grout" d="' + g + 'M0 30H' + w + 'M0 66H' + w + '"/>',
      anim: function (svg, st) {
        return gsap.timeline({ scrollTrigger: st })
          .from(svg.querySelectorAll('.dv-tile'), { scaleY: 0, opacity: 0, transformOrigin: '50% 100%', duration: .2, stagger: { each: .02, from: 'start' }, ease: 'back.out(2)' })
          .fromTo(svg.querySelector('.dv-grout'), { drawSVG: '0%' }, { drawSVG: '100%', duration: .4, ease: 'power2.out' }, '-=.1');
      } };
  };
  // 8 reviews -> towns: a course of roof shingles slides in from the eave, each tab lapping the one before (scrubbed)
  DIV.shingle = function (w) {
    var t = '', n = Math.ceil(w / 46) + 1;
    for (var i = 0; i < n; i++) t += '<path class="dv-sh" d="M' + (i * 46) + ' 26h44v34l-22 8l-22 -8z"/>';
    return { h: 84, svg: '<path class="dv-l" d="M0 26H' + w + '"/><g class="dv-shs">' + t + '</g>',
      anim: function (svg, st) {
        var sh = svg.querySelectorAll('.dv-sh');
        st.scrub = .8; st.start = 'top 95%'; st.end = 'bottom 45%';
        return gsap.timeline({ scrollTrigger: st }).fromTo(sh, { x: function (i) { return 60 + i * 6; }, opacity: 0 }, { x: 0, opacity: 1, ease: 'none', stagger: .02 });
      } };
  };
  // 9 towns -> consult: a brick course laid brick by brick
  DIV.brick = function (w) {
    var b = '';
    for (var r = 0; r < 2; r++) for (var x = r ? -30 : 0; x < w; x += 62) b += '<rect class="dv-brick" x="' + x + '" y="' + (20 + r * 26) + '" width="58" height="22"/>';
    return { h: 80, svg: b,
      anim: function (svg, st) {
        return gsap.timeline({ scrollTrigger: st }).from(svg.querySelectorAll('.dv-brick'), { y: -18, opacity: 0, duration: .35, ease: 'power3.out', stagger: { each: .012, from: 'start' } });
      } };
  };
  // 10 consult -> footer: a footing with rebar on its grade line
  DIV.footing = function (w) {
    var dots = '', hatch = '';
    for (var x = 30; x < w; x += 46) dots += '<circle class="dv-rebar" cx="' + x + '" cy="56" r="4"/>';
    for (var x2 = 0; x2 < w; x2 += 16) hatch += 'M' + x2 + ' 30l-10 10';
    return { h: 88, svg: '<path class="dv-l" d="M0 30H' + w + '"/><path class="dv-hatch" d="' + hatch + '"/><rect class="dv-footing" x="0" y="40" width="' + w + '" height="34"/><path class="dv-bar" d="M0 46H' + w + 'M0 66H' + w + '"/>' + dots,
      anim: function (svg, st) {
        return gsap.timeline({ scrollTrigger: st }).fromTo(svg.querySelector('.dv-footing'), { scaleY: 0 }, { scaleY: 1, transformOrigin: '50% 0%', duration: .6, ease: 'expo.out' })
          .fromTo(svg.querySelector('.dv-bar'), { drawSVG: '0%' }, { drawSVG: '100%', duration: .8, ease: 'power2.inOut' }, .2)
          .from(svg.querySelectorAll('.dv-rebar'), { scale: .3, opacity: 0, transformOrigin: '50% 50%', duration: .25, stagger: .01, ease: 'back.out(3)' }, .5);
      } };
  };

  // [OWNER DESIGN NOTE + AUDIT-01 C.9] one divider weight, present in the static first frame: a CSS hairline between sections.
  // The ten themed animated bands (hazard tape and brick among them) are retired; their drawings stay in this file, unmounted.
  var ORDER = [];
  var dividers = [];

  function drawDivider(d) {
    var w = d.el.clientWidth;
    if (!w || w === d.w) return;
    d.w = w;
    if (d.tl) { if (d.tl.scrollTrigger) d.tl.scrollTrigger.kill(); if (d.tl._st) d.tl._st.kill(); d.tl.kill(); d.tl = null; }
    var spec = DIV[d.type](w);
    d.el.style.height = spec.h + 'px';
    d.el.innerHTML = '<svg viewBox="0 0 ' + w + ' ' + spec.h + '" width="' + w + '" height="' + spec.h + '">' + spec.svg + '</svg>';
    if (EZ.motionOn() && spec.anim) d.tl = spec.anim(d.el.firstChild, { trigger: d.el, start: 'top 88%', toggleActions: 'play none none reverse' });
  }

  EZ.dividers = {
    init: function () {
      ORDER.forEach(function (o) {
        var sec = doc.getElementById(o[0]);
        if (!sec) return;
        var el = doc.createElement('div');
        el.className = 'dv dv--' + o[1];
        el.setAttribute('aria-hidden', 'true');
        sec.parentNode.insertBefore(el, sec.nextSibling);
        var d = { el: el, type: o[1], w: 0 };
        dividers.push(d);
        new ResizeObserver(function () { drawDivider(d); }).observe(el);
      });
    },
    refresh: function () { dividers.forEach(function (d) { d.w = 0; drawDivider(d); }); }
  };

  /* ---------- boot hook called by core ---------- */
  EZ.systemsBoot = function () {
    doc.querySelectorAll('[data-section]').forEach(function (s) { mount(s.dataset.section, s); });
    mount('footer', doc.querySelector('.foot'));
    EZ.ptr.on(onPtr);
    EZ.dividers.init();
    EZ.fields.refresh();
    if (EZ.buddy) EZ.buddy.init();
    if (EZ.bindChromeReactions) EZ.bindChromeReactions();
  };
})();
