/* financing, PLAN-V3 §3. Figures exactly as each partner publishes them (FACTS.md /financing/). */
(function () {
  function f(n) { return Math.round(n * 10) / 10; }
  var ROUTES = [[0, 1], [0, 1], [0, 1, 2, 3], [0, 2, 3]];
  var WHY = [
    'Kitchens are interior finish work, so the usual routes are consumer credit: Synchrony’s revolving Project Card or a Service Finance installment loan. PACE is generally not available for a kitchen.',
    'Bathrooms are interior finish work too: Synchrony’s Project Card or a Service Finance installment loan. PACE is generally not available for a bathroom remodel.',
    'Storm-hardening work can fit all four. Service Finance lists roofs and impact windows and doors among typical projects, and both PACE programmes cover roofing, windows and doors.',
    'A whole home crosses many trades. Synchrony’s card is reusable across projects, and qualifying parts such as roofing or impact windows can go through PACE.'
  ];

  EZ.section('financing', {
    /* slot 1 · AUDIT-01 winner (copied from v2; F6 de-theatre): the settled diagram is the answer. Selection outline 150ms,
       partners light or dim in 200ms, the reason swaps at once. No wheel spin, no water, no flow loop. Kitchen is pre-picked. */
    1: { init: function (root, k) {
      EZ.reveal(k, root.querySelectorAll('.financing__head > *'));
      var rig = root.querySelector('.fr__rig'), svg = root.querySelector('.fr__pipes');
      var vs = Array.prototype.slice.call(root.querySelectorAll('.fr__v'));
      var ls = Array.prototype.slice.call(root.querySelectorAll('.fr__l'));
      var why = root.querySelector('.fr__why');
      var G = null, cur = -1;
      function geo() {
        var rr = rig.getBoundingClientRect();
        if (!rr.width) return;
        svg.setAttribute('viewBox', '0 0 ' + rr.width + ' ' + rr.height);
        var S = vs.map(function (v) { var r = v.getBoundingClientRect(); return [r.right - rr.left, r.top - rr.top + r.height / 2]; });
        var L = ls.map(function (l) { var r = l.getBoundingClientRect(); return [r.left - rr.left, r.top - rr.top + r.height / 2]; });
        var mx = (S[0][0] + L[0][0]) / 2, base = '';
        S.forEach(function (p) { base += 'M' + f(p[0]) + ' ' + f(p[1]) + 'H' + f(mx); });
        L.forEach(function (p) { base += 'M' + f(mx) + ' ' + f(p[1]) + 'H' + f(p[0]); });
        var top = Math.min(S[0][1], L[0][1]), bot = Math.max(S[3][1], L[3][1]);
        svg.innerHTML = '<path class="p" d="' + base + 'M' + f(mx) + ' ' + f(top) + 'V' + f(bot) + '"/><g class="ws"></g>';
        G = { S: S, L: L, mx: mx, ws: svg.querySelector('.ws') };
        if (cur > -1) route(cur);
      }
      function route(i) {
        if (!G) return;
        var s = G.S[i];
        G.ws.innerHTML = ROUTES[i].map(function (j) { var l = G.L[j]; return '<path class="w" d="M' + f(s[0]) + ' ' + f(s[1]) + 'H' + f(G.mx) + 'V' + f(l[1]) + 'H' + f(l[0]) + '"/>'; }).join('');
      }
      function pick(i, focus) {
        if (i === cur) return;
        cur = i;
        vs.forEach(function (v, j) { v.setAttribute('aria-checked', j === i ? 'true' : 'false'); v.tabIndex = j === i ? 0 : -1; });
        if (focus) vs[i].focus();
        why.textContent = WHY[i];
        ls.forEach(function (l, j) { var on = ROUTES[i].indexOf(j) > -1; l.classList.toggle('is-on', on); l.classList.toggle('is-off', !on); });
        route(i);
      }
      vs.forEach(function (v, i) {
        k.on(v, 'click', function () { pick(i); });
        k.on(v, 'keydown', function (e) {
          var d = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0;
          if (d) { e.preventDefault(); pick((Math.max(cur, 0) + d + 4) % 4, true); }
        });
      });
      k.ro(rig, geo);
      geo();
      pick(0);
      k.add(function () { svg.innerHTML = ''; ls.forEach(function (l) { l.classList.remove('is-on', 'is-off'); }); vs.forEach(function (v) { v.setAttribute('aria-checked', 'false'); }); });
    } },

    /* v1 · Four tickets [S0882 + BANK 372] */
    2: { init: function (root, k) {
      EZ.reveal(k, root.querySelectorAll('.financing__head > *'));
      var tks = root.querySelectorAll('.financing1__tk');
      // [BANK 372] Glare Hover, streak profile: 33 stops from bump(t,.5,.06+.16*softness) + .32*bump(t,.5,.5),
      // smootherstep kernel t^3(t(6t-15)+10), softness .6, opacity .5, angle -45deg, screen blend, follow mode
      var GLARE = (function () {
        function ss(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
        function bump(t, c, h) { var x = 1 - Math.abs(t - c) / h; return x <= 0 ? 0 : ss(Math.min(1, x)); }
        var soft = .6, stops = [];
        for (var i = 0; i <= 32; i++) {
          var t = i / 32, a = Math.min(1, bump(t, .5, .06 + .16 * soft) + .32 * bump(t, .5, .5)) * .5;
          stops.push('rgba(255,255,255,' + a.toFixed(3) + ') ' + (t * 100).toFixed(1) + '%');
        }
        return 'linear-gradient(-45deg, ' + stops.join(', ') + ')';
      })();
      tks.forEach(function (tk) {
        var main = tk.querySelector('.financing1__main'), stub = tk.querySelector('.financing1__stub'), more = tk.querySelector('.financing1__more');
        var btn = tk.querySelector('.financing1__tear'), label = btn.querySelector('.btn__label');
        k.ro(main, function () { tk.style.setProperty('--py', main.offsetHeight + 'px'); });
        tk.style.setProperty('--glare', GLARE);
        k.add(function () { tk.classList.remove('is-torn', 'is-glare'); tk.style.removeProperty('--py'); tk.style.removeProperty('--glare'); btn.setAttribute('aria-expanded', 'false'); label.textContent = 'Tear for details'; gsap.set([stub, more], { clearProps: 'all' }); });
        if (k.fine && k.motion) {
          k.on(tk, 'pointerenter', function () { tk.classList.add('is-glare'); });
          k.on(tk, 'pointerleave', function () { tk.classList.remove('is-glare'); });
          k.on(tk, 'pointermove', function (e) {            // glare tracks the pointer across the paper [BANK 372]
            var r = tk.getBoundingClientRect();
            tk.style.setProperty('--gx', (120 - (e.clientX - r.left) / r.width * 140).toFixed(1) + '%');
          });
        }
        k.on(btn, 'click', function () {
          var torn = !tk.classList.contains('is-torn');
          btn.setAttribute('aria-expanded', torn ? 'true' : 'false');
          label.textContent = torn ? 'Back to the stub' : 'Tear for details';
          if (!k.motion) { tk.classList.toggle('is-torn', torn); stub.style.visibility = torn ? 'hidden' : ''; return; }
          k.ctx.add(function () {
            if (torn) {
              gsap.timeline().to(stub, { y: 46, x: 6, autoAlpha: 0, duration: .32, ease: 'power3.in' })
                .add(function () { tk.classList.add('is-torn'); })
                .fromTo(more, { y: -10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .3, ease: 'power3.out' });
            } else {
              gsap.timeline().to(more, { autoAlpha: 0, duration: .15 })
                .add(function () { tk.classList.remove('is-torn'); })
                .fromTo(stub, { y: -20, x: 0, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .3, ease: 'back.out(2)' });
            }
          });
        });
      });
      if (k.motion) gsap.from(tks, { y: 24, autoAlpha: 0, duration: .3, ease: 'power2.out', stagger: .06, scrollTrigger: { trigger: root.querySelector('.financing1__row'), start: 'top 85%', once: true } });
    } },

    /* v2 · Pipe the money */
    b1: { init: function (root, k) {
      EZ.reveal(k, root.querySelectorAll('.financing__head > *'));
      var rig = root.querySelector('.financing2__rig'), svg = root.querySelector('.financing2__pipes');
      var vs = Array.prototype.slice.call(root.querySelectorAll('.financing2__v'));
      var ls = Array.prototype.slice.call(root.querySelectorAll('.financing2__l'));
      var why = root.querySelector('.financing2__why');
      var G = null, cur = -1, flow = null;
      function geo() {
        var rr = rig.getBoundingClientRect();
        if (!rr.width) return;
        svg.setAttribute('viewBox', '0 0 ' + rr.width + ' ' + rr.height);
        var S = vs.map(function (v) { var r = v.getBoundingClientRect(); return [r.right - rr.left, r.top - rr.top + r.height / 2]; });
        var L = ls.map(function (l) { var r = l.getBoundingClientRect(); return [r.left - rr.left, r.top - rr.top + r.height / 2]; });
        var mx = (S[0][0] + L[0][0]) / 2, top = Math.min(S[0][1], L[0][1]) - 8, bot = Math.max(S[3][1], L[3][1]) + 8;
        var base = '', joints = '';
        S.forEach(function (p) { base += 'M' + f(p[0]) + ' ' + f(p[1]) + 'H' + f(mx); joints += '<circle class="j" cx="' + f(p[0] + 4) + '" cy="' + f(p[1]) + '" r="6"/>'; });
        L.forEach(function (p) { base += 'M' + f(mx) + ' ' + f(p[1]) + 'H' + f(p[0]); joints += '<circle class="j" cx="' + f(p[0] - 4) + '" cy="' + f(p[1]) + '" r="6"/>'; });
        svg.innerHTML = '<path class="p" d="' + base + '"/><rect class="man" x="' + f(mx - 9) + '" y="' + f(top) + '" width="18" height="' + f(bot - top) + '" rx="4"/><path class="p-in" d="' + base + '"/><g class="ws"></g>' + joints;
        G = { S: S, L: L, mx: mx, ws: svg.querySelector('.ws') };
        if (cur > -1) water(cur, true);
      }
      function water(i, now) {
        if (!G) return;
        if (flow) { flow.kill(); flow = null; }
        var s = G.S[i];
        G.ws.innerHTML = ROUTES[i].map(function (j) { var l = G.L[j]; return '<path class="w" d="M' + f(s[0]) + ' ' + f(s[1]) + 'H' + f(G.mx) + 'V' + f(l[1]) + 'H' + f(l[0]) + '"/>'; }).join('');
        var ws = G.ws.querySelectorAll('.w');
        if (!k.motion || now) { gsap.set(ws, { opacity: 1 }); return; }
        k.ctx.add(function () {
          gsap.fromTo(ws, { opacity: 1, drawSVG: '0%' }, { drawSVG: '100%', duration: .75, ease: 'power2.inOut', stagger: .08, onComplete: function () {
            ws.forEach(function (w) { w.style.strokeDasharray = '10px 8px'; w.style.strokeDashoffset = '0px'; });
            flow = gsap.fromTo(ws, { strokeDashoffset: 0 }, { strokeDashoffset: -36, duration: .7, ease: 'none', repeat: 5 });   // flows ~4s, then rests (no motion past 5s unasked)
          } });
        });
      }
      function pick(i, focus) {
        if (i === cur) return;
        cur = i;
        vs.forEach(function (v, j) { v.setAttribute('aria-checked', j === i ? 'true' : 'false'); v.tabIndex = j === i ? 0 : -1; });
        if (focus) vs[i].focus();
        why.textContent = WHY[i];
        ls.forEach(function (l, j) {
          var on = ROUTES[i].indexOf(j) > -1;
          l.classList.toggle('is-on', on); l.classList.toggle('is-off', !on);
          if (k.motion) k.ctx.add(function () { gsap.to(l, { '--lvl': on ? 1 : 0, duration: on ? .9 : .3, delay: on ? .5 : 0, ease: 'power2.out' }); });
          else l.style.setProperty('--lvl', on ? 1 : 0);
        });
        if (k.motion) k.ctx.add(function () { gsap.fromTo(vs[i].querySelector('.wheel'), { rotation: 0 }, { rotation: 270, svgOrigin: '20 20', duration: .6, ease: 'power2.inOut' }); });
        water(i);
      }
      vs.forEach(function (v, i) {
        v.tabIndex = i === 0 ? 0 : -1;
        k.on(v, 'click', function () { pick(i); });
        k.on(v, 'keydown', function (e) {
          var d = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0;
          if (d) { e.preventDefault(); pick((Math.max(cur, 0) + d + 4) % 4, true); }
        });
      });
      k.ro(rig, geo);
      geo();
      k.io(rig, function (en) { if (flow) en.isIntersecting ? flow.play() : flow.pause(); });
      k.add(function () { if (flow) flow.kill(); svg.innerHTML = ''; ls.forEach(function (l) { l.classList.remove('is-on', 'is-off'); l.style.removeProperty('--lvl'); }); vs.forEach(function (v) { v.setAttribute('aria-checked', 'false'); }); why.textContent = 'Pick a project to see the usual routes.'; });
      if (k.motion) gsap.from(vs.concat(ls), { x: function (i) { return i < 4 ? -30 : 30; }, autoAlpha: 0, duration: .3, ease: 'power2.out', stagger: .04, scrollTrigger: { trigger: rig, start: 'top 80%', once: true } });
    } },

    /* v3 · The morph sheet [BANK 255 Shazam] */
    3: { init: function (root, k) {
      EZ.reveal(k, root.querySelectorAll('.financing3__intro > *'));
      var stage = root.querySelector('.financing3__stage'), orb = root.querySelector('.financing3__orb'), sheet = root.querySelector('.financing3__sheet');
      var close = root.querySelector('.financing3__close'), busy = false;
      // [AUDIT-01 F6 loser V3, P1] the sheet is OPEN at rest: terms and the disclosure are on the page before any click.
      // The orb only re-opens a sheet the visitor folded; no negative-overshoot curve on a system reveal.
      var OPEN = EZ.bezier(.23, 1, .32, 1), CONTENT = EZ.bezier(.7, 0, .3, 1), SHUT = EZ.bezier(.4, 1, .3, 1);
      function rel(el) { var s = stage.getBoundingClientRect(), r = el.getBoundingClientRect(); return { left: r.left - s.left, top: r.top - s.top, width: r.width, height: r.height }; }
      function shape(from) {
        var d = document.createElement('div');
        d.setAttribute('aria-hidden', 'true');
        d.style.cssText = 'position:absolute;z-index:3;pointer-events:none;left:' + from.left + 'px;top:' + from.top + 'px;width:' + from.width + 'px;height:' + from.height + 'px';
        stage.appendChild(d);
        return d;
      }
      function open() {
        if (busy) return;
        orb.setAttribute('aria-expanded', 'true');
        if (!k.motion) { orb.hidden = true; sheet.hidden = false; close.focus(); return; }
        busy = true;
        var a = rel(orb);
        sheet.hidden = false; sheet.style.visibility = 'hidden';
        var b = rel(sheet);
        var sh = shape(a);
        orb.style.visibility = 'hidden';
        k.ctx.add(function () {
          gsap.timeline({ onComplete: function () { sh.remove(); busy = false; close.focus(); } })
            .fromTo(sh, { left: a.left, top: a.top, width: a.width, height: a.height, borderRadius: a.width / 2, backgroundColor: '#0B1418' },
              { left: b.left, top: b.top, width: b.width, height: b.height, borderRadius: 0, backgroundColor: '#f3eee2', duration: .4, ease: OPEN })
            .add(function () { orb.hidden = true; orb.style.visibility = ''; sheet.style.visibility = ''; })
            .from(sheet.children, { autoAlpha: 0, y: 14, duration: .4, ease: CONTENT, stagger: .03 });
        });
      }
      function shut() {
        if (busy || sheet.hidden) return;
        orb.setAttribute('aria-expanded', 'false');
        if (!k.motion) { sheet.hidden = true; orb.hidden = false; orb.focus(); return; }
        busy = true;
        var b = rel(sheet);
        k.ctx.add(function () {
          gsap.to(sheet.children, { autoAlpha: 0, duration: .15, onComplete: function () {
            var sh = shape(b);
            sheet.hidden = true; gsap.set(sheet.children, { clearProps: 'opacity,visibility' });
            orb.hidden = false; orb.style.visibility = 'hidden';
            var a = rel(orb);
            gsap.fromTo(sh, { left: b.left, top: b.top, width: b.width, height: b.height, borderRadius: 0, backgroundColor: '#f3eee2' },
              { left: a.left, top: a.top, width: a.width, height: a.height, borderRadius: a.width / 2, backgroundColor: '#0B1418', duration: .4, ease: SHUT,
                onComplete: function () { sh.remove(); orb.style.visibility = ''; busy = false; orb.focus(); } });
          } });
        });
      }
      orb.hidden = true; sheet.hidden = false; orb.setAttribute('aria-expanded', 'true');
      k.on(orb, 'click', open);
      k.on(close, 'click', shut);
      k.on(sheet, 'keydown', function (e) { if (e.key === 'Escape') shut(); });
      k.add(function () { sheet.hidden = true; orb.hidden = false; orb.style.visibility = ''; sheet.style.visibility = ''; orb.setAttribute('aria-expanded', 'false'); busy = false; stage.querySelectorAll(':scope > div[aria-hidden]').forEach(function (d) { d.remove(); }); });
    } }
  });
})();
