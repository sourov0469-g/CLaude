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
      frame.style.setProperty('--tw', track.getBoundingClientRect().width + 'px');
      apply();
    }
    function apply() {
      var q = st.p, e = 1 - q, o = 12;   // .hm__full is inset -12px (parallax room)
      frame.style.setProperty('--p', q.toFixed(4));
      frame.style.setProperty('--ct', (o + (geo.mob ? geo.t : geo.t * e)).toFixed(1) + 'px');
      frame.style.setProperty('--cr', (o + geo.r * e).toFixed(1) + 'px');
      frame.style.setProperty('--cb', (o + geo.b * e).toFixed(1) + 'px');
      frame.style.setProperty('--cl', (o + geo.l * e).toFixed(1) + 'px');
      var v = Math.round(q * 100);
      rail.setAttribute('aria-valuenow', v);
      rail.setAttribute('aria-valuetext', v === 0 ? 'Closed: the house' : v === 100 ? 'Open: the whole room' : 'Opening, ' + v + ' percent');
    }
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
        var tl = gsap.timeline({ scrollTrigger: { trigger: root, start: function () { return 'top ' + parseFloat(getComputedStyle(sec).paddingTop) + 'px'; }, end: '+=70%', pin: root, pinSpacing: true, scrub: .8, invalidateOnRefresh: true } });   // pin the version where it already sits under the nav (start = scroll 0)
        tl.to(st, { p: 1, ease: 'none', duration: .78, onUpdate: apply })
          .to(frame, { scale: .965, ease: 'none', duration: .22 });
      } else {
        // stacked: scroll leaves the house as it is (the picker stays readable and usable); the rail under the art, by touch,
        // drag or keys, plays the reveal. A scroll-driven reveal here either finished before the art arrived or laid the
        // caption over the room photo.
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
  } } });
})();
