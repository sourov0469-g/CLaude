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
    d.innerHTML = 'Your email app should now be open with your request to ' + TO + '. Send it from there and we will come back to you, usually the same or next working day. If it is urgent, call <a class="link" href="tel:+17542360675">(754)&nbsp;236&#8209;0675</a>.';
    d.hidden = false;
  }
  function liveClear(form, k) {
    form.querySelectorAll('input, textarea').forEach(function (el) {
      k.on(el, 'input', function () { var b = el.id && form.querySelector('#' + el.id + '-err'); if (b && !b.hidden) { b.hidden = true; el.setAttribute('aria-invalid', 'false'); } });
      k.on(el, 'change', function () { var b = el.id && form.querySelector('#' + el.id + '-err'); if (b && !b.hidden && el.checked) { b.hidden = true; } });
    });
    k.add(function () { form.reset(); form.querySelectorAll('.c-err, .c-done').forEach(function (b) { b.hidden = true; }); form.querySelectorAll('[aria-invalid]').forEach(function (el) { el.removeAttribute('aria-invalid'); }); });
  }
  if (!EZ.consultMail) EZ.consultMail = function (url) { window.location.href = url; };   // tests replace this to intercept the mailto navigation

  EZ.section('consult', {
    /* v1 · The work order [BANK 348 circular progress] */
    1: { init: function (root, k) {
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
        if (!k.motion) { EZ.consultMail(url); done(form); return; }
        // pill -> 56px circle -> ring draws -> tick, then the email opens [BANK 348]
        var w = btn.offsetWidth;
        k.ctx.add(function () {
          gsap.timeline({ onComplete: function () { EZ.consultMail(url); done(form); } })
            .to(label, { autoAlpha: 0, duration: .15 })
            .fromTo(btn, { width: w, minWidth: 0 }, { width: 56, minWidth: 0, paddingLeft: 0, paddingRight: 0, borderRadius: 28, duration: .35, ease: 'power3.inOut' })
            .set(ring, { opacity: 1 })
            .fromTo(ring.querySelector('circle'), { drawSVG: '0%' }, { drawSVG: '100%', duration: .7, ease: 'power1.inOut' })
            .fromTo(ring.querySelector('path'), { drawSVG: '0%' }, { drawSVG: '100%', duration: .3, ease: 'power2.out' });
        });
      });
    } },

    /* v2 · Pick the rooms [BANK Neil Kelly picker]; the plan folds into the contact step (the morph belongs to Financing V3) */
    2: { init: function (root, k) {
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
    3: { init: function (root, k) {
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
      // the handset rings every few seconds while it is on screen
      var ring = gsap.timeline({ repeat: -1, repeatDelay: 2.6, paused: true })
        .to(hs, { keyframes: [{ rotation: -14, duration: .06 }, { rotation: 12, duration: .06 }, { rotation: -10, duration: .06 }, { rotation: 8, duration: .06 }, { rotation: -6, duration: .06 }, { rotation: 0, duration: .08 }], svgOrigin: '28 40' }, 0)
        .fromTo(waves, { drawSVG: '50% 50%', opacity: 0 }, { drawSVG: '0% 100%', opacity: 1, duration: .3, stagger: .08 }, 0)
        .to(waves, { opacity: 0, duration: .4 }, .7);
      k.io(num, function (en) { en.isIntersecting ? ring.play() : ring.pause(); });
      k.on(num, 'pointerenter', function () { ring.restart(); });
    } }
  });
})();
