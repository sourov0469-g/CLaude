/* consult, PLAN-V3 §3. No server in this file: validate inline, then compose an email to the firm (said before sending). */
(function () {
  var TO = 'Sales@elbazconstruction.com';
  var LABEL = { name: 'your full name', phone: 'a phone number', email: 'an email address', address: 'the property address', project: 'what you want to change' };
  function check(form, names) {
    var f = form.elements, errs = [];
    names.forEach(function (n) {
      var el = f[n]; if (!el) return;
      var v = (el.value || '').trim(), msg = '';
      if (!v) msg = 'Please add ' + LABEL[n] + '.';
      else if (n === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) msg = 'That email address does not look complete.';
      else if (n === 'phone' && v.replace(/\D/g, '').length < 10) msg = 'Please include the area code.';
      errs.push({ el: el, msg: msg });
    });
    var c = f.consent;
    if (c && names.indexOf('consent') > -1) errs.push({ el: c, msg: c.checked ? '' : 'Please tick the box so we may contact you about this enquiry.' });
    return errs;
  }
  function show(errs, form, k) {
    errs.forEach(function (e) {
      var box = form.querySelector('#' + e.el.id + '-err');
      e.el.setAttribute('aria-invalid', e.msg ? 'true' : 'false');
      if (box) { box.textContent = e.msg; box.hidden = !e.msg; e.el.setAttribute('aria-describedby', box.id); }
    });
    var first = errs.filter(function (e) { return e.msg; })[0];
    if (first) {
      first.el.focus();
      if (k && k.motion) gsap.fromTo(first.el.closest('.c-f, .c-consent') || first.el, { x: 0 }, { keyframes: [{ x: 6, duration: .08 }, { x: -6, duration: .08 }, { x: 4, duration: .06 }, { x: 0, duration: .06 }] });   // S0409 error shake
    }
    return !first;
  }
  function compose(lines, name) {
    lines.push('', 'I agree to be contacted by Elbaz Construction about this enquiry. Message and data rates may apply.');
    return 'mailto:' + TO + '?subject=' + encodeURIComponent('Consultation request from ' + name) + '&body=' + encodeURIComponent(lines.join('\n'));
  }
  function v(form, n) { var el = form.elements[n]; return el ? (el.value || '').trim() : ''; }
  function done(form) {
    var d = form.querySelector('.c-done');
    d.innerHTML = 'Your email app should now be open with your request to ' + TO + '. Send it from there and we will come back to you, usually the same or next working day. If it is urgent, call <a class="link" href="tel:+17542360675" data-rx="phone">(754)&nbsp;236&#8209;0675</a>.';
    d.hidden = false;
    if (EZ.bindOne) EZ.bindOne(d.querySelector('a'), form._kit);   // the late call link reacts like every other [AUDIT-01 D.2.4]
  }
  function liveClear(form, k) {
    form._kit = k;
    form.querySelectorAll('input, textarea').forEach(function (el) {
      // a filled field is checked when it is left; an empty one is only flagged on send (no nagging on tab-through)
      k.on(el, 'blur', function () {
        if (!el.value || !LABEL[el.name]) return;
        var e = check(form, [el.name])[0], b = el.id && form.querySelector('#' + el.id + '-err');
        if (!e || !e.msg || !b) return;
        b.textContent = e.msg; b.hidden = false; el.setAttribute('aria-invalid', 'true'); el.setAttribute('aria-describedby', b.id);
      });
      k.on(el, 'input', function () { var b = el.id && form.querySelector('#' + el.id + '-err'); if (b && !b.hidden) { b.hidden = true; el.setAttribute('aria-invalid', 'false'); } });
      k.on(el, 'change', function () { var b = el.id && form.querySelector('#' + el.id + '-err'); if (b && !b.hidden && el.checked) { b.hidden = true; } });
    });
    k.add(function () { form.reset(); form.querySelectorAll('.c-err, .c-done').forEach(function (b) { b.hidden = true; }); form.querySelectorAll('[aria-invalid]').forEach(function (el) { el.removeAttribute('aria-invalid'); }); });
  }
  if (!EZ.consultMail) EZ.consultMail = function (url) { window.location.href = url; };   // tests replace this to intercept the mailto navigation

  EZ.section('consult', {
    /* slot 3 · Phase 5 improved version of b4 */
    3: { init: function (root, k) {
      // open or closed right now, from the published hours only (Sunday to Friday 7am to 7pm, Saturday closed), in Miami time
      var openP = root.querySelector('.c3x__open'), openT = root.querySelector('.c3x__st');
      function openNow() {
        var parts = {};
        try { new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', weekday: 'short', hour: 'numeric', hour12: false }).formatToParts(new Date()).forEach(function (p) { parts[p.type] = p.value; }); } catch (e) { return; }
        var day = parts.weekday, h = +parts.hour % 24, open = day !== 'Sat' && h >= 7 && h < 19;
        openP.classList.toggle('is-open', open);
        openT.textContent = open ? 'Open now, until 7pm Miami time' : day === 'Sat' ? 'Closed on Saturdays. We open again Sunday at 7am' : 'Closed now. We open at 7am Miami time' + (day === 'Fri' && h >= 19 ? ' on Sunday' : '');
      }
      openNow();
      var openTimer = setInterval(openNow, 60000);
      k.add(function () { clearInterval(openTimer); openP.classList.remove('is-open'); openT.textContent = 'Sun\u2013Fri 7am\u20137pm, Miami time'; });
      var form = root.querySelector('.c3x__form'), num = root.querySelector('.c3x__num'), digits = root.querySelector('.c3x__digits');
      var hs = root.querySelector('.c3x__hs'), waves = root.querySelectorAll('.c3x__waves path');
      liveClear(form, k);
      k.on(form, 'submit', function (e) {
        e.preventDefault();
        if (!show(check(form, ['name', 'phone', 'project', 'consent']), form, k)) return;
        EZ.consultMail(compose(['Please call me back.', 'Full name: ' + v(form, 'name'), 'Phone: ' + v(form, 'phone'), 'Project: ' + v(form, 'project')], v(form, 'name')));
        done(form);
      });
      EZ.reveal(k, root.querySelectorAll('.c3x__h'));
      if (!k.motion) return;
      // the number grows from a line of text to the size of the room as it comes up the screen
      gsap.fromTo(digits, { scale: .3 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: num, start: 'top bottom', end: 'top 40%', scrub: true } });
      // the handset rings twice when it comes on screen (under 5s), and again whenever the pointer reaches the number
      var ring = gsap.timeline({ repeat: 1, repeatDelay: 2.6, paused: true })
        .to(hs, { keyframes: [{ rotation: -14, duration: .06 }, { rotation: 12, duration: .06 }, { rotation: -10, duration: .06 }, { rotation: 8, duration: .06 }, { rotation: -6, duration: .06 }, { rotation: 0, duration: .08 }], svgOrigin: '28 40' }, 0)
        .fromTo(waves, { drawSVG: '50% 50%', opacity: 0 }, { drawSVG: '0% 100%', opacity: 1, duration: .3, stagger: .08 }, 0)
        .to(waves, { opacity: 0, duration: .4 }, .7);
      k.io(num, function (en) { en.isIntersecting ? ring.restart() : ring.pause(); });
      k.on(num, 'pointerenter', function () { ring.restart(); });
    } },

    /* slot 2 · Phase 5 improved version of b3 */

    2: { init: function (root, k) {
      var form = root.querySelector('.c1x__paper'), btn = root.querySelector('.c1x__go'), ring = root.querySelector('.c1x__ring'), label = btn.querySelector('.btn__label');
      liveClear(form, k);
      EZ.reveal(k, root.querySelectorAll('.c1x__side > *'));
      if (k.motion) {
        gsap.from(root.querySelector('.c1x__board'), { y: 24, autoAlpha: 0, duration: .3, ease: 'power2.out', scrollTrigger: { trigger: root.querySelector('.c1x__board'), start: 'top 85%', once: true } });
        gsap.from(root.querySelector('.c1x__lever'), { rotation: -20, svgOrigin: '170 34', duration: .3, ease: 'back.out(3)', delay: .2, scrollTrigger: { trigger: root.querySelector('.c1x__board'), start: 'top 85%', once: true } });
      }
      k.add(function () { gsap.set([btn, label, ring], { clearProps: 'all' }); });
      k.on(form, 'submit', function (e) {
        e.preventDefault();
        if (!show(check(form, ['name', 'phone', 'email', 'address', 'project', 'consent']), form, k)) return;
        var type = (form.querySelector('[name="type"]:checked') || {}).value || '', how = (form.querySelector('[name="contact"]:checked') || {}).value || '';
        var url = compose(['The job: ' + type, 'Full name: ' + v(form, 'name'), 'Phone: ' + v(form, 'phone'), 'Email: ' + v(form, 'email'), 'Address: ' + v(form, 'address'), 'Project: ' + v(form, 'project'), 'Preferred contact: ' + how], v(form, 'name'));
        // [AUDIT-01 F10 loser V1, P1] the send fires FIRST; the ceremony plays afterwards as confirmation, 600ms in all
        EZ.consultMail(url); done(form);
        if (!k.motion) return;
        var w = btn.offsetWidth;
        k.ctx.add(function () {
          gsap.timeline()
            .to(label, { autoAlpha: 0, duration: .08 })
            .fromTo(btn, { width: w, minWidth: 0 }, { width: 56, minWidth: 0, paddingLeft: 0, paddingRight: 0, borderRadius: 28, duration: .18, ease: 'power3.inOut' })
            .set(ring, { opacity: 1 })
            .fromTo(ring.querySelector('circle'), { drawSVG: '0%' }, { drawSVG: '100%', duration: .22, ease: 'power1.inOut' })
            .fromTo(ring.querySelector('path'), { drawSVG: '0%' }, { drawSVG: '100%', duration: .12, ease: 'power2.out' });
        });
      });
    } },

    /* slot 1 · Phase 5 improved version of b2 */
    1: { init: function (root, k) {
      var form = root.querySelector('.cpx__form'), svg = root.querySelector('.cpx__svg'), head = root.querySelector('.cpx__h');
      var p1 = root.querySelector('.cpx__p1'), p2 = root.querySelector('.cpx__p2'), step = root.querySelector('.cpx__step');
      var rooms = Array.prototype.slice.call(root.querySelectorAll('.cpx__room')), whole = form.elements.whole;
      var picked = root.querySelector('.cpx__picked'), err = root.querySelector('#c2-rooms-w-i-err'), touched = false;
      var H1 = 'Tap the rooms <span class="acc">you want to change.</span>', H2 = 'How do we <span class="acc">reach you?</span>', S1 = 'Step 1 of 2, pick the rooms', S2 = 'Step 2 of 2, how to reach you';
      var HOUSE = EZ.bezier(.23, 1, .32, 1);
      liveClear(form, k);
      rooms.forEach(function (r) { if (!r.querySelector('span')) r.innerHTML = '<span>' + r.textContent + '</span>'; });
      svg.innerHTML = '<path class="wall" d="M12 12H588V408H12Z M282 12V150 M282 150H420 M420 12V216 M12 216H588 M354 216V408"/>' +
        '<path class="door" d="M282 110a40 40 0 0 1 40 40 M420 170a40 40 0 0 0 -40 40 M200 216a44 44 0 0 1 44 -44 M354 300a40 40 0 0 1 40 40"/>' +
        '<path class="fix" d="M30 30h220v36H30z M60 120h120v50H60z M300 30h50v30h-50z M370 90a18 22 0 1 0 0.1 0 M440 40h120v120h-120z M40 300h150v70H40z M380 240h180v140H380z"/>';
      k.add(function () { svg.innerHTML = ''; rooms.forEach(function (r) { r.setAttribute('aria-pressed', 'false'); }); p1.hidden = false; p2.hidden = true; step.textContent = S1; head.innerHTML = H1; });
      function sel() { var s = rooms.filter(function (r) { return r.getAttribute('aria-pressed') === 'true'; }).map(function (r) { return r.dataset.room; }); if (whole.checked) s.unshift('Whole home'); return s; }
      function press(r, on) {
        r.setAttribute('aria-pressed', on ? 'true' : 'false');
        if (k.motion && on) gsap.fromTo(r.querySelector('span'), { scale: 1.12 }, { scale: 1, duration: .18, ease: 'power2.out' });
      }
      rooms.forEach(function (r) { k.on(r, 'click', function () { touched = true; press(r, r.getAttribute('aria-pressed') !== 'true'); err.hidden = true; }); });
      // whole home reads as five picks: a 40ms cascade
      k.on(whole, 'change', function () {
        touched = true; err.hidden = true;
        rooms.forEach(function (r, i) { if (k.motion) k.timeout(function () { press(r, whole.checked); }, i * 40); else press(r, whole.checked); });
      });
      // a room chosen in the hero arrives pressed, until the visitor touches the plan themselves
      function carry() {
        if (touched || !EZ.pickedRoom) return;
        if (EZ.pickedRoom === 'Whole home') { whole.checked = true; rooms.forEach(function (r) { r.setAttribute('aria-pressed', 'true'); }); return; }
        rooms.forEach(function (r) { r.setAttribute('aria-pressed', r.dataset.room === EZ.pickedRoom ? 'true' : 'false'); });
      }
      carry();
      k.io(root, function (en) { if (en.isIntersecting) carry(); }, { threshold: 0 });
      function go(to2) {
        var from = to2 ? p1 : p2, to = to2 ? p2 : p1;
        if (to2) picked.textContent = sel().join(' · ');
        function swap() { step.textContent = to2 ? S2 : S1; head.innerHTML = to2 ? H2 : H1; }
        if (!k.motion) { swap(); from.hidden = true; to.hidden = false; (to.querySelector('input, button') || to).focus(); return; }
        k.ctx.add(function () {
          gsap.timeline()
            .to([from, head, step], { autoAlpha: 0, duration: .1, ease: 'power1.in', onComplete: function () { swap(); from.hidden = true; gsap.set(from, { clearProps: 'all' }); to.hidden = false; } })
            .fromTo(to, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: .2, ease: HOUSE, clearProps: 'all', onComplete: function () { (to.querySelector('input, button') || to).focus(); } })
            .to([head, step], { autoAlpha: 1, duration: .2, ease: HOUSE, clearProps: 'opacity,visibility' }, '<');
        });
      }
      k.on(root.querySelector('.cpx__next'), 'click', function () {
        if (!sel().length) { err.textContent = 'Tap at least one room, or tick the whole home.'; err.hidden = false; return; }
        go(true);
      });
      k.on(root.querySelector('.cpx__back'), 'click', function () { go(false); });
      k.on(form, 'submit', function (e) {
        e.preventDefault();
        if (!show(check(form, ['name', 'phone', 'email', 'address', 'consent']), form, k)) return;
        var lines = ['Rooms: ' + sel().join(', '), 'Full name: ' + v(form, 'name'), 'Phone: ' + v(form, 'phone'), 'Email: ' + v(form, 'email'), 'Address: ' + v(form, 'address'), 'Preferred contact: ' + v(form, 'contact')];
        if (v(form, 'notes')) lines.push('Notes: ' + v(form, 'notes'));
        EZ.consultMail(compose(lines, v(form, 'name')));
        done(form);
      });
      EZ.reveal(k, root.querySelectorAll('.cpx__side > *'));
      if (k.motion) gsap.fromTo(svg.querySelectorAll('.wall, .door, .fix'), { drawSVG: '0%' }, { drawSVG: '100%', duration: .3, ease: 'power2.out', stagger: .05, scrollTrigger: { trigger: svg, start: 'top 80%', once: true } });
    } },

    /* slot 4 · Phase 5 new · One question at a time: each step checks only its own field; an answer joins the thread;
       the last step shows consent and the note, and the send runs the full check like every other version */
    4: { init: function (root, k) {
      var form = root.querySelector('.ccv__form'), Q = Array.prototype.slice.call(root.querySelectorAll('.ccv__q'));
      var log = root.querySelector('.ccv__log'), step = root.querySelector('.ccv__step'), back = root.querySelector('.ccv__back'), next = root.querySelector('.ccv__next');
      var fill = root.querySelector('.ccv__fill'), at = 0, ASK = { project: 'The job', name: 'Name', phone: 'Phone', email: 'Email', address: 'Property' };
      liveClear(form, k);
      function bar(anim) { var p = Math.min(at, 5) / 5; if (anim && k.motion) k.ctx.add(function () { gsap.to(fill, { drawSVG: (p * 100) + '%', duration: .4, ease: 'power2.out' }); }); else gsap.set(fill, { drawSVG: (p * 100) + '%' }); }
      function render(anim) {
        Q.forEach(function (q, i) { q.hidden = i !== at; });
        back.hidden = at === 0; next.hidden = at === Q.length - 1;
        step.textContent = at < 5 ? 'Question ' + (at + 1) + ' of 5' : 'Ready to send';
        log.innerHTML = Q.slice(0, at).map(function (q) { var key = q.dataset.k; return '<li><span>' + ASK[key] + '</span>' + v(form, key).replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</li>'; }).join('');
        bar(anim);
        var f = Q[at].querySelector('input, textarea');
        if (anim) { if (f) f.focus(); else Q[at].querySelector('.c-consent input').focus(); }
        if (anim && k.motion) k.ctx.add(function () { gsap.from(Q[at], { y: 14, autoAlpha: 0, duration: .25, ease: 'power2.out' }); if (log.lastElementChild) gsap.from(log.lastElementChild, { x: 20, autoAlpha: 0, duration: .25, ease: 'back.out(2)' }); });
      }
      function forward() { var key = Q[at].dataset.k; if (!show(check(form, [key]), form, k)) return; at++; render(true); }
      k.on(next, 'click', forward);
      k.on(back, 'click', function () { at = Math.max(0, at - 1); render(true); });
      k.on(form, 'keydown', function (e) { if (e.key === 'Enter' && e.target.tagName === 'INPUT' && e.target.type !== 'checkbox' && at < Q.length - 1) { e.preventDefault(); forward(); } });
      root.querySelectorAll('.ccv__chip').forEach(function (c) { k.on(c, 'click', function () { var t = form.elements.project; t.value = (t.value ? t.value.replace(/\s+$/, '') + ', ' : '') + c.textContent; t.dispatchEvent(new Event('input', { bubbles: true })); t.focus(); }); });
      k.on(form, 'submit', function (e) {
        e.preventDefault();
        var errs = check(form, ['project', 'name', 'phone', 'email', 'address', 'consent']), bad = errs.filter(function (x) { return x.msg && x.el.name !== 'consent'; })[0];
        if (bad) { at = Q.map(function (q) { return q.dataset.k; }).indexOf(bad.el.name); render(true); show(check(form, [bad.el.name]), form, k); return; }
        if (!show(errs, form, k)) return;
        EZ.consultMail(compose(['Project: ' + v(form, 'project'), 'Full name: ' + v(form, 'name'), 'Phone: ' + v(form, 'phone'), 'Email: ' + v(form, 'email'), 'Address: ' + v(form, 'address')], v(form, 'name')));
        done(form);
      });
      render(false);
      k.add(function () { at = 0; log.innerHTML = ''; Q.forEach(function (q, i) { q.hidden = i !== 0; }); back.hidden = true; next.hidden = false; step.textContent = 'Question 1 of 5'; gsap.set(fill, { clearProps: 'all' }); });
      EZ.reveal(k, root.querySelectorAll('.ccv__side > *'));
    } },

    /* slot 5 · Phase 5 new · The postcard: the stamp's perforation is drawn from its frame; after a valid send the
       postmark is struck over the stamp (the email is composed first, the postmark is only confirmation) */
    5: { init: function (root, k) {
      var form = root.querySelector('.cpc__card'), perf = root.querySelector('.cpc__perf'), pm = root.querySelector('.cpc__pm');
      var d = '';
      for (var x = 8; x <= 112; x += 8) d += 'M' + x + ' 6 l0 0 M' + x + ' 134 l0 0 ';
      for (var y = 14; y <= 126; y += 8) d += 'M6 ' + y + ' l0 0 M114 ' + y + ' l0 0 ';
      perf.setAttribute('d', d);
      liveClear(form, k);
      k.on(form, 'submit', function (e) {
        e.preventDefault();
        if (!show(check(form, ['project', 'name', 'phone', 'email', 'address', 'consent']), form, k)) return;
        var how = (form.querySelector('[name="contact"]:checked') || {}).value || '';
        EZ.consultMail(compose(['Dear Elbaz Construction,', v(form, 'project'), '', 'From: ' + v(form, 'name'), 'Phone: ' + v(form, 'phone'), 'Email: ' + v(form, 'email'), 'Address: ' + v(form, 'address'), 'Reply by: ' + how], v(form, 'name')));
        done(form);
        form.classList.add('is-sent');
        if (k.motion) k.ctx.add(function () { gsap.fromTo(pm, { scale: 1.6, rotation: -18, transformOrigin: '50% 50%', autoAlpha: 0 }, { scale: 1, rotation: -8, autoAlpha: 1, duration: .32, ease: 'back.out(2.5)' }); });
      });
      k.add(function () { form.classList.remove('is-sent'); perf.setAttribute('d', ''); gsap.set(pm, { clearProps: 'all' }); });
      EZ.reveal(k, root.querySelectorAll('.cpc__head > *'));
      if (k.motion) gsap.from(form, { rotation: -2.5, y: 30, autoAlpha: 0, duration: .5, ease: 'back.out(1.6)', scrollTrigger: { trigger: form, start: 'top 85%', once: true } });
    } },

    /* slot 6 · Phase 5 new · The visit window: the week chart is drawn from the published hours only (Sunday to Friday
       7am to 7pm; Saturday crossed out); the chosen day and window are filled in the chart */
    6: { init: function (root, k) {
      var form = root.querySelector('.cvt__form'), svg = root.querySelector('.cvt__week');
      var DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], X0 = 60, CW = 50, Y0 = 20, HH = 16;   // 7am at Y0, one hour = 16
      var s = '';
      [7, 11, 15, 19].forEach(function (hr) { var y = Y0 + (hr - 7) * HH; s += '<path class="gl" d="M' + (X0 - 6) + ' ' + y + ' H' + (X0 + 7 * CW) + '"/><text class="hl" x="' + (X0 - 10) + '" y="' + (y + 4) + '">' + (hr > 12 ? hr - 12 + 'pm' : hr + 'am') + '</text>'; });
      DAYS.forEach(function (d, i) {
        var x = X0 + i * CW + 8;
        if (d === 'Sat') s += '<path class="x" d="M' + x + ' ' + (Y0 + 70) + ' l34 50 M' + (x + 34) + ' ' + (Y0 + 70) + ' l-34 50"/>';
        else s += '<rect class="bar" x="' + x + '" y="' + Y0 + '" width="34" height="' + 12 * HH + '"/><rect class="win" data-d="' + d + '" x="' + x + '" y="' + Y0 + '" width="34" height="0"/>';
        s += '<text x="' + (x + 17) + '" y="' + (Y0 + 12 * HH + 20) + '">' + d + '</text>';
      });
      s += '<text x="' + (X0 + 6 * CW + 25) + '" y="' + (Y0 + 12 * HH + 36) + '">closed</text>';
      svg.innerHTML = s;
      var WIN = { 'Morning, 7 to 11am': [7, 11], 'Midday, 11am to 3pm': [11, 15], 'Afternoon, 3 to 7pm': [15, 19] };
      function paint(anim) {
        var day = (form.querySelector('[name="day"]:checked') || {}).value, w = WIN[(form.querySelector('[name="win"]:checked') || {}).value];
        svg.querySelectorAll('.win').forEach(function (r) {
          var on = r.dataset.d === day, to = { attr: { y: Y0 + (w[0] - 7) * HH, height: on ? (w[1] - w[0]) * HH : 0 } };
          if (anim && k.motion) k.ctx.add(function () { gsap.to(r, Object.assign(to, { duration: .3, ease: 'power2.out' })); }); else gsap.set(r, to);
        });
      }
      k.on(form, 'change', function (e) { if (e.target.name === 'day' || e.target.name === 'win') paint(true); });
      paint(false);
      liveClear(form, k);
      k.on(form, 'submit', function (e) {
        e.preventDefault();
        if (!show(check(form, ['name', 'phone', 'email', 'address', 'project', 'consent']), form, k)) return;
        var day = (form.querySelector('[name="day"]:checked') || {}).value, win = (form.querySelector('[name="win"]:checked') || {}).value;
        EZ.consultMail(compose(['Preferred visit: ' + day + ', ' + win + ' (a preference; please call to confirm)', 'Full name: ' + v(form, 'name'), 'Phone: ' + v(form, 'phone'), 'Email: ' + v(form, 'email'), 'Address: ' + v(form, 'address'), 'Project: ' + v(form, 'project')], v(form, 'name')));
        done(form);
      });
      k.add(function () { svg.innerHTML = ''; });
      EZ.reveal(k, root.querySelectorAll('.cvt__side > *'));
    } },

    /* slot 7 · Phase 5 new · The blueprint: a field that passes its own check inks its part of the elevation
       (address: footing, name: walls, phone: roof, email: door and windows, project: chimney, consent: the flag) */
    7: { init: function (root, k) {
      var form = root.querySelector('.cbp__form'), parts = {}, cnt = root.querySelector('.cbp__count .nums'), drawn = {};
      root.querySelectorAll('.cbp__p, .cbp__flag').forEach(function (p) { parts[p.dataset.k] = p; });
      function set(key, on) {
        if (!!drawn[key] === on) return; drawn[key] = on;
        var p = parts[key], tg = p.tagName === 'g' ? p.querySelectorAll('path') : [p];
        if (k.motion) k.ctx.add(function () { gsap.to(tg, { drawSVG: on ? '100%' : '0%', duration: .5, ease: 'power2.inOut' }); if (key === 'consent') gsap.to(p.querySelector('.cbp__pen'), { scaleX: on ? 1 : 0, transformOrigin: '0% 50%', duration: .4, ease: on ? 'back.out(2)' : 'power2.in', delay: on ? .3 : 0 }); });
        else { gsap.set(tg, { drawSVG: on ? '100%' : '0%' }); if (key === 'consent') gsap.set(p.querySelector('.cbp__pen'), { scaleX: on ? 1 : 0, transformOrigin: '0% 50%' }); }
        cnt.textContent = Object.keys(drawn).filter(function (x) { return drawn[x]; }).length;
      }
      function judge() {
        ['address', 'name', 'phone', 'email', 'project'].forEach(function (key) { var e = check(form, [key])[0]; set(key, !!e && !e.msg); });
        set('consent', form.elements.consent.checked);
      }
      gsap.set(root.querySelectorAll('.cbp__p, .cbp__flag path'), { drawSVG: '0%' });
      gsap.set(root.querySelector('.cbp__pen'), { scaleX: 0, transformOrigin: '0% 50%' });   // the pennant is a filled shape: it shows only once consent is ticked
      k.on(form, 'input', judge); k.on(form, 'change', judge);
      liveClear(form, k);
      k.on(form, 'submit', function (e) {
        e.preventDefault();
        if (!show(check(form, ['address', 'name', 'phone', 'email', 'project', 'consent']), form, k)) return;
        EZ.consultMail(compose(['Full name: ' + v(form, 'name'), 'Phone: ' + v(form, 'phone'), 'Email: ' + v(form, 'email'), 'Address: ' + v(form, 'address'), 'Project: ' + v(form, 'project')], v(form, 'name')));
        done(form);
      });
      k.add(function () { drawn = {}; cnt.textContent = '0'; gsap.set(root.querySelectorAll('.cbp__p, .cbp__flag path, .cbp__pen'), { clearProps: 'all' }); });
      EZ.reveal(k, root.querySelectorAll('.cbp__head > *'));
    } },

    /* slot 8 · Phase 5 new · The sentence: each blank grows with its text (size follows the value) and is underlined in
       the accent once filled; the email body is the sentence itself plus the same lines every version sends */
    8: { init: function (root, k) {
      var form = root.querySelector('.cml__form'), blanks = Array.prototype.slice.call(form.querySelectorAll('.cml__b input'));
      var base = blanks.map(function (b) { return b.size; });
      function grow(b, i) { b.size = Math.max(base[i], Math.min(40, (b.value || '').length + 2)); b.classList.toggle('is-filled', !!b.value.trim()); }
      blanks.forEach(function (b, i) { k.on(b, 'input', function () { grow(b, i); }); });
      liveClear(form, k);
      k.on(form, 'submit', function (e) {
        e.preventDefault();
        if (!show(check(form, ['name', 'project', 'address', 'phone', 'email', 'consent']), form, k)) return;
        var line = 'Hi, my name is ' + v(form, 'name') + '. I would like to change ' + v(form, 'project') + ' at ' + v(form, 'address') + '. You can reach me on ' + v(form, 'phone') + ' or at ' + v(form, 'email') + '.';
        EZ.consultMail(compose([line, '', 'Full name: ' + v(form, 'name'), 'Phone: ' + v(form, 'phone'), 'Email: ' + v(form, 'email'), 'Address: ' + v(form, 'address'), 'Project: ' + v(form, 'project')], v(form, 'name')));
        done(form);
      });
      k.add(function () { blanks.forEach(function (b, i) { b.size = base[i]; b.classList.remove('is-filled'); }); });
      EZ.reveal(k, root.querySelectorAll('.cml__head > *'));
      if (k.motion) gsap.from(blanks, { scaleX: 0, transformOrigin: '0% 50%', duration: .4, ease: 'power2.out', stagger: .08, scrollTrigger: { trigger: form, start: 'top 85%', once: true } });
    } },

    /* slot 1 · AUDIT-01 winner (copied from v2; F10 grafts and fixes): step text in the form column with its content, the
       headline follows the step, hover is an outline only, steps crossfade with a 12px rise in 200ms (text swaps at the
       midpoint), step 2 adds notes, preferred contact and a plain call line; a room picked in the hero arrives pre-pressed. */
    b2: { init: function (root, k) {
      var form = root.querySelector('.cp__form'), svg = root.querySelector('.cp__svg'), head = root.querySelector('.cp__h');
      var p1 = root.querySelector('.cp__p1'), p2 = root.querySelector('.cp__p2'), step = root.querySelector('.cp__step');
      var rooms = Array.prototype.slice.call(root.querySelectorAll('.cp__room')), whole = form.elements.whole;
      var picked = root.querySelector('.cp__picked'), err = root.querySelector('#c2-rooms-w-err'), touched = false;
      var H1 = 'Tap the rooms <span class="acc">you want to change.</span>', H2 = 'How do we <span class="acc">reach you?</span>', S1 = 'Step 1 of 2, pick the rooms', S2 = 'Step 2 of 2, how to reach you';
      var HOUSE = EZ.bezier(.23, 1, .32, 1);
      liveClear(form, k);
      rooms.forEach(function (r) { if (!r.querySelector('span')) r.innerHTML = '<span>' + r.textContent + '</span>'; });
      svg.innerHTML = '<path class="wall" d="M12 12H588V408H12Z M282 12V150 M282 150H420 M420 12V216 M12 216H588 M354 216V408"/>' +
        '<path class="door" d="M282 110a40 40 0 0 1 40 40 M420 170a40 40 0 0 0 -40 40 M200 216a44 44 0 0 1 44 -44 M354 300a40 40 0 0 1 40 40"/>' +
        '<path class="fix" d="M30 30h220v36H30z M60 120h120v50H60z M300 30h50v30h-50z M370 90a18 22 0 1 0 0.1 0 M440 40h120v120h-120z M40 300h150v70H40z M380 240h180v140H380z"/>';
      k.add(function () { svg.innerHTML = ''; rooms.forEach(function (r) { r.setAttribute('aria-pressed', 'false'); }); p1.hidden = false; p2.hidden = true; step.textContent = S1; head.innerHTML = H1; });
      function sel() { var s = rooms.filter(function (r) { return r.getAttribute('aria-pressed') === 'true'; }).map(function (r) { return r.dataset.room; }); if (whole.checked) s.unshift('Whole home'); return s; }
      function press(r, on) {
        r.setAttribute('aria-pressed', on ? 'true' : 'false');
        if (k.motion && on) gsap.fromTo(r.querySelector('span'), { scale: 1.12 }, { scale: 1, duration: .18, ease: 'power2.out' });
      }
      rooms.forEach(function (r) { k.on(r, 'click', function () { touched = true; press(r, r.getAttribute('aria-pressed') !== 'true'); err.hidden = true; }); });
      // whole home reads as five picks: a 40ms cascade
      k.on(whole, 'change', function () {
        touched = true; err.hidden = true;
        rooms.forEach(function (r, i) { if (k.motion) k.timeout(function () { press(r, whole.checked); }, i * 40); else press(r, whole.checked); });
      });
      // a room chosen in the hero arrives pressed, until the visitor touches the plan themselves
      function carry() {
        if (touched || !EZ.pickedRoom) return;
        if (EZ.pickedRoom === 'Whole home') { whole.checked = true; rooms.forEach(function (r) { r.setAttribute('aria-pressed', 'true'); }); return; }
        rooms.forEach(function (r) { r.setAttribute('aria-pressed', r.dataset.room === EZ.pickedRoom ? 'true' : 'false'); });
      }
      carry();
      k.io(root, function (en) { if (en.isIntersecting) carry(); }, { threshold: 0 });
      function go(to2) {
        var from = to2 ? p1 : p2, to = to2 ? p2 : p1;
        if (to2) picked.textContent = sel().join(' · ');
        function swap() { step.textContent = to2 ? S2 : S1; head.innerHTML = to2 ? H2 : H1; }
        if (!k.motion) { swap(); from.hidden = true; to.hidden = false; (to.querySelector('input, button') || to).focus(); return; }
        k.ctx.add(function () {
          gsap.timeline()
            .to([from, head, step], { autoAlpha: 0, duration: .1, ease: 'power1.in', onComplete: function () { swap(); from.hidden = true; gsap.set(from, { clearProps: 'all' }); to.hidden = false; } })
            .fromTo(to, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: .2, ease: HOUSE, clearProps: 'all', onComplete: function () { (to.querySelector('input, button') || to).focus(); } })
            .to([head, step], { autoAlpha: 1, duration: .2, ease: HOUSE, clearProps: 'opacity,visibility' }, '<');
        });
      }
      k.on(root.querySelector('.cp__next'), 'click', function () {
        if (!sel().length) { err.textContent = 'Tap at least one room, or tick the whole home.'; err.hidden = false; return; }
        go(true);
      });
      k.on(root.querySelector('.cp__back'), 'click', function () { go(false); });
      k.on(form, 'submit', function (e) {
        e.preventDefault();
        if (!show(check(form, ['name', 'phone', 'email', 'address', 'consent']), form, k)) return;
        var lines = ['Rooms: ' + sel().join(', '), 'Full name: ' + v(form, 'name'), 'Phone: ' + v(form, 'phone'), 'Email: ' + v(form, 'email'), 'Address: ' + v(form, 'address'), 'Preferred contact: ' + v(form, 'contact')];
        if (v(form, 'notes')) lines.push('Notes: ' + v(form, 'notes'));
        EZ.consultMail(compose(lines, v(form, 'name')));
        done(form);
      });
      EZ.reveal(k, root.querySelectorAll('.cp__side > *'));
      if (k.motion) gsap.fromTo(svg.querySelectorAll('.wall, .door, .fix'), { drawSVG: '0%' }, { drawSVG: '100%', duration: .3, ease: 'power2.out', stagger: .05, scrollTrigger: { trigger: svg, start: 'top 80%', once: true } });
    } },

    b3: { init: function (root, k) {
      var form = root.querySelector('.consult1__paper'), btn = root.querySelector('.consult1__go'), ring = root.querySelector('.consult1__ring'), label = btn.querySelector('.btn__label');
      liveClear(form, k);
      EZ.reveal(k, root.querySelectorAll('.consult1__side > *'));
      if (k.motion) {
        gsap.from(root.querySelector('.consult1__board'), { y: 24, autoAlpha: 0, duration: .3, ease: 'power2.out', scrollTrigger: { trigger: root.querySelector('.consult1__board'), start: 'top 85%', once: true } });
        gsap.from(root.querySelector('.consult1__lever'), { rotation: -20, svgOrigin: '170 34', duration: .3, ease: 'back.out(3)', delay: .2, scrollTrigger: { trigger: root.querySelector('.consult1__board'), start: 'top 85%', once: true } });
      }
      k.add(function () { gsap.set([btn, label, ring], { clearProps: 'all' }); });
      k.on(form, 'submit', function (e) {
        e.preventDefault();
        if (!show(check(form, ['name', 'phone', 'email', 'address', 'project', 'consent']), form, k)) return;
        var type = (form.querySelector('[name="type"]:checked') || {}).value || '', how = (form.querySelector('[name="contact"]:checked') || {}).value || '';
        var url = compose(['The job: ' + type, 'Full name: ' + v(form, 'name'), 'Phone: ' + v(form, 'phone'), 'Email: ' + v(form, 'email'), 'Address: ' + v(form, 'address'), 'Project: ' + v(form, 'project'), 'Preferred contact: ' + how], v(form, 'name'));
        // [AUDIT-01 F10 loser V1, P1] the send fires FIRST; the ceremony plays afterwards as confirmation, 600ms in all
        EZ.consultMail(url); done(form);
        if (!k.motion) return;
        var w = btn.offsetWidth;
        k.ctx.add(function () {
          gsap.timeline()
            .to(label, { autoAlpha: 0, duration: .08 })
            .fromTo(btn, { width: w, minWidth: 0 }, { width: 56, minWidth: 0, paddingLeft: 0, paddingRight: 0, borderRadius: 28, duration: .18, ease: 'power3.inOut' })
            .set(ring, { opacity: 1 })
            .fromTo(ring.querySelector('circle'), { drawSVG: '0%' }, { drawSVG: '100%', duration: .22, ease: 'power1.inOut' })
            .fromTo(ring.querySelector('path'), { drawSVG: '0%' }, { drawSVG: '100%', duration: .12, ease: 'power2.out' });
        });
      });
    } },

    /* v2 · Pick the rooms [BANK Neil Kelly picker]; the plan folds into the contact step (the morph belongs to Financing V3) */
    b1: { init: function (root, k) {
      var form = root.querySelector('.consult2__form'), svg = root.querySelector('.consult2__svg');
      var p1 = root.querySelector('.consult2__p1'), p2 = root.querySelector('.consult2__p2'), step = root.querySelector('.consult2__step');
      var rooms = Array.prototype.slice.call(root.querySelectorAll('.consult2__room')), whole = form.elements.whole;
      var picked = root.querySelector('.consult2__picked'), err = root.querySelector('#c2-rooms-err');
      liveClear(form, k);
      rooms.forEach(function (r) { if (!r.querySelector('span')) r.innerHTML = '<span>' + r.textContent + '</span>'; });
      // the floor plan: walls with door swings and fixtures, drawn for this picker
      svg.innerHTML = '<path class="wall" d="M12 12H588V408H12Z M282 12V150 M282 150H420 M420 12V216 M12 216H588 M354 216V408"/>' +
        '<path class="door" d="M282 110a40 40 0 0 1 40 40 M420 170a40 40 0 0 0 -40 40 M200 216a44 44 0 0 1 44 -44 M354 300a40 40 0 0 1 40 40"/>' +
        '<path class="fix" d="M30 30h220v36H30z M60 120h120v50H60z M300 30h50v30h-50z M370 90a18 22 0 1 0 0.1 0 M440 40h120v120h-120z M40 300h150v70H40z M380 240h180v140H380z"/>';
      k.add(function () { svg.innerHTML = ''; rooms.forEach(function (r) { r.setAttribute('aria-pressed', 'false'); }); p1.hidden = false; p2.hidden = true; step.textContent = 'Step 01 of 02'; });
      function sel() { var s = rooms.filter(function (r) { return r.getAttribute('aria-pressed') === 'true'; }).map(function (r) { return r.dataset.room; }); if (whole.checked) s.unshift('Whole home'); return s; }
      rooms.forEach(function (r) {
        k.on(r, 'click', function () {
          var on = r.getAttribute('aria-pressed') !== 'true';
          r.setAttribute('aria-pressed', on ? 'true' : 'false');
          err.hidden = true;
          if (k.motion && on) gsap.fromTo(r.querySelector('span'), { scale: 1.2 }, { scale: 1, duration: .25, ease: 'back.out(3)' });
        });
      });
      k.on(whole, 'change', function () { rooms.forEach(function (r) { r.setAttribute('aria-pressed', whole.checked ? 'true' : 'false'); }); err.hidden = true; });
      function go(to2) {
        var from = to2 ? p1 : p2, to = to2 ? p2 : p1;
        step.textContent = to2 ? 'Step 02 of 02' : 'Step 01 of 02';
        if (to2) picked.textContent = sel().join(' · ');
        if (!k.motion) { from.hidden = true; to.hidden = false; (to.querySelector('input, button') || to).focus(); return; }
        k.ctx.add(function () {
          // the plan sheet folds up to its top edge and the next sheet unfolds from it (a paper fold, no rotation of text)
          gsap.timeline().to(from, { scaleY: 0, transformOrigin: '50% 0%', filter: 'brightness(.55)', duration: .26, ease: 'power2.in', onComplete: function () { from.hidden = true; gsap.set(from, { clearProps: 'all' }); to.hidden = false; } })
            .fromTo(to, { scaleY: 0, transformOrigin: '50% 0%', filter: 'brightness(.55)' }, { scaleY: 1, filter: 'brightness(1)', duration: .3, ease: 'power2.out', clearProps: 'transform,filter', onComplete: function () { (to.querySelector('input, button') || to).focus(); } });
        });
      }
      k.on(root.querySelector('.consult2__next'), 'click', function () {
        if (!sel().length) { err.textContent = 'Tap at least one room, or tick the whole home.'; err.hidden = false; return; }
        go(true);
      });
      k.on(root.querySelector('.consult2__back'), 'click', function () { go(false); });
      k.on(form, 'submit', function (e) {
        e.preventDefault();
        if (!show(check(form, ['name', 'phone', 'email', 'address', 'consent']), form, k)) return;
        EZ.consultMail(compose(['Rooms: ' + sel().join(', '), 'Full name: ' + v(form, 'name'), 'Phone: ' + v(form, 'phone'), 'Email: ' + v(form, 'email'), 'Address: ' + v(form, 'address')], v(form, 'name')));
        done(form);
      });
      EZ.reveal(k, root.querySelectorAll('.consult2__side > *'));
      if (k.motion) gsap.fromTo(svg.querySelectorAll('.wall, .door, .fix'), { drawSVG: '0%' }, { drawSVG: '100%', duration: .3, ease: 'power2.out', stagger: .05, scrollTrigger: { trigger: svg, start: 'top 80%', once: true } });
    } },

    /* v3 · Phone first [BANK JC Suzanne giant CTA] */
    b4: { init: function (root, k) {
      var form = root.querySelector('.consult3__form'), num = root.querySelector('.consult3__num'), digits = root.querySelector('.consult3__digits');
      var hs = root.querySelector('.consult3__hs'), waves = root.querySelectorAll('.consult3__waves path');
      liveClear(form, k);
      k.on(form, 'submit', function (e) {
        e.preventDefault();
        if (!show(check(form, ['name', 'phone', 'project', 'consent']), form, k)) return;
        EZ.consultMail(compose(['Please call me back.', 'Full name: ' + v(form, 'name'), 'Phone: ' + v(form, 'phone'), 'Project: ' + v(form, 'project')], v(form, 'name')));
        done(form);
      });
      EZ.reveal(k, root.querySelectorAll('.consult3__h'));
      if (!k.motion) return;
      // the number grows from a line of text to the size of the room as it comes up the screen
      gsap.fromTo(digits, { scale: .3 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: num, start: 'top bottom', end: 'top 40%', scrub: true } });
      // the handset rings twice when it comes on screen (under 5s), and again whenever the pointer reaches the number
      var ring = gsap.timeline({ repeat: 1, repeatDelay: 2.6, paused: true })
        .to(hs, { keyframes: [{ rotation: -14, duration: .06 }, { rotation: 12, duration: .06 }, { rotation: -10, duration: .06 }, { rotation: 8, duration: .06 }, { rotation: -6, duration: .06 }, { rotation: 0, duration: .08 }], svgOrigin: '28 40' }, 0)
        .fromTo(waves, { drawSVG: '50% 50%', opacity: 0 }, { drawSVG: '0% 100%', opacity: 1, duration: .3, stagger: .08 }, 0)
        .to(waves, { opacity: 0, duration: .4 }, .7);
      k.io(num, function (en) { en.isIntersecting ? ring.restart() : ring.pause(); });
      k.on(num, 'pointerenter', function () { ring.restart(); });
    } }
  });
})();
