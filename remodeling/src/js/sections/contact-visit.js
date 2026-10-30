/* Contact page, section 2 · contact-visit. Open or closed comes only from the published hours (Sun to Fri 7am to 7pm,
   Saturday closed), read in Miami time. */
(function () {
  var DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], LONG = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  function miami() {
    var o = {};
    try { new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false }).formatToParts(new Date()).forEach(function (p) { o[p.type] = p.value; }); } catch (e) { return null; }
    var d = DAYS.indexOf(o.weekday), h = +o.hour % 24, m = +o.minute;
    return { d: d, h: h, m: m, open: d !== 6 && h >= 7 && h < 19 };
  }
  function status(t) {
    if (!t) return 'Sun–Fri 7am–7pm · Saturday closed';
    if (t.open) return 'Open now, until 7pm Miami time.';
    if (t.d === 6) return 'Closed on Saturdays. We open again Sunday at 7am.';
    return 'Closed now. We open at 7am Miami time' + (t.d === 5 && t.h >= 19 ? ' on Sunday.' : '.');
  }

  EZ.section('contact-visit', {
    /* v1 · The business card: the button turns it; the hidden face is inert so the tab order follows what is seen */
    1: { init: function (root, k) {
      var btn = root.querySelector('.vs1__turn'), card = root.querySelector('.vs1__card'), front = root.querySelector('.vs1__front'), back = root.querySelector('.vs1__back');
      function set(over) {
        btn.setAttribute('aria-pressed', over ? 'true' : 'false');
        btn.querySelector('.btn__label').textContent = over ? 'Turn back to the front' : 'Turn the card over';
        front.inert = over; back.inert = !over;
        front.setAttribute('aria-hidden', over ? 'true' : 'false'); back.setAttribute('aria-hidden', over ? 'false' : 'true');
        if (k.motion) k.ctx.add(function () { gsap.to(card, { rotateY: over ? 180 : 0, duration: .7, ease: 'power3.inOut' }); });
        else card.classList.toggle('is-over', over);
      }
      k.on(btn, 'click', function () { set(btn.getAttribute('aria-pressed') !== 'true'); });
      set(false);
      k.add(function () { gsap.set(card, { clearProps: 'transform' }); card.classList.remove('is-over'); front.inert = false; back.inert = false; front.removeAttribute('aria-hidden'); back.removeAttribute('aria-hidden'); btn.setAttribute('aria-pressed', 'false'); btn.querySelector('.btn__label').textContent = 'Turn the card over'; });
      EZ.reveal(k, root.querySelectorAll('.vs1__copy > *'));
      if (k.motion) gsap.from(card, { rotate: -6, y: 40, opacity: 0, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 85%', once: true } });
    } },

    /* v2 · The week: bars from 7 to 19 on a 0 to 24 rule, Saturday empty; today outlined; the now line moves every minute */
    2: { init: function (root, k) {
      var wk = root.querySelector('.vs2__week'), now = root.querySelector('.vs2__now');
      wk.innerHTML = '<div class="vs2__ax" aria-hidden="true">' + [0, 6, 12, 18, 24].map(function (h) { return '<span style="left:' + (h / 24 * 100) + '%">' + (h === 0 || h === 24 ? '12am' : h === 12 ? '12pm' : h < 12 ? h + 'am' : (h - 12) + 'pm') + '</span>'; }).join('') + '</div>' +
        DAYS.map(function (d, i) { return '<div class="vs2__row" data-d="' + i + '"><span class="vs2__d">' + LONG[i] + '</span><span class="vs2__track">' + (i === 6 ? '<span class="vs2__closed">Closed</span>' : '<span class="vs2__bar"><span>7am&ndash;7pm</span></span>') + '<span class="vs2__line" hidden></span></span></div>'; }).join('');
      var rows = Array.prototype.slice.call(wk.querySelectorAll('.vs2__row'));
      function tick() {
        var t = miami(); now.textContent = status(t);
        rows.forEach(function (r, i) {
          var on = t && t.d === i, ln = r.querySelector('.vs2__line');
          r.classList.toggle('is-today', !!on); ln.hidden = !on;
          if (on) ln.style.left = ((t.h + t.m / 60) / 24 * 100) + '%';
        });
      }
      tick();
      var timer = setInterval(tick, 60000);
      k.add(function () { clearInterval(timer); wk.innerHTML = ''; now.textContent = ''; });
      EZ.reveal(k, root.querySelectorAll('.vs__head > *'));
      if (k.motion) gsap.from(wk.querySelectorAll('.vs2__bar'), { scaleX: 0, transformOrigin: '0% 50%', duration: .6, stagger: .07, ease: 'power3.out', scrollTrigger: { trigger: wk, start: 'top 80%', once: true } });
    } },

    /* v3 · The address label: the copy button writes the address to the clipboard and says whether that worked */
    3: { init: function (root, k) {
      var btn = root.querySelector('.vs3__cp'), st = root.querySelector('.vs3__st'), ADDR = '19 W Flagler St #310, Miami, FL 33130';
      function say(t) { st.textContent = t; }
      k.on(btn, 'click', function () {
        var ok = function () { say('Copied: ' + ADDR + '.'); }, no = function () { say('Copying is blocked here. The address is ' + ADDR + '.'); };
        try { if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(ADDR).then(ok, no); else no(); } catch (e) { no(); }
      });
      k.add(function () { st.textContent = ''; });
      EZ.reveal(k, root.querySelectorAll('.vs3__copy > *'));
      if (k.motion) gsap.from(root.querySelector('.vs3__label'), { rotate: 3, y: 30, opacity: 0, duration: .7, ease: 'back.out(1.4)', scrollTrigger: { trigger: root.querySelector('.vs3__label'), start: 'top 85%', once: true } });
    } },

    /* v4 · The channel board: rows slide in; the arrow travels on hover (CSS) */
    4: { init: function (root, k) {
      EZ.reveal(k, root.querySelectorAll('.vs__head > *'));
      if (k.motion) gsap.from(root.querySelectorAll('.vs4__rows li'), { x: -40, opacity: 0, duration: .5, stagger: .06, ease: 'power3.out', scrollTrigger: { trigger: root.querySelector('.vs4__rows'), start: 'top 85%', once: true } });
    } },

    /* v5 · The clock: twelve-hour dial; the published span 7 to 7 shaded as two arcs (morning and afternoon); hands at Miami time */
    5: { init: function (root, k) {
      var svg = root.querySelector('.vs5__dial'), st = root.querySelector('.vs5__st'), R = 100;
      function pt(a, r) { return [Math.sin(a) * r, -Math.cos(a) * r]; }
      function arc(h0, h1, r) { var a0 = h0 / 12 * Math.PI * 2, a1 = h1 / 12 * Math.PI * 2, p0 = pt(a0, r), p1 = pt(a1, r); return 'M' + p0[0].toFixed(1) + ' ' + p0[1].toFixed(1) + ' A' + r + ' ' + r + ' 0 ' + (a1 - a0 > Math.PI ? 1 : 0) + ' 1 ' + p1[0].toFixed(1) + ' ' + p1[1].toFixed(1); }
      var s = '<circle class="vs5__face" r="' + R + '"/>';
      // 7am to 12 (outer ring) then 12 to 7pm (inner ring): the whole published day
      s += '<path class="vs5__open" d="' + arc(7, 12, R - 10) + '"/><path class="vs5__open vs5__open--pm" d="' + arc(0, 7, R - 26) + '"/>';
      for (var i = 0; i < 60; i++) { var a = i / 60 * Math.PI * 2, p0 = pt(a, R - (i % 5 ? 4 : 9)), p1 = pt(a, R); s += '<path class="vs5__tk' + (i % 5 ? '' : ' vs5__tk--h') + '" d="M' + p0[0].toFixed(1) + ' ' + p0[1].toFixed(1) + ' L' + p1[0].toFixed(1) + ' ' + p1[1].toFixed(1) + '"/>'; }
      [12, 3, 6, 9].forEach(function (h) { var p = pt(h / 12 * Math.PI * 2, R - 44); s += '<text class="vs5__n" x="' + p[0].toFixed(1) + '" y="' + (p[1] + 6).toFixed(1) + '">' + h + '</text>'; });
      s += '<path class="vs5__hh" d="M0 8 V-48"/><path class="vs5__mh" d="M0 12 V-74"/><circle class="vs5__pin" r="5"/>';
      svg.innerHTML = s;
      var hh = svg.querySelector('.vs5__hh'), mh = svg.querySelector('.vs5__mh');
      function tick() {
        var t = miami(); st.textContent = status(t);
        if (!t) return;
        hh.setAttribute('transform', 'rotate(' + ((t.h % 12) * 30 + t.m / 2) + ')'); mh.setAttribute('transform', 'rotate(' + t.m * 6 + ')');
        svg.classList.toggle('is-open', t.open);
      }
      tick();
      var timer = setInterval(tick, 30000);
      k.add(function () { clearInterval(timer); svg.innerHTML = ''; st.textContent = 'Sun–Fri 7am–7pm · Saturday closed'; });
      EZ.reveal(k, root.querySelectorAll('.vs5__copy > *'));
      if (k.motion) gsap.from(svg.querySelectorAll('.vs5__open'), { drawSVG: '0%', duration: 1, stagger: .3, ease: 'power2.inOut', scrollTrigger: { trigger: svg, start: 'top 80%', once: true } });
    } },

    /* b1 · release record of slot 1 */
    b1: { init: function (root, k) {
      var btn = root.querySelector('.vs1r__turn'), card = root.querySelector('.vs1r__card'), front = root.querySelector('.vs1r__front'), back = root.querySelector('.vs1r__back');
      function set(over) {
        btn.setAttribute('aria-pressed', over ? 'true' : 'false');
        btn.querySelector('.btn__label').textContent = over ? 'Turn back to the front' : 'Turn the card over';
        front.inert = over; back.inert = !over;
        front.setAttribute('aria-hidden', over ? 'true' : 'false'); back.setAttribute('aria-hidden', over ? 'false' : 'true');
        if (k.motion) k.ctx.add(function () { gsap.to(card, { rotateY: over ? 180 : 0, duration: .7, ease: 'power3.inOut' }); });
        else card.classList.toggle('is-over', over);
      }
      k.on(btn, 'click', function () { set(btn.getAttribute('aria-pressed') !== 'true'); });
      set(false);
      k.add(function () { gsap.set(card, { clearProps: 'transform' }); card.classList.remove('is-over'); front.inert = false; back.inert = false; front.removeAttribute('aria-hidden'); back.removeAttribute('aria-hidden'); btn.setAttribute('aria-pressed', 'false'); btn.querySelector('.btn__label').textContent = 'Turn the card over'; });
      EZ.reveal(k, root.querySelectorAll('.vs1r__copy > *'));
      if (k.motion) gsap.from(card, { rotate: -6, y: 40, opacity: 0, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 85%', once: true } });
    } },

    /* b2 · release record of slot 2 */
    b2: { init: function (root, k) {
      var wk = root.querySelector('.vs2r__week'), now = root.querySelector('.vs2r__now');
      wk.innerHTML = '<div class="vs2r__ax" aria-hidden="true">' + [0, 6, 12, 18, 24].map(function (h) { return '<span style="left:' + (h / 24 * 100) + '%">' + (h === 0 || h === 24 ? '12am' : h === 12 ? '12pm' : h < 12 ? h + 'am' : (h - 12) + 'pm') + '</span>'; }).join('') + '</div>' +
        DAYS.map(function (d, i) { return '<div class="vs2r__row" data-d="' + i + '"><span class="vs2r__d">' + LONG[i] + '</span><span class="vs2r__track">' + (i === 6 ? '<span class="vs2r__closed">Closed</span>' : '<span class="vs2r__bar"><span>7am&ndash;7pm</span></span>') + '<span class="vs2r__line" hidden></span></span></div>'; }).join('');
      var rows = Array.prototype.slice.call(wk.querySelectorAll('.vs2r__row'));
      function tick() {
        var t = miami(); now.textContent = status(t);
        rows.forEach(function (r, i) {
          var on = t && t.d === i, ln = r.querySelector('.vs2r__line');
          r.classList.toggle('is-today', !!on); ln.hidden = !on;
          if (on) ln.style.left = ((t.h + t.m / 60) / 24 * 100) + '%';
        });
      }
      tick();
      var timer = setInterval(tick, 60000);
      k.add(function () { clearInterval(timer); wk.innerHTML = ''; now.textContent = ''; });
      EZ.reveal(k, root.querySelectorAll('.vs__head > *'));
      if (k.motion) gsap.from(wk.querySelectorAll('.vs2r__bar'), { scaleX: 0, transformOrigin: '0% 50%', duration: .6, stagger: .07, ease: 'power3.out', scrollTrigger: { trigger: wk, start: 'top 80%', once: true } });
    } },

    /* b3 · release record of slot 3 */
    b3: { init: function (root, k) {
      var btn = root.querySelector('.vs3r__cp'), st = root.querySelector('.vs3r__st'), ADDR = '19 W Flagler St #310, Miami, FL 33130';
      function say(t) { st.textContent = t; }
      k.on(btn, 'click', function () {
        var ok = function () { say('Copied: ' + ADDR + '.'); }, no = function () { say('Copying is blocked here. The address is ' + ADDR + '.'); };
        try { if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(ADDR).then(ok, no); else no(); } catch (e) { no(); }
      });
      k.add(function () { st.textContent = ''; });
      EZ.reveal(k, root.querySelectorAll('.vs3r__copy > *'));
      if (k.motion) gsap.from(root.querySelector('.vs3r__label'), { rotate: 3, y: 30, opacity: 0, duration: .7, ease: 'back.out(1.4)', scrollTrigger: { trigger: root.querySelector('.vs3r__label'), start: 'top 85%', once: true } });
    } },

    /* b4 · release record of slot 4 */
    b4: { init: function (root, k) {
      EZ.reveal(k, root.querySelectorAll('.vs__head > *'));
      if (k.motion) gsap.from(root.querySelectorAll('.vs4r__rows li'), { x: -40, opacity: 0, duration: .5, stagger: .06, ease: 'power3.out', scrollTrigger: { trigger: root.querySelector('.vs4r__rows'), start: 'top 85%', once: true } });
    } },

    /* b5 · release record of slot 5 */
    b5: { init: function (root, k) {
      var svg = root.querySelector('.vs5r__dial'), st = root.querySelector('.vs5r__st'), R = 100;
      function pt(a, r) { return [Math.sin(a) * r, -Math.cos(a) * r]; }
      function arc(h0, h1, r) { var a0 = h0 / 12 * Math.PI * 2, a1 = h1 / 12 * Math.PI * 2, p0 = pt(a0, r), p1 = pt(a1, r); return 'M' + p0[0].toFixed(1) + ' ' + p0[1].toFixed(1) + ' A' + r + ' ' + r + ' 0 ' + (a1 - a0 > Math.PI ? 1 : 0) + ' 1 ' + p1[0].toFixed(1) + ' ' + p1[1].toFixed(1); }
      var s = '<circle class="vs5r__face" r="' + R + '"/>';
      // 7am to 12 (outer ring) then 12 to 7pm (inner ring): the whole published day
      s += '<path class="vs5r__open" d="' + arc(7, 12, R - 10) + '"/><path class="vs5r__open vs5r__open--pm" d="' + arc(0, 7, R - 26) + '"/>';
      for (var i = 0; i < 60; i++) { var a = i / 60 * Math.PI * 2, p0 = pt(a, R - (i % 5 ? 4 : 9)), p1 = pt(a, R); s += '<path class="vs5r__tk' + (i % 5 ? '' : ' vs5r__tk--h') + '" d="M' + p0[0].toFixed(1) + ' ' + p0[1].toFixed(1) + ' L' + p1[0].toFixed(1) + ' ' + p1[1].toFixed(1) + '"/>'; }
      [12, 3, 6, 9].forEach(function (h) { var p = pt(h / 12 * Math.PI * 2, R - 44); s += '<text class="vs5r__n" x="' + p[0].toFixed(1) + '" y="' + (p[1] + 6).toFixed(1) + '">' + h + '</text>'; });
      s += '<path class="vs5r__hh" d="M0 8 V-48"/><path class="vs5r__mh" d="M0 12 V-74"/><circle class="vs5r__pin" r="5"/>';
      svg.innerHTML = s;
      var hh = svg.querySelector('.vs5r__hh'), mh = svg.querySelector('.vs5r__mh');
      function tick() {
        var t = miami(); st.textContent = status(t);
        if (!t) return;
        hh.setAttribute('transform', 'rotate(' + ((t.h % 12) * 30 + t.m / 2) + ')'); mh.setAttribute('transform', 'rotate(' + t.m * 6 + ')');
        svg.classList.toggle('is-open', t.open);
      }
      tick();
      var timer = setInterval(tick, 30000);
      k.add(function () { clearInterval(timer); svg.innerHTML = ''; st.textContent = 'Sun–Fri 7am–7pm · Saturday closed'; });
      EZ.reveal(k, root.querySelectorAll('.vs5r__copy > *'));
      if (k.motion) gsap.from(svg.querySelectorAll('.vs5r__open'), { drawSVG: '0%', duration: 1, stagger: .3, ease: 'power2.inOut', scrollTrigger: { trigger: svg, start: 'top 80%', once: true } });
    } }
  });
})();
