/* work, PLAN-V3 §3. Project titles are the firm's own (data/projects.json from FACTS.md). */
(function () {
  var CAT = { k: 'Kitchen', b: 'Bathroom', w: 'Whole home and outdoor' };
  function data() { return (window.__DATA || {}).projects || []; }

  EZ.section('work', {
    /* v1 · The plan room [BANK R10 grid-to-fullscreen + BANK 157 push grid via Flip] */
    1: { init: function (root, k) {
      var grid = root.querySelector('.work1__grid');
      var items = Array.prototype.slice.call(root.querySelectorAll('.work1__it'));
      var fbtns = Array.prototype.slice.call(root.querySelectorAll('.work1__f'));
      var more = root.querySelector('.work1__more'), moreLabel = more.querySelector('.btn__label');
      var filter = 'all', all = false, open = null;
      EZ.reveal(k, root.querySelectorAll('.work__head > *'));
      function flip(fn) {
        if (!k.motion) { fn(); return; }
        var state = Flip.getState(items.concat([more]));
        fn();
        k.ctx.add(function () {
          Flip.from(state, { duration: .6, ease: 'power3.inOut', absolute: false, scale: false, nested: true,
            onEnter: function (els) { return gsap.fromTo(els, { autoAlpha: 0, scale: .92 }, { autoAlpha: 1, scale: 1, duration: .45, ease: 'power3.out' }); },
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
      k.add(function () { setOpen(null); items.forEach(function (it) { it.hidden = false; }); more.hidden = false; fbtns.forEach(function (x, i) { x.setAttribute('aria-pressed', i ? 'false' : 'true'); }); moreLabel.textContent = 'Show all ' + items.length + ' projects'; more.setAttribute('aria-expanded', 'false'); });
      if (k.motion) gsap.from(items.filter(function (it) { return !it.hidden; }), { y: 30, autoAlpha: 0, duration: .6, ease: 'power3.out', stagger: .05, scrollTrigger: { trigger: grid, start: 'top 85%', once: true } });
    } },

    /* v2 · On the turntable [BANK 88] */
    2: { init: function (root, k) {
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
          if (k.motion) k.ctx.add(function () { gsap.to(stage, { '--tint': d.tint, duration: .8, ease: 'power2.out', overwrite: 'auto' }); });
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
        k.on(track, 'pointerdown', function (e) { if (e.pointerType !== 'mouse') return; down = { x: e.clientX, l: track.scrollLeft, moved: false }; track.style.scrollSnapType = 'none'; track.setPointerCapture(e.pointerId); });
        k.on(track, 'pointermove', function (e) { if (!down) return; var dx = e.clientX - down.x; if (Math.abs(dx) > 5) down.moved = true; track.scrollLeft = down.l - dx; });
        function up() { if (!down) return; down = null; track.style.scrollSnapType = ''; go(cur); }
        k.on(track, 'pointerup', up); k.on(track, 'pointercancel', up);
        k.add(function () { track.style.scrollSnapType = ''; });
      }
      EZ.reveal(k, root.querySelectorAll('.work__head > *'));
    } },

    /* v3 · Taped to the board [BANK Lagom deck: slit clip inset(50% 0 50% 0); CSS sticky instead of a pin] */
    3: { init: function (root, k) {
      var cards = Array.prototype.slice.call(root.querySelectorAll('.work3__card'));
      EZ.reveal(k, root.querySelectorAll('.work__head > *'));
      if (!k.motion) return;
      cards.forEach(function (c, i) {
        var ph = c.querySelector('.work3__photo');
        // the slit opens as the card arrives
        k.ctx.add(function () {
          var o = { p: 0 };
          gsap.to(o, { p: 1, ease: 'none', scrollTrigger: { trigger: c, start: 'top 95%', end: 'top 40%', scrub: .5 },
            onUpdate: function () { var v = (50 * (1 - o.p)).toFixed(2); ph.style.clipPath = 'inset(' + v + '% 0 ' + v + '% 0)'; } });
          ph.style.clipPath = 'inset(50% 0 50% 0)';
          gsap.from(c.querySelectorAll('.work3__tape'), { scale: 1.6, autoAlpha: 0, duration: .35, ease: 'back.out(2.4)', stagger: .1, scrollTrigger: { trigger: c, start: 'top 45%', once: true } });
          if (!k.mobile && cards[i + 1]) {
            gsap.to(c, { scale: .9, filter: 'brightness(.55)', ease: 'none', scrollTrigger: { trigger: cards[i + 1], start: 'top bottom', end: 'top ' + (EZ.mobile() ? 80 : 120) + 'px', scrub: true } });
          }
        });
        k.add(function () { ph.style.clipPath = ''; });
      });
    } }
  });
})();
