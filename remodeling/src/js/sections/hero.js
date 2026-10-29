/* hero, PLAN-V3 §3. v1 rebuilt (Specia1ne slit + Smeulders ladder + Stroke Text), v2 kept and augmented,
   v3 rebuilt (SENVA wordmark-as-hero + Depth Text on a drawn scaffold). */
(function () {
  var html = document.documentElement;
  var NS = 'http://www.w3.org/2000/svg';
  function navOn(k, where) {
    html.dataset.navOn = where;
    k.add(function () { delete html.dataset.navOn; });
  }
  function wrapRise(lines) {
    return Array.prototype.map.call(lines, function (ln) {
      var r = ln.querySelector('.rise');
      if (!r) { ln.innerHTML = '<span class="rise">' + ln.innerHTML + '</span>'; r = ln.querySelector('.rise'); }
      return r;
    });
  }
  function fontsReady() {
    return document.fonts && document.fonts.load ? document.fonts.load('100px "Bebas Neue"').catch(function () {}) : Promise.resolve();
  }

  /* Stroke Text [BANK 167]: per-letter outlines (dash = fontSize x 7) draw, then each line wipes to solid */
  function buildStroke(svg, lines) {
    svg.innerHTML = '';
    var FS = 100, LH = 92, widths = [], out = [];
    lines.forEach(function (txt, li) {
      var t = document.createElementNS(NS, 'text');
      t.setAttribute('x', 0); t.setAttribute('y', FS * .82 + li * LH);
      t.textContent = txt;
      svg.appendChild(t);
      var n = txt.length, chars = [];
      try {
        for (var i = 0; i < n; i++) { if (txt[i] !== ' ') chars.push([txt[i], t.getStartPositionOfChar(i).x]); }
        widths.push(t.getComputedTextLength());
      } catch (e) { widths.push(0); }
      out.push({ y: FS * .82 + li * LH, chars: chars, whole: txt });
      svg.removeChild(t);
    });
    var W = Math.max.apply(null, widths) + 4, H = LH * (lines.length - 1) + FS * 1.02;
    if (!(W > 10)) return null;
    svg.setAttribute('viewBox', '-2 0 ' + W + ' ' + H);
    var defs = '<defs>', body = '';
    out.forEach(function (L, li) {
      defs += '<clipPath id="h1wipe' + li + '"><rect class="wipe" x="-4" y="' + (L.y - FS) + '" width="' + (W + 8) + '" height="' + (FS * 1.3) + '"/></clipPath>';
      L.chars.forEach(function (c) { body += '<text class="o" x="' + c[1].toFixed(1) + '" y="' + L.y + '">' + (c[0] === '&' ? '&amp;' : c[0]) + '</text>'; });
      body += '<text class="f" clip-path="url(#h1wipe' + li + ')" x="0" y="' + L.y + '">' + L.whole + '</text>';
    });
    svg.innerHTML = defs + '</defs>' + body;
    return { outlines: svg.querySelectorAll('.o'), wipes: svg.querySelectorAll('.wipe'), fills: svg.querySelectorAll('.f'), W: W };
  }

  EZ.section('hero', {
    /* v1 · As built, as drawn */
    1: { init: function (root, k) {
      navOn(k, 'photo');
      var alive = true;
      k.add(function () { alive = false; });
      var frame = root.querySelector('.hero1__frame');
      var plate = root.querySelector('.hero1__plate');
      var bp = root.querySelector('.hero1__bp');
      var linesEl = root.querySelector('.hero1__lines');
      var strokeSvg = root.querySelector('.hero1__stroke');
      var lead = root.querySelector('.hero1__lead');
      var acts = root.querySelector('.hero__acts').children;
      var block = root.querySelector('.hero1__block');
      linesEl.innerHTML = EZ.drawing('k-fluted-hero', { par: 'none' });
      var lines = linesEl.querySelectorAll('line');
      var opt = { ar: 1.6, x: function () { return EZ.mobile() ? .6 : .5; }, y: .5 };
      EZ.cover(k, frame, plate, opt); EZ.cover(k, frame, bp, opt); EZ.cover(k, frame, linesEl, opt);

      // the slit: follows the pointer (lerp .12), settles at rest after 680ms still [BANK Specia1ne]
      var bx = null, tx = null, last = -1e9, dragging = false, sweeping = false;
      function rest() { return frame.clientWidth * (EZ.mobile() ? .5 : .62); }
      function setBx(v) { root.style.setProperty('--bx', v.toFixed(1) + 'px'); }
      k.add(function () { root.style.removeProperty('--bx'); root.style.removeProperty('--bwk'); });
      bx = rest(); setBx(bx);
      k.ro(frame, function () { if (!loop) { bx = rest(); setBx(bx); } });
      var loop = null;
      if (k.motion) {
        loop = k.raf(function (dt, now) {
          if (sweeping) return;
          var idle = performance.now() - last > 680 && !dragging;
          var target = idle || tx == null ? rest() : tx;
          bx += (target - bx) * (1 - Math.pow(1 - .12, dt * 60));
          setBx(bx);
          if (idle && Math.abs(target - bx) < .3) { bx = target; setBx(bx); return false; }
        });
        function aim(e) {
          var r = frame.getBoundingClientRect();
          tx = EZ.clamp(e.clientX - r.left, 0, r.width);
          last = performance.now();
          loop.start();
        }
        k.on(frame, 'pointermove', function (e) { if (e.pointerType === 'mouse' || dragging) aim(e); });
        k.on(frame, 'pointerdown', function (e) { if (e.pointerType !== 'mouse') { dragging = true; aim(e); } });
        k.on(window, 'pointerup', function () { if (dragging) { dragging = false; last = performance.now(); loop.start(); } });
        k.on(window, 'pointercancel', function () { dragging = false; });
        k.io(frame, function (en) { if (en.isIntersecting) loop.start(); else loop.stop(); });
      }

      fontsReady().then(function () {
        if (!alive) return;
        var st = buildStroke(strokeSvg, ['Built properly.', 'Permitted correctly.']);
        if (!st) { root.classList.add('no-svgtext'); return; }
        if (!k.motion) return;
        k.ctx.add(function () {
          var tl = gsap.timeline({ delay: .15 });
          // Smeulders ladder: visual, words, subtitle, CTA [BANK Smeulders]
          tl.fromTo(plate, { scale: 1.06 }, { scale: 1, duration: 1.4, ease: 'expo.out' }, 0)
            .fromTo(root, { '--bwk': 0 }, { '--bwk': 1, duration: .35, ease: EZ.bezier(.2, .7, .2, 1) }, .5)
            .fromTo(lines, { drawSVG: '0%' }, { drawSVG: '100%', duration: .9, ease: 'power2.out', stagger: { each: .008, from: 'random' } }, .55)
            .fromTo(st.outlines, { strokeDasharray: 700, strokeDashoffset: 700 }, { strokeDashoffset: 0, duration: 1.2, ease: 'power2.out', stagger: .02 }, 0)
            .fromTo(st.wipes, { scaleX: 0, transformOrigin: '0% 50%' }, { scaleX: 1, duration: .7, ease: 'power2.inOut', stagger: .12 }, 1.0)
            .to(st.outlines, { opacity: 0, duration: .3 }, 1.7)
            .from(lead, { y: 24, autoAlpha: 0, duration: .7, ease: 'power3.out' }, .55)
            .from(block, { y: 32, scale: .96, autoAlpha: 0, duration: .85, ease: 'power3.out', transformOrigin: '50% 100%' }, .7)
            .from(acts[0], { y: 64, autoAlpha: 0, duration: .85, ease: 'power3.out' }, .85)
            .from(acts[1], { y: 64, autoAlpha: 0, duration: .85, ease: 'power3.out' }, 1.0);
          if (k.mobile) {
            // phones: the slit sweeps across once so the drawing is discovered, then rests; drag moves it
            var o = { v: frame.clientWidth * .08 };
            sweeping = true; bx = o.v; setBx(bx);
            tl.to(o, { v: rest(), duration: 1.6, ease: 'power2.inOut',
              onUpdate: function () { if (dragging) { sweeping = false; return; } if (sweeping) { bx = o.v; setBx(bx); } },
              onComplete: function () { sweeping = false; } }, .6);
          }
        });
      });
    } },

    /* v2 · From the brass to the room (owner keeper): composition unchanged */
    2: { init: function (root, k) {
      navOn(k, 'ground');
      var stage = root.querySelector('.hero2__stage');
      var band = root.querySelector('.hero2__band');
      var win = root.querySelector('.hero2__window');
      var plate = root.querySelector('.hero2__plate');
      var h1 = root.querySelector('.hero2__h');
      var AR = 2400 / 1601, HX = .645, HY = .34;
      var Z = 2.4;
      var start = [22, 18, 22, 47];

      function marks(r) {
        band.style.setProperty('--ct', (start[0] * (1 - r)).toFixed(2) + '%');
        band.style.setProperty('--cr', (start[1] * (1 - r)).toFixed(2) + '%');
        band.style.setProperty('--cb', (start[2] * (1 - r)).toFixed(2) + '%');
        band.style.setProperty('--cl', (start[3] * (1 - r)).toFixed(2) + '%');
      }
      function fit() {
        var bw = band.clientWidth, bh = band.clientHeight;
        if (!bw || !bh) return;
        var w = Math.max(bw, bh * AR), h = w / AR;
        var left = (bw - w) / 2;
        var top = EZ.clamp(bh / 2 - h * HY, bh - h, 0);
        plate.style.cssText = 'width:' + w + 'px;height:' + h + 'px;left:' + left + 'px;top:' + top + 'px;right:auto;bottom:auto';
        var hx = (left + w * HX) / bw * 100, hy = (top + h * HY) / bh * 100;
        var ww = EZ.mobile() ? 62 : 58, wh = EZ.mobile() ? 50 : 78;
        var l = EZ.clamp(hx - ww / 2, 0, 100 - ww), t = EZ.clamp(hy - wh / 2, 0, 100 - wh);
        start = [t, 100 - l - ww, 100 - t - wh, l];
        plate.style.transformOrigin = (HX * 100) + '% ' + (HY * 100) + '%';
      }
      k.ro(band, fit);
      fit();
      marks(0);
      k.add(function () { plate.style.cssText = ''; ['--ct', '--cr', '--cb', '--cl'].forEach(function (v) { band.style.removeProperty(v); }); });

      if (!k.motion) { root.classList.add('is-static'); marks(1); k.add(function () { root.classList.remove('is-static'); }); return; }

      var lines = wrapRise(h1.querySelectorAll('.ln'));
      h1.querySelectorAll('.ln').forEach(function (l) { l.style.overflow = 'clip'; l.style.paddingBottom = '.12em'; l.style.marginBottom = '-.12em'; });
      var row = root.querySelector('.hero2__row');

      if (k.mobile) {
        gsap.timeline({ delay: .05 })
          .fromTo(plate, { scale: 1.8 }, { scale: 1, duration: 1.2, ease: 'expo.out' }, 0)
          .add(EZ.clip(k, win, start, [0, 0, 0, 0], { duration: 1.2, ease: 'expo.out', onUpdate: function () { marks(this.ratio); } }), 0)
          .fromTo(stage, { '--p': 0 }, { '--p': 1, duration: 1.2, ease: 'expo.out' }, .1)
          .from(lines, { yPercent: 105, duration: .8, ease: 'expo.out', stagger: .09 }, .05)
          .from(row, { autoAlpha: 0, y: 14, duration: .7, ease: 'expo.out' }, .35);
        return;
      }

      gsap.timeline({ delay: .05 })
        .add(EZ.clip(k, band, [0, 0, 100, 0], [0, 0, 0, 0], { duration: 1, ease: 'power4.inOut', onComplete: function () { band.style.clipPath = ''; } }), 0)
        .from(lines, { yPercent: 105, duration: .8, ease: 'expo.out', stagger: .09 }, .1)
        .from(row, { autoAlpha: 0, y: 14, duration: .7, ease: 'expo.out' }, .35);

      // pinned zoom-out, 140vh, scrub 1.1, linear [BANK S54 / Q154]; the outline headline fills on the same progress
      gsap.timeline({
        scrollTrigger: { trigger: stage, start: 'top top', end: '+=140%', pin: true, scrub: 1.1, invalidateOnRefresh: true },
        onUpdate: function () { marks(this.progress()); }
      })
        .fromTo(plate, { scale: Z }, { scale: 1, ease: 'none' }, 0)
        .add(EZ.clip(k, win, function () { return start; }, [0, 0, 0, 0], { ease: 'none' }), 0)
        .fromTo(stage, { '--p': 0 }, { '--p': 1, ease: 'none' }, 0);
    } },

    /* v3 · Steel letters on the scaffold */
    3: { init: function (root, k) {
      navOn(k, 'ground');
      var svg = root.querySelector('.hero3__scaffold');
      var bay = root.querySelector('.hero3__bay');
      var board = root.querySelector('.hero3__board');
      var depths = root.querySelectorAll('.hero3__depth');
      var faces = root.querySelectorAll('.hero3__face');
      var h1 = root.querySelector('.hero3__h');

      // the scaffold: 4 standards, 4 lifts, braces, couplers, boards [drawn for this firm]
      var SX = [40, 220, 400, 580], LY = [612, 420, 240, 64];
      var s = '';
      SX.forEach(function (x) { s += '<rect class="plate-b" x="' + (x - 16) + '" y="618" width="32" height="10"/>'; });
      SX.forEach(function (x) { s += '<path class="tube std" d="M' + x + ' 618V36"/>'; });
      LY.forEach(function (y) { s += '<path class="tube led" d="M18 ' + y + 'H602"/>'; });
      s += '<path class="brace" d="M40 612L220 420M400 420L580 240M40 240L220 64"/>';
      [420, 240].forEach(function (y) { s += '<rect class="board" x="26" y="' + (y - 18) + '" width="568" height="12"/><rect class="toe" x="26" y="' + (y - 30) + '" width="568" height="5" opacity=".9"/>'; });
      SX.forEach(function (x) { LY.forEach(function (y) { s += '<circle class="cpl" cx="' + x + '" cy="' + y + '" r="8"/>'; }); });
      svg.innerHTML = s;
      // the photo fills bay 2 between lifts 2 and 3 exactly
      bay.style.left = (227 / 600 * 100) + '%'; bay.style.width = ((393 - 227) / 600 * 100) + '%';
      bay.style.top = (247 / 640 * 100) + '%'; bay.style.height = ((400 - 247) / 640 * 100) + '%';
      k.add(function () { bay.style.cssText = ''; depths.forEach(function (d) { d.style.textShadow = ''; }); });

      // Depth Text [BANK 165]: 34 layers; the extrusion swings away from the pointer, the face never rotates
      var N = 34, ang = 52, tang = 52, layers = N, C0, C1;
      function palette() {
        var cs = getComputedStyle(root);
        C0 = cs.getPropertyValue('--d0').split(',').map(Number);
        C1 = cs.getPropertyValue('--d1').split(',').map(Number);
        if (C0.length < 3 || isNaN(C0[0])) { C0 = [30, 74, 78]; C1 = [8, 22, 24]; }
      }
      palette();
      var mo = new MutationObserver(function () { palette(); paint(); });
      mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
      k.add(function () { mo.disconnect(); });
      function paint() {
        var fs = parseFloat(getComputedStyle(h1).fontSize) || 96, step = fs * .0115;
        var dx = Math.cos(ang * Math.PI / 180) * step, dy = Math.sin(ang * Math.PI / 180) * step, sh = [];
        var n = Math.round(layers);
        for (var i = 1; i <= n; i++) {
          var t = i / N, c = 'rgb(' + Math.round(C0[0] + (C1[0] - C0[0]) * t) + ',' + Math.round(C0[1] + (C1[1] - C0[1]) * t) + ',' + Math.round(C0[2] + (C1[2] - C0[2]) * t) + ')';
          sh.push((dx * i).toFixed(2) + 'px ' + (dy * i).toFixed(2) + 'px 0 ' + c);
        }
        var v = sh.join(',') || 'none';
        depths.forEach(function (d) { d.style.textShadow = v; });
      }
      paint();
      k.ro(h1, paint);
      if (!k.motion) return;

      var o = { n: 0 };
      layers = 0; paint();
      var tl = gsap.timeline({ delay: .1 });
      tl.from(faces, { yPercent: 40, autoAlpha: 0, duration: .8, ease: 'power3.out', stagger: .1 }, 0)
        .to(o, { n: N, duration: .9, ease: 'power2.out', onUpdate: function () { layers = o.n; paint(); } }, .35)
        .from(root.querySelector('.hero3__lead'), { y: 24, autoAlpha: 0, duration: .7, ease: 'power3.out' }, .5)
        .from(root.querySelector('.hero__acts').children, { y: 24, autoAlpha: 0, duration: .7, ease: 'power3.out', stagger: .12 }, .65)
        .fromTo(svg.querySelectorAll('.std'), { drawSVG: '0%' }, { drawSVG: '100%', duration: .6, ease: 'power2.out', stagger: .08 }, .2)
        .fromTo(svg.querySelectorAll('.led'), { drawSVG: '0%' }, { drawSVG: '100%', duration: .5, ease: 'power2.out', stagger: .06 }, .5)
        .fromTo(svg.querySelectorAll('.brace'), { drawSVG: '0%' }, { drawSVG: '100%', duration: .4, ease: 'power2.out' }, .8)
        .from(svg.querySelectorAll('.cpl'), { scale: .3, autoAlpha: 0, transformOrigin: '50% 50%', duration: .3, ease: 'back.out(3)', stagger: .015 }, .85)
        .from(svg.querySelectorAll('.board, .toe'), { scaleX: 0, transformOrigin: '0% 50%', duration: .5, ease: 'power3.out', stagger: .06 }, .95)
        .add(EZ.clip(k, bay, [100, 0, 0, 0], [0, 0, 0, 0], { duration: .8, ease: 'expo.out', onComplete: function () { bay.style.clipPath = ''; } }), 1.05)
        .from(board, { y: -60, autoAlpha: 0, duration: .8, ease: 'bounce.out' }, 1.2);

      if (k.fine) {
        var raf = k.raf(function () {
          ang += (tang - ang) * .14;          // smoothing .14 [BANK 165]
          paint();
          if (Math.abs(tang - ang) < .2) return false;
        });
        // the extrusion always falls below the letters (a sign has depth, not a smear); the pointer swings its vanishing side
        k.on(root, 'pointermove', function (e) {
          var r = h1.getBoundingClientRect();
          tang = 90 + EZ.clamp((r.left + r.width / 2 - e.clientX) / (innerWidth / 2), -1, 1) * 58;
          raf.start();
        });
        k.on(root, 'pointerleave', function () { tang = 52; raf.start(); });
      }
    } }
  });
})();
