/* Contact page, section 3 · contact-area. Town names, counties and map positions come only from the map data. */
(function () {
  var ORDER = ['Palm Beach', 'Broward', 'Miami-Dade'];
  function geo() { return (window.__DATA || {}).southfl; }
  function esc(t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  function nb(c) { return c.replace('-', '‑'); }
  function norm(t) { return String(t).toLowerCase().replace(/[^a-z]/g, ''); }

  EZ.section('contact-area', {
    /* v1 · The town finder: a native list of all 104 suggests as you type; Check answers from the list only */
    1: { init: function (root, k) {
      var D = geo(), list = root.querySelector('datalist'), form = root.querySelector('form'), input = root.querySelector('#' + root.querySelector('.sa1__lbl').htmlFor), out = root.querySelector('.sa1__out');
      input.setAttribute('list', list.id);   // the record copy renames ids; keep the pair together
      var all = [];
      ORDER.forEach(function (c) { D.towns[c].forEach(function (t) { all.push({ n: t[0], c: c }); }); });
      list.innerHTML = all.map(function (t) { return '<option value="' + esc(t.n) + '">'; }).join('');
      var base = out.innerHTML;
      k.on(form, 'submit', function (e) {
        e.preventDefault();
        var q = norm(input.value);
        if (!q) { out.innerHTML = '<p class="sa1__a">Type a town or city first.</p>'; input.focus(); return; }
        var hit = all.filter(function (t) { return norm(t.n) === q; })[0];
        if (hit) out.innerHTML = '<p class="sa1__y"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 12.5 L9.5 18 L20 6"/></svg>Yes. ' + esc(hit.n) + ' is in ' + nb(hit.c) + ' County, one of the <span class="nums">104</span> municipalities we build in.</p>';
        else out.innerHTML = '<p class="sa1__nn">' + esc(input.value.trim()) + ' is not on our published list of <span class="nums">104</span>. Call <a class="link nums" href="tel:+17542360675" data-rx="phone">(754)&nbsp;236&#8209;0675</a> and ask.</p>';
        var a = out.querySelector('a'); if (a && EZ.bindOne) EZ.bindOne(a, k);
        if (k.motion) k.ctx.add(function () { gsap.from(out.firstChild, { y: 10, opacity: 0, duration: .35, ease: 'power2.out' }); });
      });
      k.add(function () { list.innerHTML = ''; out.innerHTML = base; form.reset(); });
      EZ.reveal(k, root.querySelectorAll('.sa1__copy > *'));
    } },

    /* v2 · The three columns: each county printed in full, the count at the head */
    2: { init: function (root, k) {
      var D = geo(), cols = root.querySelector('.sa2__cols');
      cols.innerHTML = ORDER.map(function (c) {
        return '<div class="sa2__col"><h3 class="sa2__h">' + nb(c) + ' <span class="nums">' + D.towns[c].length + '</span></h3><ul class="sa2__ul">' + D.towns[c].map(function (t) { return '<li>' + esc(t[0]) + '</li>'; }).join('') + '</ul></div>';
      }).join('');
      k.add(function () { cols.innerHTML = ''; });
      EZ.reveal(k, root.querySelectorAll('.sa__head > *'));
      if (k.motion) gsap.from(cols.querySelectorAll('.sa2__col'), { y: 30, opacity: 0, duration: .6, stagger: .12, ease: 'power3.out', scrollTrigger: { trigger: cols, start: 'top 85%', once: true } });
    } },

    /* v3 · The map with switches: toggle buttons per county; the dots and the list follow */
    3: { init: function (root, k) {
      var D = geo(), svg = root.querySelector('.sa3__map'), sw = root.querySelector('.sa3__sw'), n = root.querySelector('.sa3__n'), names = root.querySelector('.sa3__names');
      svg.setAttribute('viewBox', '-30 -30 ' + (D.w + 60) + ' ' + (D.h + 60));
      svg.innerHTML = ORDER.map(function (c) { return '<path class="sa3__cty" d="' + D.counties[c] + '"/>'; }).join('') +
        ORDER.map(function (c) { return '<g class="sa3__g" data-c="' + c + '">' + D.towns[c].map(function (t) { return '<circle class="sa3__dot" r="13" cx="' + t[1] + '" cy="' + t[2] + '"/>'; }).join('') + '</g>'; }).join('');
      sw.innerHTML = ORDER.map(function (c, i) { return '<button type="button" class="sa3__b" aria-pressed="true" data-c="' + c + '" data-rx="~' + ['flag', 'compass', 'map'][i] + '/lid/chips/t"><span class="sa3__led" aria-hidden="true"></span>' + nb(c) + ' <span class="nums">' + D.towns[c].length + '</span></button>'; }).join('');
      var B = Array.prototype.slice.call(sw.children), G = Array.prototype.slice.call(svg.querySelectorAll('.sa3__g'));
      function draw() {
        var on = B.filter(function (b) { return b.getAttribute('aria-pressed') === 'true'; }).map(function (b) { return b.dataset.c; });
        G.forEach(function (g) { g.classList.toggle('is-off', on.indexOf(g.dataset.c) < 0); });
        var t = []; on.forEach(function (c) { D.towns[c].forEach(function (x) { t.push(x[0]); }); });
        n.innerHTML = '<span class="nums">' + t.length + '</span> of <span class="nums">104</span> shown';
        names.textContent = t.length ? t.join(' · ') : 'Switch a county on to list its towns.';
      }
      B.forEach(function (b) { k.on(b, 'click', function () { b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') === 'true' ? 'false' : 'true'); draw(); }); });
      if (EZ.bindReactions) EZ.bindReactions(sw, k);
      draw();
      k.add(function () { svg.innerHTML = ''; sw.innerHTML = ''; n.textContent = ''; names.textContent = ''; });
      EZ.reveal(k, root.querySelectorAll('.sa3__copy > .eyebrow, .sa3__copy > h2, .sa3__copy > .t-lead'));
      if (k.motion) gsap.from(svg.querySelectorAll('.sa3__dot'), { scale: 0, transformOrigin: '50% 50%', duration: .3, stagger: .006, ease: 'back.out(2)', scrollTrigger: { trigger: svg, start: 'top 80%', once: true } });
    } },

    /* v4 · The proportion bar: three radio parts sized by count; the picked county's towns as tags */
    4: { init: function (root, k) {
      var D = geo(), bar = root.querySelector('.sa4__bar'), t = root.querySelector('.sa4__t'), tags = root.querySelector('.sa4__tags');
      bar.innerHTML = ORDER.map(function (c, i) { var m = D.towns[c].length; return '<button type="button" role="radio" class="sa4__p" style="flex:' + m + '" aria-checked="false" tabindex="-1" data-c="' + c + '" data-rx="native:sa4-county"><span class="sa4__n nums">' + m + '</span><span class="sa4__c">' + nb(c) + '</span></button>'; }).join('');
      var P = Array.prototype.slice.call(bar.children);
      function pick(c, focus) {
        P.forEach(function (p) { var on = p.dataset.c === c; p.setAttribute('aria-checked', on ? 'true' : 'false'); p.tabIndex = on ? 0 : -1; if (on && focus) p.focus(); });
        t.innerHTML = nb(c) + ': <span class="nums">' + D.towns[c].length + '</span> of <span class="nums">104</span>';
        tags.innerHTML = D.towns[c].map(function (x) { return '<li>' + esc(x[0]) + '</li>'; }).join('');
        if (k.motion) k.ctx.add(function () { gsap.from(tags.children, { y: 8, opacity: 0, duration: .25, stagger: .012, ease: 'power2.out' }); });
      }
      P.forEach(function (p, i) {
        k.on(p, 'click', function () { pick(p.dataset.c); });
        k.on(p, 'keydown', function (e) { var m = /Arrow(Right|Down)/.test(e.key) ? i + 1 : /Arrow(Left|Up)/.test(e.key) ? i - 1 : null; if (m === null) return; e.preventDefault(); pick(P[(m + 3) % 3].dataset.c, true); });
      });
      pick('Miami-Dade');
      k.add(function () { bar.innerHTML = ''; t.textContent = ''; tags.innerHTML = ''; });
      EZ.reveal(k, root.querySelectorAll('.sa__head > *'));
      if (k.motion) gsap.from(P, { scaleX: 0, transformOrigin: '0% 50%', duration: .6, stagger: .15, ease: 'power3.out', scrollTrigger: { trigger: bar, start: 'top 85%', once: true } });
    } },

    /* v5 · The moving rows: each row holds its county twice so the loop is seamless; Stop holds them; reduced motion wraps them still */
    5: { init: function (root, k) {
      var D = geo(), rows = root.querySelector('.sa5__rows'), btn = root.querySelector('.sa5__stop');
      rows.innerHTML = ORDER.map(function (c, i) {
        var one = '<span class="sa5__set"><b class="sa5__c">' + nb(c) + ' <span class="nums">' + D.towns[c].length + '</span></b>' + D.towns[c].map(function (t) { return '<span>' + esc(t[0]) + '</span>'; }).join('') + '</span>';
        return '<div class="sa5__row' + (i === 1 ? ' sa5__row--rev' : '') + '"><div class="sa5__run">' + one + (k.motion ? one.replace('<span class="sa5__set">', '<span class="sa5__set" aria-hidden="true">') : '') + '</div></div>';
      }).join('');
      var tw = [];
      if (k.motion) {
        Array.prototype.slice.call(rows.querySelectorAll('.sa5__run')).forEach(function (r, i) {
          var dir = i === 1 ? 1 : -1;
          k.ctx.add(function () { tw.push(gsap.fromTo(r, { xPercent: dir < 0 ? 0 : -50 }, { xPercent: dir < 0 ? -50 : 0, duration: [70, 60, 80][i], ease: 'none', repeat: -1 })); });
        });
        k.on(btn, 'click', function () {
          var stop = btn.getAttribute('aria-pressed') !== 'true';
          btn.setAttribute('aria-pressed', stop ? 'true' : 'false');
          btn.querySelector('.btn__label').textContent = stop ? 'Start the rows' : 'Stop the rows';
          tw.forEach(function (t) { if (stop) t.pause(); else t.play(); });
        });
      } else { btn.hidden = true; rows.classList.add('is-still'); }
      k.add(function () { rows.innerHTML = ''; rows.classList.remove('is-still'); btn.hidden = false; btn.setAttribute('aria-pressed', 'false'); btn.querySelector('.btn__label').textContent = 'Stop the rows'; });
      EZ.reveal(k, root.querySelectorAll('.sa__head > *'));
    } },

    /* b1 · release record of slot 1 */
    b1: { init: function (root, k) {
      var D = geo(), list = root.querySelector('datalist'), form = root.querySelector('form'), input = root.querySelector('#' + root.querySelector('.sa1r__lbl').htmlFor), out = root.querySelector('.sa1r__out');
      input.setAttribute('list', list.id);   // the record copy renames ids; keep the pair together
      var all = [];
      ORDER.forEach(function (c) { D.towns[c].forEach(function (t) { all.push({ n: t[0], c: c }); }); });
      list.innerHTML = all.map(function (t) { return '<option value="' + esc(t.n) + '">'; }).join('');
      var base = out.innerHTML;
      k.on(form, 'submit', function (e) {
        e.preventDefault();
        var q = norm(input.value);
        if (!q) { out.innerHTML = '<p class="sa1r__a">Type a town or city first.</p>'; input.focus(); return; }
        var hit = all.filter(function (t) { return norm(t.n) === q; })[0];
        if (hit) out.innerHTML = '<p class="sa1r__y"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 12.5 L9.5 18 L20 6"/></svg>Yes. ' + esc(hit.n) + ' is in ' + nb(hit.c) + ' County, one of the <span class="nums">104</span> municipalities we build in.</p>';
        else out.innerHTML = '<p class="sa1r__nn">' + esc(input.value.trim()) + ' is not on our published list of <span class="nums">104</span>. Call <a class="link nums" href="tel:+17542360675" data-rx="phone">(754)&nbsp;236&#8209;0675</a> and ask.</p>';
        var a = out.querySelector('a'); if (a && EZ.bindOne) EZ.bindOne(a, k);
        if (k.motion) k.ctx.add(function () { gsap.from(out.firstChild, { y: 10, opacity: 0, duration: .35, ease: 'power2.out' }); });
      });
      k.add(function () { list.innerHTML = ''; out.innerHTML = base; form.reset(); });
      EZ.reveal(k, root.querySelectorAll('.sa1r__copy > *'));
    } },

    /* b2 · release record of slot 2 */
    b2: { init: function (root, k) {
      var D = geo(), cols = root.querySelector('.sa2r__cols');
      cols.innerHTML = ORDER.map(function (c) {
        return '<div class="sa2r__col"><h3 class="sa2r__h">' + nb(c) + ' <span class="nums">' + D.towns[c].length + '</span></h3><ul class="sa2r__ul">' + D.towns[c].map(function (t) { return '<li>' + esc(t[0]) + '</li>'; }).join('') + '</ul></div>';
      }).join('');
      k.add(function () { cols.innerHTML = ''; });
      EZ.reveal(k, root.querySelectorAll('.sa__head > *'));
      if (k.motion) gsap.from(cols.querySelectorAll('.sa2r__col'), { y: 30, opacity: 0, duration: .6, stagger: .12, ease: 'power3.out', scrollTrigger: { trigger: cols, start: 'top 85%', once: true } });
    } },

    /* b3 · release record of slot 3 */
    b3: { init: function (root, k) {
      var D = geo(), svg = root.querySelector('.sa3r__map'), sw = root.querySelector('.sa3r__sw'), n = root.querySelector('.sa3r__n'), names = root.querySelector('.sa3r__names');
      svg.setAttribute('viewBox', '-30 -30 ' + (D.w + 60) + ' ' + (D.h + 60));
      svg.innerHTML = ORDER.map(function (c) { return '<path class="sa3r__cty" d="' + D.counties[c] + '"/>'; }).join('') +
        ORDER.map(function (c) { return '<g class="sa3r__g" data-c="' + c + '">' + D.towns[c].map(function (t) { return '<circle class="sa3r__dot" r="13" cx="' + t[1] + '" cy="' + t[2] + '"/>'; }).join('') + '</g>'; }).join('');
      sw.innerHTML = ORDER.map(function (c, i) { return '<button type="button" class="sa3r__b" aria-pressed="true" data-c="' + c + '" data-rx="~' + ['flag', 'compass', 'map'][i] + '/lid/chips/t"><span class="sa3r__led" aria-hidden="true"></span>' + nb(c) + ' <span class="nums">' + D.towns[c].length + '</span></button>'; }).join('');
      var B = Array.prototype.slice.call(sw.children), G = Array.prototype.slice.call(svg.querySelectorAll('.sa3r__g'));
      function draw() {
        var on = B.filter(function (b) { return b.getAttribute('aria-pressed') === 'true'; }).map(function (b) { return b.dataset.c; });
        G.forEach(function (g) { g.classList.toggle('is-off', on.indexOf(g.dataset.c) < 0); });
        var t = []; on.forEach(function (c) { D.towns[c].forEach(function (x) { t.push(x[0]); }); });
        n.innerHTML = '<span class="nums">' + t.length + '</span> of <span class="nums">104</span> shown';
        names.textContent = t.length ? t.join(' · ') : 'Switch a county on to list its towns.';
      }
      B.forEach(function (b) { k.on(b, 'click', function () { b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') === 'true' ? 'false' : 'true'); draw(); }); });
      if (EZ.bindReactions) EZ.bindReactions(sw, k);
      draw();
      k.add(function () { svg.innerHTML = ''; sw.innerHTML = ''; n.textContent = ''; names.textContent = ''; });
      EZ.reveal(k, root.querySelectorAll('.sa3r__copy > .eyebrow, .sa3r__copy > h2, .sa3r__copy > .t-lead'));
      if (k.motion) gsap.from(svg.querySelectorAll('.sa3r__dot'), { scale: 0, transformOrigin: '50% 50%', duration: .3, stagger: .006, ease: 'back.out(2)', scrollTrigger: { trigger: svg, start: 'top 80%', once: true } });
    } },

    /* b4 · release record of slot 4 */
    b4: { init: function (root, k) {
      var D = geo(), bar = root.querySelector('.sa4r__bar'), t = root.querySelector('.sa4r__t'), tags = root.querySelector('.sa4r__tags');
      bar.innerHTML = ORDER.map(function (c, i) { var m = D.towns[c].length; return '<button type="button" role="radio" class="sa4r__p" style="flex:' + m + '" aria-checked="false" tabindex="-1" data-c="' + c + '" data-rx="native:sa4r-county"><span class="sa4r__n nums">' + m + '</span><span class="sa4r__c">' + nb(c) + '</span></button>'; }).join('');
      var P = Array.prototype.slice.call(bar.children);
      function pick(c, focus) {
        P.forEach(function (p) { var on = p.dataset.c === c; p.setAttribute('aria-checked', on ? 'true' : 'false'); p.tabIndex = on ? 0 : -1; if (on && focus) p.focus(); });
        t.innerHTML = nb(c) + ': <span class="nums">' + D.towns[c].length + '</span> of <span class="nums">104</span>';
        tags.innerHTML = D.towns[c].map(function (x) { return '<li>' + esc(x[0]) + '</li>'; }).join('');
        if (k.motion) k.ctx.add(function () { gsap.from(tags.children, { y: 8, opacity: 0, duration: .25, stagger: .012, ease: 'power2.out' }); });
      }
      P.forEach(function (p, i) {
        k.on(p, 'click', function () { pick(p.dataset.c); });
        k.on(p, 'keydown', function (e) { var m = /Arrow(Right|Down)/.test(e.key) ? i + 1 : /Arrow(Left|Up)/.test(e.key) ? i - 1 : null; if (m === null) return; e.preventDefault(); pick(P[(m + 3) % 3].dataset.c, true); });
      });
      pick('Miami-Dade');
      k.add(function () { bar.innerHTML = ''; t.textContent = ''; tags.innerHTML = ''; });
      EZ.reveal(k, root.querySelectorAll('.sa__head > *'));
      if (k.motion) gsap.from(P, { scaleX: 0, transformOrigin: '0% 50%', duration: .6, stagger: .15, ease: 'power3.out', scrollTrigger: { trigger: bar, start: 'top 85%', once: true } });
    } },

    /* b5 · release record of slot 5 */
    b5: { init: function (root, k) {
      var D = geo(), rows = root.querySelector('.sa5r__rows'), btn = root.querySelector('.sa5r__stop');
      rows.innerHTML = ORDER.map(function (c, i) {
        var one = '<span class="sa5r__set"><b class="sa5r__c">' + nb(c) + ' <span class="nums">' + D.towns[c].length + '</span></b>' + D.towns[c].map(function (t) { return '<span>' + esc(t[0]) + '</span>'; }).join('') + '</span>';
        return '<div class="sa5r__row' + (i === 1 ? ' sa5r__row--rev' : '') + '"><div class="sa5r__run">' + one + (k.motion ? one.replace('<span class="sa5r__set">', '<span class="sa5r__set" aria-hidden="true">') : '') + '</div></div>';
      }).join('');
      var tw = [];
      if (k.motion) {
        Array.prototype.slice.call(rows.querySelectorAll('.sa5r__run')).forEach(function (r, i) {
          var dir = i === 1 ? 1 : -1;
          k.ctx.add(function () { tw.push(gsap.fromTo(r, { xPercent: dir < 0 ? 0 : -50 }, { xPercent: dir < 0 ? -50 : 0, duration: [70, 60, 80][i], ease: 'none', repeat: -1 })); });
        });
        k.on(btn, 'click', function () {
          var stop = btn.getAttribute('aria-pressed') !== 'true';
          btn.setAttribute('aria-pressed', stop ? 'true' : 'false');
          btn.querySelector('.btn__label').textContent = stop ? 'Start the rows' : 'Stop the rows';
          tw.forEach(function (t) { if (stop) t.pause(); else t.play(); });
        });
      } else { btn.hidden = true; rows.classList.add('is-still'); }
      k.add(function () { rows.innerHTML = ''; rows.classList.remove('is-still'); btn.hidden = false; btn.setAttribute('aria-pressed', 'false'); btn.querySelector('.btn__label').textContent = 'Stop the rows'; });
      EZ.reveal(k, root.querySelectorAll('.sa__head > *'));
    } }
  });
})();
