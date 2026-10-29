/* ba [PLAN-V2 2.3] */
(function () {
  var PAIRS = [
    { b: 'ba-kitchen4-before', a: 'ba-kitchen4-after', w: 596, t: 'Kitchen', d: '6–12 weeks of construction',
      ba: 'Kitchen with dated oak cabinetry and tiled counters, before renovation', aa: 'Renovated kitchen with light cabinetry, range hood and island seating' },
    { b: 'ba-bath2-before', a: 'ba-bath2-after', w: 430, t: 'Bathroom', d: '4–8 weeks of construction',
      ba: 'Dated bathroom with alcove tub and shower curtain, before renovation', aa: 'Renovated bathroom with frameless glass shower and round backlit mirror' },
    { b: 'ba-kitchen1-before', a: 'ba-kitchen1-after', w: 388, t: 'Kitchen', d: '6–12 weeks of construction',
      ba: 'Dated kitchen with cream cabinets and tiled counters, before renovation', aa: 'Renovated kitchen with grey shaker cabinetry and quartz counters' },
    { b: 'ba-outdoor-before', a: 'ba-outdoor-after', w: 562, t: 'Outdoor living', d: 'Backyard and pergola',
      ba: 'Backyard with worn lawn and open patio, before renovation', aa: 'Covered outdoor pergola with dining and bar seating, and a turfed backyard' }
  ];

  // GreenSock's official horizontalLoop helper (bank 361 / Q161), draggable path removed (Club plugins not used)
  function horizontalLoop(items, config) {
    items = gsap.utils.toArray(items);
    config = config || {};
    var onChange = config.onChange, lastIndex = 0,
      tl = gsap.timeline({ repeat: config.repeat, paused: config.paused, defaults: { ease: 'none' },
        onUpdate: onChange && function () { var i = tl.closestIndex(); if (lastIndex !== i) { lastIndex = i; onChange(items[i], i); } },
        onReverseComplete: function () { tl.totalTime(tl.rawTime() + tl.duration() * 100); } }),
      length = items.length, startX = items[0].offsetLeft, times = [], widths = [], spaceBefore = [], xPercents = [],
      curIndex = 0, center = config.center, pixelsPerSecond = (config.speed || 1) * 100,
      snap = config.snap === false ? function (v) { return v; } : gsap.utils.snap(config.snap || 1),
      timeOffset = 0, container = items[0].parentNode, totalWidth, timeWrap;
    function getTotalWidth() {
      return items[length - 1].offsetLeft + xPercents[length - 1] / 100 * widths[length - 1] - startX + spaceBefore[0] +
        items[length - 1].offsetWidth * gsap.getProperty(items[length - 1], 'scaleX') + (parseFloat(config.paddingRight) || 0);
    }
    function populateWidths() {
      var b1 = container.getBoundingClientRect(), b2;
      items.forEach(function (el, i) {
        widths[i] = parseFloat(gsap.getProperty(el, 'width', 'px'));
        xPercents[i] = snap(parseFloat(gsap.getProperty(el, 'x', 'px')) / widths[i] * 100 + gsap.getProperty(el, 'xPercent'));
        b2 = el.getBoundingClientRect();
        spaceBefore[i] = b2.left - (i ? b1.right : b1.left);
        b1 = b2;
      });
      gsap.set(items, { xPercent: function (i) { return xPercents[i]; } });
      totalWidth = getTotalWidth();
    }
    function populateOffsets() {
      timeOffset = center ? tl.duration() * (container.parentNode.offsetWidth / 2) / totalWidth : 0;
      if (center) times.forEach(function (t, i) { times[i] = timeWrap(tl.labels['label' + i] + tl.duration() * widths[i] / 2 / totalWidth - timeOffset); });
    }
    function getClosest(values, value, wrap) {
      var i = values.length, closest = 1e10, index = 0, d;
      while (i--) { d = Math.abs(values[i] - value); if (d > wrap / 2) d = wrap - d; if (d < closest) { closest = d; index = i; } }
      return index;
    }
    function populateTimeline() {
      var i, item, curX, distanceToStart, distanceToLoop;
      tl.clear();
      for (i = 0; i < length; i++) {
        item = items[i];
        curX = xPercents[i] / 100 * widths[i];
        distanceToStart = item.offsetLeft + curX - startX + spaceBefore[0];
        distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, 'scaleX');
        tl.to(item, { xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond }, 0)
          .fromTo(item, { xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100) },
            { xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false }, distanceToLoop / pixelsPerSecond)
          .add('label' + i, distanceToStart / pixelsPerSecond);
        times[i] = distanceToStart / pixelsPerSecond;
      }
      timeWrap = gsap.utils.wrap(0, tl.duration());
    }
    function refresh(deep) {
      var progress = tl.progress();
      tl.progress(0, true);
      populateWidths();
      if (deep) populateTimeline();
      populateOffsets();
      tl.progress(progress, true);
    }
    gsap.set(items, { x: 0 });
    populateWidths(); populateTimeline(); populateOffsets();
    function toIndex(index, vars) {
      vars = vars || {};
      if (Math.abs(index - curIndex) > length / 2) index += index > curIndex ? -length : length;
      var newIndex = gsap.utils.wrap(0, length, index), time = times[newIndex];
      if (time > tl.time() !== index > curIndex && index !== curIndex) time += tl.duration() * (index > curIndex ? 1 : -1);
      if (time < 0 || time > tl.duration()) vars.modifiers = { time: timeWrap };
      curIndex = newIndex;
      vars.overwrite = true;
      return vars.duration === 0 ? tl.time(timeWrap(time)) : tl.tweenTo(time, vars);
    }
    tl.toIndex = toIndex;
    tl.closestIndex = function (setCurrent) { var index = getClosest(times, tl.time(), tl.duration()); if (setCurrent) curIndex = index; return index; };
    tl.current = function () { return tl.closestIndex(true); };
    tl.next = function (vars) { return toIndex(tl.current() + 1, vars); };
    tl.previous = function (vars) { return toIndex(tl.current() - 1, vars); };
    tl.refresh = refresh;
    tl.progress(1, true).progress(0, true);   // pre-render so the wrap never flashes
    tl.closestIndex(true);
    lastIndex = curIndex;
    if (onChange) onChange(items[curIndex], curIndex);
    return tl;
  }

  EZ.section('ba', {
    /* v1 · the handle */
    1: { init: function (root, k) {
      var stage = root.querySelector('.ba1__stage'), range = root.querySelector('.ba1__range');
      var before = root.querySelector('.ba1__before'), after = root.querySelector('.ba1__after');
      var tabs = Array.prototype.slice.call(root.querySelectorAll('.ba1__tab'));
      var bandT = root.querySelector('.ba1__bandt'), bandD = root.querySelector('.ba1__bandd');
      function apply(v) { stage.style.setProperty('--pos', v + '%'); }   // Elbaz: input -> --pos
      k.on(range, 'input', function () { apply(range.value); });
      apply(range.value);
      function select(i, focus) {
        var p = PAIRS[i];
        tabs.forEach(function (t, j) { t.setAttribute('aria-selected', j === i ? 'true' : 'false'); t.tabIndex = j === i ? 0 : -1; });
        before.src = EZ.img(p.b); before.alt = p.ba;
        after.src = EZ.img(p.a); after.alt = p.aa;
        bandT.textContent = p.t; bandD.textContent = p.d;
        range.setAttribute('aria-label', p.t + ' before and after comparison');
        stage.style.setProperty('--w', Math.round(p.w * 1.4) + 'px');
        range.value = 50; apply(50);
        if (k.motion) k.ctx.add(function () { gsap.fromTo([before, after], { opacity: 0 }, { opacity: 1, duration: .4, ease: 'power2.out' }); });
        if (focus) tabs[i].focus();
      }
      tabs.forEach(function (t, i) {
        k.on(t, 'click', function () { select(i); });
        k.on(t, 'keydown', function (e) {
          var d = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0;
          if (!d) return;
          e.preventDefault(); e.stopPropagation();
          select((i + d + tabs.length) % tabs.length, true);
        });
      });
      tabs.forEach(function (t, j) { t.tabIndex = j === 0 ? 0 : -1; });
      k.add(function () { select(0); stage.style.removeProperty('--pos'); });
      EZ.reveal(k, root.querySelectorAll('.ba1__side > *'));
      EZ.reveal(k, root.querySelectorAll('.ba1__stage'));
    } },

    /* v2 · the loop */
    2: { init: function (root, k) {
      var tiles = root.querySelectorAll('.ba2__tile');
      var capT = root.querySelector('.ba2__capt'), capD = root.querySelector('.ba2__capd');
      var pause = root.querySelector('.ba2__pause'), userPaused = !k.motion, inView = false;
      var loop = horizontalLoop(tiles, {
        paused: true, repeat: -1, speed: 2, center: true, paddingRight: k.mobile ? 24 : 150,
        onChange: function (el) {
          tiles.forEach(function (t) {
            var on = t === el;
            t.classList.toggle('is-active', on);
            t.querySelector('.ba2__state').textContent = on ? 'After' : 'Before';
          });
          capT.textContent = el.dataset.t; capD.textContent = el.dataset.d;
        }
      });
      k.add(function () { loop.kill(); gsap.set(tiles, { clearProps: 'transform' }); tiles.forEach(function (t) { t.classList.remove('is-active'); }); });
      k.on(window, 'resize', function () { loop.refresh(true); });
      function run() { if (!userPaused && inView && k.motion) loop.play(); else loop.pause(); }
      pause.hidden = !k.motion;
      pause.setAttribute('aria-pressed', userPaused ? 'true' : 'false');
      pause.textContent = userPaused ? 'Play' : 'Pause';
      k.on(pause, 'click', function () {
        userPaused = !userPaused;
        pause.setAttribute('aria-pressed', userPaused ? 'true' : 'false');
        pause.textContent = userPaused ? 'Play' : 'Pause';
        run();
      });
      root.querySelectorAll('[data-dir]').forEach(function (b) {
        k.on(b, 'click', function () {
          var dir = +b.dataset.dir;
          var vars = { duration: k.motion ? .8 : 0, ease: 'power1.inOut', onComplete: run };
          k.ctx.add(function () { dir > 0 ? loop.next(vars) : loop.previous(vars); });
          if (!k.motion) run();
        });
      });
      // autoplay is gated: reduced motion, offscreen and the visitor's own Pause all stop it [the pen has none]
      k.io(root, function (e) { inView = e.isIntersecting; run(); });
      EZ.reveal(k, root.querySelectorAll('.ba2__head > *'));
    } },

    /* v3 · the blinds */
    3: { init: function (root, k) {
      var NS = 'http://www.w3.org/2000/svg', SLITS = 30;
      root.querySelectorAll('.ba3__item').forEach(function (item, n) {
        var W = +item.dataset.w, H = +item.dataset.h, frame = item.querySelector('.ba3__frame');
        frame.style.setProperty('--w', W);
        frame.style.setProperty('--ar', W + ' / ' + H);
        var key = item.querySelector('template').content.firstElementChild.getAttribute('data-after');
        var svg = item.querySelector('.ba3__svg'), id = 'ba3m' + n;
        svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
        svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
        var slitH = H / SLITS, rects = [], defs = document.createElementNS(NS, 'defs'), mask = document.createElementNS(NS, 'mask');
        mask.setAttribute('id', id);
        for (var i = 0; i < SLITS; i++) {
          var r = document.createElementNS(NS, 'rect');
          r.setAttribute('x', 0); r.setAttribute('y', (i * slitH).toFixed(2)); r.setAttribute('width', W);
          r.setAttribute('height', 0); r.setAttribute('fill', '#fff');
          mask.appendChild(r); rects.push(r);
        }
        defs.appendChild(mask); svg.appendChild(defs);
        var img = document.createElementNS(NS, 'image');
        img.setAttribute('href', EZ.img(key)); img.setAttribute('width', W); img.setAttribute('height', H);
        img.setAttribute('preserveAspectRatio', 'xMidYMid slice'); img.setAttribute('mask', 'url(#' + id + ')');
        svg.appendChild(img);
        k.add(function () { svg.innerHTML = ''; });
        var state = item.querySelector('.ba3__state');
        var full = (slitH + .6).toFixed(2);           // slits overlap a hair so no seam shows between them
        if (!k.motion) {
          k.io(frame, function (e) { if (e.intersectionRatio > .6) { rects.forEach(function (r) { r.setAttribute('height', full); }); state.textContent = 'After'; } }, { threshold: [0, .6] });
          return;
        }
        // horizontal blinds: 30 slits, stagger .02, scrub 2 (about 1 on phones), driven from viewport entry
        gsap.to(rects, { attr: { height: full }, stagger: .02, ease: 'none',
          scrollTrigger: { trigger: frame, start: 'top 80%', end: 'bottom 45%', scrub: k.mobile ? 1 : 2,
            onUpdate: function (self) { state.textContent = self.progress > .5 ? 'After' : 'Before'; } } });
      });
      EZ.reveal(k, root.querySelectorAll('.ba3__head > *'));
    } }
  });
})();
