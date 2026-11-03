/* OWNER (proof pass): depth (each block has thickness and a contact shadow that shrinks as it lifts), a purpose (a click
   without a drag opens that fact's card with the way to check it: the state licence search, the Google listing, the
   town finder, the projects), and a goal (four stacked in one tower earns the "Built properly." stamp and a height mark;
   "Build the tower" stacks them for you). Enter checks a block from the keyboard; Space still picks it up.
   FINALIZE · Home 2 · Proof (V2 deepened): four fact blocks you can grab, throw and stack.
   A small rigid-box solver (own code; the S0452 custom-renderer and teardown rules applied): gravity, floor, walls,
   box-on-box stacking resolved along the smaller overlap, fixed 1/120s sub-steps, sleeps when still [S1315].
   Feel [S0340]: a release keeps the hand's real velocity; tilt comes from horizontal speed (state, not time); the hover
   bend is a small spring toward the pointer side. Keyboard parity and announcements [S1018]. Entry: the blocks arrive as
   a keyed sequence, one beat each (Scout) [S0544 causal: each lands with a squash]. Reduced motion: no drop-in, no tilt,
   moves resolve instantly. */
(function () {
  EZ.section('proof', { 1: { init: function (root, k) {
    var site = root.querySelector('.pf__site'), list = root.querySelector('.pf__blocks'), say = root.querySelector('.pf__say');
    var els = Array.prototype.slice.call(root.querySelectorAll('.pf__b'));
    var FACTS = [
      ['Licence', 'CBC1265280', 'Licensed, bonded &amp; insured. Elbaz Construction is a Florida Certified Building Contractor; look the licence up on the state\u2019s own search.', 'Verify the licence', 'https://www.myfloridalicense.com/', true],
      ['Google reviews', '4.8 \u00b7 343', 'The average across every review on our Google listing. Read them there, not here.', 'Read the 343 reviews', 'https://www.google.com/maps?cid=17916885921843924422', true],
      ['Where we build', '104', 'Municipalities across Miami\u2011Dade, Broward and Palm Beach: 34, 31 and 39. Type yours into the town finder.', 'Find your town', '#towns', false],
      ['Our own work', '26 \u00b7 44', 'Projects and photographs on this site, every one an Elbaz job. No stock photos.', 'See the projects', '#work', false]
    ];
    var card = root.querySelector('.pf__card'), intro = card.querySelector('.pf__intro'), fact = card.querySelector('.pf__fact');
    var win = root.querySelector('.pf__win'), dim = root.querySelector('.pf__dim'), dimt = root.querySelector('.pf__dimt');
    var shadows = els.map(function () { var sh = document.createElement('span'); sh.className = 'pf__sh'; sh.setAttribute('aria-hidden', 'true'); list.insertBefore(sh, list.firstChild); return sh; });
    k.add(function () { shadows.forEach(function (sh) { sh.remove(); }); });
    var openI = -1;
    function inspect(i) {
      openI = i; var F = FACTS[i];
      intro.hidden = true; fact.hidden = false;
      fact.querySelector('.pf__fk').innerHTML = F[0]; fact.querySelector('.pf__fv').innerHTML = F[1]; fact.querySelector('.pf__fb').innerHTML = F[2];
      var a = fact.querySelector('.pf__fa'); a.href = F[4]; a.querySelector('.btn__label').textContent = F[3];
      if (F[5]) a.setAttribute('rel', 'noopener'); else a.removeAttribute('rel');
      els.forEach(function (e, j) { e.classList.toggle('is-open', j === i); });
      card.classList.remove('is-swap'); void card.offsetWidth; card.classList.add('is-swap');
    }
    function closeFact() { openI = -1; intro.hidden = false; fact.hidden = true; els.forEach(function (e) { e.classList.remove('is-open'); }); }
    k.on(fact.querySelector('.pf__x'), 'click', closeFact);
    k.add(function () { closeFact(); });
    var G = 2600, SUB = 1 / 120, B = [], W = 0, H = 0, S = 1, asleep = true, frames = 0, loop = null, started = false;

    function dims() {
      W = list.clientWidth; H = list.clientHeight;
      S = Math.max(.6, Math.min(1.08, W / 1240));
      B.forEach(function (b) { b.w = b.bw * S; b.h = b.bh * S; b.el.style.width = b.w + 'px'; b.el.style.height = b.h + 'px'; });
    }
    els.forEach(function (el, i) {
      B.push({ el: el, i: i, bw: +el.dataset.w, bh: +el.dataset.h, w: 0, h: 0, x: 0, y: 0, vx: 0, vy: 0, tilt: 0, bend: 0, bendT: 0, sq: 0, held: false, key: false, t0: 0, live: true });
    });
    // level layout: the blocks sit side by side on the deck (narrow screens: two rows)
    function slots() {
      var gap = 24 * S, total = B.reduce(function (s, b) { return s + b.w; }, 0) + gap * (B.length - 1), out = [];
      if (total <= W) {
        var x = (W - total) / 2;
        B.forEach(function (b) { out.push({ x: x, y: H - b.h }); x += b.w + gap; });
      } else {
        // two per row: the second pair stands on the floor too, staggered left/right so they settle into a stack
        var a = B[0], b1 = B[1], c = B[2], d = B[3];
        out[0] = { x: 8, y: H - a.h }; out[2] = { x: W - c.w - 8, y: H - c.h };
        out[1] = { x: 8, y: H - a.h - b1.h - 2 }; out[3] = { x: W - d.w - 8, y: H - c.h - d.h - 2 };
      }
      return out;
    }
    function place(fromAbove) {
      var s = slots();
      B.forEach(function (b, i) {
        b.x = s[i].x; b.y = fromAbove ? -b.h - 60 - i * 40 : s[i].y; b.vx = 0; b.vy = 0; b.tilt = 0;
        b.live = !fromAbove; b.t0 = fromAbove ? i * .26 : 0;
      });
      render(); wake();
    }

    /* ---------- the solver ---------- */
    function collide(a, b) {
      var ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x), oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
      if (ox <= 0 || oy <= 0) return;
      if (oy < ox) {            // vertical: the upper block rests on the lower
        var up = a.y < b.y ? a : b, lo = up === a ? b : a;
        if (up.held && !lo.held) { lo.y += oy; } else {
          up.y -= oy; if (up.vy > 0) { if (up.vy > 380) { up.sq = Math.min(1, up.sq + up.vy / 3600); up.vy = -up.vy * .18; } else up.vy = 0; } up.vx *= .9;   // owner pass: squash only on a real impact (a resting block was re-squashed every step and never slept)
          // a block resting on less than 35% of its width slides off its edge and lands level ("they always land level")
          if (!up.held && ox / up.w < .35) up.vx += (up.x + up.w / 2 < lo.x + lo.w / 2 ? -1 : 1) * 90;
        }
      } else {                  // horizontal: push apart, the held block wins
        var l = a.x < b.x ? a : b, r = l === a ? b : a, half = ox / 2;
        if (l.held) r.x += ox; else if (r.held) l.x -= ox; else { l.x -= half; r.x += half; var v = (l.vx - r.vx) * .5; l.vx -= v; r.vx += v; }
      }
    }
    function step(h) {
      B.forEach(function (b) {
        if (!b.live) return;
        if (b.held) return;
        b.vy += G * h; b.vx *= (1 - .5 * h);
        b.x += b.vx * h; b.y += b.vy * h;
        if (b.y + b.h > H) { b.y = H - b.h; if (b.vy > 380) { b.sq = Math.min(1, b.vy / 1800); b.vy = -b.vy * .2; } else b.vy = 0; b.vx *= .86; }
        if (b.x < 0) { b.x = 0; b.vx = -b.vx * .3; }
        if (b.x + b.w > W) { b.x = W - b.w; b.vx = -b.vx * .3; }
        if (b.y < -600) b.y = -600;
      });
      for (var it = 0; it < 4; it++) for (var i = 0; i < B.length; i++) for (var j = i + 1; j < B.length; j++) if (B[i].live && B[j].live) collide(B[i], B[j]);
    }
    var clock = 0;
    function frame(dt) {
      clock += dt;
      B.forEach(function (b) { if (!b.live && clock >= b.t0) b.live = true; });
      for (var t = 0; t < dt; t += SUB) step(Math.min(SUB, dt - t));
      var moving = false;
      B.forEach(function (b) {
        var want = k.motion ? Math.max(-7, Math.min(7, b.vx * .012)) : 0;
        b.tilt += (want - b.tilt) * Math.min(1, dt * 14);
        b.bend += (b.bendT - b.bend) * Math.min(1, dt * 12);
        b.sq *= Math.pow(.02, dt);
        if (b.held || !b.live || Math.abs(b.vx) > 4 || Math.abs(b.vy) > 4 || Math.abs(b.tilt) > .05 || Math.abs(b.bend - b.bendT) > .01 || b.sq > .01) moving = true;
      });
      render();
      frames = moving ? 0 : frames + 1;
      if (frames > 20) { asleep = true; checkTower(); return false; }
    }
    function render() {
      B.forEach(function (b, i) {
        // the contact shadow sits on the deck under the block; it shrinks and fades as the block rises
        var gap = Math.max(0, H - (b.y + b.h)), f = Math.min(1, gap / 420), sh = shadows[i];
        if (sh) { sh.style.transform = 'translate3d(' + (b.x + b.w * .06 + gap * .04).toFixed(1) + 'px,' + (H - 6) + 'px,0) scaleX(' + (1 - f * .45).toFixed(3) + ')'; sh.style.width = (b.w * .9).toFixed(0) + 'px'; sh.style.opacity = (b.live ? .55 * (1 - f * .8) : 0).toFixed(2); }
        var sy = 1 - b.sq * .12, sx = 1 + b.sq * .08, r = b.tilt + b.bend * 1.6, sk = b.bend * -1.8;
        b.el.style.transform = 'translate3d(' + b.x.toFixed(1) + 'px,' + b.y.toFixed(1) + 'px,0) rotate(' + r.toFixed(2) + 'deg) skewX(' + sk.toFixed(2) + 'deg) scale(' + sx.toFixed(3) + ',' + sy.toFixed(3) + ')';
      });
    }
    // four in one tower: every block but the lowest rests on another, and they overlap in one column
    var won = false;
    function rests(b, o) { return Math.abs(b.y + b.h - o.y) < 4 && Math.min(b.x + b.w, o.x + o.w) - Math.max(b.x, o.x) > 8; }
    function checkTower() {
      var on = B.filter(function (b) { return B.some(function (o) { return o !== b && rests(b, o); }); });
      var floor = B.filter(function (b) { return Math.abs(b.y + b.h - H) < 4; });
      var tower = on.length === B.length - 1 && floor.length === 1;
      if (tower && !won) {
        won = true;
        var top = B.reduce(function (a, b) { return b.y < a.y ? b : a; }), right = Math.max.apply(null, B.map(function (b) { return b.x + b.w; }));
        var lr = list.getBoundingClientRect(), sr = site.getBoundingClientRect(), ox = lr.left - sr.left, oy = lr.top - sr.top;
        var left = Math.min.apply(null, B.map(function (b) { return b.x; }));
        win.style.left = (ox + left - 24) + 'px'; win.style.top = (oy + top.y + (H - top.y) * .3) + 'px';
        dim.style.left = (ox + right + 18) + 'px'; dim.style.top = (oy + top.y) + 'px'; dim.style.height = (H - top.y) + 'px';
        dimt.textContent = 'Four high';
        site.classList.add('is-won'); announce('All four stacked in one tower. Built properly.');
      }
    }
    function wake() {
      if (won) { won = false; site.classList.remove('is-won'); }
      if (!asleep) return;
      asleep = false; frames = 0;
      if (!k.motion) { for (var n = 0; n < 2400; n++) { if (frame(1 / 60) === false) break; } asleep = true; return; }   // resolve at once
      loop = k.raf(frame);
    }

    /* ---------- the hand: grab, carry, throw ---------- */
    var hist = [];
    els.forEach(function (el, i) {
      var b = B[i], ox = 0, oy = 0;
      // touch: a direction lock (Phase 6). The block takes the gesture only if it starts sideways; a vertical start is
      // left to the browser (touch-action: pan-y), so a thumb on a block still scrolls the page
      var pend = null, down = null;
      function grab(e, sx, sy) {
        try { el.setPointerCapture(e.pointerId); } catch (x) {}   // a capture that cannot be taken never aborts the grab
        var r = list.getBoundingClientRect();
        b.held = true; b.live = true; b.bendT = 0; el.classList.add('is-held'); el.style.zIndex = 4;
        ox = sx - r.left - b.x; oy = sy - r.top - b.y; hist = [{ x: e.clientX, y: e.clientY, t: performance.now() }];
        B.forEach(function (o) { if (o !== b) o.el.style.zIndex = ''; });
        wake();
      }
      k.on(el, 'pointerdown', function (e) {
        if (e.button > 0) return;
        down = { x: e.clientX, y: e.clientY, t: performance.now() };
        if (e.pointerType === 'touch') { pend = { x: e.clientX, y: e.clientY }; return; }
        e.preventDefault(); grab(e, e.clientX, e.clientY);
      });
      k.on(el, 'pointermove', function (e) {
        var r = list.getBoundingClientRect();
        if (pend && !b.held) {
          var dx = e.clientX - pend.x, dy = e.clientY - pend.y;
          if (dx * dx + dy * dy > 100) { if (Math.abs(dx) > Math.abs(dy)) grab(e, pend.x, pend.y); pend = null; } /* 10px activation [S1443] */
          return;
        }
        if (b.held) {
          var nx = Math.max(0, Math.min(W - b.w, e.clientX - r.left - ox)), ny = Math.max(-H * .6, Math.min(H - b.h, e.clientY - r.top - oy));
          b.vx = (nx - b.x) * 60; b.x = nx; b.y = ny;
          hist.push({ x: e.clientX, y: e.clientY, t: performance.now() }); if (hist.length > 6) hist.shift();
          wake();
        } else if (e.pointerType !== 'touch' && k.motion) {
          // the hover bend: a small lean toward the pointer's side, never more than ~2 degrees
          b.bendT = ((e.clientX - r.left - b.x) / b.w - .5) * 1.2;
          wake();
        }
      });
      k.on(el, 'pointerleave', function () { if (!b.held) { b.bendT = 0; wake(); } });
      function release(e) {
        // a press that never travelled is a click: open this fact's card instead of throwing
        var tap = down && e && e.type === 'pointerup' && Math.abs(e.clientX - down.x) < 6 && Math.abs(e.clientY - down.y) < 6 && performance.now() - down.t < 400;
        down = null; pend = null;
        if (tap) { inspect(i); if (b.held) { b.held = false; el.classList.remove('is-held'); b.vx = 0; b.vy = 0; wake(); } return; }
        if (!b.held) return;
        b.held = false; el.classList.remove('is-held');
        var a = hist[0], z = hist[hist.length - 1], dt = Math.max(16, z.t - a.t) / 1000;
        // the release keeps the hand's real velocity (60ms staleness rule from S0340)
        var stale = performance.now() - z.t > 60;
        b.vx = stale ? 0 : Math.max(-2400, Math.min(2400, (z.x - a.x) / dt));
        b.vy = stale ? 0 : Math.max(-2400, Math.min(2400, (z.y - a.y) / dt));
        wake();
      }
      k.on(el, 'pointerup', release);
      k.on(el, 'pointercancel', release);
      k.on(el, 'lostpointercapture', release);

      /* keyboard parity [S1018]: Space/Enter pick up and set down, arrows carry, Escape puts it back */
      var home = null;
      k.on(el, 'keydown', function (e) {
        var name = el.getAttribute('aria-label');
        if (e.key === 'Enter' && !b.key) { e.preventDefault(); inspect(i); return; }
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          if (!b.key) { b.key = true; home = { x: b.x, y: b.y }; b.held = true; b.y = Math.max(-H * .3, b.y - 48 * S); el.classList.add('is-key'); el.style.zIndex = 4; announce(name + ' picked up. Left and right arrows carry it, Space sets it down, Escape puts it back.'); }
          else { b.key = false; b.held = false; el.classList.remove('is-key'); announce(name + ' set down.'); }
          render(); wake();
        } else if (b.key && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
          e.preventDefault();
          b.x = Math.max(0, Math.min(W - b.w, b.x + (e.key === 'ArrowLeft' ? -40 : 40) * S)); render(); wake();
        } else if (b.key && e.key === 'Escape') {
          e.preventDefault(); b.key = false; b.held = false; b.x = home.x; b.y = home.y; el.classList.remove('is-key'); announce(name + ' put back.'); render(); wake();
        }
      });
      k.on(el, 'blur', function () { if (b.key) { b.key = false; b.held = false; el.classList.remove('is-key'); wake(); } });
    });
    function announce(t) { say.textContent = ''; requestAnimationFrame(function () { say.textContent = t; }); }

    /* ---------- build the tower: widest at the base, each dropped onto the one below in turn ---------- */
    k.on(root.querySelector('.pf__tower'), 'click', function () {
      var order = B.slice().sort(function (a, b) { return b.w - a.w; }), cx = W * (W > 760 ? .66 : .5);
      clock = 0;
      order.forEach(function (b, n) { b.x = Math.max(0, Math.min(W - b.w, cx - b.w / 2)); b.y = -b.h - 40; b.vx = 0; b.vy = 0; b.tilt = 0; b.live = false; b.t0 = n * .42; b.held = false; b.key = false; b.el.classList.remove('is-held', 'is-key'); });
      if (won) { won = false; site.classList.remove('is-won'); }
      render(); asleep = true; wake(); announce('Building the tower, widest block at the base.');
    });
    /* ---------- restack: every block is lifted and dropped back level, in sequence ---------- */
    k.on(root.querySelector('.pf__restack'), 'click', function () { clock = 0; place(k.motion); announce('The blocks are back on the deck, level.'); });

    k.ro(list, function () { var had = W; dims(); if (!started) return; if (Math.abs(had - W) > 40) place(false); else { B.forEach(function (b) { b.x = Math.min(b.x, W - b.w); }); wake(); } });
    dims();
    // the evidence arrives when the section is reached: one block per beat, each landing with a squash
    if (k.motion) {
      place(false); B.forEach(function (b) { b.el.style.visibility = 'hidden'; });
      k.io(site, function (en) {
        if (!en.isIntersecting || started) return;
        started = true; clock = 0; B.forEach(function (b) { b.el.style.visibility = ''; }); place(true);
        // Phase 6: during the arrival the site is clipped at its top edge, so the blocks drop in from the frame's edge
        // instead of crossing the headline and lead above it; the clip lifts once they have landed (throws stay free)
        site.classList.add('is-arriving'); k.timeout(function () { site.classList.remove('is-arriving'); }, 2200);
      }, { threshold: .35 });
    } else { started = true; place(false); }
    k.add(function () { els.forEach(function (el) { el.style.transform = el.style.width = el.style.height = el.style.zIndex = el.style.visibility = ''; }); });
  } } });
})();
