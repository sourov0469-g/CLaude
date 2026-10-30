/* Bathrooms page, section 3 · bath-work. One list of the firm's bathroom photographs (titles are the firm's own) and the one
   bathroom before/after pair with the firm's own alt texts. Financing lines follow the firm's /financing/ page. */
(function () {
  var P = [
    ['b-black-marble', 'Black Marble Primary Bathroom with Freestanding Tub & Glass Wet Room', 1200, 1600],
    ['b-polished-concrete', 'Polished-Concrete Primary Bath with Curbless Walk-In Shower', 1600, 1067],
    ['b-spa-guest', 'Spa-Style Guest Bathroom Remodel with Curbless Shower & Backlit Mirrors', 1200, 1600],
    ['b-emerald', 'Emerald Tile Walk-In Shower Bathroom Remodel', 1067, 1600],
    ['b-fluted-vanity', 'Contemporary Primary Bath Remodel with Fluted Vanity & Freestanding Tub', 1200, 1600],
    ['b-champagne', 'Champagne Bronze & Marble-Look Tile Bathroom Renovation', 900, 1600],
    ['b-copper', 'Walk-In Shower Bathroom Remodel with Copper Mosaic Tile Accents', 1600, 1067],
    ['b-floating-soak', 'Floating Vanity Primary Bath with Soaking Tub & Walk-In Shower', 1200, 1600],
    ['b-sea-glass', 'Sea-Glass Glazed Tile Bathroom Remodel with Double Vanity', 1200, 1600],
    ['b-navy-niche', 'Navy Vanity Bathroom Remodel with Backlit Tile Niche', 1067, 1600],
    ['b-white-marble', 'White Marble Guest Bath & Grey Stone Primary Suite Renovation', 1600, 1200],
    ['b-multi-brass', 'Multi-Bathroom Renovation with Freestanding Tub & Brass-Accented Showers', 1600, 1067],
    ['w-bath-whole', 'Whole-Home Bathroom Renovation with Spa Showers & a Freestanding Soaking Tub', 1600, 1067],
    ['m-tub-shower', 'Bathroom with freestanding tub, black fixtures and tiled shower', 960, 640]
  ].map(function (x) { return { key: x[0], title: x[1], w: x[2], h: x[3], alt: x[1] + ', an Elbaz project' }; });
  var PAIR = { b: 'ba-bath2-before', a: 'ba-bath2-after', bt: 'Dated bathroom with alcove tub and shower curtain, before renovation', at: 'Renovated bathroom with frameless glass shower and round backlit mirror', w: 430, h: 490 };
  function esc(t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }
  function img(p, lazy) { return '<img src="' + EZ.img(p.key) + '" width="' + p.w + '" height="' + p.h + '" alt="' + esc(p.alt) + '"' + (lazy === false ? '' : ' loading="lazy"') + ' decoding="async">'; }
  function vlist(L) { return L.map(function (p) { return { key: p.key, title: p.title, alt: p.alt }; }); }
  var MAXW = Math.round(PAIR.w * 1.4);
  var FIN = '<div class="bfin__in"><svg class="bfin__mk" viewBox="0 0 40 40" aria-hidden="true" focusable="false"><rect x="4" y="9" width="32" height="22" rx="3"/><path d="M4 16 H36 M10 25 H18"/></svg>' +
    '<div><h3 class="bfin__h">Paying for a bathroom</h3><p>Elbaz Construction is not a lender and does not approve, decline or fund applications. For bathroom work the routes that fit are consumer credit: ' +
    'Synchrony&rsquo;s Project Card, revolving credit with special-financing terms Synchrony publishes from <span class="nums">6</span> to <span class="nums">132</span> months and one card reusable across projects, or Service Finance Company, a fixed installment loan. ' +
    'Every rate, term and approval decision comes from the financing partner.</p></div></div>';
  function fin(root) { root.querySelectorAll('.bfin').forEach(function (f) { f.innerHTML = FIN; }); }
  function clear(root) { root.querySelectorAll('.bfin').forEach(function (f) { f.innerHTML = ''; }); }

  EZ.section('bath-work', {
    /* v1 · Columns and a slider */
    1: { init: function (root, k) {
      var cols = root.querySelector('.bw1__cols'), ba = root.querySelector('.bw1__ba');
      cols.innerHTML = P.map(function (p, i) { return '<button type="button" class="bw1__t" data-i="' + i + '" data-rx="native:bw1-tile" aria-label="' + esc(p.title) + ', see it large">' + img(p) + '<span class="bw1__c" aria-hidden="true">' + esc(p.title) + '</span></button>'; }).join('');
      ba.innerHTML = '<div class="bba" style="aspect-ratio:' + PAIR.w + ' / ' + PAIR.h + ';max-width:' + MAXW + 'px"><img class="bba__a" src="' + EZ.img(PAIR.a) + '" alt="' + esc(PAIR.at) + '"><img class="bba__b" src="' + EZ.img(PAIR.b) + '" alt="' + esc(PAIR.bt) + '"><span class="bba__h" aria-hidden="true"></span><span class="bba__tag bba__tag--b" aria-hidden="true">Before</span><span class="bba__tag bba__tag--a" aria-hidden="true">After</span>' +
        '<input class="bba__r" type="range" min="0" max="100" value="50" aria-label="Before and after: ' + esc(PAIR.at) + '. Higher shows more of the before" data-rx="native:bba-range"></div>';
      var box = ba.querySelector('.bba'), r = ba.querySelector('.bba__r');
      function set() { box.style.setProperty('--x', r.value + '%'); r.setAttribute('aria-valuetext', r.value + '% before'); }
      k.on(r, 'input', set); set();
      fin(root);
      if (EZ.bindReactions) { EZ.bindReactions(cols, k); EZ.bindReactions(ba, k); }
      k.on(cols, 'click', function (e) { var b = e.target.closest('.bw1__t'); if (b) EZ.viewer.open(vlist(P), +b.dataset.i, b); });
      k.add(function () { cols.innerHTML = ''; ba.innerHTML = ''; clear(root); });
      EZ.reveal(k, root.querySelectorAll('.bw__head > *'));
      if (k.motion) gsap.from(cols.children, { y: 24, autoAlpha: 0, duration: .35, stagger: .03, ease: 'power2.out', scrollTrigger: { trigger: cols, start: 'top 85%', once: true } });
    } },

    /* v2 · The curtain: a pleated curtain drawn in SVG sweeps across; behind it the photo changes between before and after */
    2: { init: function (root, k) {
      var frame = root.querySelector('.bw2__frame'), btn = root.querySelector('.bw2__draw'), lbl = btn.querySelector('.btn__label'), strip = root.querySelector('.bw2__strip');
      var pleats = ''; for (var x = 0; x < 200; x += 20) pleats += '<path d="M' + x + ' 8 Q' + (x + 10) + ' 120 ' + x + ' 240 H' + (x + 20) + ' Q' + (x + 30) + ' 120 ' + (x + 20) + ' 8 Z"/>';
      frame.innerHTML = '<div class="bw2__ph" style="aspect-ratio:' + PAIR.w + ' / ' + PAIR.h + ';max-width:' + MAXW + 'px"><img class="bw2__img" src="' + EZ.img(PAIR.b) + '" alt="' + esc(PAIR.bt) + '"><span class="bw2__tag">Before</span>' +
        '<svg class="bw2__rod" viewBox="0 0 200 10" preserveAspectRatio="none" aria-hidden="true"><rect x="0" y="2" width="200" height="5" rx="2.5"/></svg><svg class="bw2__curt" viewBox="0 0 200 240" preserveAspectRatio="none" aria-hidden="true">' + pleats + '</svg></div>';
      var im = frame.querySelector('.bw2__img'), tag = frame.querySelector('.bw2__tag'), curt = frame.querySelector('.bw2__curt'), after = false;
      function swap() { after = !after; im.src = EZ.img(after ? PAIR.a : PAIR.b); im.alt = after ? PAIR.at : PAIR.bt; tag.textContent = after ? 'After' : 'Before'; btn.setAttribute('aria-pressed', after ? 'true' : 'false'); lbl.textContent = after ? 'Show the before' : 'Draw the curtain'; }
      k.on(btn, 'click', function () {
        if (!k.motion) { swap(); return; }
        k.ctx.add(function () { gsap.timeline().fromTo(curt, { xPercent: -100 }, { xPercent: 0, duration: .45, ease: 'power2.inOut' }).add(swap).to(curt, { xPercent: 100, duration: .45, ease: 'power2.inOut', delay: .1 }); });
      });
      strip.innerHTML = P.map(function (p, i) { return '<figure class="bw2__f"><button type="button" class="bw2__b" data-i="' + i + '" data-rx="native:bw2-shot" aria-label="' + esc(p.title) + ', see it large">' + img(p) + '</button><figcaption>' + esc(p.title) + '</figcaption></figure>'; }).join('');
      fin(root);
      if (EZ.bindReactions) EZ.bindReactions(strip, k);
      k.on(strip, 'click', function (e) { var b = e.target.closest('.bw2__b'); if (b) EZ.viewer.open(vlist(P), +b.dataset.i, b); });
      k.on(strip, 'keydown', function (e) { if (e.target === strip && /Arrow(Right|Left)/.test(e.key)) { e.preventDefault(); strip.scrollBy({ left: (e.key === 'ArrowRight' ? 1 : -1) * strip.clientWidth * .6, behavior: k.motion ? 'smooth' : 'auto' }); } });
      k.add(function () { frame.innerHTML = ''; strip.innerHTML = ''; clear(root); btn.setAttribute('aria-pressed', 'false'); lbl.textContent = 'Draw the curtain'; });
      EZ.reveal(k, root.querySelectorAll('.bw2__copy > *'));
    } },

    /* v3 · The filmstrip: the list item of the photo in the middle of the strip lights up; a list item scrolls the strip to it */
    3: { init: function (root, k) {
      var film = root.querySelector('.bw3__film'), list = root.querySelector('.bw3__list'), pair = root.querySelector('.bw3__pair');
      film.innerHTML = P.map(function (p, i) { return '<figure class="bw3__fr" data-i="' + i + '">' + img(p) + '</figure>'; }).join('');
      list.innerHTML = P.map(function (p, i) { return '<li><button type="button" class="bw3__li" data-i="' + i + '" data-rx="native:bw3-item">' + esc(p.title) + '</button></li>'; }).join('');
      var frs = Array.prototype.slice.call(film.children), items = Array.prototype.slice.call(list.querySelectorAll('.bw3__li')), cur = -1;
      function mark() {
        var fr = film.getBoundingClientRect(), mid = fr.top + fr.height / 2, best = 0, bd = 1e9;
        frs.forEach(function (f, i) { var r = f.getBoundingClientRect(), d = Math.abs(r.top + r.height / 2 - mid); if (d < bd) { bd = d; best = i; } });
        if (best === cur) return; cur = best;
        items.forEach(function (b, i) { b.classList.toggle('is-on', i === best); if (i === best) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current'); });
      }
      var pend = false;
      k.on(film, 'scroll', function () { if (!pend) { pend = true; requestAnimationFrame(function () { pend = false; mark(); }); } }, { passive: true });
      items.forEach(function (b, i) { k.on(b, 'click', function () { film.scrollTo({ top: frs[i].offsetTop - film.offsetTop - (film.clientHeight - frs[i].offsetHeight) / 2, behavior: k.motion ? 'smooth' : 'auto' }); if (cur === i) EZ.viewer.open(vlist(P), i, b); }); });
      mark();
      pair.innerHTML = '<div class="bw3__pp"><figure><img src="' + EZ.img(PAIR.b) + '" alt="' + esc(PAIR.bt) + '" style="aspect-ratio:' + PAIR.w + ' / ' + PAIR.h + '"><figcaption>Before</figcaption></figure><svg class="bw3__arrow" viewBox="0 0 60 30" aria-hidden="true" focusable="false"><path d="M4 15 H52 M40 4 L54 15 L40 26"/></svg><figure><img src="' + EZ.img(PAIR.a) + '" alt="' + esc(PAIR.at) + '" style="aspect-ratio:' + PAIR.w + ' / ' + PAIR.h + '"><figcaption>After</figcaption></figure></div>';
      fin(root);
      if (EZ.bindReactions) EZ.bindReactions(list, k);
      k.add(function () { film.innerHTML = ''; list.innerHTML = ''; pair.innerHTML = ''; clear(root); cur = -1; });
      EZ.reveal(k, root.querySelectorAll('.bw3__left > .eyebrow, .bw3__left > h2'));
    } },

    /* v4 · Filters: each chip is a phrase that appears in project titles, with its count; the grid keeps only those titles */
    4: { init: function (root, k) {
      var chips = root.querySelector('.bw4__chips'), grid = root.querySelector('.bw4__grid'), pair = root.querySelector('.bw4__pair');
      var F = [['All', null], ['Walk-In Shower', /walk-in shower/i], ['Curbless', /curbless/i], ['Freestanding Tub', /freestanding/i], ['Vanity', /vanity/i], ['Marble', /marble/i]];
      chips.innerHTML = F.map(function (f, i) { var n = f[1] ? P.filter(function (p) { return f[1].test(p.title); }).length : P.length; return '<button type="button" class="bw4__chip" aria-pressed="' + (i ? 'false' : 'true') + '" data-f="' + i + '" data-rx="native:bw4-chip">' + f[0] + ' <span class="nums">' + n + '</span></button>'; }).join('');
      var C = Array.prototype.slice.call(chips.children), L = P;
      function draw(i, anim) {
        C.forEach(function (c, j) { c.setAttribute('aria-pressed', i === j ? 'true' : 'false'); });
        L = F[i][1] ? P.filter(function (p) { return F[i][1].test(p.title); }) : P;
        grid.innerHTML = L.map(function (p, j) { return '<button type="button" class="bw4__t" data-i="' + j + '" data-rx="native:bw4-tile" aria-label="' + esc(p.title) + ', see it large">' + img(p) + '<span>' + esc(p.title) + '</span></button>'; }).join('');
        if (EZ.bindReactions) EZ.bindReactions(grid, k);
        if (anim && k.motion) k.ctx.add(function () { gsap.from(grid.children, { scale: .94, autoAlpha: 0, duration: .25, stagger: .03, ease: 'power2.out' }); });
      }
      C.forEach(function (c, i) { k.on(c, 'click', function () { draw(i, true); }); });
      k.on(grid, 'click', function (e) { var b = e.target.closest('.bw4__t'); if (b) EZ.viewer.open(vlist(L), +b.dataset.i, b); });
      draw(0, false);
      pair.innerHTML = '<figure class="bw4__pf" style="max-width:' + MAXW + 'px"><div class="bw4__ph" style="aspect-ratio:' + PAIR.w + ' / ' + PAIR.h + '"><img class="bw4__pa" src="' + EZ.img(PAIR.a) + '" alt="' + esc(PAIR.at) + '"><img class="bw4__pb" src="' + EZ.img(PAIR.b) + '" alt="' + esc(PAIR.bt) + '" hidden></div>' +
        '<figcaption><button type="button" class="bw4__sw" role="switch" aria-checked="true" data-rx="native:bw4-switch"><span class="bw4__k">Before</span><svg viewBox="0 0 44 24" aria-hidden="true" focusable="false"><rect x="1" y="1" width="42" height="22" rx="11"/><circle cx="32" cy="12" r="8"/></svg><span class="bw4__k">After</span></button></figcaption></figure>';
      var sw = pair.querySelector('.bw4__sw');
      k.on(sw, 'click', function () { var a = sw.getAttribute('aria-checked') !== 'true'; sw.setAttribute('aria-checked', a ? 'true' : 'false'); pair.querySelector('.bw4__pa').hidden = !a; pair.querySelector('.bw4__pb').hidden = a; });
      fin(root);
      if (EZ.bindReactions) { EZ.bindReactions(chips, k); EZ.bindReactions(pair, k); }
      k.add(function () { chips.innerHTML = ''; grid.innerHTML = ''; pair.innerHTML = ''; clear(root); });
      EZ.reveal(k, root.querySelectorAll('.bw__head > *'));
    } },

    /* v5 · The deck: the top print slides off and goes to the back; hold the pair (pointer, or Space/Enter) to see the before */
    5: { init: function (root, k) {
      var deck = root.querySelector('.bw5__deck'), cap = root.querySelector('.bw5__cap'), pair = root.querySelector('.bw5__pair'), top = 0;
      deck.innerHTML = P.map(function (p, i) { return '<figure class="bw5__card" data-i="' + i + '">' + img(p, i > 3 ? true : false) + '</figure>'; }).join('');
      var cards = Array.prototype.slice.call(deck.children);
      function lay(anim) {
        cards.forEach(function (c, i) {
          var o = (i - top + P.length) % P.length;
          var to = { zIndex: P.length - o, rotation: o === 0 ? 0 : [-4, 3, -2, 5, -3][o % 5], x: Math.min(o, 4) * 10, y: Math.min(o, 4) * 8, autoAlpha: o < 5 ? 1 : 0 };
          if (anim && k.motion) k.ctx.add(function () { gsap.to(c, Object.assign(to, { duration: .4, ease: 'power3.out' })); }); else gsap.set(c, to);
        });
        cap.textContent = P[top].title;
      }
      function step(d) {
        if (d > 0 && k.motion) { var c = cards[top]; k.ctx.add(function () { gsap.timeline().to(c, { x: 260, rotation: 14, autoAlpha: 0, duration: .3, ease: 'power2.in' }).add(function () { top = (top + 1) % P.length; lay(true); }); }); return; }
        top = (top + d + P.length) % P.length; lay(true);
      }
      k.on(root.querySelector('.bw5__next'), 'click', function () { step(1); });
      k.on(root.querySelector('.bw5__prev'), 'click', function () { step(-1); });
      k.on(root.querySelector('.bw5__open'), 'click', function (e) { EZ.viewer.open(vlist(P), top, e.currentTarget); });
      lay(false);
      pair.innerHTML = '<p class="bw5__pl">Before and after, one bathroom</p><div class="bw5__ph" style="aspect-ratio:' + PAIR.w + ' / ' + PAIR.h + ';max-width:' + Math.min(MAXW, 360) + 'px"><img class="bw5__pa" src="' + EZ.img(PAIR.a) + '" alt="' + esc(PAIR.at) + '"><img class="bw5__pb" src="' + EZ.img(PAIR.b) + '" alt="' + esc(PAIR.bt) + '" hidden></div>' +
        '<button type="button" class="btn btn--ghost bw5__hold" aria-pressed="false" data-rx="native:bw5-hold"><span class="btn__label">Hold to see the before</span></button>';
      var hold = pair.querySelector('.bw5__hold');
      function show(b) { pair.querySelector('.bw5__pa').hidden = b; pair.querySelector('.bw5__pb').hidden = !b; hold.setAttribute('aria-pressed', b ? 'true' : 'false'); }
      k.on(hold, 'pointerdown', function () { show(true); });
      ['pointerup', 'pointerleave', 'pointercancel', 'blur'].forEach(function (ev) { k.on(hold, ev, function () { show(false); }); });
      k.on(hold, 'keydown', function (e) { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); show(true); } });
      k.on(hold, 'keyup', function (e) { if (e.key === ' ' || e.key === 'Enter') show(false); });
      fin(root);
      if (EZ.bindReactions) EZ.bindReactions(pair, k);
      k.add(function () { deck.innerHTML = ''; pair.innerHTML = ''; cap.textContent = ''; clear(root); top = 0; });
      EZ.reveal(k, root.querySelectorAll('.bw5__copy > .eyebrow, .bw5__copy > h2'));
    } },

    /* b1 · release record of slot 1 */
    b1: { init: function (root, k) {
      var cols = root.querySelector('.bw1r__cols'), ba = root.querySelector('.bw1r__ba');
      cols.innerHTML = P.map(function (p, i) { return '<button type="button" class="bw1r__t" data-i="' + i + '" data-rx="native:bw1r-tile" aria-label="' + esc(p.title) + ', see it large">' + img(p) + '<span class="bw1r__c" aria-hidden="true">' + esc(p.title) + '</span></button>'; }).join('');
      ba.innerHTML = '<div class="bba" style="aspect-ratio:' + PAIR.w + ' / ' + PAIR.h + ';max-width:' + MAXW + 'px"><img class="bba__a" src="' + EZ.img(PAIR.a) + '" alt="' + esc(PAIR.at) + '"><img class="bba__b" src="' + EZ.img(PAIR.b) + '" alt="' + esc(PAIR.bt) + '"><span class="bba__h" aria-hidden="true"></span><span class="bba__tag bba__tag--b" aria-hidden="true">Before</span><span class="bba__tag bba__tag--a" aria-hidden="true">After</span>' +
        '<input class="bba__r" type="range" min="0" max="100" value="50" aria-label="Before and after: ' + esc(PAIR.at) + '. Higher shows more of the before" data-rx="native:bba-range"></div>';
      var box = ba.querySelector('.bba'), r = ba.querySelector('.bba__r');
      function set() { box.style.setProperty('--x', r.value + '%'); r.setAttribute('aria-valuetext', r.value + '% before'); }
      k.on(r, 'input', set); set();
      fin(root);
      if (EZ.bindReactions) { EZ.bindReactions(cols, k); EZ.bindReactions(ba, k); }
      k.on(cols, 'click', function (e) { var b = e.target.closest('.bw1r__t'); if (b) EZ.viewer.open(vlist(P), +b.dataset.i, b); });
      k.add(function () { cols.innerHTML = ''; ba.innerHTML = ''; clear(root); });
      EZ.reveal(k, root.querySelectorAll('.bw__head > *'));
      if (k.motion) gsap.from(cols.children, { y: 24, autoAlpha: 0, duration: .35, stagger: .03, ease: 'power2.out', scrollTrigger: { trigger: cols, start: 'top 85%', once: true } });
    } },

    /* b2 · release record of slot 2 */
    b2: { init: function (root, k) {
      var frame = root.querySelector('.bw2r__frame'), btn = root.querySelector('.bw2r__draw'), lbl = btn.querySelector('.btn__label'), strip = root.querySelector('.bw2r__strip');
      var pleats = ''; for (var x = 0; x < 200; x += 20) pleats += '<path d="M' + x + ' 8 Q' + (x + 10) + ' 120 ' + x + ' 240 H' + (x + 20) + ' Q' + (x + 30) + ' 120 ' + (x + 20) + ' 8 Z"/>';
      frame.innerHTML = '<div class="bw2r__ph" style="aspect-ratio:' + PAIR.w + ' / ' + PAIR.h + ';max-width:' + MAXW + 'px"><img class="bw2r__img" src="' + EZ.img(PAIR.b) + '" alt="' + esc(PAIR.bt) + '"><span class="bw2r__tag">Before</span>' +
        '<svg class="bw2r__rod" viewBox="0 0 200 10" preserveAspectRatio="none" aria-hidden="true"><rect x="0" y="2" width="200" height="5" rx="2.5"/></svg><svg class="bw2r__curt" viewBox="0 0 200 240" preserveAspectRatio="none" aria-hidden="true">' + pleats + '</svg></div>';
      var im = frame.querySelector('.bw2r__img'), tag = frame.querySelector('.bw2r__tag'), curt = frame.querySelector('.bw2r__curt'), after = false;
      function swap() { after = !after; im.src = EZ.img(after ? PAIR.a : PAIR.b); im.alt = after ? PAIR.at : PAIR.bt; tag.textContent = after ? 'After' : 'Before'; btn.setAttribute('aria-pressed', after ? 'true' : 'false'); lbl.textContent = after ? 'Show the before' : 'Draw the curtain'; }
      k.on(btn, 'click', function () {
        if (!k.motion) { swap(); return; }
        k.ctx.add(function () { gsap.timeline().fromTo(curt, { xPercent: -100 }, { xPercent: 0, duration: .45, ease: 'power2.inOut' }).add(swap).to(curt, { xPercent: 100, duration: .45, ease: 'power2.inOut', delay: .1 }); });
      });
      strip.innerHTML = P.map(function (p, i) { return '<figure class="bw2r__f"><button type="button" class="bw2r__b" data-i="' + i + '" data-rx="native:bw2r-shot" aria-label="' + esc(p.title) + ', see it large">' + img(p) + '</button><figcaption>' + esc(p.title) + '</figcaption></figure>'; }).join('');
      fin(root);
      if (EZ.bindReactions) EZ.bindReactions(strip, k);
      k.on(strip, 'click', function (e) { var b = e.target.closest('.bw2r__b'); if (b) EZ.viewer.open(vlist(P), +b.dataset.i, b); });
      k.on(strip, 'keydown', function (e) { if (e.target === strip && /Arrow(Right|Left)/.test(e.key)) { e.preventDefault(); strip.scrollBy({ left: (e.key === 'ArrowRight' ? 1 : -1) * strip.clientWidth * .6, behavior: k.motion ? 'smooth' : 'auto' }); } });
      k.add(function () { frame.innerHTML = ''; strip.innerHTML = ''; clear(root); btn.setAttribute('aria-pressed', 'false'); lbl.textContent = 'Draw the curtain'; });
      EZ.reveal(k, root.querySelectorAll('.bw2r__copy > *'));
    } },

    /* b3 · release record of slot 3 */
    b3: { init: function (root, k) {
      var film = root.querySelector('.bw3r__film'), list = root.querySelector('.bw3r__list'), pair = root.querySelector('.bw3r__pair');
      film.innerHTML = P.map(function (p, i) { return '<figure class="bw3r__fr" data-i="' + i + '">' + img(p) + '</figure>'; }).join('');
      list.innerHTML = P.map(function (p, i) { return '<li><button type="button" class="bw3r__li" data-i="' + i + '" data-rx="native:bw3r-item">' + esc(p.title) + '</button></li>'; }).join('');
      var frs = Array.prototype.slice.call(film.children), items = Array.prototype.slice.call(list.querySelectorAll('.bw3r__li')), cur = -1;
      function mark() {
        var fr = film.getBoundingClientRect(), mid = fr.top + fr.height / 2, best = 0, bd = 1e9;
        frs.forEach(function (f, i) { var r = f.getBoundingClientRect(), d = Math.abs(r.top + r.height / 2 - mid); if (d < bd) { bd = d; best = i; } });
        if (best === cur) return; cur = best;
        items.forEach(function (b, i) { b.classList.toggle('is-on', i === best); if (i === best) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current'); });
      }
      var pend = false;
      k.on(film, 'scroll', function () { if (!pend) { pend = true; requestAnimationFrame(function () { pend = false; mark(); }); } }, { passive: true });
      items.forEach(function (b, i) { k.on(b, 'click', function () { film.scrollTo({ top: frs[i].offsetTop - film.offsetTop - (film.clientHeight - frs[i].offsetHeight) / 2, behavior: k.motion ? 'smooth' : 'auto' }); if (cur === i) EZ.viewer.open(vlist(P), i, b); }); });
      mark();
      pair.innerHTML = '<div class="bw3r__pp"><figure><img src="' + EZ.img(PAIR.b) + '" alt="' + esc(PAIR.bt) + '" style="aspect-ratio:' + PAIR.w + ' / ' + PAIR.h + '"><figcaption>Before</figcaption></figure><svg class="bw3r__arrow" viewBox="0 0 60 30" aria-hidden="true" focusable="false"><path d="M4 15 H52 M40 4 L54 15 L40 26"/></svg><figure><img src="' + EZ.img(PAIR.a) + '" alt="' + esc(PAIR.at) + '" style="aspect-ratio:' + PAIR.w + ' / ' + PAIR.h + '"><figcaption>After</figcaption></figure></div>';
      fin(root);
      if (EZ.bindReactions) EZ.bindReactions(list, k);
      k.add(function () { film.innerHTML = ''; list.innerHTML = ''; pair.innerHTML = ''; clear(root); cur = -1; });
      EZ.reveal(k, root.querySelectorAll('.bw3r__left > .eyebrow, .bw3r__left > h2'));
    } },

    /* b4 · release record of slot 4 */
    b4: { init: function (root, k) {
      var chips = root.querySelector('.bw4r__chips'), grid = root.querySelector('.bw4r__grid'), pair = root.querySelector('.bw4r__pair');
      var F = [['All', null], ['Walk-In Shower', /walk-in shower/i], ['Curbless', /curbless/i], ['Freestanding Tub', /freestanding/i], ['Vanity', /vanity/i], ['Marble', /marble/i]];
      chips.innerHTML = F.map(function (f, i) { var n = f[1] ? P.filter(function (p) { return f[1].test(p.title); }).length : P.length; return '<button type="button" class="bw4r__chip" aria-pressed="' + (i ? 'false' : 'true') + '" data-f="' + i + '" data-rx="native:bw4r-chip">' + f[0] + ' <span class="nums">' + n + '</span></button>'; }).join('');
      var C = Array.prototype.slice.call(chips.children), L = P;
      function draw(i, anim) {
        C.forEach(function (c, j) { c.setAttribute('aria-pressed', i === j ? 'true' : 'false'); });
        L = F[i][1] ? P.filter(function (p) { return F[i][1].test(p.title); }) : P;
        grid.innerHTML = L.map(function (p, j) { return '<button type="button" class="bw4r__t" data-i="' + j + '" data-rx="native:bw4r-tile" aria-label="' + esc(p.title) + ', see it large">' + img(p) + '<span>' + esc(p.title) + '</span></button>'; }).join('');
        if (EZ.bindReactions) EZ.bindReactions(grid, k);
        if (anim && k.motion) k.ctx.add(function () { gsap.from(grid.children, { scale: .94, autoAlpha: 0, duration: .25, stagger: .03, ease: 'power2.out' }); });
      }
      C.forEach(function (c, i) { k.on(c, 'click', function () { draw(i, true); }); });
      k.on(grid, 'click', function (e) { var b = e.target.closest('.bw4r__t'); if (b) EZ.viewer.open(vlist(L), +b.dataset.i, b); });
      draw(0, false);
      pair.innerHTML = '<figure class="bw4r__pf" style="max-width:' + MAXW + 'px"><div class="bw4r__ph" style="aspect-ratio:' + PAIR.w + ' / ' + PAIR.h + '"><img class="bw4r__pa" src="' + EZ.img(PAIR.a) + '" alt="' + esc(PAIR.at) + '"><img class="bw4r__pb" src="' + EZ.img(PAIR.b) + '" alt="' + esc(PAIR.bt) + '" hidden></div>' +
        '<figcaption><button type="button" class="bw4r__sw" role="switch" aria-checked="true" data-rx="native:bw4r-switch"><span class="bw4r__k">Before</span><svg viewBox="0 0 44 24" aria-hidden="true" focusable="false"><rect x="1" y="1" width="42" height="22" rx="11"/><circle cx="32" cy="12" r="8"/></svg><span class="bw4r__k">After</span></button></figcaption></figure>';
      var sw = pair.querySelector('.bw4r__sw');
      k.on(sw, 'click', function () { var a = sw.getAttribute('aria-checked') !== 'true'; sw.setAttribute('aria-checked', a ? 'true' : 'false'); pair.querySelector('.bw4r__pa').hidden = !a; pair.querySelector('.bw4r__pb').hidden = a; });
      fin(root);
      if (EZ.bindReactions) { EZ.bindReactions(chips, k); EZ.bindReactions(pair, k); }
      k.add(function () { chips.innerHTML = ''; grid.innerHTML = ''; pair.innerHTML = ''; clear(root); });
      EZ.reveal(k, root.querySelectorAll('.bw__head > *'));
    } },

    /* b5 · release record of slot 5 */
    b5: { init: function (root, k) {
      var deck = root.querySelector('.bw5r__deck'), cap = root.querySelector('.bw5r__cap'), pair = root.querySelector('.bw5r__pair'), top = 0;
      deck.innerHTML = P.map(function (p, i) { return '<figure class="bw5r__card" data-i="' + i + '">' + img(p, i > 3 ? true : false) + '</figure>'; }).join('');
      var cards = Array.prototype.slice.call(deck.children);
      function lay(anim) {
        cards.forEach(function (c, i) {
          var o = (i - top + P.length) % P.length;
          var to = { zIndex: P.length - o, rotation: o === 0 ? 0 : [-4, 3, -2, 5, -3][o % 5], x: Math.min(o, 4) * 10, y: Math.min(o, 4) * 8, autoAlpha: o < 5 ? 1 : 0 };
          if (anim && k.motion) k.ctx.add(function () { gsap.to(c, Object.assign(to, { duration: .4, ease: 'power3.out' })); }); else gsap.set(c, to);
        });
        cap.textContent = P[top].title;
      }
      function step(d) {
        if (d > 0 && k.motion) { var c = cards[top]; k.ctx.add(function () { gsap.timeline().to(c, { x: 260, rotation: 14, autoAlpha: 0, duration: .3, ease: 'power2.in' }).add(function () { top = (top + 1) % P.length; lay(true); }); }); return; }
        top = (top + d + P.length) % P.length; lay(true);
      }
      k.on(root.querySelector('.bw5r__next'), 'click', function () { step(1); });
      k.on(root.querySelector('.bw5r__prev'), 'click', function () { step(-1); });
      k.on(root.querySelector('.bw5r__open'), 'click', function (e) { EZ.viewer.open(vlist(P), top, e.currentTarget); });
      lay(false);
      pair.innerHTML = '<p class="bw5r__pl">Before and after, one bathroom</p><div class="bw5r__ph" style="aspect-ratio:' + PAIR.w + ' / ' + PAIR.h + ';max-width:' + Math.min(MAXW, 360) + 'px"><img class="bw5r__pa" src="' + EZ.img(PAIR.a) + '" alt="' + esc(PAIR.at) + '"><img class="bw5r__pb" src="' + EZ.img(PAIR.b) + '" alt="' + esc(PAIR.bt) + '" hidden></div>' +
        '<button type="button" class="btn btn--ghost bw5r__hold" aria-pressed="false" data-rx="native:bw5r-hold"><span class="btn__label">Hold to see the before</span></button>';
      var hold = pair.querySelector('.bw5r__hold');
      function show(b) { pair.querySelector('.bw5r__pa').hidden = b; pair.querySelector('.bw5r__pb').hidden = !b; hold.setAttribute('aria-pressed', b ? 'true' : 'false'); }
      k.on(hold, 'pointerdown', function () { show(true); });
      ['pointerup', 'pointerleave', 'pointercancel', 'blur'].forEach(function (ev) { k.on(hold, ev, function () { show(false); }); });
      k.on(hold, 'keydown', function (e) { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); show(true); } });
      k.on(hold, 'keyup', function (e) { if (e.key === ' ' || e.key === 'Enter') show(false); });
      fin(root);
      if (EZ.bindReactions) EZ.bindReactions(pair, k);
      k.add(function () { deck.innerHTML = ''; pair.innerHTML = ''; cap.textContent = ''; clear(root); top = 0; });
      EZ.reveal(k, root.querySelectorAll('.bw5r__copy > .eyebrow, .bw5r__copy > h2'));
    } }
  });
})();
