/* Renovation page, section 2 · reno-services. One table of the firm's published services beyond kitchens and bathrooms.
   'd' holds only what the firm publishes about that service (FACTS.md: Services, FAQ code context, /financing/); a service
   published by name only has no 'd'. Drawings are this build's own line art. */
(function () {
  var NOA = 'Miami-Dade and Broward sit inside Florida’s High-Velocity Hurricane Zone, where products need a valid Miami-Dade Notice of Acceptance; Palm Beach is outside it but under Wind-Borne Debris Region rules.';
  var S = [
    { k: 'whole', n: 'Whole-Home Renovation', i: 'M8 56 V26 L32 8 L56 26 V56 Z M8 40 H56 M28 26 V56', img: ['w-farmhouse', 'Modern Farmhouse Whole-Home Renovation'],
      d: ['Opening up plans, moving structure, and re-sequencing a house so it works the way you live now.', 'A whole-home renovation runs several months of construction.'] },
    { k: 'adu', n: 'ADUs & Additions', i: 'M4 56 V30 L22 16 L40 30 V56 Z M44 56 V40 L52 34 L60 40 V56 Z M16 56 V44 H28 V56' },
    { k: 'new', n: 'New Construction', i: 'M10 56 V24 L32 10 L54 24 V56 M18 56 V30 M26 56 V30 M38 56 V30 M46 56 V30 M10 40 H54' },
    { k: 'comm', n: 'Commercial Remodeling', i: 'M8 56 V22 H56 V56 Z M8 22 L14 12 H50 L56 22 M16 56 V36 H30 V56 M36 36 H50 V48 H36 Z' },
    { k: 'floor', n: 'Flooring', i: 'M6 20 H58 M6 32 H58 M6 44 H58 M6 56 H58 M20 20 V32 M42 32 V44 M28 44 V56 M50 20 V32 M12 44 V56 M30 32 V20',
      d: ['Flooring is among the typical Elbaz projects our financing page lists for Service Finance Company’s fixed installment loan.'] },
    { k: 'roof', n: 'Roofing', i: 'M4 40 L32 14 L60 40 M12 33 H52 M18 27 H46 M24 21 H40 M10 40 V56 H54 V40',
      d: [NOA, 'Roof replacement is among the typical Elbaz projects our financing page lists for Service Finance Company; roofing is among Ygrene’s published Florida PACE categories.'] },
    { k: 'win', n: 'Windows & Doors', i: 'M8 12 H32 V40 H8 Z M20 12 V40 M8 26 H32 M40 20 H58 V56 H40 Z M53 38 V40',
      d: [NOA, 'Impact windows and doors are among the typical Elbaz projects our financing page lists for Service Finance Company; windows and doors are among Ygrene’s published Florida PACE categories.'] },
    { k: 'out', n: 'Outdoor Living', i: 'M6 22 H58 M10 22 V56 M54 22 V56 M14 16 V22 M24 16 V22 M34 16 V22 M44 16 V22 M50 16 V22 M18 56 V44 H46 V56', img: ['o-pergola-hero', 'Waterfront Backyard & Outdoor Living Transformation'],
      d: ['Outdoor Kitchen Construction is one of our published kitchen services.', 'One of our four before/after pairs is a backyard: a worn lawn and open patio turned into a covered pergola with dining and bar seating, and a turfed yard.'] },
    { k: 'permit', n: 'Planning & Permitting', i: 'M14 6 H42 L52 16 V58 H14 Z M42 6 V16 H52 M20 26 H46 M20 34 H46 M20 42 H34 M44 48 m-8 0 a8 8 0 1 0 16 0 a8 8 0 1 0 -16 0',
      d: ['We pull the permits in our own name, verify every product against its Notice of Acceptance before it is ordered, and keep one person accountable from the first walkthrough to final inspection.'] }
  ];
  var NAMEONLY = 'Published as one of our services. Tell us about the project in a consultation.';
  var PAIR = { b: 'ba-outdoor-before', a: 'ba-outdoor-after', bt: 'Backyard with worn lawn and open patio, before renovation', at: 'Covered outdoor pergola with dining and bar seating, and a turfed backyard', w: 562, h: 468 };
  function esc(t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }
  function ico(s, cls) { return '<svg class="' + cls + '" viewBox="0 0 64 64" aria-hidden="true" focusable="false"><path d="' + s.i + '"/></svg>'; }
  function body(s) { return (s.d || [NAMEONLY]).map(function (t) { return '<p>' + esc(t) + '</p>'; }).join(''); }

  EZ.section('reno-services', {
    /* v1 · The card grid: the drawings ink in as the grid arrives */
    1: { init: function (root, k) {
      var g = root.querySelector('.rs1__grid');
      g.innerHTML = S.map(function (s) { return '<li class="rs1__c' + (s.d ? '' : ' rs1__c--name') + '">' + ico(s, 'rs1__i') + '<h3>' + esc(s.n) + '</h3>' + body(s) + '</li>'; }).join('');
      k.add(function () { g.innerHTML = ''; });
      EZ.reveal(k, root.querySelectorAll('.rs__head > *'));
      if (k.motion) gsap.timeline({ scrollTrigger: { trigger: g, start: 'top 85%', once: true } })
        .from(g.children, { y: 20, autoAlpha: 0, duration: .3, stagger: .05, ease: 'power2.out' })
        .from(g.querySelectorAll('.rs1__i path'), { drawSVG: '0%', duration: .7, stagger: .05, ease: 'power2.inOut' }, .1);
    } },

    /* v2 · The elevation: hotspots sit on the drawing (a group of toggle buttons); the panel shows the chosen service */
    2: { init: function (root, k) {
      var dots = root.querySelector('.rs2__dots'), also = root.querySelector('.rs2__also'), n = root.querySelector('.rs2__n'), d = root.querySelector('.rs2__d'), ip = root.querySelector('.rs2__ico path');
      var POS = { whole: [43.9, 32.9], roof: [25.8, 40], win: [32.6, 63.2], floor: [56.1, 90.8], add: [75, 85.5], out: [12.9, 76.3], permit: [93.9, 71] };
      var ON = S.filter(function (s) { return POS[s.k === 'adu' ? 'add' : s.k]; });
      dots.innerHTML = ON.map(function (s, i) { var p = POS[s.k === 'adu' ? 'add' : s.k]; return '<button type="button" class="rs2__dot" style="left:' + p[0] + '%;top:' + p[1] + '%" aria-pressed="false" data-i="' + S.indexOf(s) + '" data-rx="native:rs2-hotspot"><span class="nums">' + (i + 1) + '</span><span class="rs2__dl">' + esc(s.n) + '</span></button>'; }).join('');
      also.innerHTML = S.filter(function (s) { return ON.indexOf(s) < 0; }).map(function (s) { return '<li>' + ico(s, 'rs2__ai') + '<span>' + esc(s.n) + '</span></li>'; }).join('');
      var B = Array.prototype.slice.call(dots.children);
      function pick(b) {
        B.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        var s = S[+b.dataset.i]; n.textContent = s.n; d.innerHTML = body(s); ip.setAttribute('d', s.i);
        if (k.motion) k.ctx.add(function () { gsap.fromTo(ip, { drawSVG: '0%' }, { drawSVG: '100%', duration: .5, ease: 'power2.inOut' }); });
      }
      B.forEach(function (b) { k.on(b, 'click', function () { pick(b); }); });
      if (EZ.bindReactions) EZ.bindReactions(dots, k);
      pick(B[0]);
      k.add(function () { dots.innerHTML = ''; also.innerHTML = ''; ip.removeAttribute('d'); n.textContent = ''; d.innerHTML = ''; });
      EZ.reveal(k, root.querySelectorAll('.rs2__copy > .eyebrow, .rs2__copy > h2'));
      if (k.motion) gsap.from(root.querySelectorAll('.rs2__house path, .rs2__house rect'), { drawSVG: '0%', duration: .8, stagger: .03, ease: 'power2.inOut', scrollTrigger: { trigger: root.querySelector('.rs2__stage'), start: 'top 80%', once: true } });
    } },

    /* v3 · Tabs down the side (arrow keys up/down, Home, End); the panel shows the drawing, the text, and a photo where one exists */
    3: { init: function (root, k) {
      var tabs = root.querySelector('.rs3__tabs'), panel = root.querySelector('.rs3__panel');
      tabs.innerHTML = S.map(function (s, i) { return '<button type="button" role="tab" class="rs3__tab" id="rs3-t' + i + '" aria-controls="rs3-panel" aria-selected="false" tabindex="-1" data-i="' + i + '" data-rx="native:rs3-tab">' + ico(s, 'rs3__ti') + '<span>' + esc(s.n) + '</span></button>'; }).join('');
      var T = Array.prototype.slice.call(tabs.children);
      function pick(i, focus) {
        T.forEach(function (t, j) { t.setAttribute('aria-selected', i === j ? 'true' : 'false'); t.tabIndex = i === j ? 0 : -1; });
        panel.setAttribute('aria-labelledby', 'rs3-t' + i);
        var s = S[i];
        panel.innerHTML = '<div class="rs3__pt">' + ico(s, 'rs3__pi') + '<h3>' + esc(s.n) + '</h3></div>' + body(s) + (s.img ? '<figure class="rs3__ph"><img src="' + EZ.img(s.img[0]) + '" alt="' + esc(s.img[1]) + ', an Elbaz project"><figcaption>' + esc(s.img[1]) + '</figcaption></figure>' : '');
        if (focus) T[i].focus();
        if (k.motion) k.ctx.add(function () { gsap.from(panel.children, { y: 12, autoAlpha: 0, duration: .25, stagger: .05 }); gsap.from(panel.querySelector('.rs3__pi path'), { drawSVG: '0%', duration: .5 }); });
      }
      T.forEach(function (t, i) {
        k.on(t, 'click', function () { pick(i); });
        k.on(t, 'keydown', function (e) { var m = e.key === 'ArrowDown' ? i + 1 : e.key === 'ArrowUp' ? i - 1 : e.key === 'Home' ? 0 : e.key === 'End' ? T.length - 1 : null; if (m === null) return; e.preventDefault(); pick((m + T.length) % T.length, true); });
      });
      if (EZ.bindReactions) EZ.bindReactions(tabs, k);
      pick(0);
      k.add(function () { tabs.innerHTML = ''; panel.innerHTML = ''; });
      EZ.reveal(k, root.querySelectorAll('.rs__head > *'));
    } },

    /* v4 · The index: each row is a disclosure; more than one can be open */
    4: { init: function (root, k) {
      var rows = root.querySelector('.rs4__rows');
      rows.innerHTML = S.map(function (s, i) {
        return '<div class="rs4__r"><h3 class="rs4__h"><button type="button" class="rs4__b" aria-expanded="false" aria-controls="rs4-b' + i + '" data-rx="native:rs4-row"><span class="rs4__n nums">' + (i < 9 ? '0' : '') + (i + 1) + '</span><span class="rs4__t">' + esc(s.n) + '</span><span class="rs4__pm" aria-hidden="true"></span></button></h3>' +
          '<div class="rs4__body" id="rs4-b' + i + '" hidden>' + ico(s, 'rs4__i') + '<div>' + body(s) + '</div></div></div>';
      }).join('');
      var B = Array.prototype.slice.call(rows.querySelectorAll('.rs4__b'));
      B.forEach(function (b) {
        k.on(b, 'click', function () {
          var on = b.getAttribute('aria-expanded') !== 'true', bd = root.querySelector('#' + b.getAttribute('aria-controls'));
          b.setAttribute('aria-expanded', on ? 'true' : 'false'); bd.hidden = !on;
          if (on && k.motion) k.ctx.add(function () { gsap.from(bd, { height: 0, autoAlpha: 0, duration: .3, ease: 'power2.out', clearProps: 'all' }); gsap.from(bd.querySelector('path'), { drawSVG: '0%', duration: .6 }); });
        });
      });
      if (EZ.bindReactions) EZ.bindReactions(rows, k);
      k.add(function () { rows.innerHTML = ''; });
      EZ.reveal(k, root.querySelectorAll('.rs__head > *'));
      if (k.motion) gsap.from(rows.children, { x: -20, autoAlpha: 0, duration: .3, stagger: .04, scrollTrigger: { trigger: rows, start: 'top 85%', once: true } });
    } },

    /* v5 · Outdoor first: a before/after drag slider on the outdoor pair (shown no larger than ~1.4x its published size); the rest run below */
    5: { init: function (root, k) {
      var ba = root.querySelector('.rs5__ba'), run = root.querySelector('.rs5__run');
      ba.innerHTML = '<div class="rba" style="aspect-ratio:' + PAIR.w + ' / ' + PAIR.h + ';max-width:' + Math.round(PAIR.w * 1.4) + 'px"><img class="rba__a" src="' + EZ.img(PAIR.a) + '" alt="' + esc(PAIR.at) + '"><img class="rba__b" src="' + EZ.img(PAIR.b) + '" alt="' + esc(PAIR.bt) + '"><span class="rba__h" aria-hidden="true"></span><span class="rba__tag rba__tag--b" aria-hidden="true">Before</span><span class="rba__tag rba__tag--a" aria-hidden="true">After</span>' +
        '<input class="rba__r" type="range" min="0" max="100" value="50" aria-label="Before and after: ' + esc(PAIR.at) + '. Higher shows more of the before" data-rx="native:rba-range"></div>';
      var box = ba.querySelector('.rba'), r = ba.querySelector('.rba__r');
      function set() { box.style.setProperty('--x', r.value + '%'); r.setAttribute('aria-valuetext', r.value + '% before'); }
      k.on(r, 'input', set); set();
      run.innerHTML = S.filter(function (s) { return s.k !== 'out'; }).map(function (s) { return '<li>' + ico(s, 'rs5__i') + '<div><h4>' + esc(s.n) + '</h4>' + body(s) + '</div></li>'; }).join('');
      if (EZ.bindReactions) EZ.bindReactions(ba, k);
      k.add(function () { ba.innerHTML = ''; run.innerHTML = ''; });
      EZ.reveal(k, root.querySelectorAll('.rs__head > *, .rs5__h3'));
      if (k.motion) gsap.from(run.children, { y: 16, autoAlpha: 0, duration: .3, stagger: .05, scrollTrigger: { trigger: run, start: 'top 85%', once: true } });
    } },

    /* b1 · release record of slot 1 */
    b1: { init: function (root, k) {
      var g = root.querySelector('.rs1r__grid');
      g.innerHTML = S.map(function (s) { return '<li class="rs1r__c' + (s.d ? '' : ' rs1r__c--name') + '">' + ico(s, 'rs1r__i') + '<h3>' + esc(s.n) + '</h3>' + body(s) + '</li>'; }).join('');
      k.add(function () { g.innerHTML = ''; });
      EZ.reveal(k, root.querySelectorAll('.rs__head > *'));
      if (k.motion) gsap.timeline({ scrollTrigger: { trigger: g, start: 'top 85%', once: true } })
        .from(g.children, { y: 20, autoAlpha: 0, duration: .3, stagger: .05, ease: 'power2.out' })
        .from(g.querySelectorAll('.rs1r__i path'), { drawSVG: '0%', duration: .7, stagger: .05, ease: 'power2.inOut' }, .1);
    } },

    /* b2 · release record of slot 2 */
    b2: { init: function (root, k) {
      var dots = root.querySelector('.rs2r__dots'), also = root.querySelector('.rs2r__also'), n = root.querySelector('.rs2r__n'), d = root.querySelector('.rs2r__d'), ip = root.querySelector('.rs2r__ico path');
      var POS = { whole: [43.9, 32.9], roof: [25.8, 40], win: [32.6, 63.2], floor: [56.1, 90.8], add: [75, 85.5], out: [12.9, 76.3], permit: [93.9, 71] };
      var ON = S.filter(function (s) { return POS[s.k === 'adu' ? 'add' : s.k]; });
      dots.innerHTML = ON.map(function (s, i) { var p = POS[s.k === 'adu' ? 'add' : s.k]; return '<button type="button" class="rs2r__dot" style="left:' + p[0] + '%;top:' + p[1] + '%" aria-pressed="false" data-i="' + S.indexOf(s) + '" data-rx="native:rs2r-hotspot"><span class="nums">' + (i + 1) + '</span><span class="rs2r__dl">' + esc(s.n) + '</span></button>'; }).join('');
      also.innerHTML = S.filter(function (s) { return ON.indexOf(s) < 0; }).map(function (s) { return '<li>' + ico(s, 'rs2r__ai') + '<span>' + esc(s.n) + '</span></li>'; }).join('');
      var B = Array.prototype.slice.call(dots.children);
      function pick(b) {
        B.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        var s = S[+b.dataset.i]; n.textContent = s.n; d.innerHTML = body(s); ip.setAttribute('d', s.i);
        if (k.motion) k.ctx.add(function () { gsap.fromTo(ip, { drawSVG: '0%' }, { drawSVG: '100%', duration: .5, ease: 'power2.inOut' }); });
      }
      B.forEach(function (b) { k.on(b, 'click', function () { pick(b); }); });
      if (EZ.bindReactions) EZ.bindReactions(dots, k);
      pick(B[0]);
      k.add(function () { dots.innerHTML = ''; also.innerHTML = ''; ip.removeAttribute('d'); n.textContent = ''; d.innerHTML = ''; });
      EZ.reveal(k, root.querySelectorAll('.rs2r__copy > .eyebrow, .rs2r__copy > h2'));
      if (k.motion) gsap.from(root.querySelectorAll('.rs2r__house path, .rs2r__house rect'), { drawSVG: '0%', duration: .8, stagger: .03, ease: 'power2.inOut', scrollTrigger: { trigger: root.querySelector('.rs2r__stage'), start: 'top 80%', once: true } });
    } },

    /* b3 · release record of slot 3 */
    b3: { init: function (root, k) {
      var tabs = root.querySelector('.rs3r__tabs'), panel = root.querySelector('.rs3r__panel');
      tabs.innerHTML = S.map(function (s, i) { return '<button type="button" role="tab" class="rs3r__tab" id="rs3r-t' + i + '" aria-controls="rs3r-panel" aria-selected="false" tabindex="-1" data-i="' + i + '" data-rx="native:rs3r-tab">' + ico(s, 'rs3r__ti') + '<span>' + esc(s.n) + '</span></button>'; }).join('');
      var T = Array.prototype.slice.call(tabs.children);
      function pick(i, focus) {
        T.forEach(function (t, j) { t.setAttribute('aria-selected', i === j ? 'true' : 'false'); t.tabIndex = i === j ? 0 : -1; });
        panel.setAttribute('aria-labelledby', 'rs3r-t' + i);
        var s = S[i];
        panel.innerHTML = '<div class="rs3r__pt">' + ico(s, 'rs3r__pi') + '<h3>' + esc(s.n) + '</h3></div>' + body(s) + (s.img ? '<figure class="rs3r__ph"><img src="' + EZ.img(s.img[0]) + '" alt="' + esc(s.img[1]) + ', an Elbaz project"><figcaption>' + esc(s.img[1]) + '</figcaption></figure>' : '');
        if (focus) T[i].focus();
        if (k.motion) k.ctx.add(function () { gsap.from(panel.children, { y: 12, autoAlpha: 0, duration: .25, stagger: .05 }); gsap.from(panel.querySelector('.rs3r__pi path'), { drawSVG: '0%', duration: .5 }); });
      }
      T.forEach(function (t, i) {
        k.on(t, 'click', function () { pick(i); });
        k.on(t, 'keydown', function (e) { var m = e.key === 'ArrowDown' ? i + 1 : e.key === 'ArrowUp' ? i - 1 : e.key === 'Home' ? 0 : e.key === 'End' ? T.length - 1 : null; if (m === null) return; e.preventDefault(); pick((m + T.length) % T.length, true); });
      });
      if (EZ.bindReactions) EZ.bindReactions(tabs, k);
      pick(0);
      k.add(function () { tabs.innerHTML = ''; panel.innerHTML = ''; });
      EZ.reveal(k, root.querySelectorAll('.rs__head > *'));
    } },

    /* b4 · release record of slot 4 */
    b4: { init: function (root, k) {
      var rows = root.querySelector('.rs4r__rows');
      rows.innerHTML = S.map(function (s, i) {
        return '<div class="rs4r__r"><h3 class="rs4r__h"><button type="button" class="rs4r__b" aria-expanded="false" aria-controls="rs4r-b' + i + '" data-rx="native:rs4r-row"><span class="rs4r__n nums">' + (i < 9 ? '0' : '') + (i + 1) + '</span><span class="rs4r__t">' + esc(s.n) + '</span><span class="rs4r__pm" aria-hidden="true"></span></button></h3>' +
          '<div class="rs4r__body" id="rs4r-b' + i + '" hidden>' + ico(s, 'rs4r__i') + '<div>' + body(s) + '</div></div></div>';
      }).join('');
      var B = Array.prototype.slice.call(rows.querySelectorAll('.rs4r__b'));
      B.forEach(function (b) {
        k.on(b, 'click', function () {
          var on = b.getAttribute('aria-expanded') !== 'true', bd = root.querySelector('#' + b.getAttribute('aria-controls'));
          b.setAttribute('aria-expanded', on ? 'true' : 'false'); bd.hidden = !on;
          if (on && k.motion) k.ctx.add(function () { gsap.from(bd, { height: 0, autoAlpha: 0, duration: .3, ease: 'power2.out', clearProps: 'all' }); gsap.from(bd.querySelector('path'), { drawSVG: '0%', duration: .6 }); });
        });
      });
      if (EZ.bindReactions) EZ.bindReactions(rows, k);
      k.add(function () { rows.innerHTML = ''; });
      EZ.reveal(k, root.querySelectorAll('.rs__head > *'));
      if (k.motion) gsap.from(rows.children, { x: -20, autoAlpha: 0, duration: .3, stagger: .04, scrollTrigger: { trigger: rows, start: 'top 85%', once: true } });
    } },

    /* b5 · release record of slot 5 */
    b5: { init: function (root, k) {
      var ba = root.querySelector('.rs5r__ba'), run = root.querySelector('.rs5r__run');
      ba.innerHTML = '<div class="rba" style="aspect-ratio:' + PAIR.w + ' / ' + PAIR.h + ';max-width:' + Math.round(PAIR.w * 1.4) + 'px"><img class="rba__a" src="' + EZ.img(PAIR.a) + '" alt="' + esc(PAIR.at) + '"><img class="rba__b" src="' + EZ.img(PAIR.b) + '" alt="' + esc(PAIR.bt) + '"><span class="rba__h" aria-hidden="true"></span><span class="rba__tag rba__tag--b" aria-hidden="true">Before</span><span class="rba__tag rba__tag--a" aria-hidden="true">After</span>' +
        '<input class="rba__r" type="range" min="0" max="100" value="50" aria-label="Before and after: ' + esc(PAIR.at) + '. Higher shows more of the before" data-rx="native:rba-range"></div>';
      var box = ba.querySelector('.rba'), r = ba.querySelector('.rba__r');
      function set() { box.style.setProperty('--x', r.value + '%'); r.setAttribute('aria-valuetext', r.value + '% before'); }
      k.on(r, 'input', set); set();
      run.innerHTML = S.filter(function (s) { return s.k !== 'out'; }).map(function (s) { return '<li>' + ico(s, 'rs5r__i') + '<div><h4>' + esc(s.n) + '</h4>' + body(s) + '</div></li>'; }).join('');
      if (EZ.bindReactions) EZ.bindReactions(ba, k);
      k.add(function () { ba.innerHTML = ''; run.innerHTML = ''; });
      EZ.reveal(k, root.querySelectorAll('.rs__head > *, .rs5r__h3'));
      if (k.motion) gsap.from(run.children, { y: 16, autoAlpha: 0, duration: .3, stagger: .05, scrollTrigger: { trigger: run, start: 'top 85%', once: true } });
    } }
  });
})();
