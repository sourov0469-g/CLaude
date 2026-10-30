/* Kitchens page, section 1 · kitchen-intro. Photos are the firm's own projects, titled with the firm's own titles
   (FACTS.md); the two photos whose subject does not match their title are not used on the inner pages. */
(function () {
  EZ.section('kitchen-intro', {
    /* v1 · Split poster: the dimension lines draw across and up the photo once it is in view */
    1: { init: function (root, k) {
      EZ.reveal(k, root.querySelectorAll('.ki1__copy > *'));
      if (k.motion) gsap.from(root.querySelectorAll('.ki1__dl, .ki1__tick'), { drawSVG: '0%', duration: .7, ease: 'power2.inOut', stagger: .12, scrollTrigger: { trigger: root.querySelector('.ki1__fig'), start: 'top 80%', once: true } });
    } },

    /* v2 · Full-bleed photo with a title card: the hood is drawn, then the card settles */
    2: { init: function (root, k) {
      if (!k.motion) return;
      gsap.timeline({ scrollTrigger: { trigger: root, start: 'top 80%', once: true } })
        .from(root.querySelector('.ki2__card'), { y: 30, autoAlpha: 0, duration: .45, ease: 'power3.out' })
        .from(root.querySelector('.ki2__hood path'), { drawSVG: '0%', duration: .8, ease: 'power2.inOut' }, .1)
        .from(root.querySelectorAll('.ki2__card > :not(svg)'), { y: 12, autoAlpha: 0, duration: .3, stagger: .06 }, .2);
    } },

    /* v3 · The cabinet run: five doors; pointer or focus swings a door open on its kitchen, Escape or leaving shuts it */
    3: { init: function (root, k) {
      var run = root.querySelector('.ki3__run');
      var K = [['k-navy-shaker', 'Navy Blue Shaker Kitchen with Brass Hardware and a Custom Range Hood'], ['k-gray-shaker', 'Gray Shaker Kitchen Remodel with Wolf Range & Farmhouse Sink'],
        ['k-brass-hood', 'Two-Tone Kitchen Remodel with Custom Brass-Banded Range Hood'], ['k-stone-island', 'Two-Tone Kitchen Remodel with Waterfall Stone Island'], ['k-navy-white', 'Two-Tone Navy & White Kitchen Remodel with Waterfall Quartz Island']];
      var all = K.map(function (x) { return { key: x[0], title: x[1], alt: x[1] + ', an Elbaz project' }; });
      K.forEach(function (x, i) {
        var bay = document.createElement('div'); bay.className = 'ki3__bay'; bay.setAttribute('role', 'listitem');
        bay.innerHTML = '<img src="' + EZ.img(x[0]) + '" alt="" loading="lazy"><span class="ki3__cap">' + x[1].replace(/&/g, '&amp;') + '</span>' +
          '<button type="button" class="ki3__door" data-i="' + i + '" data-rx="native:cabinet-door" aria-label="Open the door on ' + x[1].replace(/&/g, '&amp;') + ', then select to see it large"></button>';
        run.appendChild(bay);
      });
      var bays = Array.prototype.slice.call(run.querySelectorAll('.ki3__bay'));
      if (EZ.bindReactions) EZ.bindReactions(run, k);
      function open(b, on) { b.classList.toggle('is-open', on); }
      bays.forEach(function (b) {
        var d = b.querySelector('.ki3__door');
        k.on(b, 'pointerenter', function (e) { if (e.pointerType === 'mouse') open(b, true); });
        k.on(b, 'pointerleave', function () { open(b, false); });
        k.on(d, 'focus', function () { open(b, true); });
        k.on(d, 'blur', function () { open(b, false); });
        // first tap on touch opens the door; a tap on an open door (or any click with a mouse) shows the photo large
        k.on(d, 'click', function () { if (!b.classList.contains('is-open')) { open(b, true); return; } EZ.viewer.open(all, +d.dataset.i, d); });
      });
      k.on(run, 'keydown', function (e) { if (e.key === 'Escape') bays.forEach(function (b) { open(b, false); }); });
      k.add(function () { bays.forEach(function (b) { b.remove(); }); });
      EZ.reveal(k, root.querySelectorAll('.ki3__h, .ki3__row'));
      if (k.motion) gsap.from(bays, { y: 30, autoAlpha: 0, duration: .4, stagger: .07, ease: 'power3.out', scrollTrigger: { trigger: run, start: 'top 85%', once: true } });
    } },

    /* v4 · Plan and photo: the plan inks itself line by line; the switch crossfades plan and room (radio keys move it) */
    4: { init: function (root, k) {
      var opts = Array.prototype.slice.call(root.querySelectorAll('.ki4__opt'));
      function set(o, focus) {
        opts.forEach(function (b) { var on = b.dataset.o === o; b.setAttribute('aria-checked', on ? 'true' : 'false'); b.tabIndex = on ? 0 : -1; if (on && focus) b.focus(); });
        root.classList.toggle('is-room', o === 'room');
      }
      opts.forEach(function (b, i) {
        k.on(b, 'click', function () { set(b.dataset.o); });
        k.on(b, 'keydown', function (e) { if (/Arrow(Right|Left|Up|Down)/.test(e.key)) { e.preventDefault(); set(opts[(i + 1) % 2].dataset.o, true); } });
      });
      set('plan');
      k.add(function () { root.classList.remove('is-room'); });
      EZ.reveal(k, root.querySelectorAll('.ki4__copy > *'));
      if (k.motion) gsap.from(root.querySelectorAll('.ki4__plan rect, .ki4__plan path, .ki4__plan circle'), { drawSVG: '0%', duration: .6, stagger: .08, ease: 'power2.inOut', scrollTrigger: { trigger: root.querySelector('.ki4__frame'), start: 'top 80%', once: true } });
    } },

    /* v5 · The backsplash: a herringbone of tiles sized to the band; tiles near the pointer lift to the accent tint */
    5: { init: function (root, k) {
      var band = root.querySelector('.ki5__band'), svg = root.querySelector('.ki5__tiles'), tiles = [];
      function build() {
        var W = band.clientWidth, H = band.clientHeight, T = 56, t = 28, s = '';
        svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
        tiles = [];
        // herringbone: pairs of tiles, one lying and one standing, stepped down the band
        for (var y = -T * 2; y < H + T; y += t) {
          for (var x = -T * 2 + ((y / t) % 2 ? t : 0); x < W + T; x += T * 2) {
            s += '<rect x="' + x + '" y="' + y + '" width="' + T + '" height="' + t + '"/><rect x="' + (x + T) + '" y="' + (y - T + t) + '" width="' + t + '" height="' + T + '"/>';
          }
        }
        svg.innerHTML = s;
        tiles = Array.prototype.slice.call(svg.querySelectorAll('rect')).map(function (r) { var b = r.getBBox(); return { r: r, x: b.x + b.width / 2, y: b.y + b.height / 2 }; });
      }
      build();
      var lastW = band.clientWidth;
      k.ro(band, function () { if (band.clientWidth !== lastW) { lastW = band.clientWidth; build(); } });
      if (k.motion && k.fine) {
        var pend = null;
        k.on(band, 'pointermove', function (e) {
          var r = band.getBoundingClientRect(), px = e.clientX - r.left, py = e.clientY - r.top;
          if (pend) return;
          pend = requestAnimationFrame(function () {
            pend = null;
            tiles.forEach(function (t) { var d = Math.hypot(t.x - px, t.y - py); t.r.classList.toggle('is-up', d < 90); });
          });
        });
        k.on(band, 'pointerleave', function () { tiles.forEach(function (t) { t.r.classList.remove('is-up'); }); });
      }
      k.add(function () { svg.innerHTML = ''; });
      EZ.reveal(k, root.querySelectorAll('.ki5__plate > *, .ki5__strip > *'));
    } },

    /* b1 · release record of slot 1 */
    b1: { init: function (root, k) {
      EZ.reveal(k, root.querySelectorAll('.ki1r__copy > *'));
      if (k.motion) gsap.from(root.querySelectorAll('.ki1r__dl, .ki1r__tick'), { drawSVG: '0%', duration: .7, ease: 'power2.inOut', stagger: .12, scrollTrigger: { trigger: root.querySelector('.ki1r__fig'), start: 'top 80%', once: true } });
    } },

    /* b2 · release record of slot 2 */
    b2: { init: function (root, k) {
      if (!k.motion) return;
      gsap.timeline({ scrollTrigger: { trigger: root, start: 'top 80%', once: true } })
        .from(root.querySelector('.ki2r__card'), { y: 30, autoAlpha: 0, duration: .45, ease: 'power3.out' })
        .from(root.querySelector('.ki2r__hood path'), { drawSVG: '0%', duration: .8, ease: 'power2.inOut' }, .1)
        .from(root.querySelectorAll('.ki2r__card > :not(svg)'), { y: 12, autoAlpha: 0, duration: .3, stagger: .06 }, .2);
    } },

    /* b3 · release record of slot 3 */
    b3: { init: function (root, k) {
      var run = root.querySelector('.ki3r__run');
      var K = [['k-navy-shaker', 'Navy Blue Shaker Kitchen with Brass Hardware and a Custom Range Hood'], ['k-gray-shaker', 'Gray Shaker Kitchen Remodel with Wolf Range & Farmhouse Sink'],
        ['k-brass-hood', 'Two-Tone Kitchen Remodel with Custom Brass-Banded Range Hood'], ['k-stone-island', 'Two-Tone Kitchen Remodel with Waterfall Stone Island'], ['k-navy-white', 'Two-Tone Navy & White Kitchen Remodel with Waterfall Quartz Island']];
      var all = K.map(function (x) { return { key: x[0], title: x[1], alt: x[1] + ', an Elbaz project' }; });
      K.forEach(function (x, i) {
        var bay = document.createElement('div'); bay.className = 'ki3r__bay'; bay.setAttribute('role', 'listitem');
        bay.innerHTML = '<img src="' + EZ.img(x[0]) + '" alt="" loading="lazy"><span class="ki3r__cap">' + x[1].replace(/&/g, '&amp;') + '</span>' +
          '<button type="button" class="ki3r__door" data-i="' + i + '" data-rx="native:cabinet-door" aria-label="Open the door on ' + x[1].replace(/&/g, '&amp;') + ', then select to see it large"></button>';
        run.appendChild(bay);
      });
      var bays = Array.prototype.slice.call(run.querySelectorAll('.ki3r__bay'));
      if (EZ.bindReactions) EZ.bindReactions(run, k);
      function open(b, on) { b.classList.toggle('is-open', on); }
      bays.forEach(function (b) {
        var d = b.querySelector('.ki3r__door');
        k.on(b, 'pointerenter', function (e) { if (e.pointerType === 'mouse') open(b, true); });
        k.on(b, 'pointerleave', function () { open(b, false); });
        k.on(d, 'focus', function () { open(b, true); });
        k.on(d, 'blur', function () { open(b, false); });
        // first tap on touch opens the door; a tap on an open door (or any click with a mouse) shows the photo large
        k.on(d, 'click', function () { if (!b.classList.contains('is-open')) { open(b, true); return; } EZ.viewer.open(all, +d.dataset.i, d); });
      });
      k.on(run, 'keydown', function (e) { if (e.key === 'Escape') bays.forEach(function (b) { open(b, false); }); });
      k.add(function () { bays.forEach(function (b) { b.remove(); }); });
      EZ.reveal(k, root.querySelectorAll('.ki3r__h, .ki3r__row'));
      if (k.motion) gsap.from(bays, { y: 30, autoAlpha: 0, duration: .4, stagger: .07, ease: 'power3.out', scrollTrigger: { trigger: run, start: 'top 85%', once: true } });
    } },

    /* b4 · release record of slot 4 */
    b4: { init: function (root, k) {
      var opts = Array.prototype.slice.call(root.querySelectorAll('.ki4r__opt'));
      function set(o, focus) {
        opts.forEach(function (b) { var on = b.dataset.o === o; b.setAttribute('aria-checked', on ? 'true' : 'false'); b.tabIndex = on ? 0 : -1; if (on && focus) b.focus(); });
        root.classList.toggle('is-room', o === 'room');
      }
      opts.forEach(function (b, i) {
        k.on(b, 'click', function () { set(b.dataset.o); });
        k.on(b, 'keydown', function (e) { if (/Arrow(Right|Left|Up|Down)/.test(e.key)) { e.preventDefault(); set(opts[(i + 1) % 2].dataset.o, true); } });
      });
      set('plan');
      k.add(function () { root.classList.remove('is-room'); });
      EZ.reveal(k, root.querySelectorAll('.ki4r__copy > *'));
      if (k.motion) gsap.from(root.querySelectorAll('.ki4r__plan rect, .ki4r__plan path, .ki4r__plan circle'), { drawSVG: '0%', duration: .6, stagger: .08, ease: 'power2.inOut', scrollTrigger: { trigger: root.querySelector('.ki4r__frame'), start: 'top 80%', once: true } });
    } },

    /* b5 · release record of slot 5 */
    b5: { init: function (root, k) {
      var band = root.querySelector('.ki5r__band'), svg = root.querySelector('.ki5r__tiles'), tiles = [];
      function build() {
        var W = band.clientWidth, H = band.clientHeight, T = 56, t = 28, s = '';
        svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
        tiles = [];
        // herringbone: pairs of tiles, one lying and one standing, stepped down the band
        for (var y = -T * 2; y < H + T; y += t) {
          for (var x = -T * 2 + ((y / t) % 2 ? t : 0); x < W + T; x += T * 2) {
            s += '<rect x="' + x + '" y="' + y + '" width="' + T + '" height="' + t + '"/><rect x="' + (x + T) + '" y="' + (y - T + t) + '" width="' + t + '" height="' + T + '"/>';
          }
        }
        svg.innerHTML = s;
        tiles = Array.prototype.slice.call(svg.querySelectorAll('rect')).map(function (r) { var b = r.getBBox(); return { r: r, x: b.x + b.width / 2, y: b.y + b.height / 2 }; });
      }
      build();
      var lastW = band.clientWidth;
      k.ro(band, function () { if (band.clientWidth !== lastW) { lastW = band.clientWidth; build(); } });
      if (k.motion && k.fine) {
        var pend = null;
        k.on(band, 'pointermove', function (e) {
          var r = band.getBoundingClientRect(), px = e.clientX - r.left, py = e.clientY - r.top;
          if (pend) return;
          pend = requestAnimationFrame(function () {
            pend = null;
            tiles.forEach(function (t) { var d = Math.hypot(t.x - px, t.y - py); t.r.classList.toggle('is-up', d < 90); });
          });
        });
        k.on(band, 'pointerleave', function () { tiles.forEach(function (t) { t.r.classList.remove('is-up'); }); });
      }
      k.add(function () { svg.innerHTML = ''; });
      EZ.reveal(k, root.querySelectorAll('.ki5r__plate > *, .ki5r__strip > *'));
    } }
  });
})();
