/* hero [PLAN 6.1]. Settles by 1.2s with <=4 animated groups, no preloader [S0095 §5]. */
(function () {
  var html = document.documentElement;
  function navOn(k, where) {
    html.dataset.navOn = where;
    k.add(function () { delete html.dataset.navOn; });
  }
  // mask-rise each display line: yPercent 105 -> 0, expo.out .8s, line stagger .09 [S1321, PLAN 6.1 v1]
  function wrapRise(lines) {
    return Array.prototype.map.call(lines, function (ln) {
      var r = ln.querySelector('.rise');
      if (!r) { ln.innerHTML = '<span class="rise">' + ln.innerHTML + '</span>'; r = ln.querySelector('.rise'); }
      return r;
    });
  }
  // distance from point to segment, for the drawing that brightens under the pointer
  function segDist(px, py, l) {
    var x1 = l[0], y1 = l[1], dx = l[2] - x1, dy = l[3] - y1;
    var t = ((px - x1) * dx + (py - y1) * dy) / (dx * dx + dy * dy || 1);
    t = t < 0 ? 0 : t > 1 ? 1 : t;
    var ex = x1 + t * dx - px, ey = y1 + t * dy - py;
    return Math.sqrt(ex * ex + ey * ey);
  }

  EZ.section('hero', {
    /* v1 · Drawn, then delivered */
    1: { init: function (root, k) {
      navOn(k, 'photo');
      var frame = root.querySelector('.hero1__frame');
      var plate = root.querySelector('.hero1__plate');
      var linesEl = root.querySelector('.hero1__lines');
      var copy = root.querySelector('.hero1__copy');
      var data = EZ.lines('k-navy-shaker');
      linesEl.innerHTML = EZ.drawing('k-navy-shaker', { par: 'none' });
      var svg = linesEl.querySelector('svg');
      var lines = svg ? Array.prototype.slice.call(svg.querySelectorAll('line')) : [];
      var ar = data.w / data.h;
      var parallax = k.motion && k.fine && !k.mobile;
      var opt = { ar: ar, x: function () { return EZ.mobile() ? .62 : .5; }, y: .5, scale: parallax ? 1.08 : 1 };
      EZ.cover(k, frame, plate, opt);
      EZ.cover(k, frame, linesEl, opt);

      var st = { base: 1 };               // stroke opacity the drawing rests at once the photo is in
      var px = -1e5, py = -1e5;           // pointer in drawing units
      var REST = .42;

      function paintLines() {
        if (!lines.length) return;
        var r = svg.getBoundingClientRect();
        var unit = data.w / (r.width || 1), reach = 160 * unit;
        for (var i = 0; i < lines.length; i++) {
          var f = 0;
          if (px > -1e4) {
            var d = segDist(px, py, data.lines[i]);
            f = d < reach ? 1 - d / reach : 0;
            f = f * f * (3 - 2 * f);
          }
          lines[i].style.strokeOpacity = (st.base + (1 - st.base) * f).toFixed(3);
        }
      }

      if (!k.motion) {
        st.base = REST; paintLines();
        return;
      }

      // intro: strokes draw (structure first: data is longest-first), the photograph develops under them
      var rises = wrapRise(root.querySelectorAll('.hero1__h > span'));
      var side = root.querySelector('.hero1__side');
      var tl = gsap.timeline({ delay: .05 });
      tl.from(lines, { drawSVG: '0% 0%', duration: .55, stagger: .006, ease: 'power2.out' }, 0)
        .add(EZ.clip(k, plate, [0, 0, 100, 0], [0, 0, 0, 0], { duration: 1, ease: 'power4.inOut' }), .2)
        .to(st, { base: REST, duration: .5, ease: 'power2.out', onUpdate: paintLines }, .75)
        .from(rises, { yPercent: 105, duration: .8, ease: 'expo.out', stagger: .09 }, .1)
        .from(side, { autoAlpha: 0, y: 16, duration: .7, ease: 'expo.out' }, .35);
      if (!k.fine) tl.eventCallback('onUpdate', paintLines);

      // scroll depth: photo, drawing and copy leave at different rates (<8% travel) [S0095 §5, S0652 §6]
      if (!k.mobile) {
        gsap.timeline({ scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: .8 } })
          .to(plate, { yPercent: 6, ease: 'none' }, 0)
          .to(linesEl, { yPercent: 3, ease: 'none' }, 0)
          .to(copy, { y: -28, ease: 'none' }, 0);
      }

      if (!parallax) return;
      // pointer depth: photo x12, drawing x20, copy -0.5 [S0634 parallax-mouse, S1321 mouse layers]
      var tx = 0, ty = 0, cx = 0, cy = 0, inView = true, moved = false;
      k.io(root, function (e) { inView = e.isIntersecting; if (inView) loop.start(); });
      k.on(window, 'pointermove', function (e) {
        if (e.pointerType !== 'mouse') return;
        tx = (e.clientX / innerWidth) * 2 - 1;
        ty = (e.clientY / innerHeight) * 2 - 1;
        var r = svg.getBoundingClientRect();
        px = (e.clientX - r.left) / r.width * data.w;
        py = (e.clientY - r.top) / r.height * data.h;
        moved = true;
        loop.start();
      }, { passive: true });
      k.on(document, 'pointerleave', function () { px = py = -1e5; moved = true; loop.start(); });
      var loop = k.raf(function (dt) {
        if (!inView) return false;
        cx = EZ.damp(cx, tx, 2.4, dt); cy = EZ.damp(cy, ty, 2.4, dt);
        plate.style.translate = (-cx * 12).toFixed(2) + 'px ' + (-cy * 12).toFixed(2) + 'px';
        linesEl.style.translate = (-cx * 20).toFixed(2) + 'px ' + (-cy * 20).toFixed(2) + 'px';
        copy.style.translate = (cx * 6).toFixed(2) + 'px ' + (cy * 6).toFixed(2) + 'px';
        if (moved || tl.isActive()) { paintLines(); moved = false; }
        if (Math.abs(cx - tx) < .0005 && Math.abs(cy - ty) < .0005 && !tl.isActive()) return false;
      });
      k.add(function () { plate.style.translate = linesEl.style.translate = copy.style.translate = ''; });
    } },

    /* v2 · From the brass to the room */
    2: { init: function (root, k) {
      navOn(k, 'ground');
      var stage = root.querySelector('.hero2__stage');
      var band = root.querySelector('.hero2__band');
      var win = root.querySelector('.hero2__window');
      var plate = root.querySelector('.hero2__plate');
      var h1 = root.querySelector('.hero2__h');
      var AR = 2400 / 1601, HX = .645, HY = .34;      // the brass-banded hood, measured on the photograph
      var Z = 2.4;   // start zoom: 3.1 would upscale the 2400px source past 1.4x; 2.4 keeps it <=1.4x [PLAN §4.7]
      var start = [22, 18, 22, 47];

      function fit() {
        var bw = band.clientWidth, bh = band.clientHeight;
        if (!bw || !bh) return;
        var w = Math.max(bw, bh * AR), h = w / AR;
        var left = (bw - w) / 2;
        var top = EZ.clamp(bh / 2 - h * HY, bh - h, 0);
        plate.style.cssText = 'width:' + w + 'px;height:' + h + 'px;left:' + left + 'px;top:' + top + 'px;right:auto;bottom:auto';
        // window centred on the hood
        var hx = (left + w * HX) / bw * 100, hy = (top + h * HY) / bh * 100;
        var ww = EZ.mobile() ? 62 : 58, wh = EZ.mobile() ? 50 : 78;
        var l = EZ.clamp(hx - ww / 2, 0, 100 - ww), t = EZ.clamp(hy - wh / 2, 0, 100 - wh);
        start = [t, 100 - l - ww, 100 - t - wh, l];
        plate.style.transformOrigin = (HX * 100) + '% ' + (HY * 100) + '%';
      }
      k.ro(band, fit);
      fit();
      k.add(function () { plate.style.cssText = ''; });

      if (!k.motion) { root.classList.add('is-static'); k.add(function () { root.classList.remove('is-static'); }); return; }

      var lines = wrapRise(h1.querySelectorAll('.ln'));
      h1.querySelectorAll('.ln').forEach(function (l) { l.style.overflow = 'clip'; l.style.paddingBottom = '.12em'; l.style.marginBottom = '-.12em'; });
      var row = root.querySelector('.hero2__row');

      if (k.mobile) {
        // phones: no pin; the zoom plays once [PLAN 6.1 v2 mobile]
        gsap.timeline({ delay: .05 })
          .fromTo(plate, { scale: 1.8 }, { scale: 1, duration: 1.2, ease: 'expo.out' }, 0)
          .add(EZ.clip(k, win, start, [0, 0, 0, 0], { duration: 1.2, ease: 'expo.out' }), 0)
          .fromTo(h1, { fontWeight: 200, fontStretch: '62%' }, { fontWeight: 700, fontStretch: '74%', duration: 1.2, ease: 'expo.out' }, 0)
          .from(lines, { yPercent: 105, duration: .8, ease: 'expo.out', stagger: .09 }, .05)
          .from(row, { autoAlpha: 0, y: 14, duration: .7, ease: 'expo.out' }, .35);
        return;
      }

      // intro (<=4 groups, 1.2s): band opens, lines rise, row arrives
      gsap.timeline({ delay: .05 })
        .add(EZ.clip(k, band, [0, 0, 100, 0], [0, 0, 0, 0], { duration: 1, ease: 'power4.inOut', onComplete: function () { band.style.clipPath = ''; } }), 0)
        .from(lines, { yPercent: 105, duration: .8, ease: 'expo.out', stagger: .09 }, .1)
        .from(row, { autoAlpha: 0, y: 14, duration: .7, ease: 'expo.out' }, .35);

      // pinned zoom-out, 140vh, scrub 1.1, linear [pack #11, S1322, S0652 §6]
      gsap.timeline({
        scrollTrigger: { trigger: stage, start: 'top top', end: '+=140%', pin: true, scrub: 1.1, invalidateOnRefresh: true }
      })
        .fromTo(plate, { scale: Z }, { scale: 1, ease: 'none' }, 0)
        .add(EZ.clip(k, win, function () { return start; }, [0, 0, 0, 0], { ease: 'none' }), 0)
        // text is motion: Archivo weight 200 -> 700, width 62 -> 88 on the same progress [S0095 §5, S1327]
        .fromTo(h1, { fontWeight: 200, fontStretch: '62%' }, { fontWeight: 700, fontStretch: '88%', ease: 'none' }, 0)
        .fromTo(stage, { '--p': 0 }, { '--p': 1, ease: 'none' }, 0);
    } },

    /* v3 · The window */
    3: { init: function (root, k) {
      navOn(k, 'ground');
      var win = root.querySelector('.hero3__win');
      var url = EZ.img('k-navy-shaker');
      win.style.backgroundImage = 'url("' + url + '")';
      k.add(function () { win.style.backgroundImage = ''; });
      var solid = root.querySelector('.hero3__solid'), row = root.querySelector('.hero3__row');
      if (!k.motion) return;

      if (k.mobile || !k.fine) {
        gsap.timeline({ delay: .05 })
          .from(win, { autoAlpha: 0, y: 24, duration: .9, ease: 'expo.out' }, 0)
          .from(solid, { autoAlpha: 0, y: 16, duration: .8, ease: 'expo.out' }, .15)
          .from(row, { autoAlpha: 0, y: 14, duration: .7, ease: 'expo.out' }, .35);
        return;
      }

      // split the window line into letters, each carrying its slice of the same photograph
      var text = win.textContent;
      win.innerHTML = text.split(/(\s+)/).map(function (w) {
        return /^\s+$/.test(w) ? ' ' : '<span class="wd">' + w.split('').map(function (c) { return '<span class="ch">' + c + '</span>'; }).join('') + '</span>';
      }).join('');
      win.setAttribute('data-ready', '');
      k.add(function () { win.textContent = text; win.removeAttribute('data-ready'); });
      var chars = Array.prototype.slice.call(win.querySelectorAll('.ch'));
      var AR = 1600 / 1067, pos = [], pw = 0, ph = 0, bx = 0, by = 0;
      function measure() {
        var ww = win.clientWidth, wh = win.clientHeight;
        pw = Math.max(ww, wh * AR) * 1.22; ph = pw / AR;          // room for the +-40px pan
        bx = (ww - pw) / 2; by = (wh - ph) * .42;
        pos = chars.map(function (c) { return [c.offsetLeft, c.offsetTop]; });
        paint();
      }
      var pan = { x: 0, y: 0 }, tgt = { x: 0, y: 0 }, light = { x: -999, y: -999 }, lt = { x: -999, y: -999 }, shift = 0;
      function paint() {
        for (var i = 0; i < chars.length; i++) {
          var p = pos[i]; if (!p) continue;
          var s = chars[i].style;
          var ox = bx + pan.x - p[0], oy = by + pan.y - shift - p[1];
          // a light patch inside the letters follows the pointer (a lightness field, no glow) [PLAN 6.1 v3]
          s.backgroundImage = 'radial-gradient(260px circle at ' + (light.x - p[0]).toFixed(1) + 'px ' + (light.y - p[1]).toFixed(1) +
            'px, rgba(255,246,228,.42), rgba(255,246,228,0) 70%), url("' + url + '")';
          s.backgroundSize = '100% 100%, ' + pw.toFixed(1) + 'px ' + ph.toFixed(1) + 'px';
          s.backgroundPosition = '0 0, ' + ox.toFixed(1) + 'px ' + oy.toFixed(1) + 'px';
        }
      }
      // gradient layer must cover the whole letter box from its own origin
      chars.forEach(function (c) { c.style.backgroundRepeat = 'no-repeat'; });
      k.ro(win, measure);
      if (document.fonts) document.fonts.ready.then(function () { if (chars[0].isConnected) measure(); });
      measure();

      // entrance: characters only, 3-word heading, .03s stagger [S0095 §5]
      gsap.timeline({ delay: .05 })
        .from(chars, { yPercent: 70, autoAlpha: 0, duration: .9, ease: 'expo.out', stagger: .03 }, 0)
        .from(solid, { autoAlpha: 0, y: 16, duration: .8, ease: 'expo.out' }, .3)
        .from(row, { autoAlpha: 0, y: 14, duration: .7, ease: 'expo.out' }, .45);

      // scroll slides the photograph up 6% inside the letters [S0095 parallax <8%]
      ScrollTrigger.create({ trigger: root, start: 'top top', end: 'bottom top', onUpdate: function (self) { shift = self.progress * .06 * ph; loop.start(); } });

      var inView = true;
      k.io(root, function (e) { inView = e.isIntersecting; if (inView) loop.start(); });
      k.on(window, 'pointermove', function (e) {
        if (e.pointerType !== 'mouse') return;
        var r = win.getBoundingClientRect();
        tgt.x = EZ.clamp((e.clientX / innerWidth) * 2 - 1, -1, 1) * -40;
        tgt.y = EZ.clamp((e.clientY / innerHeight) * 2 - 1, -1, 1) * -40;
        lt.x = e.clientX - r.left; lt.y = e.clientY - r.top;
        if (light.x < -900) { light.x = lt.x; light.y = lt.y; }
        loop.start();
      }, { passive: true });
      var loop = k.raf(function (dt) {
        if (!inView) return false;
        // pointer pan, lerp .08 per frame at 60fps [S1303 §8]
        pan.x = EZ.damp(pan.x, tgt.x, 5, dt); pan.y = EZ.damp(pan.y, tgt.y, 5, dt);
        light.x = EZ.damp(light.x, lt.x, 9, dt); light.y = EZ.damp(light.y, lt.y, 9, dt);
        paint();
        if (Math.abs(pan.x - tgt.x) < .05 && Math.abs(pan.y - tgt.y) < .05 && Math.abs(light.x - lt.x) < .3 && Math.abs(light.y - lt.y) < .3) return false;
      });
    } }
  });
})();
