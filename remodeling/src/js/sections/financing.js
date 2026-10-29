/* financing [PLAN-V2 2.5] — every figure is the firm's /financing/ page wording, attributed to the lender */
(function () {
  var R = {
    syn: { f: '6–132', n: 'Synchrony Project Card', d: 'months of special financing, as Synchrony publishes it' },
    sfc: { f: '30', n: 'Service Finance', d: 'days after completion until the first payment' },
    ygr: { f: '20', n: 'Ygrene, Florida PACE', d: 'year maximum published residential term' },
    rnw: { f: '$250K', n: 'Renew Financial, RenewPACE', d: 'published maximum, up to 20% of property value' }
  };
  var PICK = {
    kitchen: { for: 'For a kitchen', r: ['syn'],
      why: 'A card rather than a one-off loan, so it stays open: useful if a kitchen now is likely to be followed by a bathroom or a flooring run later. A kitchen remodel is generally not a PACE improvement.' },
    bath: { for: 'For a bathroom', r: ['syn', 'sfc'],
      why: 'Service Finance is built around a defined, single-trade scope where the number does not move once it is set, such as plumbing or flooring.' },
    shell: { for: 'For a roof, windows or doors', r: ['sfc', 'ygr', 'rnw'],
      why: 'PACE is an assessment repaid through your property tax bill, not a loan, and it changes what happens when you sell or refinance.' },
    whole: { for: 'For a whole home', r: ['syn'],
      why: 'Two partners are consumer credit and two are property-assessed, so more than one kind of answer is possible. Explore it before the scope is locked.' }
  };

  EZ.section('financing', {
    /* v1 · the sheets */
    1: { init: function (root, k) {
      EZ.reveal(k, root.querySelectorAll('.financing__head > *'));
      EZ.reveal(k, root.querySelectorAll('.financing1__item'));
    } },

    /* v2 · the picker */
    2: { init: function (root, k) {
      var chips = Array.prototype.slice.call(root.querySelectorAll('.financing2__chip'));
      var forEl = root.querySelector('.financing2__for'), routes = root.querySelector('.financing2__routes'), why = root.querySelector('.financing2__why');
      function render(key, animate) {
        var p = PICK[key];
        chips.forEach(function (c) { var on = c.dataset.k === key; c.setAttribute('aria-checked', on ? 'true' : 'false'); c.tabIndex = on ? 0 : -1; });
        forEl.textContent = p.for;
        routes.innerHTML = p.r.map(function (id) {
          var r = R[id];
          return '<div class="financing2__route"><span class="financing2__rf nums">' + r.f + '</span><span class="financing2__rn">' + r.n + '</span><span class="financing2__rd">' + r.d + '</span></div>';
        }).join('');
        why.textContent = p.why;
        if (animate && k.motion) {
          k.ctx.add(function () {
            gsap.from(routes.children, { y: 18, autoAlpha: 0, duration: .45, stagger: .07, ease: 'power3.out' });
            gsap.from(why, { autoAlpha: 0, duration: .45, delay: .1, ease: 'power2.out' });
          });
        }
      }
      chips.forEach(function (c, i) {
        k.on(c, 'click', function () { render(c.dataset.k, true); });
        k.on(c, 'keydown', function (e) {
          var d = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0;
          if (!d) return;
          e.preventDefault(); e.stopPropagation();
          var n = chips[(i + d + chips.length) % chips.length];
          render(n.dataset.k, true); n.focus();
        });
      });
      render('kitchen', false);
      EZ.reveal(k, root.querySelectorAll('.financing2__ask > .t-label, .financing2__ask > .t-head'));
    } },

    /* v3 · the read (S1327) */
    3: { init: function (root, k) {
      EZ.reveal(k, root.querySelectorAll('.financing3__in > .t-label, .financing3__h'));
      if (!k.motion) return;
      var passage = root.querySelector('.financing3__passage'), original = passage.innerHTML;
      // walk text nodes (never flatten): wrap each non-whitespace token, keep whitespace and inline emphasis as they are
      var walker = document.createTreeWalker(passage, NodeFilter.SHOW_TEXT), nodes = [], n;
      while ((n = walker.nextNode())) nodes.push(n);
      nodes.forEach(function (t) {
        var frag = document.createDocumentFragment();
        t.nodeValue.split(/(\s+)/).forEach(function (tok) {
          if (!tok) return;
          if (/^\s+$/.test(tok)) { frag.appendChild(document.createTextNode(tok)); return; }
          var s = document.createElement('span'); s.className = 'w'; s.textContent = tok; frag.appendChild(s);
        });
        t.parentNode.replaceChild(frag, t);
      });
      // punctuation that follows an emphasised word stays glued to it (no line break between them)
      passage.querySelectorAll('.w').forEach(function (w) {
        var prev = w.previousSibling;
        if (/^[,.;:!?]+$/.test(w.textContent) && prev && prev.nodeType === 1 && prev.tagName !== 'SPAN') {
          var glue = document.createElement('span'); glue.style.whiteSpace = 'nowrap';
          prev.parentNode.insertBefore(glue, prev); glue.appendChild(prev); glue.appendChild(w);
        }
      });
      k.add(function () { passage.innerHTML = original; });
      var words = Array.prototype.slice.call(passage.querySelectorAll('.w')), N = words.length;
      var HIDE = .18, BLUR = 6, DROP = .14, OVER = .25;      // opacity .12-.3, blur 4-10px, .08-.22em, 10-30% overlap
      function paint(reveal) {
        var t = reveal * (N - 1 + 1 + OVER);
        for (var i = 0; i < N; i++) {
          var l = Math.min(1, Math.max(0, (t - i) / (1 + OVER)));
          var s = words[i].style;
          s.opacity = (HIDE + (1 - HIDE) * l).toFixed(3);
          s.filter = l >= 1 ? '' : 'blur(' + (BLUR * (1 - l)).toFixed(2) + 'px)';
          s.transform = l >= 1 ? '' : 'translateY(' + (DROP * (1 - l)).toFixed(3) + 'em)';
        }
      }
      paint(0);
      ScrollTrigger.create({
        trigger: passage, start: 'top 85%',
        end: function () { return '+=' + Math.round(innerHeight * 1.6); },   // span 160% of the viewport; no easing in the mapping
        invalidateOnRefresh: true,
        onUpdate: function (self) { paint(self.progress); }
      });
    } }
  });
})();
