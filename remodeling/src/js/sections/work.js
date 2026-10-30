/* work: v1 plan-room push grid (R10 + Q157 Flip), v2 3D turntable (Q88), v3 seamless belts (Q161 + 364).
   Project titles are the firm's own (data/projects.json from FACTS.md). */
(function () {
  var CAT = { k: 'Kitchen', b: 'Bathroom', w: 'Whole home and outdoor' };
  function data() { return (window.__DATA || {}).projects || []; }
  // Phase 5 new versions: plan-room numbering (P-01 is the same room in every version). Two photos whose subject does not
  // match their title (k-walnut-marble shows a hallway, k-emerald-shaker a laundry run; owner item) are left out here.
  var ORDER = ['k-navy-shaker', 'b-black-marble', 'w-farmhouse', 'k-walnut-marble', 'b-polished-concrete', 'o-waterfront', 'k-emerald-shaker', 'b-spa-guest', 'k-chef', 'b-fluted-vanity', 'r-openplan', 'k-white-shaker', 'k-turquoise', 'k-gray-shaker', 'k-navy-white', 'k-brass-hood', 'k-stone-island', 'b-emerald', 'b-champagne', 'b-copper', 'b-floating-soak', 'b-sea-glass', 'b-navy-niche', 'b-white-marble', 'b-multi-brass', 'w-bath-whole'];
  var HOLD = ['k-walnut-marble', 'k-emerald-shaker'];
  function listed() {
    var by = {};
    data().forEach(function (p) { by[p.k] = { key: p.k, title: p.t, c: p.c, w: p.w, h: p.h }; });
    return ORDER.map(function (key, n) { var p = by[key]; if (p) p.code = 'P-' + (n < 9 ? '0' : '') + (n + 1); return p; })
      .filter(function (p) { return p && HOLD.indexOf(p.key) < 0; });
  }
  function viewerList(L) { return L.map(function (p) { return { key: p.key, title: p.title, alt: p.title + ', an Elbaz project' }; }); }
  function esc(t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }

  EZ.section('work', {
    /* slot 3 · Phase 5 improved version of b4 */
    3: { init: function (root, k) {
      var D = data(), stage = root.querySelector('.w2x__stage'), track = root.querySelector('.w2x__track');
      var arc = root.querySelector('.w2x__arc'), n = root.querySelector('.w2x__n'), t = root.querySelector('.w2x__t');
      track.innerHTML = D.map(function (d, i) {
        return '<figure class="w2x__card" data-i="' + i + '"><img src="' + EZ.img(d.k) + '" width="' + d.w + '" height="' + d.h + '" alt="' + d.t.replace(/&/g, '&amp;').replace(/"/g, '&quot;') + ', an Elbaz project"' + (i > 3 ? ' loading="lazy"' : '') + '></figure>';
      }).join('');
      var cards = Array.prototype.slice.call(track.querySelectorAll('.w2x__card'));
      // the protractor: ticks across 56 degrees, a needle marks the turn
      var ticks = '';
      for (var a = -28; a <= 28; a += 2) { var r = a * Math.PI / 180, big = a % 14 === 0; ticks += '<path class="' + (big ? 'tkm' : 'tk') + '" d="M' + (400 + Math.sin(r) * 330).toFixed(1) + ' ' + (360 - Math.cos(r) * 330).toFixed(1) + 'L' + (400 + Math.sin(r) * (big ? 312 : 320)).toFixed(1) + ' ' + (360 - Math.cos(r) * (big ? 312 : 320)).toFixed(1) + '"/>'; }
      arc.innerHTML = '<path class="arc" d="M' + (400 - Math.sin(.49) * 330).toFixed(1) + ' ' + (360 - Math.cos(.49) * 330).toFixed(1) + 'A330 330 0 0 1 ' + (400 + Math.sin(.49) * 330).toFixed(1) + ' ' + (360 - Math.cos(.49) * 330).toFixed(1) + '"/>' + ticks + '<path class="ndl" d="M400 24 l-6 -14 h12 z"/>';
      var ndl = arc.querySelector('.ndl');
      k.add(function () { track.innerHTML = ''; arc.innerHTML = ''; stage.style.removeProperty('--tint'); });
      var cur = -1, MAXROT = 28, DEPTH = 140, MINS = .92;
      function frame() {
        var tr = track.getBoundingClientRect(), cx = tr.left + tr.width / 2, best = 0, bd = 1e9;
        cards.forEach(function (c, i) {
          var r = c.getBoundingClientRect(), d = (r.left + r.width / 2 - cx) / r.width;
          if (Math.abs(d) < bd) { bd = Math.abs(d); best = i; }
          if (k.motion) {
            var dd = EZ.clamp(d, -2.5, 2.5);
            c.style.transform = 'translateZ(' + (-Math.abs(dd) * DEPTH).toFixed(1) + 'px) rotateY(' + (-EZ.clamp(dd, -1, 1) * MAXROT).toFixed(2) + 'deg) scale(' + Math.max(MINS, 1 - Math.abs(dd) * .04).toFixed(3) + ')';
          }
          c.style.opacity = Math.abs(d) > 2.6 ? .4 : 1;
        });
        // needle follows the fractional turn of the centre card
        var cr = cards[best].getBoundingClientRect(), frac = EZ.clamp((cr.left + cr.width / 2 - cx) / cr.width, -1, 1);
        ndl.setAttribute('transform', 'rotate(' + (-frac * MAXROT).toFixed(2) + ' 400 360)');
        if (best !== cur) {
          cur = best;
          var d = D[best];
          n.textContent = (best < 9 ? '0' : '') + (best + 1) + ' / ' + D.length;
          t.textContent = d.t;
          if (k.motion) k.ctx.add(function () { gsap.to(stage, { '--tint': d.tint, duration: .5, ease: 'power2.out', overwrite: 'auto' }); });
          else stage.style.setProperty('--tint', d.tint);
        }
      }
      var pend = false;
      k.on(track, 'scroll', function () { if (!pend) { pend = true; requestAnimationFrame(function () { pend = false; frame(); }); } }, { passive: true });
      k.ro(track, frame);
      frame();
      function go(i) { i = EZ.clamp(i, 0, cards.length - 1); var c = cards[i]; track.scrollTo({ left: c.offsetLeft - (track.clientWidth - c.offsetWidth) / 2, behavior: k.motion ? 'smooth' : 'auto' }); }
      k.on(root.querySelector('.w2x__prev'), 'click', function () { go(cur - 1); });
      k.on(root.querySelector('.w2x__next'), 'click', function () { go(cur + 1); });
      k.on(track, 'keydown', function (e) { if (e.key === 'ArrowRight') { e.preventDefault(); go(cur + 1); } else if (e.key === 'ArrowLeft') { e.preventDefault(); go(cur - 1); } });
      // mouse drag-to-scroll (touch and trackpads scroll natively)
      if (k.fine) {
        var down = null;
        // [AUDIT-01 F7 loser V2] a drag carries its energy: the release velocity projects 300ms ahead and the nearest card there wins
        k.on(track, 'pointerdown', function (e) { if (e.pointerType !== 'mouse') return; down = { x: e.clientX, l: track.scrollLeft, moved: false, v: 0, px: e.clientX, pt: e.timeStamp }; track.style.scrollSnapType = 'none'; track.setPointerCapture(e.pointerId); });
        k.on(track, 'pointermove', function (e) {
          if (!down) return; var dx = e.clientX - down.x; if (Math.abs(dx) > 5) down.moved = true; track.scrollLeft = down.l - dx;
          var dt = e.timeStamp - down.pt; if (dt > 0) { down.v = .8 * ((e.clientX - down.px) / dt) + .2 * down.v; down.px = e.clientX; down.pt = e.timeStamp; }
        });
        function up() {
          if (!down) return;
          var proj = track.scrollLeft - down.v * 300 + track.clientWidth / 2, best = cur, bd = Infinity;
          down = null; track.style.scrollSnapType = '';
          cards.forEach(function (c, i) { var d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - proj); if (d < bd) { bd = d; best = i; } });
          go(best);
        }
        k.on(track, 'pointerup', up); k.on(track, 'pointercancel', up);
        k.add(function () { track.style.scrollSnapType = ''; });
      }
      EZ.reveal(k, root.querySelectorAll('.work__head > *'));
    } },

    /* slot 2 · Phase 5 improved version of b3 */
    2: { init: function (root, k) {
      var grid = root.querySelector('.w1x__grid');
      var items = Array.prototype.slice.call(root.querySelectorAll('.w1x__it'));
      var fbtns = Array.prototype.slice.call(root.querySelectorAll('.w1x__f'));
      var more = root.querySelector('.w1x__more'), moreLabel = more.querySelector('.btn__label');
      var filter = 'all', all = false, open = null;
      // [AUDIT-01 F7 loser V1] label truth: the first chip says what it shows, featured 12 until all 26 are dealt
      var chipLbl = fbtns[0].querySelector('.btn__label'), nFeat = items.filter(function (it) { return it.dataset.feat; }).length;
      function chip() { chipLbl.innerHTML = all ? 'All <span class="nums">' + items.length + '</span>' : 'Featured <span class="nums">' + nFeat + '</span>'; }
      chip();
      EZ.reveal(k, root.querySelectorAll('.work__head > *'));
      function flip(fn) {
        if (!k.motion) { fn(); return; }
        var state = Flip.getState(items.concat([more]));
        fn();
        k.ctx.add(function () {
          Flip.from(state, { duration: .45, ease: 'power3.inOut', absolute: false, scale: false, nested: true,
            onEnter: function (els) { return gsap.fromTo(els, { autoAlpha: 0, scale: .92 }, { autoAlpha: 1, scale: 1, duration: .3, ease: 'power3.out' }); },
            onLeave: function (els) { return gsap.to(els, { autoAlpha: 0, duration: .2 }); } });
        });
      }
      function apply() {
        items.forEach(function (it) {
          var show = (filter === 'all' || it.dataset.c === filter) && (all || filter !== 'all' || it.dataset.feat);
          it.hidden = !show;
        });
        more.hidden = filter !== 'all';
      }
      function setOpen(it) {
        if (open) { open.classList.remove('is-open'); open.querySelector('.w1x__sheet').setAttribute('aria-expanded', 'false'); }
        open = it && it !== open ? it : null;
        if (open) { open.classList.add('is-open'); open.querySelector('.w1x__sheet').setAttribute('aria-expanded', 'true'); }
      }
      apply();
      fbtns.forEach(function (b) {
        k.on(b, 'click', function () {
          if (b.dataset.f === filter) return;
          filter = b.dataset.f;
          fbtns.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
          flip(function () { setOpen(null); apply(); });
        });
      });
      k.on(more, 'click', function () {
        all = !all;
        more.setAttribute('aria-expanded', all ? 'true' : 'false');
        moreLabel.textContent = all ? 'Show the featured twelve' : 'Show all ' + items.length + ' projects';
        chip();
        flip(apply);
      });
      items.forEach(function (it) {
        var sheet = it.querySelector('.w1x__sheet');
        k.on(sheet, 'click', function () {
          flip(function () { setOpen(it); });
          if (open) { var top = it.getBoundingClientRect().top; if (top < 80 || top > innerHeight * .5) k.timeout(function () { EZ.scrollTo(it); }, k.motion ? 620 : 0); }
        });
      });
      k.on(root, 'keydown', function (e) { if (e.key === 'Escape' && open) { var o = open; flip(function () { setOpen(null); }); o.querySelector('.w1x__sheet').focus(); } });
      k.add(function () { setOpen(null); items.forEach(function (it) { it.hidden = false; }); more.hidden = false; fbtns.forEach(function (x, i) { x.setAttribute('aria-pressed', i ? 'false' : 'true'); }); moreLabel.textContent = 'Show all ' + items.length + ' projects'; more.setAttribute('aria-expanded', 'false'); all = false; chip(); });
      if (k.motion) gsap.from(items.filter(function (it) { return !it.hidden; }), { y: 20, autoAlpha: 0, duration: .3, ease: 'power2.out', stagger: .03, scrollTrigger: { trigger: grid, start: 'top 85%', once: true } });
    } },

    /* slot 1 · Phase 5 improved version of b2 */
    1: { init: function (root, k) {
      var P = ((window.__DATA || {}).projects || []).map(function (p, i) { return { key: p.k, title: p.t, c: p.c, w: p.w, h: p.h, no: i }; });
      var all = P.map(function (p) { return { key: p.key, title: p.title, alt: p.title + ', an Elbaz project' }; });
      // the site camera fires once per opened photo (a 260ms flash), then rests
      function flash() {
        if (!k.motion) return;
        var b = root.querySelectorAll('.wbx__burst path'), fl = root.querySelector('.wbx__flash');
        gsap.timeline().fromTo(b, { opacity: 1, drawSVG: '0%' }, { drawSVG: '100%', duration: .14, ease: 'power2.out' }).to(b, { opacity: 0, duration: .12 })
          .fromTo(fl, { fill: '#FFF5EE' }, { fill: '#FF5F00', duration: .08, yoyo: true, repeat: 1 }, 0);
      }
      var belts = Array.prototype.slice.call(root.querySelectorAll('.wbx__belt'));
      var hold = root.querySelector('.wbx__hold');
      var CAT = { k: 'Kitchen', b: 'Bathroom', w: 'Whole home and outdoor' };
      // project codes follow the plan-room numbering of version 1 (P-01 is the same room everywhere)
      var CODE = {};
      document.querySelectorAll('.work1__sheet').forEach(function (sh, i) { var im = sh.querySelector('img[data-img]'); if (im) CODE[im.dataset.img] = 'P-' + (i < 9 ? '0' : '') + (i + 1); });
      EZ.reveal(k, root.querySelectorAll('.work__head > *, .wbx__foot'));
      var loops = [];
      belts.forEach(function (belt, bi) {
        var track = belt.querySelector('.wbx__track');
        var list = P.filter(function (p) { return belt.dataset.c.indexOf(p.c) > -1; });
        track.innerHTML = list.map(function (p) {
          var code = CODE[p.key] || ('P-' + (p.no < 9 ? '0' : '') + (p.no + 1));
          return '<button type="button" class="wbx__tile" data-i="' + p.no + '" data-rx="~t:' + code + '/peek/flash/tl" style="aspect-ratio:' + p.w + ' / ' + p.h + '" aria-label="' + p.title.replace(/"/g, '&quot;') + ', ' + CAT[p.c] + ', open large">' +
            '<img src="' + EZ.img(p.key) + '" width="' + p.w + '" height="' + p.h + '" alt="" loading="lazy" decoding="async"><span class="wbx__cap" aria-hidden="true"><b>' + CAT[p.c] + '</b>' + p.title.replace(/</g, '') + '</span></button>';
        }).join('');
        k.on(track, 'click', function (e) { var t = e.target.closest('.wbx__tile'); if (t) { flash(); EZ.viewer.open(all, +t.dataset.i, t); } });
      });
      k.add(function () { belts.forEach(function (b) { b.querySelector('.wbx__track').innerHTML = ''; b.classList.remove('is-run'); }); root.classList.remove('is-static'); });
      if (EZ.bindReactions) EZ.bindReactions(root, k);
      if (!k.motion) { root.classList.add('is-static'); hold.hidden = true; k.add(function () { hold.hidden = false; }); return; }

      var held = false, inView = false, touched = false;
      var builtW = 0;
      function build() {
        // a rebuild keeps where each belt was, and starts from clean transforms (stale xPercent overlaps the tiles)
        var prev = loops.map(function (l) { return { p: l.tl.progress(), slow: l.slow }; });
        loops.forEach(function (l) { l.tl.kill(); });
        builtW = root.querySelector('.wbx__belts').clientWidth;
        loops = belts.map(function (belt, bi) {
          var items = belt.querySelectorAll('.wbx__tile');
          gsap.set(items, { clearProps: 'transform' });
          var gap = parseFloat(getComputedStyle(belt.querySelector('.wbx__track')).columnGap) || 16;
          var tl = EZ.horizontalLoop(items, { repeat: -1, paused: true, speed: .55, paddingRight: gap });
          // a photo is already cut by the left edge at rest [BANK 364 peek offset]
          if (prev[bi]) tl.progress(prev[bi].p); else tl.time(tl.duration() * (bi ? .37 : .13));
          if (bi) tl.reversed(true);
          return { tl: tl, belt: belt, slow: prev[bi] ? prev[bi].slow : { v: 1 } };
        });
        sync();
      }
      function sync() {
        loops.forEach(function (l) {
          var ts = held ? 0 : l.slow.v;
          l.tl.timeScale(Math.max(ts, .0001));
          if (inView && !held) l.tl.paused(false); else l.tl.paused(true);
          // the tread under the belt runs only while that belt visibly moves
          l.belt.classList.toggle('is-run', inView && !held && l.slow.v > .05);
        });
      }
      // each tile's image decodes before the loop measures widths
      var imgs = root.querySelectorAll('.wbx__tile img'), left = imgs.length;
      imgs.forEach(function (im) { if (im.complete) left--; else k.on(im, 'load', function () { if (--left === 0) build(); }); });
      build();
      k.ro(root.querySelector('.wbx__belts'), function () { if (root.querySelector('.wbx__belts').clientWidth !== builtW) build(); });
      k.add(function () { loops.forEach(function (l) { l.tl.kill(); }); loops = []; });
      loops.forEach(function (l, i) {
        // first contact (hover or press) pauses that belt with a 200ms ramp and parks the other; Run the belts restarts them
        function contact(e) {
          if (e.type === 'pointerenter' && e.pointerType !== 'mouse') return;
          gsap.to(loops[i].slow, { v: 0, duration: .2, ease: 'power1.out', onUpdate: sync, onComplete: park });
        }
        function park() {
          if (held) return;
          touched = true; held = true;
          hold.setAttribute('aria-pressed', 'true'); hold.querySelector('.btn__label').textContent = 'Run the belts';
          loops.forEach(function (o) { o.slow.v = 1; }); sync();
        }
        k.on(l.belt, 'pointerenter', contact);
        k.on(l.belt, 'pointerdown', contact);
        // a focused photo must be in view (WCAG focus not obscured): the belt stops and glides that photo to its centre
        k.on(l.belt, 'focusin', function (e) {
          loops[i].slow.v = 0; sync();
          var t = e.target.closest('.wbx__tile'); if (!t) return;
          var br = l.belt.getBoundingClientRect(), tr = t.getBoundingClientRect();
          var dx = (tr.left + tr.width / 2) - (br.left + br.width / 2), tl = loops[i].tl;
          if (Math.abs(dx) < 8) return;
          if (tl.totalTime() < tl.duration() * 2) tl.totalTime(tl.totalTime() + tl.duration() * 10);
          gsap.to(tl, { totalTime: tl.totalTime() + dx / 55, duration: k.motion ? .4 : 0, ease: 'power3.inOut', overwrite: true });
        });
        k.on(l.belt, 'focusout', function (e) { if (!l.belt.contains(e.relatedTarget) && !held) { loops[i].slow.v = 1; sync(); } });
      });
      k.on(hold, 'click', function () {
        held = !held;
        if (!held) loops.forEach(function (o) { o.slow.v = 1; });
        hold.setAttribute('aria-pressed', held ? 'true' : 'false');
        hold.querySelector('.btn__label').textContent = held ? 'Run the belts' : 'Hold the belts';
        sync();
      });
      k.add(function () { hold.setAttribute('aria-pressed', 'false'); hold.querySelector('.btn__label').textContent = 'Hold the belts'; });
      k.io(root.querySelector('.wbx__belts'), function (en) { inView = en.isIntersecting; sync(); }, { threshold: 0 });
      gsap.from(belts, { x: function (i) { return i ? -40 : 40; }, autoAlpha: 0, duration: .3, ease: 'power2.out', stagger: .06, scrollTrigger: { trigger: root.querySelector('.wbx__belts'), start: 'top 85%', once: true } });
    } },

    /* slot 4 · Phase 5 new · The floor plan: three rooms on a drawn plan; the chosen room fills with the accent tint,
       its door swings are redrawn, and the photo strip switches to that kind of project */
    4: { init: function (root, k) {
      var L = listed(), rooms = Array.prototype.slice.call(root.querySelectorAll('.wfp__room'));
      var thumbs = root.querySelector('.wfp__thumbs'), img = root.querySelector('.wfp__img');
      var code = root.querySelector('.wfp__code'), tt = root.querySelector('.wfp__t'), open = root.querySelector('.wfp__open');
      var set = [], cur = 0;
      rooms.forEach(function (r) {
        var n = L.filter(function (p) { return p.c === r.dataset.c; }).length;
        r.querySelector('.wfp__n').textContent = n + ' shown';
        r.setAttribute('aria-label', r.querySelector('.wfp__name').textContent + ', ' + n + ' project photos');
      });
      function show(i, anim) {
        cur = i; var p = set[i];
        img.src = EZ.img(p.key); img.width = p.w; img.height = p.h; img.alt = p.title + ', an Elbaz project';
        code.textContent = p.code; tt.textContent = p.title;
        thumbs.querySelectorAll('.wfp__th').forEach(function (t, j) { t.setAttribute('aria-pressed', j === i ? 'true' : 'false'); });
        if (anim && k.motion) k.ctx.add(function () { gsap.fromTo(img, { autoAlpha: .35, scale: 1.015 }, { autoAlpha: 1, scale: 1, duration: .3, ease: 'power2.out', overwrite: true }); });
      }
      function pick(c, anim) {
        set = L.filter(function (p) { return p.c === c; });
        rooms.forEach(function (r) { r.setAttribute('aria-pressed', r.dataset.c === c ? 'true' : 'false'); });
        thumbs.innerHTML = set.map(function (p, i) {
          return '<button type="button" class="wfp__th" aria-pressed="false" data-i="' + i + '" data-rx="native:plan-thumb" aria-label="' + esc(p.title) + '"><img src="' + EZ.img(p.key) + '" alt="" width="' + p.w + '" height="' + p.h + '" loading="lazy" decoding="async"></button>';
        }).join('');
        if (EZ.bindReactions) EZ.bindReactions(thumbs, k);
        show(0, anim);
        if (anim && k.motion) k.ctx.add(function () {
          // the chosen room is drawn again, line by line, like a plan being inked
          gsap.fromTo(root.querySelectorAll('.wfp__room[aria-pressed="true"] .wfp__ln, .wfp__room[aria-pressed="true"] .wfp__deck'), { drawSVG: '0%' }, { drawSVG: '100%', duration: .45, ease: 'power2.out', stagger: .05 });
          gsap.from(thumbs.children, { y: 10, autoAlpha: 0, duration: .25, ease: 'power2.out', stagger: .025 });
        });
      }
      rooms.forEach(function (r) { k.on(r, 'click', function () { if (r.getAttribute('aria-pressed') !== 'true') pick(r.dataset.c, true); }); });
      k.on(thumbs, 'click', function (e) { var t = e.target.closest('.wfp__th'); if (t) show(+t.dataset.i, true); });
      k.on(open, 'click', function () { EZ.viewer.open(viewerList(set), cur, open); });
      pick('k', false);
      k.add(function () { thumbs.innerHTML = ''; img.removeAttribute('src'); code.textContent = ''; tt.textContent = ''; rooms.forEach(function (r) { r.setAttribute('aria-pressed', r.dataset.c === 'k' ? 'true' : 'false'); }); });
      EZ.reveal(k, root.querySelectorAll('.work__head > *, .wfp__plan, .wfp__view'));
    } },

    /* slot 5 · Phase 5 new · The gallery wall: each frame hangs a few degrees off; hover swings it the other way,
       a pick brings a spirit level down onto it, the bubble settles, the frame sets true and then opens large */
    5: { init: function (root, k) {
      var L = listed(), wall = root.querySelector('.wgh__wall'), cnt = root.querySelector('.wgh__count'), all = viewerList(L);
      var per = k.mobile ? 6 : 9, walls = Math.ceil(L.length / per), w = 0, level = {};
      var TILT = [-3.5, 2.5, -1.5, 3, -2.5, 1.5, -3, 2, -1];
      var WIRE = '<svg class="wgh__wire" viewBox="0 0 120 60" aria-hidden="true" focusable="false"><path d="M60 5 L16 58 M60 5 L104 58"/><circle cx="60" cy="5" r="4.5"/></svg>';
      var LV = '<svg class="wgh__lv" viewBox="0 0 120 28" aria-hidden="true" focusable="false"><rect class="wgh__lvl-b" x="1" y="1" width="118" height="26" rx="4"/><rect class="wgh__lvl-v" x="42" y="7" width="36" height="14" rx="7"/><circle class="wgh__lvl-bub" cx="60" cy="14" r="5"/><path class="wgh__lvl-m" d="M54 7 V21 M66 7 V21"/></svg>';
      root.querySelector('.wgh__of').textContent = L.length;
      function render(anim) {
        wall.innerHTML = L.slice(w * per, w * per + per).map(function (p, j) {
          var i = w * per + j;
          return '<li class="wgh__it' + (level[p.key] ? ' is-level' : '') + '" style="--tilt:' + (k.motion ? TILT[i % 9] : 0) + 'deg">' + WIRE + LV +
            '<button type="button" class="wgh__fr" data-i="' + i + '" data-rx="native:frame-level" aria-label="' + esc(p.title) + ', set level and open large"><img src="' + EZ.img(p.key) + '" alt="" width="' + p.w + '" height="' + p.h + '" loading="lazy" decoding="async"></button>' +
            '<p class="wgh__cap" aria-hidden="true"><b>' + p.code + '</b>' + esc(p.title) + '</p></li>';
        }).join('');
        if (EZ.bindReactions) EZ.bindReactions(wall, k);
        if (anim && k.motion) k.ctx.add(function () { gsap.from(wall.children, { y: -24, autoAlpha: 0, duration: .35, ease: 'back.out(1.6)', stagger: .03 }); });
      }
      function setLevel(btn) {
        var li = btn.parentNode, i = +btn.dataset.i, p = L[i], lv = li.querySelector('.wgh__lv'), bub = lv.querySelector('.wgh__lvl-bub');
        function done() { EZ.viewer.open(all, i, btn); }
        if (!level[p.key]) { level[p.key] = 1; cnt.textContent = Object.keys(level).length; }
        if (!k.motion || li.classList.contains('is-level')) { li.classList.add('is-level'); done(); return; }
        var t0 = TILT[i % 9];
        k.ctx.add(function () {
          gsap.timeline({ onComplete: done })
            .fromTo(lv, { autoAlpha: 0, y: -18, rotation: t0 }, { autoAlpha: 1, y: 0, duration: .18, ease: 'power2.out' })
            .add(function () { li.classList.add('is-level'); })
            .to(lv, { rotation: 0, duration: .45, ease: 'elastic.out(1, .55)' }, '<')
            .fromTo(bub, { attr: { cx: 60 + t0 * 5 } }, { attr: { cx: 60 }, duration: .45, ease: 'elastic.out(1, .5)' }, '<')
            .to(lv, { autoAlpha: 0, duration: .15 }, '+=.05');
        });
      }
      k.on(wall, 'click', function (e) { var b = e.target.closest('.wgh__fr'); if (b) setLevel(b); });
      k.on(root.querySelector('.wgh__prev'), 'click', function () { w = (w - 1 + walls) % walls; render(true); });
      k.on(root.querySelector('.wgh__next'), 'click', function () { w = (w + 1) % walls; render(true); });
      render(false);
      k.add(function () { wall.innerHTML = ''; cnt.textContent = '0'; });
      EZ.reveal(k, root.querySelectorAll('.work__head > *, .wgh__bar'));
// the frames' tilt lives in CSS on the button, so entrances move the hanging item, never the frame itself
      if (k.motion) gsap.from(wall.children, { y: -20, autoAlpha: 0, duration: .5, ease: 'back.out(1.8)', stagger: .04, scrollTrigger: { trigger: wall, start: 'top 85%', once: true } });
    } },

    /* slot 6 · Phase 5 new · The tile bond: sixteen photo tiles (eight on a phone) on an orange grout bed;
       stack bond, running bond (with its cut pieces at the wall) and basket weave, each tile glides to its new place */
    6: { init: function (root, k) {
      var floor = root.querySelector('.wbd__floor'), btns = Array.prototype.slice.call(root.querySelectorAll('.wbd__b'));
      var L = listed(), bond = 'stack', cols = 0, set = [], tiles = [], cuts = [];
      var cap = document.createElement('p'); cap.className = 'wbd__cap'; cap.setAttribute('aria-live', 'polite'); floor.parentNode.insertBefore(cap, floor.nextSibling);
      var CUT = '<span class="wbd__cut" aria-hidden="true"><svg viewBox="0 0 40 40" preserveAspectRatio="none"><path d="M0 40 L40 0 M-20 40 L20 0 M20 40 L60 0"/></svg></span>';
      function rects(W) {
        var w = W / cols, h = w / 2, out = [], cut = [];
        set.forEach(function (p, i) {
          var r = Math.floor(i / cols), c = i % cols;
          if (bond === 'stack') out.push([c * w, r * h, w, h]);
          else if (bond === 'run') out.push([c * w + (r % 2 ? w / 2 : 0), r * h, w, h]);
          else {
            var q = Math.floor(i / 2), t = i % 2, R = Math.floor(q / cols), C = q % cols;
            out.push((R + C) % 2 ? [C * w + t * h, R * w, h, w] : [C * w, R * w + t * h, w, h]);
          }
        });
        if (bond === 'run') { cut.push([0, h, w / 2, h]); cut.push([0, 3 * h, w / 2, h]); }
        return { t: out, c: cut, H: 4 * h };
      }
      function lay(anim) {
        var W = floor.clientWidth, R = rects(W);
        floor.style.height = R.H + 'px';
        tiles.forEach(function (t, i) {
          var r = R.t[i], to = { x: r[0], y: r[1], width: r[2], height: r[3] };
          if (anim && k.motion) gsap.to(t, Object.assign(to, { duration: .6, ease: 'power3.inOut', delay: i * .02, overwrite: true })); else gsap.set(t, to);
        });
        cuts.forEach(function (c, i) {
          var r = R.c[i];
          if (r) gsap.set(c, { x: r[0], y: r[1], width: r[2], height: r[3] });
          gsap.to(c, { autoAlpha: r ? 1 : 0, duration: anim && k.motion ? .3 : 0, delay: anim && r ? .45 : 0 });
        });
      }
      function build() {
        cols = floor.clientWidth < 640 ? 2 : 4;
        set = L.slice(0, cols * 4);
        floor.innerHTML = CUT + CUT + set.map(function (p, i) {
          return '<button type="button" class="wbd__t" data-i="' + i + '" data-rx="native:bond-tile" aria-label="' + esc(p.title) + ', open large"><img src="' + EZ.img(p.key) + '" alt="" width="' + p.w + '" height="' + p.h + '" loading="lazy" decoding="async"></button>';
        }).join('');
        tiles = Array.prototype.slice.call(floor.querySelectorAll('.wbd__t')); cuts = Array.prototype.slice.call(floor.querySelectorAll('.wbd__cut'));
        if (EZ.bindReactions) EZ.bindReactions(floor, k);
        lay(false);
      }
      function say(i) { var p = set[i]; cap.innerHTML = '<b>' + p.code + '</b>' + esc(p.title); }
      btns.forEach(function (b) {
        k.on(b, 'click', function () {
          if (b.dataset.b === bond) return;
          bond = b.dataset.b;
          btns.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
          lay(true);
        });
      });
      k.on(floor, 'click', function (e) { var t = e.target.closest('.wbd__t'); if (t) EZ.viewer.open(viewerList(set), +t.dataset.i, t); });
      k.on(floor, 'pointerover', function (e) { var t = e.target.closest('.wbd__t'); if (t) say(+t.dataset.i); });
      k.on(floor, 'focusin', function (e) { var t = e.target.closest('.wbd__t'); if (t) say(+t.dataset.i); });
      build(); say(0);
      var lastW = floor.clientWidth;
      k.ro(floor, function () { var W = floor.clientWidth; if (W === lastW) return; lastW = W; if ((W < 640 ? 2 : 4) !== cols) build(); else lay(false); });
      k.add(function () { floor.innerHTML = ''; floor.style.height = ''; if (cap.parentNode) cap.parentNode.removeChild(cap); btns.forEach(function (x, i) { x.setAttribute('aria-pressed', i ? 'false' : 'true'); }); });
      EZ.reveal(k, root.querySelectorAll('.work__head > *, .wbd__bonds'));
      if (k.motion) gsap.from(floor, { clipPath: 'inset(0 100% 0 0)', duration: .6, ease: 'power2.inOut', scrollTrigger: { trigger: floor, start: 'top 85%', once: true } });
    } },

    /* slot 7 · Phase 5 new · The plumb line: the index of projects by room type; the bob drops to the row under the pointer
       or focus, the string follows it, and the photo beside swaps; arrow keys walk the list */
    7: { init: function (root, k) {
      var L = listed(), ol = root.querySelector('.wix__ol'), list = root.querySelector('.wix__list');
      var str = root.querySelector('.wix__str'), bob = root.querySelector('.wix__bob');
      var img = root.querySelector('.wix__img'), code = root.querySelector('.wix__code'), tt = root.querySelector('.wix__t');
      var G = [['k', 'Kitchens'], ['b', 'Bathrooms'], ['w', 'Whole home and outdoor']], F = [];
      ol.innerHTML = G.map(function (g) {
        var rows = L.filter(function (p) { return p.c === g[0]; });
        return '<li><p class="wix__h">' + g[1] + '</p><ol class="wix__sub">' + rows.map(function (p) {
          F.push(p);
          return '<li><button type="button" class="wix__row" data-i="' + (F.length - 1) + '" data-rx="native:index-row"><b class="nums">' + p.code + '</b><span>' + esc(p.title) + '</span></button></li>';
        }).join('') + '</ol></li>';
      }).join('');
      if (EZ.bindReactions) EZ.bindReactions(ol, k);
      var rows = Array.prototype.slice.call(ol.querySelectorAll('.wix__row')), cur = -1, pos = { y: 0 };
      function draw() { str.setAttribute('d', 'M20 0 V' + Math.max(0, pos.y - 14).toFixed(1)); bob.setAttribute('transform', 'translate(20 ' + pos.y.toFixed(1) + ')'); }
      function rowY(i) { var lr = list.getBoundingClientRect(), rr = rows[i].getBoundingClientRect(); return rr.top - lr.top + rr.height / 2; }
      function set(i, anim) {
        if (i === cur) return;
        cur = i; var p = F[i];
        rows.forEach(function (r, j) { r.classList.toggle('is-on', j === i); });
        img.src = EZ.img(p.key); img.width = p.w; img.height = p.h; img.alt = p.title + ', an Elbaz project';
        code.textContent = p.code; tt.textContent = p.title;
        var y = rowY(i);
        if (anim && k.motion) k.ctx.add(function () {
          gsap.to(pos, { y: y, duration: .55, ease: 'elastic.out(1, .6)', overwrite: true, onUpdate: draw });
          gsap.fromTo(img, { autoAlpha: .4 }, { autoAlpha: 1, duration: .25, ease: 'power2.out', overwrite: true });
        });
        else { pos.y = y; draw(); }
      }
      k.on(ol, 'pointerover', function (e) { var r = e.target.closest('.wix__row'); if (r && e.pointerType === 'mouse') set(+r.dataset.i, true); });
      k.on(ol, 'focusin', function (e) { var r = e.target.closest('.wix__row'); if (r) set(+r.dataset.i, true); });
      k.on(ol, 'click', function (e) { var r = e.target.closest('.wix__row'); if (r) { set(+r.dataset.i, true); EZ.viewer.open(viewerList(F), +r.dataset.i, r); } });
      k.on(ol, 'keydown', function (e) {
        var r = e.target.closest('.wix__row'); if (!r) return;
        var i = +r.dataset.i, n = e.key === 'ArrowDown' ? i + 1 : e.key === 'ArrowUp' ? i - 1 : e.key === 'Home' ? 0 : e.key === 'End' ? rows.length - 1 : -2;
        if (n === -2) return;
        e.preventDefault(); rows[EZ.clamp(n, 0, rows.length - 1)].focus();
      });
      set(0, false);
      k.ro(list, function () { if (cur > -1) { pos.y = rowY(cur); draw(); } });
      k.add(function () { ol.innerHTML = ''; img.removeAttribute('src'); str.removeAttribute('d'); bob.removeAttribute('transform'); code.textContent = ''; tt.textContent = ''; });
      EZ.reveal(k, root.querySelectorAll('.work__head > *'));
    } },

    /* slot 8 · Phase 5 new · The job binder: ring-bound pages, one project each; the page flips up over the rings
       to turn forward and drops back down to turn back; the slider scrubs straight through without the flip */
    8: { init: function (root, k) {
      var L = listed(), page = root.querySelector('.wfb__page'), img = root.querySelector('.wfb__img');
      var tab = root.querySelector('.wfb__tab'), tt = root.querySelector('.wfb__t'), cc = root.querySelector('.wfb__c');
      var range = root.querySelector('.wfb__range'), pg = root.querySelector('.wfb__pg'), rings = root.querySelector('.wfb__rings');
      var CATN = { k: 'Kitchen', b: 'Bathroom', w: 'Whole home and outdoor' }, cur = 0, busy = null;
      var r = '';
      for (var x = 70; x < 880; x += 92) r += '<ellipse class="hl" cx="' + x + '" cy="32" rx="7" ry="4"/><path class="rg" d="M' + (x - 9) + ' 32 C' + (x - 9) + ' 4 ' + (x + 9) + ' 4 ' + (x + 9) + ' 32"/>';
      rings.innerHTML = r;
      range.max = L.length; root.querySelector('.wfb__of').textContent = L.length;
      function fill(i) {
        var p = L[i]; cur = i;
        img.src = EZ.img(p.key); img.width = p.w; img.height = p.h; img.alt = p.title + ', an Elbaz project';
        tab.textContent = p.code; tt.textContent = p.title; cc.textContent = CATN[p.c];
        range.value = i + 1; pg.textContent = i + 1;
        range.setAttribute('aria-valuetext', 'Page ' + (i + 1) + ', ' + p.title);
      }
      function turn(d) {
        var n = (cur + d + L.length) % L.length;
        if (!k.motion) { fill(n); return; }
        if (busy) busy.progress(1);
        k.ctx.add(function () {
          busy = d > 0
            ? gsap.timeline({ onComplete: function () { busy = null; } }).to(page, { rotationX: 86, duration: .18, ease: 'power2.in' }).add(function () { fill(n); }).set(page, { rotationX: 0 }).from(img, { autoAlpha: .6, duration: .2 })
            : gsap.timeline({ onComplete: function () { busy = null; } }).add(function () { fill(n); }).fromTo(page, { rotationX: 86 }, { rotationX: 0, duration: .26, ease: 'power2.out' });
        });
      }
      k.on(root.querySelector('.wfb__prev'), 'click', function () { turn(-1); });
      k.on(root.querySelector('.wfb__next'), 'click', function () { turn(1); });
      k.on(range, 'input', function () { if (busy) busy.progress(1); fill(+range.value - 1); });
      k.on(root.querySelector('.wfb__open'), 'click', function (e) { EZ.viewer.open(viewerList(L), cur, e.currentTarget); });
      fill(0);
      k.add(function () { rings.innerHTML = ''; img.removeAttribute('src'); gsap.set(page, { clearProps: 'transform' }); range.value = 1; });
      EZ.reveal(k, root.querySelectorAll('.work__head > *, .wfb__ctl'));
      if (k.motion) gsap.from(page, { rotationX: 70, autoAlpha: 0, duration: .5, ease: 'power3.out', scrollTrigger: { trigger: page, start: 'top 85%', once: true } });
    } },

    /* slot 1 · AUDIT-01 winner (copied from v3; F7): calm default. Drift 55px/s while in view and only until the first pointer
       contact, which pauses that belt (200ms ramp) and parks both belts; no scroll boost; captions are permanent. */
    b2: { init: function (root, k) {
      var P = ((window.__DATA || {}).projects || []).map(function (p, i) { return { key: p.k, title: p.t, c: p.c, w: p.w, h: p.h, no: i }; });
      var all = P.map(function (p) { return { key: p.key, title: p.title, alt: p.title + ', an Elbaz project' }; });
      // the site camera fires once per opened photo (a 260ms flash), then rests
      function flash() {
        if (!k.motion) return;
        var b = root.querySelectorAll('.wb__burst path'), fl = root.querySelector('.wb__flash');
        gsap.timeline().fromTo(b, { opacity: 1, drawSVG: '0%' }, { drawSVG: '100%', duration: .14, ease: 'power2.out' }).to(b, { opacity: 0, duration: .12 })
          .fromTo(fl, { fill: '#FFF5EE' }, { fill: '#FF5F00', duration: .08, yoyo: true, repeat: 1 }, 0);
      }
      var belts = Array.prototype.slice.call(root.querySelectorAll('.wb__belt'));
      var hold = root.querySelector('.wb__hold');
      var CAT = { k: 'Kitchen', b: 'Bathroom', w: 'Whole home and outdoor' };
      // project codes follow the plan-room numbering of version 1 (P-01 is the same room everywhere)
      var CODE = {};
      document.querySelectorAll('.work1__sheet').forEach(function (sh, i) { var im = sh.querySelector('img[data-img]'); if (im) CODE[im.dataset.img] = 'P-' + (i < 9 ? '0' : '') + (i + 1); });
      EZ.reveal(k, root.querySelectorAll('.work__head > *, .wb__foot'));
      var loops = [];
      belts.forEach(function (belt, bi) {
        var track = belt.querySelector('.wb__track');
        var list = P.filter(function (p) { return belt.dataset.c.indexOf(p.c) > -1; });
        track.innerHTML = list.map(function (p) {
          var code = CODE[p.key] || ('P-' + (p.no < 9 ? '0' : '') + (p.no + 1));
          return '<button type="button" class="wb__tile" data-i="' + p.no + '" data-rx="~t:' + code + '/peek/flash/tl" style="aspect-ratio:' + p.w + ' / ' + p.h + '" aria-label="' + p.title.replace(/"/g, '&quot;') + ', ' + CAT[p.c] + ', open large">' +
            '<img src="' + EZ.img(p.key) + '" width="' + p.w + '" height="' + p.h + '" alt="" loading="lazy" decoding="async"><span class="wb__cap" aria-hidden="true"><b>' + CAT[p.c] + '</b>' + p.title.replace(/</g, '') + '</span></button>';
        }).join('');
        k.on(track, 'click', function (e) { var t = e.target.closest('.wb__tile'); if (t) { flash(); EZ.viewer.open(all, +t.dataset.i, t); } });
      });
      k.add(function () { belts.forEach(function (b) { b.querySelector('.wb__track').innerHTML = ''; }); root.classList.remove('is-static'); });
      if (EZ.bindReactions) EZ.bindReactions(root, k);
      if (!k.motion) { root.classList.add('is-static'); hold.hidden = true; k.add(function () { hold.hidden = false; }); return; }

      var held = false, inView = false, touched = false;
      var builtW = 0;
      function build() {
        // a rebuild keeps where each belt was, and starts from clean transforms (stale xPercent overlaps the tiles)
        var prev = loops.map(function (l) { return { p: l.tl.progress(), slow: l.slow }; });
        loops.forEach(function (l) { l.tl.kill(); });
        builtW = root.querySelector('.wb__belts').clientWidth;
        loops = belts.map(function (belt, bi) {
          var items = belt.querySelectorAll('.wb__tile');
          gsap.set(items, { clearProps: 'transform' });
          var gap = parseFloat(getComputedStyle(belt.querySelector('.wb__track')).columnGap) || 16;
          var tl = EZ.horizontalLoop(items, { repeat: -1, paused: true, speed: .55, paddingRight: gap });
          // a photo is already cut by the left edge at rest [BANK 364 peek offset]
          if (prev[bi]) tl.progress(prev[bi].p); else tl.time(tl.duration() * (bi ? .37 : .13));
          if (bi) tl.reversed(true);
          return { tl: tl, belt: belt, slow: prev[bi] ? prev[bi].slow : { v: 1 } };
        });
        sync();
      }
      function sync() {
        loops.forEach(function (l) {
          var ts = held ? 0 : l.slow.v;
          l.tl.timeScale(Math.max(ts, .0001));
          if (inView && !held) l.tl.paused(false); else l.tl.paused(true);
        });
      }
      // each tile's image decodes before the loop measures widths
      var imgs = root.querySelectorAll('.wb__tile img'), left = imgs.length;
      imgs.forEach(function (im) { if (im.complete) left--; else k.on(im, 'load', function () { if (--left === 0) build(); }); });
      build();
      k.ro(root.querySelector('.wb__belts'), function () { if (root.querySelector('.wb__belts').clientWidth !== builtW) build(); });
      k.add(function () { loops.forEach(function (l) { l.tl.kill(); }); loops = []; });
      loops.forEach(function (l, i) {
        // first contact (hover or press) pauses that belt with a 200ms ramp and parks the other; Run the belts restarts them
        function contact(e) {
          if (e.type === 'pointerenter' && e.pointerType !== 'mouse') return;
          gsap.to(loops[i].slow, { v: 0, duration: .2, ease: 'power1.out', onUpdate: sync, onComplete: park });
        }
        function park() {
          if (held) return;
          touched = true; held = true;
          hold.setAttribute('aria-pressed', 'true'); hold.querySelector('.btn__label').textContent = 'Run the belts';
          loops.forEach(function (o) { o.slow.v = 1; }); sync();
        }
        k.on(l.belt, 'pointerenter', contact);
        k.on(l.belt, 'pointerdown', contact);
        // a focused photo must be in view (WCAG focus not obscured): the belt stops and glides that photo to its centre
        k.on(l.belt, 'focusin', function (e) {
          loops[i].slow.v = 0; sync();
          var t = e.target.closest('.wb__tile'); if (!t) return;
          var br = l.belt.getBoundingClientRect(), tr = t.getBoundingClientRect();
          var dx = (tr.left + tr.width / 2) - (br.left + br.width / 2), tl = loops[i].tl;
          if (Math.abs(dx) < 8) return;
          if (tl.totalTime() < tl.duration() * 2) tl.totalTime(tl.totalTime() + tl.duration() * 10);
          gsap.to(tl, { totalTime: tl.totalTime() + dx / 55, duration: k.motion ? .4 : 0, ease: 'power3.inOut', overwrite: true });
        });
        k.on(l.belt, 'focusout', function (e) { if (!l.belt.contains(e.relatedTarget) && !held) { loops[i].slow.v = 1; sync(); } });
      });
      k.on(hold, 'click', function () {
        held = !held;
        if (!held) loops.forEach(function (o) { o.slow.v = 1; });
        hold.setAttribute('aria-pressed', held ? 'true' : 'false');
        hold.querySelector('.btn__label').textContent = held ? 'Run the belts' : 'Hold the belts';
        sync();
      });
      k.add(function () { hold.setAttribute('aria-pressed', 'false'); hold.querySelector('.btn__label').textContent = 'Hold the belts'; });
      k.io(root.querySelector('.wb__belts'), function (en) { inView = en.isIntersecting; sync(); }, { threshold: 0 });
      gsap.from(belts, { x: function (i) { return i ? -40 : 40; }, autoAlpha: 0, duration: .3, ease: 'power2.out', stagger: .06, scrollTrigger: { trigger: root.querySelector('.wb__belts'), start: 'top 85%', once: true } });
    } },

    /* v1 · The plan room [BANK R10 grid-to-fullscreen + BANK 157 push grid via Flip] */
    b3: { init: function (root, k) {
      var grid = root.querySelector('.work1__grid');
      var items = Array.prototype.slice.call(root.querySelectorAll('.work1__it'));
      var fbtns = Array.prototype.slice.call(root.querySelectorAll('.work1__f'));
      var more = root.querySelector('.work1__more'), moreLabel = more.querySelector('.btn__label');
      var filter = 'all', all = false, open = null;
      // [AUDIT-01 F7 loser V1] label truth: the first chip says what it shows, featured 12 until all 26 are dealt
      var chipLbl = fbtns[0].querySelector('.btn__label'), nFeat = items.filter(function (it) { return it.dataset.feat; }).length;
      function chip() { chipLbl.innerHTML = all ? 'All <span class="nums">' + items.length + '</span>' : 'Featured <span class="nums">' + nFeat + '</span>'; }
      chip();
      EZ.reveal(k, root.querySelectorAll('.work__head > *'));
      function flip(fn) {
        if (!k.motion) { fn(); return; }
        var state = Flip.getState(items.concat([more]));
        fn();
        k.ctx.add(function () {
          Flip.from(state, { duration: .45, ease: 'power3.inOut', absolute: false, scale: false, nested: true,
            onEnter: function (els) { return gsap.fromTo(els, { autoAlpha: 0, scale: .92 }, { autoAlpha: 1, scale: 1, duration: .3, ease: 'power3.out' }); },
            onLeave: function (els) { return gsap.to(els, { autoAlpha: 0, duration: .2 }); } });
        });
      }
      function apply() {
        items.forEach(function (it) {
          var show = (filter === 'all' || it.dataset.c === filter) && (all || filter !== 'all' || it.dataset.feat);
          it.hidden = !show;
        });
        more.hidden = filter !== 'all';
      }
      function setOpen(it) {
        if (open) { open.classList.remove('is-open'); open.querySelector('.work1__sheet').setAttribute('aria-expanded', 'false'); }
        open = it && it !== open ? it : null;
        if (open) { open.classList.add('is-open'); open.querySelector('.work1__sheet').setAttribute('aria-expanded', 'true'); }
      }
      apply();
      fbtns.forEach(function (b) {
        k.on(b, 'click', function () {
          if (b.dataset.f === filter) return;
          filter = b.dataset.f;
          fbtns.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
          flip(function () { setOpen(null); apply(); });
        });
      });
      k.on(more, 'click', function () {
        all = !all;
        more.setAttribute('aria-expanded', all ? 'true' : 'false');
        moreLabel.textContent = all ? 'Show the featured twelve' : 'Show all ' + items.length + ' projects';
        chip();
        flip(apply);
      });
      items.forEach(function (it) {
        var sheet = it.querySelector('.work1__sheet');
        k.on(sheet, 'click', function () {
          flip(function () { setOpen(it); });
          if (open) { var top = it.getBoundingClientRect().top; if (top < 80 || top > innerHeight * .5) k.timeout(function () { EZ.scrollTo(it); }, k.motion ? 620 : 0); }
        });
      });
      k.on(root, 'keydown', function (e) { if (e.key === 'Escape' && open) { var o = open; flip(function () { setOpen(null); }); o.querySelector('.work1__sheet').focus(); } });
      k.add(function () { setOpen(null); items.forEach(function (it) { it.hidden = false; }); more.hidden = false; fbtns.forEach(function (x, i) { x.setAttribute('aria-pressed', i ? 'false' : 'true'); }); moreLabel.textContent = 'Show all ' + items.length + ' projects'; more.setAttribute('aria-expanded', 'false'); all = false; chip(); });
      if (k.motion) gsap.from(items.filter(function (it) { return !it.hidden; }), { y: 20, autoAlpha: 0, duration: .3, ease: 'power2.out', stagger: .03, scrollTrigger: { trigger: grid, start: 'top 85%', once: true } });
    } },

    /* v2 · On the turntable [BANK 88] */
    b4: { init: function (root, k) {
      var D = data(), stage = root.querySelector('.work2__stage'), track = root.querySelector('.work2__track');
      var arc = root.querySelector('.work2__arc'), n = root.querySelector('.work2__n'), t = root.querySelector('.work2__t');
      track.innerHTML = D.map(function (d, i) {
        return '<figure class="work2__card" data-i="' + i + '"><img src="' + EZ.img(d.k) + '" width="' + d.w + '" height="' + d.h + '" alt="' + d.t.replace(/&/g, '&amp;').replace(/"/g, '&quot;') + ', an Elbaz project"' + (i > 3 ? ' loading="lazy"' : '') + '></figure>';
      }).join('');
      var cards = Array.prototype.slice.call(track.querySelectorAll('.work2__card'));
      // the protractor: ticks across 56 degrees, a needle marks the turn
      var ticks = '';
      for (var a = -28; a <= 28; a += 2) { var r = a * Math.PI / 180, big = a % 14 === 0; ticks += '<path class="' + (big ? 'tkm' : 'tk') + '" d="M' + (400 + Math.sin(r) * 330).toFixed(1) + ' ' + (360 - Math.cos(r) * 330).toFixed(1) + 'L' + (400 + Math.sin(r) * (big ? 312 : 320)).toFixed(1) + ' ' + (360 - Math.cos(r) * (big ? 312 : 320)).toFixed(1) + '"/>'; }
      arc.innerHTML = '<path class="arc" d="M' + (400 - Math.sin(.49) * 330).toFixed(1) + ' ' + (360 - Math.cos(.49) * 330).toFixed(1) + 'A330 330 0 0 1 ' + (400 + Math.sin(.49) * 330).toFixed(1) + ' ' + (360 - Math.cos(.49) * 330).toFixed(1) + '"/>' + ticks + '<path class="ndl" d="M400 24 l-6 -14 h12 z"/>';
      var ndl = arc.querySelector('.ndl');
      k.add(function () { track.innerHTML = ''; arc.innerHTML = ''; stage.style.removeProperty('--tint'); });
      var cur = -1, MAXROT = 28, DEPTH = 140, MINS = .92;
      function frame() {
        var tr = track.getBoundingClientRect(), cx = tr.left + tr.width / 2, best = 0, bd = 1e9;
        cards.forEach(function (c, i) {
          var r = c.getBoundingClientRect(), d = (r.left + r.width / 2 - cx) / r.width;
          if (Math.abs(d) < bd) { bd = Math.abs(d); best = i; }
          if (k.motion) {
            var dd = EZ.clamp(d, -2.5, 2.5);
            c.style.transform = 'translateZ(' + (-Math.abs(dd) * DEPTH).toFixed(1) + 'px) rotateY(' + (-EZ.clamp(dd, -1, 1) * MAXROT).toFixed(2) + 'deg) scale(' + Math.max(MINS, 1 - Math.abs(dd) * .04).toFixed(3) + ')';
          }
          c.style.opacity = Math.abs(d) > 2.6 ? .4 : 1;
        });
        // needle follows the fractional turn of the centre card
        var cr = cards[best].getBoundingClientRect(), frac = EZ.clamp((cr.left + cr.width / 2 - cx) / cr.width, -1, 1);
        ndl.setAttribute('transform', 'rotate(' + (-frac * MAXROT).toFixed(2) + ' 400 360)');
        if (best !== cur) {
          cur = best;
          var d = D[best];
          n.textContent = (best < 9 ? '0' : '') + (best + 1) + ' / ' + D.length;
          t.textContent = d.t;
          if (k.motion) k.ctx.add(function () { gsap.to(stage, { '--tint': d.tint, duration: .5, ease: 'power2.out', overwrite: 'auto' }); });
          else stage.style.setProperty('--tint', d.tint);
        }
      }
      var pend = false;
      k.on(track, 'scroll', function () { if (!pend) { pend = true; requestAnimationFrame(function () { pend = false; frame(); }); } }, { passive: true });
      k.ro(track, frame);
      frame();
      function go(i) { i = EZ.clamp(i, 0, cards.length - 1); var c = cards[i]; track.scrollTo({ left: c.offsetLeft - (track.clientWidth - c.offsetWidth) / 2, behavior: k.motion ? 'smooth' : 'auto' }); }
      k.on(root.querySelector('.work2__prev'), 'click', function () { go(cur - 1); });
      k.on(root.querySelector('.work2__next'), 'click', function () { go(cur + 1); });
      k.on(track, 'keydown', function (e) { if (e.key === 'ArrowRight') { e.preventDefault(); go(cur + 1); } else if (e.key === 'ArrowLeft') { e.preventDefault(); go(cur - 1); } });
      // mouse drag-to-scroll (touch and trackpads scroll natively)
      if (k.fine) {
        var down = null;
        // [AUDIT-01 F7 loser V2] a drag carries its energy: the release velocity projects 300ms ahead and the nearest card there wins
        k.on(track, 'pointerdown', function (e) { if (e.pointerType !== 'mouse') return; down = { x: e.clientX, l: track.scrollLeft, moved: false, v: 0, px: e.clientX, pt: e.timeStamp }; track.style.scrollSnapType = 'none'; track.setPointerCapture(e.pointerId); });
        k.on(track, 'pointermove', function (e) {
          if (!down) return; var dx = e.clientX - down.x; if (Math.abs(dx) > 5) down.moved = true; track.scrollLeft = down.l - dx;
          var dt = e.timeStamp - down.pt; if (dt > 0) { down.v = .8 * ((e.clientX - down.px) / dt) + .2 * down.v; down.px = e.clientX; down.pt = e.timeStamp; }
        });
        function up() {
          if (!down) return;
          var proj = track.scrollLeft - down.v * 300 + track.clientWidth / 2, best = cur, bd = Infinity;
          down = null; track.style.scrollSnapType = '';
          cards.forEach(function (c, i) { var d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - proj); if (d < bd) { bd = d; best = i; } });
          go(best);
        }
        k.on(track, 'pointerup', up); k.on(track, 'pointercancel', up);
        k.add(function () { track.style.scrollSnapType = ''; });
      }
      EZ.reveal(k, root.querySelectorAll('.work__head > *'));
    } },

    /* v3 · Taped to the board [BANK Lagom deck: slit clip inset(50% 0 50% 0); CSS sticky instead of a pin] */
    /* v3 · On the belts [BANK Q161 horizontalLoop, BANK 364 peek]: kitchens run left, bathrooms and whole homes run right,
       every photo at the same velocity; scroll speed adds to the belts, hovering a belt slows it to a quarter,
       a photo opens large in the viewer; belts stop off-screen; reduced motion leaves two scrollable rows */
    b1: { init: function (root, k) {
      var P = ((window.__DATA || {}).projects || []).map(function (p, i) { return { key: p.k, title: p.t, c: p.c, w: p.w, h: p.h, no: i }; });
      var all = P.map(function (p) { return { key: p.key, title: p.title, alt: p.title + ', an Elbaz project' }; });
      var belts = Array.prototype.slice.call(root.querySelectorAll('.work3__belt'));
      var hold = root.querySelector('.work3__hold');
      var CAT = { k: 'Kitchen', b: 'Bathroom', w: 'Whole home and outdoor' };
      // project codes follow the plan-room numbering of version 1 (P-01 is the same room everywhere)
      var CODE = {};
      document.querySelectorAll('.work1__sheet').forEach(function (sh, i) { var im = sh.querySelector('img[data-img]'); if (im) CODE[im.dataset.img] = 'P-' + (i < 9 ? '0' : '') + (i + 1); });
      EZ.reveal(k, root.querySelectorAll('.work__head > *, .work3__foot'));
      var loops = [];
      belts.forEach(function (belt, bi) {
        var track = belt.querySelector('.work3__track');
        var list = P.filter(function (p) { return belt.dataset.c.indexOf(p.c) > -1; });
        track.innerHTML = list.map(function (p) {
          var code = CODE[p.key] || ('P-' + (p.no < 9 ? '0' : '') + (p.no + 1));
          return '<button type="button" class="work3__tile" data-i="' + p.no + '" data-rx="~t:' + code + '/drop/flash/tl" style="aspect-ratio:' + p.w + ' / ' + p.h + '" aria-label="' + p.title.replace(/"/g, '&quot;') + ', ' + CAT[p.c] + ', open large">' +
            '<img src="' + EZ.img(p.key) + '" width="' + p.w + '" height="' + p.h + '" alt="" loading="lazy" decoding="async"><span class="work3__cap" aria-hidden="true"><b>' + code + ' · ' + CAT[p.c] + '</b>' + p.title.replace(/</g, '') + '</span></button>';
        }).join('');
        k.on(track, 'click', function (e) { var t = e.target.closest('.work3__tile'); if (t) EZ.viewer.open(all, +t.dataset.i, t); });
      });
      k.add(function () { belts.forEach(function (b) { b.querySelector('.work3__track').innerHTML = ''; }); root.classList.remove('is-static'); });
      if (EZ.bindReactions) EZ.bindReactions(root, k);
      if (!k.motion) { root.classList.add('is-static'); hold.hidden = true; k.add(function () { hold.hidden = false; }); return; }

      var held = false, inView = false, boost = { v: 1 };
      var builtW = 0;
      function build() {
        // a rebuild keeps where each belt was, and starts from clean transforms (stale xPercent overlaps the tiles)
        var prev = loops.map(function (l) { return { p: l.tl.progress(), slow: l.slow }; });
        loops.forEach(function (l) { l.tl.kill(); });
        builtW = root.querySelector('.work3__belts').clientWidth;
        loops = belts.map(function (belt, bi) {
          var items = belt.querySelectorAll('.work3__tile');
          gsap.set(items, { clearProps: 'transform' });
          var gap = parseFloat(getComputedStyle(belt.querySelector('.work3__track')).columnGap) || 16;
          var tl = EZ.horizontalLoop(items, { repeat: -1, paused: true, speed: .55, paddingRight: gap });
          // a photo is already cut by the left edge at rest [BANK 364 peek offset]
          if (prev[bi]) tl.progress(prev[bi].p); else tl.time(tl.duration() * (bi ? .37 : .13));
          if (bi) tl.reversed(true);
          return { tl: tl, belt: belt, slow: prev[bi] ? prev[bi].slow : { v: 1 } };
        });
        sync();
      }
      function sync() {
        loops.forEach(function (l) {
          var ts = held ? 0 : l.slow.v * boost.v;
          l.tl.timeScale(Math.max(ts, .0001));
          if (inView && !held) l.tl.paused(false); else l.tl.paused(true);
        });
      }
      // each tile's image decodes before the loop measures widths
      var imgs = root.querySelectorAll('.work3__tile img'), left = imgs.length;
      imgs.forEach(function (im) { if (im.complete) left--; else k.on(im, 'load', function () { if (--left === 0) build(); }); });
      build();
      k.ro(root.querySelector('.work3__belts'), function () { if (root.querySelector('.work3__belts').clientWidth !== builtW) build(); });
      k.add(function () { loops.forEach(function (l) { l.tl.kill(); }); loops = []; });
      loops.forEach(function (l, i) {
        k.on(l.belt, 'pointerenter', function (e) { if (e.pointerType === 'mouse') gsap.to(loops[i].slow, { v: .25, duration: .3, onUpdate: sync }); });
        k.on(l.belt, 'pointerleave', function () { gsap.to(loops[i].slow, { v: 1, duration: .3, onUpdate: sync }); });
        // a focused photo must be in view (WCAG focus not obscured): the belt stops and glides that photo to its centre
        k.on(l.belt, 'focusin', function (e) {
          loops[i].slow.v = 0; sync();
          var t = e.target.closest('.work3__tile'); if (!t) return;
          var br = l.belt.getBoundingClientRect(), tr = t.getBoundingClientRect();
          var dx = (tr.left + tr.width / 2) - (br.left + br.width / 2), tl = loops[i].tl;
          if (Math.abs(dx) < 8) return;
          if (tl.totalTime() < tl.duration() * 2) tl.totalTime(tl.totalTime() + tl.duration() * 10);
          gsap.to(tl, { totalTime: tl.totalTime() + dx / 55, duration: k.motion ? .4 : 0, ease: 'power3.inOut', overwrite: true });
        });
        k.on(l.belt, 'focusout', function (e) { if (!l.belt.contains(e.relatedTarget)) { loops[i].slow.v = 1; sync(); } });
      });
      k.on(hold, 'click', function () {
        held = !held;
        hold.setAttribute('aria-pressed', held ? 'true' : 'false');
        hold.querySelector('.btn__label').textContent = held ? 'Run the belts' : 'Hold the belts';
        sync();
      });
      k.add(function () { hold.setAttribute('aria-pressed', 'false'); hold.querySelector('.btn__label').textContent = 'Hold the belts'; });
      k.io(root.querySelector('.work3__belts'), function (en) { inView = en.isIntersecting; sync(); }, { threshold: 0 });
      // scroll velocity adds to the belts, then settles back [Q161 driven by ScrollTrigger velocity]
      var st = ScrollTrigger.create({ trigger: root, start: 'top bottom', end: 'bottom top', onUpdate: function (self) {
        var v = Math.min(4, 1 + Math.abs(self.getVelocity()) / 500);
        if (v > boost.v) { boost.v = v; sync(); gsap.to(boost, { v: 1, duration: .8, ease: 'power2.out', overwrite: true, onUpdate: sync }); }
      } });
      k.add(function () { st.kill(); });
      gsap.from(belts, { x: function (i) { return i ? -40 : 40; }, autoAlpha: 0, duration: .3, ease: 'power2.out', stagger: .06, scrollTrigger: { trigger: root.querySelector('.work3__belts'), start: 'top 85%', once: true } });
    } }
  });
})();
