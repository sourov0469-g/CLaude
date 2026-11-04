/* FINALIZE · Home 1 · Hero: the owner's mix (V1 look + V3 border + V8 reacting background + V4 reveal rail).
   One reveal value p (0..1) drives everything; scroll (short pin), drag and keys all write it, latest input wins, and it
   is reversible [S1326]. Pointer: the room, the letters and the picture in the window move at three depths [S1321 mouse
   layers, depth <= .04]. Load: strokes before fills, masked headline lines [S0362, S0451]. Reduced motion: no pin, no
   pointer motion, no load tween; the rail still works, instantly [S0400]. */
(function () {
  var html = document.documentElement;
  var FIN = [
    { k: 'k-navy-shaker-xl', d: 'k-navy-shaker', n: 'Navy Shaker', at: '40% 74%', pos: '50% 52%' },
    { k: 'k-white-shaker', n: 'White Shaker', at: '24% 30%', pos: '50% 50%' },
    { k: 'k-gray-shaker', n: 'Gray Shaker', at: '26% 24%', pos: '45% 50%' },
    { k: 'k-turquoise', n: 'Turquoise backsplash', at: '30% 56%', pos: '45% 55%' },
    { k: 'k-navy-white', n: 'Navy and white', at: '32% 26%', pos: '50% 50%' },
    { k: 'k-brass-hood', n: 'Brass-banded hood', at: '33% 30%', pos: '35% 50%' }
  ];
  var EZO = 'expo.out', MOVE = 'power3.inOut';

  EZ.section('hero', { 1: { init: function (root, k) {
    html.dataset.navOn = 'ground';
    k.add(function () { delete html.dataset.navOn; });
    var sec = root.closest('section'), frame = root.querySelector('.hm__frame'), full = root.querySelector('.hm__full'),
      word = root.querySelector('.hm__word'), house = root.querySelector('.hm__house'), img = root.querySelector('.hm__img'),
      name = root.querySelector('.hm__name'), rail = root.querySelector('.hm__rail'), track = root.querySelector('.hm__track'),
      box = root.querySelector('.hm__sw');
    house.dataset.buddy = 'image';
    var P = (window.__DATA || {}).projects || [];
    function title(key) { var p = P.filter(function (x) { return x.k === key; })[0]; return p ? p.t : ''; }

    /* ---------- the kitchen: one photo in three places (the window, the room, the letters) ---------- */
    function setPhoto(f) {
      var u = EZ.img(f.k);
      img.setAttribute('href', u);
      img.setAttribute('preserveAspectRatio', 'xMidYMid slice');
      full.style.backgroundImage = word.style.backgroundImage = 'url(' + u + ')';
      full.style.backgroundPosition = f.pos;
      name.textContent = title(f.d || f.k);
      house.setAttribute('aria-label', title(f.d || f.k) + ', built by Elbaz');
    }
    setPhoto(FIN[0]);

    /* ---------- V1's finish picker (radiogroup, roving tabindex, 44px targets) ---------- */
    var cur = 0;
    box.innerHTML = FIN.map(function (f, i) {
      return '<button type="button" role="radio" class="hm__s" aria-checked="' + (i ? 'false' : 'true') + '" tabindex="' + (i ? -1 : 0) + '" aria-label="' + f.n + '" style="--sw:url(' + EZ.img(f.d || f.k) + ');--at:' + f.at + '"></button>';
    }).join('');
    var sws = Array.prototype.slice.call(box.children);
    k.add(function () { box.innerHTML = ''; });
    function pick(i, focus) {
      if (i === cur) return;
      cur = i;
      sws.forEach(function (s, j) { s.setAttribute('aria-checked', j === i ? 'true' : 'false'); s.tabIndex = j === i ? 0 : -1; });
      if (focus) sws[i].focus();
      EZ.pickedRoom = 'Kitchen';
      if (!k.motion) { setPhoto(FIN[i]); return; }
      // a crossfade masked by a 2px blur [S0063], all three places together so they never disagree
      var tgt = [img, full, word];
      gsap.to(tgt, { opacity: 0, filter: 'blur(2px)', duration: .14, ease: 'power2.in', overwrite: true, onComplete: function () {
        setPhoto(FIN[i]);
        gsap.to(tgt, { opacity: function (n, t) { return t === word ? '' : 1; }, filter: 'blur(0px)', duration: .26, ease: EZO, clearProps: 'opacity,filter' });
      } });
    }
    sws.forEach(function (s, i) {
      k.on(s, 'click', function () { pick(i); });
      k.on(s, 'keydown', function (e) {
        var d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
        if (d) { e.preventDefault(); pick((cur + d + FIN.length) % FIN.length, true); }
      });
    });

    /* ---------- the reveal: the house window opens out to the full room ---------- */
    var st = { p: 0 }, geo = { t: 0, r: 0, b: 0, l: 0, mob: false };
    function measure() {
      var fr = frame.getBoundingClientRect(), hr = house.getBoundingClientRect();
      // the window's own rectangle below the roof line (the roof path starts at 156/470 of the house height)
      var top = hr.top + hr.height * (6 / 470);
      geo.t = top - fr.top; geo.l = hr.left - fr.left; geo.r = fr.right - hr.right; geo.b = fr.bottom - hr.bottom;
      geo.mob = matchMedia('(max-width: 900px)').matches;
      // OWNER (smooth reveal) · stacked layouts: the room opens into a full-width band under the copy, shaped close to the
      // photo, instead of the whole tall frame (which cropped a wide kitchen down to one corner of the island)
      if (geo.mob) {
        geo.wh = hr.bottom - top;
        geo.band = Math.max(geo.wh, Math.min(fr.bottom - top - 90, fr.width * 1.08));
        full.style.top = geo.t + 'px'; full.style.bottom = 'auto'; full.style.height = geo.band + 'px';
      } else { full.style.top = full.style.bottom = full.style.height = ''; }
      frame.style.setProperty('--tw', track.getBoundingClientRect().width + 'px');
      apply();
    }
    // OWNER (smooth reveal): every layer gets its own eased curve over a real stretch of the scroll. Before, the room
    // photo, the window's picture and the copy panel all switched within the first 8% of the reveal, and the room is
    // framed differently from the window, so the picture jumped. Now the window opens out with a soft start and finish,
    // the two pictures crossfade slowly, and the room settles from a slight zoom (a camera pull, not a cut).
    function sm(t) { t = Math.max(0, Math.min(1, t)); return t * t * (3 - 2 * t); }
    function apply() {
      var q = st.p, ce = sm(q), e = 1 - ce, o = 12;   // .hm__full is inset -12px (parallax room)
      frame.style.setProperty('--p', q.toFixed(4));
      frame.style.setProperty('--fo', sm(q / .38).toFixed(4));            // the room fades in
      frame.style.setProperty('--wo', (1 - sm((q - .04) / .34)).toFixed(4));   // the window's picture fades out across it
      frame.style.setProperty('--ao', (1 - sm((q - .06) / .42)).toFixed(4));   // the house drawing steps back
      frame.style.setProperty('--bk', sm(q / .45).toFixed(4));            // the copy panel firms up
      frame.style.setProperty('--fs', (1.14 - .14 * ce).toFixed(4));      // the room settles from a slight zoom
      frame.style.setProperty('--ct', (geo.mob ? 0 : o + geo.t * e).toFixed(1) + 'px');
      frame.style.setProperty('--cr', (o + geo.r * e).toFixed(1) + 'px');
      frame.style.setProperty('--cb', (geo.mob ? (geo.band - geo.wh) * e : o + geo.b * e).toFixed(1) + 'px');
      frame.style.setProperty('--cl', (o + geo.l * e).toFixed(1) + 'px');
      var v = Math.round(q * 100);
      rail.setAttribute('aria-valuenow', v);
      rail.setAttribute('aria-valuetext', v === 0 ? 'Closed: the house' : v === 100 ? 'Open: the whole room' : 'Opening, ' + v + ' percent');
    }
    k.add(function () { full.style.top = full.style.bottom = full.style.height = ''; });
    k.ro(frame, measure);
    measure();
    function setP(v, animate) {
      v = Math.max(0, Math.min(1, v));
      if (animate && k.motion) gsap.to(st, { p: v, duration: .4, ease: MOVE, overwrite: true, onUpdate: apply });
      else { gsap.killTweensOf(st); st.p = v; apply(); }
    }

    // drag on the rail (pointer capture, the track maps 1:1) [S1018]
    var dragging = false;
    function fromX(x) { var r = track.getBoundingClientRect(); return (x - r.left) / r.width; }
    k.on(rail, 'pointerdown', function (e) { dragging = true; rail.setPointerCapture(e.pointerId); setP(fromX(e.clientX)); });
    k.on(rail, 'pointermove', function (e) { if (dragging) setP(fromX(e.clientX)); });
    k.on(rail, 'pointerup', function () { dragging = false; });
    k.on(rail, 'pointercancel', function () { dragging = false; });
    // keys: arrows step 10%, Page keys 25%, Home / End [S1018 keyboard parity]
    k.on(rail, 'keydown', function (e) {
      var s = { ArrowRight: .1, ArrowUp: .1, ArrowLeft: -.1, ArrowDown: -.1, PageUp: .25, PageDown: -.25 }[e.key];
      if (e.key === 'Home') { e.preventDefault(); setP(0, true); return; }
      if (e.key === 'End') { e.preventDefault(); setP(1, true); return; }
      if (s) { e.preventDefault(); setP(st.p + s, true); }
    });

    if (k.motion) {
      /* ---------- scroll: a short pin (70% of a viewport) plays the reveal, then the frame pulls back (Z-pull exit,
         the carrier into Proof) and the pin releases [S0186 ease none, S1209 finite pin, S0576 shrinking exit] ---------- */
      // QA-1: the choice follows the layout, not the pointer: a stacked hero (900px and under, phones and tablets) puts the art
      // below the headline; before, the scroll reveal finished first and the finish picker was never seen on a phone or tablet
      var stacked = k.mobile || matchMedia('(max-width: 900px)').matches;
      if (!stacked) {
        var tl = gsap.timeline({ scrollTrigger: { trigger: root, start: function () { return 'top ' + parseFloat(getComputedStyle(sec).paddingTop) + 'px'; }, end: '+=115%', pin: root, pinSpacing: true, scrub: 1.1, invalidateOnRefresh: true } });   // pin the version where it already sits under the nav (start = scroll 0)
        tl.to(st, { p: 1, ease: 'none', duration: .78, onUpdate: apply })
          .to(frame, { scale: .965, ease: 'none', duration: .22 });
      } else {
        // stacked (QA-1, per the QA completion: a pin is never removed as a fix): the hero pins once the art and its finish
        // picker are centred on screen, the reveal plays while pinned, and the pin releases [S1209 finite pin, S0186 scrub].
        // Before, the reveal ran from the first pixel of scroll and finished before the picker ever arrived.
        var stl = gsap.timeline({ scrollTrigger: { trigger: root.querySelector('.hm__art'), start: 'center center', end: '+=95%', pin: root, pinSpacing: true, scrub: 1.1, invalidateOnRefresh: true } });
        stl.to(st, { p: 1, ease: 'none', duration: 1, onUpdate: apply });
        // a keyboard user who Tabs into the house art (the finish picker) lands at the pin's start, where the house is whole and
        // the picker readable; without this, the focus scroll could land inside the reveal and the picker would be faded
        k.on(root.querySelector('.hm__art'), 'focusin', function () { k.timeout(function () { var t = stl.scrollTrigger; if (t && t.progress > 0) window.scrollTo(0, Math.round(t.start)); }, 60); });   // after the browser's own focus scroll
      }

      /* ---------- V8's reacting background: three depths answer the pointer ---------- */
      if (k.fine) {
        var mv = { x: 0, y: 0 };
        var qx = gsap.quickTo(mv, 'x', { duration: .8, ease: 'power3.out', onUpdate: depth });
        var qy = gsap.quickTo(mv, 'y', { duration: .8, ease: 'power3.out', onUpdate: depth });
        function depth() {
          full.style.transform = 'translate3d(' + (mv.x * -10).toFixed(2) + 'px,' + (mv.y * -8).toFixed(2) + 'px,0)';
          word.style.backgroundPosition = 'calc(50% + ' + (mv.x * 26).toFixed(1) + 'px) calc(50% + ' + (mv.y * 18).toFixed(1) + 'px)';
          img.setAttribute('x', (mv.x * -9).toFixed(2)); img.setAttribute('y', (mv.y * -7).toFixed(2));
        }
        k.on(frame, 'pointermove', function (e) {
          if (e.pointerType === 'touch') return;
          var r = frame.getBoundingClientRect();
          qx((e.clientX - r.left) / r.width * 2 - 1); qy((e.clientY - r.top) / r.height * 2 - 1);
        });
        k.on(frame, 'pointerleave', function () { qx(0); qy(0); });
        k.add(function () { full.style.transform = ''; word.style.backgroundPosition = ''; img.removeAttribute('x'); img.removeAttribute('y'); });
      }

      /* ---------- load beat: the roof is drawn from the apex out, the window opens, the lines rise, the letters arrive ---------- */
      var rises = root.querySelectorAll('.hh .rise');
      var lt = gsap.timeline({ defaults: { ease: EZO } });
      lt.fromTo(root.querySelector('.hm__roof'), { drawSVG: '50% 50%' }, { drawSVG: '0% 100%', duration: .6, ease: MOVE }, 0)
        .fromTo(root.querySelector('.hm__win'), { clipPath: 'inset(40% 30% 0% 30%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: .7, ease: MOVE, clearProps: 'clipPath' }, .2)
        .fromTo(img, { scale: 1.12, transformOrigin: '50% 60%' }, { scale: 1, duration: .9, clearProps: 'transform' }, .2)
        .fromTo(rises, { yPercent: 110 }, { yPercent: 0, duration: .8, stagger: .08, clearProps: 'transform' }, .1)
        .fromTo(word, { yPercent: 18 }, { yPercent: 0, duration: 1, clearProps: 'transform' }, .35)
        .fromTo(root.querySelectorAll('.hm__rv'), { scale: 0 }, { scale: 1, duration: .3, stagger: .05, ease: 'back.out(1.6)', clearProps: 'transform' }, .5)
        .fromTo(rail, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: .4, clearProps: 'transform,opacity,visibility' }, .75);
    }
  } },

  /* NEW VERSIONS · Hero V2 "The wall" (governing reference: Immersive Garden, the camera scrub, rebuilt in 2D transforms).
     A gallery wall hung with the 26 photographed projects, one photograph each, with the copy hung on it as its label.
     One camera (translate + scale on one layer) is the only thing that moves: at rest it frames the label with the work
     around it; the scroll pulls it back until the whole wall is in view [S1328 one connected world, S0186 pin + scrub,
     S1326 one reversible value, S1209 native scroll, finite pin]. Any photograph can be flown to (click, tap, or keyboard
     focus), named and opened; arrow keys walk the wall; Escape steps back [S1018, S0083 one focal point]. The pointer
     leans the camera a little. Reduced motion: no pin, no travel, the same wall and every action, instantly [S0400]. */
  2: { init: function (root, k) {
    html.dataset.navOn = 'ground';
    k.add(function () { delete html.dataset.navOn; });
    var stage = root.querySelector('.hw__stage'), cam = root.querySelector('.hw__cam'), plate = root.querySelector('.hw__plate'),
      wall = root.querySelector('.hw__wall'), tip = root.querySelector('.hw__tip'), hint = root.querySelector('.hw__hint'),
      card = root.querySelector('.hw__card'), capT = root.querySelector('.hw__t');
    var PR = ((window.__DATA || {}).projects || []).slice();
    // hang order: kitchens, baths and whole homes mixed so no two neighbours repeat a room where it can be helped
    var byC = { k: [], b: [], w: [] };
    PR.forEach(function (p) { (byC[p.c] || byC.w).push(p); });
    var PAT = 'kbkbwbkbkbwkbkbwbkbkbwbkbk', ORD = [];
    PAT.split('').forEach(function (c) { var q = byC[c].length ? byC[c] : (byC.b.length ? byC.b : byC.k.length ? byC.k : byC.w); if (q.length) ORD.push(q.shift()); });
    ['k', 'b', 'w'].forEach(function (c) { while (byC[c].length) ORD.push(byC[c].shift()); });
    var N = ORD.length;
    var ALL = ORD.map(function (p) { return { key: p.k, title: p.t, alt: p.t + ', an Elbaz project' }; });

    wall.innerHTML = ORD.map(function (p, i) {
      return '<li class="hw__c"><button type="button" class="hw__t" data-i="' + i + '" tabindex="' + (i ? -1 : 0) + '" aria-label="' + p.t.replace(/"/g, '&quot;') + '"><span class="hw__fr"><img src="' + EZ.img(p.k) + '" alt="" decoding="async" draggable="false"></span></button></li>';
    }).join('') + '<li class="hw__lab" aria-hidden="true" hidden><p><b class="nums">' + N + '</b> projects. One photograph each, all our own work.</p></li>';
    var cells = Array.prototype.slice.call(wall.querySelectorAll('.hw__c')), tiles = cells.map(function (c) { return c.firstChild; });
    var lab = wall.querySelector('.hw__lab');
    k.add(function () { wall.innerHTML = ''; cam.style.transform = ''; plate.style.cssText = ''; wall.style.cssText = ''; });

    /* ---------- layout: the wall in its own pixels, the label at its natural size (camera scale 1 = crisp type) ---------- */
    var G = {}, cam0 = {}, cam1 = {}, rect = [];
    function layout() {
      var W = stage.clientWidth, H = stage.clientHeight; if (!W || !H) return;
      var phone = W < 600, tab = !phone && W < 1000;
      var C = phone ? 4 : tab ? 4 : 6, pc = phone ? 4 : 2, g = phone ? 8 : tab ? 12 : 14;
      var PW = phone ? W - 32 : tab ? Math.round(W * .62) : Math.round(Math.max(560, Math.min(680, W * .44)));
      var cw = (PW - (pc - 1) * g) / pc;
      plate.style.cssText = 'width:' + PW + 'px;height:auto;left:0;top:0;--pw:' + PW + 'px';
      var ph = plate.offsetHeight, ch, pr;
      if (!phone && !tab) { pr = 2; ch = Math.max(cw * .74, (ph - g) / 2); }
      else { pr = Math.max(2, Math.round((ph + g) / ((phone ? cw * .92 : cw * .8) + g))); ch = (ph + g) / pr - g; }   // rows fit the label exactly
      var inPlate = pr * (C - pc), rest = Math.max(0, N - inPlate), other = Math.ceil(rest / C), spare = other * C - rest;
      var ra = phone ? Math.floor(other / 2) : Math.max(1, Math.floor(other / 2)), R = other + pr, c0 = (C - pc) / 2;
      var sx = cw + g, sy = ch + g, n = 0, slots = [];
      for (var r = 0; r < R; r++) for (var c = 0; c < C; c++) {
        if (r >= ra && r < ra + pr && c >= c0 && c < c0 + pc) continue;
        slots.push([c, r]);
      }
      rect = [];
      cells.forEach(function (el, i) {
        var sl = slots[i], x = sl[0] * sx, y = sl[1] * sy;
        rect[i] = { x: x, y: y, w: cw, h: ch, c: sl[0], r: sl[1] };
        el.style.cssText = 'left:' + x + 'px;top:' + y + 'px;width:' + cw + 'px;height:' + ch + 'px';
      });
      if (spare > 0) {   // the spare cells at the end of the last row carry the wall's own label
        var ls = slots[N]; lab.hidden = false;
        lab.style.cssText = 'left:' + ls[0] * sx + 'px;top:' + ls[1] * sy + 'px;width:' + (spare * cw + (spare - 1) * g) + 'px;height:' + ch + 'px';
      } else lab.hidden = true;
      var phH = pr * ch + (pr - 1) * g;
      plate.style.cssText = 'width:' + PW + 'px;height:' + phH + 'px;left:' + c0 * sx + 'px;top:' + ra * sy + 'px;--pw:' + PW + 'px';
      var WW = C * cw + (C - 1) * g, WH = R * ch + (R - 1) * g;
      wall.style.width = WW + 'px'; wall.style.height = WH + 'px';
      var bot = phone ? (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--mbar-h')) || 64) : 0, hud = 64;
      G = { W: W, H: H, WW: WW, WH: WH, phone: phone, C: C, bot: bot,
        pcx: c0 * sx + PW / 2, pcy: ra * sy + phH / 2 };
      // the first frame: the label centred, the work around it; the last: the whole wall, clear of the hint (and the call bar)
      cam0 = { s: 1, cx: G.pcx, cy: G.pcy };
      var s1 = Math.min(W * .92 / WW, (H - bot - hud) * .92 / WH, 1);
      cam1 = { s: s1, cx: WW / 2, cy: WH / 2 + (bot + hud) / 2 / s1 - 8 / s1 };
      render();
    }

    /* ---------- the camera: base (scroll) + lean (pointer) + flight (a chosen photograph), one transform ---------- */
    var st = { p: 0 }, lean = { x: 0, y: 0 }, fl = { f: 0, i: -1, s: 1, cx: 0, cy: 0 }, flyY = 0;
    function sm(t) { t = Math.max(0, Math.min(1, t)); return t * t * (3 - 2 * t); }
    function base() {
      var e = sm(st.p), s = Math.exp(Math.log(cam0.s) * (1 - e) + Math.log(cam1.s) * e);
      return { s: s, cx: cam0.cx + (cam1.cx - cam0.cx) * e, cy: cam0.cy + (cam1.cy - cam0.cy) * e, e: e };
    }
    function render() {
      if (!G.W) return;
      var b = base(), f = fl.f;
      var s = b.s + (fl.s - b.s) * f, cx = b.cx + (fl.cx - b.cx) * f, cy = b.cy + (fl.cy - b.cy) * f;
      var tx = G.W / 2 - cx * s + lean.x * (1 - f), ty = G.H / 2 - cy * s + lean.y * (1 - f);
      cam.style.transform = 'translate3d(' + tx.toFixed(2) + 'px,' + ty.toFixed(2) + 'px,0) scale(' + s.toFixed(5) + ')';
      // depth: at the label the wall is close, so its tiles sit a little apart; stepping back closes them into the flat hang
      var d = (1 - b.e) * (1 - f) * (k.motion ? .055 : 0);
      if (d > .0005 || cells[0].style.transform) cells.forEach(function (el, i) {
        var r = rect[i]; if (!r) return;
        el.style.transform = d > .0005 ? 'translate3d(' + ((r.x + r.w / 2 - G.pcx) * d).toFixed(1) + 'px,' + ((r.y + r.h / 2 - G.pcy) * d).toFixed(1) + 'px,0)' : '';
      });
      hint.classList.toggle('is-back', b.e > .85);
      hint.classList.toggle('is-off', f > .02);
    }
    k.ro(stage, layout);
    layout();
    k.add(function () { cells.forEach(function (el) { el.style.cssText = ''; }); });

    /* ---------- flight: a photograph to the middle, named; the rest of the wall steps back ---------- */
    var cur = 0;
    function rove(i) { tiles.forEach(function (t, j) { t.tabIndex = j === i ? 0 : -1; }); cur = i; }
    function fly(i, focus) {
      var r = rect[i]; if (!r) return;
      rove(i);
      var cardH = G.phone ? 150 : 96, room = G.H - G.bot - cardH - 40;
      fl.i = i; fl.s = Math.min(G.W * (G.phone ? .86 : .62) / r.w, room * .9 / r.h); fl.cx = r.x + r.w / 2; fl.cy = r.y + r.h / 2 + (G.bot + cardH) / 2 / fl.s;
      flyY = window.scrollY;
      cells.forEach(function (el, j) { el.classList.toggle('is-dim', j !== i); el.classList.toggle('is-on', j === i); });
      root.classList.add('is-flown');
      capT.textContent = ORD[i].t;
      card.hidden = false;
      tip.classList.remove('is-on');
      if (focus) tiles[i].focus({ preventScroll: true });
      if (k.motion) gsap.to(fl, { f: 1, duration: fl.f > .5 ? .55 : .8, ease: 'power3.inOut', overwrite: true, onUpdate: render });
      else { fl.f = 1; render(); }
    }
    function land(refocus) {
      if (fl.i < 0) return;
      var i = fl.i; fl.i = -1;
      cells.forEach(function (el) { el.classList.remove('is-dim', 'is-on'); });
      root.classList.remove('is-flown');
      card.hidden = true;
      if (refocus) tiles[i].focus({ preventScroll: true });
      if (k.motion) gsap.to(fl, { f: 0, duration: .7, ease: 'power3.inOut', overwrite: true, onUpdate: render });
      else { fl.f = 0; render(); }
    }
    function openLarge(i) { EZ.viewer.open(ALL, i, tiles[i].querySelector('img')); }
    k.on(wall, 'click', function (e) {
      var t = e.target.closest('.hw__t'); if (!t) return;
      var i = +t.dataset.i;
      if (fl.i === i && fl.f > .6) openLarge(i); else fly(i);
    });
    // keyboard focus flies to the photograph it lands on (never a mouse press: that is a click)
    k.on(wall, 'focusin', function (e) {
      var t = e.target.closest('.hw__t'); if (!t || !t.matches(':focus-visible')) return;
      if (fl.i !== +t.dataset.i) fly(+t.dataset.i);
    });
    // arrow keys walk the wall as it hangs (row and column), Home / End to the ends, Escape steps back [S1018]
    k.on(wall, 'keydown', function (e) {
      var t = e.target.closest('.hw__t'); if (!t) return;
      var i = +t.dataset.i, r = rect[i], to = -1;
      if (e.key === 'Escape') { e.preventDefault(); land(true); return; }
      if (e.key === 'Home') to = 0; else if (e.key === 'End') to = N - 1;
      else {
        var dx = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0, dy = e.key === 'ArrowDown' ? 1 : e.key === 'ArrowUp' ? -1 : 0;
        if (!dx && !dy) return;
        var best = -1, bd = 1e9;
        rect.forEach(function (q, j) {
          var ddx = q.c - r.c, ddy = q.r - r.r, dist;
          if (dx) { if (ddy !== 0 || Math.sign(ddx) !== dx) return; dist = Math.abs(ddx); }   // along the row
          else { if (Math.sign(ddy) !== dy) return; dist = Math.abs(ddy) * 10 + Math.abs(ddx); }   // the nearest row, then column
          if (dist < bd) { bd = dist; best = j; }
        });
        if (best < 0 && dx) best = (i + dx + N) % N;   // a row's end wraps to the next photograph in hanging order
        to = best;
      }
      if (to < 0) return;
      e.preventDefault();
      fly(to, true);
    });
    k.on(root.querySelector('.hw__prev'), 'click', function () { fly((Math.max(fl.i, 0) - 1 + N) % N); });
    k.on(root.querySelector('.hw__next'), 'click', function () { fly((Math.max(fl.i, 0) + 1) % N); });
    k.on(root.querySelector('.hw__open'), 'click', function () { if (fl.i > -1) openLarge(fl.i); });
    k.on(root.querySelector('.hw__back'), 'click', function () { land(true); });
    k.on(card, 'keydown', function (e) { if (e.key === 'Escape') { e.preventDefault(); land(true); } });

    /* ---------- the pointer: a name card under the photograph it rests on, and a small lean of the camera ---------- */
    if (k.fine) {
      k.on(wall, 'pointerover', function (e) {
        var t = e.target.closest('.hw__t'); if (!t || e.pointerType === 'touch' || fl.f > .02) return;
        var q = t.getBoundingClientRect(), sr = stage.getBoundingClientRect();
        tip.textContent = ORD[+t.dataset.i].t;
        tip.style.left = Math.max(12, Math.min(sr.width - 12, q.left - sr.left + q.width / 2)) + 'px';
        tip.style.top = (q.bottom - sr.top + 8) + 'px';
        tip.classList.toggle('is-up', q.bottom - sr.top > sr.height - 70);
        if (tip.classList.contains('is-up')) tip.style.top = (q.top - sr.top - 8) + 'px';
        tip.classList.add('is-on');
      });
      k.on(wall, 'pointerout', function (e) { if (!e.relatedTarget || !e.relatedTarget.closest || !e.relatedTarget.closest('.hw__t')) tip.classList.remove('is-on'); });
    }
    if (k.motion && k.fine) {
      var qx = gsap.quickTo(lean, 'x', { duration: 1, ease: 'power3.out', onUpdate: render });
      var qy = gsap.quickTo(lean, 'y', { duration: 1, ease: 'power3.out', onUpdate: render });
      k.on(stage, 'pointermove', function (e) {
        if (e.pointerType === 'touch') return;
        var r = stage.getBoundingClientRect();
        qx(-((e.clientX - r.left) / r.width * 2 - 1) * 26); qy(-((e.clientY - r.top) / r.height * 2 - 1) * 18);
      });
      k.on(stage, 'pointerleave', function () { qx(0); qy(0); });
    }

    if (!k.motion) return;
    /* ---------- the scroll: a finite pin pulls the camera back from the label to the whole wall [S0186, S1209] ---------- */
    var navH = function () { return parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 68; };
    var tw = gsap.to(st, { p: 1, ease: 'none', onUpdate: function () {
      render();
      if (fl.i > -1 && Math.abs(window.scrollY - flyY) > 60) land(false);   // scrolling on is stepping back
    }, scrollTrigger: { trigger: root, start: function () { return 'top ' + navH() + 'px'; }, end: G.phone ? '+=90%' : '+=110%', pin: root, pinSpacing: true, scrub: 1, invalidateOnRefresh: true } });
    k.add(function () { tw.scrollTrigger && tw.scrollTrigger.kill(); tw.kill(); });

    /* ---------- the hang: the label's lines rise, then the photographs are hung outward from it ---------- */
    var frs = cells.map(function (c) { return c.querySelector('.hw__fr'); });
    var ds = rect.map(function (r) { return Math.hypot(r.x + r.w / 2 - G.pcx, r.y + r.h / 2 - G.pcy); }), dm = Math.max.apply(null, ds) || 1;
    var lt = gsap.timeline({ defaults: { ease: EZO } });
    lt.fromTo(plate.querySelectorAll('.hh .rise'), { yPercent: 110 }, { yPercent: 0, duration: .8, stagger: .08, clearProps: 'transform' }, .05)
      .fromTo(frs, { autoAlpha: 0, y: -18, rotation: function (i) { return i % 2 ? 1.6 : -1.6; } },
        { autoAlpha: 1, y: 0, rotation: 0, duration: .9, stagger: function (i) { return .15 + ds[i] / dm * .55; }, clearProps: 'transform,opacity,visibility' }, 0)
      .fromTo(hint, { autoAlpha: 0 }, { autoAlpha: 1, duration: .4, clearProps: 'opacity,visibility' }, .9);
  } }
  });
})();
