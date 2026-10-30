/* Kitchens page, section 3 · kitchen-work. One list of the firm's kitchen photographs (titles are the firm's own) and the two
   kitchen before/after pairs with the firm's own alt texts. k-walnut-marble and k-emerald-shaker are left out (their photos
   do not show what their titles say; owner item). Financing lines follow the firm's /financing/ page. */
(function () {
  var P = [
    ['k-navy-shaker', 'Navy Blue Shaker Kitchen with Brass Hardware and a Custom Range Hood', 1600, 1067],
    ['k-white-shaker', 'White Shaker Kitchen Remodel with Waterfall Quartz Island', 1600, 1067],
    ['k-turquoise', 'Two-Tone Kitchen Remodel with Turquoise Herringbone Backsplash', 1600, 1067],
    ['k-gray-shaker', 'Gray Shaker Kitchen Remodel with Wolf Range & Farmhouse Sink', 1600, 1067],
    ['k-navy-white', 'Two-Tone Navy & White Kitchen Remodel with Waterfall Quartz Island', 1600, 900],
    ['k-chef', 'Chef-Grade Kitchen Remodel with Waterfall Quartz Island', 1600, 1067],
    ['k-brass-hood', 'Two-Tone Kitchen Remodel with Custom Brass-Banded Range Hood', 1600, 1067],
    ['k-stone-island', 'Two-Tone Kitchen Remodel with Waterfall Stone Island', 1600, 1067],
    ['r-openplan', 'Modern Open-Concept Kitchen and Living Area Renovation', 1600, 1600],
    ['m-kitchen-island', 'Contemporary kitchen with a long island and bar seating', 960, 640]
  ].map(function (x) { return { key: x[0], title: x[1], w: x[2], h: x[3], alt: x[1] + ', an Elbaz project' }; });
  var PAIRS = [
    { b: 'ba-kitchen1-before', a: 'ba-kitchen1-after', bt: 'Dated kitchen with cream cabinets and tiled counters, before renovation', at: 'Renovated kitchen with grey shaker cabinetry and quartz counters', w: 388, h: 294 },
    { b: 'ba-kitchen4-before', a: 'ba-kitchen4-after', bt: 'Kitchen with dated oak cabinetry and tiled counters, before renovation', at: 'Renovated kitchen with light cabinetry, range hood and island seating', w: 584, h: 398 }
  ];
  function esc(t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }
  function img(p, cls, lazy) { return '<img' + (cls ? ' class="' + cls + '"' : '') + ' src="' + EZ.img(p.key) + '" width="' + p.w + '" height="' + p.h + '" alt="' + esc(p.alt) + '"' + (lazy === false ? '' : ' loading="lazy"') + ' decoding="async">'; }
  // the financing note: the firm is not a lender; for interior finish work the consumer-credit routes fit, PACE generally does not
  var FIN = '<div class="kfin__in"><svg class="kfin__mk" viewBox="0 0 40 40" aria-hidden="true" focusable="false"><rect x="4" y="9" width="32" height="22" rx="3"/><path d="M4 16 H36 M10 25 H18"/></svg>' +
    '<div><h3 class="kfin__h">Paying for a kitchen</h3><p>Elbaz Construction is not a lender and does not approve, decline or fund applications. For a kitchen, the routes that fit are consumer credit: ' +
    'Synchrony&rsquo;s Project Card, revolving credit with special-financing terms Synchrony publishes from <span class="nums">6</span> to <span class="nums">132</span> months, one card reusable across projects, useful if a kitchen now is likely to be followed by a bathroom or a flooring run later; ' +
    'or Service Finance Company, a fixed installment loan. A kitchen remodel is generally not one of the improvements PACE programmes cover. Every rate, term and approval decision comes from the financing partner.</p></div></div>';
  function fin(root) { root.querySelectorAll('.kfin').forEach(function (f) { f.innerHTML = FIN; }); }
  function clear(root) { root.querySelectorAll('.kfin').forEach(function (f) { f.innerHTML = ''; }); }
  // a before/after slider: the after photo under, the before photo clipped to the left of the handle; a native range drives it
  function slider(pair, cls, k, vertical) {
    var d = document.createElement('div');
    d.className = 'kba ' + cls + (vertical ? ' kba--v' : '');
    d.style.cssText = 'aspect-ratio:' + pair.w + ' / ' + pair.h + ';max-width:' + Math.round(pair.w * 1.4) + 'px';
    d.innerHTML = '<img class="kba__a" src="' + EZ.img(pair.a) + '" alt="' + esc(pair.at) + '"><img class="kba__b" src="' + EZ.img(pair.b) + '" alt="' + esc(pair.bt) + '">' +
      '<span class="kba__tag kba__tag--b" aria-hidden="true">Before</span><span class="kba__tag kba__tag--a" aria-hidden="true">After</span><span class="kba__h" aria-hidden="true"></span>' +
      '<input class="kba__r" type="range" min="0" max="100" value="50" aria-label="Before and after: ' + esc(pair.at) + '. Lower shows more of after, higher more of before" data-rx="native:ba-range"' + (vertical ? ' aria-orientation="vertical"' : '') + '>';
    var r = d.querySelector('.kba__r');
    function set() { d.style.setProperty('--x', r.value + '%'); r.setAttribute('aria-valuetext', r.value + '% before'); }
    k.on(r, 'input', set); set();
    return d;
  }
  function vlist(L) { return L.map(function (p) { return { key: p.key, title: p.title, alt: p.alt }; }); }

  EZ.section('kitchen-work', {
    /* v1 · Grid and sliders */
    1: { init: function (root, k) {
      var grid = root.querySelector('.kw1__grid'), bas = root.querySelector('.kw1__bas');
      grid.innerHTML = P.map(function (p, i) { return '<button type="button" class="kw1__t' + (i === 0 || i === 5 ? ' kw1__t--w' : '') + '" data-i="' + i + '" data-rx="native:kw1-tile" aria-label="' + esc(p.title) + ', see it large">' + img(p) + '<span class="kw1__c" aria-hidden="true">' + esc(p.title) + '</span></button>'; }).join('');
      PAIRS.forEach(function (pr) { bas.appendChild(slider(pr, 'kw1__ba', k)); });
      fin(root);
      if (EZ.bindReactions) { EZ.bindReactions(grid, k); EZ.bindReactions(bas, k); }
      k.on(grid, 'click', function (e) { var b = e.target.closest('.kw1__t'); if (b) EZ.viewer.open(vlist(P), +b.dataset.i, b); });
      k.add(function () { grid.innerHTML = ''; bas.innerHTML = ''; clear(root); });
      EZ.reveal(k, root.querySelectorAll('.kw__head > *, .kw__h3'));
      if (k.motion) gsap.from(grid.children, { y: 24, autoAlpha: 0, duration: .35, stagger: .04, ease: 'power2.out', scrollTrigger: { trigger: grid, start: 'top 85%', once: true } });
    } },

    /* v2 · Before/after first: the split follows the pointer across the photo; the tabs pick the pair; arrows keep the range */
    2: { init: function (root, k) {
      var tabs = root.querySelector('.kw2__tabs'), stage = root.querySelector('.kw2__ba'), strip = root.querySelector('.kw2__strip'), cur = -1;
      tabs.innerHTML = PAIRS.map(function (pr, i) { return '<button type="button" role="tab" class="kw2__tab" aria-selected="false" tabindex="-1" data-i="' + i + '" data-rx="native:kw2-tab">Kitchen ' + (i + 1) + '</button>'; }).join('');
      var T = Array.prototype.slice.call(tabs.children);
      function pick(i, focus) {
        if (i === cur) return; cur = i;
        T.forEach(function (t, j) { t.setAttribute('aria-selected', i === j ? 'true' : 'false'); t.tabIndex = i === j ? 0 : -1; });
        if (focus) T[i].focus();
        stage.innerHTML = ''; var s = slider(PAIRS[i], 'kw2__s', k); stage.appendChild(s);
        if (EZ.bindReactions) EZ.bindReactions(stage, k);
        if (k.fine) k.on(s, 'pointermove', function (e) { var r = s.getBoundingClientRect(), x = Math.round((e.clientX - r.left) / r.width * 100); var inp = s.querySelector('.kba__r'); inp.value = x; inp.dispatchEvent(new Event('input')); });
      }
      T.forEach(function (t, i) {
        k.on(t, 'click', function () { pick(i); });
        k.on(t, 'keydown', function (e) { if (/Arrow(Right|Left)/.test(e.key)) { e.preventDefault(); pick((i + 1) % T.length, true); } });
      });
      pick(0);
      strip.innerHTML = P.map(function (p, i) { return '<figure class="kw2__f"><button type="button" class="kw2__b" data-i="' + i + '" data-rx="native:kw2-shot" aria-label="' + esc(p.title) + ', see it large">' + img(p) + '</button><figcaption>' + esc(p.title) + '</figcaption></figure>'; }).join('');
      fin(root);
      if (EZ.bindReactions) { EZ.bindReactions(tabs, k); EZ.bindReactions(strip, k); }
      k.on(strip, 'click', function (e) { var b = e.target.closest('.kw2__b'); if (b) EZ.viewer.open(vlist(P), +b.dataset.i, b); });
      k.on(strip, 'keydown', function (e) { if (e.target === strip && /Arrow(Right|Left)/.test(e.key)) { e.preventDefault(); strip.scrollBy({ left: (e.key === 'ArrowRight' ? 1 : -1) * strip.clientWidth * .6, behavior: k.motion ? 'smooth' : 'auto' }); } });
      k.add(function () { tabs.innerHTML = ''; stage.innerHTML = ''; strip.innerHTML = ''; clear(root); cur = -1; });
      EZ.reveal(k, root.querySelectorAll('.kw2__head > *'));
    } },

    /* v3 · Pinned prints and flip cards: the prints hang at fixed small angles; a card turns over to show the before */
    3: { init: function (root, k) {
      var board = root.querySelector('.kw3__board'), cards = root.querySelector('.kw3__cards');
      var ROT = [-2.5, 1.5, -1, 2.5, -1.8, 1, -2.2, 2, -1.4, 1.6];
      board.innerHTML = P.map(function (p, i) { return '<button type="button" class="kw3__p" style="--r:' + ROT[i] + 'deg" data-i="' + i + '" data-rx="native:kw3-print" aria-label="' + esc(p.title) + ', see it large"><svg class="kw3__pin" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><circle cx="10" cy="10" r="7"/></svg>' + img(p) + '<span class="kw3__c" aria-hidden="true">' + esc(p.title) + '</span></button>'; }).join('');
      cards.innerHTML = PAIRS.map(function (pr, i) {
        return '<div class="kw3__card" style="aspect-ratio:' + pr.w + ' / ' + pr.h + ';max-width:' + Math.round(pr.w * 1.4) + 'px"><div class="kw3__in">' +
          '<figure class="kw3__face kw3__face--a"><img src="' + EZ.img(pr.a) + '" alt="' + esc(pr.at) + '"><figcaption>After</figcaption></figure>' +
          '<figure class="kw3__face kw3__face--b" aria-hidden="true"><img src="' + EZ.img(pr.b) + '" alt="' + esc(pr.bt) + '"><figcaption>Before</figcaption></figure></div>' +
          '<button type="button" class="btn btn--ghost kw3__turn" aria-pressed="false" data-rx="native:kw3-turn"><span class="btn__label">Show the before</span></button></div>';
      }).join('');
      fin(root);
      if (EZ.bindReactions) { EZ.bindReactions(board, k); EZ.bindReactions(cards, k); }
      k.on(board, 'click', function (e) { var b = e.target.closest('.kw3__p'); if (b) EZ.viewer.open(vlist(P), +b.dataset.i, b); });
      cards.querySelectorAll('.kw3__card').forEach(function (c) {
        var b = c.querySelector('.kw3__turn');
        k.on(b, 'click', function () {
          var on = b.getAttribute('aria-pressed') !== 'true';
          b.setAttribute('aria-pressed', on ? 'true' : 'false'); b.querySelector('.btn__label').textContent = on ? 'Show the after' : 'Show the before';
          c.classList.toggle('is-turned', on);
          c.querySelector('.kw3__face--a').setAttribute('aria-hidden', on ? 'true' : 'false'); c.querySelector('.kw3__face--b').setAttribute('aria-hidden', on ? 'false' : 'true');
        });
      });
      k.add(function () { board.innerHTML = ''; cards.innerHTML = ''; clear(root); });
      EZ.reveal(k, root.querySelectorAll('.kw__head > *'));
      if (k.motion) gsap.from(board.children, { y: -30, rotation: 0, autoAlpha: 0, duration: .45, stagger: .04, ease: 'back.out(1.6)', clearProps: 'transform', scrollTrigger: { trigger: board, start: 'top 85%', once: true } });
    } },

    /* v4 · The index: pointer or focus on a title swaps the preview; the lamp switch shows a pair before or after */
    4: { init: function (root, k) {
      var list = root.querySelector('.kw4__list'), im = root.querySelector('.kw4__img'), cap = root.querySelector('.kw4__cap'), pairs = root.querySelector('.kw4__pairs'), cur = -1;
      list.innerHTML = P.map(function (p, i) { return '<li><button type="button" class="kw4__row" data-i="' + i + '" data-rx="native:kw4-row"><span class="kw4__n nums">' + (i < 9 ? '0' : '') + (i + 1) + '</span><span class="kw4__t">' + esc(p.title) + '</span></button></li>'; }).join('');
      var rows = Array.prototype.slice.call(list.querySelectorAll('.kw4__row'));
      function show(i) {
        if (i === cur) return; cur = i; var p = P[i];
        rows.forEach(function (r, j) { r.classList.toggle('is-on', i === j); });
        im.src = EZ.img(p.key); im.alt = p.alt; im.width = p.w; im.height = p.h; cap.textContent = p.title;
        if (k.motion) k.ctx.add(function () { gsap.fromTo(im, { autoAlpha: .4 }, { autoAlpha: 1, duration: .25, overwrite: true }); });
      }
      k.on(list, 'pointerover', function (e) { var r = e.target.closest('.kw4__row'); if (r) show(+r.dataset.i); });
      k.on(list, 'focusin', function (e) { var r = e.target.closest('.kw4__row'); if (r) show(+r.dataset.i); });
      k.on(list, 'click', function (e) { var r = e.target.closest('.kw4__row'); if (r) EZ.viewer.open(vlist(P), +r.dataset.i, r); });
      show(0);
      pairs.innerHTML = PAIRS.map(function (pr, i) {
        return '<figure class="kw4__pair" style="max-width:' + Math.round(pr.w * 1.4) + 'px"><div class="kw4__ph" style="aspect-ratio:' + pr.w + ' / ' + pr.h + '"><img class="kw4__pa" src="' + EZ.img(pr.a) + '" alt="' + esc(pr.at) + '"><img class="kw4__pb" src="' + EZ.img(pr.b) + '" alt="' + esc(pr.bt) + '" hidden></div>' +
          '<figcaption><button type="button" class="kw4__lamp" role="switch" aria-checked="true" data-rx="native:kw4-lamp"><svg viewBox="0 0 40 22" aria-hidden="true" focusable="false"><rect x="1" y="1" width="38" height="20" rx="10"/><circle cx="29" cy="11" r="7"/></svg><span>After</span></button> Kitchen ' + (i + 1) + '</figcaption></figure>';
      }).join('');
      pairs.querySelectorAll('.kw4__pair').forEach(function (f) {
        var b = f.querySelector('.kw4__lamp');
        k.on(b, 'click', function () {
          var after = b.getAttribute('aria-checked') !== 'true';
          b.setAttribute('aria-checked', after ? 'true' : 'false'); b.querySelector('span').textContent = after ? 'After' : 'Before';
          f.querySelector('.kw4__pa').hidden = !after; f.querySelector('.kw4__pb').hidden = after;
        });
      });
      fin(root);
      if (EZ.bindReactions) { EZ.bindReactions(list, k); EZ.bindReactions(pairs, k); }
      k.add(function () { list.innerHTML = ''; pairs.innerHTML = ''; im.removeAttribute('src'); cap.textContent = ''; clear(root); cur = -1; });
      EZ.reveal(k, root.querySelectorAll('.kw4__left > .eyebrow, .kw4__left > h2'));
    } },

    /* v5 · Spotlight: the rail is a listbox (arrow keys, Home, End); the pairs wipe top to bottom on a vertical range */
    5: { init: function (root, k) {
      var im = root.querySelector('.kw5__img'), cap = root.querySelector('.kw5__cap'), rail = root.querySelector('.kw5__rail'), bas = root.querySelector('.kw5__bas'), cur = -1;
      rail.innerHTML = P.map(function (p, i) { return '<span class="kw5__th" role="option" id="kw5-o' + i + '" aria-selected="false" data-i="' + i + '"><img src="' + EZ.img(p.key) + '" alt="" loading="lazy"><span class="kw5__thl">' + esc(p.title) + '</span></span>'; }).join('');
      var opts = Array.prototype.slice.call(rail.children);
      function show(i) {
        i = (i + P.length) % P.length; if (i === cur) return; cur = i; var p = P[i];
        opts.forEach(function (o, j) { o.setAttribute('aria-selected', i === j ? 'true' : 'false'); });
        rail.setAttribute('aria-activedescendant', 'kw5-o' + i);
        opts[i].scrollIntoView({ block: 'nearest', inline: 'nearest' });
        im.src = EZ.img(p.key); im.alt = p.alt; im.width = p.w; im.height = p.h; cap.textContent = p.title;
        if (k.motion) k.ctx.add(function () { gsap.fromTo(im, { scale: 1.03, autoAlpha: .5 }, { scale: 1, autoAlpha: 1, duration: .35, overwrite: true }); });
      }
      k.on(rail, 'click', function (e) { var o = e.target.closest('.kw5__th'); if (o) show(+o.dataset.i); });
      k.on(rail, 'keydown', function (e) {
        var n = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? cur + 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? cur - 1 : e.key === 'Home' ? 0 : e.key === 'End' ? P.length - 1 : null;
        if (n === null) { if (e.key === 'Enter') EZ.viewer.open(vlist(P), cur, rail); return; }
        e.preventDefault(); show(n);
      });
      k.on(im, 'click', function () { EZ.viewer.open(vlist(P), cur, rail); });
      show(0);
      PAIRS.forEach(function (pr) { bas.appendChild(slider(pr, 'kw5__ba', k, true)); });
      fin(root);
      if (EZ.bindReactions) EZ.bindReactions(bas, k);
      k.add(function () { rail.innerHTML = ''; bas.innerHTML = ''; im.removeAttribute('src'); cap.textContent = ''; clear(root); cur = -1; });
      EZ.reveal(k, root.querySelectorAll('.kw__head > *, .kw__h3'));
    } },

    /* b1 · release record of slot 1 */
    b1: { init: function (root, k) {
      var grid = root.querySelector('.kw1r__grid'), bas = root.querySelector('.kw1r__bas');
      grid.innerHTML = P.map(function (p, i) { return '<button type="button" class="kw1r__t' + (i === 0 || i === 5 ? ' kw1r__t--w' : '') + '" data-i="' + i + '" data-rx="native:kw1r-tile" aria-label="' + esc(p.title) + ', see it large">' + img(p) + '<span class="kw1r__c" aria-hidden="true">' + esc(p.title) + '</span></button>'; }).join('');
      PAIRS.forEach(function (pr) { bas.appendChild(slider(pr, 'kw1r__ba', k)); });
      fin(root);
      if (EZ.bindReactions) { EZ.bindReactions(grid, k); EZ.bindReactions(bas, k); }
      k.on(grid, 'click', function (e) { var b = e.target.closest('.kw1r__t'); if (b) EZ.viewer.open(vlist(P), +b.dataset.i, b); });
      k.add(function () { grid.innerHTML = ''; bas.innerHTML = ''; clear(root); });
      EZ.reveal(k, root.querySelectorAll('.kw__head > *, .kw__h3'));
      if (k.motion) gsap.from(grid.children, { y: 24, autoAlpha: 0, duration: .35, stagger: .04, ease: 'power2.out', scrollTrigger: { trigger: grid, start: 'top 85%', once: true } });
    } },

    /* b2 · release record of slot 2 */
    b2: { init: function (root, k) {
      var tabs = root.querySelector('.kw2r__tabs'), stage = root.querySelector('.kw2r__ba'), strip = root.querySelector('.kw2r__strip'), cur = -1;
      tabs.innerHTML = PAIRS.map(function (pr, i) { return '<button type="button" role="tab" class="kw2r__tab" aria-selected="false" tabindex="-1" data-i="' + i + '" data-rx="native:kw2r-tab">Kitchen ' + (i + 1) + '</button>'; }).join('');
      var T = Array.prototype.slice.call(tabs.children);
      function pick(i, focus) {
        if (i === cur) return; cur = i;
        T.forEach(function (t, j) { t.setAttribute('aria-selected', i === j ? 'true' : 'false'); t.tabIndex = i === j ? 0 : -1; });
        if (focus) T[i].focus();
        stage.innerHTML = ''; var s = slider(PAIRS[i], 'kw2r__s', k); stage.appendChild(s);
        if (EZ.bindReactions) EZ.bindReactions(stage, k);
        if (k.fine) k.on(s, 'pointermove', function (e) { var r = s.getBoundingClientRect(), x = Math.round((e.clientX - r.left) / r.width * 100); var inp = s.querySelector('.kba__r'); inp.value = x; inp.dispatchEvent(new Event('input')); });
      }
      T.forEach(function (t, i) {
        k.on(t, 'click', function () { pick(i); });
        k.on(t, 'keydown', function (e) { if (/Arrow(Right|Left)/.test(e.key)) { e.preventDefault(); pick((i + 1) % T.length, true); } });
      });
      pick(0);
      strip.innerHTML = P.map(function (p, i) { return '<figure class="kw2r__f"><button type="button" class="kw2r__b" data-i="' + i + '" data-rx="native:kw2r-shot" aria-label="' + esc(p.title) + ', see it large">' + img(p) + '</button><figcaption>' + esc(p.title) + '</figcaption></figure>'; }).join('');
      fin(root);
      if (EZ.bindReactions) { EZ.bindReactions(tabs, k); EZ.bindReactions(strip, k); }
      k.on(strip, 'click', function (e) { var b = e.target.closest('.kw2r__b'); if (b) EZ.viewer.open(vlist(P), +b.dataset.i, b); });
      k.on(strip, 'keydown', function (e) { if (e.target === strip && /Arrow(Right|Left)/.test(e.key)) { e.preventDefault(); strip.scrollBy({ left: (e.key === 'ArrowRight' ? 1 : -1) * strip.clientWidth * .6, behavior: k.motion ? 'smooth' : 'auto' }); } });
      k.add(function () { tabs.innerHTML = ''; stage.innerHTML = ''; strip.innerHTML = ''; clear(root); cur = -1; });
      EZ.reveal(k, root.querySelectorAll('.kw2r__head > *'));
    } },

    /* b3 · release record of slot 3 */
    b3: { init: function (root, k) {
      var board = root.querySelector('.kw3r__board'), cards = root.querySelector('.kw3r__cards');
      var ROT = [-2.5, 1.5, -1, 2.5, -1.8, 1, -2.2, 2, -1.4, 1.6];
      board.innerHTML = P.map(function (p, i) { return '<button type="button" class="kw3r__p" style="--r:' + ROT[i] + 'deg" data-i="' + i + '" data-rx="native:kw3r-print" aria-label="' + esc(p.title) + ', see it large"><svg class="kw3r__pin" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><circle cx="10" cy="10" r="7"/></svg>' + img(p) + '<span class="kw3r__c" aria-hidden="true">' + esc(p.title) + '</span></button>'; }).join('');
      cards.innerHTML = PAIRS.map(function (pr, i) {
        return '<div class="kw3r__card" style="aspect-ratio:' + pr.w + ' / ' + pr.h + ';max-width:' + Math.round(pr.w * 1.4) + 'px"><div class="kw3r__in">' +
          '<figure class="kw3r__face kw3r__face--a"><img src="' + EZ.img(pr.a) + '" alt="' + esc(pr.at) + '"><figcaption>After</figcaption></figure>' +
          '<figure class="kw3r__face kw3r__face--b" aria-hidden="true"><img src="' + EZ.img(pr.b) + '" alt="' + esc(pr.bt) + '"><figcaption>Before</figcaption></figure></div>' +
          '<button type="button" class="btn btn--ghost kw3r__turn" aria-pressed="false" data-rx="native:kw3r-turn"><span class="btn__label">Show the before</span></button></div>';
      }).join('');
      fin(root);
      if (EZ.bindReactions) { EZ.bindReactions(board, k); EZ.bindReactions(cards, k); }
      k.on(board, 'click', function (e) { var b = e.target.closest('.kw3r__p'); if (b) EZ.viewer.open(vlist(P), +b.dataset.i, b); });
      cards.querySelectorAll('.kw3r__card').forEach(function (c) {
        var b = c.querySelector('.kw3r__turn');
        k.on(b, 'click', function () {
          var on = b.getAttribute('aria-pressed') !== 'true';
          b.setAttribute('aria-pressed', on ? 'true' : 'false'); b.querySelector('.btn__label').textContent = on ? 'Show the after' : 'Show the before';
          c.classList.toggle('is-turned', on);
          c.querySelector('.kw3r__face--a').setAttribute('aria-hidden', on ? 'true' : 'false'); c.querySelector('.kw3r__face--b').setAttribute('aria-hidden', on ? 'false' : 'true');
        });
      });
      k.add(function () { board.innerHTML = ''; cards.innerHTML = ''; clear(root); });
      EZ.reveal(k, root.querySelectorAll('.kw__head > *'));
      if (k.motion) gsap.from(board.children, { y: -30, rotation: 0, autoAlpha: 0, duration: .45, stagger: .04, ease: 'back.out(1.6)', clearProps: 'transform', scrollTrigger: { trigger: board, start: 'top 85%', once: true } });
    } },

    /* b4 · release record of slot 4 */
    b4: { init: function (root, k) {
      var list = root.querySelector('.kw4r__list'), im = root.querySelector('.kw4r__img'), cap = root.querySelector('.kw4r__cap'), pairs = root.querySelector('.kw4r__pairs'), cur = -1;
      list.innerHTML = P.map(function (p, i) { return '<li><button type="button" class="kw4r__row" data-i="' + i + '" data-rx="native:kw4r-row"><span class="kw4r__n nums">' + (i < 9 ? '0' : '') + (i + 1) + '</span><span class="kw4r__t">' + esc(p.title) + '</span></button></li>'; }).join('');
      var rows = Array.prototype.slice.call(list.querySelectorAll('.kw4r__row'));
      function show(i) {
        if (i === cur) return; cur = i; var p = P[i];
        rows.forEach(function (r, j) { r.classList.toggle('is-on', i === j); });
        im.src = EZ.img(p.key); im.alt = p.alt; im.width = p.w; im.height = p.h; cap.textContent = p.title;
        if (k.motion) k.ctx.add(function () { gsap.fromTo(im, { autoAlpha: .4 }, { autoAlpha: 1, duration: .25, overwrite: true }); });
      }
      k.on(list, 'pointerover', function (e) { var r = e.target.closest('.kw4r__row'); if (r) show(+r.dataset.i); });
      k.on(list, 'focusin', function (e) { var r = e.target.closest('.kw4r__row'); if (r) show(+r.dataset.i); });
      k.on(list, 'click', function (e) { var r = e.target.closest('.kw4r__row'); if (r) EZ.viewer.open(vlist(P), +r.dataset.i, r); });
      show(0);
      pairs.innerHTML = PAIRS.map(function (pr, i) {
        return '<figure class="kw4r__pair" style="max-width:' + Math.round(pr.w * 1.4) + 'px"><div class="kw4r__ph" style="aspect-ratio:' + pr.w + ' / ' + pr.h + '"><img class="kw4r__pa" src="' + EZ.img(pr.a) + '" alt="' + esc(pr.at) + '"><img class="kw4r__pb" src="' + EZ.img(pr.b) + '" alt="' + esc(pr.bt) + '" hidden></div>' +
          '<figcaption><button type="button" class="kw4r__lamp" role="switch" aria-checked="true" data-rx="native:kw4r-lamp"><svg viewBox="0 0 40 22" aria-hidden="true" focusable="false"><rect x="1" y="1" width="38" height="20" rx="10"/><circle cx="29" cy="11" r="7"/></svg><span>After</span></button> Kitchen ' + (i + 1) + '</figcaption></figure>';
      }).join('');
      pairs.querySelectorAll('.kw4r__pair').forEach(function (f) {
        var b = f.querySelector('.kw4r__lamp');
        k.on(b, 'click', function () {
          var after = b.getAttribute('aria-checked') !== 'true';
          b.setAttribute('aria-checked', after ? 'true' : 'false'); b.querySelector('span').textContent = after ? 'After' : 'Before';
          f.querySelector('.kw4r__pa').hidden = !after; f.querySelector('.kw4r__pb').hidden = after;
        });
      });
      fin(root);
      if (EZ.bindReactions) { EZ.bindReactions(list, k); EZ.bindReactions(pairs, k); }
      k.add(function () { list.innerHTML = ''; pairs.innerHTML = ''; im.removeAttribute('src'); cap.textContent = ''; clear(root); cur = -1; });
      EZ.reveal(k, root.querySelectorAll('.kw4r__left > .eyebrow, .kw4r__left > h2'));
    } },

    /* b5 · release record of slot 5 */
    b5: { init: function (root, k) {
      var im = root.querySelector('.kw5r__img'), cap = root.querySelector('.kw5r__cap'), rail = root.querySelector('.kw5r__rail'), bas = root.querySelector('.kw5r__bas'), cur = -1;
      rail.innerHTML = P.map(function (p, i) { return '<span class="kw5r__th" role="option" id="kw5r-o' + i + '" aria-selected="false" data-i="' + i + '"><img src="' + EZ.img(p.key) + '" alt="" loading="lazy"><span class="kw5r__thl">' + esc(p.title) + '</span></span>'; }).join('');
      var opts = Array.prototype.slice.call(rail.children);
      function show(i) {
        i = (i + P.length) % P.length; if (i === cur) return; cur = i; var p = P[i];
        opts.forEach(function (o, j) { o.setAttribute('aria-selected', i === j ? 'true' : 'false'); });
        rail.setAttribute('aria-activedescendant', 'kw5r-o' + i);
        opts[i].scrollIntoView({ block: 'nearest', inline: 'nearest' });
        im.src = EZ.img(p.key); im.alt = p.alt; im.width = p.w; im.height = p.h; cap.textContent = p.title;
        if (k.motion) k.ctx.add(function () { gsap.fromTo(im, { scale: 1.03, autoAlpha: .5 }, { scale: 1, autoAlpha: 1, duration: .35, overwrite: true }); });
      }
      k.on(rail, 'click', function (e) { var o = e.target.closest('.kw5r__th'); if (o) show(+o.dataset.i); });
      k.on(rail, 'keydown', function (e) {
        var n = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? cur + 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? cur - 1 : e.key === 'Home' ? 0 : e.key === 'End' ? P.length - 1 : null;
        if (n === null) { if (e.key === 'Enter') EZ.viewer.open(vlist(P), cur, rail); return; }
        e.preventDefault(); show(n);
      });
      k.on(im, 'click', function () { EZ.viewer.open(vlist(P), cur, rail); });
      show(0);
      PAIRS.forEach(function (pr) { bas.appendChild(slider(pr, 'kw5r__ba', k, true)); });
      fin(root);
      if (EZ.bindReactions) EZ.bindReactions(bas, k);
      k.add(function () { rail.innerHTML = ''; bas.innerHTML = ''; im.removeAttribute('src'); cap.textContent = ''; clear(root); cur = -1; });
      EZ.reveal(k, root.querySelectorAll('.kw__head > *, .kw__h3'));
    } }
  });
})();
