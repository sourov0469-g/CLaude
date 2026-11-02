/* FINALIZE · Home 6 · Financing.
   V1 · the route finder: pick what you are building; the clay road draws from your house through the fork to the partners
   that usually fit (stroke on a path, power2.inOut, the eye follows it [S0362]); a road that no longer fits retracts back
   toward the house (power4.in, quick) before the new one draws; each signpost lights as the road reaches it, and the
   partner's published figure lands on its card as an event. The routing is the firm's own framing (FACTS.md "Financing":
   interior finish work -> consumer credit; Ygrene's Florida categories and Service Finance's typical projects for the
   outside and energy work; "a kitchen remodel is generally not one of them").
   V2 · two kinds of money: the scroll writes an open ledger line by line on both pages at once (the rule draws, then the
   words), each published figure lands like a stamp; scrubbed and reversible [S1326]. Real tables underneath. */
(function () {
  var ROUTES = {
    kitchen: ['syn', 'sfc'], bath: ['syn', 'sfc'], floor: ['syn', 'sfc'],
    roof: ['sfc', 'ygr', 'rnw'], hvac: ['sfc', 'ygr', 'rnw'], unsure: ['syn', 'sfc', 'ygr', 'rnw']
  };
  var NAMES = { syn: 'Synchrony', sfc: 'Service Finance', ygr: 'Ygrene', rnw: 'RenewPACE' };
  var WHY = {
    kitchen: 'Interior finish work, so consumer credit is the usual route. PACE covers specific improvements; a kitchen remodel is generally not one of them.',
    bath: 'Interior finish work, so consumer credit is the usual route. Synchrony’s card is “useful if a kitchen now is likely to be followed by a bathroom or a flooring run later.”',
    floor: 'Consumer credit: Synchrony’s reusable card, or a Service Finance fixed installment loan. Flooring is on the list of typical Elbaz projects that Service Finance fits.',
    roof: 'Roofing, and windows and doors, are among Ygrene’s Florida PACE categories, repaid with property taxes. Roof replacement and impact windows and doors are typical Service Finance projects too.',
    hvac: 'HVAC, and wind-resistance and storm protection, are among Ygrene’s Florida PACE categories. HVAC is a typical Service Finance project as well.',
    unsure: 'Four financing partners, not one. Two are consumer credit and two are property-assessed, so more than one kind of answer is possible.'
  };
  function list(a) { return a.length < 2 ? a.join('') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1]; }

  EZ.section('financing', {
    1: { init: function (root, k) {
      var routes = {}, posts = {}, cards = {};
      root.querySelectorAll('.rf__route').forEach(function (r) { routes[r.dataset.p] = r; });
      root.querySelectorAll('.rf__post').forEach(function (p) { posts[p.dataset.p] = p; });
      root.querySelectorAll('.rf__c').forEach(function (c) { cards[c.dataset.p] = c; });
      var why = root.querySelector('.rf__why'), on = {};
      var map = root.querySelector('.rf__map');
      var edges = map.querySelectorAll('.rf__edge, .rf__pole, .rf__hw, .rf__hr, .rf__hd, .rf__lot');
      var marks = map.querySelectorAll('.rf__mid, .rf__spur, .rf__board, .rf__bt, .rf__lotn, .rf__ht');
      Object.keys(routes).forEach(function (p) { gsap.set(routes[p], { drawSVG: '0% 0%', opacity: 0 }); });

      if (k.motion) {
        // the plan draws itself as it arrives: lots and roads first, then the dashes, boards and words
        gsap.set(edges, { drawSVG: '0%' }); gsap.set(marks, { opacity: 0 });
        var intro = gsap.timeline({ paused: true })
          .to(edges, { drawSVG: '100%', duration: .8, ease: 'power2.inOut', stagger: { amount: .4 } })
          .to(marks, { opacity: 1, duration: .4, ease: 'power2.out', stagger: { amount: .25 } }, '-=.35');
        var st = ScrollTrigger.create({ trigger: map, start: 'top 80%', once: true, onEnter: function () { intro.play(); } });
        k.add(function () { st.kill(); intro.kill(); });
      }

      function choose(kind) {
        var fits = ROUTES[kind] || [];
        why.textContent = WHY[kind] + ' Usually fits: ' + list(fits.map(function (p) { return NAMES[p]; })) + '.';
        Object.keys(routes).forEach(function (p) {
          var r = routes[p], fit = fits.indexOf(p) > -1, was = !!on[p];
          on[p] = fit;
          cards[p].classList.toggle('is-fit', fit);
          cards[p].classList.toggle('is-not', !fit);
          cards[p].querySelector('.rf__fit').textContent = fit ? 'Usually fits this project.' : 'Not the usual route for this project.';
          if (!k.motion) { gsap.set(r, { drawSVG: fit ? '0% 100%' : '0% 0%', opacity: fit ? 1 : 0 }); posts[p].classList.toggle('is-fit', fit); return; }
          if (fit && !was) {
            posts[p].classList.remove('is-fit');
            gsap.timeline({ overwrite: true })
              .set(r, { opacity: 1 })
              .fromTo(r, { drawSVG: '0% 0%' }, { drawSVG: '0% 100%', duration: .9, ease: 'power2.inOut' }, .18)
              .add(function () { posts[p].classList.add('is-fit'); }, .9)
              .fromTo(cards[p].querySelector('.rf__n'), { y: -12, opacity: 0 }, { y: 0, opacity: 1, duration: .4, ease: 'power4.out' }, .95);
          } else if (!fit && was) {
            posts[p].classList.remove('is-fit');
            gsap.timeline({ overwrite: true })
              .to(r, { drawSVG: '0% 0%', duration: .3, ease: 'power4.in' })
              .set(r, { opacity: 0 });
          }
        });
      }
      root.querySelectorAll('.rf__o input').forEach(function (inp) {
        k.on(inp, 'change', function () { if (inp.checked) choose(inp.value); });
      });
      k.add(function () { root.querySelectorAll('.rf__o input').forEach(function (i) { i.checked = false; }); });
    } },

    2: { init: function (root, k) {
      var tables = Array.prototype.slice.call(root.querySelectorAll('.km__t'));
      // the column under the hand is the one being read: its cells take the clay wash
      tables.forEach(function (t) {
        function mark(ix) { t.querySelectorAll('th, td').forEach(function (c) { c.classList.toggle('is-col', ix > 0 && c.cellIndex === ix); }); }
        k.on(t, 'pointerover', function (e) { var c = e.target.closest('th, td'); if (c) mark(c.cellIndex); });
        k.on(t, 'pointerleave', function () { mark(-1); });
      });
      // a ledger spread: line i on the left page sits level with line i on the right (only while the pages are side by side)
      var lRows = tables[0].querySelectorAll('.km__r, thead tr'), rRows = tables[1].querySelectorAll('.km__r, thead tr');
      function level() {
        var side = tables[0].getBoundingClientRect().top === tables[1].getBoundingClientRect().top;
        for (var n = 0; n < lRows.length; n++) { lRows[n].style.height = rRows[n].style.height = ''; }
        if (!side) return;
        for (var m = 0; m < lRows.length; m++) { var hh = Math.max(lRows[m].offsetHeight, rRows[m].offsetHeight) + 'px'; lRows[m].style.height = rRows[m].style.height = hh; }
      }
      level(); k.ro(root.querySelector('.km__book'), level);
      k.add(function () { for (var n = 0; n < lRows.length; n++) { lRows[n].style.height = rRows[n].style.height = ''; } });
      if (!k.motion) return;
      var rowsL = tables[0].querySelectorAll('.km__r'), rowsR = tables[1].querySelectorAll('.km__r');
      var all = root.querySelectorAll('.km__r th, .km__r td');
      gsap.set(all, { '--rule': 0 });
      gsap.set(root.querySelectorAll('.km__r th > *, .km__r td'), { opacity: 0, y: 8 });
      gsap.set(root.querySelectorAll('.km__r th'), { opacity: 0 });
      var tl = gsap.timeline({ defaults: { ease: 'none' } });
      for (var i = 0; i < rowsL.length; i++) {
        var pair = [rowsL[i], rowsR[i]], cells = [], heads = [];
        pair.forEach(function (r) { cells = cells.concat(Array.prototype.slice.call(r.querySelectorAll('td'))); heads.push(r.querySelector('th')); });
        tl.to(pair.map(function (r) { return r.querySelectorAll('th, td'); }).reduce(function (a, n) { return a.concat(Array.prototype.slice.call(n)); }, []), { '--rule': 1, duration: .5 }, i)
          .to(heads, { opacity: 1, duration: .25 }, i + .15)
          .to(cells, { opacity: 1, y: 0, duration: .35, stagger: .06 }, i + .3);
        var nums = [];
        pair.forEach(function (r) { nums = nums.concat(Array.prototype.slice.call(r.querySelectorAll('.km__n'))); });
        if (nums.length) tl.fromTo(nums, { scale: 1.35, opacity: 0, transformOrigin: '0% 100%' }, { scale: 1, opacity: 1, duration: .15, ease: 'power4.in', stagger: .08 }, i + .45);
      }
      var st = ScrollTrigger.create({ trigger: root.querySelector('.km__book'), start: 'top 72%', end: 'bottom 96%', scrub: .6, animation: tl });
      k.add(function () { st.kill(); tl.kill(); gsap.set(root.querySelectorAll('.km__r th, .km__r td, .km__r th > *, .km__n'), { clearProps: 'all' }); });
    } }
  });
})();
