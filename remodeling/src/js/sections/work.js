/* FINALIZE · Home 7 · Projects. Titles are the firm's own (data/projects.json from FACTS.md); photos are the firm's own.
   V1 · two rows of hung frames, opposite directions (GSAP seamless loop). Each row's speed is ONE smoothed value: the
        pointer on a row slows it to a crawl and sets the frame under it level; scroll quickens both a little; as the
        section leaves, the rows decelerate to rest [PHASE1-PLAN row 7 OUT]. A pause control holds them (WCAG 2.2.2).
        A focused frame stops its row and glides into view (focus not obscured). Reduced motion: two still strips.
   V2 · the job binder: a two-faced leaf turns at the spine (front: this photograph; back: the next job sheet), driven by
        the buttons, the arrow keys, or a drag on the page corner (release past a third completes, before it the leaf
        settles back). On first view the cover opens. Phones and reduced motion: the pages swap without the leaf. */
(function () {
  var CAT = { k: 'Kitchen', b: 'Bathroom', w: 'Whole home and outdoor' };
  function data() { return (window.__DATA || {}).projects || []; }
  // plan-room numbering (P-01 is the same room in both versions); two photos whose subject does not match their title
  // (k-walnut-marble shows a hallway, k-emerald-shaker a laundry run; owner item) stay out
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
  var TILT = [-1.6, 1.1, -.7, 1.4, -1.2, .8, -.4, 1.7, -1, .6, 1.3, -1.5];

  EZ.section('work', {
    1: { init: function (root, k) {
      var L = listed(), all = viewerList(L), hold = root.querySelector('.pj__hold'), label = hold.querySelector('.btn__label');
      var rows = Array.prototype.slice.call(root.querySelectorAll('.pj__row'));
      rows.forEach(function (row) {
        var tr = row.querySelector('.pj__track'), n = 0;
        tr.innerHTML = L.map(function (p, i) {
          if (row.dataset.c.indexOf(p.c) < 0) return '';
          var t = TILT[(n++) % TILT.length];
          return '<button type="button" class="pj__f" data-i="' + i + '" style="--tilt:' + t + 'deg;--tiltn:' + (t / 1.7).toFixed(2) + '" aria-label="' + esc(p.title) + ', ' + CAT[p.c] + ', open large">' +
            '<span class="pj__hang"><span class="pj__wire" aria-hidden="true"><svg viewBox="0 0 100 26" preserveAspectRatio="none"><path vector-effect="non-scaling-stroke" d="M10 26 L50 1 L90 26"/></svg></span>' +
            '<span class="pj__fr"><span class="pj__lvl" aria-hidden="true"><span class="pj__bub"></span></span><img src="' + EZ.img(p.key) + '" width="' + p.w + '" height="' + p.h + '" alt="" loading="lazy" decoding="async"></span></span>' +
            '<span class="pj__cap" aria-hidden="true"><span class="pj__code">' + p.code + ' &middot; ' + CAT[p.c] + '</span><span class="pj__t">' + esc(p.title) + '</span></span></button>';
        }).join('');
        k.on(tr, 'click', function (e) { var f = e.target.closest('.pj__f'); if (f) EZ.viewer.open(all, +f.dataset.i, f.querySelector('img')); });
      });
      k.add(function () { rows.forEach(function (r) { r.querySelector('.pj__track').innerHTML = ''; }); root.classList.remove('is-static'); hold.hidden = false; });
      EZ.reveal(k, root.querySelectorAll('.pj__head > *, .pj__foot'));
      if (!k.motion) { root.classList.add('is-static'); hold.hidden = true; return; }

      // the frames are hung as the rows arrive: each drops onto the rail and its swing settles once (no idle motion)
      var frames = root.querySelectorAll('.pj__f');
      gsap.set(frames, { y: -22, autoAlpha: 0 });
      var hang = ScrollTrigger.create({ trigger: root.querySelector('.pj__rows'), start: 'top 82%', once: true, onEnter: function () {
        gsap.to(frames, { y: 0, autoAlpha: 1, duration: .5, ease: 'power4.out', stagger: { each: .04, from: 'start' } });
      } });
      k.add(function () { hang.kill(); gsap.set(frames, { clearProps: 'all' }); });

      var loops = [], held = false, vel = 0, builtW = 0;
      function build() {
        var prev = loops.map(function (l) { return l.tl.progress(); });
        loops.forEach(function (l) { l.tl.kill(); });
        builtW = root.clientWidth;
        loops = rows.map(function (row, bi) {
          var items = row.querySelectorAll('.pj__f'), gap = parseFloat(getComputedStyle(row.querySelector('.pj__track')).columnGap) || 32;
          gsap.set(items, { clearProps: 'transform,x,xPercent' });
          var tl = EZ.horizontalLoop(items, { repeat: -1, paused: true, speed: .45, paddingRight: gap });
          if (prev[bi] != null) tl.progress(prev[bi]); else tl.time(tl.duration() * (bi ? .41 : .07));
          // GSAP keeps 'reversed' as the SIGN of timeScale: the second row runs with a negative scale, never reversed(true)
          return { tl: tl, row: row, s: 1, dir: bi ? -1 : 1, over: false, focus: false };
        });
      }
      var imgs = root.querySelectorAll('.pj__f img'), left = imgs.length;
      imgs.forEach(function (im) { if (im.complete) left--; else k.on(im, 'load', function () { if (--left === 0) build(); }); });
      build();
      k.ro(root, function () { if (Math.abs(root.clientWidth - builtW) > 2) build(); });
      k.add(function () { loops.forEach(function (l) { l.tl.kill(); }); loops = []; });

      var vt = ScrollTrigger.create({ trigger: root, start: 'top bottom', end: 'bottom top', onUpdate: function (self) { vel = self.getVelocity(); } });
      k.add(function () { vt.kill(); });
      // one speed per row, smoothed: held 0, pointer or focus on the row .1, scroll adds up to +1.2; leaving brings it to rest
      k.raf(function (dt) {
        var r = root.getBoundingClientRect(), vh = innerHeight;
        var vis = r.bottom < 0 || r.top > vh ? 0 : EZ.clamp((r.bottom - vh * .12) / (vh * .4), 0, 1);
        vel *= .9;
        loops.forEach(function (l) {
          var target = held ? 0 : (l.over || l.focus) ? .1 : 1 + Math.min(Math.abs(vel) / 2400, 1.2);
          target *= vis;
          l.s += (target - l.s) * Math.min(1, dt * (target < l.s ? 5 : 2.5));
          if (l.s < .004) { if (!l.tl.paused()) l.tl.paused(true); }
          else { l.tl.timeScale(l.dir * l.s); if (l.tl.paused()) l.tl.paused(false); }
        });
      });
      loops.forEach(function (l, i) {
        k.on(l.row, 'pointerenter', function (e) { if (e.pointerType === 'mouse') loops[i].over = true; });
        k.on(l.row, 'pointerleave', function () { loops[i].over = false; });
        // a focused frame must be in view: the row stops and glides that frame towards the middle
        k.on(l.row, 'focusin', function (e) {
          loops[i].focus = true; loops[i].s = 0; loops[i].tl.paused(true);
          var f = e.target.closest('.pj__f'); if (!f) return;
          var rr = l.row.getBoundingClientRect(), fr = f.getBoundingClientRect(), dx = (fr.left + fr.width / 2) - (rr.left + rr.width / 2), tl = loops[i].tl;
          if (Math.abs(dx) < 8) return;
          if (tl.totalTime() < tl.duration() * 2) tl.totalTime(tl.totalTime() + tl.duration() * 10);
          gsap.to(tl, { totalTime: tl.totalTime() + dx / (100 * .45), duration: .45, ease: 'power3.inOut', overwrite: true });
        });
        k.on(l.row, 'focusout', function (e) { if (!l.row.contains(e.relatedTarget)) loops[i].focus = false; });
      });
      k.on(hold, 'click', function () {
        held = !held;
        hold.setAttribute('aria-pressed', held ? 'true' : 'false');
        label.textContent = held ? 'Run the rows' : 'Pause the rows';
      });
      k.add(function () { hold.setAttribute('aria-pressed', 'false'); label.textContent = 'Pause the rows'; });
    } },

    // RETIRED (Final: one version per section): the job binder's markup left the file; its definition is kept for the
    // record under a key no version uses. NEW VERSIONS: slot 2 is "Room chapters" (below).
    binder: { init: function (root, k) {
      var L = listed(), all = viewerList(L), n = L.length, cur = 0, busy = false;
      var book = root.querySelector('.jb__book'), spread = root.querySelector('.jb__spread');
      var lSheet = root.querySelector('.jb__page--l .jb__sheet'), rPhoto = root.querySelector('.jb__page--r .jb__photo');
      var leaf = root.querySelector('.jb__leaf'), fPhoto = leaf.querySelector('.jb__face--f .jb__photo'), bSheet = leaf.querySelector('.jb__face--b .jb__sheet');
      var faces = leaf.querySelectorAll('.jb__face'), pg = root.querySelector('.jb__pg'), tabs = Array.prototype.slice.call(root.querySelectorAll('.jb__tab'));
      var rings = root.querySelector('.jb__rings'), corner = root.querySelector('.jb__corner');

      function sheet(p, live) {
        return '<p class="jb__code"><b>' + p.code + '</b><span>' + CAT[p.c] + '</span></p><h3 class="jb__title">' + esc(p.title) + '</h3>' +
          '<p class="jb__line">Our own photograph of the finished room.</p>' +
          (live ? '<button type="button" class="btn btn--ghost jb__open"><span class="btn__label">See it large</span></button>' : '<span class="btn btn--ghost jb__open"><span class="btn__label">See it large</span></span>');
      }
      function photo(p, live) {
        return '<div class="jb__mount"><img src="' + EZ.img(p.key) + '" width="' + p.w + '" height="' + p.h + '" alt="' + (live ? esc(p.title) + ', an Elbaz project' : '') + '" decoding="async"><i></i><i></i><i></i><i></i></div>';
      }
      function say() {
        var p = L[cur];
        pg.textContent = p.code + ' · ' + CAT[p.c];
        tabs.forEach(function (t) { t.setAttribute('aria-current', t.dataset.c === p.c ? 'true' : 'false'); });
      }
      function setL(i) { lSheet.innerHTML = sheet(L[i], true); }
      function setR(i) { rPhoto.innerHTML = photo(L[i], true); }
      setL(0); setR(0); say();
      k.on(root, 'click', function (e) { if (e.target.closest('.jb__page--l .jb__open')) EZ.viewer.open(all, cur, rPhoto.querySelector('img')); });

      // the rings: drawn to the spread's real height, one every 72px
      function drawRings() {
        var h = spread.clientHeight, c = Math.max(4, Math.floor(h / 72)), s = '';
        rings.setAttribute('viewBox', '0 0 40 ' + h);
        for (var i = 0; i < c; i++) {
          var y = (h / c) * (i + .5);
          s += '<circle class="hole" cx="7" cy="' + y.toFixed(1) + '" r="3"/><circle class="hole" cx="33" cy="' + y.toFixed(1) + '" r="3"/>' +
            '<path class="ring" d="M7 ' + y.toFixed(1) + ' C7 ' + (y - 16).toFixed(1) + ' 33 ' + (y - 16).toFixed(1) + ' 33 ' + y.toFixed(1) + '"/>' +
            '<path class="ring-h" d="M11 ' + (y - 6).toFixed(1) + ' C15 ' + (y - 11).toFixed(1) + ' 25 ' + (y - 11).toFixed(1) + ' 29 ' + (y - 6).toFixed(1) + '"/>';
        }
        rings.innerHTML = s;
      }
      var wide = function () { return matchMedia('(min-width: 901px)').matches; };
      drawRings(); k.ro(spread, drawRings);
      k.add(function () { rings.innerHTML = ''; lSheet.innerHTML = rPhoto.innerHTML = fPhoto.innerHTML = bSheet.innerHTML = ''; gsap.set(leaf, { clearProps: 'all' }); });

      function shade() { var p = this.progress(), v = (Math.sin(p * Math.PI) * .55).toFixed(3); faces.forEach(function (f) { f.style.setProperty('--sh', v); }); }
      // a turn is a paused timeline plus what to do if it completes or is let go early
      function turn(dir) {
        var j = (cur + dir + n) % n, from = cur;
        if (dir > 0) {
          fPhoto.innerHTML = photo(L[from]); bSheet.innerHTML = sheet(L[j]); setR(j);
          gsap.set(leaf, { rotationY: 0, visibility: 'visible' });
          var tl = gsap.timeline({ paused: true, onUpdate: shade }).to(leaf, { rotationY: -180, duration: .8, ease: 'power2.inOut' });
          return { tl: tl, done: function () { cur = j; setL(j); gsap.set(leaf, { visibility: 'hidden' }); say(); }, undo: function () { setR(from); gsap.set(leaf, { visibility: 'hidden' }); } };
        }
        fPhoto.innerHTML = photo(L[j]); bSheet.innerHTML = sheet(L[from]); setL(j);
        gsap.set(leaf, { rotationY: -180, visibility: 'visible' });
        var tb = gsap.timeline({ paused: true, onUpdate: shade }).to(leaf, { rotationY: 0, duration: .8, ease: 'power2.inOut' });
        return { tl: tb, done: function () { cur = j; setR(j); gsap.set(leaf, { visibility: 'hidden' }); say(); }, undo: function () { setL(from); gsap.set(leaf, { visibility: 'hidden' }); } };
      }
      function swap(j) {   // phones and reduced motion: the pages change without the leaf
        cur = j; setL(j); setR(j); say();
        if (k.motion) gsap.fromTo(spread.querySelectorAll('.jb__page > *'), { autoAlpha: 0 }, { autoAlpha: 1, duration: .25, ease: 'power2.out' });
      }
      function go(dir) {
        if (busy) return;
        if (!k.motion || !wide()) { swap((cur + dir + n) % n); return; }
        busy = true;
        var t = turn(dir);
        t.tl.eventCallback('onComplete', function () { t.done(); busy = false; });
        t.tl.play();
      }
      function jump(j) {
        if (busy || j === cur) return;
        if (!k.motion || !wide()) { swap(j); return; }
        // one leaf turn carries you there: the leaf's far side already shows the destination
        busy = true;
        var dir = j > cur ? 1 : -1, keep = cur;
        cur = (j - dir + n) % n;           // turn() reads cur as the page the leaf leaves from
        var t = turn(dir);
        if (dir > 0) { fPhoto.innerHTML = photo(L[keep]); } else { bSheet.innerHTML = sheet(L[keep]); }
        t.tl.eventCallback('onComplete', function () { t.done(); busy = false; });
        t.tl.play();
      }
      k.on(root.querySelector('.jb__next'), 'click', function () { go(1); });
      k.on(root.querySelector('.jb__prev'), 'click', function () { go(-1); });
      k.on(book, 'keydown', function (e) {
        if (e.target.closest('.jb__tab')) return;
        if (e.key === 'ArrowRight') { e.preventDefault(); go(1); } else if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
      });
      tabs.forEach(function (t) {
        k.on(t, 'click', function () { for (var i = 0; i < n; i++) if (L[i].c === t.dataset.c) { jump(i); return; } });
      });

      // the dog-ear: drag it towards the spine; past a third the page turns, before that it settles back
      var drag = null;
      k.on(corner, 'pointerdown', function (e) {
        if (busy || !k.motion || !wide()) return;
        busy = true; corner.setPointerCapture(e.pointerId);
        drag = { x: e.clientX, w: spread.clientWidth / 2, t: turn(1) };
      });
      k.on(corner, 'pointermove', function (e) { if (drag) drag.t.tl.progress(EZ.clamp((drag.x - e.clientX) / (drag.w * 1.6), 0, 1)); });
      function release() {
        if (!drag) return;
        var d = drag; drag = null;
        var fwd = d.t.tl.progress() > .33;
        gsap.to(d.t.tl, { progress: fwd ? 1 : 0, duration: .35, ease: 'power2.out', onComplete: function () { if (fwd) d.t.done(); else d.t.undo(); busy = false; } });
      }
      k.on(corner, 'pointerup', release); k.on(corner, 'pointercancel', release);

      // first view: the cover opens onto page one
      if (k.motion && wide()) {
        fPhoto.innerHTML = '<div class="jb__cover"><span class="jb__cvt">Job binder</span><span class="jb__cvn">Elbaz Construction</span><span class="jb__cvl">Licensed, bonded &amp; insured &middot; CBC1265280</span></div>';
        bSheet.innerHTML = sheet(L[0]);
        gsap.set(leaf, { rotationY: 0, visibility: 'visible' });
        gsap.set(spread.querySelector('.jb__page--l'), { autoAlpha: 0 });
        busy = true;
        var open = ScrollTrigger.create({ trigger: book, start: 'top 70%', once: true, onEnter: function () {
          gsap.timeline({ onComplete: function () { gsap.set(leaf, { visibility: 'hidden' }); busy = false; } })
            .set(spread.querySelector('.jb__page--l'), { autoAlpha: 1 }, .5)
            .to(leaf, { rotationY: -180, duration: 1, ease: 'power2.inOut', onUpdate: shade }, 0);
        } });
        k.add(function () { open.kill(); busy = false; gsap.set(spread.querySelector('.jb__page--l'), { clearProps: 'all' }); });
      }
    } },

    /* NEW VERSIONS · V2 "Room chapters" (governing reference: Boffi, rooms as chapters under one narrative). One room at
       full size; three chapters (Kitchens, Bathrooms, Whole home and outdoor) as a real tablist; a filmstrip of the chapter;
       previous / next walk through every room, chapter to chapter. Signature: the shutter. The room on show splits into
       vertical slats that turn edge-on one after another, in the direction you travelled, uncovering the next room behind
       them [S0063 never two crossfaded states, S0062]. First view: the shutters open on the first kitchen. Swipe on the
       stage (touch), tap or click it to see the room large. Reduced motion: rooms switch at once [S0400]. */
    2: { init: function (root, k) {
      var L = listed(), all = viewerList(L);
      var CH = [['k', 'Kitchens'], ['b', 'Bathrooms'], ['w', 'Whole home and outdoor']];
      var stage = root.querySelector('.rc__stage'), img = root.querySelector('.rc__img'), slatBox = root.querySelector('.rc__slats'), hit = root.querySelector('.rc__hit');
      var tabsEl = root.querySelector('.rc__tabs'), strip = root.querySelector('.rc__strip'), code = root.querySelector('.rc__code'), title = root.querySelector('.rc__t');
      var prev = root.querySelector('.rc__prev'), next = root.querySelector('.rc__next'), openB = root.querySelector('.rc__open');
      var idxOf = {}; L.forEach(function (p, i) { idxOf[p.key] = i; });
      var byC = {}; CH.forEach(function (c) { byC[c[0]] = L.filter(function (p) { return p.c === c[0] || (c[0] === 'w' && p.c === 'o'); }); });
      var flat = []; CH.forEach(function (c) { byC[c[0]].forEach(function (p) { flat.push(p); }); });   // the walk: chapter by chapter
      tabsEl.innerHTML = CH.map(function (c, i) { return '<button type="button" role="tab" class="rc__tab" id="rc-tab-' + c[0] + '" data-c="' + c[0] + '" aria-selected="' + (i ? 'false' : 'true') + '" aria-controls="rc-panel" tabindex="' + (i ? -1 : 0) + '"><span class="nums">0' + (i + 1) + '</span><span class="rc__tn">' + c[1] + '</span></button>'; }).join('');
      var tabs = Array.prototype.slice.call(tabsEl.children), cur = null, busy = null;
      k.add(function () { tabsEl.innerHTML = ''; strip.innerHTML = ''; slatBox.innerHTML = ''; img.removeAttribute('src'); });

      function fillStrip(c) {
        strip.innerHTML = byC[c].map(function (p) { return '<button type="button" class="rc__th" data-k="' + p.key + '" aria-label="' + esc(p.title) + '" aria-pressed="false" tabindex="-1"><img src="' + EZ.img(p.key) + '" alt="" decoding="async" draggable="false"></button>'; }).join('');
      }
      function cover(W, H, p) {   // the photograph's cover crop at the stage's size (centre), so slats line up with it
        var a = p.w / p.h, bw, bh; if (a > W / H) { bh = H; bw = H * a; } else { bw = W; bh = W / a; }
        return { w: bw, h: bh, x: (W - bw) / 2, y: (H - bh) / 2 };
      }
      function shutter(from, dir) {   // the room on show becomes slats that turn edge-on, uncovering the room behind
        var W = stage.clientWidth, H = stage.clientHeight, n = W < 600 ? 6 : 9, sw = W / n, cv = from ? cover(W, H, from) : null, html = '';
        for (var j = 0; j < n; j++) {
          var st = 'left:' + (j * sw).toFixed(2) + 'px;width:' + (sw + .6).toFixed(2) + 'px;';
          if (cv) st += 'background-image:url(' + EZ.img(from.key) + ');background-size:' + cv.w.toFixed(1) + 'px ' + cv.h.toFixed(1) + 'px;background-position:' + (cv.x - j * sw).toFixed(1) + 'px ' + cv.y.toFixed(1) + 'px';
          html += '<i class="rc__sl' + (cv ? '' : ' rc__sl--blank') + '" style="' + st + '"><b></b></i>';
        }
        slatBox.innerHTML = html;
        var sl = Array.prototype.slice.call(slatBox.children); if (dir < 0) sl.reverse();
        if (busy) busy.kill();
        busy = gsap.timeline({ onComplete: function () { slatBox.innerHTML = ''; busy = null; } });
        busy.to(sl, { rotationY: dir < 0 ? -88 : 88, duration: .62, ease: 'power2.inOut', stagger: .045 }, 0)
            .to(sl.map(function (e) { return e.firstChild; }), { opacity: .55, duration: .62, ease: 'power1.in', stagger: .045 }, 0);
      }
      function show(p, dir, first) {
        if (cur && p.key === cur.key) return;
        var from = cur; cur = p;
        var c = (p.c === 'o') ? 'w' : p.c;
        tabs.forEach(function (t) { var on = t.dataset.c === c; t.setAttribute('aria-selected', on ? 'true' : 'false'); t.tabIndex = on ? 0 : -1; });
        if (strip.dataset.c !== c) { strip.dataset.c = c; fillStrip(c); }
        Array.prototype.forEach.call(strip.children, function (b) { var on = b.dataset.k === p.key; b.setAttribute('aria-pressed', on ? 'true' : 'false'); b.tabIndex = on ? 0 : -1; if (on && !first) b.scrollIntoView({ block: 'nearest', inline: 'nearest' }); });
        code.textContent = p.code + ' · ' + CAT[p.c];
        title.textContent = p.title;
        hit.setAttribute('aria-label', p.title + ', open large');
        img.alt = p.title + ', an Elbaz project';
        if (k.motion && (from || first)) shutter(from, dir || 1);
        img.src = EZ.img(p.key);
      }
      function step(d) { var i = flat.indexOf(cur); show(flat[(i + d + flat.length) % flat.length], d); }
      // the chapters: a real tablist [S1018]
      tabs.forEach(function (t, i) {
        k.on(t, 'click', function () { if (t.dataset.c !== strip.dataset.c) show(byC[t.dataset.c][0], i >= tabs.indexOf(tabsEl.querySelector('[aria-selected="true"]')) ? 1 : -1); });
        k.on(t, 'keydown', function (e) {
          var d = /Right|Down/.test(e.key) ? 1 : /Left|Up/.test(e.key) ? -1 : 0, j = e.key === 'Home' ? 0 : e.key === 'End' ? tabs.length - 1 : d ? (i + d + tabs.length) % tabs.length : -1;
          if (j < 0) return; e.preventDefault(); tabs[j].focus(); show(byC[tabs[j].dataset.c][0], j > i ? 1 : -1);
        });
      });
      // the filmstrip: one Tab stop, arrows walk it
      k.on(strip, 'click', function (e) { var b = e.target.closest('.rc__th'); if (!b) return; var p = L[idxOf[b.dataset.k]]; show(p, flat.indexOf(p) > flat.indexOf(cur) ? 1 : -1); });
      k.on(strip, 'keydown', function (e) {
        var b = e.target.closest('.rc__th'); if (!b) return;
        var bs = Array.prototype.slice.call(strip.children), i = bs.indexOf(b), d = /Right|Down/.test(e.key) ? 1 : /Left|Up/.test(e.key) ? -1 : 0;
        if (!d) return; e.preventDefault(); var j = Math.max(0, Math.min(bs.length - 1, i + d)); if (j === i) return;
        show(L[idxOf[bs[j].dataset.k]], d); bs[j].focus();
      });
      k.on(prev, 'click', function () { step(-1); });
      k.on(next, 'click', function () { step(1); });
      function openLarge() { EZ.viewer.open(all, idxOf[cur.key], img); }
      k.on(openB, 'click', openLarge);
      // the stage: tap or click to see it large; a sideways swipe walks the rooms (touch) [S1443]
      var sw = null;
      k.on(hit, 'pointerdown', function (e) { sw = { x: e.clientX, y: e.clientY, t: e.pointerType }; });
      k.on(hit, 'pointerup', function (e) {
        if (!sw) return; var dx = e.clientX - sw.x, dy = e.clientY - sw.y, t = sw.t; sw = null;
        if (t !== 'mouse' && Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.4) { hit.dataset.swiped = '1'; step(dx < 0 ? 1 : -1); }
      });
      k.on(hit, 'click', function () { if (hit.dataset.swiped) { delete hit.dataset.swiped; return; } openLarge(); });
      k.on(stage, 'keydown', function (e) { if (e.key === 'ArrowRight') { e.preventDefault(); step(1); } else if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); } });

      show(flat[0], 1, false);
      EZ.reveal(k, root.querySelectorAll('.rc__side > *'));
      if (!k.motion) return;
      // first view: the shutters, still closed, open on the first kitchen
      shutter(null, 1); busy.pause(0);
      var st = ScrollTrigger.create({ trigger: stage, start: 'top 72%', once: true, onEnter: function () { if (busy) busy.play(); } });
      k.add(function () { st.kill(); if (busy) busy.kill(); busy = null; slatBox.innerHTML = ''; });
    } }
  });
})();
