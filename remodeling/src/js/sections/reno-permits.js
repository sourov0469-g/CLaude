/* Renovation page, section 3 · reno-permits. County rules, stages and partner facts are the firm's own (FACTS.md). */
(function () {
  var ZONE = {
    'Miami-Dade': ['High-Velocity Hurricane Zone', 'Miami-Dade sits inside Florida’s High-Velocity Hurricane Zone: products need a valid Miami-Dade Notice of Acceptance.'],
    'Broward': ['High-Velocity Hurricane Zone', 'Broward sits inside Florida’s High-Velocity Hurricane Zone: products need a valid Miami-Dade Notice of Acceptance.'],
    'Palm Beach': ['Wind-Borne Debris Region', 'Palm Beach is outside the High-Velocity Hurricane Zone but under Wind-Borne Debris Region rules.']
  };
  // the four partners as published; 'names' are the kinds of work each partner's published list names (nothing inferred)
  var PARTNERS = [
    { n: 'Synchrony', t: 'Project Card, revolving consumer credit', f: 'Special-financing terms Synchrony publishes from 6 to 132 months; one card, reusable across projects.',
      names: { floor: 'Useful if a kitchen now is likely to be followed by a bathroom or a flooring run later.' } },
    { n: 'Service Finance Company', t: 'Fixed installment loan', f: 'First payment 30 days after completion; no pre-payment penalty.',
      names: { roof: 'Roof replacement is among the typical Elbaz projects listed for it.', win: 'Impact windows and doors are among the typical Elbaz projects listed for it.', floor: 'Flooring is among the typical Elbaz projects listed for it.' } },
    { n: 'Ygrene', t: 'Florida PACE, repaid with property taxes, not a loan', f: 'Up to a 20-year published residential term; soft credit pull.',
      names: { roof: 'Roofing is one of Ygrene’s published Florida categories.', win: 'Windows and doors are one of Ygrene’s published Florida categories.' } },
    { n: 'Renew Financial', t: 'RenewPACE, property-assessed', f: 'Published maximum $250K, and up to 20% of property value; live across all three counties; no application fee.', names: {} }
  ];
  var WORK = [['roof', 'Roofing'], ['win', 'Windows & doors'], ['floor', 'Flooring'], ['out', 'Outdoor living']];
  var STAGES = [['Site Evaluation', 1, 2, 'Flood zone, High-Velocity Hurricane Zone requirements, permit history, HOA and historic review, and what is behind the walls.'],
    ['Design & Planning', 2, 5, 'Layouts, finishes and system choices, with the real trade-offs explained rather than one pre-set package.'],
    ['Proposal & Scope', 5, 6, 'A written scope that says what is included, what is not, and where contingencies are likely. Priced against the drawings, not a guess.'],
    ['Permitting', 6, 12, 'Permits pulled directly; every product checked for its Notice of Acceptance or Florida Product Approval.']];
  function esc(t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }

  EZ.section('reno-permits', {
    /* v1 · The county map: the radios pick a county; its outline fills; the HVHZ counties carry a hatch */
    1: { init: function (root, k) {
      var D = (window.__DATA || {}).southfl, svg = root.querySelector('.rp1__map'), btns = Array.prototype.slice.call(root.querySelectorAll('.rp1__c'));
      var z = root.querySelector('.rp1__z'), d = root.querySelector('.rp1__d');
      svg.setAttribute('viewBox', '-40 -40 1080 2460');
      svg.innerHTML = '<defs><pattern id="rp1-hatch" width="24" height="24" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0 V24" stroke="#FF9C5E" stroke-width="6"/></pattern></defs>' +
        ['Palm Beach', 'Broward', 'Miami-Dade'].map(function (c) { return '<path class="rp1__cty-p" data-c="' + c + '" d="' + D.counties[c] + '"/>' + (ZONE[c][0].indexOf('Hurricane') > -1 ? '<path class="rp1__hatch" d="' + D.counties[c] + '"/>' : ''); }).join('') +
        ['Palm Beach', 'Broward', 'Miami-Dade'].map(function (c) { var b = D.boxes[c]; return '<text class="rp1__lbl" x="' + (b[0] + 60) + '" y="' + (b[1] + 110) + '">' + c.toUpperCase() + '</text>'; }).join('');
      var paths = Array.prototype.slice.call(svg.querySelectorAll('.rp1__cty-p'));
      function pick(c, focus) {
        btns.forEach(function (b) { var on = b.dataset.c === c; b.setAttribute('aria-checked', on ? 'true' : 'false'); b.tabIndex = on ? 0 : -1; if (on && focus) b.focus(); });
        paths.forEach(function (p) { p.classList.toggle('is-on', p.dataset.c === c); });
        z.textContent = c + ': ' + ZONE[c][0]; d.textContent = ZONE[c][1];
      }
      btns.forEach(function (b, i) {
        k.on(b, 'click', function () { pick(b.dataset.c); });
        k.on(b, 'keydown', function (e) { var m = /Arrow(Right|Down)/.test(e.key) ? i + 1 : /Arrow(Left|Up)/.test(e.key) ? i - 1 : null; if (m === null) return; e.preventDefault(); pick(btns[(m + 3) % 3].dataset.c, true); });
      });
      pick('Miami-Dade');
      k.add(function () { svg.innerHTML = ''; });
      EZ.reveal(k, root.querySelectorAll('.rp1__copy > *'));
      if (k.motion) gsap.from(paths, { drawSVG: '0%', duration: 1, stagger: .2, ease: 'power2.inOut', scrollTrigger: { trigger: svg, start: 'top 80%', once: true } });
    } },

    /* v2 · The site evaluation: the ticks draw in order; the button replays them */
    2: { init: function (root, k) {
      var ticks = root.querySelectorAll('.rp2__list .tk'), btn = root.querySelector('.rp2__run');
      function run() { if (k.motion) k.ctx.add(function () { gsap.fromTo(ticks, { drawSVG: '0%' }, { drawSVG: '100%', duration: .3, stagger: .25, ease: 'power2.out' }); }); }
      if (!k.motion) btn.hidden = true; else k.on(btn, 'click', run);
      k.add(function () { btn.hidden = false; });
      EZ.reveal(k, root.querySelectorAll('.rp2__copy > *'));
      if (k.motion) ScrollTrigger.create({ trigger: root.querySelector('.rp2__sheet'), start: 'top 75%', once: true, onEnter: run });
    } },

    /* v3 · Paying for exterior work: radio buttons pick the work; each partner card says whether its published list names it */
    3: { init: function (root, k) {
      var seg = root.querySelector('.rp3__seg'), cards = root.querySelector('.rp3__cards');
      seg.innerHTML = WORK.map(function (w, i) { return '<button type="button" role="radio" class="rp3__w" aria-checked="' + (i ? 'false' : 'true') + '" tabindex="' + (i ? '-1' : '0') + '" data-w="' + w[0] + '" data-rx="native:rp3-work">' + esc(w[1]) + '</button>'; }).join('');
      var W = Array.prototype.slice.call(seg.children);
      function pick(w, focus) {
        W.forEach(function (b) { var on = b.dataset.w === w; b.setAttribute('aria-checked', on ? 'true' : 'false'); b.tabIndex = on ? 0 : -1; if (on && focus) b.focus(); });
        var any = false;
        cards.innerHTML = PARTNERS.map(function (p) {
          var line = p.names[w]; if (line) any = true;
          return '<article class="rp3__c' + (line ? ' is-named' : '') + '"><h3>' + esc(p.n) + '</h3><p class="rp3__t">' + esc(p.t) + '</p><p class="rp3__f">' + esc(p.f) + '</p><p class="rp3__m">' + (line ? esc(line) : 'Its published list does not name this work.') + '</p></article>';
        }).join('') + (any ? '' : '<p class="rp3__none">None of the four partners&rsquo; published lists names this work. Ask us in a consultation and we will tell you what we know, and what only the lender can answer.</p>');
        if (k.motion) k.ctx.add(function () { gsap.from(cards.querySelectorAll('.is-named'), { y: -8, duration: .3, ease: 'back.out(2)' }); });
      }
      W.forEach(function (b, i) {
        k.on(b, 'click', function () { pick(b.dataset.w); });
        k.on(b, 'keydown', function (e) { var m = /Arrow(Right|Down)/.test(e.key) ? i + 1 : /Arrow(Left|Up)/.test(e.key) ? i - 1 : null; if (m === null) return; e.preventDefault(); pick(W[(m + W.length) % W.length].dataset.w, true); });
      });
      if (EZ.bindReactions) EZ.bindReactions(seg, k);
      pick('roof');
      k.add(function () { seg.innerHTML = ''; cards.innerHTML = ''; });
      EZ.reveal(k, root.querySelectorAll('.rp3__head > *'));
    } },

    /* v4 · The week ruler: the range picks a week; the stages whose published weeks include it light up on the rule */
    4: { init: function (root, k) {
      var svg = root.querySelector('.rp4__rule'), input = root.querySelector('.rp4__range input'), ow = root.querySelector('.rp4__w'), os = root.querySelector('.rp4__s');
      var bars, cur;
      function draw() {
        var W = Math.max(320, Math.round(svg.clientWidth) || 1000), X = function (w) { return 40 + (w - 1) * ((W - 80) / 11); }, s = '<path class="ax" d="M40 120 H' + (W - 40) + '"/>';
        svg.setAttribute('viewBox', '0 0 ' + W + ' 150');
        for (var w = 1; w <= 12; w++) s += '<path class="tk" d="M' + X(w) + ' 112 V128"/><text class="wk" x="' + X(w) + '" y="146">' + w + '</text>';
        s += '<path class="cur" d="M40 6 V120"/>';
        STAGES.forEach(function (st, i) { s += '<rect class="bar" data-i="' + i + '" x="' + (X(st[1]) - 12) + '" y="' + (14 + i * 24) + '" width="' + (X(st[2]) - X(st[1]) + 24) + '" height="18" rx="3"/><text class="bl" x="' + (X(st[1]) - 6) + '" y="' + (27 + i * 24) + '">' + st[0] + '</text>'; });
        svg.innerHTML = s;
        bars = Array.prototype.slice.call(svg.querySelectorAll('.bar')); cur = svg.querySelector('.cur'); draw.X = X;
      }
      draw();
      function set(wk) {
        var on = STAGES.filter(function (st) { return wk >= st[1] && wk <= st[2]; });
        bars.forEach(function (b) { var st = STAGES[+b.dataset.i]; b.classList.toggle('is-on', wk >= st[1] && wk <= st[2]); });
        cur.setAttribute('d', 'M' + draw.X(wk) + ' 6 V120');
        ow.textContent = 'Week ' + wk;
        os.innerHTML = on.map(function (st) { return '<p><b>' + esc(st[0]) + '</b> (weeks ' + st[1] + (st[2] !== st[1] ? '–' + st[2] : '') + ') ' + esc(st[3]) + '</p>'; }).join('');
        input.setAttribute('aria-valuetext', 'Week ' + wk + ': ' + on.map(function (st) { return st[0]; }).join(' and '));
      }
      k.on(input, 'input', function () { set(+input.value); });
      set(1);
      var lastW = svg.clientWidth; k.ro(svg, function () { if (Math.abs(svg.clientWidth - lastW) < 4) return; lastW = svg.clientWidth; draw(); set(+input.value); });
      k.add(function () { svg.innerHTML = ''; input.value = 1; });
      EZ.reveal(k, root.querySelectorAll('.rp3__head > *'));
      if (k.motion) gsap.from(bars, { scaleX: 0, transformOrigin: '0% 50%', duration: .5, stagger: .12, ease: 'power3.out', scrollTrigger: { trigger: svg, start: 'top 85%', once: true } });
    } },

    /* v5 · Questions: native details/summary; the stamp draws its tick when the band arrives */
    5: { init: function (root, k) {
      EZ.reveal(k, root.querySelectorAll('.rp5__copy > .eyebrow, .rp5__copy > h2, .rp5__q'));
      if (k.motion) gsap.from(root.querySelectorAll('.rp5__stamp circle, .rp5__stamp path'), { drawSVG: '0%', duration: .7, stagger: .15, ease: 'power2.inOut', scrollTrigger: { trigger: root.querySelector('.rp5__stamp'), start: 'top 85%', once: true } });
    } },

    /* b1 · release record of slot 1 */
    b1: { init: function (root, k) {
      var D = (window.__DATA || {}).southfl, svg = root.querySelector('.rp1r__map'), btns = Array.prototype.slice.call(root.querySelectorAll('.rp1r__c'));
      var z = root.querySelector('.rp1r__z'), d = root.querySelector('.rp1r__d');
      svg.setAttribute('viewBox', '-40 -40 1080 2460');
      svg.innerHTML = '<defs><pattern id="rp1r-hatch" width="24" height="24" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0 V24" stroke="#FF9C5E" stroke-width="6"/></pattern></defs>' +
        ['Palm Beach', 'Broward', 'Miami-Dade'].map(function (c) { return '<path class="rp1r__cty-p" data-c="' + c + '" d="' + D.counties[c] + '"/>' + (ZONE[c][0].indexOf('Hurricane') > -1 ? '<path class="rp1r__hatch" d="' + D.counties[c] + '"/>' : ''); }).join('') +
        ['Palm Beach', 'Broward', 'Miami-Dade'].map(function (c) { var b = D.boxes[c]; return '<text class="rp1r__lbl" x="' + (b[0] + 60) + '" y="' + (b[1] + 110) + '">' + c.toUpperCase() + '</text>'; }).join('');
      var paths = Array.prototype.slice.call(svg.querySelectorAll('.rp1r__cty-p'));
      function pick(c, focus) {
        btns.forEach(function (b) { var on = b.dataset.c === c; b.setAttribute('aria-checked', on ? 'true' : 'false'); b.tabIndex = on ? 0 : -1; if (on && focus) b.focus(); });
        paths.forEach(function (p) { p.classList.toggle('is-on', p.dataset.c === c); });
        z.textContent = c + ': ' + ZONE[c][0]; d.textContent = ZONE[c][1];
      }
      btns.forEach(function (b, i) {
        k.on(b, 'click', function () { pick(b.dataset.c); });
        k.on(b, 'keydown', function (e) { var m = /Arrow(Right|Down)/.test(e.key) ? i + 1 : /Arrow(Left|Up)/.test(e.key) ? i - 1 : null; if (m === null) return; e.preventDefault(); pick(btns[(m + 3) % 3].dataset.c, true); });
      });
      pick('Miami-Dade');
      k.add(function () { svg.innerHTML = ''; });
      EZ.reveal(k, root.querySelectorAll('.rp1r__copy > *'));
      if (k.motion) gsap.from(paths, { drawSVG: '0%', duration: 1, stagger: .2, ease: 'power2.inOut', scrollTrigger: { trigger: svg, start: 'top 80%', once: true } });
    } },

    /* b2 · release record of slot 2 */
    b2: { init: function (root, k) {
      var ticks = root.querySelectorAll('.rp2r__list .tk'), btn = root.querySelector('.rp2r__run');
      function run() { if (k.motion) k.ctx.add(function () { gsap.fromTo(ticks, { drawSVG: '0%' }, { drawSVG: '100%', duration: .3, stagger: .25, ease: 'power2.out' }); }); }
      if (!k.motion) btn.hidden = true; else k.on(btn, 'click', run);
      k.add(function () { btn.hidden = false; });
      EZ.reveal(k, root.querySelectorAll('.rp2r__copy > *'));
      if (k.motion) ScrollTrigger.create({ trigger: root.querySelector('.rp2r__sheet'), start: 'top 75%', once: true, onEnter: run });
    } },

    /* b3 · release record of slot 3 */
    b3: { init: function (root, k) {
      var seg = root.querySelector('.rp3r__seg'), cards = root.querySelector('.rp3r__cards');
      seg.innerHTML = WORK.map(function (w, i) { return '<button type="button" role="radio" class="rp3r__w" aria-checked="' + (i ? 'false' : 'true') + '" tabindex="' + (i ? '-1' : '0') + '" data-w="' + w[0] + '" data-rx="native:rp3r-work">' + esc(w[1]) + '</button>'; }).join('');
      var W = Array.prototype.slice.call(seg.children);
      function pick(w, focus) {
        W.forEach(function (b) { var on = b.dataset.w === w; b.setAttribute('aria-checked', on ? 'true' : 'false'); b.tabIndex = on ? 0 : -1; if (on && focus) b.focus(); });
        var any = false;
        cards.innerHTML = PARTNERS.map(function (p) {
          var line = p.names[w]; if (line) any = true;
          return '<article class="rp3r__c' + (line ? ' is-named' : '') + '"><h3>' + esc(p.n) + '</h3><p class="rp3r__t">' + esc(p.t) + '</p><p class="rp3r__f">' + esc(p.f) + '</p><p class="rp3r__m">' + (line ? esc(line) : 'Its published list does not name this work.') + '</p></article>';
        }).join('') + (any ? '' : '<p class="rp3r__none">None of the four partners&rsquo; published lists names this work. Ask us in a consultation and we will tell you what we know, and what only the lender can answer.</p>');
        if (k.motion) k.ctx.add(function () { gsap.from(cards.querySelectorAll('.is-named'), { y: -8, duration: .3, ease: 'back.out(2)' }); });
      }
      W.forEach(function (b, i) {
        k.on(b, 'click', function () { pick(b.dataset.w); });
        k.on(b, 'keydown', function (e) { var m = /Arrow(Right|Down)/.test(e.key) ? i + 1 : /Arrow(Left|Up)/.test(e.key) ? i - 1 : null; if (m === null) return; e.preventDefault(); pick(W[(m + W.length) % W.length].dataset.w, true); });
      });
      if (EZ.bindReactions) EZ.bindReactions(seg, k);
      pick('roof');
      k.add(function () { seg.innerHTML = ''; cards.innerHTML = ''; });
      EZ.reveal(k, root.querySelectorAll('.rp3r__head > *'));
    } },

    /* b4 · release record of slot 4 */
    b4: { init: function (root, k) {
      var svg = root.querySelector('.rp4r__rule'), input = root.querySelector('.rp4r__range input'), ow = root.querySelector('.rp4r__w'), os = root.querySelector('.rp4r__s');
      var bars, cur;
      function draw() {
        var W = Math.max(320, Math.round(svg.clientWidth) || 1000), X = function (w) { return 40 + (w - 1) * ((W - 80) / 11); }, s = '<path class="ax" d="M40 120 H' + (W - 40) + '"/>';
        svg.setAttribute('viewBox', '0 0 ' + W + ' 150');
        for (var w = 1; w <= 12; w++) s += '<path class="tk" d="M' + X(w) + ' 112 V128"/><text class="wk" x="' + X(w) + '" y="146">' + w + '</text>';
        s += '<path class="cur" d="M40 6 V120"/>';
        STAGES.forEach(function (st, i) { s += '<rect class="bar" data-i="' + i + '" x="' + (X(st[1]) - 12) + '" y="' + (14 + i * 24) + '" width="' + (X(st[2]) - X(st[1]) + 24) + '" height="18" rx="3"/><text class="bl" x="' + (X(st[1]) - 6) + '" y="' + (27 + i * 24) + '">' + st[0] + '</text>'; });
        svg.innerHTML = s;
        bars = Array.prototype.slice.call(svg.querySelectorAll('.bar')); cur = svg.querySelector('.cur'); draw.X = X;
      }
      draw();
      function set(wk) {
        var on = STAGES.filter(function (st) { return wk >= st[1] && wk <= st[2]; });
        bars.forEach(function (b) { var st = STAGES[+b.dataset.i]; b.classList.toggle('is-on', wk >= st[1] && wk <= st[2]); });
        cur.setAttribute('d', 'M' + draw.X(wk) + ' 6 V120');
        ow.textContent = 'Week ' + wk;
        os.innerHTML = on.map(function (st) { return '<p><b>' + esc(st[0]) + '</b> (weeks ' + st[1] + (st[2] !== st[1] ? '–' + st[2] : '') + ') ' + esc(st[3]) + '</p>'; }).join('');
        input.setAttribute('aria-valuetext', 'Week ' + wk + ': ' + on.map(function (st) { return st[0]; }).join(' and '));
      }
      k.on(input, 'input', function () { set(+input.value); });
      set(1);
      var lastW = svg.clientWidth; k.ro(svg, function () { if (Math.abs(svg.clientWidth - lastW) < 4) return; lastW = svg.clientWidth; draw(); set(+input.value); });
      k.add(function () { svg.innerHTML = ''; input.value = 1; });
      EZ.reveal(k, root.querySelectorAll('.rp3__head > *'));
      if (k.motion) gsap.from(bars, { scaleX: 0, transformOrigin: '0% 50%', duration: .5, stagger: .12, ease: 'power3.out', scrollTrigger: { trigger: svg, start: 'top 85%', once: true } });
    } },

    /* b5 · release record of slot 5 */
    b5: { init: function (root, k) {
      EZ.reveal(k, root.querySelectorAll('.rp5r__copy > .eyebrow, .rp5r__copy > h2, .rp5r__q'));
      if (k.motion) gsap.from(root.querySelectorAll('.rp5r__stamp circle, .rp5r__stamp path'), { drawSVG: '0%', duration: .7, stagger: .15, ease: 'power2.inOut', scrollTrigger: { trigger: root.querySelector('.rp5r__stamp'), start: 'top 85%', once: true } });
    } }
  });
})();
