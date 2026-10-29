/* work [PLAN-V2 2.6] */
(function () {
  var PROJECTS = [{"key": "k-navy-shaker", "title": "Navy Blue Shaker Kitchen with Brass Hardware and a Custom Range Hood", "cat": "Kitchens"}, {"key": "k-walnut-marble", "title": "Open-Concept Kitchen Remodel with Fluted Walnut Cabinetry and Bookmatched Marble", "cat": "Kitchens"}, {"key": "k-emerald-shaker", "title": "Emerald Shaker Kitchen Remodel with Wolf & Sub-Zero Appliance Suite", "cat": "Kitchens"}, {"key": "k-white-shaker", "title": "White Shaker Kitchen Remodel with Waterfall Quartz Island", "cat": "Kitchens"}, {"key": "k-turquoise", "title": "Two-Tone Kitchen Remodel with Turquoise Herringbone Backsplash", "cat": "Kitchens"}, {"key": "k-gray-shaker", "title": "Gray Shaker Kitchen Remodel with Wolf Range & Farmhouse Sink", "cat": "Kitchens"}, {"key": "k-navy-white", "title": "Two-Tone Navy & White Kitchen Remodel with Waterfall Quartz Island", "cat": "Kitchens"}, {"key": "k-chef", "title": "Chef-Grade Kitchen Remodel with Waterfall Quartz Island", "cat": "Kitchens"}, {"key": "k-brass-hood", "title": "Two-Tone Kitchen Remodel with Custom Brass-Banded Range Hood", "cat": "Kitchens"}, {"key": "k-stone-island", "title": "Two-Tone Kitchen Remodel with Waterfall Stone Island", "cat": "Kitchens"}, {"key": "b-black-marble", "title": "Black Marble Primary Bathroom with Freestanding Tub & Glass Wet Room", "cat": "Bathrooms"}, {"key": "b-polished-concrete", "title": "Polished-Concrete Primary Bath with Curbless Walk-In Shower", "cat": "Bathrooms"}, {"key": "b-spa-guest", "title": "Spa-Style Guest Bathroom Remodel with Curbless Shower & Backlit Mirrors", "cat": "Bathrooms"}, {"key": "b-fluted-vanity", "title": "Contemporary Primary Bath Remodel with Fluted Vanity & Freestanding Tub", "cat": "Bathrooms"}, {"key": "b-champagne", "title": "Champagne Bronze & Marble-Look Tile Bathroom Renovation", "cat": "Bathrooms"}, {"key": "b-emerald", "title": "Emerald Tile Walk-In Shower Bathroom Remodel", "cat": "Bathrooms"}, {"key": "b-copper", "title": "Walk-In Shower Bathroom Remodel with Copper Mosaic Tile Accents", "cat": "Bathrooms"}, {"key": "b-floating-soak", "title": "Floating Vanity Primary Bath with Soaking Tub & Walk-In Shower", "cat": "Bathrooms"}, {"key": "b-sea-glass", "title": "Sea-Glass Glazed Tile Bathroom Remodel with Double Vanity", "cat": "Bathrooms"}, {"key": "b-navy-niche", "title": "Navy Vanity Bathroom Remodel with Backlit Tile Niche", "cat": "Bathrooms"}, {"key": "b-white-marble", "title": "White Marble Guest Bath & Grey Stone Primary Suite Renovation", "cat": "Bathrooms"}, {"key": "b-multi-brass", "title": "Multi-Bathroom Renovation with Freestanding Tub & Brass-Accented Showers", "cat": "Bathrooms"}, {"key": "w-farmhouse", "title": "Modern Farmhouse Whole-Home Renovation", "cat": "Whole home"}, {"key": "w-bath-whole", "title": "Whole-Home Bathroom Renovation with Spa Showers & a Freestanding Soaking Tub", "cat": "Whole home"}, {"key": "r-openplan", "title": "Modern Open-Concept Kitchen and Living Area Renovation", "cat": "Whole home"}, {"key": "o-waterfront", "title": "Waterfront Backyard & Outdoor Living Transformation", "cat": "Outdoor"}];

  EZ.section('work', {
    /* v1 · the index: counted filters (AKLR) + Featured / Full (Jesper Landberg) + Flip */
    1: { init: function (root, k) {
      var items = Array.prototype.slice.call(root.querySelectorAll('.work1__item'));
      var fbtns = Array.prototype.slice.call(root.querySelectorAll('.work1__f'));
      var vbtns = Array.prototype.slice.call(root.querySelectorAll('.work1__view button'));
      var showing = root.querySelector('.work1__showing');
      var state = { view: 'featured', f: 'All' };
      function pool() { return items.filter(function (li) { return state.view === 'full' || li.dataset.featured === '1'; }); }
      function pad(n) { return ('0' + n).slice(-2); }
      function apply(animate) {
        var p = pool();
        // the counts prove depth before a click: each filter states how many projects it holds in this view
        fbtns.forEach(function (b) {
          var n = b.dataset.f === 'All' ? p.length : p.filter(function (li) { return li.dataset.cat === b.dataset.f; }).length;
          b.querySelector('sup').textContent = pad(n);
          b.disabled = n === 0;
          b.setAttribute('aria-pressed', b.dataset.f === state.f ? 'true' : 'false');
        });
        var flip = animate && k.motion ? Flip.getState(items) : null;
        items.forEach(function (li) {
          var on = p.indexOf(li) > -1 && (state.f === 'All' || li.dataset.cat === state.f);
          li.hidden = !on;
        });
        var shown = items.filter(function (li) { return !li.hidden; }).length;
        showing.textContent = 'Showing ' + shown + ' of the 52 photographed projects.';
        if (flip) k.ctx.add(function () {
          Flip.from(flip, { duration: .45, ease: 'power2.inOut', absolute: true, nested: true,
            onEnter: function (els) { return gsap.fromTo(els, { opacity: 0, scale: .96 }, { opacity: 1, scale: 1, duration: .3, ease: 'power2.out' }); },
            onLeave: function (els) { return gsap.to(els, { opacity: 0, duration: .2 }); } });
        });
      }
      fbtns.forEach(function (b) { k.on(b, 'click', function () { state.f = b.dataset.f; apply(true); }); });
      vbtns.forEach(function (b) {
        k.on(b, 'click', function () {
          state.view = b.dataset.view;
          vbtns.forEach(function (x) { x.setAttribute('aria-checked', x === b ? 'true' : 'false'); });
          var cur = fbtns.filter(function (x) { return x.dataset.f === state.f; })[0];
          apply(true);
          if (cur && cur.disabled) { state.f = 'All'; apply(false); }
        });
      });
      root.querySelectorAll('.work1__btn').forEach(function (btn) {
        k.on(btn, 'click', function () {
          var vis = items.filter(function (li) { return !li.hidden; }).map(function (li) { return PROJECTS[+li.querySelector('.work1__btn').dataset.i]; });
          var idx = vis.indexOf(PROJECTS[+btn.dataset.i]);
          EZ.viewer.open(vis.map(function (p) { return { key: p.key, title: p.title, alt: p.title + ', an Elbaz project' }; }), idx, btn);
        });
      });
      apply(false);
      k.add(function () { state = { view: 'featured', f: 'All' }; items.forEach(function (li) { li.hidden = false; }); });
      EZ.reveal(k, root.querySelectorAll('.work1__head > *'));
    } },

    /* v2 · the opening grid (Codrops Sticky Grid Scroll, values as in its source) */
    2: { init: function (root, k) {
      if (!k.motion || k.mobile) { root.classList.add('is-static'); k.add(function () { root.classList.remove('is-static'); }); return; }
      var block = root.querySelector('.work2__block'), wrapper = root.querySelector('.work2__wrapper');
      var content = root.querySelector('.work2__content'), title = root.querySelector('.work2__title');
      var desc = root.querySelector('.work2__desc'), btn = root.querySelector('.work2__btn');
      var grid = root.querySelector('.work2__grid'), items = root.querySelectorAll('.work2__item');
      gsap.set([desc, btn], { opacity: 0, pointerEvents: 'none' });
      var off = (content.offsetHeight - title.offsetHeight) / 2 / content.offsetHeight * 100;
      gsap.set(title, { yPercent: off });
      var cols = [[], [], []];
      items.forEach(function (it, i) { cols[i % 3].push(it); });
      gsap.from(wrapper, { yPercent: -100, ease: 'none', scrollTrigger: { trigger: block, start: 'top bottom', end: 'top top', scrub: true } });
      gsap.from(title, { opacity: 0, duration: .7, ease: 'power1.out', scrollTrigger: { trigger: block, start: 'top 57%', toggleActions: 'play none none reset' } });
      function reveal() {
        var tl = gsap.timeline(), h = innerHeight, r = h - (h - grid.offsetHeight) / 2;
        cols.forEach(function (c, o) {
          var even = o % 2 === 0;
          tl.from(c, { y: r * (even ? -1 : 1), stagger: { each: .06, from: even ? 'end' : 'start' }, ease: 'power1.inOut' }, 'grid-reveal');
        });
        return tl;
      }
      function zoom() {
        var tl = gsap.timeline({ defaults: { duration: 1, ease: 'power3.inOut' } });
        tl.to(grid, { scale: 2.05 })
          .to(cols[0], { xPercent: -40 }, '<')
          .to(cols[2], { xPercent: 40 }, '<')
          .to(cols[1], { yPercent: function (i) { return (i < Math.floor(cols[1].length / 2) ? -1 : 1) * 40; }, duration: .5, ease: 'power1.inOut' }, '-=0.5');
        return tl;
      }
      function toggle(show) {
        k.ctx.add(function () {
          gsap.timeline({ defaults: { overwrite: true } })
            .to(title, { yPercent: show ? 0 : off, duration: .7, ease: 'power2.inOut' })
            .to([desc, btn], { opacity: show ? 1 : 0, duration: .4, ease: 'power1.' + (show ? 'inOut' : 'out'), pointerEvents: show ? 'all' : 'none' }, show ? '-=90%' : '<');
        });
      }
      var master = gsap.timeline({ scrollTrigger: { trigger: block, start: 'top 25%', end: 'bottom bottom', scrub: true } });
      master.add(reveal()).add(zoom(), '-=0.6').add(function () { toggle(master.scrollTrigger.direction === 1); }, '-=0.32');
    } },

    /* v3 · the banner (Smeulders) */
    3: { init: function (root, k) {
      var slides = Array.prototype.slice.call(root.querySelectorAll('.work3__slide'));
      var cur = root.querySelector('.work3__cur'), ring = root.querySelector('.work3__ringp'), line = root.querySelector('.work3__line');
      var pauseBtn = root.querySelector('.work3__pause');
      var L = 169.65, B = 4, Y = 4, OE = 1.1, a = 0, busy = false, paused = !k.motion, inView = false, timer = null, drift = null;
      function words(el) {
        if (!el.dataset.split) { el.dataset.split = el.textContent; el.innerHTML = el.textContent.split(' ').map(function (w) { return '<span class="ww" style="display:inline-block">' + w + '</span>'; }).join(' '); }
        return el.querySelectorAll('.ww');
      }
      k.add(function () { slides.forEach(function (s) { var t = s.querySelector('.work3__t'); if (t.dataset.split) { t.textContent = t.dataset.split; delete t.dataset.split; } }); });
      function count(s) { return +s.dataset.count || 1; }
      // multi-image slides drift: xPercent +-4, scale 1.1 over 4s linear, images crossfading .6s power1.inOut
      function startDrift(s) {
        if (drift) { drift.kill(); drift = null; }
        var imgs = s.querySelectorAll('.work3__bg');
        gsap.set(imgs, { opacity: 0, xPercent: 0, scale: 1, zIndex: 1 });
        gsap.set(imgs[0], { opacity: 1 });
        if (imgs.length < 2 || !k.motion) return;
        var t = 0, dir = 1;
        function step() {
          var d = imgs[t], kx = dir === 1 ? Y : -Y;
          gsap.set(d, { xPercent: 0, scale: 1, zIndex: 2 });
          gsap.fromTo(d, { opacity: 0 }, { opacity: 1, duration: .6, ease: 'power1.inOut' });
          drift = gsap.to(d, { xPercent: kx, scale: OE, duration: B, ease: 'linear', onComplete: function () {
            var n = (t + 1) % imgs.length; dir *= -1;
            gsap.set(imgs[n], { xPercent: 0, scale: 1, opacity: 0, zIndex: 1 });
            gsap.to(d, { opacity: 0, duration: .6, ease: 'power1.inOut', onComplete: function () { gsap.set(d, { zIndex: 1 }); } });
            t = n; step();
          } });
        }
        step();
      }
      // ring timer: dashoffset to 0 over (duration - 1)s linear, then back over 1s power2.in
      function runRing(dur) {
        gsap.killTweensOf(ring); gsap.set(ring, { strokeDashoffset: L });
        if (paused || !inView) return;
        gsap.to(ring, { strokeDashoffset: 0, duration: Math.max(dur - 1, .1), ease: 'linear', onComplete: function () {
          gsap.to(ring, { strokeDashoffset: L, duration: 1, ease: 'power2.in' });
        } });
        clearTimeout(timer);
        timer = k.timeout(function () { go((a + 1) % slides.length); }, dur * 1000);
      }
      function go(n) {
        if (busy || n === a) return;
        busy = true;
        var s = slides[a], c = slides[n];
        s.setAttribute('aria-hidden', 'true'); c.setAttribute('aria-hidden', 'false');
        cur.textContent = String(n + 1);
        k.ctx.add(function () {
          gsap.to(s, { autoAlpha: 0, duration: k.motion ? 1 : 0, ease: 'power2.inOut' });
          gsap.fromTo(c, { autoAlpha: 0 }, { autoAlpha: 1, duration: k.motion ? 1 : 0, ease: 'power2.inOut', onComplete: function () { a = n; busy = false; } });
          if (k.motion) gsap.fromTo(words(c.querySelector('.work3__t')), { opacity: 0, y: 24, rotate: .01 }, { opacity: 1, y: 0, rotate: 0, duration: .85, ease: 'power3.out', stagger: .06, delay: .15, clearProps: 'transform' });
          startDrift(c);
        });
        if (!k.motion) { a = n; busy = false; }
        runRing(count(c) * B);
      }
      gsap.set(slides, { autoAlpha: 0 }); gsap.set(slides[0], { autoAlpha: 1 });
      startDrift(slides[0]);
      root.querySelectorAll('.work3__arrow').forEach(function (b) {
        k.on(b, 'click', function () { go((a + +b.dataset.dir + slides.length) % slides.length); });
      });
      var slider = root.querySelector('.work3__slider');
      k.on(slider, 'keydown', function (e) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); e.stopPropagation(); go((a + (e.key === 'ArrowRight' ? 1 : -1) + slides.length) % slides.length); }
      });
      var sx = null;
      k.on(slider, 'pointerdown', function (e) { if (e.pointerType !== 'mouse') sx = e.clientX; });
      k.on(slider, 'pointerup', function (e) { if (sx == null) return; var dx = e.clientX - sx; sx = null; if (Math.abs(dx) > 40) go((a + (dx < 0 ? 1 : -1) + slides.length) % slides.length); });
      pauseBtn.hidden = !k.motion;
      k.on(pauseBtn, 'click', function () {
        paused = !paused; pauseBtn.textContent = paused ? 'Play' : 'Pause'; pauseBtn.setAttribute('aria-pressed', paused ? 'true' : 'false');
        if (paused) { clearTimeout(timer); gsap.killTweensOf(ring); gsap.set(ring, { strokeDashoffset: L }); } else runRing(count(slides[a]) * B);
      });
      k.io(slider, function (e) {
        var was = inView; inView = e.isIntersecting;
        if (inView && !was) runRing(count(slides[a]) * B);
        if (!inView) { clearTimeout(timer); gsap.killTweensOf(ring); }
      }, { threshold: .35 });
      k.add(function () { clearTimeout(timer); if (drift) drift.kill(); });
      EZ.reveal(k, root.querySelectorAll('.work3__head > *'));
      if (k.motion) {
        // line ornament grows across the banner: scaleX 0 -> 1, 1.1s power3.out (Smeulders main.js)
        gsap.fromTo(line, { scaleX: 0, opacity: .35 }, { scaleX: 1, opacity: 1, duration: 1.1, ease: 'power3.out', delay: .3, scrollTrigger: { trigger: slider, start: 'top 70%', once: true } });
      }
    } }
  });
})();
