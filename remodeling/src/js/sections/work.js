/* FINAL · Our Work · the portfolio wall (the owner's pick: Hero V2's gallery wall, made into the portfolio).
   The firm's own photographs (data/projects.json) hang on one wall in three bays, Kitchens, Bathrooms and Whole homes,
   each under its plaque, each photograph at its own proportions (justified rows). Titles and plan-room codes are the
   section's own; the two photos whose subject does not match their title stay out (owner item); no counts printed.
   Wide screens (the camera): one layer moves (translate + scale) [S0062]. As the section rises the camera stands back
   from a close look to the whole wall, scrubbed by the scroll with no pin [S1326, S1209]. The bay buttons step up to a
   bay; a photograph is flown to, named (code, room, title) and opened large; arrows walk the wall, Escape steps back
   [S1018, S0083]. The pointer leans the camera a little and names the photograph under it.
   Phones and narrow screens (the hang): the wall at full width in the page, a tap opens the photograph large, the bay
   buttons bring a bay into view. Reduced motion: no scrub, no flight, no lean; the same wall, every action [S0400]. */
(function () {
  var CAT = { k: 'Kitchen', b: 'Bathroom', w: 'Whole home and outdoor' };
  var BAYS = [{ c: 'k', n: 'Kitchens' }, { c: 'b', n: 'Bathrooms' }, { c: 'w', n: 'Whole homes' }];
  function data() { return (window.__DATA || {}).projects || []; }
  // plan-room numbering (P-01 is the same room everywhere); two photos whose subject does not match their title
  // (k-walnut-marble shows a hallway, k-emerald-shaker a laundry run; owner item) stay out
  var ORDER = ['k-navy-shaker', 'b-black-marble', 'w-farmhouse', 'k-walnut-marble', 'b-polished-concrete', 'o-waterfront', 'k-emerald-shaker', 'b-spa-guest', 'k-chef', 'b-fluted-vanity', 'r-openplan', 'k-white-shaker', 'k-turquoise', 'k-gray-shaker', 'k-navy-white', 'k-brass-hood', 'k-stone-island', 'b-emerald', 'b-champagne', 'b-copper', 'b-floating-soak', 'b-sea-glass', 'b-navy-niche', 'b-white-marble', 'b-multi-brass', 'w-bath-whole'];
  var HOLD = ['k-walnut-marble', 'k-emerald-shaker'];
  function listed() {
    var by = {};
    data().forEach(function (p) { by[p.k] = { key: p.k, title: p.t, c: p.c, a: (p.w || 4) / (p.h || 3) }; });
    return ORDER.map(function (key, n) { var p = by[key]; if (p) p.code = 'P-' + (n < 9 ? '0' : '') + (n + 1); return p; })
      .filter(function (p) { return p && HOLD.indexOf(p.key) < 0; });
  }
  function esc(t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }
  // justified rows: split a bay's photographs (in order) into R rows whose aspect sums are as even as possible
  function split(a, R) {
    var n = a.length, S = a.reduce(function (s, x) { return s + x; }, 0), t = S / R, pre = [0];
    a.forEach(function (x, i) { pre[i + 1] = pre[i] + x; });
    R = Math.max(1, Math.min(R, n));
    var best = [], cut = [];
    for (var r = 0; r <= R; r++) { best[r] = []; cut[r] = []; for (var i = 0; i <= n; i++) best[r][i] = Infinity; }
    best[0][0] = 0;
    for (r = 1; r <= R; r++) for (i = 1; i <= n; i++) for (var j = r - 1; j < i; j++) {
      var d = pre[i] - pre[j] - t, v = best[r - 1][j] + d * d;
      if (v < best[r][i]) { best[r][i] = v; cut[r][i] = j; }
    }
    var rows = [], e = n;
    for (r = R; r >= 1; r--) { var s0 = cut[r][e]; rows.unshift([s0, e]); e = s0; }
    return rows;
  }

  EZ.section('work', {
    1: { init: function (root, k) {
      var stage = root.querySelector('.pw__stage'), cam = root.querySelector('.pw__cam'), wall = root.querySelector('.pw__wall'),
        plq = root.querySelector('.pw__plaques'), tip = root.querySelector('.pw__tip'), hint = root.querySelector('.pw__hint'),
        card = root.querySelector('.pw__card'), capT = root.querySelector('.pw__name'), capN = root.querySelector('.pw__no'),
        bayBtns = Array.prototype.slice.call(root.querySelectorAll('.pw__bay'));
      var L = listed(), G = [];   // G: the photographs bay by bay, in hanging order
      BAYS.forEach(function (b) { L.forEach(function (p) { if (p.c === b.c) G.push(p); }); });
      var N = G.length;
      var ALL = G.map(function (p) { return { key: p.key, title: p.title, alt: p.title + ', an Elbaz project' }; });

      wall.innerHTML = G.map(function (p, i) {
        return '<li class="pw__c" data-c="' + p.c + '"><button type="button" class="pw__t" data-i="' + i + '" tabindex="' + (i ? -1 : 0) + '" aria-label="' + esc(p.title) + '"><span class="pw__fr"><img src="' + EZ.img(p.key) + '" alt="" loading="lazy" decoding="async" draggable="false"></span></button></li>';
      }).join('');
      plq.innerHTML = BAYS.map(function (b, i) { return '<div class="pw__pl" data-c="' + b.c + '"><span class="pw__pl-no nums">Bay 0' + (i + 1) + '</span><b>' + b.n + '</b></div>'; }).join('');
      var cells = Array.prototype.slice.call(wall.querySelectorAll('.pw__c')), tiles = cells.map(function (c) { return c.firstChild; });
      var pls = Array.prototype.slice.call(plq.querySelectorAll('.pw__pl'));
      k.add(function () { wall.innerHTML = ''; plq.innerHTML = ''; cam.style.transform = ''; stage.style.height = ''; card.hidden = true; root.classList.remove('is-flown', 'is-hang'); });

      /* ---------- layout: the bays in wall pixels; the camera on wide screens, the hang at full width otherwise ---------- */
      var M = {}, rect = [], bayR = {}, cam0 = {}, cam1 = {};
      function hangBay(items, x0, y0, BW, R, g) {   // justified rows inside one bay; returns its height
        var a = items.map(function (p) { return G[p].a; }), rows = split(a, R), y = y0;
        rows.forEach(function (rw) {
          var ids = items.slice(rw[0], rw[1]), sa = 0;
          ids.forEach(function (p) { sa += G[p].a; });
          var h = (BW - (ids.length - 1) * g) / sa, x = x0;
          ids.forEach(function (p) { var w = G[p].a * h; rect[p] = { x: x, y: y, w: w, h: h }; x += w + g; });
          y += h + g;
        });
        return y - g - y0;
      }
      function layout() {
        var W = stage.clientWidth; if (!W) return;
        var VH = window.innerHeight, wide = W >= 900 && W / VH > 1.15;
        root.classList.toggle('is-hang', !wide);
        var idx = { k: [], b: [], w: [] };
        G.forEach(function (p, i) { (idx[p.c] || idx.w).push(i); });
        var g, PH, BG, WW, WH = 0;
        rect = []; bayR = {};
        if (wide) {
          // three bays side by side, four rows each at one row height for the whole wall, sized to the stage
          g = 14; PH = 92; BG = 72;
          var RB = { k: 4, b: 4, w: 4 }, al = {}, tot = 0;
          BAYS.forEach(function (b) { var s = 0; idx[b.c].forEach(function (i) { s += G[i].a; }); al[b.c] = s / RB[b.c]; tot += al[b.c]; });
          var gapsW = BAYS.reduce(function (s, b) { return s + (Math.ceil(idx[b.c].length / RB[b.c]) - 1) * g; }, 0);
          var H0 = (W * .94 - 2 * BG - gapsW) / tot, x = 0;
          BAYS.forEach(function (b) {
            var BW = al[b.c] * H0 + (Math.ceil(idx[b.c].length / RB[b.c]) - 1) * g;
            var h = hangBay(idx[b.c], x, PH, BW, RB[b.c], g);
            bayR[b.c] = { x: x, y: 0, w: BW, h: PH + h };
            WH = Math.max(WH, PH + h); x += BW + BG;
          });
          WW = x - BG;
          var SH = Math.round(Math.min(Math.max(560, VH - 150), 880));
          stage.style.height = SH + 'px';
          M = { wide: true, W: W, H: SH, WW: WW, WH: WH };
          var hud = 76, s1 = Math.min(W * .94 / WW, (SH - hud - 24) / WH);
          cam1 = { s: s1, cx: WW / 2, cy: WH / 2 + (hud - 24) / 2 / s1 };
          var bb = bayR.b;   // the close look: the middle bay, a step nearer
          cam0 = { s: s1 * 1.65, cx: bb.x + bb.w / 2, cy: bb.y + bb.h * .42 };
        } else {
          // the hang: bays one under another at the stage's width, rows of about one comfortable height
          var pad = W < 600 ? 16 : 24, RH = W < 600 ? 118 : 168;
          g = W < 600 ? 8 : 12; PH = 58; BG = 36; WW = W - 2 * pad;
          var y = 0;
          BAYS.forEach(function (b) {
            var s = 0; idx[b.c].forEach(function (i) { s += G[i].a; });
            var R = Math.max(1, Math.round(s * RH / WW));
            var h = hangBay(idx[b.c], pad, y + PH, WW, R, g);
            bayR[b.c] = { x: pad, y: y, w: WW, h: PH + h };
            y += PH + h + BG;
          });
          WH = y - BG;
          stage.style.height = (WH + 24) + 'px';
          M = { wide: false, W: W, H: WH + 24, WW: W, WH: WH };
        }
        cells.forEach(function (el, i) { var r = rect[i]; el.style.cssText = 'left:' + r.x + 'px;top:' + r.y + 'px;width:' + r.w + 'px;height:' + r.h + 'px'; });
        pls.forEach(function (el) { var r = bayR[el.dataset.c]; el.style.cssText = 'left:' + r.x + 'px;top:' + r.y + 'px;width:' + r.w + 'px;height:' + (PH - 12) + 'px'; });
        wall.style.width = cam.style.width = (M.wide ? WW : W) + 'px'; wall.style.height = WH + 'px';
        if (!M.wide) { land(true); fl.f = 0; }
        render();
      }

      /* ---------- the camera: base (scroll) + lean (pointer) + flight (a bay or a photograph), one transform ---------- */
      var st = { p: k.motion ? 0 : 1 }, lean = { x: 0, y: 0 }, fl = { f: 0, s: 1, cx: 0, cy: 0 }, on = -1, bay = 'all';
      function sm(t) { t = Math.max(0, Math.min(1, t)); return t * t * (3 - 2 * t); }
      function render() {
        if (!M.W) return;
        if (!M.wide) { cam.style.transform = ''; cells.forEach(function (el) { el.style.transform = ''; }); return; }
        var e = sm(st.p), bs = Math.exp(Math.log(cam0.s) * (1 - e) + Math.log(cam1.s) * e),
          bx = cam0.cx + (cam1.cx - cam0.cx) * e, by = cam0.cy + (cam1.cy - cam0.cy) * e, f = fl.f;
        var s = bs + (fl.s - bs) * f, cx = bx + (fl.cx - bx) * f, cy = by + (fl.cy - by) * f;
        var tx = M.W / 2 - cx * s + lean.x * (1 - f), ty = M.H / 2 - cy * s + lean.y * (1 - f);
        cam.style.transform = 'translate3d(' + tx.toFixed(2) + 'px,' + ty.toFixed(2) + 'px,0) scale(' + s.toFixed(5) + ')';
        // depth: close to the wall the frames stand a little apart; standing back closes them into the flat hang
        var d = (1 - e) * (1 - f) * (k.motion ? .05 : 0);
        if (d > .0005 || cells[0].style.transform) cells.forEach(function (el, i) {
          var r = rect[i]; el.style.transform = d > .0005 ? 'translate3d(' + ((r.x + r.w / 2 - cam0.cx) * d).toFixed(1) + 'px,' + ((r.y + r.h / 2 - cam0.cy) * d).toFixed(1) + 'px,0)' : '';
        });
      }
      function go(t) {   // fly the camera to a target {s, cx, cy}, or back to the wall (null)
        if (t) { fl.s = t.s; fl.cx = t.cx; fl.cy = t.cy; }
        if (k.motion) gsap.to(fl, { f: t ? 1 : 0, duration: .75, ease: 'power3.inOut', overwrite: true, onUpdate: render });
        else { fl.f = t ? 1 : 0; render(); }
      }
      function frameBay(c) { var r = bayR[c], hud = 76; var s = Math.min(M.W * .9 / r.w, (M.H - hud - 30) / r.h); return { s: s, cx: r.x + r.w / 2, cy: r.y + r.h / 2 + (hud - 30) / 2 / s }; }
      function dim(fn) { cells.forEach(function (el, j) { var d = fn(j); el.classList.toggle('is-dim', d === 1); el.classList.toggle('is-on', d === 2); }); pls.forEach(function (el) { el.classList.toggle('is-dim', bay !== 'all' && el.dataset.c !== bay || on > -1); }); }
      function press(b) { bay = b; bayBtns.forEach(function (x) { var y = x.dataset.b === b; x.classList.toggle('is-on', y); x.setAttribute('aria-pressed', y ? 'true' : 'false'); }); }
      function rove(i) { tiles.forEach(function (t, j) { t.tabIndex = j === i ? 0 : -1; }); }

      function inView() {   // a choice made from the buttons above brings the whole wall into view first
        var r = stage.getBoundingClientRect(), nav = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 64;
        if (r.top < nav - 2 || r.bottom > window.innerHeight + 2) window.scrollTo({ top: window.scrollY + r.top - nav - Math.max(0, (window.innerHeight - nav - r.height) / 2), behavior: k.motion ? 'smooth' : 'auto' });
      }
      function chooseBay(b) {
        press(b); on = -1; card.hidden = true; root.classList.remove('is-flown');
        if (!M.wide) {   // the hang: bring the bay into view
          dim(function () { return 0; });
          var r = b === 'all' ? stage.getBoundingClientRect() : null, top;
          if (r) top = r.top; else { var sr = stage.getBoundingClientRect(); top = sr.top + bayR[b].y; }
          var nav = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 64;
          window.scrollTo({ top: window.scrollY + top - nav - 12, behavior: k.motion ? 'smooth' : 'auto' });
          return;
        }
        dim(function (j) { return b !== 'all' && G[j].c !== b ? 1 : 0; });
        inView();
        go(b === 'all' ? null : frameBay(b));
      }
      bayBtns.forEach(function (x) { k.on(x, 'click', function () { chooseBay(x.dataset.b); }); });

      function fly(i, focus) {
        var r = rect[i]; if (!r) return;
        rove(i); on = i;
        if (!M.wide) { openLarge(i); return; }
        var cardH = 96, room = M.H - cardH - 40, s = Math.min(M.W * .6 / r.w, room * .9 / r.h);
        dim(function (j) { return j === i ? 2 : 1; });
        root.classList.add('is-flown');
        capN.textContent = G[i].code + ' · ' + CAT[G[i].c];
        capT.textContent = G[i].title;
        card.hidden = false; tip.classList.remove('is-on');
        if (focus) tiles[i].focus({ preventScroll: true });
        inView();
        go({ s: s, cx: r.x + r.w / 2, cy: r.y + r.h / 2 + cardH / 2 / s });
      }
      function land(quiet) {   // step back: to the bay you were looking at, or to the wall
        if (on < 0 && quiet) return;
        var i = on; on = -1; card.hidden = true; root.classList.remove('is-flown');
        if (quiet) { press('all'); dim(function () { return 0; }); fl.f = 0; render(); return; }
        if (bay !== 'all' && M.wide) { dim(function (j) { return G[j].c !== bay ? 1 : 0; }); go(frameBay(bay)); }
        else { dim(function () { return 0; }); go(null); }
        if (i > -1) tiles[i].focus({ preventScroll: true });
      }
      function openLarge(i) { EZ.viewer.open(ALL, i, tiles[i].querySelector('img')); }

      k.on(wall, 'click', function (e) {
        var t = e.target.closest('.pw__t'); if (!t) return;
        var i = +t.dataset.i;
        if (!M.wide || (on === i && fl.f > .6)) openLarge(i); else fly(i);
      });
      k.on(wall, 'focusin', function (e) {   // keyboard focus steps up to the photograph (never a mouse press)
        var t = e.target.closest('.pw__t'); if (!t || !t.matches(':focus-visible') || !M.wide) return;
        if (on !== +t.dataset.i) fly(+t.dataset.i);
      });
      // arrow keys walk the wall as it hangs, Home / End to the ends, Escape steps back [S1018]
      k.on(wall, 'keydown', function (e) {
        var t = e.target.closest('.pw__t'); if (!t) return;
        var i = +t.dataset.i, r = rect[i], to = -1;
        if (e.key === 'Escape') { if (on > -1 || fl.f > 0) { e.preventDefault(); land(false); } return; }
        if (e.key === 'Home') to = 0; else if (e.key === 'End') to = N - 1;
        else {
          var dx = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0, dy = e.key === 'ArrowDown' ? 1 : e.key === 'ArrowUp' ? -1 : 0;
          if (!dx && !dy) return;
          var cx = r.x + r.w / 2, cy = r.y + r.h / 2, bd = 1e12;
          rect.forEach(function (q, j) {
            if (j === i) return;
            var qx = q.x + q.w / 2, qy = q.y + q.h / 2, dist;
            if (dx) { if (Math.abs(qy - cy) > Math.min(q.h, r.h) * .6 || Math.sign(qx - cx) !== dx) return; dist = Math.abs(qx - cx); }
            else { if (Math.sign(qy - cy) !== dy || Math.abs(qy - cy) < Math.min(q.h, r.h) * .5) return; dist = Math.abs(qy - cy) * 4 + Math.abs(qx - cx); }
            if (dist < bd) { bd = dist; to = j; }
          });
          if (to < 0 && dx) to = (i + dx + N) % N;   // a row's end runs on in hanging order
        }
        if (to < 0) return;
        e.preventDefault();
        if (M.wide) fly(to, true); else { rove(to); tiles[to].focus(); }
      });
      k.on(root.querySelector('.pw__prev'), 'click', function () { fly((Math.max(on, 0) - 1 + N) % N); });
      k.on(root.querySelector('.pw__next'), 'click', function () { fly((Math.max(on, 0) + 1) % N); });
      k.on(root.querySelector('.pw__open'), 'click', function () { if (on > -1) openLarge(on); });
      k.on(root.querySelector('.pw__back'), 'click', function () { land(false); });
      k.on(card, 'keydown', function (e) { if (e.key === 'Escape') { e.preventDefault(); land(false); } });
      // leaving the wall behind resets it quietly
      k.io(stage, function (en) { if (!en.isIntersecting && (on > -1 || bay !== 'all')) { on = -1; card.hidden = true; root.classList.remove('is-flown'); press('all'); dim(function () { return 0; }); fl.f = 0; render(); } }, { threshold: 0 });

      /* ---------- the pointer: a name under the photograph it rests on, and a small lean of the camera ---------- */
      if (k.fine) {
        k.on(wall, 'pointerover', function (e) {
          var t = e.target.closest('.pw__t'); if (!t || e.pointerType === 'touch' || fl.f > .02 || !M.wide) return;
          var q = t.getBoundingClientRect(), sr = stage.getBoundingClientRect(), p = G[+t.dataset.i];
          tip.textContent = p.title;
          tip.style.left = Math.max(12, Math.min(sr.width - 12, q.left - sr.left + q.width / 2)) + 'px';
          var up = q.bottom - sr.top > sr.height - 90;
          tip.classList.toggle('is-up', up);
          tip.style.top = (up ? q.top - sr.top - 8 : q.bottom - sr.top + 8) + 'px';
          tip.classList.add('is-on');
        });
        k.on(wall, 'pointerout', function (e) { if (!e.relatedTarget || !e.relatedTarget.closest || !e.relatedTarget.closest('.pw__t')) tip.classList.remove('is-on'); });
      }
      if (k.motion && k.fine) {
        var qx = gsap.quickTo(lean, 'x', { duration: 1, ease: 'power3.out', onUpdate: render });
        var qy = gsap.quickTo(lean, 'y', { duration: 1, ease: 'power3.out', onUpdate: render });
        k.on(stage, 'pointermove', function (e) {
          if (e.pointerType === 'touch' || !M.wide) return;
          var r = stage.getBoundingClientRect();
          qx(-((e.clientX - r.left) / r.width * 2 - 1) * 22); qy(-((e.clientY - r.top) / r.height * 2 - 1) * 14);
        });
        k.on(stage, 'pointerleave', function () { qx(0); qy(0); });
      }

      k.ro(stage, layout);
      layout();
      EZ.reveal(k, root.querySelectorAll('.pw__head > div > *, .pw__lead'));
      if (!k.motion) return;

      /* ---------- the scroll: the camera stands back from the middle bay to the whole wall, no pin [S1326, S1209] ---------- */
      var tw = gsap.to(st, { p: 1, ease: 'none', onUpdate: render,
        scrollTrigger: { trigger: stage, start: 'top 95%', end: 'center 55%', scrub: .8, invalidateOnRefresh: true } });
      k.add(function () { tw.scrollTrigger && tw.scrollTrigger.kill(); tw.kill(); });

      /* ---------- the hang: the plaques go up, then the photographs are hung bay by bay ---------- */
      var once = false;
      k.io(stage, function (en) {
        if (!en.isIntersecting || once) return; once = true;
        var frs = cells.map(function (c) { return c.querySelector('.pw__fr'); });
        gsap.timeline({ defaults: { ease: 'expo.out' } })
          .fromTo(pls, { autoAlpha: 0, y: -10 }, { autoAlpha: 1, y: 0, duration: .5, stagger: .12, clearProps: 'transform,opacity,visibility' }, 0)
          .fromTo(frs, { autoAlpha: 0, y: -16, rotation: function (i) { return i % 2 ? 1.4 : -1.4; } },
            { autoAlpha: 1, y: 0, rotation: 0, duration: .8, stagger: .035, clearProps: 'transform,opacity,visibility' }, .1)
          .fromTo(hint, { autoAlpha: 0 }, { autoAlpha: 1, duration: .4, clearProps: 'opacity,visibility' }, .9);
      }, { threshold: .15 });
    } }
  });
})();
